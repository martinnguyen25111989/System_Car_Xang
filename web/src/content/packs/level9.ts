import type { DiagramRow, Essay, FlowId, Mcq } from '../lesson01.ts'
import { assemble, detail, type LessonPack } from '../pack.ts'

const flows: { id: FlowId; label: string; hint: string }[] = [
  { id: 'mechanical', label: 'Cơ khí', hint: 'Lớp dưới cùng: máy, lái, phanh, cửa. Điện chỉ ra lệnh' },
  { id: 'electrical', label: 'Nguồn', hint: 'Đỏ là B+. Cam là đường ACC trên sơ đồ học, không phải màu dây Honda' },
  { id: 'ground', label: 'Mass', hint: 'G1 máy, G2 hộp số, G3 khung, G4 thân, G5 ECU, G6 cảm biến. Tên điểm là tên bài học' },
  { id: 'data', label: 'Tín hiệu', hint: 'Cảm biến và lệnh tới kim phun, bướm ga, mô-bin' },
  { id: 'can', label: 'CAN', hint: 'Poster tách CAN máy và CAN thân. Tốc độ và ID chưa xác minh' },
  { id: 'lin', label: 'LIN', hint: 'Một dây từ BCM tới cửa và điều hòa trên sơ đồ học' },
]

const layers: DiagramRow[] = [
  { kind: 'spine', id: 'mech', below: ['mechanical'] },
  { kind: 'spine', id: 'fuse', below: ['data'] },
  { kind: 'spine', id: 'pcm', below: ['can'] },
  { kind: 'spine', id: 'bcm', below: [] },
]

const power: DiagramRow[] = [
  { kind: 'spine', id: 'battery', below: ['electrical'] },
  { kind: 'pair', from: 'alternator', to: 'fuse', flow: 'electrical', below: ['electrical'] },
  { kind: 'spine', id: 'cabinFuse', below: ['electrical'] },
  { kind: 'trio', left: 'pcm', leftFlow: 'electrical', center: 'bcm', right: 'abs', rightFlow: 'electrical', below: [] },
]

const topology: DiagramRow[] = [
  { kind: 'spine', id: 'pcm', below: ['can'] },
  { kind: 'pair', from: 'abs', to: 'eps', flow: 'can', below: ['can'] },
  { kind: 'pair', from: 'srs', to: 'bcm', flow: 'can', below: ['can'] },
  { kind: 'pair', from: 'cluster', to: 'ivi', flow: 'can', below: ['lin'] },
  { kind: 'pair', from: 'hvac', to: 'tpms', flow: 'can', below: ['lin'] },
  { kind: 'spine', id: 'park', below: [] },
]

const grounds: DiagramRow[] = [
  { kind: 'spine', id: 'g1', below: ['ground'] },
  { kind: 'pair', from: 'g2', to: 'g3', flow: 'ground', below: ['ground'] },
  { kind: 'pair', from: 'g4', to: 'g5', flow: 'ground', below: ['ground'] },
  { kind: 'spine', id: 'g6', below: [] },
]

const lampFlow: DiagramRow[] = [
  { kind: 'spine', id: 'switch', below: ['data'] },
  { kind: 'spine', id: 'bcm', below: ['can'] },
  { kind: 'spine', id: 'fuse', below: ['electrical'] },
  { kind: 'spine', id: 'lamp', below: ['electrical'] },
  { kind: 'spine', id: 'g4', below: [] },
]

const engine: DiagramRow[] = [
  { kind: 'spine', id: 'sensors', below: ['data'] },
  { kind: 'spine', id: 'pcm', below: ['data'] },
  { kind: 'trio', left: 'injector', leftFlow: 'data', center: 'throttle', right: 'coil', rightFlow: 'electrical', below: [] },
]

const quiz: Mcq[] = [
  {
    id: 'q1',
    prompt: 'Số chân giắc PCM của City 2024 trong bài này dùng để dò mạch được không?',
    choices: [
      { id: 'a', text: 'Được, vì mọi City dùng một bảng chân' },
      { id: 'b', text: 'Không. PIN NUMBER NOT VERIFIED, phải mở service manual đúng phiên bản' },
      { id: 'c', text: 'Chỉ cần đếm dây màu đỏ' },
      { id: 'd', text: 'Màu trên hình 3D chính là màu dây Honda' },
    ],
    answer: 'b',
    explain: 'Bài này là sơ đồ học. Màu hình không phải màu dây hãng. Số chân chưa được xác minh.',
  },
  {
    id: 'q2',
    prompt: 'Điện 5V cho cảm biến bàn đạp thường đến từ đâu?',
    choices: [
      { id: 'a', text: 'Thẳng từ cực dương ắc quy' },
      { id: 'b', text: 'Từ nguồn tham chiếu bên trong ECU. Mức và mạch là [TYPICAL], phải đối chiếu sơ đồ' },
      { id: 'c', text: 'Từ máy đề' },
      { id: 'd', text: 'Từ túi khí' },
    ],
    answer: 'b',
    explain: 'Ắc quy là khoảng 12V. Cảm biến analog cần một mốc ổn định do ECU tạo. Không gán số chân.',
  },
  {
    id: 'q3',
    prompt: 'Cháy một cầu chì đèn khác đứt mass thân xe ở điểm nào?',
    choices: [
      { id: 'a', text: 'Cầu chì cắt một nhánh. Mass hỏng làm nhiều mạch cùng yếu hoặc báo sai' },
      { id: 'b', text: 'Hai việc giống hệt nhau' },
      { id: 'c', text: 'Mass hỏng chỉ làm hết xăng' },
      { id: 'd', text: 'Cầu chì hỏng làm bung túi khí' },
    ],
    answer: 'a',
    explain: 'Cầu chì là ngắt có chủ đích của một nhánh. Mass là đường về dùng chung. Mất đường về kéo theo nhiều tải.',
  },
  {
    id: 'q4',
    prompt: 'CAN và LIN, câu nào đúng ở mức kiến trúc điển hình?',
    choices: [
      { id: 'a', text: 'CAN hai dây, nhiều hộp ngang hàng. LIN một dây, thường một master và vài slave thân xe' },
      { id: 'b', text: 'LIN là mạng của bugi' },
      { id: 'c', text: 'CAN chỉ có một dây nối màn hình với kim phun' },
      { id: 'd', text: 'Mọi City 2024 dùng một ID CAN đã chốt trong bài này' },
    ],
    answer: 'a',
    explain: 'Đây là [TYPICAL]. ID khung và việc City 2024 có những bus nào phải xem tài liệu xe.',
  },
  {
    id: 'q5',
    prompt: 'Vì sao hộp SRS không nhận lệnh bung từ màn hình?',
    choices: [
      { id: 'a', text: 'Vì bung túi là quyết định an toàn, phải độc lập với miền giải trí' },
      { id: 'b', text: 'Vì màn hình không có điện' },
      { id: 'c', text: 'Vì City không có túi khí' },
      { id: 'd', text: 'Vì CAN không tồn tại trên Honda' },
    ],
    answer: 'a',
    explain: 'Tách miền để lỗi phần mềm giải trí không trở thành lệnh túi khí. Đường nối thật của SRS vẫn là [VERIFY].',
  },
]

const essays: Essay[] = [
  {
    id: 'e1',
    prompt: 'Trace một lần bật đèn pha từ tay người lái đến mass. Đánh dấu chỗ nào là giả định.',
    guide:
      'Tay bật công tắc. Tín hiệu vào BCM [TYPICAL HONDA ARCHITECTURE]. BCM đóng rơ-le hoặc transistor công suất, qua cầu chì, tới đèn, về mass thân xe rồi về cực âm ắc quy. Số cầu chì, chỗ hộp chì và việc có module đèn riêng là [VERIFY WITH SERVICE MANUAL].',
  },
  {
    id: 'e2',
    prompt: 'Xe không đề. Đi từ ắc quy tới mô-tơ đề và nói đo gì bằng đồng hồ, chưa cần số chân.',
    guide:
      'Đo điện áp ắc quy khi nghỉ và khi vặn đề để thấy sụt. Nhìn cực và mass. Nếu đèn còn sáng mà không có tiếng tạch, nghi cầu chì, rơ-le, điều kiện P/N, hoặc immobilizer. Hộp nào cho phép đề trên City 2024 là [VERIFY]. Không nhảy thẳng tới thay máy đề.',
  },
  {
    id: 'e3',
    prompt: 'Nhiều hộp cùng báo mất liên lạc, một cảm biến nhiệt vẫn đọc được ở PCM. Bạn nghi CAN hay nghi mass cảm biến?',
    guide:
      'Mất liên lạc hàng loạt nghi dây CAN chung, trở đầu bus, hoặc một hộp làm bẩn bus. Một cảm biến còn đọc được cho thấy PCM còn sống và mass cảm biến đó chưa phải thủ phạm duy nhất. Đo hai dây CAN khi bus thức bằng máy hiện sóng là bước sau, theo sơ đồ, không theo màu trong bài học.',
  },
]

const base = assemble(
  'L33',
  'electrical',
  'Mũi xe bên trái, nhìn nghiêng như poster. Thân trong suốt, dây và tên G1–G6 là sơ đồ học, không phải bó dây hay mã mass của Honda. Màu không phải màu dây hãng. Tốc độ CAN, dòng đèn và tên cầu chì trên poster chưa được đối chiếu service manual. Số chân: PIN NUMBER NOT VERIFIED.',
  'pcm',
  flows,
  layers,
  [
    detail('battery', 'Ắc quy 12V', '12V battery', ['electrical', 'ground'], 'Nguồn một chiều và điểm mass gốc tại cực âm.', 'Nuôi xe khi máy chưa quay và đệm khi tải đột ngột.', 'Yếu, lỏng cực, hoặc sulfat.', 'Đề chậm, đèn mờ, nhiều hộp reset.', '12V battery'),
    detail('alternator', 'Máy phát', 'Alternator', ['electrical'], 'Tạo điện xoay chiều rồi chỉnh thành một chiều khi máy quay. Cách PCM điều khiển máy phát trên City 2024 là [VERIFY].', 'Ắc quy không nuôi cả chuyến đi.', 'Mất nạp hoặc nạp quá áp.', 'Đèn ắc quy, hoặc ắc quy sôi.', 'Alternator'),
    detail('starter', 'Máy đề', 'Starter', ['electrical'], 'Mô-tơ kéo vành răng khi được rơ-le cấp điện.', 'Đưa máy tới tua có thể cháy.', 'Rơ-le, than, hoặc vành răng.', 'Im, hoặc một tiếng tạch.', 'Starter'),
    detail('fuse', 'Hộp chì khoang máy', 'Engine fuse box', ['electrical'], 'Poster gọi một cầu chì chính là FL rồi chia vào hộp khoang máy. Tên và vị trí đó là [VERIFY WITH SERVICE MANUAL].', 'Một ngắn mạch không được đốt cả xe.', 'Chì đứt hoặc rơ-le dính.', 'Một cụm chết, cụm khác còn.', 'Engine fuse box'),
    detail('cabinFuse', 'Hộp chì cabin', 'Cabin fuse box', ['electrical'], 'Nhánh thân xe, đèn, khóa và tiện nghi thường qua hộp dưới taplo. Chỗ lắp trên City 2024 là [VERIFY].', 'Tách tải cabin khỏi tải máy.', 'Cháy một chì cabin.', 'Đèn hoặc kính chết, máy vẫn nổ.', 'Cabin fuse box'),
    detail('pcm', 'PCM máy', 'Powertrain module', ['electrical', 'data', 'can', 'ground'], 'Hộp tính xăng, lửa và ga. Có thể gồm cả điều khiển CVT. [VERIFY] tên và số hộp trên xe.', 'Không có hộp này thì không có cháy điều khiển.', 'Mất nguồn, mất mass, hoặc mất cảm biến mốc.', 'Không nổ, đèn máy.', 'PCM'),
    detail('abs', 'ABS/VSA', 'ABS / VSA', ['electrical', 'can'], 'Đọc tốc độ bánh, điều van dầu, và với VSA thì cả góc lái và gia tốc ngang. [TYPICAL HONDA]', 'Giữ bánh không khóa và kéo xe khỏi trượt.', 'Cảm biến bánh hoặc mất CAN.', 'Đèn ABS hoặc VSA.', 'ABS / VSA'),
    detail('bcm', 'BCM', 'Body module', ['electrical', 'lin', 'can'], 'Hộp thân xe. Thường là master LIN cho cửa và một số actuator. [TYPICAL]', 'Đèn và khóa không cần đứng trong PCM.', 'Mất nguồn hoặc lỗi phần mềm thân xe.', 'Đèn, khóa hoặc kính chết trong khi máy vẫn nổ.', 'BCM'),
    detail('eps', 'EPS', 'Electric power steering', ['electrical', 'can'], 'Mô-tơ trợ lực, dùng mô-men vành và tốc độ xe.', 'Giảm lực tay mà vẫn còn cơ khí thước lái.', 'Mất điện hoặc mất tốc độ xe trên CAN.', 'Vô-lăng nặng, đèn lái.', 'EPS'),
    detail('srs', 'SRS', 'Airbag module', ['electrical', 'can'], 'Quyết định bung túi từ cảm biến va chạm. Không lấy lệnh từ màn hình. Bus thật là [VERIFY].', 'An toàn bị động phải độc lập.', 'Đèn SRS. Không đo squib.', 'Đèn túi khí.', 'SRS'),
    detail('cluster', 'Đồng hồ', 'Instrument cluster', ['can'], 'Hiện tốc độ, đèn báo, bằng dữ liệu nhận trên mạng.', 'Người lái cần thấy hộp nào đang lỗi.', 'Mất nguồn hoặc mất CAN.', 'Đồng hồ tối hoặc kim nằm im.', 'Cluster'),
    detail('ivi', 'Màn hình', 'Infotainment', ['can'], 'Xem một số dữ liệu xe qua cổng nối. Không lệnh cho kim phun hay túi khí.', 'Giao diện tách khỏi điều khiển cháy.', 'Treo đầu máy.', 'Màn hình đen, máy vẫn có thể nổ.', 'Infotainment'),
    detail('hvac', 'Điều hòa', 'HVAC', ['lin', 'data'], 'Đọc nhiệt cabin, điều quạt, cánh gió và yêu cầu máy nén. Đường nói chuyện là [VERIFY] LIN hoặc CAN.', 'Tách tiện nghi khỏi PCM, nhưng máy nén vẫn lấy công từ máy.', 'Mất cảm biến hoặc mất lệnh máy nén.', 'Không mát, hoặc mát không đúng nhiệt.', 'HVAC'),
    detail('door', 'Cửa trước', 'Front door', ['lin'], 'Poster vẽ module cửa. City có thể chỉ là công tắc và motor về BCM. [VERIFY]', 'Dây bản lề cửa mỏi trước các bó khác.', 'Đứt bó cửa.', 'Một cửa mất kính hoặc khóa.', 'Front door'),
    detail('doorR', 'Cửa sau', 'Rear door', ['lin'], 'Cùng kiểu với cửa trước trên sơ đồ học. Số module thật là [VERIFY].', 'Tách cửa sau khỏi cửa trước để một đứt dây không tắt cả xe.', 'Đứt dây cửa sau.', 'Chỉ cửa sau chết.', 'Rear door'),
    detail('tpms', 'TPMS', 'Tire pressure', ['can'], 'Poster đặt bộ nhận áp suất lốp phía sau. Có thể chỉ là bộ thu van, không phải ECU riêng. [VERIFY]', 'Báo lốp non trước khi người lái cảm thấy xe kéo.', 'Hết pin van hoặc mất tín hiệu.', 'Đèn lốp.', 'TPMS'),
    detail('park', 'Camera lùi', 'Parking camera', ['can', 'data'], 'Camera hoặc cảm biến đỗ lấy hình hoặc khoảng cách đưa lên màn hình. Bản xe không có camera thì bỏ khối này. [VERIFY trim]', 'Hỗ trợ lùi, không điều khiển phanh.', 'Mất nguồn camera hoặc đứt cáp.', 'Màn hình không có hình lùi.', 'Camera'),
    detail('antenna', 'Anten', 'Antenna', ['can'], 'Poster gắn anten trên nóc cho chìa khóa thông minh hoặc định vị. Kiểu anten của City 2024 là [VERIFY].', 'Sóng vào xe không đi qua PCM.', 'Đứt cáp nóc.', 'Mất sóng khóa hoặc radio.', 'Antenna'),
    detail('lamp', 'Đèn pha', 'Headlamp', ['electrical', 'ground'], 'Poster trace: công tắc, BCM, CAN hoặc LIN, driver hoặc rơ-le, cầu chì, đèn, mass. Dòng 8–12A trên poster là ví dụ đèn sợi đốt. Nhiều City dùng LED, dòng thấp hơn. [VERIFY]', 'BCM điều khiển để đồng hồ và xe khác thấy cùng trạng thái đèn.', 'Cháy chì, hỏng driver, hoặc mất mass đèn.', 'Một bên hoặc cả hai pha tối.', 'Headlamp'),
    detail('switch', 'Công tắc đèn', 'Light switch', ['data'], 'Tay người lái thành tín hiệu vào BCM.', 'BCM mới biết yêu cầu, rồi mới cấp điện cho đèn.', 'Công tắc đứt.', 'Không sáng dù chì còn.', 'Switch'),
    detail('sensors', 'Cảm biến máy', 'Engine sensors', ['data', 'ground'], 'CKP, CMP, MAP hoặc MAF, TPS, nhiệt nước, ô-xy. Bộ nào có trên City 2024 là [VERIFY]. Mass cảm biến là G6 trên sơ đồ học.', 'PCM cần mốc thời gian và lượng khí trước khi tính xăng và lửa.', 'Đứt một cảm biến mốc.', 'Không nổ hoặc nổ rung.', 'CKP CMP MAP'),
    detail('mech', 'Cơ khí', 'Mechanical layer', ['mechanical'], 'Máy, hộp số, thước lái, phanh, cánh gió điều hòa. Lớp này nhận lực từ cơ cấu điện.', 'Điện không tự làm xe chạy. Cơ khí mới biến lệnh thành chuyển động.', 'Kẹt cơ khí dù điện còn.', 'Có lệnh mà không có chuyển động.', 'Mechanical'),
    detail('g1', 'G1 máy', 'Engine ground', ['ground'], 'Mass động cơ trên poster. Mã ốc mass thật của Honda không phải chữ G1. [VERIFY]', 'Dòng đề và dòng máy phát cần đường về ngắn, chắc.', 'Ốc rỉ.', 'Đề yếu, nạp kém.', 'G1'),
    detail('g2', 'G2 hộp số', 'Transmission ground', ['ground'], 'Mass hộp số trên poster. CVT City có thể dùng chung mass máy. [VERIFY]', 'Tách dòng hộp số khỏi mass cảm biến.', 'Lỏng dây mass hộp.', 'Giật số hoặc mất tín hiệu tốc độ.', 'G2'),
    detail('g3', 'G3 khung', 'Chassis ground', ['ground'], 'Mass khung sườn, điểm về chung của nhiều tải.', 'Khung dẫn điện trở về ắc quy nếu các điểm bắt còn sạch.', 'Sơn hoặc rỉ tại điểm bắt.', 'Nhiều tải cùng yếu.', 'G3'),
    detail('g4', 'G4 thân xe', 'Body ground', ['ground'], 'Mass thân, đèn và BCM về đây trên sơ đồ học.', 'Đèn cần mass gần cụm đèn, không đi vòng qua mass cảm biến.', 'Mass đèn đứt.', 'Đèn mờ hoặc sáng lúc có lúc không.', 'G4'),
    detail('g5', 'G5 ECU', 'ECU ground', ['ground'], 'Mass hộp điều khiển. Không dùng chung một ốc với cáp đề nếu sơ đồ tách chúng. [TYPICAL]', 'Hộp cần mốc 0V ổn định để nói CAN.', 'Mass ECU lỏng.', 'Nhiều hộp cùng mất liên lạc.', 'G5'),
    detail('g6', 'G6 cảm biến', 'Sensor ground', ['ground'], 'Mass tín hiệu, dòng rất nhỏ. Tách khỏi mass động lực để đo không bị kéo.', '5V tham chiếu chỉ đúng khi mass cảm biến sạch.', 'Mass cảm biến chung với quạt hoặc đèn.', 'Số đo nhiệt hoặc ga trôi.', 'G6'),
    detail('app', 'Bàn đạp ga', 'Accelerator pedal', ['data'], 'Hai kênh điện áp là kiểu phổ biến để PCM đối chiếu. [TYPICAL] Số volt và số chân [VERIFY].', 'Yêu cầu mô-men phải có kiểm chéo.', 'Hai kênh lệch.', 'Ga chết hoặc ga giới hạn.', 'APP sensor'),
    detail('throttle', 'Bướm ga', 'Electronic throttle', ['data', 'electrical'], 'Mô-tơ mở cánh gió theo lệnh PCM, rồi báo lại vị trí.', 'Khép vòng điều khiển khí.', 'Kẹt hoặc mất nguồn mô-tơ.', 'Không tăng tốc, đèn máy.', 'Throttle'),
    detail('injector', 'Kim phun', 'Injector', ['data', 'electrical'], 'PCM đóng mass hoặc cấp nguồn theo kiểu driver của đời xe. [VERIFY] chiều điều khiển.', 'Biến thời gian mở thành lượng xăng.', 'Đứt dây hoặc tắc kim.', 'Rung, một xy-lanh bỏ.', 'Injector'),
    detail('coil', 'Mô-bin', 'Ignition coil', ['electrical'], 'PCM quyết định thời điểm, mô-bin tạo xung cao áp cho bugi.', 'Có xăng và khí vẫn cần lửa đúng lúc.', 'Mô-bin hoặc bugi một máy.', 'Rung, mã bỏ cháy.', 'Ignition coil'),
  ],
  quiz,
  essays,
)

export const LEVEL9: Record<string, LessonPack> = {
  L33: {
    ...base,
    views: [
      { id: 'layers', label: 'Bốn lớp', diagram: layers },
      { id: 'topology', label: 'Các hộp', diagram: topology },
      { id: 'power', label: 'Nguồn', diagram: power },
      { id: 'grounds', label: 'Mass', diagram: grounds },
      { id: 'lamp', label: 'Đèn pha', diagram: lampFlow },
      { id: 'engine', label: 'Máy', diagram: engine },
    ],
  },
}
