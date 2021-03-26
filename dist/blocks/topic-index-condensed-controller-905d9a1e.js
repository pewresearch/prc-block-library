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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[25],{0:function(e,t){e.exports=wp.element},1:function(e,t){e.exports=wp.i18n},11:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},12:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(22);function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,c=void 0;try{for(var i,l=e[Symbol.iterator]();!(r=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,c=e}finally{try{r||null==l.return||l.return()}finally{if(o)throw c}}return n}}(e,t)||Object(r.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},14:function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=n=function(e){return typeof e}:e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(t)}e.exports=n},147:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-controller","category":"layout","attributes":{"active":{"type":"string","default":null}},"providesContext":{"prc-block/topic-index-condensed-active":"active"},"supports":{"html":false,"align":false}}')},15:function(e,t){(function(t){e.exports=t}).call(this,{})},16:function(e,t,n){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},2:function(e,t){e.exports=wp.components},22:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(11);function o(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},263:function(e,t,n){n(16),e.exports=n(293)},293:function(e,t,n){"use strict";n.r(t);var r=n(5),o=n(6),c=n(1),i=n(147),l=n(12),a=n(8),u=n.n(a),s=n(0),p=n(3),f=n(2),b=n(7),d=[["prc-block/topic-index-condensed-menu",{}],["prc-block/topic-index-condensed-pages",{}]],y=["prc-block/topic-index-condensed-menu","prc-block/topic-index-condensed-pages"],m=function(e){var t=e.className,n=e.clientId,r=(e.setAttributes,Object(s.useState)(!1)),o=Object(l.a)(r,2),i=o[0],a=o[1],m=Object(p.useBlockProps)({className:u()(t,"ui divided grid")}),O=Object(p.__experimentalUseInnerBlocksProps)(m,{allowedBlocks:y,renderAppender:!1,template:d,templateLock:"all"}),v=Object(b.useSelect)((function(e){var t=e("core/block-editor").getBlocks(n),r=1<=t.length?t.filter((function(e){return"prc-block/topic-index-condensed-menu"===e.name})):[],o=1<=t.length?t.filter((function(e){return"prc-block/topic-index-condensed-pages"===e.name})):[];return{menuBlocks:1<=r.length&&r[0].innerBlocks,pageBlocks:1<=o.length&&o[0].innerBlocks}})),g=v.menuBlocks,j=v.pageBlocks;return Object(s.useEffect)((function(){if(g.length<i.length){var e=(r=g,o=function(e){return function(t){return 0===e.filter((function(e){return e.attributes.uuid===t.attributes.uuid})).length}},c=(n=i).filter(o(r)),l=r.filter(o(n)),c.concat(l)),t=j.filter((function(t){return t.attributes.uuid===e[0].attributes.uuid}));Object(b.dispatch)("core/block-editor").removeBlock(t[0].clientId)}var n,r,o,c,l;a(g)}),[g]),React.createElement(s.Fragment,null,React.createElement(p.BlockControls,null),React.createElement(p.InspectorControls,null,React.createElement(f.PanelBody,{title:Object(c.__)("Controller Settings")},React.createElement(s.Fragment,null,"Controller Settings"))),React.createElement("div",{className:"ui container"},React.createElement("div",O)))},O=function(){return React.createElement(p.InnerBlocks.Content,null)};function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var j=i.name,k={title:Object(c.__)("Topic Index - Condensed View"),description:Object(c.__)('The condensed, or "schwoopy" version of the topic index.'),keywords:[Object(c.__)("Topics"),Object(c.__)("Topic"),Object(c.__)("Index"),Object(c.__)("Schwoopy")],edit:m,save:O};Object(o.registerBlockType)(j,g(g({},i),k))},3:function(e,t){e.exports=wp.blockEditor},5:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},6:function(e,t){e.exports=wp.blocks},7:function(e,t){e.exports=wp.data},8:function(e,t,n){var r,o=n(14);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=o(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)&&n.length){var l=i.apply(null,n);l&&e.push(l)}else if("object"===r)for(var a in n)c.call(n,a)&&n[a]&&e.push(a)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===o(n(15))&&n(15)?void 0===(r=function(){return i}.apply(t,[]))||(e.exports=r):window.classNames=i}()}},[[263,0]]]);
//# sourceMappingURL=topic-index-condensed-controller-905d9a1e.js.map