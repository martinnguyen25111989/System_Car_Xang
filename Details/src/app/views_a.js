/* ===== VIEWS (1/3): bài học & tiến độ, quiz, panel ngữ cảnh, trang chủ, lộ trình, khám phá xe, tìm kiếm ===== */
let LESSONS = [], LMAP = {};
function buildLessons() {
  LESSONS = []; LMAP = {};
  PATH.forEach(L => L.ch.forEach(ch => ch.ls.forEach(id => { if (LMAP[id]) return; const m = { id, lv: L.lv, ch, idx: LESSONS.length }; LESSONS.push(m); LMAP[id] = m; })));
}
function lmeta(id) {
  const [k, v] = id.split(':');
  if (k === 's') { const s = SYS[v]; return s && { id, t: s.n, en: s.en, route: s.route || '/s/' + v, ic: s.ic, tone: s.tone, kind: 'Hệ thống' }; }
  if (k === 'c') { const c = COMP[v]; return c && { id, t: c.n, en: c.en, route: '/c/' + v, ic: c.ic, tone: (SYS[c.s] || {}).tone || 'info', kind: 'Bộ phận' }; }
  const x = XLESSON[v]; return x && { id, t: x[0], route: x[1], ic: x[2], tone: 'info', kind: 'Bài học' };
}
const prog = ls => { const d = ls.filter(i => ST.done(i)).length; return { d, n: ls.length, p: ls.length ? Math.round(d / ls.length * 100) : 0 }; };
const sysLs = sid => ['s:' + sid].concat(((SYS[sid] || {}).comps || []).map(c => 'c:' + c)).filter(id => LMAP[id]);
const lc = s => (s.length > 1 && s[1] !== s[1].toUpperCase()) ? s[0].toLowerCase() + s.slice(1) : s;
const DOMAIN = { overview: 0, engine: 1, fuel: 1, intake: 1, ignition: 1, ecu: 1, sensors: 1, cooling: 1, lube: 1, exhaust: 1, trans: 2, drive: 2, elec: 3, startcharge: 3, brake: 4, steer: 4, susp: 4, wheels: 4, hvac: 5, safety: 5, adas: 5, body: 5 };
function nextLesson(lid) { const m = LMAP[lid]; if (!m) return null; for (let i = m.idx + 1; i < LESSONS.length; i++) if (!ST.done(LESSONS[i].id)) return LESSONS[i].id; return LESSONS[m.idx + 1] ? LESSONS[m.idx + 1].id : null; }
function firstUndone() { const l = LESSONS.find(x => !ST.done(x.id)); return l ? l.id : null; }

/* ---------- chips & thẻ ---------- */
function cchips(arr, cls = 't-info') {
  return (arr || []).map(x => x[0] === '~' ? `<span class="chip">${esc(x.slice(1))}</span>` : COMP[x] ? `<button type="button" class="chip ${cls}" data-c="${x}">${esc(COMP[x].sh || COMP[x].n)}</button>` : '').join('');
}
function ccard(id, extra = '') {
  const c = COMP[id]; if (!c) return ''; const s = SYS[c.s] || {};
  return `<button type="button" class="cc" data-c="${id}">${H.ibox(c.ic, s.tone)}<span class="cc-b"><b>${esc(c.n)}</b><small>${esc(c.en)}</small><span class="d">${esc(c.fn)}</span>${extra}</span>${ST.done('c:' + id) ? `<span class="done">${ic('checkc')}</span>` : ''}</button>`;
}
function miniCar(z) { return carSVG({ mini: true, hl: z ? [z] : [], vb: '40 115 940 300', label: 'Vị trí trên xe' }); }
function fsFromSys(s, big) { return s.flow ? flowStrip(s.flow, { big }) : ''; }

/* ---------- quiz tự sinh (ổn định theo id bài) ---------- */
const XQUIZ = {
  '4stroke': [{ q: 'Thứ tự đúng của 4 kỳ là gì?', o: ['Nạp → Nén → Nổ → Xả', 'Nén → Nạp → Xả → Nổ', 'Nổ → Nạp → Nén → Xả', 'Nạp → Nổ → Nén → Xả'], a: 0, why: 'Hút hỗn hợp vào, nén lại, đốt cháy sinh công, rồi đẩy khí cháy ra.' },
    { q: 'Một chu trình 4 kỳ ứng với bao nhiêu vòng quay trục khuỷu?', o: ['1 vòng', '2 vòng (720°)', '4 vòng', 'Nửa vòng'], a: 1, why: 'Mỗi kỳ là một lần piston đi hết hành trình (180°), 4 kỳ = 720° = 2 vòng.' },
    { q: 'Ở kỳ nén, xu-páp ở trạng thái nào?', o: ['Xu-páp nạp mở', 'Cả hai đóng kín', 'Xu-páp xả mở', 'Cả hai mở'], a: 1, why: 'Buồng đốt phải kín thì hỗn hợp mới bị nén.' }],
  obd: [{ q: 'Giắc OBD-II thường nằm ở đâu?', o: ['Trong cốp xe', 'Dưới táp-lô phía người lái', 'Trên nắp máy', 'Dưới gầm xe'], a: 1, why: 'Chuẩn OBD-II quy định giắc nằm trong cabin, gần vị trí người lái.' },
    { q: 'Chữ cái đầu “P” trong mã P0301 nghĩa là gì?', o: ['Phanh', 'Powertrain – động cơ & hộp số', 'Pin', 'Phần thân xe'], a: 1, why: 'P = Powertrain; C = Chassis; B = Body; U = Network.' },
    { q: 'Chân 6 và 14 của giắc OBD-II dùng cho gì?', o: ['Nguồn 12 V', 'Mạng CAN', 'Mass', 'Đèn báo'], a: 1, why: 'Chân 6 là CAN-H, chân 14 là CAN-L.' }],
  dtc: [{ q: 'Mã P0171 có nghĩa là phải thay cảm biến O2?', o: ['Đúng, luôn luôn', 'Không – nó chỉ báo hỗn hợp nghèo, phải tìm nguyên nhân', 'Phải thay ECU', 'Phải thay bơm xăng'], a: 1, why: 'Mã lỗi chỉ hướng; nguyên nhân thường gặp là rò khí, MAF bẩn hoặc áp suất xăng thấp.' },
    { q: 'P0301 và P0303 khác nhau ở điểm nào?', o: ['Khác hệ thống', 'Xi-lanh bị bỏ máy khác nhau (1 và 3)', 'Một mã là của hộp số', 'Không khác gì'], a: 1, why: 'Hai chữ số cuối 01–04 chỉ số xi-lanh bị bỏ máy.' }],
  diag: [{ q: 'Đề quay đều nhưng không nổ. Nên kiểm tra gì TRƯỚC?', o: ['Thay ECU', 'Xăng, tiếng bơm xăng, đèn chìa khóa', 'Thay hộp số', 'Căn chỉnh thước lái'], a: 1, why: 'Đi từ dễ đến khó: xăng, bơm, immobilizer, rồi tới lửa và cảm biến.' },
    { q: 'Khói xanh từ ống xả thường do đâu?', o: ['Đốt nước làm mát', 'Đốt dầu động cơ', 'Thừa xăng', 'Hơi nước bình thường'], a: 1, why: 'Khói xanh = dầu bị đốt; khói trắng dày = nước; khói đen = thừa xăng.' }],
  lights: [{ q: 'Đèn áp suất dầu màu đỏ sáng khi chạy, bạn nên làm gì?', o: ['Chạy tiếp về nhà', 'Dừng xe an toàn và tắt máy ngay', 'Tăng ga', 'Tắt điều hòa là đủ'], a: 1, why: 'Mất áp suất dầu có thể làm hỏng máy chỉ sau vài phút.' },
    { q: 'Đèn Check Engine NHẤP NHÁY nghĩa là gì?', o: ['Bình thường', 'Bỏ máy nặng – giảm tải, kiểm tra ngay', 'Hết xăng', 'Cần thay dầu'], a: 1, why: 'Bỏ máy nặng làm xăng chưa cháy đổ vào bầu xúc tác, có thể làm nó quá nhiệt.' },
    { q: 'Đèn ESC nháy khi đang chạy đường trơn là…', o: ['Lỗi nặng', 'ESC đang can thiệp giữ thăng bằng – bình thường', 'Hết dầu phanh', 'Hỏng túi khí'], a: 1, why: 'Đèn nháy cho biết hệ thống đang làm việc; hãy lái nhẹ nhàng.' }],
  workflow: [{ q: 'Bước đầu tiên của quy trình chẩn đoán là gì?', o: ['Thay linh kiện nghi ngờ', 'Lắng nghe và xác nhận triệu chứng', 'Xóa mã lỗi', 'Cập nhật phần mềm'], a: 1, why: 'Phải hiểu đúng vấn đề, điều kiện xuất hiện trước khi đo kiểm.' },
    { q: 'Vì sao nên kiểm tra nguồn và mass trước khi nghi cảm biến?', o: ['Vì rẻ và rất nhiều lỗi “ma” do điện yếu, mass kém', 'Vì cảm biến không bao giờ hỏng', 'Vì luật quy định', 'Không cần thiết'], a: 0, why: 'Điện áp thấp hoặc mass gỉ làm tín hiệu sai ở nhiều hệ thống cùng lúc.' }],
  lab: [{ q: 'Trong phòng lab, động cơ Honda City nổ theo thứ tự nào?', o: ['1-2-3-4', '1-3-4-2', '1-4-2-3', '4-3-2-1'], a: 1, why: 'Thứ tự nổ 1-3-4-2 giúp cân bằng rung động cho máy 4 xi-lanh thẳng hàng.' }]
};
function quizFor(lid) {
  const r = rng(hashStr(lid)), [k, v] = lid.split(':'), qs = [];
  const pick = (correct, pool, n = 3) => { const seen = new Set([fold(correct)]), out = []; for (const x of shuffle(pool, r)) { if (!x) continue; const f = fold(x); if (seen.has(f)) continue; seen.add(f); out.push(x); if (out.length >= n) break; } return out; };
  const mk = (q, correct, dis, why) => { const o = shuffle([correct].concat(dis), r); return { q, o, a: o.indexOf(correct), why }; };
  const fixed = q => { const o = shuffle(q.o, r); return { q: q.q, o, a: o.indexOf(q.o[q.a]), why: q.why }; };
  if (k === 'c') {
    const c = COMP[v]; if (!c) return []; const far = COMP_LIST.filter(x => DOMAIN[x.s] !== DOMAIN[c.s]);
    qs.push(mk(`${c.n} làm nhiệm vụ gì?`, c.fn, pick(c.fn, far.map(x => x.fn)), c.how));
    if (c.sym && c.sym.length) qs.push(mk(`Khi ${lc(c.n)} hỏng, triệu chứng nào thường gặp?`, c.sym[0], pick(c.sym[0], far.flatMap(x => x.sym || [])), 'Triệu chứng thường gặp: ' + c.sym.join('; ') + '.'));
    if (c.loc) qs.push(mk(`${c.n} nằm ở đâu?`, c.loc, pick(c.loc, far.map(x => x.loc)), c.loc));
  } else if (k === 's') {
    const s = SYS[v]; if (!s) return [];
    (s.quiz || []).forEach(q => qs.push(fixed(q)));
    if (s.flow && s.flow.length >= 3) {
      const i = Math.floor(r() * (s.flow.length - 1)), A = s.flow[i], B = s.flow[i + 1];
      const pool = s.flow.filter((x, j) => j !== i && j !== i + 1).map(x => x.t).concat(['Két nước', 'Bugi', 'Ắc quy', 'Vi sai', 'Lọc gió', 'Máy nén', 'Bánh xe']);
      qs.push(mk(`Trong luồng “${s.n}”, ngay sau “${A.t}” là gì?`, B.t, pick(B.t, pool), 'Thứ tự đúng: ' + s.flow.map(x => x.t).join(' → ') + '.'));
    }
    const cs = (s.comps || []).filter(id => COMP[id]);
    if (cs.length) { const c = COMP[cs[Math.floor(r() * cs.length)]], far = COMP_LIST.filter(x => DOMAIN[x.s] !== DOMAIN[s.id]); qs.push(mk(`Trong ${lc(s.n)}, ${lc(c.sh || c.n)} có chức năng gì?`, c.fn, pick(c.fn, far.map(x => x.fn)), c.how)); }
  } else (XQUIZ[v] || []).forEach(q => qs.push(fixed(q)));
  return qs.slice(0, 4);
}
function quizHTML(lid, qs) {
  if (!qs.length) return '<p class="muted">Bài này chưa có câu hỏi.</p>';
  return `<div class="quiz" data-quiz="${lid}">${qs.map((q, i) => `<div class="qq" data-qi="${i}"><div class="qq-t"><i>${i + 1}/${qs.length}</i><span>${esc(q.q)}</span></div>
    <div class="qq-o">${q.o.map((o, j) => `<button type="button" class="qo" data-o="${j}"><i>${'ABCD'[j]}</i><span>${esc(o)}</span></button>`).join('')}</div><div class="qq-why"></div></div>`).join('')}
    <div class="qscore" hidden></div></div>`;
}
function mountQuiz(root, lid, qs) {
  const box = $(`[data-quiz="${lid}"]`, root); if (!box) return; let got = 0, answered = 0;
  box.addEventListener('click', e => {
    const b = e.target.closest('.qo'); if (!b) return; const qq = b.closest('.qq'); if (qq.classList.contains('ans')) return;
    const q = qs[+qq.dataset.qi], j = +b.dataset.o, ok = j === q.a; qq.classList.add('ans'); answered++; if (ok) got++;
    $$('.qo', qq).forEach((x, k) => { if (k === q.a) x.classList.add('right'); else if (k === j) x.classList.add('wrong'); });
    $('.qq-why', qq).innerHTML = `${ok ? '<b style="color:var(--ok)">Chính xác!</b> ' : '<b style="color:var(--crit)">Chưa đúng.</b> '}${esc(q.why || '')}`;
    if (answered === qs.length) {
      ST.setQuiz(lid, got); const pass = got >= Math.ceil(qs.length * 0.6); const sc = $('.qscore', box); sc.hidden = false;
      sc.innerHTML = `${ic(pass ? 'trophy' : 'replay', 's24')}<div style="flex:1"><b>${got}/${qs.length} câu đúng.</b> ${pass ? 'Tuyệt – bài học đã được đánh dấu hoàn thành.' : 'Xem lại phần trên rồi thử lại nhé.'}</div><button type="button" class="btn sm" data-retry>${ic('replay')}Làm lại</button>`;
      if (pass && !ST.done(lid)) { ST.setDone(lid); toast('Đã hoàn thành: ' + (lmeta(lid) || {}).t); refreshDone(root, lid); }
    }
  });
  box.addEventListener('click', e => { if (!e.target.closest('[data-retry]')) return; const nb = quizHTML(lid, qs); box.outerHTML = nb; mountQuiz(root, lid, qs); });
}
function doneBarHTML(lid) {
  const d = ST.done(lid), nx = nextLesson(lid), nm = nx && lmeta(nx);
  return `<div class="donebar${d ? ' is' : ''}" data-done="${lid}"><div class="row">${ic(d ? 'checkc' : 'book', 's24')}<b>${d ? 'Bạn đã hoàn thành bài này' : 'Đã hiểu bài này?'}</b></div>
    <div class="row"><button type="button" class="btn${d ? '' : ' go'}" data-mark="${lid}">${d ? 'Bỏ đánh dấu' : ic('check') + 'Đánh dấu đã học'}</button>
    ${nm ? `<a class="btn pri" href="#${nm.route}">Bài tiếp theo: ${esc(nm.t)} ${ic('arrow')}</a>` : ''}</div></div>`;
}
function refreshDone(root, lid) { $$(`[data-done="${lid}"]`, root).forEach(el => { el.outerHTML = doneBarHTML(lid); }); }
function mountDone(root) {
  root.addEventListener('click', e => { const b = e.target.closest('[data-mark]'); if (!b) return; const id = b.dataset.mark; ST.setDone(id, !ST.done(id)); refreshDone(root, id); if (ST.done(id)) toast('Đã đánh dấu hoàn thành'); });
}

/* ---------- panel ngữ cảnh ---------- */
const CTX = {
  set(html) { const el = $('#ctx'); el.innerHTML = `<div class="ctx-x"><span>Chi tiết</span><button type="button" class="icon-btn" data-ctx-close aria-label="Đóng">${ic('x')}</button></div>` + html; },
  open() { if (innerWidth < 1280) { $('#ctx').classList.add('open'); $('#scrim').hidden = false; } },
  close() { $('#ctx').classList.remove('open'); if (!$('#side').classList.contains('open')) $('#scrim').hidden = true; },
  comp(id, open = true) { if (!COMP[id]) return; this.set(ctxComp(id)); if (open) this.open(); emit('ctxsel', id); },
  def() { this.set(ctxDefault()); }
};
function ctxComp(id) {
  const c = COMP[id], s = SYS[c.s] || {};
  return `<div class="cp"><div class="cp-h">${H.ibox(c.ic, s.tone, 'lg')}<div><h3>${esc(c.n)}</h3><small>${esc(c.en)} · <a href="#${s.route || '/s/' + s.id}">${esc(s.n)}</a></small></div></div>
  <div class="cp-b"><div class="cp-f"><span>${ic('target')}Chức năng</span><p>${esc(c.fn)}</p></div><div class="cp-f"><span>${ic('car')}Vị trí</span><p>${esc(c.loc)}</p></div>
  <div class="cp-f"><span>${ic('network')}Kết nối với</span><div class="row">${cchips((c.in || []).concat(c.out || []).slice(0, 8))}</div></div>
  <div class="cp-f"><span>${ic('alert')}Khi hỏng</span><div class="symg">${(c.sym || []).slice(0, 3).map(x => `<span class="sym">${ic('alert')}${esc(x)}</span>`).join('')}</div></div>
  <a class="btn pri" href="#/c/${c.id}">${ic('book')}Mở bài học 10 phần</a></div>
  <div class="cp-map"><div class="lbl">Vị trí trên xe</div>${miniCar(c.z)}</div></div>`;
}
function zoneInfo(zid) {
  const z = ZMAP[zid]; if (!z) return null;
  if (z.c) { const c = COMP[z.c]; return { n: z.n, en: c.en, ic: z.ic, fn: c.fn, loc: c.loc, cn: cchips((c.in || []).concat(c.out || []).slice(0, 6)), cnT: ((c.in || []).concat(c.out || [])).map(x => x[0] === '~' ? x.slice(1) : (COMP[x] ? (COMP[x].sh || COMP[x].n) : '')).filter(Boolean).slice(0, 4).join(', '), fail: (c.sym || []).slice(0, 3), go: '/c/' + c.id, gt: 'Mở bài học', tone: (SYS[c.s] || {}).tone }; }
  const s = SYS[z.sys]; return { n: z.n, en: s.en, ic: z.ic, fn: s.fn, loc: s.loc, cn: `<p>${esc(s.cn)}</p>`, cnT: s.cn, fail: (s.fails || []).map(f => f[0]).slice(0, 3), go: s.route || '/s/' + s.id, gt: 'Học hệ thống này', tone: s.tone };
}
function ctxZone(zid) {
  const i = zoneInfo(zid); if (!i) return '';
  return `<div class="cp"><div class="cp-h">${H.ibox(i.ic, i.tone, 'lg')}<div><small style="margin:0 0 2px">Khu vực ${ZMAP[zid].num} · ${ZCAT[ZMAP[zid].cat][0]}</small><h3>${esc(i.n)}</h3><small>${esc(i.en)}</small></div></div>
  <div class="cp-b"><div class="cp-f"><span>${ic('target')}Chức năng</span><p>${esc(i.fn)}</p></div><div class="cp-f"><span>${ic('car')}Vị trí</span><p>${esc(i.loc)}</p></div>
  <div class="cp-f"><span>${ic('network')}Kết nối với</span><div class="row">${i.cn}</div></div>
  <div class="cp-f"><span>${ic('alert')}Khi hỏng</span><div class="symg">${i.fail.map(x => `<span class="sym">${ic('alert')}${esc(x)}</span>`).join('')}</div></div>
  <a class="btn pri" href="#${i.go}">${ic('book')}${i.gt}</a></div></div>`;
}
function ctxDefault() {
  const t = prog(LESSONS.map(l => l.id)), nx = firstUndone(), nm = nx && lmeta(nx);
  return `<div class="cp ctx-home"><div class="cp-h">${H.ibox('trophy', 'ok', 'lg')}<div><h3>Tiến độ của bạn</h3><small>${t.d}/${t.n} bài đã hoàn thành</small></div></div>
    <div class="cp-b">${H.bar(t.p)}<div class="mini-stat">${PATH.map(L => { const p = prog(L.ch.flatMap(c => c.ls)); return `<div><b>${p.p}%</b><span>Cấp ${L.lv}</span></div>`; }).slice(0, 3).join('')}</div>
    ${nm ? `<a class="btn pri" href="#${nm.route}">${ic('play')}Học tiếp: ${esc(nm.t)}</a>` : ''}</div></div>
    <div class="cp"><div class="cp-b" style="padding-top:16px"><div class="cp-f"><span>${ic('info')}Mẹo học</span><p>Bấm vào bất kỳ bộ phận nào trên sơ đồ để xem nó làm gì, nằm ở đâu và hỏng thì sao. Nhấn <b>/</b> để tìm nhanh.</p></div>
    <a class="btn" href="#/diag">${ic('wrench')}Xe tôi đang có vấn đề</a><a class="btn" href="#/lights">${ic('alert')}Tra đèn cảnh báo</a></div></div>`;
}

/* ---------- trang chủ ---------- */
route(/^\/$/, () => {
  const t = prog(LESSONS.map(l => l.id)), last = ST.last, lm = last && LMAP[last.lid] ? lmeta(last.lid) : null;
  const ch = lm ? LMAP[last.lid].ch : PATH[0].ch[0], cp = prog(ch.ls), nx = firstUndone(), nm = nx && lmeta(nx);
  const JI = JOURNEY.findIndex((j, i) => i > 0 && prog(j.ls).p < 100);
  const cards = ['engine', 'fuel', 'intake', 'ignition', 'ecu', 'cooling', 'lube', 'exhaust', 'trans', 'elec', 'brake', 'hvac'].map(id => {
    const s = SYS[id], p = prog(sysLs(id));
    return `<a class="syscard" href="#${s.route || '/s/' + id}">${H.ibox(s.ic, s.tone)}<b>${esc(s.n)}</b><p>${esc(s.tag)}</p><div class="foot">${H.bar(p.p)}<span>${p.d}/${p.n}</span></div></a>`;
  }).join('');
  return { t: 'Trang chủ', html: `<div class="stack lg">
    <section class="hero"><div><div class="eyebrow">Học viện Xe Xăng</div><h1>Hiểu chiếc xe <span>xăng</span> hoạt động thế nào</h1>
      <p class="lead">Từ con số 0: năng lượng đi từ đâu đến đâu, từng bộ phận làm gì, các hệ thống nói chuyện với nhau ra sao – và khi hỏng thì nhận biết, kiểm tra thế nào.</p>
      <div class="hero-cta"><a class="btn pri lg" href="#${nm ? nm.route : '/s/overview'}">${ic('play')}${t.d ? 'Học tiếp' : 'Bắt đầu từ con số 0'}</a><a class="btn lg" href="#/explore">${ic('car')}Khám phá chiếc xe</a></div></div>
      <a class="hero-car" href="#/explore" aria-label="Mở trang khám phá chiếc xe">${carSVG({ flow: true, label: 'Chiếc xe xăng cắt lớp với luồng năng lượng: xăng từ bình tới động cơ, mô-men tới bánh trước, khí xả ra phía sau' })}
      <div class="legend" style="border:0;justify-content:center"><span class="tn-fuel"><i class="dash"></i>Xăng</span><span class="tn-air"><i class="dash"></i>Không khí</span><span class="tn-trq"><i class="dash"></i>Mô-men tới bánh</span><span class="tn-exh"><i class="dash"></i>Khí xả</span><span class="tn-pwr"><i class="dash"></i>Điện</span></div></a></section>
    <div class="grid g2">
      <div class="card cont">${H.ibox(lm ? lm.ic : 'book', lm ? lm.tone : 'info', 'lg')}<div style="flex:1;min-width:0"><div class="eyebrow" style="color:var(--muted)">Học tiếp</div><b class="h-sub">${esc(ch.n)} → ${cp.p}%</b>${H.bar(cp.p)}<small class="muted">${lm ? 'Bài gần nhất: ' + esc(lm.t) : 'Bắt đầu với bài đầu tiên'}</small></div><a class="btn" href="#${lm ? lm.route : lmeta(ch.ls[0]).route}">${ic('arrow')}</a></div>
      <a class="diagcta" href="#/diag">${H.ibox('wrench', 'crit', 'lg')}<div style="position:relative;z-index:1"><b>Xe tôi đang có vấn đề</b><span>Chọn triệu chứng → hệ thống → nguyên nhân → các bước kiểm tra</span></div></a>
    </div>
    <section class="stack"><div class="row between"><h2 class="h-sec">Hành trình của bạn</h2><a class="btn sm ghost" href="#/path">Xem lộ trình ${ic('chev')}</a></div>
      <div class="journey">${JOURNEY.map((j, i) => { const p = prog(j.ls), d = i === 0 || p.p === 100; return `<a class="jstep${d ? ' done' : ''}${i === JI ? ' cur' : ''}" href="#${j.ls[0] ? lmeta(j.ls[0]).route : '/path'}"><span class="n">${String(i + 1).padStart(2, '0')}</span>${d ? ic('checkc', 's16') : ''}<b>${esc(j.t)}</b></a>`; }).join('')}</div></section>
    <section class="stack"><div class="row between"><h2 class="h-sec">Khám phá các hệ thống</h2><span class="muted small">${t.d}/${t.n} bài đã học</span></div><div class="grid g4">${cards}</div></section>
    <section class="stack"><h2 class="h-sec">Học nhanh trong 1 phút</h2><div class="grid">${QUICK.map((q, i) => `<button type="button" class="qcard" data-q="${i}"><b>${ic(q.ic)}${esc(q.q)}</b><span class="ans">${esc(q.a)}</span><span class="more">Xem câu trả lời ${ic('chevd', 's16')}</span></button>`).join('')}</div></section>
    <section class="stack"><h2 class="h-sec">Công cụ</h2><div class="grid g4">
      ${[['/lights', 'alert', 'warn', 'Đèn cảnh báo', 'Đèn nào sáng? Có chạy tiếp được không?'], ['/obd', 'obd', 'info', 'Đọc mã lỗi OBD-II', 'Nhập mã như P0300 để hiểu nghĩa'], ['/compare', 'compare', 'cmd', 'So sánh', 'MAF vs MAP, AT vs CVT vs DCT…'], ['/lab', 'flask', 'tech', 'Phòng lab Honda City', 'Mô phỏng kỹ thuật viên chuyên sâu']].map(x => `<a class="syscard" href="#${x[0]}">${H.ibox(x[1], x[2])}<b>${x[3]}</b><p>${x[4]}</p></a>`).join('')}</div></section></div>`,
    mount(root) {
      root.addEventListener('click', e => { const q = e.target.closest('.qcard'); if (!q) return; if (q.classList.contains('open')) go(QUICK[+q.dataset.q].go); else { q.classList.add('open'); $('.more', q).innerHTML = 'Học kỹ hơn ' + ic('arrow', 's16'); } });
    } };
});

/* ---------- lộ trình học ---------- */
route(/^\/path$/, () => {
  const t = prog(LESSONS.map(l => l.id)), JI = JOURNEY.findIndex((j, i) => i > 0 && prog(j.ls).p < 100);
  const lv = PATH.map(L => {
    const p = prog(L.ch.flatMap(c => c.ls));
    return `<section class="lvl-card lv${L.lv}"><div class="lvl-h"><span class="lvl-n">${L.lv}</span><div style="flex:1"><div class="eyebrow" style="color:var(--muted)">Level ${L.lv} · ${L.en}</div><h2 class="h-sec">${L.n}</h2><p class="muted small">${L.d}</p></div><div style="width:120px">${H.bar(p.p)}<small class="muted">${p.d}/${p.n} bài</small></div></div>
      <div class="stack" style="gap:8px">${L.ch.map(ch => { const q = prog(ch.ls); return `<div><button type="button" class="chap" data-ch="${ch.id}" aria-expanded="false">${H.ibox(ch.ic, 'info', 'sm')}<span style="flex:1;min-width:0"><b>${esc(ch.n)}</b><small>${ch.ls.length} bài</small></span>${H.bar(q.p)}<span class="pct">${q.p}%</span>${ic('chevd', 's16')}</button>
        <div class="lsn-list" hidden>${ch.ls.map(id => { const m = lmeta(id); return m ? `<a class="lsn-i${ST.done(id) ? ' d' : ''}" href="#${m.route}">${ic(ST.done(id) ? 'checkc' : 'book')}<span>${esc(m.t)}</span><small class="muted">· ${m.kind}</small></a>` : ''; }).join('')}</div></div>`; }).join('')}</div></section>`;
  }).join('');
  return { t: 'Lộ trình học', html: `<header class="ph"><div class="eyebrow">Learning Path</div><h1 class="ph-t">Lộ trình học <span class="en">4 cấp độ</span></h1><p class="lead">Đi từ “tôi chưa biết gì” tới “tôi biết tư duy chẩn đoán lỗi”. Mỗi bài có 10 phần và một bài kiểm tra nhanh.</p>
    <div class="card pad"><div class="row between"><b class="h-sub">${t.d} / ${t.n} bài đã hoàn thành</b><span class="muted small">${t.p}%</span></div>${H.bar(t.p)}</div></header>
    <div class="stack lg"><section class="stack"><h2 class="h-sec">Hành trình 10 mốc</h2><div class="journey">${JOURNEY.map((j, i) => { const p = prog(j.ls), d = i === 0 || p.p === 100; return `<a class="jstep${d ? ' done' : ''}${i === JI ? ' cur' : ''}" href="#${j.ls[0] ? lmeta(j.ls[0]).route : '/path'}"><span class="n">${String(i + 1).padStart(2, '0')}</span><b>${esc(j.t)}</b><small class="muted">${j.ls.length ? p.d + '/' + p.n + ' bài' : 'Xuất phát'}</small></a>`; }).join('')}</div></section>${lv}
    <div class="row"><button type="button" class="btn sm ghost" data-reset>${ic('replay')}Xóa toàn bộ tiến độ trên trình duyệt này</button></div></div>`,
    mount(root) {
      root.addEventListener('click', e => {
        const b = e.target.closest('.chap'); if (b) { const l = b.nextElementSibling, o = l.hidden; l.hidden = !o; b.setAttribute('aria-expanded', o); return; }
        if (e.target.closest('[data-reset]') && confirmReset()) { ST.reset(); emit('rerender'); }
      });
      const first = PATH.flatMap(L => L.ch).find(ch => prog(ch.ls).p < 100); if (first) { const b = $(`[data-ch="${first.id}"]`, root); if (b) b.click(); }
    } };
});
function confirmReset() { const b = $('[data-reset]'); if (b.dataset.sure) return true; b.dataset.sure = '1'; b.innerHTML = ic('alert') + 'Bấm lần nữa để xác nhận xóa'; b.classList.add('fail'); return false; }

/* ---------- khám phá chiếc xe ---------- */
route(/^\/explore(?:\/(\w+))?$/, m => {
  const names = Object.fromEntries(ZONES.map(z => [z.z, z.n])), num = Object.fromEntries(ZONES.map(z => [z.z, z.num]));
  return { t: 'Khám phá chiếc xe', html: `<header class="ph"><div class="eyebrow">Explore Your Car</div><h1 class="ph-t">Khám phá chiếc xe <span class="en">24 khu vực</span></h1>
    <p class="lead">Rê chuột (hoặc chạm) vào từng khu vực trên mặt cắt để xem nó làm gì, nằm ở đâu, kết nối với gì và hỏng thì sao.</p></header>
    <div class="stack"><div class="stage"><div class="stage-bar"><div class="seg" role="group" aria-label="Lọc khu vực"><button type="button" data-f="all" aria-pressed="true">Tất cả</button>${Object.entries(ZCAT).map(([k, v]) => `<button type="button" data-f="${k}" aria-pressed="false">${v[0]}</button>`).join('')}</div>
      <button type="button" class="btn sm" data-flow aria-pressed="false">${ic('play')}Luồng năng lượng</button></div>
      <div class="scroll-x gridbg" id="carBox">${carSVG({ pins: true, id: 'carX', names, num, label: 'Mặt cắt xe xăng với 24 khu vực có thể bấm' })}</div><div class="swipe">↔ Vuốt ngang để xem toàn bộ xe</div>
      <div class="stage-cap" id="carCap">${ic('info')}<span>Chọn một khu vực để xem chi tiết ở bảng bên cạnh. Có thể lọc theo nhóm để bớt rối.</span></div></div>
      <div class="ex-grid" id="zList">${ZONES.map(z => `<button type="button" class="zbtn" data-z="${z.z}"><span class="zn">${z.num}</span><span><b>${esc(z.n)}</b><small>${ZCAT[z.cat][0]}</small></span></button>`).join('')}</div></div>`,
    ctx: () => `<div class="cp"><div class="cp-empty">${H.ibox('car', 'info', 'lg')}Chọn một khu vực trên xe để xem: <b>chức năng → vị trí → kết nối → khi hỏng</b>.</div></div>` + ctxDefault(),
    mount(root) {
      const svg = $('#carX', root), box = $('#carBox', root);
      const sel = z => { $$('.z, .pin', svg).forEach(el => el.classList.toggle('sel', el.dataset.z === z)); $$('.zbtn', root).forEach(b => b.classList.toggle('sel', b.dataset.z === z)); CTX.set(ctxZone(z)); CTX.open(); const i = zoneInfo(z); $('#carCap', root).innerHTML = `${ic('info')}<span><b>${esc(i.n)}:</b> ${esc(i.fn)}</span>`; };
      const filt = f => { svg.classList.toggle('filt', f !== 'all'); $$('.z, .pin', svg).forEach(el => el.classList.toggle('on', f !== 'all' && ZMAP[el.dataset.z].cat === f)); $$('.zbtn', root).forEach(b => { b.hidden = f !== 'all' && ZMAP[b.dataset.z].cat !== f; }); };
      root.addEventListener('click', e => {
        const f = e.target.closest('[data-f]'); if (f) { $$('[data-f]', root).forEach(b => b.setAttribute('aria-pressed', b === f)); filt(f.dataset.f); return; }
        const fl = e.target.closest('[data-flow]'); if (fl) { const on = fl.getAttribute('aria-pressed') !== 'true'; fl.setAttribute('aria-pressed', on); box.innerHTML = carSVG({ pins: true, id: 'carX', names, num, flow: on }); mountTips(); return; }
        const z = e.target.closest('[data-z]'); if (z) sel(z.dataset.z);
      });
      root.addEventListener('keydown', e => { const z = e.target.closest && e.target.closest('.pin'); if (z && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); sel(z.dataset.z); } });
      function mountTips() {
        const s2 = $('#carX', root);
        s2.addEventListener('pointermove', e => { if (e.pointerType === 'touch') return; const z = e.target.closest('[data-z]'); if (!z) { TIP.hide(); return; } const i = zoneInfo(z.dataset.z); TIP.show(`<b>${ZMAP[z.dataset.z].num}. ${esc(i.n)}</b>${esc(i.fn)}<div class="tip-r"><em>Vị trí</em>${esc(i.loc)}</div><div class="tip-r"><em>Kết nối</em>${esc(i.cnT)}</div><div class="tip-r"><em>Khi hỏng</em>${esc(i.fail.slice(0, 2).join('; '))}</div><div class="tip-k">Bấm để xem chi tiết</div>`, e.clientX, e.clientY); });
        s2.addEventListener('pointerleave', () => TIP.hide());
      }
      mountTips();
      if (m[1] && ZMAP[m[1]]) sel(m[1]);
    } };
});

/* ---------- tìm kiếm ---------- */
let SIDX = [];
function buildSearch() {
  SIDX = [];
  const add = o => { o.keys = [o.t, o.en, o.sh].filter(Boolean).map(fold); o.f = fold([o.t, o.en, o.sh, o.al, o.sub].join(' ')); o.ft = ' ' + o.keys.join(' '); o.fx = fold(o.x || ''); SIDX.push(o); };
  COMP_LIST.forEach(c => add({ k: 'Bộ phận', t: c.n, en: c.en, sh: c.sh, al: c.al, sub: (SYS[c.s] || {}).n, x: [c.fn, (c.sym || []).join(' '), (c.dtc || []).join(' ')].join(' '), go: '/c/' + c.id, c: c.id, ic: c.ic, tone: (SYS[c.s] || {}).tone }));
  SYS_LIST.forEach(s => add({ k: 'Hệ thống', t: s.n, en: s.en, sub: s.tag, x: s.what, go: s.route || '/s/' + s.id, ic: s.ic, tone: s.tone }));
  DX.forEach(d => add({ k: 'Triệu chứng', t: d.t, en: d.en, sub: d.eli, x: d.causes.map(c => c[0]).join(' '), go: '/diag/' + d.id, ic: d.ic, tone: 'warn' }));
  DTCS.forEach(d => add({ k: 'Mã lỗi', t: d.c + (d.al.length ? ' · ' + d.al.join(' · ') : ''), en: d.en, sub: d.d.replace(/\{n\}/g, 'x').replace(/\{w\}/g, ''), al: d.al.join(' '), x: d.cause.join(' '), go: '/obd/' + d.c, ic: 'obd', tone: 'info', code: [d.c].concat(d.al) }));
  WL.forEach(w => add({ k: 'Đèn cảnh báo', t: w.n, en: w.en, sub: w.mean, go: '/lights/' + w.id, wl: w.id, tone: w.c === 'r' ? 'crit' : 'warn' }));
  CMP.forEach(c => add({ k: 'So sánh', t: c.t, sub: c.memo, go: '/compare/' + c.id, ic: 'compare', tone: 'cmd' }));
  if (window.LAB && LAB.data) {
    (LAB.data.PARTS || []).forEach(p => add({ k: 'Honda City (chuyên sâu)', t: p.vn, en: p.en, sub: p.g, x: p.fn + ' ' + p.fail, go: '/lab/cau-tao', lab: p.id, ic: 'flask', tone: 'tech' }));
    (LAB.data.CATALOG || []).forEach(r => add({ k: 'Honda City (chuyên sâu)', t: r[1], sub: r[0], x: r[3] + ' ' + r[6] + ' ' + r[7], go: '/lab/danh-muc', ic: 'flask', tone: 'tech' }));
  }
}
const SORD = ['Bộ phận', 'Hệ thống', 'Triệu chứng', 'Mã lỗi', 'Đèn cảnh báo', 'So sánh', 'Honda City (chuyên sâu)'];
function searchQ(q) {
  const f = fold(q).trim(); if (!f) return [];
  const terms = f.split(/\s+/).filter(Boolean), up = q.trim().toUpperCase(), res = [];
  const KB = { 'Bộ phận': 3, 'Hệ thống': 2, 'Triệu chứng': 1 };
  SIDX.forEach(o => {
    let sc = 0;
    if (o.keys.includes(f)) sc += 25;
    for (const t of terms) { if (o.keys.some(k => k.startsWith(t))) sc += 12; else if (o.ft.includes(' ' + t) || o.ft.includes('(' + t)) sc += 9; else if (o.ft.includes(t)) sc += 6; else if (o.f.includes(t)) sc += 4; else if (o.fx.includes(t)) sc += 1; else return; }
    if (o.code && o.code.includes(up)) sc += 40;
    sc += KB[o.k] || 0; if (o.k === 'Honda City (chuyên sâu)') sc -= 3;
    res.push([sc, o]);
  });
  return res.sort((a, b) => b[0] - a[0]).map(x => x[1]);
}
function srItem(o, q) {
  const hi = s => { let h = esc(s); fold(q).split(/\s+/).filter(t => t.length > 1).forEach(t => { const i = fold(s).indexOf(t); if (i >= 0) { const raw = s.substr(i, t.length); h = h.replace(esc(raw), `<mark>${esc(raw)}</mark>`); } }); return h; };
  const icon = o.wl ? `<span class="ibox tn-${o.tone}" style="background:#0b1220;border-color:#1e293b;color:${o.tone === 'crit' ? '#f87171' : '#fbbf24'}">${wlIc(o.wl, 'ic')}</span>` : H.ibox(o.ic, o.tone);
  let path = `<div class="sr-path"><i>${esc(o.k)}</i>${o.sub ? ic('chev') + `<span>${esc(String(o.sub).slice(0, 90))}</span>` : ''}</div>`;
  if (o.c) {
    const c = COMP[o.c], s = SYS[c.s] || {};
    path = `<div class="sr-path"><i>Bộ phận</i>${ic('chev')}<span>${esc(s.n)}</span>${ic('chev')}<span>${esc(c.fn)}</span></div>
      <div class="sr-path">${ic('alert')}<span><i>Triệu chứng:</i> ${esc((c.sym || []).slice(0, 2).join('; '))}</span></div>
      <div class="sr-path">${ic('network')}<span><i>Liên quan:</i> ${esc(((c.in || []).concat(c.out || [])).filter(x => COMP[x]).slice(0, 4).map(x => COMP[x].sh || COMP[x].n).join(', '))}</span></div>
      <div class="sr-path">${ic('book')}<span><i>Bài học:</i> ${esc(c.n)} · ${esc(s.n)}</span></div>`;
  }
  return `<a class="sr-i" href="#${o.go}" data-sr>${icon}<span class="sr-b"><b>${hi(o.t)}${o.en ? `<em>${esc(o.en)}</em>` : ''}</b>${path}</span></a>`;
}
function srGroups(list, q, per) {
  if (!list.length) return `<div class="sr-empty">${ic('search', 's32')}<p>Không tìm thấy “${esc(q)}”. Thử: <b>bugi</b>, <b>MAF</b>, <b>ABS</b>, <b>P0300</b>, <b>nóng máy</b>.</p></div>`;
  return SORD.map(k => { const g = list.filter(o => o.k === k); if (!g.length) return ''; return `<div class="sg-h">${k} · ${g.length}</div>` + g.slice(0, per).map(o => srItem(o, q)).join(''); }).join('');
}
route(/^\/search(?:\?q=(.*))?$/, m => {
  const q = m[1] ? decodeURIComponent(m[1]) : '';
  return { t: 'Tìm kiếm', html: `<header class="ph"><div class="eyebrow">Search</div><h1 class="ph-t">Tìm bộ phận xe</h1><div class="sbox" style="margin:6px 0 0;width:100%;max-width:640px">${ic('search')}<input id="q2" type="search" value="${esc(q)}" placeholder="Bugi, MAF, ECU, máy phát, ABS, kim phun, O2, hộp số, quạt két nước…" autocomplete="off"></div></header>
    <div class="card" id="sr2" style="padding:8px"></div>`,
    mount(root) { const inp = $('#q2', root), out = $('#sr2', root); const run = () => { const v = inp.value; out.innerHTML = v.trim() ? srGroups(searchQ(v), v, 50) : `<div class="sr-empty">Gõ tên bộ phận, triệu chứng hoặc mã lỗi.</div>`; }; inp.addEventListener('input', run); run(); setTimeout(() => inp.focus(), 50); } };
});
