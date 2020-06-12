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
(window["wpackioprcBlocksLibrarya-z-taxonomy-listJsonp"]=window["wpackioprcBlocksLibrarya-z-taxonomy-listJsonp"]||[]).push([[0],{0:function(e,t){e.exports=React},12:function(e,t){e.exports=wp.blockEditor},122:function(e,t){e.exports=wp.blocks},123:function(e,t){e.exports=wp.apiFetch},125:function(e,t){e.exports=wp.url},13:function(e,t){e.exports=wp.components},137:function(e,t){e.exports=wp.htmlEntities},149:function(e,t,a){a(150),e.exports=a(277)},151:function(e,t,a){},152:function(e,t,a){},275:function(e,t,a){},276:function(e,t,a){},277:function(e,t,a){"use strict";a.r(t);var l=a(139),n=(a(151),a(122)),c=a(41),i=(a(39),a(123)),r=a.n(i),o=function(e,t,a){void 0===t&&(t=25);var l=new wp.api.collections[e];return void 0!==a?new Promise((function(e){r()({path:"/prc-api/v2/blocks/helpers/get-taxonomy-by-letter/?taxonomy=topic&letter=".concat(a)}).then((function(t){e(t)}))})):void 0!==l&&new Promise((function(a){var n={};l.fetch({data:{hide_empty:!1,per_page:t}}).then((function(t){for(var l=0;l<t.length;l++){var c=t[l].slug.replace("".concat(e.toLowerCase(),"_"),"");n[t[l].id]={id:t[l].id,name:t[l].name,slug:c}}a(n)}))}))},u=a(7),s=a(26),m=a.n(s),d=a(283),p=a(13),f=(Object(d.a)({labelOptions:[]})((function(e){var t=e.label,a=e.date,l=e.taxonomy,n=e.setAttributes,c=e.setState,i=e.labelOptions;return Object(u.useEffect)((function(){(function(e,t){return new Promise((function(a){o(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(a){var l=e[a];t.push({value:l.name,label:l.name})})),t.sort((function(e,t){return e.label>t.label?1:-1})),a(t)}))}))})(l).then((function(e){return c({labelOptions:e})}))}),[l]),React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(p.SelectControl,{value:t,options:i,onChange:function(e){n({label:e})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(p.TextControl,{value:a,onChange:function(e){n({date:e})}})))})),a(152),a(86)),v=a(125),g=function(e){var t=e.img,a=e.size,l=e.link,n=function(e,t,a){if(""===e||!1===e)return e;var l={260:{default:"260,260",small:"260,260",hidpi:"520,520",smallHidpi:"520,520"},"260-173":{default:"260,173",small:"260,173",hidpi:"520,346",smallHidpi:"520,346"}},n={resize:{default:"564,317",small:"354,194",hidpi:"1128,634",smallHidpi:"708,388"}[a]};return"A2"===t?n={resize:{default:"268,151",small:"354,194",hidpi:"536,301",smallHidpi:"708,388"}[a]}:"A3"===t?n={resize:{default:"194,110",small:"148,84",hidpi:"388,220",smallHidpi:"296,168"}[a]}:"A4"===t?n={resize:{default:"268,151",small:"354,194",hidpi:"536,302",smallHidpi:"708,388"}[a]}:"XL"===t&&(n={resize:{default:"720,405",small:"354,194",hidpi:"1440,810",smallHidpi:"708,388"}[a]}),"legacy-260"===t?n={resize:l[260][a]}:"legacy-260-173"===t&&(n={resize:l["260-173"][a]}),Object(v.addQueryArgs)(e,n)},c=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:420;return[{srcSet:"".concat(n(e,t,"default")," 1x, ").concat(n(e,t,"hidpi")," 2x"),media:"(min-width: ".concat(a,"px)")},{srcSet:"".concat(n(e,t,"small")," 1x, ").concat(n(e,t,"smallHidpi")," 2x"),media:"(max-width: ".concat(a,"px)")}]};return React.createElement(u.Fragment,null,""===l&&React.createElement(f.a,{sources:c(t,a)}),""!==l&&React.createElement("a",{href:l},React.createElement(f.a,{sources:c(t,a)})))},h=a(12),b=["image"],x=function(e){var t=e.img,a=e.size,l=e.slot,n=e.chartArt,c=e.dataHandler,i=function(e){var t=e.handler,c=e.open;return React.createElement("div",{className:"image-editor-toolbar"},React.createElement("div",null,React.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},React.createElement(p.IconButton,{icon:"upload",label:"Select/Upload New Image",onClick:c}),React.createElement(p.IconButton,{icon:"trash",label:"Remove Image",onClick:function(){t({image:"",imageSlot:"disabled"})}}),React.createElement(u.Fragment,null,null!==n&&React.createElement(p.IconButton,{icon:"art",label:!0===n?"Disable Chart Art":"Enable Chart Art",onClick:function(){t({isChartArt:!n})}})))),null!==l&&React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement(p.SelectControl,{label:"Image Size",value:a,options:[{value:"XL",label:"XL"},{value:"A1",label:"A1"},{value:"A2",label:"A2"},{value:"A3",label:"A3"},{value:"A4",label:"A4"},{value:"legacy-260",label:"Legacy Homepage 260x260"},{value:"legacy-260-173",label:"Legacy Homepage 260x173"}],onChange:function(e){return t({imageSize:e})},style:{marginBottom:"0px",maxWidth:"140px"}})))};return React.createElement(h.MediaUploadCheck,null,React.createElement(h.MediaUpload,{onSelect:function(e){c("disabled"===l?{image:e.url,imageSlot:"default"}:{image:e.url})},allowedTypes:b,render:function(e){var a=e.open;return React.createElement(u.Fragment,null,""!==t&&React.createElement(i,{handler:c,open:a}),""===t&&React.createElement("p",null,React.createElement(p.Button,{isPrimary:!0,onClick:a},"Insert Image")))}}))},E=function(e){var t,a,l,n,c,i,r=e.img,o=e.link,u=e.size,s=e.slot,d=e.chartArt,p=e.dataHandler;return React.createElement("div",{className:(t=!1,a=!1,l=!1,n=!1,c=!1,i=!1,!1!==s&&("XL"===u?a=!0:"A1"===u?l=!0:"A2"===u?n=!0:"A3"===u?c=!0:"A4"===u?i=!0:"left"!==s&&"right"!==s||(t=!0)),m()({ui:!0,XL:a,A1:l,A2:n,A3:c,A4:i,medium:t,image:!0,bordered:d}))},React.createElement(g,{img:r,size:u,link:!1!==p?"":o}),!1!==p&&React.createElement(x,{img:r,slot:s,size:u,chartArt:d,dataHandler:p}))};E.defaultProps={img:"",link:"",size:"A1",slot:!1,chartArt:!1,dataHandler:!1};a(282),a(275),a(276);var R=a(87),y=function(e){var t=e.heading,a=e.chevron,l=e.placeholder,n=e.setAttributes,c=e.children;return React.createElement("div",{className:"prc-collapsible-list"},React.createElement("div",{className:"title"},React.createElement("div",null,React.createElement(R.a,{name:"caret down"})),!1!==n&&React.createElement(h.RichText,{tagName:"h2",value:t,onChange:function(e){return n({heading:e})},placeholder:l,formattingControls:["link"],keepPlaceholderOnFocus:!0,className:"sans-serif"}),!1===n&&React.createElement(h.RichText.Content,{tagName:"h2",value:t,className:"sans-serif"}),!0===a&&React.createElement("div",null,React.createElement(R.a,{name:"chevron right",size:"large"}))),React.createElement("div",{className:"content"},c))},A=a(137),w=a(138),C=Object(d.a)({termsData:[],excludeData:[],includeData:[]})((function(e){var t=e.termsData,a=e.excludeData,l=e.includeData,n=e.setState,c=e.exclude,i=e.include,r=e.letter,s=e.taxonomy,m=e.setAttributes,d=e.isSelected,f=function(){o(s,100,r).then((function(e){n({termsData:e}),function(e){var t={};if(0!==e.length&&0!==c.length&&(t.excludeData=JSON.parse(c)),0!==e.length&&0===i.length){var a=[];e.map((function(e){a.push({id:e.term_id,name:e.name,slug:e.slug})})),m({include:JSON.stringify(a)}),t.includeData=a}else 0!==e.length&&0!==i.length&&(t.includeData=JSON.parse(i));n(t)}(e)}))};!1!==m&&Object(w.a)((function(){0===t.length&&f()}));var v=0!==i.length&&!1===m&&JSON.parse(i);return React.createElement("div",{className:"ui link list"},!1!==v&&React.createElement(u.Fragment,null,v.map((function(e){return React.createElement("a",{className:"item",href:"/".concat(s.toLowerCase(),"/").concat(e.slug)},e.name)}))),!1!==m&&React.createElement(u.Fragment,null,t.map((function(e){var t=c.includes(e.term_id);return React.createElement("div",{className:"item"},React.createElement(p.CheckboxControl,{label:Object(A.decodeEntities)(e.name),checked:t,onChange:function(t){var n,c,i,r,o,u,s;n=t,c=e.term_id,i=e.name,r=e.slug,u=a,s=l,!0===n?(u.push(c),-1!==(o=s.findIndex((function(e){return e.id===c})))&&s.splice(o,1)):(s.push({id:c,name:i,slug:r}),function(){var e=u.indexOf(c);-1!==e&&u.splice(e,1)}()),m({exclude:JSON.stringify(u),include:JSON.stringify(s)})},"data-termid":e.term_id,"data-term":e.name}),React.createElement("div",{style:{height:"15px",marginTop:"-5px"}},!0===d&&React.createElement("pre",{style:{fontSize:"11px",margin:0}},"(",e.slug,")")))}))))})),k=function(e){var t=e.attributes,a=e.className,l=e.setAttributes,n=e.isSelected,c=t.heading,i=t.letter,r=t.exclude,o=t.include,u=function(){return React.createElement(p.SelectControl,{label:"Chose a letter",value:i,options:[{label:"(Click to select letter)",value:""},{label:"A",value:"A"},{label:"B",value:"B"},{label:"C",value:"C"},{label:"D",value:"D"},{label:"E",value:"E"},{label:"F",value:"F"},{label:"G",value:"G"},{label:"H",value:"H"},{label:"I",value:"I"},{label:"J",value:"J"},{label:"K",value:"K"},{label:"L",value:"L"},{label:"M",value:"M"},{label:"N",value:"N"},{label:"O",value:"O"},{label:"P",value:"P"},{label:"Q",value:"Q"},{label:"R",value:"R"},{label:"S",value:"S"},{label:"T",value:"T"},{label:"U",value:"U"},{label:"V",value:"V"},{label:"W",value:"W"},{label:"X",value:"X"},{label:"Y",value:"Y"},{label:"Z",value:"Z"}],onChange:function(e){l({letter:e,heading:e,exclude:"",include:""})}})};return React.createElement("div",{className:a},React.createElement(y,{heading:c,placeholder:"A",setAttributes:!1},""===i&&React.createElement(u,null),""!==i&&React.createElement(C,{exclude:r,include:o,letter:i,taxonomy:"Topics",setAttributes:l,isSelected:n})))},O=function(e){var t=e.attributes,a=e.className,l=t.heading,n=t.letter,c=t.include;return React.createElement("div",{className:a},React.createElement(y,{heading:l,placeholder:"A",setAttributes:!1},React.createElement(C,{include:c,letter:n,taxonomy:"Topics",setAttributes:!1})))},N=["prc-block/a-z-taxonomy-list",{title:Object(c.__)("A-Z Taxonomy List"),description:"A taxonomy list sorted alphabeticaly. Check terms you want to exclude.",category:"layout",icon:"networking",keywords:[Object(c.__)("Taxonomy List"),Object(c.__)("Taxonomies"),Object(c.__)("A-Z"),Object(c.__)("AZ")],supports:{html:!1,align:!1},attributes:{heading:{type:"string",source:"html",selector:"h2",default:"A"},letter:{type:"string",default:""},exclude:{type:"string",default:""},include:{type:"string",default:""}},edit:k,save:O}];n.registerBlockType.apply(void 0,Object(l.a)(N))},39:function(e,t){e.exports=moment},41:function(e,t){e.exports=wp.i18n},48:function(e,t){e.exports=ReactDOM},7:function(e,t){e.exports=wp.element},83:function(e,t){e.exports=lodash}},[[149,1,2]]]);
//# sourceMappingURL=main-72bd1a18.js.map