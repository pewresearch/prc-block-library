/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.0.0
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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[4],{1:function(e,t){e.exports=window.React},21:function(e,t){e.exports=window.wp.domReady},26:function(e,t){e.exports=window.wp.i18n},31:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(49);var a=n(42),c=n(50);function i(e,t){return Object(r.a)(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,c=[],i=!0,o=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);i=!0);}catch(e){o=!0,a=e}finally{try{i||null==n.return||n.return()}finally{if(o)throw a}}return c}}(e,t)||Object(a.a)(e,t)||Object(c.a)()}},33:function(e,t,n){"use strict";var r=n(158),a=n(27),c=n(95),i=n(67),o=n(58);var l=function(e,t){return Object(o.a)(t,(function(t){return e[t]}))},u=n(66);var s=function(e){return null==e?[]:l(e,Object(u.a)(e))},d=Math.max;t.a=function(e,t,n,o){e=Object(a.a)(e)?e:s(e),n=n&&!o?Object(i.a)(n):0;var l=e.length;return n<0&&(n=d(l+n,0)),Object(c.a)(e)?n<=l&&e.indexOf(t,n)>-1:!!l&&Object(r.a)(e,t,n)>-1}},350:function(e,t,n){n(38),e.exports=n(517)},36:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},39:function(e,t,n){"use strict";var r=n(79),a=n(43),c=n(44),i=Object(a.a)((function(e,t){return Object(c.a)(e)?Object(r.a)(e,t):[]}));t.a=i},42:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(36);function a(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},44:function(e,t,n){"use strict";var r=n(27),a=n(29);t.a=function(e){return Object(a.a)(e)&&Object(r.a)(e)}},49:function(e,t,n){"use strict";function r(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return r}))},50:function(e,t,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return r}))},517:function(e,t,n){"use strict";n.r(t);var r=n(31),a=n(2),c=n(4),i=(n(0),n(1)),o=n.n(i),l=n(15),u=n(184),s=n(12),d=n(20),p=n(7),f=n(39),v=n(33),b=(n(13),n(186)),O=n(5),j=n(307),h=n(137),m=n(11),y=n(56),x=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).handleClick=function(e){return Object(p.a)(t.props,"onClick",e,t.props)},t}return Object(s.a)(t,e),t.prototype.render=function(){var e=this.props,n=e.active,r=e.children,i=e.className,s=e.content,d=e.icon,p=Object(c.a)(Object(l.a)(n,"active"),"title",i),f=Object(u.a)(t,this.props),v=Object(b.a)(t,this.props),j=Object(m.a)(d)?"dropdown":d;return O.a.isNil(r)?o.a.createElement(v,Object(a.a)({},f,{className:p,onClick:this.handleClick}),y.a.create(j,{autoGenerateKey:!1}),s):o.a.createElement(v,Object(a.a)({},f,{className:p,onClick:this.handleClick}),r)},t}(i.Component);function w(e){var t=e.active,n=e.children,r=e.className,i=e.content,s=Object(c.a)("content",Object(l.a)(t,"active"),r),d=Object(u.a)(w,e),p=Object(b.a)(w,e);return o.a.createElement(p,Object(a.a)({},d,{className:s}),O.a.isNil(n)?i:n)}x.handledProps=["active","as","children","className","content","icon","index","onClick"],x.propTypes={},x.create=Object(h.f)(x,(function(e){return{content:e}})),w.handledProps=["active","as","children","className","content"],w.propTypes={},w.create=Object(h.f)(w,(function(e){return{content:e}}));var C=w,k=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).handleTitleOverrides=function(e){return{onClick:function(n,r){Object(p.a)(e,"onClick",n,r),Object(p.a)(t.props,"onTitleClick",n,r)}}},t}return Object(s.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.active,n=e.content,r=e.index,a=e.title;return o.a.createElement(o.a.Fragment,null,x.create(a,{autoGenerateKey:!1,defaultProps:{active:t,index:r},overrideProps:this.handleTitleOverrides}),C.create(n,{autoGenerateKey:!1,defaultProps:{active:t}}))},t}(i.Component);k.handledProps=["active","content","index","onTitleClick","title"],k.propTypes={},k.create=Object(h.f)(k,null);var g=k,T=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).computeNewIndex=function(e){var n=t.props.exclusive,r=t.state.activeIndex;return n?e===r?-1:e:Object(v.a)(r,e)?Object(f.a)(r,e):[].concat(r,[e])},t.handleTitleClick=function(e,n){var r=n.index;t.setState({activeIndex:t.computeNewIndex(r)}),Object(p.a)(t.props,"onTitleClick",e,n)},t.isIndexActive=function(e){var n=t.props.exclusive,r=t.state.activeIndex;return n?r===e:Object(v.a)(r,e)},t}Object(s.a)(t,e);var n=t.prototype;return n.getInitialAutoControlledState=function(e){return{activeIndex:e.exclusive?-1:[]}},n.componentDidMount=function(){0},n.componentDidUpdate=function(){0},n.render=function(){var e=this,n=this.props,r=n.className,i=n.children,l=n.panels,s=Object(c.a)("accordion",r),p=Object(u.a)(t,this.props),f=Object(b.a)(t,this.props);return o.a.createElement(f,Object(a.a)({},p,{className:s}),O.a.isNil(i)?Object(d.a)(l,(function(t,n){return g.create(t,{defaultProps:{active:e.isIndexActive(n),index:n,onTitleClick:e.handleTitleClick}})})):i)},t}(j.a);function N(e){var t=e.className,n=e.fluid,r=e.inverted,i=e.styled,s=Object(c.a)("ui",Object(l.a)(n,"fluid"),Object(l.a)(r,"inverted"),Object(l.a)(i,"styled"),t),d=Object(u.a)(N,e);return o.a.createElement(T,Object(a.a)({},d,{className:s}))}T.handledProps=["activeIndex","as","children","className","defaultActiveIndex","exclusive","onTitleClick","panels"],T.propTypes={},T.defaultProps={exclusive:!0},T.autoControlledProps=["activeIndex"],T.create=Object(h.f)(T,(function(e){return{content:e}})),N.handledProps=["className","fluid","inverted","styled"],N.propTypes={},N.Accordion=T,N.Content=C,N.Panel=g,N.Title=x;var A=N,E=n(21),I=n.n(E),P=n(26),R=n(9),S=function(e){var t=e.title,n=e.style,a=e.children,c=e.defaultOpen,i=void 0!==c&&c,o=Object(R.useState)(i),l=Object(r.a)(o,2),u=l[0],s=l[1],d=u?"caret down":"caret right";return"is-style-alternate"===n&&(d=u?"minus":"plus"),React.createElement(A,{styled:!0},React.createElement(A.Title,{active:!0===u,index:0,onClick:function(){s(!u)}},React.createElement(R.Fragment,null,"is-style-alternate"!==n&&React.createElement(y.a,{name:d,onClick:function(){s(!u)}}),Object(P.__)(t),"is-style-alternate"===n&&React.createElement(y.a,{name:d,style:{marginLeft:"0.5em"},onClick:function(){s(!u)}}))),React.createElement(A.Content,{active:!0===u},React.createElement(R.RawHTML,null,a)))};I()((function(){var e=document.querySelectorAll(".js-react-collapsible");1<=e.length&&e.forEach((function(e){var t=e.innerHTML,n=e.getAttribute("data-title"),r=e.getAttribute("data-style");Object(R.render)(React.createElement(S,{title:n,style:r},t),e)}))}))},79:function(e,t,n){"use strict";var r=n(102),a=n(97),c=n(125),i=n(58),o=n(121),l=n(98);t.a=function(e,t,n,u){var s=-1,d=a.a,p=!0,f=e.length,v=[],b=t.length;if(!f)return v;n&&(t=Object(i.a)(t,Object(o.a)(n))),u?(d=c.a,p=!1):t.length>=200&&(d=l.a,p=!1,t=new r.a(t));e:for(;++s<f;){var O=e[s],j=null==n?O:n(O);if(O=u||0!==O?O:0,p&&j==j){for(var h=b;h--;)if(t[h]===j)continue e;v.push(O)}else d(t,j,u)||v.push(O)}return v}},9:function(e,t){e.exports=window.wp.element}},[[350,0,1]]]);
//# sourceMappingURL=collapsible-9aaf72d8.js.map