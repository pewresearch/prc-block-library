import*as t from"@wordpress/interactivity";var e={d:(t,a)=>{for(var o in a)e.o(a,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:a[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const a=(o={getContext:()=>t.getContext,getElement:()=>t.getElement,store:()=>t.store},n={},e.d(n,o),n);var o,n;function r(t){return!isNaN(parseFloat(t))}const{state:s,actions:l}=(0,a.store)("prc-block/tabs",{state:{get roleAttribute(){var t;const e=(0,a.getElement)(),o=(null!==(t=e?.attributes?.class)&&void 0!==t?t:"").split(" "),n=new Map([["wp-block-tabs__list","tablist"],["wp-block-tabs__list-item","presentation"],["wp-block-tabs__tab-label","tab"],["wp-block-tab","tabpanel"]]);for(const t of o){const e=n.get(t);if(e)return e}return!1},get isActiveTab(){const t=(0,a.getContext)(),{attributes:e}=(0,a.getElement)(),o=e?.["data-tab-index"],n=r(o)?parseInt(o,10):0;return console.log("isActiveTab...",t,e,o,n),t.activeTabIndex===n},get tabindexLabelAttribute(){return!s.isActiveTab&&"-1"},get tabindexPanelAttribute(){return!!s.isActiveTab&&"0"}},actions:{handleTabKeyDown:t=>{const{key:e,target:o}=t;if(!o)return;const{ref:n}=(0,a.getElement)(),r=n?.closest(".wp-block-tabs"),s=Array.from(r?.querySelectorAll(".wp-block-tabs__tab-label")||[]),c=s.indexOf(o);let b=c;switch(e){case"ArrowRight":t.stopPropagation(),t.preventDefault(),b=(c+1)%s.length,l.setActiveTab(b),s[b]?.focus();break;case"ArrowLeft":t.stopPropagation(),t.preventDefault(),b=(c-1+s.length)%s.length,l.setActiveTab(b),s[b]?.focus()}},handleTabClick:t=>{t.preventDefault();const e=t.target?.getAttribute("data-tab-index"),a=r(e)?parseInt(e,10):null;null!==a&&l.setActiveTab(a)},setActiveTab:t=>{(0,a.getContext)().activeTabIndex=t}},callbacks:{focusActiveTabIndex:()=>{const t=(0,a.getContext)(),{activeTabIndexQueryVar:e}=t;if(!1!==e){console.log("focusActiveTabIndex...",t);const a=document.querySelector(`a.prc-block-tabs__tab-label[data-tab-hash="${e}"]`);a&&a.scrollIntoView({behavior:"smooth"})}}}});
//# sourceMappingURL=view.js.map