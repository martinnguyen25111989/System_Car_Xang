import type { DiagramRow, Essay, Mcq } from '../lesson01.ts'
import { assemble, detail, pickFlows, type LessonPack } from '../pack.ts'

const blocks =
  'Kéo để xoay, lăn để phóng to. Khối 3D xếp theo sơ đồ của bài, không phải CAD của một đời xe.'
const engine =
  'Kéo để xoay. Bốn piston thẳng hàng: hai piston ngoài cùng pha, hai piston giữa ngược pha. Xupap và trục khuỷu chỉ chuyển khi bấm chạy. Đây là sơ đồ động, không phải bản vẽ một mã máy Honda.'

const l05Diagram: DiagramRow[] = [
  { kind: 'spine', id: 'block', below: ['mechanical'] },
  { kind: 'trio', left: 'valve', leftFlow: 'intake', center: 'piston', right: 'plug', rightFlow: 'electrical', below: ['mechanical'] },
  { kind: 'spine', id: 'crank', below: ['mechanical'] },
  { kind: 'pair', from: 'cam', to: 'belt', flow: 'mechanical', below: ['mechanical'] },
  { kind: 'pair', from: 'oil', to: 'water', flow: 'thermal', below: ['mechanical'] },
  { kind: 'spine', id: 'flywheel', below: [] },
]

const l05Quiz: Mcq[] = [
  {
    id: 'q1',
    prompt: 'Piston đổi chuyển động nào thành chuyển động nào?',
    choices: [
      { id: 'a', text: 'Quay thành thẳng, nhờ trục cam' },
      { id: 'b', text: 'Thẳng trong xy-lanh thành quay của trục khuỷu, qua thanh truyền' },
      { id: 'c', text: 'Điện thành xăng' },
      { id: 'd', text: 'Nhiệt két nước thành mô-men' },
    ],
    answer: 'b',
    explain: 'Khí cháy đẩy piston đi thẳng. Thanh truyền và khuỷu biến thành quay. Trục cam không làm việc đó.',
  },
  {
    id: 'q2',
    prompt: 'Trục cam quyết định việc gì?',
    choices: [
      { id: 'a', text: 'Lúc xupap mở và đóng' },
      { id: 'b', text: 'Áp suất lốp' },
      { id: 'c', text: 'Mức xăng trên đồng hồ' },
      { id: 'd', text: 'Góc đánh lái' },
    ],
    answer: 'a',
    explain: 'Cam đẩy xupap. Thời điểm đó phải khớp trục khuỷu qua đai hoặc xích. Lệch nhịp là máy mất thì hoặc hỏng xupap.',
  },
  {
    id: 'q3',
    prompt: 'Bánh đà gắn với chi tiết nào?',
    choices: [
      { id: 'a', text: 'Trục khuỷu' },
      { id: 'b', text: 'Két nước' },
      { id: 'c', text: 'Bơm xăng trong bình' },
      { id: 'd', text: 'Vô-lăng' },
    ],
    answer: 'a',
    explain: 'Bánh đà trữ quán tính giữa các thì nổ và là chỗ máy đề ăn vào vành răng. Nó nằm cuối trục khuỷu, phía hộp số.',
  },
  {
    id: 'q4',
    prompt: 'Bơm dầu và bơm nước khác nhau ở luồng nào?',
    choices: [
      { id: 'a', text: 'Dầu bôi trơn bề mặt. Nước mang nhiệt ra két' },
      { id: 'b', text: 'Hai bơm là một chi tiết' },
      { id: 'c', text: 'Nước bôi trơn bạc trục khuỷu' },
      { id: 'd', text: 'Dầu làm mát cabin' },
    ],
    answer: 'a',
    explain: 'Thiếu dầu thì bề mặt kim loại cọ khô. Thiếu nước hoặc nước không chạy thì nhiệt ứ. Không đổ dầu vào két.',
  },
  {
    id: 'q5',
    prompt: 'City 1.5 trong khóa này có mấy xy-lanh, và con số đó có phải của mọi xe xăng không?',
    choices: [
      { id: 'a', text: 'Bốn xy-lanh là mức điển hình của dòng này, không phải luật của mọi máy xăng' },
      { id: 'b', text: 'Mọi xe xăng đều bốn xy-lanh' },
      { id: 'c', text: 'City là máy một xy-lanh' },
      { id: 'd', text: 'Số xy-lanh bằng số bánh' },
    ],
    answer: 'a',
    explain: 'Nhiều sedan phổ thông dùng bốn xy-lanh. Xe khác có ba, sáu hoặc tám. Đọc đúng mã máy của đời xe trước khi mua phụ tùng.',
  },
]

const l05Essays: Essay[] = [
  {
    id: 'e1',
    prompt: 'Đi từ xupap xuống bánh đà, kể các chi tiết chính và việc của từng chi tiết.',
    guide:
      'Xupap mở cửa khí. Piston nhận lực cháy và đi trong xy-lanh của block. Thanh truyền nối piston với khuỷu. Trục khuỷu ra mô-men. Bánh đà làm đều vòng quay. Trục cam đóng mở xupap và được đai hoặc xích nối với khuỷu. Bugi châm cháy. Kim phun đưa xăng. Bơm dầu bôi trơn. Bơm nước đẩy nước làm mát.',
  },
  {
    id: 'e2',
    prompt: 'Vì sao đứt đai cam là việc nghiêm trọng trên nhiều máy?',
    guide:
      'Đai giữ nhịp giữa cam và khuỷu. Đứt đai làm xupap và piston mất đồng bộ. Trên nhiều máy, piston có thể đụng xupap. Có máy thiết kế tránh đụng, nhưng không được đoán. Lịch thay đai là theo hãng và đời máy, không một số km cho mọi xe.',
  },
  {
    id: 'e3',
    prompt: 'Dầu máy thấp và nước làm mát thấp tạo hai triệu chứng khác nhau thế nào?',
    guide:
      'Thiếu dầu: tiếng kim loại, áp suất dầu, có thể phá bạc và thành xy-lanh. Thiếu nước: kim nhiệt lên, có thể hết sức hoặc sôi. Cả hai đều nguy hiểm, nhưng không cùng một đường.',
  },
]

const l06Diagram: DiagramRow[] = [
  { kind: 'spine', id: 'intake', below: ['intake'] },
  { kind: 'spine', id: 'compress', below: ['mechanical'] },
  { kind: 'pair', from: 'plug', to: 'power', flow: 'electrical', below: ['energy'] },
  { kind: 'spine', id: 'exhaust', below: ['exhaust'] },
  { kind: 'spine', id: 'crank', below: [] },
]

const l06Quiz: Mcq[] = [
  {
    id: 'q1',
    prompt: 'Trong bốn thì, mô-men chính sinh ra ở thì nào?',
    choices: [
      { id: 'a', text: 'Thì nổ, khi khí cháy đẩy piston xuống' },
      { id: 'b', text: 'Thì nạp' },
      { id: 'c', text: 'Thì xả' },
      { id: 'd', text: 'Chỉ ở thì nén' },
    ],
    answer: 'a',
    explain: 'Nạp đưa hỗn hợp vào, nén chuẩn bị cháy, nổ tạo lực, xả đẩy khí cũ ra. Ba thì kia tiêu một phần công của thì nổ và của các xy-lanh khác.',
  },
  {
    id: 'q2',
    prompt: 'Một vòng đủ bốn thì cần trục khuỷu quay mấy vòng?',
    choices: [
      { id: 'a', text: 'Một vòng' },
      { id: 'b', text: 'Hai vòng' },
      { id: 'c', text: 'Bốn vòng' },
      { id: 'd', text: 'Tám vòng' },
    ],
    answer: 'b',
    explain: 'Bốn hành trình piston là hai vòng khuỷu. Trục cam trên máy bốn thì quay chậm hơn khuỷu một nửa.',
  },
  {
    id: 'q3',
    prompt: 'Bugi làm việc ở gần thời điểm nào?',
    choices: [
      { id: 'a', text: 'Cuối thì nén, để cháy đẩy piston xuống' },
      { id: 'b', text: 'Giữa thì xả' },
      { id: 'c', text: 'Khi piston ở dưới cùng của thì nạp' },
      { id: 'd', text: 'Chỉ khi xe phanh' },
    ],
    answer: 'a',
    explain: 'Lửa phải tới trước khi piston tới đỉnh một chút, tùy tua và tải. Lệch thời điểm làm mất lực hoặc gõ máy.',
  },
  {
    id: 'q4',
    prompt: 'Mô-bin và bugi thuộc luồng nào?',
    choices: [
      { id: 'a', text: 'Điện, để châm hỗn hợp' },
      { id: 'b', text: 'Chỉ là cơ khí của hộp số' },
      { id: 'c', text: 'Nhiệt của điều hòa' },
      { id: 'd', text: 'Dữ liệu của màn hình' },
    ],
    answer: 'a',
    explain: 'Ignition coil – mô-bin tạo điện áp cao cho bugi. Không có lửa thì có xăng và khí cũng không cháy đúng thì.',
  },
  {
    id: 'q5',
    prompt: 'Vì sao máy bốn xy-lanh chạy êm hơn một xy-lanh đơn ở cùng kiểu cháy?',
    choices: [
      { id: 'a', text: 'Các thì nổ lệch nhau, bánh đà và các xy-lanh nối tiếp nhau kéo trục' },
      { id: 'b', text: 'Vì nó không cần bánh đà' },
      { id: 'c', text: 'Vì cả bốn cùng nổ một lúc' },
      { id: 'd', text: 'Vì nó không có thì xả' },
    ],
    answer: 'a',
    explain: 'Mỗi xy-lanh nổ ở một góc khuỷu khác. Trục được đẩy nhiều lần mỗi hai vòng. Thứ tự nổ phổ biến của bốn xy-lanh là 1-3-4-2, nhưng phải đối chiếu mã máy.',
  },
]

const l06Essays: Essay[] = [
  {
    id: 'e1',
    prompt: 'Kể bốn thì bằng chuyển động của piston và trạng thái xupap, không cần số đo góc.',
    guide:
      'Nạp: piston đi xuống, xupap nạp mở, khí vào. Nén: cả hai xupap đóng, piston đi lên, khí bị ép. Nổ: bugi đánh lửa, khí giãn, piston bị đẩy xuống. Xả: xupap xả mở, piston đi lên, khí cháy ra. Rồi lặp lại. Hai vòng khuỷu cho một chu trình.',
  },
  {
    id: 'e2',
    prompt: 'Vì sao mất lửa một xy-lanh làm máy rung chứ không làm mất hết mô-men?',
    guide:
      'Các xy-lanh còn lại vẫn nổ. Một xy-lanh bỏ thì tạo nhịp lực không đều. Đó là lý do rung và đèn máy, chưa phải đứt trục láp.',
  },
  {
    id: 'e3',
    prompt: 'Trục cam và trục khuỷu phải giữ quan hệ gì? Nếu đai nhảy một răng thì thì nào lệch?',
    guide:
      'Cam quay một vòng khi khuỷu quay hai vòng, để xupap mở đúng thì. Nhảy răng làm cửa khí mở sớm hoặc muộn so với piston. Nạp, nén và xả đều lệch. Mức hỏng tùy số răng và thiết kế máy.',
  },
]

const l07Diagram: DiagramRow[] = [
  { kind: 'spine', id: 'air', below: ['intake'] },
  { kind: 'spine', id: 'throttle', below: ['intake'] },
  { kind: 'pair', from: 'injector', to: 'chamber', flow: 'energy', below: ['energy'] },
  { kind: 'spine', id: 'exh', below: ['exhaust'] },
  { kind: 'spine', id: 'cat', below: [] },
]

const l07Quiz: Mcq[] = [
  {
    id: 'q1',
    prompt: 'Bướm ga trên xe ga điện tử điều gì?',
    choices: [
      { id: 'a', text: 'Lượng không khí vào máy, theo lệnh ECU' },
      { id: 'b', text: 'Lượng dầu phanh' },
      { id: 'c', text: 'Góc cam trực tiếp bằng tay lái' },
      { id: 'd', text: 'Nhiệt két nước' },
    ],
    answer: 'a',
    explain: 'Throttle – bướm ga là cửa gió. Trên drive-by-wire, ECU mở cửa. Xe cũ có thể dùng dây kéo. Xăng được tính để khớp lượng khí.',
  },
  {
    id: 'q2',
    prompt: 'Cháy cần đủ bộ ba nào?',
    choices: [
      { id: 'a', text: 'Khí, nhiên liệu và nguồn lửa, trong điều kiện nén còn tốt' },
      { id: 'b', text: 'Chỉ cần xăng' },
      { id: 'c', text: 'Chỉ cần két nước nóng' },
      { id: 'd', text: 'Chỉ cần hộp số' },
    ],
    answer: 'a',
    explain: 'Thiếu một trong ba thì không có cháy ổn định. Mòn bạc hoặc xupap làm mất nén thì có đủ ba vẫn cháy yếu.',
  },
  {
    id: 'q3',
    prompt: 'Khí đã cháy phải ra khỏi xy-lanh để làm gì?',
    choices: [
      { id: 'a', text: 'Nhường chỗ cho khí mới ở thì sau' },
      { id: 'b', text: 'Để làm mát lốp' },
      { id: 'c', text: 'Để sạc ắc quy trực tiếp' },
      { id: 'd', text: 'Để bôi trơn trục khuỷu' },
    ],
    answer: 'a',
    explain: 'Xả tắc làm máy không thở, yếu hoặc không nổ. Khí xả cũng mang nhiệt và chất cần xử lý ở bộ xúc tác.',
  },
  {
    id: 'q4',
    prompt: 'Bộ xúc tác nằm trên đường nào?',
    choices: [
      { id: 'a', text: 'Đường xả, sau máy' },
      { id: 'b', text: 'Trong bình xăng' },
      { id: 'c', text: 'Trên đai cam' },
      { id: 'd', text: 'Trong cabin' },
    ],
    answer: 'a',
    explain: 'Catalyst – bộ xúc tác xử lý khí đã cháy. Nó không tạo mô-men. Hỏng hoặc tắc thì vừa yếu máy vừa tăng chất thải.',
  },
  {
    id: 'q5',
    prompt: 'Kim phun đưa xăng vào lúc nào so với sự cháy?',
    choices: [
      { id: 'a', text: 'Trước khi cháy, theo lệnh ECU để có hỗn hợp đúng' },
      { id: 'b', text: 'Sau khi khí đã ra ống xả' },
      { id: 'c', text: 'Chỉ khi xe dừng hơn một giờ' },
      { id: 'd', text: 'Do áp suất lốp quyết định' },
    ],
    answer: 'a',
    explain: 'Phun cổng đưa xăng ở cửa nạp. Phun trực tiếp đưa vào buồng cháy. Cả hai đều phải xảy ra trước lúc đốt. Bài đường xăng sẽ tách hai kiểu.',
  },
]

const l07Essays: Essay[] = [
  {
    id: 'e1',
    prompt: 'Vẽ bằng lời đường không khí từ lọc gió tới lúc thành khí xả.',
    guide:
      'Lọc gió, ống nạp, cảm biến đo khí, bướm ga, cổ hút, xupap nạp, xy-lanh. Xăng vào theo kiểu phun của xe. Nén, lửa, cháy. Xupap xả, cổ xả, xúc tác, ống giảm thanh, ra ngoài.',
  },
  {
    id: 'e2',
    prompt: 'Máy yếu và có mùi khí cháy trong cabin. Bạn đặt ca này trên luồng nào trước?',
    guide:
      'Đường xả đang rò hoặc tắc, khí không đi hết ra đuôi xe. Đây là việc an toàn, không phải chuyện ồn. Nhìn gioăng cổ xả, ống và việc khí lọt sàn. Đừng bắt đầu bằng màn hình giải trí.',
  },
  {
    id: 'e3',
    prompt: 'Vì sao ECU phải biết lượng khí trước khi quyết định lượng xăng?',
    guide:
      'Cháy cần tỉ lệ khí và xăng trong một dải. Nhiều quá hoặc ít quá thì cháy kém, nóng xúc tác, hoặc mất lực. Cảm biến khí và ô-xy là dữ liệu cho vòng đó. Chi tiết cảm biến ở các bài sau.',
  },
]

const l08Diagram: DiagramRow[] = [
  { kind: 'spine', id: 'atm', below: ['intake'] },
  { kind: 'pair', from: 'compressor', to: 'manifold', flow: 'intake', below: ['intake'] },
  { kind: 'spine', id: 'engine', below: ['exhaust'] },
  { kind: 'pair', from: 'turbine', to: 'waste', flow: 'exhaust', below: [] },
]

const l08Quiz: Mcq[] = [
  {
    id: 'q1',
    prompt: 'Máy hút khí tự nhiên lấy không khí bằng cách nào?',
    choices: [
      { id: 'a', text: 'Piston đi xuống tạo vùng áp thấp, khí bị hút vào' },
      { id: 'b', text: 'Một turbine luôn nén khí trước bướm ga' },
      { id: 'c', text: 'Bơm xăng thổi không khí' },
      { id: 'd', text: 'Két nước đẩy khí vào xy-lanh' },
    ],
    answer: 'a',
    explain: 'Naturally aspirated – hút khí tự nhiên không có máy nén trên đường nạp. City 1.5 của khóa này thuộc nhóm này.',
  },
  {
    id: 'q2',
    prompt: 'Turbo lấy năng lượng quay máy nén từ đâu?',
    choices: [
      { id: 'a', text: 'Từ dòng khí xả làm quay turbine' },
      { id: 'b', text: 'Từ dây điện 12V duy nhất' },
      { id: 'c', text: 'Từ dầu phanh' },
      { id: 'd', text: 'Từ mô-men của bánh sau' },
    ],
    answer: 'a',
    explain: 'Turbine nằm trên đường xả, compressor – máy nén nằm trên đường nạp, cùng một trục. Khí xả quay turbine rồi nén khí nạp.',
  },
  {
    id: 'q3',
    prompt: 'Siêu nạp khác turbo ở điểm nào?',
    choices: [
      { id: 'a', text: 'Siêu nạp được trục máy kéo bằng đai hoặc bánh răng, không chờ dòng xả' },
      { id: 'b', text: 'Siêu nạp không nén khí' },
      { id: 'c', text: 'Turbo được kéo bằng đai của máy đề' },
      { id: 'd', text: 'Hai kiểu là một tên' },
    ],
    answer: 'a',
    explain: 'Supercharger – siêu nạp lấy công ngay từ trục khuỷu nên đáp sớm hơn, nhưng tiêu một phần mô-men. Turbo dùng năng lượng khí xả nhưng có độ trễ. Ít sedan phổ thông dùng siêu nạp.',
  },
  {
    id: 'q4',
    prompt: 'Wastegate làm gì?',
    choices: [
      { id: 'a', text: 'Xả bớt khí qua turbine để áp nạp không vượt mức thiết kế' },
      { id: 'b', text: 'Mở cửa kính' },
      { id: 'c', text: 'Bơm thêm xăng vào bình' },
      { id: 'd', text: 'Khóa vi sai' },
    ],
    answer: 'a',
    explain: 'Không có cách giới hạn áp thì động cơ và đường ống chịu áp quá mức. Cách làm van là của từng hãng.',
  },
  {
    id: 'q5',
    prompt: 'Civic 1.5 turbo và City 1.5 hút khí tự nhiên giống nhau ở điểm nào?',
    choices: [
      { id: 'a', text: 'Cùng là máy xăng, nhưng đường nạp không giống nhau và không được lấy City làm xe tăng áp' },
      { id: 'b', text: 'Cùng một đường nạp vì cùng dung tích danh định' },
      { id: 'c', text: 'City cũng có turbine trên mọi đời' },
      { id: 'd', text: 'Turbo không cần bộ làm mát khí nạp trong mọi thiết kế' },
    ],
    answer: 'a',
    explain: 'Dung tích gần nhau không có nghĩa cùng kiến trúc nạp. Khí nén nóng lên. Nhiều xe turbo có két làm mát khí nạp. City NA không có turbine.',
  },
]

const l08Essays: Essay[] = [
  {
    id: 'e1',
    prompt: 'Giải thích vì sao nhồi thêm khí vào xy-lanh thì có thể tạo thêm mô-men, nếu xăng và lửa theo kịp.',
    guide:
      'Mỗi thì chỉ đốt được lượng ô-xy có trong khí nạp. Nén thêm khí là thêm ô-xy, ECU phải thêm xăng tương ứng và lửa vẫn phải đúng lúc. Thiếu xăng hoặc lửa thì thêm khí không thành thêm công, mà thành cháy kém.',
  },
  {
    id: 'e2',
    prompt: 'Vì sao turbo có độ trễ còn hút khí tự nhiên thì không?',
    guide:
      'Turbo cần dòng xả đủ mạnh mới quay máy nén. Khi mới đạp ga, dòng xả chưa kịp tăng. Máy hút khí tự nhiên đáp theo độ mở bướm ga và tốc độ piston ngay, trong giới hạn khí trời.',
  },
  {
    id: 'e3',
    prompt: 'Một xe turbo yếu, có tiếng rít hơi ở cổ hút. Bạn nghĩ tới đoạn nào trước khi nghĩ tới hộp số?',
    guide:
      'Đường khí nén đang xì: ống, két làm mát khí nạp, hoặc cổ nối. Áp nạp không vào xy-lanh thì mô-men mất dù hộp số còn tốt. Kiểm tra rò đường nạp trước khi kết luận số trượt.',
  },
]

const l09Diagram: DiagramRow[] = [
  { kind: 'spine', id: 'tank', below: ['energy'] },
  { kind: 'spine', id: 'pump', below: ['energy', 'electrical'] },
  { kind: 'spine', id: 'filter', below: ['energy'] },
  { kind: 'spine', id: 'rail', below: ['energy'] },
  { kind: 'pair', from: 'port', to: 'direct', flow: 'energy', below: ['data'] },
  { kind: 'spine', id: 'ecu', below: [] },
]

const l09Quiz: Mcq[] = [
  {
    id: 'q1',
    prompt: 'Thứ tự điển hình của đường xăng là gì?',
    choices: [
      { id: 'a', text: 'Bình, bơm, lọc, ray, kim phun' },
      { id: 'b', text: 'Kim phun, két nước, bình' },
      { id: 'c', text: 'Lọc gió, bugi, bình' },
      { id: 'd', text: 'Hộp số, vi sai, ray xăng' },
    ],
    answer: 'a',
    explain: 'Bơm thường nằm trong bình hoặc gần bình, đẩy xăng qua lọc tới ray. Kim phun lấy xăng từ ray theo lệnh ECU.',
  },
  {
    id: 'q2',
    prompt: 'Phun cổng và phun trực tiếp khác nhau ở chỗ xăng vào đâu?',
    choices: [
      { id: 'a', text: 'Cổng: trước xupap nạp. Trực tiếp: vào trong xy-lanh' },
      { id: 'b', text: 'Cổng vào ống xả, trực tiếp vào két nước' },
      { id: 'c', text: 'Hai kiểu cùng phun vào bình xăng' },
      { id: 'd', text: 'Trực tiếp không cần áp suất' },
    ],
    answer: 'a',
    explain: 'Port injection – phun cổng trộn xăng với khí ở cửa nạp. Direct injection – phun trực tiếp cần áp cao hơn và đưa xăng vào buồng cháy. Một số máy dùng cả hai. City tùy đời, không được đoán một kiểu cho mọi năm sản xuất.',
  },
  {
    id: 'q3',
    prompt: 'Vì sao bơm xăng cần điện?',
    choices: [
      { id: 'a', text: 'Để tạo áp trước khi và trong khi máy chạy' },
      { id: 'b', text: 'Để thay bugi' },
      { id: 'c', text: 'Để khóa cửa' },
      { id: 'd', text: 'Bơm không bao giờ dùng điện' },
    ],
    answer: 'a',
    explain: 'Hết điện 12V hoặc rơ-le bơm hỏng thì ray không có áp, máy không nổ dù bình còn xăng.',
  },
  {
    id: 'q4',
    prompt: 'ECU dùng tín hiệu nào để quyết định thời gian mở kim phun, ở mức bài này?',
    choices: [
      { id: 'a', text: 'Yêu cầu ga, lượng khí, nhiệt và các cảm biến khác của máy' },
      { id: 'b', text: 'Chỉ độ mở cửa kính' },
      { id: 'c', text: 'Chỉ đài radio' },
      { id: 'd', text: 'Chỉ áp suất lốp' },
    ],
    answer: 'a',
    explain: 'Kim phun là cơ cấu chấp hành. Độ rộng xung phun là lệnh. Bài cảm biến sẽ gọi tên từng tín hiệu.',
  },
  {
    id: 'q5',
    prompt: 'Rò xăng cần được xử lý thế nào so với một tiếng kêu nội thất?',
    choices: [
      { id: 'a', text: 'Ưu tiên dừng và xử lý, vì xăng dễ cháy' },
      { id: 'b', text: 'Bỏ qua nếu máy vẫn nổ' },
      { id: 'c', text: 'Chỉ chỉnh âm thanh loa' },
      { id: 'd', text: 'Đổ thêm dầu máy' },
    ],
    answer: 'a',
    explain: 'Đường xăng rò là nguy cơ cháy. Không phải một triệu chứng để đi tiếp cho đủ chuyến.',
  },
]

const l09Essays: Essay[] = [
  {
    id: 'e1',
    prompt: 'Kể đường xăng từ bình tới buồng cháy và chỉ ra chỗ nào là điện, chỗ nào là áp suất chất lỏng.',
    guide:
      'Bình chứa xăng. Bơm dùng điện 12V tạo áp. Lọc chặn cặn. Ray giữ áp cho các kim. Kim mở theo xung của ECU. Phun cổng để xăng ở cửa nạp. Phun trực tiếp để xăng trong xy-lanh. Áp đường ống là chất lỏng. Lệnh mở kim là dữ liệu và điện.',
  },
  {
    id: 'e2',
    prompt: 'Máy không nổ, bình còn xăng. Vì sao chưa kết luận kim phun hỏng?',
    guide:
      'Có thể mất điện bơm, tắc lọc, mất áp ray, mất tín hiệu ECU, hoặc thiếu lửa và khí. Xăng trong bình không chứng minh xăng đã tới kim với áp đúng.',
  },
  {
    id: 'e3',
    prompt: 'Vì sao không dùng một áp suất ray cho cả phun cổng và phun trực tiếp?',
    guide:
      'Phun trực tiếp phải thắng áp suất trong xy-lanh đang nén, nên cần bơm cao áp. Phun cổng phun vào cửa có áp thấp hơn nhiều. Số bar cụ thể là của từng đời máy.',
  },
]

const l10Diagram: DiagramRow[] = [
  { kind: 'spine', id: 'filter', below: ['intake'] },
  { kind: 'pair', from: 'maf', to: 'manifold', flow: 'intake', below: ['data'] },
  { kind: 'spine', id: 'engine', below: ['exhaust'] },
  { kind: 'pair', from: 'o2', to: 'cat', flow: 'exhaust', below: ['data'] },
  { kind: 'trio', left: 'egr', leftFlow: 'exhaust', center: 'pcv', right: 'evap', rightFlow: 'energy', below: [] },
]

const l10Quiz: Mcq[] = [
  {
    id: 'q1',
    prompt: 'MAF đo gì?',
    choices: [
      { id: 'a', text: 'Lượng không khí đi vào máy' },
      { id: 'b', text: 'Mức dầu phanh' },
      { id: 'c', text: 'Tốc độ bánh sau không dẫn động' },
      { id: 'd', text: 'Nhiệt gas điều hòa' },
    ],
    answer: 'a',
    explain: 'Mass air flow – đo khối lượng khí. MAP – cảm biến áp cổ hút đo áp suất, ECU suy ra lượng khí. Xe có thể dùng một trong hai hoặc cả hai. Không phải mọi City đều cùng một kiểu.',
  },
  {
    id: 'q2',
    prompt: 'Cảm biến ô-xy phía trước xúc tác phục vụ việc gì?',
    choices: [
      { id: 'a', text: 'Báo hỗn hợp giàu hay nghèo để ECU sửa lượng xăng' },
      { id: 'b', text: 'Đo góc lái' },
      { id: 'c', text: 'Bật đèn pha' },
      { id: 'd', text: 'Khóa cửa' },
    ],
    answer: 'a',
    explain: 'O2 sensor – cảm biến ô-xy nằm trên đường xả. Nó là vòng phản hồi của hỗn hợp cháy, không phải cảm biến của hộp số.',
  },
  {
    id: 'q3',
    prompt: 'EVAP giữ vai trò gì?',
    choices: [
      { id: 'a', text: 'Giữ hơi xăng từ bình, không cho bay ra ngoài, rồi đưa vào máy đốt khi phù hợp' },
      { id: 'b', text: 'Làm mát dầu phanh' },
      { id: 'c', text: 'Tăng áp turbo' },
      { id: 'd', text: 'Bơm dầu máy' },
    ],
    answer: 'a',
    explain: 'Evaporative emission – hệ thống hơi xăng dùng than hoạt tính và các van. Hỏng có thể làm mùi xăng hoặc đèn máy, chưa chắc làm mất mô-men ngay.',
  },
  {
    id: 'q4',
    prompt: 'PCV thông hơi chỗ nào?',
    choices: [
      { id: 'a', text: 'Cacte, đưa khí lọt xuống piston trở lại đường nạp' },
      { id: 'b', text: 'Lốp' },
      { id: 'c', text: 'Túi khí' },
      { id: 'd', text: 'Bình nước rửa kính' },
    ],
    answer: 'a',
    explain: 'Positive crankcase ventilation – thông hơi cacte. Tắc van có thể làm tăng áp cacte, roăng dầu xì, hoặc dầu vào đường nạp.',
  },
  {
    id: 'q5',
    prompt: 'EGR đưa một phần khí nào trở lại đường nạp, và để làm gì?',
    choices: [
      { id: 'a', text: 'Khí xả, để hạ nhiệt cháy và giảm một nhóm khí thải. Không phải xe nào cũng có cùng kiểu EGR' },
      { id: 'b', text: 'Không khí sạch từ cabin' },
      { id: 'c', text: 'Dầu số' },
      { id: 'd', text: 'Nước làm mát vào xy-lanh' },
    ],
    answer: 'a',
    explain: 'Exhaust gas recirculation – tuần hoàn khí xả. Một số máy xăng đời mới giảm hoặc bỏ EGR nhờ cách phối cam và phun. Phải đọc đúng đời máy.',
  },
]

const l10Essays: Essay[] = [
  {
    id: 'e1',
    prompt: 'Phân biệt đường khí nạp và đường khí xả bằng một bộ phận đầu vào và một bộ phận đầu ra.',
    guide:
      'Nạp bắt đầu từ lọc gió, qua đo khí và bướm ga, vào cổ hút. Xả bắt đầu từ xupap xả, qua cổ xả, xúc tác, giảm thanh. Ô-xy nằm trên đường xả để nhìn kết quả cháy.',
  },
  {
    id: 'e2',
    prompt: 'Vì sao lọc gió tắc làm máy yếu dù bình xăng đầy?',
    guide:
      'Máy thiếu ô-xy. Xăng còn không đốt hết thành công nếu không có đủ khí. ECU có thể giảm xăng theo, mô-men vẫn thấp hơn mức thiết kế.',
  },
  {
    id: 'e3',
    prompt: 'Ôn level 2: nối bình xăng, bốn thì, turbo và EVAP thành một câu về việc chúng có cùng một đường hay không.',
    guide:
      'Bình xăng và kim phun là đường nhiên liệu. Bốn thì là nhịp xy-lanh. Turbo, nếu có, nằm trên khí nạp và khí xả, còn City NA thì không có. EVAP là hơi xăng từ bình, không phải đường áp ray. Cùng một máy, nhiều đường khác nhau.',
  },
]

const strokeDetails = [
  detail('intake', 'Thì nạp', 'Intake stroke', ['intake'], 'Piston đi xuống, xupap nạp mở, khí vào xy-lanh.', 'Không có khí thì không có ô-xy để cháy.', 'Xupap không mở hoặc lọc gió tắc làm thì này đói khí.', 'Máy yếu, khó nổ.', 'Intake stroke'),
  detail('compress', 'Thì nén', 'Compression', ['mechanical'], 'Hai xupap đóng, piston đi lên, ép hỗn hợp.', 'Nén đủ thì lửa mới cháy mạnh và đúng lúc.', 'Mòn bạc, xupap hoặc gioăng quy-lát làm mất nén.', 'Đề được nhưng không nổ, hoặc nổ yếu.', 'Compression'),
  detail('power', 'Thì nổ', 'Power stroke', ['energy', 'mechanical'], 'Khí cháy giãn và đẩy piston xuống. Đây là thì tạo công.', 'Các thì kia tiêu công. Thì này trả công cho trục.', 'Cháy không đều làm rung và mất lực một xy-lanh.', 'Rung, đèn máy, hết sức.', 'Power stroke'),
  detail('exhaust', 'Thì xả', 'Exhaust stroke', ['exhaust'], 'Xupap xả mở, piston đi lên, đẩy khí cháy ra.', 'Xy-lanh phải trống khí cũ thì thì nạp sau mới sạch.', 'Xupap xả không kín hoặc đường xả tắc.', 'Máy yếu, nóng, mùi khí xả.', 'Exhaust stroke'),
]

export const LEVEL2: Record<string, LessonPack> = {
  L05: assemble(
    'L05',
    'engine',
    engine,
    'piston',
    pickFlows('mechanical', 'intake', 'electrical', 'thermal', 'energy'),
    l05Diagram,
    [
      detail('block', 'Thân máy', 'Engine block', ['mechanical'], 'Khối kim loại chứa xy-lanh, đường dầu và đường nước.', 'Mọi chi tiết chuyển động của máy dựa vào thân này.', 'Nứt thân hoặc mất nén ở thành xy-lanh làm máy không giữ được cháy.', 'Nước lẫn dầu, hết nén, hoặc quá nhiệt cục bộ.', 'Engine block'),
      detail('piston', 'Piston', 'Piston', ['mechanical', 'energy'], 'Khối trượt trong xy-lanh, nhận lực khí cháy. Thanh truyền nối nó với khuỷu.', 'Đổi áp suất khí thành lực trên trục.', 'Kẹt, vỡ hoặc bạc mòn gây gõ và mất nén.', 'Tiếng gõ, khói, yếu máy.', 'Piston'),
      detail('valve', 'Xupap', 'Valve', ['intake'], 'Cửa khí nạp và khí xả, đóng mở theo cam.', 'Đúng lúc mở thì máy mới thở đúng thì.', 'Kênh, cong hoặc kẹt làm mất nén hoặc đụng piston.', 'Nổ không đều, tiếng xì.', 'Valve'),
      detail('plug', 'Bugi', 'Spark plug', ['electrical'], 'Tạo tia lửa trong buồng cháy.', 'Hỗn hợp xăng cần một điểm châm.', 'Mòn, bẩn hoặc đứt dây lửa làm một hoặc nhiều xy-lanh bỏ cháy.', 'Rung, hao xăng, đèn máy.', 'Spark plug'),
      detail('crank', 'Trục khuỷu', 'Crankshaft', ['mechanical'], 'Trục có khuỷu, biến lực thẳng của piston thành mô-men quay.', 'Đầu ra cơ khí của máy trước khi vào hộp số.', 'Bạc khuỷu mòn gây gõ và mất áp dầu.', 'Tiếng gõ trầm khi tải, áp dầu thấp.', 'Crankshaft'),
      detail('cam', 'Trục cam', 'Camshaft', ['mechanical'], 'Trục có các vấu cam đẩy xupap.', 'Giữ thì phối khí.', 'Mòn cam hoặc mất dầu ở đầu máy.', 'Máy yếu, tiếng tic tic vùng nắp máy.', 'Camshaft'),
      detail('belt', 'Đai hoặc xích cam', 'Timing drive', ['mechanical'], 'Nối trục khuỷu với trục cam theo tỉ số một phần hai trên máy bốn thì.', 'Lệch nhịp là lệch cả bốn thì.', 'Đứt đai hoặc nhảy răng. Chu kỳ thay là của hãng, không một con số cho mọi máy.', 'Không nổ sau khi đứt, hoặc nổ rất yếu. Có máy cong xupap.', 'Timing drive'),
      detail('oil', 'Bơm dầu', 'Oil pump', ['mechanical'], 'Đẩy dầu tới bạc, cam và thành xy-lanh.', 'Kim loại trượt cần màng dầu.', 'Mòn bơm, tắc lưới hoặc thiếu dầu làm mất áp suất.', 'Đèn dầu, tiếng kim loại.', 'Oil pump'),
      detail('water', 'Bơm nước', 'Water pump', ['thermal'], 'Đẩy nước làm mát vòng quanh máy tới két.', 'Nhiệt phải rời thành xy-lanh.', 'Chảy roăng hoặc gãy cánh bơm.', 'Kim nhiệt cao, nước nhỏ dưới máy.', 'Water pump'),
      detail('flywheel', 'Bánh đà', 'Flywheel', ['mechanical'], 'Đĩa quán tính cuối trục khuỷu. Máy đề ăn vành răng của nó hoặc của vành răng trên hộp số, tùy thiết kế.', 'Làm đều mô-men giữa các thì nổ.', 'Gãy răng hoặc nứt mặt làm đề không ăn hoặc rung.', 'Đề kêu rít không quay máy, hoặc rung ở tua thấp.', 'Flywheel'),
    ],
    l05Quiz,
    l05Essays,
  ),
  L06: assemble(
    'L06',
    'engine',
    engine + ' Bấm các thì trên sơ đồ 2D. Trên mô hình, piston, xupap và bugi là phần cứng của các thì đó.',
    'power',
    pickFlows('intake', 'mechanical', 'electrical', 'energy', 'exhaust'),
    l06Diagram,
    [
      ...strokeDetails,
      detail('plug', 'Bugi và mô-bin', 'Spark plug and coil', ['electrical'], 'Mô-bin nâng điện 12V thành xung cao áp. Bugi phóng tia lửa cuối thì nén.', 'Không có lửa đúng lúc thì thì nổ không bắt đầu.', 'Mô-bin hoặc bugi hỏng làm bỏ cháy một xy-lanh.', 'Rung, đèn máy, mùi xăng sống.', 'Coil and plug'),
      detail('crank', 'Trục khuỷu', 'Crankshaft', ['mechanical'], 'Hai vòng khuỷu cho một chu trình bốn thì.', 'Gom công của thì nổ và kéo piston qua ba thì kia.', 'Mất nhịp với cam làm cả chu trình lệch.', 'Không nổ hoặc nổ dội.', 'Crankshaft'),
      detail('piston', 'Piston', 'Piston', ['mechanical'], 'Đi lên và xuống bốn lần trong một chu trình.', 'Là mặt nhận lực cháy.', 'Kẹt piston làm mất một xy-lanh.', 'Rung, gõ.', 'Piston'),
      detail('valve', 'Xupap', 'Valve', ['intake', 'exhaust'], 'Xupap nạp mở ở thì nạp, xupap xả mở ở thì xả. Cả hai đóng ở thì nén và phần lớn thì nổ.', 'Đúng cửa thì khí mới vào và khí cũ mới ra.', 'Xupap không kín làm mất nén.', 'Máy yếu, tiếng xì cổ góp.', 'Valve'),
      detail('injector', 'Kim phun', 'Injector', ['energy'], 'Đưa xăng vào trước lúc cháy, theo xung ECU.', 'Thì nổ cần nhiên liệu đã ở trong hỗn hợp.', 'Tắc kim làm một xy-lanh đói xăng.', 'Rung, hao xăng nếu kim kẹt mở.', 'Injector'),
    ],
    l06Quiz,
    l06Essays,
  ),
  L07: assemble(
    'L07',
    'blocks',
    blocks,
    'chamber',
    pickFlows('intake', 'energy', 'exhaust', 'data'),
    l07Diagram,
    [
      detail('air', 'Khí trời', 'Intake air', ['intake'], 'Không khí sau lọc gió, nguồn ô-xy.', 'Cháy không xảy ra nếu không có ô-xy.', 'Lọc tắc hoặc ống nứt hút gió phụ.', 'Máy yếu hoặc tua không ổn.', 'Intake air'),
      detail('throttle', 'Bướm ga', 'Throttle', ['intake', 'data'], 'Cánh bướm điều lượng khí. Trên City đời mới thường do ECU kéo mô-tơ, không phải dây cáp.', 'Người lái xin thêm lực thì cửa gió phải mở thêm, cùng với xăng.', 'Bám bẩn hoặc mô-tơ hỏng làm ga không theo chân.', 'Tua không ổn, đèn máy, ga chết.', 'Throttle'),
      detail('injector', 'Kim phun', 'Injector', ['energy', 'data'], 'Van điện đưa xăng vào cửa nạp hoặc vào xy-lanh.', 'Khớp lượng xăng với lượng khí.', 'Tắc hoặc rò kim.', 'Rung, hao xăng, mùi xăng.', 'Injector'),
      detail('chamber', 'Buồng cháy', 'Combustion chamber', ['energy'], 'Khoang trên piston nơi hỗn hợp được nén và đốt.', 'Đây là chỗ năng lượng hóa học thành áp suất.', 'Tích muội hoặc mất nén làm cháy kém.', 'Gõ máy, yếu, khó nổ nóng hoặc nguội tùy ca.', 'Chamber'),
      detail('exh', 'Khí xả', 'Exhaust gas', ['exhaust', 'thermal'], 'Sản phẩm sau cháy, còn nhiệt và các chất cần xử lý.', 'Phải rời xy-lanh trước thì nạp sau.', 'Rò gioăng cổ xả hoặc tắc đường.', 'Mùi khí, yếu máy, nóng.', 'Exhaust gas'),
      detail('cat', 'Bộ xúc tác', 'Catalyst', ['exhaust'], 'Lõi trên đường xả chuyển một phần khí độc thành chất ít hại hơn.', 'Xe phổ thông phải xử lý khí xả, không xả thẳng từ xupap ra đuôi.', 'Vỡ lõi hoặc ngộ độc bởi xăng lọt nhiều.', 'Hết sức, mùi, đèn máy. Không đục bỏ để “cho xe khỏe” như một cách sửa.', 'Catalyst'),
    ],
    l07Quiz,
    l07Essays,
  ),
  L08: assemble(
    'L08',
    'blocks',
    blocks + ' City 1.5 của khóa là máy hút khí tự nhiên. Turbine trên sơ đồ là của một xe tăng áp khác, ví dụ Civic 1.5 turbo.',
    'engine',
    pickFlows('intake', 'exhaust', 'energy', 'mechanical'),
    l08Diagram,
    [
      detail('atm', 'Khí trời', 'Atmosphere', ['intake'], 'Nguồn khí của cả máy hút tự nhiên lẫn máy tăng áp.', 'Mọi máy đốt đều cần ô-xy từ không khí.', 'Lọc tắc thì cả hai kiểu đều đói khí.', 'Yếu máy.', 'Atmosphere'),
      detail('compressor', 'Máy nén', 'Compressor', ['intake'], 'Bánh nén trên đường nạp của turbo hoặc siêu nạp. Máy hút tự nhiên không có bánh này.', 'Nhồi thêm khí vào xy-lanh.', 'Dầu vào cánh nén, hoặc cánh chạm vỏ.', 'Mất áp, khói, tiếng rít.', 'Compressor'),
      detail('manifold', 'Cổ hút', 'Intake manifold', ['intake'], 'Ống chia khí tới từng xy-lanh sau bướm ga.', 'Các xy-lanh cần khí đều nhau.', 'Nứt cổ hoặc roăng xì làm lọt khí không đo.', 'Tua không ổn, hòa khí lệch.', 'Intake manifold'),
      detail('engine', 'Máy', 'Engine', ['energy', 'mechanical'], 'Nơi khí và xăng cháy. Trên City, khí vào nhờ piston hút. Trên Civic turbo, khí đã được nén trước đó.', 'Công suất thêm của turbo chỉ có nếu xăng và lửa theo kịp.', 'Gõ do áp và nhiệt cao nếu tăng áp không được kiểm soát.', 'Mất sức đột ngột, đèn máy.', 'Engine'),
      detail('turbine', 'Turbine', 'Turbine', ['exhaust'], 'Bánh quay nhờ khí xả, cùng trục với máy nén.', 'Lấy năng lượng thừa của khí xả để nén khí nạp.', 'Kẹt trục hoặc vỡ cánh.', 'Mất tăng áp, tiếng kim loại, dầu hao.', 'Turbine'),
      detail('waste', 'Van xả áp', 'Wastegate', ['exhaust', 'data'], 'Mở đường vòng cho khí xả để turbine không quay quá mức.', 'Giữ áp nạp trong thiết kế.', 'Kẹt đóng làm áp quá cao. Kẹt mở làm không có tăng áp.', 'Quá lực rồi cắt, hoặc yếu như máy không turbo.', 'Wastegate'),
    ],
    l08Quiz,
    l08Essays,
  ),
  L09: assemble(
    'L09',
    'blocks',
    blocks,
    'rail',
    pickFlows('energy', 'electrical', 'data'),
    l09Diagram,
    [
      detail('tank', 'Bình xăng', 'Fuel tank', ['energy'], 'Kho xăng. Trên nhiều sedan nằm dưới ghế sau. Hơi xăng được EVAP giữ, bài sau nói van.', 'Chứa nhiên liệu cho cả chuyến, không phải lượng của một thì.', 'Thủng, hết xăng, hoặc bơm trong bình chết.', 'Mùi xăng, không nổ, chết giữa đường.', 'Fuel tank'),
      detail('pump', 'Bơm xăng', 'Fuel pump', ['energy', 'electrical'], 'Mô-tơ điện đẩy xăng ra khỏi bình.', 'Kim phun cần áp sẵn, không hút xăng bằng chân không của máy trên xe phun điện.', 'Mòn than, tắc lưới, mất rơ-le.', 'Đề lâu không nổ, chết khi tải, tiếng rít trong bình mất.', 'Fuel pump'),
      detail('filter', 'Lọc xăng', 'Fuel filter', ['energy'], 'Chặn gỉ và cặn trước ray hoặc trong cụm bơm, tùy đời.', 'Kim phun rất hẹp, dễ tắc bởi cặn.', 'Lọc tắc làm đói xăng khi đạp ga.', 'Yếu lúc tăng tốc, bình thường khi đi đều.', 'Fuel filter'),
      detail('rail', 'Ray xăng', 'Fuel rail', ['energy'], 'Ống chia xăng có áp tới từng kim.', 'Giữ áp tương đối ổn cho ECU tính thời gian mở.', 'Rò ở đầu nối hoặc van điều áp.', 'Mùi xăng trong khoang máy, áp không giữ.', 'Fuel rail'),
      detail('port', 'Phun cổng', 'Port injection', ['energy'], 'Kim phun xăng vào cửa nạp, trước xupap.', 'Xăng có thời gian trộn với khí. Áp thấp hơn phun trực tiếp.', 'Kim bẩn làm tia lệch.', 'Rung, hao xăng, tua không đều.', 'Port injection'),
      detail('direct', 'Phun trực tiếp', 'Direct injection', ['energy'], 'Kim phun vào trong xy-lanh với áp cao.', 'Chủ động hơn lúc phun, nhưng cần bơm cao áp và dễ muội trên xupap nạp vì xăng không rửa cửa nạp.', 'Bơm cao áp hoặc kim hỏng.', 'Khó nổ, gõ, đèn máy. Không phải mọi City dùng kiểu này.', 'Direct injection'),
      detail('ecu', 'ECU', 'Engine computer', ['data', 'electrical'], 'Tính độ rộng xung mở kim và thời điểm lửa.', 'Khớp xăng với khí và với chân ga.', 'Mất nguồn hoặc lỗi chương trình làm kim không mở.', 'Không nổ hoặc ga chết.', 'Engine computer'),
    ],
    l09Quiz,
    l09Essays,
  ),
  L10: assemble(
    'L10',
    'blocks',
    blocks,
    'cat',
    pickFlows('intake', 'exhaust', 'data', 'energy'),
    l10Diagram,
    [
      detail('filter', 'Lọc gió', 'Air filter', ['intake'], 'Giấy hoặc vải lọc bụi trước khi khí vào cảm biến và máy.', 'Bụi trong xy-lanh mài thành máy.', 'Tắc hoặc lọc giả không kín.', 'Yếu, tiếng rít, bụi trong ống nạp.', 'Air filter'),
      detail('maf', 'MAF hoặc MAP', 'MAF or MAP', ['intake', 'data'], 'MAF đo khối khí. MAP đo áp cổ hút. ECU dùng số này để tính xăng.', 'Không biết lượng khí thì không biết lượng xăng.', 'Bẩn hoặc đứt dây làm số đo sai.', 'Tua không ổn, hao xăng, đèn máy. Đời xe chọn một hoặc cả hai cảm biến.', 'MAF or MAP'),
      detail('manifold', 'Cổ hút', 'Intake manifold', ['intake'], 'Chia khí sau bướm ga vào từng cổng.', 'Cân khí giữa các xy-lanh.', 'Roăng xì.', 'Hòa khí lệch, tiếng xì nhẹ.', 'Intake manifold'),
      detail('engine', 'Máy', 'Engine', ['energy'], 'Nơi khí trở thành khí cháy.', 'Đầu ra của đường nạp và đầu vào của đường xả.', 'Cháy không hết đẩy xăng sống ra xúc tác.', 'Mùi, đèn máy, xúc tác nóng.', 'Engine'),
      detail('o2', 'Cảm biến ô-xy', 'Oxygen sensor', ['exhaust', 'data'], 'Đo ô-xy còn trong khí xả.', 'ECU sửa xăng cho tới khi hỗn hợp quanh mức thiết kế.', 'Già hoặc bẩn bởi silicon và xăng lọt.', 'Hao xăng, tua không đều, đèn máy.', 'Oxygen sensor'),
      detail('cat', 'Bộ xúc tác', 'Catalyst', ['exhaust'], 'Xử lý khí sau cảm biến trước, và thường có thêm cảm biến sau để xem nó còn làm việc không.', 'Đáp ứng khí thải của xe phổ thông.', 'Tắc hoặc vỡ lõi.', 'Hết sức, tiếng lục cục trong bầu.', 'Catalyst'),
      detail('egr', 'EGR', 'EGR', ['exhaust'], 'Đưa một phần khí xả trở lại đường nạp trên các máy có trang bị.', 'Hạ nhiệt đỉnh của sự cháy.', 'Van kẹt làm tua không ổn hoặc yếu.', 'Không phải mã máy nào cũng có. Đọc sơ đồ đời xe.', 'EGR'),
      detail('pcv', 'PCV', 'PCV', ['intake'], 'Van thông hơi cacte về đường nạp.', 'Khí lọt qua bạc không được xả tự do ra ngoài.', 'Van tắc.', 'Dầu xì, tua không ổn, hơi dầu trong lọc gió.', 'PCV'),
      detail('evap', 'EVAP', 'EVAP', ['energy', 'data'], 'Bình than giữ hơi xăng, van xả hơi vào máy khi ECU cho phép.', 'Hơi xăng không bay ra khí trời và không chịu áp trong bình.', 'Nắp bình sai loại, van hoặc đường ống nứt.', 'Mùi xăng, đèn máy, khó mở nắp bình.', 'EVAP'),
    ],
    l10Quiz,
    l10Essays,
  ),
}
