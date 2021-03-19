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
(window.wpackioprcBlocksLibrarypostsJsonp=window.wpackioprcBlocksLibrarypostsJsonp||[]).push([[4],{0:function(t,e){t.exports=React},120:function(t,e,a){a(95),t.exports=a(121)},121:function(t,e,a){"use strict";a.r(e);var r=a(29),o=a(14),s=a(35),n=a(30),i=a(20),l=a(36),c=a(18),p=a(59),u=a(60),m=a(16),b=a(5),f=a(17),d=a(41),g=a(66),y=a(65);function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var a,r=Object(i.a)(t);if(e){var o=Object(i.a)(this).constructor;a=Reflect.construct(r,arguments,o)}else a=r.apply(this,arguments);return Object(n.a)(this,a)}}var k=function(t){Object(s.a)(a,t);var e=v(a);function a(t){var s;return Object(r.a)(this,a),s=e.call(this,t),Object(l.a)(Object(o.a)(s),"componentDidMount",(function(){var t=s.setState,e=s.props.setAttributes;Object(f.c)("Formats").then((function(e){var a=[];for(var r in e)if(e.hasOwnProperty(r)){var o=e[r];a.push({value:o.id,label:o.name})}t({formatsRaw:e,formats:a})})),Object(f.c)("Programs").then((function(e){var a=[];for(var r in e[0]={id:0,name:"All",slug:"all"},e)if(e.hasOwnProperty(r)){var o=e[r];a.push({value:o.id,label:o.name})}t({programsRaw:e,programs:a})})),!1===s.props.attributes.posts&&(Object(f.b)(s.props.attributes.per_page,s.props.attributes.format,s.props.attributes.program,s.props.attributes.taxonomyToDisplay,!0).then((function(t){e({posts:t})})),!0===s.props.className.includes("is-style-fact-tank")&&(e({format:10818955}),Object(f.b)(s.props.attributes.per_page,s.props.attributes.format,10818955,s.props.attributes.taxonomyToDisplay,!0).then((function(t){e({posts:t})}))))})),Object(l.a)(Object(o.a)(s),"insertStoryBlock",(function(t,e,a){console.log("Insert Story Block");var r=window.wp.data.select("core/block-editor").getBlockHierarchyRootClientId(clientID),o=window.wp.data.select("core/block-editor").getBlockOrder(r),s=window.wp.data.select("core/block-editor").getBlock(o[1]);console.log(o[1]),console.log(s),console.log(r);var n=window.wp.blocks.createBlock("prc-block/story-item",{title:e.title,image:e.image,excerpt:e.excerpt,link:e.link,label:e.label,date:e.date,extra:"",postID:e.id,emphasis:!1,isChartArt:!1,imageSlot:"top",horizontal:!1,stacked:!0,enableHeader:!0,enableExcerpt:!1,enableExtra:!1,enableProgramsTaxonomy:!1,headerSize:"normal"});window.wp.data.dispatch("core/block-editor").insertBlocks(n,a,t)})),Object(l.a)(Object(o.a)(s),"render",(function(){var t=s.props.setAttributes;return React.createElement(u.InspectorControls,null,React.createElement(m.PanelBody,{title:Object(c.__)("Posts Block Options")},React.createElement(m.TextControl,{label:"Title",value:s.props.attributes.title,onChange:function(e){return t({title:e})}}),React.createElement(m.TextControl,{label:"Number of Posts",value:Number(s.props.attributes.per_page),onChange:function(e){t({per_page:Number(e)}),Object(f.b)(e,s.props.attributes.formatID,s.props.attributes.programID,s.props.attributes.taxonomyToDisplay,!0).then((function(e){t({posts:e})}))}}),React.createElement(m.SelectControl,{label:"Format",value:s.props.attributes.formatID,options:s.state.formats,onChange:function(e){var a=s.state.formatsRaw[Number(e)];t({formatID:a.id,formatSlug:a.slug,format:a.name}),Object(f.b)(s.props.attributes.per_page,a.id,s.props.attributes.programID,s.props.attributes.taxonomyToDisplay,!0).then((function(e){t({posts:e})}))}}),React.createElement(m.SelectControl,{label:"Research Program",value:s.props.attributes.programID,options:s.state.programs,onChange:function(e){var a=s.state.programsRaw[Number(e)];t({programID:a.id,programSlug:a.slug,program:a.name}),Object(f.b)(s.props.attributes.per_page,s.props.attributes.formatID,a.id,s.props.attributes.taxonomyToDisplay,!0).then((function(e){t({posts:e})}))}}),React.createElement(m.SelectControl,{label:"Label Taxonomy",value:s.props.attributes.taxonomyToDisplay,options:[{label:"Formats",value:"formats"},{label:"Programs",value:"programs"}],onChange:function(e){t({taxonomyToDisplay:e}),Object(f.b)(s.props.attributes.per_page,s.props.attributes.formatID,s.props.attributes.programID,e,!0).then((function(e){t({posts:e})}))}}),React.createElement(m.ToggleControl,{label:"Dynamic Mode",help:s.props.attributes.dynamic?"Updates posts in real time, every 5 minutes.":"Posts are saved statically (will not update in real time).",checked:s.props.attributes.dynamic,onChange:function(){return t({dynamic:!s.props.attributes.dynamic})}}),React.createElement("strong",null,"Background Color:"),React.createElement("br",null),React.createElement(m.ColorPalette,{colors:[{name:"White",color:"#fff"},{name:"Oatmeal",color:"#f8f9f5"}],value:s.props.attributes.backgroundColor,onChange:function(e){return t({backgroundColor:e})}})))})),s.state={formats:!1,formatsRaw:!1,programs:!1,programsRaw:!1},s.setState=s.setState.bind(Object(o.a)(s)),s}return a}(b.Component);Object(p.registerBlockType)("prc-block/posts",{title:Object(c.__)("Posts Block"),icon:"align-left",category:"widgets",keywords:[Object(c.__)("prc"),Object(c.__)("fact tank"),Object(c.__)("posts listing"),Object(c.__)("posts"),Object(c.__)("posts widget"),Object(c.__)("publication listing")],styles:[{name:"list",label:"Simple List",isDefault:!0},{name:"fact-tank",label:"Fact Tank"},{name:"columns",label:"Columns"}],supports:{html:!1},attributes:{title:{type:"string",default:"Title"},moreLink:{type:"string",default:""},formatID:{type:"integer",default:10818957},formatSlug:{type:"string",default:"report"},format:{type:"string",default:"Report"},programID:{type:"integer",default:0},programSlug:{type:"string",default:""},program:{type:"string",default:""},per_page:{type:"integer",default:5},backgroundColor:{tyle:"string",default:"#fff"},dynamic:{type:"boolean",default:!1},taxonomyToDisplay:{type:"string",default:"formats"},posts:{type:"array",default:!1}},edit:function(t){var e=t.attributes,a=t.attributes.className,r=!1;void 0!==a&&a.includes("is-style-fact-tank")&&(r=!0);var o=!1;(void 0===a||a.includes("is-style-list"))&&(o=!0);var s=!1;return void 0!==a&&a.includes("is-style-columns")&&(s=!0),e.className=a,!0===t.isSelected&&(e.setAttributes=t.setAttributes),e.clientID=t.clientId,e.disableLink=!0,React.createElement(b.Fragment,null,!0===t.isSelected&&React.createElement(k,t),React.createElement("div",{className:e.className},!0===r&&React.createElement(g.a,e),!0===o&&React.createElement(d.a,e),!0===s&&React.createElement(y.a,e)))},save:function(t){var e=t.attributes,a=t.attributes.className,r=!1;void 0!==a&&a.includes("is-style-fact-tank")&&(r=!0);var o=!1;void 0!==a&&a.includes("is-style-list")&&(o=!0);var s=!1;return void 0!==a&&a.includes("is-style-columns")&&(s=!0),e.className=a,e.disableLink=!1,React.createElement("div",{className:e.className},!0!==t.attributes.dynamic&&!0===r&&React.createElement(g.a,e),!0!==t.attributes.dynamic&&!0===o&&React.createElement(d.a,e),!0!==t.attributes.dynamic&&!0===s&&React.createElement(y.a,e),!0===t.attributes.dynamic&&React.createElement("div",{className:"js-react-posts-block","data-title":t.attributes.title,"data-format":t.attributes.format,"data-format-id":t.attributes.formatID,"data-format-slug":t.attributes.formatSlug,"data-program":t.attributes.program,"data-program-id":t.attributes.programID,"data-program-slug":t.attributes.programSlug,"data-number":t.attributes.per_page,"data-background":t.attributes.backgroundColor,"data-style":a}))}})},16:function(t,e){t.exports=wp.components},18:function(t,e){t.exports=wp.i18n},39:function(t,e){t.exports=moment},45:function(t,e){t.exports=wp.data},5:function(t,e){t.exports=wp.element},53:function(t,e){t.exports=ReactDOM},59:function(t,e){t.exports=wp.blocks},60:function(t,e){t.exports=wp.blockEditor},61:function(t,e){t.exports=wp.apiFetch},62:function(t,e){t.exports=wp.url}},[[120,1,2,0]]]);
//# sourceMappingURL=main-fa851f3f.js.map