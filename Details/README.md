# System_Car_Xang – Honda City 2024: Mô phỏng vận hành & Chẩn đoán E/E

**COMPLETE VEHICLE ELECTRICAL & ELECTRONIC ARCHITECTURE – ADVANCED LEVEL**

Trang web tương tác (một file HTML, không cần server) mô phỏng toàn bộ kiến trúc điện – điện tử của Honda City 2024 (1.5L DOHC i-VTEC, PGM-FI, CVT) và mô hình chẩn đoán sự cố.

## Nội dung

| Tab | Mô tả |
|---|---|
| 01 · Vận hành A→Z | 26 bước từ xe ngủ → mở khóa Smart Key → immobilizer → IG ON → PCM boot → mồi bơm → đề → đồng bộ CKP/CMP → phun → đánh lửa → nổ máy → sấy xúc tác → sạc → vòng kín A/F → làm mát/A/C → tăng tốc DBW → i-VTEC → CVT → phối hợp mạng/OBD → tắt máy. Động cơ 4 xi-lanh chuyển động theo thứ tự nổ 1-3-4-2, dòng điện/tín hiệu chạy trên dây, gói tin CAN/LIN đi qua gateway, data list PCM, oscilloscope CKP/CMP/kim phun/đánh lửa, bus trace, đèn cảnh báo. Bật/tắt 4 lớp: Cơ khí · Điện · Điện tử · Truyền thông. |
| 02 · Cấu tạo động cơ | Động cơ L15ZF 1.5L DOHC i-VTEC: sơ đồ tách rời 39 bộ phận đánh số (bấm chọn, nút lắp ghép/tách rời), thẻ chi tiết từng bộ phận (vị trí, chức năng, cấu tạo, thông số, hư hỏng → triệu chứng, kiểm tra), bảng 51 bộ phận theo 12 nhóm hệ thống. |
| 03 · Mô hình chẩn đoán | Quy trình 8 bước; 20 nhóm triệu chứng, mỗi nhóm có cây kiểm tra tương tác (Đạt/Không đạt → kết luận, chi tiết cần thay), mã lỗi liên quan, mức độ thường gặp; chi tiết nghi vấn được tô sáng trên sơ đồ. |
| 04 · Danh mục chi tiết & mã lỗi | ~75 chi tiết: vị trí, chức năng, cách kiểm tra, giá trị tham khảo, mã lỗi, triệu chứng, lưu ý khi thay. Lọc theo hệ thống, tìm kiếm. |
| 05 · Bảo dưỡng · Thông số · Cài đặt | Chu kỳ thay thế, thông số đo nhanh, cài đặt bắt buộc sau khi thay (HDS), công cụ chẩn đoán. |

## Cấu trúc

```
System_Car_Xang/
├── index.html          ← trang hoàn chỉnh, mở trực tiếp bằng trình duyệt
├── build.py            ← ghép src/ → index.html
└── src/
    ├── shell.html      ← HTML + CSS
    └── js/
        ├── data_steps.js   ← 26 bước A→Z, tên thành phần
        ├── data_diag.js    ← triệu chứng, danh mục, bảo dưỡng, thông số
        ├── data_parts.js   ← 51 bộ phận động cơ, thông số cấu tạo
        ├── app_svg.js      ← dựng sơ đồ SVG kiến trúc E/E
        ├── app_run.js      ← mô phỏng động cơ, gói tin CAN, oscilloscope
        ├── app_parts.js    ← sơ đồ tách rời cấu tạo động cơ
        └── app_ui.js       ← tab, cây chẩn đoán, danh mục
```

## Sử dụng

- Xem: mở `index.html` bằng Chrome/Edge.
- Sửa nội dung: chỉnh file trong `src/`, rồi chạy `python build.py` để tạo lại `index.html`.

## Lưu ý

Mô hình phục vụ đào tạo. Trị số ghi “tham khảo” cần đối chiếu Honda Service Manual theo số VIN. Mã P/U/C là mã chuẩn SAE; mã riêng của Honda (SRS, VSA, EPS, Keyless…) đọc bằng Honda i-HDS. Với SRS: ngắt cọc âm, chờ ≥ 3 phút, không đo túi khí bằng VOM.
