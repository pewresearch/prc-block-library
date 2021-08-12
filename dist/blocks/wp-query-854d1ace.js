/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.0.0
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[48],{1:function(e,t){e.exports=window.React},16:function(e,t){e.exports=window.wp.data},18:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(27);var a=n(24),o=n(28);function c(e,t){return Object(r.a)(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],c=!0,l=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);c=!0);}catch(e){l=!0,a=e}finally{try{c||null==n.return||n.return()}finally{if(l)throw a}}return o}}(e,t)||Object(a.a)(e,t)||Object(o.a)()}},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},24:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(20);function a(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},25:function(e,t){e.exports=window.wp.primitives},27:function(e,t,n){"use strict";function r(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return r}))},28:function(e,t,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return r}))},3:function(e,t){e.exports=window.wp.components},307:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/wp-query","category":"layout","attributes":{"postId":{"type":"integer"},"storyItemDisableExcerpt":{"type":"boolean","default":false},"storyItemImageSlot":{"type":"string","default":"left"},"storyItemImageSize":{"type":"string","default":"A3"},"postsPerPage":{"type":"integer","default":5},"taxQuery":{"type":"object","default":{"relation":"OR","data":[]}}},"styles":[{"name":"pub-listing","label":"Publication Listing","isDefault":true},{"name":"columns","label":"As Columns"}],"supports":{"html":false,"align":false}}')},35:function(e,t){e.exports=window.wp.apiFetch},38:function(e,t){e.exports=window.lodash},4:function(e,t){e.exports=window.wp.element},47:function(e,t){e.exports=moment},5:function(e,t){e.exports=window.wp.blockEditor},54:function(e,t){e.exports=window.wp.url},62:function(e,t){e.exports=window.wp.keycodes},63:function(e,t){e.exports=window.ReactDOM},646:function(e,t,n){n(22),e.exports=n(654)},654:function(e,t,n){"use strict";n.r(t);var r=n(14),a=n(9),o=n(2),c=n(4),l=n(25),i=Object(c.createElement)(l.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(c.createElement)(l.Path,{d:"M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h12c.3 0 .5.2.5.5v12zM7 11h2V9H7v2zm0 4h2v-2H7v2zm3-4h7V9h-7v2zm0 4h7v-2h-7v2z"})),s=n(307),u=n(18),m=n(15),p=n.n(m),b=n(33),f=n(16),d=n(5),y=n(38),g=n(3),v=Object(c.createElement)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(l.Path,{d:"M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"}));function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var h=function(e){var t=e.index,n=e.label,r=e.taxonomy,a=void 0!==r&&r,c=e.value,l=e.options,i=e.taxQuery,s=e.setAttributes;return React.createElement("div",null,React.createElement(g.Flex,null,React.createElement(g.FlexBlock,null,React.createElement("strong",null,n)),React.createElement(g.FlexItem,null,React.createElement(g.Button,{isLink:!0,icon:v,onClick:function(){var e=i;e.data.splice(t,1),s({taxQuery:w(w({},i),e)})},lable:Object(o.__)("Remove taxonomy argument")}))),!1===a&&React.createElement("div",{style:{margin:"16px"}},React.createElement(g.SelectControl,{value:a,options:l,onChange:function(e){var n=i;n.data[t].taxonomy=e,s({taxQuery:w(w({},i),n)})}})),!1!==a&&null===c&&React.createElement(d.__experimentalLinkControl,{label:Object(o.__)("Term"),value:c,showInitialSuggestions:!0,suggestionsQuery:{type:"term",subtype:a},onChange:function(e){var n=e.id,r=e.title,a=e.url,o=i;o.data[t].terms=n,o.data[t].title=r,o.data[t].value=a,s({taxQuery:w(w({},i),o)})},settings:[]}),React.createElement(g.HorizontalRule,null))},E=function(e){var t=e.taxQuery,n=e.setAttributes,r=t.relation,a=t.data,l=Object(c.useState)([{label:"Select a Taxonomy",value:!1},{label:"Topics",value:"topic"},{label:"Formats",value:"formats"},{label:"Research Areas",value:"research-teams"}]),i=Object(u.a)(l,2),s=i[0],m=i[1];return Object(c.useEffect)((function(){var e=a.map((function(e){return e.taxonomy})),t=s.map((function(t){return e.includes(t.value)?t.disabled=!0:t.disabled=!1,t}));m(t)}),[t]),React.createElement(c.Fragment,null,React.createElement("div",null,a.map((function(e,r){var a=e.taxonomy,c=e.value,l=function(e){var t=e.taxonomy,n=e.title,r=!1===t?"Choose Taxonomy":"Choose ".concat(t," Term");return null!==n&&!1!==t&&(r="".concat(t,": ").concat(n)),r.toLowerCase().split(" ").map((function(e){return e.charAt(0).toUpperCase()+e.substring(1)})).join(" ")}(e);return React.createElement(h,{index:r,label:Object(o.__)(l),taxonomy:a,value:c,options:s,taxQuery:t,setAttributes:n})})),2<=a.length&&React.createElement("div",{style:{marginTop:"1em",marginBottom:"1em"}},React.createElement(g.ToggleControl,{label:"Query Relation (OR|AND)",help:"AND"===r?"AND (restrictive: restricts content)":"OR (expansive: expands content)",checked:"AND"===r,onChange:function(){var e=t;"OR"===e.relation?e.relation="AND":e.relation="OR",n({taxQuery:w(w({},t),e)})}}))),React.createElement(g.Button,{isSecondary:!0,isSmall:!0,onClick:function(){var e=t;e.data.push({taxonomy:!1,terms:null,value:null}),n({taxQuery:w(w({},t),e)})}},"Add Taxonomy"))},x=n(47),R=n(35),j=n.n(R),P=function(e){return new Promise((function(t){var n=[];console.log("fetchPosts?",e);var r={method:"POST",path:"/prc-api/v2/block/wp-query",data:e};j()(r).then((function(e){console.log(e),e.forEach((function(e){var t,r={id:e.id,title:e.title,excerpt:e.excerpt,date:(t=e.timestamp,x(t).format("MMM D, YYYY")),link:e.link,label:e.label,image:e.image};n.push(r)})),t(n)}))}))},I=function(e){var t=e.attributes,n=e.setAttributes,r=e.disabled,a=t.postsPerPage,l=t.storyItemDisableExcerpt,i=t.storyItemImageSlot,s=(t.storyItemImageSize,t.taxQuery);return React.createElement(c.Fragment,null,React.createElement("div",null,React.createElement("h4",{className:"sans-serif"},"Story Item Settings"),React.createElement(g.ToggleControl,{label:"Disable Images",checked:"disabled"===i,onChange:function(){return n({storyItemImageSlot:!1===i})},disabled:r}),React.createElement(g.ToggleControl,{label:"Disable Excerpt",checked:l,onChange:function(){return n({storyItemDisableExcerpt:!l})},disabled:r})),React.createElement(g.HorizontalRule,null),React.createElement("div",null,React.createElement("h4",{className:"sans-serif"},"Query Arguments"),React.createElement(g.RangeControl,{label:Object(o.__)("Number of posts"),value:a,onChange:function(e){return n({postsPerPage:e})},min:3,max:10,required:!0,disabled:r})),React.createElement(g.HorizontalRule,null),React.createElement("div",null,React.createElement("h4",{className:"sans-serif"},"Taxonomy Query Arguments"),React.createElement(E,{taxQuery:s,setAttributes:n})),React.createElement(g.HorizontalRule,null))},S=function(e){var t=e.attributes,n=e.setAttributes,r=e.posts,a=e.setPosts,l=e.clientId,i=t.postId,s=t.postsPerPage,m=Object(c.useState)(!1),p=Object(u.a)(m,2),b=p[0],f=p[1],y=function(){f(!0),P(t).then((function(e){setTimeout((function(){f(!1);var t=e.filter((function(e,t){return t<=s-1}));a(t)}),3600)}))};return Object(c.useEffect)((function(){console.log("initial load",i),void 0!==i&&P(t).then((function(e){setTimeout((function(){var t=e.filter((function(e,t){return t<=s-1}));a(t)}),3600)}))}),[l]),React.createElement(c.Fragment,null,React.createElement(d.InspectorControls,null,React.createElement(g.PanelBody,{title:Object(o.__)("Query Arguments")},React.createElement(I,{attributes:t,setAttributes:n,disabled:b}),React.createElement(g.Button,{isBusy:b,isPrimary:!0,onClick:function(){return y()}},"Update"))),!1===r&&void 0===i&&React.createElement(g.Placeholder,{label:"Configure Query Args",isColumnLayout:!0},React.createElement("div",null,React.createElement(I,{attributes:t,setAttributes:n,disabled:b}),React.createElement(g.Button,{isBusy:b,isPrimary:!0,onClick:function(){return y()}},"Query Posts"))))},k=function(e){var t=e.posts,n=e.attributes;if(!1===t)return React.createElement(c.Fragment,null);var r=n.labelTaxonomy,a=n.storyItemDisableExcerpt,o=n.storyItemImageSize,l=n.storyItemImageSlot,i=n.className,s="is-style-pub-listing"===i,u="is-style-columns"===i;return React.createElement(c.Fragment,null,t.map((function(e){var t="disabled"===l;u&&"left"===t&&(t="top");var n={title:e.title,image:e.image,excerpt:e.excerpt,link:e.link,label:e.label,date:e.date,extra:"",postID:e.id,emphasis:!1,isChartArt:!1,imageSlot:t,imageSize:o,horizontal:s,stacked:u,enableHeader:!0,enableMeta:!0,enableExcerpt:!a,enableExtra:!1,inLoop:s,enableAltTaxonomy:"research-teams"===r,headerSize:2,className:"left"===l?"is-style-left":"is-style-disabled"};return u?React.createElement("div",{className:"column"},React.createElement(b.e,n)):React.createElement(b.e,n)})))},A=function(e){var t=e.attributes,n=e.setAttributes,r=e.clientId,a=t.className,o=Object(c.useState)(!1),l=Object(u.a)(o,2),i=l[0],s=l[1],m=p()({"ui equal width divided grid":"is-style-columns"===a,"ui link divided items":"is-style-pub-listing"===a}),b=Object(d.useBlockProps)({className:m}),g=Object(f.useSelect)((function(e){return{postId:e("core/editor").getCurrentPostId()}}),[r]).postId;return Object(c.useEffect)((function(){!1!==i&&Object(y.isInteger)(g)&&n({postId:g})}),[g,i]),React.createElement("div",b,React.createElement(S,{attributes:t,setAttributes:n,posts:i,setPosts:s,clientId:r}),React.createElement(k,{posts:i,attributes:t}))},C=function(){return React.createElement(d.InnerBlocks.Content,null)};function D(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?D(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):D(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var T=s.name,z={title:Object(o.__)("Query"),description:Object(o.__)("Query posts by format, topic, region, and/or date. Posts are displayed as Story Items."),icon:i,edit:A,save:C};Object(a.registerBlockType)(T,Q(Q({},s),z))},9:function(e,t){e.exports=window.wp.blocks}},[[646,0,1,2]]]);
//# sourceMappingURL=wp-query-854d1ace.js.map