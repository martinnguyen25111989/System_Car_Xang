# Lesson 19 — Bản đồ ECU

Xe hiện đại không có một máy tính duy nhất. Mỗi miền có một hộp. Các hộp nói chuyện với nhau. ECM là hộp của máy xăng.

## 1. Concept

Một vòng điều khiển gồm cảm biến, hộp quyết định, và cơ cấu chấp hành. Bàn đạp ga là ví dụ sạch nhất.

## 2. Architecture

`ECM – hộp máy` tính xăng, lửa và bướm ga. `TCU – hộp số` chọn tỉ số. `BCM – hộp thân xe` lo đèn, khóa, gạt mưa. Hộp ABS lo dầu phanh từng bánh. Hộp túi khí lo bung túi. Tên viết tắt có thể khác trên sơ đồ hãng, việc thì vẫn tách miền.

## 3. Components

Cảm biến bàn đạp thường có hai kênh để đối chiếu. Mô-tơ bướm ga là chấp hành. Cảm biến vị trí bướm ga báo lại cho ECM. Kim phun và mô-bin là chấp hành đi cùng lệnh ga.

Không mở hộp túi khí và không đo dây túi bằng cách cấp điện. Đó là thiết bị một lần.

## 4. Flow

Chân nhấn. Tín hiệu vào ECM. ECM lệnh mô-tơ ga, kim và lửa. TCU nghe tua máy trên mạng để đổi tỉ số. BCM không nằm trong vòng này. Nếu chỉ hỏng đèn cửa, đừng bắt đầu bằng ECM.

## 5. Real-world Example

City ga điện tử: rút giắc bàn đạp thì ECM mất yêu cầu và thường đưa máy về ga hạn chế hoặc không tăng tốc. Rút giắc màn hình thì mất bản đồ, máy vẫn có thể nhận ga. Hai giắc, hai miền.

## 6. Comparison

Xe cũ dùng dây kéo bướm ga thì vòng dữ liệu mỏng hơn, một phần là cơ khí. Xe điện thay ECM cháy bằng bộ điều khiển motor. Ý “yêu cầu, quyết định, chấp hành” vẫn còn. Phần cứng thì khác và không thuộc City.

## 7. Failure

Nhiều đèn cùng sáng sau khi tháo bình: nghĩ nguồn và mass chung trước khi kết luận năm hộp cùng chết. Một đèn túi khí: miền túi khí. Giật số nhưng máy êm: TCU, dầu, hoặc dữ liệu tua. Ga không theo chân: bàn đạp, bướm ga, ECM.

## 8. Interview

1. Kể năm hộp và mỗi hộp một việc.
2. Vòng ga điện tử có những khâu nào?
3. Vì sao hai kênh bàn đạp?
4. BCM có phun xăng không?
5. Chấp hành khác cảm biến thế nào?
6. Màn hình đen có phải ECM chết không?
7. TCU cần biết gì từ máy?
8. Nhiều đèn cùng sáng thì giả thuyết nào đứng trước?

## 9. Quiz

Quiz tách miền hộp và thứ tự vòng ga.

## 10. Summary

- Mỗi miền một hộp, nối bằng mạng.
- ECM là trung tâm cháy của xe xăng.
- Ga điện tử là vòng kín: đo, lệnh, đo lại.
- Đèn báo thuộc đúng hộp của đèn đó.
- Nguồn chung hỏng thì nhiều hộp cùng im.
