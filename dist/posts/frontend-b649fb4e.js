/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2020 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibrarypostsJsonp=window.wpackioprcBlocksLibrarypostsJsonp||[]).push([[3],{0:function(t,e){t.exports=React},10:function(t,e){t.exports=wp.components},13:function(t,e){t.exports=wp.blockEditor},289:function(t,e,r){r(103),t.exports=r(290)},290:function(t,e,r){"use strict";r.r(e);var o=r(22),n=r(26),a=r(11),s=r(24),c=r(23),i=r(12),p=r(19),u=r(5),l=r(25),f=r(37),d=r(53),m=r(52);function b(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,o=Object(i.a)(t);if(e){var n=Object(i.a)(this).constructor;r=Reflect.construct(o,arguments,n)}else r=o.apply(this,arguments);return Object(c.a)(this,r)}}var g=function(t){Object(s.a)(r,t);var e=b(r);function r(t){var n;return Object(o.a)(this,r),n=e.call(this,t),Object(p.a)(Object(a.a)(n),"componentDidMount",(function(){var t=Object(a.a)(n).setState;Object(l.b)(n.props.per_page,n.props.formatID,n.props.programID,"formats",!0).then((function(e){t({posts:e})})),setInterval((function(){Object(l.b)(n.props.per_page,n.props.formatID,n.props.programID,"formats",!0).then((function(e){t({posts:e})}))}),n.state.fetchInterval)})),n.state={posts:!1,fetchInterval:5e4},n.setState=n.setState.bind(Object(a.a)(n)),n}return Object(n.a)(r,[{key:"render",value:function(){var t=this.props;t.posts=this.state.posts,t.disableLiink=!1;var e=!1;void 0!==this.props.style&&this.props.style.includes("is-style-fact-tank")&&(e=!0);var r=!1;void 0!==this.props.style&&this.props.style.includes("is-style-list")&&(r=!0);var o=!1;return void 0!==this.props.style&&this.props.style.includes("is-style-columns")&&(o=!0),React.createElement(u.Fragment,null,!0===e&&React.createElement(d.a,t),!0===r&&React.createElement(f.a,t),!0===o&&React.createElement(m.a,t))}}]),r}(u.Component);document.addEventListener("DOMContentLoaded",(function(){document.querySelector(".js-react-posts-block")&&document.querySelectorAll(".js-react-posts-block").forEach((function(t){console.log("Dynamic Posts"),console.log(t);var e={title:t.getAttribute("data-title"),format:t.getAttribute("data-format"),formatID:t.getAttribute("data-format-id"),formatSlug:t.getAttribute("data-format-slug"),program:t.getAttribute("data-program"),programID:t.getAttribute("data-program-id"),programSlug:t.getAttribute("data-program-slug"),per_page:t.getAttribute("data-number"),backgroundColor:t.getAttribute("data-background"),style:t.getAttribute("data-style")};console.log(e),Object(u.render)(React.createElement(g,e),t)}))}))},36:function(t,e){t.exports=moment},43:function(t,e){t.exports=ReactDOM},49:function(t,e){t.exports=wp.apiFetch},5:function(t,e){t.exports=wp.element},50:function(t,e){t.exports=wp.url},67:function(t,e){t.exports=lodash},94:function(t,e){t.exports=wp.htmlEntities}},[[289,1,2,0]]]);
//# sourceMappingURL=frontend-b649fb4e.js.map