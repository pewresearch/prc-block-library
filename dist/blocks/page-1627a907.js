/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.9
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[25],{11:function(e,t){e.exports=window.wp.blocks},14:function(e,t,r){"use strict";function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return a}))},17:function(e,t,r){var a,n=r(18);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var a=n(r);if("string"===a||"number"===a)e.push(r);else if(Array.isArray(r)){if(r.length){var l=o.apply(null,r);l&&e.push(l)}}else if("object"===a)if(r.toString===Object.prototype.toString)for(var i in r)c.call(r,i)&&r[i]&&e.push(i);else e.push(r.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):"object"===n(r(21))&&r(21)?void 0===(a=function(){return o}.apply(t,[]))||(e.exports=a):window.classNames=o}()},18:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},2:function(e,t){e.exports=window.wp.i18n},21:function(e,t){(function(t){e.exports=t}).call(this,{})},25:function(e,t,r){var a="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(a)]},29:function(e,t){e.exports=window.wp.apiFetch},3:function(e,t){e.exports=window.wp.element},327:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/page","category":"layout","attributes":{"postId":{"type":"integer"},"title":{"type":"string"},"content":{"type":"string"},"url":{"type":"string"},"image":{"type":"string"},"enableExcerpt":{"type":"boolean","default":true},"enableReadMore":{"type":"boolean","default":false},"readMore":{"type":"string"}},"supports":{"html":false,"align":false}}')},4:function(e,t){e.exports=window.wp.components},6:function(e,t){e.exports=window.wp.blockEditor},902:function(e,t,r){r(25),e.exports=r(974)},974:function(e,t,r){"use strict";r.r(t);var a=r(14),n=r(2),c=r(11),o=r(327),l=r(17),i=r.n(l),s=r(3),u=r(6),p=r(29),d=r.n(p),m=r(4),b=function(e){var t=e.postType,r=e.route,a=e.value,c=e.setAttributes,o=e.isSelected,l=void 0!==o&&o;return React.createElement(u.__experimentalLinkControl,{label:Object(n.__)("Select a ".concat(t)),value:a,showInitialSuggestions:!0,suggestionsQuery:{type:"post",subtype:t},forceIsEditingLink:l,onChange:function(e){var t;void 0!==e.id?(t=e.id,new Promise((function(e){var a={method:"GET",path:"/wp/v2/".concat(r,"/").concat(t)};d()(a).then((function(t){e(t.excerpt.rendered)}))}))).then((function(t){c({postId:e.id,title:e.title,content:t,url:e.url})})):c({url:e.url})},settings:[]})},f=function(e){var t=e.image,r=e.setAttributes;return e.isSelected||void 0===t?React.createElement(u.MediaUploadCheck,null,React.createElement(u.MediaUpload,{onSelect:function(e){return r({image:e.url})},allowedTypes:["image"],render:function(e){var r=e.open;return React.createElement(s.Fragment,null,void 0!==t&&React.createElement("div",{className:"image",onClick:r},React.createElement("img",{src:t,alt:"Featured art for page"})),void 0===t&&React.createElement("div",{className:"image"},React.createElement(m.Button,{isSecondary:!0,onClick:r},"Add Image")))}})):React.createElement("div",{className:"image"},React.createElement("img",{src:t,alt:"Featured art for page"}))},g=function(e){var t=e.attributes,r=e.setAttributes,a=e.isSelected,c=t.postId,o=t.title,l=t.url,i=t.enableReadMore,p=t.enableExcerpt;return React.createElement(s.Fragment,null,React.createElement(u.InspectorControls,null,React.createElement(m.PanelBody,{title:Object(n.__)("Page Link")},React.createElement(b,{postType:"page",route:"pages",value:{title:o,url:l,id:c},setAttributes:r,isSelected:a})),React.createElement(m.PanelBody,{title:Object(n.__)("Page Settings")},React.createElement("div",null,React.createElement(m.ToggleControl,{label:Object(n.__)("Enable Excerpt"),checked:p,onChange:function(){return r({enableExcerpt:!p})}}),React.createElement(m.ToggleControl,{label:Object(n.__)("Enable Read More"),checked:i,onChange:function(){return r({enableReadMore:!i})}})))))},y=function(e){var t=e.label,r=e.attributes,a=e.setAttributes,n=r.postId,c=r.title,o=r.url;return React.createElement(m.Placeholder,{icon:"wordpress-alt",label:t},React.createElement(b,{postType:"page",route:"pages",value:{title:c,url:o,id:n},setAttributes:a}))},v=function(e){var t=e.attributes,r=e.className,a=e.setAttributes,c=e.isSelected,o=t.title,l=t.url,p=t.content,d=t.image,m=t.enableReadMore,b=t.enableExcerpt,v=t.readMore,E=Object(u.useBlockProps)({className:i()(r,"ui","page-item",{"has-excerpt":b})});return React.createElement("div",E,React.createElement(g,{attributes:t,setAttributes:a,isSelected:c}),void 0===l&&React.createElement(y,{label:"Select a page",attributes:t,setAttributes:a}),void 0!==l&&React.createElement(s.Fragment,null,React.createElement(f,{image:d,setAttributes:a,isSelected:c}),React.createElement("div",{className:"content"},c&&React.createElement(s.Fragment,null,React.createElement(u.RichText,{tagName:"div",value:o,onChange:function(e){return a({title:e})},placeholder:Object(n.__)("Page Title"),keepPlaceholderOnFocus:!0,allowedFormats:["italic"],className:"header"}),!0===b&&React.createElement(u.RichText,{tagName:"div",value:p,onChange:function(e){return a({content:e})},placeholder:Object(n.__)("Page excerpt..."),keepPlaceholderOnFocus:!0,className:"description sans-serif"}),!0===m&&React.createElement("div",{className:"extra"},React.createElement(u.RichText,{tagName:"div",value:v,onChange:function(e){return a({readMore:e})},placeholder:Object(n.__)("Read More..."),keepPlaceholderOnFocus:!0,className:"read-more",allowedFormats:["core/link"]}))),!c&&React.createElement(s.Fragment,null,React.createElement(u.RichText.Content,{tagName:"div",value:o,className:"header"}),!0===b&&React.createElement(u.RichText.Content,{tagName:"div",value:p,className:"description sans-serif"}),!0===m&&React.createElement("div",{className:"extra"},React.createElement(u.RichText.Content,{tagName:"div",value:v,className:"read-more"}))))))},E=function(){return React.createElement(u.InnerBlocks.Content,null)};function R(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?R(Object(r),!0).forEach((function(t){Object(a.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):R(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var w=o.name,x={title:Object(n.__)("Page"),description:"Insert a stylized card that links to a apge.",category:"layout",keywords:[Object(n.__)("Page")],edit:v,save:E};Object(c.registerBlockType)(w,h(h({},o),x))}},[[902,0]]]);
//# sourceMappingURL=page-1627a907.js.map