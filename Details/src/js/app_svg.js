/* ===== XÂY DỰNG SƠ ĐỒ KIẾN TRÚC E/E (SVG) ===== */
const NS = 'http://www.w3.org/2000/svg';
const svg = document.getElementById('arch');
function E(tag, a, p) { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
function T(x, y, txt, cls, p, anchor) { const t = E('text', { x, y, class: cls || 'lbl' }, p); if (anchor) t.setAttribute('text-anchor', anchor); t.textContent = txt; return t; }

const G = {};
[['commW','comm'],['elecW','elec'],['elexW','elex'],['flow','meca'],['meca','meca'],['elec','elec'],['elex','elex'],['comm','comm'],['dyn','meca'],['pk','comm'],['zone','']]
  .forEach(([k, l]) => { G[k] = E('g', l ? { 'data-layer': l } : { class: 'zones' }, svg); });

const C = (id, p) => E('g', { class: 'cmp', 'data-c': id }, p);
const box = (g, x, y, w, h, rx = 6, cls = 'body') => E('rect', { x, y, width: w, height: h, rx, class: cls }, g);
const W = (id, d, type) => E('path', { d, class: 'wire t-' + type, 'data-c': id },
  type === 'bp' || type === 'ig' || type === 'big' ? G.elecW : G.elexW);
const F = (id, d, type) => E('path', { d, class: 'flowp f-' + type, id: id }, G.flow);
function relay(id, x, y, label, p) {
  const g = C(id, p); box(g, x, y, 96, 26, 4);
  E('circle', { cx: x + 85, cy: y + 13, r: 4, class: 'led' }, g);
  T(x + 7, y + 17, label, 'lbl rl', g); return g;
}

/* ---------- ZONE LABELS ---------- */
T(20, 20, 'LỚP 4 · TRUYỀN THÔNG — F-CAN ~500 kbps', 'zl', G.zone);
T(790, 20, 'B-CAN ~125 kbps · LIN ~19,2 kbps', 'zl', G.zone);
T(26, 160, 'LỚP 2 · ĐIỆN — NGUỒN & PHÂN PHỐI', 'zl', G.zone);
T(372, 740, 'LỚP 1 · CƠ KHÍ — 1.5L DOHC i-VTEC · 4 xi-lanh · thứ tự nổ 1-3-4-2', 'zl', G.zone);
T(1096, 742, 'TRUYỀN LỰC', 'zl', G.zone);

/* ---------- LỚP 4: BUS CAN / LIN ---------- */
const bus = (id, d, cls) => E('path', { d, class: 'bus ' + cls, 'data-c': id }, G.commW);
bus('fcan', 'M20,53 H650', 'canh'); bus('fcan', 'M20,59 H650', 'canl');
bus('bcan', 'M770,53 H1262', 'bcanh'); bus('bcan', 'M770,59 H1262', 'bcanl');
[56, 144, 230, 310, 402].forEach(x => { bus('fcan', `M${x - 2},53 V72`, 'canh'); bus('fcan', `M${x + 2},59 V72`, 'canl'); });
bus('fcan', 'M557,53 V165', 'canh'); bus('fcan', 'M563,59 V165', 'canl');
[824, 924, 1014, 1095, 1203].forEach(x => { bus('bcan', `M${x - 2},53 V72`, 'bcanh'); bus('bcan', `M${x + 2},59 V72`, 'bcanl'); });
bus('lin', 'M824,112 V128 H1256', 'lin');
T(24, 47, 'CAN-H / CAN-L', 'lbl sm', G.zone);

function node(id, x, w, l1, l2, y = 72, h = 40) {
  const g = C(id, G.elex); box(g, x, y, w, h, 6, 'body node');
  T(x + w / 2, y + 17, l1, 'nt', g, 'middle'); if (l2) T(x + w / 2, y + 31, l2, 'ns', g, 'middle'); return g;
}
node('dlc', 20, 72, 'DLC OBD-II', 'chân 6 · 14');
node('vsa', 104, 80, 'ABS / VSA', 'modulator');
node('eps', 196, 68, 'EPS', 'trợ lực lái');
node('srs', 276, 68, 'SRS', 'túi khí');
node('cam', 356, 92, 'HONDA SENSING', 'camera kính lái');
{ const g = C('gw', G.elex); box(g, 650, 34, 120, 78, 8, 'body node gwb');
  T(710, 58, 'CỤM ĐỒNG HỒ', 'nt', g, 'middle'); T(710, 73, 'Gauge control', 'ns', g, 'middle');
  T(710, 92, 'GATEWAY F ↔ B', 'nt gwt', g, 'middle'); }
node('micu', 782, 84, 'MICU (BCM)', 'hộp cầu chì táp-lô');
node('key', 876, 96, 'KEYLESS / IMMO', 'anten LF · bộ thu RF');
node('hvac', 982, 64, 'HVAC', 'điều hòa');
node('audio', 1056, 78, 'MÀN HÌNH', 'audio · CarPlay');
node('park', 1144, 118, 'CAMERA LÙI', 'cảm biến đỗ');
{ const g = C('door', G.elex); box(g, 1060, 119, 90, 18, 4, 'body node'); T(1105, 132, 'Cửa ×4 · kính (LIN)', 'ns2', g, 'middle'); }
{ const g = C('lamp', G.elex); box(g, 1160, 119, 96, 18, 4, 'body node'); T(1208, 132, 'Đèn · gạt mưa (LIN)', 'ns2', g, 'middle'); }

/* ---------- LỚP 2: NGUỒN ---------- */
{ const g = C('battery', G.elec); box(g, 30, 176, 92, 58, 6);
  E('rect', { x: 42, y: 170, width: 14, height: 7, class: 'term p' }, g); E('rect', { x: 96, y: 170, width: 14, height: 7, class: 'term' }, g);
  T(76, 196, 'ẮC QUY 12 V', 'nt', g, 'middle'); const v = T(76, 222, '12,6 V', 'val', g, 'middle'); v.id = 'batV'; }
{ const g = C('mainfuse', G.elec); box(g, 140, 186, 100, 36, 6); T(190, 201, 'CẦU CHÌ CHÍNH', 'nt', g, 'middle'); T(190, 214, 'FL / MAIN', 'ns', g, 'middle'); }
{ const g = C('uhbox', G.elec); box(g, 26, 252, 214, 168, 8, 'body boxc'); T(34, 266, 'HỘP CẦU CHÌ / RƠ-LE KHOANG MÁY', 'ns hb', g); }
relay('r-main1', 34, 274, 'PGM-FI Main 1', G.elec);
relay('r-main2', 34, 306, 'PGM-FI Main 2', G.elec);
relay('r-st', 34, 338, 'Starter cut', G.elec);
relay('r-fan', 138, 274, 'Quạt két nước', G.elec);
relay('r-ac', 138, 306, 'Ly hợp A/C', G.elec);
{ const g = C('fbig', G.elec); box(g, 138, 338, 96, 26, 4); T(145, 355, 'Cầu chì ABS · EPS', 'lbl rl', g); }
{ const g = E('g', {}, G.elec); ['FI', 'ST', 'IG', 'FAN', 'A/C', 'HORN'].forEach((n, i) => {
  E('rect', { x: 36 + i * 33, y: 378, width: 24, height: 12, rx: 2, class: 'fuse' }, g); T(48 + i * 33, 404, n, 'ns', g, 'middle'); }); }
{ const g = C('udbox', G.elec); box(g, 26, 440, 214, 108, 8, 'body boxc'); T(34, 454, 'HỘP CẦU CHÌ DƯỚI TÁP-LÔ', 'ns hb', g);
  T(186, 510, 'Chế độ nguồn', 'ns', g, 'middle'); const pm = T(186, 530, 'OFF', 'val', g, 'middle'); pm.id = 'pmTxt'; }
relay('r-acc', 34, 462, 'ACC', G.elec);
relay('r-ig1', 34, 494, 'IG1', G.elec);
relay('r-ig2', 138, 462, 'IG2', G.elec);
{ const g = C('g1', G.elec); E('path', { d: 'M52,566 V578 M42,578 H62 M45,583 H59 M49,588 H55', class: 'gnd' }, g); T(68, 584, 'G1 mass động cơ', 'ns', g); }

/* dây nguồn */
W('w-bat', 'M122,204 H140', 'bp');
W('w-main', 'M190,222 V252', 'bp');
W('w-ud', 'M132,420 V440', 'bp');
W('w-alt', 'M190,610 H104 V234', 'bp');
W('w-m1', 'M82,287 H252 V150 H486 V165', 'bp');
W('w-ig1', 'M82,507 H256 V154 H470 V165', 'ig');
W('w-pump', 'M82,319 H248 V138 H1052 V404 H1112', 'bp');
W('w-fan', 'M186,287 H260 V142 H984 V452 H970', 'bp');
W('w-ac', 'M186,319 H266 V700 H252', 'bp');
W('w-st', 'M82,351 H244 V752 H834 V728', 'bp');
W('w-stb', 'M30,214 H18 V760 H846 V728', 'big');

/* ---------- LỚP 3: PCM & dây tín hiệu ---------- */
W('s-iat', 'M301,232 H346 V176 H450', 'ana');
W('s-tp', 'M312,272 H334 V186 H450', 'ana');
W('a-dbw', 'M450,196 H340 V286 H312', 'pwm');
W('a-altc', 'M450,206 H318 V560 H200 V580', 'pwm');
W('a-vtc', 'M450,216 H322 V409 H330', 'pwm');
W('s-cmp', 'M330,391 H326 V226 H450', 'dig');
W('s-ckp', 'M310,695 H298 V238 H450', 'dig');
W('s-map', 'M480,252 V245', 'ana');
W('a-purge', 'M458,245 V258 H440', 'pwm');
W('a-inj', 'M520,245 V250 M388,250 H688 M388,250 V298 M488,250 V298 M588,250 V298 M688,250 V298', 'pwm');
W('a-ign', 'M590,245 V256 M410,256 H710 M410,256 V356 M510,256 V356 M610,256 V356 M710,256 V356', 'pwm');
W('s-o2', 'M934,310 V176 H650', 'ana');
W('s-af', 'M830,310 V188 H650', 'ana');
W('s-knock', 'M774,519 H802 V200 H650', 'ana');
W('a-vtec', 'M650,212 H796 V400 H774', 'dig');
W('s-ect', 'M774,362 H790 V224 H650', 'ana');
W('a-cvt', 'M650,234 H1034 V748 H938 V734', 'pwm');
W('s-cvt', 'M930,606 V584 H1028 V242 H650 M1020,646 V584', 'dig');
W('s-brake', 'M1102,230 H1076 V156 H615 V165', 'dig');
W('s-app', 'M1102,266 H1069 V161 H630 V165', 'ana');
W('s-range', 'M1102,302 H1062 V151 H600 V165', 'dig');
W('s-btn', 'M1100,198 H948 V112', 'dig');
W('s-wss', 'M1224,678 H1272 V116 H144 V112', 'dig');

{ const g = C('pcm', G.elex); box(g, 450, 165, 200, 80, 8, 'body pcmb');
  T(550, 190, 'PCM', 'pcmt', g, 'middle'); T(550, 206, 'ECU động cơ + điều khiển CVT', 'ns', g, 'middle');
  const m = T(550, 226, 'Chờ', 'val sm', g, 'middle'); m.id = 'pcmMode';
  for (let i = 0; i < 9; i++) { E('rect', { x: 466 + i * 20, y: 241, width: 8, height: 4, class: 'pin' }, g); } }

/* ---------- LỚP 1: CƠ KHÍ ---------- */
/* dòng chảy */
F('fAir', 'M299,186 V279 H744', 'air');
F('fExh', 'M426,340 V330 H1024', 'exh');
F('fFuel', 'M1112,404 H1040 V296 H704', 'fuel');
F('fCool1', 'M774,382 H864 V388', 'cool');
F('fCool2', 'M864,516 V566 H760', 'cool');
F('fChain', 'M342,380 L340,640 M354,380 L350,640', 'chain');

{ const g = C('airf', G.meca); box(g, 270, 180, 58, 40, 6); T(299, 204, 'Lọc gió', 'ns', g, 'middle'); }
E('rect', { x: 290, y: 220, width: 18, height: 46, class: 'duct' }, G.meca);
{ const g = C('plenum', G.meca); box(g, 312, 266, 436, 24, 10, 'body plen'); T(620, 282, 'Cổ hút (plenum)', 'ns', g, 'middle'); }
/* xả */
E('rect', { x: 420, y: 324, width: 400, height: 12, rx: 5, class: 'exhp' }, G.meca);
E('rect', { x: 820, y: 326, width: 24, height: 8, class: 'exhp' }, G.meca);
E('rect', { x: 914, y: 326, width: 110, height: 8, class: 'exhp' }, G.meca);
T(1024, 350, 'khí xả →', 'ns', G.meca, 'end');
{ const g = C('cat', G.meca); box(g, 844, 316, 70, 28, 10, 'body catb'); T(879, 334, 'Xúc tác 3 chiều', 'ns2', g, 'middle'); }
const CX = [410, 510, 610, 710];
CX.forEach(c => {
  E('rect', { x: c + 16, y: 330, width: 12, height: 22, class: 'exhp' }, G.meca);
  E('rect', { x: c - 28, y: 288, width: 12, height: 64, rx: 2, class: 'runner' }, G.meca);
});
{ const g = C('rail', G.meca); box(g, 372, 294, 336, 7, 3, 'body railb'); T(712, 301, 'Ray xăng', 'ns', g); }
{ const g = C('tb', G.elex); box(g, 274, 264, 38, 30, 5); const pl = E('line', { x1: 293, y1: 268, x2: 293, y2: 290, class: 'plate', id: 'tPlate' }, g); T(293, 308, 'Bướm ga DBW', 'ns', g, 'middle'); }
{ const g = C('iat', G.elex); E('circle', { cx: 299, cy: 232, r: 5, class: 'body sens' }, g); T(286, 235, 'IAT', 'ns', g, 'end'); }
{ const g = C('map', G.elex); box(g, 471, 252, 18, 12, 3, 'body sens'); T(480, 249, 'MAP', 'ns', g, 'middle'); }
{ const g = C('purge', G.elex); box(g, 420, 252, 20, 12, 3, 'body sens'); T(412, 262, 'EVAP', 'ns', g, 'end'); }
{ const g = C('af', G.elex); box(g, 826, 310, 8, 16, 2, 'body sens'); T(830, 306, 'A/F', 'ns', g, 'middle'); }
{ const g = C('o2', G.elex); box(g, 930, 310, 8, 16, 2, 'body sens'); T(934, 306, 'O2', 'ns', g, 'middle'); }

/* thân máy, nắp máy, hộp trục khuỷu */
E('rect', { x: 350, y: 600, width: 420, height: 110, rx: 18, class: 'case' }, G.meca);
E('rect', { x: 360, y: 432, width: 400, height: 168, class: 'blockm' }, G.meca);
E('rect', { x: 360, y: 350, width: 400, height: 82, rx: 4, class: 'headm' }, G.meca);
E('line', { x1: 300, y1: 655, x2: 796, y2: 655, class: 'shaft' }, G.meca);

const cyl = [];
const dyn = G.dyn;
CX.forEach((c, i) => {
  E('rect', { x: c - 34, y: 432, width: 68, height: 168, class: 'bore' }, dyn);
  const o = {};
  o.gas = E('rect', { x: c - 34, y: 432, width: 68, height: 10, class: 'gas' }, dyn);
  o.stroke = T(c, 594, '', 'stk', dyn, 'middle');
  o.cw = E('circle', { cx: c, cy: 655, r: 24, class: 'cw' }, dyn);
  o.throw = E('line', { x1: c, y1: 655, x2: c, y2: 610, class: 'throw' }, dyn);
  o.rod = E('line', { x1: c, y1: 460, x2: c, y2: 610, class: 'rod' }, dyn);
  o.pin = E('circle', { cx: c, cy: 610, r: 8, class: 'cpin' }, dyn);
  o.piston = E('g', {}, dyn);
  E('rect', { x: c - 32, y: 0, width: 64, height: 30, rx: 3, class: 'piston' }, o.piston);
  E('line', { x1: c - 32, y1: 6, x2: c + 32, y2: 6, class: 'ring' }, o.piston);
  E('line', { x1: c - 32, y1: 11, x2: c + 32, y2: 11, class: 'ring' }, o.piston);
  E('circle', { cx: c, cy: 18, r: 5, class: 'wpin' }, o.piston);
  T(c, 27, '#' + (i + 1), 'pnum', o.piston, 'middle');
  /* xu-páp */
  o.iv = E('g', {}, dyn); E('line', { x1: c - 22, y1: 380, x2: c - 22, y2: 428, class: 'vstem' }, o.iv); E('rect', { x: c - 31, y: 427, width: 18, height: 5, rx: 2, class: 'vhead in' }, o.iv);
  o.ev = E('g', {}, dyn); E('line', { x1: c + 22, y1: 380, x2: c + 22, y2: 428, class: 'vstem' }, o.ev); E('rect', { x: c + 13, y: 427, width: 18, height: 5, rx: 2, class: 'vhead ex' }, o.ev);
  o.ic = E('path', { d: 'M-8,0 A8,8 0 1 1 8,0 L0,13 Z', class: 'cam', transform: `translate(${c - 22},368)` }, dyn);
  o.ec = E('path', { d: 'M-8,0 A8,8 0 1 1 8,0 L0,13 Z', class: 'cam', transform: `translate(${c + 22},368)` }, dyn);
  o.spark = E('g', { opacity: 0 }, dyn);
  E('circle', { cx: c, cy: 440, r: 11, class: 'sparkG' }, o.spark);
  E('path', { d: `M${c},430 L${c + 3},437 L${c + 9},438 L${c + 3},442 L${c + 5},449 L${c},444 L${c - 5},449 L${c - 3},442 L${c - 9},438 L${c - 3},437 Z`, class: 'sparkS' }, o.spark);
  o.spray = E('path', { d: `M${c - 22},320 L${c - 29},347 L${c - 15},347 Z`, class: 'spray', opacity: 0 }, dyn);
  cyl.push(o);
});
{ const g = C('coil', G.elex); CX.forEach(c => { box(g, c - 6, 356, 12, 40, 3, 'body coilb'); E('line', { x1: c, y1: 396, x2: c, y2: 430, class: 'plug' }, g); }); }
{ const g = C('inj', G.elex); CX.forEach(c => { box(g, c - 27, 299, 10, 20, 3, 'body injb'); }); }

/* đầu trục khuỷu / cam */
{ const g = C('vtc', G.elex); E('circle', { cx: 348, cy: 368, r: 12, class: 'body sprk' }, g); T(348, 371, 'VTC', 'ns2', g, 'middle');
  box(g, 330, 404, 16, 10, 2, 'body sens'); T(326, 412, 'OCV', 'ns', g, 'end'); }
{ const g = C('cmp', G.elex); box(g, 330, 386, 16, 10, 2, 'body sens'); T(326, 394, 'CMP', 'ns', g, 'end'); }
const reluct = E('g', { class: 'cmp', 'data-c': 'crank' }, G.meca);
E('circle', { cx: 318, cy: 655, r: 22, class: 'body pulley' }, reluct);
const relT = E('g', {}, reluct);
for (let k = 0; k < 36; k++) { if (k >= 34) continue; const a = k * 10 * Math.PI / 180;
  E('line', { x1: 318 + 25 * Math.cos(a), y1: 655 + 25 * Math.sin(a), x2: 318 + 30 * Math.cos(a), y2: 655 + 30 * Math.sin(a), class: 'tooth' }, relT); }
E('line', { x1: 318, y1: 655, x2: 318, y2: 637, class: 'mark' }, relT);
{ const g = C('ckp', G.elex); box(g, 310, 688, 16, 14, 2, 'body sens'); T(306, 698, 'CKP', 'ns', g, 'end'); }
/* bánh đà & máy đề */
const fly = E('g', { class: 'cmp', 'data-c': 'flywheel' }, G.meca);
E('circle', { cx: 796, cy: 655, r: 44, class: 'body fly' }, fly);
const flyT = E('g', {}, fly);
for (let k = 0; k < 40; k++) { const a = k * 9 * Math.PI / 180;
  E('line', { x1: 796 + 40 * Math.cos(a), y1: 655 + 40 * Math.sin(a), x2: 796 + 46 * Math.cos(a), y2: 655 + 46 * Math.sin(a), class: 'tooth' }, flyT); }
E('line', { x1: 796, y1: 655, x2: 796, y2: 622, class: 'mark' }, flyT);
T(796, 659, 'Bánh đà', 'ns2', fly, 'middle');
{ const g = C('starter', G.elec); box(g, 804, 704, 58, 24, 6); T(833, 720, 'Máy đề', 'ns2', g, 'middle'); }
const pinion = E('g', {}, G.dyn);
E('circle', { cx: 796, cy: 711, r: 8, class: 'pinion' }, pinion);
E('line', { x1: 796, y1: 703, x2: 796, y2: 719, class: 'mark' }, pinion);
E('line', { x1: 788, y1: 711, x2: 804, y2: 711, class: 'mark' }, pinion);
/* máy phát, máy nén, dây đai */
E('path', { d: 'M318,633 L190,580 A30,30 0 0 0 168,630 L236,720 A22,22 0 0 0 270,712 L318,677 A22,22 0 0 0 318,633 Z', class: 'belt cmp', 'data-c': 'belt', id: 'beltP' }, G.flow);
{ const g = C('alt', G.elec); E('circle', { cx: 190, cy: 610, r: 30, class: 'body altb' }, g); T(190, 655, 'Máy phát (B · C · FR)', 'ns', g, 'middle'); }
const altR = E('g', {}, G.dyn); for (let k = 0; k < 3; k++) { const a = k * 120 * Math.PI / 180; E('line', { x1: 190, y1: 610, x2: 190 + 18 * Math.cos(a), y2: 610 + 18 * Math.sin(a), class: 'spoke' }, altR); }
{ const g = C('comp', G.meca); E('circle', { cx: 250, cy: 700, r: 22, class: 'body compb' }, g); T(250, 736, 'Máy nén A/C', 'ns', g, 'middle'); }
const compR = E('g', {}, G.dyn); for (let k = 0; k < 3; k++) { const a = k * 120 * Math.PI / 180; E('line', { x1: 250, y1: 700, x2: 250 + 12 * Math.cos(a), y2: 700 + 12 * Math.sin(a), class: 'spoke' }, compR); }

/* cảm biến bên phải nắp máy */
{ const g = C('ect', G.elex); box(g, 760, 356, 14, 12, 2, 'body sens'); T(778, 352, 'ECT', 'ns', g); }
{ const g = C('vtec', G.elex); box(g, 760, 394, 14, 12, 2, 'body sens'); T(778, 414, 'VTEC', 'ns', g); }
{ const g = C('knock', G.elex); box(g, 760, 512, 14, 14, 2, 'body sens'); T(778, 534, 'Kích nổ', 'ns', g); }
/* làm mát */
{ const g = C('thermo', G.meca); E('circle', { cx: 816, cy: 382, r: 6, class: 'body sens' }, g); T(816, 400, 'Hằng nhiệt', 'ns', g, 'middle'); }
{ const g = C('radiator', G.meca); box(g, 850, 388, 28, 128, 4, 'body rad');
  for (let y = 398; y < 512; y += 9) E('line', { x1: 852, y1: y, x2: 876, y2: y, class: 'fin' }, g); T(864, 530, 'Két nước', 'ns', g, 'middle'); }
{ const g = C('fan', G.meca); E('circle', { cx: 930, cy: 452, r: 40, class: 'body shroud' }, g); T(930, 506, 'Quạt két nước', 'ns', g, 'middle'); }
const fanR = E('g', {}, G.dyn);
for (let k = 0; k < 5; k++) E('path', { d: 'M930,452 C940,436 952,424 962,428 C958,440 946,448 930,452 Z', class: 'blade', transform: `rotate(${k * 72} 930 452)` }, fanR);
E('circle', { cx: 930, cy: 452, r: 7, class: 'hub' }, fanR);

/* CVT & truyền lực */
{ const g = C('tc', G.meca); box(g, 846, 628, 30, 54, 6); T(861, 659, 'TC', 'ns2', g, 'middle'); }
E('line', { x1: 840, y1: 655, x2: 930, y2: 655, class: 'shaft' }, G.meca);
{ const g = C('cvt', G.meca); box(g, 884, 592, 176, 148, 14, 'body cvtc'); T(892, 606, 'HỘP SỐ VÔ CẤP CVT', 'ns hb', g); }
const cvtD = { inC: E('circle', { cx: 930, cy: 655, r: 24, class: 'pul' }, G.dyn), outC: E('circle', { cx: 1020, cy: 692, r: 24, class: 'pul' }, G.dyn),
  b1: E('line', { class: 'cbelt' }, G.dyn), b2: E('line', { class: 'cbelt' }, G.dyn),
  inM: E('line', { class: 'mark' }, G.dyn), outM: E('line', { class: 'mark' }, G.dyn) };
{ const g = C('cvtsens', G.elex); box(g, 923, 606, 14, 10, 2, 'body sens'); box(g, 1013, 646, 14, 10, 2, 'body sens'); T(1028, 642, 'Cảm biến tốc độ', 'ns', g, 'end'); }
{ const g = C('cvtsol', G.elex); box(g, 900, 718, 76, 16, 3, 'body sens'); T(938, 730, 'Van điện từ CVT', 'ns2', g, 'middle'); }
E('path', { d: 'M1020,692 L1084,704 L1180,640', class: 'shaft' }, G.meca);
E('circle', { cx: 1084, cy: 704, r: 11, class: 'gear' }, G.meca);
{ const g = C('wheel', G.meca); E('circle', { cx: 1180, cy: 640, r: 58, class: 'body tire' }, g); E('circle', { cx: 1180, cy: 640, r: 38, class: 'rim' }, g);
  E('circle', { cx: 1180, cy: 640, r: 26, class: 'disc' }, g); E('rect', { x: 1146, y: 600, width: 18, height: 28, rx: 4, class: 'caliper' }, g); }
const wheelR = E('g', {}, G.dyn); for (let k = 0; k < 5; k++) { const a = k * 72 * Math.PI / 180; E('line', { x1: 1180 + 8 * Math.cos(a), y1: 640 + 8 * Math.sin(a), x2: 1180 + 36 * Math.cos(a), y2: 640 + 36 * Math.sin(a), class: 'spokeW' }, wheelR); }
{ const g = C('wss', G.elex); box(g, 1218, 672, 12, 12, 2, 'body sens'); T(1236, 698, 'WSS', 'ns', g, 'middle'); }

/* nhiên liệu */
{ const g = C('pump', G.meca); box(g, 1100, 362, 150, 86, 14, 'body tank');
  E('rect', { x: 1112, y: 374, width: 24, height: 62, rx: 4, class: 'pumpb' }, g); T(1124, 409, 'Bơm', 'ns2', g, 'middle');
  T(1192, 390, 'Bình xăng 40 L', 'nt', g, 'middle'); T(1192, 405, 'bơm + lọc + điều áp', 'ns', g, 'middle'); T(1192, 418, '(hệ không hồi)', 'ns', g, 'middle'); }

/* đầu vào tài xế */
{ const g = E('g', {}, G.elex); E('rect', { x: 1090, y: 166, width: 172, height: 170, rx: 8, class: 'panelbox' }, g); T(1098, 182, 'ĐẦU VÀO TÀI XẾ', 'ns hb', g); }
{ const g = C('btn', G.elex); E('circle', { cx: 1110, cy: 200, r: 10, class: 'body btnc' }, g); T(1126, 204, 'Nút ENGINE START/STOP', 'ns', g); }
{ const g = C('brake', G.elex); box(g, 1102, 224, 16, 16, 3, 'body sens'); T(1126, 236, 'Bàn đạp phanh (công tắc)', 'ns', g); }
{ const g = C('app', G.elex); box(g, 1102, 260, 16, 16, 3, 'body sens'); T(1126, 272, 'Bàn đạp ga APP (2 kênh)', 'ns', g); }
{ const g = C('range', G.elex); box(g, 1102, 296, 16, 16, 3, 'body sens'); T(1126, 308, 'Cần số', 'ns', g); const r = T(1166, 309, 'P', 'val sm', g); r.id = 'gearTxt'; }

/* lớp phủ gói tin */
const pkLayer = G.pk;

