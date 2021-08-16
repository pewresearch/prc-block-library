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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[46],{18:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(27);var a=n(25),c=n(28);function o(t,e){return Object(r.a)(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,a,c=[],o=!0,i=!1;try{for(n=n.call(t);!(o=(r=n.next()).done)&&(c.push(r.value),!e||c.length!==e);o=!0);}catch(t){i=!0,a=t}finally{try{o||null==n.return||n.return()}finally{if(i)throw a}}return c}}(t,e)||Object(a.a)(t,e)||Object(c.a)()}},20:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,"a",(function(){return r}))},227:function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var r=n(7),a=n(85),c=n(26),o=n(86),i=n(13),u=n(1),l=function(t,e,n,r){void 0===r&&(r=!1);var a,c=e[t];if(void 0!==c)return c;if(r){var o=e[(a=t,"default"+(a[0].toUpperCase()+a.slice(1)))];if(void 0!==o)return o;if(n){var i=n[t];if(void 0!==i)return i}}return"checked"!==t&&("value"===t?e.multiple?[]:"":void 0)},s=function(t){function e(){for(var e,n=arguments.length,c=new Array(n),o=0;o<n;o++)c[o]=arguments[o];var u=(e=t.call.apply(t,[this].concat(c))||this).constructor,s=u.autoControlledProps,p=u.getAutoControlledStateFromProps,d=Object(i.a)(Object(a.a)(e),"getInitialAutoControlledState",e.props)||{},f=s.reduce((function(t,n){return t[n]=l(n,e.props,d,!0),t}),{});return e.state=Object(r.a)({},d,f,{autoControlledProps:s,getAutoControlledStateFromProps:p}),e}return Object(c.a)(e,t),e.getDerivedStateFromProps=function(t,e){var n=e.autoControlledProps,a=e.getAutoControlledStateFromProps,c=n.reduce((function(e,n){return!Object(o.a)(t[n])&&(e[n]=t[n]),e}),{});if(a){var i=a(t,Object(r.a)({},e,c),e);return Object(r.a)({},c,i)}return c},e.getAutoControlledStateFromProps=function(){return null},e}(n.n(u).a.Component)},25:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var r=n(20);function a(t,e){if(t){if("string"==typeof t)return Object(r.a)(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(t,e):void 0}}},27:function(t,e,n){"use strict";function r(t){if(Array.isArray(t))return t}n.d(e,"a",(function(){return r}))},28:function(t,e,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(e,"a",(function(){return r}))},44:function(t,e,n){"use strict";var r=n(58),a=n(45),c=n(48),o=n(39);var i=function(t,e){var n=-1,r=Object(o.a)(t)?Array(t.length):[];return Object(c.a)(t,(function(t,a,c){r[++n]=e(t,a,c)})),r},u=n(30);e.a=function(t,e){return(Object(u.a)(t)?r.a:i)(t,Object(a.a)(e,3))}},46:function(t,e,n){"use strict";var r=n(162),a=n(39),c=n(96),o=n(95),i=n(58);var u=function(t,e){return Object(i.a)(e,(function(e){return t[e]}))},l=n(65);var s=function(t){return null==t?[]:u(t,Object(l.a)(t))},p=Math.max;e.a=function(t,e,n,i){t=Object(a.a)(t)?t:s(t),n=n&&!i?Object(o.a)(n):0;var u=t.length;return n<0&&(n=p(u+n,0)),Object(c.a)(t)?n<=u&&t.indexOf(e,n)>-1:!!u&&Object(r.a)(t,e,n)>-1}},51:function(t,e,n){"use strict";var r=n(39),a=n(42);e.a=function(t){return Object(a.a)(t)&&Object(r.a)(t)}},714:function(t,e,n){"use strict";var r=n(7),a=n(10),c=(n(0),n(1)),o=n.n(c),i=n(118),u=n(310),l=n(26),s=n(44),p=n(13),d=n(72),f=n(46),v=(n(30),n(312)),b=n(12),O=n(227),j=n(368),h=n(21),m=n(115),y=function(t){function e(){for(var e,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(e=t.call.apply(t,[this].concat(r))||this).handleClick=function(t){return Object(p.a)(e.props,"onClick",t,e.props)},e}return Object(l.a)(e,t),e.prototype.render=function(){var t=this.props,n=t.active,c=t.children,l=t.className,s=t.content,p=t.icon,d=Object(a.a)(Object(i.a)(n,"active"),"title",l),f=Object(u.a)(e,this.props),O=Object(v.a)(e,this.props),j=Object(h.a)(p)?"dropdown":p;return b.a.isNil(c)?o.a.createElement(O,Object(r.a)({},f,{className:d,onClick:this.handleClick}),m.a.create(j,{autoGenerateKey:!1}),s):o.a.createElement(O,Object(r.a)({},f,{className:d,onClick:this.handleClick}),c)},e}(c.Component);function C(t){var e=t.active,n=t.children,c=t.className,l=t.content,s=Object(a.a)("content",Object(i.a)(e,"active"),c),p=Object(u.a)(C,t),d=Object(v.a)(C,t);return o.a.createElement(d,Object(r.a)({},p,{className:s}),b.a.isNil(n)?l:n)}y.handledProps=["active","as","children","className","content","icon","index","onClick"],y.propTypes={},y.create=Object(j.e)(y,(function(t){return{content:t}})),C.handledProps=["active","as","children","className","content"],C.propTypes={},C.create=Object(j.e)(C,(function(t){return{content:t}}));var x=C,g=function(t){function e(){for(var e,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(e=t.call.apply(t,[this].concat(r))||this).handleTitleOverrides=function(t){return{onClick:function(n,r){Object(p.a)(t,"onClick",n,r),Object(p.a)(e.props,"onTitleClick",n,r)}}},e}return Object(l.a)(e,t),e.prototype.render=function(){var t=this.props,e=t.active,n=t.content,r=t.index,a=t.title;return o.a.createElement(o.a.Fragment,null,y.create(a,{autoGenerateKey:!1,defaultProps:{active:e,index:r},overrideProps:this.handleTitleOverrides}),x.create(n,{autoGenerateKey:!1,defaultProps:{active:e}}))},e}(c.Component);g.handledProps=["active","content","index","onTitleClick","title"],g.propTypes={},g.create=Object(j.e)(g,null);var k=g,A=function(t){function e(){for(var e,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(e=t.call.apply(t,[this].concat(r))||this).computeNewIndex=function(t){var n=e.props.exclusive,r=e.state.activeIndex;return n?t===r?-1:t:Object(f.a)(r,t)?Object(d.a)(r,t):[].concat(r,[t])},e.handleTitleClick=function(t,n){var r=n.index;e.setState({activeIndex:e.computeNewIndex(r)}),Object(p.a)(e.props,"onTitleClick",t,n)},e.isIndexActive=function(t){var n=e.props.exclusive,r=e.state.activeIndex;return n?r===t:Object(f.a)(r,t)},e}Object(l.a)(e,t);var n=e.prototype;return n.getInitialAutoControlledState=function(t){return{activeIndex:t.exclusive?-1:[]}},n.componentDidMount=function(){0},n.componentDidUpdate=function(){0},n.render=function(){var t=this,n=this.props,c=n.className,i=n.children,l=n.panels,p=Object(a.a)("accordion",c),d=Object(u.a)(e,this.props),f=Object(v.a)(e,this.props);return o.a.createElement(f,Object(r.a)({},d,{className:p}),b.a.isNil(i)?Object(s.a)(l,(function(e,n){return k.create(e,{defaultProps:{active:t.isIndexActive(n),index:n,onTitleClick:t.handleTitleClick}})})):i)},e}(O.a);function w(t){var e=t.className,n=t.fluid,c=t.inverted,l=t.styled,s=Object(a.a)("ui",Object(i.a)(n,"fluid"),Object(i.a)(c,"inverted"),Object(i.a)(l,"styled"),e),p=Object(u.a)(w,t);return o.a.createElement(A,Object(r.a)({},p,{className:s}))}A.handledProps=["activeIndex","as","children","className","defaultActiveIndex","exclusive","onTitleClick","panels"],A.propTypes={},A.defaultProps={exclusive:!0},A.autoControlledProps=["activeIndex"],A.create=Object(j.e)(A,(function(t){return{content:t}})),w.handledProps=["className","fluid","inverted","styled"],w.propTypes={},w.Accordion=A,w.Content=x,w.Panel=k,w.Title=y;e.a=w},72:function(t,e,n){"use strict";var r=n(81),a=n(59),c=n(51),o=Object(a.a)((function(t,e){return Object(c.a)(t)?Object(r.a)(t,e):[]}));e.a=o},81:function(t,e,n){"use strict";var r=n(100),a=n(125),c=n(126),o=n(58),i=n(122),u=n(97);e.a=function(t,e,n,l){var s=-1,p=a.a,d=!0,f=t.length,v=[],b=e.length;if(!f)return v;n&&(e=Object(o.a)(e,Object(i.a)(n))),l?(p=c.a,d=!1):e.length>=200&&(p=u.a,d=!1,e=new r.a(e));t:for(;++s<f;){var O=t[s],j=null==n?O:n(O);if(O=l||0!==O?O:0,d&&j==j){for(var h=b;h--;)if(e[h]===j)continue t;v.push(O)}else p(e,j,l)||v.push(O)}return v}},85:function(t,e,n){"use strict";function r(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}n.d(e,"a",(function(){return r}))},86:function(t,e,n){"use strict";e.a=function(t){return void 0===t}}}]);
//# sourceMappingURL=vendors~collapsible-2e532e86.js.map