# Lesson 10 — Đường khí và đường xả

Khí sạch vào và khí đã cháy ra là hai đường. Vài van nối chúng với bình xăng và với cacte. Mỗi van một việc.

## 1. Concept

Máy cần biết mình đang hít bao nhiêu khí, và cần biết khí xả còn thừa ô-xy không, để sửa lượng xăng. Hơi xăng và khí trong cacte không được xả bừa ra ngoài.

## 2. Architecture

Đường nạp: lọc gió, `MAF – đo khối khí` hoặc `MAP – đo áp cổ hút`, bướm ga, cổ hút. Đường xả: cổ xả, cảm biến ô-xy, bộ xúc tác, có thể thêm cảm biến ô-xy sau xúc tác, rồi giảm thanh.

`EGR – tuần hoàn khí xả` đưa một phần khí xả về đường nạp trên những máy có van này. `PCV – thông hơi cacte` đưa khí lọt xuống cacte trở lại đường nạp. `EVAP – hơi xăng` giữ hơi từ bình trong than hoạt tính rồi xả vào máy khi ECU cho phép.

## 3. Components

Không phải mọi City đều có cả MAF lẫn MAP, và không phải mọi máy xăng đều có EGR. Sơ đồ chân giắc của đời xe là tài liệu, không phải trí nhớ của một mẫu sedan.

Nắp bình xăng là một phần của EVAP. Nắp rách hoặc không đúng loại làm hệ thống không giữ được áp thử.

Bộ xúc tác có thể bị tắc thành một nút trên đường xả. Khi đó máy không xả được dù lọc gió còn sạch.

## 4. Flow

Khí đi qua MAF trước khi vào máy thì con số đo là lượng khí sẽ cháy, nếu không có chỗ xì sau đó. Xì cổ hút sau cảm biến làm máy hít thêm khí không được tính, hỗn hợp lệch.

Ô-xy trước xúc tác báo giàu hay nghèo. ECU rút ngắn hoặc kéo dài xung kim. Ô-xy sau xúc tác, nếu có, chủ yếu để xem xúc tác còn chuyển hóa không.

EVAP không đổ xăng lỏng vào ray. Nó chỉ đưa hơi.

## 5. Real-world Example

City đi trong thành phố, nắp bình không kín: có thể sáng đèn máy vì thử nghiệm EVAP thất bại, xe vẫn chạy. Đó không phải cùng một ca với xúc tác tắc, lúc xe hết sức và có thể có tiếng trong bầu xả.

Mùi xăng cạnh hông xe sau khi đổ đầy cũng có thể là hơi thoát ở nắp hoặc ở đường than, chưa chắc kim phun rò trong khoang máy.

## 6. Comparison

Máy turbo đo áp nạp sau máy nén. Chỗ đặt MAP khác máy NA. EGR trên diesel thường nặng việc hơn nhiều máy xăng hiện đại. Một số máy xăng bỏ EGR nhờ phối cam và phun. Đọc đúng mã.

PCV khác EGR: PCV là khí từ cacte, EGR là khí từ ống xả.

## 7. Failure

Lọc gió tắc: đói khí, yếu. MAF bẩn: số đo sai, hao xăng hoặc rung. Ô-xy già: ECU sửa xăng mù, hao xăng, đèn máy. EVAP rò: mùi xăng, đèn máy, đôi khi khó mở nắp bình. PCV tắc: áp cacte tăng, roăng dầu xì, hơi dầu trong ống nạp. Xúc tác vỡ: tiếng lục cục, hết sức.

## 8. Interview

1. MAF và MAP mỗi thứ đo gì?
2. Ô-xy trước xúc tác để làm gì?
3. EVAP giữ chất gì, từ bình nào?
4. PCV thông hơi khoang nào?
5. EGR có mặt trên mọi máy xăng không?
6. Xì gió sau MAF làm hỗn hợp lệch thế nào?
7. Nắp bình xăng liên quan hệ thống nào?
8. Xúc tác tắc nằm trên đường nạp hay đường xả?

## 9. Quiz

Quiz tách đo khí, ô-xy, EVAP, PCV và EGR.

## 10. Summary

- Đường nạp đưa ô-xy vào và được đo.
- Đường xả đưa khí cháy ra và được giám sát.
- EVAP là hơi xăng. PCV là khí cacte. EGR là khí xả quay lại, nếu xe có.
- Cùng một đèn máy có thể là nắp bình hoặc là xúc tác. Triệu chứng đi kèm mới tách được.
- Không có một giàn cảm biến cho mọi đời City.

## Ôn level 2

Từ thân máy và bốn thì, tới đường khí, đường xăng và đường xả. Turbo là biến thể nạp khí, không có trên City NA của khóa. Bước tiếp là đưa mô-men đó ra bánh: hộp số, vi sai và các kiểu dẫn động.
