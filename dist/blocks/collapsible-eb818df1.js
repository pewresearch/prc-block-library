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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[8],{1:function(e,t){e.exports=window.React},104:function(e,t,n){var r,c=n(19);r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"===("undefined"==typeof window?"undefined":c(window))&&(r=window)}e.exports=r},12:function(e,t){e.exports=window.wp.blocks},14:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},18:function(e,t,n){var r,c=n(19);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var a={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=c(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)){if(n.length){var i=o.apply(null,n);i&&e.push(i)}}else if("object"===r)if(n.toString===Object.prototype.toString)for(var l in n)a.call(n,l)&&n[l]&&e.push(l);else e.push(n.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):"object"===c(n(21))&&n(21)?void 0===(r=function(){return o}.apply(t,[]))||(e.exports=r):window.classNames=o}()},180:function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},19:function(e,t){function n(t){return e.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,n(t)}e.exports=n,e.exports.__esModule=!0,e.exports.default=e.exports},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},22:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(31);var c=n(27),a=n(32);function o(e,t){return Object(r.a)(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,c,a=[],o=!0,i=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);o=!0);}catch(e){i=!0,c=e}finally{try{o||null==n.return||n.return()}finally{if(i)throw c}}return a}}(e,t)||Object(c.a)(e,t)||Object(a.a)()}},24:function(e,t,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},27:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(20);function c(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},305:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/collapsible","category":"layout","attributes":{"title":{"type":"string","default":"How we did this"}},"styles":[{"name":"plus","label":"Plus Icon","isDefault":true},{"name":"caret","label":"Caret Icon"}],"supports":{"html":false,"align":false}}')},31:function(e,t,n){"use strict";function r(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return r}))},32:function(e,t,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return r}))},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},61:function(e,t,n){"use strict";var r=n(51),c=n(60);t.a=function(e){return Object(c.a)(e)&&Object(r.a)(e)}},730:function(e,t,n){n(24),e.exports=n(973)},76:function(e,t,n){"use strict";var r=n(84),c=n(69),a=n(61),o=Object(c.a)((function(e,t){return Object(a.a)(e)?Object(r.a)(e,t):[]}));t.a=o},84:function(e,t,n){"use strict";var r=n(118),c=n(139),a=n(140),o=n(97),i=n(136),l=n(115);t.a=function(e,t,n,s){var u=-1,p=c.a,f=!0,d=e.length,b=[],v=t.length;if(!d)return b;n&&(t=Object(o.a)(t,Object(i.a)(n))),s?(p=a.a,f=!1):t.length>=200&&(p=l.a,f=!1,t=new r.a(t));e:for(;++u<d;){var y=e[u],O=null==n?y:n(y);if(y=s||0!==y?y:0,f&&O==O){for(var j=v;j--;)if(t[j]===O)continue e;b.push(y)}else p(t,O,s)||b.push(y)}return b}},973:function(e,t,n){"use strict";n.r(t);var r=n(14),c=n(2),a=n(12),o=n(305),i=n(22),l=n(18),s=n.n(l),u=n(6),p=n(10),f=n(1),d=n.n(f),b=n(40),v=n(224),y=n(23),O=n(56),j=n(8),h=n(76),m=n(48),w=(n(34),n(225)),g=n(9),x=n(368),k=n(178),C=n(16),P=n(71),N=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(t=e.call.apply(e,[this].concat(r))||this).handleClick=function(e){return Object(j.a)(t.props,"onClick",e,t.props)},t}return Object(y.a)(t,e),t.prototype.render=function(){var e=this.props,n=e.active,r=e.children,c=e.className,a=e.content,o=e.icon,i=Object(p.a)(Object(b.a)(n,"active"),"title",c),l=Object(v.a)(t,this.props),s=Object(w.a)(t,this.props),f=Object(C.a)(o)?"dropdown":o;return g.a.isNil(r)?d.a.createElement(s,Object(u.a)({},l,{className:i,onClick:this.handleClick}),P.a.create(f,{autoGenerateKey:!1}),a):d.a.createElement(s,Object(u.a)({},l,{className:i,onClick:this.handleClick}),r)},t}(f.Component);function A(e){var t=e.active,n=e.children,r=e.className,c=e.content,a=Object(p.a)("content",Object(b.a)(t,"active"),r),o=Object(v.a)(A,e),i=Object(w.a)(A,e);return d.a.createElement(i,Object(u.a)({},o,{className:a}),g.a.isNil(n)?c:n)}N.handledProps=["active","as","children","className","content","icon","index","onClick"],N.propTypes={},N.create=Object(k.e)(N,(function(e){return{content:e}})),A.handledProps=["active","as","children","className","content"],A.propTypes={},A.create=Object(k.e)(A,(function(e){return{content:e}}));var E=A,I=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(t=e.call.apply(e,[this].concat(r))||this).handleTitleOverrides=function(e){return{onClick:function(n,r){Object(j.a)(e,"onClick",n,r),Object(j.a)(t.props,"onTitleClick",n,r)}}},t}return Object(y.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.active,n=e.content,r=e.index,c=e.title;return d.a.createElement(d.a.Fragment,null,N.create(c,{autoGenerateKey:!1,defaultProps:{active:t,index:r},overrideProps:this.handleTitleOverrides}),E.create(n,{autoGenerateKey:!1,defaultProps:{active:t}}))},t}(f.Component);I.handledProps=["active","content","index","onTitleClick","title"],I.propTypes={},I.create=Object(k.e)(I,null);var S=I,T=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(t=e.call.apply(e,[this].concat(r))||this).computeNewIndex=function(e){var n=t.props.exclusive,r=t.state.activeIndex;return n?e===r?-1:e:Object(m.a)(r,e)?Object(h.a)(r,e):[].concat(r,[e])},t.handleTitleClick=function(e,n){var r=n.index;t.setState({activeIndex:t.computeNewIndex(r)}),Object(j.a)(t.props,"onTitleClick",e,n)},t.isIndexActive=function(e){var n=t.props.exclusive,r=t.state.activeIndex;return n?r===e:Object(m.a)(r,e)},t}Object(y.a)(t,e);var n=t.prototype;return n.getInitialAutoControlledState=function(e){return{activeIndex:e.exclusive?-1:[]}},n.componentDidMount=function(){0},n.componentDidUpdate=function(){0},n.render=function(){var e=this,n=this.props,r=n.className,c=n.children,a=n.panels,o=Object(p.a)("accordion",r),i=Object(v.a)(t,this.props),l=Object(w.a)(t,this.props);return d.a.createElement(l,Object(u.a)({},i,{className:o}),g.a.isNil(c)?Object(O.a)(a,(function(t,n){return S.create(t,{defaultProps:{active:e.isIndexActive(n),index:n,onTitleClick:e.handleTitleClick}})})):c)},t}(x.a);function _(e){var t=e.className,n=e.fluid,r=e.inverted,c=e.styled,a=Object(p.a)("ui",Object(b.a)(n,"fluid"),Object(b.a)(r,"inverted"),Object(b.a)(c,"styled"),t),o=Object(v.a)(_,e);return d.a.createElement(T,Object(u.a)({},o,{className:a}))}T.handledProps=["activeIndex","as","children","className","defaultActiveIndex","exclusive","onTitleClick","panels"],T.propTypes={},T.defaultProps={exclusive:!0},T.autoControlledProps=["activeIndex"],T.create=Object(k.e)(T,(function(e){return{content:e}})),_.handledProps=["className","fluid","inverted","styled"],_.propTypes={},_.Accordion=T,_.Content=E,_.Panel=S,_.Title=N;var R=_,B=n(4),D=n(5),L=["core/paragraph","core/heading","core/image","core/table","core/list","prc-block/menu-link"],F=[["core/paragraph",{}]],M=function(e){var t=e.attributes,n=e.setAttributes,r=t.title,c=t.className,a=void 0!==c?c.split(" "):[],o=Object(D.useBlockProps)({className:s()(c)}),l=Object(D.useInnerBlocksProps)({},{allowedBlocks:L,orientation:"vertical",templateLock:!1,template:F}),u=Object(B.useState)(!0),p=Object(i.a)(u,2),f=p[0],d=p[1];return React.createElement("div",o,React.createElement(R,{styled:!0},React.createElement(R.Title,{active:!0===f,index:0,onClick:function(){}},React.createElement(B.Fragment,null,a.includes("is-style-caret")&&React.createElement(P.a,{name:f?"caret down":"caret right",onClick:function(){d(!f)}}),React.createElement(D.RichText,{tagName:"div",value:r,onChange:function(e){return n({title:e})},placeholder:"How we did this",formattingControls:[],keepPlaceholderOnFocus:!0,style:{display:"inline-block"}}),!a.includes("is-style-caret")&&React.createElement(P.a,{name:f?"minus":"plus",style:{marginLeft:"0.5em"},onClick:function(){d(!f)}}))),React.createElement(R.Content,{active:!0===f},React.createElement("div",l))))},G=function(){return React.createElement(D.InnerBlocks.Content,null)};function H(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function J(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?H(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):H(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var K=o.name,U={title:Object(c.__)("PRC Collapsible"),description:Object(c.__)("Add a block that displays content in a single accordion."),keywords:[Object(c.__)("Collapsible"),Object(c.__)("Accordion"),Object(c.__)("How we did this")],edit:M,save:G};Object(a.registerBlockType)(K,J(J({},o),U))}},[[730,0,3]]]);
//# sourceMappingURL=collapsible-eb818df1.js.map