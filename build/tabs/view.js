import*as t from"@wordpress/interactivity";var e={d:(t,a)=>{for(var r in a)e.o(a,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:a[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const a=(r={getContext:()=>t.getContext,getElement:()=>t.getElement,store:()=>t.store},n={},e.d(n,r),n);var r,n;function o(t){return!isNaN(parseFloat(t))}const{state:s,actions:l}=(0,a.store)("prc-block/tabs",{state:{get roleAttribute(){var t;const e=(0,a.getElement)(),r=(null!==(t=e?.attributes?.class)&&void 0!==t?t:"").split(" "),n=new Map([["wp-block-tabs__list","tablist"],["wp-block-tabs__list-item","presentation"],["wp-block-tabs__tab-label","tab"],["wp-block-tab","tabpanel"]]);for(const t of r){const e=n.get(t);if(e)return e}return!1},get isActiveTab(){const t=(0,a.getContext)(),{attributes:e}=(0,a.getElement)(),r=e?.["data-tab-index"],n=o(r)?parseInt(r,10):0;return console.log("isActiveTab...",t,e,r,n),t.activeTabIndex===n},get tabindexLabelAttribute(){return!s.isActiveTab&&"-1"},get tabindexPanelAttribute(){return!!s.isActiveTab&&"0"}},actions:{handleTabKeyDown:t=>{const{key:e,target:r}=t;if(!r)return;const{ref:n}=(0,a.getElement)(),o=n?.closest(".wp-block-tabs"),s=Array.from(o?.querySelectorAll(".wp-block-tabs__tab-label")||[]),i=s.indexOf(r);let b=i;switch(e){case"ArrowRight":t.stopPropagation(),t.preventDefault(),b=(i+1)%s.length,l.setActiveTab(b),s[b]?.focus();break;case"ArrowLeft":t.stopPropagation(),t.preventDefault(),b=(i-1+s.length)%s.length,l.setActiveTab(b),s[b]?.focus()}},handleTabClick:t=>{t.preventDefault();const e=t.target?.getAttribute("data-tab-index"),a=o(e)?parseInt(e,10):null;null!==a&&l.setActiveTab(a)},setActiveTab:t=>{(0,a.getContext)().activeTabIndex=t}}});
//# sourceMappingURL=view.js.map