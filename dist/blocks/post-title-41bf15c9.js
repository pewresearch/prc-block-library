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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[9],{0:function(t,e){t.exports=wp.element},1:function(t,e){t.exports=wp.i18n},131:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/post-title","category":"layout","attributes":{"title":{"type":"string"}},"supports":{"html":false,"multiple":false}}')},19:function(t,e,r){"use strict";var c="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(c)]},209:function(t,e,r){r(19),t.exports=r(270)},270:function(t,e,r){"use strict";r.r(e);var c=r(5),n=r(6),o=r(1),i=r(131),s=r(0),p=r(7),a=r(4),u=function(t){var e=t.attributes,r=t.className,c=t.clientId,n=t.setAttributes,o=Object(a.useBlockProps)({className:r}),i=e.title,u=Object(p.useSelect)((function(t){return t("core/editor").getEditedPostAttribute("title")}),[c]);return Object(s.useEffect)((function(){n({title:u})}),[u]),React.createElement("h1",o,i)},l=function(){var t=a.useBlockProps.save();return React.createElement(s.Fragment,t)};function b(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);e&&(c=c.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,c)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?b(Object(r),!0).forEach((function(e){Object(c.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var O=i.name,w={title:Object(o.__)("PRC Post Title"),description:Object(o.__)("Displays the post title."),edit:u,save:l};Object(n.registerBlockType)(O,f(f({},w),i))},4:function(t,e){t.exports=wp.blockEditor},5:function(t,e,r){"use strict";function c(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return c}))},6:function(t,e){t.exports=wp.blocks},7:function(t,e){t.exports=wp.data}},[[209,0]]]);
//# sourceMappingURL=post-title-41bf15c9.js.map