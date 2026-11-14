import type { DiagramRow, Essay, Mcq } from '../lesson01.ts'
import { assemble, detail, pickFlows, type LessonPack } from '../pack.ts'

const note =
  'Kéo để xoay, lăn để phóng to. Khối 3D xếp theo sơ đồ của bài, không phải CAD của một đời xe.'

function quiz(items: Mcq[]): Mcq[] {
  return items
}

const l11: DiagramRow[] = [
  { kind: 'spine', id: 'clutch', below: ['mechanical'] },
  { kind: 'pair', from: 'mt', to: 'at', flow: 'mechanical', below: ['mechanical'] },
  { kind: 'pair', from: 'cvt', to: 'dct', flow: 'mechanical', below: ['mechanical'] },
  { kind: 'spine', id: 'tc', below: [] },
]

const l12: DiagramRow[] = [
  { kind: 'spine', id: 'crank', below: ['mechanical'] },
  { kind: 'spine', id: 'gear', below: ['mechanical'] },
  { kind: 'spine', id: 'diff', below: ['mechanical'] },
  { kind: 'spine', id: 'axle', below: ['mechanical'] },
  { kind: 'spine', id: 'tire', below: [] },
]

const l13: DiagramRow[] = [
  { kind: 'spine', id: 'engine', below: ['mechanical'] },
  { kind: 'pair', from: 'fwd', to: 'rwd', flow: 'mechanical', below: ['mechanical'] },
  { kind: 'pair', from: 'awd', to: 'four', flow: 'mechanical', below: [] },
]

const l14: DiagramRow[] = [
  { kind: 'spine', id: 'pedal', below: ['mechanical'] },
  { kind: 'spine', id: 'booster', below: ['mechanical'] },
  { kind: 'spine', id: 'master', below: ['mechanical'] },
  { kind: 'pair', from: 'disc', to: 'drum', flow: 'mechanical', below: ['data'] },
  { kind: 'spine', id: 'abs', below: [] },
]

const l15: DiagramRow[] = [
  { kind: 'spine', id: 'wheel', below: ['mechanical'] },
  { kind: 'spine', id: 'column', below: ['mechanical'] },
  { kind: 'spine', id: 'rack', below: ['mechanical'] },
  { kind: 'pair', from: 'eps', to: 'hpu', flow: 'electrical', below: [] },
]

const l16: DiagramRow[] = [
  { kind: 'spine', id: 'spring', below: ['mechanical'] },
  { kind: 'spine', id: 'damper', below: ['mechanical'] },
  { kind: 'pair', from: 'arm', to: 'bar', flow: 'mechanical', below: ['mechanical'] },
  { kind: 'spine', id: 'knuckle', below: [] },
]

const l17: DiagramRow[] = [
  { kind: 'spine', id: 'size', below: ['mechanical'] },
  { kind: 'spine', id: 'pressure', below: ['mechanical'] },
  { kind: 'spine', id: 'patch', below: ['mechanical'] },
  { kind: 'pair', from: 'toe', to: 'camber', flow: 'mechanical', below: [] },
]

const q = (
  prompt: string,
  a: string,
  b: string,
  c: string,
  d: string,
  answer: string,
  explain: string,
  id: string,
): Mcq => ({
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

export const LEVEL3: Record<string, LessonPack> = {
  L11: assemble(
    'L11',
    'blocks',
    note,
    'cvt',
    pickFlows('mechanical'),
    l11,
    [
      detail('clutch', 'Ly hợp', 'Clutch', ['mechanical'], 'Đĩa nối và ngắt mô-men giữa máy và số sàn.', 'Để dừng bánh trong khi máy vẫn nổ, và để đổi số.', 'Mòn đĩa làm trượt: tua tăng, xe không nhanh theo.', 'Mùi cháy, ga cao mà xe chậm.', 'Clutch'),
      detail('mt', 'Số sàn', 'Manual', ['mechanical'], 'Người lái chọn bánh răng bằng cần số và chân côn.', 'Tỉ số cố định từng cấp, hiệu suất cao nếu người lái đúng nhịp.', 'Vào số khó, hoặc côn hết tác dụng.', 'Giật, không vào số.', 'Manual'),
      detail('at', 'Số tự động', 'Automatic', ['mechanical'], 'Hộp bánh răng hành tinh tự đổi cấp. Thường đi với biến mô.', 'Người lái không cắt mô-men bằng chân côn.', 'Mất áp dầu số, trượt cấp.', 'Giật khi lên số, chậm tăng tốc.', 'Automatic'),
      detail('cvt', 'CVT', 'CVT', ['mechanical'], 'Đai hoặc xích giữa hai pulley đổi tỉ số liên tục.', 'Giữ máy gần vòng tua có lợi. Nhiều đời City dùng kiểu này.', 'Trượt đai, hết dầu CVT đúng loại.', 'Tua cao bất thường, rung, chậm.', 'CVT'),
      detail('dct', 'Ly hợp kép', 'DCT', ['mechanical'], 'Hai ly hợp: một cho số lẻ, một cho số chẵn, để cấp sau chờ sẵn.', 'Đổi số nhanh. Ít gặp trên City.', 'Ly hợp khô hoặc ướt mòn, phần mềm đổi số giật.', 'Giật lúc đi chậm, không phải bệnh của mọi hộp số.', 'DCT'),
      detail('tc', 'Biến mô', 'Torque converter', ['mechanical'], 'Khớp thủy lực giữa máy và số tự động, có thể khóa cứng khi chạy đều.', 'Cho phép máy nổ khi xe đứng ở số D, và nhân mô-men lúc đề pa.', 'Hỏng khóa biến mô gây rung ở tốc độ đều hoặc hao xăng.', 'Rung nhẹ quanh một tốc độ, hoặc trễ khi đạp ga.', 'Torque converter'),
    ],
    quiz([
      q('Nhiều đời City dùng hộp số nào?', 'CVT', 'Luôn là số sàn', 'Luôn là DCT', 'Không có hộp số', 'a', 'CVT phổ biến trên nhiều đời City bán tại Việt Nam. Vẫn có đời hoặc thị trường dùng số sàn hay số tự động có cấp.', 'q1'),
      q('Ly hợp trên số sàn dùng để làm gì?', 'Ngắt mô-men để đổi số và để xe đứng trong khi máy nổ', 'Làm mát két nước', 'Đo áp lốp', 'Bật túi khí', 'a', 'Không có chỗ ngắt thì bánh răng không đổi được khi trục còn chịu lực.', 'q2'),
      q('Biến mô thuộc kiểu hộp số nào nhất?', 'Số tự động có cấp', 'Số sàn', 'Chỉ có trên xe đạp', 'Chỉ có trên CVT của mọi City', 'a', 'Torque converter là khớp thủy lực điển hình của số tự động. CVT thường nối máy bằng một cơ cấu khác. Không gộp tên.', 'q3'),
      q('DCT khác số sàn ở điểm nào?', 'Có hai ly hợp và tự đổi cấp, số sàn có một ly hợp do người lái đạp', 'DCT không có bánh răng', 'DCT là một loại phanh', 'Hai kiểu cùng một bàn đạp côn', 'a', 'Ý tưởng ly hợp giống nhau. Cách điều khiển và số lượng ly hợp thì khác.', 'q4'),
      q('Tua máy tăng vọt mà xe không nhanh. Đoạn nào đáng nghi trước nếu máy vẫn êm?', 'Phần tử ma sát trong hộp số hoặc ly hợp đang trượt', 'Chỉ là hết nước rửa kính', 'Chỉ là lệch giờ đồng hồ', 'Chỉ là loa hỏng', 'a', 'Máy tạo tua nhưng mô-men không sang bánh đúng tỉ. Đó là trượt truyền động, chưa phải hết lửa.', 'q5'),
    ]),
    [
      e('e1', 'Phân biệt số sàn, số tự động, CVT và DCT bằng một câu mỗi kiểu.', 'Sàn: người lái chọn cấp và đạp một ly hợp. Tự động: hộp tự chọn cấp, thường qua biến mô. CVT: đổi tỉ số liên tục bằng pulley và đai. DCT: hai ly hợp thay nhau giữ các cấp chẵn và lẻ.'),
      e('e2', 'Vì sao dầu số không phải một loại cho mọi hộp?', 'CVT, số tự động có cấp và DCT ướt cần tính ma sát khác nhau. Đổ nhầm có thể làm trượt đai hoặc làm cháy ly hợp. Lấy đúng mã dầu của đời xe.'),
      e('e3', 'Xe đứng ở D mà máy không chết. Đó là việc của chi tiết nào trên số tự động?', 'Biến mô cho phép trượt thủy lực lúc xe đứng. Khi chạy đều, khóa biến mô giảm trượt đó. Số sàn thì người lái phải đạp côn, nếu không máy chết hoặc xe nhích.'),
    ],
  ),
  L12: assemble(
    'L12',
    'blocks',
    note,
    'axle',
    pickFlows('mechanical'),
    l12,
    [
      detail('crank', 'Trục khuỷu', 'Crankshaft', ['mechanical'], 'Đầu ra mô-men của máy.', 'Chưa qua số thì tua quá cao hoặc lực đề pa quá thấp.', 'Gãy trục là hỏng nặng, rất hiếm so với trượt số.', 'Tiếng gõ trong máy, không phải tiếng bên bánh.', 'Crankshaft'),
      detail('gear', 'Hộp số', 'Transmission', ['mechanical'], 'Đổi tỉ số giữa tua máy và tua bánh.', 'Máy xăng khỏe trong một dải tua hẹp so với cả dải tốc độ xe.', 'Trượt, không vào số, hết dầu.', 'Tua cao xe chậm, giật.', 'Transmission'),
      detail('diff', 'Vi sai', 'Differential', ['mechanical'], 'Cho hai bánh dẫn động quay khác tốc độ lúc cua.', 'Bánh ngoài đi đường dài hơn bánh trong.', 'Mòn bánh răng, hết dầu cầu.', 'Hú khi cua hoặc khi nhả ga.', 'Differential'),
      detail('axle', 'Trục láp', 'CV axle', ['mechanical'], 'Trục có khớp hai đầu, truyền mô-men ra bánh dẫn hướng.', 'Bánh vừa phải nhận lực vừa phải đánh lái và nhún.', 'Rách chụp cao su, rơ khớp.', 'Cụp cụp khi quay vô-lăng hết cỡ và đạp ga.', 'CV axle'),
      detail('tire', 'Lốp', 'Tire', ['mechanical'], 'Biến mô-men thành lực đẩy tại mặt đường.', 'Không có ma sát thì trục quay suông.', 'Mòn, non hơi, mất bám.', 'Bánh quay, xe không tiến đúng.', 'Tire'),
    ],
    quiz([
      q('Trên City cầu trước, vi sai nằm đâu?', 'Trong cụm số phía trước', 'Giữa hai bánh sau', 'Trong vô-lăng', 'Trong bình xăng', 'a', 'Transaxle gộp số và vi sai. Xe cầu sau đặt vi sai ở cầu sau.', 'q1'),
      q('Trục láp cần khớp đồng tốc vì sao?', 'Bánh dẫn động còn phải đánh lái và nhún', 'Để làm mát dầu phanh', 'Để chia điện 12V', 'Để đo gió', 'a', 'Một trục cứng không chịu được góc lái và hành trình treo.', 'q2'),
      q('Máy khỏe, số đã vào, một bánh trước không kéo. Chi tiết nào đứng giữa vi sai và bánh?', 'Trục láp', 'Két nước', 'Bugi', 'Lọc gió', 'a', 'Mô-men đã ra khỏi vi sai thì đường còn lại là láp và khớp.', 'q3'),
      q('Vì sao vào cua hai bánh dẫn động không được khóa cứng cùng tốc độ?', 'Bánh ngoài đi quỹ đạo dài hơn', 'Vì luật cấm', 'Vì két nước sôi', 'Vì hết xăng', 'a', 'Khóa cứng làm lốp trượt hoặc xoắn trục. Vi sai cho phép chênh vòng quay.', 'q4'),
      q('Lốp trượt trên cát. Mô-men trong trục còn không?', 'Còn, nhưng không thành lực đẩy vì thiếu ma sát', 'Mất hoàn toàn vì bugi tắt', 'Chỉ còn ở két nước', 'Bằng không vì ECU ngủ', 'a', 'Ca này là cuối chuỗi cơ khí, không phải mất cháy.', 'q5'),
    ]),
    [
      e('e1', 'Kể chuỗi từ trục khuỷu tới mặt đường trên City.', 'Khuỷu vào hộp số, đổi tỉ số, qua vi sai trong transaxle, ra hai trục láp, tới hai moay-ơ trước, lốp đẩy đường.'),
      e('e2', 'Tiếng cụp cụp khi đánh lái hết và tăng tốc nghi chi tiết nào?', 'Khớp trục láp mòn, thường sau khi chụp cao su rách để mỡ văng và cát vào.'),
      e('e3', 'Vì sao hộp số tồn tại thay vì nối thẳng khuỷu ra bánh?', 'Máy muốn tua cao để có công suất, bánh xe lúc đề pa phải quay chậm mà lực lớn. Tỉ số số thấp nhân mô-men. Tỉ số số cao cho xe chạy nhanh mà máy không quá tua.'),
    ],
  ),
  L13: assemble(
    'L13',
    'blocks',
    note,
    'fwd',
    pickFlows('mechanical'),
    l13,
    [
      detail('engine', 'Máy', 'Engine', ['mechanical'], 'Nguồn mô-men, thường ở đầu xe trên sedan.', 'Chưa nói bánh nào nhận lực.', 'Mất mô-men thì mọi kiểu dẫn động đều không kéo.', 'Không nổ hoặc yếu.', 'Engine'),
      detail('fwd', 'Cầu trước', 'FWD', ['mechanical'], 'Hai bánh trước vừa lái vừa kéo. Vi sai nằm trong hộp số.', 'Gọn, nhẹ, hợp sedan như City.', 'Trượt láp hoặc trượt số làm mất kéo.', 'Một hoặc hai bánh trước không kéo.', 'FWD'),
      detail('rwd', 'Cầu sau', 'RWD', ['mechanical'], 'Máy trước, trục các-đăng, vi sai cầu sau, hai bánh sau kéo.', 'Tách việc lái và việc kéo. Phân bố tải khác FWD.', 'Khớp các-đăng hoặc cầu sau hú.', 'Tiếng dưới sàn giữa xe, bánh sau không kéo.', 'RWD'),
      detail('awd', 'AWD', 'AWD', ['mechanical'], 'Có thể đưa lực tới cả bốn bánh, thường tự chia theo độ bám.', 'Khi một cầu mất bám, cầu kia còn kéo. Cách chia là của từng hãng.', 'Khớp giữa hoặc hộp phân phối mòn.', 'Giật khi vào cua, hoặc chỉ còn một cầu.', 'AWD'),
      detail('four', '4WD', '4WD', ['mechanical'], 'Người lái hoặc hệ thống gài cầu, có số phụ trên một số xe địa hình.', 'Khóa truyền lực chắc hơn AWD tự do khi off-road.', 'Gài nhầm trên đường khô cứng có thể xoắn truyền động.', 'Tiếng răng, nặng vô-lăng, khó quay vòng.', '4WD'),
    ],
    quiz([
      q('City 1.5 của khóa thuộc kiểu nào?', 'FWD, cầu trước', 'RWD', 'Luôn là 4WD gài cầu', 'Không dẫn động bánh nào', 'a', 'Hai bánh trước nhận mô-men. Không suy ra mọi sedan đều vậy, nhưng City là FWD.', 'q1'),
      q('RWD thêm chi tiết dọc nào so với FWD?', 'Trục các-đăng tới cầu sau', 'Thêm một két nước thứ hai làm vi sai', 'Bỏ hộp số', 'Đưa vi sai vào vô-lăng', 'a', 'Mô-men phải đi từ máy trước xuống cầu sau.', 'q2'),
      q('AWD và 4WD khác nhau ở cách dùng điển hình?', 'AWD thường tự chia lực. 4WD gài cầu thiên về địa hình và có thể khóa', 'Chúng là một từ viết tắt', '4WD chỉ kéo một bánh', 'AWD không có bánh sau', 'a', 'Tên thương mại của hãng hay trộn. Hãy nhìn có gài cầu và có khóa vi sai hay không.', 'q3'),
      q('Vì sao FWD dễ bị trượt bánh khi tăng tốc mạnh?', 'Bánh trước vừa hết tải trọng khi xe ngẩng đầu vừa phải kéo và lái', 'Vì hết dầu phanh', 'Vì turbo của City', 'Vì bình xăng ở trước', 'a', 'Lúc tăng tốc, tải dồn về bánh sau. Bánh trước nhẹ đi nên mất bám sớm hơn.', 'q4'),
      q('Gài khóa truyền động bốn bánh trên đường nhựa khô có thể hại gì?', 'Xoắn trục và lốp vì các bánh không được chênh tốc độ lúc cua', 'Làm hết xăng ngay', 'Tắt bugi', 'Xả nước làm mát', 'a', 'Đường khô không cho lốp trượt để xả chênh vòng quay. Phải đúng chế độ mà nhà sản xuất cho phép.', 'q5'),
    ]),
    [
      e('e1', 'Chỉ bánh nào kéo trên FWD, RWD và một xe bốn bánh.', 'FWD: hai bánh trước. RWD: hai bánh sau. Bốn bánh: cả bốn, nhưng tỉ lệ từng lúc tùy AWD tự chia hay 4WD đang gài.'),
      e('e2', 'Vì sao nhìn máy ở đầu xe chưa đủ kết luận FWD?', 'RWD vẫn thường đặt máy trước rồi dùng các-đăng. Phải thấy mô-men ra láp trước hay ra cầu sau.'),
      e('e3', 'City vào cua, bánh trước phía ngoài và phía trong quay thế nào?', 'Bánh ngoài quay nhiều hơn. Vi sai trong transaxle cho phép điều đó. Nếu hú khi cua, nghi dầu và bánh răng vi sai.'),
    ],
  ),
  L14: assemble(
    'L14',
    'blocks',
    note + ' Một câu về phanh tái sinh chỉ để không tìm nó trên City xăng.',
    'disc',
    pickFlows('mechanical', 'data', 'electrical'),
    l14,
    [
      detail('pedal', 'Bàn đạp phanh', 'Brake pedal', ['mechanical'], 'Người lái tạo lực ban đầu.', 'Đầu vào của hệ phanh.', 'Bàn đạp tụt sâu là mất áp hoặc còn khí trong dầu.', 'Đạp sâu, phanh yếu.', 'Brake pedal'),
      detail('booster', 'Trợ lực phanh', 'Brake booster', ['mechanical'], 'Dùng chân không máy hoặc bơm điện để khuếch đại lực chân.', 'Giữ lực đạp trong mức người lái chịu được.', 'Mất chân không làm đạp rất nặng nhưng phanh cơ vẫn còn một phần.', 'Đạp cứng, tiếng xì ở bầu trợ lực.', 'Brake booster'),
      detail('master', 'Tổng phanh', 'Master cylinder', ['mechanical'], 'Đổi lực thành áp suất dầu, thường hai dòng độc lập.', 'Một dòng hỏng không làm mất hết bốn bánh trên thiết kế hai mạch.', 'Roăng trong tổng phanh hỏng.', 'Đạp mềm, tuột dần, đèn dầu.', 'Master cylinder'),
      detail('disc', 'Phanh đĩa', 'Disc brake', ['mechanical'], 'Má kẹp đĩa quay cùng bánh. City thường có đĩa ở bánh trước.', 'Đổi động năng thành nhiệt tại má và đĩa.', 'Mòn má, đĩa méo, kẹt piston.', 'Kêu, rung vô-lăng khi phanh, xe kéo lệch.', 'Disc brake'),
      detail('drum', 'Phanh tang trống', 'Drum brake', ['mechanical'], 'Guốc ép ra mặt trong tang trống. Một số đời để ở bánh sau.', 'Đủ lực cho bánh sau và cho phanh tay trên nhiều xe.', 'Guốc mòn, lò xo gãy, dầu chảy vào tang.', 'Phanh tay yếu, tiếng cạp ở bánh sau.', 'Drum brake'),
      detail('abs', 'ABS', 'ABS', ['data', 'electrical'], 'Bộ van và ECU nhả-giữ áp từng bánh khi bánh sắp khóa.', 'Bánh khóa thì mất khả năng lái.', 'Cảm biến tốc độ bánh hoặc mô-đun hỏng.', 'Đèn ABS, hoặc đạp rung lúc phanh gấp. Rung đó có thể là ABS đang làm việc, không phải hỏng đĩa.', 'ABS'),
    ],
    quiz([
      q('ABS giúp việc gì khi phanh gấp?', 'Không để bánh khóa cứng, để người lái còn hướng được xe', 'Tăng công suất máy', 'Phun thêm xăng', 'Bật điều hòa', 'a', 'Bánh khóa trượt và không còn lực ngang để rẽ. ABS giữ bánh ở ngưỡng bám.', 'q1'),
      q('Đạp phanh rất cứng sau khi máy chết có thể là gì?', 'Mất trợ lực chân không, phanh cơ chưa chắc mất hết', 'Hết xăng', 'Gãy trục láp', 'Hỏng loa', 'a', 'Trợ lực cần chân không hoặc bơm. Không có nó, lực chân phải lớn hơn nhiều.', 'q2'),
      q('Vì sao tổng phanh có hai dòng dầu?', 'Một dòng rò không làm mất phanh cả bốn bánh', 'Để một dòng chứa xăng', 'Để làm mát dầu số', 'Để nuôi ECU giải trí', 'a', 'Hai mạch là dự phòng thủy lực. Vẫn phải sửa ngay dòng đang rò.', 'q3'),
      q('Phanh tái sinh có trên City xăng thuần không?', 'Không. Đó là motor kéo thành máy phát trên hybrid hoặc xe điện', 'Có trên mọi City', 'Chỉ có khi bật ABS', 'Nằm trong két nước', 'a', 'Xe xăng thuần đổi động năng thành nhiệt ở má phanh. Không đi sâu vào tái sinh.', 'q4'),
      q('Vô-lăng rung khi phanh từ tốc độ cao. Nhóm nào xem trước?', 'Đĩa phanh méo hoặc má không đều', 'Lọc gió', 'Kim phun', 'Than EVAP', 'a', 'Rung theo nhịp bánh lúc đang phanh trỏ tới đĩa và má, chưa phải tới bugi.', 'q5'),
    ]),
    [
      e('e1', 'Đi từ bàn đạp tới má phanh.', 'Chân đạp, trợ lực khuếch đại, tổng phanh tạo áp, ống dầu và có thể qua cụm ABS, tới piston kẹp má vào đĩa hoặc guốc vào tang trống.'),
      e('e2', 'Đạp rung mạnh lúc phanh khẩn trên đường trơn. Có thể là hỏng hay là hệ thống đang làm việc?', 'Có thể là ABS đang nhả áp từng nhịp. Nếu đèn ABS không sáng và xe vẫn lái được, đó là dấu hiệu hoạt động. Nếu đèn sáng hoặc một bánh khóa, thì là hỏng cảm biến hoặc van.'),
      e('e3', 'EBD và ESC khác ABS ở một câu.', 'ABS giữ bánh không khóa khi phanh. EBD chia áp giữa trước và sau. ESC phanh từng bánh để kéo xe khỏi trượt ngang. Cả ba dùng cảm biến bánh nhưng mục tiêu khác.'),
    ],
  ),
  L15: assemble(
    'L15',
    'blocks',
    note,
    'rack',
    pickFlows('mechanical', 'electrical'),
    l15,
    [
      detail('wheel', 'Vô-lăng', 'Steering wheel', ['mechanical'], 'Người lái chọn hướng.', 'Đầu vào góc lái.', 'Rơ vành hoặc túi khí trên vành là hai việc khác nhau.', 'Lái không chính, hoặc đèn túi khí.', 'Steering wheel'),
      detail('column', 'Cột lái', 'Steering column', ['mechanical'], 'Trục có khớp các-đăng và đoạn gãy an toàn khi va chạm.', 'Đưa góc quay xuống thước lái, và phải gãy đúng thiết kế khi đâm.', 'Rơ khớp, khóa vô-lăng hỏng.', 'Tiếng cộp khi qua gờ, hoặc không khóa.', 'Steering column'),
      detail('rack', 'Thước lái', 'Steering rack', ['mechanical'], 'Bánh răng đổi quay của vành thành đẩy ngang của hai rotuyn.', 'Hai bánh trước đổi góc cùng nhau.', 'Rơ thước, xì dầu trợ lực nếu là thước thủy lực.', 'Xe không thẳng, đánh lái có khoảng chết.', 'Steering rack'),
      detail('eps', 'Trợ lực điện', 'EPS', ['electrical', 'data'], 'Mô-tơ trên cột hoặc trên thước, trợ lực theo tốc độ.', 'Nhẹ lúc đậu xe, chặt hơn lúc chạy nhanh. Nhiều City đời mới dùng kiểu này.', 'Hỏng mô-tơ hoặc cảm biến mô-men vành.', 'Vô-lăng nặng đột ngột, đèn lái.', 'EPS'),
      detail('hpu', 'Trợ lực thủy lực', 'Hydraulic steering', ['mechanical'], 'Bơm dầu do máy kéo, van chia áp theo hướng đánh lái.', 'Kiểu cũ hơn EPS trên nhiều xe xăng.', 'Thiếu dầu, bơm kêu, đường ống xì.', 'Nặng vô-lăng, tiếng rít khi đánh lái hết.', 'Hydraulic steering'),
    ],
    quiz([
      q('Thước lái đổi chuyển động gì?', 'Quay của vô-lăng thành đẩy ngang tới rotuyn', 'Nhiệt thành xăng', 'Điện cao áp thành mô-men kéo', 'Áp dầu phanh thành lửa', 'a', 'Rack and pinion là cặp bánh răng và thanh răng.', 'q1'),
      q('EPS lấy năng lượng trợ lực từ đâu?', 'Mô-tơ điện 12V', 'Từ đai máy qua bơm dầu, trong mọi trường hợp', 'Từ khí xả', 'Từ má phanh', 'a', 'Hydraulic steering mới dùng bơm dầu. Đừng đổ dầu trợ lực vào một xe chỉ có EPS.', 'q2'),
      q('Steer-by-wire là gì ở mức bài này?', 'Không còn trục cơ khí nối suốt từ vành tới thước. Kiến trúc mới, chưa phải chuẩn xe xăng bình dân', 'Dây ga của xe cũ', 'Một loại lốp', 'Phanh tay điện', 'a', 'Chỉ nêu để khỏi nhầm với EPS. EPS vẫn còn cơ khí, chỉ thêm mô-tơ.', 'q3'),
      q('Vô-lăng nặng chỉ khi xe đứng yên, nhẹ lại khi chạy. Trên xe thủy lực, bạn nghĩ tới gì?', 'Bơm trợ lực yếu hoặc thiếu dầu, vì lúc đứng yên bơm chưa đủ lưu lượng', 'Hết xăng', 'Tắc xúc tác', 'Hỏng PCV', 'a', 'Lúc máy tua thấp, bơm thủy lực cho lưu lượng thấp nhất. EPS thì xem mô-tơ và điện.', 'q4'),
      q('Rotuyn lái mòn gây triệu chứng nào?', 'Khoảng chết ở vô-lăng và lốp mòn lệch', 'Kim nhiệt lên cao', 'Mùi xăng trong bình', 'Hết âm thanh loa', 'a', 'Rơ ở đầu thước làm góc bánh không theo vành ngay.', 'q5'),
    ]),
    [
      e('e1', 'Đi từ vô-lăng tới bánh trước.', 'Vành, cột lái, khớp, bánh răng thước lái, hai thanh rotuyn, ngỗng quay, moay-ơ. Trợ lực điện hoặc thủy lực chỉ giảm lực tay, không đổi chuỗi này.'),
      e('e2', 'Làm sao không đổ nhầm dầu trợ lực vào xe EPS?', 'Xe EPS không có bình dầu lái trên khoang máy. Xe thủy lực có bình và bơm trên đai máy. Đời City quyết định. Không đổ dầu vào mô-tơ điện.'),
      e('e3', 'Vì sao cột lái phải có đoạn co rút khi va chạm?', 'Để vành không trở thành một thanh đâm vào ngực người lái. Đó là an toàn bị động của hệ lái, khác với việc rẽ hàng ngày.'),
    ],
  ),
  L16: assemble(
    'L16',
    'blocks',
    note,
    'damper',
    pickFlows('mechanical'),
    l16,
    [
      detail('spring', 'Lò xo', 'Spring', ['mechanical'], 'Đỡ tải xe và nén khi bánh gặp gờ.', 'Giữ thân xe ở độ cao làm việc.', 'Gãy hoặc mỏi lò xo làm xe lệch một góc.', 'Một bên thấp, tiếng kim loại.', 'Spring'),
      detail('damper', 'Giảm chấn', 'Damper', ['mechanical'], 'Ống thủy lực tiêu năng lượng dao động của lò xo.', 'Lò xo một mình sẽ nhún mãi. Giảm chấn dừng dao động đó.', 'Hết dầu trong ống, ty chảy.', 'Xe nhún nhiều lần sau mỗi gờ, lốp bám kém.', 'Damper'),
      detail('arm', 'Càng', 'Control arm', ['mechanical'], 'Thanh định vị moay-ơ theo phương ngang và dọc.', 'Bánh phải nhún mà không đổ góc tùy tiện.', 'Cao su càng rách, càng cong.', 'Lốp mòn trong hoặc ngoài, xe nhao.', 'Control arm'),
      detail('bar', 'Thanh ổn định', 'Stabilizer bar', ['mechanical'], 'Thanh xoắn nối hai bánh cùng cầu.', 'Giảm nghiêng thân khi vào cua.', 'Cao su ốp mòn.', 'Cộc khi qua gờ chậm, thân nghiêng hơn.', 'Stabilizer bar'),
      detail('knuckle', 'Ngỗng quay', 'Knuckle', ['mechanical'], 'Khối nối moay-ơ với càng, rotuyn lái và giảm chấn.', 'Một chi tiết nhận cả lực lái, lực phanh và lực treo.', 'Cong sau va chạm.', 'Góc bánh sai dù đã cân chỉnh nhiều lần.', 'Knuckle'),
    ],
    quiz([
      q('Lò xo và giảm chấn chia việc thế nào?', 'Lò xo đỡ tải và tích năng. Giảm chấn tiêu dao động', 'Cả hai đều bơm dầu phanh', 'Giảm chấn đỡ hết trọng lượng xe khi đứng yên', 'Lò xo đo tốc độ bánh', 'a', 'Đỗ xe, giảm chấn không giữ chiều cao. Lò xo giữ. Lúc nhún, giảm chấn mới là chính.', 'q1'),
      q('MacPherson là kiểu treo nào, thường gặp trên City?', 'Một trụ gồm giảm chấn và lò xo, bắt vào ngỗng quay, tiết kiệm chỗ', 'Cầu lá nhíp của xe tải', 'Treo khí của một số xe sang', 'Không có càng', 'a', 'MacPherson phổ biến ở bánh trước xe cầu trước. Tay đòn kép và đa liên kết là các kiểu khác, không phải của mọi City.', 'q2'),
      q('Cao su càng rách thì góc nào dễ sai?', 'Góc bánh, vì càng không còn giữ đúng vị trí', 'Áp ray xăng', 'Thời điểm bugi', 'Mức dầu số không đổi', 'a', 'Càng định vị bánh. Cao su là khớp mềm có giới hạn. Rách thì bánh đi theo ổ gà.', 'q3'),
      q('Xe nhún hai ba lần sau mỗi gờ giảm tốc. Chi tiết nào trước?', 'Giảm chấn', 'Lọc xăng', 'Bugi', 'Nắp bình xăng', 'a', 'Lò xo còn tốt vẫn dao động nếu không có lực cản của giảm chấn.', 'q4'),
      q('Thanh ổn định chủ yếu chống việc gì?', 'Nghiêng thân khi cua', 'Hao xăng', 'Mất lửa', 'Hết điện 12V', 'a', 'Nó chống lật thân bằng cách xoắn khi hai bánh cùng cầu nhún khác nhau.', 'q5'),
    ]),
    [
      e('e1', 'Vì sao xe cần cả lò xo lẫn giảm chấn?', 'Lò xo giữ tải và cho bánh đi theo đường. Không có giảm chấn, năng lượng trong lò xo trả lại thành dao động, lốp mất tiếp xúc.'),
      e('e2', 'Kể một kiểu treo trước phổ biến trên sedan cầu trước và một kiểu bạn không gán cho mọi xe.', 'MacPherson là trụ đứng phổ biến. Đa liên kết và treo khí tồn tại trên xe khác. City không phải xe nào cũng đổi kiểu theo năm, nên vẫn phải xem đời xe.'),
      e('e3', 'Sau va chạm, cân chỉnh bánh mãi không xong. Chi tiết kết cấu nào phải được đo?', 'Ngỗng quay, càng và thước có thể đã cong. Cân chỉnh chỉ chỉnh được trong khoảng mà các càng còn đúng hình.'),
    ],
  ),
  L17: assemble(
    'L17',
    'blocks',
    note,
    'patch',
    pickFlows('mechanical'),
    l17,
    [
      detail('size', 'Cỡ lốp', 'Tire size', ['mechanical'], 'Dãy số trên hông lốp, ví dụ 185/55R16: bề rộng mm, tỉ lệ thành, vành inch.', 'Sai cỡ làm đổi đường kính bánh, tốc độ kế và khoảng gầm.', 'Lắp cỡ không đúng thiết kế.', 'Tốc độ kế sai, quệt lòng vè, ABS báo lỗi.', 'Tire size'),
      detail('pressure', 'Áp suất', 'Pressure', ['mechanical'], 'Hơi trong lốp, đo khi lốp nguội, theo tem cửa xe.', 'Áp đúng thì vết tiếp xúc và độ bền thành lốp đúng thiết kế.', 'Non hoặc quá căng.', 'Mòn hai vai hoặc mòn giữa, nặng lái, nóng lốp.', 'Pressure'),
      detail('patch', 'Vết bám', 'Contact patch', ['mechanical'], 'Diện tích lốp đang chạm đường.', 'Mọi lực ga, phanh và lái đi qua mẩu cao su này.', 'Mòn trơn, đường ướt, non hơi.', 'Trượt sớm, phanh dài.', 'Contact patch'),
      detail('toe', 'Độ chụm', 'Toe', ['mechanical'], 'Hai bánh cùng cầu nhìn hơi vào hoặc hơi ra.', 'Giữ xe thẳng và giảm mòn răng cưa.', 'Chụm sai sau khi thay rotuyn hoặc va chạm.', 'Lốp ăn răng cưa, xe nhao.', 'Toe'),
      detail('camber', 'Độ chụm đứng', 'Camber', ['mechanical'], 'Bánh nghiêng trong hoặc ngoài khi nhìn từ trước.', 'Giữ vết bám khi xe vào cua và khi nhún.', 'Càng cong hoặc giảm chấn gãy làm camber đổ.', 'Mòn vai trong hoặc vai ngoài.', 'Camber'),
    ],
    quiz([
      q('Trong cỡ 185/55R16, số 16 là gì?', 'Đường kính vành tính bằng inch', 'Áp suất bar', 'Năm sản xuất', 'Số lớp bố luôn bằng 16', 'a', '185 là bề rộng tính bằng milimet. 55 là thành lốp bằng 55% bề rộng. R là cấu trúc radial.', 'q1'),
      q('Áp suất nên đọc ở đâu?', 'Tem của nhà sản xuất trên xe, đo lúc lốp nguội', 'Số in lớn nhất trên hông lốp, vì đó là áp khuyên dùng hàng ngày', 'Luôn là 2,5 bar cho mọi xe', 'Theo cảm giác tay bóp lốp', 'a', 'Số trên hông thường là áp tối đa của vỏ, không phải áp khuyên dùng. Tem cửa tài xế mới là áp chở người của xe.', 'q2'),
      q('Lốp mòn giữa nhiều hơn hai vai. Kiểu hơi nào?', 'Quá căng', 'Quá non', 'Hết dầu số', 'Lệch bugi', 'a', 'Quá căng làm giữa mặt lốp đội ra. Quá non mòn hai vai.', 'q3'),
      q('Độ chụm sai mòn lốp theo kiểu nào?', 'Răng cưa hoặc vệt ngang', 'Thủng giữa gai vì hết điện', 'Không bao giờ mòn', 'Chỉ mòn vành', 'a', 'Bánh bị kéo lê ngang khi lăn. Đó là toe sai.', 'q4'),
      q('Mọi lực gia tốc của City đi qua đâu?', 'Vết tiếp xúc của bốn lốp với đường', 'Qua ăng-ten', 'Qua bình nước rửa kính', 'Qua màn hình', 'a', 'Hết cao su bám thì ga, phanh và lái cùng hết tác dụng.', 'q5'),
    ]),
    [
      e('e1', 'Đọc 185/55R16 thành lời.', 'Lốp rộng 185 mm, thành cao bằng 55 phần trăm của bề rộng, cấu trúc radial, lắp vành đường kính 16 inch. Đó là ví dụ cỡ, không phải cỡ của mọi đời City.'),
      e('e2', 'Vì sao không lấy số áp tối đa trên hông lốp làm áp bơm hàng ngày?', 'Đó là giới hạn vỏ chịu được, thường cao hơn áp xe cần để chở người. Bơm theo tem cửa, đo nguội.'),
      e('e3', 'Ôn level 3: mô-men ra khỏi máy rồi phải qua những nhóm nào trước khi thành lực ở đường?', 'Hộp số đổi tỉ số, vi sai chia hai bánh, láp đưa ra bánh kéo. Kiểu FWD của City không có các-đăng. Phanh, lái và treo giữ cho vết bám của lốp còn dùng được. Lốp và góc đặt bánh là chỗ lực thật sự xuất hiện.'),
    ],
  ),
}
