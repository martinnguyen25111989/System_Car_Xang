import type { DiagramRow, Essay, Mcq } from '../lesson01.ts'
import { assemble, detail, pickFlows, type LessonPack } from '../pack.ts'

const note = 'Kéo để xoay. Các khối là thiết bị người lái chạm mỗi ngày, không phải bản nội thất của một đời City.'

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

export const LEVEL7: Record<string, LessonPack> = {
  L28: assemble(
    'L28',
    'blocks',
    note,
    'dash',
    pickFlows('electrical', 'data', 'mechanical'),
    [
      { kind: 'pair', from: 'seat', to: 'dash', flow: 'electrical', below: ['electrical'] },
      { kind: 'pair', from: 'door', to: 'glass', flow: 'electrical', below: ['electrical'] },
      { kind: 'pair', from: 'mirror', to: 'lamp', flow: 'electrical', below: ['data'] },
      { kind: 'spine', id: 'cluster', below: [] },
    ] as DiagramRow[],
    [
      detail('seat', 'Ghế', 'Seat', ['mechanical', 'electrical'], 'Chỗ ngồi có thể chỉnh cơ hoặc điện, có cảm biến đai.', 'Tư thế lái và tín hiệu có người ngồi cho túi khí một số vị trí.', 'Mô-tơ ghế hoặc cảm biến đai.', 'Ghế không chỉnh, hoặc đèn đai sai.', 'Seat'),
      detail('dash', 'Táp-lô', 'Dashboard', ['data'], 'Bề mặt trước người lái, chứa túi và các cửa gió.', 'Vừa là giao diện vừa là kết cấu túi khí.', 'Nứt hoặc tháo sai sau khi sửa túi.', 'Tiếng kêu, hoặc túi không còn đường bung.', 'Dashboard'),
      detail('door', 'Cửa', 'Door', ['electrical'], 'Khóa, công tắc kính, loa và dây chạy qua bản lề.', 'Dây ở đây hay đứt vì cửa đóng mở nhiều.', 'Đứt bó dây bản lề.', 'Kính một cửa chết, loa cửa im, khóa lệch.', 'Door'),
      detail('glass', 'Kính', 'Window glass', ['electrical'], 'Kính cửa và kính chắn gió.', 'Nhìn đường và giữ người.', 'Mô-tơ kính hoặc cần gạt.', 'Kính không lên hết, hoặc gạt không chạy.', 'Window glass'),
      detail('mirror', 'Gương', 'Mirror', ['electrical'], 'Gương ngoài chỉnh điện, một số có sấy.', 'Nhìn điểm mù cơ học. Camera không thay hết gương trên nhiều City.', 'Mô-tơ gương hoặc kính vỡ.', 'Gương không chỉnh, mờ khi mưa nếu sấy hỏng.', 'Mirror'),
      detail('lamp', 'Đèn', 'Lamps', ['electrical'], 'Pha, cốt, xi-nhan, phanh, nội thất.', 'Cho người lái thấy và cho người khác thấy xe.', 'Bóng hoặc đèn LED, giắc, công tắc.', 'Một bên tối, hoặc đèn pha không lên.', 'Lamps'),
      detail('cluster', 'Đồng hồ', 'Instrument cluster', ['data'], 'Tốc độ, tua, nhiệt, mức xăng và đèn báo.', 'Tóm tắt trạng thái các miền cho người lái.', 'Mất mạng hoặc mất nguồn đồng hồ.', 'Đồng hồ tối trong khi máy vẫn nổ.', 'Instrument cluster'),
    ],
    [
      q('q1', 'Kính cửa một bên chết, các cửa khác vẫn chạy. Đoạn dây nào đáng nghi?', 'Bó dây đi qua bản lề của cửa đó', 'Bugi số 1', 'Trục láp', 'Xúc tác', 'a', 'Cửa là một nhánh điện riêng, hay mỏi ở chỗ gập.'),
      q('q2', 'Đồng hồ tắt nhưng máy vẫn nổ. Có phải hết xăng không?', 'Chưa. Có thể mất nguồn hoặc mất dữ liệu của cụm đồng hồ', 'Có, máy nổ không cần điện', 'Có, vì đồng hồ chính là bình xăng', 'Chắc chắn gãy khuỷu', 'a', 'Tách hiển thị khỏi powertrain. Nhiều đèn cùng chết thì nghĩ nguồn và mass.'),
      q('q3', 'Đèn pha là miền nào?', 'Điện thân xe, thường qua BCM và công tắc', 'ECM phun xăng', 'Hộp số CVT', 'Bơm nước', 'a', 'Hết đèn không được chẩn đoán bằng cách thay kim phun.'),
      q('q4', 'Cảm biến ngồi trên ghế phục vụ việc gì trên nhiều xe?', 'Báo có người để đai và túi khí xử lý đúng vị trí', 'Đo áp lốp', 'Đo gió nạp', 'Chọn số', 'a', 'Không phải mọi ghế City đều có đủ cảm biến. Đời xe quyết định.'),
      q('q5', 'Gạt mưa không chạy. Thuộc cụm nào?', 'Điện thân xe và mô-tơ gạt', 'Đường xăng cao áp', 'Vi sai', 'Turbo', 'a', 'Người lái mất tầm nhìn là việc an toàn dù máy vẫn khỏe.'),
    ],
    [
      e('e1', 'Chọn ba thiết bị trong cabin và nói hộp nào thường cai chúng.', 'Đèn, khóa, kính: BCM. Đồng hồ: cụm đồng hồ nghe mạng. Ghế điện: mô-tơ và có thể một hộp ghế. ECM không nằm trong danh sách này.'),
      e('e2', 'Vì sao dây cửa hỏng nhiều hơn dây nằm yên trong sàn?', 'Mỗi lần mở cửa, bó dây bị bẻ. Kim loại mỏi và đứt từng sợi. Triệu chứng lúc có lúc không là manh mối của dây gập.'),
      e('e3', 'Táp-lô sau khi bung túi khí có được lắp lại bằng cách dán không?', 'Không. Nắp túi là đường bung có chủ đích. Dán hoặc sửa sai làm túi bung lệch. Làm theo kết cấu của đời xe.'),
    ],
  ),
  L29: assemble(
    'L29',
    'blocks',
    note,
    'head',
    pickFlows('data', 'electrical'),
    [
      { kind: 'spine', id: 'head', below: ['data'] },
      { kind: 'pair', from: 'carplay', to: 'android', flow: 'data', below: ['data'] },
      { kind: 'spine', id: 'gw', below: ['data'] },
      { kind: 'spine', id: 'amp', below: [] },
    ] as DiagramRow[],
    [
      detail('head', 'Đầu máy', 'Head unit', ['data', 'electrical'], 'Máy tính màn hình, nguồn giải trí và điều hướng.', 'Giao diện. Không tính xăng và lửa.', 'Treo, mất nguồn.', 'Màn hình đen hoặc đứng hình.', 'Head unit'),
      detail('carplay', 'CarPlay', 'Apple CarPlay', ['data'], 'Điện thoại Apple xuất hình lên đầu xe qua cáp hoặc không dây nếu xe có.', 'Dùng ứng dụng điện thoại trên màn hình lớn.', 'Cáp dữ liệu chỉ sạc, hoặc phiên bản đầu xe không hỗ trợ.', 'Điện thoại không hiện.', 'Apple CarPlay'),
      detail('android', 'Android Auto', 'Android Auto', ['data'], 'Cùng vai với CarPlay cho điện thoại Android.', 'Không phải hệ điều hành của ECM.', 'Cáp, quyền trên điện thoại, hoặc đầu xe không có tính năng.', 'Không kết nối dù điện thoại vẫn sạc.', 'Android Auto'),
      detail('gw', 'Gateway', 'Gateway', ['data'], 'Cửa giữa đầu giải trí và mạng điều khiển.', 'Cho phép xem tốc độ hoặc nhiệt nếu nhà sản xuất cho phép, không cho ứng dụng sửa lửa.', 'Mất một tín hiệu hiển thị.', 'Màn hình còn, một số chỉ số mất.', 'Gateway'),
      detail('amp', 'Khuếch đại', 'Amplifier', ['electrical'], 'Đẩy loa. Có thể nằm trong đầu máy hoặc là hộp riêng.', 'Âm thanh cần công suất, không lấy từ chân CAN.', 'Cháy kênh loa.', 'Một bên im, màn hình vẫn chạy.', 'Amplifier'),
    ],
    [
      q('q1', 'CarPlay có điều khiển kim phun không?', 'Không. Nó là giao diện điện thoại trên màn hình', 'Có', 'Chỉ khi cắm USB', 'Chỉ trên City turbo', 'a', 'Đường vào miền máy bị gateway và thiết kế phần mềm chặn.'),
      q('q2', 'Điện thoại sạc được nhưng không hiện CarPlay. Một nguyên nhân phù hợp?', 'Cáp chỉ có dây sạc, không có dây dữ liệu, hoặc đầu xe không bật tính năng', 'Hết dầu phanh', 'Gãy trục khuỷu', 'Tắc két nước', 'a', 'Sạc và dữ liệu là các sợi khác nhau trong cùng một đầu cắm.'),
      q('q3', 'Loa một bên im, màn hình vẫn hiện bản đồ. Hỏng miền nào trước?', 'Kênh âm thanh hoặc dây loa', 'ECM', 'Cảm biến ô-xy', 'Vi sai', 'a', 'Tách âm thanh khỏi điều hướng. Cùng một đầu máy nhưng đường ra khác nhau.'),
      q('q4', 'Định vị trên màn hình lấy vị trí từ đâu trên nhiều xe đời mới?', 'Từ điện thoại khi dùng CarPlay hoặc Android Auto, hoặc từ anten của xe nếu có bản đồ gắn máy', 'Từ bugi', 'Từ áp suất lốp', 'Từ dầu số', 'a', 'Hai cách không giống nhau. Mất điện thoại thì CarPlay hết, bản đồ gắn máy có thể còn.'),
      q('q5', 'Vì sao không đọc trục trặc máy trên màn hình giải trí như đọc máy chẩn đoán?', 'Màn hình chỉ hiện những gì nhà sản xuất cho phép hiện. Mã đầy đủ nằm ở lớp OBD của hộp điều khiển', 'Vì màn hình luôn hiện đủ mã P của mọi hộp', 'Vì City không có ECM', 'Vì loa chứa freeze frame', 'a', 'Giao diện người dùng không thay giắc OBD.'),
    ],
    [
      e('e1', 'Vẽ đường từ điện thoại tới màn hình rồi nói đường đó dừng trước miền nào.', 'Điện thoại, cáp hoặc sóng, đầu xe, màn hình và loa. Gateway có thể cho đầu xe đọc vài tín hiệu như tốc độ. Đường dừng trước quyền ghi lệnh vào ECM, ABS và túi khí.'),
      e('e2', 'Màn hình đứng hình, máy nổ bình thường, vô-lăng trợ lực vẫn nhẹ. Bạn reset cụm nào?', 'Nguồn đầu giải trí hoặc chính đầu máy. Không rút ECM, không xóa học ga. Triệu chứng nằm ở miền tiện nghi.'),
      e('e3', 'Ôn level 7: nội thất và giải trí có làm xe hết mô-men không?', 'Hầu như không. Chúng làm người lái mất thông tin, mất tầm nhìn hoặc mất tiện nghi. Ngoại lệ là khi cùng một mass hoặc cùng một nguồn kéo theo hộp điều khiển. Khi máy vẫn nổ và vẫn kéo, hãy sửa đúng miền cabin.'),
    ],
  ),
}
