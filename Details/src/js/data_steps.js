/* ===== 26 BƯỚC VẬN HÀNH A → Z ===== */
const PHASES = [
  { n: 'CHUẨN BỊ & XÁC THỰC', r: 'A–L' },
  { n: 'KHỞI ĐỘNG', r: 'M–Q' },
  { n: 'VẬN HÀNH', r: 'R–Y' },
  { n: 'TẮT MÁY', r: 'Z' }
];

const V = (rpm, vb, ist, ect, fp, map, thr, pw, adv, lam, loop, ratio, gear, pm) =>
  ({ rpm, vb, ist, ect, fp, map, thr, pw, adv, lam, loop, ratio, gear, pm });

const STEPS = [
{ k:'A', ph:0, t:'Trạng thái ngủ – xe đỗ, cửa khóa',
  d:'Ắc quy cấp B+ thường trực qua cầu chì chính tới hộp cầu chì khoang máy và hộp cầu chì dưới táp-lô, nuôi bộ nhớ PCM, đồng hồ, MICU và bộ Keyless ở chế độ chờ. Mạng F-CAN/B-CAN ngủ, không có bản tin. Động cơ đứng yên, áp suất nhiên liệu dư được giữ trong ống bởi van một chiều của bơm.',
  L:['elec'], v:V(0,12.6,0,30,250,101,0,0,0,null,'—',2.5,'P','OFF'),
  act:['battery','w-bat','mainfuse','w-main','uhbox','w-ud','udbox'],
  can:[],
  sig:['Ắc quy nghỉ: 12,4–12,7 V','Dòng rò sau khi mạng ngủ: < ~50 mA','Bus CAN ngủ: không có lưu lượng'],
  chk:['Hết điện sau khi đỗ lâu → đo dòng rò, rút lần lượt cầu chì để tìm mạch không ngủ','Ắc quy < 12,2 V → sạc và thử tải (CCA)'], dx:'charge' },

{ k:'B', ph:0, t:'Tiếp cận & mở khóa bằng Smart Key',
  d:'Chạm cảm biến tay nắm cửa → bộ Keyless phát sóng tần số thấp LF (thường ~125 kHz, tầm ngắn) qua anten ở tay nắm. Chìa thông minh thức dậy và trả lời bằng sóng RF (UHF) kèm mã nhận dạng mã hóa. Xác thực đúng → Keyless gửi lệnh qua B-CAN tới MICU → MICU cấp điện mô-tơ khóa các cửa (qua dây/LIN), nháy xi-nhan xác nhận.',
  L:['elex','comm','elec'], v:V(0,12.5,0,30,250,101,0,0,0,null,'—',2.5,'P','OFF'),
  act:['key','micu','door','lin','bcan'],
  can:[['key','micu','Lệnh mở khóa'],['micu','door','Mở khóa cửa ×4'],['micu','lamp','Nháy xi-nhan']],
  sig:['LF ~125 kHz: anten → chìa','RF UHF: chìa → bộ thu (tần số tùy thị trường)','Mô-tơ khóa cửa: xung 12 V ngắn'],
  chk:['Không mở được → pin chìa CR2032, cảm biến tay nắm, anten LF','Chỉ một cửa không mở → mô-tơ khóa của cửa đó'], dx:'lock' },

{ k:'C', ph:0, t:'Mở cửa – đánh thức mạng',
  d:'Công tắc cửa báo về MICU: đèn trần sáng, MICU đánh thức B-CAN. Cụm đồng hồ (đóng vai trò gateway F-CAN ↔ B-CAN trong kiến trúc Honda điển hình) thức dậy và đánh thức F-CAN. Các ECU bắt đầu gửi bản tin quản lý mạng (network management); đồng hồ hiển thị chào và cảnh báo cửa mở.',
  L:['comm','elex'], v:V(0,12.45,0,30,250,101,0,0,0,null,'—',2.5,'P','OFF'),
  act:['micu','gw','fcan','bcan','lamp'],
  can:[['micu','gw','Cửa mở – wake-up'],['gw','pcm','NM wake-up'],['micu','lamp','Bật đèn trần'],['gw','vsa','NM wake-up']],
  sig:['Bus nghỉ (recessive): CAN-H ≈ CAN-L ≈ 2,5 V','Khi truyền (dominant): CAN-H ≈ 3,5 V, CAN-L ≈ 1,5 V','Điện trở bus tại DLC chân 6–14: ≈ 60 Ω'],
  chk:['Đồng hồ không sáng hoặc nhiều đèn lỗi → kiểm tra mạng CAN (60 Ω), nguồn và mass các module'], dx:'can' },

{ k:'D', ph:0, t:'Đạp phanh',
  d:'Công tắc vị trí bàn đạp phanh (hai tiếp điểm) gửi tín hiệu tới PCM (điều kiện khởi động, cắt ga khi phanh) và hệ thống Keyless; đèn phanh sáng. Đèn trên nút ENGINE START/STOP đổi màu báo sẵn sàng khởi động.',
  L:['elex','elec'], v:V(0,12.4,0,30,250,101,0,0,0,null,'—',2.5,'P','OFF'),
  act:['brake','s-brake','pcm','btn','key'],
  can:[['pcm','key','Phanh: ON']],
  sig:['Công tắc phanh: 0 V ↔ 12 V (tín hiệu số)','Đèn phanh: 12 V'],
  chk:['Nút START không đổi màu, không đề → công tắc phanh, cầu chì đèn phanh'], dx:'nocrank' },

{ k:'E', ph:0, t:'Nhấn nút ENGINE START/STOP',
  d:'Tín hiệu nút (hai mạch dự phòng) vào bộ Keyless. Keyless kích hoạt các anten LF trong khoang xe để tìm chìa – chìa phải nằm trong xe. Nếu pin chìa yếu, chạm mặt có logo H của chìa vào nút START để xác thực ở chế độ dự phòng.',
  L:['elex','comm'], v:V(0,12.4,0,30,250,101,0,0,0,null,'—',2.5,'P','OFF'),
  act:['btn','s-btn','key'],
  can:[['key','gw','Tìm chìa trong xe']],
  sig:['Nút START: 2 mạch tín hiệu độc lập','Anten LF trong xe: quét vùng cabin'],
  chk:['Báo “không phát hiện chìa” → pin chìa, nhiễu sóng, anten trong xe'], dx:'nocrank' },

{ k:'F', ph:0, t:'Xác thực Immobilizer',
  d:'Bộ Keyless/Immobilizer đọc mã chìa rồi trao đổi mã hóa kiểu thách thức–phản hồi (challenge–response) với PCM qua mạng (đi qua gateway). Đúng mã → PCM cho phép phun nhiên liệu và đánh lửa, đèn immobilizer tắt. Sai mã → PCM cấm phun/đánh lửa: đề vẫn quay nhưng máy không nổ.',
  L:['elex','comm'], v:V(0,12.4,0,30,250,101,0,0,0,null,'—',2.5,'P','OFF'),
  act:['key','pcm','gw','fcan','bcan'],
  can:[['key','pcm','Immo: challenge'],['pcm','key','Immo: response OK'],['pcm','gw','Immo hợp lệ']],
  sig:['Mã chìa mã hóa, thay đổi mỗi lần','Đèn IMMO nháy = bị từ chối'],
  chk:['Đèn chìa nháy, máy không nổ → chìa chưa đăng ký, lỗi Keyless/PCM → đọc bằng HDS'], dx:'nostart' },

{ k:'G', ph:0, t:'Bật nguồn ACC → ON (IG1/IG2)',
  d:'Keyless ra lệnh, hộp cầu chì dưới táp-lô (tích hợp MICU) đóng lần lượt rơ-le ACC, IG1, IG2. IG1 cấp cho PCM, đồng hồ và các ECU; IG2 cấp cho tải lớn (quạt gió, sấy kính…). Cụm đồng hồ bật sáng, bắt đầu kiểm tra đèn.',
  L:['elec','elex','comm'], v:V(0,12.2,0,30,250,101,0,0,0,null,'—',2.5,'P','ON'),
  act:['udbox','r-acc','r-ig1','r-ig2','w-ig1','micu','key','audio'],
  can:[['key','micu','Power mode: ON'],['micu','gw','Power mode: ON'],['micu','audio','ACC ON']],
  sig:['IG1/IG2 ≈ điện áp ắc quy','Sụt áp qua mỗi cầu chì < ~0,1 V'],
  chk:['Không lên nguồn ON → rơ-le IG, cầu chì, Keyless/MICU'], dx:'nocrank' },

{ k:'H', ph:0, t:'PCM khởi động & đọc cảm biến',
  d:'PCM nhận IG1 → đóng rơ-le PGM-FI Main 1 để tự cấp nguồn chính. Vi xử lý tự kiểm tra bộ nhớ, cấp điện áp tham chiếu 5 V và mass cho cảm biến, rồi đọc giá trị ban đầu: ECT, IAT, MAP (bằng áp suất khí quyển khi máy chưa chạy), TP, APP, điện áp ắc quy và vị trí cần số.',
  L:['elex','elec','comm'], v:V(0,12.2,0,30,250,101,0,0,0,null,'—',2.5,'P','ON'),
  act:['pcm','r-main1','w-m1','s-ect','s-iat','s-map','s-tp','s-app','s-range','ect','iat','map','tb','app','range'],
  can:[['pcm','gw','ECT, điện áp, PCM sẵn sàng'],['pcm','vsa','PCM ready']],
  sig:['Tham chiếu 5,0 V ± 0,1 V','Mass cảm biến < 0,1 V','MAP (máy chưa chạy) ≈ 100 kPa','ECT ≈ IAT ≈ nhiệt độ môi trường khi máy nguội'],
  chk:['Không giao tiếp được PCM (U0100) → nguồn, mass, rơ-le Main 1, dây CAN'], dx:'can' },

{ k:'I', ph:0, t:'Kiểm tra đèn & tự chẩn đoán các ECU',
  d:'Cụm đồng hồ bật toàn bộ đèn cảnh báo để kiểm tra bóng. SRS, ABS/VSA, EPS, camera Honda Sensing tự chẩn đoán vài giây rồi báo trạng thái qua CAN; hệ thống không lỗi sẽ tắt đèn. MIL, đèn sạc và đèn áp suất dầu vẫn sáng vì động cơ chưa chạy.',
  L:['comm','elex'], v:V(0,12.1,0,30,250,101,0,0,0,null,'—',2.5,'P','ON'),
  act:['gw','srs','vsa','eps','cam'],
  can:[['srs','gw','SRS tự kiểm tra: OK'],['vsa','gw','VSA tự kiểm tra: OK'],['eps','gw','EPS: OK'],['cam','gw','Honda Sensing: OK']],
  sig:['Mỗi ECU tự kiểm tra ~vài giây','Đèn hệ thống lỗi giữ sáng'],
  chk:['Đèn không tắt sau tự kiểm tra → đọc mã hệ thống tương ứng bằng HDS','Đèn không sáng khi kiểm tra bóng → lỗi đồng hồ/đèn'], dx:'mil' },

{ k:'J', ph:0, t:'Mồi bơm xăng',
  d:'PCM đóng rơ-le PGM-FI Main 2 khoảng 2 giây → bơm xăng trong bình chạy, nạp áp suất cho ống phân phối. Hệ thống không hồi: lọc và bộ điều áp nằm trong cụm bơm. Nếu sau đó không có tín hiệu vòng tua, PCM tắt bơm để an toàn khi va chạm.',
  L:['elec','meca','elex'], v:V(0,12.0,0,30,340,101,0,0,0,null,'—',2.5,'P','ON'),
  act:['r-main2','w-pump','pump','rail'],
  can:[],
  sig:['Áp suất nhiên liệu ~320–370 kPa (tham khảo)','Bơm chạy ~2 s khi bật ON'],
  chk:['Không nghe tiếng bơm → rơ-le Main 2, cầu chì, giắc, bơm (P0230)'], dx:'nostart' },

{ k:'K', ph:0, t:'Khởi tạo bướm ga điện tử (DBW)',
  d:'PCM kiểm tra mô-tơ bướm ga và hai cảm biến vị trí TP-A/TP-B, đối chiếu với hai kênh APP của bàn đạp ga. Bướm ga ở vị trí mặc định do lò xo. Hai kênh không tương quan → PCM vào chế độ an toàn, giới hạn ga.',
  L:['elex'], v:V(0,12.1,0,30,340,101,6,0,0,null,'—',2.5,'P','ON'),
  act:['tb','a-dbw','s-tp','app','s-app','pcm'],
  can:[],
  sig:['TP-A, TP-B: hai đường 0–5 V tương quan','APP-A, APP-B: hai kênh độc lập','Mô-tơ bướm ga: PWM cầu H'],
  chk:['P2135/P2138, P2101 → giắc bướm ga, vệ sinh, học lại'], dx:'rough' },

{ k:'L', ph:0, t:'Kiểm tra điều kiện đề',
  d:'PCM và Keyless cùng xác nhận: cần số ở P hoặc N (công tắc dải số), đang đạp phanh, immobilizer hợp lệ, điện áp đủ. Đủ điều kiện → Keyless gửi yêu cầu đề, PCM cho phép đóng rơ-le starter cut.',
  L:['elex','comm'], v:V(0,12.2,0,30,340,101,3,0,0,null,'—',2.5,'P','ON'),
  act:['range','s-range','brake','s-brake','pcm','key'],
  can:[['key','pcm','Yêu cầu đề'],['pcm','key','P/N + phanh OK → cho phép']],
  sig:['Range: P hoặc N','Brake: ON','Immobilizer: OK'],
  chk:['Không đề ở P → thử ở N; kiểm tra công tắc dải số (P0705)'], dx:'nocrank' },

{ k:'M', ph:1, t:'Cắt tải & đề (cranking)',
  d:'MICU tạm ngắt tải ACC (màn hình, quạt gió) để dồn điện cho máy đề. Rơ-le starter cut đóng → điện vào chân S của công-tắc từ → bánh răng bendix ăn khớp vành răng bánh đà, máy đề kéo trục khuỷu quay khoảng 200–300 vòng/phút. Điện áp ắc quy tụt còn khoảng 10 V.',
  L:['elec','meca'], v:V(220,10.2,180,30,330,92,4,0,0,null,'—',2.5,'P','START'),
  act:['r-st','w-st','w-stb','starter','flywheel','battery'],
  can:[['micu','audio','Ngắt tải ACC khi đề'],['micu','hvac','Ngắt quạt gió khi đề']],
  sig:['Dòng đề ~100–200 A (tham khảo)','Điện áp khi đề ≥ 9,6 V','Sụt áp cáp B+ máy đề < 0,5 V'],
  chk:['Đề chậm → ắc quy, cọc, mass G1, máy đề','Chỉ nghe tiếng “tạch” → công-tắc từ máy đề, cáp'], dx:'nocrank' },

{ k:'N', ph:1, t:'Đồng bộ CKP + CMP',
  d:'Cảm biến CKP đọc răng bánh tín hiệu trên trục khuỷu (có khoảng răng khuyết làm mốc); CMP đọc vấu trên trục cam. Kết hợp hai tín hiệu, PCM biết chính xác góc trục khuỷu và xi-lanh nào ở cuối kỳ nén → đồng bộ chỉ sau khoảng 1–2 vòng quay.',
  L:['elex','meca'], v:V(250,10.0,170,30,330,90,4,0,0,null,'—',2.5,'P','START'),
  act:['ckp','s-ckp','cmp','s-cmp','pcm'],
  can:[['pcm','gw','RPM']],
  sig:['CKP/CMP: xung vuông 0–5 V','Răng khuyết = mốc tham chiếu (minh họa)'],
  chk:['Đồng hồ vòng tua = 0 khi đề → CKP (P0335)','P0016 → lệch pha cam/khuỷu, xích cam'], dx:'nostart' },

{ k:'O', ph:1, t:'Phun nhiên liệu khởi động',
  d:'PCM tính lượng nhiên liệu khởi động theo ECT (máy lạnh cần giàu xăng hơn), rồi phun tuần tự từng xi-lanh theo thứ tự nổ 1-3-4-2. Mỗi kim phun được mở bằng cách PCM nối mass (điều khiển low-side). Xăng phun vào cổ hút trước xu-páp nạp (PFI).',
  L:['elex','meca'], v:V(260,10.0,165,30,340,88,4,12,0,null,'—',2.5,'P','START'),
  act:['inj','a-inj','pcm','rail','ect','s-ect'],
  can:[],
  sig:['Xung phun khi đề lạnh ~8–15 ms (tham khảo)','Ngắt kim → xung cảm ứng vài chục V'],
  chk:['Không có xung kim (đèn noid) → mạch kim, PCM (P0201–P0204)'], dx:'nostart' },

{ k:'P', ph:1, t:'Đánh lửa',
  d:'PCM điều khiển IC đánh lửa trong từng bô-bin đặt trên bugi (COP): ngậm điện (dwell) để tích từ, rồi ngắt → điện áp thứ cấp hàng chục kV phóng tia lửa ở bugi gần điểm chết trên cuối kỳ nén.',
  L:['elex','meca'], v:V(270,10.1,160,30,340,88,4,12,8,null,'—',2.5,'P','START'),
  act:['coil','a-ign','pcm'],
  can:[],
  sig:['Dwell ~2–3 ms (tham khảo)','Góc đánh lửa khi đề ~5–10° trước ĐCT','Thứ tự nổ 1-3-4-2'],
  chk:['Không có tia lửa → nguồn IG1 bô-bin, bô-bin, bugi (P0351–P0354)'], dx:'nostart' },

{ k:'Q', ph:1, t:'Nổ máy & nhả đề',
  d:'Hỗn hợp cháy, vòng tua vượt ngưỡng (~500–600 vòng/phút): PCM/Keyless ngắt rơ-le starter cut, bendix nhả khỏi bánh đà. MICU khôi phục tải ACC. Áp suất dầu lên → đèn dầu tắt; PCM phát bản tin “động cơ đang chạy” lên mạng.',
  L:['elex','comm','meca'], v:V(950,13.0,0,30,340,45,6,6,10,null,'—',2.5,'P','ON'),
  act:['pcm','key','micu','gw'],
  can:[['pcm','key','Động cơ chạy → ngắt đề'],['pcm','gw','RPM, động cơ chạy'],['micu','audio','Khôi phục ACC']],
  sig:['Ngắt đề khi vòng tua > ~500 vòng/phút','Áp suất dầu lên → đèn dầu tắt'],
  chk:['Nổ rồi tắt ngay → immobilizer, áp suất xăng, bướm ga bẩn, rò chân không'], dx:'nostart' },

{ k:'R', ph:2, t:'Không tải nhanh & sấy bầu xúc tác',
  d:'Máy lạnh: PCM mở bướm ga thêm để giữ không tải nhanh ~1.200–1.500 vòng/phút và làm trễ góc đánh lửa để khí xả nóng hơn, giúp bầu xúc tác 3 chiều nhanh đạt nhiệt độ làm việc. Hỗn hợp hơi giàu, điều khiển vòng hở (chưa dùng phản hồi A/F).',
  L:['elex','meca'], v:V(1350,14.3,0,40,340,38,6,4.2,-2,0.9,'Hở',2.5,'P','ON'),
  act:['tb','a-dbw','cat','pcm','ect','s-ect'],
  can:[['pcm','gw','RPM, ECT 40 °C']],
  sig:['λ ≈ 0,85–0,95 khi máy lạnh','Góc đánh lửa trễ (có thể sau ĐCT)'],
  chk:['Không tải dao động/chết máy khi lạnh → bướm ga bẩn, ECT sai (P0128/P0117)'], dx:'rough' },

{ k:'S', ph:2, t:'Máy phát nạp điện',
  d:'Máy phát quay nhờ dây cu-roa từ puli trục khuỷu. PCM điều khiển dòng kích từ (chân C) theo tải điện và trạng thái động cơ, đọc phản hồi tải (chân FR) → điện áp hệ thống 13,5–14,8 V. Đèn sạc tắt, ắc quy được nạp bù sau lần đề.',
  L:['elec','elex','meca'], v:V(1250,14.4,0,48,340,36,5.5,3.8,2,0.92,'Hở',2.5,'P','ON'),
  act:['alt','w-alt','a-altc','belt','battery','mainfuse'],
  can:[['pcm','gw','Trạng thái sạc: OK']],
  sig:['Điện áp nạp 13,5–14,8 V','Gợn sóng AC < ~0,5 V (diode tốt)'],
  chk:['Đèn sạc sáng/điện áp < 13 V → cu-roa, máy phát, mạch C/FR (P0620–P0626)'], dx:'charge' },

{ k:'T', ph:2, t:'Vòng kín A/F (closed loop)',
  d:'Cảm biến A/F (dải rộng, có sấy) trước bầu xúc tác đạt nhiệt độ làm việc. PCM chuyển sang vòng kín: liên tục hiệu chỉnh nhiên liệu ngắn hạn (STFT) và dài hạn (LTFT) để giữ λ ≈ 1,00. Cảm biến O2 sau bầu xúc tác giám sát hiệu suất xúc tác.',
  L:['elex','meca'], v:V(900,14.2,0,65,340,33,4,3.0,8,1.0,'Kín',2.5,'P','ON'),
  act:['af','s-af','o2','s-o2','cat','pcm','inj'],
  can:[],
  sig:['λ ≈ 1,00','STFT + LTFT trong ±10%','O2 sau xúc tác ổn định ~0,6–0,8 V'],
  chk:['Fuel trim > +10% → rò khí, áp suất xăng thấp','P0420 → bầu xúc tác','P2195/P2196 → cảm biến A/F'], dx:'fuel' },

{ k:'U', ph:2, t:'Làm mát, quạt két nước & điều hòa',
  d:'Nước làm mát nóng lên, van hằng nhiệt mở cho nước qua két. PCM bật rơ-le quạt khi ECT cao hoặc khi bật A/C. Người lái bật A/C: HVAC gửi yêu cầu qua B-CAN → gateway → F-CAN → PCM; PCM tăng nhẹ không tải để bù tải rồi đóng rơ-le ly hợp máy nén.',
  L:['elec','elex','comm','meca'], v:V(750,13.9,0,90,340,32,3.5,2.6,10,1.0,'Kín',2.5,'P','ON'),
  act:['ect','s-ect','thermo','radiator','fan','r-fan','w-fan','hvac','r-ac','w-ac','comp','pcm'],
  can:[['hvac','pcm','Yêu cầu A/C'],['pcm','hvac','Cho phép A/C'],['pcm','gw','ECT 90 °C']],
  sig:['ECT làm việc ~80–95 °C','Van hằng nhiệt bắt đầu mở ~76–80 °C (tham khảo)','Không tải máy nóng ~700 ± 50 vòng/phút'],
  chk:['Quá nhiệt → nước làm mát, quạt, van hằng nhiệt, bơm nước','A/C không mát → ga lạnh, rơ-le ly hợp, cảm biến áp suất'], dx:'overheat' },

{ k:'V', ph:2, t:'Tăng tốc (drive-by-wire)',
  d:'Người lái đạp ga: hai kênh APP gửi yêu cầu → PCM tính mô-men mục tiêu → điều khiển mô-tơ bướm ga (PWM) mở theo góc tính toán, TP phản hồi vị trí. Lượng khí nạp (từ MAP/IAT/vòng tua) quyết định độ rộng xung phun; góc đánh lửa tra bản đồ theo tải & vòng tua, cảm biến kích nổ hiệu chỉnh khi có kích nổ.',
  L:['elex','meca','comm'], v:V(2600,14.0,0,90,340,82,45,8.5,18,1.0,'Kín',2.0,'D','ON'),
  act:['app','s-app','tb','a-dbw','s-tp','s-map','map','inj','coil','knock','s-knock','pcm'],
  can:[['pcm','vsa','Mô-men, vòng tua, vị trí ga'],['vsa','pcm','Tốc độ bánh xe'],['pcm','eps','Vòng tua']],
  sig:['MAP khi tăng tốc 70–95 kPa','Xung phun tăng theo tải','Kích nổ → trễ góc đánh lửa vài độ'],
  chk:['Ì máy → bugi, bô-bin, lọc gió, bướm ga, áp suất xăng','Giới hạn ga + MIL → lỗi APP/TP'], dx:'rough' },

{ k:'W', ph:2, t:'i-VTEC: VTC + VTEC (tải lớn)',
  d:'PCM điều khiển van dầu OCV (PWM) để xoay pha trục cam nạp sớm/muộn liên tục theo tải và vòng tua. Ở dải phù hợp, van điện từ VTEC mở đường dầu chuyển cấu hình cò mổ (thay đổi hành trình/thời gian mở xu-páp); công tắc áp suất dầu VTEC xác nhận đã chuyển. Đạp ga hết: PCM tạm ngắt máy nén A/C để dồn công suất.',
  L:['elex','meca'], v:V(4500,14.0,0,92,340,98,88,13,26,0.88,'Hở (tải lớn)',1.4,'D','ON'),
  act:['vtc','a-vtc','vtec','a-vtec','cmp','s-cmp','pcm'],
  can:[['pcm','hvac','Ngắt A/C tạm thời (WOT)'],['pcm','gw','RPM 4.500']],
  sig:['Góc VTC mục tiêu ≈ thực tế','Áp suất dầu đủ, dầu đúng chuẩn 0W-20','λ ≈ 0,88 khi đạp hết ga (làm giàu)'],
  chk:['P0011/P0012 → dầu bẩn/thiếu, van OCV','P2646–P2649 → van/công tắc áp suất dầu VTEC'], dx:'oil' },

{ k:'X', ph:2, t:'Truyền lực qua hộp số CVT',
  d:'PCM (tích hợp điều khiển hộp số) đọc cảm biến tốc độ puli sơ cấp/thứ cấp và nhiệt độ dầu CVT, điều khiển các van điện từ tuyến tính thay đổi áp suất thủy lực: đường kính hai puli thay đổi liên tục nên tỉ số truyền biến thiên vô cấp. Ly hợp khóa biến mô đóng khi chạy đều để giảm hao phí.',
  L:['elex','meca','comm'], v:V(2000,13.9,0,90,340,45,18,3.6,30,1.0,'Kín',0.6,'D','ON'),
  act:['cvt','cvtsens','cvtsol','s-cvt','a-cvt','tc','wheel','pcm'],
  can:[['pcm','gw','Số D, tỉ số truyền'],['vsa','pcm','Tốc độ xe']],
  sig:['Tỉ số ~2,5 (thấp) ↔ ~0,4 (cao) – minh họa','Dầu CVT làm việc ~70–90 °C'],
  chk:['Giật/trượt/rú ga → mức & chất lượng dầu CVT, mã P07xx, học lại CVT'], dx:'cvt' },

{ k:'Y', ph:2, t:'Phối hợp toàn xe & giám sát OBD',
  d:'Khi xe chạy, PCM chia sẻ dữ liệu liên tục: VSA yêu cầu giảm mô-men khi bánh trượt; EPS dùng tốc độ xe để điều chỉnh trợ lực; camera Honda Sensing gửi yêu cầu tăng/giảm tốc cho ACC/CMBS; đồng hồ hiển thị vòng tua, tốc độ, nhiệt độ, nhiên liệu. Song song, PCM chạy các bài giám sát OBD-II (bỏ máy, xúc tác, A/F, EVAP, sấy cảm biến); lỗi lặp lại → lưu mã và bật MIL.',
  L:['comm','elex','meca'], v:V(2000,13.9,0,90,340,45,18,3.6,30,1.0,'Kín',0.6,'D','ON'),
  act:['vsa','eps','cam','gw','pcm','wss','s-wss','purge','a-purge','dlc'],
  can:[['vsa','pcm','Yêu cầu giảm mô-men'],['cam','pcm','ACC: yêu cầu mô-men'],['pcm','eps','Tốc độ xe'],['pcm','gw','MIL: không lỗi'],['gw','dlc','Sẵn sàng chẩn đoán']],
  sig:['Bỏ máy phát hiện qua dao động tốc độ CKP','Readiness hoàn tất sau chu trình lái'],
  chk:['Nhiều đèn cùng sáng → mạng CAN, ắc quy yếu','ABS/VSA sáng → cảm biến tốc độ bánh'], dx:'abs' },

{ k:'Z', ph:3, t:'Tắt máy & trở về trạng thái ngủ',
  d:'Về P, nhấn nút START/STOP: Keyless cắt IG1/IG2 → PCM ngừng phun và đánh lửa, động cơ dừng. PCM giữ rơ-le Main 1 thêm một lúc (post-run) để lưu giá trị học (fuel trim, không tải, CVT). Các ECU gửi bản tin chuẩn bị ngủ, mạng CAN ngủ → quay lại trạng thái A.',
  L:['elex','comm','elec'], v:V(0,12.6,0,88,280,101,0,0,0,null,'—',2.5,'P','OFF'),
  act:['key','pcm','r-main1','w-m1','micu','gw'],
  can:[['key','micu','Power mode: OFF'],['pcm','gw','Lưu dữ liệu học'],['micu','gw','NM: chuẩn bị ngủ']],
  sig:['Áp suất xăng dư được giữ','Dòng rò về < ~50 mA sau vài phút'],
  chk:['Không tắt máy được → cần số phải ở P, kiểm tra công tắc dải số, Keyless'], dx:'nocrank' }
];

/* tên hiển thị */
const NAME = {
  battery:'Ắc quy 12 V', mainfuse:'Cầu chì chính', uhbox:'Hộp cầu chì khoang máy', udbox:'Hộp cầu chì dưới táp-lô',
  'r-main1':'Rơ-le PGM-FI Main 1', 'r-main2':'Rơ-le PGM-FI Main 2', 'r-st':'Rơ-le starter cut', 'r-fan':'Rơ-le quạt két nước',
  'r-ac':'Rơ-le ly hợp A/C', fbig:'Cầu chì lớn ABS/EPS', 'r-acc':'Rơ-le ACC', 'r-ig1':'Rơ-le IG1', 'r-ig2':'Rơ-le IG2', g1:'Mass G1',
  alt:'Máy phát', comp:'Máy nén A/C', belt:'Dây cu-roa', pcm:'PCM', airf:'Lọc gió', iat:'Cảm biến IAT', tb:'Bướm ga điện tử',
  plenum:'Cổ hút', map:'Cảm biến MAP', purge:'Van EVAP purge', rail:'Ống phân phối', inj:'Kim phun ×4', coil:'Bô-bin COP ×4',
  ckp:'Cảm biến CKP', cmp:'Cảm biến CMP', vtc:'VTC + van OCV', ect:'Cảm biến ECT', vtec:'Van VTEC', knock:'Cảm biến kích nổ',
  af:'Cảm biến A/F', o2:'Cảm biến O2 sau', cat:'Bầu xúc tác', thermo:'Van hằng nhiệt', radiator:'Két nước', fan:'Quạt két nước',
  flywheel:'Bánh đà', starter:'Máy đề', tc:'Biến mô', cvt:'Hộp số CVT', cvtsens:'Cảm biến tốc độ CVT', cvtsol:'Van điện từ CVT',
  wheel:'Bánh xe', wss:'Cảm biến tốc độ bánh', pump:'Bơm xăng', btn:'Nút START/STOP', brake:'Công tắc phanh', app:'Bàn đạp ga APP',
  range:'Công tắc dải số', dlc:'Giắc DLC', vsa:'ABS/VSA', eps:'EPS', srs:'SRS', cam:'Camera Honda Sensing', gw:'Cụm đồng hồ / gateway',
  micu:'MICU (BCM)', key:'Keyless/Immobilizer', hvac:'HVAC', audio:'Màn hình/Audio', park:'Camera lùi/cảm biến đỗ',
  door:'Cửa ×4 (LIN)', lamp:'Đèn/gạt mưa (LIN)', fcan:'F-CAN', bcan:'B-CAN', lin:'LIN', crank:'Trục khuỷu'
};
const LAYER_OF = id => {
  if (/^(battery|mainfuse|uhbox|udbox|r-|fbig|g1|alt|starter)/.test(id)) return 'elec';
  if (/^(belt|crank|flywheel|tc|cvt$|wheel|cat|thermo|radiator|plenum|airf|rail|comp|fan)$/.test(id)) return 'meca';
  if (/^(fcan|bcan|lin|gw)$/.test(id)) return 'comm';
  return 'elex';
};
const LAYER_NAME = { meca:'Lớp 1 · Cơ khí', elec:'Lớp 2 · Điện', elex:'Lớp 3 · Điện tử', comm:'Lớp 4 · Truyền thông' };
