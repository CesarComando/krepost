/* ===== Мозаики: собрать старое фото из плиток (24.11.2026) =====
   Всё работает в телефоне: без сервера, без входа. Прогресс — localStorage:
   krepost.mosaics   { s253: { 9: ходов, 16: ходов, 25: ходов } } — лучшие результаты по каждой сложности;
   krepost.mosaicNow { id, k, order, moves, sec } — недособранная мозаика (переживает перезагрузку страницы).
   Фото — только снимки приложения с известным источником (spots.js). crop — сколько отрезать по краям
   (доли: слева, сверху, справа, снизу): у PastVu внизу полоса с адресом сайта, у открыток — поля.
   Подключение в index.html: renderQuests (список и экран мозаики), passportBadges (значки), SHELL, pages.yml. */
window.MOSAICS_DATA = [
  { id: 's253', crop: [0, 0.02, 0, 0.01] },        // Михайловские ворота, вал и въезд, собор, зима
  { id: 's06', crop: [0.015, 0.02, 0.015, 0.03] },  // Комендантский сад, открытка до 1911
  { id: 's277', crop: [0.01, 0, 0.01, 0] },         // Николаевские ворота и мост зимой, 1921
  { id: 's429', crop: [0, 0, 0, 0.028] },           // Памятник-фонтан из пушек, Комендантский сад
  { id: 's301', crop: [0, 0, 0, 0.026] },           // Собор, фасад с башнями, 1940
  { id: 's338', crop: [0.01, 0.01, 0.01, 0.01] },   // Столбы ворот с вазами, мост, зима
  { id: 's269', crop: [0.01, 0.02, 0.01, 0.035] },  // Константиновские ворота и 2-й редюит
  { id: 's317', crop: [0, 0, 0, 0.027] },           // Солнечные часы на стене коллегиума
  { id: 's374', crop: [0, 0, 0, 0.028] },           // Военный госпиталь
  { id: 's351', crop: [0, 0, 0, 0.028] }            // Артиллерийский арсенал зимой, сверху
];

(function () {
  const DONE_KEY = 'krepost.mosaics', NOW_KEY = 'krepost.mosaicNow';
  const LEVELS = [3, 4, 5]; // 9, 16, 25 плиток
  // Строки интерфейса мозаик (свои, чтобы не трогать общие файлы переводов). Нет языка — английский.
  const TR = {
    lv: {
      'Мозаики': 'Mozaīkas', 'Соберите старое фото из кусочков — дома или в крепости. Потом найдите это место вживую.': 'Salieciet veco foto no gabaliņiem — mājās vai cietoksnī. Pēc tam atrodiet šo vietu dabā.',
      'Собрано {n} из {m}': 'Salikts {n} no {m}', '← Все квесты': '← Visi kvesti', 'Легко': 'Viegli', 'Средне': 'Vidēji', 'Трудно': 'Grūti',
      'Ходов: {n}': 'Gājieni: {n}', '👁 Подсмотреть': '👁 Paskatīties', '↻ Перемешать': '↻ Sajaukt',
      'Нажмите на два кусочка — они поменяются местами. Или перетащите пальцем. Кусочек на своём месте светится и больше не двигается.': 'Pieskarieties diviem gabaliņiem — tie samainīsies vietām. Vai velciet ar pirkstu. Gabaliņš savā vietā izgaismojas un vairs nekustas.',
      '🧩 Собрано!': '🧩 Salikts!', '{n} ходов · {t}': '{n} gājieni · {t}', 'Лучший результат: {n} ходов': 'Labākais rezultāts: {n} gājieni',
      'Где это: {g}': 'Kur tas ir: {g}', '📷 Снять «тогда и сейчас» на месте': '📷 Uzņemt «toreiz un tagad» uz vietas', '🗺 На карте': '🗺 Kartē',
      '🖼 Все снимки этого места': '🖼 Visi šīs vietas attēli', 'Собрать сложнее: {n} кусочков': 'Salikt grūtāk: {n} gabaliņi', 'Следующая мозаика →': 'Nākamā mozaīka →',
      'Источник': 'Avots', 'Мозаика: {n}': 'Mozaīka: {n}', 'Соберите мозаики из старых фото (любая сложность).': 'Salieciet mozaīkas no vecajiem foto (jebkura grūtība).',
      'Мастер мозаик': 'Mozaīku meistars', 'Соберите все мозаики на «Трудно» (25 кусочков).': 'Salieciet visas mozaīkas līmenī «Grūti» (25 gabaliņi).',
      'Продолжить': 'Turpināt', '{n} кусочков': '{n} gabaliņi', 'Все мозаики собраны!': 'Visas mozaīkas saliktas!'
    },
    en: {
      'Мозаики': 'Mosaics', 'Соберите старое фото из кусочков — дома или в крепости. Потом найдите это место вживую.': 'Put an old photo back together — at home or in the fortress. Then find the real place.',
      'Собрано {n} из {m}': '{n} of {m} done', '← Все квесты': '← All quests', 'Легко': 'Easy', 'Средне': 'Medium', 'Трудно': 'Hard',
      'Ходов: {n}': 'Moves: {n}', '👁 Подсмотреть': '👁 Peek', '↻ Перемешать': '↻ Shuffle',
      'Нажмите на два кусочка — они поменяются местами. Или перетащите пальцем. Кусочек на своём месте светится и больше не двигается.': 'Tap two pieces to swap them, or drag with your finger. A piece in the right place glows and stays put.',
      '🧩 Собрано!': '🧩 Done!', '{n} ходов · {t}': '{n} moves · {t}', 'Лучший результат: {n} ходов': 'Best: {n} moves',
      'Где это: {g}': 'Where: {g}', '📷 Снять «тогда и сейчас» на месте': '📷 Take a “then & now” photo on site', '🗺 На карте': '🗺 On the map',
      '🖼 Все снимки этого места': '🖼 All photos of this place', 'Собрать сложнее: {n} кусочков': 'Try harder: {n} pieces', 'Следующая мозаика →': 'Next mosaic →',
      'Источник': 'Source', 'Мозаика: {n}': 'Mosaic: {n}', 'Соберите мозаики из старых фото (любая сложность).': 'Complete mosaics of old photos (any level).',
      'Мастер мозаик': 'Mosaic master', 'Соберите все мозаики на «Трудно» (25 кусочков).': 'Complete every mosaic on “Hard” (25 pieces).',
      'Продолжить': 'Continue', '{n} кусочков': '{n} pieces', 'Все мозаики собраны!': 'All mosaics done!'
    }
  };
  const lang = () => window.LANG || 'ru';
  function M(s, vars) {
    let v = s;
    if (lang() !== 'ru') { const t = window.T ? window.T(s) : s; v = t !== s ? t : ((TR[lang()] || TR.en)[s] || TR.en[s] || s); }
    return vars ? v.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m)) : v;
  }
  const read = (k, f) => { try { return JSON.parse(localStorage.getItem(k)) || f; } catch { return f; } };
  const write = (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, JSON.stringify(v)); } catch { /* нет места */ } };
  const list = () => window.MOSAICS_DATA.filter(m => typeof spotById === 'function' && spotById(m.id));
  const done = () => read(DONE_KEY, {});
  const best = id => { // больше всего кусочков, на которых собрана (9, 16 или 25); 0 — ещё не собрана
    const d = done()[id] || {}; const ks = Object.keys(d).map(Number); return ks.length ? Math.max(...ks) : 0; };
  const fmtT = s => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');

  /* ---------- оформление (одним блоком, чтобы не трогать стили index.html) ---------- */
  const css = `
  .mzSec { display:flex; flex-direction:column; gap:10px; }
  .mzSec h3 { margin:0; font:700 22px/1.15 var(--old); color:var(--text); }
  .mzSec > p { margin:0; color:var(--muted); font-size:14px; line-height:1.4; }
  .mzRow { display:grid; grid-template-columns:repeat(5, minmax(0,1fr)); gap:8px; }
  .mzThumb { position:relative; min-height:0; padding:0; border:0; border-radius:10px; overflow:hidden; aspect-ratio:1; background:#2a231b; box-shadow:none; cursor:pointer; }
  .mzThumb img { width:100%; height:100%; object-fit:cover; display:block; filter:sepia(.35) contrast(1.05); }
  .mzThumb.locked img { filter:grayscale(1) blur(1.5px) brightness(.8); }
  .mzThumb .mzQ { position:absolute; inset:0; display:grid; grid-template-columns:repeat(3,1fr); }
  .mzThumb .mzQ i { border:1px solid rgba(255,255,255,.28); }
  .mzThumb .mzOk { position:absolute; right:4px; bottom:4px; min-width:22px; height:22px; padding:0 5px; border-radius:11px; background:var(--accent); color:#1c1610; font:700 12px/22px Inter,system-ui,sans-serif; }
  .mzProg { font:600 13px var(--cond); text-transform:uppercase; letter-spacing:.04em; color:var(--accent); }
  .mzHead h2 { margin:0; font:700 24px/1.15 var(--old); text-transform:uppercase; }
  .mzHead p { margin:4px 0 0; color:var(--muted); font-size:14px; }
  .mzLv { display:flex; gap:6px; }
  .mzLv button { flex:1; min-height:40px; padding:6px 4px; border-radius:10px; border:1px solid var(--line); background:transparent; color:var(--text); font:600 14px Inter,system-ui,sans-serif; text-transform:none; letter-spacing:0; box-shadow:none; }
  .mzLv button small { display:block; font-weight:400; font-size:11px; color:var(--muted); }
  .mzLv button.on { background:var(--accent); border-color:var(--accent); color:#1c1610; }
  .mzLv button.on small { color:#1c1610; }
  .mzBoard { position:relative; margin:0 auto; touch-action:none; user-select:none; -webkit-user-select:none; border-radius:6px; background:#0d0b09; box-shadow:0 6px 20px rgba(0,0,0,.45); }
  .mzBoard .mzT { position:absolute; left:0; top:0; background-repeat:no-repeat; border-radius:2px; box-shadow:inset 0 0 0 1px rgba(0,0,0,.55); transition:transform .22s ease, box-shadow .2s, filter .2s; will-change:transform; cursor:grab; }
  .mzBoard .mzT.sel { box-shadow:inset 0 0 0 3px var(--accent), 0 0 0 2px var(--accent); z-index:2; filter:brightness(1.12); }
  .mzBoard .mzT.ok { box-shadow:inset 0 0 0 1px rgba(243,198,80,.55); cursor:default; }
  .mzBoard .mzT.drag { transition:none; z-index:5; filter:brightness(1.15); box-shadow:0 8px 22px rgba(0,0,0,.6); cursor:grabbing; }
  .mzBoard .mzT.flash { animation:mzFlash .5s ease; }
  @keyframes mzFlash { 0% { filter:brightness(1.6); } 100% { filter:none; } }
  .mzBoard.solved .mzT { box-shadow:none; border-radius:0; transition:transform .35s ease, box-shadow .35s; }
  .mzBoard.solved { animation:mzWin .9s ease; }
  @keyframes mzWin { 0% { box-shadow:0 0 0 0 rgba(243,198,80,.9); } 100% { box-shadow:0 0 0 18px rgba(243,198,80,0), 0 6px 20px rgba(0,0,0,.45); } }
  .mzPeek { position:absolute; inset:0; background-repeat:no-repeat; opacity:0; pointer-events:none; transition:opacity .25s; z-index:8; border-radius:6px; }
  .mzPeek.on { opacity:1; }
  .mzBar { display:flex; gap:8px; align-items:center; }
  .mzBar .mzMoves { flex:1; font:600 15px Inter,system-ui,sans-serif; color:var(--muted); }
  .mzBar button { min-height:40px; padding:6px 12px; border-radius:10px; font-size:14px; text-transform:none; letter-spacing:0; }
  .mzHow { margin:0; font-size:13px; color:var(--muted); line-height:1.4; }
  .mzWin { padding:14px; border-radius:14px; background:#1c1610; border:1px solid rgba(217,164,65,.35); display:flex; flex-direction:column; gap:8px; }
  .mzWin h3 { margin:0; font:700 22px var(--old); color:var(--accent); }
  .mzWin p { margin:0; font-size:14px; line-height:1.4; }
  .mzWin .mzSrc { font-size:12px; color:var(--muted); }
  .mzWin .mzSrc a { color:var(--muted); }
  .mzWin .mzActs { display:flex; flex-direction:column; gap:8px; margin-top:4px; }
  .mzWin .mzActs button, .mzWin .mzActs a { min-height:44px; display:flex; align-items:center; justify-content:center; padding:8px 12px; border-radius:10px; font-size:15px; text-transform:none; letter-spacing:0; text-decoration:none; }
  .mzWin .mzActs a { border:1px solid var(--line); color:var(--text); }
  html[data-theme="light"] .mzWin { background:#f7f5f5; border-color:rgba(182,22,44,.3); }
  html[data-theme="light"] .mzThumb { background:#eee; }
  html[data-theme="light"] .mzLv button.on, html[data-theme="light"] .mzLv button.on small, html[data-theme="light"] .mzThumb .mzOk { color:#fff; }
  @media (prefers-reduced-motion: reduce) { .mzBoard .mzT, .mzBoard.solved, .mzPeek { transition:none !important; animation:none !important; } }
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- список мозаик (вверху вкладки «Квесты») ---------- */
  function renderList(box) {
    const ms = list();
    if (!ms.length) return;
    const d = done(), n = ms.filter(m => d[m.id]).length;
    const sec = document.createElement('section'); sec.className = 'mzSec';
    const h = document.createElement('h3'); h.textContent = '🧩 ' + M('Мозаики');
    const p = document.createElement('p'); p.textContent = M('Соберите старое фото из кусочков — дома или в крепости. Потом найдите это место вживую.');
    const pr = document.createElement('div'); pr.className = 'mzProg';
    pr.textContent = n === ms.length ? M('Все мозаики собраны!') : M('Собрано {n} из {m}', { n, m: ms.length });
    const row = document.createElement('div'); row.className = 'mzRow';
    const now = read(NOW_KEY, null);
    for (const m of ms) {
      const sp = spotById(m.id), b = best(m.id);
      const t = document.createElement('button'); t.type = 'button'; t.className = 'mzThumb' + (b ? '' : ' locked');
      t.setAttribute('aria-label', sp.title);
      const img = document.createElement('img'); img.src = sp.thumb || sp.src; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
      t.append(img);
      if (!b) { const q = document.createElement('span'); q.className = 'mzQ'; q.innerHTML = '<i></i>'.repeat(9); t.append(q); }
      else { const ok = document.createElement('span'); ok.className = 'mzOk'; ok.textContent = '✓ ' + b; t.append(ok); }
      if (now && now.id === m.id && !b) t.style.outline = '2px solid var(--accent)';
      t.onclick = () => open(m.id);
      row.append(t);
    }
    sec.append(h, p, pr, row);
    box.append(sec);
  }

  function open(id) {
    if (typeof track === 'function') track('quest', 'mz:' + id);
    if (game && (game.solved || game.m.id !== id)) game = null; // из списка — новая игра (недособранная продолжится из памяти)
    navPush(); openQuest = 'mz:' + id; renderQuests(); $('list').scrollTop = 0;
  }

  /* ---------- игра ---------- */
  let game = null; // { m, sp, k, order, moves, sec, t0, sel, img }
  let ro = null;

  function derange(n) {
    // перестановка, в которой ни один кусочек не стоит на своём месте
    for (;;) {
      const a = [...Array(n).keys()];
      for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
      if (a.every((v, i) => v !== i)) return a;
    }
  }
  function save() {
    if (!game || game.solved) return;
    write(NOW_KEY, { id: game.m.id, k: game.k, order: game.order, moves: game.moves, sec: elapsed() });
  }
  const elapsed = () => game ? game.sec + Math.round((Date.now() - game.t0) / 1000) : 0;

  function start(m, k, fresh) {
    const now = read(NOW_KEY, null);
    const resume = !fresh && now && now.id === m.id && now.k === k && Array.isArray(now.order) && now.order.length === k * k;
    game = { m, sp: spotById(m.id), k, order: resume ? now.order : derange(k * k), moves: resume ? now.moves : 0, sec: resume ? now.sec || 0 : 0, t0: Date.now(), sel: -1, solved: false };
    save();
  }

  function render(box, id) {
    const m = list().find(x => x.id === id);
    if (!m) { openQuest = null; renderQuests(); return; }
    if (!game || game.m.id !== id) { const now = read(NOW_KEY, null); start(m, now && now.id === id ? now.k : (best(id) ? Math.min(5, Math.round(Math.sqrt(best(id))) + 1) : 3)); }
    const sp = game.sp, g = game;
    save(); // память = то, что на экране
    const live = () => game === g && board.isConnected; // старый экран (после смены сложности) ничего не трогает
    const back = document.createElement('button'); back.className = 'qback'; back.textContent = M('← Все квесты'); back.onclick = () => navBack();
    const head = document.createElement('div'); head.className = 'mzHead';
    head.innerHTML = '<h2></h2><p></p>';
    head.querySelector('h2').textContent = '🧩 ' + sp.title;
    head.querySelector('p').textContent = [window.yearT ? yearT(sp.year) : sp.year, sp.group ? T(sp.group) : ''].filter(Boolean).join(' · ');
    const lv = document.createElement('div'); lv.className = 'mzLv';
    const names = { 3: 'Легко', 4: 'Средне', 5: 'Трудно' };
    for (const k of LEVELS) {
      const b = document.createElement('button'); b.type = 'button'; b.className = k === game.k ? 'on' : '';
      b.innerHTML = '<span></span><small></small>';
      b.firstChild.textContent = M(names[k]) + ((done()[id] || {})[k * k] ? ' ✓' : '');
      b.lastChild.textContent = M('{n} кусочков', { n: k * k });
      b.onclick = () => { if (k === game.k && !game.solved) return; start(m, k, true); renderQuests(); };
      lv.append(b);
    }
    const board = document.createElement('div'); board.className = 'mzBoard';
    const bar = document.createElement('div'); bar.className = 'mzBar';
    const mv = document.createElement('span'); mv.className = 'mzMoves';
    const peek = document.createElement('button'); peek.type = 'button'; peek.textContent = M('👁 Подсмотреть');
    const mix = document.createElement('button'); mix.type = 'button'; mix.textContent = M('↻ Перемешать');
    bar.append(mv, peek, mix);
    const how = document.createElement('p'); how.className = 'mzHow';
    how.textContent = M('Нажмите на два кусочка — они поменяются местами. Или перетащите пальцем. Кусочек на своём месте светится и больше не двигается.');
    const win = document.createElement('div');
    box.append(back, head, lv, board, bar, how, win);

    const img = new Image(); img.decoding = 'async'; img.src = sp.src;
    const N = game.k * game.k, tiles = [];
    let W = 0, H = 0, tw = 0, th = 0, iw = 0, ih = 0, sx = 0, sy = 0, sc = 1;
    const showMoves = () => { mv.textContent = M('Ходов: {n}', { n: game.moves }); };
    showMoves();
    const pv = document.createElement('div'); pv.className = 'mzPeek'; board.append(pv);
    for (let t = 0; t < N; t++) { const el = document.createElement('div'); el.className = 'mzT'; el.dataset.t = t; tiles.push(el); board.append(el); }
    function place(el, pos) { el.style.transform = `translate(${(pos % game.k) * tw}px, ${Math.floor(pos / game.k) * th}px)`; }
    function paint() {
      if (!live()) return;
      for (let pos = 0; pos < N; pos++) {
        const t = game.order[pos], el = tiles[t];
        place(el, pos);
        el.classList.toggle('ok', t === pos);
        el.classList.toggle('sel', pos === game.sel);
      }
    }
    function layout() {
      if (!img.naturalWidth || !live()) return;
      const [cl, ct, cr, cb] = m.crop || [0, 0, 0, 0];
      iw = img.naturalWidth; ih = img.naturalHeight;
      const cw = iw * (1 - cl - cr), chh = ih * (1 - ct - cb);
      const maxW = Math.min(box.clientWidth || 360, 620), maxH = Math.max(240, Math.min(window.innerHeight * 0.58, 640));
      sc = Math.min(maxW / cw, maxH / chh);
      // плитки — в целых пикселях, без щелей
      tw = Math.floor(cw * sc / game.k); th = Math.floor(chh * sc / game.k);
      W = tw * game.k; H = th * game.k;
      sc = Math.max(W / cw, H / chh);
      sx = iw * cl * sc; sy = ih * ct * sc;
      board.style.width = W + 'px'; board.style.height = H + 'px';
      const bg = `url("${sp.src}")`, bs = `${Math.round(iw * sc)}px ${Math.round(ih * sc)}px`;
      for (let t = 0; t < N; t++) {
        const el = tiles[t];
        el.style.width = tw + 'px'; el.style.height = th + 'px';
        el.style.backgroundImage = bg; el.style.backgroundSize = bs;
        el.style.backgroundPosition = `${-Math.round(sx + (t % game.k) * tw)}px ${-Math.round(sy + Math.floor(t / game.k) * th)}px`;
      }
      pv.style.backgroundImage = bg; pv.style.backgroundSize = bs; pv.style.backgroundPosition = `${-Math.round(sx)}px ${-Math.round(sy)}px`;
      paint();
    }
    img.onload = layout;
    if (img.complete) layout();
    if (ro) ro.disconnect();
    let lastW = 0;
    ro = new ResizeObserver(() => { if (!board.isConnected) { ro.disconnect(); return; } if (box.clientWidth !== lastW) { lastW = box.clientWidth; layout(); } });
    ro.observe(box);

    function swap(a, b) {
      if (a === b || !live() || game.solved) return;
      [game.order[a], game.order[b]] = [game.order[b], game.order[a]];
      game.moves++; game.sel = -1; showMoves();
      paint();
      for (const p of [a, b]) if (game.order[p] === p) { const el = tiles[p]; el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); if (navigator.vibrate) try { navigator.vibrate(15); } catch { /* нет */ } }
      if (game.order.every((t, i) => t === i)) finish(); else save();
    }
    // Нажатия и перетаскивание пальцем (один обработчик для мыши и касания)
    let drag = null;
    const posAt = (x, y) => { const r = board.getBoundingClientRect(); const c = Math.floor((x - r.left) / tw), rr = Math.floor((y - r.top) / th); return c < 0 || rr < 0 || c >= game.k || rr >= game.k ? -1 : rr * game.k + c; };
    board.addEventListener('pointerdown', e => {
      if (!live() || game.solved || !tw) return;
      const pos = posAt(e.clientX, e.clientY);
      if (pos < 0 || game.order[pos] === pos) return;
      drag = { pos, x: e.clientX, y: e.clientY, moved: false, id: e.pointerId };
      try { board.setPointerCapture(e.pointerId); } catch { /* старый браузер */ }
    });
    board.addEventListener('pointermove', e => {
      if (!drag || e.pointerId !== drag.id || !live()) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) < 8) return;
      drag.moved = true;
      const el = tiles[game.order[drag.pos]];
      el.classList.add('drag');
      el.style.transform = `translate(${(drag.pos % game.k) * tw + dx}px, ${Math.floor(drag.pos / game.k) * th + dy}px)`;
    });
    const up = e => {
      if (!drag || e.pointerId !== drag.id) return;
      if (!live()) { drag = null; return; }
      const d = drag; drag = null;
      tiles[game.order[d.pos]].classList.remove('drag');
      if (d.moved) {
        const to = posAt(e.clientX, e.clientY);
        if (to >= 0 && to !== d.pos && game.order[to] !== to) swap(d.pos, to); else paint();
        return;
      }
      if (game.sel < 0) { game.sel = d.pos; paint(); }
      else if (game.sel === d.pos) { game.sel = -1; paint(); }
      else swap(game.sel, d.pos);
    };
    board.addEventListener('pointerup', up);
    board.addEventListener('pointercancel', e => { if (drag && e.pointerId === drag.id && live()) { tiles[game.order[drag.pos]].classList.remove('drag'); drag = null; paint(); } });

    let peekT = null;
    peek.onclick = () => { pv.classList.add('on'); clearTimeout(peekT); peekT = setTimeout(() => pv.classList.remove('on'), 1800); };
    mix.onclick = () => { start(m, game.k, true); renderQuests(); };

    function finish() {
      game.solved = true; game.sel = -1;
      const secs = elapsed(), key = game.k * game.k;
      const d = done(), rec = d[id] || {}, first = !Object.keys(rec).length;
      if (!rec[key] || game.moves < rec[key]) rec[key] = game.moves;
      d[id] = rec; write(DONE_KEY, d); write(NOW_KEY, null);
      if (typeof track === 'function') track('quest', `mz:${id}:${key}:done`);
      board.classList.add('solved'); bar.hidden = true; how.hidden = true;
      showWin(secs, first);
    }
    function showWin(secs) {
      win.className = 'mzWin';
      const key = game.k * game.k, rec = done()[id] || {};
      const h = document.createElement('h3'); h.textContent = M('🧩 Собрано!');
      const p1 = document.createElement('p'); p1.textContent = M('{n} ходов · {t}', { n: game.moves, t: fmtT(secs) }) + (rec[key] < game.moves ? ' · ' + M('Лучший результат: {n} ходов', { n: rec[key] }) : '');
      const p2 = document.createElement('p'); p2.textContent = [sp.title, window.yearT ? yearT(sp.year) : sp.year].filter(Boolean).join(', ') + (sp.hint ? '. ' + sp.hint : '');
      const src = document.createElement('p'); src.className = 'mzSrc'; src.textContent = sp.credit || '';
      if (sp.source && /^https:\/\//.test(sp.source)) { const a = document.createElement('a'); a.href = sp.source; a.target = '_blank'; a.rel = 'noopener'; a.textContent = ' ↗'; src.append(a); }
      const acts = document.createElement('div'); acts.className = 'mzActs';
      const where = document.createElement('p'); where.textContent = M('Где это: {g}', { g: T(sp.group) });
      const cam = document.createElement('button'); cam.type = 'button'; cam.textContent = M('📷 Снять «тогда и сейчас» на месте');
      cam.onclick = () => openSpot(sp);
      acts.append(cam);
      const c = typeof coordsOf === 'function' ? coordsOf(sp) : null;
      if (c) { const a = document.createElement('a'); a.href = `https://www.google.com/maps?q=${c.lat},${c.lng}`; a.target = '_blank'; a.rel = 'noopener'; a.textContent = M('🗺 На карте'); acts.append(a); }
      if (sp.group && typeof openObj === 'function') { const g = document.createElement('button'); g.type = 'button'; g.textContent = M('🖼 Все снимки этого места'); g.onclick = () => openObj(sp.group); acts.append(g); }
      if (game.k < 5) { const hard = document.createElement('button'); hard.type = 'button'; hard.textContent = M('Собрать сложнее: {n} кусочков', { n: (game.k + 1) ** 2 }); hard.onclick = () => { start(m, game.k + 1, true); renderQuests(); }; acts.append(hard); }
      const ms = list(), i = ms.findIndex(x => x.id === id), nx = ms.slice(i + 1).concat(ms.slice(0, i)).find(x => !done()[x.id]) || ms[(i + 1) % ms.length];
      if (nx && nx.id !== id) { const nb = document.createElement('button'); nb.type = 'button'; nb.className = 'main'; nb.textContent = M('Следующая мозаика →'); nb.onclick = () => { game = null; openQuest = 'mz:' + nx.id; renderQuests(); $('list').scrollTop = 0; }; acts.prepend(nb); }
      win.append(h, p1, p2, src, where, acts);
      setTimeout(() => win.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 400);
    }
    if (game.solved) { board.classList.add('solved'); bar.hidden = true; how.hidden = true; showWin(elapsed()); }
  }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') save(); });

  /* ---------- значки для паспорта ---------- */
  function badges() {
    const ms = list(); if (!ms.length) return [];
    const d = done(), n = ms.filter(m => d[m.id]).length, hard = ms.filter(m => (d[m.id] || {})[25]).length;
    return [
      { icon: '🧩', name: M('Мозаика: {n}', { n: Math.min(5, ms.length) }), have: Math.min(n, 5), need: Math.min(5, ms.length), how: M('Соберите мозаики из старых фото (любая сложность).') },
      { icon: '🏅', name: M('Мастер мозаик'), have: hard, need: ms.length, how: M('Соберите все мозаики на «Трудно» (25 кусочков).') }
    ];
  }
  window.MZ = { renderList, render, open, badges, isOpen: q => typeof q === 'string' && q.startsWith('mz:') };
})();
