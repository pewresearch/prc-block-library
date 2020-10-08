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
(window.wpackioprcBlocksLibrarystaffJsonp=window.wpackioprcBlocksLibrarystaffJsonp||[]).push([[0],[function(t,e){t.exports=wp.blocks},function(t){t.exports=JSON.parse('{"name":"prc-block/staff","category":"layout","attributes":{"name":{"type":"string"},"jobTitle":{"type":"string"},"image":{"type":"string"},"link":{"type":"string"}}}')},function(t,e){t.exports=wp.i18n},function(t,e,r){r(4),t.exports=r(6)},function(t,e,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},function(t,e,r){},function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.r(e);var a,o=r(0),c=r(2),i=r(1),s=function(t){var e=t.attributes,r=t.className,n=e.name,a=e.jobTitle,o=e.image,c=e.link;return React.createElement("div",{className:r},React.createElement("h2",null,n),React.createElement("p",null,a),React.createElement("p",null,o),React.createElement("p",null,c))},l=function(t){var e=t.attributes,r=t.className;e.name,e.title,e.image;return React.createElement("div",{className:r},"Staff")},f={from:[{type:"raw",isMatch:function(t){return"P"===t.nodeName&&/^https?:\/\/(www\.)?pewresearch\.(org|local)\/staff\/.+/i.test(t.textContent)},transform:function(t){return Object(o.createBlock)("prc-block/staff",{link:t.textContent.trim()})}}],to:[{type:"block",blocks:["prc-block/staff"],transform:function(t){var e=t.url;return Object(o.createBlock)("prc-block/staff",{link:e})}}]},p=i.name,u=i.category,m=i.attributes,b=[p,{title:Object(c.__)("PRC Staffer"),description:Object(c.__)("Paste a staff link and return a staff member with their photo, name, and job title."),category:u,attributes:m,supports:{inserter:!1},edit:s,save:l,transforms:f}];r(5);o.registerBlockType.apply(void 0,function(t){if(Array.isArray(t))return n(t)}(a=b)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(a)||function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(a)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())}],[[3,1]]]);
//# sourceMappingURL=main-dd579aac.js.map