(()=>{"use strict";const e=window.wp.blocks;window.wp.hooks,window.wp.compose,window.wp.data,(0,e.registerBlockVariation)("core/query",{name:"prc-block/pub-listing-query",title:"Publication Listing Query",description:'Query posts in the style of a "Publication Listing".',attributes:{namespace:"prc-block/pub-listing-query",query:{perPage:10,postType:"post",order:"desc",orderBy:"date",inherit:!0,isPubListingQuery:!0},enhancedPagination:!0},allowedControls:["order","taxQuery","search","author","sticky","inherit"],isActive:({query:e})=>e.isPubListingQuery,innerBlocks:[["core/post-template",{},[["prc-block/story-item",{imageSlot:"left",imageSize:"A3",metaTaxonomy:"formats"}]]],["core/query-pagination",{showLabel:!0}]],scope:["inserter","transform"]})})();