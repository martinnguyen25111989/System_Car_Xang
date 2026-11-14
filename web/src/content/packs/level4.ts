import type { DiagramRow, Essay, Mcq } from '../lesson01.ts'
import { assemble, detail, pickFlows, type LessonPack } from '../pack.ts'

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

export const LEVEL4: Record<string, LessonPack> = {
  L18: assemble(
    'L18',
    'blocks',
    note,
    'alternator',
    pickFlows('electrical', 'mechanical'),
    [
      { kind: 'spine', id: 'battery', below: ['electrical'] },
      { kind: 'pair', from: 'alternator', to: 'starter', flow: 'electrical', below: ['electrical'] },
      { kind: 'spine', id: 'fuse', below: ['electrical'] },
      { kind: 'pair', from: 'relay', to: 'ground', flow: 'electrical', below: [] },
    ] as DiagramRow[],
    [
      detail('battery', 'Ắc quy', '12V battery', ['electrical'], 'Nguồn một chiều khoảng 12V khi máy chưa quay.', 'Nuôi đề, ECU và bơm lúc khởi động.', 'Yếu hoặc sulfat.', 'Đề chậm, đèn mờ.', '12V battery'),
      detail('alternator', 'Máy phát', 'Alternator', ['electrical', 'mechanical'], 'Máy điện do đai máy kéo, nạp lại ắc quy khi máy đã nổ.', 'Ắc quy không đủ cho cả chuyến đi.', 'Đứt đai, hỏng diode hoặc chổi than.', 'Đèn ắc quy, hết điện giữa đường dù vừa thay bình.', 'Alternator'),
      detail('starter', 'Máy đề', 'Starter', ['electrical', 'mechanical'], 'Mô-tơ có bánh răng ăn vào vành răng lúc đề.', 'Quay máy tới tua đủ để có cháy.', 'Rơ-le đề hoặc than mòn.', 'Một tiếng tạch, hoặc không tiếng gì.', 'Starter'),
      detail('fuse', 'Cầu chì', 'Fuse', ['electrical'], 'Dây chì đứt khi dòng quá mức.', 'Cô lập một nhánh trước khi cháy bó dây.', 'Đứt sau ngắn mạch.', 'Mất một chức năng: còi, bơm, hoặc ECU.', 'Fuse'),
      detail('relay', 'Rơ-le', 'Relay', ['electrical'], 'Công tắc điện cho dòng lớn, do dòng nhỏ điều khiển.', 'ECU không phải chịu dòng của bơm hay đề.', 'Chân rơ-le bẩn hoặc cuộn đứt.', 'Không đề hoặc không bơm, trong khi ắc quy còn tốt.', 'Relay'),
      detail('ground', 'Mass', 'Ground', ['electrical'], 'Đường về của dòng điện tới thân xe hoặc cực âm ắc quy.', 'Mạch không kín thì không có dòng.', 'Ốc mass rỉ.', 'Điện chập chờn, đèn sáng yếu, nhiều hộp cùng lỗi.', 'Ground'),
    ],
    [
      q('q1', 'Khi máy đã nổ, ai nuôi điện cho xe?', 'Máy phát', 'Chỉ ắc quy suốt chuyến đi', 'Kim phun', 'Má phanh', 'a', 'Ắc quy khởi động và đệm điện. Máy phát nạp lại và nuôi tải khi máy quay.'),
      q('q2', 'Cầu chì đứt nói lên điều gì?', 'Nhánh đó đã có dòng quá mức hoặc chì già', 'Hết xăng', 'Lốp non', 'Hết dầu số', 'a', 'Thay chì mà không tìm ngắn mạch thì chì mới đứt tiếp.'),
      q('q3', 'Mass hỏng làm mạch thế nào?', 'Không đủ đường về, điện áp sụt và thiết bị chập chờn', 'Tăng áp turbo', 'Khóa vi sai', 'Mở thêm xupap', 'a', 'Dòng đi từ dương qua tải rồi phải về âm. Đứt mass là đứt vòng.'),
      q('q4', 'Máy đề ăn vào chi tiết nào?', 'Vành răng trên bánh đà hoặc trên hộp số', 'Vào két nước', 'Vào thước lái', 'Vào lọc gió', 'a', 'Bánh răng đề chỉ nhô ra lúc quay máy rồi rút.'),
      q('q5', 'Đèn ắc quy sáng khi đang chạy. Thay bình mới có hết việc không?', 'Chưa. Máy phát hoặc đai có thể không nạp', 'Có, đèn đó chỉ báo hết xăng', 'Có, vì City không có máy phát', 'Chỉ cần đổ dầu máy', 'a', 'Bình yếu là hậu quả nếu máy phát không nạp. Phải đo nạp khi máy nổ.'),
    ],
    [
      e('e1', 'Vẽ vòng điện từ ắc quy qua máy đề rồi tới máy phát.', 'Ắc quy cấp dòng lớn cho rơ-le đề và máy đề. Máy quay và nổ. Đai kéo máy phát. Máy phát nuôi tải và trả điện vào ắc quy. Mass thân xe khép kín cả hai mạch.'),
      e('e2', 'Vì sao một ốc mass rỉ có thể làm nhiều hộp cùng báo lỗi?', 'Các hộp dùng chung điểm về âm. Sụt mass làm điện áp tham chiếu sai, không phải từng hộp cùng hỏng phần cứng.'),
      e('e3', 'Đề không kêu, đèn trần vẫn sáng. Bạn tách rơ-le, cầu chì và máy đề thế nào?', 'Đèn sáng nghĩa là ắc quy chưa chết hoàn toàn. Nhìn cầu chì và rơ-le đề trước khi kết luận mô-tơ đề. Nếu rơ-le đóng mà không có tiếng, mới tới mô-tơ hoặc vành răng.'),
    ],
  ),
  L19: assemble(
    'L19',
    'blocks',
    note,
    'ecm',
    pickFlows('data', 'electrical'),
    [
      { kind: 'spine', id: 'pedal', below: ['data'] },
      { kind: 'pair', from: 'ecm', to: 'tcu', flow: 'data', below: ['data'] },
      { kind: 'trio', left: 'bcm', leftFlow: 'data', center: 'abs', right: 'airbag', rightFlow: 'data', below: ['electrical'] },
      { kind: 'spine', id: 'actuator', below: [] },
    ] as DiagramRow[],
    [
      detail('pedal', 'Bàn đạp ga', 'Accelerator', ['data'], 'Cảm biến yêu cầu mô-men.', 'Đầu vào của vòng điều khiển máy.', 'Hai kênh lệch nhau thì ECU không tin.', 'Ga không theo chân, đèn máy.', 'Accelerator'),
      detail('ecm', 'ECM', 'Engine controller', ['data', 'electrical'], 'Hộp tính xăng, lửa và ga của máy.', 'Trung tâm powertrain của xe xăng.', 'Mất nguồn hoặc lỗi bộ nhớ.', 'Không nổ, chết máy, đèn check.', 'ECM'),
      detail('tcu', 'TCU', 'Transmission controller', ['data'], 'Hộp hoặc phần mềm chọn tỉ số CVT hay cấp số.', 'Đổi số cần biết tua máy và tốc độ xe.', 'Van hoặc phần mềm sai.', 'Giật số, không vào D.', 'TCU'),
      detail('bcm', 'BCM', 'Body controller', ['data'], 'Hộp thân xe: đèn, khóa, gạt mưa, cửa.', 'Tách việc tiện nghi khỏi việc đốt xăng.', 'Chập công tắc hoặc hết điện hộp.', 'Đèn không tắt, cửa không khóa. Máy có thể vẫn nổ.', 'BCM'),
      detail('abs', 'Hộp ABS', 'ABS controller', ['data'], 'Đọc tốc độ bánh và điều van dầu phanh.', 'Giữ bánh không khóa.', 'Cảm biến bánh đứt.', 'Đèn ABS. Phanh cơ vẫn có thể còn.', 'ABS controller'),
      detail('airbag', 'Hộp túi khí', 'Airbag controller', ['data', 'electrical'], 'Quyết định bật túi khi gia tốc va chạm vượt ngưỡng.', 'An toàn bị động, không liên quan tua máy.', 'Lỗi dây túi hoặc hộp.', 'Đèn airbag. Không tự ý đo dây túi bằng đồng hồ tùy tiện.', 'Airbag controller'),
      detail('actuator', 'Cơ cấu chấp hành', 'Actuator', ['electrical', 'data'], 'Kim phun, mô-tơ bướm ga, mô-bin. Phần làm theo lệnh.', 'Quyết định của ECU phải thành việc cơ khí hoặc tia lửa.', 'Đứt dây hoặc kẹt cơ.', 'Lệnh có mà kết quả không có.', 'Actuator'),
    ],
    [
      q('q1', 'ECM và BCM chia việc thế nào?', 'ECM lo máy. BCM lo thân xe và tiện nghi', 'Hai hộp cùng tính góc lửa', 'BCM phun xăng', 'ECM chỉ bật đèn pha', 'a', 'Nhiều hộp, mỗi hộp một miền. Chúng nói chuyện qua mạng chứ không nhập thành một.'),
      q('q2', 'Vòng điều khiển ga điện tử đi theo thứ tự nào?', 'Bàn đạp, ECM, mô-tơ bướm ga', 'Bướm ga, rồi mới có bàn đạp', 'Túi khí, rồi kim phun', 'Loa, rồi hộp số', 'a', 'Yêu cầu, quyết định, chấp hành. Cảm biến vị trí bướm ga khép vòng bằng cách báo lại ECM.'),
      q('q3', 'Đèn túi khí sáng có nghĩa ECM máy hỏng không?', 'Không. Đó là miền hộp túi khí cho đến khi có thêm triệu chứng máy', 'Có, luôn thay ECM', 'Có, vì chỉ có một hộp trên mọi xe', 'Không bao giờ liên quan điện', 'a', 'Đèn nào thuộc miền ấy. Vẫn kiểm tra điện chung nếu nhiều đèn cùng sáng.'),
      q('q4', 'TCU cần dữ liệu gì ở mức bài này?', 'Tua máy và tốc độ xe để chọn tỉ số', 'Nhiệt gas lạnh', 'Mức nước rửa kính', 'Kênh radio', 'a', 'Số và máy phải thống nhất mô-men. Thiếu dữ liệu thì số giữ cấp an toàn hoặc báo lỗi.'),
      q('q5', 'Cơ cấu chấp hành khác cảm biến ở chỗ nào?', 'Cảm biến báo vào. Chấp hành làm ra', 'Cả hai đều chỉ là cầu chì', 'Chấp hành không dùng điện', 'Cảm biến phun xăng', 'a', 'Kim phun và mô-tơ ga là chấp hành. Bàn đạp và cảm biến tua là đầu vào.'),
    ],
    [
      e('e1', 'Kể vòng từ chân ga tới bướm ga như một vòng điều khiển.', 'Người lái là yêu cầu. Cảm biến bàn đạp đo. ECM so với trạng thái máy và ra lệnh mô-tơ bướm ga. Cảm biến vị trí bướm ga báo lại. Kim phun và lửa đi cùng lệnh đó.'),
      e('e2', 'Vì sao không thay ECM khi chỉ đèn cửa xe báo lỗi?', 'Cửa và đèn thuộc BCM. ECM không điều khiển chốt cửa trên sơ đồ phổ thông. Thay nhầm hộp vừa tốn vừa không hết lỗi.'),
      e('e3', 'Nhiều đèn cùng sáng sau khi thay ắc quy. Giả thuyết điện nào đứng trước giả thuyết “hỏng năm hộp một lúc”?', 'Nguồn chung hoặc mass chung. Các hộp cần điện áp ổn mới nói chuyện được. Kiểm tra cực bình, mass thân và cầu chì chính trước.'),
    ],
  ),
  L20: assemble(
    'L20',
    'blocks',
    note,
    'o2',
    pickFlows('data', 'intake', 'exhaust', 'thermal'),
    [
      { kind: 'pair', from: 'o2', to: 'maf', flow: 'data', below: ['data'] },
      { kind: 'pair', from: 'map', to: 'tps', flow: 'data', below: ['data'] },
      { kind: 'pair', from: 'ckp', to: 'cmp', flow: 'data', below: ['data'] },
      { kind: 'pair', from: 'ect', to: 'knock', flow: 'thermal', below: [] },
    ] as DiagramRow[],
    [
      detail('o2', 'Ô-xy', 'Oxygen sensor', ['exhaust', 'data'], 'Đo ô-xy còn trong khí xả.', 'Sửa lượng xăng quanh hỗn hợp thiết kế.', 'Già, bẩn.', 'Hao xăng, đèn máy.', 'Oxygen sensor'),
      detail('maf', 'MAF', 'MAF', ['intake', 'data'], 'Đo khối không khí vào máy.', 'Tính xăng theo khí thật.', 'Dây bẩn hoặc đứt.', 'Tua không ổn. Không phải xe nào cũng có.', 'MAF'),
      detail('map', 'MAP', 'MAP', ['intake', 'data'], 'Đo áp suất cổ hút.', 'Suy ra tải máy khi không có MAF hoặc để đối chiếu.', 'Ống chân không nứt.', 'Hòa khí lệch.', 'MAP'),
      detail('tps', 'Bướm ga', 'Throttle sensor', ['data'], 'Báo độ mở bướm ga.', 'ECM biết cửa gió đã theo lệnh chưa.', 'Mòn tiếp điểm hoặc hai kênh lệch.', 'Ga giật.', 'Throttle sensor'),
      detail('ckp', 'Trục khuỷu', 'Crank sensor', ['data'], 'Báo tốc độ và vị trí khuỷu.', 'Không có tín hiệu này thì nhiều máy không đánh lửa.', 'Đứt dây, khe hở sai.', 'Không nổ, hoặc chết máy ngẫu nhiên.', 'Crank sensor'),
      detail('cmp', 'Trục cam', 'Cam sensor', ['data'], 'Báo thì của cam để biết xy-lanh nào đang nén.', 'Phân biệt thì nén và thì xả, vì khuỷu quay hai vòng.', 'Lệch hoặc mất tín hiệu.', 'Khó nổ, lửa sai thì trên một số máy.', 'Cam sensor'),
      detail('ect', 'Nước làm mát', 'Coolant sensor', ['thermal', 'data'], 'Đo nhiệt nước, không phải kim trên taplo.', 'Lúc lạnh cần thêm xăng và tua chờ khác.', 'Cảm biến báo lạnh mãi.', 'Hao xăng, tua chờ cao, quạt có thể chạy sai.', 'Coolant sensor'),
      detail('knock', 'Kích nổ', 'Knock sensor', ['data'], 'Nghe rung của gõ máy.', 'ECU lùi góc lửa để bảo vệ piston.', 'Lỏng hoặc đứt.', 'Yếu máy, hoặc gõ nếu ECU không nghe thấy.', 'Knock sensor'),
    ],
    [
      q('q1', 'Mất cảm biến trục khuỷu thường gây gì?', 'Không nổ hoặc chết máy, vì mất mốc lửa', 'Chỉ hết tiếng loa', 'Chỉ mòn lốp', 'Chỉ sai giờ đồng hồ', 'a', 'CKP là mốc thời gian của lửa và phun trên đa số máy phun xăng.'),
      q('q2', 'Cảm biến nước báo lạnh mãi thì ECU làm gì?', 'Cứ nghĩ máy chưa nóng, thêm xăng và giữ tua chờ cao', 'Tắt cả bốn bugi vĩnh viễn', 'Khóa hộp số ở số lùi', 'Xả dầu phanh', 'a', 'ECT là dữ liệu, kim taplo là hiển thị. Hai thứ có thể không cùng một cảm biến.'),
      q('q3', 'MAF và MAP cùng mục đích gì?', 'Ước lượng không khí để tính xăng', 'Đo góc lái', 'Đo mức dầu phanh', 'Đo gió ngoài trời cho radio', 'a', 'Một xe có thể dùng một trong hai hoặc cả hai. Đời máy quyết định.'),
      q('q4', 'Cảm biến kích nổ bảo vệ máy bằng cách nào?', 'Báo rung bất thường để ECU lùi thời điểm lửa', 'Phun nước vào lốp', 'Mở túi khí', 'Tắt ABS', 'a', 'Gõ máy là cháy không đều, có thể hại piston nếu để lửa quá sớm.'),
      q('q5', 'Vì sao cần cả cảm biến cam lẫn cảm biến khuỷu?', 'Khuỷu không phân biệt được thì nén và thì xả sau hai vòng', 'Cam đo áp lốp', 'Khuỷu chỉ dùng cho radio', 'Cam thay ắc quy', 'a', 'Hai vòng khuỷu là một chu trình. Cam quay một vòng và đánh dấu thì.'),
    ],
    [
      e('e1', 'Chọn ba cảm biến và nói ECU dùng số đó để quyết định việc gì.', 'MAF hoặc MAP: lượng xăng. CKP: thời điểm lửa và phun. ECT: đậm hỗn hợp và tua chờ lúc lạnh. O2: sửa xăng sau khi đã cháy. Có thể đổi bộ ba, miễn đúng việc.'),
      e('e2', 'Xe hao xăng, tua chờ cao, máy đã nóng trên kim taplo. Giả thuyết cảm biến nào?', 'ECT báo lạnh trong khi nước đã nóng, ECU vẫn bù xăng lúc lạnh. Kim taplo có thể dùng tín hiệu khác nên vẫn chỉ nóng.'),
      e('e3', 'Vì sao không được gán đủ tám cảm biến này cho mọi City?', 'Một số đời bỏ MAF, một số không có cùng số cảm biến ô-xy, vị trí lắp khác nhau. Sơ đồ chân giắc của đời xe là danh sách đúng.'),
    ],
  ),
  L21: assemble(
    'L21',
    'blocks',
    note,
    'thermostat',
    pickFlows('thermal', 'mechanical', 'electrical'),
    [
      { kind: 'spine', id: 'pump', below: ['thermal'] },
      { kind: 'spine', id: 'thermostat', below: ['thermal'] },
      { kind: 'pair', from: 'radiator', to: 'fan', flow: 'thermal', below: ['mechanical'] },
      { kind: 'spine', id: 'compressor', below: ['thermal'] },
      { kind: 'pair', from: 'condenser', to: 'evaporator', flow: 'thermal', below: [] },
    ] as DiagramRow[],
    [
      detail('pump', 'Bơm nước', 'Water pump', ['thermal', 'mechanical'], 'Đẩy nước quanh áo máy.', 'Nhiệt phải rời thành xy-lanh.', 'Chảy roăng, gãy cánh.', 'Kim nhiệt cao.', 'Water pump'),
      detail('thermostat', 'Van hằng nhiệt', 'Thermostat', ['thermal'], 'Đóng khi máy lạnh để nước chưa ra két, mở khi đủ nóng.', 'Máy cần nhanh tới nhiệt làm việc.', 'Kẹt đóng: nóng. Kẹt mở: lâu nóng, hao xăng.', 'Kim lên nhanh hoặc không bao giờ lên giữa.', 'Thermostat'),
      detail('radiator', 'Két nước', 'Radiator', ['thermal'], 'Nhả nhiệt nước ra không khí trước mũi xe.', 'Điểm thoát nhiệt chính của máy.', 'Tắc ruột, thủng.', 'Nóng máy, nước sôi.', 'Radiator'),
      detail('fan', 'Quạt', 'Cooling fan', ['electrical', 'thermal'], 'Kéo gió qua két khi xe chậm hoặc đứng.', 'Lúc đó không có gió chạy xe.', 'Rơ-le hoặc mô-tơ quạt.', 'Nóng khi kẹt xe, mát lại khi chạy đều.', 'Cooling fan'),
      detail('compressor', 'Máy nén lạnh', 'A/C compressor', ['mechanical', 'thermal'], 'Nén gas lạnh, do đai hoặc điện kéo.', 'Tạo chênh áp để gas nhận và nhả nhiệt.', 'Hỏng ly hợp hoặc hết gas.', 'Điều hòa không mát, máy vẫn có thể chạy.', 'A/C compressor'),
      detail('condenser', 'Dàn nóng', 'Condenser', ['thermal'], 'Gas cao áp nhả nhiệt ra trước xe, thường trước két nước.', 'Gas phải hóa lỏng trước khi vào van tiết lưu.', 'Móp, tắc bụi.', 'Mát kém lúc đứng yên.', 'Condenser'),
      detail('evaporator', 'Dàn lạnh', 'Evaporator', ['thermal'], 'Gas hạ áp nhận nhiệt từ gió cabin.', 'Chỗ cabin được làm mát.', 'Rò gas, bẩn dàn.', 'Không mát, mùi ẩm.', 'Evaporator'),
    ],
    [
      q('q1', 'Van hằng nhiệt kẹt đóng thì chuyện gì xảy ra?', 'Nước không ra két, máy nóng', 'Điều hòa mát hơn', 'Hết điện 12V ngay', 'Số bị về N', 'a', 'Van đóng là đường vòng trong máy. Két bị loại khỏi vòng.'),
      q('q2', 'Quạt két chủ yếu cần khi nào?', 'Xe chậm hoặc đứng, không đủ gió chạy xe', 'Chỉ khi trời mưa', 'Chỉ khi hết xăng', 'Chỉ lúc đề', 'a', 'Chạy nhanh thì gió đối lưu qua két. Kẹt xe thì phải có quạt.'),
      q('q3', 'Vòng điều hòa và vòng nước máy có chung gas không?', 'Không. Nước làm mát máy. Gas lạnh làm mát cabin', 'Có, đổ gas vào két nước', 'Có, vì cùng một két', 'Nước máy chính là gas', 'a', 'Hai vòng trao đổi nhiệt khác chất, khác áp, khác việc.'),
      q('q4', 'Dàn nóng của điều hòa nằm đâu trên nhiều sedan?', 'Trước mũi xe, gần két nước', 'Trong bình xăng', 'Trong lốp', 'Trong hộp số', 'a', 'Nó cần gió. Dàn lạnh mới nằm trong hộp gió cabin.'),
      q('q5', 'Máy lâu đạt nhiệt làm việc. Van nào đáng nghi?', 'Van hằng nhiệt kẹt mở', 'Van xả áp turbo của City NA', 'Van lốp', 'Van EGR trong mọi trường hợp', 'a', 'Nước ra két quá sớm nên máy bị làm mát trước khi nóng đủ.'),
    ],
    [
      e('e1', 'Kể vòng nước từ máy tới két và về.', 'Bơm đẩy nước qua áo máy, tới van hằng nhiệt. Khi van mở, nước sang két, gió và quạt lấy nhiệt, nước nguội về máy.'),
      e('e2', 'Kể vòng gas lạnh bằng bốn đoạn, không cần áp suất.', 'Máy nén nén gas. Dàn nóng nhả nhiệt và gas hóa lỏng. Van tiết lưu hạ áp. Dàn lạnh nhận nhiệt cabin và gas hóa hơi trở lại máy nén.'),
      e('e3', 'Ôn level 4: điện 12V, các hộp và nhiệt gặp nhau ở quạt két thế nào?', 'Cảm biến nhiệt là dữ liệu. Hộp điều khiển quyết định. Rơ-le và cầu chì là điện 12V. Quạt là chấp hành của vòng nhiệt. Thiếu một đoạn thì kẹt xe sẽ nóng máy dù két còn nước.'),
    ],
  ),
}
