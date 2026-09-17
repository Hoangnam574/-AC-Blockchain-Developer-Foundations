# 🧪 Bài tập TypeScript – Mô phỏng Smart Contract

Trong bài học, bạn đã biết smart contract có thể lưu trữ và cập nhật dữ liệu.  
Giờ bạn sẽ mô phỏng lại điều đó bằng TypeScript.

---

## 🎯 Yêu cầu:
1. Tạo một lớp `SmartContract` có thuộc tính `message` dạng `string`.
2. Constructor khởi tạo `message`.
3. Hàm `updateMessage(newMsg: string)` sẽ cập nhật `message` mới.
4. Hàm `getMessage()` trả về message hiện tại.

---

## 🧪 Ví dụ:

```ts
const contract = new SmartContract("Hello");
console.log(contract.getMessage()); // 👉 "Hello"

contract.updateMessage("Blockchain!");
console.log(contract.getMessage()); // 👉 "Blockchain!"
```

---

## 🧠 Gợi ý:
- Giống như smart contract HelloWorld trong Solidity.
- Bạn không cần thao tác file, chỉ làm việc trong class.

---

## 📝 Lưu ý:
- Đây là bài tập optional, nhưng rất nên làm nếu bạn muốn hiểu rõ state và hàm trong smart contract.

prompt: bạn là một typescript developer, hãy đọc và phân tích @lessons/bai2_1\ và lập kế hoạch tạo một lớp 'smartcontract' ở solution.ts có thuộc tính message: string và contructor nhận một tham số mesage:string sau đó khởi tạo 'message' và tạo hàm: 1. hàm updateMessage sẽ cập nhật message mới, 2. getmessage trả về message hiện tại sử dụng test.ts để kiểm tra và sửa lỗi nếu có
