/* ===== DỮ LIỆU PHỤ: khu vực trên xe, đèn cảnh báo, so sánh, lộ trình học, quy trình chẩn đoán… ===== */
const ZCAT = { pt: ['Động lực', 'trq'], el: ['Điện – điện tử', 'pwr'], ch: ['Khung gầm', 'mech'], cs: ['Tiện nghi & an toàn', 'cmd'] };
const ZONES = [
  { z: 'engine', n: 'Động cơ', cat: 'pt', sys: 'engine', ic: 'engine' }, { z: 'trans', n: 'Hộp số', cat: 'pt', sys: 'trans', ic: 'gears' },
  { z: 'fueltank', n: 'Bình xăng', cat: 'pt', c: 'tank', ic: 'tank' }, { z: 'fuel', n: 'Hệ thống nhiên liệu', cat: 'pt', sys: 'fuel', ic: 'fuel' },
  { z: 'intake', n: 'Hệ thống nạp khí', cat: 'pt', sys: 'intake', ic: 'wind' }, { z: 'exhaust', n: 'Hệ thống xả', cat: 'pt', sys: 'exhaust', ic: 'exhaust' },
  { z: 'cooling', n: 'Hệ thống làm mát', cat: 'pt', sys: 'cooling', ic: 'thermo' }, { z: 'lube', n: 'Hệ thống bôi trơn', cat: 'pt', sys: 'lube', ic: 'oil' },
  { z: 'ignition', n: 'Hệ thống đánh lửa', cat: 'pt', sys: 'ignition', ic: 'zap' }, { z: 'electrical', n: 'Hệ thống điện', cat: 'el', sys: 'elec', ic: 'wire' },
  { z: 'battery', n: 'Ắc quy', cat: 'el', c: 'battery', ic: 'battery' }, { z: 'alternator', n: 'Máy phát điện', cat: 'el', c: 'alternator', ic: 'zap' },
  { z: 'starter', n: 'Máy đề', cat: 'el', c: 'starter', ic: 'bolt' }, { z: 'ecu', n: 'ECU', cat: 'el', c: 'ecu', ic: 'chip' },
  { z: 'sensors', n: 'Cảm biến', cat: 'el', sys: 'sensors', ic: 'sensor' }, { z: 'brakes', n: 'Hệ thống phanh', cat: 'ch', sys: 'brake', ic: 'disc' },
  { z: 'steering', n: 'Hệ thống lái', cat: 'ch', sys: 'steer', ic: 'steer' }, { z: 'suspension', n: 'Hệ thống treo', cat: 'ch', sys: 'susp', ic: 'spring' },
  { z: 'wheels', n: 'Bánh xe & lốp', cat: 'ch', sys: 'wheels', ic: 'tire' }, { z: 'hvac', n: 'Điều hòa', cat: 'cs', sys: 'hvac', ic: 'snow' },
  { z: 'safety', n: 'An toàn (túi khí, dây đai)', cat: 'cs', sys: 'safety', ic: 'shield' }, { z: 'adas', n: 'ADAS', cat: 'cs', sys: 'adas', ic: 'radar' },
  { z: 'body', n: 'Điện thân xe', cat: 'el', sys: 'body', ic: 'lock' }, { z: 'infotainment', n: 'Màn hình giải trí', cat: 'cs', c: 'infotainment', ic: 'screen' }
];
const ZMAP = Object.fromEntries(ZONES.map((z, i) => [z.z, Object.assign(z, { num: i + 1 })]));

/* ---------- đèn cảnh báo: lv = [ý nghĩa mức xanh/bình thường, mức vàng/chú ý, mức đỏ/dừng] ---------- */
const WL = [
  { id: 'mil', n: 'Đèn Check Engine', en: 'Malfunction Indicator Lamp (MIL)', c: 'y', sys: 'ecu', dx: 'mil',
    lv: ['Sáng ~2 giây khi bật ON rồi tắt khi nổ máy (tự kiểm tra bóng).', 'Sáng liên tục khi chạy: ECU đã lưu lỗi động cơ/khí thải – kiểm tra sớm.', 'NHẤP NHÁY: bỏ máy nặng – giảm tốc, tránh tải nặng, kiểm tra ngay.'],
    mean: 'ECU động cơ phát hiện một lỗi ảnh hưởng tới vận hành hoặc khí thải và đã lưu mã lỗi OBD-II.', why: ['Nắp bình xăng lỏng', 'Cảm biến O2, MAF hỏng', 'Bugi/bô-bin gây bỏ máy', 'Bầu xúc tác kém'],
    drive: 1, dtext: 'Sáng liên tục: chạy nhẹ nhàng, đi kiểm tra trong vài ngày. Nhấp nháy: hạn chế chạy, đi kiểm tra ngay.', chk: ['Vặn chặt nắp bình xăng', 'Đọc mã OBD-II', 'Để ý xe có rung, yếu bất thường không'] },
  { id: 'oil', n: 'Đèn áp suất dầu', en: 'Oil Pressure Warning', c: 'r', sys: 'lube', dx: 'oilwarn',
    lv: ['Sáng khi bật ON, tắt ngay khi nổ máy.', 'Một số xe có đèn vàng báo mức dầu thấp – châm dầu sớm.', 'ĐỎ khi đang chạy: mất áp suất dầu – DỪNG XE, TẮT MÁY NGAY.'],
    mean: 'Áp suất dầu bôi trơn trong động cơ quá thấp.', why: ['Thiếu dầu', 'Bơm dầu yếu', 'Cảm biến áp suất hỏng'], drive: 2, dtext: 'Không chạy tiếp. Tắt máy ngay để tránh bó máy.', chk: ['Kiểm tra que thăm dầu', 'Tìm rò rỉ', 'Gọi cứu hộ nếu đèn vẫn sáng'] },
  { id: 'bat', n: 'Đèn ắc quy (sạc)', en: 'Charging System Warning', c: 'r', sys: 'startcharge', dx: 'battery',
    lv: ['Sáng khi bật ON, tắt khi nổ máy.', 'Chớp tắt khi chạy: sạc chập chờn (dây curoa trượt).', 'Sáng liên tục khi chạy: máy phát KHÔNG sạc – xe đang chạy bằng điện ắc quy.'],
    mean: 'Hệ thống sạc không cấp đủ điện áp; xe đang dùng điện dự trữ của ắc quy.', why: ['Đứt/trượt dây curoa', 'Máy phát hỏng', 'Dây sạc, cầu chì'], drive: 1,
    dtext: 'Tắt bớt tải điện (điều hòa, đèn không cần thiết) và đi thẳng tới gara gần nhất – xe có thể chết máy khi ắc quy cạn.', chk: ['Kiểm tra dây curoa', 'Đo điện áp sạc', 'Đừng tắt máy giữa đường nếu ắc quy đã yếu'] },
  { id: 'temp', n: 'Đèn nhiệt độ nước', en: 'Coolant Temperature Warning', c: 'r', sys: 'cooling', dx: 'tempwarn',
    lv: ['Màu XANH khi mới nổ: máy còn lạnh, tự tắt khi ấm.', 'Kim nhiệt độ cao hơn bình thường: theo dõi, giảm tải, tắt điều hòa.', 'ĐỎ: động cơ quá nhiệt – dừng xe, tắt máy.'],
    mean: 'Nhiệt độ nước làm mát vượt mức an toàn.', why: ['Thiếu nước làm mát', 'Quạt két nước không chạy', 'Van hằng nhiệt kẹt', 'Bơm nước hỏng'], drive: 2,
    dtext: 'Dừng xe an toàn, tắt máy. Không mở nắp két khi còn nóng.', chk: ['Chờ máy nguội, kiểm tra nước', 'Kiểm tra quạt', 'Tìm rò rỉ'] },
  { id: 'abs', n: 'Đèn ABS', en: 'Anti-lock Brake System', c: 'y', sys: 'brake', dx: 'abs',
    lv: ['Sáng vài giây khi bật ON rồi tắt.', 'Sáng liên tục: ABS tắt do lỗi, phanh thường vẫn hoạt động.', 'ABS + đèn PHANH đỏ cùng sáng: lỗi phân phối lực phanh – kiểm tra ngay.'],
    mean: 'Hệ thống chống bó cứng phanh đang tắt do lỗi.', why: ['Cảm biến tốc độ bánh', 'Dây cảm biến đứt', 'Cầu chì ABS'], drive: 1,
    dtext: 'Chạy được, phanh nhẹ nhàng và giữ khoảng cách – khi phanh gấp bánh có thể bị bó.', chk: ['Kiểm tra mức dầu phanh', 'Đọc mã ABS'] },
  { id: 'srs', n: 'Đèn túi khí (SRS)', en: 'Airbag / SRS Warning', c: 'r', sys: 'safety', dx: null,
    lv: ['Sáng ~6 giây khi bật ON rồi tắt (tự kiểm tra).', 'Không có mức vàng – đèn này chỉ có “tắt” hoặc “lỗi”.', 'Sáng liên tục: túi khí lỗi – có thể KHÔNG bung khi va chạm.'],
    mean: 'Hệ thống túi khí và căng đai đang có lỗi.', why: ['Giắc dưới ghế lỏng', 'Cáp xoắn vô-lăng', 'Cảm biến va chạm'], drive: 1,
    dtext: 'Xe vẫn chạy được nhưng bạn đang mất một lớp bảo vệ quan trọng – sửa sớm.', chk: ['Đọc mã SRS bằng máy chẩn đoán', 'Không tự tháo túi khí'] },
  { id: 'esc', n: 'Đèn cân bằng ESC/ESP', en: 'Stability Control', c: 'y', sys: 'brake', dx: null,
    lv: ['Sáng khi bật ON rồi tắt.', 'NHÁY khi chạy đường trơn: ESC đang can thiệp – bình thường, hãy lái nhẹ nhàng.', 'Sáng liên tục: ESC bị tắt (nút OFF) hoặc có lỗi.'],
    mean: 'Hệ thống cân bằng điện tử đang can thiệp (nháy) hoặc đã tắt/lỗi (sáng liên tục).', why: ['Đường trơn (bình thường)', 'Cảm biến góc lái chưa hiệu chỉnh', 'Lỗi cảm biến bánh'], drive: 1,
    dtext: 'Đèn nháy: giảm ga, lái nhẹ. Sáng liên tục: chạy cẩn thận, đi kiểm tra.', chk: ['Kiểm tra nút ESC OFF', 'Đọc mã ABS/ESC'] },
  { id: 'tpms', n: 'Đèn áp suất lốp (TPMS)', en: 'Tire Pressure Monitoring', c: 'y', sys: 'wheels', dx: 'pull',
    lv: ['Sáng khi bật ON rồi tắt.', 'Sáng liên tục: ít nhất một lốp non – kiểm tra áp suất.', 'Nháy ~1 phút rồi sáng: lỗi hệ thống TPMS.'],
    mean: 'Một hoặc nhiều lốp có áp suất thấp hơn mức an toàn.', why: ['Lốp non, thủng', 'Trời lạnh làm áp suất giảm', 'Chưa khởi tạo sau khi bơm/đảo lốp'], drive: 1,
    dtext: 'Giảm tốc, kiểm tra lốp sớm nhất có thể. Lốp non nặng: dừng xe, thay lốp dự phòng.', chk: ['Đo áp suất 4 lốp', 'Khởi tạo lại TPMS'] },
  { id: 'brake', n: 'Đèn hệ thống phanh', en: 'Brake System Warning', c: 'r', sys: 'brake', dx: 'weakbrake',
    lv: ['Sáng khi kéo phanh tay (bình thường).', 'Không có mức vàng.', 'Sáng khi đã nhả phanh tay: thiếu dầu phanh hoặc lỗi phanh – kiểm tra ngay.'],
    mean: 'Phanh tay đang kéo, hoặc mức dầu phanh thấp / lỗi hệ thống phanh.', why: ['Phanh tay chưa nhả', 'Thiếu dầu phanh (má mòn, rò rỉ)', 'Lỗi EBD'], drive: 2,
    dtext: 'Nếu đã nhả phanh tay mà đèn vẫn sáng: dừng xe kiểm tra dầu phanh, không chạy nếu bàn đạp lún.', chk: ['Nhả hết phanh tay', 'Kiểm tra mức dầu phanh'] },
  { id: 'tcs', n: 'Đèn kiểm soát lực kéo', en: 'Traction Control (TCS)', c: 'y', sys: 'safety', dx: null,
    lv: ['Sáng khi bật ON rồi tắt.', 'NHÁY khi tăng tốc trên đường trơn: TCS đang chống trượt – bình thường.', 'Sáng liên tục: TCS bị tắt hoặc lỗi.'],
    mean: 'Hệ thống chống trượt bánh khi tăng tốc đang can thiệp hoặc đã tắt.', why: ['Đường trơn', 'Đã bấm TCS OFF', 'Lỗi cảm biến bánh'], drive: 0,
    dtext: 'Đèn nháy: nhả bớt ga. Sáng liên tục: xe vẫn chạy được, cẩn thận đường trơn.', chk: ['Kiểm tra nút TCS OFF', 'Đọc mã nếu sáng liên tục'] },
  { id: 'eps', n: 'Đèn trợ lực lái', en: 'Power Steering (EPS)', c: 'y', sys: 'steer', dx: 'heavysteer',
    lv: ['Sáng khi bật ON rồi tắt.', 'Không có mức vàng riêng (tùy xe).', 'Sáng khi chạy: trợ lực lái lỗi – vô-lăng có thể rất nặng.'],
    mean: 'Hệ thống trợ lực lái điện có lỗi.', why: ['Điện áp thấp', 'Lỗi cảm biến mô-men', 'Mất tín hiệu tốc độ'], drive: 1,
    dtext: 'Lái được nhưng nặng – chạy chậm, cẩn thận khi đánh lái gấp.', chk: ['Tắt máy rồi bật lại', 'Đọc mã EPS'] },
  { id: 'fuel', n: 'Đèn báo xăng thấp', en: 'Low Fuel', c: 'y', sys: 'fuel', dx: null,
    lv: ['Tắt: còn đủ xăng.', 'Sáng: còn khoảng 5–8 lít (tùy xe) – đổ xăng sớm.', 'Không có mức đỏ.'],
    mean: 'Xăng trong bình sắp hết.', why: ['Mức xăng thấp'], drive: 0, dtext: 'Đổ xăng sớm. Thường xuyên chạy cạn xăng làm bơm xăng mau hỏng.', chk: ['Đổ xăng'] }
];

/* ---------- so sánh ---------- */
const CMP = [
  { id: 'maf-map', t: 'MAF vs MAP', cols: [['MAF', 'Mass Air Flow'], ['MAP', 'Manifold Absolute Pressure']], links: ['maf', 'map'],
    rows: [['Đo gì?', 'Khối lượng không khí đi qua (g/s)', 'Áp suất tuyệt đối trong cổ hút (kPa)'], ['Vị trí', 'Sau lọc gió, trước bướm ga', 'Trên cổ hút (sau bướm ga)'], ['Nguyên lý', 'Dây/màng nhiệt bị gió làm nguội', 'Màng silicon áp điện trở uốn theo áp suất'],
      ['ECU dùng để', 'Tính trực tiếp lượng khí → lượng xăng', 'Tính tải; tính khí nạp gián tiếp (speed-density)'], ['Không tải', 'Thấp (~2–5 g/s)', 'Thấp (~25–40 kPa – chân không cao)'], ['Hỏng thường gặp', 'Bụi, dầu bám; rò khí sau cảm biến', 'Ống chân không nứt; cảm biến hỏng'], ['Triệu chứng', 'Hụt ga, rung, chết máy, P0101–P0103', 'Rung không tải, hao xăng, P0105–P0108']],
    memo: 'MAF “đếm” gió đi vào; MAP “cảm nhận” độ hút trong cổ hút. Nhiều xe có cả hai.' },
  { id: 'o2-af', t: 'Cảm biến O2 vs A/F', cols: [['O2 dải hẹp', 'Narrowband'], ['A/F dải rộng', 'Wideband']], links: ['o2', 'af'],
    rows: [['Cho biết', 'Chỉ biết giàu hay nghèo', 'Biết chính xác giàu/nghèo bao nhiêu (λ)'], ['Tín hiệu', 'Điện áp 0,1–0,9 V, đảo nhanh', 'Dòng điện (quy đổi λ) gần như tuyến tính'], ['Vị trí điển hình', 'Sau xúc tác (và trước xúc tác ở xe cũ)', 'Trước xúc tác ở xe đời mới'],
      ['Điều khiển', 'Dao động quanh λ = 1', 'Nhanh và chính xác hơn'], ['Kiểm tra', 'Dạng sóng phải đảo chiều nhiều lần mỗi giây', 'Xem λ/dòng A/F trên data list']],
    memo: 'O2 như đèn giao thông chỉ có 2 màu; A/F như đồng hồ có kim chỉ chính xác.' },
  { id: 'at-cvt-dct', t: 'AT vs CVT vs DCT', cols: [['AT', 'Số tự động'], ['CVT', 'Vô cấp'], ['DCT', 'Ly hợp kép']], links: ['planetary', 'cvtpulley', 'dualclutch'], go: '/s/trans',
    rows: [['Cách đổi tỉ số', 'Bánh răng hành tinh + ly hợp thủy lực', 'Hai puli đổi đường kính + đai thép', 'Hai ly hợp, hai trục số lẻ/chẵn'], ['Cảm giác lái', 'Có cú chuyển số êm', 'Mượt, không có cú chuyển số', 'Chuyển số rất nhanh, thể thao'],
      ['Tiết kiệm', 'Tốt (đời mới 6–10 cấp)', 'Rất tốt ở tải nhẹ, đô thị', 'Rất tốt'], ['Điểm yếu', 'Nặng, phức tạp', 'Giới hạn mô-men; nhạy với dầu & cách lái', 'Có thể giật khi bò chậm (loại khô)'],
      ['Bảo dưỡng', 'Thay ATF theo hạn', 'Dầu CVT riêng, học lại sau thay', 'Dầu/ly hợp, học lại điểm tiếp xúc'], ['Thường gặp ở', 'Xe phổ thông đến cao cấp', 'Xe nhỏ đô thị (City, Vios…)', 'Xe châu Âu, xe thể thao']],
    memo: 'Cả ba đều tự đổi tỉ số; khác nhau ở cơ chế và cảm giác lái. Số sàn (MT) là gốc của tất cả.' },
  { id: 'fwd-rwd-awd', t: 'FWD vs RWD vs AWD', cols: [['FWD', 'Cầu trước'], ['RWD', 'Cầu sau'], ['AWD', '4 bánh toàn thời gian']], links: ['axle', 'propshaft', 'transfer'], go: '/s/drive',
    rows: [['Bánh kéo', '2 bánh trước', '2 bánh sau', 'Cả 4 bánh (tự chia lực)'], ['Ưu điểm', 'Rẻ, gọn, tiết kiệm, rộng cabin', 'Cân bằng, lái thể thao, kéo tải tốt', 'Bám đường tốt khi trơn'],
      ['Nhược điểm', 'Dễ trượt đầu khi vào cua gấp', 'Dễ trượt đuôi trên đường trơn', 'Nặng, tốn xăng hơn, đắt'], ['Bộ phận đặc trưng', 'Bán trục (láp) + khớp CV', 'Trục các-đăng + cầu sau', 'Khớp nối trung tâm / hộp số phụ'], ['Thường gặp ở', 'Sedan, hatchback phổ thông', 'Xe thể thao, bán tải, sedan hạng sang', 'SUV, crossover']],
    memo: 'FWD “kéo” xe đi, RWD “đẩy” xe đi, AWD dùng cả bốn bánh.' },
  { id: 'hps-eps', t: 'Trợ lực dầu vs trợ lực điện', cols: [['HPS', 'Trợ lực dầu'], ['EPS', 'Trợ lực điện']], links: ['hps', 'eps'], go: '/s/steer',
    rows: [['Nguồn trợ lực', 'Bơm dầu quay theo động cơ', 'Mô-tơ điện'], ['Tiêu hao năng lượng', 'Bơm chạy liên tục → tốn xăng hơn', 'Chỉ làm việc khi đánh lái'], ['Cảm giác lái', 'Tự nhiên, “đầm”', 'Nhẹ, thay đổi theo tốc độ'],
      ['Bảo dưỡng', 'Dầu trợ lực, dây curoa, ống dầu', 'Gần như không cần'], ['Tính năng ADAS', 'Khó tích hợp', 'Dễ tích hợp giữ làn, đỗ xe tự động'], ['Lỗi thường gặp', 'Rò dầu, bơm rên', 'Lỗi điện, cảm biến mô-men, đèn EPS']],
    memo: 'EPS tiết kiệm và là “cánh tay” cho ADAS; HPS cho cảm giác lái tự nhiên nhưng tốn năng lượng.' },
  { id: 'na-turbo', t: 'Hút khí tự nhiên vs Turbo', cols: [['NA', 'Hút khí tự nhiên'], ['Turbo', 'Tăng áp']], links: ['manifold', 'exman'],
    rows: [['Cách nạp khí', 'Piston tự hút ở áp suất khí quyển', 'Tuabin dùng khí xả quay máy nén, ép thêm khí vào'], ['Công suất / mô-men', 'Vừa phải, tăng đều theo vòng tua', 'Cao hơn ở cùng dung tích; mô-men lớn ở vòng tua thấp'],
      ['Độ trễ', 'Phản hồi tức thì', 'Có thể có độ trễ turbo (turbo lag)'], ['Độ phức tạp', 'Đơn giản, bền', 'Thêm turbo, két làm mát khí nạp, van xả áp'], ['Bảo dưỡng', 'Bình thường', 'Dầu tốt, đúng hạn; để máy nổ chậm chút trước khi tắt sau khi chạy mạnh'], ['Ví dụ', 'Honda City 1.5 (L15)', 'Động cơ 1.0–1.5 turbo đời mới']],
    memo: 'Turbo “ép” thêm không khí để đốt thêm xăng – máy nhỏ mà khỏe, đổi lại phức tạp hơn.' }
];

/* ---------- học nhanh ở trang chủ ---------- */
const QUICK = [
  { q: 'Vì sao động cơ cần tia lửa?', a: 'Hỗn hợp xăng – không khí không tự cháy ở nhiệt độ thường. Bugi phóng tia lửa hàng chục nghìn vôn đúng lúc piston nén hỗn hợp, châm ngòi cho sự cháy đẩy piston xuống.', go: '/s/ignition', ic: 'zap' },
  { q: 'Phun xăng điện tử hoạt động thế nào?', a: 'ECU đo lượng không khí đi vào (MAF/MAP), tính lượng xăng để đạt tỉ lệ ~14,7 : 1, rồi mở kim phun trong vài mili-giây. Cảm biến O2 báo kết quả cháy để ECU tự chỉnh liên tục.', go: '/s/fuel', ic: 'injector' },
  { q: 'Vì sao động cơ bị quá nóng?', a: 'Nhiệt từ buồng đốt không được mang đi kịp: thiếu nước làm mát, quạt không chạy, van hằng nhiệt kẹt đóng, bơm nước hỏng hoặc két nước tắc.', go: '/s/cooling', ic: 'thermo' },
  { q: 'ECU làm gì?', a: 'ECU là bộ não của động cơ: đọc hàng chục cảm biến, tính theo bản đồ đã lập trình rồi ra lệnh cho kim phun, bô-bin, bướm ga, quạt… hàng trăm lần mỗi giây.', go: '/s/ecu', ic: 'chip' },
  { q: 'Điều gì xảy ra khi cảm biến MAF hỏng?', a: 'ECU không biết chính xác lượng gió vào nên phun sai lượng xăng: xe hụt ga, rung, có thể chết máy, hao xăng và đèn Check Engine sáng (P0101–P0103).', go: '/c/maf', ic: 'sensor' }
];

/* ---------- lộ trình học: 4 cấp → chương → bài (s: hệ thống, c: bộ phận, x: bài đặc biệt) ---------- */
const PATH = [
  { lv: 1, n: 'Người mới bắt đầu', en: 'Beginner', d: 'Hiểu chiếc xe hoạt động thế nào và các hệ thống cơ bản.', ch: [
    { id: 'l1-ov', n: 'Tổng quan xe xăng', ic: 'car', ls: ['s:overview'] },
    { id: 'l1-eng', n: 'Động cơ', ic: 'engine', ls: ['s:engine', 'c:cylinder', 'c:piston', 'c:conrod', 'c:crankshaft', 'c:camshaft', 'c:valvein', 'c:valveex', 'c:sparkplug', 'c:timing', 'c:head', 'c:block', 'c:oilpan', 'c:flywheel'] },
    { id: 'l1-4k', n: 'Chu trình 4 kỳ', ic: 'replay', ls: ['x:4stroke'] },
    { id: 'l1-fuel', n: 'Nhiên liệu', ic: 'fuel', ls: ['s:fuel', 'c:tank', 'c:fpump', 'c:ffilter', 'c:fpr', 'c:rail', 'c:evap', 'c:canister'] },
    { id: 'l1-air', n: 'Không khí (nạp khí)', ic: 'wind', ls: ['s:intake', 'c:airfilter', 'c:maf', 'c:map', 'c:throttle', 'c:manifold', 'c:pcv', 'c:egr'] },
    { id: 'l1-elec', n: 'Điện cơ bản', ic: 'zap', ls: ['s:elec', 'c:battery', 'c:fuse', 'c:relay', 'c:ground', 'c:harness'] }] },
  { lv: 2, n: 'Trung cấp', en: 'Intermediate', d: 'Hiểu ECU, cảm biến và từng hệ thống chính của xe.', ch: [
    { id: 'l2-ecu', n: 'ECU & quản lý động cơ', ic: 'chip', ls: ['s:ecu', 'c:ecu', 'c:vvt'] },
    { id: 'l2-sens', n: 'Cảm biến', ic: 'sensor', ls: ['s:sensors', 'c:tps', 'c:app', 'c:ect', 'c:iat', 'c:o2', 'c:ckp', 'c:cmp', 'c:vss', 'c:wss'] },
    { id: 'l2-inj', n: 'Phun xăng & đánh lửa', ic: 'injector', ls: ['s:ignition', 'c:injector', 'c:coil'] },
    { id: 'l2-cool', n: 'Làm mát', ic: 'thermo', ls: ['s:cooling', 'c:radiator', 'c:wpump', 'c:thermostat', 'c:fan', 'c:exptank', 'c:hoses', 'c:coolant'] },
    { id: 'l2-lube', n: 'Bôi trơn', ic: 'oil', ls: ['s:lube', 'c:oil', 'c:oilpump', 'c:oilfilter', 'c:oilpsw', 'c:bearings', 'c:gallery'] },
    { id: 'l2-trans', n: 'Hộp số & dẫn động', ic: 'gears', ls: ['s:trans', 'c:clutch', 'c:mtbox', 'c:synchro', 'c:diff', 'c:tconv', 'c:planetary', 'c:valvebody', 'c:atf', 'c:tcm', 'c:cvtpulley', 'c:cvtbelt', 'c:cvthyd', 'c:dualclutch', 'c:mechatronics', 's:drive', 'c:axle', 'c:propshaft', 'c:transfer'] },
    { id: 'l2-start', n: 'Khởi động & sạc', ic: 'battery', ls: ['s:startcharge', 'c:starter', 'c:strelay', 'c:alternator', 'c:rectifier'] },
    { id: 'l2-chassis', n: 'Khung gầm: phanh, lái, treo, lốp', ic: 'disc', ls: ['s:brake', 'c:bpedal', 'c:booster', 'c:master', 'c:bfluid', 'c:caliper', 'c:disc', 'c:pad', 'c:abs', 'c:ebd', 'c:esc', 's:steer', 'c:swheel', 'c:column', 'c:eps', 'c:rack', 'c:tierod', 'c:sas', 'c:hps',
      's:susp', 'c:shock', 'c:spring', 'c:strut', 'c:carm', 'c:stab', 'c:balljoint', 'c:bush', 'c:hub', 'c:wbearing', 's:wheels', 'c:tire', 'c:rim', 'c:tpms', 'c:alignment'] }] },
  { lv: 3, n: 'Nâng cao', en: 'Advanced', d: 'Mạng CAN, OBD-II, khí thải và các hệ thống điện tử của xe.', ch: [
    { id: 'l3-can', n: 'Mạng CAN & giao tiếp ECU', ic: 'network', ls: ['c:canbus', 'c:bcm'] },
    { id: 'l3-obd', n: 'OBD-II & giắc chẩn đoán', ic: 'obd', ls: ['x:obd'] },
    { id: 'l3-ctrl', n: 'Cảm biến & điều khiển nâng cao', ic: 'pulse', ls: ['c:af', 'c:knock'] },
    { id: 'l3-emis', n: 'Khí xả & khí thải', ic: 'exhaust', ls: ['s:exhaust', 'c:exman', 'c:cat', 'c:muffler', 'c:resonator'] },
    { id: 'l3-hvac', n: 'Điều hòa không khí', ic: 'snow', ls: ['s:hvac', 'c:compressor', 'c:condenser', 'c:drier', 'c:expvalve', 'c:evaporator', 'c:blower', 'c:cabinfilter', 'c:hvacctl'] },
    { id: 'l3-safety', n: 'An toàn & ADAS', ic: 'shield', ls: ['s:safety', 'c:airbag', 'c:seatbelt', 'c:srsecu', 'c:crashsensor', 'c:tcs', 's:adas', 'c:acc', 'c:lka', 'c:ldw', 'c:fcw', 'c:aeb', 'c:bsm', 'c:rcta', 'c:parksensor', 'c:camera', 'c:radar'] },
    { id: 'l3-body', n: 'Điện thân xe', ic: 'lock', ls: ['s:body', 'c:centrallock', 'c:pwindow', 'c:pmirror', 'c:lighting', 'c:wiper', 'c:horn', 'c:keyless', 'c:pushstart', 'c:immo', 'c:alarm', 'c:infotainment'] }] },
  { lv: 4, n: 'Chẩn đoán', en: 'Troubleshooting', d: 'Triệu chứng → mã lỗi → nguyên nhân gốc → kiểm tra → sửa chữa.', ch: [
    { id: 'l4-sym', n: 'Triệu chứng → nguyên nhân', ic: 'wrench', ls: ['x:diag'] },
    { id: 'l4-dtc', n: 'Mã lỗi DTC', ic: 'obd', ls: ['x:dtc'] },
    { id: 'l4-lights', n: 'Đèn cảnh báo', ic: 'alert', ls: ['x:lights'] },
    { id: 'l4-flow', n: 'Quy trình & tư duy chẩn đoán', ic: 'route', ls: ['x:workflow'] },
    { id: 'l4-lab', n: 'Phòng lab Honda City 2024', ic: 'flask', ls: ['x:lab'] }] }
];
const XLESSON = { '4stroke': ['Chu trình 4 kỳ', '/s/engine', 'replay'], obd: ['OBD-II & giắc chẩn đoán', '/obd', 'obd'], dtc: ['Thư viện mã lỗi DTC', '/dtc', 'obd'],
  diag: ['Trung tâm chẩn đoán', '/diag', 'wrench'], lights: ['Đèn cảnh báo trên táp-lô', '/lights', 'alert'], workflow: ['Quy trình & tư duy chẩn đoán', '/workflow', 'route'], lab: ['Phòng lab Honda City 2024', '/lab', 'flask'] };
const JOURNEY = [
  { t: 'Tôi chưa biết gì', ls: [] }, { t: 'Tôi hiểu xe xăng hoạt động thế nào', ls: ['s:overview'] }, { t: 'Tôi hiểu động cơ', ls: ['s:engine', 'x:4stroke'] },
  { t: 'Tôi hiểu từng hệ thống', ls: ['s:fuel', 's:intake', 's:ignition', 's:cooling', 's:lube', 's:exhaust', 's:trans', 's:brake', 's:steer', 's:susp', 's:wheels', 's:hvac'] },
  { t: 'Tôi hiểu ECU + cảm biến + cơ cấu chấp hành', ls: ['s:ecu', 's:sensors'] }, { t: 'Tôi hiểu cách các hệ thống giao tiếp', ls: ['s:elec', 'c:canbus', 'c:bcm'] },
  { t: 'Tôi hiểu các triệu chứng hư hỏng', ls: ['x:diag', 'x:lights'] }, { t: 'Tôi biết đọc mã lỗi DTC', ls: ['x:obd', 'x:dtc'] }, { t: 'Tôi biết tư duy chẩn đoán lỗi', ls: ['x:workflow'] }, { t: 'Tôi có thể tự học sâu từng bộ phận', ls: ['x:lab'] }
];

/* ---------- quy trình & tư duy chẩn đoán ---------- */
const WORKFLOW2 = [
  ['Lắng nghe & xác nhận triệu chứng', 'Khi nào? Máy nóng hay nguội? Ở tốc độ nào? Có tái hiện được không? Hỏi kỹ người lái.', 'user'],
  ['Kiểm tra cơ bản', 'Ắc quy, cầu chì, mức dầu, nước làm mát, lốp, giắc lỏng – những thứ rẻ và nhanh.', 'checkc'],
  ['Đọc mã lỗi & freeze frame', 'Máy chẩn đoán OBD-II: ghi lại mã, trạng thái mã và điều kiện lúc lỗi xảy ra.', 'obd'],
  ['Phân tích dữ liệu trực tiếp', 'So data list với giá trị chuẩn; chạy thử chức năng (active test).', 'pulse'],
  ['Đo kiểm mạch & linh kiện', 'Nguồn, mass, tín hiệu, sụt áp, dạng sóng – chứng minh chi tiết hỏng.', 'gauge'],
  ['Tìm nguyên nhân gốc', 'Vì sao nó hỏng? (bugi hỏng vì dầu lọt vào; bầu xúc tác hỏng vì bỏ máy lâu ngày…)', 'target'],
  ['Sửa chữa & cài đặt', 'Sửa đúng nguyên nhân; học lại/hiệu chỉnh sau khi thay nếu hãng yêu cầu.', 'wrench'],
  ['Xác nhận & bàn giao', 'Xóa mã, chạy thử trong đúng điều kiện cũ, kiểm tra mã không quay lại.', 'check']
];
const PRINCIPLES = [
  ['Từ dễ đến khó, từ rẻ đến đắt', 'Kiểm tra cầu chì trước khi nghi ECU; vặn nắp bình xăng trước khi thay bầu xúc tác.'],
  ['Mã lỗi chỉ hướng, không kết luận', 'P0171 không có nghĩa là “thay cảm biến O2” – nó chỉ nói hỗn hợp nghèo. Phải tìm vì sao.'],
  ['Chứng minh trước khi thay', 'Đo, so sánh, hoán đổi để chắc chắn chi tiết hỏng – tránh “thay thử”.'],
  ['Nguồn & mass trước, cảm biến sau', 'Rất nhiều lỗi “ma” do ắc quy yếu, mass gỉ, giắc ẩm.'],
  ['Mỗi lần chỉ thay đổi một thứ', 'Sửa từng thứ một rồi thử lại, để biết chính xác cái gì đã giải quyết lỗi.'],
  ['Luôn tìm nguyên nhân gốc', 'Sửa triệu chứng mà bỏ qua nguyên nhân thì lỗi sẽ quay lại.']
];
const TOOLS2 = [['Máy đọc mã OBD-II', 'Đọc/xóa mã, xem dữ liệu trực tiếp, freeze frame, readiness.', 'obd'], ['Đồng hồ vạn năng (VOM)', 'Đo điện áp, điện trở, thông mạch, sụt áp.', 'gauge'],
  ['Đèn thử / bút thử', 'Kiểm tra nhanh có điện, có mass.', 'bulb'], ['Máy test ắc quy', 'Đo CCA, tình trạng ắc quy và hệ thống sạc.', 'battery'], ['Oscilloscope', 'Xem dạng sóng cảm biến CKP/CMP, kim phun, CAN.', 'pulse'],
  ['Đồng hồ áp suất', 'Áp suất xăng, áp suất nén, áp suất dầu.', 'gauge'], ['Máy tạo khói', 'Tìm rò chân không, rò hệ thống EVAP.', 'smoke'], ['Nhiệt kế hồng ngoại', 'So nhiệt độ thực tế với số đọc của cảm biến.', 'thermo']];

/* ---------- cấu trúc mã DTC ---------- */
const DTC_L1 = { P: 'Động cơ & hộp số (Powertrain)', C: 'Khung gầm (Chassis): phanh, lái, treo', B: 'Thân xe (Body): túi khí, điều hòa, đèn…', U: 'Mạng giao tiếp (Network)' };
const DTC_L2 = { 0: 'Mã chung SAE – mọi hãng giống nhau', 1: 'Mã riêng của hãng xe', 2: 'Mã chung SAE (mở rộng)', 3: 'Mã chung hoặc riêng hãng (tùy dải)' };
const DTC_L3P = { 0: 'Nhiên liệu, khí nạp & khí thải phụ', 1: 'Đo nhiên liệu & khí nạp', 2: 'Nhiên liệu & khí nạp (mạch kim phun)', 3: 'Hệ thống đánh lửa / bỏ máy', 4: 'Kiểm soát khí thải phụ (EGR, EVAP, xúc tác)',
  5: 'Tốc độ xe, không tải & tín hiệu vào', 6: 'ECU & mạch ra', 7: 'Hộp số', 8: 'Hộp số', 9: 'Hộp số / module', A: 'Hybrid', B: 'Hybrid', C: 'Hybrid' };

/* ---------- mạng CAN, ADAS, va chạm, mã lốp ---------- */
const CANMODS = [['ecu', 'ECU động cơ', 'chip'], ['tcm', 'TCM hộp số', 'gears'], ['abs', 'ABS / ESC', 'disc'], ['eps', 'EPS trợ lực lái', 'steer'],
  ['bcm', 'BCM thân xe', 'lock'], ['srsecu', 'SRS túi khí', 'airbag'], ['cluster', 'Đồng hồ táp-lô', 'dash'], ['dlc', 'Giắc OBD-II', 'obd']];
const CANMSG = [['abs', 'Tốc độ 4 bánh'], ['ecu', 'Vòng tua · nhiệt độ'], ['tcm', 'Số đang chạy'], ['bcm', 'Cửa mở · đèn'], ['srsecu', 'Trạng thái túi khí'], ['eps', 'Mô-men lái']];
const ADASF = [
  { id: 'acc', n: 'ACC', s: ['radar', 'camera'], a: ['lead'], d: 'Giữ tốc độ đã đặt và tự giữ khoảng cách với xe phía trước.' },
  { id: 'fcw', n: 'FCW', s: ['radar', 'camera'], a: ['lead'], d: 'Cảnh báo khi xe phía trước phanh gấp hoặc bạn tới quá nhanh.' },
  { id: 'aeb', n: 'AEB', s: ['radar', 'camera'], a: ['lead'], d: 'Tự phanh mạnh khi va chạm sắp xảy ra mà bạn chưa phanh.' },
  { id: 'lka', n: 'LKA', s: ['camera'], a: ['lane'], d: 'Đánh lái nhẹ để giữ xe trong làn.' },
  { id: 'ldw', n: 'LDW', s: ['camera'], a: ['lane'], d: 'Cảnh báo khi xe sắp lấn vạch mà không bật xi-nhan.' },
  { id: 'bsm', n: 'BSM', s: ['bsm'], a: ['side'], d: 'Báo đèn trên gương khi có xe trong điểm mù.' },
  { id: 'rcta', n: 'RCTA', s: ['rcta'], a: ['cross'], d: 'Cảnh báo xe chạy ngang phía sau khi bạn lùi ra.' },
  { id: 'parksensor', n: 'Đỗ xe', s: ['sonar', 'rearcam'], a: ['wall'], d: 'Bíp nhanh dần khi tới gần vật cản; camera lùi hiển thị phía sau.' }
];
const SENSN = { radar: 'Radar trước', camera: 'Camera kính lái', bsm: 'Radar điểm mù', rcta: 'Radar góc sau', sonar: 'Cảm biến siêu âm', rearcam: 'Camera lùi' };
const CRASH = [['0 ms', 'Va chạm bắt đầu – xe giảm tốc đột ngột'], ['~10 ms', 'Cảm biến va chạm & hộp SRS nhận ra va chạm mạnh'], ['~15 ms', 'Hộp SRS quyết định kích nổ căng đai và túi khí'],
  ['~30–50 ms', 'Túi khí bung hoàn toàn, dây đai đã siết chặt'], ['~100 ms+', 'Túi khí xẹp dần để người ngồi không bị dội lại']];
const TIRECODE = [['185', 'Chiều rộng lốp 185 mm'], ['/55', 'Chiều cao thành lốp = 55% chiều rộng (~102 mm)'], ['R', 'Cấu trúc bố tỏa tròn (Radial) – loại phổ biến'], ['16', 'Lắp vừa mâm đường kính 16 inch'],
  ['83', 'Chỉ số tải: 83 = tối đa ~487 kg mỗi lốp'], ['V', 'Chỉ số tốc độ: V = tối đa 240 km/h']];
