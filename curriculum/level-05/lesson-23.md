# Lesson 23 — OBD và mã lỗi

Đèn hình máy là lời ECM nói rằng một đại lượng đã ra ngoài dải. Mã lỗi là câu đầu tiên, không phải câu cuối.

## 1. Concept

`OBD-II` là cách đọc mã và dữ liệu sống qua giắc trong cabin. Mã dạng P0xxx thường là mã chung. Hãng còn có mã riêng. Cùng một chữ P không thay thế sơ đồ của đời xe.

## 2. Architecture

Giắc 16 chân, thường dưới taplo phía người lái, nối tới ECM và có thể tới các hộp khác. Máy chẩn đoán hỏi mã hiện tại, mã đang chờ, và `freeze frame – ảnh dữ liệu lúc lỗi được ghi`.

`UDS` là lớp dịch vụ chẩn đoán sâu hơn trên nhiều hộp. `DoIP` mang việc đó trên mạng IP ở xe có cổng này. Bạn chỉ cần biết chúng là đường nói chuyện, không cần bộ lệnh.

## 3. Components

Ba mã để luyện cách đọc:

- `P0300`: bỏ cháy ngẫu nhiên. Cháy không đều. Chưa chỉ một bugi.
- `P0420`: xúc tác dưới ngưỡng hiệu quả. Đường xả, xúc tác hoặc cảm biến ô-xy.
- `P0171`: hỗn hợp quá nghèo. ECU đã phải thêm xăng nhiều. Xì gió, áp xăng thấp hoặc đo khí sai là các nhánh.

## 4. Flow

Cảm biến ra ngoài dải đủ lâu. ECM ghi mã, đôi khi bật đèn, và chụp freeze frame: tua, tải, nhiệt lúc đó. Kỹ thuật viên đọc mã, nhìn dữ liệu sống, rồi mới quyết định đo nhánh nào. Xóa đèn không vá chỗ hở. Mã sẽ quay lại nếu nguyên nhân còn.

## 5. Real-world Example

City rung lúc lạnh, đèn máy, P0300, freeze frame cho thấy nước còn lạnh và tua chờ: nghĩ bugi, mô-bin hoặc hỗn hợp lúc lạnh trước khi nghĩ trục láp. Cùng P0300 nhưng chỉ xảy ra khi ga lớn và đã nóng thì nhánh khác: áp xăng lúc tải, hoặc tia lửa dưới áp nén.

P0420 xuất hiện sau nhiều tháng hao xăng: xúc tác có thể là nạn nhân của xăng chưa cháy, không phải thủ phạm duy nhất.

## 6. Comparison

Đèn ABS, đèn túi khí và đèn máy là ba cửa khác nhau. Một máy đọc OBD động cơ không thay cho máy đọc được hộp túi khí nếu xe cần bài kiểm tra riêng. Không phải mọi đầu đọc rẻ đều thấy mã của mọi hộp.

## 7. Failure

P0171 cùng tiếng xì nhẹ ở cổ hút: khí lọt không được đo. P0300 một xy-lanh, mã con P0301 đến P0304 nếu ECM chỉ được đúng máy: tập trung vào xy-lanh đó. P0420 mà xe vẫn kéo bình thường: chưa phải đứt láp, nhưng không được bỏ qua vì khí thải và vì tắc xúc tác về sau sẽ làm yếu máy.

Không có trong bài này: cách làm đèn tắt giả hoặc cách qua mặt kiểm tra khí thải.

## 8. Interview

1. Freeze frame dùng để làm gì?
2. P0300 chưa chứng minh điều gì?
3. P0420 nằm trên đường nào?
4. P0171 nghĩa là nghèo hay giàu?
5. Xóa mã có phải đã sửa không?
6. Đèn ABS và đèn máy có cùng một hộp không?
7. Xăng lọt lâu ngày hại cụm nào trên đường xả?
8. UDS khác một mã P ở mức nào?

## 9. Quiz

Quiz gắn ba mã vào đúng đoạn của chuỗi.

## 10. Summary

- Đèn máy đòi một mã và một bối cảnh.
- P0300 là cháy. P0420 là xúc tác. P0171 là hỗn hợp nghèo.
- Freeze frame chọn lúc lỗi xảy ra.
- Xóa mã không thay chi tiết hỏng.
- Đọc mã xong vẫn phải đo.
