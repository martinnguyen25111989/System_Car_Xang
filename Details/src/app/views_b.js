/* ===== VIEWS (2/3): trang hệ thống & trang bộ phận (bài học 10 phần) + các minh họa tương tác ===== */
const SECS = [['Nó là gì?', 'What is it?'], ['Nằm ở đâu?', 'Where is it?'], ['Làm nhiệm vụ gì?', 'What does it do?'], ['Hoạt động thế nào?', 'How does it work?'], ['Kết nối với gì?', 'What connects to it?'],
  ['Khi hỏng thì sao?', 'What happens when it fails?'], ['Chẩn đoán thế nào?', 'How to diagnose?'], ['Ví dụ thực tế', 'Real-world example'], ['Kiểm tra nhanh', 'Quick quiz'], ['Tóm tắt', 'Summary']];
const sec = (n, body) => H.sec(n, SECS[n - 1][0], SECS[n - 1][1], body);
function stepperHTML() { return `<nav class="stepper" aria-label="Các phần của bài học">${SECS.map((s, i) => `<a role="button" tabindex="0" data-sec="${i + 1}"><i>${String(i + 1).padStart(2, '0')}</i>${s[0]}</a>`).join('')}</nav>`; }
function mountStepper(root) {
  const links = $$('[data-sec]', root);
  const goSec = n => { const el = $('#sec' + n, root); if (el) el.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); };
  root.addEventListener('click', e => { const a = e.target.closest('[data-sec]'); if (a) goSec(a.dataset.sec); });
  root.addEventListener('keydown', e => { const a = e.target.closest && e.target.closest('[data-sec]'); if (a && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); goSec(a.dataset.sec); } });
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(es => { es.forEach(en => { if (en.isIntersecting) { const n = en.target.id.slice(3); links.forEach(l => l.classList.toggle('on', l.dataset.sec === n)); const on = links.find(l => l.dataset.sec === n); if (on && on.parentNode.scrollTo) on.parentNode.scrollTo({ left: on.offsetLeft - 40, behavior: RM ? 'auto' : 'smooth' }); } }); }, { rootMargin: '-35% 0px -55% 0px' });
  $$('.sec', root).forEach(s => io.observe(s));
  return () => io.disconnect();
}
function lessonHead(o, lid, extra = '') {
  const m = LMAP[lid];
  return `<header class="ph"><div class="ph-top">${H.ibox(o.ic, o.tone, 'lg')}<div style="min-width:0"><div class="eyebrow">${esc(m ? `Level ${m.lv} · ${m.ch.n}` : o.kind || '')}</div><h1 class="ph-t">${esc(o.n)} <span class="en">${esc(o.en)}</span></h1></div></div>
    <p class="lead">${esc(o.tag)}</p><div class="ph-meta">${H.chip('Bài học 10 phần', 't-info', 'book')}${ST.done(lid) ? H.chip('Đã hoàn thành', 't-ok', 'checkc') : ''}${extra}</div></header>`;
}
const story = ex => `<div class="story">${H.ibox('car', 'info', 'lg')}<div><b>Tình huống thực tế</b><p style="margin-top:4px">${esc(ex)}</p></div></div>`;
const sumHTML = sum => `<ul class="sumlist">${(sum || []).map(x => `<li>${ic('checkc')}<span>${esc(x)}</span></li>`).join('')}</ul>`;
const advHTML = (adv, extra) => (adv && adv.length) || extra ? `<details class="adv"><summary>${ic('gauge')}Thông số kỹ thuật (nâng cao)${ic('chevd', 'chev')}</summary><div class="adv-b">${adv && adv.length ? `<table class="tbl">${adv.map(r => `<tr><td class="k">${esc(r[0])}</td><td class="mono">${esc(r[1])}</td></tr>`).join('')}</table>` : ''}${extra || ''}<p class="note" style="margin-top:10px">Giá trị điển hình, thay đổi theo đời xe – luôn đối chiếu tài liệu sửa chữa của hãng.</p></div></details>` : '';
function tlHTML(items) { return `<ol class="tl">${items.map((t, i) => `<li><span class="tl-n">${i + 1}</span><b>${esc(t)}</b></li>`).join('')}</ol>`; }
function failsHTML(s) {
  return `<div class="stack" style="gap:10px">${(s.fails || []).map(f => `<div class="row" style="align-items:flex-start;gap:10px"><span class="sym">${ic('alert')}${esc(f[0])}</span><span class="muted" style="padding-top:8px">${ic('arrow', 's16')}</span><div class="row" style="flex:1;min-width:200px">${cchips(f[1], 't-warn')}</div></div>`).join('')}</div>
    ${(s.faults || (s.dias || []).some(d => d.faults)) ? `<p class="note" style="margin-top:12px">${ic('info', 's16')} Thử “làm hỏng” từng bộ phận trên sơ đồ ở đầu trang để thấy hậu quả lan ra cả hệ thống.</p>` : ''}`;
}
function diagHTML(s) {
  const rel = DX.filter(d => d.sys.includes(s.id)).slice(0, 6);
  return `${tlHTML(s.diag || [])}${rel.length ? `<div class="h-sub" style="margin:16px 0 8px">Triệu chứng liên quan – mở cây chẩn đoán</div><div class="row">${rel.map(d => `<a class="chip t-warn" href="#/diag/${d.id}">${ic(d.ic)}${esc(d.t)}</a>`).join('')}</div>` : ''}`;
}
function cycleStrip(el) { if (RM || !el) return () => { }; const ns = $$('.fs-n', el); if (ns.length < 2) return () => { }; let i = 0; const id = setInterval(() => { ns.forEach((n, k) => n.classList.toggle('cur', k === i)); i = (i + 1) % ns.length; }, 950); TIMERS.add(id); return () => { clearInterval(id); TIMERS.delete(id); }; }
const mix = (a, b, k) => { k = clamp(k, 0, 1); const p = h => [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, '0')).join(''); };

/* ---------- sân khấu sơ đồ: bước hoạt động, thử làm hỏng, nhiều tab ---------- */
function diaList(s) { return s.dias || (s.dia ? [Object.assign({ k: 'main', t: '' }, s.dia, { steps: s.steps, faults: s.faults })] : []); }
function diaStageHTML(s) {
  const d = diaList(s);
  return `<div class="stage" id="dgStage"><div class="stage-bar"><div class="h-sub">${ic('layers')}Sơ đồ tương tác</div>
    ${d.length > 1 ? `<div class="seg" role="group" aria-label="Chọn sơ đồ">${d.map((x, i) => `<button type="button" data-dt="${i}" aria-pressed="${i === 0}">${esc(x.t)}</button>`).join('')}</div>` : ''}
    <div class="row" id="dgCtl"></div></div><div id="dgBody"></div></div>`;
}
function mountDiaStage(root, s) {
  const dias = diaList(s), body = $('#dgBody', root), ctlBox = $('#dgCtl', root); if (!body) return;
  let ctl = null, cur = 0, stepI = -1, playT = null, sub = null, faultOn = -1;
  const cap = (html, tone) => { const c = $('#dgCap', body); if (c) { c.className = 'stage-cap' + (tone ? ' t-' + tone : ''); c.innerHTML = html; } };
  const stopPlay = () => { if (playT) { clearInterval(playT); TIMERS.delete(playT); playT = null; } const b = $('[data-play]', ctlBox); if (b) b.innerHTML = ic('play') + 'Chạy từng bước'; };
  function show(i) {
    stopPlay(); if (sub) { sub(); sub = null; } cur = i; stepI = -1; faultOn = -1;
    const d = dias[i];
    if (d.special === 'canbus') { ctlBox.innerHTML = ''; body.innerHTML = canbusHTML(); sub = mountCanbus(body); return; }
    const R = dgRender(d), steps = d.steps || [], faults = d.faults || [];
    body.innerHTML = `<div class="scroll-x gridbg">${R.html}</div><div class="swipe">↔ Vuốt ngang để xem toàn bộ sơ đồ</div>
      <div class="stage-cap" id="dgCap">${ic('info')}<span>${steps.length ? 'Bấm <b>Chạy từng bước</b> hoặc chọn một bước bên dưới. Bấm vào một bộ phận để xem chi tiết.' : 'Bấm vào một bộ phận để xem chi tiết.'}</span></div>${dgLegend(R.used)}
      ${steps.length || faults.length ? `<div class="pad"><div class="duo">${steps.length ? `<div><div class="h-sub" style="margin-bottom:8px">${ic('route')}Hoạt động từng bước</div><div class="steps">${steps.map((st, k) => `<button type="button" class="stp" data-st="${k}"><span class="stp-n">${k + 1}</span><span><b>${esc(st.t)}</b><span>${esc(st.d)}</span></span></button>`).join('')}</div></div>` : ''}
      ${faults.length ? `<div><div class="h-sub" style="margin-bottom:6px">${ic('alert')}Thử làm hỏng một bộ phận</div><p class="note" style="margin-bottom:10px">Xem điều gì xảy ra với cả hệ thống – đây chính là cách thợ suy luận khi chẩn đoán.</p><div class="faults">${faults.map((f, k) => `<button type="button" class="fbtn" data-ft="${k}" aria-pressed="false">${ic('x')}${esc(f.t)}</button>`).join('')}</div></div>` : ''}</div></div>` : ''}`;
    ctlBox.innerHTML = (steps.length ? `<button type="button" class="btn sm pri" data-play>${ic('play')}Chạy từng bước</button>` : '') + `<button type="button" class="btn sm" data-dreset>${ic('replay')}Xem toàn bộ</button>`;
    ctl = dgCtl($('svg.dg', body));
    if (s.special === 'cooling' && i === 0) sub = coolingSlider(body, ctl, ctlBox);
  }
  function setStep(k) {
    const st = dias[cur].steps[k]; stepI = k; faultOn = -1; $$('.fbtn', body).forEach(b => b.setAttribute('aria-pressed', 'false'));
    ctl.set({ hl: st.hl, fast: st.fast }); $$('.stp', body).forEach((b, j) => b.classList.toggle('on', j === k));
    cap(`<span class="stp-n" style="width:24px;height:24px;font-size:12px;background:var(--info);color:#fff;border-radius:50%;display:grid;place-items:center;flex:none">${k + 1}</span><span><b>${esc(st.t)}.</b> ${esc(st.d)}</span>`);
  }
  root.addEventListener('click', e => {
    if (!body.contains(e.target) && !ctlBox.contains(e.target) && !e.target.closest('[data-dt]')) return;
    const t = e.target.closest('[data-dt]'); if (t) { $$('[data-dt]', root).forEach(b => b.setAttribute('aria-pressed', b === t)); show(+t.dataset.dt); return; }
    const st = e.target.closest('[data-st]'); if (st) { stopPlay(); setStep(+st.dataset.st); return; }
    if (e.target.closest('[data-play]')) {
      if (playT) { stopPlay(); return; } const n = dias[cur].steps.length; setStep((stepI + 1) % n); $('[data-play]', ctlBox).innerHTML = ic('pause') + 'Tạm dừng';
      playT = setInterval(() => { if (stepI + 1 >= n) { stopPlay(); return; } setStep(stepI + 1); }, 2800); TIMERS.add(playT); return;
    }
    if (e.target.closest('[data-dreset]')) { stopPlay(); stepI = -1; faultOn = -1; ctl.set({}); $$('.stp', body).forEach(b => b.classList.remove('on')); $$('.fbtn', body).forEach(b => b.setAttribute('aria-pressed', 'false')); cap(ic('info') + '<span>Đang hiển thị toàn bộ các luồng.</span>'); return; }
    const f = e.target.closest('[data-ft]'); if (f) {
      stopPlay(); const k = +f.dataset.ft, F = dias[cur].faults[k];
      if (faultOn === k) { faultOn = -1; f.setAttribute('aria-pressed', 'false'); ctl.set({}); cap(ic('info') + '<span>Đã sửa xong – hệ thống hoạt động bình thường trở lại.</span>', 'ok'); return; }
      faultOn = k; $$('.fbtn', body).forEach(b => b.setAttribute('aria-pressed', b === f)); $$('.stp', body).forEach(b => b.classList.remove('on'));
      ctl.set({ bad: F.bad, off: F.off }); cap(`${ic('alert')}<span><b>${esc(F.t)}:</b> ${esc(F.sym)}</span>`, 'crit');
    }
  });
  show(0);
  return () => { stopPlay(); if (sub) sub(); };
}
function coolingSlider(body, ctl, ctlBox) {
  ctlBox.insertAdjacentHTML('afterbegin', `<label class="rng" style="min-width:250px">${ic('thermo')}<span>Nhiệt độ máy</span><input type="range" min="20" max="112" value="45" data-temp aria-label="Nhiệt độ nước làm mát"><output>45 °C</output></label>`);
  const inp = $('[data-temp]', ctlBox), out = inp.nextElementSibling;
  const apply = () => {
    const t = +inp.value; out.textContent = t + ' °C'; let st, msg, tone;
    if (t < 82) { st = { off: ['thermostat>radiator', 'radiator>wpump', 'fan>radiator', 'ecu>fan', 'exptank>radiator'] }; msg = `<b>Máy nguội (${t} °C):</b> van hằng nhiệt ĐÓNG – nước chỉ chạy vòng tắt quanh động cơ để máy nhanh ấm.`; tone = 'info'; }
    else if (t < 97) { st = { off: ['fan>radiator', 'ecu>fan', 'thermostat>wpump'] }; msg = `<b>Nhiệt độ làm việc (${t} °C):</b> van hằng nhiệt MỞ – nước nóng chảy qua két nước để tỏa nhiệt. Quạt chưa cần chạy.`; tone = 'ok'; }
    else if (t <= 105) { st = { off: ['thermostat>wpump'], fast: ['fan>radiator', 'ecu>fan'] }; msg = `<b>Nóng (${t} °C – kẹt xe hoặc bật A/C):</b> cảm biến ECT báo ECU, ECU BẬT QUẠT két nước.`; tone = 'warn'; }
    else { st = { bad: ['engine'], fast: ['fan>radiator', 'ecu>fan'] }; msg = `<b>QUÁ NHIỆT (${t} °C)!</b> Dừng xe, tắt máy, không mở nắp két khi còn nóng.`; tone = 'crit'; }
    ctl.set(st); const c = $('#dgCap', body); c.className = 'stage-cap t-' + tone; c.innerHTML = ic('thermo') + `<span>${msg}</span>`;
  };
  inp.addEventListener('input', apply); apply(); return () => { };
}

/* ---------- mạng CAN (tab trong hệ thống điện) ---------- */
function canbusHTML() {
  const X = [130, 360, 590, 820];
  const mod = (m, i) => { const top = i < 4, x = X[i % 4], y = top ? 34 : 236; return `<g class="cm" data-m="${m[0]}" transform="translate(${x - 78},${y})"><rect width="156" height="58" rx="13"/><g transform="translate(12,15)" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cm-ic"><g transform="scale(1.15)">${icRaw(m[2])}</g></g><text x="48" y="27" class="dn-t">${esc(m[1])}</text><text x="48" y="43" class="dn-s cm-st">đang nói chuyện</text><line x1="78" y1="${top ? 58 : 0}" x2="78" y2="${top ? 106 : -48}" class="cm-stub"/></g>`; };
  return `<div class="scroll-x gridbg"><svg class="dg" id="canSvg" viewBox="0 0 980 330" role="img" aria-label="Mạng CAN: các hộp điều khiển nối chung hai dây CAN-H và CAN-L">
    <line x1="40" y1="158" x2="940" y2="158" class="can-h"/><line x1="40" y1="172" x2="940" y2="172" class="can-l"/>
    <g class="can-r"><rect x="14" y="148" width="26" height="34" rx="5"/><rect x="940" y="148" width="26" height="34" rx="5"/><text x="27" y="200" text-anchor="middle">120 Ω</text><text x="953" y="200" text-anchor="middle">120 Ω</text></g>
    <text x="490" y="150" text-anchor="middle" class="de-l">CAN-H</text><text x="490" y="190" text-anchor="middle" class="de-l">CAN-L</text>
    ${CANMODS.map(mod).join('')}<g id="canCut" hidden><line x1="470" y1="146" x2="490" y2="184" stroke="#dc2626" stroke-width="4"/><line x1="490" y1="146" x2="470" y2="184" stroke="#dc2626" stroke-width="4"/></g><g id="canPk"></g></svg></div>
    <div class="stage-cap" id="canCap">${ic('network')}<span>Mỗi hộp điều khiển “phát” bản tin lên hai dây chung; hộp nào cần thì “nghe”. Gói tin đang chạy: theo dõi các chấm màu.</span></div>
    <div class="pad"><div class="row"><button type="button" class="fbtn" data-cut aria-pressed="false">${ic('x')}Đứt dây CAN giữa xe</button><span class="note">Đo điện trở chân 6–14 giắc OBD khi đã ngắt nguồn: ≈ 60 Ω là bình thường (hai điện trở 120 Ω song song).</span></div></div>`;
}
function mountCanbus(el) {
  const X = [130, 360, 590, 820], pos = {}; CANMODS.forEach((m, i) => { pos[m[0]] = { x: X[i % 4], top: i < 4 }; });
  const pk = $('#canPk', el), cut = $('#canCut', el), mods = $$('.cm', el); let cutOn = false, t = 0, k = 0; const P = [];
  const spawn = () => { const [src, txt] = CANMSG[k++ % CANMSG.length]; const p = pos[src]; const g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('class', 'pk'); g.innerHTML = `<circle r="6" fill="var(--f-can)"/><text y="-10" text-anchor="middle">${esc(txt)}</text>`; pk.appendChild(g); P.push({ g, src, x: p.x, y: p.top ? 92 : 236, ph: 0, l: p.x, r: p.x }); };
  el.addEventListener('click', e => { const b = e.target.closest('[data-cut]'); if (!b) return; cutOn = !cutOn; b.setAttribute('aria-pressed', cutOn); cut.hidden = !cutOn; mods.forEach(m => m.classList.remove('lost')); $('#canCap', el).className = 'stage-cap' + (cutOn ? ' t-crit' : ''); $('#canCap', el).innerHTML = cutOn ? ic('alert') + '<span><b>Đứt dây CAN:</b> hai nửa mạng không nghe được nhau → các hộp báo <b>mất giao tiếp (mã U)</b>, nhiều đèn cảnh báo cùng sáng. Điện trở đo tại giắc OBD sẽ thành ~120 Ω.</span>' : ic('network') + '<span>Đã nối lại dây – mạng hoạt động bình thường.</span>'; mods.forEach(m => { const lost = cutOn && pos[m.dataset.m].x > 480; m.classList.toggle('lost', lost); $('.cm-st', m).textContent = lost ? 'MẤT GIAO TIẾP (mã U)' : 'đang nói chuyện'; }); });
  const stop = loop(dt => {
    t += dt; if (t > 1.3 && P.length < 3) { t = 0; spawn(); }
    for (let i = P.length - 1; i >= 0; i--) {
      const p = P[i];
      if (p.ph === 0) { const ty = pos[p.src].top ? 158 : 172; p.y += (ty - p.y) * Math.min(1, dt * 7); if (Math.abs(p.y - ty) < 1.5) { p.y = ty; p.ph = 1; } p.g.setAttribute('transform', `translate(${p.x},${p.y.toFixed(1)})`); }
      else {
        const sp = 300 * dt, lim = cutOn ? (p.x > 480 ? [480, 940] : [40, 480]) : [40, 940]; p.l = Math.max(lim[0], p.l - sp); p.r = Math.min(lim[1], p.r + sp);
        p.g.setAttribute('transform', `translate(${p.r.toFixed(1)},${p.y})`);
        mods.forEach(m => { const mx = pos[m.dataset.m].x; if (m.dataset.m !== p.src && mx >= p.l && mx <= p.r && !m.classList.contains('lost')) { m.classList.add('rx'); setTimeout(() => m.classList.remove('rx'), 280); } });
        if (p.l <= lim[0] && p.r >= lim[1]) { p.g.remove(); P.splice(i, 1); }
      }
    }
  });
  return stop;
}

/* ---------- minh họa đặc biệt theo hệ thống ---------- */
const STROKES = [{ n: 'Nạp', en: 'Intake', tone: 'air', d: 'Piston đi xuống, xu-páp nạp mở: hút hỗn hợp khí + xăng vào xi-lanh.' }, { n: 'Nén', en: 'Compression', tone: 'cold', d: 'Hai xu-páp đóng kín, piston đi lên nén hỗn hợp lại.' },
  { n: 'Nổ', en: 'Power', tone: 'hot', d: 'Bugi đánh lửa, khí cháy giãn nở đẩy piston xuống – kỳ duy nhất sinh công.' }, { n: 'Xả', en: 'Exhaust', tone: 'exh', d: 'Xu-páp xả mở, piston đi lên đẩy khí cháy ra ngoài.' }];
const SCOL = ['#38bdf8', '#3b82f6', '#f97316', '#94a3b8'];
const HERO = {}, SEC4 = {}, SEC7 = {};
HERO.engine = {
  html: () => `<div class="stage"><div class="stage-bar"><div class="h-sub">${ic('engine')}Động cơ cắt lớp & chu trình 4 kỳ</div>
    <div class="ctrls"><button type="button" class="btn sm pri" data-e="play">${ic('play')}Phát</button><button type="button" class="btn sm" data-e="pause">${ic('pause')}Tạm dừng</button><button type="button" class="btn sm" data-e="replay">${ic('replay')}Phát lại</button>
    <div class="seg" role="group" aria-label="Tốc độ">${[1, 2, 4].map(v => `<button type="button" data-sp="${v}" aria-pressed="${v === 1}">${v}x</button>`).join('')}</div><button type="button" class="btn sm ghost" data-e="lbl" aria-pressed="true">${ic('info')}Số bộ phận</button></div></div>
    <div class="pad"><div class="duo"><div class="gridbg" style="border-radius:14px;border:1px solid var(--line)">${engineSVG()}</div><div class="stack">
      <div class="strokes">${STROKES.map((k, i) => `<button type="button" class="strk tn-${k.tone}" data-sk="${i}"><span class="k">KỲ ${i + 1} · ${k.en}</span><b>${k.n}</b><small>${k.d}</small></button>`).join('')}</div>
      <div class="readout"><div><span>Góc trục khuỷu</span><b id="roA">0°</b></div><div><span>Piston</span><b id="roP">—</b></div><div><span>Xu-páp nạp</span><b id="roI">—</b></div><div><span>Xu-páp xả</span><b id="roE">—</b></div></div>
      <div><div class="h-sub" style="margin-bottom:6px">4 xi-lanh thay phiên · thứ tự nổ 1-3-4-2</div><div class="cyl4">${[1, 2, 3, 4].map(n => `<div data-cy="${n}">Xi-lanh ${n}<small>—</small></div>`).join('')}</div></div>
      <div><div class="h-sub" style="margin-bottom:6px">Bộ phận trên hình (bấm để xem)</div><div class="row">${EHS.map(([k], i) => COMP[k] ? `<button type="button" class="chip" data-c="${k}"><b class="mono">${i + 1}</b> ${esc(COMP[k].sh || COMP[k].n)}</button>` : '').join('')}</div></div></div></div></div>
    <div class="stage-cap" id="engCap">${ic('info')}<span>Bấm <b>Phát</b> để xem piston, xu-páp, tia lửa và dòng khí trong một chu trình (2 vòng quay trục khuỷu).</span></div></div>`,
  mount(root) {
    const g = id => root.querySelector('#' + id), E = {};
    ['ePis', 'eRodO', 'eRodI', 'eCrank', 'eGas', 'eVin', 'eVex', 'eCin', 'eCex', 'eSpark', 'eFlash', 'eSpray', 'eChain', 'eSp0', 'eSp1', 'eSp2'].forEach(k => { E[k] = g(k); });
    const Pi = [...Array(8)].map((_, i) => g('eP' + i)), Px = [...Array(8)].map((_, i) => g('eX' + i)), hsP = g('hs-piston'), hsR = g('hs-conrod');
    const PIN = [[36, 102], [118, 102], [158, 112], [174, 146]], PEX = [[246, 146], [262, 114], [300, 102], [384, 102]], OFF = { 1: 0, 3: 180, 4: 360, 2: 540 };
    const along = (pts, f) => { const seg = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); tot += l; } let d = f * tot, i = 0; while (i < seg.length - 1 && d > seg[i]) { d -= seg[i]; i++; } const k = seg[i] ? d / seg[i] : 0; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k]; };
    const lift = (t, o, c) => { const span = mod(c - o, 720), d = mod(t - o, 720); return d > span ? 0 : 11 * Math.sin(Math.PI * d / span); };
    let th = 4, speed = 1, playing = !RM, clock = 0, lastSi = -1;
    const cyEls = $$('[data-cy]', root), skEls = $$('[data-sk]', root), cap = g('engCap');
    function draw() {
      const t = mod(th, 720), a = (t % 360) * Math.PI / 180, r = 46, L = 150, cx = 210, cy = 430;
      const px = cx + r * Math.sin(a), py = cy - r * Math.cos(a), wy = cy - (r * Math.cos(a) + Math.sqrt(L * L - Math.pow(r * Math.sin(a), 2))), top = wy - 38;
      E.ePis.setAttribute('transform', `translate(0,${top.toFixed(1)})`);
      [E.eRodO, E.eRodI].forEach(l => { l.setAttribute('y1', wy.toFixed(1)); l.setAttribute('x2', px.toFixed(1)); l.setAttribute('y2', py.toFixed(1)); });
      E.eCrank.setAttribute('transform', `translate(210,430) rotate(${(t % 360).toFixed(1)})`);
      E.eGas.setAttribute('d', `M133,160 L152,148 H268 L287,160 V${top.toFixed(1)} H133 Z`);
      let col = t < 180 ? '#cfe8fb' : t < 350 ? mix('#cfe8fb', '#7fb0e8', (t - 180) / 170) : t < 540 ? mix('#ffad4d', '#fde9cf', (t - 350) / 190) : mix('#a3abb7', '#e8ebef', (t - 540) / 180);
      E.eGas.setAttribute('fill', col);
      const li = lift(t, 705, 195), le = lift(t, 525, 735);
      E.eVin.setAttribute('transform', `translate(0,${li.toFixed(1)})`); E.eVex.setAttribute('transform', `translate(0,${le.toFixed(1)})`);
      E.eCin.setAttribute('transform', `translate(172,40) rotate(${(t / 2 + 45).toFixed(1)})`); E.eCex.setAttribute('transform', `translate(248,40) rotate(${(t / 2 - 225).toFixed(1)})`);
      E.eSpark.setAttribute('opacity', t > 344 && t < 364 ? 1 : 0);
      const fk = (t - 352) / 88; E.eFlash.setAttribute('r', fk > 0 && fk < 1 ? (6 + 84 * Math.pow(fk, .6)).toFixed(1) : 0); E.eFlash.setAttribute('opacity', fk > 0 && fk < 1 ? (1 - fk).toFixed(2) : 0);
      E.eSpray.setAttribute('opacity', (t > 650 || t < 30) ? .85 : 0);
      Pi.forEach((p, i) => { if (li > 1) { const [x, y] = along(PIN, mod(clock * .55 + i / 8, 1)); p.setAttribute('cx', x.toFixed(1)); p.setAttribute('cy', y.toFixed(1)); p.setAttribute('opacity', Math.min(1, li / 5).toFixed(2)); } else p.setAttribute('opacity', 0); });
      Px.forEach((p, i) => { if (le > 1) { const [x, y] = along(PEX, mod(clock * .55 + i / 8, 1)); p.setAttribute('cx', x.toFixed(1)); p.setAttribute('cy', y.toFixed(1)); p.setAttribute('opacity', Math.min(1, le / 5).toFixed(2)); } else p.setAttribute('opacity', 0); });
      E.eChain.style.strokeDashoffset = (-th * .6).toFixed(1);
      E.eSp0.setAttribute('transform', `translate(478,430) rotate(${(t % 360).toFixed(1)})`); E.eSp1.setAttribute('transform', `translate(452,96) rotate(${(t / 2).toFixed(1)})`); E.eSp2.setAttribute('transform', `translate(504,96) rotate(${(t / 2).toFixed(1)})`);
      if (hsP) hsP.setAttribute('transform', `translate(252,${(top + 30).toFixed(1)})`); if (hsR) hsR.setAttribute('transform', `translate(${((210 + px) / 2 + 18).toFixed(1)},${((wy + py) / 2).toFixed(1)})`);
      g('roA').textContent = Math.round(t) + '°'; g('roP').textContent = (t % 360) < 180 ? 'Đi xuống ↓' : 'Đi lên ↑'; g('roI').textContent = li > .6 ? 'Mở' : 'Đóng'; g('roE').textContent = le > .6 ? 'Mở' : 'Đóng';
      cyEls.forEach(el => { const s = Math.floor(mod(t - OFF[el.dataset.cy], 720) / 180); el.style.background = SCOL[s]; el.querySelector('small').textContent = STROKES[s].n; });
      const si = Math.floor(t / 180);
      if (si !== lastSi) { lastSi = si; skEls.forEach((b, i) => b.classList.toggle('on', i === si)); cap.innerHTML = `<span class="badge" style="background:${SCOL[si]};color:#fff">KỲ ${si + 1}</span><span><b>${STROKES[si].n} (${STROKES[si].en}):</b> ${esc(STROKES[si].d)}</span>`; }
    }
    const svg = g('engSvg');
    root.addEventListener('click', e => {
      const b = e.target.closest('[data-e]'); if (b) { const a = b.dataset.e; if (a === 'play') playing = true; if (a === 'pause') playing = false; if (a === 'replay') { th = 0; playing = true; } if (a === 'lbl') { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); svg.classList.toggle('nolbl', !on); } draw(); return; }
      const sp = e.target.closest('[data-sp]'); if (sp) { speed = +sp.dataset.sp; $$('[data-sp]', root).forEach(x => x.setAttribute('aria-pressed', x === sp)); return; }
      const sk = e.target.closest('[data-sk]'); if (sk) { th = +sk.dataset.sk * 180 + 6; playing = false; draw(); }
    });
    draw(); return loop(dt => { if (playing) { th += dt * 90 * speed; clock += dt * speed; } draw(); });
  }
};
SEC4.engine = { html: () => `<div class="grid g2" style="margin-top:14px">${STROKES.map((k, i) => `<div class="callout tn-${k.tone}" style="border-color:color-mix(in srgb,var(--tone) 30%,#fff);background:color-mix(in srgb,var(--tone) 7%,#fff)"><span class="badge" style="background:${SCOL[i]};color:#fff">KỲ ${i + 1}</span><div><b>${k.n} – ${k.en}</b><br>${esc(k.d)}</div></div>`).join('')}</div>
  <div class="card pad" style="margin-top:16px;background:var(--surface-2)"><div class="h-sub" style="margin-bottom:10px">${ic('replay')}Bài nhỏ: Chu trình 4 kỳ</div>${quizHTML('x:4stroke', quizFor('x:4stroke'))}${doneBarHTML('x:4stroke')}</div>`,
  mount: root => mountQuiz(root, 'x:4stroke', quizFor('x:4stroke')) };

HERO.ecuHub = {
  html: s => {
    const nd2 = (id, tone) => { const c = COMP[id]; return { id, t: c.sh || c.n, s: c.en.replace(/\s*\(.*?\)/g, ''), ic: c.ic, c: id, tone }; };
    const spec = hubSpec({ label: 'ECU ở trung tâm: cảm biến bên trái gửi tín hiệu, cơ cấu chấp hành bên phải nhận lệnh', center: { id: 'ecu', t: 'ECU', s: 'Bộ não động cơ', ic: 'chip', c: 'ecu', tone: 'cmd' },
      ins: s.hub.ins.map(id => nd2(id, 'sig')), outs: s.hub.outs.map(id => nd2(id, 'cmd')), fin: 'sig', fout: 'cmd', gap: 44, nh: 38, iw: 200, ow: 206, dots: true });
    const R = dgRender(spec);
    return `<div class="stage"><div class="stage-bar"><div class="h-sub">${ic('chip')}Cảm biến → ECU → Quyết định → Cơ cấu chấp hành</div><button type="button" class="btn sm" data-hubreset>${ic('replay')}Xem toàn bộ</button></div>
      <div class="pad" style="padding-bottom:0"><div class="small muted" style="margin-bottom:8px">Chọn một tình huống để xem ECU “nghĩ” gì:</div><div class="ecu-sc">${s.hub.scen.map((x, i) => `<button type="button" class="btn sm" data-sc="${i}" aria-pressed="false">${ic(x.ic)}${esc(x.t)}</button>`).join('')}</div></div>
      <div class="scroll-x gridbg" style="margin-top:12px">${R.html}</div><div class="swipe">↔ Vuốt ngang để xem toàn bộ</div>
      <div class="pad"><div class="decide" id="ecuDec"></div></div>${dgLegend(R.used)}</div>`;
  },
  mount(root, s) {
    const svg = $('svg.dg', root), ctl = dgCtl(svg), dec = $('#ecuDec', root);
    const setDec = (a, b, c) => { dec.innerHTML = `<div class="d1"><span>${ic('sensor')}1 · Cảm biến báo</span><p>${a}</p></div><div class="d2"><span>${ic('chip')}2 · ECU quyết định</span><p>${b}</p></div><div class="d3"><span>${ic('injector')}3 · Cơ cấu chấp hành làm</span><p>${c}</p></div>`; };
    const def = () => { ctl.set({}); $$('[data-sc]', root).forEach(b => b.setAttribute('aria-pressed', 'false')); setDec('Hàng chục cảm biến gửi tín hiệu liên tục: lượng khí, nhiệt độ, vị trí piston, chân ga, ô-xy trong khí xả…', 'So với “bản đồ” đã lập trình để tính lượng xăng, góc đánh lửa, độ mở bướm ga – hàng trăm lần mỗi giây.', 'Kim phun, bô-bin, bướm ga, quạt, bơm xăng, van VVT/EVAP/EGR thực hiện lệnh. Bấm vào một cảm biến để xem nó ảnh hưởng tới đâu.'); };
    root.addEventListener('click', e => {
      const b = e.target.closest('[data-sc]'); if (b) { const x = s.hub.scen[+b.dataset.sc], ins = x.ins.split(' '), outs = x.outs.split(' '); $$('[data-sc]', root).forEach(y => y.setAttribute('aria-pressed', y === b)); ctl.set({ hl: ['ecu'].concat(ins, outs, ins.map(i => i + '>ecu'), outs.map(o => 'ecu>' + o)) }); setDec(esc(x.sense), esc(x.decide), esc(x.act)); return; }
      if (e.target.closest('[data-hubreset]')) { def(); return; }
      const n = e.target.closest('.dn'); if (n && s.hub.ins.includes(n.dataset.n)) { const c = COMP[n.dataset.n], aff = c.aff || []; $$('[data-sc]', root).forEach(y => y.setAttribute('aria-pressed', 'false')); ctl.set({ hl: ['ecu', c.id, c.id + '>ecu'].concat(aff, aff.map(o => 'ecu>' + o)) }); setDec(`<b>${esc(c.sh || c.n)}:</b> ${esc(c.sig || c.fn)}`, 'ECU dùng thông tin này trong các phép tính của mình.', 'Ảnh hưởng trực tiếp tới: ' + aff.map(o => esc(COMP[o].sh || COMP[o].n)).join(', ') + '.'); }
    });
    def();
  }
};
HERO.sensors = {
  html: s => `<div class="stack"><div class="card pad"><div class="row between"><div class="h-sub">${ic('sensor')}Sensor Explorer – ${s.comps.length} cảm biến</div><span class="note">Mỗi thẻ: mục đích → tín hiệu gửi đi → dạng sóng → khi hỏng → mã lỗi → kiểm tra. Bấm “Learn More” để xem phần nâng cao.</span></div></div>
    <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr))">${s.comps.map(sensorCard).join('')}</div></div>`,
  mount(root) { root.addEventListener('click', e => { const b = e.target.closest('[data-more]'); if (!b) return; const c = b.closest('.sens-card'); c.classList.toggle('open'); b.innerHTML = (c.classList.contains('open') ? 'Thu gọn ' : 'Learn More – tìm hiểu sâu ') + ic('chevd', 's16'); }); }
};
const SIGT = { maf: 'Lượng không khí đi vào động cơ', map: 'Áp suất (tải) trong cổ hút', tps: 'Độ mở bướm ga (%)', app: 'Mức đạp ga của người lái', ect: 'Nhiệt độ nước làm mát', iat: 'Nhiệt độ không khí nạp', o2: 'Hỗn hợp đậm hay nhạt', af: 'Tỉ lệ khí/xăng chính xác (λ)', ckp: 'Vòng tua & vị trí piston', cmp: 'Vị trí trục cam (xi-lanh nào đang nén)', knock: 'Có kích nổ hay không', vss: 'Tốc độ xe', wss: 'Tốc độ từng bánh xe (cho ABS/ESC)' };
function sensorCard(id) {
  const c = COMP[id]; if (!c) return '';
  return `<article class="sens-card"><div class="sens-h">${H.ibox(c.ic, 'sig')}<div style="flex:1;min-width:0"><b>${esc(c.sh || c.n)}</b><small>${esc(c.n)} · ${esc(c.en)}</small></div></div>
    <div class="sens-f"><b>Mục đích</b>${esc(c.fn)}</div><div class="sens-f"><b>Tín hiệu gửi đi</b>${esc(SIGT[id] || c.fn)}</div>
    <div class="wave">${waveSVG(c.wave)}<p>${esc(c.sig || '')}</p></div>
    <div class="sens-f"><b>Khi hỏng</b><div class="symg" style="margin-top:5px">${(c.sym || []).slice(0, 3).map(x => `<span class="sym">${ic('alert')}${esc(x)}</span>`).join('')}</div></div>
    <div class="sens-f"><b>Mã lỗi thường gặp</b><div class="row" style="margin-top:5px">${(c.dtc || []).slice(0, 4).map(d => `<a class="chip t-tech mono" href="#/obd/${d}">${d}</a>`).join('') || '<span class="muted">—</span>'}</div></div>
    <div class="sens-f"><b>Kiểm tra cơ bản</b>${esc((c.chk || [])[0] || '')}</div>
    <div class="more-b"><div class="sens-f"><b>Hoạt động</b>${esc(c.how)}</div><div class="sens-f"><b>Các bước kiểm tra</b><ol style="padding-left:18px;margin-top:4px">${(c.chk || []).map(x => `<li>${esc(x)}</li>`).join('')}</ol></div>${c.adv ? `<table class="tbl">${c.adv.map(r => `<tr><td class="k">${esc(r[0])}</td><td class="mono">${esc(r[1])}</td></tr>`).join('')}</table>` : ''}</div>
    <div class="row between" style="margin-top:auto"><button type="button" class="btn sm ghost" data-more>Learn More – tìm hiểu sâu ${ic('chevd', 's16')}</button><a class="btn sm" href="#/c/${id}">Bài học ${ic('arrow')}</a></div></article>`;
}

HERO.overview = {
  html: s => `<div class="stage"><div class="stage-bar"><div class="h-sub">${ic('car')}Ba “dòng chảy” trong một chiếc xe xăng</div><div class="seg" role="group" aria-label="Chọn luồng">${s.flows.map((f, i) => `<button type="button" data-fl="${i}" aria-pressed="${i === 0}">${esc(f.n)}</button>`).join('')}</div></div>
    <div class="gridbg" style="padding:6px 10px 0"><a href="#/explore" aria-label="Khám phá chiếc xe">${carSVG({ flow: true })}</a></div><div class="pad" id="ovFlow"></div></div>`,
  mount(root, s) {
    const box = $('#ovFlow', root); let stopC = null;
    const show = i => { const f = s.flows[i]; if (stopC) stopC(); box.innerHTML = `<p class="muted" style="margin-bottom:12px">${esc(f.d)}</p>${flowStrip(f.items, { big: true })}<div style="margin-top:18px">${tlHTML(f.steps)}</div>`; stopC = cycleStrip($('[data-fs]', box)); };
    root.addEventListener('click', e => { const b = e.target.closest('[data-fl]'); if (!b) return; $$('[data-fl]', root).forEach(x => x.setAttribute('aria-pressed', x === b)); show(+b.dataset.fl); });
    show(0);
  }
};
const DRVI = {
  fwd: { n: 'FWD – Dẫn động cầu trước', d: 'Động cơ đặt ngang; hộp số và vi sai gộp chung (transaxle); hai bán trục kéo hai bánh trước.', pro: ['Rẻ, gọn, nhẹ, tiết kiệm nhiên liệu', 'Cabin rộng vì không có trục các-đăng', 'Bám tốt khi lên dốc trơn vì động cơ đè lên bánh kéo'], con: ['Dễ trượt đầu khi vào cua gấp', 'Bánh trước vừa lái vừa kéo nên mòn nhanh hơn'], ex: 'Honda City, Toyota Vios, Hyundai Accent…' },
  rwd: { n: 'RWD – Dẫn động cầu sau', d: 'Động cơ đặt dọc; hộp số sau động cơ; trục các-đăng chạy dọc gầm tới vi sai cầu sau.', pro: ['Phân bổ trọng lượng cân bằng', 'Cảm giác lái thể thao, kéo tải tốt', 'Bánh trước chỉ lo việc lái'], con: ['Dễ trượt đuôi trên đường trơn', 'Có “gờ” giữa sàn xe, nặng và đắt hơn'], ex: 'Xe thể thao, sedan hạng sang, bán tải 4x2' },
  awd: { n: 'AWD – 4 bánh tự động', d: 'Thường dựa trên FWD: khi bánh trước trượt, khớp nối điện tử tự đưa một phần mô-men ra cầu sau.', pro: ['Bám đường tốt khi mưa, đường trơn', 'Người lái không cần thao tác'], con: ['Nặng hơn, tốn xăng hơn FWD', 'Nhiều chi tiết, chi phí bảo dưỡng cao hơn'], ex: 'SUV, crossover đô thị' },
  '4wd': { n: '4WD – 4 bánh bán thời gian', d: 'Hộp số phụ chia lực cho hai cầu; có số chậm 4L cho địa hình; người lái chủ động gài cầu.', pro: ['Vượt địa hình, kéo nặng rất tốt', 'Số chậm 4L nhân lực kéo lớn'], con: ['Không nên gài 4WD trên đường nhựa khô (bó cầu)', 'Nặng, tốn nhiên liệu'], ex: 'Bán tải, SUV địa hình' }
};
HERO.drive = {
  html: () => `<div class="stage"><div class="stage-bar"><div class="h-sub">${ic('axle')}Mô-men đi tới bánh nào? (nhìn từ trên xuống)</div><div class="seg" role="group" aria-label="Kiểu dẫn động">${['fwd', 'rwd', 'awd', '4wd'].map((k, i) => `<button type="button" data-dv="${k}" aria-pressed="${i === 0}">${k.toUpperCase()}</button>`).join('')}</div></div>
    <div class="pad"><div class="duo"><div class="gridbg" style="border-radius:14px;border:1px solid var(--line);overflow:hidden" id="dvBox"></div><div id="dvInfo"></div></div></div></div>`,
  mount(root) {
    const show = k => { const i = DRVI[k]; $('#dvBox', root).innerHTML = drivetrainSVG(k); $('#dvInfo', root).innerHTML = `<h3 class="h-sub" style="font-size:18px">${i.n}</h3><p style="margin:6px 0 12px">${i.d}</p><div class="grid g2"><div class="callout t-ok">${ic('check')}<div><b>Ưu điểm</b><ul style="padding-left:18px;margin-top:4px">${i.pro.map(x => `<li>${x}</li>`).join('')}</ul></div></div><div class="callout t-warn">${ic('alert')}<div><b>Nhược điểm</b><ul style="padding-left:18px;margin-top:4px">${i.con.map(x => `<li>${x}</li>`).join('')}</ul></div></div></div><p class="note" style="margin-top:10px">${ic('car', 's16')} Thường gặp ở: ${i.ex}. <a href="#/compare/fwd-rwd-awd">So sánh chi tiết →</a></p>`; };
    root.addEventListener('click', e => { const b = e.target.closest('[data-dv]'); if (!b) return; $$('[data-dv]', root).forEach(x => x.setAttribute('aria-pressed', x === b)); show(b.dataset.dv); });
    show('fwd');
  }
};
HERO.susp = {
  html: () => `<div class="stage"><div class="stage-bar"><div class="h-sub">${ic('spring')}Một góc treo MacPherson (nhìn từ phía trước)</div><div class="ctrls"><button type="button" class="btn sm pri" data-bump>${ic('play')}Cho xe qua ổ gà</button><div class="seg" role="group" aria-label="Giảm chấn"><button type="button" data-dmp="good" aria-pressed="true">Giảm chấn tốt</button><button type="button" data-dmp="bad" aria-pressed="false">Giảm chấn hỏng</button></div></div></div>
    <div class="pad"><div class="duo"><div class="gridbg" style="border-radius:14px;border:1px solid var(--line)">${suspSVG()}</div><div class="stack">
      <div class="callout t-info">${ic('info')}<div><b>Lò xo</b> hấp thụ cú va đập, <b>giảm chấn</b> dập tắt dao động. Thử bấm “Giảm chấn hỏng” rồi cho xe qua ổ gà – thân xe sẽ nhún nhảy mãi không dừng.</div></div>
      <div><div class="h-sub" style="margin-bottom:6px">Dao động của thân xe</div><svg viewBox="0 0 300 70" class="dg" style="background:#0f172a;border-radius:12px"><path id="spTrace" fill="none" stroke="#4ade80" stroke-width="2"/></svg></div>
      <div class="row">${['shock', 'spring', 'strut', 'carm', 'stab', 'balljoint', 'bush', 'hub', 'wbearing'].map((k, i) => `<button type="button" class="chip" data-c="${k}"><b class="mono">${i + 1}</b> ${esc(COMP[k].sh || COMP[k].n)}</button>`).join('')}</div></div></div></div>
    <div class="stage-cap" id="spCap">${ic('info')}<span>Bấm “Cho xe qua ổ gà”.</span></div></div>`,
  mount(root) {
    const g = id => root.querySelector('#' + id), body = g('spBody'), wheel = g('spWheel'), spr = g('spSpring'), dmp = g('spDamp'), arm = g('spArm'), road = g('spRoad'), trace = g('spTrace'), cap = g('spCap');
    let x = 0, v = 0, c = 7.5, bumpT = -1, hist = Array(150).fill(0), osc = 0;
    root.addEventListener('click', e => { if (e.target.closest('[data-bump]')) { bumpT = 0; osc = 0; } const d = e.target.closest('[data-dmp]'); if (d) { $$('[data-dmp]', root).forEach(b => b.setAttribute('aria-pressed', b === d)); c = d.dataset.dmp === 'good' ? 7.5 : .7; } });
    const draw = (u, xb) => {
      const by = 60 - xb, wy = 250 - u;
      body.setAttribute('transform', `translate(0,${(-xb).toFixed(1)})`); wheel.setAttribute('transform', `translate(0,${(-u).toFixed(1)})`);
      const top = by + 34, bot = wy - 36; let d = `M232,${top.toFixed(1)}`; const n = 9; for (let i = 1; i <= n; i++) d += ` L${i % 2 ? 268 : 232},${(top + (bot - top) * i / n).toFixed(1)}`; spr.setAttribute('d', d);
      dmp.setAttribute('y', (top + 6).toFixed(1)); dmp.setAttribute('height', Math.max(20, bot - top - 12).toFixed(1));
      arm.setAttribute('d', `M98,${(258 - u * .15).toFixed(1)} L256,${(wy + 20).toFixed(1)}`);
      road.setAttribute('d', `M0,336 H${(330 - 60).toFixed(0)} Q330,${(336 - u * 1.4).toFixed(1)} ${(330 + 60).toFixed(0)},336 H520`);
    };
    return loop(dt => {
      let u = 0; if (bumpT >= 0) { bumpT += dt; const s = bumpT / .55; u = s < 1 ? 30 * Math.sin(Math.PI * s) : 0; if (s > 6) bumpT = -1; }
      const k = 60, sub = 4; for (let i = 0; i < sub; i++) { const a = -k * (x - u) - c * v; v += a * dt / sub; x += v * dt / sub; }
      osc = Math.max(osc * .995, Math.abs(x)); draw(u, x);
      hist.push(x); hist.shift(); trace.setAttribute('d', 'M' + hist.map((h, i) => `${(i * 2).toFixed(0)},${(35 - h * 1.1).toFixed(1)}`).join(' L'));
      if (bumpT > 0) cap.innerHTML = ic('info') + `<span>${c > 3 ? 'Giảm chấn tốt: thân xe nhún một nhịp rồi êm lại – lốp luôn bám đường.' : 'Giảm chấn hỏng: thân xe nhún nhảy nhiều nhịp – lốp nảy khỏi mặt đường, phanh và lái kém đi.'}</span>`;
    });
  }
};
function suspSVG() {
  const pin = (k, n, x, y) => `<g class="hs" data-c="${k}" transform="translate(${x},${y})" tabindex="0" role="button"><circle r="10"/><text y="3.6" text-anchor="middle">${n}</text></g>`;
  return `<svg class="eng" viewBox="0 0 520 360" role="img" aria-label="Một góc treo MacPherson: thân xe, cụm giảm xóc, lò xo, càng A, rô-tuyn, thanh cân bằng, moay-ơ và bánh xe">
    <path id="spRoad" d="M0,336 H520" fill="none" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
    <g id="spBody"><rect x="20" y="40" width="480" height="40" rx="10" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5"/><text x="40" y="65" class="e-lbl">THÂN XE</text><rect x="226" y="80" width="48" height="14" rx="4" fill="#94a3b8"/>
      <rect x="40" y="80" width="80" height="30" rx="6" fill="#cbd5e1" stroke="#64748b"/><text x="80" y="100" text-anchor="middle" class="e-lbl">KHUNG PHỤ</text></g>
    <path id="spSpring" fill="none" stroke="#0d9488" stroke-width="5" stroke-linejoin="round"/>
    <rect id="spDamp" x="242" y="120" width="16" height="80" rx="4" fill="#99f6e4" stroke="#0d9488" stroke-width="1.5"/>
    <path id="spArm" fill="none" stroke="#475569" stroke-width="10" stroke-linecap="round"/>
    <circle cx="98" cy="258" r="9" fill="#1f2937"/><path d="M60,214 H150" stroke="#7c3aed" stroke-width="6" stroke-linecap="round"/><path d="M150,214 L238,170" stroke="#7c3aed" stroke-width="3"/>
    <g id="spWheel"><rect x="296" y="166" width="70" height="168" rx="22" fill="#1f2937"/><rect x="306" y="196" width="50" height="108" rx="12" fill="#cbd5e1" stroke="#64748b"/><rect x="252" y="214" width="58" height="36" rx="8" fill="#94a3b8" stroke="#475569"/><circle cx="330" cy="250" r="12" fill="#64748b"/><circle cx="262" cy="270" r="8" fill="#334155"/></g>
    ${pin('shock', 1, 222, 150)}${pin('spring', 2, 290, 128)}${pin('strut', 3, 250, 100)}${pin('carm', 4, 170, 262)}${pin('stab', 5, 92, 206)}${pin('balljoint', 6, 262, 290)}${pin('bush', 7, 98, 284)}${pin('hub', 8, 282, 232)}${pin('wbearing', 9, 352, 246)}</svg>`;
}
HERO.wheels = {
  html: () => `<div class="stack"><div class="stage"><div class="stage-bar"><div class="h-sub">${ic('align')}Góc đặt bánh: kéo thanh trượt để thấy ảnh hưởng (góc được phóng đại cho dễ nhìn)</div></div>
    <div class="pad"><div class="align3">
      <div class="alc"><div class="row between"><b>Camber</b><span class="val" id="vCam">−0,5°</span></div><small class="muted">Nhìn từ phía trước – bánh nghiêng vào/ra</small><svg viewBox="0 0 200 170"><line x1="100" y1="12" x2="100" y2="150" stroke="#cbd5e1" stroke-dasharray="4 4"/><line x1="10" y1="152" x2="190" y2="152" stroke="#94a3b8" stroke-width="3"/><g id="gCam"><rect x="78" y="30" width="44" height="122" rx="14" fill="#1f2937"/><rect x="88" y="52" width="24" height="78" rx="6" fill="#cbd5e1"/></g><text x="186" y="24" text-anchor="end" class="e-lbl">THÂN XE →</text></svg><input type="range" min="-3" max="3" step="0.1" value="-0.5" data-al="cam" aria-label="Camber"><p id="tCam"></p></div>
      <div class="alc"><div class="row between"><b>Caster</b><span class="val" id="vCas">4,0°</span></div><small class="muted">Nhìn từ bên hông – trụ lái nghiêng về sau</small><svg viewBox="0 0 200 170"><line x1="10" y1="152" x2="190" y2="152" stroke="#94a3b8" stroke-width="3"/><circle cx="100" cy="100" r="50" fill="#1f2937"/><circle cx="100" cy="100" r="30" fill="#cbd5e1"/><line x1="100" y1="10" x2="100" y2="152" stroke="#cbd5e1" stroke-dasharray="4 4"/><line id="gCas" x1="100" y1="10" x2="100" y2="152" stroke="#f97316" stroke-width="4" stroke-linecap="round"/><text x="186" y="24" text-anchor="end" class="e-lbl">ĐẦU XE →</text></svg><input type="range" min="0" max="8" step="0.1" value="4" data-al="cas" aria-label="Caster"><p id="tCas"></p></div>
      <div class="alc"><div class="row between"><b>Độ chụm (Toe)</b><span class="val" id="vToe">+0,1°</span></div><small class="muted">Nhìn từ trên xuống – hai bánh trước</small><svg viewBox="0 0 200 170"><path d="M100,10 V40 M92,22 L100,10 L108,22" stroke="#94a3b8" stroke-width="2" fill="none"/><rect x="50" y="56" width="100" height="70" rx="10" fill="#e2e8f0" stroke="#94a3b8"/><g id="gToeL"><rect x="34" y="62" width="20" height="58" rx="6" fill="#1f2937"/></g><g id="gToeR"><rect x="146" y="62" width="20" height="58" rx="6" fill="#1f2937"/></g><text x="100" y="152" text-anchor="middle" class="e-lbl">HƯỚNG CHẠY ↑</text></svg><input type="range" min="-1" max="1" step="0.05" value="0.1" data-al="toe" aria-label="Độ chụm"><p id="tToe"></p></div>
    </div></div></div>
    <div class="card pad"><div class="h-sub" style="margin-bottom:10px">${ic('tire')}Đọc thông số trên thành lốp</div><div class="tirecode" role="group" aria-label="Mã lốp">${TIRECODE.map((t, i) => `<button type="button" data-tc="${i}">${t[0]}</button>`).join('')}</div><p class="lead" id="tcOut" style="margin-top:10px"></p><p class="note">Ví dụ mã lốp 185/55 R16 83V. Bấm từng phần để xem ý nghĩa.</p></div></div>`,
  mount(root) {
    const g = id => root.querySelector('#' + id), f = v => (v > 0 ? '+' : v < 0 ? '−' : '') + nfv(Math.abs(v), 1) + '°';
    const upd = () => {
      const cam = +$('[data-al="cam"]', root).value, cas = +$('[data-al="cas"]', root).value, toe = +$('[data-al="toe"]', root).value;
      g('vCam').textContent = f(cam); g('gCam').setAttribute('transform', `rotate(${(cam * 5).toFixed(1)} 100 152)`);
      g('tCam').textContent = cam < -1.5 ? 'Camber âm nhiều: bám cua tốt hơn nhưng lốp mòn MÉP TRONG.' : cam < -0.3 ? 'Camber âm nhẹ – phổ biến ở xe du lịch: cân bằng giữa bám đường và độ mòn.' : cam <= 0.3 ? 'Camber ≈ 0: lốp tiếp xúc phẳng, mòn đều khi chạy thẳng.' : 'Camber dương: lốp mòn MÉP NGOÀI, xe kém bám khi vào cua.';
      g('vCas').textContent = f(cas); const a = cas * 4 * Math.PI / 180; g('gCas').setAttribute('x1', (100 - 90 * Math.sin(a)).toFixed(1)); g('gCas').setAttribute('y1', (100 - 90 * Math.cos(a)).toFixed(1)); g('gCas').setAttribute('x2', (100 + 52 * Math.tan(a)).toFixed(1)); g('gCas').setAttribute('y2', 152);
      g('tCas').textContent = cas < 2 ? 'Caster nhỏ: lái nhẹ nhưng vô-lăng kém tự trả về, kém ổn định ở tốc độ cao.' : cas <= 6 ? 'Caster vừa phải (~3–6°): xe chạy thẳng ổn định, vô-lăng tự trả lái. Caster hai bên lệch nhau làm xe kéo lệch.' : 'Caster lớn: rất ổn định ở tốc độ cao nhưng tay lái nặng hơn.';
      g('vToe').textContent = f(toe); g('gToeL').setAttribute('transform', `rotate(${(toe * 10).toFixed(1)} 44 91)`); g('gToeR').setAttribute('transform', `rotate(${(-toe * 10).toFixed(1)} 156 91)`);
      g('tToe').textContent = toe > 0.05 ? 'Chụm vào (toe-in): ổn định khi chạy thẳng; quá nhiều → lốp mòn MÉP NGOÀI dạng “vây cá”.' : toe >= -0.05 ? 'Độ chụm ≈ 0: lốp lăn thẳng, ít mòn.' : 'Mở ra (toe-out): vào cua nhạy hơn nhưng kém ổn định; quá nhiều → lốp mòn MÉP TRONG.';
    };
    const tc = i => { $$('[data-tc]', root).forEach((b, j) => b.classList.toggle('on', j === i)); g('tcOut').innerHTML = `<b class="mono">${TIRECODE[i][0]}</b> → ${esc(TIRECODE[i][1])}`; };
    root.addEventListener('input', e => { if (e.target.closest('[data-al]')) upd(); });
    root.addEventListener('click', e => { const b = e.target.closest('[data-tc]'); if (b) tc(+b.dataset.tc); });
    upd(); tc(0);
  }
};
HERO.adas = {
  html: () => `<div class="stage"><div class="stage-bar"><div class="h-sub">${ic('radar')}Vùng “nhìn” của các cảm biến ADAS (nhìn từ trên xuống)</div><div class="adas-f">${ADASF.map(f => `<button type="button" class="btn sm" data-af="${f.id}" aria-pressed="false">${esc(f.n)}</button>`).join('')}<button type="button" class="btn sm ghost" data-af="" aria-pressed="true">Tất cả cảm biến</button></div></div>
    <div class="scroll-x gridbg">${adasSVG()}</div><div class="stage-cap" id="adCap">${ic('info')}<span>Chọn một tính năng để xem nó dùng cảm biến nào và hoạt động trong tình huống nào.</span></div></div>`,
  mount(root) {
    const svg = $('#adasSvg', root);
    const set = id => {
      const f = ADASF.find(x => x.id === id); $$('[data-af]', root).forEach(b => b.setAttribute('aria-pressed', b.dataset.af === (id || '')));
      $$('.cov, .sn', svg).forEach(el => { el.classList.toggle('on', !!f && f.s.includes(el.dataset.s)); el.classList.toggle('dim', !!f && !f.s.includes(el.dataset.s)); });
      $$('.actor', svg).forEach(el => el.classList.toggle('on', !!f && f.a.includes(el.dataset.a))); $('.t-lane', svg).classList.toggle('on', !!f && f.a.includes('lane'));
      $('#adCap', root).innerHTML = f ? `${ic('radar')}<span><b>${esc(COMP[f.id] ? COMP[f.id].n : f.n)}:</b> ${esc(f.d)} <span class="muted">Cảm biến: ${f.s.map(s => SENSN[s]).join(', ')}.</span> ${COMP[f.id] ? `<a href="#/c/${f.id}">Bài học →</a>` : ''}</span>` : `${ic('info')}<span>Đang hiển thị vùng quan sát của tất cả cảm biến.</span>`;
    };
    root.addEventListener('click', e => { const b = e.target.closest('[data-af]'); if (b) set(b.dataset.af); });
    set('');
  }
};
SEC4.ignTiming = {
  html: () => `<div class="card pad" style="margin-top:14px;background:var(--surface-2)"><div class="h-sub" style="margin-bottom:8px">${ic('zap')}Thời điểm đánh lửa thay đổi theo vòng tua</div>
    <div class="duo"><svg viewBox="0 0 300 210" class="dg" id="igSvg" role="img" aria-label="Bánh răng tín hiệu trục khuỷu quay, cảm biến CKP và thời điểm bugi đánh lửa"><circle cx="120" cy="105" r="78" fill="#fff" stroke="#cbd5e1"/><g id="igWheel"></g><rect x="206" y="96" width="34" height="18" rx="4" fill="#dcfce7" stroke="#16a34a"/><text x="223" y="132" text-anchor="middle" class="e-lbl">CKP</text>
      <line x1="120" y1="14" x2="120" y2="30" stroke="#0f172a" stroke-width="2"/><text x="120" y="10" text-anchor="middle" class="e-lbl">ĐCT</text><g id="igSpark" opacity="0"><circle cx="268" cy="44" r="18" fill="#fde047"/><path d="M268,30 l4,9 9,1 -7,6 3,9 -9,-5 -8,5 2,-9 -7,-6 9,-1 z" fill="#f59e0b"/></g><text x="268" y="82" text-anchor="middle" class="e-lbl">TIA LỬA</text><line id="igMark" x1="120" y1="105" x2="120" y2="35" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/></svg>
    <div class="stack"><label class="rng">${ic('gauge')}<span>Vòng tua</span><input type="range" min="800" max="6000" step="100" value="900" id="igRpm"><output id="igRo">900 v/p</output></label><div class="callout t-info">${ic('info')}<div id="igTxt"></div></div><p class="note">Vạch đỏ là mốc ĐCT (điểm chết trên) của xi-lanh 1 trên bánh răng tín hiệu (36 răng, khuyết 1). Tia lửa phát ra <b>trước</b> khi vạch đỏ lên tới đỉnh.</p></div></div></div>`,
  mount(root) {
    const wheel = $('#igWheel', root), mark = $('#igMark', root), spark = $('#igSpark', root), rpm = $('#igRpm', root); if (!wheel) return;
    let teeth = ''; for (let k = 0; k < 36; k++) { if (k === 35) continue; const a = k * 10 * Math.PI / 180; teeth += `<line x1="${(120 + 66 * Math.sin(a)).toFixed(1)}" y1="${(105 - 66 * Math.cos(a)).toFixed(1)}" x2="${(120 + 76 * Math.sin(a)).toFixed(1)}" y2="${(105 - 76 * Math.cos(a)).toFixed(1)}" stroke="#64748b" stroke-width="3"/>`; } wheel.innerHTML = teeth;
    let ang = 0, flash = 0;
    const adv = () => 6 + (+rpm.value - 800) / 5200 * 28;
    const txt = () => { $('#igRo', root).textContent = nfv(+rpm.value) + ' v/p'; $('#igTxt', root).innerHTML = `Ở <b>${nfv(+rpm.value)} vòng/phút</b>, ECU đánh lửa sớm khoảng <b>${Math.round(adv())}°</b> trước ĐCT. Máy càng quay nhanh, piston càng ít thời gian → phải châm lửa sớm hơn để áp suất cháy đạt đỉnh đúng lúc.`; };
    rpm.addEventListener('input', txt); txt();
    return loop(dt => { const w = (40 + +rpm.value / 6000 * 260) * dt; const prev = mod(ang, 360); ang += w; const cur = mod(ang, 360), fire = 360 - adv(); if ((prev < fire && cur >= fire) || (prev > cur && fire > prev)) flash = 1; flash = Math.max(0, flash - dt * 6); wheel.setAttribute('transform', `rotate(${cur.toFixed(1)} 120 105)`); mark.setAttribute('transform', `rotate(${cur.toFixed(1)} 120 105)`); spark.setAttribute('opacity', flash.toFixed(2)); });
  }
};
SEC4.trans = {
  html: () => `<div class="card pad" style="margin-top:14px;background:var(--surface-2)"><div class="h-sub" style="margin-bottom:8px">${ic('gears')}Tỉ số truyền: số thấp = lực lớn, số cao = tốc độ</div>
    <div class="row" style="margin-bottom:10px"><div class="seg" role="group" aria-label="Chọn số">${[['1', 3.5], ['2', 2.0], ['3', 1.4], ['4', 1.0], ['5', 0.8]].map((g, i) => `<button type="button" data-gr="${g[1]}" aria-pressed="${i === 0}">Số ${g[0]}</button>`).join('')}</div><label class="rng" style="min-width:240px">CVT <input type="range" min="0.45" max="2.5" step="0.01" value="2.5" id="cvtR" aria-label="Tỉ số CVT"><output id="cvtO">2,50</output></label></div>
    <div class="duo"><svg viewBox="0 0 400 220" class="dg" role="img" aria-label="Hai bánh răng ăn khớp: bánh dẫn từ động cơ và bánh bị dẫn tới bánh xe"><g id="gA"></g><g id="gB"></g><text x="20" y="210" class="e-lbl">TỪ ĐỘNG CƠ</text><text x="380" y="210" text-anchor="end" class="e-lbl">TỚI BÁNH XE</text></svg>
    <div class="stack"><div><div class="row between small"><b>Lực kéo tới bánh</b><span class="mono" id="trT"></span></div>${H.bar(70, 'blue').replace('<i', '<i id="trTb"')}</div><div><div class="row between small"><b>Tốc độ quay bánh xe</b><span class="mono" id="trS"></span></div>${H.bar(30).replace('<i', '<i id="trSb"')}</div><div class="callout t-info">${ic('info')}<div id="trTxt"></div></div></div></div></div>`,
  mount(root) {
    const gA = $('#gA', root), gB = $('#gB', root); if (!gA) return; let ratio = 3.5, a1 = 0;
    const gear = (r, n) => `<circle r="${r.toFixed(1)}" fill="#e0e7ff" stroke="#4f46e5" stroke-width="7" stroke-dasharray="${(2 * Math.PI * r / n / 2).toFixed(2)} ${(2 * Math.PI * r / n / 2).toFixed(2)}"/><circle r="${(r - 9).toFixed(1)}" fill="#eef2ff" stroke="#c7d2fe"/><line x1="0" y1="0" x2="${(r - 12).toFixed(1)}" y2="0" stroke="#4f46e5" stroke-width="4" stroke-linecap="round"/><circle r="7" fill="#4f46e5"/>`;
    const set = r => {
      ratio = r; const D = 170, r1 = D / (1 + r), r2 = D * r / (1 + r); gA.innerHTML = gear(r1, Math.max(8, Math.round(r1 / 5))); gB.innerHTML = gear(r2, Math.max(8, Math.round(r2 / 5)));
      gA.dataset.x = 110 - (r1 - 60) * .2; gA.dataset.r = r1; gB.dataset.r = r2; $('#trT', root).textContent = '×' + nfv(r, 2); $('#trS', root).textContent = '×' + nfv(1 / r, 2);
      $('#trTb', root).style.setProperty('--p', Math.min(100, r / 3.5 * 100) + '%'); $('#trSb', root).style.setProperty('--p', Math.min(100, 1 / r / 2.2 * 100) + '%');
      $('#trTxt', root).innerHTML = r > 1.05 ? `Bánh răng nhỏ (động cơ) dẫn bánh răng lớn: bánh xe quay <b>chậm hơn ${nfv(r, 1)} lần</b> nhưng lực kéo <b>lớn gấp ${nfv(r, 1)} lần</b> – dùng khi khởi hành, leo dốc.` : r >= .95 ? 'Tỉ số 1 : 1 – bánh xe quay cùng tốc độ với trục vào hộp số (“số thẳng”).' : `Bánh răng lớn dẫn bánh răng nhỏ (số vượt tốc): bánh xe quay <b>nhanh hơn</b> động cơ, vòng tua thấp, tiết kiệm khi chạy đường trường.`;
    };
    root.addEventListener('click', e => { const b = e.target.closest('[data-gr]'); if (!b) return; $$('[data-gr]', root).forEach(x => x.setAttribute('aria-pressed', x === b)); set(+b.dataset.gr); $('#cvtR', root).value = b.dataset.gr; $('#cvtO', root).textContent = nfv(+b.dataset.gr, 2); });
    $('#cvtR', root).addEventListener('input', e => { $$('[data-gr]', root).forEach(x => x.setAttribute('aria-pressed', 'false')); $('#cvtO', root).textContent = nfv(+e.target.value, 2); set(+e.target.value); });
    set(3.5);
    return loop(dt => { a1 += dt * 120; const r1 = +gA.dataset.r, r2 = +gB.dataset.r, cx1 = 200 - (r1 + r2) / 2; gA.setAttribute('transform', `translate(${cx1.toFixed(1)},105) rotate(${(a1 % 360).toFixed(1)})`); gB.setAttribute('transform', `translate(${(cx1 + r1 + r2).toFixed(1)},105) rotate(${(-(a1 / ratio) % 360 + 180 / Math.max(8, Math.round(r2 / 5))).toFixed(1)})`); });
  }
};
SEC4.crash = {
  html: () => `<div class="card pad" style="margin-top:14px;background:var(--surface-2)"><div class="row between" style="margin-bottom:8px"><div class="h-sub">${ic('airbag')}Va chạm → cảm biến → hộp SRS → túi khí bung</div><button type="button" class="btn sm pri" data-crash>${ic('play')}Mô phỏng va chạm (chậm 50 lần)</button></div>
    <svg viewBox="0 0 520 150" class="crash" role="img" aria-label="Mô phỏng một chiếc xe đâm vào tường, túi khí bung"><line x1="10" y1="132" x2="510" y2="132" stroke="#94a3b8" stroke-width="3"/><rect x="470" y="40" width="26" height="92" fill="#cbd5e1" stroke="#64748b"/><g id="crCar"><path d="M10,120 L14,96 Q18,84 36,82 L70,80 Q88,62 104,60 L150,60 Q166,62 176,80 L200,86 Q212,90 212,104 L212,120 Z" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><circle cx="52" cy="122" r="12" fill="#1f2937"/><circle cx="176" cy="122" r="12" fill="#1f2937"/><circle id="crBag" cx="150" cy="86" r="0" fill="#fecaca" stroke="#dc2626"/><line id="crBelt" x1="118" y1="66" x2="132" y2="106" stroke="#dc2626" stroke-width="2"/></g><g id="crBang" opacity="0"><path d="M468,70 l-14,-10 4,16 -16,2 14,8 -6,14 14,-6 6,14 4,-16 14,4 -10,-12 12,-8 -16,0z" fill="#fbbf24"/></g></svg>
    <div class="tline" id="crTl">${CRASH.map(c => `<div><b>${c[0]}</b>${esc(c[1])}</div>`).join('')}</div></div>`,
  mount(root) {
    const car = $('#crCar', root), bag = $('#crBag', root), belt = $('#crBelt', root), bang = $('#crBang', root), tl = $$('#crTl > div', root); if (!car) return; let t = -1;
    root.addEventListener('click', e => { if (e.target.closest('[data-crash]')) t = 0; });
    return loop(dt => {
      if (t < 0) return; t += dt; const hit = 1.1;
      const x = t < hit ? 258 * (t / hit) : 258 + Math.min(6, (t - hit) * 30); car.setAttribute('transform', `translate(${x.toFixed(1)},0)`);
      const ms = (t - hit) * 1000 / 50; bang.setAttribute('opacity', t > hit && t < hit + .5 ? 1 - (t - hit) * 2 : 0);
      bag.setAttribute('r', ms > 30 ? Math.min(20, (ms - 30) * 1.2).toFixed(1) : 0); if (ms > 100) bag.setAttribute('r', Math.max(10, 20 - (ms - 100) * .2).toFixed(1));
      belt.setAttribute('stroke-width', ms > 15 ? 4 : 2);
      const idx = t < hit ? -1 : ms < 10 ? 0 : ms < 15 ? 1 : ms < 30 ? 2 : ms < 100 ? 3 : 4; tl.forEach((d, i) => d.classList.toggle('on', i <= idx));
      if (ms > 160) t = -1;
    });
  }
};
SEC7.cooling = {
  html: () => { const OH = [['Thiếu nước làm mát', 'coolant', 'Kiểm tra bình nước phụ khi máy nguội; tìm vết rò.'], ['Van hằng nhiệt kẹt đóng', 'thermostat', 'Ống trên két không nóng dù máy đã nóng.'], ['Bơm nước hỏng', 'wpump', 'Rỉ nước ở lỗ thoát, tiếng kêu, nước không tuần hoàn.'], ['Két nước tắc', 'radiator', 'Két có vùng lạnh; mặt két bẩn, bẹp lá tản nhiệt.'], ['Quạt két nước hỏng', 'fan', 'Bật A/C mà quạt không chạy.'], ['Thổi gioăng nắp máy', 'head', 'Bọt khí trong két, khói trắng, dầu lẫn nước.']];
    return `<div class="card pad" style="margin-top:16px"><div class="row" style="margin-bottom:12px"><span class="dnode root" style="width:auto">${ic('thermo')}Động cơ quá nóng (Engine Overheating)</span><span class="muted">→ nguyên nhân có thể:</span></div>
      <div class="grid g3">${OH.map((o, i) => `<button type="button" class="cc" data-c="${o[1]}"><span class="ibox sm tn-crit" style="font:700 12px var(--fm)">${i + 1}</span><span class="cc-b"><b>${o[0]}</b><span class="d">${ic('search', 's16')} ${o[2]}</span></span></button>`).join('')}</div>
      <div class="row" style="margin-top:12px"><a class="btn" href="#/diag/overheat">${ic('wrench')}Mở cây chẩn đoán “Nóng máy”</a></div></div>`; }
};

/* ---------- trang hệ thống ---------- */
function sysPage(s) {
  const lid = 's:' + s.id, qs = quizFor(lid), hasDia = !!(s.dia || s.dias), hero = HERO[s.special] ? HERO[s.special].html(s) : hasDia ? diaStageHTML(s) : '';
  const steps = (s.steps || (s.dias ? s.dias[0].steps : null) || []), comps = (s.comps || []).filter(id => COMP[id]);
  const how = hasDia && steps.length ? `<p>Sơ đồ ở đầu trang có <b>${steps.length} bước</b> – bấm “Chạy từng bước” để xem lần lượt:</p>${tlHTML(steps.map(x => x.t))}<button type="button" class="btn sm" style="margin-top:12px" data-top>${ic('layers')}Xem lại trên sơ đồ</button>`
    : s.flows ? `<p>Ba luồng ở đầu trang chạy cùng lúc trong mọi chiếc xe xăng. Chọn từng tab để xem từng bước.</p>`
    : `<p>Minh họa tương tác ở đầu trang cho thấy hệ thống này làm việc ra sao – hãy thử bấm, kéo, chọn. Những ý chính cần nhớ:</p>${tlHTML(s.quick || s.sum || [])}<button type="button" class="btn sm" style="margin-top:12px" data-top>${ic('layers')}Về minh họa</button>`;
  return { t: s.n, crumbs: [['Lộ trình', '/path']], lesson: lid, html: `${lessonHead(Object.assign({ kind: 'Hệ thống' }, s), lid)}${stepperHTML()}<div class="stack lg">${hero}
    ${s.flow && s.special !== 'overview' ? `<div class="card pad"><div class="h-sub" style="margin-bottom:10px">${ic('route')}Luồng chính</div>${flowStrip(s.flow, { big: true })}</div>` : ''}
    <div class="secs">${sec(1, `<p class="big">${esc(s.what)}</p>${s.quick ? `<div class="grid g3" style="margin-top:14px">${s.quick.map((q, i) => H.callout(['info', 'ok', 'tech'][i % 3], ['info', 'zap', 'target'][i % 3], esc(q))).join('')}</div>` : ''}`)}
    ${sec(2, `<div class="duo"><div><p class="big">${esc(s.loc)}</p><p style="margin-top:10px"><a class="btn sm" href="#/explore/${s.z}">${ic('car')}Xem trên mặt cắt chiếc xe</a></p></div><div class="card" style="padding:6px">${miniCar(s.z)}</div></div>`)}
    ${sec(3, `<p class="big">${esc(s.fn)}</p>`)}
    ${sec(4, how + (SEC4[s.special] ? SEC4[s.special].html(s) : ''))}
    ${sec(5, `<p style="margin-bottom:14px">${esc(s.cn)}</p>${comps.length ? (s.special === 'sensors' ? `<div class="row">${cchips(comps)}</div>` : `<div class="grid">${comps.map(id => ccard(id)).join('')}</div>`) : ''}`)}
    ${sec(6, failsHTML(s))}
    ${sec(7, diagHTML(s) + (SEC7[s.special] ? SEC7[s.special].html(s) : ''))}
    ${sec(8, story(s.ex))}${sec(9, quizHTML(lid, qs))}${sec(10, sumHTML(s.sum) + doneBarHTML(lid))}${advHTML(s.adv)}</div></div>`,
    mount(root) {
      const subs = [mountStepper(root)];
      if (HERO[s.special] && HERO[s.special].mount) subs.push(HERO[s.special].mount(root, s)); else if (hasDia) subs.push(mountDiaStage(root, s));
      if (SEC4[s.special] && SEC4[s.special].mount) subs.push(SEC4[s.special].mount(root, s));
      subs.push(cycleStrip($('.card [data-fs]', root)));
      mountQuiz(root, lid, qs); mountDone(root);
      root.addEventListener('click', e => { if (e.target.closest('[data-top]')) { const st = $('.stage', root); if (st) { st.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); const p = $('[data-play]', st); if (p) setTimeout(() => p.click(), RM ? 0 : 500); } } });
      return () => subs.forEach(f => typeof f === 'function' && f());
    } };
}
route(/^\/s\/(\w+)$/, m => { const s = SYS[m[1]]; if (!s) return null; if (s.route && s.route !== '/s/' + s.id) { go(s.route); return null; } return sysPage(s); });
route(/^\/sensors$/, () => sysPage(SYS.sensors));

/* ---------- trang bộ phận ---------- */
function findDiag(cid, prefer) {
  const order = [SYS[prefer]].concat(SYS_LIST.filter(s => s.id !== prefer)).filter(Boolean);
  for (const s of order) for (const d of diaList(s)) { if (d.special || !d.nodes) continue; const n = d.nodes.find(x => x.c === cid); if (n) return { s, d, n: n.id }; }
  return null;
}
route(/^\/c\/(\w+)$/, m => {
  const c = COMP[m[1]]; if (!c) return null; const s = SYS[c.s] || SYS.overview, lid = 'c:' + c.id, qs = quizFor(lid), host = findDiag(c.id, c.s);
  let heroDia = '', R = null;
  if (host) { R = dgRender(host.d); heroDia = `<div class="stage"><div class="stage-bar"><div class="h-sub">${ic('layers')}${esc(c.sh || c.n)} trong ${lc(host.s.n)}</div><a class="btn sm" href="#${host.s.route || '/s/' + host.s.id}">Mở bài hệ thống ${ic('arrow')}</a></div><div class="scroll-x gridbg">${R.html}</div>${dgLegend(R.used)}</div>`; }
  else heroDia = `<div class="card pad"><div class="h-sub" style="margin-bottom:10px">${ic('route')}${esc(s.n)}</div>${fsFromSys(s, true)}</div>`;
  const ch = LMAP[lid] ? LMAP[lid].ch : null, ci = ch ? ch.ls.indexOf(lid) : -1, prev = ci > 0 ? lmeta(ch.ls[ci - 1]) : null, next = ch && ci < ch.ls.length - 1 ? lmeta(ch.ls[ci + 1]) : null;
  const rel = DX.filter(d => d.comps.includes(c.id) || d.causes.some(x => x[1] === c.id)).slice(0, 5);
  const ex = c.ex || `Xe có dấu hiệu “${lc((c.sym || ['bất thường'])[0])}”. Làm lần lượt các bước kiểm tra ở phần 07 cho thấy nguyên nhân là ${lc((c.cause || ['chi tiết đã hỏng'])[0])}. Xử lý đúng nguyên nhân đó, triệu chứng biến mất.`;
  const sum = [c.w, 'Nhiệm vụ: ' + c.fn, (c.sym && c.sym.length) ? 'Khi hỏng: ' + c.sym.slice(0, 2).join('; ') + '.' : '', (c.chk && c.chk.length) ? 'Kiểm tra đầu tiên: ' + c.chk[0] + '.' : ''].filter(Boolean);
  const io = `<div class="io"><div class="io-col"><h4>Nhận từ / vào</h4>${(c.in || []).map(x => x[0] === '~' ? `<span class="ilink">${H.ibox('arrow', 'tech')}<span class="t">${esc(x.slice(1))}</span></span>` : COMP[x] ? `<button type="button" class="ilink" data-c="${x}">${H.ibox(COMP[x].ic, (SYS[COMP[x].s] || {}).tone)}<span class="t">${esc(COMP[x].sh || COMP[x].n)}</span>${ic('chev', 's16')}</button>` : '').join('') || '<span class="muted">—</span>'}</div>
    <span class="io-arrow">${ic('arrow', 's24')}</span><div class="io-col" style="align-items:center">${H.ibox(c.ic, s.tone, 'lg')}<div class="io-mid">${esc(c.sh || c.n)}</div></div><span class="io-arrow">${ic('arrow', 's24')}</span>
    <div class="io-col"><h4>Gửi tới / ra</h4>${(c.out || []).map(x => x[0] === '~' ? `<span class="ilink">${H.ibox('arrow', 'tech')}<span class="t">${esc(x.slice(1))}</span></span>` : COMP[x] ? `<button type="button" class="ilink" data-c="${x}">${H.ibox(COMP[x].ic, (SYS[COMP[x].s] || {}).tone)}<span class="t">${esc(COMP[x].sh || COMP[x].n)}</span>${ic('chev', 's16')}</button>` : '').join('') || '<span class="muted">—</span>'}</div></div>`;
  return { t: c.n, crumbs: [[s.n, s.route || '/s/' + s.id]], lesson: lid, html: `${lessonHead({ n: c.n, en: c.en, ic: c.ic, tone: s.tone, tag: c.w, kind: 'Bộ phận' }, lid, `<a class="chip" href="#${s.route || '/s/' + s.id}">${ic(s.ic)}${esc(s.n)}</a>`)}${stepperHTML()}
    <div class="stack lg">${heroDia}<div class="secs">
    ${sec(1, `<p class="big">${esc(c.w)}</p>`)}
    ${sec(2, `<div class="duo"><div><p class="big">${esc(c.loc)}</p><p style="margin-top:10px"><a class="btn sm" href="#/explore/${c.z}">${ic('car')}Xem khu vực này trên xe</a></p></div><div class="card" style="padding:6px">${miniCar(c.z)}</div></div>`)}
    ${sec(3, `<p class="big">${esc(c.fn)}</p>`)}
    ${sec(4, `<p>${esc(c.how)}</p>${c.wave ? `<div class="wave" style="margin-top:14px;max-width:520px">${waveSVG(c.wave)}<p>${esc(c.sig || '')}</p></div>` : ''}${host ? `<p class="note" style="margin-top:12px">${ic('layers', 's16')} Sơ đồ ở đầu trang tô sáng ${lc(c.sh || c.n)} và các bộ phận nối trực tiếp với nó.</p>` : ''}`)}
    ${sec(5, io)}
    ${sec(6, `<div class="symg">${(c.sym || []).map(x => `<span class="sym">${ic('alert')}${esc(x)}</span>`).join('')}</div>${c.cause ? `<div class="h-sub" style="margin:14px 0 6px">Hỏng thường gặp</div><ul class="sumlist">${c.cause.map(x => `<li>${ic('wrench')}<span>${esc(x)}</span></li>`).join('')}</ul>` : ''}`)}
    ${sec(7, `${tlHTML(c.chk || [])}${c.dtc ? `<div class="h-sub" style="margin:14px 0 6px">Mã lỗi liên quan</div><div class="row">${c.dtc.map(d => `<a class="chip t-tech mono" href="#/obd/${d}">${d}</a>`).join('')}</div>` : ''}${rel.length ? `<div class="h-sub" style="margin:14px 0 6px">Triệu chứng liên quan</div><div class="row">${rel.map(d => `<a class="chip t-warn" href="#/diag/${d.id}">${ic(d.ic)}${esc(d.t)}</a>`).join('')}</div>` : ''}`)}
    ${sec(8, story(ex))}${sec(9, quizHTML(lid, qs))}
    ${sec(10, sumHTML(sum) + doneBarHTML(lid) + `<div class="row between" style="margin-top:12px">${prev ? `<a class="btn ghost" href="#${prev.route}">${ic('chevl')}${esc(prev.t)}</a>` : '<span></span>'}${next ? `<a class="btn ghost" href="#${next.route}">${esc(next.t)}${ic('chev')}</a>` : ''}</div>`)}
    ${advHTML(c.adv, c.life ? `<div class="callout t-tech" style="margin-top:10px">${ic('clock')}<div><b>Bảo dưỡng:</b> ${esc(c.life)}</div></div>` : '')}</div></div>`,
    ctx: () => ctxComp(c.id),
    mount(root) {
      const subs = [mountStepper(root)];
      if (R) { const svg = $('svg.dg', root), ctl = dgCtl(svg), edges = host.d.edges.filter(e => e.a === host.n || e.b === host.n); ctl.set({ hl: [host.n].concat(edges.map(e => e.a === host.n ? e.b : e.a), edges.map(ekey)) }); ctl.sel(host.n); }
      mountQuiz(root, lid, qs); mountDone(root); return () => subs.forEach(f => typeof f === 'function' && f());
    } };
});
