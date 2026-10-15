import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import solc from "solc";
import { ethers } from "ethers";

const HARDHAT_ROOT = path.resolve(__dirname, "..", "..", "ac-hardhat-template");
const NODE_MODULES = path.join(HARDHAT_ROOT, "node_modules");
const ENTRY_FILE = path.join(__dirname, "MyToken.sol");

type SourceMap = { [sourceUnitName: string]: { content: string; filePath: string } };

function collectSources(entryFile: string): SourceMap {
  const sources: SourceMap = {};

  const addSource = (sourceUnitName: string, filePath: string) => {
    const normalized = path.posix.normalize(sourceUnitName.split(path.sep).join("/"));
    if (sources[normalized]) return;
    const content = fs.readFileSync(filePath, "utf8");
    sources[normalized] = { content, filePath };

    const importRegex = /import\s+(?:[^"';]*?\s+from\s+)?["']([^"']+)["']/g;
    let match: RegExpExecArray | null;
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      let resolvedName: string;
      let resolvedFile: string;
      if (importPath.startsWith(".")) {
        const baseDir = path.posix.dirname(normalized);
        resolvedName = path.posix.join(baseDir, importPath);
        resolvedFile = path.resolve(path.dirname(filePath), importPath);
      } else {
        resolvedName = importPath;
        resolvedFile = path.resolve(NODE_MODULES, importPath);
      }
      addSource(resolvedName, resolvedFile);
    }
  };

  addSource(path.basename(entryFile), entryFile);
  return sources;
}

function compileContract(): { abi: any[]; bytecode: string } {
  const sources = collectSources(ENTRY_FILE);

  const input = {
    language: "Solidity",
    sources: Object.fromEntries(
      Object.entries(sources).map(([name, value]) => [name, { content: value.content }])
    ),
    settings: {
      optimizer: { enabled: true, runs: 1000 },
      outputSelection: { "*": { "*": ["abi", "evm.bytecode.object"] } },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  const errors = (output.errors ?? []).filter((e: any) => e.severity === "error");
  if (errors.length > 0) {
    throw new Error(errors.map((e: any) => e.formattedMessage).join("\n"));
  }

  const contract = output.contracts["MyToken.sol"]?.["MyToken"];
  if (!contract) {
    throw new Error("Không tìm thấy contract MyToken sau khi compile");
  }

  return { abi: contract.abi, bytecode: "0x" + contract.evm.bytecode.object };
}

async function main() {
  dotenv.config({ path: path.join(HARDHAT_ROOT, ".env") });

  const privateKey = process.env.TESTNET_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("Thiếu TESTNET_PRIVATE_KEY trong ac-hardhat-template/.env");
  }

  const { abi, bytecode } = compileContract();

  const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
  const wallet = new ethers.Wallet(privateKey.trim(), provider);

  console.log("Đang deploy MyToken từ:", wallet.address);

  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("MyToken deployed at:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
