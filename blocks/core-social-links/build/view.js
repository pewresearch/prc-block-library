(()=>{"use strict";var t={n:e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return t.d(o,{a:o}),o},d:(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const e=window.wp.domReady;var o=t.n(e);const r=window.wp.url,{innerWidth:l,innerHeight:n,open:i}=window;function a(t){let e=t.getAttribute("data-share-description");e||(e=document.querySelector('meta[property="og:description"]')?.getAttribute("content")||null);let o=t.getAttribute("data-share-title");o||(o=document.querySelector('meta[property="og:title"]')?.getAttribute("content")||null);let r=t.getAttribute("data-share-url");return r||(r=document.querySelector('meta[property="og:url"]')?.getAttribute("content")||null),console.log({url:r,description:e,title:o}),{url:r,description:e,title:o}}o()((()=>(document.querySelectorAll(".wp-block-social-link.wp-social-link-facebook, .share-tools .social-link.facebook").forEach((t=>{const{url:e}=a(t);let o=null;o=t.parentElement.classList.contains("share-tools")?t:t.querySelector("a"),o&&o.addEventListener("click",(t=>{t.preventDefault();const o=(0,r.addQueryArgs)("https://www.facebook.com/sharer/sharer.php",{u:e});i(o,"fbShareWindow",`height=450, width=550, top=${n/2-275}, left=${l/2-225}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`),t.stopPropagation()}))})),document.querySelectorAll(".wp-block-social-link.wp-social-link-linkedin, .share-tools .social-link.linkedin").forEach((t=>{const{url:e,title:o,description:s}=a(t);let c=null;c=t.parentElement.classList.contains("share-tools")?t:t.querySelector("a"),c&&c.addEventListener("click",(t=>{t.preventDefault();const a=(0,r.addQueryArgs)("https://www.linkedin.com/shareArticle",{summary:s,url:e,title:o,source:"PewResearch"});i(a,"linkedinShareWindow",`height=450, width=550, top=${n/2-275}, left=${l/2-225}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`),t.stopPropagation()}))})),document.querySelectorAll(".wp-block-social-link.wp-social-link-x, .share-tools .social-link.x").forEach((t=>{const{url:e,description:o}=a(t);let s=null;s=t.parentElement.classList.contains("share-tools")?t:t.querySelector("a"),s&&s.addEventListener("click",(t=>{t.preventDefault();const a=(0,r.addQueryArgs)("https://twitter.com/intent/tweet",{text:o,url:e});i(a,"xShareWindow",`height=450, width=550, top=${n/2-275}, left=${l/2-225}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`),t.stopPropagation()}))})),void document.querySelectorAll(".wp-block-social-link.wp-social-link-threads, .share-tools .social-link.threads").forEach((t=>{const{url:e,description:o}=a(t);let s=null;s=t.parentElement.classList.contains("share-tools")?t:t.querySelector("a"),s&&s.addEventListener("click",(t=>{t.preventDefault();const a=(0,r.addQueryArgs)("https://www.threads.net/intent/post",{text:`${o} ${e}`});i(a,"threadsShareWindow",`height=450, width=550, top=${n/2-275}, left=${l/2-225}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`),t.stopPropagation()}))})))))})();
//# sourceMappingURL=view.js.map