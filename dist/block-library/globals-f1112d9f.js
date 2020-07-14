/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2020 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window["wpackioprcBlocksLibraryblock-libraryJsonp"]=window["wpackioprcBlocksLibraryblock-libraryJsonp"]||[]).push([[0],[function(t,r){t.exports=jQuery},function(t,r){t.exports=wp.domReady},function(t,r,n){n(3),t.exports=n(4)},function(t,r,n){"use strict";var e="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(e)]},function(t,r,n){"use strict";n.r(r);var e=n(1),o=n.n(e),i=n(0),a=n.n(i);function c(t){if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=function(t,r){if(!t)return;if("string"==typeof t)return l(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(t,r)}(t))){var r=0,n=function(){};return{s:n,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var e,o,i=!0,a=!1;return{s:function(){e=t[Symbol.iterator]()},n:function(){var t=e.next();return i=t.done,t},e:function(t){a=!0,o=t},f:function(){try{i||null==e.return||e.return()}finally{if(a)throw o}}}}function l(t,r){(null==r||r>t.length)&&(r=t.length);for(var n=0,e=new Array(r);n<r;n++)e[n]=t[n];return e}var s=function(){if((0,wp.data.select("core/viewport").isViewportMatch)("< medium")){var t=document.querySelectorAll(".prc-collapsible-list");if(void 0!==t){var r,n=c(t);try{var e=function(){var t=r.value,n=t.querySelector(".content"),e=t.querySelector(".title");if(null==e)return"continue";var o=e.querySelector("a");if(null!==o){var i=o.getAttribute("href");e.querySelector("h2").innerHTML=o.innerHTML;var c=document.createElement("a");c.innerHTML="View all ".concat(o.innerHTML," publications"),c.setAttribute("href",i),c.classList.add("sans-serif"),n.prepend(c),o.remove()}e.addEventListener("click",(function(t){t.stopPropagation();var r=n.style.display,o=e.querySelector(".icon.caret");"block"===r?(a()(n).transition("".concat("fade"," up")),o.classList.contains("right")&&(o.classList.add("down"),o.classList.remove("right"))):(a()(n).transition("".concat("fade"," down")),o.classList.contains("down")&&(o.classList.add("right"),o.classList.remove("down")))}))};for(n.s();!(r=n.n()).done;)e()}catch(t){n.e(t)}finally{n.f()}}}};o()((function(){setTimeout((function(){s()}),1e3)}))}],[[2,1]]]);
//# sourceMappingURL=globals-f1112d9f.js.map