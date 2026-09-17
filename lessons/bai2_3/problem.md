# Bài 2.2 – Viết hàm Solidity đơn giản

## 🎯 Mục tiêu
- Làm quen với cú pháp Solidity cơ bản.
- Viết một smart contract đơn giản có biến và hàm.
- Deploy và test trên Remix IDE.

## 📄 Đề bài
Viết một smart contract tên là `Welcome`:
- Biến `greeting` dạng `string`, khai báo `public`.
- Constructor truyền vào giá trị khởi tạo cho `greeting`.
- Hàm `getGreeting()` trả về `greeting`.

Sau đó:
1. Deploy contract trên Remix IDE.
2. Gọi hàm `getGreeting()` và chụp màn hình kết quả.
3. (Tuỳ chọn) Sửa hàm để trả thêm địa chỉ người deploy (msg.sender).

## 💡 Gợi ý triển khai
- Dán vào Remix tại: https://remix.ethereum.org
- Chọn compiler 0.8.x
- Deploy contract bằng injected hoặc environment VM

prompt: bạn là một solidity developer, hãy đọc và phân tích @lessons/bai2_3\ và lập kế hoạch tạo file solution.sol sau đó viết một smartcontract tên là 'Welcome', contract phải có: 1. Biến greeting kiểu string và khai báo public 2. Constructor nhận một giá trị string để khởi tạo greeting 3.Hàm getGreeting() trả về giá trị greeting 4. Sử dụng Solidity version 0.8.x. rồi kiểm tra và sửa lỗi nếu có

Sửa smart contract Welcome hiện tại như sau: Giữ nguyên biến greeting và constructor. Sửa hàm getGreeting() để trả về 2 giá trị: 1. Nội dung greeting. 2.Địa chỉ của người đang gọi hàm, sử dụng msg.sender. Không thay đổi các phần khác của contract nếu không cần thiết.

![alt text](image.png)![alt text](image-1.png)