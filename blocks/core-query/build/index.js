!function(){"use strict";var e=window.wp.element,t=window.wp.blocks,r=window.wp.components;const o=[["core/post-template",{},[["prc-block/story-item",{imageSlot:"left",imageSize:"A3"}]]],["core/group",{layout:{type:"default"},style:{spacing:{padding:{top:"var:preset|spacing|40",right:"0",bottom:"var:preset|spacing|40",left:"0"}},elements:{link:{color:{text:"var:preset|color|text-color"}}}}},[["core/paragraph",{align:"right",style:{typography:{textTransform:"uppercase"}},textColor:"slate",fontSize:"small-label",fontFamily:"sans-serif",content:'<a href="https://www.pewresearch.org/publications">All Publications ></a>'}]]]],s={name:"stub-query",title:"Stub Query",description:'Display a list of Stub objects as Story Items configured in the style of a "Publication Listing".',attributes:{query:{perPage:5,pages:1,offset:0,postType:"stub",categoryIds:[],tagIds:[],order:"desc",orderBy:"date",author:"",search:"",sticky:"exclude",inherit:!1,isStoryItemLoop:!0}},allowedControls:["order","taxQuery","search"],isActive:e=>e.query.isStoryItemLoop,innerBlocks:o,scope:["inserter"]},i={name:"pub-listing-query",title:"Publication Listing Query",description:"Query published, parent posts.",attributes:{query:{perPage:10,pages:1,offset:0,categoryIds:[],tagIds:[],order:"desc",orderBy:"date",author:"",search:"",sticky:"include",inherit:!1,isPubListingQuery:!0}},allowedControls:["order","taxQuery","search","postType"],isActive:e=>e.query.isPubListingQuery,innerBlocks:o,scope:["inserter"]},a={name:"story-item-query",title:"Story Item",scope:["block"],icon:()=>(0,e.createElement)(r.SVG,{id:"Layer_2","data-name":"Layer 2",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 48 48",width:"48px",height:"48px"},(0,e.createElement)(r.G,{id:"Layer_1-2","data-name":"Layer 1",focusable:"false"},(0,e.createElement)(r.Rect,{y:"23",width:"30",height:"1"}),(0,e.createElement)(r.Rect,{y:"29",width:"30",height:"1"}),(0,e.createElement)(r.Rect,{y:"26",width:"12",height:"1"}),(0,e.createElement)(r.Rect,{width:"34",height:"17.7"}),(0,e.createElement)(r.Rect,{y:"19.14",width:"34",height:"2.11"}))),attributes:{className:"has-story-items",query:{perPage:5,pages:1,offset:0,postType:"post",categoryIds:[],tagIds:[],order:"desc",orderBy:"date",author:"",search:"",sticky:"exclude",inherit:!1}},allowedControls:["inherit","order","postType","taxQuery","search"],innerBlocks:o};(0,t.registerBlockVariation)("core/query",s),(0,t.registerBlockVariation)("core/query",i),(0,t.registerBlockVariation)("core/query",a)}();