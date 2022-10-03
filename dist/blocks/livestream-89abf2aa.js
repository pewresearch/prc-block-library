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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[25],{1:function(e,t){e.exports=window.React},1015:function(e,t,r){"use strict";r.r(t);var n=r(8),a=r(2),o=r(7),c=r(366),i=r(12),s=r.n(i),l=r(1092),p=r(5),u=function(e){var t=e.attributes,r=e.setAttributes,n=t.className,a=t.streamUrl,o=t.chatUrl,c=Object(p.useBlockProps)({className:s()(n)});return React.createElement("div",c,React.createElement("div",{className:"prc-livestream-stream"},"Livestream video embed URL:",React.createElement(l.a,{type:"text",placeholder:"e.g. https://vimeo.com/event/1352567/embed",value:a,onChange:function(e){return r({streamUrl:e.target.value})}})),React.createElement("div",{className:"prc-livestream-chat"},"Livestream chat embed URL:",React.createElement(l.a,{type:"text",placeholder:"e.g. https://app.sli.do/event/2jtxhrzn",value:o,onChange:function(e){return r({chatUrl:e.target.value})}})))},b=function(){return React.createElement(p.InnerBlocks.Content,null)};function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var v=c.name,h={title:Object(a.__)("Livestream"),description:"Create Embeddable Livestream with Chat.",keywords:[Object(a.__)("Livestream"),Object(a.__)("Stream"),Object(a.__)("Chat")],icon:"embed-video",edit:u,save:b};Object(o.registerBlockType)(v,f(f({},c),h))},12:function(e,t,r){var n,a=r(11);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var o={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=a(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)){if(r.length){var i=c.apply(null,r);i&&e.push(i)}}else if("object"===n)if(r.toString===Object.prototype.toString)for(var s in r)o.call(r,s)&&r[s]&&e.push(s);else e.push(r.toString())}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===a(r(13))&&r(13)?void 0===(n=function(){return c}.apply(t,[]))||(e.exports=n):window.classNames=c}()},2:function(e,t){e.exports=window.wp.i18n},366:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/livestream","category":"layout","attributes":{"streamUrl":{"type":"string"},"chatUrl":{"type":"string"}},"styles":[{"name":"chat-box-left","label":"Chat Box Left"},{"name":"chat-box-right","label":"Chat Box Right","isDefault":true}],"example":{"attributes":{"streamUrl":"https://vimeo.com/event/1352567/embed","chatUrl":"https://app.sli.do/event/2jtxhrzn"},"viewPortWidth":800},"supports":{"html":false}}')},49:function(e,t){e.exports=window.ReactDOM},5:function(e,t){e.exports=window.wp.blockEditor},7:function(e,t){e.exports=window.wp.blocks},933:function(e,t,r){r(17),e.exports=r(1015)}},[[933,0,3]]]);
//# sourceMappingURL=livestream-89abf2aa.js.map