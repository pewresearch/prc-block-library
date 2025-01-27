(()=>{"use strict";var n,t={4688:(n,t,e)=>{const i=window.prcFunctions;function o(n,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}var r="(prefers-reduced-motion: reduce)";function c(n){n.length=0}function u(n,t,e){return Array.prototype.slice.call(n,t,e)}function s(n){return n.bind.apply(n,[null].concat(u(arguments,1)))}var a=setTimeout,l=function(){};function f(n){return requestAnimationFrame(n)}function d(n,t){return typeof t===n}function p(n){return!y(n)&&d("object",n)}var v=Array.isArray,h=s(d,"function"),g=s(d,"string"),m=s(d,"undefined");function y(n){return null===n}function b(n){try{return n instanceof(n.ownerDocument.defaultView||window).HTMLElement}catch(n){return!1}}function w(n){return v(n)?n:[n]}function k(n,t){w(n).forEach(t)}function E(n,t){return n.indexOf(t)>-1}function S(n,t){return n.push.apply(n,w(t)),n}function x(n,t,e){n&&k(t,(function(t){t&&n.classList[e?"add":"remove"](t)}))}function C(n,t){x(n,g(t)?t.split(" "):t,!0)}function _(n,t){k(t,n.appendChild.bind(n))}function B(n,t){k(n,(function(n){var e=(t||n).parentNode;e&&e.insertBefore(n,t)}))}function L(n,t){return b(n)&&(n.msMatchesSelector||n.matches).call(n,t)}function P(n,t){var e=n?u(n.children):[];return t?e.filter((function(n){return L(n,t)})):e}function A(n,t){return t?P(n,t)[0]:n.firstElementChild}var O=Object.keys;function M(n,t,e){return n&&(e?O(n).reverse():O(n)).forEach((function(e){"__proto__"!==e&&t(n[e],e)})),n}function D(n){return u(arguments,1).forEach((function(t){M(t,(function(e,i){n[i]=t[i]}))})),n}function z(n){return u(arguments,1).forEach((function(t){M(t,(function(t,e){v(t)?n[e]=t.slice():p(t)?n[e]=z({},p(n[e])?n[e]:{},t):n[e]=t}))})),n}function I(n,t){k(t||O(n),(function(t){delete n[t]}))}function T(n,t){k(n,(function(n){k(t,(function(t){n&&n.removeAttribute(t)}))}))}function N(n,t,e){p(t)?M(t,(function(t,e){N(n,e,t)})):k(n,(function(n){y(e)||""===e?T(n,t):n.setAttribute(t,String(e))}))}function j(n,t,e){var i=document.createElement(n);return t&&(g(t)?C(i,t):N(i,t)),e&&_(e,i),i}function F(n,t,e){if(m(e))return getComputedStyle(n)[t];y(e)||(n.style[t]=""+e)}function R(n,t){F(n,"display",t)}function W(n){n.setActive&&n.setActive()||n.focus({preventScroll:!0})}function X(n,t){return n.getAttribute(t)}function G(n,t){return n&&n.classList.contains(t)}function H(n){return n.getBoundingClientRect()}function q(n){k(n,(function(n){n&&n.parentNode&&n.parentNode.removeChild(n)}))}function V(n){return A((new DOMParser).parseFromString(n,"text/html").body)}function K(n,t){n.preventDefault(),t&&(n.stopPropagation(),n.stopImmediatePropagation())}function Y(n,t){return n&&n.querySelector(t)}function U(n,t){return t?u(n.querySelectorAll(t)):[]}function J(n,t){x(n,t,!1)}function Q(n){return n.timeStamp}function Z(n){return g(n)?n:n?n+"px":""}var $="splide",nn="data-"+$;function tn(n,t){if(!n)throw new Error("["+$+"] "+(t||""))}var en=Math.min,on=Math.max,rn=Math.floor,cn=Math.ceil,un=Math.abs;function sn(n,t,e){return un(n-t)<e}function an(n,t,e,i){var o=en(t,e),r=on(t,e);return i?o<n&&n<r:o<=n&&n<=r}function ln(n,t,e){var i=en(t,e),o=on(t,e);return en(on(i,n),o)}function fn(n){return+(n>0)-+(n<0)}function dn(n,t){return k(t,(function(t){n=n.replace("%s",""+t)})),n}function pn(n){return n<10?"0"+n:""+n}var vn={};function hn(){var n=[];function t(n,t,e){k(n,(function(n){n&&k(t,(function(t){t.split(" ").forEach((function(t){var i=t.split(".");e(n,i[0],i[1])}))}))}))}return{bind:function(e,i,o,r){t(e,i,(function(t,e,i){var c="addEventListener"in t,u=c?t.removeEventListener.bind(t,e,o,r):t.removeListener.bind(t,o);c?t.addEventListener(e,o,r):t.addListener(o),n.push([t,e,i,o,u])}))},unbind:function(e,i,o){t(e,i,(function(t,e,i){n=n.filter((function(n){return!!(n[0]!==t||n[1]!==e||n[2]!==i||o&&n[3]!==o)||(n[4](),!1)}))}))},dispatch:function(n,t,e){var i,o=!0;return"function"==typeof CustomEvent?i=new CustomEvent(t,{bubbles:o,detail:e}):(i=document.createEvent("CustomEvent")).initCustomEvent(t,o,!1,e),n.dispatchEvent(i),i},destroy:function(){n.forEach((function(n){n[4]()})),c(n)}}}var gn="mounted",mn="ready",yn="move",bn="moved",wn="click",kn="refresh",En="updated",Sn="resize",xn="resized",Cn="scroll",Bn="scrolled",Ln="destroy",Pn="navigation:mounted",An="autoplay:play",On="autoplay:pause",Mn="lazyload:loaded",Dn="ei";function zn(n){var t=n?n.event.bus:document.createDocumentFragment(),e=hn();return n&&n.event.on(Ln,e.destroy),D(e,{bus:t,on:function(n,i){e.bind(t,w(n).join(" "),(function(n){i.apply(i,v(n.detail)?n.detail:[])}))},off:s(e.unbind,t),emit:function(n){e.dispatch(t,n,u(arguments,1))}})}function In(n,t,e,i){var o,r,c=Date.now,u=0,s=!0,a=0;function l(){if(!s){if(u=n?en((c()-o)/n,1):1,e&&e(u),u>=1&&(t(),o=c(),i&&++a>=i))return d();r=f(l)}}function d(){s=!0}function p(){r&&cancelAnimationFrame(r),u=0,r=0,s=!0}return{start:function(t){t||p(),o=c()-(t?u*n:0),s=!1,r=f(l)},rewind:function(){o=c(),u=0,e&&e(u)},pause:d,cancel:p,set:function(t){n=t},isPaused:function(){return s}}}var Tn="Arrow",Nn=Tn+"Left",jn=Tn+"Right",Fn=Tn+"Up",Rn=Tn+"Down",Wn="ttb",Xn={width:["height"],left:["top","right"],right:["bottom","left"],x:["y"],X:["Y"],Y:["X"],ArrowLeft:[Fn,jn],ArrowRight:[Rn,Nn]};var Gn="role",Hn="tabindex",qn="aria-",Vn=qn+"controls",Kn=qn+"current",Yn=qn+"selected",Un=qn+"label",Jn=qn+"labelledby",Qn=qn+"hidden",Zn=qn+"orientation",$n=qn+"roledescription",nt=qn+"live",tt=qn+"busy",et=qn+"atomic",it=[Gn,Hn,"disabled",Vn,Kn,Un,Jn,Qn,Zn,$n],ot=$+"__",rt="is-",ct=$,ut=ot+"track",st=ot+"list",at=ot+"slide",lt=at+"--clone",ft=at+"__container",dt=ot+"arrows",pt=ot+"arrow",vt=pt+"--prev",ht=pt+"--next",gt=ot+"pagination",mt=gt+"__page",yt=ot+"progress__bar",bt=ot+"toggle",wt=ot+"sr",kt=rt+"initialized",Et=rt+"active",St=rt+"prev",xt=rt+"next",Ct=rt+"visible",_t=rt+"loading",Bt=rt+"focus-in",Lt=rt+"overflow",Pt=[Et,Ct,St,xt,_t,Bt,Lt],At={slide:at,clone:lt,arrows:dt,arrow:pt,prev:vt,next:ht,pagination:gt,page:mt,spinner:ot+"spinner"},Ot="touchstart mousedown",Mt="touchmove mousemove",Dt="touchend touchcancel mouseup click",zt="slide",It="loop",Tt="fade";var Nt=nn+"-interval",jt={passive:!1,capture:!0},Ft={Spacebar:" ",Right:jn,Left:Nn,Up:Fn,Down:Rn};function Rt(n){return n=g(n)?n:n.key,Ft[n]||n}var Wt="keydown",Xt=nn+"-lazy",Gt=Xt+"-srcset",Ht="["+Xt+"], ["+Gt+"]",qt=[" ","Enter"],Vt=Object.freeze({__proto__:null,Media:function(n,t,e){var i=n.state,o=e.breakpoints||{},c=e.reducedMotion||{},u=hn(),s=[];function a(n){n&&u.destroy()}function l(n,t){var e=matchMedia(t);u.bind(e,"change",f),s.push([n,e])}function f(){var t=i.is(7),o=e.direction,r=s.reduce((function(n,t){return z(n,t[1].matches?t[0]:{})}),{});I(e),d(r),e.destroy?n.destroy("completely"===e.destroy):t?(a(!0),n.mount()):o!==e.direction&&n.refresh()}function d(t,o,r){z(e,t),o&&z(Object.getPrototypeOf(e),t),!r&&i.is(1)||n.emit(En,e)}return{setup:function(){var n="min"===e.mediaQuery;O(o).sort((function(t,e){return n?+t-+e:+e-+t})).forEach((function(t){l(o[t],"("+(n?"min":"max")+"-width:"+t+"px)")})),l(c,r),f()},destroy:a,reduce:function(n){matchMedia(r).matches&&(n?z(e,c):I(e,O(c)))},set:d}},Direction:function(n,t,e){return{resolve:function(n,t,i){var o="rtl"!==(i=i||e.direction)||t?i===Wn?0:-1:1;return Xn[n]&&Xn[n][o]||n.replace(/width|left|right/i,(function(n,t){var e=Xn[n.toLowerCase()][o]||n;return t>0?e.charAt(0).toUpperCase()+e.slice(1):e}))},orient:function(n){return n*("rtl"===e.direction?1:-1)}}},Elements:function(n,t,e){var i,o,r,u=zn(n),s=u.on,a=u.bind,l=n.root,f=e.i18n,d={},p=[],v=[],g=[];function m(){var n,t,r;i=w("."+ut),o=A(i,"."+st),tn(i&&o,"A track/list element is missing."),S(p,P(o,"."+at+":not(."+lt+")")),M({arrows:dt,pagination:gt,prev:vt,next:ht,bar:yt,toggle:bt},(function(n,t){d[t]=w("."+n)})),D(d,{root:l,track:i,list:o,slides:p}),t=l.id||""+(n=$)+pn(vn[n]=(vn[n]||0)+1),r=e.role,l.id=t,i.id=i.id||t+"-track",o.id=o.id||t+"-list",!X(l,Gn)&&"SECTION"!==l.tagName&&r&&N(l,Gn,r),N(l,$n,f.carousel),N(o,Gn,"presentation"),b()}function y(n){var t=it.concat("style");c(p),J(l,v),J(i,g),T([i,o],t),T(l,n?t:["style",$n])}function b(){J(l,v),J(i,g),v=k(ct),g=k(ut),C(l,v),C(i,g),N(l,Un,e.label),N(l,Jn,e.labelledby)}function w(n){var t=Y(l,n);return t&&function(n,t){if(h(n.closest))return n.closest(t);for(var e=n;e&&1===e.nodeType&&!L(e,t);)e=e.parentElement;return e}(t,"."+ct)===l?t:void 0}function k(n){return[n+"--"+e.type,n+"--"+e.direction,e.drag&&n+"--draggable",e.isNavigation&&n+"--nav",n===ct&&Et]}return D(d,{setup:m,mount:function(){s(kn,y),s(kn,m),s(En,b),a(document,Ot+" keydown",(function(n){r="keydown"===n.type}),{capture:!0}),a(l,"focusin",(function(){x(l,Bt,!!r)}))},destroy:y})},Slides:function(n,t,e){var i=zn(n),o=i.on,r=i.emit,u=i.bind,a=t.Elements,l=a.slides,f=a.list,d=[];function p(){l.forEach((function(n,t){m(n,t,-1)}))}function v(){S((function(n){n.destroy()})),c(d)}function m(t,e,i){var o=function(n,t,e,i){var o,r=zn(n),c=r.on,u=r.emit,a=r.bind,l=n.Components,f=n.root,d=n.options,p=d.isNavigation,v=d.updateOnMove,h=d.i18n,g=d.pagination,m=d.slideFocus,y=l.Direction.resolve,b=X(i,"style"),w=X(i,Un),k=e>-1,E=A(i,"."+ft);function S(){var o=n.splides.map((function(n){var e=n.splide.Components.Slides.getAt(t);return e?e.slide.id:""})).join(" ");N(i,Un,dn(h.slideX,(k?e:t)+1)),N(i,Vn,o),N(i,Gn,m?"button":""),m&&T(i,$n)}function C(){o||_()}function _(){if(!o){var e=n.index;(r=B())!==G(i,Et)&&(x(i,Et,r),N(i,Kn,p&&r||""),u(r?"active":"inactive",L)),function(){var t=function(){if(n.is(Tt))return B();var t=H(l.Elements.track),e=H(i),o=y("left",!0),r=y("right",!0);return rn(t[o])<=cn(e[o])&&rn(e[r])<=cn(t[r])}(),e=!t&&(!B()||k);if(n.state.is([4,5])||N(i,Qn,e||""),N(U(i,d.focusableNodes||""),Hn,e?-1:""),m&&N(i,Hn,e?-1:0),t!==G(i,Ct)&&(x(i,Ct,t),u(t?"visible":"hidden",L)),!t&&document.activeElement===i){var o=l.Slides.getAt(n.index);o&&W(o.slide)}}(),x(i,St,t===e-1),x(i,xt,t===e+1)}var r}function B(){var i=n.index;return i===t||d.cloneStatus&&i===e}var L={index:t,slideIndex:e,slide:i,container:E,isClone:k,mount:function(){k||(i.id=f.id+"-slide"+pn(t+1),N(i,Gn,g?"tabpanel":"group"),N(i,$n,h.slide),N(i,Un,w||dn(h.slideLabel,[t+1,n.length]))),a(i,"click",s(u,wn,L)),a(i,"keydown",s(u,"sk",L)),c([bn,"sh",Bn],_),c(Pn,S),v&&c(yn,C)},destroy:function(){o=!0,r.destroy(),J(i,Pt),T(i,it),N(i,"style",b),N(i,Un,w||"")},update:_,style:function(n,t,e){F(e&&E||i,n,t)},isWithin:function(e,i){var o=un(e-t);return k||!d.rewind&&!n.is(It)||(o=en(o,n.length-o)),o<=i}};return L}(n,e,i,t);o.mount(),d.push(o),d.sort((function(n,t){return n.index-t.index}))}function y(n){return n?P((function(n){return!n.isClone})):d}function S(n,t){y(t).forEach(n)}function P(n){return d.filter(h(n)?n:function(t){return g(n)?L(t.slide,n):E(w(n),t.index)})}return{mount:function(){p(),o(kn,v),o(kn,p)},destroy:v,update:function(){S((function(n){n.update()}))},register:m,get:y,getIn:function(n){var i=t.Controller,o=i.toIndex(n),r=i.hasFocus()?1:e.perPage;return P((function(n){return an(n.index,o,o+r-1)}))},getAt:function(n){return P(n)[0]},add:function(n,t){k(n,(function(n){if(g(n)&&(n=V(n)),b(n)){var i=l[t];i?B(n,i):_(f,n),C(n,e.classes.slide),o=n,c=s(r,Sn),a=U(o,"img"),(d=a.length)?a.forEach((function(n){u(n,"load error",(function(){--d||c()}))})):c()}var o,c,a,d})),r(kn)},remove:function(n){q(P(n).map((function(n){return n.slide}))),r(kn)},forEach:S,filter:P,style:function(n,t,e){S((function(i){i.style(n,t,e)}))},getLength:function(n){return n?l.length:d.length},isEnough:function(){return d.length>e.perPage}}},Layout:function(n,t,e){var i,o,r,c=zn(n),u=c.on,a=c.bind,l=c.emit,f=t.Slides,d=t.Direction.resolve,v=t.Elements,h=v.root,g=v.track,m=v.list,y=f.getAt,b=f.style;function w(){i=e.direction===Wn,F(h,"maxWidth",Z(e.width)),F(g,d("paddingLeft"),E(!1)),F(g,d("paddingRight"),E(!0)),k(!0)}function k(n){var t,c=H(h);(n||o.width!==c.width||o.height!==c.height)&&(F(g,"height",(t="",i&&(tn(t=S(),"height or heightRatio is missing."),t="calc("+t+" - "+E(!1)+" - "+E(!0)+")"),t)),b(d("marginRight"),Z(e.gap)),b("width",e.autoWidth?null:Z(e.fixedWidth)||(i?"":C())),b("height",Z(e.fixedHeight)||(i?e.autoHeight?null:C():S()),!0),o=c,l(xn),r!==(r=O())&&(x(h,Lt,r),l("overflow",r)))}function E(n){var t=e.padding,i=d(n?"right":"left");return t&&Z(t[i]||(p(t)?0:t))||"0px"}function S(){return Z(e.height||H(m).width*e.heightRatio)}function C(){var n=Z(e.gap);return"calc((100%"+(n&&" + "+n)+")/"+(e.perPage||1)+(n&&" - "+n)+")"}function _(){return H(m)[d("width")]}function B(n,t){var e=y(n||0);return e?H(e.slide)[d("width")]+(t?0:A()):0}function L(n,t){var e=y(n);if(e){var i=H(e.slide)[d("right")],o=H(m)[d("left")];return un(i-o)+(t?0:A())}return 0}function P(t){return L(n.length-1)-L(0)+B(0,t)}function A(){var n=y(0);return n&&parseFloat(F(n.slide,d("marginRight")))||0}function O(){return n.is(Tt)||P(!0)>_()}return{mount:function(){var n,t;w(),a(window,"resize load",(n=s(l,Sn),t=In(0,n,null,1),function(){t.isPaused()&&t.start()})),u([En,kn],w),u(Sn,k)},resize:k,listSize:_,slideSize:B,sliderSize:P,totalSize:L,getPadding:function(n){return parseFloat(F(g,d("padding"+(n?"Right":"Left"))))||0},isOverflow:O}},Clones:function(n,t,e){var i,o=zn(n),r=o.on,u=t.Elements,s=t.Slides,a=t.Direction.resolve,l=[];function f(){r(kn,d),r([En,Sn],v),(i=h())&&(function(t){var i=s.get().slice(),o=i.length;if(o){for(;i.length<t;)S(i,i);S(i.slice(-t),i.slice(0,t)).forEach((function(r,c){var a=c<t,f=function(t,i){var o=t.cloneNode(!0);return C(o,e.classes.clone),o.id=n.root.id+"-clone"+pn(i+1),o}(r.slide,c);a?B(f,i[0].slide):_(u.list,f),S(l,f),s.register(f,c-t+(a?0:o),r.index)}))}}(i),t.Layout.resize(!0))}function d(){p(),f()}function p(){q(l),c(l),o.destroy()}function v(){var n=h();i!==n&&(i<n||!n)&&o.emit(kn)}function h(){var i=e.clones;if(n.is(It)){if(m(i)){var o=e[a("fixedWidth")]&&t.Layout.slideSize(0);i=o&&cn(H(u.track)[a("width")]/o)||e[a("autoWidth")]&&n.length||2*e.perPage}}else i=0;return i}return{mount:f,destroy:p}},Move:function(n,t,e){var i,o=zn(n),r=o.on,c=o.emit,u=n.state.set,s=t.Layout,a=s.slideSize,l=s.getPadding,f=s.totalSize,d=s.listSize,p=s.sliderSize,v=t.Direction,h=v.resolve,g=v.orient,y=t.Elements,b=y.list,w=y.track;function k(){t.Controller.isBusy()||(t.Scroll.cancel(),E(n.index),t.Slides.update())}function E(n){S(B(n,!0))}function S(e,i){if(!n.is(Tt)){var o=i?e:function(e){if(n.is(It)){var i=_(e),o=i>t.Controller.getEnd();(i<0||o)&&(e=x(e,o))}return e}(e);F(b,"transform","translate"+h("X")+"("+o+"px)"),e!==o&&c("sh")}}function x(n,t){var e=n-P(t),i=p();return n-g(i*(cn(un(e)/i)||1))*(t?1:-1)}function C(){S(L(),!0),i.cancel()}function _(n){for(var e=t.Slides.get(),i=0,o=1/0,r=0;r<e.length;r++){var c=e[r].index,u=un(B(c,!0)-n);if(!(u<=o))break;o=u,i=c}return i}function B(t,i){var o=g(f(t-1)-function(n){var t=e.focus;return"center"===t?(d()-a(n,!0))/2:+t*a(n)||0}(t));return i?function(t){return e.trimSpace&&n.is(zt)&&(t=ln(t,0,g(p(!0)-d()))),t}(o):o}function L(){var n=h("left");return H(b)[n]-H(w)[n]+g(l(!1))}function P(n){return B(n?t.Controller.getEnd():0,!!e.trimSpace)}return{mount:function(){i=t.Transition,r([gn,xn,En,kn],k)},move:function(n,t,e,o){var r,s;n!==t&&(r=n>e,s=g(x(L(),r)),r?s>=0:s<=b[h("scrollWidth")]-H(w)[h("width")])&&(C(),S(x(L(),n>e),!0)),u(4),c(yn,t,e,n),i.start(t,(function(){u(3),c(bn,t,e,n),o&&o()}))},jump:E,translate:S,shift:x,cancel:C,toIndex:_,toPosition:B,getPosition:L,getLimit:P,exceededLimit:function(n,t){t=m(t)?L():t;var e=!0!==n&&g(t)<g(P(!1)),i=!1!==n&&g(t)>g(P(!0));return e||i},reposition:k}},Controller:function(n,t,e){var i,o,r,c,u=zn(n),a=u.on,l=u.emit,f=t.Move,d=f.getPosition,p=f.getLimit,v=f.toPosition,h=t.Slides,y=h.isEnough,b=h.getLength,w=e.omitEnd,k=n.is(It),E=n.is(zt),S=s(P,!1),x=s(P,!0),C=e.start||0,_=C;function B(){o=b(!0),r=e.perMove,c=e.perPage,i=M();var n=ln(C,0,w?i:o-1);n!==C&&(C=n,f.reposition())}function L(){i!==M()&&l(Dn)}function P(n,t){var e=r||(T()?1:c),o=A(C+e*(n?-1:1),C,!(r||T()));return-1===o&&E&&!sn(d(),p(!n),1)?n?0:i:t?o:O(o)}function A(t,u,s){if(y()||T()){var a=function(t){if(E&&"move"===e.trimSpace&&t!==C)for(var i=d();i===v(t,!0)&&an(t,0,n.length-1,!e.rewind);)t<C?--t:++t;return t}(t);a!==t&&(u=t,t=a,s=!1),t<0||t>i?t=r||!an(0,t,u,!0)&&!an(i,u,t,!0)?k?s?t<0?-(o%c||c):o:t:e.rewind?t<0?i:0:-1:D(z(t)):s&&t!==u&&(t=D(z(u)+(t<u?-1:1)))}else t=-1;return t}function O(n){return k?(n+o)%o||0:n}function M(){for(var n=o-(T()||k&&r?1:c);w&&n-- >0;)if(v(o-1,!0)!==v(n,!0)){n++;break}return ln(n,0,o-1)}function D(n){return ln(T()?n:c*n,0,i)}function z(n){return T()?en(n,i):rn((n>=i?o-1:n)/c)}function I(n){n!==C&&(_=C,C=n)}function T(){return!m(e.focus)||e.isNavigation}function N(){return n.state.is([4,5])&&!!e.waitForTransition}return{mount:function(){B(),a([En,kn,Dn],B),a(xn,L)},go:function(n,t,e){if(!N()){var o=function(n){var t=C;if(g(n)){var e=n.match(/([+\-<>])(\d+)?/)||[],o=e[1],r=e[2];"+"===o||"-"===o?t=A(C+ +(""+o+(+r||1)),C):">"===o?t=r?D(+r):S(!0):"<"===o&&(t=x(!0))}else t=k?n:ln(n,0,i);return t}(n),r=O(o);r>-1&&(t||r!==C)&&(I(r),f.move(o,r,_,e))}},scroll:function(n,e,o,r){t.Scroll.scroll(n,e,o,(function(){var n=O(f.toIndex(d()));I(w?en(n,i):n),r&&r()}))},getNext:S,getPrev:x,getAdjacent:P,getEnd:M,setIndex:I,getIndex:function(n){return n?_:C},toIndex:D,toPage:z,toDest:function(n){var t=f.toIndex(n);return E?ln(t,0,i):t},hasFocus:T,isBusy:N}},Arrows:function(n,t,e){var i,o,r=zn(n),c=r.on,u=r.bind,a=r.emit,l=e.classes,f=e.i18n,d=t.Elements,p=t.Controller,v=d.arrows,h=d.track,g=v,m=d.prev,y=d.next,b={};function w(){var n;!(n=e.arrows)||m&&y||(g=v||j("div",l.arrows),m=x(!0),y=x(!1),i=!0,_(g,[m,y]),!v&&B(g,h)),m&&y&&(D(b,{prev:m,next:y}),R(g,n?"":"none"),C(g,o=dt+"--"+e.direction),n&&(c([gn,bn,kn,Bn,Dn],L),u(y,"click",s(S,">")),u(m,"click",s(S,"<")),L(),N([m,y],Vn,h.id),a("arrows:mounted",m,y))),c(En,k)}function k(){E(),w()}function E(){r.destroy(),J(g,o),i?(q(v?[m,y]:g),m=y=null):T([m,y],it)}function S(n){p.go(n,!0)}function x(n){return V('<button class="'+l.arrow+" "+(n?l.prev:l.next)+'" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" focusable="false"><path d="'+(e.arrowPath||"m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z")+'" />')}function L(){if(m&&y){var t=n.index,e=p.getPrev(),i=p.getNext(),o=e>-1&&t<e?f.last:f.prev,r=i>-1&&t>i?f.first:f.next;m.disabled=e<0,y.disabled=i<0,N(m,Un,o),N(y,Un,r),a("arrows:updated",m,y,e,i)}}return{arrows:b,mount:w,destroy:E,update:L}},Autoplay:function(n,t,e){var i,o,r=zn(n),c=r.on,u=r.bind,s=r.emit,a=In(e.interval,n.go.bind(n,">"),(function(n){var t=f.bar;t&&F(t,"width",100*n+"%"),s("autoplay:playing",n)})),l=a.isPaused,f=t.Elements,d=t.Elements,p=d.root,v=d.toggle,h=e.autoplay,g="pause"===h;function m(){l()&&t.Slides.isEnough()&&(a.start(!e.resetProgress),o=i=g=!1,w(),s(An))}function y(n){void 0===n&&(n=!0),g=!!n,w(),l()||(a.pause(),s(On))}function b(){g||(i||o?y(!1):m())}function w(){v&&(x(v,Et,!g),N(v,Un,e.i18n[g?"play":"pause"]))}function k(n){var i=t.Slides.getAt(n);a.set(i&&+X(i.slide,Nt)||e.interval)}return{mount:function(){h&&(e.pauseOnHover&&u(p,"mouseenter mouseleave",(function(n){i="mouseenter"===n.type,b()})),e.pauseOnFocus&&u(p,"focusin focusout",(function(n){o="focusin"===n.type,b()})),v&&u(v,"click",(function(){g?m():y(!0)})),c([yn,Cn,kn],a.rewind),c(yn,k),v&&N(v,Vn,f.track.id),g||m(),w())},destroy:a.cancel,play:m,pause:y,isPaused:l}},Cover:function(n,t,e){var i=zn(n).on;function o(n){t.Slides.forEach((function(t){var e=A(t.container||t.slide,"img");e&&e.src&&r(n,e,t)}))}function r(n,t,e){e.style("background",n?'center/cover no-repeat url("'+t.src+'")':"",!0),R(t,n?"none":"")}return{mount:function(){e.cover&&(i(Mn,s(r,!0)),i([gn,En,kn],s(o,!0)))},destroy:s(o,!1)}},Scroll:function(n,t,e){var i,o,r=zn(n),c=r.on,u=r.emit,a=n.state.set,l=t.Move,f=l.getPosition,d=l.getLimit,p=l.exceededLimit,v=l.translate,h=n.is(zt),g=1;function m(n,e,r,c,d){var v=f();if(w(),r&&(!h||!p())){var m=t.Layout.sliderSize(),k=fn(n)*m*rn(un(n)/m)||0;n=l.toPosition(t.Controller.toDest(n%m))+k}var E=sn(v,n,1);g=1,e=E?0:e||on(un(n-v)/1.5,800),o=c,i=In(e,y,s(b,v,n,d),1),a(5),u(Cn),i.start()}function y(){a(3),o&&o(),u(Bn)}function b(n,t,i,r){var c,u,s=f(),a=(n+(t-n)*(c=r,(u=e.easingFunc)?u(c):1-Math.pow(1-c,4))-s)*g;v(s+a),h&&!i&&p()&&(g*=.6,un(a)<10&&m(d(p(!0)),600,!1,o,!0))}function w(){i&&i.cancel()}function k(){i&&!i.isPaused()&&(w(),y())}return{mount:function(){c(yn,w),c([En,kn],k)},destroy:w,scroll:m,cancel:k}},Drag:function(n,t,e){var i,o,r,c,u,s,a,f,d=zn(n),v=d.on,h=d.emit,g=d.bind,m=d.unbind,y=n.state,b=t.Move,w=t.Scroll,k=t.Controller,E=t.Elements.track,S=t.Media.reduce,x=t.Direction,C=x.resolve,_=x.orient,B=b.getPosition,P=b.exceededLimit,A=!1;function O(){var n=e.drag;X(!n),c="free"===n}function M(n){if(s=!1,!a){var t=W(n);i=n.target,o=e.noDrag,L(i,"."+mt+", ."+pt)||o&&L(i,o)||!t&&n.button||(k.isBusy()?K(n,!0):(f=t?E:window,u=y.is([4,5]),r=null,g(f,Mt,D,jt),g(f,Dt,z,jt),b.cancel(),w.cancel(),T(n)))}var i,o}function D(t){if(y.is(6)||(y.set(6),h("drag")),t.cancelable)if(u){b.translate(i+N(t)/(A&&n.is(zt)?5:1));var o=j(t)>200,r=A!==(A=P());(o||r)&&T(t),s=!0,h("dragging"),K(t)}else(function(n){return un(N(n))>un(N(n,!0))})(t)&&(u=function(n){var t=e.dragMinThreshold,i=p(t),o=i&&t.mouse||0,r=(i?t.touch:+t)||10;return un(N(n))>(W(n)?r:o)}(t),K(t))}function z(i){y.is(6)&&(y.set(3),h("dragged")),u&&(function(i){var o=function(t){if(n.is(It)||!A){var e=j(t);if(e&&e<200)return N(t)/e}return 0}(i),r=function(n){return B()+fn(n)*en(un(n)*(e.flickPower||600),c?1/0:t.Layout.listSize()*(e.flickMaxPages||1))}(o),u=e.rewind&&e.rewindByDrag;S(!1),c?k.scroll(r,0,e.snap):n.is(Tt)?k.go(_(fn(o))<0?u?"<":"-":u?">":"+"):n.is(zt)&&A&&u?k.go(P(!0)?">":"<"):k.go(k.toDest(r),!0),S(!0)}(i),K(i)),m(f,Mt,D),m(f,Dt,z),u=!1}function I(n){!a&&s&&K(n,!0)}function T(n){r=o,o=n,i=B()}function N(n,t){return R(n,t)-R(F(n),t)}function j(n){return Q(n)-Q(F(n))}function F(n){return o===n&&r||o}function R(n,t){return(W(n)?n.changedTouches[0]:n)["page"+C(t?"Y":"X")]}function W(n){return"undefined"!=typeof TouchEvent&&n instanceof TouchEvent}function X(n){a=n}return{mount:function(){g(E,Mt,l,jt),g(E,Dt,l,jt),g(E,Ot,M,jt),g(E,"click",I,{capture:!0}),g(E,"dragstart",K),v([gn,En],O)},disable:X,isDragging:function(){return u}}},Keyboard:function(n,t,e){var i,o,r=zn(n),c=r.on,u=r.bind,s=r.unbind,l=n.root,f=t.Direction.resolve;function d(){var n=e.keyboard;n&&(i="global"===n?window:l,u(i,Wt,h))}function p(){s(i,Wt)}function v(){var n=o;o=!0,a((function(){o=n}))}function h(t){if(!o){var e=Rt(t);e===f(Nn)?n.go("<"):e===f(jn)&&n.go(">")}}return{mount:function(){d(),c(En,p),c(En,d),c(yn,v)},destroy:p,disable:function(n){o=n}}},LazyLoad:function(n,t,e){var i=zn(n),o=i.on,r=i.off,u=i.bind,a=i.emit,l="sequential"===e.lazyLoad,f=[bn,Bn],d=[];function p(){c(d),t.Slides.forEach((function(n){U(n.slide,Ht).forEach((function(t){var i=X(t,Xt),o=X(t,Gt);if(i!==t.src||o!==t.srcset){var r=e.classes.spinner,c=t.parentElement,u=A(c,"."+r)||j("span",r,c);d.push([t,n,u]),t.src||R(t,"none")}}))})),l?m():(r(f),o(f,v),v())}function v(){(d=d.filter((function(t){var i=e.perPage*((e.preloadPages||1)+1)-1;return!t[1].isWithin(n.index,i)||h(t)}))).length||r(f)}function h(n){var t=n[0];C(n[1].slide,_t),u(t,"load error",s(g,n)),N(t,"src",X(t,Xt)),N(t,"srcset",X(t,Gt)),T(t,Xt),T(t,Gt)}function g(n,t){var e=n[0],i=n[1];J(i.slide,_t),"error"!==t.type&&(q(n[2]),R(e,""),a(Mn,e,i),a(Sn)),l&&m()}function m(){d.length&&h(d.shift())}return{mount:function(){e.lazyLoad&&(p(),o(kn,p))},destroy:s(c,d),check:v}},Pagination:function(n,t,e){var i,o,r=zn(n),a=r.on,l=r.emit,f=r.bind,d=t.Slides,p=t.Elements,v=t.Controller,h=v.hasFocus,g=v.getIndex,m=v.go,y=t.Direction.resolve,b=p.pagination,w=[];function k(){i&&(q(b?u(i.children):i),J(i,o),c(w),i=null),r.destroy()}function E(n){m(">"+n,!0)}function S(n,t){var e=w.length,i=Rt(t),o=x(),r=-1;i===y(jn,!1,o)?r=++n%e:i===y(Nn,!1,o)?r=(--n+e)%e:"Home"===i?r=0:"End"===i&&(r=e-1);var c=w[r];c&&(W(c.button),m(">"+r),K(t,!0))}function x(){return e.paginationDirection||e.direction}function _(n){return w[v.toPage(n)]}function B(){var n=_(g(!0)),t=_(g());if(n){var e=n.button;J(e,Et),T(e,Yn),N(e,Hn,-1)}if(t){var o=t.button;C(o,Et),N(o,Yn,!0),N(o,Hn,"")}l("pagination:updated",{list:i,items:w},n,t)}return{items:w,mount:function t(){k(),a([En,kn,Dn],t);var r=e.pagination;b&&R(b,r?"":"none"),r&&(a([yn,Cn,Bn],B),function(){var t=n.length,r=e.classes,c=e.i18n,u=e.perPage,a=h()?v.getEnd()+1:cn(t/u);C(i=b||j("ul",r.pagination,p.track.parentElement),o=gt+"--"+x()),N(i,Gn,"tablist"),N(i,Un,c.select),N(i,Zn,x()===Wn?"vertical":"");for(var l=0;l<a;l++){var g=j("li",null,i),m=j("button",{class:r.page,type:"button"},g),y=d.getIn(l).map((function(n){return n.slide.id})),k=!h()&&u>1?c.pageX:c.slideX;f(m,"click",s(E,l)),e.paginationKeyboard&&f(m,"keydown",s(S,l)),N(g,Gn,"presentation"),N(m,Gn,"tab"),N(m,Vn,y.join(" ")),N(m,Un,dn(k,l+1)),N(m,Hn,-1),w.push({li:g,button:m,page:l})}}(),B(),l("pagination:mounted",{list:i,items:w},_(n.index)))},destroy:k,getAt:_,update:B}},Sync:function(n,t,e){var i=e.isNavigation,o=e.slideFocus,r=[];function u(){var t,e;n.splides.forEach((function(t){t.isParent||(l(n,t.splide),l(t.splide,n))})),i&&((e=(t=zn(n)).on)(wn,d),e("sk",p),e([gn,En],f),r.push(t),t.emit(Pn,n.splides))}function a(){r.forEach((function(n){n.destroy()})),c(r)}function l(n,t){var e=zn(n);e.on(yn,(function(n,e,i){t.go(t.is(It)?i:n)})),r.push(e)}function f(){N(t.Elements.list,Zn,e.direction===Wn?"vertical":"")}function d(t){n.go(t.index)}function p(n,t){E(qt,Rt(t))&&(d(n),K(t))}return{setup:s(t.Media.set,{slideFocus:m(o)?i:o},!0),mount:u,destroy:a,remount:function(){a(),u()}}},Wheel:function(n,t,e){var i=zn(n).bind,o=0;function r(i){if(i.cancelable){var r=i.deltaY,c=r<0,u=Q(i),s=e.wheelMinThreshold||0,a=e.wheelSleep||0;un(r)>s&&u-o>a&&(n.go(c?"<":">"),o=u),function(i){return!e.releaseWheel||n.state.is(4)||-1!==t.Controller.getAdjacent(i)}(c)&&K(i)}}return{mount:function(){e.wheel&&i(t.Elements.track,"wheel",r,jt)}}},Live:function(n,t,e){var i=zn(n).on,o=t.Elements.track,r=e.live&&!e.isNavigation,c=j("span",wt),u=In(90,s(a,!1));function a(n){N(o,tt,n),n?(_(o,c),u.start()):(q(c),u.cancel())}function l(n){r&&N(o,nt,n?"off":"polite")}return{mount:function(){r&&(l(!t.Autoplay.isPaused()),N(o,et,!0),c.textContent="…",i(An,s(l,!0)),i(On,s(l,!1)),i([bn,Bn],s(a,!0)))},disable:l,destroy:function(){T(o,[nt,et,tt]),q(c)}}}}),Kt={type:"slide",role:"region",speed:400,perPage:1,cloneStatus:!0,arrows:!0,pagination:!0,paginationKeyboard:!0,interval:5e3,pauseOnHover:!0,pauseOnFocus:!0,resetProgress:!0,easing:"cubic-bezier(0.25, 1, 0.5, 1)",drag:!0,direction:"ltr",trimSpace:!0,focusableNodes:"a, button, textarea, input, select, iframe",live:!0,classes:At,i18n:{prev:"Previous slide",next:"Next slide",first:"Go to first slide",last:"Go to last slide",slideX:"Go to slide %s",pageX:"Go to page %s",play:"Start autoplay",pause:"Pause autoplay",carousel:"carousel",slide:"slide",select:"Select a slide to show",slideLabel:"%s of %s"},reducedMotion:{speed:0,rewindSpeed:0,autoplay:"pause"}};function Yt(n,t,e){var i=t.Slides;function o(){i.forEach((function(n){n.style("transform","translateX(-"+100*n.index+"%)")}))}return{mount:function(){zn(n).on([gn,kn],o)},start:function(n,t){i.style("transition","opacity "+e.speed+"ms "+e.easing),a(t)},cancel:l}}function Ut(n,t,e){var i,o=t.Move,r=t.Controller,c=t.Scroll,u=t.Elements.list,a=s(F,u,"transition");function l(){a(""),c.cancel()}return{mount:function(){zn(n).bind(u,"transitionend",(function(n){n.target===u&&i&&(l(),i())}))},start:function(t,u){var s=o.toPosition(t,!0),l=o.getPosition(),f=function(t){var i=e.rewindSpeed;if(n.is(zt)&&i){var o=r.getIndex(!0),c=r.getEnd();if(0===o&&t>=c||o>=c&&0===t)return i}return e.speed}(t);un(s-l)>=1&&f>=1?e.useScroll?c.scroll(s,f,!1,u):(a("transform "+f+"ms "+e.easing),o.translate(s,!0),i=u):(o.jump(t),u())},cancel:l}}var Jt=function(){function n(t,e){var i;this.event=zn(),this.Components={},this.state=(i=1,{set:function(n){i=n},is:function(n){return E(w(n),i)}}),this.splides=[],this._o={},this._E={};var o=g(t)?Y(document,t):t;tn(o,o+" is invalid."),this.root=o,e=z({label:X(o,Un)||"",labelledby:X(o,Jn)||""},Kt,n.defaults,e||{});try{z(e,JSON.parse(X(o,nn)))}catch(n){tn(!1,"Invalid JSON")}this._o=Object.create(z({},e))}var t,e,i=n.prototype;return i.mount=function(n,t){var e=this,i=this.state,o=this.Components;return tn(i.is([1,7]),"Already mounted!"),i.set(1),this._C=o,this._T=t||this._T||(this.is(Tt)?Yt:Ut),this._E=n||this._E,M(D({},Vt,this._E,{Transition:this._T}),(function(n,t){var i=n(e,o,e._o);o[t]=i,i.setup&&i.setup()})),M(o,(function(n){n.mount&&n.mount()})),this.emit(gn),C(this.root,kt),i.set(3),this.emit(mn),this},i.sync=function(n){return this.splides.push({splide:n}),n.splides.push({splide:this,isParent:!0}),this.state.is(3)&&(this._C.Sync.remount(),n.Components.Sync.remount()),this},i.go=function(n){return this._C.Controller.go(n),this},i.on=function(n,t){return this.event.on(n,t),this},i.off=function(n){return this.event.off(n),this},i.emit=function(n){var t;return(t=this.event).emit.apply(t,[n].concat(u(arguments,1))),this},i.add=function(n,t){return this._C.Slides.add(n,t),this},i.remove=function(n){return this._C.Slides.remove(n),this},i.is=function(n){return this._o.type===n},i.refresh=function(){return this.emit(kn),this},i.destroy=function(n){void 0===n&&(n=!0);var t=this.event,e=this.state;return e.is(1)?zn(this).on(mn,this.destroy.bind(this,n)):(M(this._C,(function(t){t.destroy&&t.destroy(n)}),!0),t.emit(Ln),t.destroy(),n&&c(this.splides),e.set(7)),this},t=n,(e=[{key:"options",get:function(){return this._o},set:function(n){this._C.Media.set(n,!0,!0)}},{key:"length",get:function(){return this._C.Slides.getLength(!0)}},{key:"index",get:function(){return this._C.Controller.getIndex()}}])&&o(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),n}();function Qt(n,t,e){return Array.prototype.slice.call(n,t,e)}function Zt(n){return n.bind.apply(n,[null].concat(Qt(arguments,1)))}function $t(n,t){return typeof t===n}Jt.defaults={},Jt.STATES={CREATED:1,MOUNTED:2,IDLE:3,MOVING:4,SCROLLING:5,DRAGGING:6,DESTROYED:7};var ne=Array.isArray;function te(n){return ne(n)?n:[n]}function ee(n,t){te(n).forEach(t)}Zt($t,"function"),Zt($t,"string"),Zt($t,"undefined");var ie=Object.keys;function oe(n){var t=n?n.event.bus:document.createDocumentFragment(),e=function(){var n=[];function t(n,t,e){ee(n,(function(n){n&&ee(t,(function(t){t.split(" ").forEach((function(t){var i=t.split(".");e(n,i[0],i[1])}))}))}))}return{bind:function(e,i,o,r){t(e,i,(function(t,e,i){var c="addEventListener"in t,u=c?t.removeEventListener.bind(t,e,o,r):t.removeListener.bind(t,o);c?t.addEventListener(e,o,r):t.addListener(o),n.push([t,e,i,o,u])}))},unbind:function(e,i,o){t(e,i,(function(t,e,i){n=n.filter((function(n){return!!(n[0]!==t||n[1]!==e||n[2]!==i||o&&n[3]!==o)||(n[4](),!1)}))}))},dispatch:function(n,t,e){var i,o=!0;return"function"==typeof CustomEvent?i=new CustomEvent(t,{bubbles:o,detail:e}):(i=document.createEvent("CustomEvent")).initCustomEvent(t,o,!1,e),n.dispatchEvent(i),i},destroy:function(){n.forEach((function(n){n[4]()})),n.length=0}}}();return n&&n.event.on("destroy",e.destroy),function(n){return Qt(arguments,1).forEach((function(t){!function(n,t){if(n)for(var e=ie(n),i=0;i<e.length;i++){var o=e[i];if("__proto__"!==o&&!1===t(n[o],o))break}}(t,(function(e,i){n[i]=t[i]}))})),n}(e,{bus:t,on:function(n,i){e.bind(t,te(n).join(" "),(function(n){i.apply(i,ne(n.detail)?n.detail:[])}))},off:Zt(e.unbind,t),emit:function(n){e.dispatch(t,n,Qt(arguments,1))}})}function re(n){return n.bind(null,...(t=arguments,Array.prototype.slice.call(t,1,undefined)));var t}function ce(n,t){return typeof t===n}re(ce,"function"),re(ce,"string");const ue=re(ce,"undefined"),se=Object.keys;function ae(n,t,e){const{emit:i}=oe(n),o=e.intersection||{},r=function(n){const{Components:t}=n;return{keyboard:{enable(){t.Keyboard.disable(!1)},disable(){t.Keyboard.disable(!0)}},autoplay:{enable(){n.options.autoplay&&t.Autoplay.play()},disable(){t.Autoplay.pause()}},autoScroll:{enable(){const n=t.AutoScroll;n&&n.play()},disable(){const n=t.AutoScroll;n&&n.pause()}},video:{enable(){const n=t.Video;n&&n.play()},disable(){const n=t.Video;n&&n.pause()}}}}(n);let c;function u(){c&&(c.disconnect(),c=null)}function s([n]){n&&(n.isIntersecting?function(n){a(o.inView||{}),i("intersection:in",n),o.once&&u()}(n):function(n){a(o.outView||{}),i("intersection:out",n)}(n),i("intersection",n))}function a(n){!function(n,t){if(n){let e=se(n);for(let i=0;i<e.length;i++){const o=e[i];if("__proto__"!==o&&!1===t(n[o],o))break}}}(n,((n,t)=>{if(!ue(n)){const e=r[t];n?e.enable():e.disable()}}))}return{mount:function(){window.IntersectionObserver&&(c=new IntersectionObserver(s,{root:o.root,rootMargin:o.rootMargin,threshold:o.threshold}),c.observe(n.root))},destroy:u}}const le=window.wp.domReady;var fe=e.n(le);function de(n,t=null){window.prcBlocks.carouselBlocks.watched.some((t=>t.id===n))||window.prcBlocks.carouselBlocks.watched.push({id:n,y:0,ratio:0,enabled:!1,controller:t})}window.hasOwnProperty("prcBlocks")||(window.prcBlocks={}),window.prcBlocks.carouselBlocks={debug:!0,isMobile:!1,watched:[],toggleBodyLock:(n=!0)=>{const t=document.querySelector("body");!0===n?t.classList.add("carousel-locked"):t.classList.remove("carousel-locked")},unlockCarousel:n=>{const t=document.getElementById(n),e=window.prcBlocks.carouselBlocks.watched.findIndex((t=>t.id===n)),{isMobile:i}=window.prcBlocks.carouselBlocks,{controller:o}=window.prcBlocks.carouselBlocks.watched[e];i?o.Components.Drag.disable(!1):window.prcBlocks.carouselBlocks.toggleBodyLock(!0),setTimeout((()=>{t.parentElement.parentElement.scrollIntoView(!0)}),200),window.prcBlocks.carouselBlocks.watched[e].enabled=!0},lockCarousel:n=>{const t=window.prcBlocks.carouselBlocks.watched.findIndex((t=>t.id===n)),{isMobile:e}=window.prcBlocks.carouselBlocks,{controller:i}=window.prcBlocks.carouselBlocks.watched[t];e?i.Components.Drag.disable(!0):window.prcBlocks.carouselBlocks.toggleBodyLock(!1),window.prcBlocks.carouselBlocks.watched[t].enabled=!1}},fe()((()=>{const n=document.querySelectorAll(".wp-block-prc-block-carousel-controller"),t=Array.from(n);window.prcBlocks.carouselBlocks.isMobile=t.some((n=>n.getAttribute("data-is-mobile"))),n.length&&n.forEach((n=>{const t=(0,i.randomId)();n.setAttribute("id",t),n.querySelectorAll("ul.splide__list > .wp-block-prc-block-carousel-slide").forEach((n=>{n.classList.add("splide__slide")})),n.classList.contains("is-style-horizontal")?function(n,t){const{debug:e}=window.prcBlocks.carouselBlocks,i=new Jt(t,{direction:"ltr",autoHeight:!0,arrows:!0,wheel:!1,waitForTransition:!0,speed:700});de(n,i),i.mount(),e&&console.warn("Carousel (horizontal) initialized:",i,window.prcBlocks.carouselBlocks)}(t,n):function(n,t){const{lockCarousel:e,unlockCarousel:i,isMobile:o,debug:r}=window.prcBlocks.carouselBlocks,c=t.offsetHeight,u=new Jt(t,{direction:"ttb",height:c,arrows:!1,wheel:!0,waitForTransition:!0,wheelSleep:400,speed:700,releaseWheel:!0,intersection:{threshold:.95}});u.mount({Intersection:ae}),de(n,u),r&&console.warn("Carousel (vertical) initialized:",u,window.prcBlocks.carouselBlocks);const s=u.length;u.root.addEventListener("wheel",(t=>{const{enabled:e}=window.prcBlocks.carouselBlocks.watched.find((t=>t.id===n));e||t.stopPropagation()}),{capture:!0,passive:!0}),o&&u.Components.Drag.disable(!0),u.on("active",(t=>{const{index:i}=t,{enabled:r}=window.prcBlocks.carouselBlocks.watched.find((t=>t.id===n));(0===i&&r||s===i+1)&&e(n,o)})),u.on("intersection:in",(t=>{i(n,o,t)}))}(t,n)}))}))}},e={};function i(n){var o=e[n];if(void 0!==o)return o.exports;var r=e[n]={exports:{}};return t[n](r,r.exports,i),r.exports}i.m=t,n=[],i.O=(t,e,o,r)=>{if(!e){var c=1/0;for(l=0;l<n.length;l++){e=n[l][0],o=n[l][1],r=n[l][2];for(var u=!0,s=0;s<e.length;s++)(!1&r||c>=r)&&Object.keys(i.O).every((n=>i.O[n](e[s])))?e.splice(s--,1):(u=!1,r<c&&(c=r));if(u){n.splice(l--,1);var a=o();void 0!==a&&(t=a)}}return t}r=r||0;for(var l=n.length;l>0&&n[l-1][2]>r;l--)n[l]=n[l-1];n[l]=[e,o,r]},i.n=n=>{var t=n&&n.__esModule?()=>n.default:()=>n;return i.d(t,{a:t}),t},i.d=(n,t)=>{for(var e in t)i.o(t,e)&&!i.o(n,e)&&Object.defineProperty(n,e,{enumerable:!0,get:t[e]})},i.o=(n,t)=>Object.prototype.hasOwnProperty.call(n,t),(()=>{var n={310:0,5934:0};i.O.j=t=>0===n[t];var t=(t,e)=>{var o,r,c=e[0],u=e[1],s=e[2],a=0;if(c.some((t=>0!==n[t]))){for(o in u)i.o(u,o)&&(i.m[o]=u[o]);if(s)var l=s(i)}for(t&&t(e);a<c.length;a++)r=c[a],i.o(n,r)&&n[r]&&n[r][0](),n[r]=0;return i.O(l)},e=self.webpackChunk_pewresearch_prc_block_library=self.webpackChunk_pewresearch_prc_block_library||[];e.forEach(t.bind(null,0)),e.push=t.bind(null,e.push.bind(e))})();var o=i.O(void 0,[5934],(()=>i(4688)));o=i.O(o)})();
//# sourceMappingURL=view.js.map