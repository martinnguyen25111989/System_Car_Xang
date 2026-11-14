import type { DiagramRow, Essay, Mcq } from '../lesson01.ts'
import { assemble, detail, pickFlows, type LessonPack } from '../pack.ts'

const note = 'Kéo để xoay. Sơ đồ là các chức năng an toàn, không phải vị trí túi khí của một đời City.'

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

export const LEVEL6: Record<string, LessonPack> = {
  L25: assemble(
    'L25',
    'blocks',
    note,
    'esc',
    pickFlows('data', 'mechanical', 'electrical'),
    [
      { kind: 'pair', from: 'abs', to: 'esc', flow: 'data', below: ['data'] },
      { kind: 'pair', from: 'tcs', to: 'aeb', flow: 'data', below: ['data'] },
      { kind: 'spine', id: 'acc', below: ['data'] },
      { kind: 'spine', id: 'lka', below: [] },
    ] as DiagramRow[],
    [
      detail('abs', 'ABS', 'ABS', ['data', 'mechanical'], 'Chống khóa bánh khi phanh.', 'Giữ khả năng đổi hướng.', 'Cảm biến bánh.', 'Đèn ABS.', 'ABS'),
      detail('esc', 'ESC', 'ESC', ['data', 'mechanical'], 'Phanh từng bánh và có thể bớt ga khi xe trượt ngang.', 'Kéo thân xe về hướng vô-lăng đang chỉ.', 'Cảm biến góc lái hoặc gia tốc.', 'Đèn ESC, xe văng dễ hơn khi tắt hệ thống.', 'ESC'),
      detail('tcs', 'Kiểm soát lực kéo', 'TCS', ['data'], 'Bớt ga hoặc phanh bánh đang quay trơn lúc tăng tốc.', 'Mô-men không thành khói lốp.', 'Cùng cảm biến bánh với ABS.', 'Bánh trước hú lúc đạp ga trên ướt, hoặc đèn báo.', 'TCS'),
      detail('aeb', 'Phanh tự động khẩn', 'AEB', ['data'], 'Camera hoặc radar thấy vật cản, xe tự phanh nếu người lái chưa phanh.', 'Giảm tốc trước va chạm. Không phải trên mọi bản City.', 'Kính bẩn, radar lệch sau va chạm.', 'Báo va chạm giả hoặc không báo.', 'AEB'),
      detail('acc', 'Ga tự động thích ứng', 'Adaptive cruise', ['data'], 'Giữ tốc độ và khoảng cách nếu xe có radar.', 'Giảm tải chân ga trên đường trường.', 'Mất mục tiêu radar.', 'Ga tự động tắt, người lái phải nhận lại.', 'Adaptive cruise'),
      detail('lka', 'Giữ làn', 'Lane keep', ['data'], 'Camera đọc vạch và hỗ trợ vô-lăng nếu xe có chức năng.', 'Giảm lệch làn do mất tập trung. Không thay người lái.', 'Vạch mờ, camera khuất.', 'Trợ lực nhẹ hoặc tắt chức năng.', 'Lane keep'),
    ],
    [
      q('q1', 'ESC khác ABS ở mục tiêu nào?', 'ESC kéo xe khỏi trượt ngang. ABS giữ bánh không khóa khi phanh', 'Không khác', 'ESC chỉ bật đèn pha', 'ABS tăng mô-men máy', 'a', 'Cùng có thể dùng phanh từng bánh, nhưng tình huống kích hoạt khác.'),
      q('q2', 'TCS làm việc lúc nào?', 'Khi bánh kéo quay nhanh hơn mức bám lúc tăng tốc', 'Khi hết xăng', 'Khi mở cửa', 'Khi hết gas lạnh', 'a', 'Nó bảo vệ độ bám lúc ga, không phải lúc phanh gấp.'),
      q('q3', 'AEB có trên mọi bản City không?', 'Không. Tùy đời và bản', 'Có từ xe đầu tiên của mọi hãng', 'Chỉ có khi xe là BEV', 'Có trong bugi', 'a', 'Đừng giả sử một City bất kỳ sẽ tự phanh.'),
      q('q4', 'Giữ làn dùng cảm biến nào là chính trên xe phổ thông?', 'Camera nhìn vạch', 'Cảm biến ô-xy', 'MAF', 'Cảm biến va đập túi khí', 'a', 'Hết vạch hoặc kính bẩn thì chức năng không có dữ liệu.'),
      q('q5', 'Người lái tắt ESC rồi vào cua nhanh. Hệ thống còn việc gì?', 'Không còn can thiệp trượt ngang cho đến khi được bật lại. Phanh cơ vẫn có', 'Tắt luôn dầu phanh', 'Khóa vô-lăng', 'Xả két nước', 'a', 'Nút tắt là chủ động bỏ một lớp hỗ trợ, không phải tắt phanh.'),
    ],
    [
      e('e1', 'Sắp xếp ABS, TCS và ESC theo tình huống ga, phanh và trượt ngang.', 'Phanh gấp khóa bánh: ABS. Ga mạnh bánh trượt: TCS. Xe đi ngang so với hướng vành: ESC. Cả ba đều là an toàn chủ động vì chúng cố tránh va chạm.'),
      e('e2', 'Vì sao AEB báo nhầm khi trời mưa hoặc khi radar bị bùn?', 'Dữ liệu đầu vào sai thì quyết định phanh sai. Hệ thống không nhìn đường bằng mắt người. Vệ sinh cảm biến là một phần của chức năng.'),
      e('e3', 'Ga tự động thích ứng khác ga tự động chỉ giữ tốc độ ở điểm nào?', 'Bản chỉ giữ tốc độ không nhìn xe phía trước. Bản thích ứng dùng radar hoặc camera để giảm tốc khi có xe chậm hơn. Không phải mọi City có bản thứ hai.'),
    ],
  ),
  L26: assemble(
    'L26',
    'blocks',
    note,
    'airbag',
    pickFlows('mechanical', 'electrical', 'data'),
    [
      { kind: 'spine', id: 'belt', below: ['mechanical'] },
      { kind: 'spine', id: 'pre', below: ['electrical'] },
      { kind: 'spine', id: 'airbag', below: ['data'] },
      { kind: 'pair', from: 'crumple', to: 'isofix', flow: 'mechanical', below: [] },
    ] as DiagramRow[],
    [
      detail('belt', 'Dây đai', 'Seat belt', ['mechanical'], 'Giữ người vào ghế.', 'Túi khí không thay đai. Người không được đai thì túi có thể hại.', 'Khóa hỏng, dây không cuốn.', 'Đèn đai, hoặc dây không giữ.', 'Seat belt'),
      detail('pre', 'Bộ căng đai', 'Pretensioner', ['electrical'], 'Kéo đai chặt hơn trong vài phần nghìn giây đầu của va chạm.', 'Giảm khoảng người lao về trước.', 'Đã nổ sau tai nạn thì phải thay, không reset bằng cách cuốn tay.', 'Đai chùng sau va chạm, đèn túi khí.', 'Pretensioner'),
      detail('airbag', 'Túi khí', 'Airbag', ['data', 'electrical'], 'Túi bung bằng khí khi hộp đo được gia tốc va chạm đủ lớn.', 'Đệm phần còn lại sau khi đai đã giữ người.', 'Đèn lỗi, hoặc đã bung.', 'Đèn airbag. Không đo dây túi bằng cách chọc điện.', 'Airbag'),
      detail('crumple', 'Vùng hấp thụ', 'Crumple zone', ['mechanical'], 'Phần đầu và đuôi xe biến dạng có chủ đích.', 'Kéo dài thời gian va chạm để giảm lực lên khoang người.', 'Đã móp sau tai nạn rồi nắn sơ sài.', 'Khoang người không còn khoảng hấp thụ như thiết kế.', 'Crumple zone'),
      detail('isofix', 'ISOFIX', 'ISOFIX', ['mechanical'], 'Điểm móc ghế trẻ em vào thân xe.', 'Ghế trẻ không chỉ dựa vào đai người lớn.', 'Móc biến dạng.', 'Ghế không khóa được tiếng tách.', 'ISOFIX'),
    ],
    [
      q('q1', 'Túi khí có thay dây đai không?', 'Không. Đai giữ người, túi đệm thêm', 'Có', 'Chỉ trên City', 'Chỉ khi tắt ABS', 'a', 'Thiết kế túi giả định người đã được đai ở nhiều vị trí ngồi.'),
      q('q2', 'Vùng hấp thụ va chạm dùng để làm gì?', 'Biến dạng để giảm lực đỉnh lên khoang người', 'Tăng độ cứng vô hạn để không móp một milimet', 'Chứa xăng', 'Gắn turbine', 'a', 'Móp đúng chỗ là việc của kết cấu, không phải lỗi sơn.'),
      q('q3', 'Bộ căng đai đã làm việc sau tai nạn thì xử lý thế nào?', 'Thay cụm theo hướng dẫn sửa chữa, không cuốn lại bằng tay cho xong', 'Sơn lại', 'Đổ thêm dầu máy', 'Reset bằng cách rút ắc quy một phút trong mọi đời xe', 'a', 'Nó là thiết bị một lần. Rút ắc quy không nạp lại thuốc đẩy.'),
      q('q4', 'ISOFIX móc vào đâu?', 'Điểm trên thân xe, cho ghế trẻ em', 'Vào trục láp', 'Vào ray xăng', 'Vào thước lái', 'a', 'Không phải mọi vị trí ngồi đều có móc. Xem ký hiệu trên ghế của đời xe.'),
      q('q5', 'Đèn túi khí sáng trước khi va chạm nghĩa là gì?', 'Hệ thống đang báo lỗi và có thể không bung đúng thiết kế', 'Túi sẽ bung mạnh hơn', 'Chỉ là hết xăng', 'ABS đã thay túi', 'a', 'Đèn này không phải đèn bảo dưỡng định kỳ. Phải đọc mã của hộp túi khí.'),
    ],
    [
      e('e1', 'Sắp xếp đai, bộ căng, túi khí và vùng móp theo thứ tự một cú đâm thẳng.', 'Đầu xe bắt đầu móp và kéo dài thời gian lực. Bộ căng kéo đai. Người được giữ vào ghế. Túi bung để đỡ đầu và ngực nếu gia tốc đủ ngưỡng. Các bước chồng lên nhau trong vài phần trăm giây.'),
      e('e2', 'Vì sao không sửa dây túi khí bằng cách đấu tắt đèn?', 'Đèn tắt giả không làm túi lành. Lúc va chạm, túi có thể không bung hoặc bung nhầm. Đây là thiết bị an toàn, không phải bóng đèn báo.'),
      e('e3', 'Ghế trẻ em chỉ quàng đai người lớn khác ISOFIX thế nào?', 'ISOFIX khóa ghế vào thân xe bằng móc cứng. Đai người lớn giữ người, không phải lúc nào cũng giữ được vỏ ghế trẻ nếu ghế không có đường đai đúng. Làm theo nhãn ghế và nhãn xe.'),
    ],
  ),
  L27: assemble(
    'L27',
    'blocks',
    note,
    'fusion',
    pickFlows('data'),
    [
      { kind: 'trio', left: 'camera', leftFlow: 'data', center: 'radar', right: 'sonic', rightFlow: 'data', below: ['data'] },
      { kind: 'spine', id: 'fusion', below: ['data'] },
      { kind: 'spine', id: 'decide', below: ['data'] },
      { kind: 'spine', id: 'act', below: [] },
    ] as DiagramRow[],
    [
      detail('camera', 'Camera', 'Camera', ['data'], 'Nhìn vạch, biển và hình dạng.', 'Rẻ và giàu chi tiết. Kém khi tối, mưa, ngược nắng.', 'Kính bẩn hoặc lệch sau thay kính.', 'Giữ làn tắt.', 'Camera'),
      detail('radar', 'Radar', 'Radar', ['data'], 'Đo khoảng cách và tốc độ tương đối bằng sóng.', 'Ít phụ thuộc ánh sáng hơn camera.', 'Lệch giá bắt sau va chạm.', 'Ga tự động mất mục tiêu.', 'Radar'),
      detail('sonic', 'Siêu âm', 'Ultrasonic', ['data'], 'Cảm biến khoảng cách rất gần, dùng khi lùi và đậu.', 'Rẻ cho cự ly ngắn.', 'Bùn bám.', 'Còi lùi kêu không đúng hoặc im.', 'Ultrasonic'),
      detail('fusion', 'Hợp nhất', 'Sensor fusion', ['data'], 'Phần mềm ghép các nguồn thành một bức tranh.', 'Một cảm biến không đủ cho mọi thời tiết và mọi cự ly.', 'Một nguồn sai kéo cả quyết định nếu chưa được thiết kế loại trừ.', 'Báo vật cản ma hoặc bỏ sót.', 'Sensor fusion'),
      detail('decide', 'Quyết định', 'Decision', ['data'], 'Chọn cảnh báo, hỗ trợ lái, hoặc phanh.', 'Người lái vẫn chịu trách nhiệm trên xe mức thấp.', 'Phần mềm hoặc dữ liệu sai.', 'Can thiệp không đúng tình huống.', 'Decision'),
      detail('act', 'Chấp hành', 'Actuator', ['data', 'mechanical'], 'Phanh, ga hoặc trợ lực lái làm theo lệnh.', 'Quyết định phải thành lực.', 'Van phanh hoặc EPS không theo.', 'Có cảnh báo mà xe không giảm tốc.', 'Actuator'),
    ],
    [
      q('q1', 'LiDAR có phải trang bị của xe xăng phổ thông không?', 'Không. Camera, radar và siêu âm mới là nhóm phổ biến', 'Có trên mọi City', 'LiDAR nằm trong bugi', 'LiDAR thay lốp', 'a', 'LiDAR đo khoảng cách bằng laser, có trên một số xe thử nghiệm hoặc xe đắt tiền. Đừng đưa vào sơ đồ City như đồ chuẩn.'),
      q('q2', 'Camera kém ở tình huống nào?', 'Tối, mưa lớn, ngược nắng, vạch mờ', 'Khi xe có ắc quy', 'Khi máy nổ', 'Khi có đủ ánh sáng và vạch rõ', 'a', 'Radar bù một phần vì không cần thấy màu vạch, nhưng kém đọc biển báo hơn camera.'),
      q('q3', 'Mức tự lái 0 nghĩa là gì?', 'Người lái làm mọi việc. Xe có thể chỉ cảnh báo', 'Xe tự đi mọi đường', 'Không có vô-lăng trên mọi xe mức 0', 'Xe không có phanh', 'a', 'Mức 1 và 2 là hỗ trợ, người lái vẫn phải giám sát. Mức cao hơn không phải sedan phổ thông đang bán đại trà.'),
      q('q4', 'Hợp nhất cảm biến để làm gì?', 'Bù điểm mù của từng loại cảm biến', 'Tăng dung tích xy-lanh', 'Thay dầu số', 'Nạp gas lạnh', 'a', 'Camera thấy hình, radar thấy tốc độ, siêu âm thấy sát cản. Không loại nào đủ một mình.'),
      q('q5', 'Chuỗi ADAS đúng thứ tự nào?', 'Cảm biến, hợp nhất, quyết định, chấp hành', 'Chấp hành rồi mới nhìn', 'Chỉ có quyết định', 'Chỉ có siêu âm cho mọi chức năng', 'a', 'Nhìn, hiểu, chọn, làm. Đứt khâu nào thì chức năng tắt hoặc làm sai.'),
    ],
    [
      e('e1', 'Gán camera, radar và siêu âm cho một việc phù hợp.', 'Camera: vạch làn và biển. Radar: xe phía trước trên đường trường. Siêu âm: khoảng cách tới tường lúc lùi. Có xe đổi cách ghép, nhưng điểm mạnh vật lý của từng loại không đổi.'),
      e('e2', 'Vì sao mức 2 vẫn cần người lái nhìn đường?', 'Hệ thống chỉ hỗ trợ trong điều kiện nó được thiết kế. Nó không chịu trách nhiệm pháp lý thay người ngồi sau vô-lăng, và nó bỏ cuộc khi mất vạch hoặc mất radar.'),
      e('e3', 'Sau khi thay kính chắn gió, giữ làn hoạt động kém. Bạn nghi chi tiết nào?', 'Camera gắn trên kính có thể lệch hoặc chưa được hiệu chỉnh lại. Đó là cảm biến quang học, không phải lỗi xăng lửa.'),
    ],
  ),
}
