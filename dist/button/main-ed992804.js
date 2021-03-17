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
(window.wpackioprcBlocksLibrarybuttonJsonp=window.wpackioprcBlocksLibrarybuttonJsonp||[]).push([[0],{0:function(t,e){t.exports=React},103:function(t,e,n){n(104),t.exports=n(116)},115:function(t,e,n){},116:function(t,e,n){"use strict";n.r(e);var o=n(93),r=n(83),a=n(44),c=n(22),l=n(45),u=n(7),i=n(14),s=n.n(i),p=[{name:"primary",color:"#2185d0"},{name:"secondary",color:"#000"},{name:"mustard",color:"#d3aa20"}],m=(n(46),n(53),function(t,e){if(""===t||void 0===t||void 0===e||""===e)return null;var n=e.findIndex((function(e,n){if(t==e.color)return!0}));return e[n].name}),f=(n(84),n(92),n(129),n(69),n(88),n(115),n(74),n(91),function(t){var e=t.color,n=t.url,o=t.setAttributes;return React.createElement(c.InspectorControls,null,React.createElement(l.PanelBody,{title:Object(a.__)("Button Design Options")},React.createElement("div",null,React.createElement("p",null,React.createElement("strong",null,"Color:")),React.createElement(l.ColorPalette,{colors:p,value:e,onChange:function(t){o({color:t})},disableCustomColors:!0})),React.createElement("div",null,React.createElement(l.TextControl,{label:"URL",value:n,onChange:function(t){return o({url:t})}}))))}),b=function(t){var e=t.attributes,n=t.className,o=t.setAttributes,r=(t.isSelected,e.color),a=e.label,l=e.url,i=s()(n,m(r,p),"ui","button");return React.createElement(u.Fragment,null,React.createElement(f,{color:r,url:l,setAttributes:o}),React.createElement("div",{className:i},React.createElement(c.RichText,{tagName:"div",value:a,onChange:function(t){return o({label:t})},placeholder:"Button",formattingControls:[]})))},d=function(t){var e=t.attributes,n=t.className,o=e.color,r=e.label,a=e.url,l=s()(n,m(o,p),"ui","button");return React.createElement(c.RichText.Content,{tagName:"a",value:r,className:l,href:a})},R=["prc-block/button",{title:Object(a.__)("Button"),icon:"admin-appearance",category:"layout",keywords:[Object(a.__)("prc"),Object(a.__)("button")],supports:{html:!1},attributes:{color:{type:"string",default:""},label:{type:"string",default:""},url:{type:"string",default:""}},edit:b,save:d}];r.registerBlockType.apply(void 0,Object(o.a)(R))},22:function(t,e){t.exports=wp.blockEditor},44:function(t,e){t.exports=wp.i18n},45:function(t,e){t.exports=wp.components},46:function(t,e){t.exports=moment},51:function(t,e){t.exports=ReactDOM},53:function(t,e){t.exports=wp.apiFetch},7:function(t,e){t.exports=wp.element},83:function(t,e){t.exports=wp.blocks},88:function(t,e){t.exports=wp.url},91:function(t,e){t.exports=wp.data}},[[103,1,2]]]);
//# sourceMappingURL=main-ed992804.js.map