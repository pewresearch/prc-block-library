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
(window["wpackioprcBlocksLibrarya-z-taxonomy-listJsonp"]=window["wpackioprcBlocksLibrarya-z-taxonomy-listJsonp"]||[]).push([[0],{0:function(e,t){e.exports=React},109:function(e,t,a){a(110),e.exports=a(123)},111:function(e,t,a){},122:function(e,t,a){},123:function(e,t,a){"use strict";a.r(t);var l=a(99),n=(a(111),a(88)),c=a(47),i=(a(45),a(56)),r=a.n(i),o=(a(57),a(20),a(5)),u=(a(97),a(137),a(73),a(92),a(122),a(53)),s=a(79),m=function(e){var t=e.heading,a=e.chevron,l=e.placeholder,n=e.setAttributes,c=e.children;return React.createElement("div",{className:"prc-collapsible-list"},React.createElement("div",{className:"title"},React.createElement("div",null,React.createElement(s.a,{name:"caret down"})),!1!==n&&React.createElement(u.RichText,{tagName:"h2",value:t,onChange:function(e){return n({heading:e})},placeholder:l,formattingControls:["link"],keepPlaceholderOnFocus:!0,className:"sans-serif"}),!1===n&&React.createElement(u.RichText.Content,{tagName:"h2",value:t,className:"sans-serif"}),!0===a&&React.createElement("div",null,React.createElement(s.a,{name:"chevron right",size:"large"}))),React.createElement("div",{className:"content"},c))},d=a(95),p=a(42),b=a(138),v=a(98),h=Object(b.a)({termsData:[],excludeData:[],includeData:[]})((function(e){var t=e.termsData,a=e.excludeData,l=e.includeData,n=e.setState,c=e.exclude,i=e.include,u=(e.letter,e.taxonomy),s=e.setAttributes,m=e.isSelected,b=function(){(function(e,t){return new Promise((function(a){r()({path:"/prc-api/v2/blocks/helpers/get-taxonomy-by-letter/?taxonomy=".concat(e,"&letter=").concat(t)}).then((function(e){a(e)}))}))})(u,100).then((function(e){n({termsData:e}),function(e){var t={};if(0!==e.length&&0!==c.length&&(t.excludeData=JSON.parse(c)),0!==e.length&&0===i.length){var a=[];e.map((function(e){a.push({id:e.term_id,name:e.name,slug:e.slug})})),s({include:JSON.stringify(a)}),t.includeData=a}else 0!==e.length&&0!==i.length&&(t.includeData=JSON.parse(i));n(t)}(e)}))};!1!==s&&Object(v.a)((function(){0===t.length&&b()}));var h=0!==i.length&&!1===s&&JSON.parse(i);return React.createElement("div",{className:"ui link list"},!1!==h&&React.createElement(o.Fragment,null,h.map((function(e){return React.createElement("a",{className:"item",href:"/".concat(u.toLowerCase(),"/").concat(e.slug)},e.name)}))),!1!==s&&React.createElement(o.Fragment,null,t.map((function(e){var t=c.includes(e.term_id);return React.createElement("div",{className:"item"},React.createElement(p.CheckboxControl,{label:Object(d.decodeEntities)(e.name),checked:t,onChange:function(t){var n,c,i,r,o,u,m;n=t,c=e.term_id,i=e.name,r=e.slug,u=a,m=l,!0===n?(u.push(c),-1!==(o=m.findIndex((function(e){return e.id===c})))&&m.splice(o,1)):(m.push({id:c,name:i,slug:r}),function(){var e=u.indexOf(c);-1!==e&&u.splice(e,1)}()),s({exclude:JSON.stringify(u),include:JSON.stringify(m)})},"data-termid":e.term_id,"data-term":e.name}),React.createElement("div",{style:{height:"15px",marginTop:"-5px"}},!0===m&&React.createElement("pre",{style:{fontSize:"11px",margin:0}},"(",e.slug,")")))}))))})),f=(a(96),function(e){var t=e.attributes,a=e.className,l=e.setAttributes,n=e.isSelected,c=t.heading,i=t.letter,r=t.exclude,o=t.include,u=function(){return React.createElement(p.SelectControl,{label:"Chose a letter",value:i,options:[{label:"(Click to select letter)",value:""},{label:"A",value:"A"},{label:"B",value:"B"},{label:"C",value:"C"},{label:"D",value:"D"},{label:"E",value:"E"},{label:"F",value:"F"},{label:"G",value:"G"},{label:"H",value:"H"},{label:"I",value:"I"},{label:"J",value:"J"},{label:"K",value:"K"},{label:"L",value:"L"},{label:"M",value:"M"},{label:"N",value:"N"},{label:"O",value:"O"},{label:"P",value:"P"},{label:"Q",value:"Q"},{label:"R",value:"R"},{label:"S",value:"S"},{label:"T",value:"T"},{label:"U",value:"U"},{label:"V",value:"V"},{label:"W",value:"W"},{label:"X",value:"X"},{label:"Y",value:"Y"},{label:"Z",value:"Z"}],onChange:function(e){l({letter:e,heading:e,exclude:"",include:""})}})};return React.createElement("div",{className:a},React.createElement(m,{heading:c,placeholder:"A",setAttributes:!1},""===i&&React.createElement(u,null),""!==i&&React.createElement(h,{exclude:r,include:o,letter:i,taxonomy:"Topic",setAttributes:l,isSelected:n})))}),g=function(e){var t=e.attributes,a=e.className,l=t.heading,n=t.letter,c=t.include;return React.createElement("div",{className:a},React.createElement(m,{heading:l,placeholder:"A",setAttributes:!1},React.createElement(h,{include:c,letter:n,taxonomy:"Topic",setAttributes:!1})))},x=["prc-block/a-z-taxonomy-list",{title:Object(c.__)("A-Z Taxonomy List"),description:"A taxonomy list sorted alphabeticaly. Check terms you want to exclude.",category:"layout",icon:"networking",keywords:[Object(c.__)("Taxonomy List"),Object(c.__)("Taxonomies"),Object(c.__)("A-Z"),Object(c.__)("AZ")],supports:{html:!1,align:!1},attributes:{heading:{type:"string",source:"html",selector:"h2",default:"A"},letter:{type:"string",default:""},exclude:{type:"string",default:""},include:{type:"string",default:""}},edit:f,save:g}];n.registerBlockType.apply(void 0,Object(l.a)(x))},42:function(e,t){e.exports=wp.components},45:function(e,t){e.exports=moment},47:function(e,t){e.exports=wp.i18n},5:function(e,t){e.exports=wp.element},52:function(e,t){e.exports=ReactDOM},53:function(e,t){e.exports=wp.blockEditor},56:function(e,t){e.exports=wp.apiFetch},78:function(e,t){e.exports=lodash},88:function(e,t){e.exports=wp.blocks},92:function(e,t){e.exports=wp.url},95:function(e,t){e.exports=wp.htmlEntities},96:function(e,t){e.exports=wp.data}},[[109,1,2]]]);
//# sourceMappingURL=main-ec11275d.js.map