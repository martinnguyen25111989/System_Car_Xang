"""Ghép các file nguồn trong src/ thành một trang index.html tự chứa (không cần server).
Chạy: python build.py"""
import pathlib
ROOT = pathlib.Path(__file__).parent
ORDER = ["data_steps.js", "data_diag.js", "data_parts.js", "app_svg.js", "app_run.js", "app_parts.js", "app_ui.js"]
js = "\n".join((ROOT / "src" / "js" / f).read_text(encoding="utf-8") for f in ORDER)
shell = (ROOT / "src" / "shell.html").read_text(encoding="utf-8")
out = shell.replace("/*__JS__*/", "(function(){\n" + js + "\n})();")
(ROOT / "index.html").write_text(out, encoding="utf-8", newline="\n")
print("Đã tạo index.html –", len(out.encode("utf-8")), "bytes")
