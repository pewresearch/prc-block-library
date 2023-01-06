/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.27
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2023 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[8],{1:function(e,t){e.exports=window.React},20:function(e,t){e.exports=window.wp.domReady},603:function(e,t,a){a(30),e.exports=a(655)},655:function(e,t,a){"use strict";a.r(t);var r=a(66),n=a(7),c=a(20),l=a.n(c),i=a(4),o=a(8),s=a(1),m=a.n(s),u=a(25),d=a(316),p=a(317),b=a(9);function f(e){var t=e.children,a=e.className,r=e.content,n=e.image,c=Object(o.a)(Object(u.a)(n,"image"),"header",a),l=Object(d.a)(f,e),s=Object(p.a)(f,e);return m.a.createElement(s,Object(i.a)({},l,{className:c}),b.a.isNil(t)?r:t)}f.handledProps=["as","children","className","content","image"],f.propTypes={};var h=f;function j(e){var t=e.className,a=e.square,r=e.rectangular,n=Object(o.a)(Object(u.a)(a,"square"),Object(u.a)(r,"rectangular"),"image",t),c=Object(d.a)(j,e),l=Object(p.a)(j,e);return m.a.createElement(l,Object(i.a)({},c,{className:n}))}j.handledProps=["as","className","rectangular","square"],j.propTypes={};var O=j;function v(e){var t=e.className,a=e.length,r=Object(o.a)("line",a,t),n=Object(d.a)(v,e),c=Object(p.a)(v,e);return m.a.createElement(c,Object(i.a)({},n,{className:r}))}v.handledProps=["as","className","length"],v.propTypes={};var y=v;function g(e){var t=e.children,a=e.className,r=e.content,n=Object(o.a)("paragraph",a),c=Object(d.a)(g,e),l=Object(p.a)(g,e);return m.a.createElement(l,Object(i.a)({},c,{className:n}),b.a.isNil(t)?r:t)}g.handledProps=["as","children","className","content"],g.propTypes={};var w=g;function N(e){var t=e.children,a=e.className,r=e.content,n=e.fluid,c=e.inverted,l=Object(o.a)("ui",Object(u.a)(n,"fluid"),Object(u.a)(c,"inverted"),"placeholder",a),s=Object(d.a)(N,e),f=Object(p.a)(N,e);return m.a.createElement(f,Object(i.a)({},s,{className:l}),b.a.isNil(t)?r:t)}N.handledProps=["as","children","className","content","fluid","inverted"],N.propTypes={},N.Header=h,N.Image=O,N.Line=y,N.Paragraph=w;var E=N;function R(e){var t=e.streamURL,a=e.chatURL;return React.createElement(n.Fragment,null,React.createElement("div",{className:"prc-livestream-stream"},t&&React.createElement("iframe",{title:"PRC Livestream",src:t,frameBorder:"0",allow:"autoplay; fullscreen; picture-in-picture",allowFullScreen:!0,style:{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}),!t&&React.createElement(E,{fluid:!0,style:{height:"100%"}},React.createElement(E.Image,{fluid:!0,style:{height:"100%"}}))),React.createElement("div",{className:"prc-livestream-chat"},a&&React.createElement("iframe",{src:a,frameBorder:"0",style:{width:"100%",height:"100%",minHeight:"560px"},title:"Slido"}),!a&&React.createElement(E,{style:{width:"100%",height:"100%",minHeight:"560px"}},React.createElement(E.Paragraph,null,Object(r.a)(Array(30)).map((function(){return React.createElement(E.Line,null)}))))))}l()((function(){if(document.querySelector(".wp-block-prc-block-livestream")){console.log("stream loading");var e=document.querySelectorAll(".wp-block-prc-block-livestream");console.log(e),e.forEach((function(e){var t={streamURL:e.dataset.streamUrl,chatURL:e.dataset.chatUrl};Object(n.render)(React.createElement(R,t),e)}))}}))},66:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var r=a(41);var n=a(74),c=a(42);function l(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||Object(n.a)(e)||Object(c.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},7:function(e,t){e.exports=window.wp.element},74:function(e,t,a){"use strict";function r(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}a.d(t,"a",(function(){return r}))}},[[603,0,1]]]);
//# sourceMappingURL=livestream-dec68f30.js.map