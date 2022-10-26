/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.17
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[25],{1015:function(e,t,r){"use strict";r.r(t);var n=r(8),o=r(7),c=r(362),a=r(5),i=r(3),s=function(e){var t=e.attributes,r=e.setAttributes,n=t.streamUrl,o=t.chatUrl,c=Object(a.useBlockProps)();return React.createElement("div",c,React.createElement("div",{className:"wp-block-prc-block-livestream--stream"},"Livestream video embed URL:",React.createElement(i.__experimentalInputControl,{type:"text",placeholder:"e.g. https://vimeo.com/event/1352567/embed",value:n,onChange:function(e){return r({streamUrl:e})}})),React.createElement("div",{className:"wp-block-prc-block-livestream--chat"},"Livestream chat embed URL:",React.createElement(i.__experimentalInputControl,{type:"text",placeholder:"e.g. https://app.sli.do/event/2jtxhrzn",value:o,onChange:function(e){return r({chatUrl:e})}})))},l=r(4),p=function(){return React.createElement(l.Fragment,null)};function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m=c.name,d={edit:s,save:p};Object(o.registerBlockType)(m,b(b({},c),d))},13:function(e,t,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},3:function(e,t){e.exports=window.wp.components},362:function(e){e.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/livestream","title":"Livestream","description":"A structured livestream block with places for a live video and embeddable chat applet.","icon":"embed-video","keywords":["livestream","video","chat","stream"],"category":"marketing","attributes":{"streamUrl":{"type":"string"},"chatUrl":{"type":"string"}},"styles":[{"name":"chat-box-left","label":"Chat Box Left"},{"name":"chat-box-right","label":"Chat Box Right","isDefault":true}],"example":{"attributes":{"streamUrl":"https://vimeo.com/event/1352567/embed","chatUrl":"https://app.sli.do/event/2jtxhrzn"},"viewPortWidth":800},"supports":{"html":false}}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},7:function(e,t){e.exports=window.wp.blocks},8:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},930:function(e,t,r){r(13),e.exports=r(1015)}},[[930,0]]]);
//# sourceMappingURL=livestream-c3d5f7e3.js.map