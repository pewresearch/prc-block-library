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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[8],{0:function(e,a){e.exports=React},11:function(e,a){e.exports=wp.domReady},117:function(e,a){e.exports=wp.apiFetch},147:function(e,a,t){t(23),e.exports=t(148)},148:function(e,a,t){"use strict";t.r(a);var n=t(75),l=t(101),o=t(28),r=t(11),c=t.n(r),u=t(117),i=t.n(u),f=t(17),s=[{key:"af",value:"af",flag:"af",text:"Afghanistan"},{key:"ax",value:"ax",flag:"ax",text:"Aland Islands"},{key:"al",value:"al",flag:"al",text:"Albania"},{key:"dz",value:"dz",flag:"dz",text:"Algeria"},{key:"as",value:"as",flag:"as",text:"American Samoa"},{key:"ad",value:"ad",flag:"ad",text:"Andorra"},{key:"ao",value:"ao",flag:"ao",text:"Angola"},{key:"ai",value:"ai",flag:"ai",text:"Anguilla"},{key:"ag",value:"ag",flag:"ag",text:"Antigua"},{key:"ar",value:"ar",flag:"ar",text:"Argentina"},{key:"am",value:"am",flag:"am",text:"Armenia"},{key:"aw",value:"aw",flag:"aw",text:"Aruba"},{key:"au",value:"au",flag:"au",text:"Australia"},{key:"at",value:"at",flag:"at",text:"Austria"},{key:"az",value:"az",flag:"az",text:"Azerbaijan"},{key:"bs",value:"bs",flag:"bs",text:"Bahamas"},{key:"bh",value:"bh",flag:"bh",text:"Bahrain"},{key:"bd",value:"bd",flag:"bd",text:"Bangladesh"},{key:"bb",value:"bb",flag:"bb",text:"Barbados"},{key:"by",value:"by",flag:"by",text:"Belarus"},{key:"be",value:"be",flag:"be",text:"Belgium"},{key:"bz",value:"bz",flag:"bz",text:"Belize"},{key:"bj",value:"bj",flag:"bj",text:"Benin"}],g=function(e){e.restrictToTermId;var a=Object(o.useState)(!1),t=Object(n.a)(a,2),r=t[0],c=t[1],u=Object(o.useState)(!1),g=Object(n.a)(u,2);g[0],g[1];return Object(o.useEffect)((function(){console.log("fetch data");var e=Object(f.addQueryArgs)("/wp/v2/topic",{});console.log("...path",e),i()({path:e}).then((function(e){console.log(e),c(e)})).catch((function(e){return console.error(e)}))}),[]),React.createElement(l.a,{onSubmit:function(e){return console.log(e)}},React.createElement(l.a.Group,null,React.createElement(l.a.Dropdown,{placeholder:"Start typing or click arrow",search:!0,selection:!0,options:s,loading:!1===r,onSearchChange:function(e){return console.log("search...",e)},onChange:function(e){return console.log("onChange",e)}}),React.createElement(l.a.Button,{content:"Go"})))};c()((function(){var e=document.querySelectorAll(".js-react-topic-index-search-field");e&&e.forEach((function(e){Object(o.render)(React.createElement(g,{restrictToTermId:null}),e)}))}))},17:function(e,a){e.exports=wp.url},28:function(e,a){e.exports=wp.element},74:function(e,a){e.exports=ReactDOM}},[[147,0,1,9]]]);
//# sourceMappingURL=topic-index-search-field-84dabafa.js.map