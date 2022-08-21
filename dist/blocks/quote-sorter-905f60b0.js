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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[43],{10:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},1029:function(e,t,r){r(22),e.exports=r(1039)},1039:function(e,t,r){"use strict";r.r(t);var o=r(10),n=r(2),c=r(8),a=r(439),l=r(135);var s=r(16),i=r.n(s),u=r(4),p=r(3),f=r(5),d=r(9);function b(e,t,r,o,n,c,a){try{var l=e[c](a),s=l.value}catch(e){return void r(e)}l.done?t(s):Promise.resolve(s).then(o,n)}var m=r(49),y=r.n(m),g=r(31),v=r.n(g);function w(e){var t=function(e){return e.replace(/\W/g,"").replace(/\s/g,"").toLowerCase()},r=e[0].slice(1),o=r.map((function(e){return t(e)}));var n=e.slice(1),c={},a={},l={},s=o.includes("attribution")?o.indexOf("attribution"):null;o.splice(s,1);for(var i=function(e){var i=n[e],u=i[0],p=function(e){if(s){console.log({row:e});var t=e[s+1];return e.splice(s+1,1),t}return null}(i),f=i.slice(1);console.log({quote:u,attribution:p,props:f}),c[e]={quote:u,attribution:p,props:o.map((function(e,r){return"".concat(e,"_").concat(t(f[r]))}))};for(var d=0;d<f.length;d+=1){var b="".concat(o[d],"_").concat(t(f[d]));a[b]||(a[b]={name:f[d],category:r[d]})}for(var m=0;m<o.length;m+=1){var y="".concat(o[m],"_").concat(t(f[m]));l[y]?l[y].push(e):l[y]=[e]}},u=0;u<n.length;u+=1)i(u);return{quotes:c,typologies:a,references:l}}function h(e){var t=e.attributes,r=e.setAttributes,o=t.uploadStatus,c=t.sorterId,a=function(){var e,t=(e=y.a.mark((function e(t){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:setTimeout((function(){v()({path:"/prc-api/v2/block/quote-sorter/submit/",method:"POST",data:{quoteData:t,hash:c||""}}).then((function(e){console.log({res:e});var t=e.data.typologies;r({uploadStatus:"processed",sorterId:e.hash,typologies:JSON.stringify(t)})})).catch((function(e){console.log("Error!"),console.log({e:e})}))}),2e3);case 1:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(o,n){var c=e.apply(t,r);function a(e){b(c,o,n,a,l,"next",e)}function l(e){b(c,o,n,a,l,"throw",e)}a(void 0)}))});return function(e){return t.apply(this,arguments)}}(),l=function(e){r({uploadStatus:"processing"});var t=new FileReader;t.onload=function(){var e=w(function(e){console.log({str:e});for(var t=[],r=e.split("\n"),o=0;o<r.length;o++){for(var n=r[o].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/),c=0;c<n.length;c++)n[c]=n[c].replace(/"/g,"").replace("\r","").replace(/^\s+|\s+$/gm,"");t.push(n)}return console.log({arr:t}),t}(t.result)),r=JSON.stringify(e);a(r)},e.forEach((function(e){return t.readAsText(e)}))};return React.createElement(p.Placeholder,{label:Object(n.__)("Drop a CSV of quotes in the space below. This may take a while if your file is very large."),isColumnLayout:!0},React.createElement(p.DropZoneProvider,null,React.createElement(p.Flex,{align:"center",justify:"center"},"processed"===o&&React.createElement(p.FlexItem,{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}},React.createElement(p.FlexItem,null,React.createElement(p.Icon,{icon:"database-view"})),React.createElement(p.FlexItem,null,"Data has been uploaded to database. Reference ID:"," ",React.createElement("strong",null,c))),"unprocessed"===o&&React.createElement(p.Icon,{icon:"database-add"}),"processing"===o&&React.createElement(p.Spinner,null)),React.createElement(p.DropZone,{disabled:"processed"!==o,onFilesDrop:function(e){console.log("onFilesDrop",e),l(e)},onDrop:function(e){console.log("onDrop",e)}})))}var O=function(e){var t=e.attributes,r=e.setAttributes;return React.createElement(u.Fragment,null,React.createElement(f.InspectorControls,null,React.createElement(p.PanelBody,{title:Object(n.__)("Upload Data")},React.createElement(h,{attributes:t,setAttributes:r}))),React.createElement(f.InspectorAdvancedControls,null))},k=["rootClientId","buttonText","icon","className"];function x(e){var t=e.rootClientId,r=e.buttonText,o=e.icon,n=e.className,c=void 0===n?"custom-block-appender":n,a=function(e,t){if(null==e)return{};var r,o,n=Object(l.a)(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(o=0;o<c.length;o++)r=c[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}(e,k);return React.createElement(f.Inserter,{isAppender:!0,rootClientId:t,renderToggle:function(e){var t=e.onToggle,n=e.disabled;return React.createElement("div",{style:{textAlign:"center"}},React.createElement(p.Button,Object.assign({className:"".concat(c),onClick:t,disabled:n,icon:o},a),r))}})}var j=["prc-block/quote-sorter-dropdown","prc-block/quote-sorter-search-bar","prc-block/quote-sorter-quote","prc-block/quote-sorter-quotes","prc-block/quote-sorter-dynamic-text","prc-block/grid","core/group"],S=[["prc-block/quote-sorter-search-bar",{placeholder:Object(n.__)("Search for a quote ...")}],["prc-block/quote-sorter-quotes",{},Array.from({length:5},(function(){return["prc-block/quote-sorter-quote"]}))]],E=function(e){var t=e.attributes,r=e.className,o=e.setAttributes,c=e.clientId,a=e.isSelected,l=function(e){var t=e.clientId;return Object(d.useSelect)((function(e){return e("core/block-editor").hasSelectedInnerBlock(t,!0)}))}({clientId:c});console.log("hasSelectedInnerBlock",l,!l,a);var s=Object(f.useBlockProps)({className:i()(r)}),p=Object(f.useInnerBlocksProps)(s,{allowedBlocks:j,orientation:"vertical",template:S,renderAppender:!(!l&&!a)&&function(){return React.createElement(x,{rootClientId:c,isSecondary:!0,showTooltip:!0,icon:"plus",label:Object(n.__)("Insert Quote Sorter Blocks","prc-block-library"),buttonText:Object(n.__)("Insert Quote Sorter Blocks","prc-block-library")})}});return React.createElement(u.Fragment,null,React.createElement(O,{attributes:t,setAttributes:o}),React.createElement("div",p))},I=function(){return React.createElement(f.InnerBlocks.Content,null)};function R(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function q(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?R(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):R(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var _=a.name,P={edit:E,save:I};Object(c.registerBlockType)(_,q(q({},a),P))},135:function(e,t,r){"use strict";function o(e,t){if(null==e)return{};var r,o,n={},c=Object.keys(e);for(o=0;o<c.length;o++)r=c[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}r.d(t,"a",(function(){return o}))},15:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},16:function(e,t,r){var o,n=r(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var l=a.apply(null,r);l&&e.push(l)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var s in r)c.call(r,s)&&r[s]&&e.push(s);else e.push(r.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):"object"===n(r(17))&&r(17)?void 0===(o=function(){return a}.apply(t,[]))||(e.exports=o):window.classNames=a}()},17:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=window.wp.i18n},22:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},3:function(e,t){e.exports=window.wp.components},31:function(e,t){e.exports=window.wp.apiFetch},4:function(e,t){e.exports=window.wp.element},439:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/quote-sorter","title":"Quote Sorter","description":"Block to create an interactive quote sorter","icon":"star-filled","keywords":["quote","sort","sorter","interactive"],"category":"layout","attributes":{"toggler":{"type":"boolean","default":true},"sorterId":{"type":"string","default":""},"typologies":{"type":"string","default":"{\\"gender_man\\":{\\"name\\":\\"Man\\",\\"category\\":\\"Gender\\"},\\"gender_woman\\":{\\"name\\":\\"Woman\\",\\"category\\":\\"Gender\\"}}"},"uploadStatus":{"type":"string","default":"unprocessed"}},"supports":{"html":false},"providesContext":{"prc-block/quote-sorter-hash":"sorterId","prc-block/quote-sorter-typologies":"typologies"}}')},49:function(e,t){e.exports=regeneratorRuntime},5:function(e,t){e.exports=window.wp.blockEditor},8:function(e,t){e.exports=window.wp.blocks},9:function(e,t){e.exports=window.wp.data}},[[1029,0]]]);
//# sourceMappingURL=quote-sorter-905f60b0.js.map