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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[48],{0:function(e,t){e.exports=window.React},10:function(e,t){e.exports=window.wp.blocks},12:function(e,t){e.exports=window.wp.data},2:function(e,t){e.exports=window.wp.element},27:function(e,t){e.exports=window.wp.apiFetch},28:function(e,t,n){var r,i=n(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var a={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=i(n);if("string"===r||"number"===r)e.push(this&&this[n]||n);else if(Array.isArray(n))e.push(o.apply(this,n));else if("object"===r)if(n.toString===Object.prototype.toString)for(var c in n)a.call(n,c)&&n[c]&&e.push(this&&this[c]||c);else e.push(n.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):"object"===i(n(19))&&n(19)?void 0===(r=function(){return o}.apply(t,[]))||(e.exports=r):window.classNames=o}()},3:function(e,t){e.exports=window.wp.i18n},342:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-categorized","category":"layout","attributes":{"heading":{"type":"string"},"url":{"type":"string"}},"supports":{"html":false}}')},37:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n(0),i=n(59),a=n.n(i);function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function c(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}var s=function(e){var t,i;function s(){return e.apply(this,arguments)||this}i=e,(t=s).prototype=Object.create(i.prototype),t.prototype.constructor=t,t.__proto__=i;var u=s.prototype;return u.componentDidMount=function(){var e;try{e=n(74)}catch(e){return}e&&e()},u.renderSources=function(){var e=a.a&&document.documentMode?document.documentMode:-1,t=this.props.sources;if(null==t)return null;var n=t.map((function(e,t){return null==e.srcSet?null:r.createElement("source",{key:"sources-"+t,srcSet:e.srcSet,media:e.media,type:e.type})}));return 9===e?r.createElement("video",{style:{display:"none"}},n):n},u.renderImage=function(e,t){void 0===t&&(t=!1);var n=e.alt,i=void 0===n?"":n,a=e.src,s=void 0===a?"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==":a,u=e.sizes,l=c(e,["alt","src","sizes"]),f=t?null:{sizes:u};return r.createElement("img",o({alt:i,srcSet:s},f,l))},u.render=function(){var e=this.props,t=e.sources,n=c(e,["sources"]);return null!=t?r.createElement("picture",null,this.renderSources(),this.renderImage(n,!0)):this.renderImage(n)},s}(r.PureComponent),u=n(40),l=n.n(u);l()("div")({width:"100%",height:"100%",position:"relative"}),l()("div")({overflow:"hidden",top:0,left:0,right:0,bottom:0,position:"absolute"}),l()(s)((function(e){var t=e.cover,n=void 0===t?"both":t,r=e.center,i=void 0===r||r;return{position:"absolute",top:i?"50%":0,left:i?"50%":0,transform:i?"translate(-50%, -50%)":"none",width:"width"===n?"100%":"auto",height:"height"===n?"100%":"auto",minHeight:"both"===n?"100%":"none",minWidth:"both"===n?"100%":"none"}}))},38:function(e,t){e.exports=window.wp.url},39:function(e,t,n){(function(t){var r=n(15),i=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,o=/^0b[01]+$/i,c=/^0o[0-7]+$/i,s=parseInt,u="object"==(void 0===t?"undefined":r(t))&&t&&t.Object===Object&&t,l="object"==("undefined"==typeof self?"undefined":r(self))&&self&&self.Object===Object&&self,f=u||l||Function("return this")(),p=Object.prototype.toString,d=Math.max,m=Math.min,h=function(){return f.Date.now()};function v(e){var t=r(e);return!!e&&("object"==t||"function"==t)}function b(e){return"symbol"==r(e)||function(e){return!!e&&"object"==r(e)}(e)&&"[object Symbol]"==p.call(e)}function g(e){if("number"==typeof e)return e;if(b(e))return NaN;if(v(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=v(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(i,"");var n=o.test(e);return n||c.test(e)?s(e.slice(2),n?2:8):a.test(e)?NaN:+e}e.exports=function(e,t,n){var r,i,a,o,c,s,u=0,l=!1,f=!1,p=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function b(t){var n=r,a=i;return r=i=void 0,u=t,o=e.apply(a,n)}function y(e){return u=e,c=setTimeout(w,t),l?b(e):o}function A(e){var n=e-s;return void 0===s||n>=t||n<0||f&&e-u>=a}function w(){var e=h();if(A(e))return O(e);c=setTimeout(w,function(e){var n=t-(e-s);return f?m(n,a-(e-u)):n}(e))}function O(e){return c=void 0,p&&r?b(e):(r=i=void 0,o)}function j(){var e=h(),n=A(e);if(r=arguments,i=this,s=e,n){if(void 0===c)return y(s);if(f)return c=setTimeout(w,t),b(s)}return void 0===c&&(c=setTimeout(w,t)),o}return t=g(t)||0,v(n)&&(l=!!n.leading,a=(f="maxWait"in n)?d(g(n.maxWait)||0,t):a,p="trailing"in n?!!n.trailing:p),j.cancel=function(){void 0!==c&&clearTimeout(c),u=0,r=s=i=c=void 0},j.flush=function(){return void 0===c?o:O(h())},j}}).call(this,n(56))},4:function(e,t){e.exports=window.wp.components},40:function(e,t,n){e.exports=n(75)},45:function(e,t){e.exports=moment},46:function(e,t,n){"use strict";n.d(t,"a",(function(){return ae})),n.d(t,"b",(function(){return ce})),n.d(t,"c",(function(){return le})),n.d(t,"d",(function(){return re})),n.d(t,"e",(function(){return ie})),n.d(t,"f",(function(){return fe}));var r=n(14),i=n(44);var a=n(27),o=n.n(a),c=n(3),s=n(12),u=n(4),l=n(10),f=n(2),p=n(6),d=n(83),m=n(5),h=n(8),v=(n(1),n(0)),b=n.n(v),g=n(207),y=n(208),A=n(7),w=n(33),O=n(157);function j(e){var t=e.children,n=e.className,r=e.content,i=Object(h.a)("header",n),a=Object(g.a)(j,e),o=Object(y.a)(j,e);return b.a.createElement(o,Object(m.a)({},a,{className:i}),A.a.isNil(t)?r:t)}j.handledProps=["as","children","className","content"],j.propTypes={},j.create=Object(O.e)(j,(function(e){return{content:e}}));var x=j;function E(e){var t=e.children,n=e.className,r=e.content,i=Object(h.a)("description",n),a=Object(g.a)(E,e),o=Object(y.a)(E,e);return b.a.createElement(o,Object(m.a)({},a,{className:i}),A.a.isNil(t)?r:t)}E.handledProps=["as","children","className","content"],E.propTypes={},E.create=Object(O.e)(E,(function(e){return{content:e}}));var S=E;function T(e){var t=e.children,n=e.className,r=e.content,i=Object(h.a)("extra",n),a=Object(g.a)(T,e),o=Object(y.a)(T,e);return b.a.createElement(o,Object(m.a)({},a,{className:i}),A.a.isNil(t)?r:t)}T.handledProps=["as","children","className","content"],T.propTypes={},T.create=Object(O.e)(T,(function(e){return{content:e}}));var k=T;function N(e){var t=e.children,n=e.className,r=e.content,i=Object(h.a)("meta",n),a=Object(g.a)(N,e),o=Object(y.a)(N,e);return b.a.createElement(o,Object(m.a)({},a,{className:i}),A.a.isNil(t)?r:t)}N.handledProps=["as","children","className","content"],N.propTypes={},N.create=Object(O.e)(N,(function(e){return{content:e}}));var P=N;function z(e){var t=e.children,n=e.className,r=e.content,i=e.description,a=e.extra,o=e.header,c=e.meta,s=e.verticalAlign,u=Object(h.a)(Object(w.d)(s),"content",n),l=Object(g.a)(z,e),f=Object(y.a)(z,e);return A.a.isNil(t)?b.a.createElement(f,Object(m.a)({},l,{className:u}),x.create(o,{autoGenerateKey:!1}),P.create(c,{autoGenerateKey:!1}),S.create(i,{autoGenerateKey:!1}),k.create(a,{autoGenerateKey:!1}),r):b.a.createElement(f,Object(m.a)({},l,{className:u}),t)}z.handledProps=["as","children","className","content","description","extra","header","meta","verticalAlign"],z.propTypes={};var R=z,C=n(34);function M(e){var t=e.children,n=e.className,r=e.content,a=e.divided,o=e.items,c=e.link,s=e.relaxed,u=e.unstackable,l=Object(h.a)("ui",Object(w.a)(a,"divided"),Object(w.a)(c,"link"),Object(w.a)(u,"unstackable"),Object(w.b)(s,"relaxed"),"items",n),f=Object(g.a)(M,e),p=Object(y.a)(M,e);if(!A.a.isNil(t))return b.a.createElement(p,Object(m.a)({},f,{className:l}),t);if(!A.a.isNil(r))return b.a.createElement(p,Object(m.a)({},f,{className:l}),r);var d=Object(C.a)(o,(function(e){var t=e.childKey,n=Object(i.a)(e,["childKey"]),r=null!=t?t:[n.content,n.description,n.header,n.meta].join("-");return b.a.createElement(_,Object(m.a)({},n,{key:r}))}));return b.a.createElement(p,Object(m.a)({},f,{className:l}),d)}M.handledProps=["as","children","className","content","divided","items","link","relaxed","unstackable"],M.propTypes={};var H=M,I=n(460);function B(e){var t=e.size,n=Object(g.a)(B,e);return b.a.createElement(I.a,Object(m.a)({},n,{size:t,ui:!!t,wrapped:!0}))}B.handledProps=["size"],B.propTypes={},B.create=Object(O.e)(B,(function(e){return{src:e}}));var L=B;function D(e){var t=e.children,n=e.className,r=e.content,i=e.description,a=e.extra,o=e.header,c=e.image,s=e.meta,u=Object(h.a)("item",n),l=Object(g.a)(D,e),f=Object(y.a)(D,e);return A.a.isNil(t)?b.a.createElement(f,Object(m.a)({},l,{className:u}),L.create(c,{autoGenerateKey:!1}),b.a.createElement(R,{content:r,description:i,extra:a,header:o,meta:s})):b.a.createElement(f,Object(m.a)({},l,{className:u}),t)}D.handledProps=["as","children","className","content","description","extra","header","image","meta"],D.Content=R,D.Description=S,D.Extra=k,D.Group=H,D.Header=x,D.Image=L,D.Meta=P,D.propTypes={};var _=D,V=n(52),$=n(17),G=n.n($);n(28);function W(e){return(W="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function U(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null==n)return;var r,i,a=[],o=!0,c=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);o=!0);}catch(e){c=!0,i=e}finally{try{o||null==n.return||n.return()}finally{if(c)throw i}}return a}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return F(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return F(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function F(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n(39),n(57);var Q=Object.create(null);Q.enableHighAccuracy=!1,Q.timeout=4294967295,Q.maximumAge=0;Object.freeze(Q);var K="object"===("undefined"==typeof window?"undefined":W(window)),J=function(e){return"undefined"!=typeof window&&e in window},q=function(e){try{return JSON.parse(e)}catch(e){return null}},X=n(58),Z=function(e){var t="".concat(e,"Storage");return K&&!J(t)&&console.warn("".concat(t," is not supported")),function(e,n){if(!K)return X.a&&console.warn("Please be aware that ".concat(t," could not be available during SSR")),[JSON.stringify(n),function(){}];var r=window[t],i=U(Object(v.useState)(q(r.getItem(e)||JSON.stringify(n))),2),a=i[0],o=i[1];return Object(v.useEffect)((function(){r.setItem(e,JSON.stringify(a))}),[e,a]),[a,o]}},Y=(Z("local"),Z("session"),n(37),n(38),n(45),["className","isPressed"]);function ee(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function te(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ee(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ee(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var ne=function(e,t){return void 0===t&&(t=25),new Promise((function(n){var r={};o()({path:"/wp/v2/"+e+"?per_page="+t}).then((function(t){for(var i=0;i<t.length;i++){var a=t[i].slug.replace(e.toLowerCase()+"_","");r[t[i].id]={id:t[i].id,name:t[i].name,parent:t[i].parent,slug:a}}n(r)}))}))},re=function(e,t,n,r){return void 0===n&&(n="name"),void 0===r&&(r=!0),new Promise((function(i){ne(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(r){var i=e[r],a=i.name;"termid"===n&&(a=i.id);var o=i.name;void 0!==i.parent&&0!==i.parent&&(o=" -- "+o),t.push({value:a,label:o})})),!1!==r&&t.sort((function(e,t){return e.label>t.label?1:-1})),i(t)}))}))},ie=function(e,t,n,r,i){var a;e===t&&i(((a={})[n]=r,a))},ae=function(e){var t=e.label,n=void 0===t?"":t,r=e.blockName,i=e.clientId,a=e.attributes,o=void 0===a?{}:a;return React.createElement(u.Button,{label:Object(c.__)(n),tooltipPosition:"bottom",onClick:function(){var e=Object(s.select)("core/block-editor").getBlock(i);console.log("debug info...",e.innerBlocks.length);var t=e.innerBlocks.length-1,n=Object(l.createBlock)(r,o);Object(s.dispatch)("core/block-editor").insertBlock(n,t,i)},className:"block-editor-button-block-appender"},Object(c.__)(n))},oe=function(e){var t=e.url,n=e.onChange,r=e.query,i=void 0===r?{type:"term",subtype:"topic"}:r,a=Object(f.useState)(!1),o=a[0],s=a[1];return React.createElement(f.Fragment,null,React.createElement(u.ToolbarButton,{"aria-expanded":o,"aria-haspopup":"true",label:Object(c.__)("Set Link"),icon:"admin-links",onClick:function(){return s(!o)},showTooltip:!0}),!0===o&&React.createElement(u.Popover,{position:"bottom center",onClose:function(){return s(!1)}},React.createElement(p.__experimentalLinkControl,{className:"wp-block-navigation-link__inline-link-input",value:{url:t},showInitialSuggestions:!0,suggestionsQuery:i,onChange:function(e){return n(e)},settings:[]})))},ce=function(e){var t=e.url,n=e.heading,r=e.headingSize,i=void 0===r?"h2":r,a=e.disableIcon,o=void 0!==a&&a,c=e.setAttributes;return React.createElement(f.Fragment,null,React.createElement(p.BlockControls,null,React.createElement(u.ToolbarGroup,null,React.createElement(oe,{url:t,onChange:function(e){c({url:e.url})}}))),React.createElement(u.Flex,{style:{paddingBottom:"1em"}},React.createElement(u.FlexItem,null,React.createElement(p.RichText,{tagName:i,value:n,onChange:function(e){return c({heading:e})},placeholder:"Heading...",formattingControls:[],keepPlaceholderOnFocus:!0,className:"sans-serif"})),!0!==o&&React.createElement(u.FlexBlock,null,React.createElement(d.a,{name:"chevron right",size:"small",style:{marginLeft:"0.5em"}}))))},se=function(e){var t=e.level,n=e.isPressed,r=void 0!==n&&n,i={1:"M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z",2:"M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z",3:"M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z",4:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm10-2h-1v2h-2v-2h-5v-2l4-6h3v6h1v2zm-3-2V7l-2.8 4H16z",5:"M12.1 12.2c.4.3.7.5 1.1.7.4.2.9.3 1.3.3.5 0 1-.1 1.4-.4.4-.3.6-.7.6-1.1 0-.4-.2-.9-.6-1.1-.4-.3-.9-.4-1.4-.4H14c-.1 0-.3 0-.4.1l-.4.1-.5.2-1-.6.3-5h6.4v1.9h-4.3L14 8.8c.2-.1.5-.1.7-.2.2 0 .5-.1.7-.1.5 0 .9.1 1.4.2.4.1.8.3 1.1.6.3.2.6.6.8.9.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4-.2.4-.5.8-.9 1.1-.4.3-.8.5-1.3.7-.5.2-1 .3-1.5.3-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1-.1-.1 1-1.5 1-1.5zM9 15H7v-4H3v4H1V5h2v4h4V5h2v10z",6:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm8.6-7.5c-.2-.2-.5-.4-.8-.5-.6-.2-1.3-.2-1.9 0-.3.1-.6.3-.8.5l-.6.9c-.2.5-.2.9-.2 1.4.4-.3.8-.6 1.2-.8.4-.2.8-.3 1.3-.3.4 0 .8 0 1.2.2.4.1.7.3 1 .6.3.3.5.6.7.9.2.4.3.8.3 1.3s-.1.9-.3 1.4c-.2.4-.5.7-.8 1-.4.3-.8.5-1.2.6-1 .3-2 .3-3 0-.5-.2-1-.5-1.4-.9-.4-.4-.8-.9-1-1.5-.2-.6-.3-1.3-.3-2.1s.1-1.6.4-2.3c.2-.6.6-1.2 1-1.6.4-.4.9-.7 1.4-.9.6-.3 1.1-.4 1.7-.4.7 0 1.4.1 2 .3.5.2 1 .5 1.4.8 0 .1-1.3 1.4-1.3 1.4zm-2.4 5.8c.2 0 .4 0 .6-.1.2 0 .4-.1.5-.2.1-.1.3-.3.4-.5.1-.2.1-.5.1-.7 0-.4-.1-.8-.4-1.1-.3-.2-.7-.3-1.1-.3-.3 0-.7.1-1 .2-.4.2-.7.4-1 .7 0 .3.1.7.3 1 .1.2.3.4.4.6.2.1.3.3.5.3.2.1.5.2.7.1z"};return i.hasOwnProperty(t)?React.createElement(u.SVG,{width:"24",height:"24",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",isPressed:r},React.createElement(u.Path,{d:i[t]})):null},ue={className:"block-library-heading-level-dropdown",isAlternate:!0},le=function(e){var t=e.selectedLevel,n=e.levels,r=void 0===n?[2,3]:n,i=e.onChange;return console.log("HeadingLevelToolbar",t),React.createElement(u.ToolbarGroup,null,React.createElement(u.Dropdown,{popoverProps:ue,renderToggle:function(e){var n=e.onToggle,r=e.isOpen;return React.createElement(u.ToolbarButton,{"aria-expanded":r,"aria-haspopup":"true",icon:React.createElement(se,{level:t}),label:Object(c.__)("Change heading level"),onClick:n,onKeyDown:function(e){r||e.keyCode!==V.DOWN||(e.preventDefault(),e.stopPropagation(),n())},showTooltip:!0})},renderContent:function(){return React.createElement(u.Toolbar,{className:"block-library-heading-level-toolbar",label:Object(c.__)("Change heading level")},React.createElement(u.ToolbarGroup,{isCollapsed:!1,controls:r.map((function(e){var n=e===t;return{icon:React.createElement(se,{level:e,isPressed:n}),title:Object(c.sprintf)(Object(c.__)("Heading %d"),e),isActive:n,onClick:function(){i(e)}}}))}))}}))};Object(f.createElement)((function(e){var t=e.className,n=e.isPressed,r=te(te({},function(e,t){if(null==e)return{};var n,r,a=Object(i.a)(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}(e,Y)),{},{className:G()(t,{"is-pressed":n})||void 0,role:"img","aria-hidden":!0,focusable:!1});return Object(f.createElement)("svg",r)}),{width:"18",height:"18",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},Object(f.createElement)((function(e){return Object(f.createElement)("path",e)}),{d:"M5 4h2V2H5v2zm6-2v2h2V2h-2zm-6 8h2V8H5v2zm6 0h2V8h-2v2zm-6 6h2v-2H5v2zm6 0h2v-2h-2v2z"}));var fe=[{label:"Weekly roundup of all new publications",value:"7c1390ba46"},{label:"Quarterly update from the President",value:"a33430a835"},{label:"--",value:!1},{label:"Global Attitudes & Trends",value:"9203343b04"},{label:"Internet, Science & Tech",value:"ea87b26abe"},{label:"Media & News Daily Briefing",value:"1d2638430b"},{label:"Hispanic Trends",value:"0e7495c7b2"},{label:"Religion - Weekly newsletter",value:"a7d4f3268f"},{label:"Religion - Daily religion headlines",value:"1a647764b2"},{label:"Social & Demographic Trends",value:"3836f62305"},{label:"Methods",value:"6d1e80bbaf"},{label:"Politics",value:"fa5fdbc701"},{label:"--",value:!1},{label:"Mini-course - U.S. Immigration",value:"xxx"},{label:"Mini-course - U.S. Census",value:"xxxx"},{label:"Mini-course - Muslims and Islam",value:"xxxxx"}]},52:function(e,t){e.exports=window.wp.keycodes},57:function(e,t,n){(function(t){var r=n(15),i=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,o=/^0b[01]+$/i,c=/^0o[0-7]+$/i,s=parseInt,u="object"==(void 0===t?"undefined":r(t))&&t&&t.Object===Object&&t,l="object"==("undefined"==typeof self?"undefined":r(self))&&self&&self.Object===Object&&self,f=u||l||Function("return this")(),p=Object.prototype.toString,d=Math.max,m=Math.min,h=function(){return f.Date.now()};function v(e,t,n){var r,i,a,o,c,s,u=0,l=!1,f=!1,p=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function v(t){var n=r,a=i;return r=i=void 0,u=t,o=e.apply(a,n)}function g(e){return u=e,c=setTimeout(w,t),l?v(e):o}function A(e){var n=e-s;return void 0===s||n>=t||n<0||f&&e-u>=a}function w(){var e=h();if(A(e))return O(e);c=setTimeout(w,function(e){var n=t-(e-s);return f?m(n,a-(e-u)):n}(e))}function O(e){return c=void 0,p&&r?v(e):(r=i=void 0,o)}function j(){var e=h(),n=A(e);if(r=arguments,i=this,s=e,n){if(void 0===c)return g(s);if(f)return c=setTimeout(w,t),v(s)}return void 0===c&&(c=setTimeout(w,t)),o}return t=y(t)||0,b(n)&&(l=!!n.leading,a=(f="maxWait"in n)?d(y(n.maxWait)||0,t):a,p="trailing"in n?!!n.trailing:p),j.cancel=function(){void 0!==c&&clearTimeout(c),u=0,r=s=i=c=void 0},j.flush=function(){return void 0===c?o:O(h())},j}function b(e){var t=r(e);return!!e&&("object"==t||"function"==t)}function g(e){return"symbol"==r(e)||function(e){return!!e&&"object"==r(e)}(e)&&"[object Symbol]"==p.call(e)}function y(e){if("number"==typeof e)return e;if(g(e))return NaN;if(b(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=b(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(i,"");var n=o.test(e);return n||c.test(e)?s(e.slice(2),n?2:8):a.test(e)?NaN:+e}e.exports=function(e,t,n){var r=!0,i=!0;if("function"!=typeof e)throw new TypeError("Expected a function");return b(n)&&(r="leading"in n?!!n.leading:r,i="trailing"in n?!!n.trailing:i),v(e,t,{leading:r,maxWait:t,trailing:i})}}).call(this,n(56))},58:function(e,t,n){"use strict";(function(e){var n=void 0!==e&&e.env&&!1;t.a=n}).call(this,n(63))},59:function(e,t){var n=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=n},6:function(e,t){e.exports=window.wp.blockEditor},63:function(e,t){var n,r,i=e.exports={};function a(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function c(e){if(n===setTimeout)return setTimeout(e,0);if((n===a||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:a}catch(e){n=a}try{r="function"==typeof clearTimeout?clearTimeout:o}catch(e){r=o}}();var s,u=[],l=!1,f=-1;function p(){l&&s&&(l=!1,s.length?u=s.concat(u):f=-1,u.length&&d())}function d(){if(!l){var e=c(p);l=!0;for(var t=u.length;t;){for(s=u,u=[];++f<t;)s&&s[f].run();f=-1,t=u.length}s=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===o||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function h(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new m(e,t)),1!==u.length||l||c(d)},m.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=h,i.addListener=h,i.once=h,i.off=h,i.removeListener=h,i.removeAllListeners=h,i.emit=h,i.prependListener=h,i.prependOnceListener=h,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},66:function(e,t){e.exports=window.ReactDOM},70:function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},74:function(e,t,n){(function(e){var r,i=n(15);
/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
/*! Gecko-Picture - v1.0
 * https://github.com/scottjehl/picturefill/tree/3.0/src/plugins/gecko-picture
 * Firefox's early picture implementation (prior to FF41) is static and does
 * not react to viewport changes. This tiny module fixes this.
 */
!function(e){var t,n,r,i,a,o,c,s=navigator.userAgent;e.HTMLPictureElement&&/ecko/.test(s)&&s.match(/rv\:(\d+)/)&&RegExp.$1<45&&addEventListener("resize",(n=document.createElement("source"),r=function(e){var t,r,i=e.parentNode;"PICTURE"===i.nodeName.toUpperCase()?(t=n.cloneNode(),i.insertBefore(t,i.firstElementChild),setTimeout((function(){i.removeChild(t)}))):(!e._pfLastSize||e.offsetWidth>e._pfLastSize)&&(e._pfLastSize=e.offsetWidth,r=e.sizes,e.sizes+=",100vw",setTimeout((function(){e.sizes=r})))},i=function(){var e,t=document.querySelectorAll("picture > img, img[srcset][sizes]");for(e=0;e<t.length;e++)r(t[e])},a=function(){clearTimeout(t),t=setTimeout(i,99)},o=e.matchMedia&&matchMedia("(orientation: landscape)"),c=function(){a(),o&&o.addListener&&o.addListener(a)},n.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?c():document.addEventListener("DOMContentLoaded",c),a))}(window),
/*! Picturefill - v3.0.2
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt;
 *  License: MIT
 */
function(a,o,c){"use strict";var s,u,l;o.createElement("picture");var f={},p=!1,d=function(){},m=o.createElement("img"),h=m.getAttribute,v=m.setAttribute,b=m.removeAttribute,g=o.documentElement,y={},A={algorithm:""},w=navigator.userAgent,O=/rident/.test(w)||/ecko/.test(w)&&w.match(/rv\:(\d+)/)&&RegExp.$1>35,j="currentSrc",x=/\s+\+?\d+(e\d+)?w/,E=/(\([^)]+\))?\s*(.+)/,S=a.picturefillCFG,T="font-size:100%!important;",k=!0,N={},P={},z=a.devicePixelRatio,R={px:1,in:96},C=o.createElement("a"),M=!1,H=/^[ \t\n\r\u000c]+/,I=/^[, \t\n\r\u000c]+/,B=/^[^ \t\n\r\u000c]+/,L=/[,]+$/,D=/^\d+$/,_=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,V=function(e,t,n,r){e.addEventListener?e.addEventListener(t,n,r||!1):e.attachEvent&&e.attachEvent("on"+t,n)},$=function(e){var t={};return function(n){return n in t||(t[n]=e(n)),t[n]}};function G(e){return" "===e||"\t"===e||"\n"===e||"\f"===e||"\r"===e}var W,U,F,Q,K,J,q,X,Z,Y,ee,te,ne,re,ie,ae,oe=(W=/^([\d\.]+)(em|vw|px)$/,U=$((function(e){return"return "+function(){for(var e=arguments,t=0,n=e[0];++t in e;)n=n.replace(e[t],e[++t]);return n}((e||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"})),function(e,t){var n;if(!(e in N))if(N[e]=!1,t&&(n=e.match(W)))N[e]=n[1]*R[n[2]];else try{N[e]=new Function("e",U(e))(R)}catch(e){}return N[e]}),ce=function(e,t){return e.w?(e.cWidth=f.calcListLength(t||"100vw"),e.res=e.w/e.cWidth):e.res=e.d,e},se=function(e){if(p){var t,n,r,i=e||{};if(i.elements&&1===i.elements.nodeType&&("IMG"===i.elements.nodeName.toUpperCase()?i.elements=[i.elements]:(i.context=i.elements,i.elements=null)),r=(t=i.elements||f.qsa(i.context||o,i.reevaluate||i.reselect?f.sel:f.selShort)).length){for(f.setupRun(i),M=!0,n=0;n<r;n++)f.fillImg(t[n],i);f.teardownRun(i)}}};function ue(e,t){return e.res-t.res}function le(e,t){var n,r,i;if(e&&t)for(i=f.parseSet(t),e=f.makeUrl(e),n=0;n<i.length;n++)if(e===f.makeUrl(i[n].url)){r=i[n];break}return r}a.console&&console.warn,j in m||(j="src"),y["image/jpeg"]=!0,y["image/gif"]=!0,y["image/png"]=!0,y["image/svg+xml"]=o.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),f.ns=("pf"+(new Date).getTime()).substr(0,9),f.supSrcset="srcset"in m,f.supSizes="sizes"in m,f.supPicture=!!a.HTMLPictureElement,f.supSrcset&&f.supPicture&&!f.supSizes&&(F=o.createElement("img"),m.srcset="data:,a",F.src="data:,a",f.supSrcset=m.complete===F.complete,f.supPicture=f.supSrcset&&f.supPicture),f.supSrcset&&!f.supSizes?(Q="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",K=o.createElement("img"),J=function(){2===K.width&&(f.supSizes=!0),u=f.supSrcset&&!f.supSizes,p=!0,setTimeout(se)},K.onload=J,K.onerror=J,K.setAttribute("sizes","9px"),K.srcset=Q+" 1w,data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw== 9w",K.src=Q):p=!0,f.selShort="picture>img,img[srcset]",f.sel=f.selShort,f.cfg=A,f.DPR=z||1,f.u=R,f.types=y,f.setSize=d,f.makeUrl=$((function(e){return C.href=e,C.href})),f.qsa=function(e,t){return"querySelector"in e?e.querySelectorAll(t):[]},f.matchesMedia=function(){return a.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?f.matchesMedia=function(e){return!e||matchMedia(e).matches}:f.matchesMedia=f.mMQ,f.matchesMedia.apply(this,arguments)},f.mMQ=function(e){return!e||oe(e)},f.calcLength=function(e){var t=oe(e,!0)||!1;return t<0&&(t=!1),t},f.supportsType=function(e){return!e||y[e]},f.parseSize=$((function(e){var t=(e||"").match(E);return{media:t&&t[1],length:t&&t[2]}})),f.parseSet=function(e){return e.cands||(e.cands=function(e,t){function n(t){var n,r=t.exec(e.substring(u));if(r)return n=r[0],u+=n.length,n}var r,i,a,o,c,s=e.length,u=0,l=[];function f(){var e,n,a,o,c,s,u,f,p,d=!1,m={};for(o=0;o<i.length;o++)s=(c=i[o])[c.length-1],u=c.substring(0,c.length-1),f=parseInt(u,10),p=parseFloat(u),D.test(u)&&"w"===s?((e||n)&&(d=!0),0===f?d=!0:e=f):_.test(u)&&"x"===s?((e||n||a)&&(d=!0),p<0?d=!0:n=p):D.test(u)&&"h"===s?((a||n)&&(d=!0),0===f?d=!0:a=f):d=!0;d||(m.url=r,e&&(m.w=e),n&&(m.d=n),a&&(m.h=a),a||n||e||(m.d=1),1===m.d&&(t.has1x=!0),m.set=t,l.push(m))}function p(){for(n(H),a="",o="in descriptor";;){if(c=e.charAt(u),"in descriptor"===o)if(G(c))a&&(i.push(a),a="",o="after descriptor");else{if(","===c)return u+=1,a&&i.push(a),void f();if("("===c)a+=c,o="in parens";else{if(""===c)return a&&i.push(a),void f();a+=c}}else if("in parens"===o)if(")"===c)a+=c,o="in descriptor";else{if(""===c)return i.push(a),void f();a+=c}else if("after descriptor"===o)if(G(c));else{if(""===c)return void f();o="in descriptor",u-=1}u+=1}}for(;;){if(n(I),u>=s)return l;r=n(B),i=[],","===r.slice(-1)?(r=r.replace(L,""),f()):p()}}(e.srcset,e)),e.cands},f.getEmValue=function(){var e;if(!s&&(e=o.body)){var t=o.createElement("div"),n=g.style.cssText,r=e.style.cssText;t.style.cssText="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",g.style.cssText=T,e.style.cssText=T,e.appendChild(t),s=t.offsetWidth,e.removeChild(t),s=parseFloat(s,10),g.style.cssText=n,e.style.cssText=r}return s||16},f.calcListLength=function(e){if(!(e in P)||A.uT){var t=f.calcLength(function(e){var t,n,r,i,a,o,c,s=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,u=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(r=(n=function(e){var t,n="",r=[],i=[],a=0,o=0,c=!1;function s(){n&&(r.push(n),n="")}function u(){r[0]&&(i.push(r),r=[])}for(;;){if(""===(t=e.charAt(o)))return s(),u(),i;if(c){if("*"===t&&"/"===e[o+1]){c=!1,o+=2,s();continue}o+=1}else{if(G(t)){if(e.charAt(o-1)&&G(e.charAt(o-1))||!n){o+=1;continue}if(0===a){s(),o+=1;continue}t=" "}else if("("===t)a+=1;else if(")"===t)a-=1;else{if(","===t){s(),u(),o+=1;continue}if("/"===t&&"*"===e.charAt(o+1)){c=!0,o+=2;continue}}n+=t,o+=1}}}(e)).length,t=0;t<r;t++)if(a=(i=n[t])[i.length-1],c=a,s.test(c)&&parseFloat(c)>=0||u.test(c)||"0"===c||"-0"===c||"+0"===c){if(o=a,i.pop(),0===i.length)return o;if(i=i.join(" "),f.matchesMedia(i))return o}return"100vw"}(e));P[e]=t||R.width}return P[e]},f.setRes=function(e){var t;if(e)for(var n=0,r=(t=f.parseSet(e)).length;n<r;n++)ce(t[n],e.sizes);return t},f.setRes.res=ce,f.applySetCandidate=function(e,t){if(e.length){var n,r,i,a,o,c,s,u,l,p,d,m,h,v,b,g,y=t[f.ns],w=f.DPR;if(c=y.curSrc||t[j],(s=y.curCan||function(e,t,n){var r;return!n&&t&&(n=(n=e[f.ns].sets)&&n[n.length-1]),(r=le(t,n))&&(t=f.makeUrl(t),e[f.ns].curSrc=t,e[f.ns].curCan=r,r.res||ce(r,r.set.sizes)),r}(t,c,e[0].set))&&s.set===e[0].set&&((l=O&&!t.complete&&s.res-.1>w)||(s.cached=!0,s.res>=w&&(o=s))),!o)for(e.sort(ue),o=e[(a=e.length)-1],r=0;r<a;r++)if((n=e[r]).res>=w){o=e[i=r-1]&&(l||c!==f.makeUrl(n.url))&&(p=e[i].res,d=n.res,m=w,h=e[i].cached,v=void 0,b=void 0,g=void 0,"saveData"===A.algorithm?p>2.7?g=m+1:(b=(d-m)*(v=Math.pow(p-.6,1.5)),h&&(b+=.1*v),g=p+b):g=m>1?Math.sqrt(p*d):p,g>m)?e[i]:n;break}o&&(u=f.makeUrl(o.url),y.curSrc=u,y.curCan=o,u!==c&&f.setSrc(t,o),f.setSize(t))}},f.setSrc=function(e,t){var n;e.src=t.url,"image/svg+xml"===t.set.type&&(n=e.style.width,e.style.width=e.offsetWidth+1+"px",e.offsetWidth+1&&(e.style.width=n))},f.getSet=function(e){var t,n,r,i=!1,a=e[f.ns].sets;for(t=0;t<a.length&&!i;t++)if((n=a[t]).srcset&&f.matchesMedia(n.media)&&(r=f.supportsType(n.type))){"pending"===r&&(n=r),i=n;break}return i},f.parseSets=function(e,t,n){var r,i,a,o,c=t&&"PICTURE"===t.nodeName.toUpperCase(),s=e[f.ns];(void 0===s.src||n.src)&&(s.src=h.call(e,"src"),s.src?v.call(e,"data-pfsrc",s.src):b.call(e,"data-pfsrc")),(void 0===s.srcset||n.srcset||!f.supSrcset||e.srcset)&&(r=h.call(e,"srcset"),s.srcset=r,o=!0),s.sets=[],c&&(s.pic=!0,function(e,t){var n,r,i,a,o=e.getElementsByTagName("source");for(n=0,r=o.length;n<r;n++)(i=o[n])[f.ns]=!0,(a=i.getAttribute("srcset"))&&t.push({srcset:a,media:i.getAttribute("media"),type:i.getAttribute("type"),sizes:i.getAttribute("sizes")})}(t,s.sets)),s.srcset?(i={srcset:s.srcset,sizes:h.call(e,"sizes")},s.sets.push(i),(a=(u||s.src)&&x.test(s.srcset||""))||!s.src||le(s.src,i)||i.has1x||(i.srcset+=", "+s.src,i.cands.push({url:s.src,d:1,set:i}))):s.src&&s.sets.push({srcset:s.src,sizes:null}),s.curCan=null,s.curSrc=void 0,s.supported=!(c||i&&!f.supSrcset||a&&!f.supSizes),o&&f.supSrcset&&!s.supported&&(r?(v.call(e,"data-pfsrcset",r),e.srcset=""):b.call(e,"data-pfsrcset")),s.supported&&!s.srcset&&(!s.src&&e.src||e.src!==f.makeUrl(s.src))&&(null===s.src?e.removeAttribute("src"):e.src=s.src),s.parsed=!0},f.fillImg=function(e,t){var n,r=t.reselect||t.reevaluate;e[f.ns]||(e[f.ns]={}),n=e[f.ns],(r||n.evaled!==l)&&(n.parsed&&!t.reevaluate||f.parseSets(e,e.parentNode,t),n.supported?n.evaled=l:function(e){var t,n=f.getSet(e),r=!1;"pending"!==n&&(r=l,n&&(t=f.setRes(n),f.applySetCandidate(t,e))),e[f.ns].evaled=r}(e))},f.setupRun=function(){M&&!k&&z===a.devicePixelRatio||(k=!1,z=a.devicePixelRatio,N={},P={},f.DPR=z||1,R.width=Math.max(a.innerWidth||0,g.clientWidth),R.height=Math.max(a.innerHeight||0,g.clientHeight),R.vw=R.width/100,R.vh=R.height/100,l=[R.height,R.width,z].join("-"),R.em=f.getEmValue(),R.rem=R.em)},f.supPicture?(se=d,f.fillImg=d):(ne=a.attachEvent?/d$|^c/:/d$|^c|^i/,re=function e(){var t=o.readyState||"";ie=setTimeout(e,"loading"===t?200:999),o.body&&(f.fillImgs(),(q=q||ne.test(t))&&clearTimeout(ie))},ie=setTimeout(re,o.body?9:99),ae=g.clientHeight,V(a,"resize",(X=function(){k=Math.max(a.innerWidth||0,g.clientWidth)!==R.width||g.clientHeight!==ae,ae=g.clientHeight,k&&f.fillImgs()},Z=99,te=function e(){var t=new Date-ee;t<Z?Y=setTimeout(e,Z-t):(Y=null,X())},function(){ee=new Date,Y||(Y=setTimeout(te,Z))})),V(o,"readystatechange",re)),f.picturefill=se,f.fillImgs=se,f.teardownRun=d,se._=f,a.picturefillCFG={pf:f,push:function(e){var t=e.shift();"function"==typeof f[t]?f[t].apply(f,e):(A[t]=e[0],M&&f.fillImgs({reselect:!0}))}};for(;S&&S.length;)a.picturefillCFG.push(S.shift());a.picturefill=se,"object"===i(e)&&"object"===i(e.exports)?e.exports=se:void 0===(r=function(){return se}.call(t,n,t,e))||(e.exports=r),f.supPicture||(y["image/webp"]=function(e,t){var n=new a.Image;return n.onerror=function(){y[e]=!1,se()},n.onload=function(){y[e]=1===n.width,se()},n.src=t,"pending"}("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document)}).call(this,n(70)(e))},75:function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var i=n(0).createElement,a=n(1),o=n(76);e.exports=function(e){return function(){for(var t=arguments.length,n=Array(t),c=0;c<t;c++)n[c]=arguments[c];var s=function t(a){var c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=[].concat(r(Object.keys(t.propTypes||{})),["css"]),u=Object.assign({theme:c.theme||{}},a),l={};for(var f in a)s.includes(f)||(l[f]=a[f]);return l.className=[l.className].concat(r(n.map((function(e){return"function"==typeof e?e(u):e})).filter((function(e){return!!e})).map((function(e){return o(e)}))),[o(a.css||{})]).join(" ").trim(),i(e,l)};return s.contextTypes={theme:a.oneOfType([a.object,a.func])},s}},e.exports.css=o.css,e.exports.reset=o.reset},76:function(e,t,n){"use strict";var r=n(15),i={},a="x",o=[],c=function(e){return o.push(e)},s=function(e,t){return t?t+"{"+e+"}":e},u=function(e,t,n){return"."+e+"{"+(t.replace(/[A-Z]|^ms/g,"-$&").toLowerCase()+":")+n+"}"},l=function(e){return e.replace(/&/g,"")},f=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",f=arguments[2];return Object.keys(t).map((function(p){var d=t[p];if(null===d)return"";if("object"===r(d)){var m=/^@/.test(p)?p:null;return e(d,m?n:n+p,m||f)}var h=p+d+n+f;if(i[h])return i[h];var v=a+o.length.toString(36);return c(s(u(v+l(n),p,d),f)),i[h]=v,v})).join(" ")};if(e.exports=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.map((function(e){return f(e)})).join(" ").trim()},e.exports.css=function(){return o.sort().join("")},e.exports.reset=function(){for(i={};o.length;)o.pop()},e.exports.prefix=function(e){return a=e},"undefined"!=typeof document){var p=document.head.appendChild(document.createElement("style")).sheet;c=function(e){o.push(e),p.insertRule(e,p.cssRules.length)}}},911:function(e,t,n){n(24),e.exports=n(959)},959:function(e,t,n){"use strict";n.r(t);var r=n(14),i=n(3),a=n(10),o=n(342),c=n(17),s=n.n(c),u=n(46),l=n(6),f=["prc-block/taxonomy-tree"],p=function(e){var t=e.attributes,n=e.className,r=e.setAttributes,a=e.clientId,o=t.heading,c=t.url,p=Object(l.useBlockProps)({className:s()(n)}),d=Object(l.useInnerBlocksProps)({},{allowedBlocks:f,orientation:"vertical",templateLock:!1,renderAppender:function(){return React.createElement(u.a,{label:Object(i.__)("Add New Tree List"),blockName:"prc-block/taxonomy-tree",clientId:a})}});return React.createElement("div",p,React.createElement(u.b,{url:c,heading:o,setAttributes:r}),React.createElement("div",d))},d=function(){return React.createElement(l.InnerBlocks.Content,null)};function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var v=o.name,b={title:Object(i.__)("Topic Index Categorized"),description:"A collapsible list that allows taxonomy trees to be inserted.",category:"layout",keywords:[Object(i.__)("Topic Index"),Object(i.__)("Categorized"),Object(i.__)("Topic")],edit:p,save:d};Object(a.registerBlockType)(v,h(h({},o),b))}},[[911,0,1,2]]]);
//# sourceMappingURL=topic-index-categorized-20b69792.js.map