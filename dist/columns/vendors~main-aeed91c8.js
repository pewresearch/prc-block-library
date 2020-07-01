/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2020 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibrarycolumnsJsonp=window.wpackioprcBlocksLibrarycolumnsJsonp||[]).push([[2],[,,function(t,n){function e(n){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=e=function(t){return typeof t}:t.exports=e=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(n)}t.exports=e},function(t,n,e){var r,o=e(2);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var t=[],n=0;n<arguments.length;n++){var e=arguments[n];if(e){var r=o(e);if("string"===r||"number"===r)t.push(e);else if(Array.isArray(e)&&e.length){var a=c.apply(null,e);a&&t.push(a)}else if("object"===r)for(var u in e)i.call(e,u)&&e[u]&&t.push(u)}}return t.join(" ")}t.exports?(c.default=c,t.exports=c):"object"===o(e(26))&&e(26)?void 0===(r=function(){return c}.apply(n,[]))||(t.exports=r):window.classNames=c}()},,,function(t,n){function e(){return t.exports=e=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},e.apply(this,arguments)}t.exports=e},function(t,n,e){var r=e(29),o=e(57),i=e(58),c=r?r.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":c&&c in Object(t)?o(t):i(t)}},function(t,n,e){"use strict";function r(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}e.d(n,"a",(function(){return r}))},function(t,n,e){var r=e(22)(Object,"create");t.exports=r},function(t,n,e){var r=e(2),o=e(55),i="object"==("undefined"==typeof self?"undefined":r(self))&&self&&self.Object===Object&&self,c=o||i||Function("return this")();t.exports=c},function(t,n,e){var r=e(70);t.exports=function(t,n){for(var e=t.length;e--;)if(r(t[e][0],n))return e;return-1}},function(t,n,e){var r=e(76);t.exports=function(t,n){var e=t.__data__;return r(n)?e["string"==typeof n?"string":"hash"]:e.map}},function(t,n,e){var r=e(2);t.exports=function(t){return null!=t&&"object"==r(t)}},function(t,n,e){"use strict";e.d(n,"a",(function(){return o}));var r=e(8);function o(t,n){if(t){if("string"==typeof t)return Object(r.a)(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?Object(r.a)(t,n):void 0}}},,,function(t,n,e){var r=e(7),o=e(30);t.exports=function(t){if(!o(t))return!1;var n=r(t);return"[object Function]"==n||"[object GeneratorFunction]"==n||"[object AsyncFunction]"==n||"[object Proxy]"==n}},,function(t,n,e){var r=e(47);t.exports=function(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?Object(arguments[n]):{},o=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(e).filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})))),o.forEach((function(n){r(t,n,e[n])}))}return t}},function(t,n){t.exports=function(t){return null==t}},function(t,n,e){t.exports=e(45)()},function(t,n,e){var r=e(54),o=e(62);t.exports=function(t,n){var e=o(t,n);return r(e)?e:void 0}},function(t,n){var e=Array.isArray;t.exports=e},,,function(t,n){(function(n){t.exports=n}).call(this,{})},function(t,n,e){var r=e(41),o=e(42),i=e(43),c=e(44);t.exports=function(t){return r(t)||o(t)||i(t)||c()}},function(t,n){t.exports=function(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}},function(t,n,e){var r=e(10).Symbol;t.exports=r},function(t,n,e){var r=e(2);t.exports=function(t){var n=r(t);return null!=t&&("object"==n||"function"==n)}},function(t,n){t.exports=function(t){var n=-1,e=Array(t.size);return t.forEach((function(t){e[++n]=t})),e}},function(t,n,e){var r=e(48);t.exports=function(t){return t&&t.length?r(t):[]}},function(t,n,e){var r=e(7),o=e(92),i=e(13),c=Function.prototype,a=Object.prototype,u=c.toString,s=a.hasOwnProperty,f=u.call(Object);t.exports=function(t){if(!i(t)||"[object Object]"!=r(t))return!1;var n=o(t);if(null===n)return!0;var e=s.call(n,"constructor")&&n.constructor;return"function"==typeof e&&e instanceof e&&u.call(e)==f}},function(t,n,e){var r=e(7),o=e(13);t.exports=function(t){return"number"==typeof t||o(t)&&"[object Number]"==r(t)}},function(t,n,e){var r=e(7),o=e(23),i=e(13);t.exports=function(t){return"string"==typeof t||!o(t)&&i(t)&&"[object String]"==r(t)}},function(t,n,e){var r=e(7),o=e(13);t.exports=function(t){return!0===t||!1===t||o(t)&&"[object Boolean]"==r(t)}},function(t,n,e){"use strict";e.d(n,"a",(function(){return i}));var r=e(8);var o=e(14);function i(t){return function(t){if(Array.isArray(t))return Object(r.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(o.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},function(t,n,e){"use strict";e.d(n,"a",(function(){return o}));var r=e(14);function o(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var e=[],r=!0,o=!1,i=void 0;try{for(var c,a=t[Symbol.iterator]();!(r=(c=a.next()).done)&&(e.push(c.value),!n||e.length!==n);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return e}}(t,n)||Object(r.a)(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},,function(t,n,e){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");e.p=window["__wpackIo".concat(r)]},function(t,n,e){var r=e(28);t.exports=function(t){if(Array.isArray(t))return r(t)}},function(t,n){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}},function(t,n,e){var r=e(28);t.exports=function(t,n){if(t){if("string"==typeof t)return r(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?r(t,n):void 0}}},function(t,n){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(t,n,e){"use strict";var r=e(46);function o(){}function i(){}i.resetWarningCache=o,t.exports=function(){function t(t,n,e,o,i,c){if(c!==r){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function n(){return t}t.isRequired=t;var e={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:n,element:t,elementType:t,instanceOf:n,node:t,objectOf:n,oneOf:n,oneOfType:n,shape:n,exact:n,checkPropTypes:i,resetWarningCache:o};return e.PropTypes=e,e}},function(t,n,e){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(t,n){t.exports=function(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}},function(t,n,e){var r=e(49),o=e(82),i=e(87),c=e(88),a=e(89),u=e(31);t.exports=function(t,n,e){var s=-1,f=o,l=t.length,p=!0,d=[],v=d;if(e)p=!1,f=i;else if(l>=200){var h=n?null:a(t);if(h)return u(h);p=!1,f=c,v=new r}else v=n?[]:d;t:for(;++s<l;){var y=t[s],b=n?n(y):y;if(y=e||0!==y?y:0,p&&b==b){for(var m=v.length;m--;)if(v[m]===b)continue t;n&&v.push(b),d.push(y)}else f(v,b,e)||(v!==d&&v.push(b),d.push(y))}return d}},function(t,n,e){var r=e(50),o=e(80),i=e(81);function c(t){var n=-1,e=null==t?0:t.length;for(this.__data__=new r;++n<e;)this.add(t[n])}c.prototype.add=c.prototype.push=o,c.prototype.has=i,t.exports=c},function(t,n,e){var r=e(51),o=e(75),i=e(77),c=e(78),a=e(79);function u(t){var n=-1,e=null==t?0:t.length;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}u.prototype.clear=r,u.prototype.delete=o,u.prototype.get=i,u.prototype.has=c,u.prototype.set=a,t.exports=u},function(t,n,e){var r=e(52),o=e(67),i=e(74);t.exports=function(){this.size=0,this.__data__={hash:new r,map:new(i||o),string:new r}}},function(t,n,e){var r=e(53),o=e(63),i=e(64),c=e(65),a=e(66);function u(t){var n=-1,e=null==t?0:t.length;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}u.prototype.clear=r,u.prototype.delete=o,u.prototype.get=i,u.prototype.has=c,u.prototype.set=a,t.exports=u},function(t,n,e){var r=e(9);t.exports=function(){this.__data__=r?r(null):{},this.size=0}},function(t,n,e){var r=e(17),o=e(59),i=e(30),c=e(61),a=/^\[object .+?Constructor\]$/,u=Function.prototype,s=Object.prototype,f=u.toString,l=s.hasOwnProperty,p=RegExp("^"+f.call(l).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");t.exports=function(t){return!(!i(t)||o(t))&&(r(t)?p:a).test(c(t))}},function(t,n,e){(function(n){var r=e(2),o="object"==(void 0===n?"undefined":r(n))&&n&&n.Object===Object&&n;t.exports=o}).call(this,e(56))},function(t,n,e){var r,o=e(2);r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"===("undefined"==typeof window?"undefined":o(window))&&(r=window)}t.exports=r},function(t,n,e){var r=e(29),o=Object.prototype,i=o.hasOwnProperty,c=o.toString,a=r?r.toStringTag:void 0;t.exports=function(t){var n=i.call(t,a),e=t[a];try{t[a]=void 0;var r=!0}catch(t){}var o=c.call(t);return r&&(n?t[a]=e:delete t[a]),o}},function(t,n){var e=Object.prototype.toString;t.exports=function(t){return e.call(t)}},function(t,n,e){var r,o=e(60),i=(r=/[^.]+$/.exec(o&&o.keys&&o.keys.IE_PROTO||""))?"Symbol(src)_1."+r:"";t.exports=function(t){return!!i&&i in t}},function(t,n,e){var r=e(10)["__core-js_shared__"];t.exports=r},function(t,n){var e=Function.prototype.toString;t.exports=function(t){if(null!=t){try{return e.call(t)}catch(t){}try{return t+""}catch(t){}}return""}},function(t,n){t.exports=function(t,n){return null==t?void 0:t[n]}},function(t,n){t.exports=function(t){var n=this.has(t)&&delete this.__data__[t];return this.size-=n?1:0,n}},function(t,n,e){var r=e(9),o=Object.prototype.hasOwnProperty;t.exports=function(t){var n=this.__data__;if(r){var e=n[t];return"__lodash_hash_undefined__"===e?void 0:e}return o.call(n,t)?n[t]:void 0}},function(t,n,e){var r=e(9),o=Object.prototype.hasOwnProperty;t.exports=function(t){var n=this.__data__;return r?void 0!==n[t]:o.call(n,t)}},function(t,n,e){var r=e(9);t.exports=function(t,n){var e=this.__data__;return this.size+=this.has(t)?0:1,e[t]=r&&void 0===n?"__lodash_hash_undefined__":n,this}},function(t,n,e){var r=e(68),o=e(69),i=e(71),c=e(72),a=e(73);function u(t){var n=-1,e=null==t?0:t.length;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}u.prototype.clear=r,u.prototype.delete=o,u.prototype.get=i,u.prototype.has=c,u.prototype.set=a,t.exports=u},function(t,n){t.exports=function(){this.__data__=[],this.size=0}},function(t,n,e){var r=e(11),o=Array.prototype.splice;t.exports=function(t){var n=this.__data__,e=r(n,t);return!(e<0)&&(e==n.length-1?n.pop():o.call(n,e,1),--this.size,!0)}},function(t,n){t.exports=function(t,n){return t===n||t!=t&&n!=n}},function(t,n,e){var r=e(11);t.exports=function(t){var n=this.__data__,e=r(n,t);return e<0?void 0:n[e][1]}},function(t,n,e){var r=e(11);t.exports=function(t){return r(this.__data__,t)>-1}},function(t,n,e){var r=e(11);t.exports=function(t,n){var e=this.__data__,o=r(e,t);return o<0?(++this.size,e.push([t,n])):e[o][1]=n,this}},function(t,n,e){var r=e(22)(e(10),"Map");t.exports=r},function(t,n,e){var r=e(12);t.exports=function(t){var n=r(this,t).delete(t);return this.size-=n?1:0,n}},function(t,n,e){var r=e(2);t.exports=function(t){var n=r(t);return"string"==n||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==t:null===t}},function(t,n,e){var r=e(12);t.exports=function(t){return r(this,t).get(t)}},function(t,n,e){var r=e(12);t.exports=function(t){return r(this,t).has(t)}},function(t,n,e){var r=e(12);t.exports=function(t,n){var e=r(this,t),o=e.size;return e.set(t,n),this.size+=e.size==o?0:1,this}},function(t,n){t.exports=function(t){return this.__data__.set(t,"__lodash_hash_undefined__"),this}},function(t,n){t.exports=function(t){return this.__data__.has(t)}},function(t,n,e){var r=e(83);t.exports=function(t,n){return!!(null==t?0:t.length)&&r(t,n,0)>-1}},function(t,n,e){var r=e(84),o=e(85),i=e(86);t.exports=function(t,n,e){return n==n?i(t,n,e):r(t,o,e)}},function(t,n){t.exports=function(t,n,e,r){for(var o=t.length,i=e+(r?1:-1);r?i--:++i<o;)if(n(t[i],i,t))return i;return-1}},function(t,n){t.exports=function(t){return t!=t}},function(t,n){t.exports=function(t,n,e){for(var r=e-1,o=t.length;++r<o;)if(t[r]===n)return r;return-1}},function(t,n){t.exports=function(t,n,e){for(var r=-1,o=null==t?0:t.length;++r<o;)if(e(n,t[r]))return!0;return!1}},function(t,n){t.exports=function(t,n){return t.has(n)}},function(t,n,e){var r=e(90),o=e(91),i=e(31),c=r&&1/i(new r([,-0]))[1]==1/0?function(t){return new r(t)}:o;t.exports=c},function(t,n,e){var r=e(22)(e(10),"Set");t.exports=r},function(t,n){t.exports=function(){}},function(t,n,e){var r=e(93)(Object.getPrototypeOf,Object);t.exports=r},function(t,n){t.exports=function(t,n){return function(e){return t(n(e))}}},,,,function(t,n,e){"use strict";e(27);var r=e(6),o=e.n(r),i=e(3),c=e.n(i),a=(e(21),e(4)),u=e.n(a),s=e(2),f=e.n(s),l={1:"one",2:"two",3:"three",4:"four",5:"five",6:"six",7:"seven",8:"eight",9:"nine",10:"ten",11:"eleven",12:"twelve",13:"thirteen",14:"fourteen",15:"fifteen",16:"sixteen"};function p(t){var n=f()(t);return"string"===n||"number"===n?l[t]||t:""}var d=function(t,n){return t&&n},v=function(t,n){return t&&!0!==t&&"".concat(t," ").concat(n)},h=function(t,n){return t&&(!0===t?n:"".concat(t," ").concat(n))},y=function(t,n){return t&&!0!==t?t.replace("large screen","large-screen").replace(/ vertically/g,"-vertically").split(" ").map((function(t){return"".concat(t.replace("-"," ")," ").concat(n)})).join(" "):null},b=function(t){return"justified"===t?"justified":v(t,"aligned")},m=function(t){return v(t,"aligned")},x=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",e=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(e&&"equal"===t)return"equal width";var r=f()(t);return"string"!==r&&"number"!==r||!n?p(t):"".concat(p(t)," ").concat(n)},_=function(t,n){var e=t.handledProps,r=void 0===e?[]:e;return Object.keys(n).reduce((function(t,e){return"childKey"===e||-1===r.indexOf(e)&&(t[e]=n[e]),t}),{})};var g=function(t,n,e){var r=t.defaultProps,o=void 0===r?{}:r;if(n.as&&n.as!==o.as)return n.as;if(e){var i=e();if(i)return i}return n.href?"a":o.as||"div"},j=e(19),w=e.n(j),O=e(32),S=e.n(O),A=e(23),P=e.n(A),k=e(33),E=e.n(k),N=e(17),T=e.n(N),I=e(34),z=e.n(I),C=e(35),F=e.n(C),R=e(36),$=e.n(R),B=e(20),L=e.n(B);function U(t,n,e){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if("function"!=typeof t&&"string"!=typeof t)throw new Error("createShorthand() Component must be a string or function.");if(L()(e)||$()(e))return null;var o=F()(e),i=z()(e),s=T()(e),f=Object(a.isValidElement)(e),l=E()(e),p=o||i||P()(e);if(!(s||f||l||p))return null;var d=r.defaultProps,v=void 0===d?{}:d,h=f&&e.props||l&&e||p&&n(e),y=r.overrideProps,b=void 0===y?{}:y;b=T()(b)?b(w()({},v,h)):b;var m=w()({},v,h,b);if(v.className||b.className||h.className){var x=c()(v.className,b.className,h.className);m.className=S()(x.split(" ")).join(" ")}if((v.style||b.style||h.style)&&(m.style=w()({},v.style,h.style,b.style)),L()(m.key)){var _=m.childKey,g=r.autoGenerateKey,j=void 0===g||g;L()(_)?j&&(o||i)&&(m.key=e):(m.key="function"==typeof _?_(m):_,delete m.childKey)}return f?Object(a.cloneElement)(e,m):p||l?u.a.createElement(t,m):s?e(t,m,m.children):void 0}function K(t,n){if("function"!=typeof t&&"string"!=typeof t)throw new Error("createShorthandFactory() Component must be a string or function.");return function(e,r){return U(t,n,e,r)}}U.handledProps=[];K("div",(function(t){return{children:t}})),K("iframe",(function(t){return{src:t}})),K("img",(function(t){return{src:t}})),K("input",(function(t){return{type:t}})),K("label",(function(t){return{children:t}})),K("p",(function(t){return{children:t}}));function q(t){var n=t.children,e=t.className,r=t.computer,i=t.color,a=t.floated,s=t.largeScreen,f=t.mobile,l=t.only,p=t.stretched,h=t.tablet,j=t.textAlign,w=t.verticalAlign,O=t.widescreen,S=t.width,A=c()(i,d(p,"stretched"),y(l,"only"),b(j),v(a,"floated"),m(w),x(r,"wide computer"),x(s,"wide large screen"),x(f,"wide mobile"),x(h,"wide tablet"),x(O,"wide widescreen"),x(S,"wide"),"column",e),P=_(q,t),k=g(q,t);return u.a.createElement(k,o()({},P,{className:A}),n)}q.handledProps=["as","children","className","color","computer","floated","largeScreen","mobile","only","stretched","tablet","textAlign","verticalAlign","widescreen","width"],q.propTypes={},q.create=K(q,(function(t){return{children:t}}));var D=q;function M(t){var n=t.centered,e=t.children,r=t.className,i=t.color,a=t.columns,s=t.divided,f=t.only,l=t.reversed,p=t.stretched,v=t.textAlign,h=t.verticalAlign,j=c()(i,d(n,"centered"),d(s,"divided"),d(p,"stretched"),y(f,"only"),y(l,"reversed"),b(v),m(h),x(a,"column",!0),"row",r),w=_(M,t),O=g(M,t);return u.a.createElement(O,o()({},w,{className:j}),e)}M.handledProps=["as","centered","children","className","color","columns","divided","only","reversed","stretched","textAlign","verticalAlign"],M.propTypes={};var W=M;function G(t){var n=t.celled,e=t.centered,r=t.children,i=t.className,a=t.columns,s=t.container,f=t.divided,l=t.doubling,p=t.inverted,v=t.padded,j=t.relaxed,w=t.reversed,O=t.stackable,S=t.stretched,A=t.textAlign,P=t.verticalAlign,k=c()("ui",d(e,"centered"),d(s,"container"),d(l,"doubling"),d(p,"inverted"),d(O,"stackable"),d(S,"stretched"),h(n,"celled"),h(f,"divided"),h(v,"padded"),h(j,"relaxed"),y(w,"reversed"),b(A),m(P),x(a,"column",!0),"grid",i),E=_(G,t),N=g(G,t);return u.a.createElement(N,o()({},E,{className:k}),r)}G.handledProps=["as","celled","centered","children","className","columns","container","divided","doubling","inverted","padded","relaxed","reversed","stackable","stretched","textAlign","verticalAlign"],G.Column=D,G.Row=W,G.propTypes={};n.a=G}]]);
//# sourceMappingURL=vendors~main-aeed91c8.js.map