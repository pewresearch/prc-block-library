import*as t from"@wordpress/interactivity";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const o=(c={getContext:()=>t.getContext,getElement:()=>t.getElement,store:()=>t.store},l={},e.d(l,c),l),{actions:n,state:r}=(0,o.store)("prc-block/table-of-contents",{state:{},actions:{getInternalChaptersList:()=>{const{ref:t}=(0,o.getElement)();return t.querySelector(".wp-block-prc-block-table-of-contents__list .is-top-level")?t.querySelector(".wp-block-prc-block-table-of-contents__list"):t.querySelector(".wp-block-prc-block-table-of-contents__list .wp-block-prc-block-table-of-contents__list")},initSmoothScrollClickHandler:()=>{n.getInternalChaptersList().querySelectorAll("a").forEach((t=>{t.addEventListener("click",(e=>{const o=t.getAttribute("href");if(0===o.indexOf("#")){e.preventDefault();const t=document.getElementById(o.replace("#",""));t&&(t.scrollIntoView({behavior:"smooth"},!0),window.history.pushState(null,null,o))}}))}))},onDropdownClick:t=>{t.preventDefault();const e=(0,o.getContext)();e.isDropdownOpen=!e.isDropdownOpen}},callbacks:{onInit:()=>{const t=(0,o.getContext)(),{ref:e}=(0,o.getElement)();n.initSmoothScrollClickHandler();const{showCurrentChapter:c}=t;if(!0===c){const{postId:t}=r,e=r.chapters.find((e=>e.id===t))||{},o=e?.internal_chapters||[];r.enableWatchForChapterScroll=!0,r.chaptersWatchList=o}},onResize:()=>{const t=(0,o.getContext)(),{autoDropdownEnabled:e,autoDropdownWidth:n}=t;if(!e)return;const{ref:r}=(0,o.getElement)(),c=r.offsetWidth;t.isDropdown=!!(c<n&&e)},isListItemActive:()=>{const t=(0,o.getElement)(),{ref:e}=t,n=e?.getAttribute("data-ref-value")?.replace("#","");return n===r.currentChapter},watchForChapterScroll:()=>{if(!r.enableWatchForChapterScroll)return;const{ref:t}=(0,o.getElement)(),e=r.chaptersWatchList;let{currentChapter:n}=r,c=!1;const l=e.findIndex((e=>e.id===t?.id));l<e.length-1&&(c=e[l+1]);const i=t.getBoundingClientRect().top,s=document.getElementById(c?.id)?.getBoundingClientRect().top;i<0&&(s>0||!c)&&(n=t?.id),n!==r.currentChapter&&(r.currentChapter=n)},onWindowClick:t=>{const e=(0,o.getContext)(),{ref:n}=(0,o.getElement)();!n.contains(t.target)&&e.isDropdown&&(e.isDropdownOpen=!1)}}});var c,l;
//# sourceMappingURL=view.js.map