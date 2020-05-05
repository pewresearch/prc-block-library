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
(window["wpackioprcBlocksLibrarytaxonomy-treeJsonp"]=window["wpackioprcBlocksLibrarytaxonomy-treeJsonp"]||[]).push([[0],{0:function(e,t){e.exports=React},120:function(e,t){e.exports=wp.blocks},121:function(e,t){e.exports=wp.blockEditor},141:function(e,t,n){n(142),e.exports=n(262)},18:function(e,t){e.exports=wp.element},262:function(e,t,n){"use strict";n.r(t);var a=n(131),o=n(120),r=n(61),c=n(18),l=n(271),m=n(84),i=n(121),u=(n(62),function(e,t){void 0===t&&(t=25);var n=new wp.api.collections[e];return void 0!==n&&new Promise((function(a){var o={};n.fetch({data:{hide_empty:!1,per_page:t}}).then((function(t){for(var n=0;n<t.length;n++){var r=t[n].slug.replace("".concat(e.toLowerCase(),"_"),"");o[t[n].id]={id:t[n].id,name:t[n].name,slug:r}}a(o)}))}))}),s=n(269),d=n(270),p=function(e){var t=e.name,n=e.url,a=e.termID,o=e.editMode,r=e.termsSelected,l=e.setData,m=!1;return void 0!==r&&r.includes(a)&&(m=!0),React.createElement(c.Fragment,null,!0===o&&React.createElement(s.a,{label:t,defaultChecked:m,onChange:function(e){console.log("Clicked ".concat(a)),console.log("Existing Selected Terms:"),console.log(r);var t=r;void 0!==r?t.push(a):t=[a],l({termsSelected:t})}}),!1===o&&React.createElement("a",{href:n},t))},f=function(e){var t=e.label,n=e.term,a=(e.taxonomy,e.termsSelected),o=e.editMode,r=e.setData,l="100%",m="auto";return!0===o&&(l="7.15em",m="scroll"),Object(c.useEffect)((function(){console.log("Term Change")}),[n]),React.createElement(c.Fragment,null,React.createElement(d.a,null,React.createElement(d.a.Item,null,React.createElement(d.a.Header,null,t)),React.createElement(d.a.Item,null,React.createElement(d.a,{style:{maxHeight:l,overflowY:m}},React.createElement(d.a.Item,null,React.createElement(p,{name:"Term 1",url:"#",termID:1e3,editMode:o,termsSelected:a,setData:r})),React.createElement(d.a.Item,null,React.createElement(p,{name:"Term 2",url:"#",termID:10001,editMode:o,termsSelected:a,setData:r})),React.createElement(d.a.Item,null,React.createElement(p,{name:"Term 3",url:"#",termID:1e3,editMode:o})),React.createElement(d.a.Item,null,React.createElement(p,{name:"Term 4",url:"#",termID:1e3,editMode:o})),React.createElement(d.a.Item,null,React.createElement(p,{name:"Term 5",url:"#",termID:1e3,editMode:o})),React.createElement(d.a.Item,null,React.createElement(p,{name:"Term 6",url:"#",termID:1e3,editMode:o}))))))},E=Object(l.a)({terms:[]})((function(e){var t=e.terms,n=e.attributes,a=e.setAttributes,o=e.isSelected,r=e.setState,l=n.taxonomy,s=n.term,d=n.termsSelected;Object(c.useEffect)((function(){console.log("Taxonomy Change"),!1!==l&&function(e,t){return new Promise((function(n){u(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(n){var a=e[n];t.push({value:a.name,label:a.name})})),t.sort((function(e,t){return e.label>t.label?1:-1})),n(t)}))}))}(l,50).then((function(e){return r({terms:e})}))}),[l]);var p=function(e){var t=e.tx;return React.createElement(m.SelectControl,{value:t,options:[{label:"Topics",value:"Topics"},{label:"Topic",value:"Topic"}],onChange:function(e){a({taxonomy:e})}})},E=function(e){var n=e.tm;return React.createElement(m.SelectControl,{value:n,options:t,onChange:function(e){a({term:e})}})};return console.log(l),React.createElement(c.Fragment,null,!1===s&&React.createElement(p,{tx:l}),!1!==l&&!1===s&&React.createElement(E,{tm:s}),!1!==s&&React.createElement("h2",null,s),!1!==l&&!1!==s&&React.createElement(c.Fragment,null,React.createElement(f,{label:"Key Topics",taxonomy:l,term:s,editMode:o,termsSelected:d,setData:a}),React.createElement(i.InnerBlocks,null)))})),R=function(e){return console.log("Save Mode:"),console.log(e),React.createElement("div",null,"Hello World")},g=["prc-block/taxonomy-tree",{title:Object(r.__)("Taxonomy Tree"),description:"A tree view of a selected taxonomy and term.",category:"layout",icon:"networking",keywords:[Object(r.__)("Taxonomy Tree"),Object(r.__)("Taxonomies")],supports:{html:!1,align:!1},attributes:{taxonomy:{type:"string",default:!1},term:{type:"string",default:!1},termsSelected:{type:"array"}},edit:E,save:R}];o.registerBlockType.apply(void 0,Object(a.a)(g))},42:function(e,t){e.exports=ReactDOM},61:function(e,t){e.exports=wp.i18n},62:function(e,t){e.exports=moment},84:function(e,t){e.exports=wp.components},87:function(e,t){e.exports=lodash}},[[141,1,2]]]);
//# sourceMappingURL=main-bd51b3a0.js.map