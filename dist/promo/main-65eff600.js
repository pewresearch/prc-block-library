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
(window.wpackioprcBlocksLibrarypromoJsonp=window.wpackioprcBlocksLibrarypromoJsonp||[]).push([[0],[function(e,t){e.exports=wp.i18n},function(e,t){e.exports=wp.blockEditor},function(e,t){e.exports=React},function(e,t,o){var r,a=o(11);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var n={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var o=arguments[t];if(o){var r=a(o);if("string"===r||"number"===r)e.push(this&&this[o]||o);else if(Array.isArray(o))e.push(c.apply(this,o));else if("object"===r)for(var l in o)n.call(o,l)&&o[l]&&e.push(this&&this[l]||l)}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===a(o(5))&&o(5)?void 0===(r=function(){return c}.apply(t,[]))||(e.exports=r):window.classNames=c}()},function(e,t){e.exports=wp.components},function(e,t){(function(t){e.exports=t}).call(this,{})},function(e,t){e.exports=wp.blocks},function(e,t){e.exports=wp.element},function(e,t,o){o(9),e.exports=o(13)},function(e,t,o){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},function(e,t){e.exports=wp.data},function(e,t){function o(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=o=function(e){return typeof e}:e.exports=o=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(t)}e.exports=o},function(e,t,o){},function(e,t,o){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,r=new Array(t);o<t;o++)r[o]=e[o];return r}o.r(t);var a=o(6),n=o(0),c=o(1),l=(o(10),o(4)),i=o(7),s=o(3),u=o.n(s),p=["prc-block/button","prc-block/mailchimp-form","prc-blocks/pathways-ask-an-analyst"],m=[["prc-block/button",{color:"#d3aa20",label:"DONATE"}]],d=function(e){var t=e.bgColor,o=e.borderColor,r=e.setAttributes;return React.createElement(c.InspectorControls,null,React.createElement(l.PanelBody,{title:Object(n.__)("Promo Design Options")},React.createElement("div",null,React.createElement("p",null,React.createElement("strong",null,"Background Color:")),React.createElement(l.ColorPalette,{colors:[{name:"Oatmeal",color:"#F7F7F2"},{name:"Gray",color:"#F8F8F8"},{name:"White",color:"#FFF"}],value:t,onChange:function(e){return r({bgColor:e})},disableCustomColors:!0})),React.createElement("div",null,React.createElement("p",null,React.createElement("strong",null,"Border Color:")),React.createElement(l.ColorPalette,{colors:[{name:"Oatmeal",color:"#E2E2E2"},{name:"Gray",color:"#D8D8D8"},{name:"White",color:"#FFF"},{name:"Black",color:"#000"}],value:o,onChange:function(e){return r({borderColor:e})},disableCustomColors:!0}))))},f=function(e){var t=e.attributes,o=e.className,r=e.clientId,a=e.setAttributes,n=e.isSelected,l=document.querySelector('[data-block="'.concat(r,'"]'));if(!0===n&&null!==l){var s=l.clientWidth;a(640<=s?{pancake:!0}:{pancake:!1})}var f=t.header,b=t.description,y=t.bgColor,h=t.borderColor,k=t.pancake,g=u()(o,{pancake:k});return React.createElement(i.Fragment,null,React.createElement(d,{bgColor:y,borderColor:h,setAttributes:a}),React.createElement("div",{className:g,style:{borderColor:h,backgroundColor:y}},React.createElement("div",{className:"text"},React.createElement(c.RichText,{tagName:"h2",value:f,onChange:function(e){return a({header:e})},placeholder:"Facts are more important than ever.",formattingControls:[],keepPlaceholderOnFocus:!0}),React.createElement(c.RichText,{tagName:"div",value:b,onChange:function(e){return a({description:e})},placeholder:"In times of uncertainty, good decisions demand good data. Please support our research with a financial contribution.",multiline:"p",allowedFormats:["core/bold","core/italic"],keepPlaceholderOnFocus:!0})),React.createElement("div",{className:"action"},React.createElement(c.InnerBlocks,{allowedBlocks:p,template:m}))))},b=function(e){var t=e.attributes,o=e.className,r=t.header,a=t.description,n=t.bgColor,l=t.borderColor,i=t.pancake,s=u()(o,{pancake:i});return React.createElement("div",{className:s,style:{borderColor:l,backgroundColor:n}},React.createElement("div",{className:"text"},React.createElement(c.RichText.Content,{tagName:"h2",value:r}),React.createElement(c.RichText.Content,{tagName:"div",value:a})),React.createElement("div",{className:"action"},React.createElement(c.InnerBlocks.Content,null)))};o(2);var y,h=["prc-block/promo",{title:Object(n.__)("Promo"),icon:"format-aside",category:"widgets",keywords:[Object(n.__)("prc"),Object(n.__)("ad"),Object(n.__)("promo"),Object(n.__)("pancake")],styles:[{name:"",label:"Standard",isDefault:!0},{name:"pancake",label:"Pancake (Text Centered)"},{name:"pancake-stacked",label:"Pancake (Text Stacked)"},{name:"pancake-form",label:"Pancake (Form)"}],supports:{html:!1},attributes:{header:{type:"string",default:""},description:{type:"string",default:""},bgColor:{type:"string",default:"#fff"},borderColor:{type:"string",default:"#fff"},pancake:{type:"boolean",default:!1}},example:{attributes:{header:"Facts are more important than ever",description:"In times of uncertainty, good decisions demand good data. Please support our research with a financial contribution."},innerBlocks:[["prc-block/button",{color:"#d3aa20",label:"DONATE"}]]},edit:f,save:b}];o(12);a.registerBlockType.apply(void 0,function(e){if(Array.isArray(e))return r(e)}(y=h)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(y)||function(e,t){if(e){if("string"==typeof e)return r(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?r(e,t):void 0}}(y)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())}],[[8,1]]]);
//# sourceMappingURL=main-65eff600.js.map