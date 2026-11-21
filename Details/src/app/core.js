/* ===== CORE: tiện ích chung, lưu tiến độ, router, tooltip, vòng lặp animation ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fold = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const mod = (a, n) => ((a % n) + n) % n;
const RM = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
const isTouch = () => !!(window.matchMedia && window.matchMedia('(hover: none)').matches);
const nfv = (v, d = 0) => Number(v).toLocaleString('vi-VN', { minimumFractionDigits: d, maximumFractionDigits: d });

/* ---------- ngẫu nhiên có hạt giống (quiz ổn định giữa các lần mở) ---------- */
function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function shuffle(arr, r) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/* ---------- sự kiện nội bộ ---------- */
const BUS = {};
function on(ev, fn) { (BUS[ev] = BUS[ev] || []).push(fn); }
function emit(ev, d) { (BUS[ev] || []).forEach(f => { try { f(d); } catch (e) { console.error(e); } }); }

/* ---------- lưu tiến độ trên trình duyệt (chỉ là tiện ích cá nhân; mất khi xóa dữ liệu trang) ---------- */
const ST = (() => {
  const KEY = 'xang-academy-v1';
  const blank = () => ({ done: {}, quiz: {}, last: null, seen: {} });
  let s = blank();
  try { const raw = localStorage.getItem(KEY); if (raw) { const o = JSON.parse(raw); if (o && typeof o === 'object') s = Object.assign(blank(), o); } } catch (e) { }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { } };
  return {
    done: id => !!s.done[id],
    setDone(id, v = true) { if (v) s.done[id] = Date.now(); else delete s.done[id]; save(); emit('progress', id); },
    quiz: id => s.quiz[id] || 0,
    setQuiz(id, sc) { s.quiz[id] = Math.max(s.quiz[id] || 0, sc); save(); },
    seen(id) { if (!s.seen[id]) { s.seen[id] = Date.now(); save(); } },
    wasSeen: id => !!s.seen[id],
    get last() { return s.last; },
    setLast(o) { s.last = o; save(); },
    count: () => Object.keys(s.done).length,
    reset() { s = blank(); save(); emit('progress'); }
  };
})();

/* ---------- router dạng hash: #/s/fuel, #/c/maf, #/diag/nostart ---------- */
const ROUTES = [];
function route(re, fn) { ROUTES.push([re, fn]); }
function curPath() { let h = ''; try { h = decodeURIComponent(location.hash.slice(1)); } catch (e) { h = location.hash.slice(1); } if (!h) h = '/'; if (h[0] !== '/') h = '/' + h; return h; }
function go(p) { if (curPath() === p) emit('rerender'); else location.hash = '#' + p; }

/* ---------- vòng lặp animation gắn với từng màn hình (tự dừng khi rời trang) ---------- */
const LOOPS = new Set(), TIMERS = new Set();
function loop(fn) {
  const o = { on: true, last: performance.now(), id: 0 };
  const step = t => { if (!o.on) return; const dt = Math.min(0.05, Math.max(0, (t - o.last) / 1000)); o.last = t; try { fn(dt, t); } catch (e) { console.error(e); o.on = false; return; } o.id = requestAnimationFrame(step); };
  o.id = requestAnimationFrame(step); LOOPS.add(o);
  return () => { o.on = false; cancelAnimationFrame(o.id); LOOPS.delete(o); };
}
function every(ms, fn) { const id = setInterval(fn, ms); TIMERS.add(id); return id; }
function later(ms, fn) { const id = setTimeout(() => { TIMERS.delete(id); fn(); }, ms); TIMERS.add(id); return id; }
function stopAll() { LOOPS.forEach(o => { o.on = false; cancelAnimationFrame(o.id); }); LOOPS.clear(); TIMERS.forEach(id => { clearInterval(id); clearTimeout(id); }); TIMERS.clear(); }

/* ---------- tooltip ---------- */
const TIP = {
  show(html, x, y) {
    const el = $('#tip'); el.innerHTML = html; el.hidden = false;
    const w = el.offsetWidth, h = el.offsetHeight, vw = innerWidth, vh = innerHeight;
    let left = x + 16, top = y + 16;
    if (left + w > vw - 8) left = x - w - 14;
    if (top + h > vh - 8) top = y - h - 14;
    el.style.left = Math.max(8, left) + 'px'; el.style.top = Math.max(8, top) + 'px';
  },
  hide() { const el = $('#tip'); if (el) el.hidden = true; }
};
function toast(msg) {
  const el = $('#toast'); el.innerHTML = ic('check') + esc(msg); el.hidden = false;
  clearTimeout(toast._t); toast._t = setTimeout(() => { el.hidden = true; }, 2600);
}

/* ---------- HTML nhỏ ---------- */
const H = {
  sec(n, t, en, body, id) { return `<section class="sec" id="${id || 'sec' + n}"><div class="sec-h"><span class="sec-n">${String(n).padStart(2, '0')}</span><h2 class="sec-t">${t}</h2><span class="sec-en">${en || ''}</span></div>${body}</section>`; },
  chip(t, cls = '', ico) { return `<span class="chip ${cls}">${ico ? ic(ico) : ''}${t}</span>`; },
  ibox(name, tone, size = '') { return `<span class="ibox ${size} tn-${tone || 'info'}">${ic(name)}</span>`; },
  callout(tone, ico, html) { return `<div class="callout t-${tone}">${ic(ico)}<div>${html}</div></div>`; },
  bar(p, cls = '') { return `<div class="bar ${cls}"><i style="--p:${clamp(p, 0, 100)}%"></i></div>`; }
};
const SEV = { 1: ['t-ok', 'Nhẹ'], 2: ['t-warn', 'Cần chú ý'], 3: ['t-crit', 'Nghiêm trọng'] };
const sevChip = s => `<span class="chip ${SEV[s][0]}"><i class="dot"></i>${SEV[s][1]}</span>`;
