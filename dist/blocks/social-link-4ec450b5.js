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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[41],{1:function(e,t){e.exports=window.React},1006:function(e,t,n){"use strict";n.r(t);var r=n(14),o=n(2),i=n(433),c=n(12),l=n(342),a=n(18),s=n.n(a),u=n(74),p=n(9),f=n(3),b=n(5),d=n(4),w=function(e){var t=e.attributes,n=e.setAttributes,r=e.className,i=e.isSelected,c=t.description,l=t.title,a=t.icon,w=Object(b.useBlockProps)({className:s()("item",r,{"is-selected":i})}),y=Object(p.useSelect)((function(e){console.log("Getting things");var t=e("core/editor").getEditedPostAttribute("meta"),n=!1;void 0!==t&&t.hasOwnProperty("bitly")&&(n=t.bitly);var r=e("core/editor").getEditedPostAttribute("title");return{postTitle:r||!1,shortUrl:n||!1}})),m=y.postTitle,v=y.shortUrl;return Object(d.useEffect)((function(){!1!==m&&!1!==v&&n({url:v,title:m})}),[m,v]),React.createElement(d.Fragment,null,React.createElement(b.InspectorControls,null,React.createElement(f.PanelBody,{title:Object(o.__)("Link settings")},React.createElement(f.TextareaControl,{value:c||"",onChange:function(e){n({description:e})},label:Object(o.__)("Description"),help:Object(o.__)("The description will be displayed in the menu if the current theme supports it.")}),React.createElement(f.TextControl,{value:l||"",onChange:function(e){n({title:e})},label:Object(o.__)("Link title"),autoComplete:"off"}),React.createElement(f.SelectControl,{label:"Select Icon",value:a,options:[{label:"(Click to select icon)",value:""},{label:"Facebook",value:"facebook"},{label:"Twitter",value:"twitter"},{label:"LinkedIn",value:"linkedin"},{label:"Print",value:"print"}],onChange:function(e){return n({icon:e})}}))),React.createElement("div",w,React.createElement(u.a,{name:a})))};function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var v=l.name,h={title:Object(o.__)("Social Link"),icon:i.a,description:Object(o.__)("Add a link to a social network to a profile or to share the current post."),__experimentalLabel:function(e){return e.label},merge:function(e,t){var n=t.label,r=void 0===n?"":n;return m(m({},e),{},{label:e.label+r})},edit:w,save:function(){return React.createElement(d.Fragment,null)}};Object(c.registerBlockType)(v,m(m({},l),h))},103:function(e,t,n){var r,o=n(19);r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"===("undefined"==typeof window?"undefined":o(window))&&(r=window)}e.exports=r},12:function(e,t){e.exports=window.wp.blocks},14:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},158:function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},18:function(e,t,n){var r,o=n(19);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=o(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)){if(n.length){var l=c.apply(null,n);l&&e.push(l)}}else if("object"===r)if(n.toString===Object.prototype.toString)for(var a in n)i.call(n,a)&&n[a]&&e.push(a);else e.push(n.toString())}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===o(n(22))&&n(22)?void 0===(r=function(){return c}.apply(t,[]))||(e.exports=r):window.classNames=c}()},19:function(e,t){function n(t){return e.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,n(t)}e.exports=n,e.exports.__esModule=!0,e.exports.default=e.exports},2:function(e,t){e.exports=window.wp.i18n},24:function(e,t){e.exports=window.wp.primitives},25:function(e,t,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},3:function(e,t){e.exports=window.wp.components},342:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/social-link","category":"layout","attributes":{"description":{"type":"string"},"label":{"type":"string"},"title":{"type":"string"},"icon":{"type":"string","default":"facebook"},"url":{"type":"string"},"asButton":{"type":"boolean","default":false}},"usesContext":["prc-block/menu"],"supports":{"reusable":false,"html":false}}')},4:function(e,t){e.exports=window.wp.element},433:function(e,t,n){"use strict";var r=n(4),o=n(24),i=Object(r.createElement)(o.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(r.createElement)(o.Path,{d:"M9 11.8l6.1-4.5c.1.4.4.7.9.7h2c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v.4l-6.4 4.8c-.2-.1-.4-.2-.6-.2H6c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h2c.2 0 .4-.1.6-.2l6.4 4.8v.4c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1h-2c-.5 0-.8.3-.9.7L9 12.2v-.4z"}));t.a=i},5:function(e,t){e.exports=window.wp.blockEditor},9:function(e,t){e.exports=window.wp.data},926:function(e,t,n){n(25),e.exports=n(1006)}},[[926,0,3]]]);
//# sourceMappingURL=social-link-4ec450b5.js.map