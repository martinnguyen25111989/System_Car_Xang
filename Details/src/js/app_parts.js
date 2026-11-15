/* ===== CẤU TẠO ĐỘNG CƠ – SƠ ĐỒ TÁCH RỜI (EXPLODED VIEW) ===== */
const svgX = document.getElementById('engX');
const PX = {};
const CCX = [355, 425, 495, 565];
const VX = []; CCX.forEach(c => { VX.push([c - 12, 'in']); VX.push([c + 12, 'ex']); });
const MAINS = [320, 390, 460, 530, 600];
const PBYID = Object.fromEntries(PARTS.map(p => [p.id, p]));
const XL = { side: E('g', {}, svgX), inner: E('g', {}, svgX), house: E('g', {}, svgX), top: E('g', {}, svgX), badge: E('g', {}, svgX) };
function XP(id, layer, core) {
  const p = PBYID[id];
  const g = E('g', { class: 'xp' + (core ? ' core' : ''), 'data-p': id, tabindex: 0, role: 'button', 'aria-label': (p.n ? p.n + '. ' : '') + p.vn }, XL[layer]);
  E('title', {}, g).textContent = (p.n ? p.n + '. ' : '') + p.vn + ' – ' + p.en;
  PX[id] = g; return g;
}
const R = (g, x, y, w, h, rx, c) => E('rect', { x, y, width: w, height: h, rx, class: c }, g);
const Ci = (g, cx, cy, r, c) => E('circle', { cx, cy, r, class: c }, g);
const Pa = (g, d, c) => E('path', { d, class: c }, g);
const Li = (g, x1, y1, x2, y2, c) => E('line', { x1, y1, x2, y2, class: c }, g);
const El = (g, cx, cy, rx, ry, c) => E('ellipse', { cx, cy, rx, ry, class: c }, g);

/* ---------- chi tiết bên cạnh ---------- */
{ const g = XP('chain', 'side'); Pa(g, 'M279,690 L279,134 A17,17 0 0 1 313,134 L313,690 A17,17 0 0 1 279,690 Z', 'chainx'); Ci(g, 296, 690, 10, 'pb st'); Ci(g, 296, 134, 13, 'pb st'); }
{ const g = XP('tensioner', 'side'); Pa(g, 'M272,300 Q264,450 272,600', 'shoe'); R(g, 244, 420, 24, 30, 4, 'pb al'); Li(g, 268, 435, 272, 435, 'shoe'); Li(g, 318, 240, 318, 620, 'shoe'); }
{ const g = XP('damper', 'side'); Ci(g, 210, 690, 24, 'pb st'); Ci(g, 210, 690, 18, 'grvc'); Ci(g, 210, 690, 12, 'grvc'); Ci(g, 210, 690, 5, 'pb dk'); Li(g, 210, 666, 210, 672, 'markx'); }
{ const g = XP('belt', 'side'); Pa(g, 'M191,455 L234,690 A24,24 0 0 1 210,714 L121,820 A22,22 0 0 1 83,805 L82,560 A28,28 0 0 1 110,532 L175,439 A16,16 0 0 1 191,455 Z', 'beltx');
  Li(g, 170, 762, 192, 790, 'armx'); Ci(g, 170, 762, 9, 'pb st'); Ci(g, 192, 790, 5, 'pb dk'); }
{ const g = XP('alt', 'side'); Ci(g, 110, 560, 28, 'pb al'); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; Li(g, 110 + 14 * Math.cos(a), 560 + 14 * Math.sin(a), 110 + 25 * Math.cos(a), 560 + 25 * Math.sin(a), 'fin2'); } Ci(g, 110, 560, 9, 'pb st'); }
{ const g = XP('wpump', 'side'); R(g, 152, 448, 46, 36, 8, 'pb al'); Ci(g, 175, 455, 16, 'pb st'); Ci(g, 175, 455, 5, 'pb dk'); }
{ const g = XP('thermo', 'side'); Pa(g, 'M136,383 C160,383 170,405 172,439', 'hosex'); R(g, 104, 372, 32, 22, 5, 'pb al'); Ci(g, 120, 383, 6, 'pb dk'); }
{ const g = XP('accomp', 'side'); Ci(g, 105, 805, 22, 'pb al'); Ci(g, 105, 805, 14, 'pb st'); Ci(g, 105, 805, 4, 'pb dk'); }
{ const g = XP('airbox', 'side'); R(g, 712, 172, 16, 18, 0, 'pb pl'); R(g, 650, 130, 140, 44, 8, 'pb pl'); for (let k = 0; k < 6; k++) Li(g, 664 + k * 22, 138, 664 + k * 22, 166, 'rib'); }
{ const g = XP('throttle', 'side'); Ci(g, 720, 206, 18, 'pb al'); Li(g, 708, 196, 732, 216, 'platex'); R(g, 742, 198, 18, 16, 3, 'pb dk'); }
{ const g = XP('intake', 'side'); for (let i = 0; i < 4; i++) Pa(g, `M${668 + i * 36},258 C${668 + i * 36},300 650,${300 + i * 12} 604,${300 + i * 12}`, 'runx');
  R(g, 640, 232, 160, 26, 10, 'pb pl'); }
{ const g = XP('inj', 'side'); R(g, 640, 350, 150, 8, 3, 'pb fu'); for (let i = 0; i < 4; i++) { R(g, 654 + i * 36, 358, 8, 20, 2, 'pb injx'); Pa(g, `M${655 + i * 36},378 L${658 + i * 36},386 L${661 + i * 36},378 Z`, 'pb dk'); } }
{ const g = XP('exman', 'side'); for (let i = 0; i < 4; i++) Pa(g, `M604,${404 + i * 12} C650,${404 + i * 12} 690,430 722,440`, 'exhx'); Ci(g, 722, 440, 9, 'pb st'); }
{ const g = XP('cat', 'side'); Pa(g, 'M762,500 V522 H806', 'exhx thin'); R(g, 740, 428, 44, 72, 16, 'pb catx'); R(g, 726, 434, 14, 8, 2, 'pb sen'); R(g, 784, 474, 14, 8, 2, 'pb sen');
  for (let k = 0; k < 4; k++) Li(g, 748, 446 + k * 12, 776, 446 + k * 12, 'rib'); }
{ const g = XP('flywheel', 'side'); Ci(g, 660, 690, 44, 'teeth'); Ci(g, 660, 690, 40, 'pb st'); Ci(g, 660, 690, 26, 'grvc'); Ci(g, 660, 690, 9, 'pb dk');
  for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; Ci(g, 660 + 17 * Math.cos(a), 690 + 17 * Math.sin(a), 2.5, 'pb dk'); } }
{ const g = XP('starter', 'side'); R(g, 714, 704, 80, 30, 10, 'pb al'); R(g, 758, 694, 28, 11, 3, 'pb dk'); Ci(g, 706, 718, 8, 'pb st'); for (let k = 0; k < 4; k++) Li(g, 728 + k * 14, 708, 728 + k * 14, 730, 'rib'); }
{ const g = XP('oilfilter', 'side'); R(g, 696, 766, 54, 8, 3, 'pb dk'); R(g, 700, 774, 46, 56, 8, 'pb fltx'); for (let k = 0; k < 6; k++) Li(g, 708 + k * 6, 780, 708 + k * 6, 824, 'rib'); }
{ const g = XP('rings', 'side'); [524, 538, 552].forEach((y, k) => { El(g, 690, y, 26, 6, k === 2 ? 'ringo' : 'ringx'); Li(g, 712, y - 3, 716, y + 2, 'gap'); }); }
{ const g = XP('plug', 'side'); R(g, 684, 8, 12, 10, 2, 'pb st'); R(g, 681, 18, 18, 28, 5, 'pb cer'); R(g, 677, 46, 26, 10, 2, 'pb st'); R(g, 682, 56, 16, 16, 1, 'pb thr');
  for (let k = 0; k < 4; k++) Li(g, 682, 59 + k * 4, 698, 60 + k * 4, 'rib'); Li(g, 690, 72, 690, 79, 'elec'); Pa(g, 'M684,79 H694 V76', 'elec'); T(708, 48, '×4', 'xtag', g); }
{ const g = XP('vtecsol', 'side'); Li(g, 590, 197, 632, 197, 'oilln'); R(g, 632, 188, 26, 18, 4, 'pb dk'); R(g, 658, 192, 9, 10, 2, 'pb pl'); }
{ const g = XP('knock', 'side'); R(g, 600, 460, 14, 14, 3, 'pb sen'); Ci(g, 607, 467, 3, 'pb st'); }

/* ---------- chi tiết bên trong (lõi) ---------- */
{ const g = XP('cams', 'inner', true); Li(g, 300, 134, 600, 134, 'shaftx'); Li(g, 300, 172, 600, 172, 'shaftx');
  VX.forEach(([x]) => { El(g, x, 134, 6, 10, 'pb lobe'); El(g, x, 172, 6, 10, 'pb lobe'); });
  MAINS.forEach(x => { R(g, x - 4, 129, 8, 10, 2, 'pb st'); R(g, x - 4, 167, 8, 10, 2, 'pb st'); });
  T(604, 137, 'xả', 'xtag', g); T(604, 175, 'nạp', 'xtag', g); }
{ const g = XP('vtc', 'inner', true); Li(g, 260, 171, 279, 171, 'oilln'); R(g, 246, 160, 14, 22, 3, 'pb dk'); Ci(g, 296, 172, 17, 'pb vtcx');
  for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + 0.4; Li(g, 296, 172, 296 + 12 * Math.cos(a), 172 + 12 * Math.sin(a), 'vane'); } Ci(g, 296, 172, 4, 'pb dk'); }
{ const g = XP('rocker', 'inner', true); VX.forEach(([x]) => { R(g, x - 9, 192, 18, 10, 4, 'pb st'); Ci(g, x, 197, 3.5, 'pb dk'); }); }
{ const g = XP('springs', 'inner', true); VX.forEach(([x]) => { Li(g, x - 7, 212, x + 7, 212, 'ret');
  Pa(g, `M${x - 6},214 L${x + 6},218 L${x - 6},222 L${x + 6},226 L${x - 6},230 L${x + 6},234 L${x - 6},238`, 'spr'); }); }
{ const g = XP('valves', 'inner', true); VX.forEach(([x, t]) => { const w = t === 'in' ? 9 : 7; Li(g, x, 244, x, 268, 'stem');
  Pa(g, `M${x - 2},266 L${x - w},274 L${x + w},274 L${x + 2},266 Z`, 'pb ' + (t === 'in' ? 'vin' : 'vex')); }); }
{ const g = XP('piston', 'inner', true); CCX.forEach(c => { R(g, c - 25, 520, 50, 34, 4, 'pb pis'); [526, 531, 536].forEach(y => Li(g, c - 25, y, c + 25, y, 'grv2')); Ci(g, c, 545, 5, 'pb dk'); }); }
{ const g = XP('rod', 'inner', true); CCX.forEach(c => { Ci(g, c, 570, 7, 'rodr'); R(g, c - 5, 577, 10, 32, 3, 'pb st'); Ci(g, c, 622, 13, 'rodr'); Li(g, c - 16, 622, c + 16, 622, 'split'); }); }
{ const g = XP('bearings', 'inner', true); MAINS.forEach(x => Pa(g, `M${x - 12},642 A12,8 0 0 0 ${x + 12},642`, 'brg')); CCX.forEach(c => Pa(g, `M${c - 10},654 A10,6 0 0 1 ${c + 10},654`, 'brg')); }
{ const g = XP('crank', 'inner', true); Li(g, 210, 690, 660, 690, 'shaftx thick');
  CCX.forEach((c, i) => { const up = i === 0 || i === 3, py = up ? 668 : 712;
    Pa(g, up ? `M${c - 30},698 A30,20 0 0 0 ${c + 30},698 Z` : `M${c - 30},682 A30,20 0 0 1 ${c + 30},682 Z`, 'pb cwx');
    R(g, c - 28, Math.min(690, py) - (up ? 0 : 0), 8, Math.abs(690 - py), 2, 'pb st'); R(g, c + 20, Math.min(690, py), 8, Math.abs(690 - py), 2, 'pb st');
    R(g, c - 22, py - 6, 44, 12, 3, 'pb st2'); });
  MAINS.forEach(x => R(g, x - 8, 682, 16, 16, 3, 'pb st2'));
  for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; if (k === 0) continue; Li(g, 336 + 14 * Math.cos(a), 690 + 14 * Math.sin(a), 336 + 17 * Math.cos(a), 690 + 17 * Math.sin(a), 'tooth2'); } }
{ const g = XP('oilpump', 'inner', true); R(g, 330, 762, 70, 26, 6, 'pb al'); Ci(g, 352, 775, 8, 'pb st'); Ci(g, 376, 775, 8, 'pb st'); }
{ const g = XP('strainer', 'inner', true); Pa(g, 'M365,788 C365,812 400,822 424,822', 'pipex'); El(g, 450, 822, 26, 7, 'mesh'); }

/* ---------- vỏ (thân máy, nắp máy…) ---------- */
{ const g = XP('head', 'house', true); R(g, 320, 286, 280, 60, 4, 'pb hs');
  CCX.forEach(c => { Pa(g, `M${c - 26},346 A26,12 0 0 1 ${c + 26},346`, 'chm'); Ci(g, c, 300, 4, 'hole'); R(g, c - 33, 306, 8, 26, 3, 'wj'); });
  T(332, 300, 'NẮP MÁY', 'xin', g); }
{ const g = XP('hgasket', 'house', true); R(g, 320, 360, 280, 8, 2, 'pb gk'); CCX.forEach(c => El(g, c, 364, 27, 2.4, 'hole')); }
{ const g = XP('block', 'house', true); R(g, 320, 384, 280, 120, 4, 'pb hs');
  CCX.forEach(c => { R(g, c - 35, 392, 70, 100, 8, 'wj2'); R(g, c - 30, 384, 60, 120, 0, 'bore2'); Li(g, c - 30, 384, c - 30, 504, 'liner'); Li(g, c + 30, 384, c + 30, 504, 'liner'); });
  T(332, 500, 'THÂN MÁY', 'xin', g); }
{ const g = XP('lowblock', 'house', true); R(g, 320, 728, 280, 22, 3, 'pb hs'); MAINS.forEach(x => Pa(g, `M${x - 12},728 A12,9 0 0 0 ${x + 12},728 Z`, 'pb dk')); }
{ const g = XP('oilpan', 'house', true); Pa(g, 'M320,842 H600 L585,900 H335 Z', 'pb hs'); Ci(g, 560, 893, 5, 'pb st'); T(332, 862, 'CÁC-TE', 'xin', g); }
{ const g = XP('vcover', 'house', true); R(g, 320, 74, 280, 40, 10, 'pb vc'); for (let k = 0; k < 13; k++) Li(g, 332 + k * 20, 84, 332 + k * 20, 106, 'rib');
  CCX.forEach(c => El(g, c, 78, 10, 3, 'hole')); Ci(g, 586, 96, 8, 'pb cap'); }
{ const g = XP('coil', 'top', true); CCX.forEach(c => { R(g, c - 11, 8, 22, 10, 3, 'pb dk'); R(g, c - 8, 18, 16, 40, 4, 'pb coilx'); }); }

/* ---------- số hiệu ---------- */
const BPOS = { coil: [326, 30], plug: [664, 24], vcover: [336, 94], cams: [336, 153], vtc: [240, 198], rocker: [612, 199], vtecsol: [674, 197],
  springs: [612, 226], valves: [612, 262], head: [612, 352], hgasket: [612, 372], block: [612, 392], knock: [628, 490], piston: [612, 537],
  rings: [650, 524], rod: [612, 595], bearings: [612, 640], crank: [460, 664], lowblock: [612, 739], oilpump: [420, 775], strainer: [494, 822],
  oilpan: [612, 870], oilfilter: [684, 800], chain: [262, 262], tensioner: [236, 470], damper: [196, 650], belt: [60, 690], alt: [146, 594],
  wpump: [208, 440], thermo: [90, 383], accomp: [140, 836], airbox: [636, 152], throttle: [690, 206], intake: [816, 245], inj: [806, 366],
  exman: [676, 470], cat: [806, 452], flywheel: [700, 652], starter: [812, 719] };
PARTS.filter(p => p.n).forEach(p => {
  const [x, y] = BPOS[p.id]; const g = E('g', { class: 'xb', 'data-p': p.id }, XL.badge);
  Ci(g, x, y, 10, 'xbc'); T(x, y + 4, String(p.n), 'xbt', g, 'middle'); E('title', {}, g).textContent = p.vn;
});

/* ---------- tương tác ---------- */
let selPart = 'block';
const partCard = document.getElementById('partCard');
function selectPart(id, scroll) {
  selPart = id; const p = PBYID[id];
  svgX.querySelectorAll('.xp,.xb').forEach(el => el.classList.toggle('sel', el.dataset.p === id));
  document.querySelectorAll('[data-pl]').forEach(el => el.classList.toggle('act', el.dataset.pl === id));
  const sym = p.dx ? SYMPTOMS.find(s => s.id === p.dx) : null; const st = p.st ? STEPS[p.st.charCodeAt(0) - 65] : null;
  partCard.innerHTML = `
    <div class="pc-head"><span class="pc-n">${p.n || '+'}</span><div><div class="sc-ph">${p.g}</div><h2>${p.vn}</h2><div class="pc-en">${p.en}</div></div></div>
    <dl class="pc-dl">
      <dt>Vị trí</dt><dd>${p.loc}</dd>
      <dt>Chức năng</dt><dd>${p.fn}</dd>
      <dt>Cấu tạo & vật liệu</dt><dd>${p.build}</dd>
      <dt>Thông số</dt><dd class="spec">${p.spec}</dd>
      <dt>Hư hỏng → triệu chứng</dt><dd>${p.fail}</dd>
      <dt>Kiểm tra & bảo dưỡng</dt><dd>${p.maint}</dd>
    </dl>
    <div class="pc-btns">${sym ? `<button type="button" class="btn sm" data-go="dx">Cây chẩn đoán: ${sym.t} →</button>` : ''}${st ? `<button type="button" class="btn ghost sm" data-go="st">Xem bước ${st.k} trong luồng vận hành →</button>` : ''}</div>
    ${p.n ? '' : '<p class="note">Chi tiết này không vẽ riêng trên sơ đồ.</p>'}`;
  const bd = partCard.querySelector('[data-go="dx"]'); if (bd) bd.addEventListener('click', () => { selectSymptom(p.dx); showTab('chan-doan'); window.scrollTo({ top: 0 }); });
  const bs = partCard.querySelector('[data-go="st"]'); if (bs) bs.addEventListener('click', () => { setPlay(false); goStep(p.st.charCodeAt(0) - 65); showTab('van-hanh'); window.scrollTo({ top: 0 }); });
  if (scroll) document.getElementById('engStage').scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
}
svgX.addEventListener('click', e => { const t = e.target.closest('[data-p]'); if (t) selectPart(t.dataset.p); });
svgX.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset && e.target.dataset.p) { e.preventDefault(); selectPart(e.target.dataset.p); } });

/* chú giải đánh số */
const legendEl = document.getElementById('partLegend');
legendEl.innerHTML = PGROUPS.map(gn => {
  const items = PARTS.filter(p => p.g === gn).sort((a, b) => (a.n || 99) - (b.n || 99));
  return `<div class="plg"><div class="sgh">${gn}</div>${items.map(p => `<button type="button" class="plb" data-pl="${p.id}"><span class="pln${p.n ? '' : ' x'}">${p.n || '+'}</span>${p.vn}</button>`).join('')}</div>`;
}).join('');
legendEl.querySelectorAll('[data-pl]').forEach(b => b.addEventListener('click', () => selectPart(b.dataset.pl)));

/* lắp ghép / tách rời */
const DY = { coil: 242, vcover: 202, cams: 150, vtc: 150, rocker: 110, springs: 102, valves: 102, head: 30, hgasket: 16, block: 0,
  piston: -120, rod: -135, bearings: -138, crank: -167, lowblock: -181, oilpump: -189, strainer: -189, oilpan: -271 };
const bAsm = document.getElementById('bAsm');
bAsm.addEventListener('click', () => {
  const on = !svgX.classList.contains('asm'); svgX.classList.toggle('asm', on);
  Object.entries(DY).forEach(([id, dy]) => { PX[id].style.transform = on ? `translate(0px,${dy}px)` : ''; });
  bAsm.textContent = on ? 'Tách rời từng bộ phận' : 'Lắp ghép lại'; bAsm.setAttribute('aria-pressed', on);
});

/* bảng đầy đủ */
const pSearch = document.getElementById('partSearch');
function renderPartTable() {
  const q = pSearch.value.trim().toLowerCase();
  let html = '';
  PGROUPS.forEach(gn => {
    const rows = PARTS.filter(p => p.g === gn && (!q || Object.values(p).join(' ').toLowerCase().includes(q))).sort((a, b) => (a.n || 99) - (b.n || 99));
    if (!rows.length) return;
    html += `<tr class="grp"><td colspan="6">${gn}</td></tr>` + rows.map(p => `<tr data-row="${p.id}">
      <td class="num">${p.n || '+'}</td><td><b>${p.vn}</b><small>${p.en}</small><small>${p.loc}</small></td><td>${p.fn}</td>
      <td>${p.build}<span class="spec d">${p.spec}</span></td><td>${p.fail}</td><td class="muted">${p.maint}</td></tr>`).join('');
  });
  document.getElementById('partBody').innerHTML = html || '<tr><td colspan="6" class="muted">Không có bộ phận khớp từ khóa.</td></tr>';
  document.getElementById('partCount').textContent = `${PARTS.length} bộ phận · ${PARTS.filter(p => p.n).length} có trên sơ đồ`;
  document.querySelectorAll('[data-row]').forEach(r => r.addEventListener('click', () => selectPart(r.dataset.row, true)));
}
pSearch.addEventListener('input', renderPartTable);
document.getElementById('engSpecs').innerHTML = ENG_SPECS.map(s => `<div class="es"><span>${s[0]}</span><b>${s[1]}</b></div>`).join('');
renderPartTable(); selectPart('block');
