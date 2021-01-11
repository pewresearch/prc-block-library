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
(window.wpackioprcBlocksLibrarytabsJsonp=window.wpackioprcBlocksLibrarytabsJsonp||[]).push([[2],{0:function(t,e){t.exports=React},11:function(t,e){t.exports=wp.components},14:function(t,e){t.exports=wp.data},24:function(t,e){t.exports=wp.element},36:function(t,e,n){n(15),t.exports=n(44)},37:function(t,e,n){},4:function(t,e){t.exports=wp.blockEditor},44:function(t,e,n){"use strict";n.r(e);n(37);var a=n(6),c=n(7),r=n(5),o=n(53),s=n(4),i=[["core/paragraph",{placeholder:"Enter content..."}]];var l=["prc-block/pane",{title:Object(r.__)("Pane"),parent:["prc-block/tabs"],description:Object(r.__)("A single pane within the tabs layout."),icon:"universal-access-alt",category:"widgets",supports:{inserter:!1,reusable:!1,html:!1,lightBlockWrapper:!1},attributes:{key:{type:"string",source:"attribute",selector:".segment",attribute:"data-tab"}},edit:function(t){return React.createElement(o.a.Pane,null,React.createElement(s.InnerBlocks,{template:i}))},save:function(t){var e=t.attributes.key;return React.createElement("div",{className:"ui bottom attached tab segment ".concat(0===e?"active":""),"data-tab":"".concat(Number(e))},React.createElement(s.InnerBlocks.Content,null))}}];c.registerBlockType.apply(void 0,Object(a.a)(l));var u=n(14),p=n(11),b=n(21),d=n(22),m=n(8),f=n(25),v=n(23),y=n(17);function h(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,a=Object(y.a)(t);if(e){var c=Object(y.a)(this).constructor;n=Reflect.construct(a,arguments,c)}else n=a.apply(this,arguments);return Object(v.a)(this,n)}}var k=function(t){Object(f.a)(n,t);var e=h(n);function n(t){var a;return Object(b.a)(this,n),(a=e.call(this,t)).handleChange=a.handleChange.bind(Object(m.a)(a)),a}return Object(d.a)(n,[{key:"handleChange",value:function(t,e){var n=void 0!==this.props.clientId?this.props.clientId:t.target.closest(".wp-block").dataset.block,a=document.querySelectorAll('[data-block="'.concat(n,'"] [data-type="prc-block/pane"]'));if(a.length>0){for(var c=0;c<a.length;c++)a[c].style.display="none";a[e.activeIndex].style.display="block"}}},{key:"render",value:function(){var t=this.props,e=t.panes,n=t.menu;return React.createElement(o.a,{panes:e,menu:n,renderActiveOnly:!1,onTabChange:this.handleChange})}}]),n}(n(24).Component);function g(t){return void 0!==t&&~t.indexOf("is-style-secondary")}var R=wp.element.useEffect;var O=["prc-block/tabs",{title:Object(r.__)("Tabs"),description:Object(r.__)("Create content organized in tabs."),icon:"universal-access-alt",category:"widgets",supports:{align:["wide","full"],html:!0,className:!0},styles:[{name:"default",label:"Default",isDefault:!0},{name:"secondary",label:"Secondary"}],attributes:{titles:{type:"array",source:"query",selector:".ui.menu > .item",query:{content:{type:"string",source:"text"}}}},example:{},edit:function(t){var e=t.attributes.className,n=t.setAttributes,o=g(e),i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t.attributes.panes.length,n=Object(c.createBlock)("prc-block/pane",{key:e});return Object(u.dispatch)("core/editor").insertBlock(n,e,t.clientId),{menuItem:"Tab ".concat(e+1),pane:{key:"".concat(e)}}};return R((function(){if(void 0!==t.attributes.panes&&t.attributes.panes.length<t.attributes.titles.length){var e=t.attributes.panes;n({panes:e.concat([i()])})}}),[t.attributes.titles]),void 0===t.attributes.titles?n({titles:Object(a.a)(Array(2)).map((function(t,e){return{content:"Tab ".concat(e+1)}})),panes:Object(a.a)(Array(2)).map((function(t,e){return i(e)}))}):void 0===t.attributes.panes&&function(){for(var e=t.attributes.titles,a=Array(),c=0;c<e.length;c++)a.push({menuItem:e[c].content,pane:{key:"tab".concat(c+1)}});n({panes:a})}(),[React.createElement(s.InspectorControls,null,React.createElement(p.PanelBody,{title:Object(r.__)("Menu Items"),initialOpen:!0},void 0!==t.attributes.panes?t.attributes.panes.map((function(e,a){return React.createElement(p.TextControl,{label:Object(r.__)("Menu text"),value:e.menuItem,onChange:function(e){var c=t.attributes,r=c.panes,o=c.titles;r[a].menuItem=e,o[a].content=e,n({panes:r.concat([]),titles:o.concat([])})},index:a})})):"",React.createElement(p.Button,{isPrimary:!0,onClick:function(e){var a=t.attributes.titles;n({titles:a.concat([{content:"Tab ".concat(a.length+1)}])})}},"Add tab")," ",React.createElement(p.Button,{isPrimary:!0,onClick:function(e){var a=t.attributes,c=a.panes,r=a.titles,o=Object(u.select)("core/editor").getBlocksByClientId(t.clientId)[0].innerBlocks[c.length-1];Object(u.dispatch)("core/editor").removeBlock(o.clientId,!1),c.pop(),r.pop(),n({panes:c.concat([]),titles:r.concat([])})}},"Remove tab"))),React.createElement("div",{className:e},React.createElement("div",{className:"static"},React.createElement(k,{menu:{secondary:o,attached:!o,tabular:!o},panes:t.attributes.panes})),void 0!==t.insertBlocksAfter?React.createElement(s.InnerBlocks,{allowedBlocks:["prc-block/pane"]}):"")]},save:function(t){var e=t.attributes,n=e.className,a=e.titles,c=g(n);return React.createElement("div",{className:"".concat(void 0!==n?"".concat(n):""," prc-block-tabs")},React.createElement("div",{className:"ui menu ".concat(c?"secondary":"top attached tabular")},a.map((function(t,e){return React.createElement("a",{className:"item ".concat(0===e?"active":""),"data-tab":"".concat(e)},t.content)}))),React.createElement(s.InnerBlocks.Content,null))}}];c.registerBlockType.apply(void 0,Object(a.a)(O))},5:function(t,e){t.exports=wp.i18n},7:function(t,e){t.exports=wp.blocks}},[[36,0,3]]]);
//# sourceMappingURL=main-9573c90d.js.map