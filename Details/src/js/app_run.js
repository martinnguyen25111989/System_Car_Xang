/* ===== MÔ PHỎNG VẬN HÀNH ===== */
const mod = (a, n) => ((a % n) + n) % n;
const RCR = 45, LROD = 150;
const OFF = [0, 540, 180, 360];          // #1 #2 #3 #4 – thứ tự nổ 1-3-4-2
const ALL_LAMPS = ['MIL', 'SẠC', 'DẦU', 'NHIỆT', 'IMMO', 'SRS', 'ABS', 'VSA', 'EPS', 'PHANH'];
const LAMP_SEV = { MIL: 'warn', 'SẠC': 'crit', 'DẦU': 'crit', 'NHIỆT': 'crit', IMMO: 'warn', SRS: 'crit', ABS: 'warn', VSA: 'warn', EPS: 'warn', PHANH: 'crit' };
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/* Phòng lab chỉ chạy vòng animation khi đang hiển thị (học viện bật/tắt qua window.LAB.visible) */
const LABV = { on: false, running: false };

let stepIdx = 0, playing = !reduceMotion, stepElapsed = 0;
const STEP_MS = 7000;
let SLOW = 0.08;
let cur = Object.assign({}, STEPS[0].v, { spd: 0, lam: 0 });
let tgt = STEPS[0].v;
let flags = {};
let theta = 0, fanA = 0, compA = 0, wheelA = 0, inA = 0, outA = 0;

function flagsFor(i) {
  const r = (a, b) => i >= a && i <= b;
  return { start: r(12, 15), sync: r(13, 24), inj: r(14, 24), ign: r(15, 24), combust: r(15, 24),
    pump: i === 9 || r(12, 24), alt: r(16, 24), thermo: r(20, 25), fan: i === 20, ac: [20, 21, 23, 24].includes(i),
    vtc: r(21, 24), vtec: i === 22, purge: r(23, 24), cvt: r(21, 24), loadshed: r(12, 15), ig: r(6, 24),
    pcm: r(7, 25), net: r(2, 25), run: r(16, 24) };
}
function lampsFor(i) {
  if (i <= 4) return []; if (i === 5) return ['IMMO']; if (i <= 8) return ALL_LAMPS;
  if (i <= 15) return ['MIL', 'SẠC', 'DẦU']; return [];
}
function onSet(i, f) {
  const s = new Set(['battery', 'w-bat', 'mainfuse', 'w-main', 'uhbox', 'w-ud', 'udbox']);
  const add = a => a.forEach(x => s.add(x));
  if (f.net) add(['fcan', 'bcan', 'gw', 'micu', 'key']);
  if (f.ig) { add(['r-ig1', 'w-ig1', 'r-ig2', 'vsa', 'eps', 'srs', 'cam', 'dlc']); if (!f.loadshed) add(['r-acc', 'audio', 'hvac']); }
  if (f.pcm) add(['r-main1', 'w-m1', 'pcm']);
  if (f.ig && i >= 7) add(['s-ect', 's-iat', 's-map', 's-tp', 's-app', 's-range', 's-brake', 'ect', 'iat', 'map', 'tb', 'app', 'range']);
  if (f.start) add(['r-st', 'w-st', 'w-stb', 'starter', 'flywheel', 'crank', 's-ckp', 'ckp']);
  if (f.sync) add(['s-ckp', 's-cmp', 'ckp', 'cmp']);
  if (f.pump) add(['r-main2', 'w-pump', 'pump', 'rail']);
  if (f.inj) add(['a-inj', 'inj']);
  if (f.ign) add(['a-ign', 'coil']);
  if (f.run) add(['a-dbw', 'tb', 'alt', 'w-alt', 'a-altc', 'belt', 'crank', 'flywheel', 'plenum', 'airf']);
  if (i >= 19 && i <= 24) add(['s-af', 's-o2', 'af', 'o2', 'cat']);
  if (f.fan) add(['r-fan', 'w-fan', 'fan']);
  if (f.ac) add(['r-ac', 'w-ac', 'comp', 'hvac']);
  if (f.vtc) add(['a-vtc', 'vtc']);
  if (f.vtec) add(['a-vtec', 'vtec']);
  if (f.purge) add(['a-purge', 'purge']);
  if (f.cvt) add(['s-cvt', 'a-cvt', 'cvt', 'cvtsens', 'cvtsol', 'tc', 'wheel', 's-wss', 'wss']);
  if (i >= 21 && i <= 24) add(['s-knock', 'knock']);
  if (f.thermo) add(['thermo', 'radiator']);
  if (i === 1) add(['lin', 'door']);
  if (i === 2) add(['lin', 'lamp']);
  return s;
}

const allC = () => [...svg.querySelectorAll('[data-c]')];
function applyClasses() {
  const st = STEPS[stepIdx]; const on = onSet(stepIdx, flags); const hot = new Set(st.act);
  allC().forEach(el => { const id = el.getAttribute('data-c'); el.classList.toggle('on', on.has(id) || hot.has(id)); el.classList.toggle('hot', hot.has(id)); });
}

/* ---------- gói tin mạng ---------- */
const NP = { dlc: [56, 72], vsa: [144, 72], eps: [230, 72], srs: [310, 72], cam: [402, 72], pcm: [560, 165], gw: [710, 56],
  micu: [824, 72], key: [924, 72], hvac: [1014, 72], audio: [1095, 72], park: [1203, 72], door: [1105, 128], lamp: [1208, 128] };
const LINN = new Set(['door', 'lamp']);
const SIDE = id => id === 'gw' ? 'G' : (id === 'pcm' || NP[id][0] < 650 ? 'F' : 'B');
function pathPts(a, b) {
  if (LINN.has(b)) return [[824, 112], [824, 128], [NP[b][0], 128]];
  const P = [];
  if (a === 'gw') P.push([710, 56]); else { P.push(NP[a]); P.push([NP[a][0], 56]); }
  if (b === 'gw') P.push([710, 56]); else { P.push([NP[b][0], 56]); P.push(NP[b]); }
  return P;
}
function busOf(a, b) {
  if (LINN.has(b)) return 'LIN';
  const sa = SIDE(a), sb = SIDE(b);
  if (sa === 'G') return sb + '-CAN'; if (sb === 'G') return sa + '-CAN';
  return sa === sb ? sa + '-CAN' : 'F↔B qua GW';
}
const packets = [];
let pkTimer = 0, pkIdx = 0, logT0 = performance.now();
function spawn(m) {
  const [a, b, txt] = m; const P = pathPts(a, b);
  const seg = []; let tot = 0;
  for (let k = 1; k < P.length; k++) { const l = Math.hypot(P[k][0] - P[k - 1][0], P[k][1] - P[k - 1][1]); seg.push(l); tot += l; }
  const bus = busOf(a, b);
  const g = E('g', { class: 'pk ' + (bus === 'LIN' ? 'pk-lin' : bus.startsWith('B') ? 'pk-b' : bus.startsWith('F↔') ? 'pk-x' : 'pk-f') }, pkLayer);
  E('circle', { r: 5 }, g); const t = T(0, -9, txt, 'pkt', g, 'middle');
  packets.push({ P, seg, tot, d: 0, g });
  logCan(bus, a, b, txt);
}
function updPackets(dt) {
  for (let i = packets.length - 1; i >= 0; i--) {
    const p = packets[i]; p.d += dt * 260;
    if (p.d >= p.tot + 30) { p.g.remove(); packets.splice(i, 1); continue; }
    let d = Math.min(p.d, p.tot), k = 0;
    while (k < p.seg.length - 1 && d > p.seg[k]) { d -= p.seg[k]; k++; }
    const A = p.P[k], B = p.P[k + 1], f = p.seg[k] ? d / p.seg[k] : 0;
    p.g.setAttribute('transform', `translate(${A[0] + (B[0] - A[0]) * f},${A[1] + (B[1] - A[1]) * f})`);
  }
}
const BG = [['pcm', 'gw', 'RPM · ECT · tải'], ['vsa', 'pcm', 'Tốc độ 4 bánh'], ['pcm', 'eps', 'Tốc độ xe']];
function tickPackets(dt) {
  if (!flags.net) return;
  pkTimer -= dt;
  if (pkTimer <= 0) {
    const list = STEPS[stepIdx].can.length ? STEPS[stepIdx].can : (flags.run ? BG : []);
    if (list.length) { spawn(list[pkIdx % list.length]); pkIdx++; }
    pkTimer = 1.25;
  }
}
const logEl = document.getElementById('canlog');
function logCan(bus, a, b, txt) {
  const li = document.createElement('li');
  const s = ((performance.now() - logT0) / 1000).toLocaleString('vi-VN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  li.innerHTML = `<span class="lt">${s} s</span><span class="lb b-${bus.startsWith('LIN') ? 'lin' : bus.startsWith('B') ? 'b' : bus.startsWith('F↔') ? 'x' : 'f'}">${bus}</span><span class="lm"><b>${NAME[a] || a}</b> → <b>${NAME[b] || b}</b>: ${txt}</span>`;
  logEl.prepend(li); while (logEl.children.length > 8) logEl.lastChild.remove();
}

/* ---------- vẽ động cơ ---------- */
const COL = { air: '#2a5f86', mix: '#2f7c8f', comp: '#2c5a9e', fire: '#ff7a2f', exh: '#4b5563', idle: '#1d2b3e' };
const tPlate = document.getElementById('tPlate');
const beltP = document.getElementById('beltP');
const fl = { air: document.getElementById('fAir'), exh: document.getElementById('fExh'), fuel: document.getElementById('fFuel'),
  c1: document.getElementById('fCool1'), c2: document.getElementById('fCool2'), ch: document.getElementById('fChain') };
function lift(phi, o, c, Lm) { const span = mod(c - o, 720), d = mod(phi - o, 720); return d > span ? 0 : Lm * Math.sin(Math.PI * d / span); }

function drawEngine() {
  const vtcAdv = flags.vtc ? Math.min(25, cur.thr * 0.35) : 0;
  const io = 345 - vtcAdv, ic = 585 - vtcAdv, iL = flags.vtec ? 9 : 6.5;
  const pwDeg = Math.max(40, cur.pw * Math.max(cur.rpm, 1) * 6 / 1000);
  CX.forEach((c, i) => {
    const o = cyl[i]; const phi = mod(theta - OFF[i], 720); const a = (phi % 360) * Math.PI / 180;
    const px = c + RCR * Math.sin(a), py = 655 - RCR * Math.cos(a);
    const dx = RCR * Math.sin(a); const wy = py - Math.sqrt(LROD * LROD - dx * dx); const top = wy - 18;
    o.piston.setAttribute('transform', `translate(0,${top.toFixed(1)})`);
    o.rod.setAttribute('x1', c); o.rod.setAttribute('y1', wy.toFixed(1)); o.rod.setAttribute('x2', px.toFixed(1)); o.rod.setAttribute('y2', py.toFixed(1));
    o.pin.setAttribute('cx', px.toFixed(1)); o.pin.setAttribute('cy', py.toFixed(1));
    o.throw.setAttribute('x2', px.toFixed(1)); o.throw.setAttribute('y2', py.toFixed(1));
    o.gas.setAttribute('height', Math.max(0, top - 432).toFixed(1));
    let fill, lab;
    const moving = cur.rpm > 5;
    if (phi < 180) { lab = flags.combust ? 'NỔ' : 'GIÃN'; fill = flags.combust && moving ? COL.fire : COL.comp; o.gas.setAttribute('fill-opacity', flags.combust && moving ? (0.95 - phi / 260).toFixed(2) : 0.55); }
    else if (phi < 360) { lab = 'XẢ'; fill = COL.exh; o.gas.setAttribute('fill-opacity', 0.6); }
    else if (phi < 540) { lab = 'NẠP'; fill = flags.inj ? COL.mix : COL.air; o.gas.setAttribute('fill-opacity', 0.55); }
    else { lab = 'NÉN'; fill = flags.inj ? COL.mix : COL.comp; o.gas.setAttribute('fill-opacity', (0.45 + (phi - 540) / 400).toFixed(2)); }
    if (!moving && !flags.combust) { fill = COL.idle; o.gas.setAttribute('fill-opacity', 0.6); }
    o.gas.setAttribute('fill', fill); o.stroke.textContent = lab;
    o.iv.setAttribute('transform', `translate(0,${lift(phi, io, ic, iL).toFixed(1)})`);
    o.ev.setAttribute('transform', `translate(0,${lift(phi, 140, 375, 6.5).toFixed(1)})`);
    o.ic.setAttribute('transform', `translate(${c - 22},368) rotate(${((phi - (io + ic) / 2) / 2 + 90).toFixed(1)})`);
    o.ec.setAttribute('transform', `translate(${c + 22},368) rotate(${((phi - 257.5) / 2 + 90).toFixed(1)})`);
    let sp = 0;
    if (flags.ign && moving) { const d = mod(phi - (720 - cur.adv), 720); if (d < 30) sp = 1 - d / 30; }
    o.spark.setAttribute('opacity', sp.toFixed(2));
    let sy = 0;
    if (flags.inj && moving) { const d = mod(phi - 300, 720); if (d < pwDeg) sy = 0.9; }
    o.spray.setAttribute('opacity', sy);
  });
  relT.setAttribute('transform', `rotate(${theta % 360} 318 655)`);
  flyT.setAttribute('transform', `rotate(${theta % 360} 796 655)`);
  altR.setAttribute('transform', `rotate(${(theta * 2.6) % 360} 190 610)`);
  pinion.setAttribute('transform', flags.start ? `rotate(${(-theta * 5) % 360} 796 711)` : 'translate(0,9)');
  compR.setAttribute('transform', `rotate(${compA % 360} 250 700)`);
  fanR.setAttribute('transform', `rotate(${fanA % 360} 930 452)`);
  wheelR.setAttribute('transform', `rotate(${wheelA % 360} 1180 640)`);
  tPlate.setAttribute('transform', `rotate(${(-(cur.thr) * 0.85).toFixed(1)} 293 279)`);
  beltP.style.strokeDashoffset = (-theta * 0.35).toFixed(1);
  fl.ch.style.strokeDashoffset = (-theta * 0.2).toFixed(1);
  /* CVT */
  const ratio = Math.max(0.4, Math.min(2.5, cur.ratio));
  const rin = 48 / (1 + ratio), rout = 48 * ratio / (1 + ratio);
  cvtD.inC.setAttribute('r', rin.toFixed(1)); cvtD.outC.setAttribute('r', rout.toFixed(1));
  const set = (l, x1, y1, x2, y2) => { l.setAttribute('x1', x1); l.setAttribute('y1', y1); l.setAttribute('x2', x2); l.setAttribute('y2', y2); };
  set(cvtD.b1, 930, (655 - rin).toFixed(1), 1020, (692 - rout).toFixed(1));
  set(cvtD.b2, 930, (655 + rin).toFixed(1), 1020, (692 + rout).toFixed(1));
  set(cvtD.inM, 930, 655, (930 + rin * Math.cos(inA)).toFixed(1), (655 + rin * Math.sin(inA)).toFixed(1));
  set(cvtD.outM, 1020, 692, (1020 + rout * Math.cos(outA)).toFixed(1), (692 + rout * Math.sin(outA)).toFixed(1));
}
function setFlows() {
  const turning = cur.rpm > 5;
  fl.air.classList.toggle('run', turning); fl.exh.classList.toggle('run', flags.combust && turning);
  fl.fuel.classList.toggle('run', !!flags.pump); fl.c1.classList.toggle('run', !!flags.thermo && turning); fl.c2.classList.toggle('run', !!flags.thermo && turning);
  fl.ch.classList.toggle('run', turning); beltP.classList.toggle('run', turning);
}

/* ---------- oscilloscope ---------- */
const scope = document.getElementById('scope'); const sctx = scope.getContext('2d');
function fitScope() { const r = scope.getBoundingClientRect(); const dpr = window.devicePixelRatio || 1; scope.width = Math.max(300, r.width) * dpr; scope.height = 230 * dpr; sctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
function drawScope() {
  const w = scope.width / (window.devicePixelRatio || 1), h = 230; const x0 = 56, x1 = w - 8, xw = x1 - x0;
  sctx.clearRect(0, 0, w, h);
  const rows = [['CKP', '#4c9dff'], ['CMP', '#2ed3b7'], ['KIM #1', '#c77dff'], ['IGN #1', '#ffb020']];
  const rh = 46, yTop = 10;
  sctx.font = '600 11px "Barlow Condensed", sans-serif';
  sctx.strokeStyle = 'rgba(142,162,186,.12)'; sctx.lineWidth = 1;
  for (let g = 0; g <= 8; g++) { const x = x0 + xw * g / 8; sctx.beginPath(); sctx.moveTo(x, yTop); sctx.lineTo(x, yTop + rh * 4); sctx.stroke(); }
  sctx.fillStyle = '#8ea2ba'; ['0°', '180°', '360°', '540°', '720°'].forEach((t, k) => sctx.fillText(t, x0 + xw * k / 4 - (k === 4 ? 22 : 4), yTop + rh * 4 + 14));
  const moving = cur.rpm > 5; const pwDeg = Math.max(8, cur.pw * Math.max(cur.rpm, 1) * 6 / 1000); const dwDeg = Math.max(16, 2.5 * Math.max(cur.rpm, 1) * 6 / 1000);
  rows.forEach(([n, col], r) => {
    const yb = yTop + rh * r + rh - 8, yh = yTop + rh * r + 10;
    sctx.fillStyle = col; sctx.fillText(n, 6, yTop + rh * r + 28);
    sctx.strokeStyle = col; sctx.lineWidth = 1.6; sctx.beginPath();
    for (let a = 0; a <= 720; a += 1) {
      let v = 0;
      if (r === 0) { const tooth = Math.floor((a % 360) / 10); v = moving && tooth < 34 && (a % 10) < 5 ? 1 : 0; }
      else if (r === 1) { v = moving && flags.sync && ((a >= 70 && a < 100) || (a >= 430 && a < 445) || (a >= 470 && a < 485)) ? 1 : 0; }
      else if (r === 2) { v = 0.62; if (flags.inj && moving) { const d = mod(a - 300, 720); if (d < pwDeg) v = 0; else if (d < pwDeg + 4) v = 1; } }
      else { v = 0; if (flags.ign && moving) { const sa = 720 - cur.adv; const d = mod(sa - a, 720); if (d > 0 && d < dwDeg) v = 0.8; } }
      const x = x0 + xw * a / 720, y = yb - (yb - yh) * v;
      if (a === 0) sctx.moveTo(x, y); else sctx.lineTo(x, y);
    }
    sctx.stroke();
  });
  /* điểm đánh lửa & con trỏ */
  if (moving) {
    const cx = x0 + xw * mod(theta, 720) / 720;
    sctx.strokeStyle = 'rgba(255,255,255,.75)'; sctx.lineWidth = 1; sctx.setLineDash([3, 3]); sctx.beginPath(); sctx.moveTo(cx, yTop); sctx.lineTo(cx, yTop + rh * 4); sctx.stroke(); sctx.setLineDash([]);
  }
  sctx.fillStyle = '#8ea2ba'; sctx.fillText('ĐCT nén #1', x0 + 2, yTop + rh * 4 + 28);
  sctx.fillText(moving ? `${Math.round(cur.rpm)} vòng/phút · khung 720° = 1 chu trình` : 'Động cơ đứng yên – không có tín hiệu', x0 + 80, yTop + rh * 4 + 28);
}

/* ---------- bảng dữ liệu ---------- */
const nf = (v, d) => Number(v).toLocaleString('vi-VN', { minimumFractionDigits: d, maximumFractionDigits: d });
const TILES = [
  ['rpm', 'Vòng tua', 'vòng/phút', 0, 6600], ['vb', 'Điện áp hệ thống', 'V', 1, 16], ['ist', 'Dòng máy đề', 'A', 0, 250],
  ['ect', 'Nhiệt độ nước ECT', '°C', 0, 120], ['fp', 'Áp suất nhiên liệu', 'kPa', 0, 450], ['map', 'Áp suất cổ hút MAP', 'kPa', 0, 105],
  ['thr', 'Độ mở bướm ga', '%', 0, 100], ['pw', 'Xung phun', 'ms', 1, 15], ['adv', 'Góc đánh lửa', '° trước ĐCT', 0, 40],
  ['lam', 'Lambda λ', '', 2, 1.2], ['ratio', 'Tỉ số CVT', '', 2, 2.6], ['spd', 'Tốc độ xe (minh họa)', 'km/h', 0, 140],
  ['loop', 'Điều khiển nhiên liệu', '', -1, 0], ['pm', 'Chế độ nguồn', '', -1, 0]
];
const tilesEl = document.getElementById('tiles');
TILES.forEach(([k, l, u]) => { const d = document.createElement('div'); d.className = 'tile'; d.innerHTML = `<div class="tl">${l}</div><div class="tv"><span id="tv-${k}">—</span><small>${u}</small></div><div class="tb"><i id="tb-${k}"></i></div>`; tilesEl.appendChild(d); });
function updTiles() {
  TILES.forEach(([k, , , d, mx]) => {
    const el = document.getElementById('tv-' + k), bar = document.getElementById('tb-' + k);
    if (d < 0) { el.textContent = tgt[k]; bar.style.width = '0'; return; }
    let v = cur[k], show;
    if (k === 'lam' && tgt.lam == null) show = '—';
    else if (k === 'ratio' && tgt.gear !== 'D') show = tgt.gear;
    else show = nf(v, d);
    el.textContent = show;
    bar.style.width = (show === '—' || (k === 'ratio' && tgt.gear !== 'D')) ? '0' : Math.max(0, Math.min(100, v / mx * 100)) + '%';
  });
  document.getElementById('batV').textContent = nf(cur.vb, 1) + ' V';
  document.getElementById('pmTxt').textContent = tgt.pm;
  document.getElementById('gearTxt').textContent = tgt.gear;
}
const lampsEl = document.getElementById('lamps');
ALL_LAMPS.forEach(n => { const s = document.createElement('span'); s.className = 'lamp ' + LAMP_SEV[n]; s.id = 'lp-' + n; s.textContent = n; lampsEl.appendChild(s); });
function updLamps() { const on = new Set(lampsFor(stepIdx)); ALL_LAMPS.forEach(n => document.getElementById('lp-' + n).classList.toggle('lit', on.has(n))); }

/* ---------- dòng thời gian & thẻ bước ---------- */
const tl = document.getElementById('timeline');
PHASES.forEach((p, pi) => {
  const grp = document.createElement('div'); grp.className = 'tg';
  grp.innerHTML = `<div class="tgh">${p.n} <span>${p.r}</span></div><div class="tgc"></div>`;
  STEPS.forEach((s, i) => { if (s.ph !== pi) return; const b = document.createElement('button'); b.className = 'chip-step'; b.id = 'cs-' + i; b.type = 'button';
    b.title = s.t; b.innerHTML = `<b>${s.k}</b><i></i>`; b.addEventListener('click', () => { goStep(i); }); grp.querySelector('.tgc').appendChild(b); });
  tl.appendChild(grp);
});
const card = document.getElementById('stepCard');
function renderCard() {
  const s = STEPS[stepIdx];
  const comps = s.act.filter(id => !/^(w|s|a)-/.test(id));
  const sym = SYMPTOMS.find(x => x.id === s.dx);
  card.innerHTML = `
    <div class="sc-head"><div class="sc-k">${s.k}</div><div><div class="sc-ph">${PHASES[s.ph].n} · Bước ${stepIdx + 1}/26</div><h2>${s.t}</h2></div></div>
    <p class="sc-d">${s.d}</p>
    <div class="sc-row"><span class="sc-lab">Lớp tham gia</span>${s.L.map(l => `<span class="lchip l-${l}">${LAYER_NAME[l]}</span>`).join('')}</div>
    <div class="sc-row"><span class="sc-lab">Thành phần kích hoạt</span>${comps.map(id => `<span class="cchip l-${LAYER_OF(id)}">${NAME[id] || id}</span>`).join('')}</div>
    <div class="sc-cols">
      <div><h4>Tín hiệu & giá trị tham khảo</h4><ul>${s.sig.map(x => `<li>${x}</li>`).join('')}</ul></div>
      <div><h4>Nếu bước này lỗi → kiểm tra</h4><ul>${s.chk.map(x => `<li>${x}</li>`).join('')}</ul>
      ${sym ? `<button class="btn ghost sm" type="button" id="toDiag">Mở cây chẩn đoán: ${sym.t} →</button>` : ''}</div>
    </div>`;
  const b = document.getElementById('toDiag'); if (b) b.addEventListener('click', () => { selectSymptom(s.dx); location.hash = '#/lab/chan-doan'; });
  document.querySelectorAll('.chip-step').forEach((el, i) => { el.classList.toggle('act', el.id === 'cs-' + stepIdx); el.classList.toggle('done', +el.id.slice(3) < stepIdx); });
  document.getElementById('pcmMode').textContent = stepIdx < 7 ? 'Chưa cấp nguồn chính' : stepIdx <= 11 ? 'Tự kiểm tra · chờ đề' : stepIdx <= 15 ? 'Khởi động' : stepIdx === 25 ? 'Post-run · lưu học' : ('Vòng ' + (tgt.loop === '—' ? 'hở' : tgt.loop.toLowerCase()));
}
function goStep(i) {
  stepIdx = mod(i, STEPS.length); stepElapsed = 0; tgt = STEPS[stepIdx].v; flags = flagsFor(stepIdx); pkIdx = 0; pkTimer = 0.2;
  applyClasses(); setFlows(); renderCard(); updLamps();
}

/* ---------- vòng lặp ---------- */
let last = performance.now(), uiT = 0, scT = 0;
function frame(now) {
  if (!LABV.on) { LABV.running = false; return; }
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  ['rpm', 'vb', 'ist', 'fp', 'map', 'thr', 'pw', 'adv', 'ratio'].forEach(k => { cur[k] += (tgt[k] - cur[k]) * (1 - Math.exp(-dt * (k === 'rpm' ? 1.8 : 2.4))); });
  cur.ect += (tgt.ect - cur.ect) * (1 - Math.exp(-dt * 0.9));
  if (tgt.lam != null) cur.lam += (tgt.lam - cur.lam) * (1 - Math.exp(-dt * 2));
  cur.spd = tgt.gear === 'D' ? cur.rpm / (Math.max(0.4, cur.ratio) * 4.6) * 1.94 * 0.06 : cur.spd * Math.exp(-dt * 2);
  const vis = cur.rpm * SLOW * 6 * dt;
  theta += vis;
  if (flags.fan) fanA += dt * 900 * Math.max(0.3, SLOW * 6);
  if (flags.ac && cur.rpm > 5) compA += vis * 1.2;
  if (flags.cvt) { inA += vis * Math.PI / 180; outA += vis * Math.PI / 180 / Math.max(0.4, cur.ratio); }
  wheelA += (cur.spd / 3.6 / 1.94) * 360 * dt * SLOW * 10;
  drawEngine(); updPackets(dt); tickPackets(dt);
  uiT += dt; if (uiT > 0.1) { uiT = 0; updTiles(); setFlows(); }
  scT += dt; if (scT > 0.05) { scT = 0; drawScope(); }
  if (playing) {
    stepElapsed += dt * 1000;
    const chip = document.querySelector('#cs-' + stepIdx + ' i'); if (chip) chip.style.width = Math.min(100, stepElapsed / STEP_MS * 100) + '%';
    if (stepElapsed >= STEP_MS) goStep(stepIdx + 1);
  }
  requestAnimationFrame(frame);
}

/* ---------- điều khiển ---------- */
const bPlay = document.getElementById('bPlay');
function setPlay(p) { playing = p; bPlay.textContent = p ? '❚❚ Tạm dừng' : '▶ Tự chạy A→Z'; bPlay.setAttribute('aria-pressed', p); document.querySelectorAll('.chip-step i').forEach(i => i.style.width = '0'); }
bPlay.addEventListener('click', () => setPlay(!playing));
document.getElementById('bPrev').addEventListener('click', () => { setPlay(false); goStep(stepIdx - 1); });
document.getElementById('bNext').addEventListener('click', () => { setPlay(false); goStep(stepIdx + 1); });
const slowEl = document.getElementById('slow');
slowEl.addEventListener('input', () => { SLOW = slowEl.value / 100; document.getElementById('slowv').textContent = '×' + nf(SLOW, 2); });
document.querySelectorAll('.layer-t').forEach(b => b.addEventListener('click', () => {
  const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on);
  svg.querySelectorAll(`[data-layer="${b.dataset.l}"]`).forEach(g => g.classList.toggle('off', !on));
}));
document.addEventListener('keydown', e => {
  if (!LABV.on || currentTab !== 'van-hanh' || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
  if (e.key === 'ArrowRight') { setPlay(false); goStep(stepIdx + 1); }
  else if (e.key === 'ArrowLeft') { setPlay(false); goStep(stepIdx - 1); }
});
