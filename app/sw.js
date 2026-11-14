const CACHE='rafiq-app-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||r.mode!=='navigate'||new URL(r.url).origin!==self.location.origin)return;
  e.respondWith((async()=>{try{const res=await fetch(r);if(res&&res.ok){const c=await caches.open(CACHE);await c.put('./',res.clone());}return res;}
    catch(err){const c=await caches.open(CACHE),hit=await c.match('./');return hit||new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><body dir="rtl" style="font-family:system-ui,sans-serif;padding:32px;color:#1C2A24"><h1 style="color:#08402C">رفيق</h1><p>لا يوجد اتصال بالإنترنت. أعد المحاولة عند عودة الاتصال.</p></body>',{headers:{'Content-Type':'text/html; charset=utf-8'}});}})());});
