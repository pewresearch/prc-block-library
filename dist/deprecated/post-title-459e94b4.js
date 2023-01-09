/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.28
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2023 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibrarydeprecatedJsonp=window.wpackioprcBlocksLibrarydeprecatedJsonp||[]).push([[3],{1:function(e,t){e.exports=window.wp.i18n},10:function(e,t){e.exports=window.wp.data},2:function(e,t){e.exports=window.wp.element},21:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/post-title","category":"layout","attributes":{"title":{"type":"string"}},"supports":{"html":false,"multiple":false,"inserter":false}}')},4:function(e,t){e.exports=window.wp.blockEditor},45:function(e,t,r){r(8),e.exports=r(52)},52:function(e,t,r){"use strict";r.r(t);var n=r(9),o=r(7),c=r(1),i=r(21),s=r(2),a=r(10),p=r(4),u=function(e){var t=e.attributes,r=e.className,n=e.clientId,o=e.setAttributes,c=Object(p.useBlockProps)({className:r}),i=t.title,u=Object(a.useSelect)((function(e){return e("core/editor").getEditedPostAttribute("title")}),[n]);return Object(s.useEffect)((function(){o({title:u})}),[u]),React.createElement("h1",c,i)},l=function(){var e=p.useBlockProps.save();return React.createElement(s.Fragment,e)};function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var w=i.name,d={title:Object(c.__)("DEPRECATED: PRC Post Title"),description:Object(c.__)("DEPRECATED: Use core/post-title block instead."),edit:u,save:l};Object(o.registerBlockType)(w,f(f({},d),i))},7:function(e,t){e.exports=window.wp.blocks},8:function(e,t,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},9:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))}},[[45,0]]]);
//# sourceMappingURL=post-title-459e94b4.js.map