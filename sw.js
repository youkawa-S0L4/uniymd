/* Service worker – Vân Nguyệt Các. Đổi V khi muốn ép xóa cache cũ. */
const V = 'vnc-v3';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './loading.gif'];
const CDN = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'unpkg.com'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(V)
      .then(c => Promise.allSettled(SHELL.map(u => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function navFetch(r) {
  const c = await caches.open(V);
  try {
    const n = await Promise.race([fetch(r), new Promise((_, j) => setTimeout(j, 4000))]);
    if (n && n.ok) c.put('./index.html', n.clone());
    return n;
  } catch (_) {
    return (await c.match('./index.html')) || (await c.match('./')) || Response.error();
  }
}

async function cacheFirst(r) {
  const c = await caches.open(V);
  const m = await c.match(r);
  if (m) return m;
  const n = await fetch(r);
  if (n && (n.ok || n.type === 'opaque')) c.put(r, n.clone());
  return n;
}

async function swr(r) {
  const c = await caches.open(V);
  const m = await c.match(r);
  const p = fetch(r).then(n => { if (n && n.ok) c.put(r, n.clone()); return n; }).catch(() => m || Response.error());
  return m || p;
}

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (r.mode === 'navigate') { e.respondWith(navFetch(r)); return; }
  if (CDN.includes(u.hostname)) { e.respondWith(cacheFirst(r)); return; }
  if (u.origin === location.origin) { e.respondWith(swr(r)); }
  /* translate.googleapis.com và các nguồn khác: để mạng xử lý, không cache */
});
