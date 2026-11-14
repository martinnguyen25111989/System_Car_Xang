# Lesson 27 — ADAS

ADAS là các chức năng hỗ trợ dựa trên cảm biến nhìn quanh xe. Chuỗi luôn là: nhìn, ghép, quyết định, làm. Người lái vẫn ở trong vòng trên xe phổ thông.

## 1. Concept

`Sensor fusion – hợp nhất cảm biến` lấy điểm mạnh của từng loại mắt vì không loại nào đủ cho mọi thời tiết và mọi khoảng cách.

## 2. Architecture

Camera thấy hình và vạch, kém khi tối hoặc ngược nắng. Radar đo khoảng cách và tốc độ tương đối, kém khi cần đọc hình. Siêu âm đo khoảng rất gần lúc lùi. `LiDAR` đo bằng laser, không phải đồ chuẩn của City và của sedan xăng phổ thông.

Phần mềm ghép các nguồn, chọn cảnh báo hoặc can thiệp, rồi nhờ phanh, ga hoặc trợ lực lái.

Mức tự lái thường được nói từ 0 đến 5. Mức 0 là người lái làm hết, xe có thể chỉ cảnh báo. Mức 1 và 2 là hỗ trợ, người lái phải giám sát. Mức cao hơn không phải cấu hình sedan đang bán đại trà. Đừng gọi giữ làn của một bản City là xe tự lái.

## 3. Components

Camera thường ở phía trên kính chắn gió. Radar phía trước nằm sau emblem hoặc trong cản, tùy xe. Siêu âm là các mắt tròn trên cản. Sau khi thay kính hoặc sau va chạm, các mắt này có thể cần hiệu chỉnh lại.

## 4. Flow

Camera thấy vạch. Bộ giữ làn quyết định xe đang lệch. EPS nhận một mô-men trợ lực nhỏ. Nếu vạch mất, quyết định là bỏ cuộc và báo cho người lái. Radar thấy xe trước chậm lại. Ga thích ứng giảm mô-men hoặc nhờ phanh. Siêu âm thấy tường lúc lùi và chỉ phát còi, thường không phanh trên các bản cơ bản.

## 5. Real-world Example

City bản cao có thể có phanh tự động và camera lùi. City bản thấp hơn có thể chỉ có cảm biến lùi hoặc không có. Cùng một tên xe, khác mắt. Mưa lớn làm camera giữ làn tắt là hệ thống đang thừa nhận nó không thấy, không phải thước lái gãy.

## 6. Comparison

Người lái nhìn và hiểu ngữ cảnh. ADAS nhìn trong tập điều kiện đã được thử. Nó không đổi ý khi công trường đổi làn tạm. Vì vậy mức 2 vẫn cần tay trên vành. So với ABS, ADAS nhìn ra ngoài xe. ABS chỉ nhìn bánh.

## 7. Failure

Kính bẩn: mất giữ làn. Radar lệch sau đâm nhẹ: ga thích ứng phanh nhầm hoặc không thấy xe. Siêu âm bám bùn: còi lùi loạn. Một nguồn trong bộ hợp nhất bị sai có thể kéo quyết định nếu phần mềm không loại được nguồn đó. Sửa bắt đầu từ vệ sinh và hiệu chỉnh, trước khi kết luận hộp.

## 8. Interview

1. Camera, radar, siêu âm mỗi thứ giỏi việc gì?
2. LiDAR có trong sơ đồ City chuẩn không?
3. Bốn khâu của chuỗi ADAS là gì?
4. Mức 2 khác mức 0 thế nào, và ai vẫn phải nhìn đường?
5. Vì sao thay kính có thể làm giữ làn kém?
6. Hợp nhất cảm biến để bù cái gì?
7. Mất vạch thì hệ thống nên làm gì?
8. ADAS khác ABS ở chỗ nhìn vào đâu?

## 9. Quiz

Quiz theo loại cảm biến và theo thứ tự nhìn rồi mới làm.

## 10. Summary

- Nhìn, ghép, quyết định, làm.
- Camera, radar, siêu âm là bộ phổ thông. LiDAR thì không.
- Mức hỗ trợ trên sedan không bỏ người lái.
- Bẩn và lệch cảm biến là hỏng thường gặp.
- Không gọi một chức năng giữ làn là xe tự lái.

## Ôn level 6

Chủ động là tránh va bằng bánh và bằng mắt điện tử. Bị động là đai, túi và vùng móp khi va đã xảy ra. Hai lớp không thay nhau. City có ABS và đai trên các đời đang nói trong khóa. Các mắt ADAS thì phải xem đúng bản xe.
