## HONDA CITY 2024 – COMPLETE VEHICLE ELECTRICAL & ELECTRONIC ARCHITECTURE – ADVANCED LEVEL

# Kiến trúc điện City 2024

Bài này dựng theo poster cắt ngang chiếc City: thân trong suốt, bó dây, bốn lớp, và các hộp dọc theo xe. Mũi xe nằm bên trái trên mô hình 3D.

Poster là sơ đồ học. Tốc độ CAN, dòng đèn, tên cầu chì FL và các điểm G1–G6 **không phải mã trong service manual**. Số chân: **PIN NUMBER NOT VERIFIED**. Màu dây trên hình không phải màu dây Honda. Bản hybrid có pin cao áp khác bài này — **[VERIFY WITH SERVICE MANUAL]**.

## 1. Concept

Bốn lớp, từ dưới lên:

1. Cơ khí: máy, hộp số, thước lái, phanh, cánh gió.
2. Điện: ắc quy, máy phát, cầu chì, rơ-le, mass.
3. Điện tử: ECU và cảm biến.
4. Truyền thông: CAN và LIN.

Một hành động đi hết các lớp: người lái, công tắc hoặc cảm biến, ECU, mạng, cơ cấu, cơ khí, rồi xe phản ứng.

## 2. Architecture

Mở **Xe 3D**. Các hộp đặt theo poster, nhìn nghiêng:

- Mũi xe: ABS/VSA, đèn pha.
- Khoang máy: hộp cầu chì, ắc quy, máy phát, PCM.
- Taplo: EPS, đồng hồ, BCM, màn hình, HVAC.
- Giữa sàn: SRS. Hai cửa có khối riêng trên sơ đồ.
- Đuôi: TPMS và camera. Nóc: anten.

Bấm sáu sơ đồ 2D: **Bốn lớp**, **Các hộp**, **Nguồn**, **Mass**, **Đèn pha**, **Máy**.

Poster vẽ hai CAN: một phía máy (PCM với ABS/VSA, EPS, SRS) và một phía thân (BCM với đồng hồ, điều hòa, màn hình, TPMS, cửa). Tốc độ khoảng 500 kb/s và 125–250 kb/s, LIN khoảng 20 kb/s, đều là **[TYPICAL]**, **[VERIFY]** với đúng xe. Hộp số CVT có thể nằm trong PCM, không chắc là hộp AT riêng.

## 3. Components

Nguồn: ắc quy 12V, máy phát khi máy đã quay, rồi hộp chì khoang máy và hộp chì cabin. Poster ghi điện nạp khoảng 13,5–14,8V. Đó là dải sạc quen, chưa phải thông số City 2024.

Mass trên mô hình là sáu điểm học: G1 máy, G2 hộp số, G3 khung, G4 thân, G5 ECU, G6 cảm biến. Honda không đặt tên mass bằng các chữ này.

## 4. Flow

Bật đèn pha, đúng chuỗi trên poster: công tắc, BCM, mạng hoặc lệnh nội bộ, driver hoặc rơ-le, cầu chì, đèn, mass thân. Dòng 8–12A trên poster là ví dụ đèn sợi đốt. Nhiều City dùng LED, dòng nhỏ hơn. **[VERIFY]**

Điều khiển máy: CKP, CMP, MAP hoặc MAF, bướm ga, nhiệt, ô-xy vào PCM, rồi kim phun, mô-bin, bướm ga điện, VVT và bơm xăng. Cảm biến nào có trên xe là **[VERIFY]**.

## 5. Real-world Example

Tắt từng màu trên mô hình. Nguồn mất thì các hộp tối nhưng hình mass còn. Tắt CAN thì đường tím giữa PCM, ABS, BCM và màn hình biến. Tắt LIN thì đường tới cửa và điều hòa biến. SRS vẫn là hộp riêng: màn hình không ra lệnh bung túi. Không đo dây túi khí.

## 6. Comparison

Cháy một cầu chì làm tối một nhánh. Đứt G4 làm đèn và thân xe yếu trong khi PCM còn có thể nổ. Đứt G6 làm cảm biến đọc trôi dù đèn vẫn sáng. Mất một dây CAN làm nhiều hộp cùng im, khác với một cảm biến đứt.

## 7. Failure

Đo sụt áp mass khi mạch đang kéo dòng. Đo điện áp ắc quy lúc nghỉ và lúc đề. Máy hiện sóng xem CKP và hai dây CAN khi bus thức. Không dùng màu trên mô hình để dò dây. Sách sửa chữa mới có số chân, tên giắc và mã điểm mass.

## 8. Interview

1. Bốn lớp trên poster xếp từ đâu đến đâu?
2. G6 khác G1 ở dòng điện như thế nào?
3. Vì sao dòng 8–12A của đèn pha không được chép vào một chiếc City LED?
4. PCM và BCM trên poster mỗi hộp nói với nhóm nào?
5. SRS có nhận lệnh bung từ màn hình không?

## 9. Quiz

Năm câu dưới trang. Câu đúng phải giữ chữ chưa xác minh khi nói về chân giắc, mã CAN, hoặc tên mass Honda.

## 10. Summary

- Mô hình 3D là poster cắt ngang, mũi xe bên trái.
- Nguồn đỏ và cam, mass sáng, tín hiệu xanh lá, CAN tím, LIN xanh lơ. Đó là màu bài học.
- G1 đến G6 là tên để học cách tách mass, không phải ký hiệu Honda.
- Đối chiếu service manual trước khi đo trên xe.
