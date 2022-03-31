/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.13
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
(window.wpackioprcBlocksLibrarydeprecatedJsonp=window.wpackioprcBlocksLibrarydeprecatedJsonp||[]).push([[3],{1:function(t,e){t.exports=window.wp.i18n},10:function(t,e){t.exports=window.wp.data},2:function(t,e){t.exports=window.wp.element},21:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/post-title","category":"layout","attributes":{"title":{"type":"string"}},"supports":{"html":false,"multiple":false,"inserter":false}}')},4:function(t,e){t.exports=window.wp.blockEditor},45:function(t,e,r){r(8),t.exports=r(52)},52:function(t,e,r){"use strict";r.r(e);var n=r(9),o=r(7),c=r(1),i=r(21),s=r(2),a=r(10),p=r(4),u=function(t){var e=t.attributes,r=t.className,n=t.clientId,o=t.setAttributes,c=Object(p.useBlockProps)({className:r}),i=e.title,u=Object(a.useSelect)((function(t){return t("core/editor").getEditedPostAttribute("title")}),[n]);return Object(s.useEffect)((function(){o({title:u})}),[u]),React.createElement("h1",c,i)},l=function(){var t=p.useBlockProps.save();return React.createElement(s.Fragment,t)};function b(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?b(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var w=i.name,O={title:Object(c.__)("PRC Post Title"),description:Object(c.__)("Displays the post title."),edit:u,save:l};Object(o.registerBlockType)(w,f(f({},O),i))},7:function(t,e){t.exports=window.wp.blocks},8:function(t,e,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},9:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))}},[[45,0]]]);
//# sourceMappingURL=post-title-0827382c.js.map