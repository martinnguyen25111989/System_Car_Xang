/* ===== SƠ ĐỒ HỆ THỐNG DÙNG CHUNG =====
   Nút đặt theo lưới g:[cột, hàng] (cột cách 140 px, hàng cách 120 px), cạnh tự đi đường gấp khúc.
   Cạnh: {a, b, f: loại luồng, as/bs: cạnh neo l|r|t|b, ao/bo: lệch neo, mx/my: làn trung gian, p: điểm đi qua, lab: nhãn}.
   Trạng thái: hl (tô sáng), bad (bộ phận hỏng), off (luồng ngừng), fast (luồng nhanh). */
const GXc = c => 16 + c * 140, GYr = r => 16 + r * 120, NW = 122, NH = 84;
const laneB = r => GYr(r) + NH + 18, laneT = r => GYr(r) - 18, laneR = c => GXc(c) + NW + 9, laneL = c => GXc(c) - 9;
const FLOWN = { fuel: 'Xăng', air: 'Khí nạp', exh: 'Khí xả chưa xử lý', clean: 'Khí xả đã làm sạch', hot: 'Nước làm mát nóng', cold: 'Nước đã làm nguội',
  oil: 'Dầu bôi trơn', pwr: 'Điện nguồn +12 V', gnd: 'Mass (cực âm)', sig: 'Tín hiệu cảm biến → ECU', cmd: 'Lệnh ECU → cơ cấu chấp hành', can: 'Dữ liệu mạng CAN',
  trq: 'Mô-men xoắn', hyd: 'Áp suất thủy lực', hi: 'Ga lạnh áp suất cao (nóng)', lo: 'Ga lạnh áp suất thấp (lạnh)', mech: 'Lực / chuyển động cơ khí', vap: 'Hơi xăng' };
let DGN = 0;

function dgNorm(spec) {
  const nodes = {};
  spec.nodes.forEach(n => {
    const o = Object.assign({}, n);
    if (n.g) { o.x = GXc(n.g[0]) + (n.dx || 0); o.y = GYr(n.g[1]) + (n.dy || 0); }
    o.w = n.w || NW; o.h = n.h || NH; nodes[n.id] = o;
  });
  return nodes;
}
function dgAnchor(n, s, off = 0) {
  if (s === 'l') return [n.x, n.y + n.h / 2 + off];
  if (s === 'r') return [n.x + n.w, n.y + n.h / 2 + off];
  if (s === 't') return [n.x + n.w / 2 + off, n.y];
  return [n.x + n.w / 2 + off, n.y + n.h];
}
function dgPts(e, A, B) {
  const ax = A.x + A.w / 2, ay = A.y + A.h / 2, bx = B.x + B.w / 2, by = B.y + B.h / 2, dx = bx - ax, dy = by - ay;
  let as, bs;
  if (Math.abs(dx) >= Math.abs(dy) * .9) { as = dx > 0 ? 'r' : 'l'; bs = dx > 0 ? 'l' : 'r'; } else { as = dy > 0 ? 'b' : 't'; bs = dy > 0 ? 't' : 'b'; }
  if (e.as) as = e.as; if (e.bs) bs = e.bs;
  const p1 = dgAnchor(A, as, e.ao || 0), p2 = dgAnchor(B, bs, e.bo || 0), Hz = s => s === 'l' || s === 'r';
  let pts = [p1];
  if (e.p) pts = pts.concat(e.p);
  else if (Hz(as) && Hz(bs)) { if (Math.abs(p1[1] - p2[1]) > .5 || e.mx != null) { const mx = e.mx != null ? e.mx : (p1[0] + p2[0]) / 2; pts.push([mx, p1[1]], [mx, p2[1]]); } }
  else if (!Hz(as) && !Hz(bs)) { if (Math.abs(p1[0] - p2[0]) > .5 || e.my != null) { const my = e.my != null ? e.my : (p1[1] + p2[1]) / 2; pts.push([p1[0], my], [p2[0], my]); } }
  else if (Hz(as)) pts.push([p2[0], p1[1]]);
  else pts.push([p1[0], p2[1]]);
  pts.push(p2);
  pts = pts.filter((q, i) => i === 0 || Math.hypot(q[0] - pts[i - 1][0], q[1] - pts[i - 1][1]) > .5);
  /* lùi điểm cuối để đầu mũi tên không đè viền nút */
  const L = pts.length; if (L >= 2) { const [x0, y0] = pts[L - 2], [x1, y1] = pts[L - 1], l = Math.hypot(x1 - x0, y1 - y0); if (l > 8) pts[L - 1] = [x1 - (x1 - x0) / l * 5, y1 - (y1 - y0) / l * 5]; }
  return pts;
}
function dgPath(pts, r = 11) {
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
    const l1 = Math.hypot(x1 - x0, y1 - y0), l2 = Math.hypot(x2 - x1, y2 - y1), rr = Math.min(r, l1 / 2, l2 / 2);
    if (rr < 1) { d += ` L${x1.toFixed(1)},${y1.toFixed(1)}`; continue; }
    const ax = x1 + (x0 - x1) / l1 * rr, ay = y1 + (y0 - y1) / l1 * rr, bx = x1 + (x2 - x1) / l2 * rr, by = y1 + (y2 - y1) / l2 * rr;
    d += ` L${ax.toFixed(1)},${ay.toFixed(1)} Q${x1.toFixed(1)},${y1.toFixed(1)} ${bx.toFixed(1)},${by.toFixed(1)}`;
  }
  const q = pts[pts.length - 1]; return d + ` L${q[0].toFixed(1)},${q[1].toFixed(1)}`;
}
function dgLabelPos(pts) {
  let best = 0, bi = 0;
  for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (l > best) { best = l; bi = i; } }
  const [x0, y0] = pts[bi - 1] || pts[0], [x1, y1] = pts[bi] || pts[0];
  const hz = Math.abs(y1 - y0) < Math.abs(x1 - x0);
  return [(x0 + x1) / 2 + (hz ? 0 : 6), (y0 + y1) / 2 + (hz ? -7 : 3), hz ? 'middle' : 'start'];
}
const ekey = e => e.k || (e.a + '>' + e.b);
function dgNodeSVG(n) {
  const tone = n.tone || 'info', lines = String(n.t).split('|'), k = n.k || '';
  const tip = n.c ? `data-c="${n.c}"` : `data-tip="${esc(lines.join(' '))}${n.s ? ' · ' + esc(n.s) : ''}"`;
  const acc = `<rect class="dn-acc" x="12" y="0" width="${n.w - 24}" height="3" rx="1.5"/>`;
  const x = `<g class="dn-x" transform="translate(${n.w - 8},8)"><circle r="9"/><path d="M-3.4,-3.4 L3.4,3.4 M3.4,-3.4 L-3.4,3.4"/></g>`;
  const icon = (sz, tx, ty) => `<g transform="translate(${tx},${ty})"><rect class="dn-ib" width="${sz}" height="${sz}" rx="${sz * .3}"/><g class="dn-ic" transform="translate(${sz * .14},${sz * .14}) scale(${sz * .72 / 24})" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icRaw(n.ic)}</g></g>`;
  let body;
  if (k.includes('big')) {
    body = icon(50, n.w / 2 - 25, n.h / 2 - 58) + lines.map((l, i) => `<text class="dn-t" x="${n.w / 2}" y="${n.h / 2 + 14 + i * 19}" text-anchor="middle">${esc(l)}</text>`).join('') +
      (n.s ? `<text class="dn-s" x="${n.w / 2}" y="${n.h / 2 + 34 + (lines.length - 1) * 19}" text-anchor="middle">${esc(n.s)}</text>` : '') +
      `<circle class="dn-pulse" cx="${n.w / 2}" cy="${n.h / 2 - 33}" r="30"/>`;
  } else if (k.includes('h')) {
    const sz = n.h < 46 ? 26 : 30, ty = (n.h - sz) / 2, t1y = n.s ? n.h / 2 - 2.5 : n.h / 2 + 4.5;
    body = icon(sz, 8, ty) + lines.map((l, i) => `<text class="dn-t" x="${sz + 16}" y="${t1y + i * 14 - (lines.length - 1) * 7}">${esc(l)}</text>`).join('') +
      (n.s ? `<text class="dn-s" x="${sz + 16}" y="${n.h / 2 + 12 + (lines.length - 1) * 7}">${esc(n.s)}</text>` : '');
  } else {
    const two = lines.length > 1;
    body = icon(30, n.w / 2 - 15, two ? 8 : 11) + lines.map((l, i) => `<text class="dn-t" x="${n.w / 2}" y="${(two ? 52 : 58) + i * 13.5}" text-anchor="middle">${esc(l)}</text>`).join('') +
      (n.s ? `<text class="dn-s" x="${n.w / 2}" y="${two ? 79 : 74}" text-anchor="middle">${esc(n.s)}</text>` : '');
  }
  return `<g class="dn tn-${tone} ${k}" data-n="${n.id}" ${tip} transform="translate(${n.x},${n.y})" tabindex="0" role="button" aria-label="${esc(lines.join(' '))}"><rect class="dn-b" width="${n.w}" height="${n.h}" rx="14"/>${acc}${body}${x}</g>`;
}
function dgRender(spec) {
  const uid = 'dg' + (++DGN), nodes = dgNorm(spec), used = new Set();
  const W = spec.w || (GXc((spec.cols || 7) - 1) + NW + 16), Hh = spec.h || (GYr((spec.rows || 3) - 1) + NH + 16);
  const zones = (spec.zones || []).map(z => {
    let { x, y, w, h } = z;
    if (z.g) { x = GXc(z.g[0]) - 8; y = GYr(z.g[1]) - 8; w = GXc(z.g[2]) + NW + 8 - x; h = GYr(z.g[3]) + NH + 8 - y; if (z.top) { y -= 16; h += 16; } }
    return `<g class="dz tn-${z.tone || 'info'}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18"/><text x="${x + 12}" y="${y + 15}">${esc(z.t)}</text></g>`;
  }).join('');
  const edges = spec.edges.map(e => {
    const A = nodes[e.a], B = nodes[e.b]; if (!A || !B) { console.warn('edge?', e); return ''; }
    used.add(e.f);
    const pts = dgPts(e, A, B), d = dgPath(pts), lp = e.lab ? dgLabelPos(pts) : null;
    const mk = `url(#${uid}-${e.f})`;
    const dot = e.dot && !RM ? `<circle r="4.2" class="mk-${e.f}" stroke="#fff" stroke-width="1.5"><animateMotion dur="${e.dur || 2.2}s" repeatCount="indefinite" path="${d}"/></circle>` : '';
    return `<g class="de" data-e="${ekey(e)}"><path class="de-base fl-${e.f}" d="${d}"/><path class="de-flow fl-${e.f}" d="${d}" marker-end="${mk}"${e.bi ? ` marker-start="${mk}"` : ''}/>${dot}${lp ? `<text class="de-l" x="${lp[0].toFixed(1)}" y="${lp[1].toFixed(1)}" text-anchor="${lp[2]}">${esc(e.lab)}</text>` : ''}</g>`;
  }).join('');
  const defs = [...used].map(f => `<marker id="${uid}-${f}" viewBox="0 0 10 10" refX="7.6" refY="5" markerWidth="5.4" markerHeight="5.4" orient="auto-start-reverse"><path class="mk-${f}" d="M0,1 L9,5 L0,9 z"/></marker>`).join('');
  const ns = Object.values(nodes).map(dgNodeSVG).join('');
  return { html: `<svg class="dg" id="${uid}" viewBox="0 0 ${W} ${Hh}" role="img" aria-label="${esc(spec.label || 'Sơ đồ hệ thống')}"><defs>${defs}</defs>${zones}${edges}${spec.extra || ''}${ns}</svg>`, used: [...used], uid };
}
function dgLegend(used) {
  return `<div class="legend">${used.map(f => `<span class="tn-${f}"><i${f === 'sig' || f === 'cmd' || f === 'can' ? ' class="dash"' : ''}></i>${FLOWN[f] || f}</span>`).join('')}</div>`;
}
/* điều khiển trạng thái sơ đồ */
function dgCtl(svg) {
  const nodes = $$('.dn', svg), edges = $$('.de', svg);
  return {
    set(s = {}) {
      const hl = s.hl ? new Set(s.hl) : null, bad = new Set(s.bad || []), off = new Set(s.off || []), fast = new Set(s.fast || []), dead = new Set(s.dead || []);
      svg.classList.toggle('dim', !!hl);
      nodes.forEach(n => { const id = n.dataset.n; n.classList.toggle('hl', !!hl && hl.has(id)); n.classList.toggle('bad', bad.has(id)); n.classList.toggle('dead', dead.has(id)); });
      edges.forEach(e => { const k = e.dataset.e; e.classList.toggle('hl', !!hl && hl.has(k)); e.classList.toggle('off', off.has(k) || off.has('*')); e.classList.toggle('fast', fast.has(k)); });
    },
    sel(id) { nodes.forEach(n => n.classList.toggle('sel', n.dataset.n === id || n.dataset.c === id)); }
  };
}

/* ---------- bố cục "hub": khối trung tâm (ECU/BCM), đầu vào bên trái, đầu ra bên phải ----------
   Đường gấp khúc: nút càng xa hàng giữa thì đoạn đứng càng gần khối trung tâm → các đường không cắt nhau. */
function hubSpec(o) {
  const W = o.w || 980, iw = o.iw || 186, ow = o.ow || 196, nh = o.nh || 40, gap = o.gap || 48;
  const rows = Math.max(o.ins.length, o.outs.length), Hh = 32 + (rows - 1) * gap + nh;
  const cw = o.cw || 196, ch = Math.min(o.ch || 236, Hh - 40), cx = (W - cw) / 2, cy = Hh / 2;
  const nodes = [Object.assign({ x: cx, y: cy - ch / 2, w: cw, h: ch, k: 'big' }, o.center)], edges = [];
  const col = (arr, side) => {
    const top = 16 + (rows - arr.length) * gap / 2;
    arr.forEach((n, i) => {
      const yc = top + i * gap + nh / 2, d = Math.abs(yc - cy);
      const ys = cy + clamp((yc - cy) * (ch - 36) / Math.max(1, Hh - nh - 32), -ch / 2 + 16, ch / 2 - 16);
      if (side === 'in') {
        const x = 16, x1 = x + iw, mx = x1 + 20 + d * (cx - x1 - 40) / (Hh / 2);
        nodes.push(Object.assign({ x, y: yc - nh / 2, w: iw, h: nh, k: 'h' }, n));
        edges.push({ a: n.id, b: o.center.id, f: n.f || o.fin, as: 'r', bs: 'l', bo: ys - cy, p: [[mx, yc], [mx, ys]], dot: o.dots });
      } else {
        const x = W - 16 - ow, x0 = cx + cw, mx = x - 20 - d * (x - x0 - 40) / (Hh / 2);
        nodes.push(Object.assign({ x, y: yc - nh / 2, w: ow, h: nh, k: 'h' }, n));
        edges.push({ a: o.center.id, b: n.id, f: n.f || o.fout, as: 'r', bs: 'l', ao: ys - cy, p: [[mx, ys], [mx, yc]], dot: o.dots });
      }
    });
  };
  col(o.ins, 'in'); col(o.outs, 'out');
  return { w: W, h: Hh, nodes, edges, label: o.label };
}

/* ---------- dải luồng A → B → C (HTML, tự xuống dòng trên điện thoại) ---------- */
function flowStrip(items, o = {}) {
  return `<div class="fs${o.big ? ' big' : ''}" data-fs>${items.map((it, i) => {
    const tone = it.tone || o.tone || 'info';
    const inner = `${H.ibox(it.ic || 'info', tone)}<span>${esc(it.t)}${it.s ? `<small>${esc(it.s)}</small>` : ''}</span>`;
    const node = it.c ? `<button type="button" class="fs-n tn-${tone}" data-c="${it.c}">${inner}</button>` : it.go ? `<a class="fs-n tn-${tone}" href="#${it.go}">${inner}</a>` : `<span class="fs-n tn-${tone}">${inner}</span>`;
    return (i ? `<i class="fs-a tn-${it.at || tone}" aria-hidden="true"></i>` : '') + node;
  }).join('')}</div>`;
}
function animateStrips(root) {
  if (RM) return;
  $$('[data-fs]', root).forEach(fs => {
    const ns = $$('.fs-n', fs); if (ns.length < 2) return; let i = 0;
    every(950, () => { ns.forEach((n, k) => n.classList.toggle('cur', k === i)); i = (i + 1) % ns.length; });
  });
}
