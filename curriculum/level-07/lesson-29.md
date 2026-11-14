# Lesson 29 — Giải trí

Màn hình là máy tính của người ngồi, không phải máy tính của sự cháy. Nhớ đường ranh giới đó thì hết nửa số chẩn đoán sai.

## 1. Concept

`Infotainment – giải trí` gồm đầu máy, màn hình, âm thanh, bản đồ và đường nối điện thoại. Nó được phép xem một số tín hiệu xe. Nó không được lệnh cho kim phun.

## 2. Architecture

Đầu máy nối màn hình và loa, có khi qua một tầng khuếch đại riêng. `Apple CarPlay` và `Android Auto` đưa giao diện điện thoại lên màn hình qua cáp hoặc không dây nếu đời xe hỗ trợ. Gateway đứng giữa đầu máy và CAN điều khiển.

Ăng-ten định vị có thể của xe hoặc của chính điện thoại khi đang dùng CarPlay. Hai nguồn bản đồ không phải một.

## 3. Components

Cáp USB có loại chỉ sạc. CarPlay cần dây dữ liệu. Quyền trên điện thoại cũng chặn kết nối dù cáp đúng. Loa từng cửa đi cùng bó dây cửa đã nói ở bài nội thất.

Một số xe hiện tốc độ và nhiệt trên màn hình. Đó là bản sao để xem, lấy từ mạng, không phải cảm biến riêng của đầu máy.

## 4. Flow

Điện thoại xác nhận kết nối, đầu máy nhường một vùng màn hình, âm thanh đi ra loa. Khi người lái mở bản đồ, vị trí có thể đến từ điện thoại. Tốc độ xe nếu được hiện thì đã qua gateway, chỉ đọc. Không có khung ghi từ ứng dụng bản đồ tới ECM.

## 5. Real-world Example

City cắm điện thoại, có sạc, không hiện CarPlay: thử cáp dữ liệu và xem bản xe có tính năng không. Một số đời chỉ có màn hình cơ và không có CarPlay. City mất tiếng một bên, màn hình vẫn chỉ đường: nghĩ loa hoặc dây cửa, không nghĩ hết vệ tinh.

## 6. Comparison

Android Auto không phải hệ điều hành đang tính góc lửa, dù tên có chữ Android. Một đầu xe chạy Android vẫn là IVI. ECM vẫn là firmware thời gian thực ở bài phần mềm. Giọng nói điều khiển điện thoại cũng dừng ở đầu máy.

## 7. Failure

Màn hình đen: nguồn đầu máy, cầu chì, hoặc đầu máy treo. Máy nổ và trợ lực vẫn nhẹ thì đừng nạp lại ECM. Một kênh loa im: dây hoặc tầng khuếch đại. Mất CarPlay sau khi cập nhật điện thoại: lệch phiên bản, không phải hết xăng. Không dùng màn hình giải trí thay giắc OBD để kết luận mã máy.

## 8. Interview

1. CarPlay có mở kim phun không?
2. Cáp sạc được nhưng không có dữ liệu thì thiếu gì?
3. Gateway cho đầu máy làm gì và không cho làm gì?
4. Loa một bên im thuộc đường nào?
5. Bản đồ trên điện thoại và bản đồ gắn xe khác nguồn nào?
6. Màn hình đứng, máy vẫn kéo, bạn reset cụm nào?
7. Vì sao màn hình không thay máy chẩn đoán?
8. Android trên đầu xe có phải ECM không?

## 9. Quiz

Quiz giữ ranh giới giữa giải trí và điều khiển.

## 10. Summary

- Màn hình là giao diện. ECM là cháy.
- CarPlay và Android Auto là đường của điện thoại.
- Gateway chỉ cho xem một số tín hiệu.
- Loa, cáp và nguồn đầu máy là các hỏng riêng.
- Máy vẫn nổ thì đừng sửa ECM vì màn hình.

## Ôn level 7

Ghế, đèn, kính và gương là thân xe. Màn hình và điện thoại là một máy tính khách. Cả hai ngồi trong cabin nhưng không tạo mô-men. Khi chúng hỏng cùng lúc với việc không nổ máy, hãy nghĩ tới nguồn và mass chung, không nghĩ chúng đã trở thành bugi.
