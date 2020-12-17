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
(window["wpackioprcBlocksLibrarychiclet-menu-itemJsonp"]=window["wpackioprcBlocksLibrarychiclet-menu-itemJsonp"]||[]).push([[0],[function(e,t){e.exports=wp.blockEditor},function(e,t){e.exports=wp.i18n},function(e){e.exports=JSON.parse('{"name":"prc-block/chiclet-menu-item","category":"layout","attributes":{"text":{"type":"string"},"link":{"type":"string"}}}')},function(e,t){e.exports=wp.element},function(e,t){e.exports=wp.blocks},function(e,t){e.exports=wp.components},function(e,t,n){n(7),e.exports=n(9)},function(e,t,n){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},function(e,t,n){},function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.r(t);var o,c=n(4),i=n(1),a=n(2),l=n(3),u=n(5),s=n(0),p=(n(8),function(e){var t=e.attributes,n=e.isSelected,r=e.setAttributes,o=Object(s.useBlockProps)({className:"item"}),c=t.text,a=t.link;return console.log("isSelected?",n),React.createElement("div",o,React.createElement(l.Fragment,null,React.createElement(s.RichText,{tagName:"div",value:c,onChange:function(e){return r({text:e})},placeholder:"U.S. Democracy",className:"ui basic fluid button",multiline:!1}),n&&React.createElement(s.URLPopover,{onClose:function(e){return console.log(e)},renderSettings:function(){return React.createElement(u.ToggleControl,{label:Object(i.__)("Open in new tab"),checked:!1,onChange:function(e){return console.log(e.target.value)}})}},React.createElement("form",{onSubmit:function(e){e.preventDefault(),console.log(e)}},React.createElement("input",{type:"url",value:a,onChange:function(e){return r({link:e.target.value})},style:{border:"none",boxShadow:"none"}})))))}),m=function(e){var t=e.attributes,n=s.useBlockProps.save({className:"item"}),r=t.text,o=t.link;return React.createElement("div",n,React.createElement(s.RichText.Content,{tagName:"a",className:"ui basic fluid button",value:r,href:o}))},f=a.name,b=a.category,d=a.attributes,y=[f,{apiVersion:2,title:Object(i.__)("PRC Chiclet Menu Item"),description:Object(i.__)("Menu item for Chiclet Menu blocks."),category:b,attributes:d,edit:p,save:m}];c.registerBlockType.apply(void 0,function(e){if(Array.isArray(e))return r(e)}(o=y)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(o)||function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(o)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())}],[[6,1]]]);
//# sourceMappingURL=main-da66ea5f.js.map