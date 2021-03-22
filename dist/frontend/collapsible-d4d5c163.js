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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[1],{1:function(e,t){e.exports=React},45:function(e,t){e.exports=wp.element},7:function(e,t){e.exports=wp.domReady},70:function(e,t){e.exports=wp.i18n},84:function(e,t,n){n(13),e.exports=n(85)},85:function(e,t,n){"use strict";n.r(t);var a=n(72),c=n(64),r=n(73),l=n(7),i=n.n(l),o=n(70),s=n(45),u=function(e){var t=e.title,n=e.style,l=e.children,i=e.defaultOpen,u=void 0!==i&&i,p=Object(s.useState)(u),f=Object(a.a)(p,2),m=f[0],d=f[1],y=m?"caret down":"caret right";return"is-style-alternate"===n&&(y=m?"minus":"plus"),React.createElement(c.a,{styled:!0},React.createElement(c.a.Title,{active:!0===m,index:0,onClick:function(){d(!m)}},React.createElement(s.Fragment,null,"is-style-alternate"!==n&&React.createElement(r.a,{name:y,onClick:function(){d(!m)}}),Object(o.__)(t),"is-style-alternate"===n&&React.createElement(r.a,{name:y,style:{marginLeft:"0.5em"},onClick:function(){d(!m)}}))),React.createElement(c.a.Content,{active:!0===m},React.createElement(s.RawHTML,null,l)))};i()((function(){var e=document.querySelectorAll(".js-react-collapsible");1<=e.length&&e.forEach((function(e){var t=e.innerHTML,n=e.getAttribute("data-title"),a=e.getAttribute("data-style");Object(s.render)(React.createElement(u,{title:n,style:a},t),e)}))}))}},[[84,0,7]]]);
//# sourceMappingURL=collapsible-d4d5c163.js.map