# Lesson 03 — Các loại xe

Khóa này đi trên xe xăng. Bài này chỉ để không đọc nhầm một xe khác thành City, và không lấy sơ đồ một hãng hybrid làm sơ đồ mọi xe.

## 1. Concept

Người lái nhấn ga là một yêu cầu mô-men. Họ xe khác nhau ở chỗ năng lượng nằm đâu và bộ phận nào tạo mô-men.

## 2. Architecture

Bốn họ, ở mức kiến trúc:

| Họ | Năng lượng chính để đi | Ai tạo mô-men kéo |
| --- | --- | --- |
| `ICE – đốt trong` | Xăng hoặc dầu | Máy đốt |
| `HEV – hybrid` | Xăng, điện tự tạo trên xe | Máy đốt và motor, theo chiến lược của xe |
| `PHEV – hybrid cắm sạc` | Điện cắm ngoài, rồi xăng | Motor trên một quãng, máy đốt khi pin giảm hoặc khi cần lực |
| `BEV – xe điện` | Pin cao áp | Motor |

City 1.5 của khóa này là ICE xăng. Không có pin cao áp kéo bánh.

## 3. Components

ICE xăng có bình xăng, máy, bugi, hộp số. ICE diesel cũng đốt trong, nhưng cháy bằng nhiệt của khí bị nén và phun dầu. Đừng tìm bugi trên một xe dầu theo sơ đồ City.

HEV và PHEV thêm motor và pin. Kích thước pin và việc có cổng sạc hay không là chỗ tách HEV khỏi PHEV. Vị trí motor là thiết kế của từng hãng.

BEV bỏ đường xăng kéo bánh. Vẫn thường có mạch 12V cho đèn và các hộp phụ. Mạch đó không phải pin kéo.

## 4. Flow

Nhấn ga trên ICE: cảm biến bàn đạp, ECU, thêm khí và xăng, cháy, mô-men ra bánh.

Nhấn ga trên HEV: cùng một yêu cầu, nhưng xe có thể giao cho motor, cho máy xăng, hoặc cả hai. Luật giao việc không giống nhau giữa các hãng.

Nhấn ga trên BEV: yêu cầu tới bộ điều khiển motor, năng lượng ra từ pin cao áp. Không có thì nạp–nén–nổ–xả.

PHEV có thể chạy như BEV một đoạn rồi như HEV. Quãng đó đổi theo đời xe, nhiệt độ và cách lái. Không có một con số cho mọi PHEV.

## 5. Real-world Example

City 1.5: máy xăng hút khí tự nhiên, cầu trước, không cổng sạc. Một City hybrid đời khác, nếu thị trường có bán, là xe khác kiến trúc. Đừng gọi mọi xe mang huy hiệu Honda là cùng một sơ đồ.

Khi gặp một xe cắm sạc nhưng vẫn có nắp bình xăng, nghĩ tới PHEV trước khi nghĩ tới BEV.

## 6. Comparison

`Mild hybrid – hybrid nhẹ` chỉ thêm một máy điện nhỏ hỗ trợ đề và phụ tải. Nó không biến City thành xe điện. Fuel cell dùng hydro tạo điện cho motor. Cả hai không thuộc lộ trình chính của khóa.

Phanh tái sinh có trên nhiều HEV, PHEV và BEV: motor thành máy phát khi nhả ga. Xe xăng thuần không có nguồn kéo đó. Bài phanh sẽ nhắc một câu, không đi sâu.

## 7. Failure

Hết xăng làm ICE chết. Hết pin cao áp làm BEV hết khả năng đi, dù mạch 12V còn có thể bật đèn. PHEV có thể còn máy xăng. Chẩn đoán “không đi được” phải hỏi xe thuộc họ nào trước.

Không dùng mã sự cố của pin xe điện để đọc một City xăng.

## 8. Interview

1. Bốn họ xe khác nhau ở nguồn năng lượng nào?
2. Nhấn ga trên ICE và trên BEV, câu chuyện đổi từ bước nào?
3. HEV và PHEV tách nhau bằng dấu hiệu gì mà người dùng nhìn thấy?
4. Vì sao diesel không dùng sơ đồ bugi của bài này?
5. Ắc quy 12V còn tồn tại trên BEV để làm gì, ở mức kiến trúc?
6. Vì sao không lấy một hãng hybrid làm chuẩn mọi HEV?
7. City 1.5 của khóa này không có cụm nào?
8. Mild hybrid có phải BEV không?

## 9. Quiz

Quiz hỏi nguồn năng lượng và bộ tạo mô-men. Chưa cần tên linh kiện điện.

## 10. Summary

- Bàn đạp là yêu cầu. Nguồn năng lượng và bộ tạo mô-men mới làm nên họ xe.
- City 1.5 trong khóa này là ICE xăng cầu trước.
- Diesel là ICE khác cách cháy.
- HEV, PHEV, BEV chỉ được so ở mức kiến trúc.
- Không lấy sơ đồ một hãng làm sơ đồ mọi xe hybrid hoặc mọi xe điện.
