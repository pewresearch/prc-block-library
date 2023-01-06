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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[23],{1:function(e,t){e.exports=window.React},107:function(e,t){e.exports=window.ReactDOM},135:function(e,t){e.exports=window.wp.htmlEntities},166:function(e,t,n){"use strict";var r=n(175),a=n(60),o=n(54);var c=function(e,t,n,r,a){return a(e,(function(e,a,o){n=r?(r=!1,e):t(n,e,a,o)})),n},i=n(21);t.a=function(e,t,n){var s=Object(i.a)(e)?r.a:c,u=arguments.length<3;return s(e,Object(o.a)(t,4),n,u,a.a)}},20:function(e,t){e.exports=window.wp.domReady},27:function(e,t){e.exports=window.wp.url},28:function(e,t){e.exports=window.wp.i18n},36:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(64);var a=n(42),o=n(65);function c(e,t){return Object(r.a)(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);c=!0);}catch(e){i=!0,a=e}finally{try{c||null==n.return||n.return()}finally{if(i)throw a}}return o}}(e,t)||Object(a.a)(e,t)||Object(o.a)()}},532:function(e,t,n){"use strict";var r=n(4),a=n(19),o=n(61),c=n(37),i=n(10),s=n(35),u=n(17),l=n(113),p=n(8),d=n(1),f=n.n(d),h=n(316),v=n(154),b=n(25),O=n(317),y=n(9),m=n(186),j=n(527),g=n(165),_=n(228),w=function(e){function t(){for(var n,a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(n=e.call.apply(e,[this].concat(o))||this).inputRef=Object(d.createRef)(),n.computeIcon=function(){var e=n.props,t=e.loading,r=e.icon;return Object(u.a)(r)?t?"spinner":void 0:r},n.computeTabIndex=function(){var e=n.props,t=e.disabled,r=e.tabIndex;return Object(u.a)(r)?t?-1:void 0:r},n.focus=function(){return n.inputRef.current.focus()},n.select=function(){return n.inputRef.current.select()},n.handleChange=function(e){var t=Object(s.a)(e,"target.value");Object(i.a)(n.props,"onChange",e,Object(r.a)({},n.props,{value:t}))},n.handleChildOverrides=function(e,t){return Object(r.a)({},t,e.props,{ref:function(t){Object(l.a)(e.ref,t),n.inputRef.current=t}})},n.partitionProps=function(){var e=n.props,a=e.disabled,o=e.type,c=n.computeTabIndex(),i=Object(h.a)(t,n.props),s=Object(v.c)(i),u=s[0],l=s[1];return[Object(r.a)({},u,{disabled:a,type:o,tabIndex:c,onChange:n.handleChange,ref:n.inputRef}),l]},n}return Object(a.a)(t,e),t.prototype.render=function(){var e=this,n=this.props,a=n.action,i=n.actionPosition,s=n.children,u=n.className,l=n.disabled,h=n.error,v=n.fluid,w=n.focus,R=n.icon,C=n.iconPosition,E=n.input,S=n.inverted,N=n.label,I=n.labelPosition,P=n.loading,D=n.size,k=n.transparent,T=n.type,x=Object(p.a)("ui",D,Object(b.a)(l,"disabled"),Object(b.a)(h,"error"),Object(b.a)(v,"fluid"),Object(b.a)(w,"focus"),Object(b.a)(S,"inverted"),Object(b.a)(P,"loading"),Object(b.a)(k,"transparent"),Object(b.e)(i,"action")||Object(b.a)(a,"action"),Object(b.e)(C,"icon")||Object(b.a)(R||P,"icon"),Object(b.e)(I,"labeled")||Object(b.a)(N,"labeled"),"input",u),M=Object(O.a)(t,this.props),A=this.partitionProps(),K=A[0],F=A[1];if(!y.a.isNil(s)){var V=Object(c.a)(d.Children.toArray(s),(function(t){return"input"!==t.type?t:Object(d.cloneElement)(t,e.handleChildOverrides(t,K))}));return f.a.createElement(M,Object(r.a)({},F,{className:x}),V)}var U=j.a.create(a,{autoGenerateKey:!1}),B=_.a.create(N,{defaultProps:{className:Object(p.a)("label",Object(o.a)(I,"corner")&&I)},autoGenerateKey:!1});return f.a.createElement(M,Object(r.a)({},F,{className:x}),"left"===i&&U,"right"!==I&&B,Object(m.b)(E||T,{defaultProps:K,autoGenerateKey:!1}),g.a.create(this.computeIcon(),{autoGenerateKey:!1}),"left"!==i&&U,"right"===I&&B)},t}(d.Component);w.handledProps=["action","actionPosition","as","children","className","disabled","error","fluid","focus","icon","iconPosition","input","inverted","label","labelPosition","loading","onChange","size","tabIndex","transparent","type"],w.propTypes={},w.defaultProps={type:"text"},w.create=Object(m.f)(w,(function(e){return{type:e}})),t.a=w},536:function(e,t,n){"use strict";var r=n(86);t.a=r.instance},64:function(e,t,n){"use strict";function r(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return r}))},642:function(e,t,n){n(30),e.exports=n(651)},65:function(e,t,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return r}))},651:function(e,t,n){"use strict";n.r(t);var r=n(36),a=n(83),o=n(224),c=n(19),i=n(4),s=n(94),u=n(84),l=n(131),p=n(227),d=p.a&&new p.a,f=d?function(e,t){return d.set(e,t),e}:l.a,h=n(59),v=Object.create,b=function(){function e(){}return function(t){if(!Object(h.a)(t))return{};if(v)return v(t);e.prototype=t;var n=new e;return e.prototype=void 0,n}}();var O=function(e){return function(){var t=arguments;switch(t.length){case 0:return new e;case 1:return new e(t[0]);case 2:return new e(t[0],t[1]);case 3:return new e(t[0],t[1],t[2]);case 4:return new e(t[0],t[1],t[2],t[3]);case 5:return new e(t[0],t[1],t[2],t[3],t[4]);case 6:return new e(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new e(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var n=b(e.prototype),r=e.apply(n,t);return Object(h.a)(r)?r:n}},y=n(49);var m=function(e,t,n){var r=1&t,a=O(e);return function t(){var o=this&&this!==y.a&&this instanceof t?a:e;return o.apply(r?n:this,arguments)}},j=n(170),g=Math.max;var _=function(e,t,n,r){for(var a=-1,o=e.length,c=n.length,i=-1,s=t.length,u=g(o-c,0),l=Array(s+u),p=!r;++i<s;)l[i]=t[i];for(;++a<c;)(p||a<o)&&(l[n[a]]=e[a]);for(;u--;)l[i++]=e[a++];return l},w=Math.max;var R=function(e,t,n,r){for(var a=-1,o=e.length,c=-1,i=n.length,s=-1,u=t.length,l=w(o-i,0),p=Array(l+u),d=!r;++a<l;)p[a]=e[a];for(var f=a;++s<u;)p[f+s]=t[s];for(;++c<i;)(d||a<o)&&(p[f+n[c]]=e[a++]);return p};var C=function(e,t){for(var n=e.length,r=0;n--;)e[n]===t&&++r;return r};var E=function(){};function S(e){this.__wrapped__=e,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=4294967295,this.__views__=[]}S.prototype=b(E.prototype),S.prototype.constructor=S;var N=S,I=n(174),P=d?function(e){return d.get(e)}:I.a,D={},k=Object.prototype.hasOwnProperty;var T=function(e){for(var t=e.name+"",n=D[t],r=k.call(D,t)?n.length:0;r--;){var a=n[r],o=a.func;if(null==o||o==e)return a.name}return t};function x(e,t){this.__wrapped__=e,this.__actions__=[],this.__chain__=!!t,this.__index__=0,this.__values__=void 0}x.prototype=b(E.prototype),x.prototype.constructor=x;var M=x,A=n(21),K=n(50);var F=function(e,t){var n=-1,r=e.length;for(t||(t=Array(r));++n<r;)t[n]=e[n];return t};var V=function(e){if(e instanceof N)return e.clone();var t=new M(e.__wrapped__,e.__chain__);return t.__actions__=F(e.__actions__),t.__index__=e.__index__,t.__values__=e.__values__,t},U=Object.prototype.hasOwnProperty;function B(e){if(Object(K.a)(e)&&!Object(A.a)(e)&&!(e instanceof N)){if(e instanceof M)return e;if(U.call(e,"__wrapped__"))return V(e)}return new M(e)}B.prototype=E.prototype,B.prototype.constructor=B;var H=B;var L=function(e){var t=T(e),n=H[t];if("function"!=typeof n||!(t in N.prototype))return!1;if(e===n)return!0;var r=P(n);return!!r&&e===r[0]},G=n(326),q=Object(G.a)(f),z=/\{\n\/\* \[wrapped with (.+)\] \*/,Q=/,? & /;var J=function(e){var t=e.match(z);return t?t[1].split(Q):[]},Y=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;var W=function(e,t){var n=t.length;if(!n)return e;var r=n-1;return t[r]=(n>1?"& ":"")+t[r],t=t.join(n>2?", ":" "),e.replace(Y,"{\n/* [wrapped with "+t+"] */\n")},X=n(180),Z=n(327),$=n(173),ee=[["ary",128],["bind",1],["bindKey",2],["curry",8],["curryRight",16],["flip",512],["partial",32],["partialRight",64],["rearg",256]];var te=function(e,t){return Object(Z.a)(ee,(function(n){var r="_."+n[0];t&n[1]&&!Object($.a)(e,r)&&e.push(r)})),e.sort()};var ne=function(e,t,n){var r=t+"";return Object(X.a)(e,W(r,te(J(r),n)))};var re=function(e,t,n,r,a,o,c,i,s,u){var l=8&t;t|=l?32:64,4&(t&=~(l?64:32))||(t&=-4);var p=[e,t,a,l?o:void 0,l?c:void 0,l?void 0:o,l?void 0:c,i,s,u],d=n.apply(void 0,p);return L(e)&&q(d,p),d.placeholder=r,ne(d,e,t)};var ae=function(e){return e.placeholder},oe=n(111),ce=Math.min;var ie=function(e,t){for(var n=e.length,r=ce(t.length,n),a=F(e);r--;){var o=t[r];e[r]=Object(oe.a)(o,n)?a[o]:void 0}return e};var se=function(e,t){for(var n=-1,r=e.length,a=0,o=[];++n<r;){var c=e[n];c!==t&&"__lodash_placeholder__"!==c||(e[n]="__lodash_placeholder__",o[a++]=n)}return o};var ue=function e(t,n,r,a,o,c,i,s,u,l){var p=128&n,d=1&n,f=2&n,h=24&n,v=512&n,b=f?void 0:O(t);return function m(){for(var j=arguments.length,g=Array(j),w=j;w--;)g[w]=arguments[w];if(h)var E=ae(m),S=C(g,E);if(a&&(g=_(g,a,o,h)),c&&(g=R(g,c,i,h)),j-=S,h&&j<l){var N=se(g,E);return re(t,n,e,m.placeholder,r,g,N,s,u,l-j)}var I=d?r:this,P=f?I[t]:t;return j=g.length,s?g=ie(g,s):v&&j>1&&g.reverse(),p&&u<j&&(g.length=u),this&&this!==y.a&&this instanceof m&&(P=b||O(P)),P.apply(I,g)}};var le=function(e,t,n){var r=O(e);return function a(){for(var o=arguments.length,c=Array(o),i=o,s=ae(a);i--;)c[i]=arguments[i];var u=o<3&&c[0]!==s&&c[o-1]!==s?[]:se(c,s);if((o-=u.length)<n)return re(e,t,ue,a.placeholder,void 0,c,u,void 0,void 0,n-o);var l=this&&this!==y.a&&this instanceof a?r:e;return Object(j.a)(l,this,c)}};var pe=function(e,t,n,r){var a=1&t,o=O(e);return function t(){for(var c=-1,i=arguments.length,s=-1,u=r.length,l=Array(u+i),p=this&&this!==y.a&&this instanceof t?o:e;++s<u;)l[s]=r[s];for(;i--;)l[s++]=arguments[++c];return Object(j.a)(p,a?n:this,l)}},de=Math.min;var fe=function(e,t){var n=e[1],r=t[1],a=n|r,o=a<131,c=128==r&&8==n||128==r&&256==n&&e[7].length<=t[8]||384==r&&t[7].length<=t[8]&&8==n;if(!o&&!c)return e;1&r&&(e[2]=t[2],a|=1&n?0:4);var i=t[3];if(i){var s=e[3];e[3]=s?_(s,i,t[4]):i,e[4]=s?se(e[3],"__lodash_placeholder__"):t[4]}return(i=t[5])&&(s=e[5],e[5]=s?R(s,i,t[6]):i,e[6]=s?se(e[5],"__lodash_placeholder__"):t[6]),(i=t[7])&&(e[7]=i),128&r&&(e[8]=null==e[8]?t[8]:de(e[8],t[8])),null==e[9]&&(e[9]=t[9]),e[0]=t[0],e[1]=a,e},he=n(126),ve=Math.max;var be=function(e,t,n,r,a,o,c,i){var s=2&t;if(!s&&"function"!=typeof e)throw new TypeError("Expected a function");var u=r?r.length:0;if(u||(t&=-97,r=a=void 0),c=void 0===c?c:ve(Object(he.a)(c),0),i=void 0===i?i:Object(he.a)(i),u-=a?a.length:0,64&t){var l=r,p=a;r=a=void 0}var d=s?void 0:P(e),h=[e,t,n,r,a,l,p,o,c,i];if(d&&fe(h,d),e=h[0],t=h[1],n=h[2],r=h[3],a=h[4],!(i=h[9]=void 0===h[9]?s?0:e.length:ve(h[9]-u,0))&&24&t&&(t&=-25),t&&1!=t)v=8==t||16==t?le(e,t,i):32!=t&&33!=t||a.length?ue.apply(void 0,h):pe(e,t,n,r);else var v=m(e,t,n);return ne((d?f:q)(v,h),e,t)},Oe=Object(u.a)((function(e,t){var n=se(t,ae(Oe));return be(e,64,void 0,t,n)}));Oe.placeholder={};var ye=Oe,me=n(321),je=n(37),ge=n(35),_e=n(166),we=n(10),Re=n(333),Ce=n(134),Ee=n(8),Se=n(26),Ne=n.n(Se),Ie=n(1),Pe=n.n(Ie),De=n(80),ke=n.n(De),Te=n(536),xe=n(531),Me=n(25),Ae=n(316),Ke=n(317),Fe=n(154),Ve=n(539),Ue=n(532),Be=n(9);function He(e){var t=e.categoryContent,n=e.resultsContent;return Pe.a.createElement(Pe.a.Fragment,null,Pe.a.createElement("div",{className:"name"},t),Pe.a.createElement("div",{className:"results"},n))}He.handledProps=["categoryContent","resultsContent"],He.propTypes={};var Le=He;function Ge(e){var t=e.active,n=e.children,r=e.className,a=e.content,o=e.layoutRenderer,c=e.renderer,s=Object(Ee.a)(Object(Me.a)(t,"active"),"category",r),u=Object(Ae.a)(Ge,e),l=Object(Ke.a)(Ge,e),p=c(e),d=Be.a.isNil(n)?a:n;return Pe.a.createElement(l,Object(i.a)({},u,{className:s}),o({categoryContent:p,resultsContent:d}))}Ge.handledProps=["active","as","children","className","content","layoutRenderer","name","renderer","results"],Ge.defaultProps={layoutRenderer:Le,renderer:function(e){return e.name}},Ge.propTypes={};var qe=Ge,ze=n(186),Qe=function(e){var t=e.image,n=e.price,r=e.title,a=e.description;return[t&&Pe.a.createElement("div",{key:"image",className:"image"},Object(ze.a)(t,{autoGenerateKey:!1})),Pe.a.createElement("div",{key:"content",className:"content"},n&&Pe.a.createElement("div",{className:"price"},n),r&&Pe.a.createElement("div",{className:"title"},r),a&&Pe.a.createElement("div",{className:"description"},a))]};Qe.handledProps=[];var Je=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).handleClick=function(e){var n=t.props.onClick;n&&n(e,t.props)},t}return Object(c.a)(t,e),t.prototype.render=function(){var e=this.props,n=e.active,r=e.className,a=e.renderer,o=Object(Ee.a)(Object(Me.a)(n,"active"),"result",r),c=Object(Ae.a)(t,this.props),s=Object(Ke.a)(t,this.props);return Pe.a.createElement(s,Object(i.a)({},c,{className:o,onClick:this.handleClick}),a(this.props))},t}(Ie.Component);function Ye(e){var t=e.children,n=e.className,r=e.content,a=Object(Ee.a)("results transition",n),o=Object(Ae.a)(Ye,e),c=Object(Ke.a)(Ye,e);return Pe.a.createElement(c,Object(i.a)({},o,{className:a}),Be.a.isNil(t)?r:t)}Je.handledProps=["active","as","className","content","description","id","image","onClick","price","renderer","title"],Je.propTypes={},Je.defaultProps={renderer:Qe},Ye.handledProps=["as","children","className","content"],Ye.propTypes={};var We=Ye,Xe=function(e){var t=e.input;return Object(Ce.a)(t)?Object(i.a)({},e,{input:{className:"prompt"}}):Object(Re.a)(t)?Object(i.a)({},e,{input:Object(i.a)({},t,{className:Object(Ee.a)(t.className,"prompt")})}):e},Ze=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).handleResultSelect=function(e,n){Object(we.a)(t.props,"onResultSelect",e,Object(i.a)({},t.props,{result:n}))},t.handleSelectionChange=function(e){var n=t.getSelectedResult();Object(we.a)(t.props,"onSelectionChange",e,Object(i.a)({},t.props,{result:n}))},t.closeOnEscape=function(e){Ne.a.getCode(e)===Ne.a.Escape&&(e.preventDefault(),t.close())},t.moveSelectionOnKeyDown=function(e){switch(Ne.a.getCode(e)){case Ne.a.ArrowDown:e.preventDefault(),t.moveSelectionBy(e,1);break;case Ne.a.ArrowUp:e.preventDefault(),t.moveSelectionBy(e,-1)}},t.selectItemOnEnter=function(e){if(Ne.a.getCode(e)===Ne.a.Enter){var n=t.getSelectedResult();n&&(e.preventDefault(),t.setValue(n.title),t.handleResultSelect(e,n),t.close())}},t.closeOnDocumentClick=function(e){t.close()},t.handleMouseDown=function(e){t.isMouseDown=!0,Object(we.a)(t.props,"onMouseDown",e,t.props),Te.a.sub("mouseup",t.handleDocumentMouseUp)},t.handleDocumentMouseUp=function(){t.isMouseDown=!1,Te.a.unsub("mouseup",t.handleDocumentMouseUp)},t.handleInputClick=function(e){e.nativeEvent.stopImmediatePropagation(),t.tryOpen()},t.handleItemClick=function(e,n){var r=n.id,a=t.getSelectedResult(r);e.nativeEvent.stopImmediatePropagation(),t.setValue(a.title),t.handleResultSelect(e,a),t.close()},t.handleItemMouseDown=function(e){e.preventDefault()},t.handleFocus=function(e){Object(we.a)(t.props,"onFocus",e,t.props),t.setState({focus:!0})},t.handleBlur=function(e){Object(we.a)(t.props,"onBlur",e,t.props),t.setState({focus:!1})},t.handleSearchChange=function(e){e.stopPropagation();var n=t.props.minCharacters,r=t.state.open,a=e.target.value;Object(we.a)(t.props,"onSearchChange",e,Object(i.a)({},t.props,{value:a})),a.length<n?t.close():r||t.tryOpen(a),t.setValue(a)},t.getFlattenedResults=function(){var e=t.props,n=e.category,r=e.results;return n?Object(_e.a)(r,(function(e,t){return e.concat(t.results)}),[]):r},t.getSelectedResult=function(e){void 0===e&&(e=t.state.selectedIndex);var n=t.getFlattenedResults();return Object(ge.a)(n,e)},t.setValue=function(e){var n=t.props.selectFirstResult;t.setState({value:e,selectedIndex:n?0:-1})},t.moveSelectionBy=function(e,n){var r=t.state.selectedIndex,a=t.getFlattenedResults().length-1,o=r+n;o>a?o=0:o<0&&(o=a),t.setState({selectedIndex:o}),t.scrollSelectedItemIntoView(),t.handleSelectionChange(e)},t.scrollSelectedItemIntoView=function(){if(Object(xe.a)()){var e=document.querySelector(".ui.search.active.visible .results.visible");if(e){var t=e.querySelector(".result.active");if(t){var n=t.offsetTop<e.scrollTop,r=t.offsetTop+t.clientHeight>e.scrollTop+e.clientHeight;n?e.scrollTop=t.offsetTop:r&&(e.scrollTop=t.offsetTop+t.clientHeight-e.clientHeight)}}}},t.tryOpen=function(e){void 0===e&&(e=t.state.value);var n=t.props.minCharacters;e.length<n||t.open()},t.open=function(){t.setState({open:!0})},t.close=function(){t.setState({open:!1})},t.renderSearchInput=function(e){var n=t.props,r=n.icon,a=n.input,o=n.placeholder,c=t.state.value;return Ue.a.create(a,{autoGenerateKey:!1,defaultProps:Object(i.a)({},e,{autoComplete:"off",icon:r,onChange:t.handleSearchChange,onClick:t.handleInputClick,tabIndex:"0",value:c,placeholder:o}),overrideProps:Xe})},t.renderNoResults=function(){var e=t.props,n=e.noResultsDescription,r=e.noResultsMessage;return Pe.a.createElement("div",{className:"message empty"},Pe.a.createElement("div",{className:"header"},r),n&&Pe.a.createElement("div",{className:"description"},n))},t.renderResult=function(e,n,r,a){var c=e.childKey,s=Object(o.a)(e,["childKey"]);void 0===a&&(a=0);var u=t.props.resultRenderer,l=t.state.selectedIndex,p=n+a;return Pe.a.createElement(Je,Object(i.a)({key:null!=c?c:s.id||s.title,active:l===p,onClick:t.handleItemClick,onMouseDown:t.handleItemMouseDown,renderer:u},s,{id:p}))},t.renderResults=function(){var e=t.props.results;return Object(je.a)(e,t.renderResult)},t.renderCategories=function(){var e=t.props,n=e.categoryLayoutRenderer,r=e.categoryRenderer,a=e.results,c=t.state.selectedIndex,s=0;return Object(je.a)(a,(function(e){var a=e.childKey,u=Object(o.a)(e,["childKey"]),l=Object(i.a)({key:null!=a?a:u.name,active:Object(me.a)(c,s,s+u.results.length),layoutRenderer:n,renderer:r},u),p=ye(t.renderResult,s);return s+=u.results.length,Pe.a.createElement(qe,l,u.results.map(p))}))},t.renderMenuContent=function(){var e=t.props,n=e.category,r=e.showNoResults,a=e.results;return Object(s.a)(a)?r?t.renderNoResults():null:n?t.renderCategories():t.renderResults()},t.renderResultsMenu=function(){var e=t.state.open?"visible":"",n=t.renderMenuContent();if(n)return Pe.a.createElement(We,{className:e},n)},t}Object(c.a)(t,e),t.getAutoControlledStateFromProps=function(e,t){if(void 0!==t.prevValue&&ke()(t.prevValue,t.value))return{prevValue:t.value};var n=e.selectFirstResult?0:-1;return{prevValue:t.value,selectedIndex:n}};var n=t.prototype;return n.shouldComponentUpdate=function(e,t){return!ke()(e,this.props)||!ke()(t,this.state)},n.componentDidUpdate=function(e,t){!t.focus&&this.state.focus?(this.isMouseDown||this.tryOpen(),this.state.open&&Te.a.sub("keydown",[this.moveSelectionOnKeyDown,this.selectItemOnEnter])):t.focus&&!this.state.focus&&(this.isMouseDown||this.close(),Te.a.unsub("keydown",[this.moveSelectionOnKeyDown,this.selectItemOnEnter])),!t.open&&this.state.open?(this.open(),Te.a.sub("click",this.closeOnDocumentClick),Te.a.sub("keydown",[this.closeOnEscape,this.moveSelectionOnKeyDown,this.selectItemOnEnter])):t.open&&!this.state.open&&(this.close(),Te.a.unsub("click",this.closeOnDocumentClick),Te.a.unsub("keydown",[this.closeOnEscape,this.moveSelectionOnKeyDown,this.selectItemOnEnter]))},n.componentWillUnmount=function(){Te.a.unsub("click",this.closeOnDocumentClick),Te.a.unsub("keydown",[this.closeOnEscape,this.moveSelectionOnKeyDown,this.selectItemOnEnter])},n.render=function(){var e=this.state,n=e.searchClasses,r=e.focus,a=e.open,o=this.props,c=o.aligned,s=o.category,u=o.className,l=o.fluid,p=o.loading,d=o.size,f=Object(Ee.a)("ui",a&&"active visible",d,n,Object(Me.a)(s,"category"),Object(Me.a)(r,"focus"),Object(Me.a)(l,"fluid"),Object(Me.a)(p,"loading"),Object(Me.e)(c,"aligned"),"search",u),h=Object(Ae.a)(t,this.props),v=Object(Ke.a)(t,this.props),b=Object(Fe.c)(h,{htmlProps:Fe.b}),O=b[0],y=b[1];return Pe.a.createElement(v,Object(i.a)({},y,{className:f,onBlur:this.handleBlur,onFocus:this.handleFocus,onMouseDown:this.handleMouseDown}),this.renderSearchInput(O),this.renderResultsMenu())},t}(Ve.a);Ze.handledProps=["aligned","as","category","categoryLayoutRenderer","categoryRenderer","className","defaultOpen","defaultValue","fluid","icon","input","loading","minCharacters","noResultsDescription","noResultsMessage","onBlur","onFocus","onMouseDown","onResultSelect","onSearchChange","onSelectionChange","open","placeholder","resultRenderer","results","selectFirstResult","showNoResults","size","value"],Ze.propTypes={},Ze.defaultProps={icon:"search",input:"text",minCharacters:1,noResultsMessage:"No results found.",showNoResults:!0},Ze.autoControlledProps=["open","value"],Ze.Category=qe,Ze.Result=Je,Ze.Results=We;var $e=n(7),et=n(28),tt=n(20),nt=n.n(tt),rt=n(76),at=n.n(rt),ot=n(27),ct=n(135);function it(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function st(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?it(Object(n),!0).forEach((function(t){Object(a.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):it(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var ut={loading:!1,results:[{key:null,value:null,title:"Start typing to search for a topic..."}],value:"",selected:!1},lt=function(e,t){switch(t.type){case"CLEAN_QUERY":return ut;case"START_SEARCH":return st(st({},e),{},{loading:!0,value:t.query});case"FINISH_SEARCH":return st(st({},e),{},{loading:!1,results:t.results});case"UPDATE_SELECTION":return st(st({},e),{},{loading:!0,value:t.selection.title,selected:t.selection.value});default:throw new Error}};function pt(e){var t=e.restrictToTermId,n=void 0===t?0:t,a=Object($e.useReducer)(lt,ut),o=Object(r.a)(a,2),c=o[0],i=o[1],s=c.loading,u=c.results,l=c.value,p=c.selected,d=Object($e.useRef)(),f=Object($e.useCallback)((function(e,t){clearTimeout(d.current),i({type:"START_SEARCH",query:t.value}),d.current=setTimeout((function(){0!==t.value.length?function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return new Promise((function(n){var r={per_page:25};""!==e&&(r.search=e),0!==t&&""!==t&&(r.parent=t);var a={method:"GET",path:Object(ot.addQueryArgs)("/prc-api/v2/blocks/topic-index-search",r)};console.log("Search Request->",a),at()(a).then((function(e){console.log("... returns: ",e);var t=e.map((function(e){return{key:e.id,value:e.link,title:Object(ct.decodeEntities)(e.name)}}));n(t)}))}))}(t.value,n).then((function(e){i({type:"FINISH_SEARCH",results:e})})):i({type:"CLEAN_QUERY"})}),300)}),[]);return Object($e.useEffect)((function(){return function(){clearTimeout(d.current)}}),[]),Object($e.useEffect)((function(){!1!==p&&setTimeout((function(){window.location=p}),1e3)}),[p]),React.createElement(Ze,{loading:s,onResultSelect:function(e,t){var n=t.result;i({type:"UPDATE_SELECTION",selection:n})},onSearchChange:f,results:u,value:l,defaultValue:null,fluid:!0,placeholder:Object(et.__)("Start typing to search for a topic...")})}nt()((function(){var e=document.querySelectorAll(".js-react-topic-index-search-field");e&&e.forEach((function(e){var t=e.getAttribute("data-term-id");console.log(e,t),Object($e.render)(React.createElement(pt,{restrictToTermId:t}),e)}))}))},7:function(e,t){e.exports=window.wp.element},76:function(e,t){e.exports=window.wp.apiFetch},83:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},94:function(e,t,n){"use strict";var r=n(112),a=n(108),o=n(98),c=n(21),i=n(48),s=n(125),u=n(167),l=n(138),p=Object.prototype.hasOwnProperty;t.a=function(e){if(null==e)return!0;if(Object(i.a)(e)&&(Object(c.a)(e)||"string"==typeof e||"function"==typeof e.splice||Object(s.a)(e)||Object(l.a)(e)||Object(o.a)(e)))return!e.length;var t=Object(a.a)(e);if("[object Map]"==t||"[object Set]"==t)return!e.size;if(Object(u.a)(e))return!Object(r.a)(e).length;for(var n in e)if(p.call(e,n))return!1;return!0}}},[[642,0,1,2]]]);
//# sourceMappingURL=topic-index-search-field-b35977c4.js.map