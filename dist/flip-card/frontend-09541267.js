/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
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
(window["wpackioprcBlocksLibraryflip-cardJsonp"]=window["wpackioprcBlocksLibraryflip-cardJsonp"]||[]).push([[1],[function(e,t){e.exports=wp.element},,,,function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,"a",(function(){return n}))},,function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r(4);function i(e,t){if(e){if("string"==typeof e)return Object(n.a)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(e,t):void 0}}},,,,,function(e,t,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},,function(e,t){e.exports=React},,function(e,t){e.exports=wp.domReady},function(e,t,r){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},i=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&i(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});var c=a(r(13)),l=r(13),u=function(e){var t=e.cardStyles,r=t.back,i=t.front,o=e.cardZIndex,a=e.containerStyle,u=e.flipDirection,f=e.flipSpeedFrontToBack,d=e.flipSpeedBackToFront,s=e.infinite,p=l.useState(e.isFlipped),b=p[0],h=p[1],y=l.useState(0),m=y[0],v=y[1];l.useEffect((function(){e.isFlipped!==b&&(h(e.isFlipped),v((function(e){return e+180})))}),[e.isFlipped]);var k=function(t){if(2!==e.children.length)throw new Error("Component ReactCardFlip requires 2 children to function");return e.children[t]},g="rotateY("+(s?m:b?180:0)+"deg)",w="rotateX("+(s?m:b?180:0)+"deg)",S={back:n({WebkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden",height:"100%",left:"0",position:b?"relative":"absolute",top:"0",transform:"horizontal"===u?"rotateY("+(s?m+180:b?0:-180)+"deg)":"rotateX("+(s?m+180:b?0:-180)+"deg)",transformStyle:"preserve-3d",transition:f+"s",width:"100%"},r),container:{perspective:"1000px",zIndex:""+o},flipper:{height:"100%",position:"relative",width:"100%"},front:n({WebkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden",height:"100%",left:"0",position:b?"absolute":"relative",top:"0",transform:"horizontal"===u?g:w,transformStyle:"preserve-3d",transition:d+"s",width:"100%",zIndex:"2"},i)};return c.createElement("div",{className:"react-card-flip",style:n(n({},S.container),a)},c.createElement("div",{className:"react-card-flipper",style:S.flipper},c.createElement("div",{className:"react-card-front",style:S.front},k(0)),c.createElement("div",{className:"react-card-back",style:S.back},k(1))))};u.defaultProps={cardStyles:{back:{},front:{}},cardZIndex:"auto",containerStyle:{},flipDirection:"horizontal",flipSpeedBackToFront:.6,flipSpeedFrontToBack:.6,infinite:!1,isFlipped:!1},t.default=u},,,,function(e,t,r){r(11),e.exports=r(23)},function(e,t,r){},,function(e,t,r){"use strict";r.r(t);var n=r(6);function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,i=!1,o=void 0;try{for(var a,c=e[Symbol.iterator]();!(n=(a=c.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,o=e}finally{try{n||null==c.return||c.return()}finally{if(i)throw o}}return r}}(e,t)||Object(n.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var o=r(15),a=r.n(o),c=r(0),l=r(16),u=r.n(l),f=(r(21),function(e){var t=e.front,r=e.back,n=e.height,o=e.borderColor,a=e.backgroundColor,l=i(Object(c.useState)(!1),2),f=l[0],d=l[1];return React.createElement("div",{onClick:function(){d(!f)}},React.createElement(u.a,{isFlipped:f,flipDirection:"horizontal"},React.createElement("div",{className:"flip-card-front",style:{backgroundColor:a,borderColor:o,minHeight:"".concat(n,"px")}},React.createElement(c.RawHTML,null,t)),React.createElement("div",{className:"flip-card-back",style:{backgroundColor:a,borderColor:o,minHeight:"".concat(n,"px")}},React.createElement(c.RawHTML,null,r))))});a()((function(){document.querySelector(".wp-block-prc-block-flip-card")&&document.querySelectorAll(".wp-block-prc-block-flip-card").forEach((function(e){var t=e.querySelector(".wp-block-prc-block-flip-card-front"),r=e.querySelector(".wp-block-prc-block-flip-card-back"),n={front:t.innerHTML,back:r.innerHTML,height:e.getAttribute("data-height"),borderColor:e.getAttribute("data-border"),backgroundColor:e.getAttribute("data-bg")};Object(c.render)(React.createElement(f,n),e)}))}))}],[[20,0]]]);
//# sourceMappingURL=frontend-09541267.js.map