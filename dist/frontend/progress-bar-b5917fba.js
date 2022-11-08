/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.17
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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[13],{1:function(e,t){e.exports=window.React},179:function(e,t){e.exports=regeneratorRuntime},21:function(e,t){e.exports=window.wp.domReady},268:function(e,t){e.exports=window.lodash},29:function(e,t){e.exports=window.wp.i18n},6:function(e,t){e.exports=window.wp.element},812:function(e,t,a){a(31),e.exports=a(849)},849:function(e,t,a){"use strict";a.r(t);var i=a(6),o=a(21),r=a.n(o),n=a(94),l=a(51);function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var d=function(e){var t=e.axisLabel,a=e.axisPadding,i=e.barColor,o=e.currentValue,r=e.labelFormat,n=e.labelPositionDX,c=e.labelPositionDY,d=e.maxWidth,b=e.maxValue,u=e.showAxisLabel,p={layout:{name:"progress-chart",type:"stacked-bar",orientation:"vertical",theme:"PewTheme",width:d,height:30,padding:{top:0,bottom:10,left:u?a:0,right:0},horizontalRules:!1},metadata:s(s({},l.masterConfig.metadata),{},{active:!1}),colors:[i,"#ecece3"],xAxis:{active:u,scale:"linear",dateFormat:"yyyy",domain:null,domainPadding:50,offsetY:null,padding:50,tickCount:5,tickValues:null,tickFormat:null,multiLineTickLabels:!1,multiLineTickLabelsBreak:1,abbreviateTicks:!1,abbreviateTicksDecimals:0,tickUnit:"",tickUnitPosition:"end",customTickFormat:null,tickLabels:{fontSize:12,padding:0,angle:0,dx:0,dy:0,textAnchor:"end",verticalAnchor:"middle"},axisLabel:{fontSize:12,padding:30,fill:"rgba(35, 31, 32,0.7)"},axis:{stroke:"#756f6b00"},ticks:{stroke:"gray",size:5,strokeWidth:0},grid:{stroke:""}},yAxis:{active:!1,scale:"linear",padding:20,domain:[0,b],domainPadding:20,offsetX:null,showZero:!1,tickCount:5,tickValues:null,tickFormat:null,multiLineTickLabels:!1,multiLineTickLabelsBreak:1,abbreviateTicks:!1,abbreviateTicksDecimals:0,tickUnit:"",tickUnitPosition:"end",customTickFormat:null,tickLabels:{fontSize:12,padding:15,angle:0,dx:0,dy:0,textAnchor:"middle",verticalAnchor:"start"},axisLabel:{fontSize:12,padding:30,fill:"rgba(35, 31, 32,0.7)"},ticks:{stroke:"gray",size:5,strokeWidth:0},axis:{stroke:"#756f6a"},grid:{stroke:""},dateFormat:"yyyy"},dataRender:{x:"x",y:"y",x2:null,y2:null,sortKey:"x",sortOrder:"none",categories:["y","z"],xScale:"linear",yScale:"linear",xFormat:"yyyy",yFormat:"yyyy"},animate:{active:!1,duration:500},tooltip:{active:!1},legend:{active:!1},bar:{orientation:"horizontal",width:30,barToSpaceRatio:.8,groupOffset:20},labels:{active:!0,showFirstLastPointsOnly:!1,color:"black",fontWeight:200,fontSize:12,labelBarPosition:"inside",labelCutoff:0,labelCutoffMobile:0,labelPositionDX:n,labelPositionDY:c,pieLabelRadius:60,abbreviateValue:!1,toFixedDecimal:0,labelUnit:"",labelUnitPosition:"end",labelFormat:null,customLabelFormat:null}},m=[[{x:t,y:o,yLabel:"fractional"===r?"".concat(o,"/").concat(b):"".concat((o/b*100).toFixed(0),"%")}],[{x:t,y:b-o,yLabel:" "}]];return React.createElement(l.ChartBuilderWrapper,{config:p,data:m})};r()((function(){document.querySelector(".wp-block-prc-block-progress-bar")&&document.querySelectorAll(".wp-block-prc-block-progress-bar").forEach((function(e){var t=e.dataset,a={maxWidth:parseFloat(t.maxWidth),maxValue:parseFloat(t.maxValue),currentValue:parseFloat(t.currentValue),labelFormat:t.labelFormat,axisLabel:t.axisLabel,axisPadding:parseFloat(t.axisPadding),labelPositionDY:parseInt(t.labelPositionDy,10),labelPositionDX:parseInt(t.labelPositionDx,10),showAxisLabel:"1"===t.showAxisLabel,barColor:t.barColor};Object(i.render)(React.createElement(d,a),e)}))}))}},[[812,0,25]]]);
//# sourceMappingURL=progress-bar-b5917fba.js.map