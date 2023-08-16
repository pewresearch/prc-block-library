!function(){"use strict";var e=window.wp.blocks,t=window.wp.data;function a(){return a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},a.apply(this,arguments)}var l=window.wp.element,o=window.wp.blockEditor,r=window.wp.i18n,n=window.wp.components;function i(e){let{attributes:t,setAttributes:a,colors:i}=e;const{maxWidth:s,maxValue:c,currentValue:d,showAxisLabel:b,axisLabel:u,axisLabelMaxWidth:g,axisPadding:p,labelFormat:m,labelPositionDY:C,labelPositionDX:x}=t,{barColor:y,setBarColor:h,backgroundColor:f,setBackgroundColor:k,categoryLabelColor:L,setCategoryLabelColor:_}=i;return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(o.InspectorControls,null,(0,l.createElement)(n.PanelBody,{title:(0,r.__)("Layout")},(0,l.createElement)(n.RangeControl,{label:(0,r.__)("Width"),withInputField:!0,min:0,max:640,value:parseInt(s,10),onChange:e=>a({maxWidth:parseInt(e,10)})})),(0,l.createElement)(n.PanelBody,{title:(0,r.__)("Data and Formatting")},(0,l.createElement)(n.ToggleControl,{label:(0,r.__)("Show Category"),checked:b,onChange:()=>a({showAxisLabel:!b})}),(0,l.createElement)(n.TextControl,{label:(0,r.__)("Category"),value:u,disabled:!b,onChange:e=>a({axisLabel:e})}),(0,l.createElement)(n.__experimentalNumberControl,{label:(0,r.__)("Category Label Max Width"),value:g,disabled:!b,disableUnits:!0,disabledUnits:!0,onChange:e=>a({axisLabelMaxWidth:parseInt(e,10)})}),(0,l.createElement)(n.__experimentalNumberControl,{label:(0,r.__)("Category Padding"),value:p,disabled:!b,disableUnits:!0,disabledUnits:!0,onChange:e=>a({axisPadding:parseInt(e,10)})}),(0,l.createElement)(n.Flex,null,(0,l.createElement)(n.FlexItem,null,(0,l.createElement)(n.__experimentalNumberControl,{label:(0,r.__)("Current value"),value:d,disableUnits:!0,disabledUnits:!0,onChange:e=>a({currentValue:parseFloat(e)})})),(0,l.createElement)(n.__experimentalNumberControl,{label:(0,r.__)("Maximum value"),value:c,disableUnits:!0,disabledUnits:!0,onChange:e=>a({maxValue:parseFloat(e)})}),(0,l.createElement)(n.FlexItem,null))),(0,l.createElement)(n.PanelBody,{title:(0,r.__)("Labels")},(0,l.createElement)(n.SelectControl,{label:(0,r.__)("Label format"),value:m,options:[{value:"fractional",label:"Fractional"},{value:"percentage",label:"Percentage"}],onChange:e=>{a({labelFormat:e})}}),(0,l.createElement)(n.Flex,null,(0,l.createElement)(n.FlexItem,null,(0,l.createElement)(n.__experimentalNumberControl,{label:(0,r.__)("Label Position DX"),value:x,onChange:e=>a({labelPositionDX:parseInt(e,10)})})),(0,l.createElement)(n.FlexItem,null,(0,l.createElement)(n.__experimentalNumberControl,{label:(0,r.__)("Label Position DY"),value:C,onChange:e=>a({labelPositionDY:parseInt(e,10)})}))))),(0,l.createElement)(o.InspectorControls,{group:"styles"},(0,l.createElement)(o.PanelColorSettings,{__experimentalHasMultipleOrigins:!0,__experimentalIsRenderedInSidebar:!0,title:(0,r.__)("Colors"),colorSettings:[{value:y.color,onChange:e=>h(e),label:(0,r.__)("Bar")},{value:f.color,onChange:e=>k(e),label:(0,r.__)("Background")},{value:L.color,onChange:e=>_(e),label:(0,r.__)("Category Label")}]})))}var s=window.prcChartBuilder,c=function(e){let{axisLabel:t,axisPadding:a,axisLabelMaxWidth:o,barColor:r,backgroundColor:n,categoryLabelColor:i,currentValue:c,labelFormat:d,labelPositionDX:b,labelPositionDY:u,maxWidth:g,maxValue:p,showAxisLabel:m}=e;const C={layout:{...s.baseConfig.layout,name:"progress-chart",parentClass:"wp-block-prc-block-progress-bar",type:"stacked-bar",orientation:"horizontal",theme:"light",width:g,height:40,padding:{top:0,bottom:0,left:m?a:0,right:0},horizontalRules:!1},metadata:{...s.baseConfig.metadata,active:!1},colors:[r,n],independentAxis:{...s.baseConfig.independentAxis,active:m,scale:"linear",dateFormat:"yyyy",domain:[0,p],domainPadding:50,offsetY:null,padding:50,tickCount:5,tickValues:null,tickFormat:null,multiLineTickLabels:!1,multiLineTickLabelsBreak:1,abbreviateTicks:!1,abbreviateTicksDecimals:0,tickUnit:"",tickUnitPosition:"end",customTickFormat:null,tickLabels:{...s.baseConfig.independentAxis.tickLabels,fontSize:12,padding:0,angle:0,dx:-5,dy:0,textAnchor:"end",verticalAnchor:"middle",fill:i,maxWidth:o},axisLabel:{...s.baseConfig.independentAxis.axisLabel,fontSize:12,padding:30,fill:"rgba(35, 31, 32,0.7)"},axis:{...s.baseConfig.independentAxis.axis,stroke:"#756f6b00"},ticks:{...s.baseConfig.independentAxis.ticks,stroke:"gray",size:0,strokeWidth:0},grid:{...s.baseConfig.independentAxis.grid,stroke:""}},dependentAxis:{...s.baseConfig.dependentAxis,active:!1,scale:"linear",padding:20,domain:[0,p],domainPadding:20,offsetX:null,showZero:!1,tickCount:5,tickValues:null,tickFormat:null,multiLineTickLabels:!1,multiLineTickLabelsBreak:1,abbreviateTicks:!1,abbreviateTicksDecimals:0,tickUnit:"",tickUnitPosition:"end",customTickFormat:null,tickLabels:{...s.baseConfig.dependentAxis.tickLabels,fontSize:12,padding:15,angle:0,dx:0,dy:0,textAnchor:"middle",verticalAnchor:"start",fill:"rgba(35, 31, 32,0.7)"},axisLabel:{...s.baseConfig.dependentAxis.axisLabel,fontSize:12,padding:30,fill:"rgba(35, 31, 32,0.7)"},ticks:{...s.baseConfig.dependentAxis.ticks,stroke:"gray",size:5,strokeWidth:0},axis:{...s.baseConfig.dependentAxis.axis,stroke:"#756f6a"},grid:{...s.baseConfig.dependentAxis.grid,stroke:""}},dataRender:{...s.baseConfig.dataRender,x:"x",y:"y",x2:null,y2:null,sortKey:"x",sortOrder:"none",categories:["currentValue","restOfBar"],xScale:"linear",yScale:"linear",xFormat:"yyyy",yFormat:"yyyy"},animate:{active:!1,duration:500},tooltip:{...s.baseConfig.tooltip,active:!1},legend:{active:!1},bar:{orientation:"horizontal",width:30,barToSpaceRatio:.8,groupOffset:20},labels:{...s.baseConfig.labels,active:!0,showFirstLastPointsOnly:!1,color:"black",fontWeight:200,fontSize:12,labelBarPosition:"inside",labelCutoff:0,labelCutoffMobile:0,labelPositionDX:b,labelPositionDY:u,pieLabelRadius:60,abbreviateValue:!1,toFixedDecimal:0,labelUnit:"",labelUnitPosition:"end",labelFormat:null,customLabelFormat:(e,t)=>"currentValue"===t?"fractional"===d?`${c}/${p}`:`${(c/p*100).toFixed(0)}%\t`:""}},x=[{x:t,currentValue:c,restOfBar:p-c}];return(0,l.createElement)(s.ChartBuilderWrapper,{config:C,data:x})};const d=(0,t.createReduxStore)("prc-block/progress-bar",{reducer:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isCopied:!1,copiedStyles:{}},t=arguments.length>1?arguments[1]:void 0;return"COPY_LAYOUT_STYLES"===t.type?{...e,isCopied:!0,copiedStyles:t.payload}:e},actions:{copyLayoutStyles(e){return{type:"COPY_LAYOUT_STYLES",payload:e}}},selectors:{getCopiedStylesStatus(e){return e.isCopied},getCopiedStyles(e){return e.copiedStyles}}});var b=d;const u=(0,r.__)("Copy layout"),g=(0,r.__)("Paste layout");var p=e=>{let{children:a,attributes:r,setAttributes:i}=e;const{maxWidth:s,barColor:c,backgroundColor:d,categoryLabelColor:p,showAxisLabel:m,axisPadding:C,axisLabelMaxWidth:x,labelFormat:y,labelPositionDX:h,labelPositionDY:f}=r,k={maxWidth:s,barColor:c,backgroundColor:d,categoryLabelColor:p,showAxisLabel:m,axisPadding:C,axisLabelMaxWidth:x,labelFormat:y,labelPositionDX:h,labelPositionDY:f},{copyLayoutStyles:L}=(0,t.useDispatch)(b),_=(0,t.select)(b).getCopiedStylesStatus();return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(o.BlockControls,null,(0,l.createElement)(n.ToolbarGroup,null,(0,l.createElement)(n.ToolbarButton,{name:"copy-styles",label:u,title:u,onClick:()=>{L(k)}},u)),_&&(0,l.createElement)(n.ToolbarGroup,null,(0,l.createElement)(n.ToolbarButton,{name:"paste-styles",label:g,title:g,onClick:()=>(()=>{const{getCopiedStyles:e}=(0,t.select)(b),a=e();console.log({styles:a}),i({...r,...a})})()},g))),a)},m=(0,o.withColors)({barColor:"color"},{backgroundColor:"color"},{categoryLabelColor:"color"})((function(e){let{attributes:t,setAttributes:r,barColor:n,setBarColor:s,backgroundColor:d,setBackgroundColor:b,categoryLabelColor:u,setCategoryLabelColor:g}=e;const m=(0,o.useBlockProps)();return(0,l.createElement)(p,{attributes:t,setAttributes:r},(0,l.createElement)("div",m,(0,l.createElement)(i,{attributes:t,setAttributes:r,colors:{barColor:n,setBarColor:s,backgroundColor:d,setBackgroundColor:b,categoryLabelColor:u,setCategoryLabelColor:g}}),(0,l.createElement)(c,a({},t,{barColor:n.color,backgroundColor:d.color,categoryLabelColor:u.color}))))})),C=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/progress-bar","version":"0.1.0","title":"Progress Bar","category":"design","icon":"chart-bar","keywords":["progress","bar","quiz","result","horizontal","chart"],"attributes":{"maxWidth":{"type":"number","default":"640"},"barColor":{"type":"string","default":"social-trends-teal"},"backgroundColor":{"type":"string","default":"beige"},"categoryLabelColor":{"type":"string","default":"text-color"},"maxValue":{"type":"number","default":100},"currentValue":{"type":"number","default":50},"showAxisLabel":{"type":"boolean","default":true},"axisLabel":{"type":"string","default":"Total"},"axisPadding":{"type":"number","default":60},"axisLabelMaxWidth":{"type":"number","default":60},"labelFormat":{"enum":["fractional","percentage"],"default":"fractional"},"labelPositionDX":{"type":"integer","default":-5},"labelPositionDY":{"type":"integer","default":4}},"supports":{"anchor":true,"html":false,"spacing":{"blockGap":true,"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"typography":{"fontSize":true}},"textdomain":"progress-bar","editorScript":"file:./index.js","render":"file:./render.php","viewScript":"file:./view.js"}');console.log("prc-block/progress-bar",C);const{name:x}=C,y={edit:m};(0,t.register)(b),(0,e.registerBlockType)(x,{...C,...y})}();
