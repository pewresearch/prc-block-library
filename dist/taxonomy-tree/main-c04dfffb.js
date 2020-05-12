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
(window["wpackioprcBlocksLibrarytaxonomy-treeJsonp"]=window["wpackioprcBlocksLibrarytaxonomy-treeJsonp"]||[]).push([[0],{16:function(e,t){e.exports=wp.i18n},2:function(e,t){e.exports=React},200:function(e,t,a){"use strict";a.r(t);var n=a(80),c=(a(94),a(66)),r=a(16),o=(a(26),a(7)),i=a(203),s=function(e){var t=e.heading,a=e.setAttributes;return React.createElement("div",{className:"title"},React.createElement("div",null,React.createElement(i.a,{name:"caret down"})),!1!==a&&React.createElement(o.RichText,{tagName:"h2",value:t,onChange:function(e){return a({heading:e})},placeholder:"Politics",formattingControls:["link"],keepPlaceholderOnFocus:!0,className:"sans-serif"}),!1===a&&React.createElement(o.RichText.Content,{tagName:"h2",value:t,className:"sans-serif"}),React.createElement("div",null,React.createElement(i.a,{name:"chevron right",size:"large"})))},l=["prc-block/taxonomy-tree-list"],u=function(e){var t=e.attributes,a=e.className,n=e.setAttributes,c=t.heading;return React.createElement("div",{className:a},React.createElement(s,{heading:c,setAttributes:n}),React.createElement(o.InnerBlocks,{allowedBlocks:l}))},m=function(e){var t=e.attributes,a=e.className,n=t.heading;return React.createElement("div",{className:a},React.createElement(s,{heading:n,setAttributes:!1}),React.createElement(o.InnerBlocks.Content,null))},p=["prc-block/taxonomy-tree",{title:Object(r.__)("Tree List"),description:"A tree list that can be expanded.",category:"layout",icon:"networking",keywords:[Object(r.__)("Taxonomy Tree"),Object(r.__)("Taxonomies"),Object(r.__)("Tree")],supports:{html:!1,align:!1},attributes:{heading:{type:"string",source:"html",selector:"h2",default:""}},edit:u,save:m}];c.registerBlockType.apply(void 0,Object(n.a)(p))},26:function(e,t){e.exports=wp.element},66:function(e,t){e.exports=wp.blocks},7:function(e,t){e.exports=wp.blockEditor},92:function(e,t,a){a(93),e.exports=a(200)},94:function(e,t,a){}},[[92,1,2]]]);
//# sourceMappingURL=main-c04dfffb.js.map