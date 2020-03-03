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
(window["wpackioprcBlocksLibrarypancake-promoJsonp"]=window["wpackioprcBlocksLibrarypancake-promoJsonp"]||[]).push([[0],[function(t,e){t.exports=wp.i18n},function(t,e){t.exports=React},function(t,e){t.exports=wp.blockEditor},function(t,e,M){var i,c=M(9);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var a={}.hasOwnProperty;function n(){for(var t=[],e=0;e<arguments.length;e++){var M=arguments[e];if(M){var i=c(M);if("string"===i||"number"===i)t.push(this&&this[M]||M);else if(Array.isArray(M))t.push(n.apply(this,M));else if("object"===i)for(var N in M)a.call(M,N)&&M[N]&&t.push(this&&this[N]||N)}}return t.join(" ")}t.exports?(n.default=n,t.exports=n):"object"===c(M(4))&&M(4)?void 0===(i=function(){return n}.apply(e,[]))||(t.exports=i):window.classNames=n}()},function(t,e){(function(e){t.exports=e}).call(this,{})},function(t,e){t.exports=wp.blocks},function(t,e,M){M(7),t.exports=M(10)},function(t,e,M){"use strict";var i="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");M.p=window["__wpackIo".concat(i)]},function(t,e,M){},function(t,e){function M(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=M=function(t){return typeof t}:t.exports=M=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},M(e)}t.exports=M},function(t,e,M){"use strict";M.r(e);M(8);var i=M(0),c=M(5),a=M(2),n=M(3),N=M.n(n);M(1);var r=function(t){var e=t.svg,M=t.sizeInPX;return React.createElement("img",{src:e,width:M,height:M})};Object(c.registerBlockType)("prc-block/promo-pancake",{title:Object(i.__)("Pancake Promo"),icon:"format-aside",category:"widgets",keywords:[Object(i.__)("prc"),Object(i.__)("ad"),Object(i.__)("promo"),Object(i.__)("pancake")],styles:[{name:"oatmeal",label:"Oatmeal",isDefault:!0},{name:"white",label:"White"}],supports:{html:!1},attributes:{icon_url:{type:"string",source:"attribute",selector:"img",attribute:"src",default:"data:image/svg+xml;base64,PHN2ZyBpZD0iZWxlY3Rpb25faWNvbiIgd2lkdGg9Ijc0IiBoZWlnaHQ9IjU3IiB2aWV3Qm94PSIwIDAgNzQgNTciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8cGF0aCBkPSJNNS45ODkwNiAxMC40ODEyQzIuNjgxMzkgMTAuNDgxMiAwIDEzLjE3ODggMCAxNi41MDY1VjM0LjY1NTNDMCAzNy45ODMgMi42ODEzOSA0MC42ODA2IDUuOTg5MDUgNDAuNjgwNkgxMS4xNjkyTDguMzYzNjMgNTYuNjc0OEwyOS44NzI3IDQwLjY4MDZIMzUuNDc1NkMzOC43ODMyIDQwLjY4MDYgNDEuNDY0NiAzNy45ODMgNDEuNDY0NiAzNC42NTUzVjE2LjUwNjVDNDEuNDY0NiAxMy4xNzg4IDM4Ljc4MzIgMTAuNDgxMiAzNS40NzU2IDEwLjQ4MTJINS45ODkwNloiIGZpbGw9IiMzMTc4QTciLz4KCTxwYXRoIGQ9Ik02Ny41MDg3IDBDNzAuODE2NCAwIDczLjQ5NzggMi42OTc2MyA3My40OTc4IDYuMDI1MzJWMjQuMTc0MUM3My40OTc4IDI3LjUwMTggNzAuODE2NCAzMC4xOTk0IDY3LjUwODcgMzAuMTk5NEg2Mi4zMjg2TDY1LjEzNDEgNDYuMTkzNkw0My42MjUxIDMwLjE5OTRIMzguMDIyMkMzNC43MTQ1IDMwLjE5OTQgMzIuMDMzMSAyNy41MDE4IDMyLjAzMzEgMjQuMTc0MVY2LjAyNTMyQzMyLjAzMzEgMi42OTc2MyAzNC43MTQ1IDAgMzguMDIyMiAwSDY3LjUwODdaIiBmaWxsPSIjREE1NzFGIi8+Cgk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQxLjQ2NDYgMzAuMTk5M0gzOC4wMjI1QzM0LjcxNDggMzAuMTk5MyAzMi4wMzM0IDI3LjUwMTcgMzIuMDMzNCAyNC4xNzRWMTAuNDgxNEgzNS40NzU2QzM4Ljc4MzIgMTAuNDgxNCA0MS40NjQ2IDEzLjE3OTEgNDEuNDY0NiAxNi41MDY4VjMwLjE5OTNaIiBmaWxsPSIjNkIzNjM1Ii8+Cgk8cGF0aCBkPSJNNTIuNDIxMiA0Ljc5MzIxTDU0Ljg4MDggMTIuMzYzMkw2Mi44NDAzIDEyLjM2MzJMNTYuNDAwOSAxNy4wNDE3TDU4Ljg2MDUgMjQuNjExNkw1Mi40MjEyIDE5LjkzMzFMNDUuOTgxOCAyNC42MTE2TDQ4LjQ0MTQgMTcuMDQxN0w0Mi4wMDIgMTIuMzYzMkw0OS45NjE1IDEyLjM2MzJMNTIuNDIxMiA0Ljc5MzIxWiIgZmlsbD0id2hpdGUiLz4KCTxwYXRoIGQ9Ik0yMC43MzIzIDE0LjkyNjVMMjMuMTkxOSAyMi40OTY1TDMxLjE1MTQgMjIuNDk2NUwyNC43MTIgMjcuMTc1TDI3LjE3MTcgMzQuNzQ0OUwyMC43MzIzIDMwLjA2NjRMMTQuMjkyOSAzNC43NDQ5TDE2Ljc1MjUgMjcuMTc1TDEwLjMxMzEgMjIuNDk2NUwxOC4yNzI3IDIyLjQ5NjVMMjAuNzMyMyAxNC45MjY1WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+"},content:{type:"string",source:"html",selector:".sans-serif",default:"EMPTY TEXT"}},edit:function(t){var e=N()(t.className,"pancake");return React.createElement("div",{className:e},React.createElement(r,{svg:t.attributes.icon_url,sizeInPX:"45"}),React.createElement(a.RichText,{tagName:"div",value:t.attributes.content,onChange:function(e){return t.setAttributes({content:e})},placeholder:t.attributes.content,className:"sans-serif"}))},save:function(t){var e=N()(t.className,"pancake");return React.createElement("div",{className:e},React.createElement(r,{svg:t.attributes.icon_url,sizeInPX:"45"}),React.createElement(a.RichText.Content,{tagName:"div",value:t.attributes.content,className:"sans-serif"}))}})}],[[6,1]]]);
//# sourceMappingURL=main-9cf29971.js.map