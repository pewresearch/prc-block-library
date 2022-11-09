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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[46],{12:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},2:function(e,t){e.exports=window.wp.i18n},29:function(e,t){e.exports=window.wp.apiFetch},3:function(e,t){e.exports=window.wp.components},370:function(e){e.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/quote-sorter","title":"Quote Sorter","description":"Block to create an interactive quote sorter","icon":"star-filled","keywords":["quote","sort","sorter","interactive"],"category":"layout","attributes":{"toggler":{"type":"boolean","default":true},"sorterId":{"type":"string","default":""},"typologies":{"type":"string","default":"{\\"gender_man\\":{\\"name\\":\\"Man\\",\\"category\\":\\"Gender\\"},\\"gender_woman\\":{\\"name\\":\\"Woman\\",\\"category\\":\\"Gender\\"}}"},"uploadStatus":{"type":"string","default":"unprocessed"}},"supports":{"color":{"background":true,"text":true},"__experimentalBorder":{"color":true,"width":true},"spacing":{"padding":true,"margin":true},"html":false,"reusable":false,"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true}},"providesContext":{"prc-block/quote-sorter-hash":"sorterId","prc-block/quote-sorter-typologies":"typologies"}}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},51:function(e,t){e.exports=regeneratorRuntime},7:function(e,t){e.exports=window.wp.blocks},8:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},931:function(e,t,r){r(12),e.exports=r(980)},980:function(e,t,r){"use strict";r.r(t);var o=r(8),n=r(7),c=r(370),a=r(5),i=r(4),s=r(2),l=r(3);function u(e,t,r,o,n,c,a){try{var i=e[c](a),s=i.value}catch(e){return void r(e)}i.done?t(s):Promise.resolve(s).then(o,n)}var p=r(51),f=r.n(p),d=r(29),b=r.n(d);function m(e){var t=function(e){return e.replace(/\W/g,"").replace(/\s/g,"").toLowerCase()},r=e[0].slice(1),o=r.map((function(e){return t(e)}));var n=e.slice(1),c={},a={},i={},s=o.includes("attribution")?o.indexOf("attribution"):null;o.splice(s,1);for(var l=function(e){var l=n[e],u=l[0],p=function(e){if(s){var t=e[s+1];return e.splice(s+1,1),t}return null}(l),f=l.slice(1);c[e]={quote:u,attribution:p,props:o.map((function(e,r){return"".concat(e,"_").concat(t(f[r]))}))};for(var d=0;d<f.length;d+=1){var b="".concat(o[d],"_").concat(t(f[d]));a[b]||(a[b]={name:f[d],category:r[d]})}for(var m=0;m<o.length;m+=1){var g="".concat(o[m],"_").concat(t(f[m]));i[g]?i[g].push(e):i[g]=[e]}},u=0;u<n.length;u+=1)l(u);return{quotes:c,typologies:a,references:i}}function g(e){var t=e.attributes,r=e.setAttributes,o=t.uploadStatus,n=t.sorterId,c=function(){var e,t=(e=f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:setTimeout((function(){b()({path:"/prc-api/v2/block/quote-sorter/submit/",method:"POST",data:{quoteData:t,hash:n||""}}).then((function(e){console.log({res:e});var t=e.data.typologies;r({uploadStatus:"processed",sorterId:e.hash,typologies:JSON.stringify(t)})})).catch((function(e){console.log("Error!"),console.log({e:e})}))}),2e3);case 1:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(o,n){var c=e.apply(t,r);function a(e){u(c,o,n,a,i,"next",e)}function i(e){u(c,o,n,a,i,"throw",e)}a(void 0)}))});return function(e){return t.apply(this,arguments)}}();return React.createElement(l.Placeholder,{label:Object(s.__)("Drop a CSV of quotes in the space below. This may take a while if your file is very large. Make sure your CSV has Quote and Attribtution columns."),isColumnLayout:!0},React.createElement(l.DropZoneProvider,null,React.createElement(l.Flex,{align:"center",justify:"center"},"processed"===o&&React.createElement(l.FlexItem,{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}},React.createElement(l.FlexItem,null,React.createElement(l.Icon,{icon:"database-view"})),React.createElement(l.FlexItem,null,"Data has been uploaded to database. Reference ID:"," ",React.createElement("strong",null,n))),"unprocessed"===o&&React.createElement(l.Icon,{icon:"database-add"}),"processing"===o&&React.createElement(l.Spinner,null)),React.createElement(l.DropZone,{disabled:"processed"!==o,onFilesDrop:function(e){!function(e){r({uploadStatus:"processing"});var t=new FileReader;t.onload=function(){var e=m(function(e){for(var t=[],r=e.split("\n"),o=0;o<r.length;o++){for(var n=r[o].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/),c=0;c<n.length;c++)n[c]=n[c].replace(/"/g,"").replace("\r","").replace(/^\s+|\s+$/gm,"");t.push(n)}return t}(t.result)),r=JSON.stringify(e);c(r)},e.forEach((function(e){return t.readAsText(e)}))}(e)},onDrop:function(e){console.log("onDrop",e)}})))}var y=function(e){var t=e.attributes,r=e.setAttributes;return React.createElement(i.Fragment,null,React.createElement(a.InspectorControls,null,React.createElement(l.PanelBody,{title:Object(s.__)("Upload Data")},React.createElement(g,{attributes:t,setAttributes:r}))),React.createElement(a.InspectorAdvancedControls,null))},v=["prc-block/quote-sorter-dropdown","prc-block/quote-sorter-search-bar","prc-block/quote-sorter-quote-template","prc-block/quote-sorter-quote-text","prc-block/quote-sorter-quote-attribution","prc-block/quote-sorter-dynamic-text","prc-block/grid","core/group"],w=[["prc-block/quote-sorter-search-bar"],["prc-block/quote-sorter-quote-template"]],h=function(e){var t=e.attributes,r=e.setAttributes,o=Object(a.useBlockProps)(),n=Object(a.useInnerBlocksProps)(o,{allowedBlocks:v,orientation:"vertical",template:w});return React.createElement(i.Fragment,null,React.createElement("div",n),React.createElement(y,{attributes:t,setAttributes:r}))};var k=function(){return a.useBlockProps.save(),React.createElement(a.InnerBlocks.Content,null)};function x(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function O(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?x(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var E=c.name,_={edit:h,save:k};Object(n.registerBlockType)(E,O(O({},c),_))}},[[931,0]]]);
//# sourceMappingURL=quote-sorter-controller-10fb0cf3.js.map