# Hệ thống ô tô xăng

Khóa học đọc một chiếc xe xăng như một hệ thống: năng lượng, cơ khí, điện 12V, dữ liệu và nhiệt. Mỗi bài có bài đọc, sơ đồ 2D bật tắt luồng, mô hình 3D giản lược và quiz.

Bản công khai: https://martinnguyen25111989.github.io/System_Car_Xang/

Mã nguồn: https://github.com/martinnguyen25111989/System_Car_Xang

Xe ví dụ xuyên suốt là **Honda City 1.5**: máy xăng hút khí tự nhiên, dẫn động cầu trước, hộp số CVT hoặc số tự động tùy đời. Số liệu là mức điển hình và đổi theo năm sản xuất cũng như thị trường. Một đời City không phải bản vẽ của mọi ô tô xăng. Ví dụ tăng áp dùng một xe turbo phổ biến, không lấy City làm xe tăng áp.

## Đang có gì

Lộ trình có **8 level, 32 bài**, và cả 32 bài đều mở trong app. Mỗi bài có bài đọc 10 mục, sơ đồ 2D bật tắt luồng, khối 3D và quiz 5 câu cộng 3 câu tự luận.

| Level | Tên | Bài |
| --- | --- | --- |
| 1 | Nền tảng | L01–L04 |
| 2 | Powertrain xăng | L05–L10 |
| 3 | Khung gầm | L11–L17 |
| 4 | Điện và điện tử | L18–L21 |
| 5 | Mạng và phần mềm | L22–L24 |
| 6 | An toàn và ADAS | L25–L27 |
| 7 | Nội thất | L28–L29 |
| 8 | Ghép thành một hệ thống | L30–L32 |

Bài cuối mỗi level có một đoạn ôn. L32 có bản đồ cả khóa và sáu ca chẩn đoán. Cuối mỗi bài đọc còn có câu hỏi phỏng vấn để tự kể lại.

## Phạm vi

Khóa dạy sâu phần xe xăng vẫn có:

- Kiến trúc xe, máy 4 thì, nhiên liệu, nạp, cháy, xả
- Hộp số, cầu xe, phanh, lái, treo, lốp
- Điện 12V, ECU, cảm biến, cơ cấu chấp hành
- CAN, OBD, phần mềm ECU ở mức nguyên lý
- An toàn chủ động và bị động, ADAS mức xe phổ thông
- Nội thất, điều hòa, giải trí, bảo dưỡng, chẩn đoán

Có thêm những thứ xe xăng bắt buộc có nhưng dễ bị bỏ sót: máy đề, máy phát, hệ đánh lửa, hơi xăng EVAP, thông hơi cacte PCV, van biến thiên pha VVT. VVT được ghi là thiết kế theo hãng, không phải một sơ đồ cho mọi xe.

HEV, PHEV và BEV chỉ xuất hiện ở **L03**, một bài so sánh kiến trúc. Khóa không đi vào hóa học pin, inverter, BMS, sạc, phanh tái sinh hay một hệ hybrid của riêng một hãng.

## Cách một bài được dạy

Mỗi bài trả lời một câu hỏi, theo thứ tự kỹ sư hệ thống:

1. Concept — nó là gì
2. Architecture — nó nằm ở đâu trong xe
3. Components — gồm những cụm nào
4. Flow — luồng đi đường nào
5. Real-world example — trên City 1.5 chuyện đó trông thế nào
6. Comparison — khác đời xe hoặc khác họ xe ở điểm nào
7. Failure — đứt ở đoạn nào thì triệu chứng ra sao
8. Interview — câu để tự kể lại
9. Quiz — chấm trên trang
10. Summary — giữ lại những gì

Thuật ngữ viết dạng `English Term – nghĩa tiếng Việt`. Số liệu luôn kèm ý “điển hình, đổi theo đời xe”.

Nếu bạn nghĩ theo phần mềm: bàn đạp ga là một yêu cầu, ECU là service điều khiển, kim phun và bướm ga là actuator, mạng xe là message bus. Phần mềm không tạo mô-men. Năng lượng thật nằm trong xăng.

## Màu luồng

Năm màu này dùng chung cho sơ đồ 2D và nhãn 3D. Mỗi màu là một đường đi cùng lúc, không phải một bước thời gian.

| Màu | Luồng | Việc của nó |
| --- | --- | --- |
| Vàng `#e3a008` | Năng lượng | Xăng cháy thành công trên trục |
| Xanh thép `#7ea0c4` | Cơ khí | Mô-men từ máy qua hộp số, vi sai, tới bánh |
| Đỏ `#e15b64` | Điện 12V | Ắc quy và máy phát nuôi ECU, lửa, bơm xăng |
| Xanh lá `#3dbe7a` | Dữ liệu | Cảm biến báo tin, ECU ra lệnh |
| Cam `#f07a3a` | Nhiệt | Nhiệt của sự cháy ra két nước và ống xả |

Hai màu dành cho bài máy sau này, chưa hiện ở L01: cyan cho khí nạp, xám cho khí xả.

Xương sống lặp lại ở các bài powertrain và khung gầm:

```text
Người lái → Bàn đạp / vô-lăng → ECU → Máy xăng → Hộp số → Vi sai → Bánh → Mặt đường
```

## Dùng app

Trang chủ là bản đồ 8 level. Bấm một level để thấy các bài và câu hỏi bài đó trả lời. Bài chưa mở không phải link.

Lesson 01 chia hai cột:

- Trái: bài đọc markdown.
- Phải: sân khấu. Tab **Sơ đồ 2D** là các hộp bấm được. Tab **Xe 3D** là thân xe trong suốt, nhìn từ bên sườn.
- Nút màu bật hoặc tắt từng luồng. Nút **Chạy dòng năng lượng** cho thấy gói năng lượng và piston chuyển động. Đó là sơ đồ, không phải CAD.
- Bấm một hộp thì bảng bên dưới nói nó là gì, xe cần nó để làm gì, hỏng thì sao, người lái thấy gì.
- Cuối trang: 5 câu trắc nghiệm và 3 câu tự luận. Đạt **4/5** thì L01 được đánh dấu đã học. Tự luận không chấm tự động. Mở gợi ý sau khi tự viết.

Tiến độ nằm trong trình duyệt, khóa `localStorage` tên `xang-course-progress-v1`. Xóa dữ liệu trang là mất dấu đã học. Không có tài khoản.

Trên màn hẹp hơn 900px, bài đọc xếp trên, sân khấu xếp dưới.

## Chạy trên máy

Cần Node.js 22.

```powershell
cd web
npm install
npm run dev
```

Mở http://127.0.0.1:5173 . Dev server đọc markdown ở `curriculum/` ngoài thư mục `web/`, nên phải chạy từ repo đầy đủ, không chỉ copy thư mục `web/`. Bản đồ mở L01 đến L32.

Các lệnh khác, vẫn trong `web/`:

```powershell
npm run lint
npm run build
npm run preview
```

`npm run build` chạy `tsc -b` rồi `vite build`. Bản local dùng base `/`. Đừng đặt `GITHUB_PAGES=true` trong cùng cửa sổ PowerShell rồi chạy `npm run dev`, vì biến đó đổi base thành `/System_Car_Xang/` và trang local sẽ mất đường dẫn.

## Cây thư mục

```text
curriculum/level-0N/lesson-NN.md   bài đọc của từng lesson
web/src/content/curriculum.ts      8 level, 32 bài
web/src/content/packs/             sơ đồ, quiz và mô hình từng bài
web/src/pages/LearningMap.tsx      trang chủ
web/src/pages/LessonPage.tsx       một bài: đọc + sân khấu + quiz
web/src/components/FlowDiagram.tsx sơ đồ 2D
web/src/scenes/GhostCar.tsx        xe 3D trong suốt
web/src/lib/progress.ts            tiến độ localStorage
web/public/404.html                fallback cho đường dẫn sâu trên GitHub Pages
.github/workflows/pages.yml        build và deploy
```

Bài viết nằm ở gốc repo và được import bằng `?raw`. Bản production gói markdown vào file JS, nên GitHub Actions không cần copy tay file markdown vào `dist`.

## Công nghệ

- Vite 8, React 19, TypeScript
- React Router 7 cho `/` và `/lesson/:id`
- `react-markdown` và `remark-gfm` cho bài đọc
- `@react-three/fiber`, `@react-three/drei`, Three.js cho xe 3D

Nhãn 3D là sprite vẽ bằng canvas, không phải HTML gắn trong cảnh 3D. App không bọc `StrictMode`. Cả hai lựa chọn này tránh lỗi gỡ gốc React khi nhãn 3D cập nhật trên React 19.

Import tương đối trong `web/src` phải có đuôi `.ts` hoặc `.tsx`, vì TypeScript bật `verbatimModuleSyntax` và `allowImportingTsExtensions`.

## Trang public

Đẩy lên nhánh `master` sẽ chạy workflow **Deploy GitHub Pages**. Workflow cài dependency trong `web/`, build với `GITHUB_PAGES=true`, rồi đăng thư mục `web/dist`.

Khi biến đó bật, Vite đặt base `/System_Car_Xang/` cho đúng project site. React Router lấy `basename` từ `import.meta.env.BASE_URL`. Favicon dùng `%BASE_URL%`.

GitHub Pages không tự chuyển mọi đường dẫn về `index.html`. File `web/public/404.html` giữ một đoạn đầu của đường dẫn (tên repo) rồi chuyển phần còn lại vào query. Script trong `web/index.html` khôi phục lại đường dẫn thật trước khi app chạy. Nhờ đó, mở thẳng `/lesson/L01` rồi tải lại vẫn vào đúng bài.

Repo đang public. Trang Pages cũng public.
