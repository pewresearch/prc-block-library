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
(window.wpackioprcBlocksLibrarychapterJsonp=window.wpackioprcBlocksLibrarychapterJsonp||[]).push([[0],[function(e,t){e.exports=wp.element},function(e,t){e.exports=lodash},function(e,t){e.exports=wp.i18n},function(e,t){e.exports=wp.components},function(e,t){e.exports=wp.blockEditor},function(e){e.exports=JSON.parse('{"name":"prc-block/chapter","category":"text","attributes":{"value":{"type":"string","multiline":"br"},"id":{"type":"string"},"level":{"type":"integer","default":2}}}')},function(e,t){(function(t){e.exports=t}).call(this,{})},function(e,t){e.exports=wp.blocks},function(e,t){e.exports=wp.url},function(e,t,r){var n,o=r(12);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)&&r.length){var i=a.apply(null,r);i&&e.push(i)}else if("object"===n)for(var l in r)c.call(r,l)&&r[l]&&e.push(l)}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):"object"===o(r(6))&&r(6)?void 0===(n=function(){return a}.apply(t,[]))||(e.exports=n):window.classNames=a}()},function(e,t,r){r(11),e.exports=r(13)},function(e,t,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=r=function(e){return typeof e}:e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(t)}e.exports=r},function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}r.r(t);var c=r(7),a=r(2),i=r(0);function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=r(9),p=r.n(s);function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var h=Object(i.createElement)((function(e){var t=e.className,r=e.isPressed,n=v(v({},u(e,["className","isPressed"])),{},{className:p()(t,{"is-pressed":r})||void 0,role:"img","aria-hidden":!0,focusable:!1});return Object(i.createElement)("svg",n)}),{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(i.createElement)((function(e){return Object(i.createElement)("path",e)}),{d:"M11.1 15.8H20v-1.5h-8.9v1.5zm0-8.6v1.5H20V7.2h-8.9zM5 6.7V10h1V5.3L3.8 6l.4 1 .8-.3zm-.4 5.7c-.3.1-.5.2-.7.3l.1 1.1c.2-.2.5-.4.8-.5.3-.1.6 0 .7.1.2.3 0 .8-.2 1.1-.5.8-.9 1.6-1.4 2.5h2.7v-1h-1c.3-.6.8-1.4.9-2.1.1-.3 0-.8-.2-1.1-.5-.6-1.3-.5-1.7-.4z"})),b=r(5),m=r(4),d=r(3),y=r(8),g=r(1);function O(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window,t=e.navigator.platform;return-1!==t.indexOf("Mac")||Object(g.includes)(["iPad","iPhone"],t)}var j="alt",w="ctrl",x="meta",P="shift",H={primary:function(e){return e()?[x]:[w]},primaryShift:function(e){return e()?[P,x]:[w,P]},primaryAlt:function(e){return e()?[j,x]:[w,j]},secondary:function(e){return e()?[P,j,x]:[w,P,j]},access:function(e){return e()?[w,j]:[P,j]},ctrl:function(){return[w]},alt:function(){return[j]},ctrlShift:function(){return[w,P]},shift:function(){return[P]},shiftAlt:function(){return[P,j]}},V=(Object(g.mapValues)(H,(function(e){return function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:O;return[].concat(o(e(r)),[t.toLowerCase()]).join("+")}})),Object(g.mapValues)(H,(function(e){return function(t){var r,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:O,c=n(),a=(l(r={},j,c?"⌥":"Alt"),l(r,w,c?"⌃":"Ctrl"),l(r,x,"⌘"),l(r,P,c?"⇧":"Shift"),r),i=e(n).reduce((function(e,t){var r=Object(g.get)(a,t,t);return[].concat(o(e),c?[r]:[r,"+"])}),[]),u=Object(g.capitalize)(t);return[].concat(o(i),[u])}})));Object(g.mapValues)(V,(function(e){return function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:O;return e(t,r).join("")}})),Object(g.mapValues)(H,(function(e){return function(t){var r,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:O,c=n(),i=(l(r={},P,"Shift"),l(r,x,c?"Command":"Control"),l(r,w,"Control"),l(r,j,c?"Option":"Alt"),l(r,",",Object(a.__)("Comma")),l(r,".",Object(a.__)("Period")),l(r,"`",Object(a.__)("Backtick")),r);return[].concat(o(e(n)),[t]).map((function(e){return Object(g.capitalize)(Object(g.get)(i,e,e))})).join(c?" ":" + ")}}));function k(e){return[j,w,x,P].filter((function(t){return e["".concat(t,"Key")]}))}Object(g.mapValues)(H,(function(e){return function(t,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:O,o=e(n),c=k(t);return!Object(g.xor)(o,c).length&&(r?t.key===r:Object(g.includes)(o,t.key.toLowerCase()))}}));var C=function(e){var t=e.level,r=e.isPressed,n=void 0!==r&&r,o={1:"M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z",2:"M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z",3:"M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z",4:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm10-2h-1v2h-2v-2h-5v-2l4-6h3v6h1v2zm-3-2V7l-2.8 4H16z",5:"M12.1 12.2c.4.3.7.5 1.1.7.4.2.9.3 1.3.3.5 0 1-.1 1.4-.4.4-.3.6-.7.6-1.1 0-.4-.2-.9-.6-1.1-.4-.3-.9-.4-1.4-.4H14c-.1 0-.3 0-.4.1l-.4.1-.5.2-1-.6.3-5h6.4v1.9h-4.3L14 8.8c.2-.1.5-.1.7-.2.2 0 .5-.1.7-.1.5 0 .9.1 1.4.2.4.1.8.3 1.1.6.3.2.6.6.8.9.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4-.2.4-.5.8-.9 1.1-.4.3-.8.5-1.3.7-.5.2-1 .3-1.5.3-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1-.1-.1 1-1.5 1-1.5zM9 15H7v-4H3v4H1V5h2v4h4V5h2v10z",6:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm8.6-7.5c-.2-.2-.5-.4-.8-.5-.6-.2-1.3-.2-1.9 0-.3.1-.6.3-.8.5l-.6.9c-.2.5-.2.9-.2 1.4.4-.3.8-.6 1.2-.8.4-.2.8-.3 1.3-.3.4 0 .8 0 1.2.2.4.1.7.3 1 .6.3.3.5.6.7.9.2.4.3.8.3 1.3s-.1.9-.3 1.4c-.2.4-.5.7-.8 1-.4.3-.8.5-1.2.6-1 .3-2 .3-3 0-.5-.2-1-.5-1.4-.9-.4-.4-.8-.9-1-1.5-.2-.6-.3-1.3-.3-2.1s.1-1.6.4-2.3c.2-.6.6-1.2 1-1.6.4-.4.9-.7 1.4-.9.6-.3 1.1-.4 1.7-.4.7 0 1.4.1 2 .3.5.2 1 .5 1.4.8 0 .1-1.3 1.4-1.3 1.4zm-2.4 5.8c.2 0 .4 0 .6-.1.2 0 .4-.1.5-.2.1-.1.3-.3.4-.5.1-.2.1-.5.1-.7 0-.4-.1-.8-.4-1.1-.3-.2-.7-.3-1.1-.3-.3 0-.7.1-1 .2-.4.2-.7.4-1 .7 0 .3.1.7.3 1 .1.2.3.4.4.6.2.1.3.3.5.3.2.1.5.2.7.1z"};return o.hasOwnProperty(t)?React.createElement(d.SVG,{width:"24",height:"24",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",isPressed:n},React.createElement(d.Path,{d:o[t]})):null},E=[2,3],z={className:"block-library-heading-level-dropdown",isAlternate:!0},S=function(e){var t=e.selectedLevel,r=e.onChange;return React.createElement(d.Dropdown,{popoverProps:z,renderToggle:function(e){var r=e.onToggle,n=e.isOpen;return React.createElement(d.ToolbarButton,{"aria-expanded":n,"aria-haspopup":"true",icon:React.createElement(C,{level:t}),label:Object(a.__)("Change heading level"),onClick:r,onKeyDown:function(e){n||40!==e.keyCode||(e.preventDefault(),e.stopPropagation(),r())},showTooltip:!0})},renderContent:function(){return React.createElement(d.Toolbar,{className:"block-library-heading-level-toolbar",label:Object(a.__)("Change heading level")},React.createElement(d.ToolbarGroup,{isCollapsed:!1,controls:E.map((function(e){var n=e===t;return{icon:React.createElement(C,{level:e,isPressed:n}),title:Object(a.sprintf)(Object(a.__)("Heading %d"),e),isActive:n,onClick:function(){r(e)}}}))}))}})},_=function(e){var t=e.attributes,r=e.className,n=e.setAttributes,o=t.value,c=t.level,l="h".concat(c);return React.createElement(i.Fragment,null,React.createElement(m.RichText,{tagName:l,value:o,onChange:function(e){var t=Object(y.cleanForSlug)(e);n({value:e,id:t})},placeholder:Object(a.__)("Chapter Title Here"),allowedFormats:[],keepPlaceholderOnFocus:!0,className:r}),React.createElement(m.BlockControls,null,React.createElement(d.ToolbarGroup,null,React.createElement(S,{selectedLevel:c,onChange:function(e){return n({level:e})}}))))},A=function(e){var t=e.attributes,r=e.className,n=t.id,o=t.value,c=t.level,a="h".concat(c);return React.createElement(m.RichText.Content,{value:o,tagName:a,className:r,id:n})},R=b.name,N=b.category,T=b.attributes,M=[R,{title:Object(a.__)("PRC Chapter"),description:Object(a.__)("Build a table of contents for this post using the chapter block."),icon:h,category:N,attributes:T,example:{attributes:{value:"Chapter Title"}},edit:_,save:A}];c.registerBlockType.apply(void 0,o(M))}],[[10,1]]]);
//# sourceMappingURL=main-bf83664c.js.map