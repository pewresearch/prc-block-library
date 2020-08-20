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
(window["wpackioprcBlocksLibrarya-z-taxonomy-listJsonp"]=window["wpackioprcBlocksLibrarya-z-taxonomy-listJsonp"]||[]).push([[0],{0:function(e,t){e.exports=React},1:function(e,t){e.exports=wp.element},126:function(e,t){e.exports=wp.blocks},13:function(e,t){e.exports=wp.blockEditor},130:function(e,t){e.exports=wp.url},142:function(e,t){e.exports=wp.htmlEntities},155:function(e,t,a){a(156),e.exports=a(282)},157:function(e,t,a){},19:function(e,t){e.exports=wp.components},280:function(e,t,a){},281:function(e,t,a){},282:function(e,t,a){"use strict";a.r(t);var l=a(145),n=(a(157),a(126)),c=a(41),i=(a(39),a(47)),r=a.n(i),o=function(e,t,a){void 0===t&&(t=25);var l=new wp.api.collections[e];return void 0!==a?new Promise((function(e){r()({path:"/prc-api/v2/blocks/helpers/get-taxonomy-by-letter/?taxonomy=topic&letter=".concat(a)}).then((function(t){e(t)}))})):void 0!==l&&new Promise((function(a){var n={};l.fetch({data:{hide_empty:!1,per_page:t}}).then((function(t){for(var l=0;l<t.length;l++){var c=t[l].slug.replace("".concat(e.toLowerCase(),"_"),"");n[t[l].id]={id:t[l].id,name:t[l].name,slug:c}}a(n)}))}))},s=(a(20),a(10),a(1)),u=(a(144),a(287),a(67),a(130),a(65),a(19)),m=a(13),d=a(288),p=(Object(d.a)({labelOptions:[]})((function(e){var t=e.label,a=e.date,l=e.taxonomy,n=e.setAttributes,c=e.setState,i=e.labelOptions;return Object(s.useEffect)((function(){(function(e,t){return new Promise((function(a){o(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(a){var l=e[a];t.push({value:l.name,label:l.name})})),t.sort((function(e,t){return e.label>t.label?1:-1})),a(t)}))}))})(l).then((function(e){c({labelOptions:e})}))}),[l]),React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(u.SelectControl,{value:t,options:i,onChange:function(e){n({label:e})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(u.TextControl,{value:a,onChange:function(e){n({date:e})},style:{marginBottom:"0px"},className:"story-label-select"})))})),a(280),a(281),a(92)),v=function(e){var t=e.heading,a=e.chevron,l=e.placeholder,n=e.setAttributes,c=e.children;return React.createElement("div",{className:"prc-collapsible-list"},React.createElement("div",{className:"title"},React.createElement("div",null,React.createElement(p.a,{name:"caret down"})),!1!==n&&React.createElement(m.RichText,{tagName:"h2",value:t,onChange:function(e){return n({heading:e})},placeholder:l,formattingControls:["link"],keepPlaceholderOnFocus:!0,className:"sans-serif"}),!1===n&&React.createElement(m.RichText.Content,{tagName:"h2",value:t,className:"sans-serif"}),!0===a&&React.createElement("div",null,React.createElement(p.a,{name:"chevron right",size:"large"}))),React.createElement("div",{className:"content"},c))},b=a(142),f=a(143),h=Object(d.a)({termsData:[],excludeData:[],includeData:[]})((function(e){var t=e.termsData,a=e.excludeData,l=e.includeData,n=e.setState,c=e.exclude,i=e.include,r=e.letter,m=e.taxonomy,d=e.setAttributes,p=e.isSelected,v=function(){o(m,100,r).then((function(e){n({termsData:e}),function(e){var t={};if(0!==e.length&&0!==c.length&&(t.excludeData=JSON.parse(c)),0!==e.length&&0===i.length){var a=[];e.map((function(e){a.push({id:e.term_id,name:e.name,slug:e.slug})})),d({include:JSON.stringify(a)}),t.includeData=a}else 0!==e.length&&0!==i.length&&(t.includeData=JSON.parse(i));n(t)}(e)}))};!1!==d&&Object(f.a)((function(){0===t.length&&v()}));var h=0!==i.length&&!1===d&&JSON.parse(i);return React.createElement("div",{className:"ui link list"},!1!==h&&React.createElement(s.Fragment,null,h.map((function(e){return React.createElement("a",{className:"item",href:"/".concat(m.toLowerCase(),"/").concat(e.slug)},e.name)}))),!1!==d&&React.createElement(s.Fragment,null,t.map((function(e){var t=c.includes(e.term_id);return React.createElement("div",{className:"item"},React.createElement(u.CheckboxControl,{label:Object(b.decodeEntities)(e.name),checked:t,onChange:function(t){var n,c,i,r,o,s,u;n=t,c=e.term_id,i=e.name,r=e.slug,s=a,u=l,!0===n?(s.push(c),-1!==(o=u.findIndex((function(e){return e.id===c})))&&u.splice(o,1)):(u.push({id:c,name:i,slug:r}),function(){var e=s.indexOf(c);-1!==e&&s.splice(e,1)}()),d({exclude:JSON.stringify(s),include:JSON.stringify(u)})},"data-termid":e.term_id,"data-term":e.name}),React.createElement("div",{style:{height:"15px",marginTop:"-5px"}},!0===p&&React.createElement("pre",{style:{fontSize:"11px",margin:0}},"(",e.slug,")")))}))))})),g=function(e){var t=e.attributes,a=e.className,l=e.setAttributes,n=e.isSelected,c=t.heading,i=t.letter,r=t.exclude,o=t.include,s=function(){return React.createElement(u.SelectControl,{label:"Chose a letter",value:i,options:[{label:"(Click to select letter)",value:""},{label:"A",value:"A"},{label:"B",value:"B"},{label:"C",value:"C"},{label:"D",value:"D"},{label:"E",value:"E"},{label:"F",value:"F"},{label:"G",value:"G"},{label:"H",value:"H"},{label:"I",value:"I"},{label:"J",value:"J"},{label:"K",value:"K"},{label:"L",value:"L"},{label:"M",value:"M"},{label:"N",value:"N"},{label:"O",value:"O"},{label:"P",value:"P"},{label:"Q",value:"Q"},{label:"R",value:"R"},{label:"S",value:"S"},{label:"T",value:"T"},{label:"U",value:"U"},{label:"V",value:"V"},{label:"W",value:"W"},{label:"X",value:"X"},{label:"Y",value:"Y"},{label:"Z",value:"Z"}],onChange:function(e){l({letter:e,heading:e,exclude:"",include:""})}})};return React.createElement("div",{className:a},React.createElement(v,{heading:c,placeholder:"A",setAttributes:!1},""===i&&React.createElement(s,null),""!==i&&React.createElement(h,{exclude:r,include:o,letter:i,taxonomy:"Topic",setAttributes:l,isSelected:n})))},x=function(e){var t=e.attributes,a=e.className,l=t.heading,n=t.letter,c=t.include;return React.createElement("div",{className:a},React.createElement(v,{heading:l,placeholder:"A",setAttributes:!1},React.createElement(h,{include:c,letter:n,taxonomy:"Topic",setAttributes:!1})))},y=["prc-block/a-z-taxonomy-list",{title:Object(c.__)("A-Z Taxonomy List"),description:"A taxonomy list sorted alphabeticaly. Check terms you want to exclude.",category:"layout",icon:"networking",keywords:[Object(c.__)("Taxonomy List"),Object(c.__)("Taxonomies"),Object(c.__)("A-Z"),Object(c.__)("AZ")],supports:{html:!1,align:!1},attributes:{heading:{type:"string",source:"html",selector:"h2",default:"A"},letter:{type:"string",default:""},exclude:{type:"string",default:""},include:{type:"string",default:""}},edit:g,save:x}];n.registerBlockType.apply(void 0,Object(l.a)(y))},39:function(e,t){e.exports=moment},41:function(e,t){e.exports=wp.i18n},47:function(e,t){e.exports=wp.apiFetch},50:function(e,t){e.exports=ReactDOM},91:function(e,t){e.exports=lodash}},[[155,1,2]]]);
//# sourceMappingURL=main-418f15fd.js.map