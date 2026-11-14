# Lesson 02 — Kiến trúc xe

Một chiếc xe không phải một khối tên là “máy”. Nó là nhiều miền ghép lại. Bài này đặt tên các miền trước khi đi vào từng bu-lông.

## 1. Concept

`Architecture – kiến trúc` ở đây là cách các nhóm lớn chia việc và nằm ở đâu trên xe. Đọc đúng miền thì mới biết một triệu chứng thuộc máy, thuộc bánh, hay chỉ thuộc màn hình.

## 2. Architecture

Mười nhóm của một xe xăng phổ thông:

1. `Body – thân vỏ`: chỗ người ngồi và lớp vỏ.
2. `Chassis – khung gầm`: treo, lái, phanh, bánh.
3. `Powertrain – hệ động lực`: máy, hộp số, đường ra bánh.
4. Điện 12V: ắc quy, máy phát, dây, cầu chì.
5. Điện tử: các hộp điều khiển và cảm biến.
6. Nhiệt: nước làm mát và điều hòa.
7. Nội thất: ghế, cửa, đèn, cụm đồng hồ.
8. An toàn: đai, túi khí, và các hệ thống giữ bánh bám.
9. `ADAS – hỗ trợ người lái`: camera, radar, chức năng can thiệp nếu xe có.
10. Giải trí: màn hình và âm thanh.

Trên Honda City 1.5, powertrain nằm phía trước. Bình xăng thường dưới hàng ghế sau. Két nước ở mũi xe. Cabin ở giữa. Bố trí này là của sedan cầu trước, không phải của xe máy trước dẫn động sau.

## 3. Components

Thân vỏ và khung gầm hay bị gọi chung là “khung”. Khi đọc hỏng, hãy tách: móp cửa là thân vỏ. Góc bánh sai và lốp mòn lệch là việc của khung gầm và căn chỉnh. Máy nổ yếu là powertrain.

Nhiều xe con dùng `unibody – thân chịu lực`: vỏ và sàn cùng chịu tải, không có khung thang riêng như một số xe tải. Vẫn nên gọi đúng việc của từng miền.

## 4. Flow

Năng lượng và mô-men đi trong powertrain. Điện 12V nuôi các hộp. Dữ liệu đi giữa cảm biến, hộp và cơ cấu chấp hành. Nhiệt đi vòng nước và vòng điều hòa. ADAS và giải trí dùng dữ liệu, nhưng không tạo mô-men.

## 5. Real-world Example

Mở nắp ca-pô City: máy và hộp số nằm ngang phía trước, két nước trước máy, ắc quy thường ở một góc khoang máy. Trong cabin là vô-lăng, bàn đạp và màn hình. Màn hình đó không tính thời điểm bugi.

Đời xe và bản xe đổi chỗ ắc quy, số lượng túi khí và có hay không có ga tự động. Đừng lấy một ảnh nắp ca-pô làm bản vẽ mọi City.

## 6. Comparison

Xe cầu sau vẫn có thể đặt máy trước, nhưng thêm trục các-đăng xuống cầu sau. Xe điện bỏ máy xăng và bình xăng, thêm pin cao áp và motor. Bài sau chỉ so kiến trúc bốn họ, không đi vào pin.

Một xe sang có thể tách hộp điều khiển nhiều hơn một xe phổ thông. Số hộp không đổi việc của từng miền.

## 7. Failure

Hỏng loa là nội thất hoặc giải trí. Hỏng ECM là điện tử của máy. Hỏng trục láp là powertrain. Hỏng góc đặt bánh là khung gầm. Trộn các ca này thành “xe hỏng” thì thứ tự kiểm tra sẽ sai.

## 8. Interview

1. Kể mười miền và mỗi miền một câu.
2. Thân chịu lực khác khung thang ở điểm nào?
3. Vì sao màn hình không phải ECU máy?
4. Trên City, máy nằm đâu so với bình xăng?
5. ADAS có thay powertrain không?
6. Điện 12V và điện tử khác nhau thế nào?
7. Một vết móp cửa thuộc miền nào?
8. Xe kéo lệch sau va chạm thì miền nào phải được đo lại?

## 9. Quiz

Năm câu dưới trang hỏi đúng miền của từng cụm. Chưa cần tên bu-lông.

## 10. Summary

- Xe là nhiều miền ghép, không phải một cục máy.
- City 1.5 đặt powertrain phía trước, nhiên liệu phía sau, người ở giữa.
- Thân vỏ, khung gầm và powertrain hay bị gọi lẫn.
- Màn hình và ADAS dùng dữ liệu. Chúng không đốt xăng.
- Triệu chứng có ích khi gắn được vào đúng miền.
