# Lesson 30 — Kiến trúc cả xe

Đây là lúc ghép các bài trước thành một City xăng cầu trước. Không thêm miền mới. Chỉ đặt mỗi miền vào đúng chỗ.

## 1. Concept

Một sơ đồ đủ dùng của xe xăng là: người lái ra lệnh, ECM phối hợp cháy, máy tạo mô-men, transaxle đưa ra hai bánh trước, nhiệt thoát ở mũi xe, điện 12V nuôi các hộp, mạng mang dữ liệu. Không có pin cao áp.

## 2. Architecture

Nhìn từ mũi xe về đuôi trên một sedan điển hình:

- Trước cùng: két nước và dàn nóng.
- Khoang máy: máy bốn xy-lanh hút khí tự nhiên, hộp số và vi sai, ắc quy, ECM.
- Giữa: cabin, vô-lăng, bàn đạp, màn hình.
- Dưới ghế sau: bình xăng trên nhiều đời.
- Dưới sàn: ống xả và xúc tác.
- Bánh trước: kéo, lái, phanh chính.
- Bánh sau: phanh, treo, không nhận mô-men trên FWD.

Các hộp ABS, BCM, túi khí và đồng hồ nằm trong cabin hoặc ngay dưới nó, nối bằng CAN qua gateway nếu miền giải trí cần dữ liệu.

## 3. Components

ECM là trung tâm powertrain. Nó không điều khiển chốt cửa. BCM không tính góc lửa. Đầu máy không phát lệnh phun. Ắc quy 12V không kéo xe. CVT trên nhiều đời City nằm cạnh máy, không nằm ở cầu sau.

Con số mã lực, dung tích bình khoảng 40 lít, và kiểu số vẫn là mức điển hình, đổi theo đời. Sơ đồ miền thì ổn định hơn con số.

## 4. Flow

Nhấn ga: dữ liệu bàn đạp vào ECM, điện 12V đã nuôi ECM và bơm, xăng từ bình lên kim, khí qua bướm ga, cháy trong máy, mô-men qua CVT và vi sai ra hai láp, lốp đẩy đường. Cùng lúc nước mang nhiệt ra két và khí xả ra đuôi xe. ABS nghe tốc độ bánh phòng khi phải phanh. Màn hình chỉ nhận một bản sao tốc độ nếu được phép.

## 5. Real-world Example

Đứng trước một City và chỉ tay: mũi là nhiệt, nắp ca-pô là powertrain, ghế lái là lệnh, dưới ghế sau là năng lượng, bánh trước là chỗ lực xuất hiện. Chỉ đúng chỗ trước khi mở máy chẩn đoán. Nếu xe trước mặt là dẫn động sau, bạn chỉ sai từ bước transaxle. Nhìn láp trước hay các-đăng trước khi kết luận.

## 6. Comparison

HEV thêm motor và pin, có thể vẫn dùng 12V và vẫn có máy xăng. BEV bỏ bình xăng và ECM cháy. Những sơ đồ đó đã được giới hạn ở L03. Đừng vẽ chúng đè lên hình City này rồi tưởng mọi Honda đều vậy.

## 7. Failure

Mất ECM: mất phối hợp cháy dù xăng còn và bình 12V còn. Mất transaxle: cháy còn, xe không đi. Mất két: cháy còn cho đến khi nhiệt phá máy. Mất màn hình: mất thông tin, kéo còn. Sơ đồ này là cách chọn miền trước khi chọn phụ tùng.

## 8. Interview

1. Đặt năm cụm từ mũi tới đuôi xe.
2. ECM khác BCM trên sơ đồ này thế nào?
3. Vì sao không có pin cao áp?
4. Bánh nào nhận mô-men?
5. Hai vòng nhiệt nào cùng đứng ở mũi xe nhưng không chung chất lỏng?
6. Gateway nằm giữa những miền nào?
7. Một City dẫn động sau có tồn tại trong khóa này không?
8. Mất màn hình đứt luồng nào, còn luồng nào?

## 9. Quiz

Quiz kiểm tra bạn có đưa nhầm miền hybrid hoặc nhầm bánh kéo vào sơ đồ City không.

## 10. Summary

- City của khóa: xăng, NA, FWD, ECM, 12V, không pin kéo.
- Mũi là nhiệt, giữa là người, dưới ghế sau là xăng, bánh trước là lực.
- Mỗi hộp một miền.
- Năm luồng vẫn chạy cùng lúc trên sơ đồ này.
- Chỉ đúng chỗ trên xe trước khi thay chi tiết.
