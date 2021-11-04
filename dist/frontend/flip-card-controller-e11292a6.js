/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.0.0
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2021 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[7],{1:function(t,e){t.exports=window.React},19:function(t,e){t.exports=window.wp.domReady},30:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n=r(42);var i=r(38),o=r(43);function a(t,e){return Object(n.a)(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,i,o=[],a=!0,c=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(o.push(n.value),!e||o.length!==e);a=!0);}catch(t){c=!0,i=t}finally{try{a||null==r.return||r.return()}finally{if(c)throw i}}return o}}(t,e)||Object(i.a)(t,e)||Object(o.a)()}},32:function(t,e,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},329:function(t,e,r){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var i in e=arguments[r])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)},i=this&&this.__createBinding||(Object.create?function(t,e,r,n){void 0===n&&(n=r),Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[r]}})}:function(t,e,r,n){void 0===n&&(n=r),t[n]=e[r]}),o=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),a=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)"default"!==r&&Object.hasOwnProperty.call(t,r)&&i(e,t,r);return o(e,t),e};Object.defineProperty(e,"__esModule",{value:!0});var c=a(r(1)),l=r(1),u=function(t){var e=t.cardStyles,r=e.back,i=e.front,o=t.cardZIndex,a=t.containerStyle,u=t.flipDirection,f=t.flipSpeedFrontToBack,d=t.flipSpeedBackToFront,s=t.infinite,p=l.useState(t.isFlipped),b=p[0],h=p[1],y=l.useState(0),m=y[0],v=y[1];l.useEffect((function(){t.isFlipped!==b&&(h(t.isFlipped),v((function(t){return t+180})))}),[t.isFlipped]);var k=function(e){if(2!==t.children.length)throw new Error("Component ReactCardFlip requires 2 children to function");return t.children[e]},w="rotateY("+(s?m:b?180:0)+"deg)",g="rotateX("+(s?m:b?180:0)+"deg)",S={back:n({WebkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden",height:"100%",left:"0",position:b?"relative":"absolute",top:"0",transform:"horizontal"===u?"rotateY("+(s?m+180:b?0:-180)+"deg)":"rotateX("+(s?m+180:b?0:-180)+"deg)",transformStyle:"preserve-3d",transition:f+"s",width:"100%"},r),container:{perspective:"1000px",zIndex:""+o},flipper:{height:"100%",position:"relative",width:"100%"},front:n({WebkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden",height:"100%",left:"0",position:b?"absolute":"relative",top:"0",transform:"horizontal"===u?w:g,transformStyle:"preserve-3d",transition:d+"s",width:"100%",zIndex:"2"},i)};return c.createElement("div",{className:"react-card-flip",style:n(n({},S.container),a)},c.createElement("div",{className:"react-card-flipper",style:S.flipper},c.createElement("div",{className:"react-card-front",style:S.front},k(0)),c.createElement("div",{className:"react-card-back",style:S.back},k(1))))};u.defaultProps={cardStyles:{back:{},front:{}},cardZIndex:"auto",containerStyle:{},flipDirection:"horizontal",flipSpeedBackToFront:.6,flipSpeedFrontToBack:.6,infinite:!1,isFlipped:!1},e.default=u},34:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,"a",(function(){return n}))},38:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(34);function i(t,e){if(t){if("string"==typeof t)return Object(n.a)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(t,e):void 0}}},42:function(t,e,r){"use strict";function n(t){if(Array.isArray(t))return t}r.d(e,"a",(function(){return n}))},43:function(t,e,r){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(e,"a",(function(){return n}))},503:function(t,e,r){r(32),t.exports=r(528)},528:function(t,e,r){"use strict";r.r(e);var n=r(30),i=r(329),o=r.n(i),a=r(19),c=r.n(a),l=r(9),u=function(t){var e=t.front,r=t.back,i=t.height,a=t.borderColor,c=t.backgroundColor,u=Object(l.useState)(!1),f=Object(n.a)(u,2),d=f[0],s=f[1];return React.createElement("div",{onClick:function(){s(!d)}},React.createElement(o.a,{isFlipped:d,flipDirection:"horizontal"},React.createElement("div",{className:"flip-card-front",style:{backgroundColor:c,borderColor:a,minHeight:"".concat(i,"px")}},React.createElement(l.RawHTML,null,e)),React.createElement("div",{className:"flip-card-back",style:{backgroundColor:c,borderColor:a,minHeight:"".concat(i,"px")}},React.createElement(l.RawHTML,null,r))))};c()((function(){document.querySelector(".wp-block-prc-block-flip-card")&&document.querySelectorAll(".wp-block-prc-block-flip-card").forEach((function(t){var e=t.querySelector(".wp-block-prc-block-flip-card-front"),r=t.querySelector(".wp-block-prc-block-flip-card-back"),n={front:e.innerHTML,back:r.innerHTML,height:t.getAttribute("data-height"),borderColor:t.getAttribute("data-border"),backgroundColor:t.getAttribute("data-bg")};Object(l.render)(React.createElement(u,n),t)}))}))},9:function(t,e){t.exports=window.wp.element}},[[503,0]]]);
//# sourceMappingURL=flip-card-controller-e11292a6.js.map