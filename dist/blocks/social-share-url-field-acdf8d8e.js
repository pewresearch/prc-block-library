/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.23
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[59],{1:function(e,t){e.exports=window.React},1016:function(e,t,r){"use strict";r.r(t);var n=r(8),o=r(2),i=r(7),c=r(400),s=r(17),a=r.n(s),l=r(1060),p=r(5),u=function(e){var t=e.attributes,r=e.className,n=e.setAttributes,i=e.context,c=t.url;console.log("Social Share URL Field: context: ",i);var s=Object(p.useBlockProps)({className:a()(r),style:{display:"flex",flexDirection:"row"}});return React.createElement("div",s,React.createElement("div",{className:"label"},Object(o.__)("Share This Link:","prc-block-library")),React.createElement(l.a,{placeholder:"URL...",value:c,onChange:function(e,t){var r=t.value;return n({url:r})}}))},f=function(){return React.createElement(p.InnerBlocks.Content,null)};function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d=c.name,h={edit:u,save:f};Object(i.registerBlockType)(d,w(w({},c),h))},17:function(e,t,r){var n,o=r(15);
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)){if(r.length){var s=c.apply(null,r);s&&e.push(s)}}else if("object"===n){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){e.push(r.toString());continue}for(var a in r)i.call(r,a)&&r[a]&&e.push(a)}}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===o(r(20))&&r(20)?void 0===(n=function(){return c}.apply(t,[]))||(e.exports=n):window.classNames=c}()},2:function(e,t){e.exports=window.wp.i18n},400:function(e){e.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/social-share-url-field","title":"Social Share URL Field","description":"A input field with a url that can be shared on social media. Clicking the field will copy the link.","icon":"admin-links","keywords":["social"],"category":"marketing","attributes":{"url":{"type":"string"}},"supports":{"html":false},"parent":["core/social-links"],"usesContext":["core/social-links/title","core/social-links/description","core/social-links/url"]}')},5:function(e,t){e.exports=window.wp.blockEditor},52:function(e,t){e.exports=window.ReactDOM},7:function(e,t){e.exports=window.wp.blocks},966:function(e,t,r){r(12),e.exports=r(1016)}},[[966,0,3]]]);
//# sourceMappingURL=social-share-url-field-acdf8d8e.js.map