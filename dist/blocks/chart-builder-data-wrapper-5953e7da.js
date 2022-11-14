/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.23
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[9],{12:function(t,e,a){var c="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");a.p=window["__wpackIo".concat(c)]},2:function(t,e){t.exports=window.wp.i18n},3:function(t,e){t.exports=window.wp.components},300:function(t){t.exports=JSON.parse('{"name":"prc-block/chart-builder-data-wrapper","category":"layout","textdomain":"chart-builder-data-wrapper","$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"attributes":{"id":{"type":"string"},"chartType":{"type":"string"},"transformed":{"type":"boolean","default":false},"isConvertedChart":{"type":"boolean","default":false},"hideTable":{"type":"boolean","default":false},"chartData":{"type":"array"},"chartPreformattedData":{"type":"array"}},"providesContext":{"prc-chart-builder/id":"id"},"supports":{"__experimentalMetadata":true}}')},4:function(t,e){t.exports=window.wp.element},5:function(t,e){t.exports=window.wp.blockEditor},685:function(t,e,a){a(12),t.exports=a(770)},7:function(t,e){t.exports=window.wp.blocks},73:function(t,e,a){"use strict";a.d(e,"a",(function(){return c})),a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"e",(function(){return o})),a.d(e,"f",(function(){return i})),a.d(e,"g",(function(){return l})),a.d(e,"i",(function(){return d})),a.d(e,"j",(function(){return s})),a.d(e,"h",(function(){return b})),a.d(e,"d",(function(){return h}));var c=[["core/table",{className:"chart-builder-data-table",head:[{cells:[{content:"Year",tag:"th"},{content:"n1",tag:"th"}]}],body:[{cells:[{content:"2000",tag:"td"},{content:"20",tag:"td"}]},{cells:[{content:"2005",tag:"td"},{content:"28",tag:"td"}]},{cells:[{content:"2010",tag:"td"},{content:"40",tag:"td"}]},{cells:[{content:"2015",tag:"td"},{content:"44",tag:"td"}]},{cells:[{content:"2020",tag:"td"},{content:"30",tag:"td"}]}]}],["prc-block/chart-builder",{isConvertedChart:!1,chartType:"area",width:420,height:356,paddingTop:56,paddingRight:20,paddingBottom:20,paddingLeft:30,xDomainPadding:1,yDomainPadding:0,xMinDomain:2e3,xMaxDomain:2020,xScale:"time",showYMinDomainLabel:!0,lineStrokeWidth:4,lineNodes:!0,nodeSize:4,nodeStroke:1,nodeFill:"white"}]],n=[["core/table",{className:"chart-builder-data-table",head:[{cells:[{content:"x",tag:"th"},{content:"y",tag:"th"}]}],body:[{cells:[{content:"Germany",tag:"td"},{content:"40",tag:"td"}]},{cells:[{content:"Spain",tag:"td"},{content:"50",tag:"td"}]},{cells:[{content:"France",tag:"td"},{content:"60",tag:"td"}]}]}],["prc-block/chart-builder",{isConvertedChart:!1,chartType:"bar",chartOrientation:"horizontal",width:420,height:160,paddingLeft:100,xDomainPadding:16,xTickNum:null,xTickLabelTextAnchor:"end",xTickLabelVerticalAnchor:"middle",yAxisActive:!1,barWidth:24,barGroupOffset:28,labelsActive:!0,labelPositionDX:-20,sortOrder:"reverse"}]],r=[["core/table",{className:"chart-builder-data-table",head:[{cells:[{content:"x",tag:"th"},{content:"y",tag:"th"}]}],body:[{cells:[{content:"Germany",tag:"td"},{content:"40",tag:"td"}]},{cells:[{content:"Spain",tag:"td"},{content:"50",tag:"td"}]},{cells:[{content:"France",tag:"td"},{content:"60",tag:"td"}]}]}],["prc-block/chart-builder",{isConvertedChart:!1,chartType:"bar",chartOrientation:"vertical",width:240,height:160,paddingLeft:20,paddingBottom:20,paddingRight:20,xDomainPadding:16,xTickNum:null,yAxisActive:!1,barWidth:24,barGroupOffset:28,tooltipActive:!1,labelsActive:!0,labelPositionDY:15}]],o=[["core/table",{className:"chart-builder-data-table",head:[{cells:[{content:"Independent variable",tag:"th"},{content:"n1",tag:"th"},{content:"n2",tag:"th"}]}],body:[{cells:[{content:"Germany",tag:"td"},{content:"40",tag:"td"},{content:"60",tag:"td"}]},{cells:[{content:"Spain",tag:"td"},{content:"50",tag:"td"},{content:"50",tag:"td"}]},{cells:[{content:"France",tag:"td"},{content:"60",tag:"td"},{content:"40",tag:"td"}]}]}],["prc-block/chart-builder",{chartType:"bar",chartOrientation:"horizontal",width:420,height:240,paddingLeft:100,sortOrder:"reverse",colorValue:"social-trends-main",xDomainPadding:30,xTickLabelTextAnchor:"end",xTickLabelVerticalAnchor:"middle",yAxisActive:!1,barWidth:24,barGroupOffset:28,labelsActive:!0,labelPositionDX:-20}]],i=[["core/table",{className:"chart-builder-data-table",head:[{cells:[{content:"Independent variable",tag:"th"},{content:"n1",tag:"th"},{content:"n2",tag:"th"}]}],body:[{cells:[{content:"Germany",tag:"td"},{content:"40",tag:"td"},{content:"60",tag:"td"}]},{cells:[{content:"Spain",tag:"td"},{content:"50",tag:"td"},{content:"50",tag:"td"}]},{cells:[{content:"France",tag:"td"},{content:"60",tag:"td"},{content:"40",tag:"td"}]}]}],["prc-block/chart-builder",{chartType:"bar",chartOrientation:"vertical",width:240,height:320,paddingLeft:20,paddingRight:20,colorValue:"social-trends-main",xDomainPadding:30,yAxisActive:!1,barWidth:24,barGroupOffset:28,labelsActive:!0,labelPositionDY:15}]],l=[["core/table",{className:"chart-builder-data-table",head:[{cells:[{content:"Year",tag:"th"},{content:"n1",tag:"th"},{content:"n2",tag:"th"}]}],body:[{cells:[{content:"2000",tag:"td"},{content:"20",tag:"td"},{content:"30",tag:"td"}]},{cells:[{content:"2010",tag:"td"},{content:"40",tag:"td"},{content:"50",tag:"td"}]},{cells:[{content:"2020",tag:"td"},{content:"70",tag:"td"},{content:"30",tag:"td"}]}]}],["prc-block/chart-builder",{isConvertedChart:!1,chartType:"line",width:420,height:356,paddingTop:20,paddingRight:20,paddingBottom:20,paddingLeft:30,xDomainPadding:1,yDomainPadding:0,xMinDomain:2e3,xMaxDomain:2020,xScale:"time",showYMinDomainLabel:!0,lineStrokeWidth:4,lineNodes:!0,nodeSize:4,nodeStroke:1,nodeFill:"white"}]],d=[["core/table",{className:"chart-builder-data-table",head:[{cells:[{content:"Independent variable",tag:"th"},{content:"n1",tag:"th"},{content:"n2",tag:"th"}]}],body:[{cells:[{content:"Germany",tag:"td"},{content:"40",tag:"td"},{content:"60",tag:"td"}]},{cells:[{content:"Spain",tag:"td"},{content:"50",tag:"td"},{content:"50",tag:"td"}]},{cells:[{content:"France",tag:"td"},{content:"60",tag:"td"},{content:"40",tag:"td"}]}]}],["prc-block/chart-builder",{isConvertedChart:!1,chartType:"stacked-bar",chartOrientation:"horizontal",colorValue:"social-trends-main",width:420,height:160,paddingLeft:100,xDomainPadding:16,xTickLabelTextAnchor:"end",xTickLabelVerticalAnchor:"middle",yAxisActive:!1,barWidth:24,barGroupOffset:28,labelsActive:!0,labelPositionDX:-20,labelPositionDY:-3,sortOrder:"reverse"}]],s=[["core/table",{className:"chart-builder-data-table",head:[{cells:[{content:"Independent variable",tag:"th"},{content:"n1",tag:"th"},{content:"n2",tag:"th"}]}],body:[{cells:[{content:"Germany",tag:"td"},{content:"40",tag:"td"},{content:"60",tag:"td"}]},{cells:[{content:"Spain",tag:"td"},{content:"50",tag:"td"},{content:"50",tag:"td"}]},{cells:[{content:"France",tag:"td"},{content:"60",tag:"td"},{content:"40",tag:"td"}]}]}],["prc-block/chart-builder",{width:240,height:320,paddingLeft:20,paddingRight:20,colorValue:"social-trends-main",xDomainPadding:30,yAxisActive:!1,barWidth:24,barGroupOffset:28,labelsActive:!0,labelPositionDY:15}]],b=[["core/table",{className:"chart-builder-data-table",head:[{cells:[{content:"x",tag:"th"},{content:"y1",tag:"th"},{content:"y2",tag:"th"}]}],body:[{cells:[{content:"0",tag:"td"},{content:"50",tag:"td"},{content:"",tag:"td"}]},{cells:[{content:"50",tag:"td"},{content:"40",tag:"td"},{content:"12",tag:"td"}]},{cells:[{content:"75",tag:"td"},{content:"",tag:"td"},{content:"33",tag:"td"}]},{cells:[{content:"100",tag:"td"},{content:"70",tag:"td"},{content:"80",tag:"td"}]}]}],["prc-block/chart-builder",{isConvertedChart:!1,chartType:"scatter",width:420,height:356,paddingTop:56,paddingRight:20,paddingBottom:20,paddingLeft:30,xDomainPadding:0,yDomainPadding:0,showYMinDomainLabel:!0,lineStrokeWidth:4,lineNodes:!0,nodeSize:4,nodeStroke:1,nodeFill:"inherit"}]],h=[["core/table",{className:"chart-builder-data-table",head:[{cells:[{content:"Independent variable",tag:"th"},{content:"n1",tag:"th"},{content:"n2",tag:"th"}]}],body:[{cells:[{content:"Germany",tag:"td"},{content:"30",tag:"td"},{content:"60",tag:"td"}]},{cells:[{content:"Spain",tag:"td"},{content:"50",tag:"td"},{content:"70",tag:"td"}]},{cells:[{content:"France",tag:"td"},{content:"60",tag:"td"},{content:"40",tag:"td"}]}]}],["prc-block/chart-builder",{isConvertedChart:!1,chartType:"dot-plot",width:420,height:200,paddingTop:36,paddingLeft:100,paddingBottom:36,paddingRight:20,xDomainPadding:28,xTickLabelVerticalAnchor:"middle",xAxisStroke:"#756f6b00",xGridStroke:"#d1d1d1",yAxisStroke:"#756f6b",yGridStroke:"#00000000",yDomainPadding:0,showYMinDomainLabel:!0,yTickMarksActive:!0,yTickExact:"0,50,100",yTickLabelVerticalAnchor:"middle",yMultiLineTickLabelsBreak:3,lineStrokeWidth:4,lineNodes:!0,nodeSize:4,nodeStroke:1,tooltipActive:!1,tooltipCategoryActive:!1,labelsActive:!0,labelPositionDX:16,legendActive:!0,legendMarkerStyle:"circle",legendBorderStroke:"#24202100"}]]},770:function(t,e,a){"use strict";a.r(e);var c=a(8),n=a(2),r=a(7),o=a(9),i=a(5),l=a(3),d=a(4),s=React.createElement(l.SVG,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"60 0 512 512",preserveAspectRatio:"xMidYMid meet",height:20,width:20},React.createElement(l.Path,{d:"M633.9 483.4C640.9 488.9 642 498.1 636.6 505.9C631.1 512.9 621 514 614.1 508.6L6.086 28.56C-.8493 23.08-2.033 13.02 3.443 6.086C8.918-.8493 18.98-2.033 25.91 3.443L633.9 483.4zM605.5 268.3C595.3 292.9 577.2 325.3 551.6 357.3L526.5 337.5C550.1 307.1 566.8 278.1 576 256C562.7 223.1 533.9 175.1 490.8 136C447.7 95.99 390.4 64 320 64C280.2 64 244.6 74.21 213.4 90.31L186.1 68.78C224 46.8 268.8 31.1 320 31.1C400.8 31.1 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3L605.5 268.3zM88.39 154.7L113.5 174.5C89.86 204 73.23 233.9 63.1 255.1C77.33 288 106.1 336 149.2 376C192.3 416 249.6 448 319.1 448C359.8 448 395.4 437.8 426.6 421.7L453.9 443.2C415.1 465.2 371.2 480 319.1 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44.73 219.1 62.8 186.7 88.39 154.7L88.39 154.7zM191.1 255.1C191.1 249.7 192.5 243.6 193.3 237.5L224.2 261.9C227.2 312.2 268.1 352 319.1 352C325.6 352 331.2 351.5 336.5 350.6L367.4 374.9C352.7 380.8 336.7 384 319.1 384C249.3 384 191.1 326.7 191.1 255.1zM448 255.1C448 262.3 447.5 268.4 446.7 274.5L415.8 250.1C412.8 199.8 371 159.1 319.1 159.1C314.4 159.1 308.8 160.5 303.5 161.4L272.6 137.1C287.3 131.2 303.3 127.1 319.1 127.1C390.7 127.1 448 185.3 448 255.1V255.1z"})),b=React.createElement(l.SVG,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"60 0 512 512",preserveAspectRatio:"xMidYMid meet",height:20,width:20},React.createElement(l.Path,{d:"M416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256zM288 160C234.1 160 192 202.1 192 256C192 309 234.1 352 288 352C341 352 384 309 384 256C384 202.1 341 160 288 160zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM32 256C45.33 288 74.13 336 117.2 376C160.3 416 217.6 448 288 448C358.4 448 415.7 416 458.8 376C501.9 336 530.7 288 544 256C530.7 223.1 501.9 175.1 458.8 136C415.7 95.99 358.4 64 288 64C217.6 64 160.3 95.99 117.2 136C74.13 175.1 45.33 223.1 32 256V256z"})),h=function(t){var e=t.attributes,a=t.setAttributes,c=t.clientId,r=e.id;Object(d.useEffect)((function(){r||a({id:c})}),[]);var h=[["core/table",{className:"chart-builder-data-table",head:[{cells:[{content:"x",tag:"th"},{content:"y",tag:"th"}]}],body:[{cells:[{content:"",tag:"td"},{content:"",tag:"td"}]},{cells:[{content:"",tag:"td"},{content:"",tag:"td"}]}]}],["prc-block/chart-builder",{isConvertedChart:e.isConvertedChart}]],C=Object(i.useBlockProps)();return React.createElement("div",C,React.createElement(i.InspectorControls,null,React.createElement(l.PanelBody,null,React.createElement(l.ToggleControl,{label:Object(n.__)("Hide table"),help:e.hideTable?"Table hidden in editor view.":"Table visible in editor view.",checked:e.hideTable,onChange:function(){var t=Object(o.select)("core/block-editor").getBlocks(c).find((function(t){return"core/table"===t.name}));e.hideTable?Object(o.dispatch)("core/editor").updateBlockAttributes(t.clientId,{className:"chart-builder-data-table"}):Object(o.dispatch)("core/editor").updateBlockAttributes(t.clientId,{className:"chart-builder-data-table--hidden"}),a({hideTable:!e.hideTable})}}))),React.createElement(i.BlockControls,null,React.createElement(l.ToolbarGroup,null,React.createElement(l.ToolbarButton,{name:"hide-table",icon:e.hideTable?b:s,title:e.hideTable?Object(n.__)("Show table in editor view"):Object(n.__)("Hide table in editor view"),onClick:function(){var t=Object(o.select)("core/block-editor").getBlocks(c).find((function(t){return"core/table"===t.name}));e.hideTable?Object(o.dispatch)("core/editor").updateBlockAttributes(t.clientId,{className:"chart-builder-data-table"}):Object(o.dispatch)("core/editor").updateBlockAttributes(t.clientId,{className:"chart-builder-data-table--hidden"}),a({hideTable:!e.hideTable})}}))),React.createElement(i.InnerBlocks,{template:h,templateLock:"all"}))};var C=a(300),p=a(73),g=React.createElement(l.SVG,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"0 0 512 512",preserveAspectRatio:"xMidYMid meet",height:20},React.createElement(l.Path,{d:"M448 272C448 298.5 426.5 320 400 320H48C21.49 320 0 298.5 0 272V240C0 213.5 21.49 192 48 192H400C426.5 192 448 213.5 448 240V272zM400 208H48C30.33 208 16 222.3 16 240V272C16 289.7 30.33 304 48 304H400C417.7 304 432 289.7 432 272V240C432 222.3 417.7 208 400 208zM256 432C256 458.5 234.5 480 208 480H48C21.49 480 0 458.5 0 432V400C0 373.5 21.49 352 48 352H208C234.5 352 256 373.5 256 400V432zM208 368H48C30.33 368 16 382.3 16 400V432C16 449.7 30.33 464 48 464H208C225.7 464 240 449.7 240 432V400C240 382.3 225.7 368 208 368zM48 160C21.49 160 0 138.5 0 112V80C0 53.49 21.49 32 48 32H336C362.5 32 384 53.49 384 80V112C384 138.5 362.5 160 336 160H48zM368 112V80C368 62.33 353.7 48 336 48H48C30.33 48 16 62.33 16 80V112C16 129.7 30.33 144 48 144H336C353.7 144 368 129.7 368 112z"})),u=React.createElement(l.SVG,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"0 0 512 512",preserveAspectRatio:"xMidYMid meet",height:20},React.createElement(l.Path,{class:"fa-primary",d:"M384 112C384 138.5 362.5 160 336 160H48C21.49 160 0 138.5 0 112V80C0 53.49 21.49 32 48 32H336C362.5 32 384 53.49 384 80V112zM256 432C256 458.5 234.5 480 208 480H48C21.49 480 0 458.5 0 432V400C0 373.5 21.49 352 48 352H208C234.5 352 256 373.5 256 400V432z"}),React.createElement(l.Path,{class:"fa-secondary","fill-opacity":"0.4",d:"M48 320C21.49 320 0 298.5 0 272V240C0 213.5 21.49 192 48 192H400C426.5 192 448 213.5 448 240V272C448 298.5 426.5 320 400 320H48z"})),m=React.createElement(l.SVG,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"0 0 512 512",preserveAspectRatio:"xMidYMid meet",height:20},React.createElement(l.Path,{className:"fa-primary",d:"M400 96C426.5 96 448 117.5 448 144V432C448 458.5 426.5 480 400 480H368C341.5 480 320 458.5 320 432V144C320 117.5 341.5 96 368 96H400zM80 224C106.5 224 128 245.5 128 272V432C128 458.5 106.5 480 80 480H48C21.49 480 0 458.5 0 432V272C0 245.5 21.49 224 48 224H80z"}),React.createElement(l.Path,{className:"fa-secondary",fillOpacity:"0.4",d:"M160 80C160 53.49 181.5 32 208 32H240C266.5 32 288 53.49 288 80V432C288 458.5 266.5 480 240 480H208C181.5 480 160 458.5 160 432V80z"})),w=React.createElement(l.SVG,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"0 0 512 512",preserveAspectRatio:"xMidYMid meet",height:20},React.createElement(l.Path,{d:"M464 64C490.5 64 512 85.49 512 112V176C512 202.5 490.5 224 464 224H48C21.49 224 0 202.5 0 176V112C0 85.49 21.49 64 48 64H464zM464 112H320V176H464V112zM464 288C490.5 288 512 309.5 512 336V400C512 426.5 490.5 448 464 448H48C21.49 448 0 426.5 0 400V336C0 309.5 21.49 288 48 288H464zM464 336H192V400H464V336z"})),y=React.createElement(l.SVG,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"0 -512 512 512",preserveAspectRatio:"xMidYMid meet",height:20},React.createElement(l.Path,{d:"M464 64C490.5 64 512 85.49 512 112V176C512 202.5 490.5 224 464 224H48C21.49 224 0 202.5 0 176V112C0 85.49 21.49 64 48 64H464zM464 112H320V176H464V112zM464 288C490.5 288 512 309.5 512 336V400C512 426.5 490.5 448 464 448H48C21.49 448 0 426.5 0 400V336C0 309.5 21.49 288 48 288H464zM464 336H192V400H464V336z",transform:"rotate(270)"})),_=React.createElement(l.SVG,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"0 0 512 512",preserveAspectRatio:"xMidYMid meet",height:20},React.createElement(l.Path,{d:"M32 400C32 426.5 53.49 448 80 448H496C504.8 448 512 455.2 512 464C512 472.8 504.8 480 496 480H80C35.82 480 0 444.2 0 400V48C0 39.16 7.164 32 16 32C24.84 32 32 39.16 32 48V400zM331.3 299.3C325.1 305.6 314.9 305.6 308.7 299.3L223.1 214.6L123.3 315.3C117.1 321.6 106.9 321.6 100.7 315.3C94.44 309.1 94.44 298.9 100.7 292.7L212.7 180.7C218.9 174.4 229.1 174.4 235.3 180.7L320 265.4L452.7 132.7C458.9 126.4 469.1 126.4 475.3 132.7C481.6 138.9 481.6 149.1 475.3 155.3L331.3 299.3z"})),k=React.createElement(l.SVG,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"0 0 512 512",preserveAspectRatio:"xMidYMid meet",height:20},React.createElement(l.Path,{d:"M32 400C32 426.5 53.49 448 80 448H496C504.8 448 512 455.2 512 464C512 472.8 504.8 480 496 480H80C35.82 480 0 444.2 0 400V48C0 39.16 7.164 32 16 32C24.84 32 32 39.16 32 48V400zM320 192L359.6 152.4C372.7 139.3 394.4 140.1 406.5 154.2L468.4 226.5C475.9 235.2 480 246.3 480 257.8V352C480 369.7 465.7 384 448 384H128C110.3 384 96 369.7 96 352V243.9C96 231.2 101.1 218.9 110.1 209.9L201.4 118.6C213.9 106.1 234.1 106.1 246.6 118.6L320 192zM224 141.3L132.7 232.6C129.7 235.6 128 239.6 128 243.9V352H448V257.8C448 253.9 446.6 250.2 444.1 247.3L382.2 175.1L342.6 214.6C336.6 220.6 328.5 223.1 320 223.1C311.5 223.1 303.4 220.6 297.4 214.6L224 141.3z"})),f=React.createElement(l.SVG,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"0 0 512 512",preserveAspectRatio:"xMidYMid meet",height:20},React.createElement(l.Path,{d:"M32 400C32 426.5 53.49 448 80 448H496C504.8 448 512 455.2 512 464C512 472.8 504.8 480 496 480H80C35.82 480 0 444.2 0 400V48C0 39.16 7.164 32 16 32C24.84 32 32 39.16 32 48V400zM168 160C168 146.7 178.7 136 192 136C205.3 136 216 146.7 216 160C216 173.3 205.3 184 192 184C178.7 184 168 173.3 168 160zM312 256C312 269.3 301.3 280 288 280C274.7 280 264 269.3 264 256C264 242.7 274.7 232 288 232C301.3 232 312 242.7 312 256zM360 320C360 306.7 370.7 296 384 296C397.3 296 408 306.7 408 320C408 333.3 397.3 344 384 344C370.7 344 360 333.3 360 320zM440 128C440 141.3 429.3 152 416 152C402.7 152 392 141.3 392 128C392 114.7 402.7 104 416 104C429.3 104 440 114.7 440 128zM136 320C136 306.7 146.7 296 160 296C173.3 296 184 306.7 184 320C184 333.3 173.3 344 160 344C146.7 344 136 333.3 136 320z"})),O=React.createElement(l.SVG,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"0 0 512 512",preserveAspectRatio:"xMidYMid meet",height:20},React.createElement(l.Path,{className:"fa-primary",d:"M96 96C96 122.5 74.51 144 48 144C21.49 144 0 122.5 0 96C0 69.49 21.49 48 48 48C74.51 48 96 69.49 96 96zM96 256C96 282.5 74.51 304 48 304C21.49 304 0 282.5 0 256C0 229.5 21.49 208 48 208C74.51 208 96 229.5 96 256zM0 416C0 389.5 21.49 368 48 368C74.51 368 96 389.5 96 416C96 442.5 74.51 464 48 464C21.49 464 0 442.5 0 416z"}),React.createElement(l.Path,{className:"fa-secondary",fillOpacity:"0.4",d:"M256 96C256 122.5 234.5 144 208 144C181.5 144 160 122.5 160 96C160 69.49 181.5 48 208 48C234.5 48 256 69.49 256 96zM256 256C256 282.5 234.5 304 208 304C181.5 304 160 282.5 160 256C160 229.5 181.5 208 208 208C234.5 208 256 229.5 256 256zM160 416C160 389.5 181.5 368 208 368C234.5 368 256 389.5 256 416C256 442.5 234.5 464 208 464C181.5 464 160 442.5 160 416z"})),V=React.createElement(l.SVG,{xmlns:"http://www.w3.org/2000/SVG",viewBox:"0 0 448 512",preserveAspectRatio:"xMidYMid meet",height:20},React.createElement(l.Path,{d:"M240 32C266.5 32 288 53.49 288 80V432C288 458.5 266.5 480 240 480H208C181.5 480 160 458.5 160 432V80C160 53.49 181.5 32 208 32H240zM240 48H208C190.3 48 176 62.33 176 80V432C176 449.7 190.3 464 208 464H240C257.7 464 272 449.7 272 432V80C272 62.33 257.7 48 240 48zM80 224C106.5 224 128 245.5 128 272V432C128 458.5 106.5 480 80 480H48C21.49 480 0 458.5 0 432V272C0 245.5 21.49 224 48 224H80zM80 240H48C30.33 240 16 254.3 16 272V432C16 449.7 30.33 464 48 464H80C97.67 464 112 449.7 112 432V272C112 254.3 97.67 240 80 240zM320 144C320 117.5 341.5 96 368 96H400C426.5 96 448 117.5 448 144V432C448 458.5 426.5 480 400 480H368C341.5 480 320 458.5 320 432V144zM336 144V432C336 449.7 350.3 464 368 464H400C417.7 464 432 449.7 432 432V144C432 126.3 417.7 112 400 112H368C350.3 112 336 126.3 336 144z"})),x=[{name:"cbarea",title:Object(n.__)("Area Chart"),keywords:[Object(n.__)("area"),Object(n.__)("chart"),Object(n.__)("area chart")],description:Object(n.__)("Create an area chart."),icon:k,attributes:{chartType:"area"},innerBlocks:p.a},{name:"cbBar",title:"Bar Chart",keywords:[Object(n.__)("bar"),Object(n.__)("chart"),Object(n.__)("bar chart"),Object(n.__)("single bar")],description:Object(n.__)("Create a bar chart."),icon:g,attributes:{chartType:"bar"},innerBlocks:p.b},{name:"cbColumn",title:"Column Chart",keywords:[Object(n.__)("column"),Object(n.__)("chart"),Object(n.__)("column chart"),Object(n.__)("single column")],description:Object(n.__)("Create a column chart."),icon:V,attributes:{chartType:"column"},innerBlocks:p.c},{name:"cbDotPlot",title:Object(n.__)("Dot Plot Chart"),keywords:[Object(n.__)("dot"),Object(n.__)("chart"),Object(n.__)("dot plot"),Object(n.__)("plot")],description:Object(n.__)("Create a dot plot chart."),icon:O,attributes:{chartType:"dot-plot"},innerBlocks:p.d},{name:"cbGroupedBar",title:"Grouped Bar Chart",keywords:[Object(n.__)("bar"),Object(n.__)("chart"),Object(n.__)("bar chart"),Object(n.__)("grouped bar")],description:Object(n.__)("Create a grouped bar chart."),icon:u,attributes:{chartType:"grouped-bar"},innerBlocks:p.e},{name:"cbGroupedColumn",title:"Grouped Column Chart",keywords:[Object(n.__)("column"),Object(n.__)("chart"),Object(n.__)("column chart"),Object(n.__)("grouped column")],description:Object(n.__)("Create a grouped column chart."),icon:m,attributes:{chartType:"grouped-column"},innerBlocks:p.f},{name:"cbLine",title:Object(n.__)("Line Chart"),keywords:[Object(n.__)("line"),Object(n.__)("chart"),Object(n.__)("line chart")],description:Object(n.__)("Create a line chart."),icon:_,attributes:{chartType:"line"},innerBlocks:p.g},{name:"cbScatter",title:Object(n.__)("Scatter Plot Chart"),keywords:[Object(n.__)("scatter"),Object(n.__)("chart"),Object(n.__)("scatter plot"),Object(n.__)("plot")],description:Object(n.__)("Create a scatter plot chart."),icon:f,attributes:{chartType:"scatter"},innerBlocks:p.h},{name:"cbStackedBar",title:"Stacked Bar Chart",keywords:[Object(n.__)("bar"),Object(n.__)("chart"),Object(n.__)("stacked bar")],description:Object(n.__)("Create a stacked bar chart."),icon:w,attributes:{chartType:"stacked-bar"},innerBlocks:p.i},{name:"cbStackedColumn",title:"Stacked Column Chart",keywords:[Object(n.__)("column"),Object(n.__)("chart"),Object(n.__)("stacked column")],description:Object(n.__)("Create a stacked column chart."),icon:y,attributes:{chartType:"stacked-column"},innerBlocks:p.j}];x.forEach((function(t){t.isActive||(t.isActive=function(t,e){return!!t.chartType&&t.chartType===e.chartType})}));var v=x;function M(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);e&&(c=c.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,c)}return a}function j(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?M(Object(a),!0).forEach((function(e){Object(c.a)(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):M(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var H=C.name,S={title:Object(n.__)("PRC Chart Builder"),description:Object(n.__)("Create a custom data-driven chart."),category:"widgets",icon:"chart-area",keywords:[Object(n.__)("chart")],supports:{html:!1},example:{attributes:{chartType:"bar",className:"is-style-bar"}},transforms:{from:[{type:"block",blocks:["core/table"],transform:function(t){return t.className="chart-builder-data-table",Object(r.createBlock)("prc-block/chart-builder-data-wrapper",{transformed:!0,isConvertedChart:!0,tableHead:t.head,tableBody:t.body},[Object(r.createBlock)("core/table",j({},t)),Object(r.createBlock)("prc-block/chart-builder",{isConvertedChart:!0})])}}],to:[{type:"block",blocks:["core/table"],transform:function(t,e){var a=e.filter((function(t){return"core/table"===t.name}));return Object(r.createBlock)("core/table",a.attributes)}}]},edit:h,save:function(t){return React.createElement(i.InnerBlocks.Content,null)},variations:v};Object(r.registerBlockType)(H,j(j({},C),S))},8:function(t,e,a){"use strict";function c(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}a.d(e,"a",(function(){return c}))},9:function(t,e){t.exports=window.wp.data}},[[685,0]]]);
//# sourceMappingURL=chart-builder-data-wrapper-5953e7da.js.map