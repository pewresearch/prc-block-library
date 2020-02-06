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
(window["wpackioprcBlocksLibrarystory-itemJsonp"]=window["wpackioprcBlocksLibrarystory-itemJsonp"]||[]).push([[0],{0:function(e,t){e.exports=React},106:function(e,t){e.exports=wp.blocks},11:function(e,t){e.exports=wp.components},127:function(e,t,a){a(128),e.exports=a(250)},129:function(e,t,a){},18:function(e,t){e.exports=wp.blockEditor},250:function(e,t,a){"use strict";a.r(t);var r=a(21),n=a(22),s=a(23),l=a(12),i=a(24),o=a(19),c=(a(129),a(31)),p=a(106),m=a(18),u=a(11),b=a(8),d=a(54),h=a(29),g=a(36),f=a.n(g),E=function(e,t){console.log("getting terms for "+e);var a=new wp.api.collections[e];return void 0!==a&&new Promise((function(e,r){var n=[];a.fetch().then((function(a){for(var r=0;r<a.length;r++){var s={label:a[r].name};s.value=!0===t?a[r].id:a[r].name,n.push(s)}e(n)}))}))},R=(a(251),a(257)),v=["image"],y=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(n.a)(this,Object(s.a)(t).call(this,e))).state={open:!1,editLabel:!1,taxonomy:"Formats",labelOptions:[]},a.setState=a.setState.bind(Object(l.a)(a)),a.getLabelOptions=a.getLabelOptions.bind(Object(l.a)(a)),a}return Object(i.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){console.log("mounted"),this.getLabelOptions()}},{key:"componentDidUpdate",value:function(){console.log("updated"),this.state.taxonomy!==this.props.taxonomy&&this.getLabelOptions()}},{key:"getLabelOptions",value:function(){var e=this;if(void 0!==wp.api.collections[this.props.taxonomy]){var t=this.setState;E(this.props.taxonomy,!1).then((function(a){t({taxonomy:e.props.taxonomy,labelOptions:a})}))}}},{key:"render",value:function(){var e=this,t=function(e){return d(e).format("MMM D, YYYY")};return React.createElement(b.Fragment,null,React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(u.SelectControl,{value:this.props.label,options:this.state.labelOptions,onChange:function(t){e.props.setAttributes({label:t})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement("span",{onClick:function(){e.state.open?e.setState({open:!1}):e.setState({open:!0})}},t(this.props.date)),!0===this.state.open&&React.createElement(u.Popover,null,React.createElement("div",null,React.createElement(u.DatePicker,{currentDate:this.props.date,onChange:function(a){var r=t(a);e.props.setAttributes({date:r})}}))))))}}]),t}(b.Component),x=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(n.a)(this,Object(s.a)(t).call(this,e))).mediaHandler=a.mediaHandler.bind(Object(l.a)(a)),a}return Object(i.a)(t,e),Object(h.a)(t,[{key:"mediaHandler",value:function(e){"disabled"===this.props.slot?this.props.setAttributes({image:e.url,imageSlot:"default"}):this.props.setAttributes({image:e.url})}},{key:"render",value:function(){var e=this;return React.createElement(m.MediaUploadCheck,null,React.createElement(m.MediaUpload,{onSelect:this.mediaHandler,allowedTypes:v,render:function(t){var a=t.open;return React.createElement(b.Fragment,null,""!==e.props.img&&React.createElement(b.Fragment,null,"default"!==e.props.slot&&"disabled"!==e.props.slot&&React.createElement(m.BlockControls,null,React.createElement(u.Toolbar,{controls:[{icon:"art",title:"Chart Art",isActive:e.props.isChartArt,onClick:function(){e.props.setAttributes({isChartArt:!e.props.isChartArt})}}]})),React.createElement("div",{className:e.props.imgClass},React.createElement("img",{src:e.props.img,onClick:a}),React.createElement("div",{class:"sans-serif"},React.createElement("i",null,"Click image to open media library")),React.createElement("div",{class:"sans-serif remove-image",onClick:function(){e.props.setAttributes({image:""})}},"Or click here to ",React.createElement("strong",null,"REMOVE IMAGE")))),""===e.props.img&&React.createElement("p",null,React.createElement(u.Button,{isPrimary:!0,onClick:a},"Insert Image")))}}))}}]),t}(b.Component),C=function(e){var t=e.isChartArt,a=e.img,r=e.edit,n=e.link,s=!1;"left"!==a.slot&&"right"!==a.slot||(s=!0);var l=f()({ui:!0,medium:s,image:!0,bordered:t});return React.createElement(b.Fragment,null,void 0!==a&&React.createElement(b.Fragment,null,!0===r.enabled&&React.createElement(b.Fragment,null,React.createElement(x,{slot:a.slot,img:a.src,imgClass:l,isChartArt:t,setAttributes:r.setAttributes})),!0!==r.enabled&&React.createElement("a",{href:n,className:l},React.createElement("img",{src:a.src}))))},k=function(e){var t=e.content,a=e.enabled,r=e.edit,n=e.sansSerif,s=f()("description",{"sans-serif":n});return React.createElement(b.Fragment,null,!0===a&&React.createElement(b.Fragment,null,!0===r.enabled&&React.createElement(m.RichText,{tagName:"div",value:t,onChange:function(e){return r.setAttributes({excerpt:e})},placeholder:t,multiline:"p",className:s}),!0!==r.enabled&&React.createElement(m.RichText.Content,{tagName:"div",value:t,className:s})))},A=function(e){var t=e.content,a=e.edit,r=f()("extra");return React.createElement(b.Fragment,null,!0===a.enabled&&React.createElement(m.RichText,{tagName:"ul",value:t,onChange:function(e){return a.setAttributes({extra:e})},placeholder:t,multiline:"li",className:r}),!0!==a.enabled&&""!==t&&React.createElement(m.RichText.Content,{tagName:"div",value:t,className:r}))},O=function(e){var t=e.title,a=e.label,r=e.date,n=e.edit,s=e.link,l=e.enabled,i=e.size,o=e.taxonomy,c=i,p=a.replace(/\s+/g,"-").toLowerCase(),d=f()(p,"label");return React.createElement(b.Fragment,null,!0===l&&React.createElement(b.Fragment,null,React.createElement(R.a.Meta,null,!0===n.enabled&&React.createElement(y,{date:r,label:a,taxonomy:o,setAttributes:n.setAttributes}),!0!==n.enabled&&React.createElement(b.Fragment,null,React.createElement("span",{className:d},a||"Report")," | ",r)),React.createElement(R.a.Header,{className:i},!0===n.enabled&&React.createElement(b.Fragment,null,React.createElement(m.BlockControls,null,React.createElement(u.Toolbar,{controls:["small","normal","large"].map((function(e){var t=!1;return e===c&&(t=!0),{icon:"editor-textcolor",title:"Size: ".concat(e),isActive:t,onClick:function(){n.setAttributes({headerSize:e})}}}))})),React.createElement(m.RichText,{tagName:"div",value:t,onChange:function(e){return n.setAttributes({title:e})},placeholder:"Title",multiline:"br"})),!0!==n.enabled&&!0===l&&React.createElement(m.RichText.Content,{href:s,tagName:"a",value:t}))))},j=function(e){function t(e){return Object(r.a)(this,t),Object(n.a)(this,Object(s.a)(t).call(this,e))}return Object(i.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){console.log(this.props)}},{key:"render",value:function(){var e={enabled:!1};void 0!==this.props.editMode&&(e.enabled=!0,e.setAttributes=this.props.setAttributes);var t="Formats";!0===this.props.options.taxonomy&&(t="Programs");var a=!0;"left"!==this.props.image.slot&&"right"!==this.props.image.slot||(a=!1);var r=!1;!0===this.props.options.emphasis&&(r=!0);var n=f()(this.props.classNames,"story-item",{stacked:a,bordered:r});return React.createElement(b.Fragment,null,React.createElement(R.a,{as:"article",className:n},("top"===this.props.image.slot||"left"===this.props.image.slot)&&React.createElement(C,{img:{src:this.props.image.src,slot:this.props.image.slot},link:this.props.link,edit:e,isChartArt:this.props.image.isChartArt}),React.createElement(R.a.Content,null,React.createElement(O,{title:this.props.title,date:this.props.date,label:this.props.label,link:this.props.link,edit:e,enabled:this.props.options.enableHeader,size:this.props.options.headerSize,taxonomy:t}),"default"===this.props.image.slot&&React.createElement(C,{img:{src:this.props.image.src,slot:this.props.image.slot},link:this.props.link,edit:e,isChartArt:this.props.image.isChartArt}),"disabled"===this.props.image.slot&&!0===e.enabled&&React.createElement(x,{slot:this.props.image.slot,img:"",setAttributes:e.setAttributes,isChartArt:this.props.image.isChartArt}),React.createElement(k,{content:this.props.excerpt,enabled:this.props.options.enableExcerpt,edit:e,sansSerif:!this.props.options.enableHeader}),React.createElement(A,{content:this.props.extra,edit:e})),("bottom"===this.props.image.slot||"right"===this.props.image.slot)&&React.createElement(C,{img:{src:this.props.image.src,slot:this.props.image.slot},link:this.props.link,edit:e,isChartArt:this.props.image.isChartArt})))}}]),t}(b.Component),S=function(e){function t(e){var a;return Object(r.a)(this,t),a=Object(n.a)(this,Object(s.a)(t).call(this,e)),Object(o.a)(Object(l.a)(a),"componentDidMount",(function(){a.setState({url:a.props.link})})),Object(o.a)(Object(l.a)(a),"setPostByURL",(function(){console.log("GetPostByURL"),console.log(a.props);var e=a.props.setAttributes,t=a.state.url;void 0!==e&&void 0!==t&&window.wp.apiFetch({path:"/prc-api/v2/blocks/helpers/get-post-by-url/?url="+t}).then((function(t){!1!==t&&e({title:t.title,image:t.image,excerpt:t.excerpt,link:t.link,label:t.label,date:t.date,postID:t.id,extra:""})}))})),Object(o.a)(Object(l.a)(a),"render",(function(){var e=a.props.setAttributes;return React.createElement(m.InspectorControls,null,React.createElement(u.PanelBody,{title:Object(c.__)("Story Item Options")},React.createElement("div",null,React.createElement(u.TextControl,{label:"Post ID",value:a.props.postID,disabled:!0})),React.createElement("div",{className:"story-item-link"},React.createElement("div",null,React.createElement(u.TextControl,{label:"Link",value:a.state.url,onChange:function(e){return a.setState({url:e})}})),React.createElement("div",null,React.createElement(u.Button,{onClick:a.setPostByURL,isPrimary:!0},"Fetch"))),React.createElement("p",null,React.createElement("strong",null,"Content Options:")),React.createElement("div",null,React.createElement(u.ToggleControl,{label:(a.props.options.enableHeader,"Header Enabled"),checked:a.props.options.enableHeader,onChange:function(t){e({enableHeader:t})}})),React.createElement("div",null,React.createElement(u.ToggleControl,{label:(a.props.options.enableExcerpt,"Excerpt Enabled"),checked:a.props.options.enableExcerpt,onChange:function(t){e({enableExcerpt:t})}})),React.createElement("div",null,React.createElement(u.ToggleControl,{label:a.props.options.emphasis?"Emphasis Enabled":"Emphasis Disabled",checked:a.props.options.emphasis,onChange:function(t){e({emphasis:t})}})),React.createElement("div",null,React.createElement(u.ToggleControl,{label:a.props.options.taxonomy?"Programs":"Formats",checked:a.props.options.taxonomy,onChange:function(t){e({enableProgramsTaxonomy:t})}}))))})),a.state={url:""},a.setPostByURL=a.setPostByURL.bind(Object(l.a)(a)),a}return Object(i.a)(t,e),t}(b.Component);Object(p.registerBlockType)("prc-block/story-item",{title:Object(c.__)("Story Item"),icon:"format-aside",category:"widgets",keywords:[Object(c.__)("prc"),Object(c.__)("story"),Object(c.__)("post"),Object(c.__)("story item")],styles:[{name:"disabled",label:"Image Disabled"},{name:"default",label:"Default Image Alignment",isDefault:!0},{name:"top",label:"Image Aligned Top"},{name:"bottom",label:"Image Aligned Bottom"},{name:"left",label:"Image Aligned Left"},{name:"right",label:"Image Aligned Right"}],supports:{html:!1},attributes:{title:{type:"string",default:"Title"},image:{type:"string",default:""},excerpt:{type:"string",source:"html",multiline:"p",selector:".description",default:"<p>Excerpt</p>"},link:{type:"string",default:"https://www.pewresearch.org/post"},label:{type:"string",default:"Report"},date:{type:"string",default:d().format("MMM D, YYYY")},extra:{type:"string",source:"html",multiline:"li",selector:".extra",default:""},postID:{type:"integer"},emphasis:{type:"boolean",default:!1},isChartArt:{type:"boolean",default:!1},imageSlot:{type:"string",default:"disabled"},horizontal:{type:"boolean",default:!1},stacked:{type:"boolean",default:!0},enableHeader:{type:"boolean",default:!0},enableExcerpt:{type:"boolean",default:!0},enableProgramsTaxonomy:{type:"boolean",default:!1},headerSize:{type:"string",default:"normal"}},edit:function(e){"is-style-default"===e.attributes.className&&e.setAttributes({imageSlot:"default"}),"is-style-top"===e.attributes.className&&e.setAttributes({imageSlot:"top"}),"is-style-bottom"===e.attributes.className&&e.setAttributes({imageSlot:"bottom"}),"is-style-left"===e.attributes.className&&e.setAttributes({imageSlot:"left"}),"is-style-right"===e.attributes.className&&e.setAttributes({imageSlot:"right"}),"is-style-disabled"===e.attributes.className&&e.setAttributes({imageSlot:"disabled"});var t={postID:e.attributes.postID,title:e.attributes.title,link:e.attributes.link,date:e.attributes.date,label:e.attributes.label,excerpt:e.attributes.excerpt,extra:e.attributes.extra,image:{slot:e.attributes.imageSlot,src:e.attributes.image,isChartArt:e.attributes.isChartArt},options:{emphasis:e.attributes.emphasis,enableHeader:e.attributes.enableHeader,enableExcerpt:e.attributes.enableExcerpt,headerSize:e.attributes.headerSize,taxonomy:e.attributes.enableProgramsTaxonomy},classNames:e.attributes.className};return!0===e.isSelected&&(t.editMode=!0,t.setAttributes=e.setAttributes),React.createElement(b.Fragment,null,!0===e.isSelected&&React.createElement(S,t),React.createElement(j,t))},save:function(e){var t={postID:e.attributes.postID,title:e.attributes.title,link:e.attributes.link,date:e.attributes.date,label:e.attributes.label,excerpt:e.attributes.excerpt,extra:e.attributes.extra,image:{slot:e.attributes.imageSlot,src:e.attributes.image,isChartArt:e.attributes.isChartArt},options:{emphasis:e.attributes.emphasis,enableHeader:e.attributes.enableHeader,enableExcerpt:e.attributes.enableExcerpt,headerSize:e.attributes.headerSize},classNames:e.attributes.className};return React.createElement(j,t)}})},31:function(e,t){e.exports=wp.i18n},42:function(e,t){e.exports=ReactDOM},54:function(e,t){e.exports=moment},8:function(e,t){e.exports=wp.element}},[[127,1,2]]]);
//# sourceMappingURL=main-3f3f696a.js.map