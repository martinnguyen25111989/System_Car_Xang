import type { DiagramRow, Essay, Mcq } from '../lesson01.ts'
import { assemble, detail, pickFlows, type LessonPack } from '../pack.ts'

const blockNote =
  'Kéo để xoay, lăn để phóng to. Khối 3D xếp theo sơ đồ của bài, không phải CAD của một đời xe.'
const ghostNote =
  'Kéo để xoay. Thân trong suốt vẫn là sơ đồ cầu trước, không phải CAD Honda City. Bài này dùng cùng bố trí để nói về luồng, không phải để thêm chi tiết máy.'

const l02Diagram: DiagramRow[] = [
  { kind: 'pair', from: 'body', to: 'chassis', flow: 'mechanical', below: ['mechanical'] },
  { kind: 'spine', id: 'power', below: ['energy'] },
  { kind: 'pair', from: 'battery', to: 'ecus', flow: 'electrical', below: ['data'] },
  { kind: 'trio', left: 'cool', leftFlow: 'thermal', center: 'cabin', right: 'safety', rightFlow: 'data', below: ['data'] },
  { kind: 'spine', id: 'adas', below: ['data'] },
  { kind: 'spine', id: 'screen', below: [] },
]

const l02Quiz: Mcq[] = [
  {
    id: 'q1',
    prompt: 'Trên một chiếc sedan cầu trước, powertrain chủ yếu nằm ở đâu?',
    choices: [
      { id: 'a', text: 'Dưới cốp sau, cùng bình xăng' },
      { id: 'b', text: 'Phía trước: máy và cụm số chung vi sai' },
      { id: 'c', text: 'Trong vô-lăng' },
      { id: 'd', text: 'Trong két nước' },
    ],
    answer: 'b',
    explain: 'City và phần lớn xe cầu trước đặt máy cùng transaxle ở đầu xe. Bình xăng thường dưới ghế sau, nhưng đó là kho năng lượng, không phải chỗ tạo mô-men.',
  },
  {
    id: 'q2',
    prompt: 'Thân vỏ và khung gầm khác nhau ở việc gì?',
    choices: [
      { id: 'a', text: 'Thân vỏ là chỗ người ngồi và che các cụm. Khung gầm là phần giữ bánh, phanh, lái, treo' },
      { id: 'b', text: 'Hai tên là một chi tiết' },
      { id: 'c', text: 'Khung gầm chỉ là lớp sơn' },
      { id: 'd', text: 'Thân vỏ chỉ có ở xe tải' },
    ],
    answer: 'a',
    explain: 'Body – thân vỏ bao quanh người. Chassis – khung gầm mang hệ thống động lực học của bánh. Nhiều xe con dùng thân chịu lực, hai vai vẫn nên tách khi đọc xe.',
  },
  {
    id: 'q3',
    prompt: 'Màn hình giải trí có được phép coi là hộp điều khiển máy không?',
    choices: [
      { id: 'a', text: 'Có, vì nó ở giữa táp-lô' },
      { id: 'b', text: 'Không. Nó nói với xe qua mạng, không tính xăng và lửa' },
      { id: 'c', text: 'Có, nếu xe có Apple CarPlay' },
      { id: 'd', text: 'Chỉ khi bật điều hòa' },
    ],
    answer: 'b',
    explain: 'Infotainment thuộc khoang người dùng. ECM mới là hộp của máy. Hai hộp có thể nối mạng, nhưng hỏng màn hình không có nghĩa máy mất chương trình phun xăng.',
  },
  {
    id: 'q4',
    prompt: 'Vì sao điện 12V và điện tử phải tách thành hai hộp trên sơ đồ?',
    choices: [
      { id: 'a', text: 'Vì 12V là năng lượng nuôi, điện tử là quyết định dựa trên cảm biến' },
      { id: 'b', text: 'Vì chúng luôn do hai hãng khác nhau làm' },
      { id: 'c', text: 'Vì điện tử không cần điện' },
      { id: 'd', text: 'Vì 12V chỉ dùng cho đèn hậu' },
    ],
    answer: 'a',
    explain: 'Ắc quy và máy phát cung cấp điện. ECU dùng điện đó để đọc cảm biến và ra lệnh. Mất điện thì hộp không tính được, nhưng bản thân chương trình không phải là bình ắc quy.',
  },
  {
    id: 'q5',
    prompt: 'ADAS trên xe phổ thông nằm ở tầng nào của kiến trúc?',
    choices: [
      { id: 'a', text: 'Thay cho máy xăng' },
      { id: 'b', text: 'Một lớp hỗ trợ người lái, dùng cảm biến và có thể nhờ phanh hoặc lái' },
      { id: 'c', text: 'Chỉ là một túi khí' },
      { id: 'd', text: 'Bắt buộc có LiDAR trên mọi City' },
    ],
    answer: 'b',
    explain: 'ADAS quan sát xung quanh rồi có thể đề nghị hoặc can thiệp ga, phanh, lái. Nó không tạo mô-men thay máy. Trang bị khác nhau theo đời và bản xe. LiDAR không phải đồ chuẩn của sedan phổ thông.',
  },
]

const l02Essays: Essay[] = [
  {
    id: 'e1',
    prompt: 'Kể mười nhóm lớn của một xe xăng và chỉ mỗi nhóm một câu: nó phục vụ ai hoặc việc gì.',
    guide:
      'Thân vỏ che và chứa người. Khung gầm giữ bánh và cho xe bám, rẽ, dừng. Powertrain biến xăng thành mô-men. Điện 12V nuôi các hộp. Điện tử quyết định. Nhiệt đưa năng lượng thừa ra ngoài. Nội thất là chỗ người dùng xe. An toàn giảm rủi ro trước và trong va chạm. ADAS hỗ trợ quan sát và can thiệp. Giải trí là giao diện thông tin, không phải hộp máy.',
  },
  {
    id: 'e2',
    prompt: 'Vì sao nhìn nắp ca-pô không đủ để kết luận một xe là cầu trước?',
    guide:
      'Nhiều xe cầu sau vẫn đặt máy ở đầu xe. Dấu hiệu cầu trước là mô-men ra hai bánh trước qua trục láp, vi sai nằm trong cụm số phía trước. City là cầu trước. Một xe máy trước dẫn động sau sẽ có trục các-đăng chạy dọc xuống cầu sau.',
  },
  {
    id: 'e3',
    prompt: 'Chọn một hỏng ở nội thất và một hỏng ở powertrain. Người lái thấy gì khác nhau?',
    guide:
      'Hỏng loa hoặc màn hình làm mất tiện nghi, máy vẫn có thể kéo xe. Hỏng máy, hộp số hoặc truyền động làm mất hoặc méo mô-men: không nổ, rung, không lăn. Hai ca không nằm cùng một tầng kiến trúc.',
  },
]

const l03Diagram: DiagramRow[] = [
  { kind: 'spine', id: 'driver', below: ['data'] },
  { kind: 'spine', id: 'pedal', below: ['data'] },
  { kind: 'trio', left: 'fuel', leftFlow: 'energy', center: 'ice', right: 'motor', rightFlow: 'mechanical', below: ['mechanical'] },
  { kind: 'pair', from: 'hv', to: 'motor', flow: 'energy', below: ['mechanical'] },
  { kind: 'spine', id: 'wheels', below: [] },
]

const l03Quiz: Mcq[] = [
  {
    id: 'q1',
    prompt: 'Khi nhấn ga trên xe xăng thuần, năng lượng ra bánh đến từ đâu?',
    choices: [
      { id: 'a', text: 'Từ sự cháy của xăng trong máy' },
      { id: 'b', text: 'Từ một pin cao áp kéo bánh' },
      { id: 'c', text: 'Từ máy phát 12V' },
      { id: 'd', text: 'Từ má phanh' },
    ],
    answer: 'a',
    explain: 'ICE – động cơ đốt trong đổi năng lượng hóa học của nhiên liệu thành mô-men. Ắc quy 12V chỉ nuôi điều khiển và đề.',
  },
  {
    id: 'q2',
    prompt: 'HEV và PHEV khác nhau chủ yếu ở điểm nào, ở mức kiến trúc?',
    choices: [
      { id: 'a', text: 'HEV không cắm sạc ngoài. PHEV có pin lớn hơn và cắm sạc để đi một quãng bằng điện' },
      { id: 'b', text: 'HEV không có máy xăng' },
      { id: 'c', text: 'PHEV không có bánh xe' },
      { id: 'd', text: 'Hai loại dùng chung một sơ đồ Toyota cho mọi hãng' },
    ],
    answer: 'a',
    explain: 'HEV – hybrid điện lấy điện từ máy xăng và phanh tái sinh, không cắm sạc. PHEV – hybrid cắm sạc có thể đi một đoạn bằng điện rồi máy xăng mới làm việc chính. Cách bố trí motor là của từng hãng.',
  },
  {
    id: 'q3',
    prompt: 'Trên BEV, nhấn ga thường dẫn tới chuyện gì?',
    choices: [
      { id: 'a', text: 'Kim phun xăng mở thêm' },
      { id: 'b', text: 'Bộ điều khiển lệnh mô-men cho motor, năng lượng lấy từ pin cao áp' },
      { id: 'c', text: 'Bugi đánh lửa sớm hơn' },
      { id: 'd', text: 'Bơm cao áp trong bình xăng chạy nhanh hơn' },
    ],
    answer: 'b',
    explain: 'BEV – xe điện không đốt xăng để kéo bánh. Bàn đạp vẫn là yêu cầu mô-men, nhưng nguồn là pin và motor. Bài này chỉ dừng ở kiến trúc.',
  },
  {
    id: 'q4',
    prompt: 'Vì sao diesel được nhắc ngắn, không thành một nhánh của khóa?',
    choices: [
      { id: 'a', text: 'Vì diesel không phải đốt trong' },
      { id: 'b', text: 'Vì khóa lấy xe xăng làm đường chính. Diesel cũng là ICE nhưng cháy bằng nén và phun dầu, không phải bugi' },
      { id: 'c', text: 'Vì diesel dùng pin cao áp' },
      { id: 'd', text: 'Vì diesel không có hộp số' },
    ],
    answer: 'b',
    explain: 'Diesel vẫn là động cơ đốt trong. Khác xăng ở cách tạo cháy. Không nên lấy sơ đồ bugi và bướm ga của City để đọc một xe dầu.',
  },
  {
    id: 'q5',
    prompt: 'Câu nào đúng khi so sánh bốn họ xe?',
    choices: [
      { id: 'a', text: 'Mọi xe đều đưa năng lượng ra bánh bằng sự cháy' },
      { id: 'b', text: 'Người lái vẫn ra lệnh bằng bàn đạp, nhưng nguồn năng lượng và bộ tạo mô-men thì khác nhau' },
      { id: 'c', text: 'PHEV không bao giờ dùng máy xăng' },
      { id: 'd', text: 'City 1.5 là một HEV nhỏ' },
    ],
    answer: 'b',
    explain: 'Điểm chung là yêu cầu của người lái. Điểm khác là năng lượng nằm trong xăng, trong pin, hay cả hai, và mô-men do máy đốt, motor, hay cả hai tạo ra. City 1.5 trong khóa này là xe xăng thuần.',
  },
]

const l03Essays: Essay[] = [
  {
    id: 'e1',
    prompt: 'Với cùng một cú nhấn ga, kể một câu cho ICE, một câu cho HEV, một câu cho BEV.',
    guide:
      'ICE: cảm biến bàn đạp báo ECU, ECU thêm khí và xăng, máy cháy mạnh hơn, mô-men ra bánh. HEV: yêu cầu mô-men có thể được motor đáp ứng trước hoặc cùng máy xăng, tùy chiến lược của hãng và mức pin. BEV: bộ điều khiển motor lấy năng lượng từ pin cao áp, không có thì nổ của máy xăng. Không đi vào inverter hay hóa học pin.',
  },
  {
    id: 'e2',
    prompt: 'Vì sao không được lấy sơ đồ hybrid của một hãng làm sơ đồ mọi HEV?',
    guide:
      'Có xe để motor trong hộp số, có xe để motor trên cầu, có xe dùng hai motor. Toyota, Honda và Hyundai không bố trí giống nhau. Bảng bốn họ chỉ nói nguồn năng lượng và ai tạo mô-men.',
  },
  {
    id: 'e3',
    prompt: 'City 1.5 của khóa này thuộc họ nào, và một việc bạn sẽ không đi tìm trên nó?',
    guide:
      'Nó là ICE xăng, hút khí tự nhiên, cầu trước. Không đi tìm pin cao áp kéo bánh, cổng sạc, hay motor kéo. Vẫn có ắc quy 12V.',
  },
]

const l04Diagram: DiagramRow[] = [
  { kind: 'spine', id: 'driver', below: ['data'] },
  { kind: 'spine', id: 'pedal', below: ['data'] },
  { kind: 'pair', from: 'battery', to: 'ecu', flow: 'electrical', below: ['data', 'electrical'] },
  { kind: 'trio', left: 'tank', leftFlow: 'energy', center: 'engine', right: 'radiator', rightFlow: 'thermal', below: ['mechanical'] },
  { kind: 'spine', id: 'trans', below: ['mechanical'] },
  { kind: 'spine', id: 'wheels', below: ['mechanical'] },
  { kind: 'spine', id: 'road', below: [] },
]

const l04Quiz: Mcq[] = [
  {
    id: 'q1',
    prompt: 'Tắt màu cơ khí trên sơ đồ thì bạn đang giấu đường nào?',
    choices: [
      { id: 'a', text: 'Đường mô-men từ máy ra bánh' },
      { id: 'b', text: 'Đường xăng trong bình' },
      { id: 'c', text: 'Đường tín hiệu bàn đạp' },
      { id: 'd', text: 'Đường nước ra két' },
    ],
    answer: 'a',
    explain: 'Cơ khí là lực và chuyển động quay. Xăng là năng lượng, bàn đạp là dữ liệu, két nước là nhiệt.',
  },
  {
    id: 'q2',
    prompt: 'Ắc quy 12V nằm trên luồng nào trong năm luồng?',
    choices: [
      { id: 'a', text: 'Năng lượng kéo xe' },
      { id: 'b', text: 'Điện 12V' },
      { id: 'c', text: 'Nhiệt' },
      { id: 'd', text: 'Chỉ có cơ khí' },
    ],
    answer: 'b',
    explain: 'Năng lượng kéo xe nằm trong xăng. Ắc quy nuôi ECU, bơm, lửa và đề. Không đổi ắc quy thành nguồn đi đường dài của xe xăng.',
  },
  {
    id: 'q3',
    prompt: 'Luồng dữ liệu và luồng cơ khí gặp nhau ở đâu khi người lái nhấn ga?',
    choices: [
      { id: 'a', text: 'ECU đọc yêu cầu rồi lệnh cho máy. Máy mới tạo mô-men' },
      { id: 'b', text: 'Chúng là một dây cáp' },
      { id: 'c', text: 'Chỉ gặp nhau ở lốp' },
      { id: 'd', text: 'Chúng không bao giờ cùng tồn tại' },
    ],
    answer: 'a',
    explain: 'Dữ liệu mang ý định và lệnh. Cơ khí mang mô-men sau khi đã cháy. ECU là chỗ lệnh được đổi thành thời điểm phun và lửa.',
  },
  {
    id: 'q4',
    prompt: 'Nhiệt xuất hiện khi nào?',
    choices: [
      { id: 'a', text: 'Chỉ khi kim nhiệt báo hỏng' },
      { id: 'b', text: 'Trong lúc cháy bình thường, rồi phải được đưa ra két và ống xả' },
      { id: 'c', text: 'Chỉ lúc đề máy' },
      { id: 'd', text: 'Chỉ khi hết xăng' },
    ],
    answer: 'b',
    explain: 'Cháy luôn tạo nhiệt. Kim lên cao là nhiệt không thoát kịp, không phải lúc nhiệt mới bắt đầu tồn tại.',
  },
  {
    id: 'q5',
    prompt: 'Một xe đang chạy đều. Câu nào đúng?',
    choices: [
      { id: 'a', text: 'Hết luồng năng lượng rồi mới tới luồng nhiệt' },
      { id: 'b', text: 'Năm luồng cùng lúc, trên các đường khác nhau' },
      { id: 'c', text: 'Chỉ còn luồng cơ khí' },
      { id: 'd', text: 'Dữ liệu tắt vì người lái không đổi ga' },
    ],
    answer: 'b',
    explain: 'Ga giữ nguyên vẫn là một yêu cầu. ECU vẫn đo, xăng vẫn cháy, mô-men vẫn ra bánh, điện vẫn nuôi hộp, nhiệt vẫn thoát.',
  },
]

const l04Essays: Essay[] = [
  {
    id: 'e1',
    prompt: 'Gán mỗi bộ phận sau vào một luồng chính: bình xăng, trục láp, ắc quy, cảm biến bàn đạp, két nước.',
    guide:
      'Bình xăng: năng lượng. Trục láp: cơ khí. Ắc quy: điện 12V. Cảm biến bàn đạp: dữ liệu. Két nước: nhiệt. Máy nằm ở giao của nhiều luồng vì nó đốt, quay, nhận lệnh và tỏa nhiệt.',
  },
  {
    id: 'e2',
    prompt: 'Vì sao tắt bớt màu lại giúp đọc một ca hỏng?',
    guide:
      'Mỗi màu là một giả thuyết. Xe không nổ thì đừng bắt đầu bằng màu cơ khí của hộp số. Xe nổ nhưng không lăn thì đừng bắt đầu bằng két nước. Tắt màu không liên quan để thấy đoạn chuỗi đang đứt.',
  },
  {
    id: 'e3',
    prompt: 'Ôn level 1: một câu cho kiến trúc, một câu cho bốn họ xe, một câu cho năm luồng.',
    guide:
      'Kiến trúc: thân, khung, powertrain, điện, điện tử, nhiệt, nội thất, an toàn, ADAS, giải trí là các tầng khác nhau. Bốn họ: người lái ra lệnh giống nhau, nguồn năng lượng và bộ tạo mô-men thì khác. Năm luồng của xe xăng chạy cùng lúc. City 1.5 là ICE cầu trước, không phải bản vẽ mọi xe.',
  },
]

export const LEVEL1: Record<string, LessonPack> = {
  L02: assemble(
    'L02',
    'blocks',
    blockNote,
    'power',
    pickFlows('mechanical', 'energy', 'electrical', 'data', 'thermal'),
    l02Diagram,
    [
      detail('body', 'Thân vỏ', 'Body', ['mechanical'], 'Vỏ xe, sàn, trụ, cửa và nóc. Chỗ người ngồi và lớp che các cụm.', 'Giữ người, góp độ cứng và tạo hình xe.', 'Móp, nứt sau va chạm có thể làm cửa không khít hoặc lệch cảm biến. Không trực tiếp tạo mô-men.', 'Cửa kêu, kính lệch, nước lọt, hoặc xe kéo lệch sau tai nạn nếu kết cấu bị kéo.', 'Body'),
      detail('chassis', 'Khung gầm', 'Chassis', ['mechanical'], 'Phần mang treo, lái, phanh và bánh. Trên nhiều xe con, thân chịu lực gộp một phần vai trò này.', 'Xe cần một cấu trúc để bánh bám đường và để các lực phanh, lái đi đúng chỗ.', 'Khung méo làm góc bánh sai, lốp mòn lệch, xe nhao.', 'Vô-lăng lệch, lốp ăn mòn một bên, xe không đi thẳng.', 'Chassis'),
      detail('power', 'Powertrain', 'Powertrain', ['energy', 'mechanical'], 'Máy, hộp số và đường ra bánh. Trên City là máy trước và transaxle.', 'Đây là chỗ xăng thành mô-men rồi ra bánh dẫn động.', 'Hỏng ở đây làm mất lực kéo dù cabin vẫn nguyên.', 'Không nổ, rung, máy gào mà xe không đi.', 'Powertrain'),
      detail('battery', 'Điện 12V', '12V electrical', ['electrical'], 'Ắc quy, máy phát, cầu chì, mass và bó dây nuôi các hộp.', 'Hộp điện và bugi không chạy bằng xăng. Chúng cần điện.', 'Hết điện hoặc đứt mass làm cả cụm điều khiển im.', 'Đề yếu, đèn mờ, hoặc không một hộp nào thức.', '12V power'),
      detail('ecus', 'Các hộp điện', 'Controllers', ['data', 'electrical'], 'ECM của máy, và các hộp khác như thân xe, hộp số, phanh, túi khí.', 'Mỗi hộp canh một việc. Chúng nói chuyện bằng mạng, không phải một máy tính duy nhất.', 'Một hộp mất nguồn hoặc lỗi phần mềm làm đúng miền của nó hỏng, miền khác có thể vẫn sống.', 'Đèn báo riêng của máy, của ABS, hoặc của túi khí.', 'Controllers'),
      detail('cool', 'Nhiệt', 'Thermal systems', ['thermal'], 'Nước làm mát máy và vòng gas lạnh của điều hòa.', 'Cháy tạo nhiệt thừa. Người ngồi cũng cần nhiệt độ cabin.', 'Kẹt van, thiếu nước, hoặc hết gas lạnh là hai vòng khác nhau.', 'Kim nước lên cao, hoặc điều hòa không mát. Đừng gộp hai ca.', 'Thermal'),
      detail('cabin', 'Nội thất', 'Interior', ['data'], 'Ghế, táp-lô, cửa, đèn, gương. Chỗ người dùng xe mỗi ngày.', 'Ý định lái và việc quan sát xe bắt đầu ở đây.', 'Hỏng công tắc hoặc cơ cấu cửa không làm mất mô-men, nhưng có thể làm xe không dùng an toàn.', 'Kính không lên, đèn không sáng, ghế không khóa.', 'Interior'),
      detail('safety', 'An toàn', 'Safety', ['data', 'electrical'], 'Phanh, đai, túi khí, vùng hấp thụ lực. Gồm cả việc tránh va và việc giảm thương khi đã va.', 'Giữ người và giảm năng lượng va chạm.', 'Đèn túi khí hoặc phanh hỏng là việc dừng sử dụng cho đến khi rõ nguyên nhân, không phải đèn trang trí.', 'Đèn airbag, đèn phanh, hoặc đai không cuốn.', 'Safety'),
      detail('adas', 'ADAS', 'Driver assistance', ['data'], 'Camera, radar hoặc siêu âm, rồi các chức năng như phanh khẩn, giữ làn, cảnh báo điểm mù nếu xe có.', 'Giảm tải quan sát cho người lái. Không thay người lái trên xe phổ thông.', 'Trang bị tùy bản. Bẩn camera hoặc hết hiệu lực cảm biến làm chức năng tắt, máy vẫn chạy.', 'Báo hiệu ADAS tắt trên đồng hồ. Không suy ra mọi City đều có cùng một gói.', 'Driver aid'),
      detail('screen', 'Giải trí', 'Infotainment', ['data'], 'Màn hình, âm thanh, bản đồ, CarPlay hoặc Android Auto.', 'Đưa thông tin cho người ngồi. Nói với xe qua mạng và cổng nối.', 'Hỏng màn hình không được chẩn đoán như hỏng ECM.', 'Màn hình đen, mất âm thanh, điện thoại không nối. Máy vẫn có thể nổ bình thường.', 'Infotainment'),
    ],
    l02Quiz,
    l02Essays,
  ),
  L03: assemble(
    'L03',
    'blocks',
    'Sơ đồ này đặt xe xăng cạnh motor và pin cao áp chỉ để so kiến trúc. Khối pin không phải ắc quy 12V của City, và không đi vào hóa học pin.',
    'ice',
    pickFlows('data', 'energy', 'mechanical'),
    l03Diagram,
    [
      detail('driver', 'Người lái', 'Driver', ['data'], 'Người đưa yêu cầu đi nhanh hơn hoặc chậm lại.', 'Mọi họ xe đều bắt đầu từ ý định này.', 'Không phải một cụm sửa chữa.', 'Xe giữ trạng thái hiện tại nếu không có lệnh mới.', 'Driver'),
      detail('pedal', 'Bàn đạp ga', 'Accelerator', ['data'], 'Đổi độ nhấn thành yêu cầu mô-men.', 'Bộ điều khiển cần một con số, không cần biết người lái đang nghĩ gì.', 'Mất tín hiệu thì yêu cầu không tới nơi tạo mô-men.', 'Đạp mà xe không đáp, hoặc đáp giới hạn.', 'Accelerator'),
      detail('fuel', 'Nhiên liệu', 'Fuel', ['energy'], 'Xăng hoặc dầu chứa năng lượng hóa học.', 'ICE cần một kho năng lượng đốt được.', 'Hết nhiên liệu thì máy đốt không còn gì để cháy.', 'Xe chết dần hoặc không nổ. Đồng hồ là ước lượng.', 'Fuel'),
      detail('ice', 'Máy đốt trong', 'ICE', ['energy', 'mechanical'], 'Máy đổi nhiên liệu thành mô-men bằng sự cháy. Xăng dùng bugi. Diesel cháy bằng nhiệt của khí nén, không phải sơ đồ bugi của City.', 'Đây là nguồn mô-men của xe xăng thuần.', 'Mất cháy thì mất mô-men.', 'Không nổ, rung, khói, yếu.', 'ICE'),
      detail('motor', 'Motor kéo', 'Traction motor', ['mechanical'], 'Máy điện tạo mô-men cho bánh trên HEV, PHEV hoặc BEV. Cách gắn motor là của từng hãng.', 'Họ xe điện và hybrid cần một bộ tạo mô-men không chỉ dựa vào cháy.', 'Hỏng motor hoặc bộ điều khiển của nó làm mất một phần hoặc toàn bộ lực kéo, tùy xe còn máy xăng hay không.', 'Mất kéo, đèn hệ thống điện. Không áp dụng cho City xăng thuần.', 'Traction motor'),
      detail('hv', 'Pin cao áp', 'High-voltage battery', ['energy'], 'Kho điện lớn của HEV, PHEV và BEV. Không phải ắc quy 12V.', 'PHEV và BEV lấy năng lượng đi đường từ đây. HEV dùng pin nhỏ hơn, không cắm sạc ngoài.', 'Khóa này không đi vào cell, BMS hay cách sửa pin.', 'Xe hybrid hoặc điện báo pin. Đừng tìm cụm này trên City xăng.', 'HV battery'),
      detail('wheels', 'Bánh xe', 'Wheels', ['mechanical'], 'Nơi mô-men thành lực đẩy, dù mô-men đến từ máy xăng, motor, hay cả hai.', 'Mọi họ xe cuối cùng đều cần lốp bám đường.', 'Mất bám thì có mô-men cũng không thành lực đẩy.', 'Bánh quay mà xe không tiến tương ứng.', 'Wheels'),
    ],
    l03Quiz,
    l03Essays,
  ),
  L04: assemble(
    'L04',
    'ghost',
    ghostNote,
    'engine',
    pickFlows('energy', 'mechanical', 'electrical', 'data', 'thermal'),
    l04Diagram,
    [
      detail('driver', 'Người lái', 'Driver', ['data'], 'Nguồn của yêu cầu, không phải một luồng năng lượng.', 'Không có ý định thì các luồng khác chỉ giữ trạng thái đang có.', 'Không phải chi tiết xe.', 'Xe không đổi tốc độ theo ý bạn.', 'Driver'),
      detail('pedal', 'Bàn đạp ga', 'Accelerator', ['data'], 'Điểm vào của luồng dữ liệu.', 'Biến chân thành tín hiệu.', 'Đứt dữ liệu ở đây thì các luồng kia không nhận lệnh mới.', 'Ga không phản hồi dù máy đang nổ.', 'Accelerator'),
      detail('battery', 'Ắc quy 12V', '12V battery', ['electrical'], 'Luồng điện nuôi hộp và lửa, không phải kho kéo xe.', 'Để dữ liệu và đánh lửa có điện mà chạy.', 'Mất điện làm nhiều luồng khác dừng theo, vì ECU và bơm không thức.', 'Đề yếu hoặc im.', '12V battery'),
      detail('ecu', 'ECU', 'Engine computer', ['data', 'electrical'], 'Chỗ luồng dữ liệu đổi thành lệnh phun và lửa.', 'Năm luồng cần một chỗ phối hợp.', 'ECU mù thì lệnh sai hoặc không có lệnh.', 'Đèn máy, chết máy, ga lạ.', 'Engine computer'),
      detail('tank', 'Bình xăng', 'Fuel tank', ['energy'], 'Đầu luồng năng lượng hóa học.', 'Máy chỉ đốt một ít mỗi thì. Phần còn lại nằm ở đây.', 'Đứt luồng năng lượng trước khi tới máy.', 'Hết xăng, mùi xăng, chết máy.', 'Fuel tank'),
      detail('engine', 'Máy xăng', 'Gasoline engine', ['energy', 'mechanical', 'thermal', 'data', 'electrical'], 'Nút giao: xăng vào, lệnh vào, mô-men ra, nhiệt ra.', 'Đây là chỗ năng lượng đổi dạng.', 'Một luồng vào bị đứt thì mô-men ra yếu hoặc mất.', 'Không nổ, rung, nóng, yếu.', 'Gasoline engine'),
      detail('radiator', 'Két nước', 'Radiator', ['thermal'], 'Lối ra của luồng nhiệt phía nước.', 'Nhiệt không được ở lại trong kim loại máy.', 'Tắc két hoặc thiếu nước làm nhiệt ứ.', 'Kim nhiệt cao.', 'Radiator'),
      detail('trans', 'Hộp số', 'Transmission', ['mechanical'], 'Luồng cơ khí đổi tỉ số vòng quay.', 'Máy chỉ khỏe trong một dải tua.', 'Trượt số là đứt cơ khí sau khi cháy đã có.', 'Tua cao, xe chậm.', 'Transmission'),
      detail('wheels', 'Bánh xe', 'Wheels', ['mechanical'], 'Cuối luồng cơ khí trên xe.', 'Đổi quay thành lực ở mặt đường.', 'Lốp không bám thì cơ khí không thành chuyển động tiến.', 'Bánh trượt.', 'Wheels'),
      detail('road', 'Mặt đường', 'Road', ['mechanical'], 'Môi trường của lực ma sát, không phải chi tiết trong xe.', 'Cùng mô-men cho gia tốc khác nhau trên khô và ướt.', 'Không sửa mặt đường bằng cách thay bugi.', 'Xe không đi đúng với vòng tua.', 'Road'),
    ],
    l04Quiz,
    l04Essays,
  ),
}
