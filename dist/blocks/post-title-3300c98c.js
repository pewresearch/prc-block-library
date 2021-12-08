/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.9
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[24],{10:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},14:function(t,e){t.exports=window.wp.data},2:function(t,e){t.exports=window.wp.i18n},22:function(t,e,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},294:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/post-title","category":"layout","attributes":{"title":{"type":"string"}},"supports":{"html":false,"multiple":false}}')},4:function(t,e){t.exports=window.wp.element},5:function(t,e){t.exports=window.wp.blockEditor},613:function(t,e,r){r(22),t.exports=r(704)},704:function(t,e,r){"use strict";r.r(e);var n=r(10),o=r(9),c=r(2),i=r(294),s=r(4),p=r(14),a=r(5),u=function(t){var e=t.attributes,r=t.className,n=t.clientId,o=t.setAttributes,c=Object(a.useBlockProps)({className:r}),i=e.title,u=Object(p.useSelect)((function(t){return t("core/editor").getEditedPostAttribute("title")}),[n]);return Object(s.useEffect)((function(){o({title:u})}),[u]),React.createElement("h1",c,i)},l=function(){var t=a.useBlockProps.save();return React.createElement(s.Fragment,t)};function b(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?b(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var w=i.name,O={title:Object(c.__)("PRC Post Title"),description:Object(c.__)("Displays the post title."),edit:u,save:l};Object(o.registerBlockType)(w,f(f({},O),i))},9:function(t,e){t.exports=window.wp.blocks}},[[613,0]]]);
//# sourceMappingURL=post-title-3300c98c.js.map