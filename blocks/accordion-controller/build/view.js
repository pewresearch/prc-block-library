(()=>{"use strict";var c={n:e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return c.d(o,{a:o}),o},d:(e,o)=>{for(var t in o)c.o(o,t)&&!c.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:o[t]})},o:(c,e)=>Object.prototype.hasOwnProperty.call(c,e)};const e=window.wp.domReady;c.n(e)()((()=>{document.querySelectorAll(".wp-block-prc-block-accordion-controller").forEach((c=>{const e=c.querySelectorAll(".wp-block-prc-block-accordion");e.forEach((c=>{const o=c.querySelector(".wp-block-prc-block-accordion--title"),t=c.querySelector(".wp-block-prc-block-accordion--content");o.addEventListener("click",(()=>{if(c.classList.contains("is-active"))return c.classList.remove("is-active"),void t.classList.remove("is-open");e.forEach((c=>{c.classList.contains("is-active")&&(c.classList.remove("is-active"),c.querySelector(".wp-block-prc-block-accordion--content").classList.remove("is-open"))})),c.classList.toggle("is-active"),t.classList.toggle("is-open")}))}))}))}))})();
//# sourceMappingURL=view.js.map