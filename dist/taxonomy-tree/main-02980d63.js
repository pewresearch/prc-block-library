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
(window["wpackioprcBlocksLibrarytaxonomy-treeJsonp"]=window["wpackioprcBlocksLibrarytaxonomy-treeJsonp"]||[]).push([[0],{0:function(e,t){e.exports=React},10:function(e,t){e.exports=wp.blockEditor},124:function(e,t){e.exports=wp.blocks},126:function(e,t){e.exports=wp.url},138:function(e,t){e.exports=wp.htmlEntities},150:function(e,t,n){n(151),e.exports=n(277)},152:function(e,t,n){},18:function(e,t){e.exports=wp.components},275:function(e,t,n){},276:function(e,t,n){},277:function(e,t,n){"use strict";n.r(t);var a=n(140),c=(n(152),n(124)),r=n(48),l=n(6),i=n(10),o=(n(39),n(60)),s=n.n(o),u=function(e,t,n){void 0===t&&(t=25);var a=new wp.api.collections[e];return void 0!==n?new Promise((function(e){s()({path:"/prc-api/v2/blocks/helpers/get-taxonomy-by-letter/?taxonomy=topic&letter=".concat(n)}).then((function(t){e(t)}))})):void 0!==a&&new Promise((function(n){var c={};a.fetch({data:{hide_empty:!1,per_page:t}}).then((function(t){for(var a=0;a<t.length;a++){var r=t[a].slug.replace("".concat(e.toLowerCase(),"_"),"");c[t[a].id]={id:t[a].id,name:t[a].name,slug:r}}n(c)}))}))},m=(n(19),n(26),n(282),n(65),n(126),n(63),n(18)),d=n(283);Object(d.a)({labelOptions:[]})((function(e){var t=e.label,n=e.date,a=e.taxonomy,c=e.setAttributes,r=e.setState,i=e.labelOptions;return Object(l.useEffect)((function(){(function(e,t){return new Promise((function(n){u(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(n){var a=e[n];t.push({value:a.name,label:a.name})})),t.sort((function(e,t){return e.label>t.label?1:-1})),n(t)}))}))})(a).then((function(e){r({labelOptions:e})}))}),[a]),React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(m.SelectControl,{value:t,options:i,onChange:function(e){c({label:e})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(m.TextControl,{value:n,onChange:function(e){c({date:e})}})))}));n(275),n(276);var p=n(89),f=function(e){var t=e.heading,n=e.chevron,a=e.placeholder,c=e.setAttributes,r=e.children;return React.createElement("div",{className:"prc-collapsible-list"},React.createElement("div",{className:"title"},React.createElement("div",null,React.createElement(p.a,{name:"caret down"})),!1!==c&&React.createElement(i.RichText,{tagName:"h2",value:t,onChange:function(e){return c({heading:e})},placeholder:a,formattingControls:["link"],keepPlaceholderOnFocus:!0,className:"sans-serif"}),!1===c&&React.createElement(i.RichText.Content,{tagName:"h2",value:t,className:"sans-serif"}),!0===n&&React.createElement("div",null,React.createElement(p.a,{name:"chevron right",size:"large"}))),React.createElement("div",{className:"content"},r))},h=n(138),g=n(139),v=(Object(d.a)({termsData:[],excludeData:[],includeData:[]})((function(e){var t=e.termsData,n=e.excludeData,a=e.includeData,c=e.setState,r=e.exclude,i=e.include,o=e.letter,s=e.taxonomy,d=e.setAttributes,p=e.isSelected,f=function(){u(s,100,o).then((function(e){c({termsData:e}),function(e){var t={};if(0!==e.length&&0!==r.length&&(t.excludeData=JSON.parse(r)),0!==e.length&&0===i.length){var n=[];e.map((function(e){n.push({id:e.term_id,name:e.name,slug:e.slug})})),d({include:JSON.stringify(n)}),t.includeData=n}else 0!==e.length&&0!==i.length&&(t.includeData=JSON.parse(i));c(t)}(e)}))};!1!==d&&Object(g.a)((function(){0===t.length&&f()}));var v=0!==i.length&&!1===d&&JSON.parse(i);return React.createElement("div",{className:"ui link list"},!1!==v&&React.createElement(l.Fragment,null,v.map((function(e){return React.createElement("a",{className:"item",href:"/".concat(s.toLowerCase(),"/").concat(e.slug)},e.name)}))),!1!==d&&React.createElement(l.Fragment,null,t.map((function(e){var t=r.includes(e.term_id);return React.createElement("div",{className:"item"},React.createElement(m.CheckboxControl,{label:Object(h.decodeEntities)(e.name),checked:t,onChange:function(t){var c,r,l,i,o,s,u;c=t,r=e.term_id,l=e.name,i=e.slug,s=n,u=a,!0===c?(s.push(r),-1!==(o=u.findIndex((function(e){return e.id===r})))&&u.splice(o,1)):(u.push({id:r,name:l,slug:i}),function(){var e=s.indexOf(r);-1!==e&&s.splice(e,1)}()),d({exclude:JSON.stringify(s),include:JSON.stringify(u)})},"data-termid":e.term_id,"data-term":e.name}),React.createElement("div",{style:{height:"15px",marginTop:"-5px"}},!0===p&&React.createElement("pre",{style:{fontSize:"11px",margin:0}},"(",e.slug,")")))}))))})),["prc-block/taxonomy-tree-list"]),b=function(e){var t=e.attributes,n=e.className,a=e.setAttributes,c=t.heading;return React.createElement("div",{className:n},React.createElement(f,{heading:c,placeholder:"Politics",chevron:!0,setAttributes:a},React.createElement(i.InnerBlocks,{allowedBlocks:v})))},x=function(e){var t=e.attributes,n=e.className,a=t.heading;return React.createElement("div",{className:n},React.createElement(f,{heading:a,chevron:!0,setAttributes:!1},React.createElement(i.InnerBlocks.Content,null)))},E=["prc-block/taxonomy-tree",{title:Object(r.__)("Tree List"),description:"A tree list that can be expanded.",category:"layout",icon:"networking",keywords:[Object(r.__)("Taxonomy Tree"),Object(r.__)("Taxonomies"),Object(r.__)("Tree")],supports:{html:!1,align:!1},attributes:{heading:{type:"string",source:"html",selector:"h2",default:""}},edit:b,save:x}];c.registerBlockType.apply(void 0,Object(a.a)(E))},39:function(e,t){e.exports=moment},47:function(e,t){e.exports=ReactDOM},48:function(e,t){e.exports=wp.i18n},6:function(e,t){e.exports=wp.element},60:function(e,t){e.exports=wp.apiFetch},86:function(e,t){e.exports=lodash}},[[150,1,2]]]);
//# sourceMappingURL=main-02980d63.js.map