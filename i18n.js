/* Языки приложения: ru (исходный), lv, en — полностью; lt, et, pl, de, fr, it, es, zh — интерфейс (i18n-more.js),
   а подписи снимков, история и квесты для них берутся из английского. Ключ перевода — русский текст.
   Язык: выбранный вручную (список языков) → иначе язык телефона → иначе английский.
   Смена языка перезагружает страницу: всё рисуется заново уже на новом языке. */
(function () {
  const LANGS = ['ru', 'lv', 'en', 'lt', 'et', 'pl', 'de', 'fr', 'it', 'es', 'zh'];
  const KEY = 'krepost.lang';
  let lang = null;
  try { lang = JSON.parse(localStorage.getItem(KEY)); } catch { /* нет хранилища */ }
  if (!LANGS.includes(lang)) {
    lang = 'en';
    for (const l of (navigator.languages || [navigator.language || ''])) {
      const c = String(l).slice(0, 2).toLowerCase();
      if (LANGS.includes(c)) { lang = c; break; }
    }
  }
  const ALL = window.I18N || {};
  let D = null;
  if (lang === 'lv' || lang === 'en') D = ALL[lang] || null;
  else if (lang !== 'ru' && ALL.en) {
    const own = (window.I18N_UI || {})[lang] || {};
    D = Object.assign({}, ALL.en, { ui: Object.assign({}, ALL.en.ui, own) });
  }
  const norm = s => String(s).replace(/\s+/g, ' ').trim();

  /* T('русский текст') → перевод; пробелы по краям сохраняются. Нет перевода — остаётся русский. */
  function T(s) {
    if (!D || s == null) return s;
    const str = String(s), k = norm(str);
    const v = D.ui[k];
    if (v == null) return s;
    const lead = str.match(/^\s*/)[0], trail = str.match(/\s*$/)[0];
    return lead + v + trail;
  }
  /* Tf('Уже {n} снимков', { n: 5 }) — с подстановкой. */
  function Tf(s, vars) {
    return T(s).replace(/\{(\w+)\}/g, (m, k) => (vars && k in vars ? vars[k] : m));
  }
  function title(ru) {
    if (!D || !ru) return ru;
    const k = norm(ru);
    if (D.titles[k] != null) return D.titles[k];
    if (D.ui[k] != null) return D.ui[k]; // «Николаевские ворота» и т. п. — как названия групп
    for (const [re, tpl] of D.patterns) {
      const m = k.match(new RegExp(re));
      if (m) return tpl.replace(/\{(\d)\}/g, (_, i) => m[+i + 1]);
    }
    return ru;
  }

  /* Годы: «1940-е» → «1940. gadi» / «1940s», «ок. 1910» → «ap. 1910» / «c. 1910». */
  const APPROX = { lv: 'ap. ', en: 'c. ', lt: 'apie ', et: 'u ', pl: 'ok. ', de: 'ca. ', fr: 'vers ', it: 'ca. ', es: 'c. ', zh: '约 ' };
  const DECADE = { lv: d => d + '. gadi', en: d => d + 's', lt: d => d + '-ieji', et: d => d + '. aastad', pl: d => 'lata ' + d + '.',
    de: d => d + 'er', fr: d => 'années ' + d, it: d => 'anni ' + d, es: d => 'años ' + d, zh: d => d + ' 年代' };
  function yearT(y) {
    if (!D) return y;
    const t = T(y); if (t !== y) return t;
    let v = String(y);
    v = v.replace(/^ок\. /, APPROX[lang] || 'c. ');
    v = v.replace(/(\d{4})-е/g, (m, d) => (DECADE[lang] || DECADE.en)(d));
    return v;
  }
  /* Данные: подписи снимков, квесты, исторические справки. Группы (s.group) остаются ключами на русском. */
  if (D) {
    for (const s of (window.SPOTS_DATA || [])) {
      s.title = title(s.title);
      if (s.hint) s.hint = D.hints[norm(s.hint)] || s.hint;
      if (s.credit) s.credit = T(s.credit);
      if (s.year) s.year = yearT(s.year);
    }
    for (const q of (window.QUESTS_DATA || [])) {
      const t = D.quests && D.quests[q.id];
      if (!t) continue;
      q.title = t.title || q.title; q.desc = t.desc || q.desc; q.level = t.level || q.level;
      q.steps.forEach((st, i) => { if (t.steps && t.steps[i]) st.task = t.steps[i]; });
    }
    if (D.history) window.HISTORY_DATA = D.history;
  }

  /* Перевод готовой разметки страницы: текст и подсказки (placeholder, aria-label, title, alt). */
  function translateDom(root) {
    if (!D) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: n => (/^(SCRIPT|STYLE|TEXTAREA)$/.test(n.parentNode.nodeName) || !n.nodeValue.trim())
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    const nodes = [];
    while (w.nextNode()) nodes.push(w.currentNode);
    for (const n of nodes) { const v = T(n.nodeValue); if (v !== n.nodeValue) n.nodeValue = v; }
    for (const el of root.querySelectorAll('[placeholder],[aria-label],[title],[alt]')) {
      for (const a of ['placeholder', 'aria-label', 'title', 'alt']) {
        if (el.hasAttribute(a)) { const v = T(el.getAttribute(a)); if (v !== el.getAttribute(a)) el.setAttribute(a, v); }
      }
    }
  }
  function setLang(l) {
    if (!LANGS.includes(l)) return;
    try { localStorage.setItem(KEY, JSON.stringify(l)); } catch { /* нет хранилища */ }
    location.reload();
  }

  window.LANG = lang;
  window.LOCALE = { ru: 'ru-RU', lv: 'lv-LV', en: 'en-GB', lt: 'lt-LT', et: 'et-EE', pl: 'pl-PL', de: 'de-DE', fr: 'fr-FR', it: 'it-IT', es: 'es-ES', zh: 'zh-CN' }[lang];
  window.LANGS = LANGS;
  window.yearT = yearT; window.T = T; window.Tf = Tf; window.translateDom = translateDom; window.setLang = setLang;
  document.documentElement.lang = lang;
  if (D) document.title = T(document.title);
})();
