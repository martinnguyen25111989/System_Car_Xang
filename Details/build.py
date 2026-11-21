"""Ghép các file nguồn trong src/ thành một trang index.html tự chứa (không cần server).
Chạy: python build.py   (hoặc: node build.mjs — hai script cho cùng kết quả)

- src/css/*.css      → chèn vào chỗ /*__CSS__*/ trong src/shell.html
- src/js/*.js        → phòng lab Honda City (mã cũ), chạy trong một IIFE riêng
- src/app/*.js       → học viện xe xăng (mã mới), chạy trong IIFE thứ hai
"""
import pathlib

ROOT = pathlib.Path(__file__).parent
CSS = ["app.css", "lab.css"]
LAB = ["data_steps.js", "data_diag.js", "data_parts.js", "app_svg.js", "app_run.js", "app_parts.js", "app_ui.js"]
APP = ["core.js", "icons.js", "art.js", "diagram.js", "data_sys.js", "data_comp_a.js", "data_comp_b.js",
       "data_dx.js", "data_misc.js", "views_a.js", "views_b.js", "views_c.js", "main.js"]


def read(*parts):
    return (ROOT.joinpath(*parts)).read_text(encoding="utf-8")


css = "\n".join(read("src", "css", f) for f in CSS)
lab = "\n".join(read("src", "js", f) for f in LAB)
app = "\n".join(read("src", "app", f) for f in APP)
shell = read("src", "shell.html")
js = "(function(){\n" + lab + "\n})();\n(function(){\n" + app + "\n})();"
out = shell.replace("/*__CSS__*/", css).replace("/*__JS__*/", js)
(ROOT / "index.html").write_text(out, encoding="utf-8", newline="\n")
print("Đã tạo index.html –", len(out.encode("utf-8")), "bytes")
