# Lesson 24 — Phần mềm ECU

Phần mềm trên xe không phải một ứng dụng. Có phần mềm bị hạn thời gian từng mili giây, và có phần mềm vẽ bản đồ. Trộn hai lớp sẽ sửa nhầm chỗ.

## 1. Concept

`Firmware` là chương trình gắn với một hộp. Nó quyết định hộp tin cảm biến nào và ra lệnh gì. Đổi firmware là đổi hành vi của xe, không phải đổi hình nền.

## 2. Architecture

Trong hộp điều khiển thường có `RTOS – hệ điều hành thời gian thực` để việc lửa và việc truyền thông có hạn thời gian. `AUTOSAR` là một cách nhiều hãng tổ chức phần mềm đó thành lớp, tách ứng dụng khỏi mạch. Không phải mọi hộp City đều dùng cùng một lớp này.

Đầu giải trí có thể chạy Linux hoặc Android. Nó đứng sau `gateway`. `OTA` là cập nhật từ xa, chỉ khi đời xe có đường đó.

## 3. Components

Hiệu chỉnh của ECM gồm các bảng xăng và lửa theo tải và tua. Bản hiệu chỉnh phải đúng mã máy và đúng thị trường. Cùng tên City không bảo đảm cùng bản.

An toàn chức năng, ở mức này, nghĩa là khi dữ liệu không còn đáng tin thì hộp về một trạng thái hạn chế. Ví dụ hai kênh bàn đạp lệch nhau thì ga không được mở theo kênh cao hơn. An ninh mạng, ở mức này, nghĩa là không phải nút nào cũng được ghi vào hộp phanh. Không đi vào cách tấn công.

## 4. Flow

Cảm biến vào, tác vụ RTOS đọc, ứng dụng tính, driver ra lệnh kim và lửa. Song song, một tác vụ khác phát khung CAN. Trên màn hình, một ứng dụng khác vẽ bản đồ và gửi hình ra loa. Gateway là hàng rào giữa hai thế giới đó.

## 5. Real-world Example

City cập nhật phần mềm tại xưởng vì ga không đều: đó là bản ECM đúng mã xe. Điện thoại cập nhật ứng dụng bản đồ: đó là điện thoại hoặc đầu giải trí, không phải bản lửa. Nếu một đại lý nói cần “nạp lại hộp” , câu hỏi đúng là hộp nào và mã bản nào.

## 6. Comparison

Máy chủ web có thể chậm một giây rồi vẫn đúng. ECM đánh lửa muộn một thì là sai. Vì vậy RTOS của ECM không được thay bằng hệ điều hành của điện thoại. Android trên một số đầu xe là có thật, và nó vẫn không tính góc lửa.

## 7. Failure

Treo màn hình: khởi động lại đầu giải trí. Treo ga hoặc đèn máy sau một lần nạp: đúng miền ECM, cần đúng bản. Mất điện giữa lúc nạp có thể làm hộp không khởi động. OTA thất bại trên xe không hỗ trợ OTA thì đừng tìm sóng điện thoại để sửa bugi.

Ga hạn chế sau khi cảm biến bàn đạp lỗi là trạng thái an toàn, không phải hết xăng.

## 8. Interview

1. Firmware khác ứng dụng bản đồ thế nào?
2. RTOS giải quyết hạn nào?
3. AUTOSAR là tầng tổ chức nào?
4. Gateway bảo vệ miền nào?
5. OTA có trên mọi City không?
6. Vì sao bản phần mềm phải đúng mã máy?
7. Hai kênh bàn đạp lệch thì trạng thái an toàn là gì?
8. Màn hình Android treo có nghĩa ECM treo không?

## 9. Quiz

Quiz xếp đúng tầng phần mềm và đúng miền.

## 10. Summary

- ECM chạy phần mềm có hạn thời gian. Màn hình thì không.
- AUTOSAR là cách tổ chức, không phải một phụ tùng thay được tại cửa hàng tạp hóa.
- Gateway ngăn tiện nghi điều khiển cháy và phanh.
- Cập nhật phải đúng hộp và đúng đời xe.
- Trạng thái hạn chế là thiết kế an toàn, không phải mẹo xóa lỗi.

## Ôn level 5

Xe là các nút trên CAN và LIN, ngăn bởi gateway. OBD cho bạn mã của những gì ECM đã thấy. Phần mềm quyết định ECM làm gì với số đo đó. Ba lớp này đủ để một người viết phần mềm đọc xe mà không cần tưởng một máy chủ nằm dưới nắp ca-pô.
