// Работа без интернета.
// • Страница и скрипты: сначала сеть, при её отсутствии — сохранённая копия (новые версии появляются сразу).
// • Снимки (папка photos): сразу из памяти телефона, а в фоне — проверка, не обновился ли файл.
//   Хранятся в отдельном складе, который не стирается при обновлении приложения.
// • Шрифты (лежат на самом сайте) — тоже сохраняются.
// • Плитки карты OpenStreetMap: сохраняются те, что уже открывались (не больше ~1500 штук).
const CACHE = 'krepost-v134';
const PHOTO_CACHE = 'krepost-photos';
const TILE_CACHE = 'krepost-tiles';
const TILE_MAX = 1500;
const FONT_CACHE = 'krepost-fonts';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  // Старые склады страницы (krepost-v1 … прошлые версии) больше не нужны
  for (const k of await caches.keys()) if (/^krepost-v\d+$/.test(k) && k !== CACHE) await caches.delete(k);
  await self.clients.claim();
})()));

function staleWhileRevalidate(e, cacheName, after, opaqueOk) {
  const req = e.request;
  e.respondWith(caches.open(cacheName).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then(res => {
      if (res.ok || (opaqueOk && res.type === 'opaque')) { c.put(req, res.clone()).then(after || (() => {})).catch(() => {}); }
      return res;
    }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    return (await net) || Response.error();
  }));
}
async function trimTilesNow() {
  const c = await caches.open(TILE_CACHE);
  const keys = await c.keys();
  if (keys.length > TILE_MAX) for (const k of keys.slice(0, keys.length - TILE_MAX + 200)) await c.delete(k);
}
// Чистка плиток — один раз на пачку: карта грузит десятки плиток подряд, список склада перебираем
// не после каждой, а через 5 секунд после последней.
// (Если телефон усыпит фон раньше, чистка просто случится при следующей пачке.)
let trimTimer = null;
function trimTiles() {
  if (trimTimer) clearTimeout(trimTimer);
  trimTimer = setTimeout(() => { trimTimer = null; trimTilesNow().catch(() => {}); }, 5000);
}

// Сохранённая копия: сначала из склада этой версии, потом из любого (например, из «Скачать для прогулки»)
async function cached(req) {
  return (await caches.open(CACHE).then(c => c.match(req, { ignoreSearch: true }))) ||
    (await caches.match(req, { ignoreSearch: true }));
}
// Нечего показать: для перехода по странице — сама страница, для остального — понятный ответ,
// а не index.html вместо скрипта или картинки
async function fallback(req) {
  if (req.mode === 'navigate') {
    const page = await caches.match('./index.html', { ignoreSearch: true });
    if (page) return page;
  }
  return new Response('Нет сети, а этот файл ещё не сохранён. Откройте «Скачать для прогулки», когда появится интернет.',
    { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname === 'tile.openstreetmap.org') { staleWhileRevalidate(e, TILE_CACHE, trimTiles); return; }
  if (url.origin !== location.origin) return;
  // Шрифты лежат на самом сайте: сохранить отдельно, чтобы не скачивать заново при каждом обновлении приложения
  if (url.pathname.includes('/vendor/fonts/')) { staleWhileRevalidate(e, FONT_CACHE); return; }
  if (url.pathname.includes('/photos/')) { staleWhileRevalidate(e, PHOTO_CACHE); return; }
  e.respondWith((async () => {
    let res = null;
    try {
      // no-cache: всегда спрашиваем сервер, не изменился ли файл (иначе новая версия ждёт до 10 минут)
      res = await fetch(req, { cache: 'no-cache' });
      if (res.ok) {
        const copy = res.clone();
        e.waitUntil(caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {}));
        return res;
      }
    } catch (err) { /* нет сети */ }
    // Нет сети или временная ошибка сервера (5xx): отдаём сохранённую копию, если она есть
    const hit = await cached(req);
    if (hit) return hit;
    if (res && res.status < 500) return res; // 404 и т. п. — честный ответ сервера
    return fallback(req);
  })());
});
