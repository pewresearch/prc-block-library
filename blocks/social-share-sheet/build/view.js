import*as t from"@wordpress/interactivity";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const o=(r={getContext:()=>t.getContext,store:()=>t.store},a={},e.d(a,r),a);var r,a;(0,o.store)("prc-block/social-share-sheet",{state:{},actions:{onClick:t=>{t.preventDefault();const e=(0,o.getContext)();window.navigator.share({title:e?.title,text:e?.text,url:e?.url})}}});
//# sourceMappingURL=view.js.map