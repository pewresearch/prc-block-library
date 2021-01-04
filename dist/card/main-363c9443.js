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
(window.wpackioprcBlocksLibrarycardJsonp=window.wpackioprcBlocksLibrarycardJsonp||[]).push([[0],{0:function(e,t){e.exports=React},12:function(e,t){e.exports=ReactDOM},15:function(e,t){e.exports=wp.components},20:function(e,t){e.exports=wp.blocks},34:function(e,t,a){a(35),e.exports=a(43)},36:function(e,t,a){},4:function(e,t){e.exports=wp.element},43:function(e,t,a){"use strict";a.r(t);var r=a(25),l=a(6),c=a(60),n=a(4),s=a(20),i=a(9),o=a(15),p=(a(36),a(21)),u=a.n(p),m=a(59),d=["core/paragraph","core/heading","core/list","core/image","core/separator","prc-block/staff","prc-block/story-item","prc-block/wp-query"],b=function(e){var t=e.className,a=e.isDisplay,r=e.setAttributes,l=e.link,c=e.label,s=e.title,o=u()(t,{basic:"is-style-borderless"===t});return React.createElement(m.a,{fluid:!0,className:o},React.createElement(m.a.Header,null,React.createElement(n.Fragment,null,!1===a&&React.createElement(i.RichText,{tagName:"div",value:s,onChange:function(e){return r({title:e})},placeholder:"Card Title"}),!0===a&&""===l&&React.createElement("span",null,s),!0===a&&""!==l&&React.createElement("a",{href:l},s))),React.createElement(m.a.Content,null,!1!==r&&React.createElement(i.InnerBlocks,{allowedBlocks:d}),!1===r&&!0===a&&React.createElement(i.InnerBlocks.Content,null),""!==c&&""!==l&&React.createElement("p",{className:"relaxed"},React.createElement("a",{href:l,className:"read-more"},c))))};Object(s.registerBlockType)("prc-block/card",{title:Object(l.__)("Card"),icon:c.a,category:"widgets",keywords:[Object(l.__)("prc"),Object(l.__)("card"),Object(l.__)("baseball card"),Object(l.__)("packaged card")],styles:[{name:"default",label:"Basic (Baseball Card)",isDefault:!0},{name:"borderless",label:"Basic Borderless"},{name:"beige",label:"Beige (Borderless)"},{name:"oatmeal",label:"Oatmeal (Borderless)"}],supports:{html:!1},attributes:{link:{type:"string",default:"https://www.pewresearch.org/"},label:{type:"string",default:"Read More"},title:{type:"string",default:"Card Title"}},deprecated:[{attributes:{link:{type:"string"},label:{type:"string"},title:{type:"string"},image:{type:"string"},excerpt:{type:"string"}},migrate:function(e,t){return[(0,window.lodash.omit)(e,["excerpt","image"]),[createBlock("core/image",{url:e.image,sizeSlug:"large"}),createBlock("core/paragraph",{content:e.excerpt})].concat(Object(r.a)(t))]},save:function(e){var t=e.attributes;return t.isDisplay=!0,t.setAttributes=!1,React.createElement(b,t)}}],edit:function(e){var t=e.attributes,a=e.setAttributes,r=e.isSelected,c=t;return c.setAttributes=a,c.isDisplay=!0,!0===r&&(c.isDisplay=!1),React.createElement(n.Fragment,null,!0===r&&React.createElement(i.InspectorControls,null,React.createElement(o.PanelBody,{title:Object(l.__)("Card Options")},React.createElement("div",null,React.createElement(o.TextControl,{label:"Link",value:t.link,onChange:function(e){return a({link:e})}})),React.createElement("div",null,React.createElement(o.TextControl,{label:"Read More Text",value:t.label,onChange:function(e){return a({label:e})}})))),React.createElement("div",{style:{maxWidth:"400px"}},React.createElement(b,c)))},save:function(e){var t=e.attributes;return t.isDisplay=!0,t.setAttributes=!1,React.createElement(b,t)}})},6:function(e,t){e.exports=wp.i18n},9:function(e,t){e.exports=wp.blockEditor}},[[34,1,2]]]);
//# sourceMappingURL=main-363c9443.js.map