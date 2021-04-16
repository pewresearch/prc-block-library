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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[6],{0:function(e,t){e.exports=wp.element},1:function(e,t){e.exports=wp.i18n},14:function(e,t,o){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},2:function(e,t){e.exports=wp.components},205:function(e,t,o){o(14),e.exports=o(206)},206:function(e,t,o){"use strict";o.r(t);var r=o(1),n=o(52),a=o(0),l=o(3),c=o(2),i=o(78),s=function(e){e.border,e.setAttributes;return React.createElement("div",null,React.createElement(c.ButtonGroup,null,React.createElement(c.Button,{isPressed:!0},"L"),React.createElement(c.Button,{isPressed:!1},"R"),React.createElement(c.Button,{isPressed:!1},"Top"),React.createElement(c.Button,{isPressed:!1},"Bottom")),React.createElement(c.ColorPalette,{colors:[{name:"black",color:"#000"},{name:"white",color:"#fff"},{name:"gray",color:"#d7d7d2"}],value:null,onChange:function(e){return console.log("borderColor",e)}}))},u=function(e){console.log("<GroupBlockEdit/>",e);var t=e.attributes,o=e.setAttributes,r=e.isSelected,n=t.maxWidth,i=t.align;return r?React.createElement(l.InspectorControls,null,React.createElement(c.PanelBody,{title:"Border settings"},React.createElement(c.PanelRow,null,React.createElement(s,{border:null,setAttributes:o}))),("left"===i||"right"===i)&&React.createElement(c.PanelBody,{title:"Dimension settings"},React.createElement(c.PanelRow,null,React.createElement(c.SelectControl,{label:"Width",value:n,options:[{label:"100%",value:100},{label:"200 px",value:200},{label:"310 px",value:310},{label:"420 px",value:420},{label:"640 px",value:640}],onChange:function(e){o({maxWidth:e})}})))):React.createElement(a.Fragment,null)},p=Object(n.createHigherOrderComponent)((function(e){return function(t){return"core/group"!==t.name?React.createElement(e,t):React.createElement(a.Fragment,null,React.createElement(e,t),React.createElement(u,t))}}),"withInspectorControl");Object(i.addFilter)("blocks.registerBlockType","prc-block/group",(function(e){return"core/group"!==e.name||(console.log("addAttributes!",e),void 0!==e.attributes&&(e.attributes=Object.assign(e.attributes,{maxWidth:{type:"integer",default:100}})),void 0!==e.supports.align&&(e.supports.align=["left","right","wide","full"]),e.variations=[{name:"callout",title:Object(r.__)("Callout"),description:Object(r.__)('A Group block in the "Callout" style with a oatmeal background and pre-set innerblocks'),attributes:{className:"is-style-callout"},innerBlocks:[["core/heading"],["core/paragraph"]]},{name:"card",title:Object(r.__)("Card"),description:Object(r.__)('A Group block in the "Card" style with a white background, heading with a border, image, and text.'),attributes:{className:"is-style-card"},innerBlocks:[["core/heading"],["core/image"],["prc-block/story-item"]]}]),e})),Object(i.addFilter)("editor.BlockEdit","prc-block/group",p,21)},3:function(e,t){e.exports=wp.blockEditor},52:function(e,t){e.exports=wp.compose},78:function(e,t){e.exports=wp.hooks}},[[205,0]]]);
//# sourceMappingURL=group-745ad619.js.map