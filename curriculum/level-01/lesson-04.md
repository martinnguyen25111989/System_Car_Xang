# Lesson 04 — Năm luồng trên một chiếc xe

Năm màu trên sơ đồ không phải năm bước xếp hàng. Chúng là năm đường đang chạy cùng lúc trên một xe xăng.

## 1. Concept

Tách luồng để đặt một triệu chứng vào đúng đường. Sai đường thì thay nhầm cụm.

## 2. Architecture

- Vàng, năng lượng: xăng thành công trong máy.
- Xanh thép, cơ khí: mô-men từ trục khuỷu ra bánh và lực ở mặt đường.
- Đỏ, điện 12V: ắc quy và máy phát nuôi hộp, bơm, lửa, đề.
- Xanh lá, dữ liệu: cảm biến báo, ECU lệnh.
- Cam, nhiệt: phần năng lượng không thành công, ra két nước và ống xả.

Hai màu nữa sẽ xuất hiện từ bài máy: cyan cho khí nạp, xám cho khí xả. Chúng là đường vật chất vào và ra xy-lanh, không thay năm luồng này.

## 3. Components

Bình xăng thuộc năng lượng. Hộp số, vi sai, trục láp, lốp thuộc cơ khí. Ắc quy thuộc điện. Bàn đạp ga điện tử và ECU thuộc dữ liệu. Két nước thuộc nhiệt.

Máy nằm ở giao điểm. Nó nhận xăng, khí, điện và lệnh. Nó nhả mô-men và nhiệt.

## 4. Flow

Khi xe chạy đều, chân ga giữ một độ nhấn. Đó vẫn là dữ liệu. ECU vẫn tính. Xăng vẫn cháy. Mô-men vẫn qua số. Điện vẫn nuôi hộp. Nước vẫn mang nhiệt ra két. Không có luồng nào “xong việc” để nhường luồng sau.

Tắt một màu trên sơ đồ là cách giấu đường không đang xét. Không phải cách tắt hệ thống trên xe thật.

## 5. Real-world Example

Trên City, nhấn ga: dữ liệu từ bàn đạp vào ECU, năng lượng từ bình xăng, điện 12V cho bơm và lửa, cơ khí qua CVT và hai trục láp trước, nhiệt ra két trước mũi xe và ống xả. Cùng một lúc.

Một số xe xăng cũ kéo bướm ga bằng dây. Luồng dữ liệu của bàn đạp khi đó mỏng hơn, một phần là cơ khí. Đừng gán drive-by-wire cho mọi đời xe.

## 6. Comparison

Xe điện vẫn có dữ liệu bàn đạp, điện và cơ khí ở bánh, nhưng năng lượng chính nằm trong pin cao áp chứ không trong bình xăng. Nhiệt của pin và motor là bài khác, không dùng két nước của City để suy ra.

## 7. Failure

Không nổ: nhìn năng lượng, điện, khí và dữ liệu của ECU trước. Cơ khí hộp số chưa phải nghi phạm đầu.

Nổ nhưng không lăn: cháy đã có. Nhìn cơ khí từ hộp số ra bánh, rồi độ bám.

Ga không đáp: dữ liệu bàn đạp, bướm ga, ECU.

Kim nhiệt cao: nhiệt không thoát. Không bắt đầu bằng việc tháo hộp số.

## 8. Interview

1. Kể năm luồng và một bộ phận tiêu biểu.
2. Vì sao chúng không phải năm bước?
3. Máy nằm ở giao của những luồng nào?
4. Tắt màu cơ khí là giấu đường gì?
5. Ắc quy thuộc luồng nào, và không thuộc luồng nào?
6. Xe chạy đều thì dữ liệu còn không?
7. Ca không nổ và ca nổ không chạy, mỗi ca thuộc đoạn nào?
8. Khí nạp sẽ là màu thứ mấy so với năm màu này?

## 9. Quiz

Quiz bắt gán đúng luồng. Làm trước khi mở gợi ý tự luận.

## 10. Summary

- Năm luồng chạy song song trên xe xăng.
- Màu là ngôn ngữ đọc sơ đồ của cả khóa.
- Máy là nút giao, không phải chủ của một màu.
- Triệu chứng chọn được luồng thì thứ tự kiểm tra mới đúng.
- Khí nạp và khí xả là hai đường thêm, bắt đầu từ cụm máy.

## Ôn level 1

Bạn đã có ba lớp: xe xăng biến xăng thành lực ở đường, mười miền kiến trúc, bốn họ xe ở mức so sánh, và năm luồng. Từ level 2, các bài sẽ cắm chi tiết vào đúng miền powertrain, không thêm một ngôn ngữ màu mới ngoài khí nạp và khí xả.
