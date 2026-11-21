/* ===== MAIN: khung ứng dụng – điều hướng, tìm kiếm, tooltip, panel ngữ cảnh, router ===== */
const NAV = [
  ['Học', [['/', 'home', 'Trang chủ'], ['/path', 'route', 'Lộ trình học'], ['/s/overview', 'car', 'Tổng quan xe xăng', 'overview'], ['/explore', 'target', 'Khám phá chiếc xe']]],
  ['Động cơ & vận hành', [['/s/engine', 'engine', 'Động cơ', 'engine'], ['/s/fuel', 'fuel', 'Nhiên liệu', 'fuel'], ['/s/intake', 'wind', 'Nạp khí', 'intake'], ['/s/ignition', 'zap', 'Đánh lửa', 'ignition'],
    ['/s/ecu', 'chip', 'ECU & quản lý động cơ', 'ecu'], ['/sensors', 'sensor', 'Cảm biến', 'sensors'], ['/s/cooling', 'thermo', 'Làm mát', 'cooling'], ['/s/lube', 'oil', 'Bôi trơn', 'lube'], ['/s/exhaust', 'exhaust', 'Khí xả & khí thải', 'exhaust']]],
  ['Truyền động', [['/s/trans', 'gears', 'Hộp số', 'trans'], ['/s/drive', 'axle', 'Dẫn động', 'drive']]],
  ['Điện', [['/s/elec', 'zap', 'Hệ thống điện', 'elec'], ['/s/startcharge', 'battery', 'Khởi động & sạc', 'startcharge']]],
  ['Khung gầm', [['/s/brake', 'disc', 'Phanh', 'brake'], ['/s/steer', 'steer', 'Lái', 'steer'], ['/s/susp', 'spring', 'Treo', 'susp'], ['/s/wheels', 'tire', 'Bánh xe & lốp', 'wheels']]],
  ['Tiện nghi & an toàn', [['/s/hvac', 'snow', 'Điều hòa', 'hvac'], ['/s/safety', 'shield', 'An toàn', 'safety'], ['/s/adas', 'radar', 'ADAS', 'adas'], ['/s/body', 'lock', 'Điện thân xe', 'body']]],
  ['Chẩn đoán', [['/diag', 'wrench', 'Xe tôi có vấn đề', '', 'x:diag'], ['/obd', 'obd', 'OBD-II & mã lỗi', '', 'x:obd'], ['/dtc', 'book', 'Thư viện mã lỗi', '', 'x:dtc'], ['/lights', 'alert', 'Đèn cảnh báo', '', 'x:lights'], ['/workflow', 'route', 'Tư duy chẩn đoán', '', 'x:workflow']]],
  ['Công cụ', [['/compare', 'compare', 'So sánh'], ['/search', 'search', 'Tìm kiếm'], ['/lab', 'flask', 'Phòng lab Honda City', '', 'x:lab', 'PRO']]]
];
function navProg(it) { const ls = it[3] ? sysLs(it[3]) : it[4] ? [it[4]] : null; if (!ls || !ls.length) return ''; const p = prog(ls); return `<i class="nav-p${p.p === 100 ? ' full' : ''}" style="--p:${p.p}%" title="${p.d}/${p.n} bài"></i>`; }
function renderNav() {
  $('#nav').innerHTML = NAV.map(([h, items]) => `<div class="nav-g"><div class="nav-h">${h}</div>${items.map(it => `<a class="nav-i" href="#${it[0]}" data-r="${it[0]}">${ic(it[1])}<span>${esc(it[2])}</span>${it[5] ? `<b class="nav-tag">${it[5]}</b>` : ''}${navProg(it)}</a>`).join('')}</div>`).join('');
  $('#bnav').innerHTML = [['/', 'home', 'Trang chủ'], ['/path', 'route', 'Lộ trình'], ['/explore', 'car', 'Khám phá'], ['/diag', 'wrench', 'Chẩn đoán']].map(x => `<a href="#${x[0]}" data-r="${x[0]}">${ic(x[1])}<span>${x[2]}</span></a>`).join('') + `<button type="button" data-open-search>${ic('search')}<span>Tìm</span></button>`;
}
function navActive(p) {
  const base = p.replace(/\?.*$/, '');
  const match = r => r === '/' ? base === '/' : (base === r || base.startsWith(r + '/') || (r === '/sensors' && base === '/s/sensors'));
  let best = null; $$('#nav [data-r]').forEach(a => { if (match(a.dataset.r) && (!best || a.dataset.r.length > best.dataset.r.length)) best = a; });
  if (!best && base.startsWith('/c/')) { const c = COMP[base.slice(3)]; if (c) { const s = SYS[c.s]; best = $(`#nav [data-r="${s.route || '/s/' + s.id}"]`); } }
  $$('#nav .nav-i').forEach(a => a.classList.toggle('on', a === best));
  $$('#bnav [data-r]').forEach(a => a.classList.toggle('on', match(a.dataset.r) && (a.dataset.r !== '/' || base === '/')));
}
function updPill() { const t = prog(LESSONS.map(l => l.id)); $('#pring').style.setProperty('--p', t.p); $('#pnum').textContent = `${t.d}/${t.n}`; $('#ppill').title = `Đã hoàn thành ${t.d}/${t.n} bài (${t.p}%)`; }
function crumbs(v) { const c = v.crumbs || []; $('#crumbs').innerHTML = `<a href="#/" aria-label="Trang chủ">${ic('home', 's16')}</a>` + c.map(x => `${ic('chev')}<a href="#${x[1]}">${esc(x[0])}</a>`).join('') + (v.t && v.t !== 'Trang chủ' ? `${ic('chev')}<b>${esc(v.t)}</b>` : ''); }
const openSide = () => { $('#side').classList.add('open'); $('#scrim').hidden = false; $('#bMenu').setAttribute('aria-expanded', 'true'); };
const closeSide = () => { $('#side').classList.remove('open'); $('#bMenu').setAttribute('aria-expanded', 'false'); if (!$('#ctx').classList.contains('open')) $('#scrim').hidden = true; };

/* ---------- popup tìm kiếm ---------- */
const SP = { act: -1 };
function spOpen(fromBtn) {
  const pop = $('#spop'), inp = $('#q'); pop.hidden = false;
  if (innerWidth < 768 || fromBtn) {
    if (!$('#q3', pop)) pop.innerHTML = `<div class="spop-h">${ic('search')}<input id="q3" type="search" placeholder="Tìm bộ phận, triệu chứng, mã lỗi…" autocomplete="off"><button type="button" class="icon-btn" data-sp-close aria-label="Đóng">${ic('x')}</button></div><div class="spop-b"></div><div class="sr-foot"><span>↑↓ chọn · Enter mở · Esc đóng</span></div>`;
    const q3 = $('#q3', pop); q3.value = inp.value; spRun(q3.value); setTimeout(() => q3.focus(), 30);
    if (innerWidth >= 768) { const r = $('.sbox').getBoundingClientRect(); Object.assign(pop.style, { left: r.left + 'px', top: r.bottom + 6 + 'px', width: Math.max(r.width, 520) + 'px' }); }
  } else {
    if (!$('.spop-b', pop) || $('#q3', pop)) pop.innerHTML = `<div class="spop-b"></div><div class="sr-foot"><span>↑↓ chọn · Enter mở · Esc đóng</span><span style="margin-left:auto">Nhấn <b>/</b> để tìm nhanh</span></div>`;
    const r = $('.sbox').getBoundingClientRect(); Object.assign(pop.style, { left: Math.min(r.left, innerWidth - 560) + 'px', top: r.bottom + 6 + 'px', width: Math.max(r.width, 540) + 'px' }); spRun(inp.value);
  }
}
function spClose() { $('#spop').hidden = true; SP.act = -1; }
function spRun(v) {
  const b = $('#spop .spop-b'); if (!b) return; SP.act = -1;
  if (!v.trim()) { b.innerHTML = `<div class="sg-h">Gợi ý</div>${['Bugi', 'MAF', 'ECU', 'Máy phát', 'ABS', 'Kim phun', 'Cảm biến O2', 'Hộp số', 'Quạt két nước', 'P0300'].map(s => `<button type="button" class="chip" data-sug="${s}" style="margin:4px">${s}</button>`).join('')}`; return; }
  const res = searchQ(v); b.innerHTML = srGroups(res, v, 4) + (res.length ? `<a class="sr-i" href="#/search?q=${encodeURIComponent(v)}" data-sr style="justify-content:center;font-weight:600;color:var(--info)">Xem tất cả ${res.length} kết quả ${ic('arrow')}</a>` : '');
}
function spMove(d) { const items = $$('#spop [data-sr]'); if (!items.length) return; SP.act = (SP.act + d + items.length) % items.length; items.forEach((x, i) => x.classList.toggle('act', i === SP.act)); items[SP.act].scrollIntoView({ block: 'nearest' }); }
function spEnter(v) { const items = $$('#spop [data-sr]'); const el = items[SP.act >= 0 ? SP.act : 0]; if (el) { location.hash = el.getAttribute('href'); spClose(); $('#q').blur(); } else if (v.trim()) { go('/search?q=' + encodeURIComponent(v)); spClose(); } }

/* ---------- render theo route ---------- */
let UNMOUNT = null, LASTP = null;
const LEGACY = { '/van-hanh': '/lab/van-hanh', '/cau-tao': '/lab/cau-tao', '/chan-doan': '/lab/chan-doan', '/danh-muc': '/lab/danh-muc', '/bao-duong': '/lab/bao-duong' };
function render() {
  const p = curPath();
  if (LEGACY[p]) { location.replace('#' + LEGACY[p]); return; }
  let v = null;
  for (const [re, fn] of ROUTES) { const m = p.match(re); if (m) { v = fn(m); if (v === null) return; break; } }
  if (!v) v = { t: 'Không tìm thấy', html: `<div class="card pad stack" style="max-width:560px">${H.ibox('search', 'info', 'lg')}<h1 class="h-sec">Không tìm thấy trang này</h1><p class="muted">Đường dẫn “${esc(p)}” không tồn tại.</p><a class="btn pri" href="#/">${ic('home')}Về trang chủ</a></div>` };
  stopAll(); if (typeof UNMOUNT === 'function') { try { UNMOUNT(); } catch (e) { console.error(e); } } UNMOUNT = null;
  TIP.hide(); CTX.close(); closeSide(); spClose();
  const lab = !!v.lab; $('#lab').hidden = !lab; if (window.LAB) LAB.visible(lab);
  $('#wrap').classList.toggle('noctx', !!v.wide);
  const view = $('#view'), root = document.createElement('div'); root.className = 'vroot'; root.innerHTML = v.html; view.replaceChildren(root);
  document.title = (v.t && v.t !== 'Trang chủ' ? v.t + ' · ' : '') + 'Học viện Xe Xăng';
  crumbs(v); navActive(p); CTX.set(v.ctx ? v.ctx() : ctxDefault());
  if (v.lesson) { ST.setLast({ lid: v.lesson, route: p }); ST.seen(v.lesson); }
  const base = p.replace(/[?#].*$/, ''); if (base !== LASTP) window.scrollTo(0, 0); LASTP = base;
  try { UNMOUNT = v.mount ? v.mount(root) : null; } catch (e) { console.error(e); }
}

/* ---------- sự kiện toàn cục ---------- */
function bindGlobal() {
  document.addEventListener('click', e => {
    if (e.target.closest('[data-ctx-close]')) { CTX.close(); return; }
    const c = e.target.closest('[data-c]'); if (c && COMP[c.dataset.c] && !e.target.closest('a[href]')) { e.preventDefault(); CTX.comp(c.dataset.c); $$('.cc.sel').forEach(x => x.classList.remove('sel')); if (c.classList.contains('cc')) c.classList.add('sel'); TIP.hide(); return; }
    const sug = e.target.closest('[data-sug]'); if (sug) { const inp = $('#q3') || $('#q'); inp.value = sug.dataset.sug; $('#q').value = sug.dataset.sug; spRun(sug.dataset.sug); inp.focus(); return; }
    if (e.target.closest('[data-open-search]') || e.target.closest('#bSearch')) { spOpen(true); return; }
    if (e.target.closest('[data-sp-close]')) { spClose(); return; }
    if (e.target.closest('[data-sr]')) { spClose(); return; }
    if (!e.target.closest('#spop') && !e.target.closest('.sbox')) spClose();
  });
  $('#scrim').addEventListener('click', () => { closeSide(); CTX.close(); });
  $('#bMenu').addEventListener('click', () => ($('#side').classList.contains('open') ? closeSide() : openSide()));
  $('#side').addEventListener('click', e => { if (e.target.closest('a[href]') && innerWidth < 1024) closeSide(); });
  const q = $('#q');
  q.addEventListener('focus', () => spOpen(false)); q.addEventListener('input', () => { if ($('#spop').hidden) spOpen(false); else spRun(q.value); });
  q.addEventListener('keydown', e => { if (e.key === 'ArrowDown') { e.preventDefault(); spMove(1); } else if (e.key === 'ArrowUp') { e.preventDefault(); spMove(-1); } else if (e.key === 'Enter') { e.preventDefault(); spEnter(q.value); } else if (e.key === 'Escape') { spClose(); q.blur(); } });
  $('#spop').addEventListener('input', e => { if (e.target.id === 'q3') { q.value = e.target.value; spRun(e.target.value); } });
  $('#spop').addEventListener('keydown', e => { if (e.target.id !== 'q3') return; if (e.key === 'ArrowDown') { e.preventDefault(); spMove(1); } else if (e.key === 'ArrowUp') { e.preventDefault(); spMove(-1); } else if (e.key === 'Enter') { e.preventDefault(); spEnter(e.target.value); } else if (e.key === 'Escape') spClose(); });
  document.addEventListener('keydown', e => {
    const typing = /INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || '');
    if (e.key === '/' && !typing) { e.preventDefault(); if (innerWidth < 768) spOpen(true); else q.focus(); }
    else if (e.key === 'Escape') { spClose(); CTX.close(); closeSide(); TIP.hide(); }
    else if ((e.key === 'Enter' || e.key === ' ') && !typing) { const el = document.activeElement; if (el && el.matches && el.matches('.dn[data-c], .hs[data-c]')) { e.preventDefault(); CTX.comp(el.dataset.c); } }
  });
  /* tooltip khi rê chuột lên bộ phận */
  document.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return; const t = e.target;
    if (!t.closest || t.closest('#carX')) return;
    const c = t.closest('svg [data-c], .chip[data-c], .ilink[data-c]'), tip = !c && t.closest('svg [data-tip]');
    if (c && COMP[c.dataset.c]) { const x = COMP[c.dataset.c]; TIP.show(`<b>${esc(x.n)}</b>${esc(x.fn)}<div class="tip-k">Bấm để xem chi tiết</div>`, e.clientX, e.clientY); }
    else if (tip) TIP.show(`<b>${esc(tip.dataset.tip)}</b>`, e.clientX, e.clientY);
    else if (!t.closest('#tip')) TIP.hide();
  }, { passive: true });
  window.addEventListener('scroll', () => TIP.hide(), { passive: true });
  window.addEventListener('resize', () => { if (!$('#spop').hidden && innerWidth >= 768 && !$('#q3')) spOpen(false); });
}
function boot() {
  buildLessons(); buildSearch(); renderNav(); bindGlobal(); updPill();
  on('progress', () => { updPill(); $$('#nav .nav-i').forEach(a => { const it = NAV.flatMap(g => g[1]).find(x => x[0] === a.dataset.r); const old = $('.nav-p', a); const n = it && navProg(it); if (old) old.remove(); if (n) a.insertAdjacentHTML('beforeend', n); }); });
  on('rerender', render);
  window.addEventListener('hashchange', render);
  render();
}
boot();
