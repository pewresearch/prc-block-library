(()=>{"use strict";var e={n:o=>{var t=o&&o.__esModule?()=>o.default:()=>o;return e.d(t,{a:t}),t},d:(o,t)=>{for(var n in t)e.o(t,n)&&!e.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:t[n]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o)};const o=window.wp.url,t=window.wp.domReady;e.n(t)()((()=>{const e=document.querySelectorAll(".wp-block-prc-block-taxonomy-menu-link.is-style-sub-expand, .wp-block-prc-block-taxonomy-menu-link.is-style-sub-tree");e.forEach((e=>{if(!e.querySelector(".wp-block-prc-block-taxonomy-menu-link--sub-menu"))return;const t=e.querySelectorAll(".wp-block-prc-block-taxonomy-menu-link--toggle");t&&t.forEach((t=>{t.addEventListener("click",(t=>{t.preventDefault(),e.classList.toggle("is-active");const{id:n}=e,{href:r}=window.location,c=(0,o.addQueryArgs)(r,{taxonomyLink:n});window.history.pushState({id:n},"",c)}))}))}));const t=(0,o.getQueryArg)(window.location.href,"taxonomyLink");if(t&&e.length){const e=document.getElementById(t);e&&(e.classList.add("is-active"),setTimeout((()=>{e.scrollIntoView({behavior:"smooth",block:"center"})}),100))}}))})();
//# sourceMappingURL=view.js.map