import*as t from"@wordpress/interactivity";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};const o=(n={getContext:()=>t.getContext,getElement:()=>t.getElement,store:()=>t.store},i={},e.d(i,n),i);var n,i;const{state:c,actions:s}=(0,o.store)("prc-block/navigation-mega-menu",{state:{get isActive(){const t=(0,o.getContext)(),{id:e}=t;return c[e]?.isActive||!1},get width(){return(0,o.getContext)().width},get left(){return(0,o.getContext)().left},get top(){return(0,o.getContext)().top}},actions:{closeAll:()=>{Object.keys(c).forEach((t=>{c[t].isActive=!1}))},toggleMenuOnClick(){const{ref:t}=(0,o.getElement)();s.toggleMenu()},closeMenuOnClick(){s.closeMenu("click"),s.closeMenu("focus")},toggleMenu(){const t=(0,o.getContext)(),{id:e}=t;c[e].isActive=!c[e].isActive},openMenu(){const t=(0,o.getContext)(),{id:e}=t;c[e].isActive=!0},closeMenu(){const t=(0,o.getContext)(),{id:e}=t;c[e].isActive=!1},setMenuPositions(){const{ref:t}=(0,o.getElement)(),e=t.querySelector(".wp-block-prc-block-navigation-mega-menu__container");if(!e)return;if(!e.closest(".wp-block-navigation"))return;const n=(0,o.getContext)(),{width:i,left:c,top:s}=function(t,e){if(!t&&!e)return;const o=e.offsetHeight,n=t.closest("body").offsetWidth,i=t.getBoundingClientRect();return{width:`${n}px`,left:`-${i.width,i?.left}px`,top:o-1+"px"}}(t,t.closest(".wp-block-navigation"));n.width=i,n.left=c,n.top=s}},callbacks:{onInit(){const t=(0,o.getContext)(),{ref:e}=(0,o.getElement)(),n=e.querySelector(".wp-block-prc-block-navigation-mega-menu__container");t.menuRef=n,s.setMenuPositions();const i=n.querySelector(".wp-block-group.has-background");if(i){const e=i.className.match(/(has-.*-background-color|has-background|has-text-color|has-.*-color)/g);t.activeClassnames=e}},onResize(){s.setMenuPositions()},getToggleClassname(){const t=["wp-block-navigation-item__content","wp-block-prc-block-navigation-mega-menu__toggle"],e=(0,o.getContext)(),{activeClassnames:n}=e;return c.isActive?t.join(" ")+n.join(" "):t.join(" ")},onWindowClickCloseMegaMenu:t=>{const e=(0,o.getContext)(),{id:n}=e;if(!n)return;if(!c[n]?.isActive)return;const i=(0,o.getElement)(),{ref:s}=i;s.contains(t.target)&&!t.target.classList.contains("wp-block-prc-block-popup-modal__outer")||s.querySelector(".wp-block-prc-block-navigation-mega-menu__container").innerHTML.includes(t.target.innerHTML)||!0!==c[n].isActive||(c[n].isActive=!1)},onESCKey:t=>{const e=(0,o.getContext)(),{id:n}=e;n&&"Escape"===t.key&&!0===c[n].isActive&&(t.preventDefault(),c[n].isActive=!1)}}});
//# sourceMappingURL=view.js.map