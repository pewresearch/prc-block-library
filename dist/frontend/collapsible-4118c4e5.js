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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[6],{1:function(e,t){e.exports=window.React},25:function(e,t){e.exports=window.wp.i18n},29:function(e,t){e.exports=window.wp.domReady},51:function(e,t,n){"use strict";var c=n(41),a=n(60);t.a=function(e){return Object(a.a)(e)&&Object(c.a)(e)}},66:function(e,t,n){"use strict";var c=n(89),a=n(61),r=n(51),i=Object(a.a)((function(e,t){return Object(r.a)(e)?Object(c.a)(e,t):[]}));t.a=i},865:function(e,t,n){n(44),e.exports=n(903)},89:function(e,t,n){"use strict";var c=n(154),a=n(147),r=n(178),i=n(132),o=n(175),l=n(148);t.a=function(e,t,n,s){var u=-1,p=a.a,d=!0,f=e.length,v=[],b=t.length;if(!f)return v;n&&(t=Object(i.a)(t,Object(o.a)(n))),s?(p=r.a,d=!1):t.length>=200&&(p=l.a,d=!1,t=new c.a(t));e:for(;++u<f;){var O=e[u],j=null==n?O:n(O);if(O=s||0!==O?O:0,d&&j==j){for(var h=b;h--;)if(t[h]===j)continue e;v.push(O)}else p(t,j,s)||v.push(O)}return v}},9:function(e,t){e.exports=window.wp.element},903:function(e,t,n){"use strict";n.r(t);var c=n(48),a=n(2),r=n(4),i=n(1),o=n.n(i),l=n(24),s=n(334),u=n(11),p=n(32),d=n(7),f=n(66),v=n(36),b=(n(20),n(335)),O=n(5),j=n(832),h=n(183),m=n(10),y=n(39),x=function(e){function t(){for(var t,n=arguments.length,c=new Array(n),a=0;a<n;a++)c[a]=arguments[a];return(t=e.call.apply(e,[this].concat(c))||this).handleClick=function(e){return Object(d.a)(t.props,"onClick",e,t.props)},t}return Object(u.a)(t,e),t.prototype.render=function(){var e=this.props,n=e.active,c=e.children,i=e.className,u=e.content,p=e.icon,d=Object(r.a)(Object(l.a)(n,"active"),"title",i),f=Object(s.a)(t,this.props),v=Object(b.a)(t,this.props),j=Object(m.a)(p)?"dropdown":p;return O.a.isNil(c)?o.a.createElement(v,Object(a.a)({},f,{className:d,onClick:this.handleClick}),y.a.create(j,{autoGenerateKey:!1}),u):o.a.createElement(v,Object(a.a)({},f,{className:d,onClick:this.handleClick}),c)},t}(i.Component);function w(e){var t=e.active,n=e.children,c=e.className,i=e.content,u=Object(r.a)("content",Object(l.a)(t,"active"),c),p=Object(s.a)(w,e),d=Object(b.a)(w,e);return o.a.createElement(d,Object(a.a)({},p,{className:u}),O.a.isNil(n)?i:n)}x.handledProps=["active","as","children","className","content","icon","index","onClick"],x.propTypes={},x.create=Object(h.f)(x,(function(e){return{content:e}})),w.handledProps=["active","as","children","className","content"],w.propTypes={},w.create=Object(h.f)(w,(function(e){return{content:e}}));var C=w,k=function(e){function t(){for(var t,n=arguments.length,c=new Array(n),a=0;a<n;a++)c[a]=arguments[a];return(t=e.call.apply(e,[this].concat(c))||this).handleTitleOverrides=function(e){return{onClick:function(n,c){Object(d.a)(e,"onClick",n,c),Object(d.a)(t.props,"onTitleClick",n,c)}}},t}return Object(u.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.active,n=e.content,c=e.index,a=e.title;return o.a.createElement(o.a.Fragment,null,x.create(a,{autoGenerateKey:!1,defaultProps:{active:t,index:c},overrideProps:this.handleTitleOverrides}),C.create(n,{autoGenerateKey:!1,defaultProps:{active:t}}))},t}(i.Component);k.handledProps=["active","content","index","onTitleClick","title"],k.propTypes={},k.create=Object(h.f)(k,null);var N=k,T=function(e){function t(){for(var t,n=arguments.length,c=new Array(n),a=0;a<n;a++)c[a]=arguments[a];return(t=e.call.apply(e,[this].concat(c))||this).computeNewIndex=function(e){var n=t.props.exclusive,c=t.state.activeIndex;return n?e===c?-1:e:Object(v.a)(c,e)?Object(f.a)(c,e):[].concat(c,[e])},t.handleTitleClick=function(e,n){var c=n.index;t.setState({activeIndex:t.computeNewIndex(c)}),Object(d.a)(t.props,"onTitleClick",e,n)},t.isIndexActive=function(e){var n=t.props.exclusive,c=t.state.activeIndex;return n?c===e:Object(v.a)(c,e)},t}Object(u.a)(t,e);var n=t.prototype;return n.getInitialAutoControlledState=function(e){return{activeIndex:e.exclusive?-1:[]}},n.componentDidMount=function(){0},n.componentDidUpdate=function(){0},n.render=function(){var e=this,n=this.props,c=n.className,i=n.children,l=n.panels,u=Object(r.a)("accordion",c),d=Object(s.a)(t,this.props),f=Object(b.a)(t,this.props);return o.a.createElement(f,Object(a.a)({},d,{className:u}),O.a.isNil(i)?Object(p.a)(l,(function(t,n){return N.create(t,{defaultProps:{active:e.isIndexActive(n),index:n,onTitleClick:e.handleTitleClick}})})):i)},t}(j.a);function E(e){var t=e.className,n=e.fluid,c=e.inverted,i=e.styled,u=Object(r.a)("ui",Object(l.a)(n,"fluid"),Object(l.a)(c,"inverted"),Object(l.a)(i,"styled"),t),p=Object(s.a)(E,e);return o.a.createElement(T,Object(a.a)({},p,{className:u}))}T.handledProps=["activeIndex","as","children","className","defaultActiveIndex","exclusive","onTitleClick","panels"],T.propTypes={},T.defaultProps={exclusive:!0},T.autoControlledProps=["activeIndex"],T.create=Object(h.f)(T,(function(e){return{content:e}})),E.handledProps=["className","fluid","inverted","styled"],E.propTypes={},E.Accordion=T,E.Content=C,E.Panel=N,E.Title=x;var g=E,I=n(29),P=n.n(I),A=n(25),R=n(9),L=function(e){var t=e.title,n=e.style,a=e.children,r=e.defaultOpen,i=void 0!==r&&r,o=Object(R.useState)(i),l=Object(c.a)(o,2),s=l[0],u=l[1],p=s?"minus circle outline":"plus circle outline";return"is-style-caret"===n&&(p=s?"caret down":"caret right"),React.createElement(g,{styled:!0},React.createElement(g.Title,{active:!0===s,index:0,onClick:function(){u(!s)}},React.createElement(R.Fragment,null,"is-style-caret"===n&&React.createElement(y.a,{name:p,onClick:function(){u(!s)}}),Object(A.__)(t),"is-style-caret"!==n&&React.createElement(y.a,{name:p,style:{marginLeft:"0.5em"},onClick:function(){u(!s)}}))),React.createElement(g.Content,{active:!0===s},React.createElement(R.RawHTML,null,a)))};P()((function(){var e=document.querySelectorAll(".js-react-collapsible");1<=e.length&&e.forEach((function(e){var t=e.innerHTML,n=e.getAttribute("data-title"),c=e.getAttribute("data-style");Object(R.render)(React.createElement(L,{title:n,style:c},t),e)}))}))}},[[865,0,1,2]]]);
//# sourceMappingURL=collapsible-4118c4e5.js.map