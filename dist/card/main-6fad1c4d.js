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
(window.wpackioprcBlocksLibrarycardJsonp=window.wpackioprcBlocksLibrarycardJsonp||[]).push([[0],{0:function(e,t){e.exports=React},115:function(e,t,a){a(116),e.exports=a(234)},117:function(e,t,a){},22:function(e,t){e.exports=wp.i18n},234:function(e,t,a){"use strict";a.r(t);var l=a(22),r=a(44),n=a(95),c=a(26),s=a(46),i=(a(117),a(96)),o=a.n(i),u=a(240),p=["core/paragraph","core/heading","core/list","core/image","prc-block/story-item"],d=function(e){var t=e.className,a=e.isDisplay,l=e.setAttributes,n=e.link,s=e.label,i=e.title,d=o()(t,{basic:"is-style-borderless"===t});return React.createElement(u.a,{fluid:!0,className:d},React.createElement(u.a.Header,null,React.createElement(r.Fragment,null,!1===a&&React.createElement(c.RichText,{tagName:"div",value:i,onChange:function(e){return l({title:e})},placeholder:"Card Title"}),!0===a&&""===n&&React.createElement("span",null,i),!0===a&&""!==n&&React.createElement("a",{href:n},i))),React.createElement(u.a.Content,null,!1!==l&&React.createElement(c.InnerBlocks,{allowedBlocks:p}),!1===l&&!0===a&&React.createElement(c.InnerBlocks.Content,null),""!==s&&""!==n&&React.createElement("p",null,React.createElement("strong",null,React.createElement("a",{href:n,className:"read-more"},s)))))};Object(n.registerBlockType)("prc-block/card",{title:Object(l.__)("Card"),icon:"format-aside",category:"widgets",keywords:[Object(l.__)("prc"),Object(l.__)("card"),Object(l.__)("baseball card"),Object(l.__)("packaged card")],styles:[{name:"default",label:"Basic (Baseball Card)",isDefault:!0},{name:"borderless",label:"Basic Borderless"},{name:"beige",label:"Beige (Borderless)"},{name:"oatmeal",label:"Oatmeal (Borderless)"}],supports:{html:!1},attributes:{link:{type:"string",default:"https://www.pewresearch.org/"},label:{type:"string",default:"Read More"},title:{type:"string",default:"Card Title"}},edit:function(e){var t=e.attributes,a=e.setAttributes,n=e.isSelected,i=t;return i.setAttributes=a,i.isDisplay=!0,!0===n&&(i.isDisplay=!1),React.createElement(r.Fragment,null,!0===n&&React.createElement(c.InspectorControls,null,React.createElement(s.PanelBody,{title:Object(l.__)("Card Options")},React.createElement("div",null,React.createElement(s.TextControl,{label:"Link",value:t.link,onChange:function(e){return a({link:e})}})),React.createElement("div",null,React.createElement(s.TextControl,{label:"Read More Text",value:t.label,onChange:function(e){return a({label:e})}})))),React.createElement("div",{style:{maxWidth:"400px"}},React.createElement(d,i)))},save:function(e){var t=e.attributes;return t.isDisplay=!0,t.setAttributes=!1,React.createElement(d,t)}})},26:function(e,t){e.exports=wp.blockEditor},33:function(e,t){e.exports=ReactDOM},44:function(e,t){e.exports=wp.element},46:function(e,t){e.exports=wp.components},95:function(e,t){e.exports=wp.blocks}},[[115,1,2]]]);
//# sourceMappingURL=main-6fad1c4d.js.map