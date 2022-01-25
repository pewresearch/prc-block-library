/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.9
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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[8],{1:function(e,t){e.exports=window.React},11:function(e,t){e.exports=window.wp.element},142:function(e,t,a){"use strict";function r(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}a.d(t,"a",(function(){return r}))},175:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var r=a(35);var n=a(142),c=a(48);function l(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||Object(n.a)(e)||Object(c.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},22:function(e,t){e.exports=window.wp.domReady},35:function(e,t,a){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}a.d(t,"a",(function(){return r}))},48:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var r=a(35);function n(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Object(r.a)(e,t):void 0}}},512:function(e,t,a){a(37),e.exports=a(533)},533:function(e,t,a){"use strict";a.r(t);var r=a(175),n=a(11),c=a(22),l=a.n(c),i=a(2),o=a(3),s=(a(0),a(1)),u=a.n(s),m=a(15),d=a(176),p=a(177),f=a(4);function b(e){var t=e.children,a=e.className,r=e.content,n=e.image,c=Object(o.a)(Object(m.a)(n,"image"),"header",a),l=Object(d.a)(b,e),s=Object(p.a)(b,e);return u.a.createElement(s,Object(i.a)({},l,{className:c}),f.a.isNil(t)?r:t)}b.handledProps=["as","children","className","content","image"],b.propTypes={};var h=b;function j(e){var t=e.className,a=e.square,r=e.rectangular,n=Object(o.a)(Object(m.a)(a,"square"),Object(m.a)(r,"rectangular"),"image",t),c=Object(d.a)(j,e),l=Object(p.a)(j,e);return u.a.createElement(l,Object(i.a)({},c,{className:n}))}j.handledProps=["as","className","rectangular","square"],j.propTypes={};var O=j;function v(e){var t=e.className,a=e.length,r=Object(o.a)("line",a,t),n=Object(d.a)(v,e),c=Object(p.a)(v,e);return u.a.createElement(c,Object(i.a)({},n,{className:r}))}v.handledProps=["as","className","length"],v.propTypes={};var y=v;function g(e){var t=e.children,a=e.className,r=e.content,n=Object(o.a)("paragraph",a),c=Object(d.a)(g,e),l=Object(p.a)(g,e);return u.a.createElement(l,Object(i.a)({},c,{className:n}),f.a.isNil(t)?r:t)}g.handledProps=["as","children","className","content"],g.propTypes={};var w=g;function N(e){var t=e.children,a=e.className,r=e.content,n=e.fluid,c=e.inverted,l=Object(o.a)("ui",Object(m.a)(n,"fluid"),Object(m.a)(c,"inverted"),"placeholder",a),s=Object(d.a)(N,e),b=Object(p.a)(N,e);return u.a.createElement(b,Object(i.a)({},s,{className:l}),f.a.isNil(t)?r:t)}N.handledProps=["as","children","className","content","fluid","inverted"],N.propTypes={},N.Header=h,N.Image=O,N.Line=y,N.Paragraph=w;var E=N,R=function(e){var t=e.streamURL,a=e.chatURL;return React.createElement(React.Fragment,null,React.createElement("div",{className:"prc-livestream-stream"},t&&React.createElement("iframe",{src:t,frameborder:"0",allow:"autoplay; fullscreen; picture-in-picture",allowfullscreen:!0,style:{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}),!t&&React.createElement(E,{fluid:!0,style:{height:"100%"}},React.createElement(E.Image,{fluid:!0,style:{height:"100%"}}))),React.createElement("div",{className:"prc-livestream-chat"},a&&React.createElement("iframe",{src:a,frameBorder:"0",style:{width:"100%",height:"100%",minHeight:"560px"},title:"Slido"}),!a&&React.createElement(E,{style:{width:"100%",height:"100%",minHeight:"560px"}},React.createElement(E.Paragraph,null,Object(r.a)(Array(30)).map((function(){return React.createElement(E.Line,null)}))))))};l()((function(){if(document.querySelector(".wp-block-prc-block-livestream")){console.log("stream loading");var e=document.querySelectorAll(".wp-block-prc-block-livestream");console.log(e),e.forEach((function(e){var t={streamURL:e.dataset.streamUrl,chatURL:e.dataset.chatUrl};Object(n.render)(React.createElement(R,t),e)}))}}))}},[[512,0,1]]]);
//# sourceMappingURL=livestream-e1088884.js.map