# Lesson 32 — Chẩn đoán

Sáu ca dưới đây là cách dùng cả khóa. Mỗi ca hỏi: đứt ở đoạn nào của chuỗi, thuộc miền nào, thuộc luồng nào. Chưa cần quy trình tháo.

## 1. Concept

Triệu chứng là đầu ra. Chuỗi đã học là bản đồ để đi ngược về đầu vào. Cùng một câu “xe hỏng” là sáu bản đồ khác nhau.

## 2. Architecture

Sáu cửa vào:

1. Không nổ máy.
2. Rung.
3. Hao xăng.
4. Nóng máy.
5. Đèn phanh.
6. Đèn kiểm tra máy.

Không mở cả sáu cửa một lúc. Chọn cửa khớp với điều người lái thấy trước.

## 3. Components

Không nổ thì các nghi phạm là điện đề, áp xăng, lửa, khí, nén, tín hiệu khuỷu. Rung thì là một xy-lanh bỏ thì hoặc một chi tiết cơ khí theo vòng quay. Hao xăng thì là hỗn hợp, ma sát, lốp, phanh kẹt hoặc cảm biến nhiệt. Nóng máy thì là nước, van, két, quạt, bơm. Đèn phanh thì là mức dầu, phanh tay hoặc mạch đèn, tách khỏi đèn ABS. Đèn máy thì là một mã, một freeze frame, rồi mới tới phụ tùng.

## 4. Flow

Không quay máy: luồng điện 12V đứt trước khi tới vành răng. Quay mà không nổ: điện đề đã xong, năng lượng cháy hoặc dữ liệu mốc lửa chưa xong. Nổ mà không kéo: năng lượng đã thành mô-men ở máy, luồng cơ khí từ số ra bánh đứt hoặc lốp không bám. Nóng: luồng nhiệt. Đèn: luồng dữ liệu của đúng hộp.

## 5. Real-world Example

City sáng ra không nổ, đèn trần tối, còi nhỏ: bình hoặc cực, dừng ở đó. Cùng xe, buổi chiều không nổ nhưng đề vẫn khỏe và có mùi xăng: sang lửa, ngộp xăng, hoặc tín hiệu. Cùng xe, hôm sau nổ nhưng kim nhiệt cao khi đứng chờ đèn đỏ rồi mát khi chạy: quạt. Ba ngày, ba đoạn. Đừng dùng một phụ tùng cho cả ba.

## 6. Comparison

P0300 là rung có mã. Rung theo tốc độ xe khi về số N là bánh hoặc láp, không cần mã cháy. Hao xăng vì lốp 1,5 bar không có mã ECM. Đèn đỏ hình phanh không phải đèn vàng hình máy. Tách dấu hiệu trước khi tách hãng xe.

Một BEV không nổ máy theo nghĩa không có thì cháy. Ca “không nổ” của City không mang sang xe điện. Ca “không vào được trạng thái sẵn sàng chạy” của xe điện là kiến trúc khác.

## 7. Failure

Thứ tự sai đắt nhất: thay ECM vì đèn máy mà chưa đọc mã. Thay xúc tác vì P0420 trong khi xe đang bỏ cháy. Thay máy vì rung mà rung biến mất khi về N và chỉ xuất hiện ở 80 km/h. Thay két vì điều hòa không mát trong khi kim nước vẫn ở giữa. Mỗi câu là một lần nhảy nhầm miền.

## 8. Interview

1. Đề không quay thì dừng ở luồng nào?
2. Đề quay không nổ thì những nhánh nào còn lại?
3. Làm sao tách rung máy và rung bánh?
4. Hao xăng không có mã thì còn những việc cơ khí nào?
5. Nóng khi đứng, mát khi chạy, trỏ tới đâu?
6. Đèn phanh đỏ và đèn ABS khác nhau thế nào?
7. Đèn máy sáng thì bước đầu tiên là gì?
8. Một phụ tùng có chữa được cả sáu ca không?

## 9. Quiz

Quiz ép bạn chọn đoạn chuỗi trước khi chọn chi tiết.

## 10. Summary

- Một triệu chứng, một đoạn chuỗi.
- Điện trước nếu máy chưa quay.
- Cháy trước nếu máy quay mà không nổ.
- Cơ khí sau máy nếu đã nổ mà không kéo.
- Nhiệt nếu kim nước lên. Dữ liệu nếu có đèn. Đọc mã trước khi thay hộp.

## Bản đồ cả khóa

Level 1 đặt ngôn ngữ: miền kiến trúc, bốn họ xe, năm luồng. Level 2 là cháy trong máy và các đường khí, xăng, xả. Level 3 đưa mô-men ra lốp và giữ xe bằng phanh, lái, treo. Level 4 là điện 12V, các hộp, cảm biến và hai vòng nhiệt. Level 5 là bus, mã lỗi và phần mềm. Level 6 là tránh va và giảm thương. Level 7 là chỗ người ngồi và màn hình. Level 8 ghép lại thành một City xăng, một lịch bảo dưỡng, và sáu cửa chẩn đoán.

Câu giữ lại: City 1.5 trong khóa này là xe xăng hút khí tự nhiên, cầu trước, điện 12V, ECM điều khiển cháy. Số liệu là mức điển hình. Đời xe và xe khác được phép khác sơ đồ. Khi một chi tiết hỏng, hãy hỏi nó đang đứt luồng nào.
