/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.14
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2022 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[5],{0:function(e,t,n){e.exports=n(126)()},101:function(e,t,n){"use strict";e.exports=n(185)},126:function(e,t,n){"use strict";var r=n(127);function a(){}function o(){}o.resetWarningCache=a,e.exports=function(){function e(e,t,n,a,o,c){if(c!==r){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:a};return n.PropTypes=n,n}},127:function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},128:function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"a",(function(){return d})),n.d(t,"c",(function(){return f}));var r=n(50);var a=function(e,t){for(var n=-1,r=null==e?0:e.length;++n<r&&!1!==t(e[n],n,e););return e},o=n(60),c=n(117);var i=function(e){return"function"==typeof e?e:c.a},s=n(36);var l=function(e,t){return(Object(s.a)(e)?a:o.a)(e,i(t))},u=["selected","defaultValue","defaultChecked","accept","autoCapitalize","autoComplete","autoCorrect","autoFocus","checked","disabled","form","id","inputMode","lang","list","max","maxLength","min","minLength","multiple","name","pattern","placeholder","readOnly","required","step","title","type","value"],p=[].concat(u,["onKeyDown","onKeyPress","onKeyUp","onFocus","onBlur","onChange","onInput","onClick","onContextMenu","onDrag","onDragEnd","onDragEnter","onDragExit","onDragLeave","onDragOver","onDragStart","onDrop","onMouseDown","onMouseEnter","onMouseLeave","onMouseMove","onMouseOut","onMouseOver","onMouseUp","onSelect","onTouchCancel","onTouchEnd","onTouchMove","onTouchStart"]),d=["alt","height","src","srcSet","width","loading"],f=function(e,t){void 0===t&&(t={});var n=t,a=n.htmlProps,o=void 0===a?p:a,c=n.includeAria,i=void 0===c||c,s={},u={};return l(e,(function(e,t){var n=i&&(/^aria-.*$/.test(t)||"role"===t);(Object(r.a)(o,t)||n?s:u)[t]=e})),[s,u]}},159:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}n.d(t,"a",(function(){return r}))},161:function(e,t,n){"use strict";var r=n(6),a=n(16),o=n(12),c=n(1),i=n.n(c),s=n(43),l=n(230),u=n(128),p=n(231),d=n(10),f=n(181),h=n(24),b=n(257),m=n(8),v=n(54),O=n.n(v),g=n(53),j=n(433),y=n(37),E=n.n(y),C=n(260),w=n(374),k=n(51),T=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).handleRef=function(e){Object(g.a)(t.props.innerRef,e)},t}Object(h.a)(t,e);var n=t.prototype;return n.componentDidMount=function(){Object(m.a)(this.props,"onMount",null,this.props)},n.componentWillUnmount=function(){Object(m.a)(this.props,"onUnmount",null,this.props)},n.render=function(){if(!Object(b.a)())return null;var e=this.props,t=e.children,n=e.mountNode,r=void 0===n?document.body:n;return Object(k.createPortal)(i.a.createElement(j.a,{innerRef:this.handleRef},t),r)},t}(c.Component);T.handledProps=["children","innerRef","mountNode","onMount","onUnmount"],T.propTypes={};var P=T,N=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(t=e.call.apply(e,[this].concat(a))||this).contentRef=i.a.createRef(),t.triggerRef=i.a.createRef(),t.latestDocumentMouseDownEvent=null,t.handleDocumentMouseDown=function(e){t.latestDocumentMouseDownEvent=e},t.handleDocumentClick=function(e){var n=t.props.closeOnDocumentClick,r=t.latestDocumentMouseDownEvent;t.latestDocumentMouseDownEvent=null,!t.contentRef.current||Object(C.a)(t.triggerRef.current,e)||r&&Object(C.a)(t.contentRef.current,r)||Object(C.a)(t.contentRef.current,e)||n&&t.close(e)},t.handleEscape=function(e){t.props.closeOnEscape&&E.a.getCode(e)===E.a.Escape&&t.close(e)},t.handlePortalMouseLeave=function(e){var n=t.props,r=n.closeOnPortalMouseLeave,a=n.mouseLeaveDelay;r&&e.target===t.contentRef.current&&(t.mouseLeaveTimer=t.closeWithTimeout(e,a))},t.handlePortalMouseEnter=function(){t.props.closeOnPortalMouseLeave&&clearTimeout(t.mouseLeaveTimer)},t.handleTriggerBlur=function(e){for(var n=t.props,r=n.trigger,a=n.closeOnTriggerBlur,o=arguments.length,c=new Array(o>1?o-1:0),i=1;i<o;i++)c[i-1]=arguments[i];m.a.apply(void 0,[r,"props.onBlur",e].concat(c));var s=e.relatedTarget||document.activeElement,l=Object(m.a)(t.contentRef.current,"contains",s);a&&!l&&t.close(e)},t.handleTriggerClick=function(e){for(var n=t.props,r=n.trigger,a=n.closeOnTriggerClick,o=n.openOnTriggerClick,c=t.state.open,i=arguments.length,s=new Array(i>1?i-1:0),l=1;l<i;l++)s[l-1]=arguments[l];m.a.apply(void 0,[r,"props.onClick",e].concat(s)),c&&a?t.close(e):!c&&o&&t.open(e)},t.handleTriggerFocus=function(e){for(var n=t.props,r=n.trigger,a=n.openOnTriggerFocus,o=arguments.length,c=new Array(o>1?o-1:0),i=1;i<o;i++)c[i-1]=arguments[i];m.a.apply(void 0,[r,"props.onFocus",e].concat(c)),a&&t.open(e)},t.handleTriggerMouseLeave=function(e){clearTimeout(t.mouseEnterTimer);for(var n=t.props,r=n.trigger,a=n.closeOnTriggerMouseLeave,o=n.mouseLeaveDelay,c=arguments.length,i=new Array(c>1?c-1:0),s=1;s<c;s++)i[s-1]=arguments[s];m.a.apply(void 0,[r,"props.onMouseLeave",e].concat(i)),a&&(t.mouseLeaveTimer=t.closeWithTimeout(e,o))},t.handleTriggerMouseEnter=function(e){clearTimeout(t.mouseLeaveTimer);for(var n=t.props,r=n.trigger,a=n.mouseEnterDelay,o=n.openOnTriggerMouseEnter,c=arguments.length,i=new Array(c>1?c-1:0),s=1;s<c;s++)i[s-1]=arguments[s];m.a.apply(void 0,[r,"props.onMouseEnter",e].concat(i)),o&&(t.mouseEnterTimer=t.openWithTimeout(e,a))},t.open=function(e){Object(m.a)(t.props,"onOpen",e,Object(r.a)({},t.props,{open:!0})),t.setState({open:!0})},t.openWithTimeout=function(e,n){var a=Object(r.a)({},e);return setTimeout((function(){return t.open(a)}),n||0)},t.close=function(e){t.setState({open:!1}),Object(m.a)(t.props,"onClose",e,Object(r.a)({},t.props,{open:!1}))},t.closeWithTimeout=function(e,n){var a=Object(r.a)({},e);return setTimeout((function(){return t.close(a)}),n||0)},t.handleMount=function(){Object(m.a)(t.props,"onMount",null,t.props)},t.handleUnmount=function(){Object(m.a)(t.props,"onUnmount",null,t.props)},t.handleTriggerRef=function(e){t.triggerRef.current=e,Object(g.a)(t.props.triggerRef,e)},t}Object(h.a)(t,e);var n=t.prototype;return n.componentWillUnmount=function(){clearTimeout(this.mouseEnterTimer),clearTimeout(this.mouseLeaveTimer)},n.render=function(){var e=this.props,t=e.children,n=e.eventPool,r=e.mountNode,a=e.trigger,o=this.state.open;return i.a.createElement(i.a.Fragment,null,o&&i.a.createElement(i.a.Fragment,null,i.a.createElement(P,{innerRef:this.contentRef,mountNode:r,onMount:this.handleMount,onUnmount:this.handleUnmount},t),i.a.createElement(O.a,{name:"mouseleave",on:this.handlePortalMouseLeave,pool:n,target:this.contentRef}),i.a.createElement(O.a,{name:"mouseenter",on:this.handlePortalMouseEnter,pool:n,target:this.contentRef}),i.a.createElement(O.a,{name:"mousedown",on:this.handleDocumentMouseDown,pool:n}),i.a.createElement(O.a,{name:"click",on:this.handleDocumentClick,pool:n}),i.a.createElement(O.a,{name:"keydown",on:this.handleEscape,pool:n})),a&&i.a.createElement(j.a,{innerRef:this.handleTriggerRef},i.a.cloneElement(a,{onBlur:this.handleTriggerBlur,onClick:this.handleTriggerClick,onFocus:this.handleTriggerFocus,onMouseLeave:this.handleTriggerMouseLeave,onMouseEnter:this.handleTriggerMouseEnter})))},t}(w.a);N.handledProps=["children","closeOnDocumentClick","closeOnEscape","closeOnPortalMouseLeave","closeOnTriggerBlur","closeOnTriggerClick","closeOnTriggerMouseLeave","defaultOpen","eventPool","mountNode","mouseEnterDelay","mouseLeaveDelay","onClose","onMount","onOpen","onUnmount","open","openOnTriggerClick","openOnTriggerFocus","openOnTriggerMouseEnter","trigger","triggerRef"],N.propTypes={},N.defaultProps={closeOnDocumentClick:!0,closeOnEscape:!0,eventPool:"default",openOnTriggerClick:!0},N.autoControlledProps=["open"],N.Inner=P;var M=N;function S(e){var t=e.blurring,n=e.className,a=e.children,c=e.content,u=e.dimmed,f=Object(o.a)(Object(s.a)(t,"blurring"),Object(s.a)(u,"dimmed"),"dimmable",n),h=Object(l.a)(S,e),b=Object(p.a)(S,e);return i.a.createElement(b,Object(r.a)({},h,{className:f}),d.a.isNil(a)?c:a)}S.handledProps=["as","blurring","children","className","content","dimmed"],S.propTypes={};var R=S,D=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).containerRef=Object(c.createRef)(),t.contentRef=Object(c.createRef)(),t.handleClick=function(e){var n=t.contentRef.current;Object(m.a)(t.props,"onClick",e,t.props),n&&n!==e.target&&Object(C.a)(n,e)||Object(m.a)(t.props,"onClickOutside",e,t.props)},t}Object(h.a)(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=this.props.active;this.toggleStyles(e)},n.componentDidUpdate=function(e){var t=this.props.active;e.active!==t&&this.toggleStyles(t)},n.toggleStyles=function(e){var t=this.containerRef.current;t&&t.style&&(e?t.style.setProperty("display","flex","important"):t.style.removeProperty("display"))},n.render=function(){var e=this.props,n=e.active,a=e.children,c=e.className,u=e.content,f=e.disabled,h=e.inverted,b=e.page,m=e.simple,v=e.verticalAlign,O=Object(o.a)("ui",Object(s.a)(n,"active transition visible"),Object(s.a)(f,"disabled"),Object(s.a)(h,"inverted"),Object(s.a)(b,"page"),Object(s.a)(m,"simple"),Object(s.d)(v),"dimmer",c),g=Object(l.a)(t,this.props),y=Object(p.a)(t,this.props),E=d.a.isNil(a)?u:a;return i.a.createElement(j.a,{innerRef:this.containerRef},i.a.createElement(y,Object(r.a)({},g,{className:O,onClick:this.handleClick}),E&&i.a.createElement("div",{className:"content",ref:this.contentRef},E)))},t}(c.Component);D.handledProps=["active","as","children","className","content","disabled","inverted","onClick","onClickOutside","page","simple","verticalAlign"],D.propTypes={};var A=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).handlePortalMount=function(){Object(b.a)()&&(document.body.classList.add("dimmed"),document.body.classList.add("dimmable"))},t.handlePortalUnmount=function(){Object(b.a)()&&(document.body.classList.remove("dimmed"),document.body.classList.remove("dimmable"))},t}return Object(h.a)(t,e),t.prototype.render=function(){var e=this.props,n=e.active,a=e.page,o=Object(l.a)(t,this.props);return a?i.a.createElement(M,{closeOnEscape:!1,closeOnDocumentClick:!1,onMount:this.handlePortalMount,onUnmount:this.handlePortalUnmount,open:n,openOnTriggerClick:!1},i.a.createElement(D,Object(r.a)({},o,{active:n,page:a}))):i.a.createElement(D,Object(r.a)({},o,{active:n,page:a}))},t}(c.Component);A.handledProps=["active","page"],A.propTypes={},A.Dimmable=R,A.Inner=D,A.create=Object(f.e)(A,(function(e){return{content:e}}));var L=n(89);function x(e){var t=e.children,n=e.className,a=e.content,c=e.size,s=Object(o.a)("ui",c,n,"images"),u=Object(l.a)(x,e),f=Object(p.a)(x,e);return i.a.createElement(f,Object(r.a)({},u,{className:s}),d.a.isNil(t)?a:t)}x.handledProps=["as","children","className","content","size"],x.propTypes={};var F=x;function U(e){var t=e.avatar,n=e.bordered,c=e.centered,f=e.children,h=e.circular,b=e.className,m=e.content,v=e.dimmer,O=e.disabled,g=e.floated,j=e.fluid,y=e.hidden,E=e.href,C=e.inline,w=e.label,k=e.rounded,T=e.size,P=e.spaced,N=e.verticalAlign,M=e.wrapped,S=e.ui,R=Object(o.a)(Object(s.a)(S,"ui"),T,Object(s.a)(t,"avatar"),Object(s.a)(n,"bordered"),Object(s.a)(h,"circular"),Object(s.a)(c,"centered"),Object(s.a)(O,"disabled"),Object(s.a)(j,"fluid"),Object(s.a)(y,"hidden"),Object(s.a)(C,"inline"),Object(s.a)(k,"rounded"),Object(s.b)(P,"spaced"),Object(s.c)(g,"floated"),Object(s.d)(N,"aligned"),"image",b),D=Object(l.a)(U,e),x=Object(u.c)(D,{htmlProps:u.a}),F=x[0],H=x[1],I=Object(p.a)(U,e,(function(){if(!(Object(a.a)(v)&&Object(a.a)(w)&&Object(a.a)(M)&&d.a.isNil(f)))return"div"}));return d.a.isNil(f)?d.a.isNil(m)?"img"===I?i.a.createElement(I,Object(r.a)({},H,F,{className:R})):i.a.createElement(I,Object(r.a)({},H,{className:R,href:E}),A.create(v,{autoGenerateKey:!1}),L.a.create(w,{autoGenerateKey:!1}),i.a.createElement("img",F)):i.a.createElement(I,Object(r.a)({},D,{className:R}),m):i.a.createElement(I,Object(r.a)({},D,{className:R}),f)}U.handledProps=["as","avatar","bordered","centered","children","circular","className","content","dimmer","disabled","floated","fluid","hidden","href","inline","label","rounded","size","spaced","ui","verticalAlign","wrapped"],U.Group=F,U.propTypes={},U.defaultProps={as:"img",ui:!0},U.create=Object(f.e)(U,(function(e){return{src:e}}));t.a=U},185:function(e,t,n){"use strict";
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(17),a="function"==typeof Symbol&&Symbol.for,o=a?Symbol.for("react.element"):60103,c=a?Symbol.for("react.portal"):60106,i=a?Symbol.for("react.fragment"):60107,s=a?Symbol.for("react.strict_mode"):60108,l=a?Symbol.for("react.profiler"):60114,u=a?Symbol.for("react.provider"):60109,p=a?Symbol.for("react.context"):60110,d=a?Symbol.for("react.async_mode"):60111,f=a?Symbol.for("react.concurrent_mode"):60111,h=a?Symbol.for("react.forward_ref"):60112,b=a?Symbol.for("react.suspense"):60113,m=a?Symbol.for("react.suspense_list"):60120,v=a?Symbol.for("react.memo"):60115,O=a?Symbol.for("react.lazy"):60116,g=a?Symbol.for("react.block"):60121,j=a?Symbol.for("react.fundamental"):60117,y=a?Symbol.for("react.responder"):60118,E=a?Symbol.for("react.scope"):60119;function C(e){if("object"===r(e)&&null!==e){var t=e.$$typeof;switch(t){case o:switch(e=e.type){case d:case f:case i:case l:case s:case b:return e;default:switch(e=e&&e.$$typeof){case p:case h:case O:case v:case u:return e;default:return t}}case c:return t}}}function w(e){return C(e)===f}t.AsyncMode=d,t.ConcurrentMode=f,t.ContextConsumer=p,t.ContextProvider=u,t.Element=o,t.ForwardRef=h,t.Fragment=i,t.Lazy=O,t.Memo=v,t.Portal=c,t.Profiler=l,t.StrictMode=s,t.Suspense=b,t.isAsyncMode=function(e){return w(e)||C(e)===d},t.isConcurrentMode=w,t.isContextConsumer=function(e){return C(e)===p},t.isContextProvider=function(e){return C(e)===u},t.isElement=function(e){return"object"===r(e)&&null!==e&&e.$$typeof===o},t.isForwardRef=function(e){return C(e)===h},t.isFragment=function(e){return C(e)===i},t.isLazy=function(e){return C(e)===O},t.isMemo=function(e){return C(e)===v},t.isPortal=function(e){return C(e)===c},t.isProfiler=function(e){return C(e)===l},t.isStrictMode=function(e){return C(e)===s},t.isSuspense=function(e){return C(e)===b},t.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===i||e===f||e===l||e===s||e===b||e===m||"object"===r(e)&&null!==e&&(e.$$typeof===O||e.$$typeof===v||e.$$typeof===u||e.$$typeof===p||e.$$typeof===h||e.$$typeof===j||e.$$typeof===y||e.$$typeof===E||e.$$typeof===g)},t.typeOf=C},221:function(e,t,n){"use strict";var r=n(17);Object.defineProperty(t,"__esModule",{value:!0});var a=n(222);n(0);var o=n(1);function c(e){return(c="function"==typeof Symbol&&"symbol"==r(Symbol.iterator)?function(e){return r(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":r(e)})(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t,n){return t&&s(e.prototype,t),n&&s(e,n),e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&function(e,t){(Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}(e,t)}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){return!t||"object"!=r(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}var h=function(){function e(t){i(this,e),u(this,"handlers",void 0),this.handlers=t.slice(0)}return l(e,[{key:"addHandlers",value:function(t){for(var n=this.handlers.slice(0),r=t.length,a=0;a<r;a+=1)n.push(t[a]);return new e(n)}},{key:"dispatchEvent",value:function(e,t){var n=this.handlers.length-1;if(t){for(var r=n;r>=0;r-=1)this.handlers[r].called||(this.handlers[r].called=!0,this.handlers[r](e));for(var a=n;a>=0;a-=1)this.handlers[a].called=!1}else(0,this.handlers[n])(e)}},{key:"hasHandlers",value:function(){return this.handlers.length>0}},{key:"removeHandlers",value:function(t){for(var n=[],r=this.handlers.length,a=0;a<r;a+=1){var o=this.handlers[a];-1===t.indexOf(o)&&n.push(o)}return new e(n)}}]),e}();function b(e){var t=new Map;return e.forEach((function(e,n){t.set(n,e)})),t}function m(e){return Array.isArray(e)?e:[e]}function v(e){return"document"===e?document:"window"===e?window:function(e){return null!==e&&"object"===c(e)&&e.hasOwnProperty("current")}(e)?e.current||document:e||document}var O=function(){function e(t,n){i(this,e),u(this,"handlerSets",void 0),u(this,"poolName",void 0),this.handlerSets=n,this.poolName=t}return l(e,[{key:"addHandlers",value:function(t,n){var r=b(this.handlerSets);if(r.has(t)){var a=r.get(t);r.set(t,a.addHandlers(n))}else r.set(t,new h(n));return new e(this.poolName,r)}},{key:"dispatchEvent",value:function(e,t){var n=this.handlerSets.get(e),r="default"===this.poolName;n&&n.dispatchEvent(t,r)}},{key:"hasHandlers",value:function(e){if(!e)return this.handlerSets.size>0;var t=this.handlerSets.get(e);return!!t&&t.hasHandlers()}},{key:"removeHandlers",value:function(t,n){var r=b(this.handlerSets);if(!r.has(t))return new e(this.poolName,r);var a=r.get(t).removeHandlers(n);return a.hasHandlers()?r.set(t,a):r.delete(t),new e(this.poolName,r)}}]),e}();u(O,"createByType",(function(e,t,n){var r=new Map;return r.set(t,new h(n)),new O(e,r)}));var g=function(){function e(t){var n=this;i(this,e),u(this,"handlers",new Map),u(this,"pools",new Map),u(this,"target",void 0),u(this,"createEmitter",(function(e){return function(t){n.pools.forEach((function(n){n.dispatchEvent(e,t)}))}})),this.target=t}return l(e,[{key:"addHandlers",value:function(e,t,n){if(this.pools.has(e)){var r=this.pools.get(e);this.pools.set(e,r.addHandlers(t,n))}else this.pools.set(e,O.createByType(e,t,n));this.handlers.has(t)||this.addTargetHandler(t)}},{key:"hasHandlers",value:function(){return this.handlers.size>0}},{key:"removeHandlers",value:function(e,t,n){if(this.pools.has(e)){var r=this.pools.get(e).removeHandlers(t,n);r.hasHandlers()?this.pools.set(e,r):this.pools.delete(e);var a=!1;this.pools.forEach((function(e){return a=a||e.hasHandlers(t)})),a||this.removeTargetHandler(t)}}},{key:"addTargetHandler",value:function(e){var t=this.createEmitter(e);this.handlers.set(e,t),this.target.addEventListener(e,t,!0)}},{key:"removeTargetHandler",value:function(e){this.handlers.has(e)&&(this.target.removeEventListener(e,this.handlers.get(e),!0),this.handlers.delete(e))}}]),e}(),j=new(function(){function e(){var t=this;i(this,e),u(this,"targets",new Map),u(this,"getTarget",(function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=v(e);if(t.targets.has(r))return t.targets.get(r);if(!n)return null;var a=new g(r);return t.targets.set(r,a),a})),u(this,"removeTarget",(function(e){t.targets.delete(v(e))}))}return l(e,[{key:"sub",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(a.canUseDOM){var r=n.target,o=void 0===r?document:r,c=n.pool,i=void 0===c?"default":c;this.getTarget(o).addHandlers(i,e,m(t))}}},{key:"unsub",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(a.canUseDOM){var r=n.target,o=void 0===r?document:r,c=n.pool,i=void 0===c?"default":c,s=this.getTarget(o,!1);s&&(s.removeHandlers(i,e,m(t)),s.hasHandlers()||this.removeTarget(o))}}}]),e}()),y=function(e){function t(){return i(this,t),f(this,d(t).apply(this,arguments))}return p(t,o.PureComponent),l(t,[{key:"componentDidMount",value:function(){this.subscribe(this.props)}},{key:"componentDidUpdate",value:function(e){this.unsubscribe(e),this.subscribe(this.props)}},{key:"componentWillUnmount",value:function(){this.unsubscribe(this.props)}},{key:"subscribe",value:function(e){var t=e.name,n=e.on,r=e.pool,a=e.target;j.sub(t,n,{pool:r,target:a})}},{key:"unsubscribe",value:function(e){var t=e.name,n=e.on,r=e.pool,a=e.target;j.unsub(t,n,{pool:r,target:a})}},{key:"render",value:function(){return null}}]),t}();u(y,"defaultProps",{pool:"default",target:"document"}),y.propTypes={},t.instance=j,t.default=y},222:function(e,t,n){var r,a=n(17);
/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/!function(){"use strict";var o=!("undefined"==typeof window||!window.document||!window.document.createElement),c={canUseDOM:o,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:o&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:o&&!!window.screen};"object"===a(n(20))&&n(20)?void 0===(r=function(){return c}.call(t,n,t,e))||(e.exports=r):e.exports?e.exports=c:window.ExecutionEnvironment=c}()},235:function(e,t,n){"use strict";var r=n(6),a=n(24),o=n(8),c=n(16),i=n(433),s=n(12),l=n(1),u=n.n(l),p=n(10),d=n(43),f=n(230),h=n(231),b=n(181),m=n(72),v=n(89);function O(e){var t=e.children,n=e.className,a=e.content,o=e.hidden,c=e.visible,i=Object(s.a)(Object(d.a)(c,"visible"),Object(d.a)(o,"hidden"),"content",n),l=Object(f.a)(O,e),b=Object(h.a)(O,e);return u.a.createElement(b,Object(r.a)({},l,{className:i}),p.a.isNil(t)?a:t)}O.handledProps=["as","children","className","content","hidden","visible"],O.propTypes={};var g=O,j=n(56);function y(e){var t=e.attached,n=e.basic,a=e.buttons,o=e.children,i=e.className,l=e.color,b=e.compact,m=e.content,v=e.floated,O=e.fluid,g=e.icon,E=e.inverted,C=e.labeled,w=e.negative,k=e.positive,P=e.primary,N=e.secondary,M=e.size,S=e.toggle,R=e.vertical,D=e.widths,A=Object(s.a)("ui",l,M,Object(d.a)(n,"basic"),Object(d.a)(b,"compact"),Object(d.a)(O,"fluid"),Object(d.a)(g,"icon"),Object(d.a)(E,"inverted"),Object(d.a)(C,"labeled"),Object(d.a)(w,"negative"),Object(d.a)(k,"positive"),Object(d.a)(P,"primary"),Object(d.a)(N,"secondary"),Object(d.a)(S,"toggle"),Object(d.a)(R,"vertical"),Object(d.b)(t,"attached"),Object(d.c)(v,"floated"),Object(d.e)(D),"buttons",i),L=Object(f.a)(y,e),x=Object(h.a)(y,e);return Object(c.a)(a)?u.a.createElement(x,Object(r.a)({},L,{className:A}),p.a.isNil(o)?m:o):u.a.createElement(x,Object(r.a)({},L,{className:A}),Object(j.a)(a,(function(e){return T.create(e)})))}y.handledProps=["as","attached","basic","buttons","children","className","color","compact","content","floated","fluid","icon","inverted","labeled","negative","positive","primary","secondary","size","toggle","vertical","widths"],y.propTypes={};var E=y;function C(e){var t=e.className,n=e.text,a=Object(s.a)("or",t),o=Object(f.a)(C,e),c=Object(h.a)(C,e);return u.a.createElement(c,Object(r.a)({},o,{className:a,"data-text":n}))}C.handledProps=["as","className","text"],C.propTypes={};var w=C,k=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).ref=Object(l.createRef)(),t.computeElementType=function(){var e=t.props,n=e.attached,r=e.label;if(!Object(c.a)(n)||!Object(c.a)(r))return"div"},t.computeTabIndex=function(e){var n=t.props,r=n.disabled,a=n.tabIndex;return Object(c.a)(a)?r?-1:"div"===e?0:void 0:a},t.focus=function(){return Object(o.a)(t.ref.current,"focus")},t.handleClick=function(e){t.props.disabled?e.preventDefault():Object(o.a)(t.props,"onClick",e,t.props)},t.hasIconClass=function(){var e=t.props,n=e.labelPosition,r=e.children,a=e.content,o=e.icon;return!0===o||o&&(n||p.a.isNil(r)&&Object(c.a)(a))},t}Object(a.a)(t,e);var n=t.prototype;return n.computeButtonAriaRole=function(e){var t=this.props.role;return Object(c.a)(t)?"button"!==e?"button":void 0:t},n.render=function(){var e=this.props,n=e.active,a=e.animated,o=e.attached,l=e.basic,b=e.children,O=e.circular,g=e.className,j=e.color,y=e.compact,E=e.content,C=e.disabled,w=e.floated,k=e.fluid,T=e.icon,P=e.inverted,N=e.label,M=e.labelPosition,S=e.loading,R=e.negative,D=e.positive,A=e.primary,L=e.secondary,x=e.size,F=e.toggle,U=e.type,H=Object(s.a)(j,x,Object(d.a)(n,"active"),Object(d.a)(l,"basic"),Object(d.a)(O,"circular"),Object(d.a)(y,"compact"),Object(d.a)(k,"fluid"),Object(d.a)(this.hasIconClass(),"icon"),Object(d.a)(P,"inverted"),Object(d.a)(S,"loading"),Object(d.a)(R,"negative"),Object(d.a)(D,"positive"),Object(d.a)(A,"primary"),Object(d.a)(L,"secondary"),Object(d.a)(F,"toggle"),Object(d.b)(a,"animated"),Object(d.b)(o,"attached")),I=Object(s.a)(Object(d.b)(M||!!N,"labeled")),$=Object(s.a)(Object(d.a)(C,"disabled"),Object(d.c)(w,"floated")),_=Object(f.a)(t,this.props),z=Object(h.a)(t,this.props,this.computeElementType),B=this.computeTabIndex(z);if(!Object(c.a)(N)){var G=Object(s.a)("ui",H,"button",g),K=Object(s.a)("ui",I,"button",g,$),W=v.a.create(N,{defaultProps:{basic:!0,pointing:"left"===M?"right":"left"},autoGenerateKey:!1});return u.a.createElement(z,Object(r.a)({},_,{className:K,onClick:this.handleClick}),"left"===M&&W,u.a.createElement(i.a,{innerRef:this.ref},u.a.createElement("button",{className:G,"aria-pressed":F?!!n:void 0,disabled:C,type:U,tabIndex:B},m.a.create(T,{autoGenerateKey:!1})," ",E)),("right"===M||!M)&&W)}var V=Object(s.a)("ui",H,$,I,"button",g),q=!p.a.isNil(b),Q=this.computeButtonAriaRole(z);return u.a.createElement(i.a,{innerRef:this.ref},u.a.createElement(z,Object(r.a)({},_,{className:V,"aria-pressed":F?!!n:void 0,disabled:C&&"button"===z||void 0,onClick:this.handleClick,role:Q,type:U,tabIndex:B}),q&&b,!q&&m.a.create(T,{autoGenerateKey:!1}),!q&&E))},t}(l.Component);k.handledProps=["active","animated","as","attached","basic","children","circular","className","color","compact","content","disabled","floated","fluid","icon","inverted","label","labelPosition","loading","negative","onClick","positive","primary","role","secondary","size","tabIndex","toggle","type"],k.propTypes={},k.defaultProps={as:"button"},k.Content=g,k.Group=E,k.Or=w,k.create=Object(b.e)(k,(function(e){return{content:e}}));var T=t.a=k},257:function(e,t,n){"use strict";var r=n(15),a=n(16),o="object"===("undefined"==typeof document?"undefined":Object(r.a)(document))&&null!==document,c="object"===("undefined"==typeof window?"undefined":Object(r.a)(window))&&null!==window&&window.self===window;t.a=function e(){return Object(a.a)(e.override)?o&&c:e.override}},260:function(e,t,n){"use strict";var r=Math.max,a=Math.min;var o=function(e,t,n){return e>=a(t,n)&&e<r(t,n)},c=n(134),i=n(175);var s=function(e,t,n){return t=Object(c.a)(t),void 0===n?(n=t,t=0):n=Object(c.a)(n),e=Object(i.a)(e),o(e,t,n)};var l=function(e){return e&&e.length?e[0]:void 0},u=n(8),p=n(16),d=n(74);t.a=function(e,t){if(Object(d.a)([t,e],p.a))return!1;if(t.target&&(Object(u.a)(t.target,"setAttribute","data-suir-click-target",!0),document.querySelector("[data-suir-click-target=true]")))return Object(u.a)(t.target,"removeAttribute","data-suir-click-target"),e.contains(t.target);var n=t.clientX,r=t.clientY;if(Object(d.a)([n,r],p.a))return!1;var a=e.getClientRects();if(!(e.offsetWidth&&e.offsetHeight&&a&&a.length))return!1;var o=l(a),c=o.top,i=o.bottom,f=o.left,h=o.right;return!Object(d.a)([c,i,f,h],p.a)&&(s(r,c,i+.001)&&s(n,f,h+.001))}},37:function(e,t,n){"use strict";for(var r=n(17),a=function(e){return null!==e&&!Array.isArray(e)&&"object"===r(e)},o={3:"Cancel",6:"Help",8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",28:"Convert",29:"NonConvert",30:"Accept",31:"ModeChange",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",41:"Select",42:"Print",43:"Execute",44:"PrintScreen",45:"Insert",46:"Delete",48:["0",")"],49:["1","!"],50:["2","@"],51:["3","#"],52:["4","$"],53:["5","%"],54:["6","^"],55:["7","&"],56:["8","*"],57:["9","("],91:"OS",93:"ContextMenu",144:"NumLock",145:"ScrollLock",181:"VolumeMute",182:"VolumeDown",183:"VolumeUp",186:[";",":"],187:["=","+"],188:[",","<"],189:["-","_"],190:[".",">"],191:["/","?"],192:["`","~"],219:["[","{"],220:["\\","|"],221:["]","}"],222:["'",'"'],224:"Meta",225:"AltGraph",246:"Attn",247:"CrSel",248:"ExSel",249:"EraseEof",250:"Play",251:"ZoomOut"},c=0;c<24;c+=1)o[112+c]="F"+(c+1);for(var i=0;i<26;i+=1){var s=i+65;o[s]=[String.fromCharCode(s+32),String.fromCharCode(s)]}var l={codes:o,getCode:function(e){return a(e)?e.keyCode||e.which||this[e.key]:this[e]},getKey:function(e){var t=a(e);if(t&&e.key)return e.key;var n=o[t?e.keyCode||e.which:e];return Array.isArray(n)&&(n=t?n[e.shiftKey?1:0]:n[0]),n},Cancel:3,Help:6,Backspace:8,Tab:9,Clear:12,Enter:13,Shift:16,Control:17,Alt:18,Pause:19,CapsLock:20,Escape:27,Convert:28,NonConvert:29,Accept:30,ModeChange:31," ":32,PageUp:33,PageDown:34,End:35,Home:36,ArrowLeft:37,ArrowUp:38,ArrowRight:39,ArrowDown:40,Select:41,Print:42,Execute:43,PrintScreen:44,Insert:45,Delete:46,0:48,")":48,1:49,"!":49,2:50,"@":50,3:51,"#":51,4:52,$:52,5:53,"%":53,6:54,"^":54,7:55,"&":55,8:56,"*":56,9:57,"(":57,a:65,A:65,b:66,B:66,c:67,C:67,d:68,D:68,e:69,E:69,f:70,F:70,g:71,G:71,h:72,H:72,i:73,I:73,j:74,J:74,k:75,K:75,l:76,L:76,m:77,M:77,n:78,N:78,o:79,O:79,p:80,P:80,q:81,Q:81,r:82,R:82,s:83,S:83,t:84,T:84,u:85,U:85,v:86,V:86,w:87,W:87,x:88,X:88,y:89,Y:89,z:90,Z:90,OS:91,ContextMenu:93,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,F16:127,F17:128,F18:129,F19:130,F20:131,F21:132,F22:133,F23:134,F24:135,NumLock:144,ScrollLock:145,VolumeMute:181,VolumeDown:182,VolumeUp:183,";":186,":":186,"=":187,"+":187,",":188,"<":188,"-":189,_:189,".":190,">":190,"/":191,"?":191,"`":192,"~":192,"[":219,"{":219,"\\":220,"|":220,"]":221,"}":221,"'":222,'"':222,Meta:224,AltGraph:225,Attn:246,CrSel:247,ExSel:248,EraseEof:249,Play:250,ZoomOut:251};l.Spacebar=l[" "],l.Digit0=l[0],l.Digit1=l[1],l.Digit2=l[2],l.Digit3=l[3],l.Digit4=l[4],l.Digit5=l[5],l.Digit6=l[6],l.Digit7=l[7],l.Digit8=l[8],l.Digit9=l[9],l.Tilde=l["~"],l.GraveAccent=l["`"],l.ExclamationPoint=l["!"],l.AtSign=l["@"],l.PoundSign=l["#"],l.PercentSign=l["%"],l.Caret=l["^"],l.Ampersand=l["&"],l.PlusSign=l["+"],l.MinusSign=l["-"],l.EqualsSign=l["="],l.DivisionSign=l["/"],l.MultiplicationSign=l["*"],l.Comma=l[","],l.Decimal=l["."],l.Colon=l[":"],l.Semicolon=l[";"],l.Pipe=l["|"],l.BackSlash=l["\\"],l.QuestionMark=l["?"],l.SingleQuote=l["'"],l.DoubleQuote=l['"'],l.LeftCurlyBrace=l["{"],l.RightCurlyBrace=l["}"],l.LeftParenthesis=l["("],l.RightParenthesis=l[")"],l.LeftAngleBracket=l["<"],l.RightAngleBracket=l[">"],l.LeftSquareBracket=l["["],l.RightSquareBracket=l["]"],e.exports=l},421:function(e,t,n){"use strict";var r=n(6),a=n(24),o=n(50),c=n(56),i=n(8),s=n(41),l=n(16),u=n(53),p=n(12),d=n(1),f=n.n(d),h=n(230),b=n(128),m=n(43),v=n(231),O=n(10),g=n(181),j=n(235),y=n(72),E=n(89),C=function(e){function t(){for(var n,a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(n=e.call.apply(e,[this].concat(o))||this).inputRef=Object(d.createRef)(),n.computeIcon=function(){var e=n.props,t=e.loading,r=e.icon;return Object(l.a)(r)?t?"spinner":void 0:r},n.computeTabIndex=function(){var e=n.props,t=e.disabled,r=e.tabIndex;return Object(l.a)(r)?t?-1:void 0:r},n.focus=function(){return n.inputRef.current.focus()},n.select=function(){return n.inputRef.current.select()},n.handleChange=function(e){var t=Object(s.a)(e,"target.value");Object(i.a)(n.props,"onChange",e,Object(r.a)({},n.props,{value:t}))},n.handleChildOverrides=function(e,t){return Object(r.a)({},t,e.props,{ref:function(t){Object(u.a)(e.ref,t),n.inputRef.current=t}})},n.partitionProps=function(){var e=n.props,a=e.disabled,o=e.type,c=n.computeTabIndex(),i=Object(h.a)(t,n.props),s=Object(b.c)(i),l=s[0],u=s[1];return[Object(r.a)({},l,{disabled:a,type:o,tabIndex:c,onChange:n.handleChange,ref:n.inputRef}),u]},n}return Object(a.a)(t,e),t.prototype.render=function(){var e=this,n=this.props,a=n.action,i=n.actionPosition,s=n.children,l=n.className,u=n.disabled,h=n.error,b=n.fluid,C=n.focus,w=n.icon,k=n.iconPosition,T=n.input,P=n.inverted,N=n.label,M=n.labelPosition,S=n.loading,R=n.size,D=n.transparent,A=n.type,L=Object(p.a)("ui",R,Object(m.a)(u,"disabled"),Object(m.a)(h,"error"),Object(m.a)(b,"fluid"),Object(m.a)(C,"focus"),Object(m.a)(P,"inverted"),Object(m.a)(S,"loading"),Object(m.a)(D,"transparent"),Object(m.c)(i,"action")||Object(m.a)(a,"action"),Object(m.c)(k,"icon")||Object(m.a)(w||S,"icon"),Object(m.c)(M,"labeled")||Object(m.a)(N,"labeled"),"input",l),x=Object(v.a)(t,this.props),F=this.partitionProps(),U=F[0],H=F[1];if(!O.a.isNil(s)){var I=Object(c.a)(d.Children.toArray(s),(function(t){return"input"!==t.type?t:Object(d.cloneElement)(t,e.handleChildOverrides(t,U))}));return f.a.createElement(x,Object(r.a)({},H,{className:L}),I)}var $=j.a.create(a,{autoGenerateKey:!1}),_=E.a.create(N,{defaultProps:{className:Object(p.a)("label",Object(o.a)(M,"corner")&&M)},autoGenerateKey:!1});return f.a.createElement(x,Object(r.a)({},H,{className:L}),"left"===i&&$,"right"!==M&&_,Object(g.a)(T||A,{defaultProps:U,autoGenerateKey:!1}),y.a.create(this.computeIcon(),{autoGenerateKey:!1}),"left"!==i&&$,"right"===M&&_)},t}(d.Component);C.handledProps=["action","actionPosition","as","children","className","disabled","error","fluid","focus","icon","iconPosition","input","inverted","label","labelPosition","loading","onChange","size","tabIndex","transparent","type"],C.propTypes={},C.defaultProps={type:"text"},C.create=Object(g.e)(C,(function(e){return{type:e}})),t.a=C},433:function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var r=n(159),a=n(1),o=n(101),c=n(24),i=n(51),s=n(53);var l=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).prevNode=null,t}Object(c.a)(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=i.findDOMNode(this);this.prevNode=e,Object(s.a)(this.props.innerRef,e)},n.componentDidUpdate=function(e){var t=i.findDOMNode(this);this.prevNode!==t&&(this.prevNode=t,Object(s.a)(this.props.innerRef,t)),e.innerRef!==this.props.innerRef&&Object(s.a)(this.props.innerRef,t)},n.componentWillUnmount=function(){Object(s.a)(this.props.innerRef,null),delete this.prevNode},n.render=function(){return this.props.children},t}(a.Component),u=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).currentNode=null,t.handleRefOverride=function(e){var n=t.props,r=n.children,a=n.innerRef;Object(s.a)(r.ref,e),Object(s.a)(a,e),t.currentNode=e},t}Object(c.a)(t,e);var n=t.prototype;return n.componentDidUpdate=function(e){e.innerRef!==this.props.innerRef&&Object(s.a)(this.props.innerRef,this.currentNode)},n.componentWillUnmount=function(){delete this.currentNode},n.render=function(){var e=this.props.children;return a.cloneElement(e,{ref:this.handleRefOverride})},t}(a.Component),p=function(e){var t=e.children,n=e.innerRef,c=Object(r.a)(e,["children","innerRef"]),i=a.Children.only(t),s=o.isForwardRef(i)?u:l,p=i&&c&&Object.keys(c).length>0?a.cloneElement(i,c):i;return a.createElement(s,{innerRef:n},p)}},53:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(15),a=function(e,t){"function"!=typeof e?null!==e&&"object"===Object(r.a)(e)&&(e.current=t):e(t)}},54:function(e,t,n){"use strict";var r;r=n(221),e.exports=r.default,e.exports.instance=r.instance},89:function(e,t,n){"use strict";n.d(t,"a",(function(){return y}));var r=n(6),a=n(24),o=n(103),c=n(8),i=n(12),s=n(1),l=n.n(s),u=n(43),p=n(230),d=n(231),f=n(10),h=n(181),b=n(72),m=n(161);function v(e){var t=e.children,n=e.className,a=e.content,o=Object(i.a)("detail",n),c=Object(p.a)(v,e),s=Object(d.a)(v,e);return l.a.createElement(s,Object(r.a)({},c,{className:o}),f.a.isNil(t)?a:t)}v.handledProps=["as","children","className","content"],v.propTypes={},v.create=Object(h.e)(v,(function(e){return{content:e}}));var O=v;function g(e){var t=e.children,n=e.circular,a=e.className,o=e.color,c=e.content,s=e.size,h=e.tag,b=Object(i.a)("ui",o,s,Object(u.a)(n,"circular"),Object(u.a)(h,"tag"),"labels",a),m=Object(p.a)(g,e),v=Object(d.a)(g,e);return l.a.createElement(v,Object(r.a)({},m,{className:b}),f.a.isNil(t)?c:t)}g.handledProps=["as","children","circular","className","color","content","size","tag"],g.propTypes={};var j=g,y=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).handleClick=function(e){var n=t.props.onClick;n&&n(e,t.props)},t.handleIconOverrides=function(e){return{onClick:function(n){Object(c.a)(e,"onClick",n),Object(c.a)(t.props,"onRemove",n,t.props)}}},t}return Object(a.a)(t,e),t.prototype.render=function(){var e=this.props,n=e.active,a=e.attached,c=e.basic,s=e.children,h=e.circular,v=e.className,g=e.color,j=e.content,y=e.corner,E=e.detail,C=e.empty,w=e.floating,k=e.horizontal,T=e.icon,P=e.image,N=e.onRemove,M=e.pointing,S=e.prompt,R=e.removeIcon,D=e.ribbon,A=e.size,L=e.tag,x=(!0===M?"pointing":("left"===M||"right"===M)&&M+" pointing")||("above"===M||"below"===M)&&"pointing "+M,F=Object(i.a)("ui",g,x,A,Object(u.a)(n,"active"),Object(u.a)(c,"basic"),Object(u.a)(h,"circular"),Object(u.a)(C,"empty"),Object(u.a)(w,"floating"),Object(u.a)(k,"horizontal"),Object(u.a)(!0===P,"image"),Object(u.a)(S,"prompt"),Object(u.a)(L,"tag"),Object(u.b)(y,"corner"),Object(u.b)(D,"ribbon"),Object(u.c)(a,"attached"),"label",v),U=Object(p.a)(t,this.props),H=Object(d.a)(t,this.props);if(!f.a.isNil(s))return l.a.createElement(H,Object(r.a)({},U,{className:F,onClick:this.handleClick}),s);var I=Object(o.a)(R)?"delete":R;return l.a.createElement(H,Object(r.a)({className:F,onClick:this.handleClick},U),b.a.create(T,{autoGenerateKey:!1}),"boolean"!=typeof P&&m.a.create(P,{autoGenerateKey:!1}),j,O.create(E,{autoGenerateKey:!1}),N&&b.a.create(I,{autoGenerateKey:!1,overrideProps:this.handleIconOverrides}))},t}(s.Component);y.handledProps=["active","as","attached","basic","children","circular","className","color","content","corner","detail","empty","floating","horizontal","icon","image","onClick","onRemove","pointing","prompt","removeIcon","ribbon","size","tag"],y.propTypes={},y.Detail=O,y.Group=j,y.create=Object(h.e)(y,(function(e){return{content:e}}))}}]);
//# sourceMappingURL=vendors~livestream~mailchimp-opt-down-3ad0eb03.js.map