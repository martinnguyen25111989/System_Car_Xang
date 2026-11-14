# Lesson 22 — Mạng xe

Nếu bạn viết phần mềm, hãy nhìn xe như nhiều tiến trình không chung bộ nhớ. Chúng trao đổi bằng khung tin trên đường dây.

## 1. Concept

`CAN – Controller Area Network` là một bus: nhiều hộp cùng nghe, khung có mã định danh, không có một server giữ hàng đợi ở giữa.

## 2. Architecture

Hai dây xoắn mang tín hiệu vi sai. Một khung gồm ID và payload. Khi hai hộp cùng phát, trọng tài theo bit để ID ưu tiên hơn được đi tiếp, hộp kia thử lại. Đó là trọng tài, không phải máy chủ cấp phép.

`LIN` chậm và rẻ, thường một chủ nhiều tớ, hợp công tắc và mô-tơ nhỏ. `FlexRay` có nhịp cứng hơn, gặp trên một số xe chứ không phải trên mọi City. `Automotive Ethernet` mang dữ liệu lớn như camera khi xe có trang bị.

`Gateway – cổng nối` dịch và chặn giữa các mạng.

## 3. Components

ECM, ABS, BCM, cụm đồng hồ và đầu giải trí là các nút. Chúng không nhất thiết nằm trên cùng một cặp dây. Đầu giải trí thường đứng sau cổng nối.

Tốc độ bus điển hình của CAN cổ điển là hàng trăm kilobit mỗi giây tới một megabit. CAN FD nhanh và dài khung hơn. Con số của từng mạng nằm trong tài liệu xe, không chép một tốc độ cho cả xe.

## 4. Flow

ECM phát tua máy. Hộp số và đồng hồ nghe. ABS phát tốc độ bánh. Đồng hồ và ESC nghe. Không nút nào cần hỏi ECM bằng một kết nối riêng cho từng tín hiệu kiểu điện thoại. Ai cần ID đó thì tự lấy.

Màn hình muốn hiện tốc độ thì nhận bản đã được cổng nối cho qua. Nó không được phát một khung lệnh lửa.

## 5. Real-world Example

City mất đồng hồ tốc độ, đèn ABS sáng, ga tự động nếu có cũng tắt: các chức năng đó cùng cần tốc độ bánh. Một cảm biến bánh hoặc nút ABS im có thể làm nhiều triệu chứng một lúc. Màn hình giải trí vẫn chạy thì mạng của nó còn sống.

## 6. Comparison

Một API web có máy chủ và hàng đợi. CAN không có máy chủ. Một bus nội bộ trên bo mạch chủ có trọng tài theo cách khác. Giống nhau ở chỗ nhiều chủ thể dùng chung một môi trường truyền. Khác nhau ở thời gian và hậu quả: khung tua máy trễ khác một khung đổi bài hát.

## 7. Failure

Chập hai dây CAN hoặc đứt một dây làm cả một mạng im hoặc đầy lỗi. Triệu chứng là nhiều hộp cùng báo mất liên lạc, không phải một bóng đèn. Một nút phát lỗi liên tục có thể làm bẩn cả bus. Sửa bằng cách tách miền, không bằng cách đấu tắt dây.

Bài này không đi vào cách gắn thiết bị lên bus của xe người khác hay cách giả khung tin. Hiểu trọng tài là để đọc kiến trúc và để chẩn đoán đứt dây.

## 8. Interview

1. CAN giống message bus ở điểm nào?
2. ID và payload mỗi thứ là gì?
3. Hai hộp cùng phát thì chuyện gì xảy ra?
4. LIN hợp việc gì hơn CAN?
5. Gateway để làm gì?
6. Vì sao màn hình không phát lệnh lửa?
7. Nhiều hộp cùng mất liên lạc gợi ý đoạn nào?
8. Ethernet ô tô có trên mọi City không?

## 9. Quiz

Quiz nói bằng từ của bus: nút, ID, trọng tài, cổng nối.

## 10. Summary

- CAN là bus chung, có ID và trọng tài.
- LIN cho thiết bị chậm. Ethernet cho dữ liệu lớn nếu xe có.
- Gateway tách miền tiện nghi khỏi miền điều khiển.
- Một tín hiệu chết có thể làm nhiều hộp cùng mất một chức năng.
- Một màn hình đen chưa phải đứt CAN của máy.
