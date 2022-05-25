/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.14
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2022 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[36],{1:function(e,t){e.exports=window.React},1033:function(e,t,a){"use strict";a.r(t);var n=a(14),r=a(2),o=a(9),l=a(402),i=a(5),c=a(3),s=a(4),u=a(76);function b(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function d(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?b(Object(a),!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):b(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var p=function(e){var t=e.axisLabel,a=e.axisPadding,n=e.barColor,r=e.currentValue,o=e.labelFormat,l=e.labelPositionDX,i=e.labelPositionDY,c=e.maxWidth,s=e.maxValue,b=e.showAxisLabel,p={layout:{name:"progress-chart",type:"stacked-bar",orientation:"vertical",theme:"PewTheme",width:c,height:30,padding:{top:0,bottom:10,left:b?a:0,right:0},horizontalRules:!1},metadata:d(d({},u.masterConfig.metadata),{},{active:!1}),colors:[n,"#ecece3"],xAxis:{active:b,scale:"linear",dateFormat:"yyyy",domain:null,domainPadding:50,offsetY:null,padding:50,tickCount:5,tickValues:null,tickFormat:null,multiLineTickLabels:!1,multiLineTickLabelsBreak:1,abbreviateTicks:!1,abbreviateTicksDecimals:0,tickUnit:"",tickUnitPosition:"end",customTickFormat:null,tickLabels:{fontSize:12,padding:0,angle:0,dx:0,dy:0,textAnchor:"end",verticalAnchor:"middle"},axisLabel:{fontSize:12,padding:30,fill:"rgba(35, 31, 32,0.7)"},axis:{stroke:"#756f6b00"},ticks:{stroke:"gray",size:5,strokeWidth:0},grid:{stroke:""}},yAxis:{active:!1,scale:"linear",padding:20,domain:[0,s],domainPadding:20,offsetX:null,showZero:!1,tickCount:5,tickValues:null,tickFormat:null,multiLineTickLabels:!1,multiLineTickLabelsBreak:1,abbreviateTicks:!1,abbreviateTicksDecimals:0,tickUnit:"",tickUnitPosition:"end",customTickFormat:null,tickLabels:{fontSize:12,padding:15,angle:0,dx:0,dy:0,textAnchor:"middle",verticalAnchor:"start"},axisLabel:{fontSize:12,padding:30,fill:"rgba(35, 31, 32,0.7)"},ticks:{stroke:"gray",size:5,strokeWidth:0},axis:{stroke:"#756f6a"},grid:{stroke:""},dateFormat:"yyyy"},dataRender:{x:"x",y:"y",x2:null,y2:null,sortKey:"x",sortOrder:"none",categories:["y","z"],xScale:"linear",yScale:"linear",xFormat:"yyyy",yFormat:"yyyy"},animate:{active:!1,duration:500},tooltip:{active:!1},legend:{active:!1},bar:{orientation:"horizontal",width:30,barToSpaceRatio:.8,groupOffset:20},labels:{active:!0,showFirstLastPointsOnly:!1,color:"black",fontWeight:200,fontSize:12,labelBarPosition:"inside",labelCutoff:0,labelCutoffMobile:0,labelPositionDX:l,labelPositionDY:i,pieLabelRadius:60,abbreviateValue:!1,toFixedDecimal:0,labelUnit:"",labelUnitPosition:"end",labelFormat:null,customLabelFormat:null}},m=[[{x:t,y:r,yLabel:"fractional"===o?"".concat(r,"/").concat(s):"".concat((r/s*100).toFixed(0),"%")}],[{x:t,y:s-r,yLabel:" "}]];return React.createElement(u.ChartBuilderWrapper,{config:p,data:m})},m=[{name:"blue",color:"#436983"},{name:"red",color:"#bf3927"},{name:"purple",color:"#756a7e"},{name:"orange",color:"#ea9e2c"},{name:"brown",color:"#bc7b2b"}];function f(e){var t=e.maxWidth,a=e.barColor,n=e.maxValue,o=e.currentValue,l=e.showAxisLabel,s=e.axisLabel,u=e.axisPadding,b=e.labelFormat,d=e.setAttributes,p=e.labelPositionDY,f=e.labelPositionDX;return React.createElement(i.InspectorControls,null,React.createElement(c.PanelBody,{title:Object(r.__)("Progress Bar Options")},React.createElement(c.PanelRow,null,"Layout"),React.createElement(c.RangeControl,{label:Object(r.__)("Width"),withInputField:!0,min:0,max:640,value:parseInt(t,10),onChange:function(e){return d({maxWidth:parseInt(e,10)})}}),React.createElement(c.PanelRow,null,"Data and Formatting"),React.createElement(c.ToggleControl,{label:Object(r.__)("Show Category"),checked:l,onChange:function(){return d({showAxisLabel:!l})}}),React.createElement(c.TextControl,{label:Object(r.__)("Category"),value:s,disabled:!l,onChange:function(e){return d({axisLabel:e})}}),React.createElement(c.__experimentalNumberControl,{label:Object(r.__)("Category Padding"),value:u,disabled:!l,disableUnits:!0,disabledUnits:!0,onChange:function(e){return d({axisPadding:parseInt(e,10)})}}),React.createElement(c.Flex,null,React.createElement(c.FlexItem,null,React.createElement(c.__experimentalNumberControl,{label:Object(r.__)("Current value"),value:o,disableUnits:!0,disabledUnits:!0,onChange:function(e){return d({currentValue:parseFloat(e)})}})),React.createElement(c.__experimentalNumberControl,{label:Object(r.__)("Maximum value"),value:n,disableUnits:!0,disabledUnits:!0,onChange:function(e){return d({maxValue:parseFloat(e)})}}),React.createElement(c.FlexItem,null)),React.createElement(c.PanelRow,null,"Labels"),React.createElement(c.SelectControl,{label:Object(r.__)("Label format"),value:b,options:[{value:"fractional",label:"Fractional"},{value:"percentage",label:"Percentage"}],onChange:function(e){d({labelFormat:e})}}),React.createElement(c.Flex,null,React.createElement(c.FlexItem,null,React.createElement(c.__experimentalNumberControl,{label:Object(r.__)("Label Position DX"),value:f,onChange:function(e){return d({labelPositionDX:parseInt(e,10)})}})),React.createElement(c.FlexItem,null,React.createElement(c.__experimentalNumberControl,{label:Object(r.__)("Label Position DY"),value:p,onChange:function(e){return d({labelPositionDY:parseInt(e,10)})}}))),React.createElement(c.PanelRow,null,"Bar Color"),React.createElement(c.PanelRow,null,React.createElement(c.ColorPalette,{colors:m,value:a,onChange:function(e){d({barColor:e})}}))))}var y=function(e){var t=e.attributes,a=e.setAttributes,n=Object(i.useBlockProps)();return React.createElement("div",n,React.createElement(f,Object.assign({},t,{setAttributes:a})),React.createElement(p,t))},g=function(){return React.createElement(s.Fragment,null)};function x(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function w(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?x(Object(a),!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):x(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var O=l.name,h={title:Object(r.__)("Progress Bar"),icon:"chart-bar",keywords:[Object(r.__)("progress"),Object(r.__)("bar"),Object(r.__)("quiz"),Object(r.__)("result"),Object(r.__)("chart"),Object(r.__)("horizontal")],edit:y,save:g};Object(o.registerBlockType)(O,w(w({},l),h))},14:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"a",(function(){return n}))},15:function(e,t){function a(t){return e.exports=a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,a(t)}e.exports=a,e.exports.__esModule=!0,e.exports.default=e.exports},2:function(e,t){e.exports=window.wp.i18n},23:function(e,t,a){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");a.p=window["__wpackIo".concat(n)]},3:function(e,t){e.exports=window.wp.components},4:function(e,t){e.exports=window.wp.element},402:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/progress-bar","category":"layout","attributes":{"maxWidth":{"type":"number","default":"640"},"barColor":{"type":"string","default":"#436983"},"backgroundColor":{"type":"string","default":"#F1F1F1"},"maxValue":{"type":"number","default":100},"currentValue":{"type":"number","default":50},"showAxisLabel":{"type":"boolean","default":true},"axisLabel":{"type":"string","default":"Total"},"axisPadding":{"type":"number","default":60},"labelFormat":{"type":"string","default":"fractional"},"labelPositionDX":{"type":"integer","default":-45},"labelPositionDY":{"type":"integer","default":-2}},"supports":{"html":false},"usesContext":["prc-block/hasDarkBackground"]}')},5:function(e,t){e.exports=window.wp.blockEditor},58:function(e,t){e.exports=regeneratorRuntime},59:function(e,t){e.exports=window.lodash},9:function(e,t){e.exports=window.wp.blocks},954:function(e,t,a){a(23),e.exports=a(1033)},99:function(e,t,a){var n,r=a(15);n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"===("undefined"==typeof window?"undefined":r(window))&&(n=window)}e.exports=n}},[[954,0,4]]]);
//# sourceMappingURL=progress-bar-29aecaee.js.map