(()=>{var e,t={472:(e,t)=>{var r;!function(){"use strict";var n={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=typeof r;if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var i=a.apply(null,r);i&&e.push(i)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var s in r)n.call(r,s)&&r[s]&&e.push(s);else e.push(r.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):void 0===(r=function(){return a}.apply(t,[]))||(e.exports=r)}()},850:(e,t,r)=>{"use strict";const n=window.wp.i18n,a=window.wp.blocks,o=window.wp.element,i=window.React;function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s.apply(this,arguments)}const c=function(e){var t=Object.create(null);return function(r){return void 0===t[r]&&(t[r]=e(r)),t[r]}};var l=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;const u=c((function(e){return l.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)<91}));var d=function(){function e(e){var t=this;this._insertTag=function(e){var r;r=0===t.tags.length?t.insertionPoint?t.insertionPoint.nextSibling:t.prepend?t.container.firstChild:t.before:t.tags[t.tags.length-1].nextSibling,t.container.insertBefore(e,r),t.tags.push(e)},this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.insertionPoint=e.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(e){e.forEach(this._insertTag)},t.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)==0&&this._insertTag(function(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}(this));var t=this.tags[this.tags.length-1];if(this.isSpeedy){var r=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}(t);try{r.insertRule(e,r.cssRules.length)}catch(e){}}else t.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach((function(e){return e.parentNode&&e.parentNode.removeChild(e)})),this.tags=[],this.ctr=0},e}(),p=Math.abs,f=String.fromCharCode,h=Object.assign;function m(e){return e.trim()}function g(e,t,r){return e.replace(t,r)}function v(e,t){return e.indexOf(t)}function y(e,t){return 0|e.charCodeAt(t)}function b(e,t,r){return e.slice(t,r)}function k(e){return e.length}function w(e){return e.length}function x(e,t){return t.push(e),e}var C=1,S=1,A=0,_=0,O=0,E="";function P(e,t,r,n,a,o,i){return{value:e,root:t,parent:r,type:n,props:a,children:o,line:C,column:S,length:i,return:""}}function $(e,t){return h(P("",null,null,"",null,null,0),e,{length:-e.length},t)}function T(){return O=_>0?y(E,--_):0,S--,10===O&&(S=1,C--),O}function M(){return O=_<A?y(E,_++):0,S++,10===O&&(S=1,C++),O}function R(){return y(E,_)}function I(){return _}function j(e,t){return b(E,e,t)}function z(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function N(e){return C=S=1,A=k(E=e),_=0,[]}function B(e){return E="",e}function H(e){return m(j(_-1,F(91===e?e+2:40===e?e+1:e)))}function L(e){for(;(O=R())&&O<33;)M();return z(e)>2||z(O)>3?"":" "}function V(e,t){for(;--t&&M()&&!(O<48||O>102||O>57&&O<65||O>70&&O<97););return j(e,I()+(t<6&&32==R()&&32==M()))}function F(e){for(;M();)switch(O){case e:return _;case 34:case 39:34!==e&&39!==e&&F(O);break;case 40:41===e&&F(e);break;case 92:M()}return _}function D(e,t){for(;M()&&e+O!==57&&(e+O!==84||47!==R()););return"/*"+j(t,_-1)+"*"+f(47===e?e:M())}function G(e){for(;!z(R());)M();return j(e,_)}var q="-ms-",U="-moz-",W="-webkit-",X="comm",Y="rule",K="decl",Z="@keyframes";function J(e,t){for(var r="",n=w(e),a=0;a<n;a++)r+=t(e[a],a,e,t)||"";return r}function Q(e,t,r,n){switch(e.type){case"@import":case K:return e.return=e.return||e.value;case X:return"";case Z:return e.return=e.value+"{"+J(e.children,n)+"}";case Y:e.value=e.props.join(",")}return k(r=J(e.children,n))?e.return=e.value+"{"+r+"}":""}function ee(e,t){switch(function(e,t){return(((t<<2^y(e,0))<<2^y(e,1))<<2^y(e,2))<<2^y(e,3)}(e,t)){case 5103:return W+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return W+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return W+e+U+e+q+e+e;case 6828:case 4268:return W+e+q+e+e;case 6165:return W+e+q+"flex-"+e+e;case 5187:return W+e+g(e,/(\w+).+(:[^]+)/,W+"box-$1$2"+q+"flex-$1$2")+e;case 5443:return W+e+q+"flex-item-"+g(e,/flex-|-self/,"")+e;case 4675:return W+e+q+"flex-line-pack"+g(e,/align-content|flex-|-self/,"")+e;case 5548:return W+e+q+g(e,"shrink","negative")+e;case 5292:return W+e+q+g(e,"basis","preferred-size")+e;case 6060:return W+"box-"+g(e,"-grow","")+W+e+q+g(e,"grow","positive")+e;case 4554:return W+g(e,/([^-])(transform)/g,"$1"+W+"$2")+e;case 6187:return g(g(g(e,/(zoom-|grab)/,W+"$1"),/(image-set)/,W+"$1"),e,"")+e;case 5495:case 3959:return g(e,/(image-set\([^]*)/,W+"$1$`$1");case 4968:return g(g(e,/(.+:)(flex-)?(.*)/,W+"box-pack:$3"+q+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+W+e+e;case 4095:case 3583:case 4068:case 2532:return g(e,/(.+)-inline(.+)/,W+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(k(e)-1-t>6)switch(y(e,t+1)){case 109:if(45!==y(e,t+4))break;case 102:return g(e,/(.+:)(.+)-([^]+)/,"$1"+W+"$2-$3$1"+U+(108==y(e,t+3)?"$3":"$2-$3"))+e;case 115:return~v(e,"stretch")?ee(g(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(115!==y(e,t+1))break;case 6444:switch(y(e,k(e)-3-(~v(e,"!important")&&10))){case 107:return g(e,":",":"+W)+e;case 101:return g(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+W+(45===y(e,14)?"inline-":"")+"box$3$1"+W+"$2$3$1"+q+"$2box$3")+e}break;case 5936:switch(y(e,t+11)){case 114:return W+e+q+g(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return W+e+q+g(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return W+e+q+g(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return W+e+q+e+e}return e}function te(e){return B(re("",null,null,null,[""],e=N(e),0,[0],e))}function re(e,t,r,n,a,o,i,s,c){for(var l=0,u=0,d=i,p=0,h=0,m=0,y=1,b=1,w=1,C=0,S="",A=a,_=o,O=n,E=S;b;)switch(m=C,C=M()){case 40:if(108!=m&&58==E.charCodeAt(d-1)){-1!=v(E+=g(H(C),"&","&\f"),"&\f")&&(w=-1);break}case 34:case 39:case 91:E+=H(C);break;case 9:case 10:case 13:case 32:E+=L(m);break;case 92:E+=V(I()-1,7);continue;case 47:switch(R()){case 42:case 47:x(ae(D(M(),I()),t,r),c);break;default:E+="/"}break;case 123*y:s[l++]=k(E)*w;case 125*y:case 59:case 0:switch(C){case 0:case 125:b=0;case 59+u:h>0&&k(E)-d&&x(h>32?oe(E+";",n,r,d-1):oe(g(E," ","")+";",n,r,d-2),c);break;case 59:E+=";";default:if(x(O=ne(E,t,r,l,u,a,s,S,A=[],_=[],d),o),123===C)if(0===u)re(E,t,O,O,A,o,d,s,_);else switch(p){case 100:case 109:case 115:re(e,O,O,n&&x(ne(e,O,O,0,0,a,s,S,a,A=[],d),_),a,_,d,s,n?A:_);break;default:re(E,O,O,O,[""],_,0,s,_)}}l=u=h=0,y=w=1,S=E="",d=i;break;case 58:d=1+k(E),h=m;default:if(y<1)if(123==C)--y;else if(125==C&&0==y++&&125==T())continue;switch(E+=f(C),C*y){case 38:w=u>0?1:(E+="\f",-1);break;case 44:s[l++]=(k(E)-1)*w,w=1;break;case 64:45===R()&&(E+=H(M())),p=R(),u=d=k(S=E+=G(I())),C++;break;case 45:45===m&&2==k(E)&&(y=0)}}return o}function ne(e,t,r,n,a,o,i,s,c,l,u){for(var d=a-1,f=0===a?o:[""],h=w(f),v=0,y=0,k=0;v<n;++v)for(var x=0,C=b(e,d+1,d=p(y=i[v])),S=e;x<h;++x)(S=m(y>0?f[x]+" "+C:g(C,/&\f/g,f[x])))&&(c[k++]=S);return P(e,t,r,0===a?Y:s,c,l,u)}function ae(e,t,r){return P(e,t,r,X,f(O),b(e,2,-2),0)}function oe(e,t,r,n){return P(e,t,r,K,b(e,0,n),b(e,n+1,-1),n)}var ie=function(e,t,r){for(var n=0,a=0;n=a,a=R(),38===n&&12===a&&(t[r]=1),!z(a);)M();return j(e,_)},se=new WeakMap,ce=function(e){if("rule"===e.type&&e.parent&&!(e.length<1)){for(var t=e.value,r=e.parent,n=e.column===r.column&&e.line===r.line;"rule"!==r.type;)if(!(r=r.parent))return;if((1!==e.props.length||58===t.charCodeAt(0)||se.get(r))&&!n){se.set(e,!0);for(var a=[],o=function(e,t){return B(function(e,t){var r=-1,n=44;do{switch(z(n)){case 0:38===n&&12===R()&&(t[r]=1),e[r]+=ie(_-1,t,r);break;case 2:e[r]+=H(n);break;case 4:if(44===n){e[++r]=58===R()?"&\f":"",t[r]=e[r].length;break}default:e[r]+=f(n)}}while(n=M());return e}(N(e),t))}(t,a),i=r.props,s=0,c=0;s<o.length;s++)for(var l=0;l<i.length;l++,c++)e.props[c]=a[s]?o[s].replace(/&\f/g,i[l]):i[l]+" "+o[s]}}},le=function(e){if("decl"===e.type){var t=e.value;108===t.charCodeAt(0)&&98===t.charCodeAt(2)&&(e.return="",e.value="")}},ue=[function(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case K:e.return=ee(e.value,e.length);break;case Z:return J([$(e,{value:g(e.value,"@","@"+W)})],n);case Y:if(e.length)return function(e,t){return e.map(t).join("")}(e.props,(function(t){switch(function(e,t){return(e=/(::plac\w+|:read-\w+)/.exec(e))?e[0]:e}(t)){case":read-only":case":read-write":return J([$(e,{props:[g(t,/:(read-\w+)/,":-moz-$1")]})],n);case"::placeholder":return J([$(e,{props:[g(t,/:(plac\w+)/,":"+W+"input-$1")]}),$(e,{props:[g(t,/:(plac\w+)/,":-moz-$1")]}),$(e,{props:[g(t,/:(plac\w+)/,q+"input-$1")]})],n)}return""}))}}];const de=function(e){var t=e.key;if("css"===t){var r=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(r,(function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))}))}var n,a,o=e.stylisPlugins||ue,i={},s=[];n=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),(function(e){for(var t=e.getAttribute("data-emotion").split(" "),r=1;r<t.length;r++)i[t[r]]=!0;s.push(e)}));var c,l,u,p,f=[Q,(p=function(e){c.insert(e)},function(e){e.root||(e=e.return)&&p(e)})],h=(l=[ce,le].concat(o,f),u=w(l),function(e,t,r,n){for(var a="",o=0;o<u;o++)a+=l[o](e,t,r,n)||"";return a});a=function(e,t,r,n){c=r,J(te(e?e+"{"+t.styles+"}":t.styles),h),n&&(m.inserted[t.name]=!0)};var m={key:t,sheet:new d({key:t,container:n,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:i,registered:{},insert:a};return m.sheet.hydrate(s),m};var pe=(0,i.createContext)("undefined"!=typeof HTMLElement?de({key:"css"}):null);pe.Provider;var fe=function(e){return(0,i.forwardRef)((function(t,r){var n=(0,i.useContext)(pe);return e(t,n,r)}))},he=(0,i.createContext)({});function me(e,t,r){var n="";return r.split(" ").forEach((function(r){void 0!==e[r]?t.push(e[r]+";"):n+=r+" "})),n}i.useInsertionEffect&&i.useInsertionEffect;var ge=function(e,t,r){var n=e.key+"-"+t.name;!1===r&&void 0===e.registered[n]&&(e.registered[n]=t.styles)};const ve=function(e){for(var t,r=0,n=0,a=e.length;a>=4;++n,a-=4)t=1540483477*(65535&(t=255&e.charCodeAt(n)|(255&e.charCodeAt(++n))<<8|(255&e.charCodeAt(++n))<<16|(255&e.charCodeAt(++n))<<24))+(59797*(t>>>16)<<16),r=1540483477*(65535&(t^=t>>>24))+(59797*(t>>>16)<<16)^1540483477*(65535&r)+(59797*(r>>>16)<<16);switch(a){case 3:r^=(255&e.charCodeAt(n+2))<<16;case 2:r^=(255&e.charCodeAt(n+1))<<8;case 1:r=1540483477*(65535&(r^=255&e.charCodeAt(n)))+(59797*(r>>>16)<<16)}return(((r=1540483477*(65535&(r^=r>>>13))+(59797*(r>>>16)<<16))^r>>>15)>>>0).toString(36)},ye={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};var be=/[A-Z]|^ms/g,ke=/_EMO_([^_]+?)_([^]*?)_EMO_/g,we=function(e){return 45===e.charCodeAt(1)},xe=function(e){return null!=e&&"boolean"!=typeof e},Ce=c((function(e){return we(e)?e:e.replace(be,"-$&").toLowerCase()})),Se=function(e,t){switch(e){case"animation":case"animationName":if("string"==typeof t)return t.replace(ke,(function(e,t,r){return _e={name:t,styles:r,next:_e},t}))}return 1===ye[e]||we(e)||"number"!=typeof t||0===t?t:t+"px"};function Ae(e,t,r){if(null==r)return"";if(void 0!==r.__emotion_styles)return r;switch(typeof r){case"boolean":return"";case"object":if(1===r.anim)return _e={name:r.name,styles:r.styles,next:_e},r.name;if(void 0!==r.styles){var n=r.next;if(void 0!==n)for(;void 0!==n;)_e={name:n.name,styles:n.styles,next:_e},n=n.next;return r.styles+";"}return function(e,t,r){var n="";if(Array.isArray(r))for(var a=0;a<r.length;a++)n+=Ae(e,t,r[a])+";";else for(var o in r){var i=r[o];if("object"!=typeof i)null!=t&&void 0!==t[i]?n+=o+"{"+t[i]+"}":xe(i)&&(n+=Ce(o)+":"+Se(o,i)+";");else if(!Array.isArray(i)||"string"!=typeof i[0]||null!=t&&void 0!==t[i[0]]){var s=Ae(e,t,i);switch(o){case"animation":case"animationName":n+=Ce(o)+":"+s+";";break;default:n+=o+"{"+s+"}"}}else for(var c=0;c<i.length;c++)xe(i[c])&&(n+=Ce(o)+":"+Se(o,i[c])+";")}return n}(e,t,r);case"function":if(void 0!==e){var a=_e,o=r(e);return _e=a,Ae(e,t,o)}}if(null==t)return r;var i=t[r];return void 0!==i?i:r}var _e,Oe=/label:\s*([^\s;\n{]+)\s*(;|$)/g,Ee=function(e,t,r){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var n=!0,a="";_e=void 0;var o=e[0];null==o||void 0===o.raw?(n=!1,a+=Ae(r,t,o)):a+=o[0];for(var i=1;i<e.length;i++)a+=Ae(r,t,e[i]),n&&(a+=o[i]);Oe.lastIndex=0;for(var s,c="";null!==(s=Oe.exec(a));)c+="-"+s[1];return{name:ve(a)+c,styles:a,next:_e}},Pe=!!i.useInsertionEffect&&i.useInsertionEffect,$e=Pe||function(e){return e()},Te=(Pe||i.useLayoutEffect,u),Me=function(e){return"theme"!==e},Re=function(e){return"string"==typeof e&&e.charCodeAt(0)>96?Te:Me},Ie=function(e,t,r){var n;if(t){var a=t.shouldForwardProp;n=e.__emotion_forwardProp&&a?function(t){return e.__emotion_forwardProp(t)&&a(t)}:a}return"function"!=typeof n&&r&&(n=e.__emotion_forwardProp),n},je=function(e){var t=e.cache,r=e.serialized,n=e.isStringTag;return ge(t,r,n),$e((function(){return function(e,t,r){ge(e,t,r);var n=e.key+"-"+t.name;if(void 0===e.inserted[t.name]){var a=t;do{e.insert(t===a?"."+n:"",a,e.sheet,!0),a=a.next}while(void 0!==a)}}(t,r,n)})),null};var ze=function e(t,r){var n,a,o=t.__emotion_real===t,c=o&&t.__emotion_base||t;void 0!==r&&(n=r.label,a=r.target);var l=Ie(t,r,o),u=l||Re(c),d=!u("as");return function(){var p=arguments,f=o&&void 0!==t.__emotion_styles?t.__emotion_styles.slice(0):[];if(void 0!==n&&f.push("label:"+n+";"),null==p[0]||void 0===p[0].raw)f.push.apply(f,p);else{f.push(p[0][0]);for(var h=p.length,m=1;m<h;m++)f.push(p[m],p[0][m])}var g=fe((function(e,t,r){var n=d&&e.as||c,o="",s=[],p=e;if(null==e.theme){for(var h in p={},e)p[h]=e[h];p.theme=(0,i.useContext)(he)}"string"==typeof e.className?o=me(t.registered,s,e.className):null!=e.className&&(o=e.className+" ");var m=Ee(f.concat(s),t.registered,p);o+=t.key+"-"+m.name,void 0!==a&&(o+=" "+a);var g=d&&void 0===l?Re(n):u,v={};for(var y in e)d&&"as"===y||g(y)&&(v[y]=e[y]);return v.className=o,v.ref=r,(0,i.createElement)(i.Fragment,null,(0,i.createElement)(je,{cache:t,serialized:m,isStringTag:"string"==typeof n}),(0,i.createElement)(n,v))}));return g.displayName=void 0!==n?n:"Styled("+("string"==typeof c?c:c.displayName||c.name||"Component")+")",g.defaultProps=t.defaultProps,g.__emotion_real=g,g.__emotion_base=c,g.__emotion_styles=f,g.__emotion_forwardProp=l,Object.defineProperty(g,"toString",{value:function(){return"."+a}}),g.withComponent=function(t,n){return e(t,s({},r,n,{shouldForwardProp:Ie(g,n,!0)})).apply(void 0,f)},g}}.bind();["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach((function(e){ze[e]=ze(e)}));const Ne=ze;var Be=r(472),He=r.n(Be);const Le=window.wp.blockEditor,Ve=window.wp.components,Fe=window.wp.data,De=["core/group","core/paragraph"];function Ge(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=t,n=e.replace("#","");3===n.length&&(n=n[0]+n[0]+n[1]+n[1]+n[2]+n[2]);const a=parseInt(n.substring(0,2),16),o=parseInt(n.substring(2,4),16),i=parseInt(n.substring(4,6),16);return 1<r&&100>=r&&(r/=100),`rgba(${a},${o},${i},${r})`}const qe=Ne("div")`
	&.active {
		background-color: ${e=>e.backgroundColor?e.backgroundColor:"rgba(0, 0, 0, 0.5)"};
	}
`;function Ue(e){let{attributes:t,setAttributes:r}=e;const{title:a}=t;return(0,o.createElement)("div",{className:"wp-block-prc-block-popup-modal--header"},(0,o.createElement)(Le.RichText,{tagName:"h2",placeholder:(0,n.__)("Add a title","prc-block-library"),value:a,onChange:e=>r({title:e})}))}const We=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/popup-modal","version":"0.1.0","title":"Modal","category":"media","attributes":{"allowedBlocks":{"type":"array"},"title":{"type":"string"},"transition":{"type":"string","default":"scale"},"shadeBackgroundEnabled":{"type":"boolean","default":true},"shadeBackgroundLite":{"type":"boolean","default":false}},"supports":{"html":false,"align":false,"inserter":false,"multiple":false,"color":{"background":true,"text":true,"link":true,"enableContrastChecker":true,"gradients":true},"spacing":{"blockGap":true,"padding":true},"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}}},"parent":["prc-block/popup-controller"],"textdomain":"popup-modal","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}'),{name:Xe}=We,Ye={icon:function(){return(0,o.createElement)(Ve.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",preserveAspectRatio:"xMidYMid meet",height:20},(0,o.createElement)(Ve.Path,{d:"M432 48H208C190.3 48 176 62.33 176 80V96H128V80C128 35.82 163.8 0 208 0H432C476.2 0 512 35.82 512 80V304C512 348.2 476.2 384 432 384H416V336H432C449.7 336 464 321.7 464 304V80C464 62.33 449.7 48 432 48zM320 128C355.3 128 384 156.7 384 192V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V192C0 156.7 28.65 128 64 128H320zM64 464H320C328.8 464 336 456.8 336 448V256H48V448C48 456.8 55.16 464 64 464z"}))},edit:function(e){let{attributes:t,setAttributes:r,clientId:a,isSelected:i}=e;const s=(0,Le.useBlockProps)(),{selectBlock:c}=(0,Fe.useDispatch)("core/block-editor"),{allowedBlocks:l}=t,u=(0,Le.useInnerBlocksProps)({className:"wp-block-prc-block-popup-modal--inner"},{allowedBlocks:l||De,templateLock:!1}),{hasChildSelected:d,isVideoModal:p}=(0,Fe.useSelect)((e=>{const{hasSelectedInnerBlock:t,getBlockRootClientId:r,getBlockAttributes:n}=e("core/block-editor"),o=n(r(a)),{className:i=""}=o;return{hasChildSelected:t(a,!0),isVideoModal:i.includes("is-style-video")}}),[]),f=i||d,[h,m]=(0,o.useState)(!1),[g,v]=(0,o.useState)(!1);return(0,o.useEffect)((()=>{!f&&g&&h&&(console.log("Closing modal"),v(!1),m(!1)),g&&!h&&(console.log("Opening modal"),m(!0),c(a))}),[f,g]),(0,o.createElement)(o.Fragment,null,(0,o.createElement)(qe,{className:He()("wp-block-prc-block-popup-modal--outer",{active:g}),backgroundColor:Ge("#000",.5)},(0,o.createElement)("div",s,(0,o.createElement)(Ue,{attributes:t,setAttributes:r}),(0,o.createElement)("div",u))),(0,o.createElement)("div",null,(0,o.createElement)(Ve.Button,{variant:"secondary",onClick:()=>v(!g)},(0,n.__)((g?"Close":"Open")+" Modal","prc-block-library"))))},save:function(e){let{attributes:t}=e;return(0,o.createElement)(Le.InnerBlocks.Content,null)}};(0,a.registerBlockType)(Xe,{...We,...Ye})}},r={};function n(e){var a=r[e];if(void 0!==a)return a.exports;var o=r[e]={exports:{}};return t[e](o,o.exports,n),o.exports}n.m=t,e=[],n.O=(t,r,a,o)=>{if(!r){var i=1/0;for(u=0;u<e.length;u++){for(var[r,a,o]=e[u],s=!0,c=0;c<r.length;c++)(!1&o||i>=o)&&Object.keys(n.O).every((e=>n.O[e](r[c])))?r.splice(c--,1):(s=!1,o<i&&(i=o));if(s){e.splice(u--,1);var l=a();void 0!==l&&(t=l)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[r,a,o]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0,431:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var a,o,[i,s,c]=r,l=0;if(i.some((t=>0!==e[t]))){for(a in s)n.o(s,a)&&(n.m[a]=s[a]);if(c)var u=c(n)}for(t&&t(r);l<i.length;l++)o=i[l],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(u)},r=globalThis.webpackChunkpopup_modal=globalThis.webpackChunkpopup_modal||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var a=n.O(void 0,[431],(()=>n(850)));a=n.O(a)})();