// Ghép src/ → index.html (giống build.py, dùng khi máy chỉ có Node.js).
// Chạy: node build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const CSS = ['app.css', 'lab.css'];
const LAB = ['data_steps.js', 'data_diag.js', 'data_parts.js', 'app_svg.js', 'app_run.js', 'app_parts.js', 'app_ui.js'];
const APP = ['core.js', 'icons.js', 'art.js', 'diagram.js', 'data_sys.js', 'data_comp_a.js', 'data_comp_b.js',
  'data_dx.js', 'data_misc.js', 'views_a.js', 'views_b.js', 'views_c.js', 'main.js'];

const read = (...p) => readFileSync(join(ROOT, ...p), 'utf8');
const css = CSS.map(f => read('src', 'css', f)).join('\n');
const lab = LAB.map(f => read('src', 'js', f)).join('\n');
const app = APP.map(f => read('src', 'app', f)).join('\n');
const js = '(function(){\n' + lab + '\n})();\n(function(){\n' + app + '\n})();';
const out = read('src', 'shell.html').replace('/*__CSS__*/', () => css).replace('/*__JS__*/', () => js);
writeFileSync(join(ROOT, 'index.html'), out, 'utf8');
console.log('Đã tạo index.html –', Buffer.byteLength(out), 'bytes');
