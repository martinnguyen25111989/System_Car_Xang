export const FLOWS = [
  {
    id: 'energy',
    label: 'Năng lượng',
    hint: 'Xăng trong bình cháy trong máy và thành công',
  },
  {
    id: 'mechanical',
    label: 'Cơ khí',
    hint: 'Mô-men đi từ máy qua hộp số, vi sai, tới bánh',
  },
  {
    id: 'electrical',
    label: 'Điện 12V',
    hint: 'Ắc quy nuôi ECU, đánh lửa và bơm xăng',
  },
  {
    id: 'data',
    label: 'Dữ liệu',
    hint: 'Cảm biến bàn đạp báo ECU, ECU ra lệnh cho máy',
  },
  {
    id: 'thermal',
    label: 'Nhiệt',
    hint: 'Nhiệt của sự cháy ra két nước và ống xả',
  },
] as const

export type FlowId = (typeof FLOWS)[number]['id']

export const FLOW_COLOR: Record<FlowId, string> = {
  energy: '#e3a008',
  mechanical: '#7ea0c4',
  electrical: '#e15b64',
  data: '#3dbe7a',
  thermal: '#f07a3a',
}

export type NodeId =
  | 'driver'
  | 'pedal'
  | 'battery'
  | 'ecu'
  | 'tank'
  | 'engine'
  | 'radiator'
  | 'trans'
  | 'diff'
  | 'wheels'
  | 'road'
  | 'cabin'
  | 'exhaust'

export type PartDetail = {
  id: NodeId
  title: string
  en: string
  chip?: string
  what: string
  why: string
  failure: string
  symptom: string
}

export const PART_FLOWS: Record<NodeId, FlowId[]> = {
  driver: ['data'],
  pedal: ['data'],
  battery: ['electrical'],
  ecu: ['data', 'electrical'],
  tank: ['energy'],
  engine: ['energy', 'mechanical', 'data', 'electrical', 'thermal'],
  radiator: ['thermal'],
  trans: ['mechanical'],
  diff: ['mechanical'],
  wheels: ['mechanical'],
  road: ['mechanical'],
  cabin: ['data'],
  exhaust: ['thermal'],
}

export function isFlowActive(id: NodeId, flows: ReadonlySet<FlowId>): boolean {
  return PART_FLOWS[id].some((flow) => flows.has(flow))
}

export const DETAILS: Record<NodeId, PartDetail> = {
  driver: {
    id: 'driver',
    title: 'Người lái',
    en: 'Driver',
    what: 'Người đưa ý định: đi nhanh hơn, chậm lại, rẽ hoặc dừng. Chân, tay và mắt là đầu vào của cả hệ thống.',
    why: 'Xe không tự biết hành khách muốn đi đâu. Mọi lệnh ga, phanh và lái đều bắt đầu từ đây.',
    failure: 'Đây không phải một bộ phận của xe. Nếu không có tín hiệu từ người lái, xe chỉ đứng hoặc chạy đều theo trạng thái hiện tại.',
    symptom: 'Máy vẫn nổ nhưng xe không tăng tốc, vì chưa có lệnh ga.',
  },
  pedal: {
    id: 'pedal',
    title: 'Bàn đạp ga',
    en: 'Accelerator pedal',
    chip: 'Accelerator',
    what: 'Bàn đạp đo mức người lái muốn thêm lực. Trên đa số xe xăng đời mới, một cảm biến biến độ nhấn thành tín hiệu điện. Kiểu này gọi là drive-by-wire – dẫn động ga bằng điện.',
    why: 'ECU cần biết người lái muốn bao nhiêu mô-men để tính lượng xăng, góc bướm ga và thời điểm đánh lửa.',
    failure: 'Cảm biến bàn đạp hỏng hoặc mất tín hiệu thì ECU không còn số liệu tin cậy. Một số xe cũ vẫn kéo bướm ga bằng dây cáp. Đừng coi mọi xe xăng đều dùng điện.',
    symptom: 'Đạp ga mà xe không bốc, giật, hoặc sáng đèn kiểm tra máy. Có xe rơi vào chế độ chạy giới hạn.',
  },
  battery: {
    id: 'battery',
    title: 'Ắc quy 12V',
    en: '12V battery',
    chip: '12V battery',
    what: 'Nguồn điện một chiều khoảng 12 volt. Nó nuôi ECU, bơm xăng, đánh lửa, đèn và máy đề khi máy chưa quay.',
    why: 'Xăng chứa năng lượng để đẩy xe, nhưng máy tính và bugi cần điện thì mới đốt được xăng đó. Khi máy đã nổ, máy phát sạc lại ắc quy.',
    failure: 'Ắc quy yếu hoặc đứt mass làm mất điện nuôi hộp điều khiển. Xe có thể không đề được dù bình xăng vẫn đầy.',
    symptom: 'Đề yếu, đèn mờ, hoặc im hoàn toàn khi vặn chìa. Đây là điện 12V, không phải pin kéo xe của xe điện.',
  },
  ecu: {
    id: 'ecu',
    title: 'ECU',
    en: 'Engine Control Unit',
    chip: 'Engine computer',
    what: 'Máy tính điều khiển máy xăng. Nó đọc cảm biến rồi ra lệnh cho kim phun, bướm ga và đánh lửa. Trên xe còn nhiều hộp khác. Bài này chỉ nói hộp của máy.',
    why: 'Lượng xăng và thời điểm lửa phải đổi theo độ mở ga, nhiệt độ và tốc độ máy. Một cơ cấu cơ khí đơn giản không tính nổi việc đó trên xe đời mới.',
    failure: 'Mất nguồn, hỏng phần cứng hoặc lỗi phần mềm có thể làm máy không nổ, chết giữa đường, hoặc chỉ chạy ở mức tối thiểu.',
    symptom: 'Đèn kiểm tra máy, khó nổ, chết máy, hoặc đạp ga không còn phản ứng đúng.',
  },
  tank: {
    id: 'tank',
    title: 'Bình xăng',
    en: 'Fuel tank',
    what: 'Kho năng lượng hóa học của xe. Xăng nằm ở đây rồi được bơm lên máy. Trên nhiều xe con, bình đặt dưới hàng ghế sau.',
    why: 'Máy chỉ đốt được một lượng xăng nhỏ mỗi thì. Phần còn lại phải có chỗ chứa cho cả chuyến đi.',
    failure: 'Hết xăng, bơm trong bình hỏng, hoặc đường ống tắc thì máy không còn gì để đốt. Rò xăng là việc cần xử lý ngay vì dễ cháy.',
    symptom: 'Xe chết dần, đề không nổ, hoặc có mùi xăng. Đồng hồ nhiên liệu là ước lượng, không phải dụng cụ đo chính xác trên mọi đời xe.',
  },
  engine: {
    id: 'engine',
    title: 'Máy xăng',
    en: 'Gasoline engine',
    what: 'Nơi xăng và không khí cháy, đẩy piston, làm quay trục khuỷu. Chuyển động thẳng của piston thành chuyển động quay. Đó là mô-men đưa ra hộp số.',
    why: 'Xe cần một nguồn mô-men liên tục. Máy đốt trong tạo mô-men đó từ năng lượng trong xăng.',
    failure: 'Thiếu xăng, thiếu lửa, thiếu khí hoặc mất độ nén thì không có cháy. Máy có thể không nổ, rung, yếu, hoặc chỉ chạy bằng một phần số xy-lanh.',
    symptom: 'Không nổ, rung bất thường, khói, tiếng gõ, hoặc hết sức khi lên dốc. Piston trong mô hình 3D chỉ để thấy nhịp máy. Mặt cắt bốn thì nằm ở bài sau.',
  },
  radiator: {
    id: 'radiator',
    title: 'Két nước',
    en: 'Radiator',
    what: 'Bộ trao đổi nhiệt ở đầu xe. Nước làm mát mang nhiệt từ máy ra đây, gió đi qua két và đưa nhiệt ra không khí.',
    why: 'Sự cháy tạo nhiều nhiệt hơn phần biến thành công. Nếu nhiệt không thoát, kim loại máy vượt quá nhiệt độ làm việc.',
    failure: 'Két tắc, thiếu nước, quạt không quay hoặc van hằng nhiệt kẹt làm nhiệt không ra khỏi máy. Bài nhiệt sẽ đi vào từng chi tiết.',
    symptom: 'Kim nhiệt lên cao, quạt kêu to, hơi nước dưới nắp ca-pô, hoặc xe bớt sức khi đã nóng.',
  },
  trans: {
    id: 'trans',
    title: 'Hộp số',
    en: 'Transmission',
    what: 'Cụm bánh răng hoặc đai thay đổi tỉ số giữa vòng quay của máy và vòng quay của bánh. Máy xăng chỉ khỏe trong một dải vòng tua.',
    why: 'Không có hộp số, máy hoặc không đủ lực để đề pa, hoặc quay quá nhanh khi xe đã chạy đều.',
    failure: 'Trượt bộ truyền, hết dầu số, hoặc không vào số làm mô-men không sang được bánh. Máy vẫn có thể nổ bình thường.',
    symptom: 'Máy gào lên mà xe chậm, giật khi tăng tốc, hoặc không nhích khi đã vào số. Nhiều đời City dùng CVT. Xe khác có thể dùng số sàn hoặc số tự động có cấp.',
  },
  diff: {
    id: 'diff',
    title: 'Vi sai',
    en: 'Differential',
    what: 'Bộ bánh răng cho hai bánh dẫn động quay khác tốc độ lúc vào cua. Trên xe cầu trước, vi sai thường nằm trong cụm hộp số, gọi là transaxle.',
    why: 'Khi quay đầu, bánh phía ngoài đi quỹ đạo dài hơn bánh phía trong. Nếu khóa cứng hai bánh, lốp sẽ bị kéo trượt.',
    failure: 'Bánh răng mòn hoặc mất dầu gây ồn và cuối cùng mất truyền lực sang một bánh.',
    symptom: 'Tiếng hú khi cua hoặc khi nhả ga. Xe dẫn động cầu sau đặt vi sai ở cầu sau, không giống City.',
  },
  wheels: {
    id: 'wheels',
    title: 'Bánh xe',
    en: 'Wheels and tires',
    chip: 'Wheels',
    what: 'Vành và lốp biến mô-men thành lực đẩy tại mặt tiếp xúc với đường. Trên xe cầu trước, hai bánh trước là bánh nhận lực.',
    why: 'Mô-men trong trục chưa làm xe tiến. Xe tiến khi lốp đẩy lùi mặt đường và mặt đường đẩy xe về phía trước.',
    failure: 'Lốp non, mòn, hoặc mất bám làm cùng một mô-men không còn ra lực đẩy. Trục láp gãy thì một bánh không nhận lực.',
    symptom: 'Xe kéo lệch, tiếng kêu ở bánh, hoặc máy khỏe mà xe không bám khi đường trơn.',
  },
  road: {
    id: 'road',
    title: 'Mặt đường',
    en: 'Road',
    what: 'Bề mặt tạo ma sát với lốp. Đây là chỗ lực đẩy thực sự xuất hiện.',
    why: 'Cùng một mô-men ở bánh cho gia tốc rất khác trên đường khô, đường mưa và cát.',
    failure: 'Mặt đường không phải chi tiết sửa được của xe. Mất ma sát làm hệ thống phanh và ga không còn tác dụng như trên đường khô.',
    symptom: 'Vòng tua tăng, bánh quay, nhưng xe không tiến tương ứng. Đó là mất bám, chưa chắc máy hỏng.',
  },
  cabin: {
    id: 'cabin',
    title: 'Cabin',
    en: 'Cabin',
    what: 'Khoang người ngồi. Vô-lăng, bàn đạp, ghế và cụm đồng hồ nằm ở đây.',
    why: 'Đây là nơi ý định của người lái được tạo ra và nơi người lái quan sát phản ứng của xe.',
    failure: 'Ghế, cửa kính và màn hình hỏng không làm mất mô-men của máy, nhưng có thể làm xe không an toàn để chạy.',
    symptom: 'Các thiết bị trong cabin sẽ thành bài riêng. Ở bài này, cabin chỉ đánh dấu chỗ người lái ngồi.',
  },
  exhaust: {
    id: 'exhaust',
    title: 'Đường xả',
    en: 'Exhaust',
    what: 'Ống đưa khí đã cháy từ máy ra phía sau xe. Khí này mang theo một phần nhiệt.',
    why: 'Xy-lanh phải đẩy khí cũ ra thì thì sau mới nạp được khí mới. Đường xả là lối ra đó.',
    failure: 'Tắc đường xả làm máy không thở được, yếu dần hoặc không nổ. Bài khí thải sẽ nói bộ xúc tác và cảm biến ô-xy.',
    symptom: 'Máy yếu, tiếng xả bất thường, hoặc mùi khí cháy lọt vào cabin. Mùi đó cần được xử lý, không phải chỉ là chuyện ồn.',
  },
}

type SpineRow = { kind: 'spine'; id: NodeId; below: FlowId[] }
type PairRow = { kind: 'pair'; from: NodeId; to: NodeId; flow: FlowId; below: FlowId[] }
type TrioRow = {
  kind: 'trio'
  left: NodeId
  leftFlow: FlowId
  center: NodeId
  right: NodeId
  rightFlow: FlowId
  below: FlowId[]
}

export type DiagramRow = SpineRow | PairRow | TrioRow

export const DIAGRAM: DiagramRow[] = [
  { kind: 'spine', id: 'driver', below: ['data'] },
  { kind: 'spine', id: 'pedal', below: ['data'] },
  { kind: 'pair', from: 'battery', to: 'ecu', flow: 'electrical', below: ['data', 'electrical'] },
  {
    kind: 'trio',
    left: 'tank',
    leftFlow: 'energy',
    center: 'engine',
    right: 'radiator',
    rightFlow: 'thermal',
    below: ['mechanical'],
  },
  { kind: 'spine', id: 'trans', below: ['mechanical'] },
  { kind: 'spine', id: 'diff', below: ['mechanical'] },
  { kind: 'spine', id: 'wheels', below: ['mechanical'] },
  { kind: 'spine', id: 'road', below: [] },
]

export type Mcq = {
  id: string
  prompt: string
  choices: { id: string; text: string }[]
  answer: string
  explain: string
}

export const QUIZ: Mcq[] = [
  {
    id: 'q1',
    prompt: 'Nguồn năng lượng chính để đẩy một chiếc xe xăng đi là gì?',
    choices: [
      { id: 'a', text: 'Ắc quy 12V' },
      { id: 'b', text: 'Xăng trong bình nhiên liệu' },
      { id: 'c', text: 'Máy phát điện' },
      { id: 'd', text: 'Ma sát của mặt đường' },
    ],
    answer: 'b',
    explain:
      'Xăng chứa năng lượng hóa học mà máy đốt thành công. Ắc quy chỉ nuôi điện 12V. Máy phát sạc lại ắc quy. Ma sát là chỗ lực được truyền xuống đường, không phải nguồn năng lượng.',
  },
  {
    id: 'q2',
    prompt: 'Trên xe ga điện tử, bàn đạp ga gửi gì vào hệ thống?',
    choices: [
      { id: 'a', text: 'Một sợi dây kéo thẳng bướm ga' },
      { id: 'b', text: 'Tín hiệu cảm biến để ECU tính xăng và lửa' },
      { id: 'c', text: 'Dầu phanh tới bánh trước' },
      { id: 'd', text: 'Dòng điện cao áp vào một motor kéo' },
    ],
    answer: 'b',
    explain:
      'Drive-by-wire nghĩa là cảm biến báo độ nhấn, ECU ra lệnh. Nhiều đời City gần đây làm vậy. Một số xe xăng cũ vẫn dùng dây cáp, nên không được coi đây là luật của mọi xe.',
  },
  {
    id: 'q3',
    prompt: 'Trên xe cầu trước như nhiều đời Honda City, vi sai nằm ở đâu?',
    choices: [
      { id: 'a', text: 'Giữa hai bánh sau' },
      { id: 'b', text: 'Trong cụm hộp số phía trước, rồi ra hai trục láp' },
      { id: 'c', text: 'Trong két nước' },
      { id: 'd', text: 'Dưới bình xăng' },
    ],
    answer: 'b',
    explain:
      'Cầu trước gộp hộp số và vi sai thành transaxle, truyền lực ra hai bánh trước. Xe cầu sau đặt vi sai ở cầu sau. City không phải sơ đồ của mọi ô tô.',
  },
  {
    id: 'q4',
    prompt: 'Khi xe đang chạy, năm luồng năng lượng, cơ khí, điện, dữ liệu và nhiệt quan hệ thế nào?',
    choices: [
      { id: 'a', text: 'Hết luồng này rồi mới tới luồng kia' },
      { id: 'b', text: 'Chúng diễn ra cùng lúc trên các đường khác nhau' },
      { id: 'c', text: 'Chỉ có luồng cơ khí, các tên kia là cách gọi khác của mô-men' },
      { id: 'd', text: 'Luồng nhiệt chỉ xuất hiện khi xe hỏng' },
    ],
    answer: 'b',
    explain:
      'Người lái gửi dữ liệu, ắc quy nuôi điện, xăng thành công, mô-men ra bánh, và nhiệt thoát ra két nước trong cùng một lúc. Nhiệt là sản phẩm của sự cháy, không phải dấu hiệu xe đã hỏng.',
  },
  {
    id: 'q5',
    prompt: 'Máy nổ, đã vào số, nhưng xe không lăn bánh. Nhóm nào đáng xem trước?',
    choices: [
      { id: 'a', text: 'Đường truyền mô-men: hộp số, vi sai, trục láp, bánh' },
      { id: 'b', text: 'Chỉ két nước' },
      { id: 'c', text: 'Chỉ loa trong cabin' },
      { id: 'd', text: 'Chỉ cảm biến khoảng cách phía sau' },
    ],
    answer: 'a',
    explain:
      'Máy nổ nghĩa là đã có cháy và có mô-men ở trục khuỷu. Đứt mạch ở đoạn sau đó: hộp số, vi sai, láp hoặc bánh không bám. Két nước thuộc luồng nhiệt, không phải nguyên nhân đầu tiên của ca này.',
  },
]

export const ESSAYS: { id: string; prompt: string; guide: string }[] = [
  {
    id: 'e1',
    prompt:
      'Kể lại đường đi từ lúc chân nhấn ga đến lúc Honda City cầu trước lăn bánh. Dùng lời của bạn, không cần đủ tên chi tiết.',
    guide:
      'Chân nhấn bàn đạp. Cảm biến báo ECU mức người lái muốn. ECU lệnh bướm ga, kim phun và bugi. Hỗn hợp cháy, piston làm quay trục khuỷu. Mô-men qua hộp số và vi sai trong cụm số cầu trước, ra hai trục láp, tới hai bánh trước. Lốp đẩy mặt đường, xe tiến. Cùng lúc, ắc quy nuôi ECU và nhiệt của sự cháy đi ra két nước cùng ống xả.',
  },
  {
    id: 'e2',
    prompt: 'Chọn luồng nhiệt. Ở mức bài này, nhiệt đi qua những bộ phận nào?',
    guide:
      'Sự cháy trong máy tạo nhiệt. Một phần thành công trên trục khuỷu. Phần nhiệt thừa theo nước làm mát tới két nước rồi nhả ra không khí trước đầu xe, và theo khí đã cháy ra đường xả. Bơm nước và van hằng nhiệt sẽ được học ở bài nhiệt.',
  },
  {
    id: 'e3',
    prompt: 'Phân biệt hai ca: xe không nổ máy, và xe nổ nhưng không chạy. Mỗi ca nằm ở đoạn nào của chuỗi?',
    guide:
      'Không nổ nghĩa là chưa có cháy ổn định. Nhìn đoạn năng lượng và điện: xăng, lửa, khí, ắc quy, máy đề, tín hiệu ECU. Nổ nhưng không chạy nghĩa là cháy đã có, mô-men không tới mặt đường. Nhìn hộp số, vi sai, trục láp và độ bám của lốp. Hai triệu chứng trỏ hai đoạn khác nhau.',
  },
]
