// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    address public owner;

    uint public candidateCount;

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;

    event Voted(address voter, uint candidateId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addCandidate(string memory name) public onlyOwner {
        candidates[candidateCount] = Candidate(name, 0);
        candidateCount += 1;
    }

    function vote(uint candidateId) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(candidateId < candidateCount, "Invalid candidate");
        hasVoted[msg.sender] = true;
        candidates[candidateId].voteCount += 1;
        emit Voted(msg.sender, candidateId);
    }
}