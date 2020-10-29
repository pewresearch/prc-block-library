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
(window["wpackioprcBlocksLibrarywp-queryJsonp"]=window["wpackioprcBlocksLibrarywp-queryJsonp"]||[]).push([[0],{0:function(e,t){e.exports=React},1:function(e,t){e.exports=wp.element},132:function(e,t){e.exports=wp.url},144:function(e,t){e.exports=wp.htmlEntities},157:function(e,t,n){n(158),e.exports=n(283)},25:function(e,t){e.exports=wp.apiFetch},281:function(e,t,n){},282:function(e,t,n){},283:function(e,t,n){"use strict";n.r(t);var a=n(147),r=n(52),l=n(32),o=n(69),c=n(20),i=n(1),s=n(33),u=n(9),m=n(4),p=n(30),f=n(25),d=n.n(f),b=window.wp,g=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:25,n=e,a=new b.api.collections[n];return void 0!==a&&new Promise((function(e){var r={};a.fetch({data:{hide_empty:!1,per_page:t}}).then((function(t){for(var a=0;a<t.length;a++){var l=t[a].slug.replace("".concat(n.toLowerCase(),"_"),"");r[t[a].id]={id:t[a].id,name:t[a].name,slug:l}}e(r)}))}))},h=(n(21),n(12),n(146),n(288),n(71),n(132),n(54),n(289)),y=(Object(h.a)({labelOptions:[]})((function(e){var t=e.label,n=e.date,a=e.taxonomy,r=e.setAttributes,l=e.setState,o=e.labelOptions;return Object(i.useEffect)((function(){(function(e,t){return new Promise((function(n){g(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(n){var a=e[n];t.push({value:a.name,label:a.name})})),t.sort((function(e,t){return e.label>t.label?1:-1})),n(t)}))}))})(a).then((function(e){l({labelOptions:e})}))}),[a]),React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(m.SelectControl,{value:t,options:o,onChange:function(e){r({label:e})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(m.TextControl,{value:n,onChange:function(e){r({date:e})},style:{marginBottom:"0px"},className:"story-label-select"})))})),n(281),n(282),n(95),n(144)),v=n(145),x=(Object(h.a)({termsData:[],excludeData:[],includeData:[]})((function(e){var t=e.termsData,n=e.excludeData,a=e.includeData,r=e.setState,l=e.exclude,o=e.include,c=(e.letter,e.taxonomy),s=e.setAttributes,u=e.isSelected,p=function(){(function(e,t){return new Promise((function(n){d()({path:"/prc-api/v2/blocks/helpers/get-taxonomy-by-letter/?taxonomy=".concat(e,"&letter=").concat(t)}).then((function(e){n(e)}))}))})(c,100).then((function(e){r({termsData:e}),function(e){var t={};if(0!==e.length&&0!==l.length&&(t.excludeData=JSON.parse(l)),0!==e.length&&0===o.length){var n=[];e.map((function(e){n.push({id:e.term_id,name:e.name,slug:e.slug})})),s({include:JSON.stringify(n)}),t.includeData=n}else 0!==e.length&&0!==o.length&&(t.includeData=JSON.parse(o));r(t)}(e)}))};!1!==s&&Object(v.a)((function(){0===t.length&&p()}));var f=0!==o.length&&!1===s&&JSON.parse(o);return React.createElement("div",{className:"ui link list"},!1!==f&&React.createElement(i.Fragment,null,f.map((function(e){return React.createElement("a",{className:"item",href:"/".concat(c.toLowerCase(),"/").concat(e.slug)},e.name)}))),!1!==s&&React.createElement(i.Fragment,null,t.map((function(e){var t=l.includes(e.term_id);return React.createElement("div",{className:"item"},React.createElement(m.CheckboxControl,{label:Object(y.decodeEntities)(e.name),checked:t,onChange:function(t){var r,l,o,c,i,u,m;r=t,l=e.term_id,o=e.name,c=e.slug,u=n,m=a,!0===r?(u.push(l),-1!==(i=m.findIndex((function(e){return e.id===l})))&&m.splice(i,1)):(m.push({id:l,name:o,slug:c}),function(){var e=u.indexOf(l);-1!==e&&u.splice(e,1)}()),s({exclude:JSON.stringify(u),include:JSON.stringify(m)})},"data-termid":e.term_id,"data-term":e.name}),React.createElement("div",{style:{height:"15px",marginTop:"-5px"}},!0===u&&React.createElement("pre",{style:{fontSize:"11px",margin:0}},"(",e.slug,")")))}))))})),function(e,t,n,a,r,l){return new Promise((function(o){var c=[],i="/prc-api/v2/fetch-posts/?postType=".concat(e,"&perPage=").concat(t,"&formatTermId=").concat(n,"&programTermId=").concat(a,"&labelTaxonomy=").concat(r);"staff"===e&&(i="/prc-api/v2/fetch-posts/?postType=".concat(e,"&perPage=").concat(t,"&programTermId=").concat(a,"&expertsOnly=").concat(l)),console.log("fetchPosts?",e,t,n,a,r,l),d()({path:i}).then((function(e){console.log(e),e.forEach((function(e){var t,n={id:e.id,title:e.title,excerpt:e.excerpt,date:(t=e.timestamp,p(t).format("MMM D, YYYY")),link:e.link,label:e.label,image:e.image};c.push(n)})),o(c)}))}))}),E=function(e){var t=e.attributes,n=e.setAttributes,a=e.wide,r=void 0!==a&&a,l=e.disabled,o=void 0!==l&&l,s=t.expertsOnly,u=t.formatTermId,p=t.programTermId,f=t.perPage,d=t.postType,b=t.labelTaxonomy,h=t.disableImage,y=Object(i.useState)([]),v=Object(c.a)(y,2),x=v[0],E=v[1],R=Object(i.useState)([]),k=Object(c.a)(R,2),O=k[0],T=k[1],w=function(e,n){console.log("initTerms",t),g(e).then((function(e){var t=Object.keys(e),a=[{value:"any",label:"Any"}];t.forEach((function(t){a.push({value:t,label:e[t].name})})),n(a)}))};return Object(i.useEffect)((function(){0===x.length&&w("Formats",E),0===O.length&&w("Programs",T)}),[]),React.createElement(i.Fragment,null,React.createElement(m.SelectControl,{label:"Post Type",value:d,options:[{value:"stub",label:"Stub"},{value:"staff",label:"Staff"}],onChange:function(e){n({postType:e})},disabled:o}),React.createElement(m.HorizontalRule,null),"staff"===d&&React.createElement(m.ToggleControl,{label:"Limit to experts",checked:s,onChange:function(){return n({expertsOnly:!s})}}),"stub"===d&&React.createElement(m.ToggleControl,{label:"Disable Image",checked:h,onChange:function(){return n({disableImage:!h})}}),React.createElement(m.HorizontalRule,null),"stub"===d&&React.createElement("div",{style:!0===r?{display:"flex",flexDirection:"row"}:{}},React.createElement("div",{style:!0===r?{flexGrow:"1",paddingRight:"1em"}:{}},React.createElement(m.SelectControl,{label:"Format",value:u,options:x,onChange:function(e){n({formatTermId:parseInt(e)})},disabled:o})),React.createElement("div",{style:!0===r?{display:"flex",alignItems:"flex-end",paddingBottom:"0.2em"}:{}},React.createElement(m.ToggleControl,{label:"Use as Label",checked:"formats"===b,onChange:function(){return n({labelTaxonomy:"formats"===b?"programs":"formats"})}}))),React.createElement("div",{style:!0===r?{display:"flex",flexDirection:"row"}:{}},React.createElement("div",{style:!0===r&&"stub"===d?{flexGrow:"1",paddingRight:"1em"}:{}},React.createElement(m.SelectControl,{label:"Program",value:p,options:O,onChange:function(e){n({programTermId:parseInt(e)})},disabled:o})),"stub"===d&&React.createElement("div",{style:!0===r?{display:"flex",alignItems:"flex-end",paddingBottom:"0.2em"}:{}},React.createElement(m.ToggleControl,{label:"Use as Label",checked:"programs"===b,onChange:function(){return n({labelTaxonomy:"programs"===b?"formats":"programs"})}}))),React.createElement(m.TextControl,{label:"stub"===d?"Number of Posts":"Number of Staff",value:f,onChange:function(e){return n({perPage:parseInt(e)})},disabled:o,autoComplete:"off"}))},R=function(e){var t=e.attributes,n=e.setAttributes,a=e.setPosts,r=e.clientId,o=Object(i.useState)(!1),p=Object(c.a)(o,2),f=p[0],d=p[1],b=Object(s.useSelect)((function(e){return{hasInnerBlocks:0<e("core/block-editor").getBlocks(r).length}}),[r]).hasInnerBlocks,g=function(){d(!0);var e=t.postType,n=t.formatTermId,r=t.programTermId,l=t.perPage,o=t.labelTaxonomy,c=t.expertsOnly;x(e,l,n,r,o,c).then((function(e){setTimeout((function(){d(!1),a(e)}),3600)}))};return React.createElement(i.Fragment,null,React.createElement(u.InspectorControls,null,React.createElement(m.PanelBody,{title:Object(l.__)("Query Arguments")},React.createElement(E,{attributes:t,setAttributes:n,disabled:f}),React.createElement(m.Button,{isBusy:f,isPrimary:!0,onClick:function(){return g()}},"Update"))),!1===b&&React.createElement(m.Placeholder,{label:"Configure Query Args",isColumnLayout:!0},React.createElement("div",null,React.createElement(E,{attributes:t,setAttributes:n,disabled:f,wide:!0}),React.createElement(m.Button,{isBusy:f,isPrimary:!0,onClick:function(){return g()}},"Query Posts"))))},k=["prc-block/story-item"],O=function(e){var t=e.attributes,n=e.setAttributes,a=e.className,l=e.clientId,o=t.pinned,m=t.postType,p=t.perPage,f=t.labelTaxonomy,d=t.disableImage,b=Object(i.useState)(!1),g=Object(c.a)(b,2),h=g[0],y=g[1],v=Object(s.useDispatch)("core/block-editor").replaceInnerBlocks,x=Object(s.useSelect)((function(e){var t=e("core/block-editor").getBlocks(l);return{innerBlocks:t,hasInnerBlocks:0<t.length}}),[l]),E=x.innerBlocks,O=x.hasInnerBlocks;return Object(i.useEffect)((function(){if(!1!==h){var e=[];h.forEach((function(t){"stub"===m&&e.push(function(e,t,n){var a={title:e.title,image:e.image,excerpt:e.excerpt,link:e.link,label:e.label,date:e.date,extra:"",postID:e.id,emphasis:!1,isChartArt:!1,imageSlot:"left",imageSize:"A3",horizontal:!0,stacked:!1,enableHeader:!0,enableExcerpt:!0,enableExtra:!1,enableProgramsTaxonomy:!1,headerSize:"normal",className:"is-style-left"};return!0===t&&(a.imageSlot="disabled",a.className="is-style-disabled",a.enableExcerpt=!1),"programs"===n&&(a.enableProgramsTaxonomy=!0),Object(r.createBlock)("prc-block/story-item",a)}(t,d,f)),"staff"===m&&e.push(function(e){var t={link:e.link};return Object(r.createBlock)("prc-block/staff",t)}(t))}));var t=[];JSON.parse(o).forEach((function(n){E.filter((function(t){var a=e.filter((function(e){return e.attributes.postID===n}));return t.attributes.postID===n&&0>=a.length})).forEach((function(e){return t.push(e)}))}));var n=p-t.length;e=e.filter((function(e,t){return t<=n-1}));var a=t.concat(e);v(l,a)}}),[h]),React.createElement("div",{className:a},React.createElement(R,{attributes:t,setAttributes:n,setPosts:y,clientId:l}),!0===O&&React.createElement(u.InnerBlocks,{allowedBlocks:k}))},T=function(e){var t=e.className;e.attributes;return React.createElement("div",{className:t},React.createElement(u.InnerBlocks.Content,null))},w=o.name,I=o.category,C=o.attributes,S=[w,{title:Object(l.__)("PRC WP Query"),description:Object(l.__)("The WP Query block provides a handful of arguments depending on post type that will return the intendend block. You can pin results so that subsequent updates add to rather than replace."),category:I,attributes:C,providesContext:{"prc-block/wp-query":"pinned"},edit:O,save:T}];r.registerBlockType.apply(void 0,Object(a.a)(S))},30:function(e,t){e.exports=moment},32:function(e,t){e.exports=wp.i18n},33:function(e,t){e.exports=wp.data},4:function(e,t){e.exports=wp.components},52:function(e,t){e.exports=wp.blocks},53:function(e,t){e.exports=ReactDOM},54:function(e,t){e.exports=lodash},69:function(e){e.exports=JSON.parse('{"name":"prc-block/wp-query","category":"layout","attributes":{"expertsOnly":{"type":"boolean","default":false},"formatTermId":{"type":"integer"},"programTermId":{"type":"integer"},"perPage":{"type":"integer","default":10},"postType":{"type":"string","default":"stub"},"pinned":{"type":"string","default":"[]"},"labelTaxonomy":{"type":"string","default":"formats"},"disableImage":{"type":"boolean","default":false}}}')},9:function(e,t){e.exports=wp.blockEditor}},[[157,1,2]]]);
//# sourceMappingURL=main-7ac264b4.js.map