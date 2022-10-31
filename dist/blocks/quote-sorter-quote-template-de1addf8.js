/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.17
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[50],{11:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,"a",(function(){return n}))},12:function(t,e,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},15:function(t,e){function r(e){return t.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,r(e)}t.exports=r,t.exports.__esModule=!0,t.exports.default=t.exports},17:function(t,e,r){var n,o=r(15);
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function u(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var n=o(r);if("string"===n||"number"===n)t.push(r);else if(Array.isArray(r)){if(r.length){var i=u.apply(null,r);i&&t.push(i)}}else if("object"===n){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){t.push(r.toString());continue}for(var a in r)c.call(r,a)&&r[a]&&t.push(a)}}}return t.join(" ")}t.exports?(u.default=u,t.exports=u):"object"===o(r(19))&&r(19)?void 0===(n=function(){return u}.apply(e,[]))||(t.exports=n):window.classNames=u}()},18:function(t,e,r){"use strict";r.d(e,"a",(function(){return u}));var n=r(23);var o=r(20),c=r(24);function u(t,e){return Object(n.a)(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,c=[],u=!0,i=!1;try{for(r=r.call(t);!(u=(n=r.next()).done)&&(c.push(n.value),!e||c.length!==e);u=!0);}catch(t){i=!0,o=t}finally{try{u||null==r.return||r.return()}finally{if(i)throw o}}return c}}(t,e)||Object(o.a)(t,e)||Object(c.a)()}},19:function(t,e){(function(e){t.exports=e}).call(this,{})},2:function(t,e){t.exports=window.wp.i18n},20:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(11);function o(t,e){if(t){if("string"==typeof t)return Object(n.a)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(t,e):void 0}}},23:function(t,e,r){"use strict";function n(t){if(Array.isArray(t))return t}r.d(e,"a",(function(){return n}))},24:function(t,e,r){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(e,"a",(function(){return n}))},278:function(t,e,r){var n,o,c,u,i;n=r(933),o=r(540).utf8,c=r(934),u=r(540).bin,(i=function t(e,r){e.constructor==String?e=r&&"binary"===r.encoding?u.stringToBytes(e):o.stringToBytes(e):c(e)?e=Array.prototype.slice.call(e,0):Array.isArray(e)||e.constructor===Uint8Array||(e=e.toString());for(var i=n.bytesToWords(e),a=8*e.length,s=1732584193,l=-271733879,f=-1732584194,p=271733878,b=0;b<i.length;b++)i[b]=16711935&(i[b]<<8|i[b]>>>24)|4278255360&(i[b]<<24|i[b]>>>8);i[a>>>5]|=128<<a%32,i[14+(a+64>>>9<<4)]=a;var d=t._ff,y=t._gg,h=t._hh,g=t._ii;for(b=0;b<i.length;b+=16){var m=s,v=l,O=f,w=p;s=d(s,l,f,p,i[b+0],7,-680876936),p=d(p,s,l,f,i[b+1],12,-389564586),f=d(f,p,s,l,i[b+2],17,606105819),l=d(l,f,p,s,i[b+3],22,-1044525330),s=d(s,l,f,p,i[b+4],7,-176418897),p=d(p,s,l,f,i[b+5],12,1200080426),f=d(f,p,s,l,i[b+6],17,-1473231341),l=d(l,f,p,s,i[b+7],22,-45705983),s=d(s,l,f,p,i[b+8],7,1770035416),p=d(p,s,l,f,i[b+9],12,-1958414417),f=d(f,p,s,l,i[b+10],17,-42063),l=d(l,f,p,s,i[b+11],22,-1990404162),s=d(s,l,f,p,i[b+12],7,1804603682),p=d(p,s,l,f,i[b+13],12,-40341101),f=d(f,p,s,l,i[b+14],17,-1502002290),s=y(s,l=d(l,f,p,s,i[b+15],22,1236535329),f,p,i[b+1],5,-165796510),p=y(p,s,l,f,i[b+6],9,-1069501632),f=y(f,p,s,l,i[b+11],14,643717713),l=y(l,f,p,s,i[b+0],20,-373897302),s=y(s,l,f,p,i[b+5],5,-701558691),p=y(p,s,l,f,i[b+10],9,38016083),f=y(f,p,s,l,i[b+15],14,-660478335),l=y(l,f,p,s,i[b+4],20,-405537848),s=y(s,l,f,p,i[b+9],5,568446438),p=y(p,s,l,f,i[b+14],9,-1019803690),f=y(f,p,s,l,i[b+3],14,-187363961),l=y(l,f,p,s,i[b+8],20,1163531501),s=y(s,l,f,p,i[b+13],5,-1444681467),p=y(p,s,l,f,i[b+2],9,-51403784),f=y(f,p,s,l,i[b+7],14,1735328473),s=h(s,l=y(l,f,p,s,i[b+12],20,-1926607734),f,p,i[b+5],4,-378558),p=h(p,s,l,f,i[b+8],11,-2022574463),f=h(f,p,s,l,i[b+11],16,1839030562),l=h(l,f,p,s,i[b+14],23,-35309556),s=h(s,l,f,p,i[b+1],4,-1530992060),p=h(p,s,l,f,i[b+4],11,1272893353),f=h(f,p,s,l,i[b+7],16,-155497632),l=h(l,f,p,s,i[b+10],23,-1094730640),s=h(s,l,f,p,i[b+13],4,681279174),p=h(p,s,l,f,i[b+0],11,-358537222),f=h(f,p,s,l,i[b+3],16,-722521979),l=h(l,f,p,s,i[b+6],23,76029189),s=h(s,l,f,p,i[b+9],4,-640364487),p=h(p,s,l,f,i[b+12],11,-421815835),f=h(f,p,s,l,i[b+15],16,530742520),s=g(s,l=h(l,f,p,s,i[b+2],23,-995338651),f,p,i[b+0],6,-198630844),p=g(p,s,l,f,i[b+7],10,1126891415),f=g(f,p,s,l,i[b+14],15,-1416354905),l=g(l,f,p,s,i[b+5],21,-57434055),s=g(s,l,f,p,i[b+12],6,1700485571),p=g(p,s,l,f,i[b+3],10,-1894986606),f=g(f,p,s,l,i[b+10],15,-1051523),l=g(l,f,p,s,i[b+1],21,-2054922799),s=g(s,l,f,p,i[b+8],6,1873313359),p=g(p,s,l,f,i[b+15],10,-30611744),f=g(f,p,s,l,i[b+6],15,-1560198380),l=g(l,f,p,s,i[b+13],21,1309151649),s=g(s,l,f,p,i[b+4],6,-145523070),p=g(p,s,l,f,i[b+11],10,-1120210379),f=g(f,p,s,l,i[b+2],15,718787259),l=g(l,f,p,s,i[b+9],21,-343485551),s=s+m>>>0,l=l+v>>>0,f=f+O>>>0,p=p+w>>>0}return n.endian([s,l,f,p])})._ff=function(t,e,r,n,o,c,u){var i=t+(e&r|~e&n)+(o>>>0)+u;return(i<<c|i>>>32-c)+e},i._gg=function(t,e,r,n,o,c,u){var i=t+(e&n|r&~n)+(o>>>0)+u;return(i<<c|i>>>32-c)+e},i._hh=function(t,e,r,n,o,c,u){var i=t+(e^r^n)+(o>>>0)+u;return(i<<c|i>>>32-c)+e},i._ii=function(t,e,r,n,o,c,u){var i=t+(r^(e|~n))+(o>>>0)+u;return(i<<c|i>>>32-c)+e},i._blocksize=16,i._digestsize=16,t.exports=function(t,e){if(null==t)throw new Error("Illegal argument "+t);var r=n.wordsToBytes(i(t,e));return e&&e.asBytes?r:e&&e.asString?u.bytesToString(r):n.bytesToHex(r)}},29:function(t,e){t.exports=window.wp.apiFetch},3:function(t,e){t.exports=window.wp.components},371:function(t){t.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/quote-sorter-quote-template","title":"Quote Sorter - Quote Template","icon":"list-view","description":"Template for quotes in the Quote Sorter block. Preview shows up to 10 quotes.","category":"layout","attributes":{"style":{"type":"object","default":{"color":{"background":"#ffffff","text":"#2a2a2a"},"typography":{"fontSize":16,"lineHeight":1.5},"align":"center"}},"includeQuoteArt":{"type":"boolean","default":true},"noResultsMessage":{"type":"string","default":"No results found. Please try another search."}},"styles":[{"name":"block","label":"Block","isDefault":true},{"name":"columns","label":"Columns"}],"supports":{"align":true,"color":{"background":true,"text":true},"__experimentalBorder":{"color":true,"width":true},"html":false,"reusable":false,"spacing":{"padding":true,"margin":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true}},"usesContext":["prc-block/quote-sorter-hash"],"ancestor":["prc-block/quote-sorter"],"providesContext":{"prc-block/quote-sorter/art":"includeQuoteArt"}}')},4:function(t,e){t.exports=window.wp.element},43:function(t,e,r){"use strict";r.d(e,"a",(function(){return u}));var n=r(11);var o=r(44),c=r(20);function u(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||Object(o.a)(t)||Object(c.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},44:function(t,e,r){"use strict";function n(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}r.d(e,"a",(function(){return n}))},5:function(t,e){t.exports=window.wp.blockEditor},540:function(t,e){var r={utf8:{stringToBytes:function(t){return r.bin.stringToBytes(unescape(encodeURIComponent(t)))},bytesToString:function(t){return decodeURIComponent(escape(r.bin.bytesToString(t)))}},bin:{stringToBytes:function(t){for(var e=[],r=0;r<t.length;r++)e.push(255&t.charCodeAt(r));return e},bytesToString:function(t){for(var e=[],r=0;r<t.length;r++)e.push(String.fromCharCode(t[r]));return e.join("")}}};t.exports=r},7:function(t,e){t.exports=window.wp.blocks},8:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},9:function(t,e){t.exports=window.wp.data},932:function(t,e,r){r(12),t.exports=r(990)},933:function(t,e){var r,n;r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n={rotl:function(t,e){return t<<e|t>>>32-e},rotr:function(t,e){return t<<32-e|t>>>e},endian:function(t){if(t.constructor==Number)return 16711935&n.rotl(t,8)|4278255360&n.rotl(t,24);for(var e=0;e<t.length;e++)t[e]=n.endian(t[e]);return t},randomBytes:function(t){for(var e=[];t>0;t--)e.push(Math.floor(256*Math.random()));return e},bytesToWords:function(t){for(var e=[],r=0,n=0;r<t.length;r++,n+=8)e[n>>>5]|=t[r]<<24-n%32;return e},wordsToBytes:function(t){for(var e=[],r=0;r<32*t.length;r+=8)e.push(t[r>>>5]>>>24-r%32&255);return e},bytesToHex:function(t){for(var e=[],r=0;r<t.length;r++)e.push((t[r]>>>4).toString(16)),e.push((15&t[r]).toString(16));return e.join("")},hexToBytes:function(t){for(var e=[],r=0;r<t.length;r+=2)e.push(parseInt(t.substr(r,2),16));return e},bytesToBase64:function(t){for(var e=[],n=0;n<t.length;n+=3)for(var o=t[n]<<16|t[n+1]<<8|t[n+2],c=0;c<4;c++)8*n+6*c<=8*t.length?e.push(r.charAt(o>>>6*(3-c)&63)):e.push("=");return e.join("")},base64ToBytes:function(t){t=t.replace(/[^A-Z0-9+\/]/gi,"");for(var e=[],n=0,o=0;n<t.length;o=++n%4)0!=o&&e.push((r.indexOf(t.charAt(n-1))&Math.pow(2,-2*o+8)-1)<<2*o|r.indexOf(t.charAt(n))>>>6-2*o);return e}},t.exports=n},934:function(t,e){function r(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
t.exports=function(t){return null!=t&&(r(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&r(t.slice(0,0))}(t)||!!t._isBuffer)}},990:function(t,e,r){"use strict";r.r(e);var n=r(8),o=r(2),c=r(7),u=r(371),i=r(43),a=r(18),s=r(278),l=r.n(s),f=(r(17),r(4)),p=r(9),b=r(5),d=r(3),y=r(29),h=r.n(y);var g=function(t){var e=t.attributes,r=t.setAttributes;return React.createElement(f.Fragment,null,React.createElement(b.InspectorControls,null,React.createElement(d.PanelBody,{title:Object(o.__)("Quote Wall Layout")},React.createElement(d.ToggleControl,{label:Object(o.__)("Include quote art"),help:Object(o.__)("Adds stylized quote icon to first quote."),checked:e.includeQuoteArt,onChange:function(){return r({includeQuoteArt:!e.includeQuoteArt})}}),React.createElement(d.TextareaControl,{label:Object(o.__)("No results message"),help:Object(o.__)("This is the message displayed when a search query produces no results."),value:e.noResultsMessage,onChange:function(t){return r({noResultsMessage:t})}}))),React.createElement(b.InspectorAdvancedControls,null))},m=[["prc-block/quote-sorter-quote-text"],["prc-block/quote-sorter-quote-attribution"]];function v(){var t=Object(b.useInnerBlocksProps)({className:"wp-block-prc-block-quote"},{template:m});return React.createElement("div",t)}var O=Object(f.memo)((function(t){var e=t.blocks,r=t.blockContextId,n=t.isHidden,o=t.setActiveBlockContextId,c=Object(b.__experimentalUseBlockPreview)({blocks:e,props:{className:"wp-block-prc-block-quote"}}),u=function(){o(r)},i={display:n?"none":void 0};return React.createElement("div",Object.assign({},c,{tabIndex:0,role:"button",onClick:u,onKeyPress:u,style:i}))}));var w=function(){return React.createElement(b.InnerBlocks.Content,null)};function j(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function x(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?j(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var k=u.name,S={edit:function(t){var e=t.clientId,r=t.context,n=t.attributes,c=t.setAttributes,u=r["prc-block/quote-sorter-hash"],s=Object(f.useState)(null),y=Object(a.a)(s,2),m=y[0],w=y[1],j=Object(f.useState)(!1),x=Object(a.a)(j,2),k=x[0],S=x[1],_=Object(f.useState)(null),A=Object(a.a)(_,2),B=A[0],T=A[1],q=Object(p.useSelect)((function(t){return{blocks:(0,t(b.store).getBlocks)(e)}}),[e,u]).blocks;Object(f.useEffect)((function(){u!==B&&E(u)}),[u]);var E=function(t){console.log("retrieving quotes for sorterId: ",t),h()({path:"/prc-api/v2/block/quote-sorter/retrieve?hash=".concat(t)}).then((function(e){var r=e.data.quotes;if(void 0!==r){var n=Object(i.a)(r).splice(0,10);S(Object(i.a)(n)),T(t)}})).catch((function(t){console.log({error:t})}))},R=Object(f.useMemo)((function(){return k?null==k?void 0:k.map((function(t){return{"prc-block/quote-sorter/quote":t.quote,"prc-block/quote-sorter/attribution":t.attribution,props:t.props}})):[]}),[k]);Object(f.useEffect)((function(){if(R.length>0){var t=R[0];w(l()(JSON.stringify(t)))}}),[R]);var C=Object(b.useBlockProps)();return k?k.length?React.createElement("div",C,R&&R.map((function(t,e){var r=l()(JSON.stringify(t)),n=r===(m||l()(JSON.stringify(R[0])));return React.createElement(b.BlockContextProvider,{key:"context-key--".concat(e),value:t},null===m||n?React.createElement(v,null):null,React.createElement(O,{blocks:q,blockContextId:r,setActiveBlockContextId:w,isHidden:n}))})),React.createElement(g,{attributes:n,setAttributes:c})):React.createElement("p",C," ",Object(o.__)("No quotes found.")):React.createElement("p",C,React.createElement("p",null,"Add data to populate the quote sorter"),React.createElement(d.Spinner,{style:{align:"center"}}))},save:w};Object(c.registerBlockType)(k,x(x({},u),S))}},[[932,0]]]);
//# sourceMappingURL=quote-sorter-quote-template-de1addf8.js.map