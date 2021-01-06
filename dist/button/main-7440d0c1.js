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
(window.wpackioprcBlocksLibrarybuttonJsonp=window.wpackioprcBlocksLibrarybuttonJsonp||[]).push([[0],{0:function(e,t){e.exports=React},109:function(e,t,n){n(110),e.exports=n(122)},121:function(e,t,n){},122:function(e,t,n){"use strict";n.r(t);var a=n(99),r=n(88),c=n(46),o=n(22),l=n(29),i=n(5),u=n(14),s=n.n(u),m=[{name:"primary",color:"#2185d0"},{name:"secondary",color:"#000"},{name:"mustard",color:"#d3aa20"}],p=(n(47),n(75)),d=n.n(p),f=(window.wp,function(e,t){if(""===e||void 0===e||void 0===t||""===t)return null;var n=t.findIndex((function(t,n){if(e==t.color)return!0}));return t[n].name}),g=(n(56),n(97),n(136),n(72),n(92),n(121),n(79),n(95)),b=n(137),h=n(98),x=(Object(b.a)({termsData:[],excludeData:[],includeData:[]})((function(e){var t=e.termsData,n=e.excludeData,a=e.includeData,r=e.setState,c=e.exclude,o=e.include,u=(e.letter,e.taxonomy),s=e.setAttributes,m=e.isSelected,p=function(){(function(e,t){return new Promise((function(n){d()({path:"/prc-api/v2/blocks/helpers/get-taxonomy-by-letter/?taxonomy=".concat(e,"&letter=").concat(t)}).then((function(e){n(e)}))}))})(u,100).then((function(e){r({termsData:e}),function(e){var t={};if(0!==e.length&&0!==c.length&&(t.excludeData=JSON.parse(c)),0!==e.length&&0===o.length){var n=[];e.map((function(e){n.push({id:e.term_id,name:e.name,slug:e.slug})})),s({include:JSON.stringify(n)}),t.includeData=n}else 0!==e.length&&0!==o.length&&(t.includeData=JSON.parse(o));r(t)}(e)}))};!1!==s&&Object(h.a)((function(){0===t.length&&p()}));var f=0!==o.length&&!1===s&&JSON.parse(o);return React.createElement("div",{className:"ui link list"},!1!==f&&React.createElement(i.Fragment,null,f.map((function(e){return React.createElement("a",{className:"item",href:"/".concat(u.toLowerCase(),"/").concat(e.slug)},e.name)}))),!1!==s&&React.createElement(i.Fragment,null,t.map((function(e){var t=c.includes(e.term_id);return React.createElement("div",{className:"item"},React.createElement(l.CheckboxControl,{label:Object(g.decodeEntities)(e.name),checked:t,onChange:function(t){var r,c,o,l,i,u,m;r=t,c=e.term_id,o=e.name,l=e.slug,u=n,m=a,!0===r?(u.push(c),-1!==(i=m.findIndex((function(e){return e.id===c})))&&m.splice(i,1)):(m.push({id:c,name:o,slug:l}),function(){var e=u.indexOf(c);-1!==e&&u.splice(e,1)}()),s({exclude:JSON.stringify(u),include:JSON.stringify(m)})},"data-termid":e.term_id,"data-term":e.name}),React.createElement("div",{style:{height:"15px",marginTop:"-5px"}},!0===m&&React.createElement("pre",{style:{fontSize:"11px",margin:0}},"(",e.slug,")")))}))))})),n(96),function(e){var t=e.color,n=e.url,a=e.setAttributes;return React.createElement(o.InspectorControls,null,React.createElement(l.PanelBody,{title:Object(c.__)("Button Design Options")},React.createElement("div",null,React.createElement("p",null,React.createElement("strong",null,"Color:")),React.createElement(l.ColorPalette,{colors:m,value:t,onChange:function(e){a({color:e})},disableCustomColors:!0})),React.createElement("div",null,React.createElement(l.TextControl,{label:"URL",value:n,onChange:function(e){return a({url:e})}}))))}),v=function(e){var t=e.attributes,n=e.className,a=e.setAttributes,r=(e.isSelected,t.color),c=t.label,l=t.url,u=s()(n,f(r,m),"ui","button");return React.createElement(i.Fragment,null,React.createElement(x,{color:r,url:l,setAttributes:a}),React.createElement("div",{className:u},React.createElement(o.RichText,{tagName:"div",value:c,onChange:function(e){return a({label:e})},placeholder:"Button",formattingControls:[]})))},R=function(e){var t=e.attributes,n=e.className,a=t.color,r=t.label,c=t.url,l=s()(n,f(a,m),"ui","button");return React.createElement(o.RichText.Content,{tagName:"a",value:r,className:l,href:c})},E=["prc-block/button",{title:Object(c.__)("Button"),icon:"admin-appearance",category:"layout",keywords:[Object(c.__)("prc"),Object(c.__)("button")],supports:{html:!1},attributes:{color:{type:"string",default:""},label:{type:"string",default:""},url:{type:"string",default:""}},edit:v,save:R}];r.registerBlockType.apply(void 0,Object(a.a)(E))},22:function(e,t){e.exports=wp.blockEditor},29:function(e,t){e.exports=wp.components},46:function(e,t){e.exports=wp.i18n},47:function(e,t){e.exports=moment},5:function(e,t){e.exports=wp.element},53:function(e,t){e.exports=ReactDOM},75:function(e,t){e.exports=wp.apiFetch},78:function(e,t){e.exports=lodash},88:function(e,t){e.exports=wp.blocks},92:function(e,t){e.exports=wp.url},95:function(e,t){e.exports=wp.htmlEntities},96:function(e,t){e.exports=wp.data}},[[109,1,2]]]);
//# sourceMappingURL=main-7440d0c1.js.map