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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[12],{0:function(e,t){e.exports=React},10:function(e,t){e.exports=wp.domReady},11:function(e,t){e.exports=wp.element},121:function(e,t){e.exports=wp.htmlEntities},13:function(e,t){e.exports=wp.url},158:function(e,t,n){n(18),e.exports=n(159)},159:function(e,t,n){"use strict";n.r(t);var c=n(24),r=n(102),o=n(11),a=n(10),i=n.n(a),u=n(74),s=n.n(u),l=n(13),p=n(121),d=function(e){var t=e.restrictToTermId,n=void 0===t?0:t,a=Object(o.useState)([{key:"default",value:null,text:"Loading values...",disabled:!0}]),i=Object(c.a)(a,2),u=i[0],d=i[1],f=Object(o.useState)(!1),b=Object(c.a)(f,2),w=b[0],h=b[1],m=Object(o.useState)(!0),j=Object(c.a)(m,2),v=j[0],O=j[1],x=Object(o.useState)(""),y=Object(c.a)(x,2),g=y[0],E=y[1],S=Object(o.useState)(!1),k=Object(c.a)(S,2),R=k[0],T=k[1];Object(o.useEffect)((function(){var e={per_page:25};""!==g&&(e.search=g),0!==n&&""!==n&&(e.parent=n);var t=Object(l.addQueryArgs)("/wp/v2/topic",e);s()({path:t}).then((function(e){var t=e.map((function(e){return{key:e.id,value:e.link,text:Object(p.decodeEntities)(e.name)}}));d(t)})).catch((function(e){return console.error(e)})).finally((function(){return O(!1)}))}),[g]);return React.createElement(r.a,{onSubmit:function(){h(!0),window.location=R}},React.createElement(r.a.Group,null,React.createElement(r.a.Dropdown,{placeholder:"Start typing or click arrow",search:!0,selection:!0,options:u,loading:v,onSearchChange:function(e,t){var n=t.searchQuery;return E(n)},onChange:function(e,t){var n=t.value;return T(n)},style:{width:"200px"}}),React.createElement(r.a.Button,{content:"Go",type:"submit",disabled:!1===R,loading:w})))};i()((function(){var e=document.querySelectorAll(".js-react-topic-index-search-field");e&&e.forEach((function(e){var t=e.getAttribute("data-term-id");console.log(e,t),Object(o.render)(React.createElement(d,{restrictToTermId:t}),e)}))}))},63:function(e,t){e.exports=ReactDOM},74:function(e,t){e.exports=wp.apiFetch}},[[158,0,1,2]]]);
//# sourceMappingURL=topic-index-search-field-4a6a809d.js.map