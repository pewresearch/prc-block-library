import*as e from"@wordpress/interactivity";var t={d:(e,o)=>{for(var n in o)t.o(o,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const o=(i={getContext:()=>e.getContext,getElement:()=>e.getElement,store:()=>e.store,withScope:()=>e.withScope},s={},t.d(s,i),s),{VideoPressIframeApi:n}=window;var i,s;const{actions:r,state:c}=(0,o.store)("prc-block/dialog",{state:{get id(){const e=(0,o.getContext)();return e?.id},get type(){const{id:e}=(0,o.getContext)();return c[e].type},get activationTimerDuration(){const{id:e}=(0,o.getContext)();return c[e].activationTimerDuration},get animationDuration(){const{id:e}=(0,o.getContext)();return c[e].animationDuration},get dialogElement(){const{id:e}=(0,o.getContext)();return document.getElementById(c[e].dialogElemId)},get widths(){const{id:e}=(0,o.getContext)();return c[e].widths},get isOpen(){const{id:e}=(0,o.getContext)();return c[e].isOpen},get isClosing(){const{id:e}=(0,o.getContext)();return c[e].isClosing},get isMobile(){return"mobile"===c.currentDevice},get enableDeepLink(){const{id:e}=(0,o.getContext)();return c[e].enableDeepLink},get isVideo(){const{id:e}=(0,o.getContext)();return!!c[e].videoPressAPI},get videoPressAPI(){const{id:e}=(0,o.getContext)();return c[e].videoPressAPI}},actions:{closeAll:(e=null)=>{Object.keys(c).forEach((t=>{"object"==typeof c[t]&&c[t].hasOwnProperty("isOpen")&&c[t].hasOwnProperty("type")&&(null!==e&&e!==c[t].type||(c[t].isOpen=!1,r.pause(t)))}))},onClickOpen:e=>{e.preventDefault();const{id:t}=c;r.open(t)},onClickClose:e=>{e.preventDefault();const{id:t}=c;r.close(t)},open:(e=!1)=>{let t=e;t||(t=c.id),t?(c[t].isOpen=!0,c[t].closingModal=!1,c.videoPressAPI&&setTimeout((0,o.withScope)((()=>{r.play(t)})),c[t].animationDuration)):console.error("No id found to open dialog.")},close:(e=!1)=>{let t=e;t||(t=c.id),t?(c[t].isOpen=!1,c[t].videoPressAPI&&r.pause(t)):console.error("No id found to close dialog.")},play:e=>{e&&c[e].videoPressAPI&&c[e].videoPressAPI.controls.play()},pause:e=>{e&&c[e].videoPressAPI&&c[e].videoPressAPI.controls.pause()}},callbacks:{getStyle:()=>{const{widths:e,currentDevice:t,animationDuration:o}=c;return e[t]?`--min-width: ${e[t]}px; --animation-duration: ${o}ms;`:""},onInitIdentifyDialogElem:()=>{const{id:e}=c,{ref:t}=(0,o.getElement)(),n=t.querySelector(".wp-block-prc-block-dialog-element"),i=n?.getAttribute("id");c[e].dialogElemId=i},onESCKey:e=>{const{id:t,isOpen:o}=c;t&&"Escape"===e.key&&!0===o&&(e.preventDefault(),r.close(t))},onOpen:()=>{const{dialogElement:e,isOpen:t,id:o,type:n,enableDeepLink:i}=c;o&&e&&t&&(i&&function(e){const t=new URL(window.location.href);t.searchParams.set("dialogId",e),window.history.replaceState({},"",t)}(o),c[o].isOpen=!0,"modal"===n?e.showModal():e.show())},onClose:()=>{const{dialogElement:e,isOpen:t,id:n,animationDuration:i}=c;n&&e&&(t||(c[n].isClosing=!0,setTimeout((0,o.withScope)((()=>{e.close(),function(){const e=new URL(window.location.href);e.searchParams.delete("dialogId"),window.history.replaceState({},"",e)}();const t=new CustomEvent("prc-block-dialog-closed",{detail:{id:n}});document.dispatchEvent(t),c[n].isClosing=!1,c[n].isOpen=!1})),i)))},onResize:()=>{const e=document.documentElement.clientWidth;c.currentDevice=e<=600?"mobile":e>600&&e<=782?"tablet":"desktop"},onBackdropClick:e=>{const{ref:t}=(0,o.getElement)(),n=t.getBoundingClientRect();if(e.clientX>=n.left&&e.clientX<=n.right&&e.clientY>=n.top&&e.clientY<=n.bottom)return;if(!0!==c.isOpen)return;const{id:i}=c;r.close(i)},onAutoActivation:()=>{const{id:e,activationTimerDuration:t}=c;(e||t||-1===t)&&1<=t&&setTimeout((0,o.withScope)((()=>{r.closeAll("modal"),r.open(e)})),t)},onVideoPressInit:()=>{const{ref:e}=(0,o.getElement)(),t=e.querySelector(".jetpack-videopress-player");if(!t)return;const i=t.querySelector("iframe");if(!i)return;if(!n)return;const{id:s}=c;c[s].videoPressAPI=n(i,(()=>{api.customize.set({shareButton:!1})}))}}});
//# sourceMappingURL=view.js.map