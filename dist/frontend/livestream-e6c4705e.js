/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.17
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2022 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[9],{1:function(e,a){e.exports=window.React},185:function(e,a,t){"use strict";function r(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}t.d(a,"a",(function(){return r}))},204:function(e,a,t){"use strict";t.d(a,"a",(function(){return l}));var r=t(114);var c=t(185),n=t(133);function l(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||Object(c.a)(e)||Object(n.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},29:function(e,a){e.exports=window.wp.domReady},871:function(e,a,t){t(40),e.exports=t(899)},899:function(e,a,t){"use strict";t.r(a);var r=t(204),c=t(9),n=t(29),l=t.n(n),i=t(3),o=t(5),s=t(1),m=t.n(s),u=t(28),d=t(335),p=t(336),b=t(6);function f(e){var a=e.children,t=e.className,r=e.content,c=e.image,n=Object(o.a)(Object(u.a)(c,"image"),"header",t),l=Object(d.a)(f,e),s=Object(p.a)(f,e);return m.a.createElement(s,Object(i.a)({},l,{className:n}),b.a.isNil(a)?r:a)}f.handledProps=["as","children","className","content","image"],f.propTypes={};var h=f;function j(e){var a=e.className,t=e.square,r=e.rectangular,c=Object(o.a)(Object(u.a)(t,"square"),Object(u.a)(r,"rectangular"),"image",a),n=Object(d.a)(j,e),l=Object(p.a)(j,e);return m.a.createElement(l,Object(i.a)({},n,{className:c}))}j.handledProps=["as","className","rectangular","square"],j.propTypes={};var O=j;function v(e){var a=e.className,t=e.length,r=Object(o.a)("line",t,a),c=Object(d.a)(v,e),n=Object(p.a)(v,e);return m.a.createElement(n,Object(i.a)({},c,{className:r}))}v.handledProps=["as","className","length"],v.propTypes={};var y=v;function g(e){var a=e.children,t=e.className,r=e.content,c=Object(o.a)("paragraph",t),n=Object(d.a)(g,e),l=Object(p.a)(g,e);return m.a.createElement(l,Object(i.a)({},n,{className:c}),b.a.isNil(a)?r:a)}g.handledProps=["as","children","className","content"],g.propTypes={};var w=g;function N(e){var a=e.children,t=e.className,r=e.content,c=e.fluid,n=e.inverted,l=Object(o.a)("ui",Object(u.a)(c,"fluid"),Object(u.a)(n,"inverted"),"placeholder",t),s=Object(d.a)(N,e),f=Object(p.a)(N,e);return m.a.createElement(f,Object(i.a)({},s,{className:l}),b.a.isNil(a)?r:a)}N.handledProps=["as","children","className","content","fluid","inverted"],N.propTypes={},N.Header=h,N.Image=O,N.Line=y,N.Paragraph=w;var E=N,R=function(e){var a=e.streamURL,t=e.chatURL;return React.createElement(React.Fragment,null,React.createElement("div",{className:"prc-livestream-stream"},a&&React.createElement("iframe",{src:a,frameborder:"0",allow:"autoplay; fullscreen; picture-in-picture",allowfullscreen:!0,style:{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}),!a&&React.createElement(E,{fluid:!0,style:{height:"100%"}},React.createElement(E.Image,{fluid:!0,style:{height:"100%"}}))),React.createElement("div",{className:"prc-livestream-chat"},t&&React.createElement("iframe",{src:t,frameBorder:"0",style:{width:"100%",height:"100%",minHeight:"560px"},title:"Slido"}),!t&&React.createElement(E,{style:{width:"100%",height:"100%",minHeight:"560px"}},React.createElement(E.Paragraph,null,Object(r.a)(Array(30)).map((function(){return React.createElement(E.Line,null)}))))))};l()((function(){if(document.querySelector(".wp-block-prc-block-livestream")){console.log("stream loading");var e=document.querySelectorAll(".wp-block-prc-block-livestream");console.log(e),e.forEach((function(e){var a={streamURL:e.dataset.streamUrl,chatURL:e.dataset.chatUrl};Object(c.render)(React.createElement(R,a),e)}))}}))},9:function(e,a){e.exports=window.wp.element}},[[871,0,1]]]);
//# sourceMappingURL=livestream-e6c4705e.js.map