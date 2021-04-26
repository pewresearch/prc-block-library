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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[36],{0:function(e,t){e.exports=wp.element},1:function(e,t){e.exports=wp.i18n},155:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/wp-query","category":"layout","attributes":{"postId":{"type":"integer"},"storyItemImageSlot":{"type":"string","default":"left"},"storyItemImageSize":{"type":"string","default":"A2"},"formatTermId":{"type":"integer"},"labelTaxonomy":{"type":"string","default":"formats"},"pinned":{"type":"string","default":"[]"},"postsPerPage":{"type":"integer","default":5},"programTermId":{"type":"integer"},"taxQuery":{"type":"object","default":{"relation":"OR","data":[]}}},"styles":[{"name":"pub-listing","label":"Publication Listing","isDefault":true},{"name":"columns","label":"As Columns"}],"supports":{"html":false,"align":false}}')},17:function(e,t){e.exports=moment},2:function(e,t){e.exports=wp.components},21:function(e,t){e.exports=lodash},22:function(e,t){e.exports=wp.apiFetch},26:function(e,t){e.exports=wp.url},282:function(e,t,n){n(11),e.exports=n(285)},285:function(e,t,n){"use strict";n.r(t);var r=n(6),a=n(5),o=n(1),l=n(0),c=n(97),i=Object(l.createElement)(c.b,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(l.createElement)(c.a,{d:"M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h12c.3 0 .5.2.5.5v12zM7 11h2V9H7v2zm0 4h2v-2H7v2zm3-4h7V9h-7v2zm0 4h7v-2h-7v2z"})),s=n(155),u=n(14),m=n(8),p=n.n(m),b=n(7),d=n(3),f=n(2),g=Object(l.createElement)(c.b,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(l.createElement)(c.a,{d:"M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"}));function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=function(e){var t=e.index,n=e.label,r=e.taxonomy,a=void 0!==r&&r,l=e.value,c=e.options,i=e.taxQuery,s=e.setAttributes;return React.createElement("div",null,React.createElement(f.Flex,null,React.createElement(f.FlexBlock,null,React.createElement("strong",null,n)),React.createElement(f.FlexItem,null,React.createElement(f.Button,{isLink:!0,icon:g,onClick:function(){var e=i;e.data.splice(t,1),s({taxQuery:h(h({},i),e)})},lable:Object(o.__)("Remove taxonomy argument")}))),!1===a&&React.createElement("div",{style:{margin:"16px"}},React.createElement(f.SelectControl,{value:a,options:c,onChange:function(e){var n=i;n.data[t].taxonomy=e,s({taxQuery:h(h({},i),n)})}})),!1!==a&&null===l&&React.createElement(d.__experimentalLinkControl,{label:Object(o.__)("Term"),value:l,showInitialSuggestions:!0,suggestionsQuery:{type:"term",subtype:a},onChange:function(e){var n=e.id,r=e.title,a=e.url,o=i;o.data[t].terms=n,o.data[t].title=r,o.data[t].value=a,s({taxQuery:h(h({},i),o)})},settings:[]}),React.createElement(f.HorizontalRule,null))},O=function(e){var t=e.taxQuery,n=e.setAttributes,r=t.relation,a=t.data,c=Object(l.useState)([{label:"Select a Taxonomy",value:!1},{label:"Topics",value:"topic"},{label:"Formats",value:"formats"},{label:"Programs",value:"programs"}]),i=Object(u.a)(c,2),s=i[0],m=i[1];return Object(l.useEffect)((function(){var e=a.map((function(e){return e.taxonomy})),t=s.map((function(t){return e.includes(t.value)?t.disabled=!0:t.disabled=!1,t}));m(t)}),[t]),React.createElement(l.Fragment,null,React.createElement("div",null,a.map((function(e,r){var a=e.taxonomy,l=e.value,c=function(e){var t=e.taxonomy,n=e.title,r=!1===t?"Choose Taxonomy":"Choose ".concat(t," Term");return null!==n&&!1!==t&&(r="".concat(t,": ").concat(n)),r.toLowerCase().split(" ").map((function(e){return e.charAt(0).toUpperCase()+e.substring(1)})).join(" ")}(e);return React.createElement(y,{index:r,label:Object(o.__)(c),taxonomy:a,value:l,options:s,taxQuery:t,setAttributes:n})})),2<=a.length&&React.createElement("div",{style:{marginTop:"1em",marginBottom:"1em"}},React.createElement(f.ToggleControl,{label:"Query Relation (OR|AND)",help:"AND"===r?"AND (restrictive: restricts content)":"OR (expansive: expands content)",checked:"AND"===r,onChange:function(){var e=t;"OR"===e.relation?e.relation="AND":e.relation="OR",n({taxQuery:h(h({},t),e)})}}))),React.createElement(f.Button,{isSecondary:!0,isSmall:!0,onClick:function(){var e=t;e.data.push({taxonomy:!1,terms:null,value:null}),n({taxQuery:h(h({},t),e)})}},"Add Taxonomy"))},E=n(33),R=n(17),j=n(22),x=n.n(j),k=function(e){return new Promise((function(t){var n=[];console.log("fetchPosts?",e);var r={method:"POST",path:"/prc-api/v2/block/wp-query",data:e};x()(r).then((function(e){console.log(e),e.forEach((function(e){var t,r={id:e.id,title:e.title,excerpt:e.excerpt,date:(t=e.timestamp,R(t).format("MMM D, YYYY")),link:e.link,label:e.label,image:e.image};n.push(r)})),t(n)}))}))},w=function(e){var t=e.attributes,n=e.setAttributes,r=e.wide,a=void 0!==r&&r,c=e.disabled,i=void 0!==c&&c,s=t.formatTermId,m=t.programTermId,p=t.postsPerPage,b=t.labelTaxonomy,d=t.disableImage,g=t.taxQuery,v=Object(l.useState)([]),h=Object(u.a)(v,2),y=h[0],R=h[1],j=Object(l.useState)([]),x=Object(u.a)(j,2),k=x[0],w=x[1],P=function(e,n){console.log("initTerms",t),Object(E.e)(e).then((function(e){var t=Object.keys(e),r=[{value:"any",label:"Any"}];t.forEach((function(t){r.push({value:t,label:e[t].name})})),n(r)}))};return Object(l.useEffect)((function(){0===y.length&&P("Formats",R),0===k.length&&P("Programs",w)}),[]),React.createElement(l.Fragment,null,React.createElement("div",null,React.createElement("h4",{className:"sans-serif"},"Story Item Settings"),React.createElement(f.ToggleControl,{label:"Disable Images",checked:d,onChange:function(){return n({disableImage:!d})}}),React.createElement("div",{style:!0===a?{display:"flex",flexDirection:"row"}:{}},React.createElement("div",{style:!0===a?{flexGrow:"1",paddingRight:"1em"}:{}},React.createElement(f.SelectControl,{label:"Format",value:s,options:y,onChange:function(e){n({formatTermId:parseInt(e)})},disabled:i})),React.createElement("div",{style:!0===a?{display:"flex",alignItems:"flex-end",paddingBottom:"0.2em"}:{}},React.createElement(f.ToggleControl,{label:"Use as Label",checked:"formats"===b,onChange:function(){return n({labelTaxonomy:"formats"===b?"programs":"formats"})}}))),React.createElement("div",{style:!0===a?{display:"flex",flexDirection:"row"}:{}},React.createElement("div",{style:!0===a?{flexGrow:"1",paddingRight:"1em"}:{}},React.createElement(f.SelectControl,{label:"Program",value:m,options:k,onChange:function(e){n({programTermId:parseInt(e)})},disabled:i})),React.createElement("div",{style:!0===a?{display:"flex",alignItems:"flex-end",paddingBottom:"0.2em"}:{}},React.createElement(f.ToggleControl,{label:"Use as Label",checked:"programs"===b,onChange:function(){return n({labelTaxonomy:"programs"===b?"formats":"programs"})}})))),React.createElement(f.HorizontalRule,null),React.createElement("div",null,React.createElement("h4",{className:"sans-serif"},"Query Arguments"),React.createElement(f.RangeControl,{label:Object(o.__)("Number of posts"),value:p,onChange:function(e){return n({postsPerPage:e})},min:3,max:10,required:!0})),React.createElement(f.HorizontalRule,null),React.createElement("div",null,React.createElement("h4",{className:"sans-serif"},"Taxonomy Query Arguments"),React.createElement(O,{taxQuery:g,setAttributes:n})),React.createElement(f.HorizontalRule,null))},P=function(e){var t=e.attributes,n=e.setAttributes,r=e.setPosts,a=e.clientId,c=Object(l.useState)(!1),i=Object(u.a)(c,2),s=i[0],m=i[1],p=Object(b.useSelect)((function(e){return{hasInnerBlocks:0<e("core/block-editor").getBlocks(a).length}}),[a]).hasInnerBlocks,g=function(){m(!0),k(t).then((function(e){setTimeout((function(){m(!1),r(e)}),3600)}))};return React.createElement(l.Fragment,null,React.createElement(d.InspectorControls,null,React.createElement(f.PanelBody,{title:Object(o.__)("Query Arguments")},React.createElement(w,{attributes:t,setAttributes:n,disabled:s}),React.createElement(f.Button,{isBusy:s,isPrimary:!0,onClick:function(){return g()}},"Update"))),!1===p&&React.createElement(f.Placeholder,{label:"Configure Query Args",isColumnLayout:!0},React.createElement("div",null,React.createElement(w,{attributes:t,setAttributes:n,disabled:s,wide:!0}),React.createElement(f.Button,{isBusy:s,isPrimary:!0,onClick:function(){return g()}},"Query Posts"))))},C=["prc-block/story-item","prc-block/column"],I=function(e){var t=e.item,n=e.labelTaxonomy,r=e.className,o=void 0===r?"is-style-left":r,l=e.imageSlot,c=void 0===l?"left":l,i={title:t.title,image:t.image,excerpt:t.excerpt,link:t.link,label:t.label,date:t.date,extra:"",postID:t.id,emphasis:!1,isChartArt:!1,imageSlot:c,imageSize:"A3",horizontal:!0,stacked:!1,enableHeader:!0,enableExcerpt:!0,enableExtra:!1,enableProgramsTaxonomy:!1,headerSize:2,className:o};return"programs"===n&&(i.enableProgramsTaxonomy=!0),Object(a.createBlock)("prc-block/story-item",i)},T=function(e){var t=e.attributes,n=e.setAttributes,r=e.clientId,o=t.postsPerPage,c=t.labelTaxonomy,i=t.disableImage,s=t.className,m=p()({"ui equal width divided grid":"is-style-columns"===s}),f=Object(d.useBlockProps)({className:s}),g=Object(d.__experimentalUseInnerBlocksProps)({className:m},{allowedBlocks:C,orientation:"vertical",renderAppender:!1,templateLock:"all"}),v=Object(l.useState)(!1),h=Object(u.a)(v,2),y=h[0],O=h[1],E=Object(b.useDispatch)("core/block-editor").replaceInnerBlocks,R=Object(b.useSelect)((function(e){return{hasInnerBlocks:0<e("core/block-editor").getBlocks(r).length,postId:e("core/editor").getCurrentPostId()}}),[r]),j=R.hasInnerBlocks,x=R.postId;return Object(l.useEffect)((function(){!function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!1!==e){var t=[];e.forEach((function(e){if("is-style-columns"===s){var n=[];n.push(I({item:e,disableImage:i,labelTaxonomy:c,className:"is-style-top",imageSlot:"top"}));var r=Object(a.createBlock)("prc-block/column",{width:Math.round(16/o)},n);t.push(r)}else t.push(I({item:e,disableImage:i,labelTaxonomy:c}))}));var n=o,l=t=t.filter((function(e,t){return t<=n-1}));E(r,l)}}(y)}),[y]),Object(l.useEffect)((function(){n({postId:x})}),[x]),React.createElement("div",f,React.createElement(P,{attributes:t,setAttributes:n,setPosts:O,clientId:r}),!0===j&&React.createElement("div",g))},B=function(){return React.createElement(d.InnerBlocks.Content,null)};function S(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function _(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?S(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):S(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var H=s.name,z={title:Object(o.__)("Query"),description:Object(o.__)("Query posts by format, topic, region, and/or date. Posts are displayed as Story Items."),icon:i,edit:T,save:B};Object(a.registerBlockType)(H,_(_({},s),z))},3:function(e,t){e.exports=wp.blockEditor},33:function(e,t,n){"use strict";n.d(t,"e",(function(){return o})),n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d})),n.d(t,"c",(function(){return h})),n.d(t,"d",(function(){return O}));n(17);var r=n(22),a=n.n(r),o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:25;return new Promise((function(n){var r={};a()({path:"/wp/v2/".concat(e,"?per_page=").concat(t)}).then((function(t){for(var a=0;a<t.length;a++){var o=t[a].slug.replace("".concat(e.toLowerCase(),"_"),"");r[t[a].id]={id:t[a].id,name:t[a].name,parent:t[a].parent,slug:o}}n(r)}))}))},l=(n(6),n(1)),c=n(7),i=n(2),s=n(5),u=function(e){var t=e.label,n=void 0===t?"":t,r=e.blockName,a=e.clientId,o=(e.className,e.attributes),u=void 0===o?{}:o;return React.createElement(i.Button,{label:Object(l.__)(n),tooltipPosition:"bottom",onClick:function(){var e=Object(c.select)("core/block-editor").getBlock(a);console.log("debug info...",e.innerBlocks.length);var t=e.innerBlocks.length-1,n=Object(s.createBlock)(r,u);Object(c.dispatch)("core/block-editor").insertBlock(n,t,a)},className:"block-editor-button-block-appender"},Object(l.__)(n))},m=n(0),p=n(3),b=n(156),d=function(e){var t=e.url,n=e.heading,r=e.headingSize,a=void 0===r?"h2":r,o=e.setAttributes;return React.createElement(m.Fragment,null,React.createElement(p.BlockControls,null,React.createElement(i.ToolbarGroup,null,React.createElement(O,{url:t,onChange:function(e){o({url:e.url})}}))),React.createElement(i.Flex,{style:{paddingBottom:"1em"}},React.createElement(i.FlexItem,null,React.createElement(p.RichText,{tagName:a,value:n,onChange:function(e){return o({heading:e})},placeholder:"Heading...",formattingControls:[],keepPlaceholderOnFocus:!0,className:"sans-serif"})),React.createElement(i.FlexBlock,null,React.createElement(b.a,{name:"chevron right",size:"large",style:{marginLeft:"0.5em"}}))))},f=n(38),g=function(e){var t=e.level,n=e.isPressed,r=void 0!==n&&n,a={1:"M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z",2:"M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z",3:"M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z",4:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm10-2h-1v2h-2v-2h-5v-2l4-6h3v6h1v2zm-3-2V7l-2.8 4H16z",5:"M12.1 12.2c.4.3.7.5 1.1.7.4.2.9.3 1.3.3.5 0 1-.1 1.4-.4.4-.3.6-.7.6-1.1 0-.4-.2-.9-.6-1.1-.4-.3-.9-.4-1.4-.4H14c-.1 0-.3 0-.4.1l-.4.1-.5.2-1-.6.3-5h6.4v1.9h-4.3L14 8.8c.2-.1.5-.1.7-.2.2 0 .5-.1.7-.1.5 0 .9.1 1.4.2.4.1.8.3 1.1.6.3.2.6.6.8.9.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4-.2.4-.5.8-.9 1.1-.4.3-.8.5-1.3.7-.5.2-1 .3-1.5.3-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1-.1-.1 1-1.5 1-1.5zM9 15H7v-4H3v4H1V5h2v4h4V5h2v10z",6:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm8.6-7.5c-.2-.2-.5-.4-.8-.5-.6-.2-1.3-.2-1.9 0-.3.1-.6.3-.8.5l-.6.9c-.2.5-.2.9-.2 1.4.4-.3.8-.6 1.2-.8.4-.2.8-.3 1.3-.3.4 0 .8 0 1.2.2.4.1.7.3 1 .6.3.3.5.6.7.9.2.4.3.8.3 1.3s-.1.9-.3 1.4c-.2.4-.5.7-.8 1-.4.3-.8.5-1.2.6-1 .3-2 .3-3 0-.5-.2-1-.5-1.4-.9-.4-.4-.8-.9-1-1.5-.2-.6-.3-1.3-.3-2.1s.1-1.6.4-2.3c.2-.6.6-1.2 1-1.6.4-.4.9-.7 1.4-.9.6-.3 1.1-.4 1.7-.4.7 0 1.4.1 2 .3.5.2 1 .5 1.4.8 0 .1-1.3 1.4-1.3 1.4zm-2.4 5.8c.2 0 .4 0 .6-.1.2 0 .4-.1.5-.2.1-.1.3-.3.4-.5.1-.2.1-.5.1-.7 0-.4-.1-.8-.4-1.1-.3-.2-.7-.3-1.1-.3-.3 0-.7.1-1 .2-.4.2-.7.4-1 .7 0 .3.1.7.3 1 .1.2.3.4.4.6.2.1.3.3.5.3.2.1.5.2.7.1z"};return a.hasOwnProperty(t)?React.createElement(i.SVG,{width:"24",height:"24",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",isPressed:r},React.createElement(i.Path,{d:a[t]})):null},v={className:"block-library-heading-level-dropdown",isAlternate:!0},h=function(e){var t=e.selectedLevel,n=e.levels,r=void 0===n?[2,3]:n,a=e.onChange;return console.log("HeadingLevelToolbar",t),React.createElement(i.ToolbarGroup,null,React.createElement(i.Dropdown,{popoverProps:v,renderToggle:function(e){var n=e.onToggle,r=e.isOpen;return React.createElement(i.ToolbarButton,{"aria-expanded":r,"aria-haspopup":"true",icon:React.createElement(g,{level:t}),label:Object(l.__)("Change heading level"),onClick:n,onKeyDown:function(e){r||e.keyCode!==f.a||(e.preventDefault(),e.stopPropagation(),n())},showTooltip:!0})},renderContent:function(){return React.createElement(i.Toolbar,{className:"block-library-heading-level-toolbar",label:Object(l.__)("Change heading level")},React.createElement(i.ToolbarGroup,{isCollapsed:!1,controls:r.map((function(e){var n=e===t;return{icon:React.createElement(g,{level:e,isPressed:n}),title:Object(l.sprintf)(Object(l.__)("Heading %d"),e),isActive:n,onClick:function(){a(e)}}}))}))}}))},y=n(14),O=function(e){var t=e.url,n=e.onChange,r=e.query,a=void 0===r?{type:"term",subtype:"topic"}:r,o=Object(m.useState)(!1),c=Object(y.a)(o,2),s=c[0],u=c[1];return React.createElement(m.Fragment,null,React.createElement(i.ToolbarButton,{"aria-expanded":s,"aria-haspopup":"true",label:Object(l.__)("Set Link"),icon:"admin-links",onClick:function(){return u(!s)},showTooltip:!0}),!0===s&&React.createElement(i.Popover,{position:"bottom center",onClose:function(){return u(!1)}},React.createElement(p.__experimentalLinkControl,{className:"wp-block-navigation-link__inline-link-input",value:{url:t},showInitialSuggestions:!0,suggestionsQuery:a,onChange:function(e){return n(e)},settings:[]})))};n(10),n(43),n(319),n(29),n(26)},4:function(e,t){e.exports=React},47:function(e,t){e.exports=ReactDOM},5:function(e,t){e.exports=wp.blocks},7:function(e,t){e.exports=wp.data},97:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var r=n(6),a=n(36);var o=n(8),l=n.n(o),c=n(0);function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u=function(e){return Object(c.createElement)("path",e)},m=function(e){var t=e.className,n=e.isPressed,r=s(s({},function(e,t){if(null==e)return{};var n,r,o=Object(a.a)(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(e,["className","isPressed"])),{},{className:l()(t,{"is-pressed":n})||void 0,role:"img","aria-hidden":!0,focusable:!1});return Object(c.createElement)("svg",r)}}},[[282,0,1,2]]]);
//# sourceMappingURL=wp-query-c2165665.js.map