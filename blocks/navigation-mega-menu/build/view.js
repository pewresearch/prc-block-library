import*as e from"@wordpress/interactivity";var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const n=(u={getContext:()=>e.getContext,getElement:()=>e.getElement,store:()=>e.store},a={},t.d(a,u),a),{state:o,actions:c}=(0,n.store)("prc-block/navigation-mega-menu",{state:{get isMenuOpen(){return Object.values(o.menuOpenedBy).filter(Boolean).length>0},get menuOpenedBy(){return(0,n.getContext)().menuOpenedBy}},actions:{toggleMenuOnClick(){const e=(0,n.getContext)(),{ref:t}=(0,n.getElement)();window.document.activeElement!==t&&t.focus(),o.menuOpenedBy.click||o.menuOpenedBy.focus?(c.closeMenu("click"),c.closeMenu("focus")):(e.previousFocus=t,c.openMenu("click"))},closeMenuOnClick(){c.closeMenu("click"),c.closeMenu("focus")},handleMenuKeydown(e){o.menuOpenedBy.click&&"Escape"===e?.key&&(c.closeMenu("click"),c.closeMenu("focus"))},handleMenuFocusout(e){const t=(0,n.getContext)(),o=t.megaMenu?.querySelector(".wp-block-prc-block-navigation-mega-menu__container");(null===e.relatedTarget||!o?.contains(e.relatedTarget)&&e.target!==window.document.activeElement)&&(c.closeMenu("click"),c.closeMenu("focus"))},openMenu(e="click"){o.menuOpenedBy[e]=!0},closeMenu(e="click"){const t=(0,n.getContext)();o.menuOpenedBy[e]=!1,o.isMenuOpen||(t.megaMenu?.contains(window.document.activeElement)&&t.previousFocus?.focus(),t.previousFocus=null,t.megaMenu=null)}},callbacks:{initMenu(){const e=(0,n.getContext)(),{ref:t}=(0,n.getElement)();o.isMenuOpen&&(e.megaMenu=t)}}}),l=window.getComputedStyle(document.body),i=l.getPropertyValue("--wp--style--root--padding-left").trim(),s=l.getPropertyValue("--wp--style--root--padding-left").trim();var u,a;function r(){const e=d(i),t=d(s);document.querySelectorAll(".wp-block-prc-block-navigation-mega-menu__container").forEach((n=>{const o=n.closest(".wp-block-navigation");if(!o)return;let c="left";o.classList.contains("items-justified-center")||o.classList.contains("items-justified-space-between")?c="center":o.classList.contains("items-justified-right")&&(c="right"),n.classList.contains("menu-justified-center")?c="center":(n.classList.contains("menu-justified-right")||n.classList.contains("menu-justified-left"))&&(c="right"),console.log(c);const l=window.innerWidth-t-e,i=n.offsetWidth,s=n.getBoundingClientRect(),u=o.getBoundingClientRect(),a=u.left<=e?e-u.left:u.left-e,r=(l-i)/2;"center"===c?i>l?(n.style.width=`${l}px`,n.style.left=`-${a}px`):s.left>0&&r>=s.left?n.style.left="":a>=r?(n.style.width="",n.style.left=`-${a-r}px`):(n.style.width="",n.style.left=r-a+"px"):"left"!==c&&"right"!==c||(i>l?(n.style.width=`${l}px`,n.style.left=`${a}px`):(n.style.width="",s.left<=0?n.style.left=`${a}px`:n.style.left=""))}))}function d(e){const t=document.createElement("div");t.style.width=e,document.body.appendChild(t);const n=window.getComputedStyle(t).width;return document.body.removeChild(t),parseFloat(n)}window.addEventListener("resize",r),"complete"===document.readyState?r():window.addEventListener("load",r);