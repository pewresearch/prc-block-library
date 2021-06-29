/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.0.0
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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[3],{1:function(e,t){e.exports=window.React},21:function(e,t){e.exports=window.wp.domReady},253:function(e,t){e.exports=regeneratorRuntime},26:function(e,t){e.exports=window.wp.i18n},303:function(e,t){e.exports=window.lodash},325:function(e,t){e.exports=window.wp.mediaUtils},353:function(e,t,a){a(38),e.exports=a(518)},518:function(e,t,a){"use strict";a.r(t);var r=a(247),n=a(60),i=a(21),o=a.n(i),l=a(9),c=a(548),s=a(547),d=a(74),u={general:["#436983","#bf3927","#756a7e","#ea9e2c"],"politics-main":["#d1a730","#a55a26","#949d48"],"global-main":["#949d48","#006699","#a55a26"],"religion-main":["#0090bf","#a55a26","#949d48"],"social-trends-main":["#377668","#d1a730","#949d48"],"journalism-main":["#733d47","#d1a730","#949d48"],"internet-main":["#006699","#949d48","#d1a730"],"hispanic-main":["#a55a26","#d1a730","#949d48"],"politics-spectrum":["#D1A730","#F6EED6","#ECDBAC","#E4CB83","#9E7F2D","#6A5522"],"global-spectrum":["#949D48","#EAECD8","#D6DAB3","#C2C98B","#6E7537","#494E24"],"religion-spectrum":["#0090C0","#C9DEEE","#9DC7E1","#71B2D6","#0073A5","#00557E"],"journalism-spectrum":["#733D47","#E8D3D7","#D1A8AF","#BC7B86","#552E35","#391E22"],"social-trends-spectrum":["#387668","#D1E9E4","#A2D2C8","#64B6AA","#005645","#003A2C"],"hispanic-spectrum":["#A55A26","#F2DBCD","#E7BA9A","#DE996A","#7C441C","#532E16"],"internet-spectrum":["#006699","#C9D1E1","#9DAECB","#7591B7","#004A75","#002748"],"blue-spectrum":["#456A83","#D5E1E9","#ACC4D3","#82A6BF","#335062","#213441"],"green-spectrum":["#949D48","#EAECD8","#D6DAB3","#C2C98B","#6E7537","#494E24"],"purple-spectrum":["#746A7E","#E3E1E5","#C7C1CB","#ACA4B1","#584F5E","#3A343F"],"medium-brown-spectrum":["#A55A26","#F2DBCD","#E7BA9A","#DE996A","#7C441C","#532E16"],"light-brown-spectrum":["#D1A730","#F6EED6","#ECDBAC","#E4CB83","#9E7F2D","#6A5522"],"orange-spectrum":["#EA9E2C","#F9EAD4","#F5D6A9","#F1C37F","#BB792A","#7C5220"],"red-spectrum":["#BF3B27","#F5D4CF","#EBABA2","#E37F73","#902D1E","#5F1D14"]},p=(a(31),a(72),a(325),a(326),function(e){return e.split(",").map(Number).filter((function(e){return!isNaN(e)}))}),m=function(e,t,a,r,n,i){return isNaN(e)||isNaN(t)?[0,100]:"bar"===a&&"x"===n||"stacked-bar"===a&&"x"===n||"dot-plot"===a&&"x"===n||"pie"===a?null:"time"===r&&"x"===n?[new Date(e,0),new Date(t,0)]:[parseFloat(e),parseFloat(t)]};function f(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function b(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?f(Object(a),!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):f(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var g=function(){document.querySelectorAll(".wp-chart-builder-wrapper").forEach((function(e){var t=e.querySelector(".wp-chart-builder-inner"),a=function(e){var t,a,r,i=d.masterConfig.layout,o=d.masterConfig.xAxis,l=d.masterConfig.yAxis,c=e.dataset.chartHash,s=window.chartConfigs[c],f=p(s.xTickExact),g=p(s.yTickExact);return b(b({},d.masterConfig),{},(t={layout:b(b({},i),{},{type:s.chartType,orientation:s.chartOrientation,width:s.width,height:s.height,padding:{top:s.paddingTop,bottom:s.paddingBottom,left:s.paddingLeft,right:s.paddingRight}}),xAxis:b(b({},o),{},{active:s.xAxisActive,label:s.xLabel,scale:s.xScale,dateFormat:s.xScaleFormat,domain:m(s.xMinDomain,s.xMaxDomain,s.chartType,s.xScale,"x",s.chartOrientation),padding:50,tickCount:s.xTickNum,tickValues:f.length<=1?null:(a=f,r=xScale,"time"===r?a.map((function(e){return new Date("".concat(e))})):a),domainPadding:s.xDomainPadding,axis:{stroke:s.xAxisStroke},grid:{stroke:s.xGridStroke}}),yAxis:b(b({},l),{},{active:s.yAxisActive,scale:s.yScale,dateFormat:s.yScaleFormat,padding:20,tickCount:s.yTickNum,tickValues:g.length<=1?null:g,domain:m(s.yMinDomain,s.yMaxDomain,s.chartType,s.yScale,"y",s.chartOrientation),domainPadding:s.yDomainPadding,showZero:s.showYMinDomainLabel,axis:{stroke:s.yAxisStroke},grid:{stroke:s.yGridStroke}}),dataRender:b(b({},d.masterConfig.dataRender),{},{xScale:s.xScale,yScale:s.yScale,xFormat:s.xScaleFormat,yFormat:s.yScaleFormat,sortKey:"x",sortOrder:s.sortOrder}),tooltip:{active:s.tooltipActive,format:s.tooltipFormat},animate:{active:!1,duration:500},line:b(b({},d.masterConfig.line),{},{interpolation:s.lineInterpolation,showPoints:s.lineNodes,showArea:"area"===s.chartType,strokeWidth:s.lineStrokeWidth,pointSize:s.nodeSize,pointStrokeWidth:s.nodeStroke,areaFillOpacity:s.areaFillOpacity}),legend:{active:!1,legendPosition:"top"},bar:b(b({},d.masterConfig.bar),{},{width:s.barWidth,barToSpaceRatio:.8,groupOffset:s.barGroupOffset}),scatter:{pointSize:s.nodeSize},nodes:{size:s.nodeSize,fill:s.nodeFill,strokeWidth:s.nodeStroke},labels:b(b({},d.masterConfig.labels),{},{active:s.labelsActive,color:"black",fontWeight:200,fontSize:12,labelPositionDX:s.labelPositionDX,labelPositionDY:s.labelPositionDY,labelBarPosition:s.barLabelPosition,labelCutoff:"inside"===s.barLabelPosition?s.barLabelCutoff:null,labelCutoffMobile:"inside"===s.barLabelPosition?s.barLabelCutoffMobile:null,pieLabelRadius:60})},Object(n.a)(t,"legend",b(b({},d.masterConfig.legend),{},{active:s.legendActive,orientation:s.legendOrientation,title:s.legendTitle,offsetX:s.legendOffsetX,offsetY:s.legendOffsetY,markerStyle:s.legendMarkerStyle,borderStroke:s.legendBorderStroke,fill:s.legendFill})),Object(n.a)(t,"metadata",b(b({},d.masterConfig.metadata),{},{active:s.metaTextActive,title:s.metaTitle,subtitle:s.metaSubtitle,note:s.metaNote,source:s.metaSource,tag:s.metaTag})),Object(n.a)(t,"colors",s.customColors.length>0?s.customColors:u[s.colorValue]),t))}(t),i=t.dataset.chartHash,o=e.querySelector(".table-array-data").innerText,f=JSON.parse(o),g=function(e,t,a){for(var n=e[0],i=Object(r.a)(n).slice(1),o=Object(r.a)(e).slice(1),l=[],c=function(e,t){return"bar"===a||"stacked-bar"===a||"pie"===a||"dot-plot"===a?e:"time"===t?new Date(e).getTime():parseFloat(e)},s=function(e){u=o.filter((function(t){return!isNaN(parseFloat(t[e]))})).map((function(a){return{x:c(a[0],t),y:parseFloat(a[e]),category:n[e],yLabel:"".concat(parseFloat(a[e]))}})),l.push(u)},d=1;d<n.length;d++){var u;s(d)}return{categories:i,seriesData:l}}(f,a.xAxis.scale,a.layout.type);a.dataRender.categories=g.categories;var E="pie"===a.layout.type?g.seriesData[0]:g.seriesData,D=[{menuItem:"Chart",render:function(){return React.createElement(d.ChartBuilderTextWrapper,{active:a.metadata.active,width:a.layout.width,horizontalRules:a.layout.horizontalRules,title:a.metadata.title,subtitle:a.metadata.subtitle,note:a.metadata.note,source:a.metadata.source,tag:a.metadata.tag},React.createElement(d.ChartBuilderWrapper,{config:a,data:E}))}},{menuItem:"Table",render:function(){return React.createElement(c.a,{celled:!0},React.createElement(c.a.Header,null,React.createElement(c.a.Row,null,f[0].map((function(e){return React.createElement(c.a.Cell,null,e)})))),React.createElement(c.a.Body,null,f.filter((function(e,t){return t>0})).map((function(e){return React.createElement(c.a.Row,null,e.map((function(e){return React.createElement(c.a.Cell,null,e)})))}))))}},{menuItem:"Share",render:function(){}}];Object(l.render)(React.createElement(s.a,{id:"tab-wrapper-".concat(i),panes:D}),t)}))};o()((function(){g()}))},72:function(e,t){e.exports=window.wp.data},9:function(e,t){e.exports=window.wp.element}},[[353,0,1,16]]]);
//# sourceMappingURL=chart-builder-3cbd115e.js.map