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
(window.wpackioprcBlocksLibrarybuttonJsonp=window.wpackioprcBlocksLibrarybuttonJsonp||[]).push([[0],{0:function(e,t){e.exports=React},1:function(e,t){e.exports=wp.element},10:function(e,t){e.exports=wp.blockEditor},12:function(e,t){e.exports=wp.components},126:function(e,t){e.exports=wp.blocks},130:function(e,t){e.exports=wp.url},142:function(e,t){e.exports=wp.htmlEntities},155:function(e,t,n){n(156),e.exports=n(281)},279:function(e,t,n){},280:function(e,t,n){},281:function(e,t,n){"use strict";n.r(t);var a=n(145),c=n(126),l=n(39),r=n(10),o=n(12),i=n(1),u=n(11),s=n.n(u),m=[{name:"primary",color:"#2185d0"},{name:"secondary",color:"#000"},{name:"mustard",color:"#d3aa20"}],p=(n(40),n(47)),d=n.n(p),f=function(e,t,n){void 0===t&&(t=25);var a=new wp.api.collections[e];return void 0!==n?new Promise((function(e){d()({path:"/prc-api/v2/blocks/helpers/get-taxonomy-by-letter/?taxonomy=topic&letter=".concat(n)}).then((function(t){e(t)}))})):void 0!==a&&new Promise((function(n){var c={};a.fetch({data:{hide_empty:!1,per_page:t}}).then((function(t){for(var a=0;a<t.length;a++){var l=t[a].slug.replace("".concat(e.toLowerCase(),"_"),"");c[t[a].id]={id:t[a].id,name:t[a].name,slug:l}}n(c)}))}))},b=function(e,t){if(""===e||void 0===e||void 0===t||""===t)return null;var n=t.findIndex((function(t,n){if(e==t.color)return!0}));return t[n].name},g=(n(20),n(144),n(286),n(67),n(130),n(65),n(287)),v=(Object(g.a)({labelOptions:[]})((function(e){var t=e.label,n=e.date,a=e.taxonomy,c=e.setAttributes,l=e.setState,r=e.labelOptions;return Object(i.useEffect)((function(){(function(e,t){return new Promise((function(n){f(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(n){var a=e[n];t.push({value:a.name,label:a.name})})),t.sort((function(e,t){return e.label>t.label?1:-1})),n(t)}))}))})(a).then((function(e){l({labelOptions:e})}))}),[a]),React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(o.SelectControl,{value:t,options:r,onChange:function(e){c({label:e})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(o.TextControl,{value:n,onChange:function(e){c({date:e})}})))})),n(279),n(280),n(92),n(142)),h=n(143),x=(Object(g.a)({termsData:[],excludeData:[],includeData:[]})((function(e){var t=e.termsData,n=e.excludeData,a=e.includeData,c=e.setState,l=e.exclude,r=e.include,u=e.letter,s=e.taxonomy,m=e.setAttributes,p=e.isSelected,d=function(){f(s,100,u).then((function(e){c({termsData:e}),function(e){var t={};if(0!==e.length&&0!==l.length&&(t.excludeData=JSON.parse(l)),0!==e.length&&0===r.length){var n=[];e.map((function(e){n.push({id:e.term_id,name:e.name,slug:e.slug})})),m({include:JSON.stringify(n)}),t.includeData=n}else 0!==e.length&&0!==r.length&&(t.includeData=JSON.parse(r));c(t)}(e)}))};!1!==m&&Object(h.a)((function(){0===t.length&&d()}));var b=0!==r.length&&!1===m&&JSON.parse(r);return React.createElement("div",{className:"ui link list"},!1!==b&&React.createElement(i.Fragment,null,b.map((function(e){return React.createElement("a",{className:"item",href:"/".concat(s.toLowerCase(),"/").concat(e.slug)},e.name)}))),!1!==m&&React.createElement(i.Fragment,null,t.map((function(e){var t=l.includes(e.term_id);return React.createElement("div",{className:"item"},React.createElement(o.CheckboxControl,{label:Object(v.decodeEntities)(e.name),checked:t,onChange:function(t){var c,l,r,o,i,u,s;c=t,l=e.term_id,r=e.name,o=e.slug,u=n,s=a,!0===c?(u.push(l),-1!==(i=s.findIndex((function(e){return e.id===l})))&&s.splice(i,1)):(s.push({id:l,name:r,slug:o}),function(){var e=u.indexOf(l);-1!==e&&u.splice(e,1)}()),m({exclude:JSON.stringify(u),include:JSON.stringify(s)})},"data-termid":e.term_id,"data-term":e.name}),React.createElement("div",{style:{height:"15px",marginTop:"-5px"}},!0===p&&React.createElement("pre",{style:{fontSize:"11px",margin:0}},"(",e.slug,")")))}))))})),function(e){var t=e.color,n=e.url,a=e.setAttributes;return React.createElement(r.InspectorControls,null,React.createElement(o.PanelBody,{title:Object(l.__)("Button Design Options")},React.createElement("div",null,React.createElement("p",null,React.createElement("strong",null,"Color:")),React.createElement(o.ColorPalette,{colors:m,value:t,onChange:function(e){a({color:e})},disableCustomColors:!0})),React.createElement("div",null,React.createElement(o.TextControl,{label:"URL",value:n,onChange:function(e){return a({url:e})}}))))}),E=function(e){var t=e.attributes,n=e.className,a=e.setAttributes,c=(e.isSelected,t.color),l=t.label,o=t.url,u=s()(n,b(c,m),"ui","button");return React.createElement(i.Fragment,null,React.createElement(x,{color:c,url:o,setAttributes:a}),React.createElement("div",{className:u},React.createElement(r.RichText,{tagName:"div",value:l,onChange:function(e){return a({label:e})},placeholder:"Button",formattingControls:[]})))},R=function(e){var t=e.attributes,n=e.className,a=t.color,c=t.label,l=t.url,o=s()(n,b(a,m),"ui","button");return React.createElement(r.RichText.Content,{tagName:"a",value:c,className:o,href:l})},y=["prc-block/button",{title:Object(l.__)("Button"),icon:"admin-appearance",category:"layout",keywords:[Object(l.__)("prc"),Object(l.__)("button")],supports:{html:!1},attributes:{color:{type:"string",default:""},label:{type:"string",default:""},url:{type:"string",default:""}},edit:E,save:R}];c.registerBlockType.apply(void 0,Object(a.a)(y))},39:function(e,t){e.exports=wp.i18n},40:function(e,t){e.exports=moment},47:function(e,t){e.exports=wp.apiFetch},50:function(e,t){e.exports=ReactDOM},91:function(e,t){e.exports=lodash}},[[155,1,2]]]);
//# sourceMappingURL=main-2a80ded1.js.map