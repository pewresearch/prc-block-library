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
(window["wpackioprcBlocksLibrarystory-itemJsonp"]=window["wpackioprcBlocksLibrarystory-itemJsonp"]||[]).push([[4],{0:function(e,t){e.exports=React},1:function(e,t){e.exports=wp.element},11:function(e,t){e.exports=wp.blockEditor},135:function(e,t){e.exports=wp.blocks},163:function(e,t,a){a(104),e.exports=a(290)},25:function(e,t){e.exports=moment},29:function(e,t){e.exports=wp.apiFetch},290:function(e,t,a){"use strict";a.r(t);var l=a(55);var n=a(66);var r,o=a(135),i=a(31),c=a(25),s=a(20),p=a(1),u=a(43),m=a(11),d=a(8),b=a(29),g=a.n(b),f=function(e){var t=e.postID,a=e.link,l=e.imageSlot,n=e.enableHeader,r=e.enableExcerpt,o=e.enableExcerptBelow,c=e.enableExtra,s=e.enableBreakingNews,b=e.enableEmphasis,f=e.enableProgramsTaxonomy,E=e.setAttributes,y=Object(p.useState)(a),h=Object(u.a)(y,2),w=h[0],x=h[1];return React.createElement(m.InspectorControls,null,React.createElement(d.PanelBody,{title:Object(i.__)("Story Item Options")},React.createElement("div",null,React.createElement(d.TextControl,{label:"Post ID",value:t,disabled:!0})),React.createElement("div",{className:"story-item-link"},React.createElement("div",null,React.createElement(d.TextControl,{label:"Link",value:w,onChange:function(e){x(e),E({link:e})}})),React.createElement("div",null,React.createElement(d.Button,{onClick:function(){return function(e,t){if(void 0!==t&&void 0!==e){var a,l,n;g()({path:"/prc-api/v2/blocks/helpers/get-post-by-url/?url=".concat(e,"&siteID=").concat((a=e,l=window.siteDomain,n=1,a.includes("".concat(l,"/global/"))?n=2:a.includes("".concat(l,"/hispanic/"))?n=5:a.includes("".concat(l,"/science/"))?n=16:a.includes("".concat(l,"/methods/"))?n=10:a.includes("".concat(l,"/internet/"))?n=9:a.includes("".concat(l,"/politics/"))?n=4:a.includes("https://www.pewforum.org/")?n=7:a.includes("https://www.journalism.org/")?n=8:a.includes("https://www.pewsocialtrends.org/")?n=3:(a.includes("https://www.pewresearch.org/")||a.includes(l))&&(n=1),n))}).then((function(e){if(!1!==e){var a={title:e.title,excerpt:e.excerpt,link:e.link,label:e.label,date:e.date,postID:e.id,extra:""};e.art||(a.image=e.image),t(a)}}))}}(a,E)},isPrimary:!0,style:{height:"30px"}},"Fetch"))),React.createElement("div",null,React.createElement("p",null,React.createElement("strong",null,"Content Options:"))),React.createElement("div",null,React.createElement(d.ToggleControl,{label:n?"Header Enabled":"Header Disabled",checked:n,onChange:function(){E({enableHeader:!n})}})),React.createElement("div",null,React.createElement(d.ToggleControl,{label:r?"Excerpt Enabled":"Excerpt Disabled",checked:r,onChange:function(){E({enableExcerpt:!r})}})),React.createElement("div",null,React.createElement(d.ToggleControl,{label:c?"Extras Enabled":"Extras Disabled",checked:c,onChange:function(){E({enableExtra:!c})}})),React.createElement("div",null,React.createElement(d.ToggleControl,{label:s?"Breaking News Enabled":"Breaking News Disabled",checked:s,onChange:function(){!1!==window.prcBreakingNews?E({enableBreakingNews:!s}):(alert("There are no currently active, authorized, breaking news events. The breaking news toggle will be set back to false."),E({enableBreakingNews:!1}))}})),React.createElement("div",null,React.createElement(d.ToggleControl,{label:f?"Programs":"Formats",checked:f,onChange:function(){E({enableProgramsTaxonomy:!f})}})),React.createElement("div",null,React.createElement("p",null,React.createElement("strong",null,"Style Options:"))),React.createElement("div",null,React.createElement(d.ToggleControl,{label:b?"Emphasis Enabled":"Emphasis Disabled",checked:b,onChange:function(){E({enableEmphasis:!b})}}),!0===r&&("right"===l||"left"===l)&&React.createElement("div",null,React.createElement(d.ToggleControl,{label:o?"Excerpt Will Appear Below":"Excerpt Will Appear Normally",checked:o,onChange:function(){E({enableExcerptBelow:!o})}})))))},E=function(e){var t=e.attributes,a=e.setAttributes,l=e.isSelected;!function(e,t){Object(s.e)("is-style-top",e,"imageSlot","top",t),Object(s.e)("is-style-bottom",e,"imageSlot","bottom",t),Object(s.e)("is-style-left",e,"imageSlot","left",t),Object(s.e)("is-style-right",e,"imageSlot","right",t),Object(s.e)("is-style-disabled",e,"imageSlot","disabled",t),Object(s.e)("",e,"imageSlot","default",t)}(t.className,a);var n=t;return n.isSelected=l,n.setAttributes=a,React.createElement(p.Fragment,null,!0===l&&React.createElement(f,n),React.createElement(s.a,n))},y=function(e){var t=e.attributes;return React.createElement(s.b,t)},h=["prc-block/story-item",{title:Object(i.__)("Story Item"),icon:"format-aside",category:"widgets",keywords:[Object(i.__)("prc"),Object(i.__)("story"),Object(i.__)("post"),Object(i.__)("story item")],styles:[{name:"disabled",label:"Image Disabled"},{name:"default",label:"Default Image Alignment",isDefault:!0},{name:"top",label:"Image Aligned Top"},{name:"bottom",label:"Image Aligned Bottom"},{name:"left",label:"Image Aligned Left"},{name:"right",label:"Image Aligned Right"}],example:{attributes:{title:"Ultricies Ipsum Nibh Egestas Purus",excerpt:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>",extra:"<li></li>",link:"#",label:"Report",date:c().format("MM-DD-YYYY"),image:"https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg",imageSlot:"top",imageSize:"A2"}},supports:{html:!1},attributes:{title:{type:"string",default:"Title"},excerpt:{type:"string",source:"html",multiline:"p",selector:".description",default:"<p>Excerpt</p>"},extra:{type:"string",source:"html",multiline:"li",selector:".extra",default:""},link:{type:"string",default:""},label:{type:"string",default:"Report"},date:{type:"string"},image:{type:"string",default:""},imageSlot:{type:"string",default:"disabled"},imageSize:{type:"string",default:"A1"},isChartArt:{type:"boolean",default:!1},postID:{type:"integer"},headerSize:{type:"string",default:"normal"},enableEmphasis:{type:"boolean",default:!1},enableHeader:{type:"boolean",default:!0},enableExcerpt:{type:"boolean",default:!0},enableExcerptBelow:{type:"boolean",default:!1},enableExtra:{type:"boolean",default:!1},enableBreakingNews:{type:"boolean",default:!1},enableProgramsTaxonomy:{type:"boolean",default:!1}},edit:E,save:y}];o.registerBlockType.apply(void 0,function(e){if(Array.isArray(e))return Object(l.a)(e)}(r=h)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(r)||Object(n.a)(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())},31:function(e,t){e.exports=wp.i18n},39:function(e,t){e.exports=ReactDOM},70:function(e,t){e.exports=lodash},8:function(e,t){e.exports=wp.components},94:function(e,t){e.exports=wp.url},97:function(e,t){e.exports=wp.htmlEntities}},[[163,1,2,0]]]);
//# sourceMappingURL=main-e8d7be64.js.map