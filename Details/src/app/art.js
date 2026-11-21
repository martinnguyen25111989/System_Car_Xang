/* ===== HÌNH MINH HỌA SVG: xe cắt lớp, xe nhìn từ trên, động cơ cắt dọc, dạng sóng, giắc OBD =====
   Hình nguyên lý, không theo tỉ lệ thật. Xe quay đầu sang PHẢI (năng lượng đi từ bình xăng phía sau → động cơ phía trước). */

/* ---------- xe nhìn ngang, cắt lớp (X-ray) – 24 khu vực ---------- */
const CAR_BODY = 'M78,360 L66,354 Q56,346 56,326 L58,296 Q60,276 70,262 L74,246 Q78,234 96,229 L232,215 Q262,212 284,192 L346,142 Q360,131 380,129 L548,124 Q566,124 578,134 L664,194 Q672,199 690,200 Q790,202 862,214 L906,226 Q942,236 950,262 L956,300 Q958,334 946,352 L940,358 L853,360 A64,64 0 1 0 727,360 L303,360 A64,64 0 1 0 177,360 Z';
const ZPIN = { engine: [812, 300], trans: [746, 290], fueltank: [370, 332], fuel: [540, 346], intake: [891, 241], exhaust: [620, 366],
  cooling: [924, 296], lube: [820, 344], ignition: [811, 232], electrical: [440, 340], battery: [721, 227], alternator: [852, 314],
  starter: [761, 328], ecu: [758, 226], sensors: [864, 270], brakes: [262, 338], steering: [606, 236], suspension: [246, 288],
  wheels: [206, 380], hvac: [635, 263], safety: [514, 254], adas: [568, 142], body: [610, 297], infotainment: [638, 223] };
const ZORDER = ['exhaust', 'electrical', 'fueltank', 'fuel', 'trans', 'engine', 'lube', 'ignition', 'intake', 'cooling', 'battery', 'ecu',
  'alternator', 'starter', 'steering', 'hvac', 'safety', 'body', 'infotainment', 'adas', 'wheels', 'brakes', 'suspension', 'sensors'];
const ZART = {
  exhaust: '<path class="c-exh zs" d="M866,300 Q884,302 884,318 L882,350 Q880,366 862,366 L742,366"/><rect class="c-cat zs" x="692" y="358" width="50" height="16" rx="7"/><path class="c-exh zs" d="M692,366 L494,366"/><rect class="c-exhb zs" x="442" y="359" width="52" height="14" rx="7"/><path class="c-exh zs" d="M442,366 L196,366"/><rect class="c-exhb zs" x="106" y="352" width="90" height="26" rx="9"/><path class="c-exh zs" d="M106,370 L72,372"/>',
  electrical: '<path class="c-harn zs" d="M716,240 Q700,250 698,268 L698,330 Q698,340 686,340 L300,340 Q282,340 272,326 L246,300 L120,288 Q92,286 82,268"/><path class="c-harn zs" d="M740,224 Q820,210 900,244"/>',
  fueltank: '<path class="c-neck" d="M302,318 Q280,312 274,292 L270,276"/><path class="c-tank zs" d="M300,318 Q300,312 306,312 H404 Q410,312 410,318 V346 Q410,352 404,352 H306 Q300,352 300,346 Z"/><path class="c-det" d="M340,330 H398"/>',
  fuel: '<path class="c-fuelln zs" d="M330,346 H736 Q770,346 771,330 L773,262 H792"/><rect class="c-pump zs" x="316" y="318" width="14" height="28" rx="3"/><rect class="c-pump zs" x="792" y="258" width="52" height="6" rx="2"/>',
  trans: '<path class="c-trans zs" d="M722,270 Q722,266 727,266 H771 V338 Q771,343 766,343 H732 Q722,343 722,334 Z"/><circle class="c-det" cx="746" cy="300" r="11"/><circle class="c-det" cx="746" cy="300" r="4"/>',
  engine: '<rect class="c-eng2 zs" x="782" y="240" width="76" height="9" rx="3"/><rect class="c-eng zs" x="776" y="249" width="88" height="15" rx="3"/><path class="c-eng zs" d="M772,264 H868 V326 Q868,333 861,333 H779 Q772,333 772,326 Z"/><path class="c-det" d="M784,278 H856 M784,292 H856 M784,306 H830"/><circle class="c-eng2 zs" cx="846" cy="322" r="7"/>',
  lube: '<path class="c-oil zs" d="M778,333 H862 L858,345 Q856,350 849,350 H791 Q785,350 783,345 Z"/>',
  ignition: [790, 806, 822, 838].map(x => `<rect class="c-ign zs" x="${x}" y="229" width="10" height="13" rx="2"/>`).join(''),
  intake: '<path class="c-airp zs" d="M874,241 C866,241 866,252 858,255"/><rect class="c-air zs" x="874" y="232" width="34" height="18" rx="4"/>',
  cooling: '<rect class="c-rad zs" x="918" y="250" width="12" height="90" rx="2"/><path class="c-det" d="M920,262H928M920,274H928M920,286H928M920,298H928M920,310H928M920,322H928"/><circle class="c-fan zs" cx="902" cy="298" r="15"/><path class="c-det" d="M902,298 L902,285 M902,298 L913,305 M902,298 L891,305"/><path class="c-hot" d="M864,258 Q892,256 918,262"/><path class="c-cold" d="M918,332 Q892,338 868,318"/><rect class="c-rad zs" x="896" y="256" width="14" height="14" rx="3"/>',
  battery: '<rect class="c-batp" x="708" y="209" width="8" height="6" rx="1"/><rect class="c-batn" x="726" y="209" width="8" height="6" rx="1"/><rect class="c-bat zs" x="702" y="214" width="38" height="26" rx="3"/>',
  ecu: '<rect class="c-ecu zs" x="746" y="218" width="24" height="17" rx="2"/><path class="c-ecu2" d="M750,235V239M755,235V239M760,235V239M765,235V239"/>',
  alternator: '<circle class="c-alt zs" cx="852" cy="314" r="9"/><circle class="c-det" cx="852" cy="314" r="3"/>',
  starter: '<rect class="c-st zs" x="750" y="322" width="22" height="12" rx="5"/>',
  steering: '<path class="c-steer zs" d="M610,244 L690,268 L736,340"/><rect class="c-st zs" x="726" y="338" width="30" height="7" rx="3"/><ellipse class="c-steerw zs" cx="606" cy="236" rx="5.5" ry="20" transform="rotate(-22 606 236)"/>',
  hvac: '<rect class="c-ac zs" x="933" y="252" width="5" height="86" rx="2"/><circle class="c-ac zs" cx="868" cy="341" r="6"/><rect class="c-ac zs" x="612" y="252" width="46" height="22" rx="7"/><circle class="c-det" cx="625" cy="263" r="6"/>',
  safety: '<path class="c-belt zs" d="M482,182 L536,298 M520,300 L560,302"/><circle class="c-safe zs" cx="609" cy="237" r="6"/><rect class="c-safe zs" x="650" y="225" width="18" height="7" rx="3"/><rect class="c-safe zs" x="556" y="318" width="18" height="10" rx="2"/><rect class="c-safe zs" x="940" y="304" width="7" height="8" rx="1.5"/>',
  body: '<path class="c-light zs" d="M900,236 Q930,240 945,256 L932,262 Q914,250 893,246 Z"/><path class="c-tail zs" d="M63,274 L66,262 L72,250 L94,246 L92,272 Z"/><rect class="c-body2 zs" x="598" y="290" width="24" height="14" rx="2"/><path class="c-body2 zs" d="M640,204 L652,194 H664 V206 H648 Z"/><path class="c-steer zs" d="M652,200 L684,193"/><rect class="c-body2 zs" x="478" y="236" width="8" height="12" rx="2"/><circle class="c-body2 zs" cx="936" cy="326" r="5"/>',
  infotainment: '<rect class="c-info zs" x="628" y="216" width="20" height="14" rx="2"/><rect class="c-info2" x="630.5" y="218.5" width="15" height="8" rx="1"/>',
  adas: '<rect class="c-adas zs" x="562" y="138" width="13" height="8" rx="2"/><rect class="c-adas zs" x="948" y="286" width="7" height="14" rx="2"/><circle class="c-adas zs" cx="954" cy="336" r="3.4"/><circle class="c-adas zs" cx="57" cy="334" r="3.4"/><rect class="c-adas zs" x="58" y="300" width="6" height="10" rx="1.5"/>',
  wheels: [240, 790].map(x => `<circle class="c-tire zs" cx="${x}" cy="348" r="52"/><circle class="c-rim" cx="${x}" cy="348" r="34"/><circle class="c-hubc" cx="${x}" cy="348" r="6"/>`).join(''),
  brakes: '<circle class="c-disc zs" cx="790" cy="348" r="24"/><circle class="c-disc zs" cx="240" cy="348" r="22"/><path class="c-cal zs" d="M806,328 a26,26 0 0 1 10,14 l-8,4 a18,18 0 0 0 -7,-10 z"/><path class="c-cal zs" d="M256,330 a24,24 0 0 1 9,13 l-7,4 a16,16 0 0 0 -6,-9 z"/><circle class="c-st zs" cx="700" cy="258" r="10"/><rect class="c-cal zs" x="708" y="253" width="12" height="9" rx="2"/>',
  suspension: '<rect class="c-damp zs" x="785" y="270" width="10" height="34" rx="3"/><path class="c-susp zs" d="M778,266 H802 M780,272 L800,278 L780,284 L800,290 L780,296 L800,302 L780,308 L800,314"/><path class="c-susp zs" d="M790,346 L744,352"/><rect class="c-damp zs" x="241" y="268" width="10" height="36" rx="3"/><path class="c-susp zs" d="M234,268 H258 M236,274 L256,280 L236,286 L256,292 L236,298 L256,304 L236,310"/><path class="c-susp zs" d="M246,346 L330,340"/>',
  sensors: [[866, 247], [864, 270], [884, 346], [684, 366], [792, 334], [802, 364], [252, 364], [781, 300]].map(([x, y]) => `<circle class="c-sens zs" cx="${x}" cy="${y}" r="3.8"/>`).join('')
};
const CAR_INT = '<path class="c-glass" d="M304,206 L352,158 Q362,150 378,148 L546,144 Q558,144 566,152 L644,206 Z"/><rect class="c-int" x="468" y="145" width="10" height="62"/>' +
  '<path class="c-int" d="M330,304 L316,226 Q314,214 324,212 L336,212 Q344,214 346,226 L362,300 Z"/><path class="c-int" d="M318,208 Q316,194 326,192 L336,192 Q344,194 342,208 Z"/><path class="c-int" d="M332,304 L420,306 Q428,308 426,318 L424,326 L334,326 Z"/>' +
  '<path class="c-int" d="M520,300 L508,214 Q506,202 516,200 L528,200 Q536,202 538,214 L548,296 Z"/><path class="c-int" d="M508,196 Q506,182 516,180 L526,180 Q534,182 532,196 Z"/><path class="c-int" d="M520,300 L600,302 Q610,304 608,314 L606,322 L522,322 Z"/>' +
  '<path class="c-int" d="M690,214 Q646,212 622,226 L604,252 Q612,264 640,268 L690,264 Z"/><path class="c-line" d="M300,338 H690 M690,206 V338"/>';
const CAR_LINES = '<path class="c-line" d="M304,208 H646 M474,208 V350 M648,206 L676,240 V346 M304,208 Q298,250 310,290 V350 M312,349 H726"/><rect class="c-line" x="488" y="222" width="22" height="5" rx="2.5"/><rect class="c-line" x="322" y="222" width="22" height="5" rx="2.5"/>';
const CAR_FLOW = '<path class="flow-e" style="stroke:var(--f-fuel)" d="M410,340 H736 Q770,340 771,326 L773,266"/><path class="flow-e" style="stroke:var(--f-air)" d="M962,250 Q930,240 910,241"/><path class="flow-e" style="stroke:var(--f-trq)" d="M748,320 L788,346"/><path class="flow-e" style="stroke:var(--f-exh)" d="M742,372 L80,376"/><path class="flow-e" style="stroke:var(--f-pwr)" d="M721,212 Q744,204 758,216"/>';

/* o: {id, pins, flow, hl:[zoneId], mini, num:{zone:n}} */
function carSVG(o = {}) {
  const hl = new Set([].concat(o.hl || []));
  const zones = ZORDER.map(z => `<g class="z${hl.has(z) ? ' on' : ''}" data-z="${z}"${o.mini ? '' : ` tabindex="-1"`}>${ZART[z]}</g>`).join('');
  const pins = o.pins ? Object.entries(ZPIN).map(([z, [x, y]]) => `<g class="pin" data-z="${z}" transform="translate(${x},${y})" tabindex="0" role="button" aria-label="${esc((o.names && o.names[z]) || z)}"><circle r="10"/><text y="3.6" text-anchor="middle">${o.num ? o.num[z] : ''}</text></g>`).join('') : '';
  return `<svg class="car${hl.size ? ' hl' : ''}${o.cls ? ' ' + o.cls : ''}" ${o.id ? `id="${o.id}"` : ''} viewBox="${o.vb || '0 110 1000 310'}" role="img" aria-label="${esc(o.label || 'Mặt cắt chiếc xe xăng nhìn ngang, đầu xe bên phải')}">
    <ellipse class="c-shadow" cx="505" cy="402" rx="455" ry="10"/><line class="c-gnd" x1="20" y1="402" x2="980" y2="402"/>
    <path class="c-body" d="${CAR_BODY}"/>${CAR_INT}${zones}<path class="c-out" d="${CAR_BODY}"/>${CAR_LINES}
    ${o.flow ? CAR_FLOW : ''}${pins}</svg>`;
}

/* ---------- xe nhìn từ trên: dẫn động & ADAS (tâm xe y=280, đầu xe bên phải) ---------- */
const TOP_BODY = 'M326,208 H628 Q690,210 708,238 Q716,256 716,280 Q716,304 708,322 Q690,350 628,352 H326 Q290,350 284,322 Q280,300 280,280 Q280,260 284,238 Q290,210 326,208 Z';
function topWheels(drv) {
  const W = [['fl', 618, 196], ['fr', 618, 348], ['rl', 330, 196], ['rr', 330, 348]];
  return W.map(([k, x, y]) => `<rect class="tw${drv && drv.includes(k[0]) ? ' drv' : ''}" data-w="${k}" x="${x}" y="${y}" width="48" height="16" rx="5"/>`).join('');
}
function topShell(inner, under = '') {
  return `${under}<path class="t-body" d="${TOP_BODY}"/><rect class="t-roof" x="372" y="222" width="190" height="116" rx="18"/>
    <path class="t-glass" d="M562,224 Q600,228 614,252 V308 Q600,332 562,336 Z"/><path class="t-glass" d="M372,226 Q350,232 344,252 V308 Q350,328 372,334 Z"/>
    <path class="t-line" d="M614,240 Q650,236 690,246 M614,320 Q650,324 690,314"/><path class="t-body" d="M586,206 l10,-10 h8 v10 z M586,354 l10,10 h8 v-10 z"/>${inner}`;
}
const DRV = {
  fwd: { parts: '<rect class="t-eng" x="598" y="226" width="82" height="66" rx="8"/><text class="t-lbl" x="639" y="262" text-anchor="middle">Động cơ</text><rect class="t-gb" x="604" y="292" width="72" height="40" rx="8"/><text class="t-lbl w" x="640" y="316" text-anchor="middle">Hộp số + vi sai</text>',
    flow: ['M640,252 V302', 'M642,304 V212', 'M642,320 V348'], drv: 'f' },
  rwd: { parts: '<rect class="t-eng" x="578" y="254" width="112" height="52" rx="8"/><text class="t-lbl" x="634" y="284" text-anchor="middle">Động cơ dọc</text><rect class="t-gb" x="500" y="262" width="78" height="36" rx="8"/><text class="t-lbl w" x="539" y="284" text-anchor="middle">Hộp số</text><circle class="t-diff" cx="354" cy="280" r="13"/><text class="t-lbl" x="354" y="312" text-anchor="middle">Vi sai sau</text>',
    flow: ['M610,280 H504', 'M500,280 H368', 'M354,268 V212', 'M354,292 V348'], drv: 'r', shaft: 'M500,280 H368' },
  awd: { parts: '<rect class="t-eng" x="598" y="226" width="82" height="66" rx="8"/><text class="t-lbl" x="639" y="262" text-anchor="middle">Động cơ</text><rect class="t-gb" x="604" y="292" width="72" height="40" rx="8"/><text class="t-lbl w" x="640" y="316" text-anchor="middle">Hộp số + PTU</text><rect class="t-cpl" x="380" y="268" width="26" height="24" rx="5"/><circle class="t-diff" cx="354" cy="280" r="12"/><text class="t-lbl" x="393" y="306" text-anchor="middle">Khớp nối</text>',
    flow: ['M640,252 V302', 'M642,304 V212', 'M642,320 V348', 'M604,312 L566,280 H408', 'M380,280 H366', 'M354,268 V212', 'M354,292 V348'], drv: 'fr', shaft: 'M604,312 L566,280 H366' },
  '4wd': { parts: '<rect class="t-eng" x="578" y="254" width="112" height="52" rx="8"/><text class="t-lbl" x="634" y="284" text-anchor="middle">Động cơ dọc</text><rect class="t-gb" x="500" y="262" width="78" height="36" rx="8"/><text class="t-lbl w" x="539" y="284" text-anchor="middle">Hộp số</text><rect class="t-cpl" x="466" y="258" width="34" height="44" rx="6"/><text class="t-lbl" x="483" y="250" text-anchor="middle">Hộp số phụ</text><circle class="t-diff" cx="642" cy="318" r="11"/><circle class="t-diff" cx="354" cy="280" r="13"/>',
    flow: ['M600,280 H504', 'M490,300 L522,318 H630', 'M642,307 V212', 'M642,329 V348', 'M466,280 H368', 'M354,268 V212', 'M354,292 V348'], drv: 'fr', shaft: 'M490,300 L522,318 H630 M466,280 H368' }
};
function drivetrainSVG(mode) {
  const m = DRV[mode] || DRV.fwd;
  const shafts = (m.shaft ? `<path class="t-shaft" d="${m.shaft}"/>` : '') + '<path class="t-shaft" d="M642,212 V348 M354,212 V348"/>';
  return `<svg class="top-car" viewBox="240 150 520 260" role="img" aria-label="Sơ đồ dẫn động nhìn từ trên xuống, đầu xe bên phải">
    <rect x="240" y="150" width="520" height="260" fill="#fbfcfe"/>${topShell(m.parts + m.flow.map(d => `<path class="flow-e" d="${d}"/>`).join(''), shafts)}${topWheels(m.drv)}
    <text class="t-lbl" x="740" y="168" text-anchor="end">ĐẦU XE →</text></svg>`;
}
function miniCarTop(x, y, cls = '') { return `<g class="t-other ${cls}" transform="translate(${x},${y})"><rect width="104" height="56" rx="14"/><rect x="58" y="8" width="24" height="40" rx="6" class="t-og"/></g>`; }
function adasSVG() {
  const us = [[712, 236], [716, 262], [716, 298], [712, 324], [284, 236], [280, 262], [280, 298], [284, 324]];
  return `<svg class="top-car" id="adasSvg" viewBox="0 0 1000 560" role="img" aria-label="Vùng quan sát của cảm biến ADAS quanh xe, nhìn từ trên">
    <rect width="1000" height="560" fill="#eef1f5"/><rect y="180" width="1000" height="200" fill="#e6eaf0"/>
    <path class="t-lane" data-a="lane" d="M0,180 H1000 M0,380 H1000"/>
    <g class="cov" data-s="camera"><polygon points="570,280 1000,150 1000,410"/></g>
    <g class="cov" data-s="radar"><polygon points="716,280 1000,252 1000,308"/></g>
    <g class="cov" data-s="bsm"><rect x="110" y="112" width="330" height="62" rx="8"/><rect x="110" y="386" width="330" height="62" rx="8"/></g>
    <g class="cov" data-s="rcta"><polygon points="290,226 40,40 40,250"/><polygon points="290,334 40,310 40,520"/></g>
    <g class="cov" data-s="rearcam"><polygon points="280,280 70,170 70,390"/></g>
    <g class="cov" data-s="sonar"><path d="M712,226 Q800,280 712,334 Z"/><path d="M284,226 Q196,280 284,334 Z"/></g>
    <g class="actor" data-a="lead">${miniCarTop(860, 252)}</g>
    <g class="actor" data-a="side">${miniCarTop(190, 116)}</g>
    <g class="actor" data-a="cross"><g class="t-cross">${miniCarTop(90, 420, 'v')}</g></g>
    <g class="actor" data-a="wall"><rect x="150" y="226" width="16" height="108" rx="4" class="t-wall"/></g>
    ${topShell('')}${topWheels('')}
    <g class="sn" data-s="camera"><rect x="562" y="272" width="16" height="16" rx="4"/></g>
    <g class="sn" data-s="radar"><rect x="712" y="270" width="10" height="20" rx="3"/></g>
    <g class="sn" data-s="bsm"><circle cx="294" cy="218" r="6"/><circle cx="294" cy="342" r="6"/></g>
    <g class="sn" data-s="rcta"><circle cx="294" cy="218" r="6"/><circle cx="294" cy="342" r="6"/></g>
    <g class="sn" data-s="rearcam"><rect x="276" y="272" width="10" height="16" rx="3"/></g>
    <g class="sn" data-s="sonar">${us.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.2"/>`).join('')}</g>
  </svg>`;
}

/* ---------- động cơ cắt dọc 1 xi-lanh DOHC + mặt trước xích cam ---------- */
const EHS = [['cylinder', 130, 262], ['piston', 0, 0], ['conrod', 0, 0], ['crankshaft', 210, 430], ['camshaft', 172, 40], ['valvein', 146, 108],
  ['valveex', 274, 108], ['sparkplug', 210, 22], ['timing', 449, 262], ['head', 334, 64], ['block', 312, 350], ['oilpan', 300, 474], ['flywheel', 291, 400], ['injector', 104, 44]];
function engineSVG() {
  const spring = x => { let d = `M${x - 10},64`; for (let i = 0; i < 8; i++) d += ` L${i % 2 ? x - 10 : x + 10},${68 + i * 4}`; return `<path class="e-spring" d="${d}"/>`; };
  const cam = (id, x) => `<g id="${id}" transform="translate(${x},40)"><path class="e-cam" d="M0,-12 A12,12 0 1 0 0,12 Q18,9 26,0 Q18,-9 0,-12 Z"/><circle r="4" fill="#475569"/></g>`;
  const valve = (id, x, cls) => `<g id="${id}"><rect class="e-valve" x="${x - 10}" y="55" width="20" height="9" rx="2"/><rect class="e-valve" x="${x - 3}" y="62" width="6" height="80"/><path class="e-valve ${cls}" d="M${x - 20},148 H${x + 20} L${x + 14},140 H${x - 14} Z"/></g>`;
  const pts = (pre, n, col) => Array.from({ length: n }, (_, i) => `<circle id="${pre}${i}" r="3.3" fill="${typeof col === 'function' ? col(i) : col}" opacity="0"/>`).join('');
  const hs = EHS.map(([k, x, y], i) => `<g class="hs" data-c="${k}" id="hs-${k}" transform="translate(${x},${y})" tabindex="0" role="button"><circle r="10"/><text y="3.6" text-anchor="middle">${i + 1}</text></g>`).join('');
  return `<svg class="eng" id="engSvg" viewBox="0 0 560 540" role="img" aria-label="Mặt cắt một xi-lanh động cơ xăng 4 kỳ DOHC: trục cam, xu-páp nạp và xả, bugi, kim phun, piston, thanh truyền, trục khuỷu, các-te dầu và xích cam nhìn từ phía trước">
  <defs><radialGradient id="eFl"><stop offset="0" stop-color="#fff7c2"/><stop offset=".35" stop-color="#fbbf24"/><stop offset=".72" stop-color="#f97316" stop-opacity=".8"/><stop offset="1" stop-color="#ef4444" stop-opacity="0"/></radialGradient>
  <clipPath id="eClip"><path d="M133,160 L152,148 H268 L287,160 V376 H133 Z"/></clipPath></defs>
  <path class="e-block" d="M88,156 H332 V372 Q332,384 344,392 L352,398 H68 L76,392 Q88,384 88,372 Z"/>
  <rect class="e-jacket" x="100" y="172" width="22" height="150" rx="6"/><rect class="e-jacket" x="298" y="172" width="22" height="150" rx="6"/>
  <rect x="133" y="150" width="154" height="226" fill="#f8fafc"/>
  <path class="e-pan" d="M68,398 H352 L344,486 Q340,510 316,512 H104 Q80,510 76,486 Z"/>
  <path class="e-oil" id="eOil" d="M79,490 Q83,508 104,510 H316 Q337,508 341,490 Z"/>
  <path id="eGas" d="M133,160 L152,148 H268 L287,160 V200 H133 Z" fill="#d6ecfa"/>
  <rect class="e-wall" x="128" y="156" width="5" height="220"/><rect class="e-wall" x="287" y="156" width="5" height="220"/>
  <path class="e-head" d="M70,30 H350 V160 H287 L268,148 H152 L133,160 H70 Z"/>
  <path class="e-port" d="M36,86 H120 Q166,86 194,148 H152 Q140,118 112,118 H36 Z"/>
  <path class="e-port" d="M384,86 H300 Q254,86 226,148 H268 Q280,118 308,118 H384 Z"/>
  <text class="e-lbl" x="40" y="80">KHÍ NẠP →</text><text class="e-lbl" x="380" y="80" text-anchor="end">→ KHÍ XẢ</text>
  ${pts('eP', 8, i => i % 3 === 2 ? '#f59e0b' : '#38bdf8')}${pts('eX', 8, '#8b95a5')}
  <g transform="translate(118,64) rotate(-32)"><path id="eSpray" d="M0,12 L-10,48 L10,48 Z" fill="#fbbf24" opacity="0"/><rect class="e-inj" x="-6" y="-26" width="12" height="30" rx="3"/><rect class="e-inj" x="-3" y="3" width="6" height="9" rx="1"/></g>
  ${spring(172)}${spring(248)}${valve('eVin', 172, 'e-vin')}${valve('eVex', 248, 'e-vex')}
  ${cam('eCin', 172)}${cam('eCex', 248)}
  <rect x="207" y="2" width="6" height="10" fill="#475569"/><rect class="e-plug" x="204" y="10" width="12" height="62" rx="3"/><rect class="e-plugt" x="201" y="72" width="18" height="15" rx="2"/>
  <rect class="e-plug" x="204" y="87" width="12" height="55" rx="1"/><path d="M204,96h12M204,104h12M204,112h12M204,120h12M204,128h12M204,136h12" stroke="#94a3b8"/>
  <path d="M210,142 V150 M205,153 H215" stroke="#334155" stroke-width="2.4" stroke-linecap="round"/>
  <circle id="eFlash" cx="210" cy="158" r="0" fill="url(#eFl)" clip-path="url(#eClip)"/>
  <path id="eSpark" d="M210,148 l3,5 6,-1 -4,5 3,6 -6,-3 -4,5 -1,-6 -6,-2 6,-2 z" fill="#fde047" stroke="#f59e0b" opacity="0"/>
  <g id="ePis"><rect class="e-piston" x="135" y="0" width="150" height="64" rx="5"/><path class="e-ring" d="M135,10 H285 M135,17 H285 M135,24 H285"/><circle class="e-cpin" cx="210" cy="38" r="8"/></g>
  <line id="eRodO" x1="210" y1="234" x2="210" y2="384" stroke="#475569" stroke-width="21" stroke-linecap="round"/>
  <line id="eRodI" x1="210" y1="234" x2="210" y2="384" stroke="#b8c3d1" stroke-width="15" stroke-linecap="round"/>
  <g id="eCrank" transform="translate(210,430)"><path class="e-crank" d="M-50,6 A50,50 0 0 0 50,6 L24,-4 H-24 Z"/><rect class="e-crank" x="-16" y="-60" width="32" height="68" rx="13"/><circle class="e-cpin" cx="0" cy="-46" r="12"/></g>
  <circle class="e-cpin" cx="210" cy="430" r="9"/>
  <circle class="e-fly" cx="210" cy="430" r="86"/>
  <rect x="412" y="20" width="136" height="504" rx="14" fill="#f8fafc" stroke="#e2e8f0"/>
  <text class="e-lbl" x="480" y="40" text-anchor="middle">MẶT TRƯỚC</text>
  <path id="eChain" d="M432,96 L467,430 A11,11 0 0 0 489,430 L524,96 A20,20 0 0 0 504,76 H452 A20,20 0 0 0 432,96 Z" fill="none" stroke="#64748b" stroke-width="3.5" stroke-dasharray="4 3"/>
  <path d="M528,160 Q536,270 506,390" fill="none" stroke="#d4a24c" stroke-width="6" stroke-linecap="round"/>
  <g id="eSp1" transform="translate(452,96)"><circle r="20" fill="#e2e8f0" stroke="#64748b" stroke-width="2" stroke-dasharray="3 2"/><path d="M0,-14 V14 M-14,0 H14" stroke="#94a3b8" stroke-width="2"/></g>
  <g id="eSp2" transform="translate(504,96)"><circle r="20" fill="#e2e8f0" stroke="#64748b" stroke-width="2" stroke-dasharray="3 2"/><path d="M0,-14 V14 M-14,0 H14" stroke="#94a3b8" stroke-width="2"/></g>
  <g id="eSp0" transform="translate(478,430)"><circle r="11" fill="#e2e8f0" stroke="#64748b" stroke-width="2" stroke-dasharray="2 2"/><path d="M0,-7 V7" stroke="#94a3b8" stroke-width="2"/></g>
  <text class="e-lbl" x="452" y="136" text-anchor="middle">cam nạp</text><text class="e-lbl" x="506" y="136" text-anchor="middle">cam xả</text><text class="e-lbl" x="478" y="462" text-anchor="middle">trục khuỷu</text>
  <text class="e-lbl" x="480" y="492" text-anchor="middle">cam quay 1/2</text><text class="e-lbl" x="480" y="506" text-anchor="middle">tốc độ trục khuỷu</text>
  ${hs}</svg>`;
}

/* ---------- dạng sóng cảm biến (minh họa) ---------- */
function waveSVG(type) {
  const p = []; const add = (x, y) => p.push(`${(6 + x * 208).toFixed(1)},${y.toFixed(1)}`);
  const N = 120; let d2 = '';
  for (let i = 0; i <= N; i++) {
    const x = i / N; let y = 30;
    switch (type) {
      case 'rise': y = 50 - 40 * Math.pow(x, .62); break;
      case 'fall': y = 10 + 38 * (1 - Math.exp(-2.6 * x)); break;
      case 'lin': y = x < .2 ? 48 : x < .7 ? 48 - (x - .2) / .5 * 36 : 12; break;
      case 'map': y = x < .25 ? 44 : x < .32 ? 44 - (x - .25) / .07 * 34 : x < .45 ? 10 : x < .55 ? 10 + (x - .45) / .1 * 40 : x < .7 ? 50 : 50 - (x - .7) / .3 * 6; break;
      case 'o2': y = 30 - 18 * Math.sin(x * Math.PI * 9) * (0.9 + .1 * Math.sin(x * 40)); break;
      case 'af': y = 30 - 3.5 * Math.sin(x * 27) - 2 * Math.sin(x * 61); break;
      case 'ckp': { const t = Math.floor(x * 40); const gap = t % 20 >= 18; y = gap ? 48 : (x * 40 - t < .5 ? 12 : 48); break; }
      case 'cmp': { const f = x * 4 % 1; y = f > .1 && f < .22 ? 12 : 48; break; }
      case 'knock': { const b = Math.exp(-Math.pow((x - .55) / .05, 2)); y = 30 - 22 * b * Math.sin(x * 420) - 1.2 * Math.sin(x * 160); break; }
      case 'vss': { const ph = 6 * x * x * 6; y = (ph % 1) < .5 ? 14 : 46; break; }
      case 'wss': y = (x * 22 % 1) < .5 ? 16 : 44; break;
      case 'dual': y = 48 - Math.min(1, Math.max(0, (x - .15) / .6)) * 36; break;
      default: y = 30;
    }
    add(x, y);
  }
  if (type === 'dual') { const q = []; for (let i = 0; i <= N; i++) { const x = i / N; q.push(`${(6 + x * 208).toFixed(1)},${(52 - Math.min(1, Math.max(0, (x - .15) / .6)) * 18).toFixed(1)}`); } d2 = `<path class="wl" style="stroke:#60a5fa" d="M${q.join(' L')}"/>`; }
  return `<svg viewBox="0 0 220 58" preserveAspectRatio="none" aria-hidden="true"><path class="wg" d="M6,14 H214 M6,30 H214 M6,46 H214 M58,4 V54 M110,4 V54 M162,4 V54"/><path class="wl" d="M${p.join(' L')}"/>${d2}</svg>`;
}

/* ---------- giắc chẩn đoán OBD-II 16 chân ---------- */
const OBD_PINS = { 4: ['Mass thân xe', '#334155'], 5: ['Mass tín hiệu', '#64748b'], 6: ['CAN-H', '#ea580c'], 14: ['CAN-L', '#fb923c'], 16: ['+12 V ắc quy', '#e11d48'], 7: ['K-line (xe đời cũ)', '#7c3aed'] };
function obdSVG() {
  let pins = '';
  for (let i = 1; i <= 16; i++) {
    const row = i <= 8 ? 0 : 1, col = row ? i - 9 : i - 1;
    const x = 44 + col * 39, y = row ? 96 : 56, m = OBD_PINS[i];
    pins += `<g><rect x="${x - 11}" y="${y - 13}" width="22" height="26" rx="5" fill="${m ? m[1] : '#e2e8f0'}" stroke="${m ? m[1] : '#cbd5e1'}"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="12" font-weight="700" fill="${m ? '#fff' : '#64748b'}">${i}</text></g>`;
  }
  return `<svg class="pin16" viewBox="0 0 360 140" role="img" aria-label="Giắc OBD-II 16 chân: chân 4 và 5 mass, 6 và 14 CAN, 16 dương ắc quy, 7 K-line"><path d="M14,26 H346 Q357,26 355,37 L339,121 Q337,131 326,131 H34 Q23,131 21,121 L5,37 Q3,26 14,26 Z" fill="#f8fafc" stroke="#475569" stroke-width="2"/>${pins}</svg>`;
}
