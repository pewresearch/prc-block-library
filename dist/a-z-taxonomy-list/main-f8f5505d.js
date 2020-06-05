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
(window["wpackioprcBlocksLibrarya-z-taxonomy-listJsonp"]=window["wpackioprcBlocksLibrarya-z-taxonomy-listJsonp"]||[]).push([[0],{0:function(e,t){e.exports=React},12:function(e,t){e.exports=wp.blockEditor},121:function(e,t){e.exports=wp.blocks},122:function(e,t){e.exports=wp.apiFetch},124:function(e,t){e.exports=wp.url},146:function(e,t,a){a(147),e.exports=a(274)},148:function(e,t,a){},149:function(e,t,a){},18:function(e,t){e.exports=wp.components},272:function(e,t,a){},273:function(e,t,a){},274:function(e,t,a){"use strict";a.r(t);var l=a(136),n=(a(148),a(121)),c=a(40),i=(a(38),a(122)),r=a.n(i),o=function(e,t,a){void 0===t&&(t=25);var l=new wp.api.collections[e];return void 0!==a?new Promise((function(e){r()({path:"/prc-api/v2/blocks/helpers/get-taxonomy-by-letter/?taxonomy=topic&letter="+a}).then((function(t){console.log(t),e(t)}))})):void 0!==l&&new Promise((function(a){var n={};l.fetch({data:{hide_empty:!1,per_page:t}}).then((function(t){for(var l=0;l<t.length;l++){var c=t[l].slug.replace("".concat(e.toLowerCase(),"_"),"");n[t[l].id]={id:t[l].id,name:t[l].name,slug:c}}a(n)}))}))},s=a(9),u=a(25),m=a.n(u),d=a(280),p=a(18),b=(Object(d.a)({labelOptions:[]})((function(e){var t=e.label,a=e.date,l=e.taxonomy,n=e.setAttributes,c=e.setState,i=e.labelOptions;return Object(s.useEffect)((function(){(function(e,t){return new Promise((function(a){o(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(a){var l=e[a];t.push({value:l.name,label:l.name})})),t.sort((function(e,t){return e.label>t.label?1:-1})),a(t)}))}))})(l).then((function(e){return c({labelOptions:e})}))}),[l]),React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(p.SelectControl,{value:t,options:i,onChange:function(e){n({label:e})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(p.TextControl,{value:a,onChange:function(e){n({date:e})}})))})),a(149),a(84)),v=a(124),f=function(e){var t=e.img,a=e.size,l=e.link,n=function(e,t,a){if(""===e||!1===e)return e;var l={260:{default:"260,260",small:"260,260",hidpi:"520,520",smallHidpi:"520,520"},"260-173":{default:"260,173",small:"260,173",hidpi:"520,346",smallHidpi:"520,346"}},n={resize:{default:"564,317",small:"354,194",hidpi:"1128,634",smallHidpi:"708,388"}[a]};return"A2"===t?n={resize:{default:"268,151",small:"354,194",hidpi:"536,301",smallHidpi:"708,388"}[a]}:"A3"===t?n={resize:{default:"194,110",small:"148,84",hidpi:"388,220",smallHidpi:"296,168"}[a]}:"A4"===t?n={resize:{default:"268,151",small:"354,194",hidpi:"536,302",smallHidpi:"708,388"}[a]}:"XL"===t&&(n={resize:{default:"720,405",small:"354,194",hidpi:"1440,810",smallHidpi:"708,388"}[a]}),"legacy-260"===t?n={resize:l[260][a]}:"legacy-260-173"===t&&(n={resize:l["260-173"][a]}),Object(v.addQueryArgs)(e,n)},c=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:420;return[{srcSet:"".concat(n(e,t,"default")," 1x, ").concat(n(e,t,"hidpi")," 2x"),media:"(min-width: ".concat(a,"px)")},{srcSet:"".concat(n(e,t,"small")," 1x, ").concat(n(e,t,"smallHidpi")," 2x"),media:"(max-width: ".concat(a,"px)")}]};return React.createElement(s.Fragment,null,""===l&&React.createElement(b.a,{sources:c(t,a)}),""!==l&&React.createElement("a",{href:l},React.createElement(b.a,{sources:c(t,a)})))},h=a(12),g=["image"],R=function(e){var t=e.img,a=e.size,l=e.slot,n=e.chartArt,c=e.dataHandler,i=function(e){var t=e.handler,c=e.open;return React.createElement("div",{className:"image-editor-toolbar"},React.createElement("div",null,React.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},React.createElement(p.IconButton,{icon:"upload",label:"Select/Upload New Image",onClick:c}),React.createElement(p.IconButton,{icon:"trash",label:"Remove Image",onClick:function(){t({image:"",imageSlot:"disabled"})}}),React.createElement(s.Fragment,null,null!==n&&React.createElement(p.IconButton,{icon:"art",label:!0===n?"Disable Chart Art":"Enable Chart Art",onClick:function(){t({isChartArt:!n})}})))),null!==l&&React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement(p.SelectControl,{label:"Image Size",value:a,options:[{value:"XL",label:"XL"},{value:"A1",label:"A1"},{value:"A2",label:"A2"},{value:"A3",label:"A3"},{value:"A4",label:"A4"},{value:"legacy-260",label:"Legacy Homepage 260x260"},{value:"legacy-260-173",label:"Legacy Homepage 260x173"}],onChange:function(e){return t({imageSize:e})},style:{marginBottom:"0px",maxWidth:"140px"}})))};return React.createElement(h.MediaUploadCheck,null,React.createElement(h.MediaUpload,{onSelect:function(e){c("disabled"===l?{image:e.url,imageSlot:"default"}:{image:e.url})},allowedTypes:g,render:function(e){var a=e.open;return React.createElement(s.Fragment,null,""!==t&&React.createElement(i,{handler:c,open:a}),""===t&&React.createElement("p",null,React.createElement(p.Button,{isPrimary:!0,onClick:a},"Insert Image")))}}))},E=function(e){var t,a,l,n,c,i,r=e.img,o=e.link,s=e.size,u=e.slot,d=e.chartArt,p=e.dataHandler;return React.createElement("div",{className:(t=!1,a=!1,l=!1,n=!1,c=!1,i=!1,!1!==u&&("XL"===s?a=!0:"A1"===s?l=!0:"A2"===s?n=!0:"A3"===s?c=!0:"A4"===s?i=!0:"left"!==u&&"right"!==u||(t=!0)),m()({ui:!0,XL:a,A1:l,A2:n,A3:c,A4:i,medium:t,image:!0,bordered:d}))},React.createElement(f,{img:r,size:s,link:!1!==p?"":o}),!1!==p&&React.createElement(R,{img:r,slot:u,size:s,chartArt:d,dataHandler:p}))};E.defaultProps={img:"",link:"",size:"A1",slot:!1,chartArt:!1,dataHandler:!1};a(279),a(272),a(273);var x=a(85),y=function(e){var t=e.heading,a=e.chevron,l=e.placeholder,n=e.setAttributes,c=e.children;return React.createElement("div",{className:"prc-collapsible-list"},React.createElement("div",{className:"title"},React.createElement("div",null,React.createElement(x.a,{name:"caret down"})),!1!==n&&React.createElement(h.RichText,{tagName:"h2",value:t,onChange:function(e){return n({heading:e})},placeholder:l,formattingControls:["link"],keepPlaceholderOnFocus:!0,className:"sans-serif"}),!1===n&&React.createElement(h.RichText.Content,{tagName:"h2",value:t,className:"sans-serif"}),!0===a&&React.createElement("div",null,React.createElement(x.a,{name:"chevron right",size:"large"}))),React.createElement("div",{class:"content"},c))},A=Object(d.a)({terms:[]})((function(e){var t=e.attributes,a=e.className,l=e.terms,n=e.setAttributes,c=e.setState,i=t.heading,r=t.letter,s=t.selected;return console.log("Tax List"),console.log(l),console.log(t),React.createElement("div",{className:a},React.createElement(y,{heading:i,placeholder:"A",setAttributes:!1},React.createElement(p.SelectControl,{label:"Chose a letter",value:r,options:[{label:"A",value:"A"},{label:"B",value:"B"},{label:"C",value:"C"},{label:"D",value:"D"},{label:"E",value:"E"},{label:"F",value:"F"},{label:"G",value:"G"},{label:"H",value:"H"},{label:"I",value:"I"},{label:"J",value:"J"},{label:"K",value:"K"},{label:"L",value:"L"},{label:"M",value:"M"},{label:"N",value:"N"},{label:"O",value:"O"},{label:"P",value:"P"},{label:"Q",value:"Q"},{label:"R",value:"R"},{label:"S",value:"S"},{label:"T",value:"T"},{label:"U",value:"U"},{label:"V",value:"V"},{label:"W",value:"W"},{label:"X",value:"X"},{label:"Y",value:"Y"},{label:"Z",value:"Z"}],onChange:function(e){n({letter:e,heading:e}),o("Topics",100,e).then((function(e){console.log(e),c({terms:e})}))}}),React.createElement("div",{className:"ui link list"},React.createElement("label",{class:"components-base-control"},"Select the terms you want to display"),l.map((function(e,t){return React.createElement("div",{className:"item"},React.createElement(p.CheckboxControl,{label:e.name,checked:s.includes(e.term_id),onChange:function(){s.push(e.term_id),n({selected:s})}}))})))))})),w=function(e){var t=e.attributes,a=e.className,l=(e.setAttributes,t.heading);return React.createElement("div",{className:a},React.createElement(y,{heading:l,setAttributes:!1},React.createElement("p",null,"Test")))},k=["prc-block/a-z-taxonomy-list",{title:Object(c.__)("A-Z Taxonomy List"),description:"A taxonomy list sorted by alphabetical.",category:"layout",icon:"networking",keywords:[Object(c.__)("Taxonomy List"),Object(c.__)("Taxonomies"),Object(c.__)("A-Z"),Object(c.__)("AZ")],supports:{html:!1,align:!1},attributes:{heading:{type:"string",source:"html",selector:"h2",default:""},letter:{type:"string",default:""},include:{type:"array",default:[]}},edit:A,save:w}];n.registerBlockType.apply(void 0,Object(l.a)(k))},38:function(e,t){e.exports=moment},40:function(e,t){e.exports=wp.i18n},47:function(e,t){e.exports=ReactDOM},81:function(e,t){e.exports=lodash},9:function(e,t){e.exports=wp.element}},[[146,1,2]]]);
//# sourceMappingURL=main-f8f5505d.js.map