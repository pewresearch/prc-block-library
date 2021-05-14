/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2021 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibrarypullquoteJsonp=window.wpackioprcBlocksLibrarypullquoteJsonp||[]).push([[0],[function(t,e){t.exports=wp.element},function(t,e){t.exports=wp.i18n},function(t,e){t.exports=wp.blockEditor},function(t,e){t.exports=wp.blocks},function(t,e,r){var o,n=r(6);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function l(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var o=n(r);if("string"===o||"number"===o)t.push(r);else if(Array.isArray(r)&&r.length){var a=l.apply(null,r);a&&t.push(a)}else if("object"===o)for(var i in r)c.call(r,i)&&r[i]&&t.push(i)}}return t.join(" ")}t.exports?(l.default=l,t.exports=l):"object"===n(r(7))&&r(7)?void 0===(o=function(){return l}.apply(e,[]))||(t.exports=o):window.classNames=l}()},function(t){t.exports=JSON.parse('{"name":"prc-block/pullquote","category":"text","attributes":{"value":{"type":"string","source":"html","selector":"blockquote","multiline":"p"},"citation":{"type":"string","source":"html","selector":"cite","default":""},"mainColor":{"type":"string"},"customMainColor":{"type":"string"},"textColor":{"type":"string"},"customTextColor":{"type":"string"}},"supports":{"anchor":true,"align":["left","right","wide","full"]}}')},function(t,e){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(t.exports=r=function(t){return typeof t},t.exports.default=t.exports,t.exports.__esModule=!0):(t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.default=t.exports,t.exports.__esModule=!0),r(e)}t.exports=r,t.exports.default=t.exports,t.exports.__esModule=!0},function(t,e){(function(e){t.exports=e}).call(this,{})},function(t,e,r){r(9),t.exports=r(10)},function(t,e,r){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},function(t,e,r){"use strict";function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,o=new Array(e);r<e;r++)o[r]=t[r];return o}r.r(e);var n=r(3),c=r(1),l=r(0);function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function i(t,e){if(null==t)return{};var r,o,n=function(t,e){if(null==t)return{};var r,o,n={},c=Object.keys(t);for(o=0;o<c.length;o++)r=c[o],e.indexOf(r)>=0||(n[r]=t[r]);return n}(t,e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);for(o=0;o<c.length;o++)r=c[o],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}var u=r(4),s=r.n(u);function p(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?p(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var b=Object(l.createElement)((function(t){var e=t.className,r=t.isPressed,o=f(f({},i(t,["className","isPressed"])),{},{className:s()(e,{"is-pressed":r})||void 0,role:"img","aria-hidden":!0,focusable:!1});return Object(l.createElement)("svg",o)}),{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(l.createElement)((function(t){return Object(l.createElement)("path",t)}),{d:"M18 8H6c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm.5 6c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5h12c.3 0 .5.2.5.5v4zM4 4v1.5h16V4H4zm0 16h16v-1.5H4V20z"}));function m(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function y(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function h(t,e){return(h=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var v=r(6),d=r.n(v);function g(t,e){return!e||"object"!==d()(e)&&"function"!=typeof e?y(t):e}function O(t){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var x=r(2);function C(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,o=O(t);if(e){var n=O(this).constructor;r=Reflect.construct(o,arguments,n)}else r=o.apply(this,arguments);return g(this,r)}}var j=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&h(t,e)}(i,t);var e,r,o,l=C(i);function i(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(e=l.call(this,t)).wasTextColorAutomaticallyComputed=!1,e.pullQuoteMainColorSetter=e.pullQuoteMainColorSetter.bind(y(e)),e.pullQuoteTextColorSetter=e.pullQuoteTextColorSetter.bind(y(e)),e}return e=i,(r=[{key:"componentDidUpdate",value:function(t){var e=this.props,r=e.attributes,o=(e.className,e.mainColor),n=e.setAttributes;r.mainColor&&n({mainColor:void 0,customMainColor:o.color})}},{key:"pullQuoteMainColorSetter",value:function(t){var e=this.props,r=e.colorUtils,o=e.textColor,n=e.setAttributes,c=e.setTextColor,l=(e.setMainColor,e.className,!o.color||this.wasTextColorAutomaticallyComputed);n({customMainColor:t}),l&&(t?(this.wasTextColorAutomaticallyComputed=!0,c(r.getMostReadableColor(t))):this.wasTextColorAutomaticallyComputed&&(this.wasTextColorAutomaticallyComputed=!1,c()))}},{key:"pullQuoteTextColorSetter",value:function(t){(0,this.props.setTextColor)(t),this.wasTextColorAutomaticallyComputed=!1}},{key:"render",value:function(){var t=this.props,e=t.attributes,r=t.mainColor,o=t.textColor,l=t.setAttributes,i=t.isSelected,u=t.className,p=t.insertBlocksAfter,f=e.value,b=e.citation,m={"--mark-color":r.color},y=s()(u),h={color:o.color},v=o.color&&s()("has-text-color",a({},o.class,o.class));return React.createElement(React.Fragment,null,React.createElement("figure",{style:m,className:y},React.createElement("blockquote",{style:h,className:v},React.createElement(x.RichText,{identifier:"value",multiline:!0,value:f,onChange:function(t){return l({value:t})},placeholder:Object(c.__)("Write quote…"),textAlign:"center"}),(!x.RichText.isEmpty(b)||i)&&React.createElement(x.RichText,{identifier:"citation",value:b,placeholder:Object(c.__)("Write citation…"),onChange:function(t){return l({citation:t})},__unstableMobileNoFocusOnMount:!0,textAlign:"center",__unstableOnSplitAtEnd:function(){return p(Object(n.createBlock)("core/paragraph"))}}))),React.createElement(x.InspectorControls,null,React.createElement(x.PanelColorSettings,{title:Object(c.__)("Color settings"),colorSettings:[{value:r.color,onChange:this.pullQuoteMainColorSetter,label:Object(c.__)("Mark color")},{value:o.color,onChange:this.pullQuoteTextColorSetter,label:Object(c.__)("Text color")}]})))}}])&&m(e.prototype,r),o&&m(e,o),i}(l.Component),w=Object(x.withColors)({mainColor:"--mark-color",textColor:"color"})(j),_=r(5);var k,S={from:[{type:"block",blocks:["core/paragraph"],transform:function(t){var e=t.content;return Object(n.createBlock)("prc-block/pullquote",{value:"<p>".concat(e,"</p>"),citation:"Citation Needed"})}}],to:[{type:"block",blocks:["core/paragraph"],transform:function(t){var e=t.value;return Object(n.createBlock)("core/paragraph",{content:e})}}]},E=_.name,R=_.category,T=_.attributes,A=_.supports,M=[E,{title:Object(c.__)("Pullquote"),description:Object(c.__)("Give special visual emphasis to a quote from your text."),icon:b,category:R,attributes:T,supports:A,example:{attributes:{value:"<p>".concat(Object(c.__)("One of the hardest things to do in technology is disrupt yourself."),"</p>"),citation:Object(c.__)("Matt Mullenweg")}},styles:[{name:"has-marks",label:Object(c._x)("Has Marks","block style"),isDefault:!0},{name:"no-marks",label:Object(c.__)("No Marks")}],transforms:S,edit:w,save:function(t){var e=t.attributes,r=e.customMainColor,o=e.textColor,n=e.customTextColor,c=e.value,l=e.citation,i=(e.className,{"--mark-color":r}),u=Object(x.getColorClassName)("color",o),p=(o||n)&&s()("has-text-color",a({},u,u)),f=u?void 0:{color:n};return React.createElement("figure",{className:void 0,style:i},React.createElement("blockquote",{className:p,style:f},React.createElement(x.RichText.Content,{value:c,multiline:!0}),!x.RichText.isEmpty(l)&&React.createElement(x.RichText.Content,{tagName:"cite",value:l})))}}];n.registerBlockType.apply(void 0,function(t){if(Array.isArray(t))return o(t)}(k=M)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(k)||function(t,e){if(t){if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?o(t,e):void 0}}(k)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())}],[[8,1]]]);
//# sourceMappingURL=main-e8233535.js.map