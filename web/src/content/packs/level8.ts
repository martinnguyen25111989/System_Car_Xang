import type { DiagramRow, Essay, Mcq } from '../lesson01.ts'
import { assemble, detail, pickFlows, type LessonPack } from '../pack.ts'

const ghost =
  'Kéo để xoay. Thân trong suốt là sơ đồ cầu trước của cả khóa, không phải CAD City. Dùng nó để đặt lại từng miền vào đúng chỗ trên xe.'
const note = 'Kéo để xoay, lăn để phóng to. Khối 3D xếp theo sơ đồ của bài, không phải CAD của một đời xe.'

const q = (id: string, prompt: string, a: string, b: string, c: string, d: string, answer: string, explain: string): Mcq => ({
  id,
  prompt,
  choices: [
    { id: 'a', text: a },
    { id: 'b', text: b },
    { id: 'c', text: c },
    { id: 'd', text: d },
  ],
  answer,
  explain,
})
const e = (id: string, prompt: string, guide: string): Essay => ({ id, prompt, guide })

const l30Diagram: DiagramRow[] = [
  { kind: 'spine', id: 'driver', below: ['data'] },
  { kind: 'pair', from: 'battery', to: 'ecu', flow: 'electrical', below: ['data'] },
  { kind: 'trio', left: 'tank', leftFlow: 'energy', center: 'engine', right: 'radiator', rightFlow: 'thermal', below: ['mechanical'] },
  { kind: 'spine', id: 'trans', below: ['mechanical'] },
  { kind: 'spine', id: 'wheels', below: ['mechanical'] },
  { kind: 'spine', id: 'road', below: [] },
]

export const LEVEL8: Record<string, LessonPack> = {
  L30: assemble(
    'L30',
    'ghost',
    ghost,
    'engine',
    pickFlows('energy', 'mechanical', 'electrical', 'data', 'thermal'),
    l30Diagram,
    [
      detail('driver', 'Người lái', 'Driver', ['data'], 'Nguồn yêu cầu ga, phanh và lái.', 'Mọi miền cuối cùng phục vụ việc này.', 'Không phải phụ tùng.', 'Xe không làm theo ý.', 'Driver'),
      detail('battery', 'Ắc quy 12V', '12V battery', ['electrical'], 'Điện nuôi hộp. Không có pin cao áp trên City xăng của khóa.', 'ECM không chạy bằng xăng.', 'Hết điện hoặc không nạp.', 'Không đề, đèn yếu.', '12V battery'),
      detail('ecu', 'ECM', 'ECM', ['data', 'electrical'], 'Trung tâm powertrain xăng: xăng, lửa, ga.', 'Các hộp khác nghe nó qua CAN, không thay nó.', 'Mất nguồn hoặc mất cảm biến sống còn.', 'Đèn máy, không nổ.', 'ECM'),
      detail('tank', 'Bình xăng', 'Fuel tank', ['energy'], 'Kho năng lượng hóa học dưới ghế sau trên nhiều sedan.', 'Nguồn đi đường của ICE.', 'Hết hoặc rò.', 'Chết máy, mùi xăng.', 'Fuel tank'),
      detail('engine', 'Máy xăng', 'Gasoline engine', ['energy', 'mechanical', 'thermal'], 'NA, bốn xy-lanh điển hình trên City 1.5.', 'Chỗ cháy.', 'Mất lửa, xăng, khí hoặc nén.', 'Không nổ, rung, yếu.', 'Gasoline engine'),
      detail('radiator', 'Két nước', 'Radiator', ['thermal'], 'Thoát nhiệt máy. Điều hòa là vòng khác nằm cạnh.', 'Cháy luôn tạo nhiệt.', 'Tắc, thiếu nước, quạt chết.', 'Kim nhiệt cao.', 'Radiator'),
      detail('trans', 'Hộp số', 'Transmission', ['mechanical'], 'CVT trên nhiều đời City, cùng vi sai trong transaxle.', 'Đưa mô-men ra hai láp trước.', 'Trượt hoặc hết dầu đúng loại.', 'Tua cao, xe chậm.', 'Transmission'),
      detail('wheels', 'Bánh trước', 'Front wheels', ['mechanical'], 'Bánh kéo và bánh lái.', 'Cuối chuỗi cơ khí của FWD.', 'Láp, lốp, phanh.', 'Không kéo, kéo lệch, kêu khi đánh lái.', 'Front wheels'),
      detail('road', 'Mặt đường', 'Road', ['mechanical'], 'Nơi lực thật sự xuất hiện.', 'Ma sát quyết định giới hạn ga, phanh, lái.', 'Không sửa được bằng cách thay bugi.', 'Bánh trượt.', 'Road'),
    ],
    [
      q('q1', 'Trung tâm powertrain của City xăng là hộp nào?', 'ECM', 'Đầu phát nhạc', 'Pin cao áp', 'Chỉ có BCM', 'a', 'ECM tính cháy. Không có pin kéo. BCM lo thân xe.'),
      q('q2', 'Sơ đồ cả xe này thiếu cụm nào một cách cố ý?', 'Pin cao áp và motor kéo', 'Bình xăng', 'ECM', 'Két nước', 'a', 'Đây là bản xăng. Hybrid và BEV đã được so ở L03 và không được vẽ thành City.'),
      q('q3', 'Mô-men City ra bánh nào?', 'Hai bánh trước', 'Chỉ bánh sau trái', 'Cả bốn bánh lúc nào cũng bằng nhau', 'Không bánh nào', 'a', 'FWD, transaxle trước, hai láp.'),
      q('q4', 'Nhiệt máy và nhiệt cabin có phải một vòng chất lỏng không?', 'Không. Nước máy và gas lạnh là hai vòng', 'Có', 'Chỉ là một đường CAN', 'Chỉ là dầu số', 'a', 'Chúng nằm cạnh nhau ở mũi xe nhưng không đổ chung.'),
      q('q5', 'Dữ liệu bàn đạp đi tới đâu trước khi thành lửa?', 'ECM', 'Thẳng vào lốp', 'Thẳng vào két', 'Thẳng vào loa', 'a', 'ECM là chỗ yêu cầu thành lệnh phun và lửa.'),
    ],
    [
      e('e1', 'Nhìn xe từ mũi tới đuôi, đặt máy, số, két, ắc quy, cabin và bình xăng.', 'Mũi: két và dàn nóng. Khoang trước: máy, transaxle, ắc quy. Giữa: cabin và người lái. Dưới ghế sau: bình xăng trên nhiều sedan. Đuôi: ống xả. Đây là sedan cầu trước, không phải mọi xe.'),
      e('e2', 'Chọn một tín hiệu trên CAN mà hộp số cần từ ECM.', 'Tua máy hoặc mô-men ước lượng, để chọn tỉ số. Tên tín hiệu cụ thể là của hãng. Ý kiến trúc là số không tự đo cháy.'),
      e('e3', 'Nếu bỏ ECM khỏi sơ đồ, những luồng nào đứt trước?', 'Dữ liệu lệnh ga, phun và lửa. Điện 12V vẫn có thể còn ở đèn. Xăng vẫn nằm trong bình. Mô-men không được tạo ra vì không còn chỗ phối hợp cháy.'),
    ],
  ),
  L31: assemble(
    'L31',
    'blocks',
    note,
    'oil',
    pickFlows('mechanical', 'thermal', 'energy', 'electrical'),
    [
      { kind: 'spine', id: 'oil', below: ['mechanical'] },
      { kind: 'pair', from: 'filter', to: 'plug', flow: 'energy', below: ['mechanical'] },
      { kind: 'pair', from: 'coolant', to: 'brake', flow: 'thermal', below: ['mechanical'] },
      { kind: 'spine', id: 'belt', below: [] },
    ] as DiagramRow[],
    [
      detail('oil', 'Dầu máy', 'Engine oil', ['mechanical'], 'Bôi trơn và mang một phần nhiệt bên trong máy.', 'Thiếu dầu phá bạc trước khi bạn kịp thấy kéo yếu.', 'Quá hạn hoặc sai độ nhớt.', 'Đèn dầu, tiếng kim loại.', 'Engine oil'),
      detail('filter', 'Lọc', 'Filters', ['energy', 'intake'], 'Lọc dầu, lọc gió, lọc xăng tùy đời.', 'Cặn và bụi không được vào đường hẹp.', 'Tắc.', 'Yếu máy hoặc áp dầu thấp.', 'Filters'),
      detail('plug', 'Bugi', 'Spark plug', ['electrical', 'energy'], 'Chi tiết mòn của hệ lửa.', 'Khe hở và điện cực đổi sau nhiều km.', 'Mòn, bẩn dầu.', 'Rung, hao xăng.', 'Spark plug'),
      detail('coolant', 'Nước làm mát', 'Coolant', ['thermal'], 'Chất lỏng có phụ gia, không phải nước lã dùng lâu dài.', 'Chống sôi, chống đông và chống gỉ tùy công thức.', 'Hết, hoặc lẫn dầu.', 'Nóng máy, nước đổi màu.', 'Coolant'),
      detail('brake', 'Dầu phanh', 'Brake fluid', ['mechanical'], 'Chất lỏng truyền áp, hút ẩm theo thời gian.', 'Nước trong dầu hạ điểm sôi, phanh mềm khi nóng.', 'Quá hạn thay.', 'Đạp sâu sau vài lần phanh liên tiếp.', 'Brake fluid'),
      detail('belt', 'Đai', 'Belts', ['mechanical'], 'Đai máy phát và đai cam nếu máy dùng đai.', 'Đai máy phát đứt thì hết nạp. Đai cam đứt thì mất nhịp.', 'Nứt, quá km.', 'Tiếng rít, hoặc hỏng nặng nếu là đai cam.', 'Belts'),
    ],
    [
      q('q1', 'Xe xăng có hạng mục nào mà BEV không có theo cùng cách?', 'Dầu máy, bugi và đường xăng', 'Lốp', 'Phanh ma sát trong mọi thiết kế', 'Gương', 'a', 'BEV không đốt xăng trong xy-lanh nên không có chu kỳ bugi và dầu máy như City. Vẫn có dầu hộp số hoặc dầu giảm tốc tùy xe, và vẫn có dầu phanh.'),
      q('q2', 'Vì sao dầu phanh có hạn thời gian, không chỉ hạn số km?', 'Nó hút ẩm dù xe ít chạy', 'Vì hết hạn là hết xăng', 'Vì luật đổi màu sơn', 'Vì CVT bắt buộc', 'a', 'Ẩm làm điểm sôi giảm. Xe ít đi vẫn già dầu phanh.'),
      q('q3', 'Nước lã thay nước làm mát lâu dài thì rủi ro gì?', 'Gỉ, đóng cặn, và dải nhiệt không đúng phụ gia', 'Tăng công suất vĩnh viễn', 'Không rủi ro', 'Làm đặc dầu số', 'a', 'Phụ gia trong nước làm mát là một phần của hệ thống, không phải màu xanh trang trí.'),
      q('q4', 'Đai máy phát đứt thì hết việc gì trước?', 'Nạp điện, và thường hết luôn bơm nước nếu cùng đai', 'Hết sóng radio trước tiên trong mọi xe', 'Hết ISOFIX', 'Hết góc toe', 'a', 'Nhìn sơ đồ đai của đời máy. Có máy tách đai bơm nước. Không đoán một kiểu.'),
      q('q5', 'Hybrid khác City ở hạng mục bảo dưỡng nào, một ý?', 'Thêm việc quanh pin cao áp và có thể dài hơn chu kỳ phanh vì tái sinh, nhưng vẫn có dầu máy nếu còn máy xăng', 'Không bao giờ thay dầu phanh', 'Không có lốp', 'Không có lọc gió cabin', 'a', 'PHEV và HEV vẫn là xe cơ khí cộng thêm điện cao áp. BEV bỏ dầu máy đốt trong. Không chép một lịch từ xe này sang xe kia.'),
    ],
    [
      e('e1', 'Lập một danh sách bảo dưỡng City và đánh dấu mục nào BEV không có.', 'City: dầu máy, lọc dầu, lọc gió, bugi, nước làm mát, dầu phanh, dầu hộp số đúng loại, đai. BEV bỏ dầu máy đốt trong, bugi và đường xăng. Cả hai vẫn cần phanh, lốp, lọc gió cabin và kiểm tra điện 12V. Chi tiết lịch là của từng xe.'),
      e('e2', 'Vì sao “xe vẫn chạy” không có nghĩa dầu còn tốt?', 'Dầu kiềm và phụ gia cạn trước khi máy gõ. Bugi vẫn đánh lửa khi đã hao xăng. Bảo dưỡng là việc trước triệu chứng, không phải việc sau khi bạc đã mòn.'),
      e('e3', 'Đổ nhầm dầu số thường vào CVT thì hỏng thuộc miền nào?', 'Hộp số. Đai và pulley cần hệ số ma sát của đúng dầu. Máy vẫn êm. Đây là bảo dưỡng sai gây hỏng truyền động.'),
    ],
  ),
  L32: assemble(
    'L32',
    'blocks',
    note + ' Sáu khối là sáu ca. Bấm một ca để xem đoạn chuỗi đáng nhìn trước.',
    'nostart',
    pickFlows('energy', 'electrical', 'mechanical', 'data', 'thermal'),
    [
      { kind: 'pair', from: 'nostart', to: 'shake', flow: 'energy', below: ['mechanical'] },
      { kind: 'pair', from: 'fuel', to: 'hot', flow: 'thermal', below: ['data'] },
      { kind: 'pair', from: 'brakelamp', to: 'check', flow: 'data', below: [] },
    ] as DiagramRow[],
    [
      detail('nostart', 'Không nổ', 'No start', ['electrical', 'energy', 'data'], 'Đề có quay hoặc không quay, nhưng không có cháy ổn định.', 'Cháy chưa thành nhịp.', 'Điện đề, xăng, lửa, khí, nén, tín hiệu khuỷu.', 'Im, hoặc đề rồi chết.', 'No start'),
      detail('shake', 'Rung', 'Misfire', ['energy', 'mechanical'], 'Máy nổ nhưng không đều.', 'Một hoặc vài xy-lanh bỏ thì, hoặc chân máy đứt.', 'Lửa, kim, nén, chân máy.', 'Rung tay lái hoặc cần số ở tua thấp.', 'Misfire'),
      detail('fuel', 'Hao xăng', 'Fuel use', ['energy', 'data'], 'Xe đi được nhưng tốn hơn mức đời xe.', 'Hỗn hợp, ma sát hoặc thói quen lái.', 'Ô-xy, lốp non, phanh kẹt, ECT báo lạnh.', 'Đầy bình mau hết. Phải có mốc so sánh của đúng xe.', 'Fuel use'),
      detail('hot', 'Nóng máy', 'Overheat', ['thermal'], 'Kim nước vượt dải giữa.', 'Nhiệt không thoát.', 'Nước, van hằng nhiệt, quạt, két, bơm nước.', 'Kim cao, hơi dưới nắp ca-pô.', 'Overheat'),
      detail('brakelamp', 'Đèn phanh', 'Brake lamp', ['mechanical', 'electrical'], 'Đèn đỏ hình phanh hoặc chữ BRAKE.', 'Mức dầu, phanh tay, hoặc mạch.', 'Thiếu dầu, công tắc phanh tay, đèn ABS là đèn khác.', 'Đèn sáng khi đang đi.', 'Brake lamp'),
      detail('check', 'Đèn máy', 'Check engine', ['data'], 'ECM thấy một giá trị ra ngoài dải và đã ghi mã.', 'Có mã thì mới có hướng, chưa có kết luận phụ tùng.', 'P0300, P0420, P0171 hoặc mã khác.', 'Đèn vàng hình máy.', 'Check engine'),
    ],
    [
      q('q1', 'Không nổ, đề không quay, đèn trần tối. Đoạn nào trước?', 'Điện 12V: bình, cực, mass', 'Xúc tác', 'Độ chụm', 'Loa', 'a', 'Chưa đủ điện để quay máy thì chưa bàn tới xăng và lửa.'),
      q('q2', 'Rung ở tua chờ, hết rung khi tắt máy và chỉ còn ở một tốc độ xe. Có thể là gì?', 'Một xy-lanh bỏ thì nếu rung theo tua máy. Nếu rung theo tốc độ xe dù về số N thì nghi bánh hoặc láp', 'Chắc chắn hết gas lạnh', 'Chắc chắn hỏng ISOFIX', 'Chắc chắn hết nước rửa kính', 'a', 'Tách rung theo tua máy và rung theo tốc độ bánh.'),
      q('q3', 'Kim nhiệt cao trong kẹt xe, xuống lại khi chạy nhanh. Chi tiết nào trước?', 'Quạt két', 'Bugi đánh lửa sớm của bài tua bin', 'CarPlay', 'Độ toe', 'a', 'Lúc đứng cần quạt. Lúc chạy đã có gió.'),
      q('q4', 'Đèn hình máy sáng. Bước kiến trúc đúng là gì?', 'Đọc mã và dữ liệu, rồi mới thay chi tiết', 'Thay ECM ngay', 'Đục xúc tác', 'Xóa đèn bằng cách rút bình rồi bỏ qua', 'a', 'Đèn là lời mời đọc mã. Xóa mã không sửa chỗ hở.'),
      q('q5', 'Đèn phanh đỏ khác đèn ABS thế nào?', 'Đèn đỏ liên quan dầu, phanh tay hoặc mạch phanh chính. Đèn ABS là hệ thống chống khóa', 'Chúng là một đèn', 'Đèn ABS nghĩa là hết xăng', 'Đèn đỏ nghĩa là hết gió', 'a', 'Nhầm hai đèn sẽ kiểm tra nhầm miền.'),
    ],
    [
      e('e1', 'Lập thứ tự cho ca không nổ: đề không quay, đề quay không nổ, nổ rồi chết ngay.', 'Không quay: điện bình, cực, cầu chì, rơ-le, đề. Quay không nổ: xăng có áp không, có lửa không, có tín hiệu khuỷu không, có nén không. Nổ rồi chết: hết áp xăng, mất tín hiệu, hoặc xì gió lớn.'),
      e('e2', 'Hao xăng kèm lốp non và phanh sau kẹt. Máy có thể không có mã. Bạn xử lý đâu trước?', 'Lốp và phanh kẹt là ma sát và tổn thất cơ khí, làm hao xăng dù cháy đúng. Đo áp lốp và xem bánh có nóng sau một quãng ngắn không, trước khi thay cảm biến ô-xy.'),
      e('e3', 'Nhìn lại cả khóa bằng một câu: City xăng hỏng thì bạn hỏi gì đầu tiên?', 'Đứt ở miền nào và ở luồng nào. Không nổ là cháy. Không kéo là cơ khí sau máy. Nóng là nhiệt. Đèn là dữ liệu cần mã. Màn hình đen là cabin. Mỗi ca một đoạn, không một phụ tùng cho mọi đèn.'),
    ],
  ),
}
