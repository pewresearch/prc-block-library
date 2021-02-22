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
(window.wpackioprcBlocksLibrarypostsJsonp=window.wpackioprcBlocksLibrarypostsJsonp||[]).push([[3],{0:function(t,e){t.exports=React},110:function(t,e){t.exports=wp.domReady},138:function(t,e,r){r(96),t.exports=r(139)},139:function(t,e,r){"use strict";r.r(e);var o=r(30),n=r(54),a=r(14),s=r(37),c=r(31),p=r(19),i=r(26),u=r(5),l=r(110),f=r.n(l),m=r(17),b=r(42),d=r(65),g=r(64);function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,o=Object(p.a)(t);if(e){var n=Object(p.a)(this).constructor;r=Reflect.construct(o,arguments,n)}else r=o.apply(this,arguments);return Object(c.a)(this,r)}}var h=function(t){Object(s.a)(r,t);var e=y(r);function r(t){var n;return Object(o.a)(this,r),n=e.call(this,t),Object(i.a)(Object(a.a)(n),"componentDidMount",(function(){var t=Object(a.a)(n).setState;Object(m.b)(n.props.per_page,n.props.formatID,n.props.programID,"formats",!0).then((function(e){t({posts:e})})),setInterval((function(){Object(m.b)(n.props.per_page,n.props.formatID,n.props.programID,"formats",!0).then((function(e){t({posts:e})}))}),n.state.fetchInterval)})),n.state={posts:!1,fetchInterval:5e4},n.setState=n.setState.bind(Object(a.a)(n)),n}return Object(n.a)(r,[{key:"render",value:function(){var t=this.props;t.posts=this.state.posts,t.disableLiink=!1;var e=!1;void 0!==this.props.style&&this.props.style.includes("is-style-fact-tank")&&(e=!0);var r=!1;void 0!==this.props.style&&this.props.style.includes("is-style-list")&&(r=!0);var o=!1;return void 0!==this.props.style&&this.props.style.includes("is-style-columns")&&(o=!0),React.createElement(u.Fragment,null,!0===e&&React.createElement(d.a,t),!0===r&&React.createElement(b.a,t),!0===o&&React.createElement(g.a,t))}}]),r}(u.Component);f()((function(){document.querySelector(".js-react-posts-block")&&document.querySelectorAll(".js-react-posts-block").forEach((function(t){console.log("Dynamic Posts"),console.log(t);var e={title:t.getAttribute("data-title"),format:t.getAttribute("data-format"),formatID:t.getAttribute("data-format-id"),formatSlug:t.getAttribute("data-format-slug"),program:t.getAttribute("data-program"),programID:t.getAttribute("data-program-id"),programSlug:t.getAttribute("data-program-slug"),per_page:t.getAttribute("data-number"),backgroundColor:t.getAttribute("data-background"),style:t.getAttribute("data-style")};console.log(e),Object(u.render)(React.createElement(h,e),t)}))}))},16:function(t,e){t.exports=wp.components},32:function(t,e){t.exports=wp.blockEditor},40:function(t,e){t.exports=moment},5:function(t,e){t.exports=wp.element},53:function(t,e){t.exports=ReactDOM},60:function(t,e){t.exports=wp.apiFetch},61:function(t,e){t.exports=wp.url},88:function(t,e){t.exports=wp.htmlEntities},89:function(t,e){t.exports=wp.compose},90:function(t,e){t.exports=wp.data}},[[138,1,2,0]]]);
//# sourceMappingURL=frontend-43ff27f1.js.map