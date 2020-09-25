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
(window["wpackioprcBlocksLibrarypost-publish-dateJsonp"]=window["wpackioprcBlocksLibrarypost-publish-dateJsonp"]||[]).push([[0],[function(t){t.exports=JSON.parse('{"name":"prc-block/post-publish-date","category":"layout","attributes":{"date":{"type":"string"}}}')},function(t,e){t.exports=wp.i18n},function(t,e){t.exports=wp.blocks},function(t,e){t.exports=wp.element},function(t,e){t.exports=wp.data},function(t,e){t.exports=moment},function(t,e,r){r(7),t.exports=r(8)},function(t,e,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.r(e);var o,a=r(2),i=r(1),c=r(0),s=r(3),u=r(4),p=r(5),l=function(t){var e=t.attributes,r=t.className,n=t.clientId,o=t.setAttributes,a=e.date,i=Object(u.useSelect)((function(t){var e=new Date(t("core/editor").getEditedPostAttribute("date")).toString();return p(e).format("MMMM Do YYYY")}),[n]);return Object(s.useEffect)((function(){o({date:i})}),[i]),React.createElement("div",{className:"".concat(r," meta")},a)},d=function(t){var e=t.attributes,r=t.className,n=e.date;return React.createElement("div",{className:"".concat(r," meta")},n)},b=c.name,f=c.category,m=c.attributes,y=[b,{title:Object(i.__)("PRC Post Publish Date"),description:Object(i.__)("The post published date, useful when building out post headers."),category:f,attributes:m,edit:l,save:d}];a.registerBlockType.apply(void 0,function(t){if(Array.isArray(t))return n(t)}(o=y)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(o)||function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(o)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())}],[[6,1]]]);
//# sourceMappingURL=main-1867ad13.js.map