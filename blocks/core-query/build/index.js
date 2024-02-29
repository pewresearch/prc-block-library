(()=>{"use strict";const e=window.React,t=window.wp.blocks,r=window.wp.hooks,o=window.wp.compose,i=window.wp.data,n=(window.wp.components,"prc-block/pub-listing-query"),a={name:n,title:"Publication Listing Query",description:'Query posts in the style of a "Publication Listing".',attributes:{namespace:n,query:{perPage:10,postType:"post",order:"desc",orderBy:"date",inherit:!0,isPubListingQuery:!0},enhancedPagination:!0},allowedControls:["order","taxQuery","search","author","sticky","inherit"],isActive:({query:e})=>e.isPubListingQuery,innerBlocks:[["core/post-template",{},[["prc-block/story-item",{imageSlot:"left",imageSize:"A3",metaTaxonomy:"formats"}]]],["core/query-pagination",{showLabel:!0}]],scope:["inserter","transform"]};(0,t.registerBlockVariation)("core/query",a),(0,r.addFilter)("editor.BlockEdit","prc-block-pub-listing-query-context-area-watcher",(0,o.createHigherOrderComponent)((t=>r=>{const{attributes:o,name:a,context:c,isSelected:s}=r,l=o?.namespace;if("core/query"!==a||l!==n)return(0,e.createElement)(t,{...r});const u=(0,i.useSelect)((e=>e("prc-platform/block-area-context").getPostIds())),p=o.query?.exclude||[];return o.query.exclude=[...u,...p],(0,e.createElement)(t,{...r})}),"withBlockAreaContextWatcher"))})();