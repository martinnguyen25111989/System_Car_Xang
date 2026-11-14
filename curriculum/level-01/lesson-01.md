# Lesson 01 — Xe xăng hoạt động thế nào

Xe ví dụ xuyên suốt khóa này là **Honda City 1.5**: máy xăng hút khí tự nhiên, dẫn động cầu trước. Số liệu bên dưới là mức điển hình của nhiều đời City, và đổi theo năm sản xuất cũng như thị trường. Một đời City không phải bản vẽ của mọi ô tô xăng.

## 1. Concept

Một chiếc xe xăng là một hệ thống đổi năng lượng hóa học trong xăng thành lực đẩy tại mặt đường.

Chuỗi ngắn nhất:

1. Người lái nhấn ga.
2. ECU biết người lái muốn thêm lực.
3. Máy đốt xăng với không khí và tạo mô-men quay.
4. Hộp số và vi sai đưa mô-men đó tới bánh.
5. Lốp bám đường, xe tiến.

`Torque – mô-men` là độ mạnh của chuyển động quay. Máy không “đẩy xe” trực tiếp. Máy làm quay trục. Bánh xe và mặt đường đổi chuyển động quay đó thành lực đẩy xe đi tới.

Năm luồng chạy **cùng lúc**, không phải năm bước xếp hàng:

- Năng lượng: xăng thành công.
- Cơ khí: mô-men từ máy ra bánh.
- Điện 12V: ắc quy và máy phát nuôi các hộp điện.
- Dữ liệu: cảm biến báo tin, ECU ra lệnh.
- Nhiệt: phần năng lượng không thành công phải được đưa ra ngoài.

Nếu bạn đang nghĩ theo kiến trúc phần mềm: bàn đạp ga là một yêu cầu, ECU là service điều khiển, kim phun và bướm ga là actuator, dây mạng trong xe là message bus. Phần mềm không tạo ra mô-men. Nó chỉ phối hợp thời điểm phun xăng và đánh lửa. Năng lượng thật vẫn nằm trong xăng.

## 2. Architecture

Sơ đồ dưới đây là xương sống của xe xăng cầu trước. Các bài sau sẽ gắn thêm chi tiết vào đúng các hộp này.

```
Người lái
   │  chân ga, phanh, vô-lăng
   ▼
Bàn đạp / vô-lăng
   │  tín hiệu cảm biến
   ▼
ECU  ←—— ắc quy 12V
   │  lệnh phun xăng, lửa, bướm ga
   ▼
Máy xăng  ←—— bình xăng + khí nạp
   │  mô-men trên trục khuỷu
   │  nhiệt ra két nước và ống xả
   ▼
Hộp số
   ▼
Vi sai (nằm trong hộp số trên xe cầu trước)
   ▼
Trục láp → bánh trước
   ▼
Mặt đường
```

Ba lớp nằm cạnh nhau, đừng trộn:

- `Mechanical – cơ khí`: piston, trục, bánh răng, lốp.
- `Electrical – điện`: ắc quy, dây, máy đề, bugi.
- `Electronic / software – điện tử và phần mềm`: cảm biến, ECU, chương trình điều khiển.

Thân xe (`body – thân vỏ`) và khung (`chassis – khung gầm`) giữ các cụm này đúng chỗ và chở người. Bài kiến trúc sẽ tách chúng. Hôm nay chỉ cần thấy năng lượng đi đường nào.

## 3. Components

| Bộ phận | Thuật ngữ | Việc của nó trong bài này |
|---|---|---|
| Người lái | Driver | Đưa ý định đi, dừng, rẽ |
| Bàn đạp ga | Accelerator pedal | Báo mức lực người lái muốn |
| Ắc quy | 12V battery | Nuôi ECU, đánh lửa, máy đề |
| ECU | Engine Control Unit | Đọc cảm biến, ra lệnh cho máy |
| Bình xăng | Fuel tank | Chứa năng lượng hóa học |
| Máy xăng | Gasoline engine | Đốt xăng, tạo mô-men quay |
| Hộp số | Transmission | Đổi tỉ số vòng quay cho hợp tốc độ xe |
| Vi sai | Differential | Cho hai bánh dẫn động quay khác tốc độ khi cua |
| Bánh xe | Wheel and tire | Đổi mô-men thành lực tại mặt đường |
| Két nước | Radiator | Đưa nhiệt thừa ra không khí |
| Mặt đường | Road | Tạo ma sát với lốp |

Trên City và phần lớn xe cầu trước, hộp số và vi sai nằm chung một cụm phía trước, gọi là `transaxle`. Xe dẫn động cầu sau tách vi sai xuống cầu sau. Nhìn capô một chiếc sedan không đủ để kết luận bánh nào đang nhận lực.

## 4. Flow

### Năng lượng

Xăng nằm trong bình, thường dưới hàng ghế sau. Bơm đưa xăng lên máy. Trong xy-lanh, xăng trộn với không khí và cháy. Khí giãn nở đẩy piston. Thanh truyền làm quay trục khuỷu. Tại đây năng lượng hóa học đã thành công cơ học.

Một lít xăng chứa nhiều năng lượng hơn một ắc quy 12V rất nhiều. Ắc quy không phải nguồn kéo xe xăng.

### Cơ khí

Mô-men trên trục khuỷu đi vào hộp số. Hộp số đổi tốc độ quay. Vi sai chia lực ra hai bánh trước qua hai `CV axle – trục láp`. Lốp đẩy mặt đường về phía sau, mặt đường đẩy xe về phía trước.

### Điện 12V

Ắc quy khoảng 12 volt nuôi ECU, bơm xăng và hệ đánh lửa để máy bắt đầu cháy. Khi máy đã quay, `alternator – máy phát` kéo bằng dây đai của máy và sạc lại ắc quy. Hết điện 12V thì xe có thể không đề được dù bình xăng vẫn đầy.

### Dữ liệu

Trên các đời City gần đây, bàn đạp ga là cảm biến, không phải dây kéo. Tín hiệu “chân nhấn bao nhiêu” vào ECU. ECU quyết định độ mở `throttle – bướm ga`, thời gian mở kim phun và thời điểm bugi đánh lửa. Một số xe xăng cũ vẫn dùng dây ga cơ khí. Đó là kiến trúc khác, không phải lỗi của sơ đồ này.

### Nhiệt

Cháy tạo nhiệt. Chỉ một phần thành công trên trục khuỷu. Phần còn lại theo nước làm mát ra két nước trước đầu xe, và theo khí cháy ra ống xả phía sau. Xe nào cũng phải thải nhiệt này khi đang chạy, kể cả xe còn tốt.

Bật từng lớp màu trên sơ đồ bên cạnh. Mỗi màu là một đường, không phải một bước thời gian.

## 5. Real-world Example

Lấy Honda City 1.5 làm xe để chỉ vào.

- Máy xăng 4 xy-lanh, khoảng 1,5 lít, hút khí tự nhiên. Nhiều bản đời mới có công suất cỡ trên dưới 120 mã lực và mô-men khoảng 145 Nm. Con số đổi theo đời xe và thị trường.
- Dẫn động hai bánh trước.
- Nhiều đời bán tại Việt Nam dùng hộp số vô cấp `CVT`. Một số đời hoặc một số thị trường có số sàn hay số tự động có cấp.
- Bình xăng khoảng 40 lít trên nhiều đời. Đó là sức chứa điển hình, không phải thông số của mọi phiên bản.
- Điện điều khiển là mạch 12V. Không có pin cao áp kéo bánh.

Khi bạn nhấn ga trên City: cảm biến bàn đạp báo ECU, ECU tăng khí và xăng, máy tạo thêm mô-men, CVT đổi tỉ số, hai trục láp quay hai bánh trước. Két nước và ống xả làm việc song song, dù bạn không nhìn thấy.

Mazda 3 hay một xe tăng áp sẽ khác City ở cách nạp khí. Bài turbo sẽ đặt hai kiểu cạnh nhau. Đừng lấy đường nạp của City làm đường nạp của mọi xe xăng.

## 6. Comparison

Bài so sánh kiến trúc sẽ đi đủ bốn họ xe. Ở đây chỉ cần một hàng để khỏi lẫn nguồn năng lượng.

| | Xe xăng | HEV | PHEV | BEV |
|---|---|---|---|---|
| Năng lượng mang theo | Xăng | Xăng và pin nhỏ | Xăng và pin cắm sạc | Pin |
| Khi nhấn ga | ECU đốt thêm xăng | Máy, motor, hoặc cả hai tùy tình huống | Có thể chỉ motor nếu pin còn | Motor điện tạo mô-men |
| Hộp số | Có, nhiều kiểu | Tùy thiết kế hãng | Tùy thiết kế hãng | Thường chỉ bánh răng giảm tốc |

HEV, PHEV và xe điện không dùng chung một sơ đồ. Toyota, Honda và Hyundai bố trí motor khác nhau. Bảng trên là họ kiến trúc, không phải bản vẽ của một hãng.

Điểm giữ lại cho xe xăng: người lái vẫn ra lệnh bằng bàn đạp, nhưng năng lượng ra bánh đến từ sự cháy, không đến từ pin kéo.

## 7. Failure

Đọc triệu chứng bằng cách hỏi “chuỗi đứt ở đoạn nào”.

- **Không nổ máy.** Cháy chưa bắt đầu. Nhìn xăng, lửa, khí, ắc quy, máy đề và tín hiệu ECU. Bình xăng đầy vẫn vô nghĩa nếu không có điện cho bugi hoặc cho bơm.
- **Nổ nhưng không chạy.** Cháy đã có. Nhìn hộp số, vi sai, trục láp, lốp. Máy gào mà xe đứng yên là mô-men không sang được bánh.
- **Đạp ga không phản ứng.** Nhìn cảm biến bàn đạp, bướm ga và ECU trước khi tháo máy. Đây là đứt luồng dữ liệu.
- **Kim nhiệt lên cao.** Luồng nhiệt không thoát. Nhìn nước làm mát, két, quạt. Đây chưa phải lỗi hộp số.

Ba ca đầu dễ bị gom thành “xe hỏng”. Chúng nằm ở ba đoạn khác nhau của cùng một chuỗi.

## 8. Interview

Tự trả lời trước khi đối chiếu với phần tóm tắt. Chưa cần tên từng cảm biến.

1. Năng lượng trong bình xăng thuộc dạng nào trước khi thành chuyển động của xe?
2. Ắc quy 12V và bình xăng mỗi thứ nuôi loại việc gì?
3. ECU nằm ở đâu trong chuỗi từ bàn đạp ga tới bánh xe?
4. Vì sao máy xăng cần hộp số, thay vì nối thẳng trục máy ra bánh?
5. Vi sai giải quyết chuyện gì khi xe quay vòng?
6. Luồng dữ liệu và luồng cơ khí khác nhau ở chỗ nào khi người lái nhấn ga?
7. Trên City cầu trước, mô-men tới bánh nào? Xe cầu sau thì khác ở đâu?
8. Máy nổ nhưng xe không lăn. Bạn kiểm tra cụm nào trước, và vì sao không bắt đầu từ két nước?

## 9. Quiz

Năm câu trắc nghiệm và ba câu tự luận nằm ở [cuối trang](#quiz). Làm xong phần đọc và sơ đồ trước khi mở đáp án.

Câu tự luận chỉ cần đúng đoạn của chuỗi. Chưa cần quy trình tháo lắp.

## 10. Summary

- Xe xăng đổi năng lượng trong xăng thành mô-men, rồi thành lực tại mặt đường.
- Chuỗi điều khiển: người lái → bàn đạp → ECU → máy → hộp số → vi sai → bánh → đường.
- Năm luồng năng lượng, cơ khí, điện 12V, dữ liệu và nhiệt chạy cùng lúc.
- Ắc quy 12V nuôi hệ điều khiển. Nó không phải nguồn kéo xe.
- Trên xe cầu trước, vi sai nằm trong cụm hộp số và hai bánh trước nhận lực.
- Nhiệt của sự cháy phải ra két nước và ống xả trong lúc xe chạy bình thường.
- Triệu chứng chỉ có ích khi đặt được nó vào đúng đoạn của chuỗi.
- City 1.5 là ví dụ cầu trước, hút khí tự nhiên. Nó không phải kiến trúc của mọi ô tô.
