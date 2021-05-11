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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[3],{1:function(e,t){e.exports=React},15:function(e,t){e.exports=wp.element},161:function(e,t){e.exports=wp.i18n},20:function(e,t){e.exports=wp.domReady},222:function(e,t){e.exports=regeneratorRuntime},275:function(e,t){e.exports=lodash},338:function(e,t,a){a(31),e.exports=a(504)},481:function(e,t,a){},504:function(e,t,a){"use strict";a.r(t);var r=a(215),n=a(89),i=a(20),o=a.n(i),l=a(15),c=a(535),s=a(534),u=a(46),d={general:["#436983","#bf3927","#756a7e","#ea9e2c"],"politics-main":["#d1a730","#a55a26","#949d48"],"global-main":["#949d48","#006699","#a55a26"],"religion-main":["#0090bf","#a55a26","#949d48"],"social-trends-main":["#377668","#d1a730","#949d48"],"journalism-main":["#733d47","#d1a730","#949d48"],"internet-main":["#006699","#949d48","#d1a730"],"hispanic-main":["#a55a26","#d1a730","#949d48"],"politics-spectrum":["#D1A730","#F6EED6","#ECDBAC","#E4CB83","#9E7F2D","#6A5522"],"global-spectrum":["#949D48","#EAECD8","#D6DAB3","#C2C98B","#6E7537","#494E24"],"religion-spectrum":["#0090C0","#C9DEEE","#9DC7E1","#71B2D6","#0073A5","#00557E"],"journalism-spectrum":["#733D47","#E8D3D7","#D1A8AF","#BC7B86","#552E35","#391E22"],"social-trends-spectrum":["#387668","#D1E9E4","#A2D2C8","#64B6AA","#005645","#003A2C"],"hispanic-spectrum":["#A55A26","#F2DBCD","#E7BA9A","#DE996A","#7C441C","#532E16"],"internet-spectrum":["#006699","#C9D1E1","#9DAECB","#7591B7","#004A75","#002748"],"blue-spectrum":["#456A83","#D5E1E9","#ACC4D3","#82A6BF","#335062","#213441"],"green-spectrum":["#949D48","#EAECD8","#D6DAB3","#C2C98B","#6E7537","#494E24"],"purple-spectrum":["#746A7E","#E3E1E5","#C7C1CB","#ACA4B1","#584F5E","#3A343F"],"medium-brown-spectrum":["#A55A26","#F2DBCD","#E7BA9A","#DE996A","#7C441C","#532E16"],"light-brown-spectrum":["#D1A730","#F6EED6","#ECDBAC","#E4CB83","#9E7F2D","#6A5522"],"orange-spectrum":["#EA9E2C","#F9EAD4","#F5D6A9","#F1C37F","#BB792A","#7C5220"],"red-spectrum":["#BF3B27","#F5D4CF","#EBABA2","#E37F73","#902D1E","#5F1D14"]},m=function(e){return e.split(",").map(Number).filter((function(e){return!isNaN(e)}))},p=function(e,t,a,r,n,i){return isNaN(e)||isNaN(t)?[0,100]:"bar"===a&&"x"===n||"stacked-bar"===a&&"x"===n||"pie"===a?null:"time"===r&&"x"===n?[new Date(e,0),new Date(t,0)]:[parseFloat(e),parseFloat(t)]};a(481);function f(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function b(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?f(Object(a),!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):f(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var g=function(){document.querySelectorAll(".wp-chart-builder-wrapper").forEach((function(e){var t,a,i,o,f,g,E,D,C,A,y,h=e.querySelector(".wp-chart-builder-inner"),x=(t=h,f=u.masterConfig.layout,g=u.masterConfig.xAxis,E=u.masterConfig.yAxis,D=t.dataset.chartHash,C=window.chartConfigs[D],A=m(C.xTickExact),y=m(C.yTickExact),b(b({},u.masterConfig),{},(a={layout:b(b({},f),{},{type:C.chartType,orientation:C.chartOrientation,width:C.width,height:C.height,padding:{top:C.paddingTop,bottom:C.paddingBottom,left:C.paddingLeft,right:C.paddingRight}}),xAxis:b(b({},g),{},{active:C.xAxisActive,label:C.xLabel,scale:C.xScale,dateFormat:C.xScaleFormat,domain:p(C.xMinDomain,C.xMaxDomain,C.chartType,C.xScale,"x",C.chartOrientation),padding:50,tickCount:C.xTickNum,tickValues:A.length<=1?null:(i=A,o=xScale,"time"===o?i.map((function(e){return new Date("".concat(e))})):i),domainPadding:C.xDomainPadding}),yAxis:b(b({},E),{},{active:C.yAxisActive,scale:C.yScale,dateFormat:C.yScaleFormat,padding:20,tickCount:C.yTickNum,tickValues:y.length<=1?null:y,domain:p(C.yMinDomain,C.yMaxDomain,C.chartType,C.yScale,"y",C.chartOrientation),domainPadding:C.yDomainPadding,showZero:C.showYMinDomainLabel}),dataRender:b(b({},u.masterConfig.dataRender),{},{xScale:C.xScale,yScale:C.yScale,xFormat:C.xScaleFormat,yFormat:C.yScaleFormat,sortKey:"x",sortOrder:C.sortOrder}),tooltip:{active:C.tooltipActive,format:C.tooltipFormat},animate:{active:!1,duration:500},line:b(b({},u.masterConfig.line),{},{interpolation:C.lineInterpolation,showPoints:C.lineNodes,showArea:"area"===C.chartType,strokeWidth:C.lineStrokeWidth,pointSize:C.lineNodeSize,pointStrokeWidth:C.lineNodeStroke,areaFillOpacity:C.areaFillOpacity}),legend:{active:!1,legendPosition:"top"},bar:b(b({},u.masterConfig.bar),{},{width:C.barWidth,barToSpaceRatio:.8,groupOffset:C.barGroupOffset}),scatter:{pointSize:C.lineNodeSize},labels:b(b({},u.masterConfig.labels),{},{active:C.labelsActive,color:"black",fontWeight:200,fontSize:12,labelPositionDX:C.labelPositionDX,labelPositionDY:C.labelPositionDY,labelBarPosition:C.barLabelPosition,labelCutoff:"inside"===C.barLabelPosition?C.barLabelCutoff:null,labelCutoffMobile:"inside"===C.barLabelPosition?C.barLabelCutoffMobile:null,pieLabelRadius:60})},Object(n.a)(a,"legend",b(b({},u.masterConfig.legend),{},{active:C.legendActive,orientation:C.legendOrientation,title:C.legendTitle,offsetX:C.legendOffsetX,offsetY:C.legendOffsetY,markerStyle:C.legendMarkerStyle,borderStroke:C.legendBorderStroke,fill:C.legendFill})),Object(n.a)(a,"metadata",b(b({},u.masterConfig.metadata),{},{active:C.metaTextActive,title:C.metaTitle,subtitle:C.metaSubtitle,note:C.metaNote,source:C.metaSource,tag:C.metaTag})),Object(n.a)(a,"colors",C.customColors.length>0?C.customColors:d[C.colorValue]),a))),w=e.querySelector(".table-array-data").innerText,F=JSON.parse(w),O=function(e,t,a){for(var n=e[0],i=Object(r.a)(n).slice(1),o=Object(r.a)(e).slice(1),l=[],c=function(e,t){return"bar"===a||"stacked-bar"===a||"pie"===a?e:"time"===t?new Date(e).getTime():parseFloat(e)},s=function(e){d=o.filter((function(t){return!isNaN(parseFloat(t[e]))})).map((function(a){return{x:c(a[0],t),y:parseFloat(a[e]),category:n[e],yLabel:"".concat(parseFloat(a[e]))}})),l.push(d)},u=1;u<n.length;u++){var d;s(u)}return{categories:i,seriesData:l}}(F,x.xAxis.scale,x.layout.type);x.dataRender.categories=O.categories;var B="pie"===x.layout.type?O.seriesData[0]:O.seriesData,S=[{menuItem:"Chart",render:function(){return React.createElement(u.ChartBuilderTextWrapper,{active:x.metadata.active,width:x.layout.width,horizontalRules:x.layout.horizontalRules,title:x.metadata.title,subtitle:x.metadata.subtitle,note:x.metadata.note,source:x.metadata.source,tag:x.metadata.tag},React.createElement(u.ChartBuilderWrapper,{config:x,data:B}))}},{menuItem:"Table",render:function(){return React.createElement(c.a,{celled:!0},React.createElement(c.a.Header,null,React.createElement(c.a.Row,null,F[0].map((function(e){return React.createElement(c.a.Cell,null,e)})))),React.createElement(c.a.Body,null,F.filter((function(e,t){return t>0})).map((function(e){return React.createElement(c.a.Row,null,e.map((function(e){return React.createElement(c.a.Cell,null,e)})))}))))}}];Object(l.render)(React.createElement(s.a,{panes:S}),h)}))};o()((function(){g(),console.log("frontend loaded")}))}},[[338,0,1,14]]]);
//# sourceMappingURL=chart-builder-a6e27245.js.map