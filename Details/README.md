# System_Car_Xang – Học viện Xe Xăng

**Hiểu chiếc xe xăng từ con số 0 – trực quan, dễ học, dễ đọc**

Trang web tương tác (một file HTML, không cần server) dạy toàn bộ các hệ thống của xe chạy xăng: năng lượng đi từ đâu đến đâu, từng bộ phận làm gì, các hệ thống “nói chuyện” với nhau ra sao, và khi hỏng thì nhận biết, kiểm tra thế nào. Kèm theo **Phòng lab Honda City 2024** – mô phỏng kiến trúc điện – điện tử (1.5L DOHC i-VTEC, PGM-FI, CVT) và mô hình chẩn đoán chuyên sâu.

Bản công khai: https://martinnguyen25111989.github.io/System_Car_Xang/details/

## Nội dung

| Mục | Mô tả |
|---|---|
| Trang chủ | Hình xe X-quang với luồng xăng – khí – mô-men – khí xả – điện, hành trình 10 chặng, “Học tiếp”, lối tắt chẩn đoán. |
| Lộ trình học | 4 cấp: Người mới bắt đầu → Trung cấp → Nâng cao → Chẩn đoán; 180 bài, mỗi bài có quiz 3–5 câu, tiến độ lưu trên trình duyệt. |
| Khám phá chiếc xe | Mặt cắt cả xe với 24 khu vực bấm được: tên → chức năng → vị trí → kết nối → hư hỏng thường gặp; lọc theo nhóm, bật luồng năng lượng. |
| 22 bài hệ thống | Tổng quan (3 luồng: năng lượng, điện, điều khiển) · Động cơ (cắt lớp + chu trình 4 kỳ, ▶ Phát / ⏸ Tạm dừng / ↻ Phát lại, 1x–2x–4x) · Nhiên liệu · Nạp khí · Đánh lửa (góc đánh lửa theo vòng tua) · ECU (11 đầu vào, 8 đầu ra, Cảm biến → ECU → Quyết định → Chấp hành) · 13 cảm biến (dạng sóng, mã lỗi, cách đo) · Làm mát (cây chẩn đoán quá nhiệt) · Bôi trơn · Khí xả · Hộp số MT/AT/CVT/DCT · Dẫn động FWD/RWD/AWD/4WD · Điện & mạng CAN (thử cắt dây) · Khởi động & sạc · Phanh · Lái HPS/EPS · Treo · Bánh xe & góc đặt bánh (camber/caster/toe) · Điều hòa · An toàn (kịch bản va chạm) · ADAS (vùng phủ cảm biến) · Điện thân xe. |
| 151 bài bộ phận | Mỗi bài 10 phần: Là gì · Nằm ở đâu · Làm nhiệm vụ gì · Hoạt động thế nào · Kết nối · Hỏng ra sao · Chẩn đoán · Ví dụ thực tế · Quiz · Tóm tắt. Sơ đồ có nút “Thử làm hỏng” để thấy hậu quả lan ra hệ thống. |
| Xe tôi đang có vấn đề | 21 triệu chứng → hệ thống → bộ phận → nguyên nhân (theo mức thường gặp) → cây kiểm tra Đạt/Không đạt; cho biết còn chạy được không. |
| Máy đọc OBD-II | Giải mã từng ký tự của mã lỗi, chế độ “Giải thích cho người mới”, thư viện 56 nhóm mã P/C/B/U. |
| Đèn cảnh báo | 12 đèn, 3 mức 🟢🟡🔴: nghĩa là gì · vì sao sáng · còn chạy được không · cần kiểm tra gì. |
| So sánh | 6 bảng: MAF vs MAP · cảm biến O2 vs A/F · AT vs CVT vs DCT · FWD vs RWD vs AWD · trợ lực dầu vs trợ lực điện · hút khí tự nhiên vs turbo. |
| Quy trình chẩn đoán | Các bước của kỹ thuật viên, nguyên tắc, dụng cụ. |
| Phòng lab Honda City 2024 | 5 tab chuyên sâu (giao diện tối): Vận hành A→Z (26 bước, 4 lớp Cơ khí · Điện · Điện tử · Truyền thông, gói tin CAN/LIN, oscilloscope) · Cấu tạo động cơ L15ZF (sơ đồ tách rời 39 bộ phận) · Mô hình chẩn đoán (20 nhóm triệu chứng) · Danh mục ~75 chi tiết & mã lỗi · Bảo dưỡng – thông số – cài đặt sau khi thay. |

Tìm kiếm toàn trang (phím `/`) không cần gõ dấu: “bugi”, “may phat”, “P0300”, “MAF”…

## Cấu trúc

```
Details/
├── index.html          ← trang hoàn chỉnh đã build, mở trực tiếp bằng trình duyệt
├── build.mjs           ← ghép src/ → index.html (Node.js)
├── build.py            ← bản tương đương bằng Python
└── src/
    ├── shell.html      ← khung trang: menu, thanh tìm kiếm, khung phòng lab
    ├── css/
    │   ├── app.css     ← giao diện học viện (nền sáng, màu ngữ nghĩa)
    │   └── lab.css     ← giao diện phòng lab (nền tối), chỉ áp dụng trong .lab
    ├── app/            ← học viện
    │   ├── core.js         ← tiện ích, lưu tiến độ, điều hướng #/…
    │   ├── icons.js        ← bộ icon, icon đèn cảnh báo
    │   ├── art.js          ← minh họa SVG: xe X-quang, động cơ cắt lớp, dẫn động, ADAS, dạng sóng, cổng OBD
    │   ├── diagram.js      ← vẽ sơ đồ luồng: mũi tên, từng bước, thử làm hỏng
    │   ├── data_sys.js     ← 22 hệ thống
    │   ├── data_comp_a.js  ← bộ phận: động cơ → khí xả
    │   ├── data_comp_b.js  ← bộ phận: hộp số → điện thân xe
    │   ├── data_dx.js      ← 21 triệu chứng, thư viện mã lỗi
    │   ├── data_misc.js    ← khu vực xe, đèn cảnh báo, so sánh, lộ trình
    │   ├── views_a.js      ← trang chủ, lộ trình, khám phá, tìm kiếm, bảng chi tiết
    │   ├── views_b.js      ← bài hệ thống & bộ phận, minh họa tương tác
    │   ├── views_c.js      ← chẩn đoán, OBD, mã lỗi, đèn, so sánh, quy trình, phòng lab
    │   └── main.js         ← menu, tìm kiếm, điều hướng, khởi động
    └── js/             ← phòng lab Honda City 2024
        ├── data_steps.js   ← 26 bước A→Z, tên thành phần
        ├── data_diag.js    ← triệu chứng, danh mục, bảo dưỡng, thông số
        ├── data_parts.js   ← 51 bộ phận động cơ, thông số cấu tạo
        ├── app_svg.js      ← dựng sơ đồ SVG kiến trúc E/E
        ├── app_run.js      ← mô phỏng động cơ, gói tin CAN, oscilloscope
        ├── app_parts.js    ← sơ đồ tách rời cấu tạo động cơ
        └── app_ui.js       ← tab, cây chẩn đoán, danh mục; cầu nối window.LAB
```

## Sử dụng

- Xem: mở `index.html` bằng Chrome/Edge (máy tính, máy tính bảng, điện thoại).
- Sửa nội dung: chỉnh file trong `src/`, rồi chạy `node build.mjs` (hoặc `python build.py`) để tạo lại `index.html`.
- Đăng lên web: commit cả `src/` lẫn `index.html` đã build rồi đẩy lên `master`. Workflow Pages của repo gốc copy `index.html` vào `/details/`.
- Tiến độ học lưu trong trình duyệt (localStorage `xang-academy-v1`); xóa bằng nút “Làm lại từ đầu” ở trang Lộ trình.
- Link cũ của phòng lab (`#van-hanh`, `#cau-tao`, `#chan-doan`, `#danh-muc`, `#bao-duong`) tự chuyển sang `#/lab/…`.

## Lưu ý

Nội dung phục vụ học tập. Trị số ghi “tham khảo” cần đối chiếu tài liệu sửa chữa của hãng theo số VIN. Mã P/U/C/B là mã chuẩn SAE; mã riêng của hãng (với Honda: SRS, VSA, EPS, Keyless…) đọc bằng máy chẩn đoán của hãng (Honda i-HDS). Với SRS: ngắt cọc âm, chờ ≥ 3 phút, không đo túi khí bằng VOM.
