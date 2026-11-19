const CACHE='rafiq-app-v1';
self.addEventListener('message',e=>{if(e.data&&e.data.rafiq==='login-saved?'&&e.ports&&e.ports[0])e.ports[0].postMessage({loginSaved:true});});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method==='POST'&&u.origin===self.location.origin&&u.pathname.endsWith('/login-saved'))e.respondWith(new Response('<!doctype html><meta charset=utf-8><title>ok</title>',{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}}));});
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||r.mode!=='navigate'||new URL(r.url).origin!==self.location.origin)return;
  e.respondWith((async()=>{let res;try{res=await fetch(r);}catch(err){res=null;}
    if(res){if(res.ok){try{const c=await caches.open(CACHE);await c.put('./',res.clone());}catch(ignore){}}return res;}
    let hit=null;try{hit=await (await caches.open(CACHE)).match('./');}catch(ignore){}return hit||new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><body dir="rtl" style="font-family:system-ui,sans-serif;padding:32px;color:#1C2A24"><h1 style="color:#08402C">رفيق</h1><p>لا يوجد اتصال بالإنترنت. أعد المحاولة عند عودة الاتصال.</p></body>',{headers:{'Content-Type':'text/html; charset=utf-8'}});})());});
