import*as t from"@wordpress/interactivity";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const o=(n={getContext:()=>t.getContext,getElement:()=>t.getElement,store:()=>t.store},i={},e.d(i,n),i);var n,i;(0,o.store)("prc-block/taxonomy-list-link",{actions:{onClick:()=>{const t=(0,o.getContext)(),{ref:e}=(0,o.getElement)(),{id:n}=e.parentElement;if(t.isActive=!t.isActive,n){const{href:t}=window.location,e=window.wp.url.addQueryArgs(t,{taxonomyLink:n});window.history.pushState({id:n},"",e)}}},callbacks:{onInit:()=>{const t=(0,o.getContext)(),{ref:e}=(0,o.getElement)(),{id:n}=e;!0===t.isActive&&n&&setTimeout((()=>{document.getElementById(n).scrollIntoView({behavior:"smooth",block:"center"})}),100)}}});
//# sourceMappingURL=view.js.map