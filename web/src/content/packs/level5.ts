import type { DiagramRow, Essay, Mcq } from '../lesson01.ts'
import { assemble, detail, pickFlows, type LessonPack } from '../pack.ts'

const note = 'Kéo để xoay. Các khối là hộp và đường tin, không phải bó dây thật của một đời xe.'

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

export const LEVEL5: Record<string, LessonPack> = {
  L22: assemble(
    'L22',
    'blocks',
    note,
    'can',
    pickFlows('data'),
    [
      { kind: 'spine', id: 'ecm', below: ['data'] },
      { kind: 'spine', id: 'can', below: ['data'] },
      { kind: 'pair', from: 'abs', to: 'bcm', flow: 'data', below: ['data'] },
      { kind: 'pair', from: 'gw', to: 'screen', flow: 'data', below: [] },
    ] as DiagramRow[],
    [
      detail('ecm', 'ECM', 'Engine controller', ['data'], 'Một nút trên mạng, không phải máy chủ duy nhất của cả xe.', 'Nó phát tua máy và nhận yêu cầu.', 'Im lặng trên bus làm các hộp khác mất dữ liệu máy.', 'Đèn máy, số không biết tua.', 'ECM'),
      detail('can', 'CAN', 'CAN bus', ['data'], 'Đường hai dây, nhiều hộp cùng nghe, khung có mã định danh.', 'Giống một message bus: ai cũng có thể phát nếu thắng trọng tài.', 'Chập hai dây hoặc đứt một dây.', 'Nhiều hộp cùng lỗi, không phải một cảm biến.', 'CAN bus'),
      detail('abs', 'ABS', 'ABS node', ['data'], 'Phát tốc độ bánh cho hộp khác dùng.', 'Tốc độ xe là tin dùng chung, không phải của riêng đồng hồ.', 'Mất nút ABS.', 'Đồng hồ tốc độ và ESC cùng chịu.', 'ABS node'),
      detail('bcm', 'BCM', 'Body node', ['data'], 'Nút thân xe trên CAN hoặc trên LIN tùy tín hiệu.', 'Đèn và cửa không cần băng thông của tín hiệu lửa.', 'Mất nguồn nút.', 'Tiện nghi chết, máy có thể còn.', 'Body node'),
      detail('gw', 'Cổng nối', 'Gateway', ['data'], 'Hộp chuyển khung giữa các mạng có tốc độ và luật khác nhau.', 'Không để mạng giải trí nói thẳng vào mạng phanh.', 'Treo hoặc lỗi phần mềm cổng.', 'Một miền mất tin của miền kia.', 'Gateway'),
      detail('screen', 'Màn hình', 'Head unit', ['data'], 'Nút tốc độ thấp hơn, thường sau cổng nối.', 'Người xem thông tin. Không tính góc lửa.', 'Treo máy hoặc đứt bus riêng.', 'Màn hình đen. Máy vẫn nổ nếu mạng máy còn.', 'Head unit'),
    ],
    [
      q('q1', 'CAN giống khái niệm phần mềm nào nhất?', 'Message bus mà nhiều nút cùng phát và cùng nghe', 'Một biến toàn cục chỉ ECM được ghi', 'Một file log trên USB', 'Một ống nước', 'a', 'Khung có ID. Trọng tài chọn khung ưu tiên khi hai nút cùng phát. Payload là dữ liệu của khung đó.'),
      q('q2', 'Vì sao tín hiệu lửa không đi chung băng thông với âm thanh?', 'Vì độ trễ và độ tin cậy khác nhau. Cổng nối tách mạng', 'Vì âm thanh là điện 220V', 'Vì luật cấm dây đồng', 'Vì màn hình nằm trong bugi', 'a', 'Mạng máy và mạng thân xe, mạng giải trí có yêu cầu khác. LIN chậm hơn cho công tắc. Ethernet ô tô dành cho dữ liệu lớn trên xe có trang bị.'),
      q('q3', 'Hai hộp phát cùng lúc trên CAN thì sao?', 'Khung có ID ưu tiên hơn thắng, hộp kia thử lại', 'Cả bus cháy', 'ECU xóa hộp số', 'Xe bắt buộc nổ túi khí', 'a', 'Trọng tài theo bit. ID nhỏ hơn thường thắng trên CAN cổ điển. Không cần mô tả dạng sóng để hiểu ý này.'),
      q('q4', 'LIN dùng cho việc nào hợp hơn CAN?', 'Công tắc cửa, mô-tơ ghế, nơi ít dữ liệu và chấp nhận chậm', 'Đồng bộ góc lửa từng mili giây của mọi xy-lanh trên mọi xe', 'Thay ắc quy', 'Đo áp đĩa phanh bằng video', 'a', 'LIN rẻ và chậm, thường có một chủ. CAN cho các hộp cần nói chuyện ngang hàng hơn.'),
      q('q5', 'Màn hình đen có chứng minh CAN máy đứt không?', 'Không. Màn hình có thể chết riêng trong khi bus máy vẫn chạy', 'Có, luôn đứt cả xe', 'Có, vì chỉ có một dây trong mọi xe', 'Không bao giờ liên quan điện', 'a', 'Tách miền. Nhiều hộp máy và số cùng im thì mới nghi bus chung.'),
    ],
    [
      e('e1', 'Giải thích CAN cho một lập trình viên bằng ID, trọng tài và payload.', 'Mỗi khung mang một ID và một đoạn dữ liệu. Các nút nghe cùng lúc. Nếu hai nút phát cùng lúc, ID ưu tiên hơn được nằm trên bus, nút kia dừng và gửi lại. Không có một server trung tâm giữ hàng đợi như nhiều ứng dụng web.'),
      e('e2', 'Vì sao gateway tồn tại?', 'Để dịch và chặn giữa mạng nhanh của máy, mạng thân xe và mạng giải trí. Một lỗi phần mềm trình phát nhạc không được ghi lệnh vào hộp phanh.'),
      e('e3', 'FlexRay và Ethernet ô tô nằm ở đâu so với CAN, một câu?', 'FlexRay trên một số xe cần nhịp cứng hơn. Automotive Ethernet mang dữ liệu lớn như camera trên xe có trang bị. Xe phổ thông vẫn dựa nhiều vào CAN và LIN. Không phải mọi City có Ethernet.'),
    ],
  ),
  L23: assemble(
    'L23',
    'blocks',
    note,
    'obd',
    pickFlows('data'),
    [
      { kind: 'spine', id: 'dlc', below: ['data'] },
      { kind: 'spine', id: 'obd', below: ['data'] },
      { kind: 'trio', left: 'p0300', leftFlow: 'data', center: 'p0420', right: 'p0171', rightFlow: 'data', below: [] },
    ] as DiagramRow[],
    [
      detail('dlc', 'Giắc OBD', 'DLC', ['data'], 'Ổ cắm 16 chân trong cabin, thường dưới taplo.', 'Cửa đọc mã mà không tháo hộp.', 'Gãy chân hoặc mất nguồn chân 16.', 'Máy chẩn đoán không nối được.', 'DLC'),
      detail('obd', 'OBD-II', 'OBD-II', ['data'], 'Quy ước mã lỗi và dữ liệu sống cho xe sau một mốc pháp lý, tùy thị trường.', 'Kỹ thuật viên đọc cùng một dạng mã giữa nhiều hãng, rồi vẫn phải đọc thêm mã riêng của hãng.', 'Đèn máy sáng mà không có mã là hiếm. Ngược lại rất phổ biến.', 'Đèn check engine.', 'OBD-II'),
      detail('p0300', 'P0300', 'P0300', ['data'], 'Bỏ cháy ngẫu nhiên, nhiều xy-lanh hoặc không xác định được một xy-lanh.', 'Cháy không đều. Chưa chỉ một bugi.', 'Lửa, xăng, khí hoặc nén.', 'Rung, hao xăng.', 'P0300'),
      detail('p0420', 'P0420', 'P0420', ['data'], 'Hiệu quả xúc tác dưới ngưỡng.', 'Bộ xúc tác không còn xử lý khí như thiết kế, hoặc cảm biến ô-xy báo sai.', 'Xúc tác, ô-xy, xăng lọt lâu ngày.', 'Đèn máy, chưa chắc mất kéo ngay.', 'P0420'),
      detail('p0171', 'P0171', 'P0171', ['data'], 'Hệ thống quá nghèo, thường là ngân hàng 1.', 'ECU đã phải thêm xăng nhiều hơn mức bình thường.', 'Xì gió sau cảm biến, áp xăng thấp, hoặc đo khí sai.', 'Tua không ổn, ngộp ga.', 'P0171'),
    ],
    [
      q('q1', 'P0300 gợi ý đoạn nào?', 'Cháy không đều, phải tách lửa, xăng, khí và nén', 'Chắc chắn gãy trục láp', 'Chắc chắn hết gas điều hòa', 'Chắc chắn hỏng loa', 'a', 'Mã nói hiện tượng bỏ cháy, không thay thế việc đo.'),
      q('q2', 'P0420 nằm trên đường nào?', 'Khí xả và bộ xúc tác', 'Đường dầu phanh', 'Đường lái', 'Đường loa', 'a', 'Xúc tác kém hoặc cảm biến báo sai. Xăng lọt kéo dài có thể là nguyên nhân gốc.'),
      q('q3', 'P0171 nghĩa là hỗn hợp thế nào?', 'Nghèo: khí nhiều hơn so với xăng mà ECU đo được', 'Quá giàu xăng trong mọi trường hợp', 'Hết dầu số', 'Non lốp', 'a', 'ECU đã bù thêm xăng tới ngưỡng và vẫn thấy nghèo. Xì gió là ứng viên hàng đầu, không phải ứng viên duy nhất.'),
      q('q4', 'Freeze frame là gì?', 'Ảnh dữ liệu lúc mã được ghi', 'Một kiểu phanh', 'Ảnh camera lùi', 'Tem áp lốp', 'a', 'Nó cho biết máy đang nguội hay nóng, ga lớn hay nhỏ lúc lỗi xuất hiện.'),
      q('q5', 'UDS và DoIP ở mức bài này là gì?', 'Các cách nói chuyện với hộp, sâu hơn mã OBD phổ thông. DoIP đi trên IP', 'Một loại xăng', 'Một góc đặt bánh', 'Một dầu số', 'a', 'Chỉ cần biết chúng là lớp chẩn đoán. Không cần lệnh hay địa chỉ để hiểu kiến trúc.'),
    ],
    [
      e('e1', 'Với P0300, kể bốn nhánh kiểm tra mà không nhảy thẳng tới thay máy.', 'Lửa: bugi và mô-bin. Xăng: kim và áp. Khí: xì cổ, van. Nén: đo áp xy-lanh. Dữ liệu sống và freeze frame chọn nhánh có khả năng hơn.'),
      e('e2', 'P0420 sau một thời gian dài hao xăng. Bạn đặt xúc tác là nạn nhân hay là thủ phạm duy nhất?', 'Xúc tác có thể đã hỏng vì phải xử lý xăng chưa cháy. Thay xúc tác mà không hết bỏ cháy thì mã quay lại. P0300 và P0420 có thể là một câu chuyện.'),
      e('e3', 'P0171 và một ống chân không nứt sau bướm ga liên quan thế nào?', 'Khí lọt vào không đi qua chỗ đo, ECU thấy nghèo và thêm xăng. Tới ngưỡng thì ghi P0171. Xử lý chỗ xì trước khi kết luận kim phun.'),
    ],
  ),
  L24: assemble(
    'L24',
    'blocks',
    note,
    'autosar',
    pickFlows('data'),
    [
      { kind: 'spine', id: 'fw', below: ['data'] },
      { kind: 'spine', id: 'rtos', below: ['data'] },
      { kind: 'spine', id: 'autosar', below: ['data'] },
      { kind: 'pair', from: 'gw', to: 'ivi', flow: 'data', below: ['data'] },
      { kind: 'spine', id: 'ota', below: [] },
    ] as DiagramRow[],
    [
      detail('fw', 'Firmware', 'Firmware', ['data'], 'Phần mềm gắn với một hộp, quyết định cách đọc cảm biến và ra lệnh.', 'Hộp không có hành vi nếu không có chương trình.', 'Lập sai hoặc bộ nhớ hỏng.', 'Lỗi có quy luật, đôi khi hết sau khi nạp lại bản đúng của đời xe.', 'Firmware'),
      detail('rtos', 'RTOS', 'RTOS', ['data'], 'Hệ điều hành thời gian thực trong hộp điều khiển.', 'Việc lửa và phanh phải có hạn thời gian, không xếp hàng như một ứng dụng thông thường.', 'Treo tác vụ.', 'Hộp khởi động lại hoặc im.', 'RTOS'),
      detail('autosar', 'AUTOSAR', 'AUTOSAR', ['data'], 'Một kiến trúc phần mềm ô tô nhiều hãng dùng để tách ứng dụng khỏi phần cứng.', 'Để phần mềm điều khiển viết trên một lớp chuẩn.', 'Không phải mọi hộp trên mọi City đều ghi chữ AUTOSAR.', 'Lỗi lớp ứng dụng hoặc lớp cơ sở, tùy ca.', 'AUTOSAR'),
      detail('gw', 'Gateway', 'Gateway', ['data'], 'Nơi chính sách mạng được thực thi: miền nào được nói với miền nào.', 'Ngăn mạng tiện nghi điều khiển miền an toàn.', 'Cấu hình sai.', 'Mất một nhóm tín hiệu giữa hai mạng.', 'Gateway'),
      detail('ivi', 'Đầu giải trí', 'IVI', ['data'], 'Có thể chạy Linux hoặc Android trên một số xe. Không phải RTOS của ECM.', 'Giao diện người dùng cần màn hình và ứng dụng.', 'Treo ứng dụng.', 'Màn hình đứng. Không kết luận ECM treo theo.', 'IVI'),
      detail('ota', 'OTA', 'OTA update', ['data'], 'Cập nhật phần mềm qua sóng, nếu xe và đời phần mềm hỗ trợ.', 'Sửa lỗi không cần tháo hộp. Không phải mọi City đều có.', 'Mất điện giữa chừng hoặc bản không đúng xe.', 'Một chức năng đổi sau cập nhật, hoặc hộp không khởi động.', 'OTA'),
    ],
    [
      q('q1', 'Firmware ECM khác ứng dụng trên màn hình ở điểm nào?', 'ECM bị hạn thời gian cứng của lửa và phun. Màn hình thì không', 'Không khác, cùng một file APK', 'ECM chạy trong điện thoại', 'Màn hình tính góc lửa', 'a', 'Hỏng màn hình là mất giao diện. Hỏng firmware ECM là mất điều khiển cháy.'),
      q('q2', 'AUTOSAR là gì ở mức kiến trúc?', 'Lớp chuẩn để phần mềm điều khiển không viết dính hoàn toàn vào một mạch', 'Một loại dầu máy', 'Một cỡ lốp', 'Một mã lỗi P0420', 'a', 'Nó là cách tổ chức phần mềm. Sự có mặt của nó tùy hộp và đời xe.'),
      q('q3', 'OTA có trên mọi City không?', 'Không. Tùy đời xe và nhà sản xuất có mở đường cập nhật hay không', 'Có trên mọi xe từ trước năm 2000', 'Có, và nó nạp lại góc cam bằng radio FM', 'Không bao giờ cần điện', 'a', 'Cập nhật qua dây tại xưởng vẫn là đường phổ biến trên nhiều xe xăng.'),
      q('q4', 'Vì sao đầu Android không được gửi lệnh lửa?', 'Vì gateway và thiết kế mạng tách miền tiện nghi khỏi miền điều khiển', 'Vì Android không có điện', 'Vì luật vật lý cấm sóng radio', 'Vì bugi chạy bằng dầu phanh', 'a', 'Đây là cách cô lập lỗi. Một ứng dụng bản đồ treo không được đổi thời điểm bugi.'),
      q('q5', 'An toàn chức năng ở mức bài này nghĩa là gì?', 'Phần mềm phải về trạng thái an toàn khi cảm biến không còn đáng tin', 'Xe không bao giờ hỏng', 'Tắt hết phanh khi có lỗi màn hình', 'Xóa mã lỗi để hết việc', 'a', 'Ví dụ ga điện tử về chế độ hạn chế nếu hai kênh bàn đạp không khớp. Đó là thiết kế, không phải mẹo sửa.'),
    ],
    [
      e('e1', 'Xếp firmware, RTOS, AUTOSAR, gateway, IVI và OTA thành các tầng.', 'Firmware là chương trình trên hộp. RTOS chia thời gian cho việc khắt khe. AUTOSAR là cách tổ chức phần mềm đó nếu hộp dùng. Gateway ngăn miền. IVI là máy tính tiện nghi. OTA là đường cập nhật, nếu có.'),
      e('e2', 'Vì sao một bản cập nhật phải đúng mã hộp và đời xe?', 'Cùng một tên City có thể khác phần cứng và khác hiệu chỉnh xăng lửa. Bản sai là sai hành vi điều khiển, không phải sai màu giao diện.'),
      e('e3', 'Một ứng dụng bản đồ bị treo. Bạn có tắt máy để “reset ECM” như một bước đầu không?', 'Không cần. Khởi động lại đầu giải trí hoặc kiểm tra nguồn của nó. ECM không chạy ứng dụng bản đồ. Chỉ khi máy cũng chết hoặc đèn máy sáng thì mới sang miền ECM.'),
    ],
  ),
}
