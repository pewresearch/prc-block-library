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
(window.wpackioprcBlocksLibrarypostsJsonp=window.wpackioprcBlocksLibrarypostsJsonp||[]).push([[3],{0:function(t,e){t.exports=React},10:function(t,e){t.exports=wp.i18n},112:function(t,e){t.exports=wp.domReady},140:function(t,e,o){o(99),t.exports=o(141)},141:function(t,e,o){"use strict";o.r(e);var r=o(32),n=o(56),a=o(17),s=o(33),c=o(34),p=o(23),i=o(12),u=o(4),l=o(112),f=o.n(l),m=o(20),d=o(43),b=o(69),g=o(68);function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var o,r=Object(p.a)(t);if(e){var n=Object(p.a)(this).constructor;o=Reflect.construct(r,arguments,n)}else o=r.apply(this,arguments);return Object(c.a)(this,o)}}var h=function(t){Object(s.a)(o,t);var e=y(o);function o(t){var n;return Object(r.a)(this,o),n=e.call(this,t),Object(i.a)(Object(a.a)(n),"componentDidMount",(function(){var t=Object(a.a)(n).setState;Object(m.c)(n.props.per_page,n.props.formatID,n.props.programID,"formats",!0).then((function(e){t({posts:e})})),setInterval((function(){Object(m.c)(n.props.per_page,n.props.formatID,n.props.programID,"formats",!0).then((function(e){t({posts:e})}))}),n.state.fetchInterval)})),n.state={posts:!1,fetchInterval:5e4},n.setState=n.setState.bind(Object(a.a)(n)),n}return Object(n.a)(o,[{key:"render",value:function(){var t=this.props;t.posts=this.state.posts,t.disableLiink=!1;var e=!1;void 0!==this.props.style&&this.props.style.includes("is-style-fact-tank")&&(e=!0);var o=!1;void 0!==this.props.style&&this.props.style.includes("is-style-list")&&(o=!0);var r=!1;return void 0!==this.props.style&&this.props.style.includes("is-style-columns")&&(r=!0),React.createElement(u.Fragment,null,!0===e&&React.createElement(b.a,t),!0===o&&React.createElement(d.a,t),!0===r&&React.createElement(g.a,t))}}]),o}(u.Component);f()((function(){document.querySelector(".js-react-posts-block")&&document.querySelectorAll(".js-react-posts-block").forEach((function(t){console.log("Dynamic Posts"),console.log(t);var e={title:t.getAttribute("data-title"),format:t.getAttribute("data-format"),formatID:t.getAttribute("data-format-id"),formatSlug:t.getAttribute("data-format-slug"),program:t.getAttribute("data-program"),programID:t.getAttribute("data-program-id"),programSlug:t.getAttribute("data-program-slug"),per_page:t.getAttribute("data-number"),backgroundColor:t.getAttribute("data-background"),style:t.getAttribute("data-style")};console.log(e),Object(u.render)(React.createElement(h,e),t)}))}))},18:function(t,e){t.exports=lodash},27:function(t,e){t.exports=wp.blockEditor},4:function(t,e){t.exports=wp.element},41:function(t,e){t.exports=moment},47:function(t,e){t.exports=wp.data},55:function(t,e){t.exports=ReactDOM},62:function(t,e){t.exports=wp.blocks},63:function(t,e){t.exports=wp.apiFetch},64:function(t,e){t.exports=wp.url},8:function(t,e){t.exports=wp.components}},[[140,1,2,0]]]);
//# sourceMappingURL=frontend-8f62c170.js.map