/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.14
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[18],{14:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t,r){"use strict";function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}r.d(t,"a",(function(){return o}))},24:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},27:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var o=r(20);function n(e,t){if(e){if("string"==typeof e)return Object(o.a)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(o.a)(e,t):void 0}}},3:function(e,t){e.exports=window.wp.components},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},64:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var o=r(20);var n=r(68),i=r(27);function a(e){return function(e){if(Array.isArray(e))return Object(o.a)(e)}(e)||Object(n.a)(e)||Object(i.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},68:function(e,t,r){"use strict";function o(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}r.d(t,"a",(function(){return o}))},689:function(e,t,r){r(24),e.exports=r(813)},813:function(e,t,r){"use strict";r.r(t);var o=r(64),n=r(14),i=r(2),a=r(91),c=r(84),l=r(9),s=r(4),u=r(5),b=r(3);function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}Object(l.registerBlockStyle)("core/group",[{name:"fluid",label:"Fluid",isDefault:!0},{name:"200-wide",label:"200px Wide"},{name:"300-wide",label:"300px Wide"},{name:"420-wide",label:"420px Wide"},{name:"640-wide",label:"640px Wide"}]),Object(l.registerBlockVariation)("core/group",{name:"callout",title:Object(i.__)("Callout"),description:Object(i.__)('A Group block in the "Callout" style with a oatmeal background and pre-set innerblocks'),attributes:{className:"is-style-callout",backgroundColor:"beige"},innerBlocks:[["core/heading"],["core/paragraph"]]}),Object(l.registerBlockVariation)("core/group",{name:"card",title:Object(i.__)("Card"),description:Object(i.__)('A Group block in the "Card" format with a heading with a border, image, text, and read more link.'),attributes:{className:"is-style-card"},innerBlocks:[["core/heading",{className:"is-style-section-header",level:3,placeholder:"Signature Reports..."}],["core/image"],["prc-block/story-item",{className:"is-style-disabled"}]]}),Object(l.registerBlockVariation)("core/group",{name:"card-alt",title:Object(i.__)("Card (Alt)"),description:Object(i.__)('A Group block in the "Card" format with a sub header heading in a black background, image, text, and read more link.'),attributes:{className:"is-style-card-alt"},innerBlocks:[["core/heading",{className:"is-style-sub-header",level:3,placeholder:"Most Popular Posts...",backgroundColor:"slate",textColor:"white"}],["prc-block/story-item",{className:"is-style-disabled"}]]}),Object(l.registerBlockVariation)("core/group",{name:"segment",title:Object(i.__)("Segment"),description:Object(i.__)('A Group block in the "segment" format with a heading.'),attributes:{className:"is-style-segment ui segment"},innerBlocks:[["core/heading",{level:4,placeholder:"Subscribe to our topical newsletters..."}]]}),Object(a.addFilter)("blocks.registerBlockType","prc-block/group",(function(e){return"core/group"!==e.name||(void 0!==e.supports.align&&(e.supports.align=["left","right","center","wide","full"]),void 0!==e.transforms&&void 0!==e.transforms.from&&(e.transforms.from.push({type:"block",blocks:["core/group","prc-block/callout"],transform:function(e,t){return Object(l.createBlock)("core/group",function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({className:"is-style-callout",backgroundColor:"beige"},e),t)}}),e.transforms.from.push({type:"raw",isMatch:function(e){return e.classList.contains("callout")},transform:function(e){var t=Object(l.rawHandler)({HTML:e.innerHTML}),r={className:"is-style-callout",backgroundColor:"beige"};return e.getAttribute("align")&&(r.align=e.getAttribute("align")),Object(l.createBlock)("core/group",r,Object(o.a)(t))},priority:11}))),e}));var d=Object(c.createHigherOrderComponent)((function(e){return function(t){var r=t.name,o=t.attributes,n=t.setAttributes;if("core/group"!==r)return React.createElement(e,t);var a=o.isSticky,c=o.responsiveAttachId,l=o.responsiveThreshold;return React.createElement(s.Fragment,null,React.createElement(u.InspectorAdvancedControls,null,React.createElement(b.ToggleControl,{label:Object(i.__)("Sticky On Scroll?"),checked:a,onChange:function(e){return n({isSticky:!a})},help:"Enable sticky on scroll for this group, this will be disabled when you reach the responsive threshold as its intended for desktop only. If you have specific mobile needs consult with the dev team."}),React.createElement(b.TextControl,{label:Object(i.__)("Responsive Attachment ID"),value:c,onChange:function(e){return n({responsiveAttachId:e})}}),React.createElement(b.__experimentalNumberControl,{label:Object(i.__)("Responsive Threshold"),value:l,onChange:function(e){return n({responsiveThreshold:e})},max:3540,min:320,isDragEnabled:!0,help:Object(i.__)("The responsive threshold is the point at which the group block and its contents will trigger their mobile behavior. The default is 640px (small tablet), but you can change this to any value you like. If you would like to trigger the mobile behavior of a block immediately regardless of device size then use the maximum value of 3540.")}),React.createElement(b.CardDivider,null)),React.createElement(e,t))}}),"withGroupAdvancedControls");Object(a.addFilter)("editor.BlockEdit","prc-block/group",d,21)},84:function(e,t){e.exports=window.wp.compose},9:function(e,t){e.exports=window.wp.blocks},91:function(e,t){e.exports=window.wp.hooks}},[[689,0]]]);
//# sourceMappingURL=group-977f7d44.js.map