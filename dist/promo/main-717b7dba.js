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
(window.wpackioprcBlocksLibrarypromoJsonp=window.wpackioprcBlocksLibrarypromoJsonp||[]).push([[0],[function(e,t){e.exports=React},function(e,t){e.exports=wp.element},function(e,t){e.exports=wp.blockEditor},function(e,t){e.exports=wp.components},function(e,t){e.exports=wp.i18n},function(e,t,r){var n,c=r(7);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var a={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=c(r);if("string"===n||"number"===n)e.push(this&&this[r]||r);else if(Array.isArray(r))e.push(o.apply(this,r));else if("object"===n)for(var l in r)a.call(r,l)&&r[l]&&e.push(this&&this[l]||l)}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):"object"===c(r(6))&&r(6)?void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n):window.classNames=o}()},function(e,t){(function(t){e.exports=t}).call(this,{})},function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=r=function(e){return typeof e}:e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(t)}e.exports=r},function(e,t){e.exports=wp.blocks},function(e,t){e.exports=wp.data},function(e,t,r){var n,c=r(7);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var a={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=c(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)&&r.length){var l=o.apply(null,r);l&&e.push(l)}else if("object"===n)for(var i in r)a.call(r,i)&&r[i]&&e.push(i)}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):"object"===c(r(6))&&r(6)?void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n):window.classNames=o}()},function(e,t,r){r(12),e.exports=r(14)},function(e,t,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},function(e,t,r){},function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.r(t);var c=r(8),a=r(4),o=r(1);function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){if(null==e)return{};var r,n,c=function(e,t){if(null==e)return{};var r,n,c={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(c[r]=e[r]);return c}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(c[r]=e[r])}return c}var u=r(10),s=r.n(u);function M(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var N=Object(o.createElement)((function(e){var t=e.className,r=e.isPressed,n=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?M(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):M(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},i(e,["className","isPressed"]),{className:s()(t,{"is-pressed":r})||void 0,role:"img","aria-hidden":!0,focusable:!1});return Object(o.createElement)("svg",n)}),{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(o.createElement)((function(e){return Object(o.createElement)("path",e)}),{fillRule:"evenodd",d:"M6.863 13.644L5 13.25h-.5a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5H5L18 6.5h2V16h-2l-3.854-.815.026.008a3.75 3.75 0 01-7.31-1.549zm1.477.313a2.251 2.251 0 004.356.921l-4.356-.921zm-2.84-3.28L18.157 8h.343v6.5h-.343L5.5 11.823v-1.146z",clipRule:"evenodd"})),I=r(2),y=r(9),j=r(3),g=r(5),m=r.n(g);r(0);var p,D=function(e){var t=e.svg,r=e.sizeInPX;return React.createElement("img",{src:t,width:r,height:r})},b=function(e){var t=e.icon,r=function(){return React.createElement(D,{svg:"data:image/svg+xml;base64,PHN2ZyBpZD0iZWxlY3Rpb25faWNvbiIgd2lkdGg9Ijc0IiBoZWlnaHQ9IjU3IiB2aWV3Qm94PSIwIDAgNzQgNTciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8cGF0aCBkPSJNNS45ODkwNiAxMC40ODEyQzIuNjgxMzkgMTAuNDgxMiAwIDEzLjE3ODggMCAxNi41MDY1VjM0LjY1NTNDMCAzNy45ODMgMi42ODEzOSA0MC42ODA2IDUuOTg5MDUgNDAuNjgwNkgxMS4xNjkyTDguMzYzNjMgNTYuNjc0OEwyOS44NzI3IDQwLjY4MDZIMzUuNDc1NkMzOC43ODMyIDQwLjY4MDYgNDEuNDY0NiAzNy45ODMgNDEuNDY0NiAzNC42NTUzVjE2LjUwNjVDNDEuNDY0NiAxMy4xNzg4IDM4Ljc4MzIgMTAuNDgxMiAzNS40NzU2IDEwLjQ4MTJINS45ODkwNloiIGZpbGw9IiMzMTc4QTciLz4KCTxwYXRoIGQ9Ik02Ny41MDg3IDBDNzAuODE2NCAwIDczLjQ5NzggMi42OTc2MyA3My40OTc4IDYuMDI1MzJWMjQuMTc0MUM3My40OTc4IDI3LjUwMTggNzAuODE2NCAzMC4xOTk0IDY3LjUwODcgMzAuMTk5NEg2Mi4zMjg2TDY1LjEzNDEgNDYuMTkzNkw0My42MjUxIDMwLjE5OTRIMzguMDIyMkMzNC43MTQ1IDMwLjE5OTQgMzIuMDMzMSAyNy41MDE4IDMyLjAzMzEgMjQuMTc0MVY2LjAyNTMyQzMyLjAzMzEgMi42OTc2MyAzNC43MTQ1IDAgMzguMDIyMiAwSDY3LjUwODdaIiBmaWxsPSIjREE1NzFGIi8+Cgk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQxLjQ2NDYgMzAuMTk5M0gzOC4wMjI1QzM0LjcxNDggMzAuMTk5MyAzMi4wMzM0IDI3LjUwMTcgMzIuMDMzNCAyNC4xNzRWMTAuNDgxNEgzNS40NzU2QzM4Ljc4MzIgMTAuNDgxNCA0MS40NjQ2IDEzLjE3OTEgNDEuNDY0NiAxNi41MDY4VjMwLjE5OTNaIiBmaWxsPSIjNkIzNjM1Ii8+Cgk8cGF0aCBkPSJNNTIuNDIxMiA0Ljc5MzIxTDU0Ljg4MDggMTIuMzYzMkw2Mi44NDAzIDEyLjM2MzJMNTYuNDAwOSAxNy4wNDE3TDU4Ljg2MDUgMjQuNjExNkw1Mi40MjEyIDE5LjkzMzFMNDUuOTgxOCAyNC42MTE2TDQ4LjQ0MTQgMTcuMDQxN0w0Mi4wMDIgMTIuMzYzMkw0OS45NjE1IDEyLjM2MzJMNTIuNDIxMiA0Ljc5MzIxWiIgZmlsbD0id2hpdGUiLz4KCTxwYXRoIGQ9Ik0yMC43MzIzIDE0LjkyNjVMMjMuMTkxOSAyMi40OTY1TDMxLjE1MTQgMjIuNDk2NUwyNC43MTIgMjcuMTc1TDI3LjE3MTcgMzQuNzQ0OUwyMC43MzIzIDMwLjA2NjRMMTQuMjkyOSAzNC43NDQ5TDE2Ljc1MjUgMjcuMTc1TDEwLjMxMzEgMjIuNDk2NUwxOC4yNzI3IDIyLjQ5NjVMMjAuNzMyMyAxNC45MjY1WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+",sizeInPX:"45"})},n=function(){return React.createElement(D,{svg:"data:image/svg+xml;base64,PHN2ZyBpZD0ibmV3c2xldHRlcl9pY29uIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NSAzOSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNlZWVkZTQ7c3Ryb2tlLXdpZHRoOjAuMjVweDt9LmNscy0xLC5jbHMtMiwuY2xzLTMsLmNscy04e3N0cm9rZTojNmU2ZTcxO3N0cm9rZS1saW5lam9pbjpyb3VuZDt9LmNscy0ye2ZpbGw6I2RkZDljNztzdHJva2Utd2lkdGg6MC4yNHB4O30uY2xzLTMsLmNscy00e2ZpbGw6I2ZmZjt9LmNscy0ze3N0cm9rZS13aWR0aDowLjI1cHg7fS5jbHMtNSwuY2xzLTh7ZmlsbDpub25lO30uY2xzLTZ7ZmlsbDojZWE5ZTJjO30uY2xzLTd7ZmlsbDojYmI3YTJhO30uY2xzLTh7c3Ryb2tlLXdpZHRoOjAuMjJweDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkFydGJvYXJkIDE8L3RpdGxlPjxyZWN0IGNsYXNzPSJjbHMtMSIgeD0iMC41MiIgeT0iMTQuOTEiIHdpZHRoPSI0NCIgaGVpZ2h0PSIyMy40Ii8+PHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjQ0LjUxIDE0Ljg1IDIyLjUyIDEuMDEgMjIuNTIgMS4wMSAyMi41MiAxLjAxIDIyLjUxIDEuMDEgMjIuNTEgMS4wMSAwLjUyIDE0Ljg1IDE1LjUgMjQuNTUgMjIuNTIgMjQuNTUgMjkuNTQgMjQuNTUgNDQuNTEgMTQuODUiLz48bGluZSBjbGFzcz0iY2xzLTMiIHgxPSIxNS41IiB5MT0iMjQuNTUiIHgyPSIwLjU1IiB5Mj0iMzguMzEiLz48bGluZSBjbGFzcz0iY2xzLTMiIHgxPSIyOS42MyIgeTE9IjI0LjU1IiB4Mj0iNDQuNTgiIHkyPSIzOC4zMSIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtNCIgcG9pbnRzPSI3LjUxIDUuMTggNy41MSAxOS4zOCAxNS40NyAyNC41MyAyMi40OSAyNC41MyAyOS41MSAyNC41MyAzNy40NyAxOS4zOCAzNy40NyA1LjE4IDcuNTEgNS4xOCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtNSIgcG9pbnRzPSIyOS4xNSA1LjIxIDE1LjgyIDUuMjEgNy41IDUuMjEgNy41IDEwLjQ0IDcuNSAxOS4zOSAxNC4xNyAyMy43MSAxNC4xNyAxNi45OCAxOC43NSAxNi45OCAxOC43NSAyNC41NSAyMC4xOSAyNC41NSAyMC4xOSAxMC40MyAyNC43OCAxMC40MyAyNC43OCAyNC41NSAyNi4yMiAyNC41NSAyNi4yMiAxMy43NiAzMC44IDEzLjc2IDMwLjggMjMuNzEgMzcuNDcgMTkuMzkgMzcuNDcgMTAuNDQgMzcuNDcgNS4yMSAyOS4xNSA1LjIxIi8+PHBvbHlnb24gY2xhc3M9ImNscy02IiBwb2ludHM9IjE4Ljc1IDIzLjQ4IDE4Ljc1IDE2Ljk4IDE0LjE3IDE2Ljk4IDE0LjE3IDIyLjMzIDE1Ljg5IDIzLjQ4IDE4Ljc1IDIzLjQ4Ii8+PHJlY3QgY2xhc3M9ImNscy03IiB4PSIyMC4xOSIgeT0iMTAuNDMiIHdpZHRoPSI0LjU5IiBoZWlnaHQ9IjEzLjA0Ii8+PHBvbHlnb24gY2xhc3M9ImNscy02IiBwb2ludHM9IjMwLjggMjIuNCAzMC44IDEzLjc2IDI2LjIyIDEzLjc2IDI2LjIyIDIzLjQ3IDI5LjIxIDIzLjQ3IDMwLjggMjIuNCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtOCIgcG9pbnRzPSI3LjUxIDUuMTggNy41MSAxOS4zOCAxNS40NyAyNC41MyAyMi40OSAyNC41MyAyOS41MSAyNC41MyAzNy40NyAxOS4zOCAzNy40NyA1LjE4IDcuNTEgNS4xOCIvPjwvc3ZnPg==",sizeInPX:"45"})};return React.createElement(o.Fragment,null,"election"===t&&React.createElement(r,null),"mail"===t&&React.createElement(n,null))},d=["prc-block/button","prc-block/mailchimp-form","prc-blocks/pathways-ask-an-analyst"],z=function(e){var t=e.backgroundColor,r=e.borderColor,n=e.sansSerif,c=e.icon,o=e.setAttributes;return React.createElement(I.InspectorControls,null,React.createElement(j.PanelBody,{title:Object(a.__)("Promo Design Options")},React.createElement(j.PanelRow,null,React.createElement("p",null,React.createElement("strong",null,"Background Color:")),React.createElement(j.ColorPalette,{colors:[{name:"Oatmeal",color:"#F7F7F2"},{name:"Gray",color:"#F8F8F8"}],value:t,onChange:function(e){return o({backgroundColor:e})},disableCustomColors:!0})),React.createElement(j.PanelRow,null,React.createElement("p",null,React.createElement("strong",null,"Border Color:")),React.createElement(j.ColorPalette,{colors:[{name:"Oatmeal",color:"#E2E2E2"},{name:"Gray",color:"#D8D8D8"},{name:"Black",color:"#000"}],value:r,onChange:function(e){return o({borderColor:e})},disableCustomColors:!0})),React.createElement(j.PanelRow,null,React.createElement(j.SelectControl,{label:"Choose Icon",value:c,options:[{label:"None",value:""},{label:"Mail",value:"mail"},{label:"Election",value:"election"}],onChange:function(e){return o({icon:e})}})),React.createElement(j.PanelRow,null,React.createElement(j.ToggleControl,{label:"Sans Serif Font",checked:n,onChange:function(){return o({sansSerif:!n})}}))))},x=Object(y.withSelect)((function(e,t){var r=t.clientId;return{hasChildBlocks:0<(0,e("core/block-editor").getBlockOrder)(r).length}}))((function(e){var t=e.attributes,r=e.className,n=e.setAttributes,c=e.hasChildBlocks,a=e.isSelected,l=t.header,i=t.description,u=t.backgroundColor,s=t.borderColor,M=t.sansSerif,N=t.icon,y=m()(r),j=m()({"sans-serif":M});return React.createElement(o.Fragment,null,React.createElement(z,{bgColor:u,borderColor:s,sansSerif:M,icon:N,setAttributes:n}),React.createElement("div",{className:y,style:{borderColor:s,backgroundColor:u}},""!==N&&React.createElement("div",{className:"icon"},React.createElement(b,{icon:N})),React.createElement("div",{className:"text"},React.createElement(I.RichText,{tagName:"h2",value:l,onChange:function(e){return n({header:e})},placeholder:"Facts are more important than ever.",allowedFormats:["core/bold","core/italic"],keepPlaceholderOnFocus:!0,className:j}),React.createElement(I.RichText,{tagName:"div",value:i,onChange:function(e){return n({description:e})},placeholder:"In times of uncertainty, good decisions demand good data. Please support our research with a financial contribution.",multiline:"p",allowedFormats:["core/bold","core/italic"],keepPlaceholderOnFocus:!0,className:j})),React.createElement("div",{className:"action"},!0===a&&React.createElement(I.InnerBlocks,{allowedBlocks:d,renderAppender:c?void 0:function(){return React.createElement(I.InnerBlocks.ButtonBlockAppender,null)}}),!0!==a&&!0===c&&React.createElement(I.InnerBlocks,{allowedBlocks:d,renderAppender:!1}))))})),E=function(e){var t=e.attributes,r=e.className,n=t.header,c=t.description,a=t.bgColor,o=t.borderColor,l=t.icon,i=t.sansSerif,u=m()(r),s=m()({"sans-serif":i});return React.createElement("div",{className:u,style:{borderColor:o,backgroundColor:a}},""!==l&&React.createElement("div",{className:"icon"},React.createElement(b,{icon:l})),React.createElement("div",{className:"text"},React.createElement(I.RichText.Content,{tagName:"h2",value:n,className:s}),React.createElement(I.RichText.Content,{tagName:"div",value:c,className:s})),React.createElement("div",{className:"action"},React.createElement(I.InnerBlocks.Content,null)))},f=["prc-block/promo",{title:Object(a.__)("Promo"),icon:N,category:"widgets",keywords:[Object(a.__)("prc"),Object(a.__)("ad"),Object(a.__)("promo"),Object(a.__)("pancake")],styles:[{name:"",label:"Standard (Text Centered)",isDefault:!0},{name:"pancake",label:"Pancake (Text Horizontally Centered)"},{name:"pancake-stacked",label:"Pancake (Text Stacked)"},{name:"left-aligned",label:"Left Aligned (Mailchimp Promo)"}],supports:{html:!1},example:{attributes:{header:"Facts are more important than ever",description:"In times of uncertainty, good decisions demand good data. Please support our research with a financial contribution."},innerBlocks:[{name:"prc-block/button",attributes:{color:"#d3aa20",label:"DONATE",url:""}}]},attributes:{header:{type:"string",default:""},description:{type:"string",default:""},backgroundColor:{type:"string",default:""},borderColor:{type:"string",default:""},sansSerif:{type:"boolean",default:!1},icon:{type:"string",default:""}},edit:x,save:E}];r(13);c.registerBlockType.apply(void 0,function(e){if(Array.isArray(e))return n(e)}(p=f)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(p)||function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(p)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())}],[[11,1]]]);
//# sourceMappingURL=main-717b7dba.js.map