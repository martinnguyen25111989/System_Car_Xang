# Lesson 25 — An toàn chủ động

An toàn chủ động cố tránh va chạm khi xe còn đang chạy. Phanh, ga và lái là các chỗ nó can thiệp. Người lái vẫn là người chịu trách nhiệm.

## 1. Concept

Các hệ thống này đo bánh hoặc đo phía trước xe, rồi phanh từng bánh, bớt ga, hoặc nhắc vô-lăng. Chúng không thêm ma sát cho mặt đường.

## 2. Architecture

`ABS` giữ bánh không khóa khi phanh. `TCS` giữ bánh kéo không quay trơn khi ga. `ESC` phanh từng bánh khi thân xe đi ngang so với hướng vành. `AEB` tự phanh nếu thấy vật cản và người lái chưa phanh. Ga tự động thích ứng giữ khoảng cách. Giữ làn hỗ trợ vành theo vạch.

ABS, TCS và ESC phổ biến trên xe đời mới. AEB, ga thích ứng và giữ làn tùy bản City. Không ghi “City có đủ” nếu chưa xem đúng xe.

## 3. Components

Cảm biến tốc độ ở mỗi bánh là dữ liệu gốc của ABS, TCS và ESC. Thêm cảm biến góc lái và gia tốc ngang cho ESC. AEB cần camera hoặc radar. Giữ làn cần camera thấy vạch.

Nút tắt ESC tắt lớp can thiệp trượt ngang. Nó không xả dầu phanh.

## 4. Flow

Phanh gấp, một bánh sắp dừng trong khi xe còn trượt: ABS nhả áp bánh đó từng nhịp. Đạp ga trên đường trơn, bánh trước quay nhanh hơn bánh sau: TCS bớt mô-men. Vào cua, thân trượt ngang: ESC phanh bánh có lợi để kéo xe lại.

Đạp rung lúc phanh khẩn có thể là ABS đang làm việc.

## 5. Real-world Example

City mưa, cua và ga cùng lúc: bánh trước vừa lái vừa kéo nên TCS và ESC dễ vào việc. Nếu người lái đã tắt ESC, xe sẽ dễ đi rộng khỏi cua hơn. Đó là lựa chọn tình huống, không phải cách làm đường hàng ngày.

## 6. Comparison

Ga tự động đời cũ chỉ giữ tốc độ, không nhìn xe trước. Bản thích ứng mới nhìn. Giữ làn khác cảnh báo lệch làn: một bên chỉ kêu, một bên có thể kéo vành. Đọc đúng tên chức năng trên đồng hồ của đời xe.

## 7. Failure

Đèn ABS: hệ chống khóa không sẵn sàng, phanh cơ có thể còn nhưng bánh có thể khóa khi gấp. Đèn ESC: mất lớp ổn định. AEB im sau khi kính bị đá hoặc radar lệch: chức năng không có mắt, không phải hết dầu phanh. Vạch mờ làm giữ làn bỏ cuộc là đúng thiết kế, không phải hỏng thước lái.

## 8. Interview

1. ABS, TCS, ESC mỗi thứ ứng với tình huống nào?
2. AEB có mặc định trên mọi bản không?
3. Vì sao đạp có thể rung khi phanh khẩn?
4. Tắt ESC còn mất phanh không?
5. Giữ làn cần nhìn thấy gì?
6. Ga thích ứng khác ga giữ tốc độ thế nào?
7. Cảm biến bánh hỏng làm những đèn nào có thể cùng sáng?
8. Hệ thống này có tăng độ bám của mặt đường không?

## 9. Quiz

Quiz tách tình huống ga, phanh và trượt ngang.

## 10. Summary

- ABS cho lúc phanh. TCS cho lúc ga. ESC cho lúc xe trượt ngang.
- AEB và giữ làn là lớp nhìn đường, tùy bản xe.
- Chúng can thiệp bằng phanh, ga và lái có sẵn.
- Tắt ESC là bỏ một lớp, không phải tắt phanh.
- Mất vạch hoặc bẩn cảm biến thì chức năng phải bỏ cuộc.
