/* ===== TAB, CHẨN ĐOÁN, DANH MỤC, BẢO DƯỠNG ===== */
let currentTab = 'van-hanh';
const TABS = ['van-hanh', 'cau-tao', 'chan-doan', 'danh-muc', 'bao-duong'];
function showTab(id) {
  if (!TABS.includes(id)) id = 'van-hanh';
  currentTab = id;
  TABS.forEach(t => { document.getElementById('tab-' + t).hidden = t !== id; const b = document.querySelector(`[data-tab="${t}"]`); b.setAttribute('aria-selected', t === id); });
  const host = document.getElementById(id === 'chan-doan' ? 'stageDiag' : 'stageRun');
  if (svg.parentNode !== host) host.appendChild(svg);
  svg.classList.toggle('diag', id === 'chan-doan');
  if (id === 'chan-doan') applySuspects();
  if (id === 'van-hanh') fitScope();
}
/* các tab của phòng lab đi qua router của học viện: #/lab/<tab> */
document.querySelectorAll('[data-tab]').forEach(b => b.addEventListener('click', () => { location.hash = '#/lab/' + b.dataset.tab; }));

/* ---------- quy trình 8 bước ---------- */
document.getElementById('workflow').innerHTML = WORKFLOW.map((w, i) => `<li><span class="wn">${i + 1}</span><div><b>${w[0]}</b><small>${w[1]}</small></div></li>`).join('');

/* ---------- danh sách triệu chứng ---------- */
let curSym = 'nocrank';
const treeState = {};
const symList = document.getElementById('symList');
const symSearch = document.getElementById('symSearch');
function renderSymList() {
  const q = (symSearch.value || '').trim().toLowerCase();
  const groups = [...new Set(SYMPTOMS.map(s => s.grp))];
  symList.innerHTML = groups.map(g => {
    const items = SYMPTOMS.filter(s => s.grp === g && (!q || (s.t + ' ' + s.sym + ' ' + s.parts.map(p => p[0]).join(' ') + ' ' + s.codes.map(c => c[0]).join(' ')).toLowerCase().includes(q)));
    if (!items.length) return '';
    return `<div class="sg"><div class="sgh">${g}</div>${items.map(s => `<button type="button" class="symb${s.id === curSym ? ' act' : ''}" data-s="${s.id}"><span>${s.t}</span><small>${s.checks.length} bước · ${s.parts.length} chi tiết</small></button>`).join('')}</div>`;
  }).join('') || '<p class="muted">Không có triệu chứng khớp từ khóa.</p>';
  symList.querySelectorAll('.symb').forEach(b => b.addEventListener('click', () => selectSymptom(b.dataset.s)));
}
symSearch.addEventListener('input', renderSymList);
function selectSymptom(id) { curSym = id; renderSymList(); renderDiag(); applySuspects(); }
function applySuspects() { const s = SYMPTOMS.find(x => x.id === curSym); const set = new Set(s.sus); allC().forEach(el => el.classList.toggle('sus', set.has(el.getAttribute('data-c')))); }

/* ---------- cây kiểm tra ---------- */
const dxEl = document.getElementById('dxMain');
function activeIdx(st) { for (let i = 0; i < st.length; i++) { if (st[i] === 'fail') return -1; if (st[i] === 'todo') return i; } return st.length; }
function renderDiag() {
  const s = SYMPTOMS.find(x => x.id === curSym);
  const st = treeState[s.id] || (treeState[s.id] = s.checks.map(() => 'todo'));
  const ai = activeIdx(st);
  const items = s.checks.map((c, i) => {
    const state = st[i]; const isAct = i === ai; const waiting = state === 'todo' && !isAct;
    let body = `<div class="ck-t">${c.t}</div><div class="ck-how">${c.how}</div>`;
    if (!c.info) body += `<div class="ck-spec"><span>Chuẩn</span>${c.spec}</div>`;
    if (isAct) body += c.info
      ? `<div class="ck-btns"><button type="button" class="btn sm" data-a="done" data-i="${i}">Đã thực hiện → tiếp</button></div>`
      : `<div class="ck-btns"><button type="button" class="btn sm ok" data-a="pass" data-i="${i}">✓ Đạt</button><button type="button" class="btn sm bad" data-a="fail" data-i="${i}">✗ Không đạt</button></div>`;
    if (state === 'fail' || state === 'fixed') {
      body += `<div class="ck-res ${state}"><div class="cr-h">${state === 'fail' ? 'Kết luận' : 'Đã khắc phục'}</div><p>${c.fail.c}</p>
        ${c.fail.parts.length ? `<div class="cr-p"><span>Chi tiết cần thay/sửa:</span>${c.fail.parts.map(p => `<span class="pchip">${p}</span>`).join('')}</div>` : ''}
        ${c.fail.fix ? `<p class="cr-fix">${c.fail.fix}</p>` : ''}
        ${state === 'fail' ? `<div class="ck-btns"><button type="button" class="btn sm" data-a="fixed" data-i="${i}">Đã khắc phục → kiểm tra tiếp</button></div>` : ''}</div>`;
    }
    const mark = state === 'pass' ? '✓' : state === 'fail' ? '✗' : state === 'fixed' ? '↻' : state === 'done' ? '✓' : (i + 1);
    return `<li class="ck ${state}${isAct ? ' active' : ''}${waiting ? ' wait' : ''}${c.info ? ' info' : ''}"><span class="ck-n">${mark}</span><div class="ck-b">${body}</div></li>`;
  }).join('');
  const fixedParts = s.checks.filter((c, i) => st[i] === 'fixed').flatMap(c => c.fail.parts);
  const done = ai === s.checks.length;
  dxEl.innerHTML = `
  <div class="dx-head">
    <div class="sc-ph">${s.grp}</div><h2>${s.t}</h2><p>${s.sym}</p>
    <div class="sc-row"><span class="sc-lab">Hệ thống</span>${s.sys.map(x => `<span class="lchip">${x}</span>`).join('')}</div>
    <div class="sc-row"><span class="sc-lab">Bước liên quan trong luồng A→Z</span>${s.steps.map(k => `<button type="button" class="kbtn" data-k="${k}" title="${STEPS[k.charCodeAt(0) - 65].t}">${k}</button>`).join('')}</div>
    <div class="sc-row"><span class="sc-lab">Trên sơ đồ</span><span class="muted">Các chi tiết nghi vấn đang được tô viền vàng nhấp nháy.</span></div>
  </div>
  <div class="dx-cols">
    <section class="tree"><div class="tree-h"><h3>Cây kiểm tra – làm theo thứ tự</h3><button type="button" class="btn ghost sm" id="treeReset">Làm lại</button></div>
      <ol class="cklist">${items}</ol>
      ${done ? `<div class="ck-res fixed end"><div class="cr-h">Hoàn tất cây kiểm tra</div>
        <p>${fixedParts.length ? 'Đã khắc phục: ' + fixedParts.join(', ') + '.' : 'Không phát hiện lỗi ở các bước cơ bản – chuyển sang đo kiểm chuyên sâu bằng i-HDS/oscilloscope hoặc đại lý Honda.'}</p>
        <p class="cr-fix">Tiếp theo: thực hiện cài đặt sau khi thay (tab Bảo dưỡng), xóa mã, chạy chu trình lái và xác nhận không tái lập lỗi.</p></div>` : ''}
    </section>
    <aside class="dx-side">
      <h3>Chi tiết có thể phải thay</h3>
      <table class="tbl"><thead><tr><th>Chi tiết</th><th>Mức độ</th><th>Ghi chú</th></tr></thead><tbody>
        ${s.parts.map(p => `<tr><td>${p[0]}</td><td><span class="lv lv${p[1]}">${LV[p[1]]}</span></td><td class="muted">${p[2] || ''}</td></tr>`).join('')}</tbody></table>
      <h3>Mã lỗi liên quan</h3>
      <table class="tbl"><thead><tr><th>Mã</th><th>Ý nghĩa</th></tr></thead><tbody>
        ${s.codes.map(c => `<tr><td class="mono">${c[0]}</td><td>${c[1]}</td></tr>`).join('')}</tbody></table>
      <p class="note">Mã P/U/C là mã chuẩn SAE dùng chung OBD-II; mã riêng của Honda (SRS, VSA, EPS, Keyless…) đọc bằng Honda i-HDS.</p>
    </aside>
  </div>`;
  dxEl.querySelectorAll('[data-a]').forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.i, a = b.dataset.a; st[i] = a; renderDiag();
    const nx = dxEl.querySelector('.ck.active, .ck.fail'); if (nx) nx.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
  }));
  document.getElementById('treeReset').addEventListener('click', () => { treeState[s.id] = s.checks.map(() => 'todo'); renderDiag(); });
  dxEl.querySelectorAll('.kbtn').forEach(b => b.addEventListener('click', () => { setPlay(false); goStep(b.dataset.k.charCodeAt(0) - 65); location.hash = '#/lab/van-hanh'; }));
}

/* ---------- danh mục chi tiết ---------- */
const catSys = [...new Set(CATALOG.map(r => r[0]))];
let catFilter = 'all';
const catChips = document.getElementById('catChips');
catChips.innerHTML = `<button type="button" class="fchip act" data-f="all">Tất cả <b>${CATALOG.length}</b></button>` + catSys.map(s => `<button type="button" class="fchip" data-f="${s}">${s} <b>${CATALOG.filter(r => r[0] === s).length}</b></button>`).join('');
catChips.querySelectorAll('.fchip').forEach(b => b.addEventListener('click', () => { catFilter = b.dataset.f; catChips.querySelectorAll('.fchip').forEach(x => x.classList.toggle('act', x === b)); renderCatalog(); }));
const catSearch = document.getElementById('catSearch');
catSearch.addEventListener('input', renderCatalog);
function renderCatalog() {
  const q = catSearch.value.trim().toLowerCase();
  const rows = CATALOG.filter(r => (catFilter === 'all' || r[0] === catFilter) && (!q || r.join(' ').toLowerCase().includes(q)));
  document.getElementById('catCount').textContent = `${rows.length} chi tiết`;
  document.getElementById('catBody').innerHTML = rows.map(r => `<tr>
    <td><span class="sys">${r[0]}</span><b>${r[1]}</b><small>${r[2]}</small></td>
    <td>${r[3]}</td><td>${r[4]}</td><td class="spec">${r[5]}</td><td class="mono">${r[6]}</td><td>${r[7]}</td><td class="muted">${r[8] || '—'}</td></tr>`).join('')
    || '<tr><td colspan="7" class="muted">Không có chi tiết khớp. Thử từ khóa khác, ví dụ “CKP”, “P0420”, “quạt”.</td></tr>';
}

/* ---------- bảo dưỡng & thông số ---------- */
document.getElementById('maintBody').innerHTML = MAINT.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td class="muted">${r[2]}</td></tr>`).join('');
document.getElementById('specBody').innerHTML = SPECS.map(r => `<tr><td>${r[0]}</td><td class="spec">${r[1]}</td></tr>`).join('');
document.getElementById('procBody').innerHTML = PROCS.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td></tr>`).join('');
document.getElementById('toolBody').innerHTML = TOOLS.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td></tr>`).join('');

/* ---------- khởi động ---------- */
renderSymList(); renderDiag(); renderCatalog();
goStep(0); setPlay(playing);
showTab('van-hanh');
window.addEventListener('resize', () => { if (LABV.on) fitScope(); });
/* cầu nối cho học viện (IIFE thứ hai) */
window.LAB = {
  showTab: id => showTab(TABS.includes(id) ? id : 'van-hanh'),
  visible(on) { LABV.on = !!on; if (on && !LABV.running) { LABV.running = true; last = performance.now(); requestAnimationFrame(frame); } },
  selectSymptom: id => { if (SYMPTOMS.some(s => s.id === id)) selectSymptom(id); },
  data: { PARTS, CATALOG, SYMPTOMS, STEPS, WORKFLOW }
};
