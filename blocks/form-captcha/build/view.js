import*as e from"@wordpress/interactivity";var t={d:(e,c)=>{for(var o in c)t.o(c,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:c[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const c=(o={getContext:()=>e.getContext,getElement:()=>e.getElement,store:()=>e.store},r={},t.d(r,o),r);var o,r;(0,c.store)("prc-block/form-captcha",{callbacks:{onDisplayCaptcha:()=>{const e=(0,c.getContext)(),{targetNamespace:t}=e,o=(0,c.getContext)(t);if(!0===o.captchaHidden)return;const{ref:r}=(0,c.getElement)(),a=r.querySelector(".wp-block-prc-block-form-captcha__captcha");if(!a)return;const{turnstile:n}=window;n.ready((()=>{n.render(a,{sitekey:"0x4AAAAAAAPM0JJJz5nbcTZZ",callback:e=>{console.log(`Challenge Success ${e}`),o.captchaToken=e}})}))}}});
//# sourceMappingURL=view.js.map