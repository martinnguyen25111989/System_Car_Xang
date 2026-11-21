/* ===== VIEWS (3/3): trung tâm chẩn đoán, OBD-II, thư viện mã lỗi, đèn cảnh báo, so sánh, tư duy chẩn đoán, phòng lab ===== */
const TREE = {};
function lessonFoot(lid, title) {
  const qs = quizFor(lid);
  return { html: `<section class="card pad"><div class="h-sub" style="margin-bottom:10px">${ic('trophy')}${esc(title || 'Kiểm tra nhanh')}</div>${quizHTML(lid, qs)}${doneBarHTML(lid)}</section>`, mount: root => { mountQuiz(root, lid, qs); mountDone(root); } };
}

/* ---------- trung tâm chẩn đoán ---------- */
function dxPicker(sel, compact) {
  if (compact) return `<div class="row" style="gap:6px">${DX.map(d => `<a class="chip${d.id === sel ? ' t-warn' : ''}" href="#/diag/${d.id}">${ic(d.ic)}${esc(d.t)}</a>`).join('')}</div>`;
  return `<div class="seg" role="group" aria-label="Lọc nhóm triệu chứng" style="margin-bottom:12px"><button type="button" data-dg="" aria-pressed="true">Tất cả</button>${DX_GROUPS.map(g => `<button type="button" data-dg="${g}" aria-pressed="false">${g}</button>`).join('')}</div>
    <div class="symgrid">${DX.map(d => `<a class="symb2" data-g="${d.g}" href="#/diag/${d.id}">${H.ibox(d.ic, d.drive === 2 ? 'crit' : 'warn')}<b>${esc(d.t)}</b><small>${esc(d.en)} · ${d.g}</small></a>`).join('')}</div>`;
}
function treeHTML(d) {
  const st = TREE[d.id] || (TREE[d.id] = d.steps.map(() => 'todo'));
  let ai = st.length; for (let i = 0; i < st.length; i++) { if (st[i] === 'fail') { ai = -1; break; } if (st[i] === 'todo') { ai = i; break; } }
  const items = d.steps.map((c, i) => {
    const s = st[i], act = i === ai, wait = s === 'todo' && !act;
    let b = `<div class="dk-t">${esc(c.t)}${c.info ? ' <span class="badge t-tech">Thao tác</span>' : ''}</div><div class="dk-how">${esc(c.how)}</div>`;
    if (!c.info) b += `<div class="dk-spec"><span>Bình thường</span>${esc(c.spec)}</div>`;
    if (act) b += c.info ? `<div class="dk-btns"><button type="button" class="btn sm" data-tk="done" data-i="${i}">${ic('check')}Đã thực hiện → tiếp</button></div>` : `<div class="dk-btns"><button type="button" class="btn sm pass" data-tk="pass" data-i="${i}">${ic('check')}Đạt</button><button type="button" class="btn sm fail" data-tk="fail" data-i="${i}">${ic('x')}Không đạt</button></div>`;
    if (s === 'fail' || s === 'fixed') b += `<div class="dk-res ${s}"><h5>${s === 'fail' ? 'Kết luận' : 'Đã khắc phục'}</h5><p>${esc(c.fail.c)}</p>${c.fail.parts.length ? `<div class="row"><span class="muted small">Cần kiểm tra/thay:</span>${c.fail.parts.map(p => `<span class="chip t-crit">${esc(p)}</span>`).join('')}</div>` : ''}${c.fail.fix ? `<p style="margin-top:6px">${esc(c.fail.fix)}</p>` : ''}${s === 'fail' ? `<div class="dk-btns"><button type="button" class="btn sm" data-tk="fixed" data-i="${i}">${ic('wrench')}Đã khắc phục → kiểm tra tiếp</button></div>` : ''}</div>`;
    const mk = s === 'pass' || s === 'done' ? '✓' : s === 'fail' ? '✗' : s === 'fixed' ? '↻' : i + 1;
    return `<li class="dk ${s}${act ? ' active' : ''}${wait ? ' wait' : ''}"><span class="dk-n">${mk}</span><div class="dk-b">${b}</div></li>`;
  }).join('');
  const done = ai === d.steps.length, fixed = d.steps.filter((c, i) => st[i] === 'fixed').flatMap(c => c.fail.parts);
  return `<div class="row between" style="margin-bottom:10px"><div class="h-sub">${ic('route')}Các bước chẩn đoán – làm theo thứ tự</div><button type="button" class="btn sm ghost" data-treset>${ic('replay')}Làm lại</button></div>
    <ol class="dklist">${items}</ol>${done ? `<div class="dk-res end" style="margin-top:12px"><h5>Hoàn tất các bước cơ bản</h5><p>${fixed.length ? 'Đã khắc phục: ' + esc(fixed.join(', ')) + '.' : 'Các bước cơ bản đều đạt – cần đo kiểm chuyên sâu (máy chẩn đoán, oscilloscope) hoặc đưa xe tới gara.'}</p><p>Sau khi sửa: xóa mã lỗi, chạy thử trong đúng điều kiện cũ và kiểm tra lỗi không quay lại.</p></div>` : ''}`;
}
function dxResult(d) {
  const dv = DRIVE[d.drive], sysL = d.sys.map(id => SYS[id]).filter(Boolean);
  const sysOfC = id => COMP[id] ? COMP[id].s : null;
  const comps = d.comps.filter(id => COMP[id]);
  return `<section class="card pad stack" id="dxRes" style="scroll-margin-top:90px">
    <div class="dtc-h">${H.ibox(d.ic, d.drive === 2 ? 'crit' : 'warn', 'lg')}<div style="flex:1;min-width:0"><div class="eyebrow" style="color:var(--warn)">Triệu chứng · ${d.g}</div><h2 class="ph-t" style="font-size:28px">${esc(d.t)} <span class="en">${esc(d.en)}</span></h2></div></div>
    <p class="lead" style="max-width:none">${esc(d.eli)}</p>
    <div class="drive ${dv[0]}">${ic(dv[2], 's24')}<div><span class="verdict">${dv[1]}</span><div style="font-weight:500">${esc(d.dnote)}</div></div></div>
    <div><div class="h-sub" style="margin-bottom:8px">Kiểm tra theo thứ tự hệ thống</div><div class="order">${sysL.map((s, i) => `<a class="chip" href="#${s.route || '/s/' + s.id}" style="padding:6px 12px 6px 6px;border:1px solid var(--line);background:#fff"><i class="badge" style="background:var(--ink);color:#fff;font-style:normal">${i + 1}</i>${ic(s.ic)}${esc(s.n)}</a>`).join('')}</div></div>
    <div><div class="h-sub" style="margin-bottom:8px">Triệu chứng → Hệ thống → Bộ phận → Nguyên nhân <span class="muted small" style="font-weight:500">(rê/bấm vào một hệ thống để lọc)</span></div>
      <div class="dmap" id="dmap">
        <div class="dcol"><h4>Triệu chứng</h4><div class="dnode root">${ic(d.ic)}${esc(d.t)}</div></div>
        <div class="dcol"><h4>Hệ thống có thể</h4>${sysL.map(s => `<button type="button" class="dnode" data-ms="${s.id}">${ic(s.ic)}${esc(s.n)}</button>`).join('')}</div>
        <div class="dcol"><h4>Bộ phận có thể</h4>${comps.map(id => `<button type="button" class="dnode" data-c="${id}" data-mc="${sysOfC(id)}">${ic(COMP[id].ic)}${esc(COMP[id].sh || COMP[id].n)}</button>`).join('')}</div>
        <div class="dcol"><h4>Nguyên nhân có thể</h4>${d.causes.map(c => `<div class="dnode" data-mc="${sysOfC(c[1]) || ''}"><span class="rank" title="Mức thường gặp">${'●'.repeat(c[2])}${'○'.repeat(3 - c[2])}</span>${esc(c[0])}</div>`).join('')}</div>
      </div><p class="note" style="margin-top:6px">● ● ● = rất thường gặp · ● = hiếm gặp</p></div>
    ${d.noise ? `<div><div class="h-sub" style="margin-bottom:8px">${ic('noise')}Bản đồ tiếng kêu</div><div class="noise">${d.noise.map(n => `<div><b>${esc(n[0])}</b><span>${esc(n[1])}</span><div class="row" style="margin-top:6px"><button type="button" class="chip t-warn" data-c="${n[2]}">${esc(COMP[n[2]] ? COMP[n[2]].sh || COMP[n[2]].n : n[2])}</button><span class="small muted">${esc(n[3])}</span></div></div>`).join('')}</div></div>` : ''}
    <div id="dxTree">${treeHTML(d)}</div>
    <div class="grid g2"><div class="callout t-ok">${ic('checkc')}<div><b>Bạn có thể tự kiểm tra</b><ul style="padding-left:18px;margin-top:4px">${d.rec.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div></div>
      <div class="callout t-tech">${ic('obd')}<div><b>Mã lỗi liên quan</b><div class="row" style="margin-top:6px">${d.dtc.map(c => `<a class="chip t-tech mono" href="#/obd/${c}">${c}</a>`).join('') || '<span class="muted">Thường không có mã lỗi riêng</span>'}</div>${d.honda ? `<p style="margin-top:8px"><a href="#/lab/chan-doan" data-honda="${d.honda}">${ic('flask', 's16')} Cây chẩn đoán chuyên sâu trên Honda City 2024 →</a></p>` : ''}</div></div></div></section>`;
}
route(/^\/diag(?:\/(\w+))?$/, m => {
  const d = m[1] ? DX.find(x => x.id === m[1]) : null, foot = lessonFoot('x:diag', 'Bài học: Triệu chứng → nguyên nhân');
  return { t: d ? d.t : 'Xe tôi đang có vấn đề', crumbs: d ? [['Chẩn đoán', '/diag']] : [], lesson: 'x:diag',
    html: `<header class="ph"><div class="eyebrow">Diagnostic Center · My Car Has a Problem</div><h1 class="ph-t">${ic('wrench', 's32')} Xe tôi đang có vấn đề</h1><p class="lead">Chọn triệu chứng bạn gặp. Hệ thống sẽ chỉ ra: hệ thống nào có thể liên quan → bộ phận nào → nguyên nhân thường gặp → các bước kiểm tra theo thứ tự.</p></header>
      <div class="stack lg">${d ? `<div class="card pad"><div class="h-sub" style="margin-bottom:8px">Đổi triệu chứng</div>${dxPicker(d.id, true)}</div>${dxResult(d)}` : `<section class="card pad">${dxPicker()}</section>
      <div class="grid g3">${[['ear', 'noise', '1. Lắng nghe & quan sát', 'Ghi lại khi nào lỗi xảy ra: máy nóng/nguội, tốc độ, có đèn báo, tiếng, mùi, khói.'], ['', 'obd', '2. Đọc mã lỗi', 'Máy đọc mã OBD-II cho biết ECU đã thấy gì – hướng điều tra đầu tiên.'], ['', 'route', '3. Kiểm tra từ dễ đến khó', 'Cầu chì, ắc quy, mức dầu/nước trước; linh kiện đắt tiền sau cùng.']].map(x => `<div class="callout t-info">${ic(x[1])}<div><b>${x[2]}</b><br>${x[3]}</div></div>`).join('')}</div>`}
      ${foot.html}</div>`,
    mount(root) {
      root.addEventListener('click', e => {
        const g = e.target.closest('[data-dg]'); if (g) { $$('[data-dg]', root).forEach(b => b.setAttribute('aria-pressed', b === g)); $$('.symb2', root).forEach(a => { a.hidden = g.dataset.dg && a.dataset.g !== g.dataset.dg; }); return; }
        if (!d) return;
        const tk = e.target.closest('[data-tk]'); if (tk) { TREE[d.id][+tk.dataset.i] = tk.dataset.tk; $('#dxTree', root).innerHTML = treeHTML(d); const nx = $('.dk.active, .dk.fail', root); if (nx) nx.scrollIntoView({ block: 'nearest', behavior: RM ? 'auto' : 'smooth' }); return; }
        if (e.target.closest('[data-treset]')) { TREE[d.id] = d.steps.map(() => 'todo'); $('#dxTree', root).innerHTML = treeHTML(d); return; }
        const ms = e.target.closest('[data-ms]'); if (ms) { const on = !ms.classList.contains('on'); focusSys(on ? ms.dataset.ms : null); return; }
        const hd = e.target.closest('[data-honda]'); if (hd && window.LAB) { LAB.selectSymptom(hd.dataset.honda); }
      });
      const map = $('#dmap', root);
      function focusSys(id) { if (!map) return; map.classList.toggle('focus', !!id); $$('.dnode', map).forEach(n => n.classList.toggle('on', !!id && (n.dataset.ms === id || n.dataset.mc === id))); }
      if (map) { map.addEventListener('pointerover', e => { const ms = e.target.closest('[data-ms]'); if (ms && e.pointerType !== 'touch') focusSys(ms.dataset.ms); }); map.addEventListener('pointerleave', () => focusSys(null)); }
      if (d) setTimeout(() => { const r = $('#dxRes', root); if (r && innerWidth < 1024) r.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); }, 60);
      foot.mount(root);
    } };
});

/* ---------- OBD-II ---------- */
function decodeDTC(code) {
  const c = String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5);
  return { c, ok: /^[PCBU][0-3][0-9A-F]{3}$/.test(c), l1: DTC_L1[c[0]], l2: DTC_L2[c[1]], l3: c[0] === 'P' ? DTC_L3P[c[2]] : (c[2] ? 'Nhóm hệ thống con' : ''), l45: c.slice(3) };
}
function decodeBoxes(code) {
  const d = decodeDTC(code), ch = (i, def) => d.c[i] || def;
  return `<div class="decode"><div><b>${ch(0, 'P')}</b><span>${esc(d.l1 || 'Nhóm lớn')}</span></div><div><b>${ch(1, '0')}</b><span>${esc(d.l2 || 'Chung / hãng')}</span></div><div><b>${ch(2, '3')}</b><span>${esc(d.l3 || 'Hệ thống con')}</span></div><div style="flex:1.4"><b>${(d.c.slice(3) || '01')}</b><span>Lỗi cụ thể${d.c[0] === 'P' && d.c[2] === '3' && +d.l45 > 0 && +d.l45 <= 12 ? ` (xi-lanh ${+d.l45})` : ''}</span></div></div>`;
}
function dtcResult(code) {
  const info = dtcInfo(code), dec = decodeDTC(code);
  if (!info) return `<div class="card pad stack"><div class="dtc-h"><span class="dtc-code">${esc(dec.c || '—')}</span><div><h2 class="h-sec">${dec.ok ? 'Mã chưa có trong thư viện' : 'Mã chưa đúng định dạng'}</h2><p class="muted">${dec.ok ? 'Dựa vào cấu trúc mã, có thể hiểu sơ bộ như sau:' : 'Mã OBD-II gồm 1 chữ cái (P/C/B/U) + 4 ký tự số, ví dụ P0301.'}</p></div></div>${dec.ok ? `<ul class="sumlist"><li>${ic('info')}<span><b>${dec.c[0]}</b> – ${esc(dec.l1)}</span></li><li>${ic('info')}<span><b>${dec.c[1]}</b> – ${esc(dec.l2)}</span></li><li>${ic('info')}<span><b>${dec.c[2]}</b> – ${esc(dec.l3)}</span></li></ul><p class="note">Mã riêng của hãng (chữ số thứ hai là 1) cần tra tài liệu của hãng hoặc máy chẩn đoán chuyên hãng.</p>` : ''}<a class="btn" href="#/dtc">${ic('book')}Xem thư viện mã lỗi</a></div>`;
  const s = SYS[info.s] || {};
  return `<div class="card pad stack"><div class="dtc-h"><span class="dtc-code">${esc(info.code)}</span><div style="flex:1;min-width:0"><h2 class="h-sec">${esc(info.d)}</h2><p class="muted small">${esc(info.en)}</p><div class="row" style="margin-top:8px"><a class="chip" href="#${s.route || '/s/' + s.id}">${ic(s.ic || 'info')}${esc(s.n || '')}</a>${sevChip(info.sev)}</div></div></div>
    <button type="button" class="btn" data-eli aria-pressed="false">${ic('user')}Giải thích cho người mới (Explain Like I'm Beginner)</button><div class="eli" id="eliBox" hidden>${ic('info')} ${esc(info.eli)}</div>
    <div class="grid g2"><div><div class="h-sub" style="margin-bottom:6px">Nguyên nhân có thể</div><ul class="sumlist">${info.cause.map(c => `<li>${ic('alert')}<span>${esc(c)}</span></li>`).join('')}</ul></div><div><div class="h-sub" style="margin-bottom:6px">Các bước chẩn đoán</div>${tlHTML(info.steps)}</div></div>
    <div class="grid g2"><div><div class="h-sub" style="margin-bottom:6px">Cảm biến liên quan</div><div class="row">${cchips(info.sens) || '<span class="muted">—</span>'}</div></div><div><div class="h-sub" style="margin-bottom:6px">Bộ phận liên quan</div><div class="row">${cchips(info.comps, 't-warn')}</div></div></div>
    <div><div class="h-sub" style="margin-bottom:8px">Chuỗi liên quan</div>${flowStrip(info.chain.filter(id => COMP[id]).map(id => ({ t: COMP[id].sh || COMP[id].n, ic: COMP[id].ic, c: id, tone: (SYS[COMP[id].s] || {}).tone })))}</div></div>`;
}
route(/^\/obd(?:\/(\w+))?$/, m => {
  const code = (m[1] || '').toUpperCase(), foot = lessonFoot('x:obd', 'Bài học: OBD-II & giắc chẩn đoán');
  const sample = ['P0300', 'P0301', 'P0171', 'P0420', 'P0128', 'P0335', 'P0101', 'P0455', 'P0562', 'U0100', 'C0035', 'P0700'];
  return { t: code ? code : 'OBD-II & mã lỗi', crumbs: code ? [['OBD-II', '/obd']] : [], lesson: 'x:obd',
    html: `<header class="ph"><div class="eyebrow">OBD-II Diagnostic</div><h1 class="ph-t">Đọc mã lỗi OBD-II</h1><p class="lead">Nhập mã lỗi mà máy đọc mã báo (ví dụ <b>P0300</b>) để biết: nghĩa là gì, thuộc hệ thống nào, nghiêm trọng ra sao, nguyên nhân và cách kiểm tra.</p></header>
    <div class="stack lg"><div class="scan"><div class="scanner"><div class="scr"><div class="scr-t"><span>OBD-II SCANNER</span><span>● KẾT NỐI</span></div>
      <input id="dtcIn" maxlength="5" value="${esc(code)}" placeholder="P0300" aria-label="Nhập mã lỗi" autocomplete="off" spellcheck="false"><div class="scr-codes">${sample.map(c => `<button type="button" data-code="${c}" class="${c === code ? 'on' : ''}">${c}</button>`).join('')}</div><div id="dec">${decodeBoxes(code || 'P0301')}</div></div>
      <p class="small" style="color:#94a3b8;margin-top:10px">Cấu trúc mã: chữ cái = nhóm hệ thống · số thứ 2 = mã chung/hãng · số thứ 3 = hệ thống con · 2 số cuối = lỗi cụ thể.</p></div>
      <div id="dtcOut">${code ? dtcResult(code) : `<div class="card pad stack">${H.callout('info', 'info', 'Chọn một mã mẫu bên trái hoặc gõ mã của bạn. Bạn có thể dùng máy đọc mã OBD-II giá rẻ (bluetooth) cắm vào giắc dưới táp-lô để lấy mã.')}<a class="btn" href="#/dtc">${ic('book')}Mở thư viện ${DTCS.length} nhóm mã lỗi</a></div>`}</div></div>
    <section class="card pad stack"><h2 class="h-sec">OBD-II là gì?</h2><p>OBD-II (On-Board Diagnostics) là chuẩn tự chẩn đoán có trên hầu hết ô tô đời mới. ECU liên tục giám sát cảm biến và các hệ thống liên quan tới khí thải; khi phát hiện lỗi, nó lưu <b>mã lỗi (DTC)</b>, lưu “ảnh chụp” điều kiện lúc lỗi (<b>freeze frame</b>) và có thể bật đèn Check Engine.</p>
      <div class="duo"><div class="card" style="padding:14px">${obdSVG()}<div class="legend" style="border:0;padding:8px 0 0">${Object.entries(OBD_PINS).map(([p, v]) => `<span><i style="background:${v[1]};width:14px;height:14px;border-radius:4px"></i>Chân ${p}: ${v[0]}</span>`).join('')}</div></div>
      <div class="grid g2">${[['obd', 'Mã lỗi (DTC)', 'Mã 5 ký tự cho biết ECU đã phát hiện lỗi gì.'], ['camera', 'Freeze frame', 'Vòng tua, nhiệt độ, tải… đúng lúc lỗi xảy ra.'], ['pulse', 'Dữ liệu trực tiếp', 'Giá trị cảm biến theo thời gian thực (data list).'], ['checkc', 'Readiness', 'Các bài tự kiểm tra của ECU đã hoàn tất chưa.']].map(x => `<div class="callout t-info">${ic(x[0])}<div><b>${x[1]}</b><br>${x[2]}</div></div>`).join('')}</div></div>
      <div class="grid g4">${Object.entries(DTC_L1).map(([k, v]) => `<div class="callout t-tech"><b class="mono" style="font-size:22px">${k}</b><div>${esc(v)}</div></div>`).join('')}</div>
      ${H.callout('warn', 'alert', '<b>Lưu ý:</b> mã lỗi chỉ cho biết <b>hướng</b> cần kiểm tra, không phải “thay bộ phận này”. Ví dụ P0171 (hỗn hợp nghèo) thường do rò khí chứ không phải cảm biến O2 hỏng.')}</section>
    ${foot.html}</div>`,
    mount(root) {
      const inp = $('#dtcIn', root), out = $('#dtcOut', root), dec = $('#dec', root);
      const show = c => { dec.innerHTML = decodeBoxes(c || 'P0301'); $$('[data-code]', root).forEach(b => b.classList.toggle('on', b.dataset.code === c)); if (decodeDTC(c).ok) { out.innerHTML = dtcResult(c); try { history.replaceState(null, '', '#/obd/' + c); } catch (e) { } } };
      inp.addEventListener('input', () => { inp.value = inp.value.toUpperCase(); show(inp.value); });
      root.addEventListener('click', e => { const b = e.target.closest('[data-code]'); if (b) { inp.value = b.dataset.code; show(b.dataset.code); } const el = e.target.closest('[data-eli]'); if (el) { const box = $('#eliBox', root), on = box.hidden; box.hidden = !on; el.setAttribute('aria-pressed', on); } });
      foot.mount(root);
    } };
});
route(/^\/dtc$/, () => {
  const foot = lessonFoot('x:dtc', 'Bài học: Đọc & hiểu mã lỗi'), groups = [...new Set(DTCS.map(d => d.s))];
  return { t: 'Thư viện mã lỗi', lesson: 'x:dtc', html: `<header class="ph"><div class="eyebrow">DTC Library</div><h1 class="ph-t">Thư viện mã lỗi <span class="en">${DTCS.length} nhóm mã</span></h1><p class="lead">Mã lỗi OBD-II thường gặp trên xe xăng, nhóm theo hệ thống. Bấm một mã để xem giải thích chi tiết.</p>
    <div class="sbox" style="margin:4px 0 0;width:100%;max-width:520px">${ic('search')}<input id="dtcF" type="search" placeholder="Lọc: P03, cảm biến, bỏ máy, CAN…" autocomplete="off"></div></header>
    <div class="stack lg">${groups.map(g => { const s = SYS[g] || {}; return `<section class="card pad" data-grp><div class="h-sub" style="margin-bottom:10px">${ic(s.ic || 'info')}${esc(s.n || g)}</div><div class="stack" style="gap:6px">${DTCS.filter(d => d.s === g).map(d => `<a class="ilink" data-f="${esc(fold(d.c + ' ' + d.al.join(' ') + ' ' + d.d + ' ' + d.en))}" href="#/obd/${d.c}"><span class="mono" style="font-weight:800;min-width:64px">${d.c}</span><span class="t">${esc(d.d.replace(/\{n\}/g, 'x').replace(/\{w\}/g, '…'))}${d.al.length ? ` <small class="muted">(+ ${esc(d.al.join(', '))})</small>` : ''}</span>${sevChip(d.sev)}</a>`).join('')}</div></section>`; }).join('')}${foot.html}</div>`,
    mount(root) { $('#dtcF', root).addEventListener('input', e => { const q = fold(e.target.value); $$('[data-f]', root).forEach(a => { a.hidden = q && !a.dataset.f.includes(q); }); $$('[data-grp]', root).forEach(s => { s.hidden = !$$('[data-f]', s).some(a => !a.hidden); }); }); foot.mount(root); } };
});

/* ---------- đèn cảnh báo ---------- */
function wlDetail(w) {
  const dv = DRIVE[w.drive], s = SYS[w.sys] || {};
  return `<div class="card pad stack"><div class="dtc-h"><span class="wl-big" style="color:${w.c === 'r' ? '#f87171' : '#fbbf24'}">${wlIc(w.id)}</span><div style="flex:1;min-width:0"><div class="eyebrow" style="color:${w.c === 'r' ? 'var(--crit)' : 'var(--warn)'}">${w.c === 'r' ? 'Đèn đỏ' : 'Đèn vàng'}</div><h2 class="h-sec">${esc(w.n)}</h2><p class="muted small">${esc(w.en)}</p></div></div>
    <div class="levels"><div class="lvx t-ok"><b><i class="dot"></i>Bình thường</b>${esc(w.lv[0])}</div><div class="lvx t-warn"><b><i class="dot"></i>Chú ý</b>${esc(w.lv[1])}</div><div class="lvx t-crit"><b><i class="dot"></i>Dừng / kiểm tra ngay</b>${esc(w.lv[2])}</div></div>
    <div class="grid g2"><div class="stack" style="gap:12px"><div><div class="h-sub" style="margin-bottom:4px">Đèn này có nghĩa là gì?</div><p>${esc(w.mean)}</p></div><div><div class="h-sub" style="margin-bottom:4px">Vì sao đèn sáng?</div><ul class="sumlist">${w.why.map(x => `<li>${ic('alert')}<span>${esc(x)}</span></li>`).join('')}</ul></div></div>
    <div class="stack" style="gap:12px"><div><div class="h-sub" style="margin-bottom:6px">Có chạy tiếp được không?</div><div class="drive ${dv[0]}">${ic(dv[2], 's24')}<div><span class="verdict">${dv[1]}</span><div style="font-weight:500">${esc(w.dtext)}</div></div></div></div><div><div class="h-sub" style="margin-bottom:4px">Nên kiểm tra gì?</div>${tlHTML(w.chk)}</div></div></div>
    <div class="row">${w.dx ? `<a class="btn pri" href="#/diag/${w.dx}">${ic('wrench')}Mở cây chẩn đoán</a>` : ''}<a class="btn" href="#${s.route || '/s/' + s.id}">${ic(s.ic || 'book')}Học: ${esc(s.n || '')}</a></div></div>`;
}
route(/^\/lights(?:\/(\w+))?$/, m => {
  const sel = WL.find(w => w.id === m[1]) || WL[0], foot = lessonFoot('x:lights', 'Bài học: Đèn cảnh báo');
  return { t: 'Đèn cảnh báo', lesson: 'x:lights', html: `<header class="ph"><div class="eyebrow">Dashboard Warning Lights</div><h1 class="ph-t">Đèn cảnh báo trên táp-lô</h1><p class="lead">Bấm vào một đèn để biết: nghĩa là gì, vì sao sáng, có chạy tiếp được không và cần kiểm tra gì.</p>
    <div class="row"><span class="chip t-ok"><i class="dot"></i>Xanh: bình thường / thông tin</span><span class="chip t-warn"><i class="dot"></i>Vàng: chú ý, kiểm tra sớm</span><span class="chip t-crit"><i class="dot"></i>Đỏ: dừng xe / kiểm tra ngay</span></div></header>
    <div class="stack lg"><div class="cluster"><div class="cl-grid">${WL.map(w => `<button type="button" class="wl lv-${w.c}${w.id === sel.id ? ' sel' : ''}" data-wl="${w.id}" aria-label="${esc(w.n)}">${wlIc(w.id)}<span>${esc(w.n)}</span></button>`).join('')}</div></div>
    <div id="wlOut">${wlDetail(sel)}</div>${foot.html}</div>`,
    mount(root) { root.addEventListener('click', e => { const b = e.target.closest('[data-wl]'); if (!b) return; $$('[data-wl]', root).forEach(x => x.classList.toggle('sel', x === b)); $('#wlOut', root).innerHTML = wlDetail(WL.find(w => w.id === b.dataset.wl)); try { history.replaceState(null, '', '#/lights/' + b.dataset.wl); } catch (er) { } if (innerWidth < 1024) $('#wlOut', root).scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); }); foot.mount(root); } };
});

/* ---------- so sánh ---------- */
function cmpTable(c) {
  return `<div class="stack"><div class="memo">${ic('info')}<span>${esc(c.memo)}</span></div><div class="scroll-x"><table class="cmp-t" style="min-width:${c.cols.length > 2 ? 720 : 520}px"><thead><tr><th></th>${c.cols.map(x => `<th>${esc(x[0])}<small>${esc(x[1])}</small></th>`).join('')}</tr></thead><tbody>${c.rows.map(r => `<tr><th>${esc(r[0])}</th>${r.slice(1).map(v => `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <div class="row"><span class="muted small">Học thêm:</span>${cchips(c.links)}${c.go ? `<a class="chip" href="#${c.go}">${ic('book')}Bài học hệ thống</a>` : ''}</div></div>`;
}
route(/^\/compare(?:\/([\w-]+))?$/, m => {
  const sel = CMP.find(c => c.id === m[1]) || CMP[0];
  return { t: 'So sánh', html: `<header class="ph"><div class="eyebrow">Compare Mode</div><h1 class="ph-t">So sánh hệ thống</h1><p class="lead">Đặt hai (hoặc ba) công nghệ cạnh nhau để thấy khác biệt chỉ trong một bảng.</p></header>
    <div class="stack"><div class="seg" role="group" aria-label="Chọn bảng so sánh">${CMP.map(c => `<button type="button" data-cp="${c.id}" aria-pressed="${c === sel}">${esc(c.t)}</button>`).join('')}</div><div id="cmpOut">${cmpTable(sel)}</div></div>`,
    mount(root) { root.addEventListener('click', e => { const b = e.target.closest('[data-cp]'); if (!b) return; $$('[data-cp]', root).forEach(x => x.setAttribute('aria-pressed', x === b)); $('#cmpOut', root).innerHTML = cmpTable(CMP.find(c => c.id === b.dataset.cp)); try { history.replaceState(null, '', '#/compare/' + b.dataset.cp); } catch (er) { } }); } };
});

/* ---------- tư duy chẩn đoán ---------- */
route(/^\/workflow$/, () => {
  const foot = lessonFoot('x:workflow', 'Bài học: Quy trình & tư duy chẩn đoán');
  return { t: 'Tư duy chẩn đoán', lesson: 'x:workflow', html: `<header class="ph"><div class="eyebrow">Diagnostic Flow · Root Cause · Repair Logic</div><h1 class="ph-t">Tư duy chẩn đoán như một kỹ thuật viên</h1><p class="lead">Không đoán mò, không “thay thử”. Đi theo quy trình 8 bước, chứng minh trước khi thay và luôn tìm nguyên nhân gốc.</p></header>
    <div class="stack lg"><section class="card pad"><h2 class="h-sec" style="margin-bottom:14px">Quy trình 8 bước</h2><ol class="tl">${WORKFLOW2.map((w, i) => `<li><span class="tl-n">${i + 1}</span><b>${ic(w[2], 's16')} ${esc(w[0])}</b><span>${esc(w[1])}</span></li>`).join('')}</ol></section>
    <section class="stack"><h2 class="h-sec">6 nguyên tắc vàng</h2><div class="grid g3">${PRINCIPLES.map((p, i) => `<div class="callout t-info"><span class="badge" style="background:var(--info);color:#fff">${i + 1}</span><div><b>${esc(p[0])}</b><br>${esc(p[1])}</div></div>`).join('')}</div></section>
    <section class="card pad stack"><h2 class="h-sec">Ví dụ: hỏi “Vì sao?” tới tận gốc</h2><div class="chain">${flowStrip([{ t: 'Đèn Check Engine', s: 'P0420', ic: 'engine', tone: 'warn' }, { t: 'Bầu xúc tác kém', s: 'vì sao?', ic: 'filter', tone: 'clean', c: 'cat' }, { t: 'Lõi bị dầu phủ', s: 'vì sao?', ic: 'drop', tone: 'oil' }, { t: 'Đốt dầu', s: 'vì sao?', ic: 'smoke', tone: 'exh' }, { t: 'Xéc-măng mòn', s: 'nguyên nhân gốc', ic: 'piston', tone: 'crit', c: 'piston' }])}</div>
      ${H.callout('warn', 'alert', 'Nếu chỉ thay bầu xúc tác mà không sửa xéc-măng, bầu mới cũng sẽ hỏng. <b>Sửa nguyên nhân gốc trước</b>, rồi mới thay chi tiết bị ảnh hưởng.')}</section>
    <section class="stack"><h2 class="h-sec">Dụng cụ kiểm tra cơ bản</h2><div class="grid g4">${TOOLS2.map(t => `<div class="syscard">${H.ibox(t[2], 'tech')}<b>${esc(t[0])}</b><p>${esc(t[1])}</p></div>`).join('')}</div></section>${foot.html}</div>` ,
    mount(root) { foot.mount(root); } };
});

/* ---------- phòng lab Honda City 2024 (giao diện kỹ thuật viên cũ) ---------- */
const LABTABS = [['van-hanh', 'Vận hành A→Z'], ['cau-tao', 'Cấu tạo động cơ'], ['chan-doan', 'Mô hình chẩn đoán'], ['danh-muc', 'Danh mục & mã lỗi'], ['bao-duong', 'Bảo dưỡng · thông số']];
route(/^\/lab(?:\/([\w-]+))?$/, m => {
  const tab = LABTABS.some(t => t[0] === m[1]) ? m[1] : 'van-hanh';
  return { t: 'Phòng lab Honda City 2024', lab: true, wide: true, lesson: 'x:lab', crumbs: [['Công cụ', '/path']],
    html: `<div class="card pad stack" style="gap:12px"><div class="ph-top">${H.ibox('flask', 'tech', 'lg')}<div style="flex:1;min-width:0"><div class="eyebrow">Level 4 · Phòng lab chuyên sâu</div><h1 class="h-sec" style="font-size:24px">Honda City 2024 – chế độ kỹ thuật viên</h1></div></div>
      <p class="muted">Mô phỏng kiến trúc điện – điện tử thực tế (PCM, CAN/LIN, 26 bước vận hành A→Z, oscilloscope), sơ đồ tách rời 39 bộ phận động cơ L15, cây chẩn đoán và danh mục ~75 chi tiết. Đây là phần nâng cao – nên học xong Level 1–3 trước.</p>
      <div class="row">${LABTABS.map(t => `<a class="chip${t[0] === tab ? ' t-info' : ''}" href="#/lab/${t[0]}">${esc(t[1])}</a>`).join('')}</div>${doneBarHTML('x:lab')}</div>`,
    mount(root) { mountDone(root); if (window.LAB) LAB.showTab(tab); } };
});
