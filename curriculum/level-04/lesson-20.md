# Lesson 20 — Cảm biến máy xăng

ECM chỉ tính được nếu nó đo được. Bài này gọi tên các cảm biến hay gặp và việc ECM dùng số đó để làm gì. Không phải mọi City có đủ bộ này.

## 1. Concept

Cảm biến đổi một đại lượng vật lý thành tín hiệu. Sai tín hiệu làm ECM ra lệnh sai dù phần cơ vẫn lành.

## 2. Architecture

Khí: `MAF` hoặc `MAP`, và cảm biến vị trí bướm ga. Nhịp: cảm biến trục khuỷu và trục cam. Kết quả cháy: cảm biến ô-xy. Nhiệt: cảm biến nước làm mát. Bảo vệ: cảm biến kích nổ.

## 3. Components

Cảm biến khuỷu thường là mốc bắt buộc để có lửa. Cảm biến cam giúp biết thì nào của chu trình hai vòng. Cảm biến nước của ECM có thể khác cảm biến làm kim taplo. Kim chỉ nóng không chứng minh ECM cũng nghĩ máy đã nóng.

Ô-xy trước xúc tác phục vụ chỉnh xăng. Ô-xy sau xúc tác, nếu có, phục vụ việc xem xúc tác.

## 4. Flow

Lúc lạnh, ECT báo lạnh, ECM thêm xăng và nâng tua chờ. Khi đã nóng, O2 giữ hỗn hợp quanh mức thiết kế. Khi gõ, cảm biến kích nổ bảo ECM lùi lửa. Mất CKP, nhiều máy không biết lúc nào đánh lửa nên không nổ.

## 5. Real-world Example

City hao xăng, tua chờ cao, nhưng kim nhiệt đã lên giữa: có thể ECT của ECM vẫn báo lạnh. City không nổ dù đề khỏe và có xăng: CKP đứt là một ứng viên mạnh, cùng với áp xăng và lửa. Không thay cả giàn cảm biến một lần.

## 6. Comparison

Máy chỉ có MAP thì không có dây nóng MAF để vệ sinh. Máy turbo đặt MAP ở chỗ có áp nén. Số lượng ô-xy phụ thuộc số nhánh xả. Sơ đồ đời xe là danh sách đúng.

## 7. Failure

MAF bẩn: hòa khí lệch, tua không ổn. Ống MAP nứt: đo áp sai. TPS lệch hai kênh: ga giật. CKP mất: không nổ hoặc chết ngẫu nhiên. ECT kẹt lạnh: hao xăng. Kích nổ lỏng: yếu vì ECU lùi lửa, hoặc gõ vì ECU không nghe thấy.

## 8. Interview

1. MAF và MAP đo gì?
2. Vì sao CKP quan trọng với lửa?
3. Cam và khuỷu khác nhau ở chu trình bốn thì thế nào?
4. ECT báo lạnh mãi thì hỗn hợp ra sao?
5. Ô-xy trước xúc tác để làm gì?
6. Kích nổ bảo vệ chi tiết nào?
7. Kim taplo và ECT của ECM có chắc là một cảm biến không?
8. Vì sao không gán đủ cảm biến này cho mọi City?

## 9. Quiz

Quiz hỏi hậu quả khi từng cảm biến nói dối hoặc im.

## 10. Summary

- Cảm biến là đầu vào. Kim và bugi là đầu ra.
- CKP là mốc thời gian của nhiều máy.
- ECT quyết định chiến lược lúc lạnh.
- O2 sửa xăng sau khi đã cháy.
- Danh sách cảm biến là của đời máy, không của cả dòng xe.
