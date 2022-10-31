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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[19],{12:function(e,t,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},2:function(e,t){e.exports=window.wp.i18n},3:function(e,t){e.exports=window.wp.components},4:function(e,t){e.exports=window.wp.element},405:function(e){e.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/form-input-text","title":"Form Input Text","description":"A primitive block for a form input text field","keywords":[],"category":"design","attributes":{"label":{"type":"string"},"placeholder":{"type":"string","default":"Enter email address..."},"type":{"type":"string","default":"email"}},"ancestor":["prc-block/mailchimp-form","prc-block/mailchimp-select"],"supports":{"color":{"background":true,"text":true},"__experimentalBorder":{"color":true,"width":true},"html":false,"reusable":false,"spacing":{"padding":true,"margin":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true}}}')},5:function(e,t){e.exports=window.wp.blockEditor},7:function(e,t){e.exports=window.wp.blocks},8:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},971:function(e,t,r){r(12),e.exports=r(992)},992:function(e,t,r){"use strict";r.r(t);var n=r(8),o=r(7),c=r(405),i=r(4),a=r(5),l=r(2),p=r(3);function u(e){var t=e.attributes,r=e.setAttributes,n=t.placeholder,o=t.type;return React.createElement(a.InspectorControls,null,React.createElement(p.PanelBody,{title:Object(l.__)("Form Input Field Settings")},React.createElement(p.SelectControl,{label:"Input Type",value:o,options:[{label:"Text",value:"text"},{label:"Email",value:"email"}],onChange:function(e){r({type:e})}}),React.createElement(p.TextControl,{label:"Placeholder",value:n,onChange:function(e){r({placeholder:e})}})))}var s=function(e){var t=e.attributes,r=e.setAttributes,n=t.placeholder,o=t.type,c=Object(a.useBlockProps)({placeholder:n,onChange:function(e){return e.preventDefault()},type:o});return React.createElement(i.Fragment,null,React.createElement("input",c),React.createElement(u,{attributes:t,setAttributes:r}))};function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m=c.name,d={icon:function(){return React.createElement(p.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 640 512",width:21,preserveAspectRatio:"xMidYMid meet"},React.createElement(p.Path,{d:"M128 336C128 344.8 120.8 352 112 352C103.2 352 96 344.8 96 336V176C96 167.2 103.2 160 112 160C120.8 160 128 167.2 128 176V336zM0 128C0 92.65 28.65 64 64 64H576C611.3 64 640 92.65 640 128V384C640 419.3 611.3 448 576 448H64C28.65 448 0 419.3 0 384V128zM32 128V384C32 401.7 46.33 416 64 416H576C593.7 416 608 401.7 608 384V128C608 110.3 593.7 96 576 96H64C46.33 96 32 110.3 32 128z"}))},edit:s,save:function(){return null}};Object(o.registerBlockType)(m,f(f({},c),d))}},[[971,0]]]);
//# sourceMappingURL=form-input-text-64079f4d.js.map