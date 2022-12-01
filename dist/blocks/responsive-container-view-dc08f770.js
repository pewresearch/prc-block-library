/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.24
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[55],{11:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},12:function(e,t,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},16:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(23);var c=n(17),o=n(24);function a(e,t){return Object(r.a)(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,c,o=[],a=!0,i=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);a=!0);}catch(e){i=!0,c=e}finally{try{a||null==n.return||n.return()}finally{if(i)throw c}}return o}}(e,t)||Object(c.a)(e,t)||Object(o.a)()}},17:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(11);function c(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},2:function(e,t){e.exports=window.wp.i18n},23:function(e,t,n){"use strict";function r(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return r}))},24:function(e,t,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return r}))},3:function(e,t){e.exports=window.wp.components},333:function(e){e.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/responsive-container-view","title":"Responsive View","description":"A block of blocks that appears and hides at specific viewport widths.","icon":"art","category":"layout","attributes":{"min":{"type":"integer","default":0},"max":{"type":"integer"}},"parent":["prc-block/responsive-container-controller"],"supports":{"html":false}}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},7:function(e,t){e.exports=window.wp.blocks},724:function(e,t,n){n(12),e.exports=n(775)},775:function(e,t,n){"use strict";n.r(t);var r=n(8),c=n(7),o=n(333),a=n(5),i=n(16),l=n(2),s=n(4),u=n(3),p=n(9);function m(e){var t=e.attributes,n=e.setAttributes,r={desktop:{min:980,max:0},tablet:{min:480,max:979},smartphone:{min:0,max:479}},c=Object.keys(r).filter((function(e){return r[e].max===t.max}));return React.createElement(u.SelectControl,{value:0!==c.length&&c[0],options:[{label:"Common Device Sizes...",value:!1},{label:"Desktop",value:"desktop"},{label:"Tablet",value:"tablet"},{label:"Smartphone",value:"smartphone"}],onChange:function(e){!1!==e&&n({min:r[e].min,max:r[e].max})}})}function b(e){var t=e.attributes,n=e.setAttributes,r=e.clientId,c=t.min,o=t.max,b=Object(p.useSelect)((function(e){var t=e("core/block-editor").getPreviousBlockClientId(r),n=e("core/block-editor").getBlockAttributes(t);return null==n?0:n.min-1})),f=Object(s.useState)("".concat(c,"px to ").concat(o,"px")),d=Object(i.a)(f,2),w=d[0],x=d[1];return Object(s.useEffect)((function(){var e="between ".concat(c,"px and ").concat(o,"px");o||(e="minimum ".concat(c,"px")),c||(e="maximum ".concat(o,"px")),x(e)}),[c,o]),Object(s.useEffect)((function(){void 0===o&&n({max:b})}),[o]),React.createElement(s.Fragment,null,React.createElement(u.Notice,{isDismissible:!1,spokenMessage:Object(l.__)("Visible from ".concat(c," pixels to ").concat(o," pixels"))},React.createElement("span",{className:"sans-serif"},React.createElement("strong",null,"Viewport Range:")," ",Object(l.__)(w))),React.createElement(a.BlockControls,null,React.createElement("div",{style:{minWidth:"280px ",maxWidth:"320px",width:"100%",paddingTop:"7px",paddingLeft:"5px"}},React.createElement(u.Flex,{align:"center"},React.createElement(u.FlexBlock,{style:{marginBottom:"8px"}},React.createElement(u.__experimentalNumberControl,{value:c,min:0,max:o,onChange:function(e){n({min:parseInt(e)})}})),React.createElement(u.FlexItem,{style:{marginBottom:"8px"}},React.createElement("span",null,React.createElement("strong",null,"~ to ~"))),React.createElement(u.FlexBlock,{style:{marginBottom:"8px"}},React.createElement(u.__experimentalNumberControl,{value:o,min:0,max:b,disabled:0===b,onChange:function(e){n({max:parseInt(e)})}})),React.createElement(u.FlexItem,{style:{width:"100px"}},React.createElement(m,{attributes:t,setAttributes:n}))))))}var f=[["core/html",{}]],d=function(e){var t=e.attributes,n=e.setAttributes,r=e.clientId,c=Object(a.useBlockProps)(),o=Object(a.useInnerBlocksProps)({},{orientation:"vertical",templateLock:!1,template:f});return React.createElement("div",c,React.createElement(b,{attributes:t,setAttributes:n,clientId:r}),React.createElement("div",o))},w=function(){return React.createElement(a.InnerBlocks.Content,null)};function x(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?x(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=o.name,O={edit:d,save:w};Object(c.registerBlockType)(y,v(v({},o),O))},8:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},9:function(e,t){e.exports=window.wp.data}},[[724,0]]]);
//# sourceMappingURL=responsive-container-view-dc08f770.js.map