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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[16],{1:function(e,t){e.exports=window.React},109:function(e,t){e.exports=window.ReactDOM},118:function(e,t,n){"use strict";var r=n(83),a=n(40),o=n(36);var c=function(e,t,n,r,a){return a(e,(function(e,a,o){n=r?(r=!1,e):t(n,e,a,o)})),n},i=n(13);t.a=function(e,t,n){var s=Object(i.a)(e)?r.a:c,l=arguments.length<3;return s(e,Object(o.a)(t,4),n,l,a.a)}},156:function(e,t,n){"use strict";var r=n(2),a=n(12),o=n(7),c=n(10),i=n(546),s=n(4),l=(n(0),n(1)),u=n.n(l),p=n(5),d=n(15),f=n(182),b=n(184),v=n(136),h=n(46),O=n(71);function j(e){var t=e.children,n=e.className,a=e.content,o=e.hidden,c=e.visible,i=Object(s.a)(Object(d.a)(c,"visible"),Object(d.a)(o,"hidden"),"content",n),l=Object(f.a)(j,e),v=Object(b.a)(j,e);return u.a.createElement(v,Object(r.a)({},l,{className:i}),p.a.isNil(t)?a:t)}j.handledProps=["as","children","className","content","hidden","visible"],j.propTypes={};var m=j,y=n(19);function g(e){var t=e.attached,n=e.basic,a=e.buttons,o=e.children,i=e.className,l=e.color,v=e.compact,h=e.content,O=e.floated,j=e.fluid,m=e.icon,_=e.inverted,w=e.labeled,C=e.negative,E=e.positive,N=e.primary,S=e.secondary,I=e.size,P=e.toggle,k=e.vertical,x=e.widths,T=Object(s.a)("ui",l,I,Object(d.a)(n,"basic"),Object(d.a)(v,"compact"),Object(d.a)(j,"fluid"),Object(d.a)(m,"icon"),Object(d.a)(_,"inverted"),Object(d.a)(w,"labeled"),Object(d.a)(C,"negative"),Object(d.a)(E,"positive"),Object(d.a)(N,"primary"),Object(d.a)(S,"secondary"),Object(d.a)(P,"toggle"),Object(d.a)(k,"vertical"),Object(d.b)(t,"attached"),Object(d.e)(O,"floated"),Object(d.g)(x),"buttons",i),D=Object(f.a)(g,e),A=Object(b.a)(g,e);return Object(c.a)(a)?u.a.createElement(A,Object(r.a)({},D,{className:T}),p.a.isNil(o)?h:o):u.a.createElement(A,Object(r.a)({},D,{className:T}),Object(y.a)(a,(function(e){return R.create(e)})))}g.handledProps=["as","attached","basic","buttons","children","className","color","compact","content","floated","fluid","icon","inverted","labeled","negative","positive","primary","secondary","size","toggle","vertical","widths"],g.propTypes={};var _=g;function w(e){var t=e.className,n=e.text,a=Object(s.a)("or",t),o=Object(f.a)(w,e),c=Object(b.a)(w,e);return u.a.createElement(c,Object(r.a)({},o,{className:a,"data-text":n}))}w.handledProps=["as","className","text"],w.propTypes={};var C=w,E=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).ref=Object(l.createRef)(),t.computeElementType=function(){var e=t.props,n=e.attached,r=e.label;if(!Object(c.a)(n)||!Object(c.a)(r))return"div"},t.computeTabIndex=function(e){var n=t.props,r=n.disabled,a=n.tabIndex;return Object(c.a)(a)?r?-1:"div"===e?0:void 0:a},t.focus=function(){return Object(o.a)(t.ref.current,"focus")},t.handleClick=function(e){t.props.disabled?e.preventDefault():Object(o.a)(t.props,"onClick",e,t.props)},t.hasIconClass=function(){var e=t.props,n=e.labelPosition,r=e.children,a=e.content,o=e.icon;return!0===o||o&&(n||p.a.isNil(r)&&Object(c.a)(a))},t}Object(a.a)(t,e);var n=t.prototype;return n.computeButtonAriaRole=function(e){var t=this.props.role;return Object(c.a)(t)?"button"!==e?"button":void 0:t},n.render=function(){var e=this.props,n=e.active,a=e.animated,o=e.attached,l=e.basic,v=e.children,j=e.circular,m=e.className,y=e.color,g=e.compact,_=e.content,w=e.disabled,C=e.floated,E=e.fluid,R=e.icon,N=e.inverted,S=e.label,I=e.labelPosition,P=e.loading,k=e.negative,x=e.positive,T=e.primary,D=e.secondary,A=e.size,M=e.toggle,K=Object(s.a)(y,A,Object(d.a)(n,"active"),Object(d.a)(l,"basic"),Object(d.a)(j,"circular"),Object(d.a)(g,"compact"),Object(d.a)(E,"fluid"),Object(d.a)(this.hasIconClass(),"icon"),Object(d.a)(N,"inverted"),Object(d.a)(P,"loading"),Object(d.a)(k,"negative"),Object(d.a)(x,"positive"),Object(d.a)(T,"primary"),Object(d.a)(D,"secondary"),Object(d.a)(M,"toggle"),Object(d.b)(a,"animated"),Object(d.b)(o,"attached")),F=Object(s.a)(Object(d.b)(I||!!S,"labeled")),B=Object(s.a)(Object(d.a)(w,"disabled"),Object(d.e)(C,"floated")),U=Object(f.a)(t,this.props),V=Object(b.a)(t,this.props,this.computeElementType),G=this.computeTabIndex(V);if(!Object(c.a)(S)){var H=Object(s.a)("ui",K,"button",m),z=Object(s.a)("ui",F,"button",m,B),L=O.a.create(S,{defaultProps:{basic:!0,pointing:"left"===I?"right":"left"},autoGenerateKey:!1});return u.a.createElement(V,Object(r.a)({},U,{className:z,onClick:this.handleClick}),"left"===I&&L,u.a.createElement(i.a,{innerRef:this.ref},u.a.createElement("button",{className:H,"aria-pressed":M?!!n:void 0,disabled:w,tabIndex:G},h.a.create(R,{autoGenerateKey:!1})," ",_)),("right"===I||!I)&&L)}var q=Object(s.a)("ui",K,B,F,"button",m),Q=!p.a.isNil(v),J=this.computeButtonAriaRole(V);return u.a.createElement(i.a,{innerRef:this.ref},u.a.createElement(V,Object(r.a)({},U,{className:q,"aria-pressed":M?!!n:void 0,disabled:w&&"button"===V||void 0,onClick:this.handleClick,role:J,tabIndex:G}),Q&&v,!Q&&h.a.create(R,{autoGenerateKey:!1}),!Q&&_))},t}(l.Component);E.handledProps=["active","animated","as","attached","basic","children","circular","className","color","compact","content","disabled","floated","fluid","icon","inverted","label","labelPosition","loading","negative","onClick","positive","primary","role","secondary","size","tabIndex","toggle"],E.propTypes={},E.defaultProps={as:"button"},E.Content=m,E.Group=_,E.Or=C,E.create=Object(v.f)(E,(function(e){return{content:e}}));var R=t.a=E},21:function(e,t){e.exports=window.wp.domReady},22:function(e,t){e.exports=window.wp.url},27:function(e,t){e.exports=window.wp.i18n},301:function(e,t,n){"use strict";var r=n(2),a=n(12),o=n(34),c=n(19),i=n(7),s=n(24),l=n(10),u=n(82),p=n(4),d=(n(0),n(1)),f=n.n(d),b=n(182),v=n(110),h=n(15),O=n(184),j=n(5),m=n(136),y=n(156),g=n(46),_=n(71),w=function(e){function t(){for(var n,a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(n=e.call.apply(e,[this].concat(o))||this).inputRef=Object(d.createRef)(),n.computeIcon=function(){var e=n.props,t=e.loading,r=e.icon;return Object(l.a)(r)?t?"spinner":void 0:r},n.computeTabIndex=function(){var e=n.props,t=e.disabled,r=e.tabIndex;return Object(l.a)(r)?t?-1:void 0:r},n.focus=function(){return n.inputRef.current.focus()},n.select=function(){return n.inputRef.current.select()},n.handleChange=function(e){var t=Object(s.a)(e,"target.value");Object(i.a)(n.props,"onChange",e,Object(r.a)({},n.props,{value:t}))},n.handleChildOverrides=function(e,t){return Object(r.a)({},t,e.props,{ref:function(t){Object(u.a)(e.ref,t),n.inputRef.current=t}})},n.partitionProps=function(){var e=n.props,a=e.disabled,o=e.type,c=n.computeTabIndex(),i=Object(b.a)(t,n.props),s=Object(v.c)(i),l=s[0],u=s[1];return[Object(r.a)({},l,{disabled:a,type:o,tabIndex:c,onChange:n.handleChange,ref:n.inputRef}),u]},n}return Object(a.a)(t,e),t.prototype.render=function(){var e=this,n=this.props,a=n.action,i=n.actionPosition,s=n.children,l=n.className,u=n.disabled,b=n.error,v=n.fluid,w=n.focus,C=n.icon,E=n.iconPosition,R=n.input,N=n.inverted,S=n.label,I=n.labelPosition,P=n.loading,k=n.size,x=n.transparent,T=n.type,D=Object(p.a)("ui",k,Object(h.a)(u,"disabled"),Object(h.a)(b,"error"),Object(h.a)(v,"fluid"),Object(h.a)(w,"focus"),Object(h.a)(N,"inverted"),Object(h.a)(P,"loading"),Object(h.a)(x,"transparent"),Object(h.e)(i,"action")||Object(h.a)(a,"action"),Object(h.e)(E,"icon")||Object(h.a)(C||P,"icon"),Object(h.e)(I,"labeled")||Object(h.a)(S,"labeled"),"input",l),A=Object(O.a)(t,this.props),M=this.partitionProps(),K=M[0],F=M[1];if(!j.a.isNil(s)){var B=Object(c.a)(d.Children.toArray(s),(function(t){return"input"!==t.type?t:Object(d.cloneElement)(t,e.handleChildOverrides(t,K))}));return f.a.createElement(A,Object(r.a)({},F,{className:D}),B)}var U=y.a.create(a,{autoGenerateKey:!1}),V=_.a.create(S,{defaultProps:{className:Object(p.a)("label",Object(o.a)(I,"corner")&&I)},autoGenerateKey:!1});return f.a.createElement(A,Object(r.a)({},F,{className:D}),"left"===i&&U,"right"!==I&&V,Object(m.b)(R||T,{defaultProps:K,autoGenerateKey:!1}),g.a.create(this.computeIcon(),{autoGenerateKey:!1}),"left"!==i&&U,"right"===I&&V)},t}(d.Component);w.handledProps=["action","actionPosition","as","children","className","disabled","error","fluid","focus","icon","iconPosition","input","inverted","label","labelPosition","loading","onChange","size","tabIndex","transparent","type"],w.propTypes={},w.defaultProps={type:"text"},w.create=Object(m.f)(w,(function(e){return{type:e}})),t.a=w},302:function(e,t,n){"use strict";var r=n(55);t.a=r.instance},32:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(50);var a=n(42),o=n(51);function c(e,t){return Object(r.a)(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);c=!0);}catch(e){i=!0,a=e}finally{try{c||null==n.return||n.return()}finally{if(i)throw a}}return o}}(e,t)||Object(a.a)(e,t)||Object(o.a)()}},323:function(e,t){e.exports=window.wp.htmlEntities},37:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},42:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(37);function a(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},49:function(e,t){e.exports=window.wp.apiFetch},50:function(e,t,n){"use strict";function r(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return r}))},51:function(e,t,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return r}))},511:function(e,t,n){n(35),e.exports=n(513)},513:function(e,t,n){"use strict";n.r(t);var r=n(32),a=n(53),o=n(58),c=n(12),i=n(2),s=n(59),l=n(43),u=n(95),p=n(140),d=p.a&&new p.a,f=d?function(e,t){return d.set(e,t),e}:u.a,b=n(38),v=Object.create,h=function(){function e(){}return function(t){if(!Object(b.a)(t))return{};if(v)return v(t);e.prototype=t;var n=new e;return e.prototype=void 0,n}}();var O=function(e){return function(){var t=arguments;switch(t.length){case 0:return new e;case 1:return new e(t[0]);case 2:return new e(t[0],t[1]);case 3:return new e(t[0],t[1],t[2]);case 4:return new e(t[0],t[1],t[2],t[3]);case 5:return new e(t[0],t[1],t[2],t[3],t[4]);case 6:return new e(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new e(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var n=h(e.prototype),r=e.apply(n,t);return Object(b.a)(r)?r:n}},j=n(31);var m=function(e,t,n){var r=1&t,a=O(e);return function t(){var o=this&&this!==j.a&&this instanceof t?a:e;return o.apply(r?n:this,arguments)}},y=n(123),g=Math.max;var _=function(e,t,n,r){for(var a=-1,o=e.length,c=n.length,i=-1,s=t.length,l=g(o-c,0),u=Array(s+l),p=!r;++i<s;)u[i]=t[i];for(;++a<c;)(p||a<o)&&(u[n[a]]=e[a]);for(;l--;)u[i++]=e[a++];return u},w=Math.max;var C=function(e,t,n,r){for(var a=-1,o=e.length,c=-1,i=n.length,s=-1,l=t.length,u=w(o-i,0),p=Array(u+l),d=!r;++a<u;)p[a]=e[a];for(var f=a;++s<l;)p[f+s]=t[s];for(;++c<i;)(d||a<o)&&(p[f+n[c]]=e[a++]);return p};var E=function(e,t){for(var n=e.length,r=0;n--;)e[n]===t&&++r;return r};var R=function(){};function N(e){this.__wrapped__=e,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=4294967295,this.__views__=[]}N.prototype=h(R.prototype),N.prototype.constructor=N;var S=N,I=n(126),P=d?function(e){return d.get(e)}:I.a,k={},x=Object.prototype.hasOwnProperty;var T=function(e){for(var t=e.name+"",n=k[t],r=x.call(k,t)?n.length:0;r--;){var a=n[r],o=a.func;if(null==o||o==e)return a.name}return t};function D(e,t){this.__wrapped__=e,this.__actions__=[],this.__chain__=!!t,this.__index__=0,this.__values__=void 0}D.prototype=h(R.prototype),D.prototype.constructor=D;var A=D,M=n(13),K=n(30);var F=function(e,t){var n=-1,r=e.length;for(t||(t=Array(r));++n<r;)t[n]=e[n];return t};var B=function(e){if(e instanceof S)return e.clone();var t=new A(e.__wrapped__,e.__chain__);return t.__actions__=F(e.__actions__),t.__index__=e.__index__,t.__values__=e.__values__,t},U=Object.prototype.hasOwnProperty;function V(e){if(Object(K.a)(e)&&!Object(M.a)(e)&&!(e instanceof S)){if(e instanceof A)return e;if(U.call(e,"__wrapped__"))return B(e)}return new A(e)}V.prototype=R.prototype,V.prototype.constructor=V;var G=V;var H=function(e){var t=T(e),n=G[t];if("function"!=typeof n||!(t in S.prototype))return!1;if(e===n)return!0;var r=P(n);return!!r&&e===r[0]},z=n(207),L=Object(z.a)(f),q=/\{\n\/\* \[wrapped with (.+)\] \*/,Q=/,? & /;var J=function(e){var t=e.match(q);return t?t[1].split(Q):[]},Y=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;var W=function(e,t){var n=t.length;if(!n)return e;var r=n-1;return t[r]=(n>1?"& ":"")+t[r],t=t.join(n>2?", ":" "),e.replace(Y,"{\n/* [wrapped with "+t+"] */\n")},$=n(130),X=n(212),Z=n(96),ee=[["ary",128],["bind",1],["bindKey",2],["curry",8],["curryRight",16],["flip",512],["partial",32],["partialRight",64],["rearg",256]];var te=function(e,t){return Object(X.a)(ee,(function(n){var r="_."+n[0];t&n[1]&&!Object(Z.a)(e,r)&&e.push(r)})),e.sort()};var ne=function(e,t,n){var r=t+"";return Object($.a)(e,W(r,te(J(r),n)))};var re=function(e,t,n,r,a,o,c,i,s,l){var u=8&t;t|=u?32:64,4&(t&=~(u?64:32))||(t&=-4);var p=[e,t,a,u?o:void 0,u?c:void 0,u?void 0:o,u?void 0:c,i,s,l],d=n.apply(void 0,p);return H(e)&&L(d,p),d.placeholder=r,ne(d,e,t)};var ae=function(e){return e.placeholder},oe=n(80),ce=Math.min;var ie=function(e,t){for(var n=e.length,r=ce(t.length,n),a=F(e);r--;){var o=t[r];e[r]=Object(oe.a)(o,n)?a[o]:void 0}return e};var se=function(e,t){for(var n=-1,r=e.length,a=0,o=[];++n<r;){var c=e[n];c!==t&&"__lodash_placeholder__"!==c||(e[n]="__lodash_placeholder__",o[a++]=n)}return o};var le=function e(t,n,r,a,o,c,i,s,l,u){var p=128&n,d=1&n,f=2&n,b=24&n,v=512&n,h=f?void 0:O(t);return function m(){for(var y=arguments.length,g=Array(y),w=y;w--;)g[w]=arguments[w];if(b)var R=ae(m),N=E(g,R);if(a&&(g=_(g,a,o,b)),c&&(g=C(g,c,i,b)),y-=N,b&&y<u){var S=se(g,R);return re(t,n,e,m.placeholder,r,g,S,s,l,u-y)}var I=d?r:this,P=f?I[t]:t;return y=g.length,s?g=ie(g,s):v&&y>1&&g.reverse(),p&&l<y&&(g.length=l),this&&this!==j.a&&this instanceof m&&(P=h||O(P)),P.apply(I,g)}};var ue=function(e,t,n){var r=O(e);return function a(){for(var o=arguments.length,c=Array(o),i=o,s=ae(a);i--;)c[i]=arguments[i];var l=o<3&&c[0]!==s&&c[o-1]!==s?[]:se(c,s);if((o-=l.length)<n)return re(e,t,le,a.placeholder,void 0,c,l,void 0,void 0,n-o);var u=this&&this!==j.a&&this instanceof a?r:e;return Object(y.a)(u,this,c)}};var pe=function(e,t,n,r){var a=1&t,o=O(e);return function t(){for(var c=-1,i=arguments.length,s=-1,l=r.length,u=Array(l+i),p=this&&this!==j.a&&this instanceof t?o:e;++s<l;)u[s]=r[s];for(;i--;)u[s++]=arguments[++c];return Object(y.a)(p,a?n:this,u)}},de=Math.min;var fe=function(e,t){var n=e[1],r=t[1],a=n|r,o=a<131,c=128==r&&8==n||128==r&&256==n&&e[7].length<=t[8]||384==r&&t[7].length<=t[8]&&8==n;if(!o&&!c)return e;1&r&&(e[2]=t[2],a|=1&n?0:4);var i=t[3];if(i){var s=e[3];e[3]=s?_(s,i,t[4]):i,e[4]=s?se(e[3],"__lodash_placeholder__"):t[4]}return(i=t[5])&&(s=e[5],e[5]=s?C(s,i,t[6]):i,e[6]=s?se(e[5],"__lodash_placeholder__"):t[6]),(i=t[7])&&(e[7]=i),128&r&&(e[8]=null==e[8]?t[8]:de(e[8],t[8])),null==e[9]&&(e[9]=t[9]),e[0]=t[0],e[1]=a,e},be=n(86),ve=Math.max;var he=function(e,t,n,r,a,o,c,i){var s=2&t;if(!s&&"function"!=typeof e)throw new TypeError("Expected a function");var l=r?r.length:0;if(l||(t&=-97,r=a=void 0),c=void 0===c?c:ve(Object(be.a)(c),0),i=void 0===i?i:Object(be.a)(i),l-=a?a.length:0,64&t){var u=r,p=a;r=a=void 0}var d=s?void 0:P(e),b=[e,t,n,r,a,u,p,o,c,i];if(d&&fe(b,d),e=b[0],t=b[1],n=b[2],r=b[3],a=b[4],!(i=b[9]=void 0===b[9]?s?0:e.length:ve(b[9]-l,0))&&24&t&&(t&=-25),t&&1!=t)v=8==t||16==t?ue(e,t,i):32!=t&&33!=t||a.length?le.apply(void 0,b):pe(e,t,n,r);else var v=m(e,t,n);return ne((d?f:L)(v,b),e,t)},Oe=Object(l.a)((function(e,t){var n=se(t,ae(Oe));return he(e,64,void 0,t,n)}));Oe.placeholder={};var je=Oe,me=n(186),ye=n(19),ge=n(24),_e=n(118),we=n(7),Ce=n(215),Ee=n(100),Re=n(4),Ne=n(18),Se=n.n(Ne),Ie=(n(0),n(1)),Pe=n.n(Ie),ke=n(64),xe=n.n(ke),Te=n(302),De=n(300),Ae=n(15),Me=n(182),Ke=n(184),Fe=n(110),Be=n(303),Ue=n(301),Ve=n(5);function Ge(e){var t=e.categoryContent,n=e.resultsContent;return Pe.a.createElement(Pe.a.Fragment,null,Pe.a.createElement("div",{className:"name"},t),Pe.a.createElement("div",{className:"results"},n))}Ge.handledProps=["categoryContent","resultsContent"],Ge.propTypes={};var He=Ge;function ze(e){var t=e.active,n=e.children,r=e.className,a=e.content,o=e.layoutRenderer,c=e.renderer,s=Object(Re.a)(Object(Ae.a)(t,"active"),"category",r),l=Object(Me.a)(ze,e),u=Object(Ke.a)(ze,e),p=c(e),d=Ve.a.isNil(n)?a:n;return Pe.a.createElement(u,Object(i.a)({},l,{className:s}),o({categoryContent:p,resultsContent:d}))}ze.handledProps=["active","as","children","className","content","layoutRenderer","name","renderer","results"],ze.defaultProps={layoutRenderer:He,renderer:function(e){return e.name}},ze.propTypes={};var Le=ze,qe=n(136),Qe=function(e){var t=e.image,n=e.price,r=e.title,a=e.description;return[t&&Pe.a.createElement("div",{key:"image",className:"image"},Object(qe.a)(t,{autoGenerateKey:!1})),Pe.a.createElement("div",{key:"content",className:"content"},n&&Pe.a.createElement("div",{className:"price"},n),r&&Pe.a.createElement("div",{className:"title"},r),a&&Pe.a.createElement("div",{className:"description"},a))]};Qe.handledProps=[];var Je=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).handleClick=function(e){var n=t.props.onClick;n&&n(e,t.props)},t}return Object(c.a)(t,e),t.prototype.render=function(){var e=this.props,n=e.active,r=e.className,a=e.renderer,o=Object(Re.a)(Object(Ae.a)(n,"active"),"result",r),c=Object(Me.a)(t,this.props),s=Object(Ke.a)(t,this.props);return Pe.a.createElement(s,Object(i.a)({},c,{className:o,onClick:this.handleClick}),a(this.props))},t}(Ie.Component);function Ye(e){var t=e.children,n=e.className,r=e.content,a=Object(Re.a)("results transition",n),o=Object(Me.a)(Ye,e),c=Object(Ke.a)(Ye,e);return Pe.a.createElement(c,Object(i.a)({},o,{className:a}),Ve.a.isNil(t)?r:t)}Je.handledProps=["active","as","className","content","description","id","image","onClick","price","renderer","title"],Je.propTypes={},Je.defaultProps={renderer:Qe},Ye.handledProps=["as","children","className","content"],Ye.propTypes={};var We=Ye,$e=function(e){var t=e.input;return Object(Ee.a)(t)?Object(i.a)({},e,{input:{className:"prompt"}}):Object(Ce.a)(t)?Object(i.a)({},e,{input:Object(i.a)({},t,{className:Object(Re.a)(t.className,"prompt")})}):e},Xe=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).handleResultSelect=function(e,n){Object(we.a)(t.props,"onResultSelect",e,Object(i.a)({},t.props,{result:n}))},t.handleSelectionChange=function(e){var n=t.getSelectedResult();Object(we.a)(t.props,"onSelectionChange",e,Object(i.a)({},t.props,{result:n}))},t.closeOnEscape=function(e){Se.a.getCode(e)===Se.a.Escape&&(e.preventDefault(),t.close())},t.moveSelectionOnKeyDown=function(e){switch(Se.a.getCode(e)){case Se.a.ArrowDown:e.preventDefault(),t.moveSelectionBy(e,1);break;case Se.a.ArrowUp:e.preventDefault(),t.moveSelectionBy(e,-1)}},t.selectItemOnEnter=function(e){if(Se.a.getCode(e)===Se.a.Enter){var n=t.getSelectedResult();n&&(e.preventDefault(),t.setValue(n.title),t.handleResultSelect(e,n),t.close())}},t.closeOnDocumentClick=function(e){t.close()},t.handleMouseDown=function(e){t.isMouseDown=!0,Object(we.a)(t.props,"onMouseDown",e,t.props),Te.a.sub("mouseup",t.handleDocumentMouseUp)},t.handleDocumentMouseUp=function(){t.isMouseDown=!1,Te.a.unsub("mouseup",t.handleDocumentMouseUp)},t.handleInputClick=function(e){e.nativeEvent.stopImmediatePropagation(),t.tryOpen()},t.handleItemClick=function(e,n){var r=n.id,a=t.getSelectedResult(r);e.nativeEvent.stopImmediatePropagation(),t.setValue(a.title),t.handleResultSelect(e,a),t.close()},t.handleItemMouseDown=function(e){e.preventDefault()},t.handleFocus=function(e){Object(we.a)(t.props,"onFocus",e,t.props),t.setState({focus:!0})},t.handleBlur=function(e){Object(we.a)(t.props,"onBlur",e,t.props),t.setState({focus:!1})},t.handleSearchChange=function(e){e.stopPropagation();var n=t.props.minCharacters,r=t.state.open,a=e.target.value;Object(we.a)(t.props,"onSearchChange",e,Object(i.a)({},t.props,{value:a})),a.length<n?t.close():r||t.tryOpen(a),t.setValue(a)},t.getFlattenedResults=function(){var e=t.props,n=e.category,r=e.results;return n?Object(_e.a)(r,(function(e,t){return e.concat(t.results)}),[]):r},t.getSelectedResult=function(e){void 0===e&&(e=t.state.selectedIndex);var n=t.getFlattenedResults();return Object(ge.a)(n,e)},t.setValue=function(e){var n=t.props.selectFirstResult;t.setState({value:e,selectedIndex:n?0:-1})},t.moveSelectionBy=function(e,n){var r=t.state.selectedIndex,a=t.getFlattenedResults().length-1,o=r+n;o>a?o=0:o<0&&(o=a),t.setState({selectedIndex:o}),t.scrollSelectedItemIntoView(),t.handleSelectionChange(e)},t.scrollSelectedItemIntoView=function(){if(Object(De.a)()){var e=document.querySelector(".ui.search.active.visible .results.visible");if(e){var t=e.querySelector(".result.active");if(t){var n=t.offsetTop<e.scrollTop,r=t.offsetTop+t.clientHeight>e.scrollTop+e.clientHeight;n?e.scrollTop=t.offsetTop:r&&(e.scrollTop=t.offsetTop+t.clientHeight-e.clientHeight)}}}},t.tryOpen=function(e){void 0===e&&(e=t.state.value);var n=t.props.minCharacters;e.length<n||t.open()},t.open=function(){t.setState({open:!0})},t.close=function(){t.setState({open:!1})},t.renderSearchInput=function(e){var n=t.props,r=n.icon,a=n.input,o=t.state.value;return Ue.a.create(a,{autoGenerateKey:!1,defaultProps:Object(i.a)({},e,{autoComplete:"off",icon:r,onChange:t.handleSearchChange,onClick:t.handleInputClick,tabIndex:"0",value:o}),overrideProps:$e})},t.renderNoResults=function(){var e=t.props,n=e.noResultsDescription,r=e.noResultsMessage;return Pe.a.createElement("div",{className:"message empty"},Pe.a.createElement("div",{className:"header"},r),n&&Pe.a.createElement("div",{className:"description"},n))},t.renderResult=function(e,n,r,a){var c=e.childKey,s=Object(o.a)(e,["childKey"]);void 0===a&&(a=0);var l=t.props.resultRenderer,u=t.state.selectedIndex,p=n+a;return Pe.a.createElement(Je,Object(i.a)({key:null!=c?c:s.id||s.title,active:u===p,onClick:t.handleItemClick,onMouseDown:t.handleItemMouseDown,renderer:l},s,{id:p}))},t.renderResults=function(){var e=t.props.results;return Object(ye.a)(e,t.renderResult)},t.renderCategories=function(){var e=t.props,n=e.categoryLayoutRenderer,r=e.categoryRenderer,a=e.results,c=t.state.selectedIndex,s=0;return Object(ye.a)(a,(function(e){var a=e.childKey,l=Object(o.a)(e,["childKey"]),u=Object(i.a)({key:null!=a?a:l.name,active:Object(me.a)(c,s,s+l.results.length),layoutRenderer:n,renderer:r},l),p=je(t.renderResult,s);return s+=l.results.length,Pe.a.createElement(Le,u,l.results.map(p))}))},t.renderMenuContent=function(){var e=t.props,n=e.category,r=e.showNoResults,a=e.results;return Object(s.a)(a)?r?t.renderNoResults():null:n?t.renderCategories():t.renderResults()},t.renderResultsMenu=function(){var e=t.state.open?"visible":"",n=t.renderMenuContent();if(n)return Pe.a.createElement(We,{className:e},n)},t}Object(c.a)(t,e),t.getAutoControlledStateFromProps=function(e,t){if(void 0!==t.prevValue&&xe()(t.prevValue,t.value))return{prevValue:t.value};var n=e.selectFirstResult?0:-1;return{prevValue:t.value,selectedIndex:n}};var n=t.prototype;return n.shouldComponentUpdate=function(e,t){return!xe()(e,this.props)||!xe()(t,this.state)},n.componentDidUpdate=function(e,t){!t.focus&&this.state.focus?(this.isMouseDown||this.tryOpen(),this.state.open&&Te.a.sub("keydown",[this.moveSelectionOnKeyDown,this.selectItemOnEnter])):t.focus&&!this.state.focus&&(this.isMouseDown||this.close(),Te.a.unsub("keydown",[this.moveSelectionOnKeyDown,this.selectItemOnEnter])),!t.open&&this.state.open?(this.open(),Te.a.sub("click",this.closeOnDocumentClick),Te.a.sub("keydown",[this.closeOnEscape,this.moveSelectionOnKeyDown,this.selectItemOnEnter])):t.open&&!this.state.open&&(this.close(),Te.a.unsub("click",this.closeOnDocumentClick),Te.a.unsub("keydown",[this.closeOnEscape,this.moveSelectionOnKeyDown,this.selectItemOnEnter]))},n.componentWillUnmount=function(){Te.a.unsub("click",this.closeOnDocumentClick),Te.a.unsub("keydown",[this.closeOnEscape,this.moveSelectionOnKeyDown,this.selectItemOnEnter])},n.render=function(){var e=this.state,n=e.searchClasses,r=e.focus,a=e.open,o=this.props,c=o.aligned,s=o.category,l=o.className,u=o.fluid,p=o.loading,d=o.size,f=Object(Re.a)("ui",a&&"active visible",d,n,Object(Ae.a)(s,"category"),Object(Ae.a)(r,"focus"),Object(Ae.a)(u,"fluid"),Object(Ae.a)(p,"loading"),Object(Ae.e)(c,"aligned"),"search",l),b=Object(Me.a)(t,this.props),v=Object(Ke.a)(t,this.props),h=Object(Fe.c)(b,{htmlProps:Fe.b}),O=h[0],j=h[1];return Pe.a.createElement(v,Object(i.a)({},j,{className:f,onBlur:this.handleBlur,onFocus:this.handleFocus,onMouseDown:this.handleMouseDown}),this.renderSearchInput(O),this.renderResultsMenu())},t}(Be.a);Xe.handledProps=["aligned","as","category","categoryLayoutRenderer","categoryRenderer","className","defaultOpen","defaultValue","fluid","icon","input","loading","minCharacters","noResultsDescription","noResultsMessage","onBlur","onFocus","onMouseDown","onResultSelect","onSearchChange","onSelectionChange","open","resultRenderer","results","selectFirstResult","showNoResults","size","value"],Xe.propTypes={},Xe.defaultProps={icon:"search",input:"text",minCharacters:1,noResultsMessage:"No results found.",showNoResults:!0},Xe.autoControlledProps=["open","value"],Xe.Category=Le,Xe.Result=Je,Xe.Results=We;var Ze=n(9),et=n(27),tt=n(21),nt=n.n(tt),rt=n(49),at=n.n(rt),ot=n(22),ct=n(323);function it(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function st(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?it(Object(n),!0).forEach((function(t){Object(a.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):it(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var lt={loading:!1,results:[{key:null,value:null,title:"Start typing to search for a topic..."}],value:"",selected:!1},ut=function(e,t){switch(t.type){case"CLEAN_QUERY":return lt;case"START_SEARCH":return st(st({},e),{},{loading:!0,value:t.query});case"FINISH_SEARCH":return st(st({},e),{},{loading:!1,results:t.results});case"UPDATE_SELECTION":return st(st({},e),{},{loading:!0,value:t.selection.title,selected:t.selection.value});default:throw new Error}},pt=function(e){var t=e.restrictToTermId,n=void 0===t?0:t,a=Object(Ze.useReducer)(ut,lt),o=Object(r.a)(a,2),c=o[0],i=o[1],s=c.loading,l=c.results,u=c.value,p=c.selected,d=Object(Ze.useRef)(),f=Object(Ze.useCallback)((function(e,t){clearTimeout(d.current),i({type:"START_SEARCH",query:t.value}),d.current=setTimeout((function(){0!==t.value.length?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return new Promise((function(n){var r={per_page:25};""!==e&&(r.search=e),0!==t&&""!==t&&(r.parent=t);var a={method:"GET",path:Object(ot.addQueryArgs)("/prc-api/v2/blocks/topic-index-search",r)};console.log("Search Request->",a),at()(a).then((function(e){console.log("... returns: ",e);var t=e.map((function(e){return{key:e.id,value:e.link,title:Object(ct.decodeEntities)(e.name)}}));n(t)}))}))}(t.value,n).then((function(e){i({type:"FINISH_SEARCH",results:e})})):i({type:"CLEAN_QUERY"})}),300)}),[]);return Object(Ze.useEffect)((function(){return function(){clearTimeout(d.current)}}),[]),Object(Ze.useEffect)((function(){!1!==p&&setTimeout((function(){window.location=p}),1e3)}),[p]),React.createElement(Xe,{loading:s,onResultSelect:function(e,t){var n=t.result;i({type:"UPDATE_SELECTION",selection:n})},onSearchChange:f,results:l,value:u,defaultValue:null,fluid:!0,placeholder:Object(et.__)("Start typing to search for a topic...")})};nt()((function(){var e=document.querySelectorAll(".js-react-topic-index-search-field");e&&e.forEach((function(e){var t=e.getAttribute("data-term-id");console.log(e,t),Object(Ze.render)(React.createElement(pt,{restrictToTermId:t}),e)}))}))},53:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},59:function(e,t,n){"use strict";var r=n(81),a=n(67),o=n(63),c=n(13),i=n(29),s=n(85),l=n(120),u=n(104),p=Object.prototype.hasOwnProperty;t.a=function(e){if(null==e)return!0;if(Object(i.a)(e)&&(Object(c.a)(e)||"string"==typeof e||"function"==typeof e.splice||Object(s.a)(e)||Object(u.a)(e)||Object(o.a)(e)))return!e.length;var t=Object(a.a)(e);if("[object Map]"==t||"[object Set]"==t)return!e.size;if(Object(l.a)(e))return!Object(r.a)(e).length;for(var n in e)if(p.call(e,n))return!1;return!0}},64:function(e,t,n){var r=n(20);e.exports=function(e,t,n,a){var o=n?n.call(a,e,t):void 0;if(void 0!==o)return!!o;if(e===t)return!0;if("object"!==r(e)||!e||"object"!==r(t)||!t)return!1;var c=Object.keys(e),i=Object.keys(t);if(c.length!==i.length)return!1;for(var s=Object.prototype.hasOwnProperty.bind(t),l=0;l<c.length;l++){var u=c[l];if(!s(u))return!1;var p=e[u],d=t[u];if(!1===(o=n?n.call(a,p,d,u):void 0)||void 0===o&&p!==d)return!1}return!0}},83:function(e,t,n){"use strict";t.a=function(e,t,n,r){var a=-1,o=null==e?0:e.length;for(r&&o&&(n=e[++a]);++a<o;)n=t(n,e[a],a,e);return n}},9:function(e,t){e.exports=window.wp.element}},[[511,0,1,2]]]);
//# sourceMappingURL=topic-index-search-field-03fdb45e.js.map