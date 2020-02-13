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
(window["wpackioprcBlocksLibrarystory-itemJsonp"]=window["wpackioprcBlocksLibrarystory-itemJsonp"]||[]).push([[0],{0:function(e,t){e.exports=React},105:function(e,t){e.exports=wp.blocks},106:function(e,t){e.exports=wp.apiFetch},107:function(e,t){e.exports=wp.url},12:function(e,t){e.exports=wp.components},127:function(e,t,a){a(128),e.exports=a(247)},129:function(e,t,a){},19:function(e,t){e.exports=wp.blockEditor},247:function(e,t,a){"use strict";a.r(t);var n=a(21),l=a(22),r=a(23),i=a(9),s=a(24),o=a(18),c=(a(129),a(31)),m=a(105),u=a(19),p=a(12),b=a(8),d=a(106),g=a.n(d),h=a(54),f=a(29),E=a(107),R=a(36),y=a.n(R),v=function(e,t){console.log("getting terms for "+e);var a=new wp.api.collections[e];return void 0!==a&&new Promise((function(e,n){var l=[];a.fetch({data:{hide_empty:!1,per_page:25}}).then((function(a){for(var n=0;n<a.length;n++){var r={label:a[n].name};r.value=!0===t?a[n].id:a[n].name,l.push(r)}e(l)}))}))},x=a(253),k=["image"],C=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(l.a)(this,Object(r.a)(t).call(this,e))).state={open:!1,editLabel:!1,taxonomy:"Formats",labelOptions:[]},a.setState=a.setState.bind(Object(i.a)(a)),a.getLabelOptions=a.getLabelOptions.bind(Object(i.a)(a)),a}return Object(s.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){this.getLabelOptions()}},{key:"componentDidUpdate",value:function(){this.state.taxonomy!==this.props.taxonomy&&this.getLabelOptions()}},{key:"getLabelOptions",value:function(){var e=this;if(void 0!==wp.api.collections[this.props.taxonomy]){var t=this.setState;v(this.props.taxonomy,!1).then((function(a){var n=a;t({taxonomy:e.props.taxonomy,labelOptions:n})}))}}},{key:"render",value:function(){var e=this;return React.createElement(b.Fragment,null,React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(p.SelectControl,{value:this.props.label,options:this.state.labelOptions,onChange:function(t){e.props.setAttributes({label:t})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(p.TextControl,{value:this.props.date,onChange:function(t){e.props.setAttributes({date:t})}}))))}}]),t}(b.Component),A=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(l.a)(this,Object(r.a)(t).call(this,e))).mediaHandler=a.mediaHandler.bind(Object(i.a)(a)),a}return Object(s.a)(t,e),Object(f.a)(t,[{key:"mediaHandler",value:function(e){console.log(e),"disabled"===this.props.slot?this.props.setAttributes({image:e.url,imageID:e.id,imageSlot:"default"}):this.props.setAttributes({image:e.url,imageID:e.id})}},{key:"render",value:function(){var e=this;return React.createElement(u.MediaUploadCheck,null,React.createElement(u.MediaUpload,{onSelect:this.mediaHandler,allowedTypes:k,render:function(t){var a=t.open;return React.createElement(b.Fragment,null,""!==e.props.img&&React.createElement(b.Fragment,null,"default"!==e.props.slot&&"disabled"!==e.props.slot&&React.createElement(u.BlockControls,null,React.createElement(p.Toolbar,{controls:[{icon:"art",title:"Chart Art",isActive:e.props.isChartArt,onClick:function(){e.props.setAttributes({isChartArt:!e.props.isChartArt})}}]})),React.createElement("div",{className:e.props.imgClass},React.createElement("img",{className:"wp-image-"+e.props.id,src:e.props.img,onClick:a}),React.createElement("div",{class:"sans-serif"},React.createElement("i",null,"Click image to open media library")),React.createElement("div",{class:"sans-serif remove-image",onClick:function(){e.props.setAttributes({image:"",imageSlot:"disabled"})}},"Or click here to ",React.createElement("strong",null,"REMOVE IMAGE")))),""===e.props.img&&React.createElement("p",null,React.createElement(p.Button,{isPrimary:!0,onClick:a},"Insert Image")))}}))}}]),t}(b.Component),w=function(e){var t=e.isChartArt,a=e.img,n=e.setAttributes,l=e.link,r=!1;"left"!==a.slot&&"right"!==a.slot||(r=!0);var i=y()({ui:!0,medium:r,image:!0,bordered:t});return React.createElement(b.Fragment,null,void 0!==a&&React.createElement(b.Fragment,null,!1!==n&&React.createElement(b.Fragment,null,React.createElement(A,{id:a.id,slot:a.slot,img:a.src,imgClass:i,isChartArt:t,setAttributes:n})),!1===n&&React.createElement("div",{className:i},React.createElement("a",{href:l},React.createElement("img",{className:"wp-image-"+a.id,src:function(e,t){if(""===e||!1===e)return e;var a="564";return"left"!==t&&"right"!==t||(a="345"),Object(E.addQueryArgs)(e,{w:a})}(a.src,a.slot)})))))},O=function(e){var t=e.content,a=e.enabled,n=e.setAttributes,l=e.sansSerif,r=y()("description",{"sans-serif":l});return React.createElement(b.Fragment,null,!0===a&&React.createElement(b.Fragment,null,!1!==n&&React.createElement(u.RichText,{tagName:"div",value:t,onChange:function(e){return n({excerpt:e})},placeholder:t,multiline:"p",className:r}),!1===n&&React.createElement(u.RichText.Content,{tagName:"div",value:t,className:r})))},j=function(e){var t=e.enabled,a=e.content,n=e.setAttributes,l=y()("extra");return React.createElement(b.Fragment,null,!1!==n&&!0===t&&React.createElement(u.RichText,{tagName:"ul",value:a,onChange:function(e){return n({extra:e})},placeholder:a,multiline:"li",className:l}),!1===n&&!0===t&&React.createElement(u.RichText.Content,{tagName:"ul",value:a,className:l}))},S=function(e){var t=e.label,a=e.date,n=t.replace(/\s+/g,"-").toLowerCase(),l=y()(n,"label");return React.createElement(b.Fragment,null,React.createElement("span",{className:l},t||"Report")," | ",h(a).format("MMM D, YYYY"))},D=function(e){var t=e.title,a=e.link,n=(e.size,e.as),l=void 0===n?"a":n;return React.createElement(u.RichText.Content,{href:a,tagName:l,value:t})},N=function(e){var t=e.title,a=e.label,n=e.date,l=e.link,r=e.enabled,i=e.size,s=e.taxonomy,o=e.setAttributes,c=i;return React.createElement(b.Fragment,null,!0===r&&React.createElement(b.Fragment,null,React.createElement(x.a.Meta,null,!1!==o&&React.createElement(C,{date:n,label:a,taxonomy:s,setAttributes:o}),!1===o&&React.createElement(S,{label:a,date:n})),React.createElement(x.a.Header,{className:i},!1!==o&&React.createElement(b.Fragment,null,React.createElement(u.BlockControls,null,React.createElement(p.Toolbar,{controls:["small","normal","large"].map((function(e){var t=!1;return e===c&&(t=!0),{icon:"editor-textcolor",title:"Size: ".concat(e),isActive:t,onClick:function(){o({headerSize:e})}}}))})),React.createElement(u.RichText,{tagName:"div",value:t,onChange:function(e){return o({title:e})},placeholder:"Title",multiline:"br"})),!1===o&&React.createElement(D,{title:t,link:l,as:"a",size:i}))))},T=function(e){function t(e){var a;return Object(n.a)(this,t),a=Object(l.a)(this,Object(r.a)(t).call(this,e)),Object(o.a)(Object(i.a)(a),"item",(function(e){return React.createElement(x.a,{as:"article",className:e.classes},("top"===e.imageSlot||"left"===e.imageSlot)&&React.createElement(w,{img:{src:e.image,id:e.imageID,slot:e.imageSlot},link:e.link,setAttributes:a.props.setAttributes,isChartArt:e.isChartArt}),React.createElement(x.a.Content,null,React.createElement(N,{title:e.title,date:e.date,label:e.label,link:e.link,setAttributes:a.props.setAttributes,enabled:e.enableHeader,size:e.headerSize,taxonomy:e.taxonomy}),"default"===e.imageSlot&&React.createElement(w,{img:{src:e.image,id:e.imageID,slot:e.imageSlot},link:e.link,setAttributes:a.props.setAttributes,isChartArt:e.isChartArt}),React.createElement(O,{content:e.excerpt,enabled:e.enableExcerpt,setAttributes:a.props.setAttributes,sansSerif:!e.enableHeader}),React.createElement(j,{enabled:e.enableExtra,content:e.extra,setAttributes:a.props.setAttributes})),("bottom"===e.imageSlot||"right"===e.imageSlot)&&React.createElement(w,{img:{src:e.image,id:e.imageID,slot:e.imageSlot},link:e.link,setAttributes:a.props.setAttributes,isChartArt:e.isChartArt}))})),a.item=a.item.bind(Object(i.a)(a)),a}return Object(s.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){console.log(this.props)}},{key:"render",value:function(){void 0!==this.props.isSelected&&!0===this.props.isSelected||(this.props.setAttributes=!1),this.props.attributes.taxonomy="Formats",!0===this.props.attributes.enableProgramsTaxonomy&&(this.props.attributes.taxonomy="Programs");var e=!0;"left"!==this.props.attributes.imageSlot&&"right"!==this.props.attributes.imageSlot||(e=!1);var t=!1;return!0===this.props.attributes.emphasis&&(t=!0),this.props.attributes.classes=y()(this.props.attributes.className,"story-item",{stacked:e,bordered:t}),React.createElement(b.Fragment,null,React.createElement(this.item,this.props.attributes))}}]),t}(b.Component),I=function(e){function t(e){var a;return Object(n.a)(this,t),a=Object(l.a)(this,Object(r.a)(t).call(this,e)),Object(o.a)(Object(i.a)(a),"componentDidMount",(function(){a.setState({url:a.props.attributes.link})})),Object(o.a)(Object(i.a)(a),"setPostByURL",(function(){var e=a.props.setAttributes,t=a.props.attributes.link;void 0!==e&&void 0!==t&&g()({path:"/prc-api/v2/blocks/helpers/get-post-by-url/?url="+t+"&siteID="+function(e){console.log(e);var t=1;return e.includes(window.siteDomain+"/global/")?t=2:e.includes(window.siteDomain+"/hispanic/")?t=5:e.includes(window.siteDomain+"/science/")?t=16:e.includes(window.siteDomain+"/methods/")?t=10:e.includes(window.siteDomain+"/internet/")?t=9:e.includes("https://www.people-press.org/")?t=4:e.includes("https://www.pewforum.org/")?t=7:e.includes("https://www.journalism.org/")?t=8:e.includes("https://www.pewsocialtrends.org/")?t=3:(e.includes("https://www.pewresearch.org/")||e.includes(window.siteDomain))&&(t=1),t}(t)}).then((function(t){console.info("Post Returned:"),console.log(t),!1!==t&&e({title:t.title,image:t.image,excerpt:t.excerpt,link:t.link,label:t.label,date:t.date,postID:t.id,extra:""})}))})),Object(o.a)(Object(i.a)(a),"render",(function(){var e=a.props.setAttributes;return React.createElement(u.InspectorControls,null,React.createElement(p.PanelBody,{title:Object(c.__)("Story Item Options")},React.createElement("div",null,React.createElement(p.TextControl,{label:"Post ID",value:a.props.attributes.postID,disabled:!0})),React.createElement("div",{className:"story-item-link"},React.createElement("div",null,React.createElement(p.TextControl,{label:"Link",value:a.props.attributes.link,onChange:function(t){return e({link:t})}})),React.createElement("div",null,React.createElement(p.Button,{onClick:a.setPostByURL,isPrimary:!0},"Fetch"))),React.createElement("p",null,React.createElement("strong",null,"Content Options:")),React.createElement("div",null,React.createElement(p.ToggleControl,{label:a.props.attributes.enableHeader?"Header Enabled":"Header Disabled",checked:a.props.attributes.enableHeader,onChange:function(t){e({enableHeader:t})}})),React.createElement("div",null,React.createElement(p.ToggleControl,{label:a.props.attributes.enableExcerpt?"Excerpt Enabled":"Excerpt Disabled",checked:a.props.attributes.enableExcerpt,onChange:function(t){e({enableExcerpt:t})}})),React.createElement("div",null,React.createElement(p.ToggleControl,{label:a.props.attributes.enableExtra?"Extras Enabled":"Extras Disabled",checked:a.props.attributes.enableExtra,onChange:function(t){e({enableExtra:t})}})),React.createElement("div",null,React.createElement(p.ToggleControl,{label:a.props.attributes.emphasis?"Emphasis Enabled":"Emphasis Disabled",checked:a.props.attributes.emphasis,onChange:function(t){e({emphasis:t})}})),React.createElement("div",null,React.createElement(p.ToggleControl,{label:a.props.attributes.enableProgramsTaxonomy?"Programs":"Formats",checked:a.props.attributes.enableProgramsTaxonomy,onChange:function(t){e({enableProgramsTaxonomy:t})}}))))})),a.state={url:""},a.setPostByURL=a.setPostByURL.bind(Object(i.a)(a)),a}return Object(s.a)(t,e),t}(b.Component);Object(m.registerBlockType)("prc-block/story-item",{title:Object(c.__)("Story Item"),icon:"format-aside",category:"widgets",keywords:[Object(c.__)("prc"),Object(c.__)("story"),Object(c.__)("post"),Object(c.__)("story item")],styles:[{name:"disabled",label:"Image Disabled"},{name:"default",label:"Default Image Alignment",isDefault:!0},{name:"top",label:"Image Aligned Top"},{name:"bottom",label:"Image Aligned Bottom"},{name:"left",label:"Image Aligned Left"},{name:"right",label:"Image Aligned Right"}],supports:{html:!1},attributes:{title:{type:"string",default:"Title"},excerpt:{type:"string",source:"html",multiline:"p",selector:".description",default:"<p>Excerpt</p>"},extra:{type:"string",source:"html",multiline:"li",selector:".extra",default:""},link:{type:"string",default:""},label:{type:"string",default:"Report"},date:{type:"string",default:h().format("MMM D, YYYY")},image:{type:"string",default:""},imageID:{type:"string",default:""},imageSlot:{type:"string",default:"disabled"},isChartArt:{type:"boolean",default:!1},postID:{type:"integer"},emphasis:{type:"boolean",default:!1},horizontal:{type:"boolean",default:!1},stacked:{type:"boolean",default:!0},enableHeader:{type:"boolean",default:!0},enableExcerpt:{type:"boolean",default:!0},enableExtra:{type:"boolean",default:!1},enableProgramsTaxonomy:{type:"boolean",default:!1},headerSize:{type:"string",default:"normal"}},edit:function(e){return"is-style-default"===e.attributes.className?e.setAttributes({imageSlot:"default"}):"is-style-top"===e.attributes.className?e.setAttributes({imageSlot:"top"}):"is-style-bottom"===e.attributes.className?e.setAttributes({imageSlot:"bottom"}):"is-style-left"===e.attributes.className?e.setAttributes({imageSlot:"left"}):"is-style-right"===e.attributes.className?e.setAttributes({imageSlot:"right"}):"is-style-disabled"===e.attributes.className&&e.setAttributes({imageSlot:"disabled"}),React.createElement(b.Fragment,null,!0===e.isSelected&&React.createElement(I,e),React.createElement(T,e))},save:function(e){return React.createElement(T,e)}})},31:function(e,t){e.exports=wp.i18n},42:function(e,t){e.exports=ReactDOM},54:function(e,t){e.exports=moment},8:function(e,t){e.exports=wp.element}},[[127,1,2]]]);
//# sourceMappingURL=main-e92324d4.js.map