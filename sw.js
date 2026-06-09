const CACHE='dinero-v4';
const ASSETS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).catch(()=>{}))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>k!==CACHE&&caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET')return; const req=e.request;
 if(req.mode==='navigate'){ e.respondWith(fetch(req).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',cp));return r;}).catch(()=>caches.match('./index.html'))); return; }
 e.respondWith(caches.match(req).then(r=>r||fetch(req).then(resp=>{const cp=resp.clone();caches.open(CACHE).then(c=>c.put(req,cp));return resp;}).catch(()=>r))); });
