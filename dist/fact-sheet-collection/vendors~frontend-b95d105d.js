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
(window["wpackioprcBlocksLibraryfact-sheet-collectionJsonp"]=window["wpackioprcBlocksLibraryfact-sheet-collectionJsonp"]||[]).push([[4],{106:function(e,t,a){"use strict";var n=a(68),r=a(101),c=a(102),o=a(41),i=a(93),l=a(60);t.a=function(e,t,a,s){var u=-1,p=r.a,d=!0,b=e.length,f=[],h=t.length;if(!b)return f;a&&(t=Object(o.a)(t,Object(i.a)(a))),s?(p=c.a,d=!1):t.length>=200&&(p=l.a,d=!1,t=new n.a(t));e:for(;++u<b;){var v=e[u],O=null==a?v:a(v);if(v=s||0!==v?v:0,d&&O==O){for(var j=h;j--;)if(t[j]===O)continue e;f.push(v)}else p(t,O,s)||f.push(v)}return f}},113:function(e,t,a){"use strict";var n=a(98),r=a(26);var c=function(e,t){var a=[];return Object(r.a)(e,(function(e,n,r){t(e,n,r)&&a.push(e)})),a},o=a(20),i=a(7);t.a=function(e,t){return(Object(i.a)(e)?n.a:c)(e,Object(o.a)(t,3))}},116:function(e,t,a){var n=a(27);e.exports=function(e,t,a,r){var c=a?a.call(r,e,t):void 0;if(void 0!==c)return!!c;if(e===t)return!0;if("object"!==n(e)||!e||"object"!==n(t)||!t)return!1;var o=Object.keys(e),i=Object.keys(t);if(o.length!==i.length)return!1;for(var l=Object.prototype.hasOwnProperty.bind(t),s=0;s<o.length;s++){var u=o[s];if(!l(u))return!1;var p=e[u],d=t[u];if(!1===(c=a?a.call(r,p,d,u):void 0)||void 0===c&&p!==d)return!1}return!0}},172:function(e,t,a){"use strict";var n=a(1),r=a(9),c=a(3),o=(a(6),a(0)),i=a.n(o),l=a(90),s=a(91),u=a(122),p=function(e){function t(){return e.apply(this,arguments)||this}return Object(r.a)(t,e),t.prototype.render=function(){var e=this.props,a=e.className,r=e.name,o=Object(c.a)(r,"flag",a),u=Object(l.a)(t,this.props),p=Object(s.a)(t,this.props);return i.a.createElement(p,Object(n.a)({},u,{className:o}))},t}(o.PureComponent);p.handledProps=["as","className","name"],p.propTypes={},p.defaultProps={as:"i"},p.create=Object(u.b)(p,(function(e){return{name:e}})),t.a=p},173:function(e,t,a){"use strict";var n=a(1),r=a(3),c=(a(6),a(0)),o=a.n(c),i=a(18),l=a(90),s=a(91),u=a(2);function p(e){var t=e.children,a=e.className,c=e.clearing,d=e.content,b=e.fitted,f=e.hidden,h=e.horizontal,v=e.inverted,O=e.section,j=e.vertical,m=Object(r.a)("ui",Object(i.a)(c,"clearing"),Object(i.a)(b,"fitted"),Object(i.a)(f,"hidden"),Object(i.a)(h,"horizontal"),Object(i.a)(v,"inverted"),Object(i.a)(O,"section"),Object(i.a)(j,"vertical"),"divider",a),g=Object(l.a)(p,e),y=Object(s.a)(p,e);return o.a.createElement(y,Object(n.a)({},g,{className:m}),u.a.isNil(t)?d:t)}p.handledProps=["as","children","className","clearing","content","fitted","hidden","horizontal","inverted","section","vertical"],p.propTypes={},t.a=p},174:function(e,t,a){"use strict";a.d(t,"a",(function(){return It}));var n=a(1),r=a(9),c=a(30);var o=function(e){for(var t=-1,a=null==e?0:e.length,n=0,r=[];++t<a;){var c=e[t];c&&(r[n++]=c)}return r},i=a(33);var l=function(e,t){for(var a=-1,n=null==e?0:e.length;++a<n;)if(!t(e[a],a,e))return!1;return!0},s=a(26);var u=function(e,t){var a=!0;return Object(s.a)(e,(function(e,n,r){return a=!!t(e,n,r)})),a},p=a(20),d=a(7),b=a(96);var f=function(e,t,a){var n=Object(d.a)(e)?l:u;return a&&Object(b.a)(e,t,a)&&(t=void 0),n(e,Object(p.a)(t,3))},h=a(57),v=a(70),O=a(89),j=a(62);var m=function(e,t,a){var n=null==e?0:e.length;return n?(t=n-(t=a||void 0===t?1:Object(j.a)(t)),Object(O.a)(e,0,t<0?0:t)):[]},g=a(75),y=a(69),C=a(54),N=a(17),I=a(63),w=a(99),x=Object(w.a)("length"),k=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");var E=function(e){return k.test(e)},S="[\\ud800-\\udfff]",P="[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",A="\\ud83c[\\udffb-\\udfff]",T="[^\\ud800-\\udfff]",D="(?:\\ud83c[\\udde6-\\uddff]){2}",L="[\\ud800-\\udbff][\\udc00-\\udfff]",R="(?:"+P+"|"+A+")"+"?",Q="[\\ufe0e\\ufe0f]?"+R+("(?:\\u200d(?:"+[T,D,L].join("|")+")[\\ufe0e\\ufe0f]?"+R+")*"),M="(?:"+[T+P+"?",P,D,L,S].join("|")+")",z=RegExp(A+"(?="+A+")|"+M+Q,"g");var B=function(e){for(var t=z.lastIndex=0;z.test(e);)++t;return t};var K=function(e){return E(e)?B(e):x(e)};var G=function(e){if(null==e)return 0;if(Object(N.a)(e))return Object(I.a)(e)?K(e):e.length;var t=Object(C.a)(e);return"[object Map]"==t||"[object Set]"==t?e.size:Object(y.a)(e).length},U=a(106),V=a(97),_=a(19),F=a(45),H=_.a?_.a.isConcatSpreadable:void 0;var q=function(e){return Object(d.a)(e)||Object(F.a)(e)||!!(H&&e&&e[H])};var J=function e(t,a,n,r,c){var o=-1,i=t.length;for(n||(n=q),c||(c=[]);++o<i;){var l=t[o];a>0&&n(l)?a>1?e(l,a-1,n,r,c):Object(V.a)(c,l):r||(c[c.length]=l)}return c},W=a(37),Y=a(52),Z=Object(W.a)((function(e,t){return Object(Y.a)(e)?Object(U.a)(e,J(t,1,Y.a,!0)):[]})),$=a(114),X=Object(W.a)((function(e){return Object($.a)(J(e,1,Y.a,!0))})),ee=a(48),te=a(103),ae=a(65),ne=a(4),re=a(66);var ce=function(e,t){return Object(re.a)(e,t)},oe=a(29),ie=a(42),le=a(74);var se=function(e,t,a){"__proto__"==t&&le.a?Object(le.a)(e,t,{configurable:!0,enumerable:!0,value:a,writable:!0}):e[t]=a},ue=a(40),pe=Object.prototype.hasOwnProperty;var de=function(e,t,a){var n=e[t];pe.call(e,t)&&Object(ue.a)(n,a)&&(void 0!==a||t in e)||se(e,t,a)},be=a(32),fe=a(43),he=a(22),ve=a(25);var Oe=function(e,t,a,n){if(!Object(he.a)(e))return e;for(var r=-1,c=(t=Object(be.a)(t,e)).length,o=c-1,i=e;null!=i&&++r<c;){var l=Object(ve.a)(t[r]),s=a;if("__proto__"===l||"constructor"===l||"prototype"===l)return e;if(r!=o){var u=i[l];void 0===(s=n?n(u,l,i):void 0)&&(s=Object(he.a)(u)?u:Object(fe.a)(t[r+1])?[]:{})}de(i,l,s),i=i[l]}return e};var je=function(e,t,a){for(var n=-1,r=t.length,c={};++n<r;){var o=t[n],i=Object(ie.a)(e,o);a(i,o)&&Oe(c,Object(be.a)(o,e),i)}return c},me=a(111);var ge=function(e,t){return je(e,t,(function(t,a){return Object(me.a)(e,a)}))};var ye=function(e){return(null==e?0:e.length)?J(e,1):[]},Ce=a(87),Ne=a(108);var Ie=function(e){return Object(Ne.a)(Object(Ce.a)(e,void 0,ye),e+"")}((function(e,t){return null==e?{}:ge(e,t)})),we=a(11),xe=a(34),ke=a.n(xe),Ee=a(178),Se=a(3),Pe=a(14),Ae=a.n(Pe),Te=(a(6),a(0)),De=a.n(Te),Le=a(116),Re=a.n(Le),Qe=a(128),Me=a(2),ze=a(18),Be=a(90),Ke=a(91),Ge=a(129),Ue=a(80),Ve=a(138),_e=a(172),Fe=a(137);function He(e){var t=e.className,a=Object(Se.a)("divider",t),r=Object(Be.a)(He,e),c=Object(Ke.a)(He,e);return De.a.createElement(c,Object(n.a)({},r,{className:a}))}He.handledProps=["as","className"],He.propTypes={};var qe=He,Je=a(122),We=function(e){function t(){for(var t,a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(t=e.call.apply(e,[this].concat(n))||this).handleClick=function(e){Object(ne.a)(t.props,"onClick",e,t.props)},t}return Object(r.a)(t,e),t.prototype.render=function(){var e=this.props,a=e.active,r=e.children,c=e.className,o=e.content,i=e.disabled,l=e.description,s=e.flag,u=e.icon,p=e.image,d=e.label,b=e.selected,f=e.text,h=Object(Se.a)(Object(ze.a)(a,"active"),Object(ze.a)(i,"disabled"),Object(ze.a)(b,"selected"),"item",c),v=Object(we.a)(u)?Me.a.someByType(r,"DropdownMenu")&&"dropdown":u,O=Object(Be.a)(t,this.props),j=Object(Ke.a)(t,this.props),m={role:"option","aria-disabled":i,"aria-checked":a,"aria-selected":b};if(!Me.a.isNil(r))return De.a.createElement(j,Object(n.a)({},O,m,{className:h,onClick:this.handleClick}),r);var g=_e.a.create(s,{autoGenerateKey:!1}),y=Ue.a.create(v,{autoGenerateKey:!1}),C=Fe.a.create(p,{autoGenerateKey:!1}),N=Ve.a.create(d,{autoGenerateKey:!1}),I=Object(Je.a)("span",(function(e){return{children:e}}),l,{defaultProps:{className:"description"},autoGenerateKey:!1}),w=Object(Je.a)("span",(function(e){return{children:e}}),Me.a.isNil(o)?f:o,{defaultProps:{className:"text"},autoGenerateKey:!1});return De.a.createElement(j,Object(n.a)({},O,m,{className:h,onClick:this.handleClick}),C,y,g,N,I,w)},t}(Te.Component);We.handledProps=["active","as","children","className","content","description","disabled","flag","icon","image","label","onClick","selected","text","value"],We.propTypes={},We.create=Object(Je.b)(We,(function(e){return e}));var Ye=We;function Ze(e){var t=e.children,a=e.className,r=e.content,c=e.icon,o=Object(Se.a)("header",a),i=Object(Be.a)(Ze,e),l=Object(Ke.a)(Ze,e);return Me.a.isNil(t)?De.a.createElement(l,Object(n.a)({},i,{className:o}),Ue.a.create(c,{autoGenerateKey:!1}),r):De.a.createElement(l,Object(n.a)({},i,{className:o}),t)}Ze.handledProps=["as","children","className","content","icon"],Ze.propTypes={},Ze.create=Object(Je.b)(Ze,(function(e){return{content:e}}));var $e=Ze;function Xe(e){var t=e.children,a=e.className,r=e.content,c=e.direction,o=e.open,i=e.scrolling,l=Object(Se.a)(c,Object(ze.a)(o,"visible"),Object(ze.a)(i,"scrolling"),"menu transition",a),s=Object(Be.a)(Xe,e),u=Object(Ke.a)(Xe,e);return De.a.createElement(u,Object(n.a)({},s,{className:l}),Me.a.isNil(t)?r:t)}Xe.handledProps=["as","children","className","content","direction","open","scrolling"],Xe.propTypes={};var et=Xe,tt=function(e){function t(){for(var t,a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(t=e.call.apply(e,[this].concat(r))||this).handleChange=function(e){var a=Object(ee.a)(e,"target.value");Object(ne.a)(t.props,"onChange",e,Object(n.a)({},t.props,{value:a}))},t}return Object(r.a)(t,e),t.prototype.render=function(){var e=this.props,a=e.autoComplete,r=e.className,c=e.tabIndex,o=e.type,i=e.value,l=Object(Se.a)("search",r),s=Object(Be.a)(t,this.props);return De.a.createElement("input",Object(n.a)({},s,{"aria-autocomplete":"list",autoComplete:a,className:l,onChange:this.handleChange,tabIndex:c,type:o,value:i}))},t}(Te.Component);tt.handledProps=["as","autoComplete","className","tabIndex","type","value"],tt.propTypes={},tt.defaultProps={autoComplete:"off",type:"text"},tt.create=Object(Je.b)(tt,(function(e){return{type:e}}));var at=tt;function nt(e){var t=e.children,a=e.className,r=e.content,c=Object(Se.a)("divider",a),o=Object(Be.a)(nt,e),i=Object(Ke.a)(nt,e);return De.a.createElement(i,Object(n.a)({"aria-atomic":!0,"aria-live":"polite",role:"alert"},o,{className:c}),Me.a.isNil(t)?r:t)}nt.handledProps=["as","children","className","content"],nt.propTypes={},nt.create=Object(Je.b)(nt,(function(e){return{content:e}}));var rt=nt,ct=a(49),ot=a(72),it=/[\\^$.*+?()[\]{}|]/g,lt=RegExp(it.source);var st=function(e){return(e=Object(ot.a)(e))&&lt.test(e)?e.replace(it,"\\$&"):e};var ut=function(e){return function(t){return null==e?void 0:e[t]}}({"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"s"}),pt=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,dt=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]","g");var bt=function(e){return(e=Object(ot.a)(e))&&e.replace(pt,ut).replace(dt,"")},ft=a(113);function ht(e){var t=e.additionLabel,a=e.additionPosition,n=e.allowAdditions,r=e.deburr,o=e.multiple,i=e.options,l=e.search,s=e.searchQuery,u=e.value,p=i;if(o&&(p=Object(ft.a)(p,(function(e){return!Object(c.a)(u,e.value)}))),l&&s)if(Object(oe.a)(l))p=l(p,s);else{var d=r?bt(s):s,b=new RegExp(st(d),"i");p=Object(ft.a)(p,(function(e){return b.test(r?bt(e.text):e.text)}))}if(n&&l&&s&&!Object(ct.a)(p,{text:s})){var f={key:"addition",text:[De.a.isValidElement(t)?De.a.cloneElement(t,{key:"addition-label"}):t||"",De.a.createElement("b",{key:"addition-query"},s)],value:s,className:"addition","data-additional":!0};"top"===a?p.unshift(f):p.push(f)}return p}ht.handledProps=[];var vt=a(78);var Ot=function(e,t,a,n){var r=-1,c=null==e?0:e.length;for(n&&c&&(a=e[++r]);++r<c;)a=t(a,e[r],r,e);return a};var jt=function(e,t,a,n,r){return r(e,(function(e,r,c){a=n?(n=!1,e):t(a,e,r,c)})),a};var mt=function(e,t,a){var n=Object(d.a)(e)?Ot:jt,r=arguments.length<3;return n(e,Object(p.a)(t,4),a,r,s.a)};function gt(e){var t,a=e.additionLabel,n=e.additionPosition,r=e.allowAdditions,o=e.deburr,i=e.multiple,l=e.options,s=e.search,u=e.searchQuery,p=e.selectedIndex,d=e.value,b=ht({value:d,options:l,searchQuery:u,additionLabel:a,additionPosition:n,allowAdditions:r,deburr:o,multiple:i,search:s}),f=mt(b,(function(e,t,a){return t.disabled||e.push(a),e}),[]);if(!p||p<0){var h=f[0];t=i?h:Object(vt.a)(b,["value",d])||f[0]}else if(i)t=Object(v.a)(f,(function(e){return e>=p})),p>=b.length-1&&(t=f[f.length-1]);else{var O=Object(vt.a)(b,["value",d]);t=Object(c.a)(f,O)?O:void 0}return(!t||t<0)&&(t=f[0]),t}var yt=function(e,t){return Object(we.a)(e)?t:e},Ct=function(e){return e?e.map((function(e){return Ie(e,["key","value"])})):e};function Nt(e){var t=e.flag,a=e.image,n=e.text;return Object(oe.a)(n)?n:{content:De.a.createElement(De.a.Fragment,null,_e.a.create(t),Fe.a.create(a),n)}}var It=function(e){function t(){for(var t,a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(t=e.call.apply(e,[this].concat(r))||this).searchRef=Object(Te.createRef)(),t.sizerRef=Object(Te.createRef)(),t.ref=Object(Te.createRef)(),t.handleChange=function(e,a){Object(ne.a)(t.props,"onChange",e,Object(n.a)({},t.props,{value:a}))},t.closeOnChange=function(e){var a=t.props,n=a.closeOnChange,r=a.multiple;(Object(ae.a)(n)?!r:n)&&t.close(e,te.a)},t.closeOnEscape=function(e){t.props.closeOnEscape&&Ae.a.getCode(e)===Ae.a.Escape&&(e.preventDefault(),t.close(e))},t.moveSelectionOnKeyDown=function(e){var a,n=t.props,r=n.multiple,c=n.selectOnNavigation;if(t.state.open){var o=((a={})[Ae.a.ArrowDown]=1,a[Ae.a.ArrowUp]=-1,a)[Ae.a.getCode(e)];if(void 0!==o){e.preventDefault();var i=t.getSelectedIndexAfterMove(o);!r&&c&&t.makeSelectedItemActive(e,i),t.setState({selectedIndex:i})}}},t.openOnSpace=function(e){var a,n,r,c=t.state.focus&&!t.state.open&&Ae.a.getCode(e)===Ae.a.Spacebar,o="INPUT"!==(null==(a=e.target)?void 0:a.tagName)&&"TEXTAREA"!==(null==(n=e.target)?void 0:n.tagName)&&!0!==(null==(r=e.target)?void 0:r.isContentEditable);c&&(o&&e.preventDefault(),t.open(e))},t.openOnArrow=function(e){var a=t.state,n=a.focus,r=a.open;if(n&&!r){var c=Ae.a.getCode(e);c!==Ae.a.ArrowDown&&c!==Ae.a.ArrowUp||(e.preventDefault(),t.open(e))}},t.makeSelectedItemActive=function(e,a){var r=t.state,c=r.open,o=r.value,i=t.props.multiple,l=t.getSelectedItem(a),s=Object(ee.a)(l,"value");if(Object(we.a)(s)||!c)return o;var u=i?X(o,[s]):s;return(i?!!Z(u,o).length:u!==o)&&(t.setState({value:u}),t.handleChange(e,u),l["data-additional"]&&Object(ne.a)(t.props,"onAddItem",e,Object(n.a)({},t.props,{value:s}))),o},t.selectItemOnEnter=function(e){var a=t.props.search,n=t.state,r=n.open,c=n.selectedIndex;if(r&&(Ae.a.getCode(e)===Ae.a.Enter||!a&&Ae.a.getCode(e)===Ae.a.Spacebar)){e.preventDefault();var o=G(ht({value:t.state.value,options:t.props.options,searchQuery:t.state.searchQuery,additionLabel:t.props.additionLabel,additionPosition:t.props.additionPosition,allowAdditions:t.props.allowAdditions,deburr:t.props.deburr,multiple:t.props.multiple,search:t.props.search}));if(!a||0!==o){var i=t.makeSelectedItemActive(e,c);t.setState({selectedIndex:gt({additionLabel:t.props.additionLabel,additionPosition:t.props.additionPosition,allowAdditions:t.props.allowAdditions,deburr:t.props.deburr,multiple:t.props.multiple,search:t.props.search,selectedIndex:c,value:i,options:t.props.options,searchQuery:""})}),t.closeOnChange(e),t.clearSearchQuery(),a&&Object(ne.a)(t.searchRef.current,"focus")}}},t.removeItemOnBackspace=function(e){var a=t.props,n=a.multiple,r=a.search,c=t.state,o=c.searchQuery,i=c.value;if(Ae.a.getCode(e)===Ae.a.Backspace&&!o&&r&&n&&!Object(g.a)(i)){e.preventDefault();var l=m(i);t.setState({value:l}),t.handleChange(e,l)}},t.closeOnDocumentClick=function(e){t.props.closeOnBlur&&(t.ref.current&&Object(Qe.a)(t.ref.current,e)||t.close())},t.handleMouseDown=function(e){t.isMouseDown=!0,Object(ne.a)(t.props,"onMouseDown",e,t.props),document.addEventListener("mouseup",t.handleDocumentMouseUp)},t.handleDocumentMouseUp=function(){t.isMouseDown=!1,document.removeEventListener("mouseup",t.handleDocumentMouseUp)},t.handleClick=function(e){var a=t.props,n=a.minCharacters,r=a.search,c=t.state,o=c.open,i=c.searchQuery;if(Object(ne.a)(t.props,"onClick",e,t.props),e.stopPropagation(),!r)return t.toggle(e);o?Object(ne.a)(t.searchRef.current,"focus"):i.length>=n||1===n?t.open(e):Object(ne.a)(t.searchRef.current,"focus")},t.handleIconClick=function(e){var a=t.props.clearable,n=t.hasValue();Object(ne.a)(t.props,"onClick",e,t.props),e.stopPropagation(),a&&n?t.clearValue(e):t.toggle(e)},t.handleItemClick=function(e,a){var r=t.props,c=r.multiple,o=r.search,i=t.state.value,l=a.value;if(e.stopPropagation(),(c||a.disabled)&&e.nativeEvent.stopImmediatePropagation(),!a.disabled){var s=a["data-additional"],u=c?X(t.state.value,[l]):l;(c?!!Z(u,i).length:u!==i)&&(t.setState({value:u}),t.handleChange(e,u)),t.clearSearchQuery(),o?Object(ne.a)(t.searchRef.current,"focus"):Object(ne.a)(t.ref.current,"focus"),t.closeOnChange(e),s&&Object(ne.a)(t.props,"onAddItem",e,Object(n.a)({},t.props,{value:l}))}},t.handleFocus=function(e){t.state.focus||(Object(ne.a)(t.props,"onFocus",e,t.props),t.setState({focus:!0}))},t.handleBlur=function(e){var a=Object(ee.a)(e,"currentTarget");if(!a||!a.contains(document.activeElement)){var n=t.props,r=n.closeOnBlur,c=n.multiple,o=n.selectOnBlur;t.isMouseDown||(Object(ne.a)(t.props,"onBlur",e,t.props),o&&!c&&(t.makeSelectedItemActive(e,t.state.selectedIndex),r&&t.close()),t.setState({focus:!1}),t.clearSearchQuery())}},t.handleSearchChange=function(e,a){var r=a.value;e.stopPropagation();var c=t.props.minCharacters,o=t.state.open,i=r;Object(ne.a)(t.props,"onSearchChange",e,Object(n.a)({},t.props,{searchQuery:i})),t.setState({searchQuery:i,selectedIndex:0}),!o&&i.length>=c?t.open():o&&1!==c&&i.length<c&&t.close()},t.handleKeyDown=function(e){t.moveSelectionOnKeyDown(e),t.openOnArrow(e),t.openOnSpace(e),t.selectItemOnEnter(e),Object(ne.a)(t.props,"onKeyDown",e)},t.getSelectedItem=function(e){var a=ht({value:t.state.value,options:t.props.options,searchQuery:t.state.searchQuery,additionLabel:t.props.additionLabel,additionPosition:t.props.additionPosition,allowAdditions:t.props.allowAdditions,deburr:t.props.deburr,multiple:t.props.multiple,search:t.props.search});return Object(ee.a)(a,"["+e+"]")},t.getItemByValue=function(e){var a=t.props.options;return Object(v.a)(a,{value:e})},t.getDropdownAriaOptions=function(){var e=t.props,a=e.loading,n=e.disabled,r=e.search,c=e.multiple,o={role:r?"combobox":"listbox","aria-busy":a,"aria-disabled":n,"aria-expanded":!!t.state.open};return"listbox"===o.role&&(o["aria-multiselectable"]=c),o},t.clearSearchQuery=function(){var e=t.state.searchQuery;void 0!==e&&""!==e&&t.setState({searchQuery:""})},t.handleLabelClick=function(e,a){e.stopPropagation(),t.setState({selectedLabel:a.value}),Object(ne.a)(t.props,"onLabelClick",e,a)},t.handleLabelRemove=function(e,a){e.stopPropagation();var n=t.state.value,r=Object(h.a)(n,a.value);t.setState({value:r}),t.handleChange(e,r)},t.getSelectedIndexAfterMove=function(e,a){void 0===a&&(a=t.state.selectedIndex);var n=ht({value:t.state.value,options:t.props.options,searchQuery:t.state.searchQuery,additionLabel:t.props.additionLabel,additionPosition:t.props.additionPosition,allowAdditions:t.props.allowAdditions,deburr:t.props.deburr,multiple:t.props.multiple,search:t.props.search});if(void 0!==n&&!f(n,"disabled")){var r=n.length-1,c=a+e;return!t.props.wrapSelection&&(c>r||c<0)?c=a:c>r?c=0:c<0&&(c=r),n[c].disabled?t.getSelectedIndexAfterMove(e,c):c}},t.handleIconOverrides=function(e){var a=t.props.clearable;return{className:Object(Se.a)(a&&t.hasValue()&&"clear",e.className),onClick:function(a){Object(ne.a)(e,"onClick",a,e),t.handleIconClick(a)}}},t.clearValue=function(e){var a=t.props.multiple?[]:"";t.setState({value:a}),t.handleChange(e,a)},t.computeSearchInputTabIndex=function(){var e=t.props,a=e.disabled,n=e.tabIndex;return Object(we.a)(n)?a?-1:0:n},t.computeSearchInputWidth=function(){var e=t.state.searchQuery;if(t.sizerRef.current&&e){t.sizerRef.current.style.display="inline",t.sizerRef.current.textContent=e;var a=Math.ceil(t.sizerRef.current.getBoundingClientRect().width);return t.sizerRef.current.style.removeProperty("display"),a}},t.computeTabIndex=function(){var e=t.props,a=e.disabled,n=e.search,r=e.tabIndex;if(!n)return a?-1:Object(we.a)(r)?0:r},t.handleSearchInputOverrides=function(e){return{onChange:function(a,n){Object(ne.a)(e,"onChange",a,n),t.handleSearchChange(a,n)}}},t.hasValue=function(){var e=t.props.multiple,a=t.state.value;return e?!Object(g.a)(a):!Object(we.a)(a)&&""!==a},t.scrollSelectedItemIntoView=function(){if(t.ref.current){var e=t.ref.current.querySelector(".menu.visible");if(e){var a=e.querySelector(".item.selected");if(a){var n=a.offsetTop<e.scrollTop,r=a.offsetTop+a.clientHeight>e.scrollTop+e.clientHeight;n?e.scrollTop=a.offsetTop:r&&(e.scrollTop=a.offsetTop+a.clientHeight-e.clientHeight)}}}},t.setOpenDirection=function(){if(t.ref.current){var e=t.ref.current.querySelector(".menu.visible");if(e){var a=t.ref.current.getBoundingClientRect(),n=e.clientHeight,r=document.documentElement.clientHeight-a.top-a.height-n,c=a.top-n,o=r<0&&c>r;!o!=!t.state.upward&&t.setState({upward:o})}}},t.open=function(e,a){void 0===e&&(e=null),void 0===a&&(a=!0);var n=t.props,r=n.disabled,c=n.search;r||(c&&Object(ne.a)(t.searchRef.current,"focus"),Object(ne.a)(t.props,"onOpen",e,t.props),a&&t.setState({open:!0}),t.scrollSelectedItemIntoView())},t.close=function(e,a){void 0===a&&(a=t.handleClose),t.state.open&&(Object(ne.a)(t.props,"onClose",e,t.props),t.setState({open:!1},a))},t.handleClose=function(){var e=document.activeElement===t.searchRef.current;!e&&t.ref.current&&t.ref.current.blur();var a=document.activeElement===t.ref.current,n=e||a;t.setState({focus:n})},t.toggle=function(e){return t.state.open?t.close(e):t.open(e)},t.renderText=function(){var e,a=t.props,n=a.multiple,r=a.placeholder,c=a.search,o=a.text,i=t.state,l=i.searchQuery,s=i.selectedIndex,u=i.value,p=i.open,d=t.hasValue(),b=Object(Se.a)(r&&!d&&"default","text",c&&l&&"filtered"),f=r;return o?f=o:p&&!n?e=t.getSelectedItem(s):d&&(e=t.getItemByValue(u)),rt.create(e?Nt(e):f,{defaultProps:{className:b}})},t.renderSearchInput=function(){var e=t.props,a=e.search,n=e.searchInput,r=t.state.searchQuery;return a&&De.a.createElement(Ee.a,{innerRef:t.searchRef},at.create(n,{defaultProps:{style:{width:t.computeSearchInputWidth()},tabIndex:t.computeSearchInputTabIndex(),value:r},overrideProps:t.handleSearchInputOverrides}))},t.renderSearchSizer=function(){var e=t.props,a=e.search,n=e.multiple;return a&&n&&De.a.createElement("span",{className:"sizer",ref:t.sizerRef})},t.renderLabels=function(){var e=t.props,a=e.multiple,n=e.renderLabel,r=t.state,c=r.selectedLabel,l=r.value;if(a&&!Object(g.a)(l)){var s=Object(i.a)(l,t.getItemByValue);return Object(i.a)(o(s),(function(e,a){var r={active:e.value===c,as:"a",key:yt(e.key,e.value),onClick:t.handleLabelClick,onRemove:t.handleLabelRemove,value:e.value};return Ve.a.create(n(e,a,r),{defaultProps:r})}))}},t.renderOptions=function(){var e=t.props,a=e.lazyLoad,r=e.multiple,o=e.search,l=e.noResultsMessage,s=t.state,u=s.open,p=s.selectedIndex,d=s.value;if(a&&!u)return null;var b=ht({value:t.state.value,options:t.props.options,searchQuery:t.state.searchQuery,additionLabel:t.props.additionLabel,additionPosition:t.props.additionPosition,allowAdditions:t.props.allowAdditions,deburr:t.props.deburr,multiple:t.props.multiple,search:t.props.search});if(null!==l&&o&&Object(g.a)(b))return De.a.createElement("div",{className:"message"},l);var f=r?function(e){return Object(c.a)(d,e)}:function(e){return e===d};return Object(i.a)(b,(function(e,a){return Ye.create(Object(n.a)({active:f(e.value),onClick:t.handleItemClick,selected:p===a},e,{key:yt(e.key,e.value),style:Object(n.a)({},e.style,{pointerEvents:"all"})}))}))},t.renderMenu=function(){var e=t.props,a=e.children,r=e.direction,c=e.header,o=t.state.open,i=t.getDropdownMenuAriaOptions();if(!Me.a.isNil(a)){var l=Te.Children.only(a),s=Object(Se.a)(r,Object(ze.a)(o,"visible"),l.props.className);return Object(Te.cloneElement)(l,Object(n.a)({className:s},i))}return De.a.createElement(et,Object(n.a)({},i,{direction:r,open:o}),$e.create(c,{autoGenerateKey:!1}),t.renderOptions())},t}Object(r.a)(t,e);var a=t.prototype;return a.getInitialAutoControlledState=function(){return{focus:!1,searchQuery:""}},t.getAutoControlledStateFromProps=function(e,t,a){var n={__options:e.options,__value:t.value};return(!Re()(a.__value,t.value)||!ce(Ct(e.options),Ct(a.__options)))&&(n.selectedIndex=gt({additionLabel:e.additionLabel,additionPosition:e.additionPosition,allowAdditions:e.allowAdditions,deburr:e.deburr,multiple:e.multiple,search:e.search,selectedIndex:t.selectedIndex,value:t.value,options:e.options,searchQuery:t.searchQuery})),n},a.componentDidMount=function(){this.state.open&&this.open(null,!1)},a.shouldComponentUpdate=function(e,t){return!Re()(e,this.props)||!Re()(t,this.state)},a.componentDidUpdate=function(e,t){var a=this.props,n=a.closeOnBlur,r=a.minCharacters,c=a.openOnFocus,o=a.search;if(!t.focus&&this.state.focus){if(!this.isMouseDown){var i=!o||o&&1===r&&!this.state.open;c&&i&&this.open()}}else t.focus&&!this.state.focus&&!this.isMouseDown&&n&&this.close();!t.open&&this.state.open?(this.setOpenDirection(),this.scrollSelectedItemIntoView()):t.open&&this.state.open,t.selectedIndex!==this.state.selectedIndex&&this.scrollSelectedItemIntoView()},a.getDropdownMenuAriaOptions=function(){var e=this.props,t=e.search,a=e.multiple,n={};return t&&(n["aria-multiselectable"]=a,n.role="listbox"),n},a.render=function(){var e=this.props,a=e.basic,r=e.button,c=e.className,o=e.compact,i=e.disabled,l=e.error,s=e.fluid,u=e.floating,p=e.icon,d=e.inline,b=e.item,f=e.labeled,h=e.loading,v=e.multiple,O=e.pointing,j=e.search,m=e.selection,g=e.scrolling,y=e.simple,C=e.trigger,N=this.state,I=N.focus,w=N.open,x=N.upward,k=Object(Se.a)("ui",Object(ze.a)(w,"active visible"),Object(ze.a)(i,"disabled"),Object(ze.a)(l,"error"),Object(ze.a)(h,"loading"),Object(ze.a)(a,"basic"),Object(ze.a)(r,"button"),Object(ze.a)(o,"compact"),Object(ze.a)(s,"fluid"),Object(ze.a)(u,"floating"),Object(ze.a)(d,"inline"),Object(ze.a)(f,"labeled"),Object(ze.a)(b,"item"),Object(ze.a)(v,"multiple"),Object(ze.a)(j,"search"),Object(ze.a)(m,"selection"),Object(ze.a)(y,"simple"),Object(ze.a)(g,"scrolling"),Object(ze.a)(x,"upward"),Object(ze.b)(O,"pointing"),"dropdown",c),E=Object(Be.a)(t,this.props),S=Object(Ke.a)(t,this.props),P=this.getDropdownAriaOptions(S,this.props);return De.a.createElement(Ee.a,{innerRef:this.ref},De.a.createElement(S,Object(n.a)({},E,P,{className:k,onBlur:this.handleBlur,onClick:this.handleClick,onKeyDown:this.handleKeyDown,onMouseDown:this.handleMouseDown,onFocus:this.handleFocus,onChange:this.handleChange,tabIndex:this.computeTabIndex()}),this.renderLabels(),this.renderSearchInput(),this.renderSearchSizer(),C||this.renderText(),Ue.a.create(p,{overrideProps:this.handleIconOverrides,autoGenerateKey:!1}),this.renderMenu(),w&&De.a.createElement(ke.a,{name:"keydown",on:this.closeOnEscape}),w&&De.a.createElement(ke.a,{name:"click",on:this.closeOnDocumentClick}),I&&De.a.createElement(ke.a,{name:"keydown",on:this.removeItemOnBackspace})))},t}(Ge.a);It.handledProps=["additionLabel","additionPosition","allowAdditions","as","basic","button","children","className","clearable","closeOnBlur","closeOnChange","closeOnEscape","compact","deburr","defaultOpen","defaultSearchQuery","defaultSelectedLabel","defaultUpward","defaultValue","direction","disabled","error","floating","fluid","header","icon","inline","item","labeled","lazyLoad","loading","minCharacters","multiple","noResultsMessage","onAddItem","onBlur","onChange","onClick","onClose","onFocus","onLabelClick","onMouseDown","onOpen","onSearchChange","open","openOnFocus","options","placeholder","pointing","renderLabel","scrolling","search","searchInput","searchQuery","selectOnBlur","selectOnNavigation","selectedLabel","selection","simple","tabIndex","text","trigger","upward","value","wrapSelection"],It.propTypes={},It.defaultProps={additionLabel:"Add ",additionPosition:"top",closeOnBlur:!0,closeOnEscape:!0,deburr:!1,icon:"dropdown",minCharacters:1,noResultsMessage:"No results found.",openOnFocus:!0,renderLabel:Nt,searchInput:"text",selectOnBlur:!0,selectOnNavigation:!0,wrapSelection:!0},It.autoControlledProps=["open","searchQuery","selectedLabel","value","upward"],It.Divider=qe,It.Header=$e,It.Item=Ye,It.Menu=et,It.SearchInput=at,It.Text=rt},176:function(e,t,a){"use strict";var n=a(1),r=a(9),c=a(33),o=a(4),i=a(3),l=(a(6),a(0)),s=a.n(l),u=a(18),p=a(90),d=a(91),b=a(2),f=a(122);function h(e){var t=e.children,a=e.className,r=e.content,c=Object(i.a)(a,"description"),o=Object(p.a)(h,e),l=Object(d.a)(h,e);return s.a.createElement(l,Object(n.a)({},o,{className:c}),b.a.isNil(t)?r:t)}h.handledProps=["as","children","className","content"],h.propTypes={},h.create=Object(f.b)(h,(function(e){return{content:e}}));var v=h;function O(e){var t=e.children,a=e.className,r=e.content,c=Object(i.a)("header",a),o=Object(p.a)(O,e),l=Object(d.a)(O,e);return s.a.createElement(l,Object(n.a)({},o,{className:c}),b.a.isNil(t)?r:t)}O.handledProps=["as","children","className","content"],O.propTypes={},O.create=Object(f.b)(O,(function(e){return{content:e}}));var j=O;function m(e){var t=e.children,a=e.className,r=e.content,c=e.description,o=e.floated,l=e.header,f=e.verticalAlign,h=Object(i.a)(Object(u.c)(o,"floated"),Object(u.d)(f),"content",a),O=Object(p.a)(m,e),g=Object(d.a)(m,e);return b.a.isNil(t)?s.a.createElement(g,Object(n.a)({},O,{className:h}),j.create(l),v.create(c),r):s.a.createElement(g,Object(n.a)({},O,{className:h}),t)}m.handledProps=["as","children","className","content","description","floated","header","verticalAlign"],m.propTypes={},m.create=Object(f.b)(m,(function(e){return{content:e}}));var g=m,y=a(80);function C(e){var t=e.className,a=e.verticalAlign,r=Object(i.a)(Object(u.d)(a),t),c=Object(p.a)(C,e);return s.a.createElement(y.a,Object(n.a)({},c,{className:r}))}C.handledProps=["className","verticalAlign"],C.propTypes={},C.create=Object(f.b)(C,(function(e){return{name:e}}));var N=C,I=a(112),w=a(137),x=function(e){function t(){for(var t,a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(t=e.call.apply(e,[this].concat(n))||this).handleClick=function(e){t.props.disabled||Object(o.a)(t.props,"onClick",e,t.props)},t}return Object(r.a)(t,e),t.prototype.render=function(){var e=this.props,a=e.active,r=e.children,c=e.className,o=e.content,f=e.description,h=e.disabled,O=e.header,m=e.icon,y=e.image,C=e.value,x=Object(d.a)(t,this.props),k=Object(i.a)(Object(u.a)(a,"active"),Object(u.a)(h,"disabled"),Object(u.a)("li"!==x,"item"),c),E=Object(p.a)(t,this.props),S="li"===x?{value:C}:{"data-value":C};if(!b.a.isNil(r))return s.a.createElement(x,Object(n.a)({},S,{role:"listitem",className:k,onClick:this.handleClick},E),r);var P=N.create(m,{autoGenerateKey:!1}),A=w.a.create(y,{autoGenerateKey:!1});if(!Object(l.isValidElement)(o)&&Object(I.a)(o))return s.a.createElement(x,Object(n.a)({},S,{role:"listitem",className:k,onClick:this.handleClick},E),P||A,g.create(o,{autoGenerateKey:!1,defaultProps:{header:O,description:f}}));var T=j.create(O,{autoGenerateKey:!1}),D=v.create(f,{autoGenerateKey:!1});return P||A?s.a.createElement(x,Object(n.a)({},S,{role:"listitem",className:k,onClick:this.handleClick},E),P||A,(o||T||D)&&s.a.createElement(g,null,T,D,o)):s.a.createElement(x,Object(n.a)({},S,{role:"listitem",className:k,onClick:this.handleClick},E),T,D,o)},t}(l.Component);x.handledProps=["active","as","children","className","content","description","disabled","header","icon","image","onClick","value"],x.propTypes={},x.create=Object(f.b)(x,(function(e){return{content:e}}));var k=x;function E(e){var t=e.children,a=e.className,r=e.content,c=Object(p.a)(E,e),o=Object(d.a)(E,e),l=Object(i.a)(Object(u.a)("ul"!==o&&"ol"!==o,"list"),a);return s.a.createElement(o,Object(n.a)({},c,{className:l}),b.a.isNil(t)?r:t)}E.handledProps=["as","children","className","content"],E.propTypes={};var S=E,P=function(e){function t(){for(var t,a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(t=e.call.apply(e,[this].concat(n))||this).handleItemOverrides=function(e){return{onClick:function(a,n){Object(o.a)(e,"onClick",a,n),Object(o.a)(t.props,"onItemClick",a,n)}}},t}return Object(r.a)(t,e),t.prototype.render=function(){var e=this,a=this.props,r=a.animated,o=a.bulleted,l=a.celled,f=a.children,h=a.className,v=a.content,O=a.divided,j=a.floated,m=a.horizontal,g=a.inverted,y=a.items,C=a.link,N=a.ordered,I=a.relaxed,w=a.selection,x=a.size,E=a.verticalAlign,S=Object(i.a)("ui",x,Object(u.a)(r,"animated"),Object(u.a)(o,"bulleted"),Object(u.a)(l,"celled"),Object(u.a)(O,"divided"),Object(u.a)(m,"horizontal"),Object(u.a)(g,"inverted"),Object(u.a)(C,"link"),Object(u.a)(N,"ordered"),Object(u.a)(w,"selection"),Object(u.b)(I,"relaxed"),Object(u.c)(j,"floated"),Object(u.d)(E),"list",h),P=Object(p.a)(t,this.props),A=Object(d.a)(t,this.props);return b.a.isNil(f)?b.a.isNil(v)?s.a.createElement(A,Object(n.a)({role:"list",className:S},P),Object(c.a)(y,(function(t){return k.create(t,{overrideProps:e.handleItemOverrides})}))):s.a.createElement(A,Object(n.a)({role:"list",className:S},P),v):s.a.createElement(A,Object(n.a)({role:"list",className:S},P),f)},t}(l.Component);P.handledProps=["animated","as","bulleted","celled","children","className","content","divided","floated","horizontal","inverted","items","link","onItemClick","ordered","relaxed","selection","size","verticalAlign"],P.propTypes={},P.Content=g,P.Description=v,P.Header=j,P.Icon=N,P.Item=k,P.List=S;t.a=P},177:function(e,t,a){"use strict";var n=a(1),r=a(3),c=(a(6),a(0)),o=a.n(c),i=a(18),l=a(90),s=a(9),u=a(33),p=a(4),d=a(57),b=a(30),f=(a(7),a(91)),h=a(2),v=a(129),O=a(122),j=a(11),m=a(80),g=function(e){function t(){for(var t,a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(t=e.call.apply(e,[this].concat(n))||this).handleClick=function(e){return Object(p.a)(t.props,"onClick",e,t.props)},t}return Object(s.a)(t,e),t.prototype.render=function(){var e=this.props,a=e.active,c=e.children,s=e.className,u=e.content,p=e.icon,d=Object(r.a)(Object(i.a)(a,"active"),"title",s),b=Object(l.a)(t,this.props),v=Object(f.a)(t,this.props),O=Object(j.a)(p)?"dropdown":p;return h.a.isNil(c)?o.a.createElement(v,Object(n.a)({},b,{className:d,onClick:this.handleClick}),m.a.create(O,{autoGenerateKey:!1}),u):o.a.createElement(v,Object(n.a)({},b,{className:d,onClick:this.handleClick}),c)},t}(c.Component);function y(e){var t=e.active,a=e.children,c=e.className,s=e.content,u=Object(r.a)("content",Object(i.a)(t,"active"),c),p=Object(l.a)(y,e),d=Object(f.a)(y,e);return o.a.createElement(d,Object(n.a)({},p,{className:u}),h.a.isNil(a)?s:a)}g.handledProps=["active","as","children","className","content","icon","index","onClick"],g.propTypes={},g.create=Object(O.b)(g,(function(e){return{content:e}})),y.handledProps=["active","as","children","className","content"],y.propTypes={},y.create=Object(O.b)(y,(function(e){return{content:e}}));var C=y,N=function(e){function t(){for(var t,a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(t=e.call.apply(e,[this].concat(n))||this).handleTitleOverrides=function(e){return{onClick:function(a,n){Object(p.a)(e,"onClick",a,n),Object(p.a)(t.props,"onTitleClick",a,n)}}},t}return Object(s.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.active,a=e.content,n=e.index,r=e.title;return o.a.createElement(o.a.Fragment,null,g.create(r,{autoGenerateKey:!1,defaultProps:{active:t,index:n},overrideProps:this.handleTitleOverrides}),C.create(a,{autoGenerateKey:!1,defaultProps:{active:t}}))},t}(c.Component);N.handledProps=["active","content","index","onTitleClick","title"],N.propTypes={},N.create=Object(O.b)(N,null);var I=N,w=function(e){function t(){for(var t,a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(t=e.call.apply(e,[this].concat(n))||this).computeNewIndex=function(e){var a=t.props.exclusive,n=t.state.activeIndex;return a?e===n?-1:e:Object(b.a)(n,e)?Object(d.a)(n,e):[].concat(n,[e])},t.handleTitleClick=function(e,a){var n=a.index;t.setState({activeIndex:t.computeNewIndex(n)}),Object(p.a)(t.props,"onTitleClick",e,a)},t.isIndexActive=function(e){var a=t.props.exclusive,n=t.state.activeIndex;return a?n===e:Object(b.a)(n,e)},t}Object(s.a)(t,e);var a=t.prototype;return a.getInitialAutoControlledState=function(e){return{activeIndex:e.exclusive?-1:[]}},a.componentDidMount=function(){0},a.componentDidUpdate=function(){0},a.render=function(){var e=this,a=this.props,c=a.className,i=a.children,s=a.panels,p=Object(r.a)("accordion",c),d=Object(l.a)(t,this.props),b=Object(f.a)(t,this.props);return o.a.createElement(b,Object(n.a)({},d,{className:p}),h.a.isNil(i)?Object(u.a)(s,(function(t,a){return I.create(t,{defaultProps:{active:e.isIndexActive(a),index:a,onTitleClick:e.handleTitleClick}})})):i)},t}(v.a);function x(e){var t=e.className,a=e.fluid,c=e.inverted,s=e.styled,u=Object(r.a)("ui",Object(i.a)(a,"fluid"),Object(i.a)(c,"inverted"),Object(i.a)(s,"styled"),t),p=Object(l.a)(x,e);return o.a.createElement(w,Object(n.a)({},p,{className:u}))}w.handledProps=["activeIndex","as","children","className","defaultActiveIndex","exclusive","onTitleClick","panels"],w.propTypes={},w.defaultProps={exclusive:!0},w.autoControlledProps=["activeIndex"],w.create=Object(O.b)(w,(function(e){return{content:e}})),x.handledProps=["className","fluid","inverted","styled"],x.propTypes={},x.Accordion=w,x.Content=C,x.Panel=I,x.Title=g;t.a=x},52:function(e,t,a){"use strict";var n=a(17),r=a(13);t.a=function(e){return Object(r.a)(e)&&Object(n.a)(e)}},57:function(e,t,a){"use strict";var n=a(106),r=a(37),c=a(52),o=Object(r.a)((function(e,t){return Object(c.a)(e)?Object(n.a)(e,t):[]}));t.a=o},75:function(e,t,a){"use strict";var n=a(69),r=a(54),c=a(45),o=a(7),i=a(17),l=a(51),s=a(94),u=a(71),p=Object.prototype.hasOwnProperty;t.a=function(e){if(null==e)return!0;if(Object(i.a)(e)&&(Object(o.a)(e)||"string"==typeof e||"function"==typeof e.splice||Object(l.a)(e)||Object(u.a)(e)||Object(c.a)(e)))return!e.length;var t=Object(r.a)(e);if("[object Map]"==t||"[object Set]"==t)return!e.size;if(Object(s.a)(e))return!Object(n.a)(e).length;for(var a in e)if(p.call(e,a))return!1;return!0}}}]);
//# sourceMappingURL=vendors~frontend-b95d105d.js.map