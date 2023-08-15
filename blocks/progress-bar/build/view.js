!function(){"use strict";var e={n:function(a){var i=a&&a.__esModule?function(){return a.default}:function(){return a};return e.d(i,{a:i}),i},d:function(a,i){for(var t in i)e.o(i,t)&&!e.o(a,t)&&Object.defineProperty(a,t,{enumerable:!0,get:i[t]})},o:function(e,a){return Object.prototype.hasOwnProperty.call(e,a)}},a=window.wp.element,i=window.wp.domReady,t=e.n(i),o=window.prcChartBuilder,n=function(e){let{axisLabel:i,axisPadding:t,axisLabelMaxWidth:n,barColor:l,backgroundColor:r,categoryLabelColor:s,currentValue:d,labelFormat:c,labelPositionDX:b,labelPositionDY:u,maxWidth:g,maxValue:x,showAxisLabel:p}=e;const f={layout:{...o.baseConfig.layout,name:"progress-chart",parentClass:"wp-block-prc-block-progress-bar",type:"stacked-bar",orientation:"horizontal",theme:"light",width:g,height:40,padding:{top:0,bottom:0,left:p?t:0,right:0},horizontalRules:!1},metadata:{...o.baseConfig.metadata,active:!1},colors:[l,r],independentAxis:{...o.baseConfig.independentAxis,active:p,scale:"linear",dateFormat:"yyyy",domain:[0,x],domainPadding:50,offsetY:null,padding:50,tickCount:5,tickValues:null,tickFormat:null,multiLineTickLabels:!1,multiLineTickLabelsBreak:1,abbreviateTicks:!1,abbreviateTicksDecimals:0,tickUnit:"",tickUnitPosition:"end",customTickFormat:null,tickLabels:{...o.baseConfig.independentAxis.tickLabels,fontSize:12,padding:0,angle:0,dx:-5,dy:0,textAnchor:"end",verticalAnchor:"middle",fill:s,maxWidth:n},axisLabel:{...o.baseConfig.independentAxis.axisLabel,fontSize:12,padding:30,fill:"rgba(35, 31, 32,0.7)"},axis:{...o.baseConfig.independentAxis.axis,stroke:"#756f6b00"},ticks:{...o.baseConfig.independentAxis.ticks,stroke:"gray",size:0,strokeWidth:0},grid:{...o.baseConfig.independentAxis.grid,stroke:""}},dependentAxis:{...o.baseConfig.dependentAxis,active:!1,scale:"linear",padding:20,domain:[0,x],domainPadding:20,offsetX:null,showZero:!1,tickCount:5,tickValues:null,tickFormat:null,multiLineTickLabels:!1,multiLineTickLabelsBreak:1,abbreviateTicks:!1,abbreviateTicksDecimals:0,tickUnit:"",tickUnitPosition:"end",customTickFormat:null,tickLabels:{...o.baseConfig.dependentAxis.tickLabels,fontSize:12,padding:15,angle:0,dx:0,dy:0,textAnchor:"middle",verticalAnchor:"start",fill:"rgba(35, 31, 32,0.7)"},axisLabel:{...o.baseConfig.dependentAxis.axisLabel,fontSize:12,padding:30,fill:"rgba(35, 31, 32,0.7)"},ticks:{...o.baseConfig.dependentAxis.ticks,stroke:"gray",size:5,strokeWidth:0},axis:{...o.baseConfig.dependentAxis.axis,stroke:"#756f6a"},grid:{...o.baseConfig.dependentAxis.grid,stroke:""}},dataRender:{...o.baseConfig.dataRender,x:"x",y:"y",x2:null,y2:null,sortKey:"x",sortOrder:"none",categories:["currentValue","restOfBar"],xScale:"linear",yScale:"linear",xFormat:"yyyy",yFormat:"yyyy"},animate:{active:!1,duration:500},tooltip:{...o.baseConfig.tooltip,active:!1},legend:{active:!1},bar:{orientation:"horizontal",width:30,barToSpaceRatio:.8,groupOffset:20},labels:{...o.baseConfig.labels,active:!0,showFirstLastPointsOnly:!1,color:"black",fontWeight:200,fontSize:12,labelBarPosition:"inside",labelCutoff:0,labelCutoffMobile:0,labelPositionDX:b,labelPositionDY:u,pieLabelRadius:60,abbreviateValue:!1,toFixedDecimal:0,labelUnit:"",labelUnitPosition:"end",labelFormat:null,customLabelFormat:(e,a)=>"currentValue"===a?"fractional"===c?`${d}/${x}`:`${(d/x*100).toFixed(0)}%\t`:""}},k=[{x:i,currentValue:d,restOfBar:x-d}];return(0,a.createElement)(o.ChartBuilderWrapper,{config:f,data:k})};t()((()=>{document.querySelector(".wp-block-prc-block-progress-bar")&&document.querySelectorAll(".wp-block-prc-block-progress-bar").forEach((e=>{const i=e.dataset,t={maxWidth:parseFloat(i.maxWidth),maxValue:parseFloat(i.maxValue),currentValue:parseFloat(i.currentValue),labelFormat:i.labelFormat,axisLabel:i.axisLabel,axisLabelMaxWidth:parseFloat(i.axisLabelMaxWidth),axisPadding:parseFloat(i.axisPadding),labelBarPosition:i.labelPosition,labelPositionDY:parseInt(i.labelPositionDy,10),labelPositionDX:parseInt(i.labelPositionDx,10),showAxisLabel:"1"===i.showAxisLabel,barColor:i.barColor,backgroundColor:i.backgroundColor,categoryLabelColor:i.categoryLabelColor};console.log({props:t}),(0,a.render)((0,a.createElement)(n,t),e)}))}))}();
//# sourceMappingURL=view.js.map