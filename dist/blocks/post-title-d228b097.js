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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[26],{11:function(t,e){t.exports=window.wp.blocks},13:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},15:function(t,e){t.exports=window.wp.data},2:function(t,e){t.exports=window.wp.i18n},24:function(t,e,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},3:function(t,e){t.exports=window.wp.element},312:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/post-title","category":"layout","attributes":{"title":{"type":"string"}},"supports":{"html":false,"multiple":false}}')},6:function(t,e){t.exports=window.wp.blockEditor},869:function(t,e,r){r(24),t.exports=r(947)},947:function(t,e,r){"use strict";r.r(e);var n=r(13),o=r(11),c=r(2),i=r(312),s=r(3),p=r(15),a=r(6),u=function(t){var e=t.attributes,r=t.className,n=t.clientId,o=t.setAttributes,c=Object(a.useBlockProps)({className:r}),i=e.title,u=Object(p.useSelect)((function(t){return t("core/editor").getEditedPostAttribute("title")}),[n]);return Object(s.useEffect)((function(){o({title:u})}),[u]),React.createElement("h1",c,i)},l=function(){var t=a.useBlockProps.save();return React.createElement(s.Fragment,t)};function b(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?b(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var w=i.name,O={title:Object(c.__)("PRC Post Title"),description:Object(c.__)("Displays the post title."),edit:u,save:l};Object(o.registerBlockType)(w,f(f({},O),i))}},[[869,0]]]);
//# sourceMappingURL=post-title-d228b097.js.map