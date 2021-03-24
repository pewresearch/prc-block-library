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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[8],{0:function(e,t){e.exports=React},11:function(e,t){e.exports=wp.domReady},117:function(e,t){e.exports=wp.apiFetch},118:function(e,t){e.exports=wp.htmlEntities},148:function(e,t,n){n(24),e.exports=n(149)},149:function(e,t,n){"use strict";n.r(t);var c=n(46),r=n(101),o=n(22),a=n(11),i=n.n(a),u=n(117),s=n.n(u),l=n(17),p=n(118),d=function(e){var t=e.restrictToTermId,n=void 0===t?0:t,a=Object(o.useState)([{key:"default",value:null,text:"Loading values...",disabled:!0}]),i=Object(c.a)(a,2),u=i[0],d=i[1],f=Object(o.useState)(!1),b=Object(c.a)(f,2),w=b[0],h=b[1],m=Object(o.useState)(!0),j=Object(c.a)(m,2),v=j[0],O=j[1],x=Object(o.useState)(""),y=Object(c.a)(x,2),g=y[0],E=y[1],S=Object(o.useState)(!1),k=Object(c.a)(S,2),R=k[0],T=k[1];Object(o.useEffect)((function(){var e={per_page:25};""!==g&&(e.search=g),0!==n&&""!==n&&(e.parent=n);var t=Object(l.addQueryArgs)("/wp/v2/topic",e);s()({path:t}).then((function(e){var t=e.map((function(e){return{key:e.id,value:e.link,text:Object(p.decodeEntities)(e.name)}}));d(t)})).catch((function(e){return console.error(e)})).finally((function(){return O(!1)}))}),[g]);return React.createElement(r.a,{onSubmit:function(){h(!0),window.location=R}},React.createElement(r.a.Group,null,React.createElement(r.a.Dropdown,{placeholder:"Start typing or click arrow",search:!0,selection:!0,options:u,loading:v,onSearchChange:function(e,t){var n=t.searchQuery;return E(n)},onChange:function(e,t){var n=t.value;return T(n)},style:{width:"200px"}}),React.createElement(r.a.Button,{content:"Go",type:"submit",disabled:!1===R,loading:w})))};i()((function(){var e=document.querySelectorAll(".js-react-topic-index-search-field");e&&e.forEach((function(e){var t=e.getAttribute("data-term-id");console.log(e,t),Object(o.render)(React.createElement(d,{restrictToTermId:t}),e)}))}))},17:function(e,t){e.exports=wp.url},22:function(e,t){e.exports=wp.element},75:function(e,t){e.exports=ReactDOM}},[[148,0,1,9]]]);
//# sourceMappingURL=topic-index-search-field-000caed1.js.map