# Lesson 09 — Đường xăng

Xăng không tự chảy từ bình vào xy-lanh với lượng đúng. Có một đường áp suất và một lệnh mở kim.

## 1. Concept

Đường xăng đưa nhiên liệu có áp tới kim phun. ECU quyết định kim mở bao lâu. Chỗ xăng được phun thì tùy máy: trước xupap nạp, hoặc thẳng vào xy-lanh.

## 2. Architecture

Thứ tự điển hình: bình, bơm, lọc, ray, kim phun. Bơm của xe phun xăng điện dùng điện 12V. Rơ-le và cầu chì nằm trên đường điện đó. Hơi trong bình thuộc EVAP, không đi chung ống áp với ray.

`Port injection – phun cổng` xịt vào cửa nạp. `Direct injection – phun trực tiếp` xịt vào buồng cháy và cần bơm cao áp vì phải thắng áp lúc nén. Một số máy đời mới có cả hai bộ kim.

## 3. Components

Bơm thường nằm trong bình. Lọc có thể nằm trong cụm bơm hoặc trên đường ống, tùy đời. Ray là ống chia cho các kim. Cảm biến áp, nếu có, báo cho ECU biết áp có đúng dải không.

Áp của phun cổng thường thấp hơn nhiều so với phun trực tiếp. Số bar là của từng đời máy. Không chép một số từ xe này sang xe kia.

## 4. Flow

Vặn khóa điện, bơm thường chạy một lúc để tạo áp trước khi đề. Khi máy đã nổ, bơm tiếp tục giữ áp. ECU đổi độ rộng xung theo ga, lượng khí và nhiệt. Kim là cơ cấu chấp hành, không tự quyết định lượng xăng.

## 5. Real-world Example

Trên nhiều đời City có cả phun cổng và các đời có phun trực tiếp hoặc kết hợp. Năm sản xuất quyết định. Mở nắp ca-pô thấy kim trên cổ hút thì đó là phun cổng. Kim dưới nắp máy, cắm thẳng vào nắp quy-lát, nghiêng về phun trực tiếp. Vẫn phải đối chiếu sơ đồ, vì nhìn góc ảnh dễ nhầm.

Bình xăng khoảng 40 lít là sức chứa điển hình của nhiều đời City, không phải mọi phiên bản.

## 6. Comparison

Phun cổng rửa một phần mặt sau xupap nạp bằng xăng. Phun trực tiếp không làm việc đó, nên một số máy bị muội ở cổng nạp dù bugi còn tốt. Phun trực tiếp làm chủ thời điểm phun hơn và thường đi cùng tỉ số nén cao hơn. Cả hai vẫn cần lửa của bugi trên máy xăng.

Xe chế hòa khí cũ không có ray và kim. Khóa này không lấy chế hòa khí làm kiến trúc City.

## 7. Failure

Bình còn xăng mà không nổ: có thể mất điện bơm, tắc lọc, rò ray, kim không mở, hoặc thiếu lửa. Xăng trong bình không chứng minh áp đã tới kim.

Rò xăng ở khoang máy hoặc dưới gầm là nguy cơ cháy. Dừng xe và xử lý. Không phải tiếng kêu để đi tiếp.

Yếu khi đạp ga nhưng đi đều vẫn được: lọc hoặc bơm không đủ lưu lượng lúc cần nhiều xăng. Đi đều cần ít hơn.

## 8. Interview

1. Kể năm đoạn từ bình tới kim.
2. Phun cổng và phun trực tiếp, xăng vào chỗ nào?
3. Vì sao phun trực tiếp cần áp cao hơn?
4. Bơm xăng thuộc luồng điện nào?
5. ECU quyết định đại lượng gì của kim?
6. Vì sao hết xăng trên đồng hồ chưa phải chẩn đoán xong?
7. Rò xăng xử lý khác một tiếng kêu taplo thế nào?
8. Có phải mọi City cùng một kiểu phun không?

## 9. Quiz

Quiz theo thứ tự đường ống và chỗ phân nhánh hai kiểu phun.

## 10. Summary

- Áp xăng do bơm điện tạo. Lượng xăng do thời gian mở kim.
- Phun cổng và phun trực tiếp khác chỗ xăng vào và khác mức áp.
- Đời xe quyết định kiểu phun.
- Rò xăng là việc an toàn.
- Không nổ khi còn xăng thì hãy nghi đường áp và lửa, chưa kết luận một kim.
