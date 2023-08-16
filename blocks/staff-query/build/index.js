(()=>{var e,t={450:(e,t,r)=>{"use strict";const n=window.wp.i18n,a=window.wp.blocks;function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o.apply(this,arguments)}const i=window.wp.element;var s=r(568),c=r.n(s);const l=window.wp.blockEditor,u=window.wp.data,f=window.wp.components,d=window.prcComponents,p=window.React,h=function(e){var t=Object.create(null);return function(r){return void 0===t[r]&&(t[r]=e(r)),t[r]}};var m=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;const g=h((function(e){return m.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)<91}));var y=function(){function e(e){var t=this;this._insertTag=function(e){var r;r=0===t.tags.length?t.insertionPoint?t.insertionPoint.nextSibling:t.prepend?t.container.firstChild:t.before:t.tags[t.tags.length-1].nextSibling,t.container.insertBefore(e,r),t.tags.push(e)},this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.insertionPoint=e.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(e){e.forEach(this._insertTag)},t.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)==0&&this._insertTag(function(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}(this));var t=this.tags[this.tags.length-1];if(this.isSpeedy){var r=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}(t);try{r.insertRule(e,r.cssRules.length)}catch(e){}}else t.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach((function(e){return e.parentNode&&e.parentNode.removeChild(e)})),this.tags=[],this.ctr=0},e}(),v=Math.abs,b=String.fromCharCode,k=Object.assign;function x(e){return e.trim()}function w(e,t,r){return e.replace(t,r)}function C(e,t){return e.indexOf(t)}function _(e,t){return 0|e.charCodeAt(t)}function A(e,t,r){return e.slice(t,r)}function S(e){return e.length}function T(e){return e.length}function E(e,t){return t.push(e),e}var I=1,P=1,O=0,$=0,B=0,R="";function j(e,t,r,n,a,o,i){return{value:e,root:t,parent:r,type:n,props:a,children:o,line:I,column:P,length:i,return:""}}function M(e,t){return k(j("",null,null,"",null,null,0),e,{length:-e.length},t)}function F(){return B=$>0?_(R,--$):0,P--,10===B&&(P=1,I--),B}function z(){return B=$<O?_(R,$++):0,P++,10===B&&(P=1,I++),B}function N(){return _(R,$)}function L(){return $}function H(e,t){return A(R,e,t)}function U(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function q(e){return I=P=1,O=S(R=e),$=0,[]}function D(e){return R="",e}function G(e){return x(H($-1,X(91===e?e+2:40===e?e+1:e)))}function W(e){for(;(B=N())&&B<33;)z();return U(e)>2||U(B)>3?"":" "}function V(e,t){for(;--t&&z()&&!(B<48||B>102||B>57&&B<65||B>70&&B<97););return H(e,L()+(t<6&&32==N()&&32==z()))}function X(e){for(;z();)switch(B){case e:return $;case 34:case 39:34!==e&&39!==e&&X(B);break;case 40:41===e&&X(e);break;case 92:z()}return $}function Y(e,t){for(;z()&&e+B!==57&&(e+B!==84||47!==N()););return"/*"+H(t,$-1)+"*"+b(47===e?e:z())}function Q(e){for(;!U(N());)z();return H(e,$)}var J="-ms-",K="-moz-",Z="-webkit-",ee="comm",te="rule",re="decl",ne="@keyframes";function ae(e,t){for(var r="",n=T(e),a=0;a<n;a++)r+=t(e[a],a,e,t)||"";return r}function oe(e,t,r,n){switch(e.type){case"@import":case re:return e.return=e.return||e.value;case ee:return"";case ne:return e.return=e.value+"{"+ae(e.children,n)+"}";case te:e.value=e.props.join(",")}return S(r=ae(e.children,n))?e.return=e.value+"{"+r+"}":""}function ie(e){return D(se("",null,null,null,[""],e=q(e),0,[0],e))}function se(e,t,r,n,a,o,i,s,c){for(var l=0,u=0,f=i,d=0,p=0,h=0,m=1,g=1,y=1,v=0,k="",x=a,A=o,T=n,I=k;g;)switch(h=v,v=z()){case 40:if(108!=h&&58==_(I,f-1)){-1!=C(I+=w(G(v),"&","&\f"),"&\f")&&(y=-1);break}case 34:case 39:case 91:I+=G(v);break;case 9:case 10:case 13:case 32:I+=W(h);break;case 92:I+=V(L()-1,7);continue;case 47:switch(N()){case 42:case 47:E(le(Y(z(),L()),t,r),c);break;default:I+="/"}break;case 123*m:s[l++]=S(I)*y;case 125*m:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:p>0&&S(I)-f&&E(p>32?ue(I+";",n,r,f-1):ue(w(I," ","")+";",n,r,f-2),c);break;case 59:I+=";";default:if(E(T=ce(I,t,r,l,u,a,s,k,x=[],A=[],f),o),123===v)if(0===u)se(I,t,T,T,x,o,f,s,A);else switch(99===d&&110===_(I,3)?100:d){case 100:case 109:case 115:se(e,T,T,n&&E(ce(e,T,T,0,0,a,s,k,a,x=[],f),A),a,A,f,s,n?x:A);break;default:se(I,T,T,T,[""],A,0,s,A)}}l=u=p=0,m=y=1,k=I="",f=i;break;case 58:f=1+S(I),p=h;default:if(m<1)if(123==v)--m;else if(125==v&&0==m++&&125==F())continue;switch(I+=b(v),v*m){case 38:y=u>0?1:(I+="\f",-1);break;case 44:s[l++]=(S(I)-1)*y,y=1;break;case 64:45===N()&&(I+=G(z())),d=N(),u=f=S(k=I+=Q(L())),v++;break;case 45:45===h&&2==S(I)&&(m=0)}}return o}function ce(e,t,r,n,a,o,i,s,c,l,u){for(var f=a-1,d=0===a?o:[""],p=T(d),h=0,m=0,g=0;h<n;++h)for(var y=0,b=A(e,f+1,f=v(m=i[h])),k=e;y<p;++y)(k=x(m>0?d[y]+" "+b:w(b,/&\f/g,d[y])))&&(c[g++]=k);return j(e,t,r,0===a?te:s,c,l,u)}function le(e,t,r){return j(e,t,r,ee,b(B),A(e,2,-2),0)}function ue(e,t,r,n){return j(e,t,r,re,A(e,0,n),A(e,n+1,-1),n)}var fe=function(e,t,r){for(var n=0,a=0;n=a,a=N(),38===n&&12===a&&(t[r]=1),!U(a);)z();return H(e,$)},de=new WeakMap,pe=function(e){if("rule"===e.type&&e.parent&&!(e.length<1)){for(var t=e.value,r=e.parent,n=e.column===r.column&&e.line===r.line;"rule"!==r.type;)if(!(r=r.parent))return;if((1!==e.props.length||58===t.charCodeAt(0)||de.get(r))&&!n){de.set(e,!0);for(var a=[],o=function(e,t){return D(function(e,t){var r=-1,n=44;do{switch(U(n)){case 0:38===n&&12===N()&&(t[r]=1),e[r]+=fe($-1,t,r);break;case 2:e[r]+=G(n);break;case 4:if(44===n){e[++r]=58===N()?"&\f":"",t[r]=e[r].length;break}default:e[r]+=b(n)}}while(n=z());return e}(q(e),t))}(t,a),i=r.props,s=0,c=0;s<o.length;s++)for(var l=0;l<i.length;l++,c++)e.props[c]=a[s]?o[s].replace(/&\f/g,i[l]):i[l]+" "+o[s]}}},he=function(e){if("decl"===e.type){var t=e.value;108===t.charCodeAt(0)&&98===t.charCodeAt(2)&&(e.return="",e.value="")}};function me(e,t){switch(function(e,t){return 45^_(e,0)?(((t<<2^_(e,0))<<2^_(e,1))<<2^_(e,2))<<2^_(e,3):0}(e,t)){case 5103:return Z+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return Z+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Z+e+K+e+J+e+e;case 6828:case 4268:return Z+e+J+e+e;case 6165:return Z+e+J+"flex-"+e+e;case 5187:return Z+e+w(e,/(\w+).+(:[^]+)/,Z+"box-$1$2"+J+"flex-$1$2")+e;case 5443:return Z+e+J+"flex-item-"+w(e,/flex-|-self/,"")+e;case 4675:return Z+e+J+"flex-line-pack"+w(e,/align-content|flex-|-self/,"")+e;case 5548:return Z+e+J+w(e,"shrink","negative")+e;case 5292:return Z+e+J+w(e,"basis","preferred-size")+e;case 6060:return Z+"box-"+w(e,"-grow","")+Z+e+J+w(e,"grow","positive")+e;case 4554:return Z+w(e,/([^-])(transform)/g,"$1"+Z+"$2")+e;case 6187:return w(w(w(e,/(zoom-|grab)/,Z+"$1"),/(image-set)/,Z+"$1"),e,"")+e;case 5495:case 3959:return w(e,/(image-set\([^]*)/,Z+"$1$`$1");case 4968:return w(w(e,/(.+:)(flex-)?(.*)/,Z+"box-pack:$3"+J+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+Z+e+e;case 4095:case 3583:case 4068:case 2532:return w(e,/(.+)-inline(.+)/,Z+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(S(e)-1-t>6)switch(_(e,t+1)){case 109:if(45!==_(e,t+4))break;case 102:return w(e,/(.+:)(.+)-([^]+)/,"$1"+Z+"$2-$3$1"+K+(108==_(e,t+3)?"$3":"$2-$3"))+e;case 115:return~C(e,"stretch")?me(w(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(115!==_(e,t+1))break;case 6444:switch(_(e,S(e)-3-(~C(e,"!important")&&10))){case 107:return w(e,":",":"+Z)+e;case 101:return w(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+Z+(45===_(e,14)?"inline-":"")+"box$3$1"+Z+"$2$3$1"+J+"$2box$3")+e}break;case 5936:switch(_(e,t+11)){case 114:return Z+e+J+w(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return Z+e+J+w(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return Z+e+J+w(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return Z+e+J+e+e}return e}var ge=[function(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case re:e.return=me(e.value,e.length);break;case ne:return ae([M(e,{value:w(e.value,"@","@"+Z)})],n);case te:if(e.length)return function(e,t){return e.map(t).join("")}(e.props,(function(t){switch(function(e,t){return(e=/(::plac\w+|:read-\w+)/.exec(e))?e[0]:e}(t)){case":read-only":case":read-write":return ae([M(e,{props:[w(t,/:(read-\w+)/,":-moz-$1")]})],n);case"::placeholder":return ae([M(e,{props:[w(t,/:(plac\w+)/,":"+Z+"input-$1")]}),M(e,{props:[w(t,/:(plac\w+)/,":-moz-$1")]}),M(e,{props:[w(t,/:(plac\w+)/,J+"input-$1")]})],n)}return""}))}}];const ye=function(e){var t=e.key;if("css"===t){var r=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(r,(function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))}))}var n,a,o=e.stylisPlugins||ge,i={},s=[];n=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),(function(e){for(var t=e.getAttribute("data-emotion").split(" "),r=1;r<t.length;r++)i[t[r]]=!0;s.push(e)}));var c,l,u,f,d=[oe,(f=function(e){c.insert(e)},function(e){e.root||(e=e.return)&&f(e)})],p=(l=[pe,he].concat(o,d),u=T(l),function(e,t,r,n){for(var a="",o=0;o<u;o++)a+=l[o](e,t,r,n)||"";return a});a=function(e,t,r,n){c=r,ae(ie(e?e+"{"+t.styles+"}":t.styles),p),n&&(h.inserted[t.name]=!0)};var h={key:t,sheet:new y({key:t,container:n,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:i,registered:{},insert:a};return h.sheet.hydrate(s),h},ve=function(e){for(var t,r=0,n=0,a=e.length;a>=4;++n,a-=4)t=1540483477*(65535&(t=255&e.charCodeAt(n)|(255&e.charCodeAt(++n))<<8|(255&e.charCodeAt(++n))<<16|(255&e.charCodeAt(++n))<<24))+(59797*(t>>>16)<<16),r=1540483477*(65535&(t^=t>>>24))+(59797*(t>>>16)<<16)^1540483477*(65535&r)+(59797*(r>>>16)<<16);switch(a){case 3:r^=(255&e.charCodeAt(n+2))<<16;case 2:r^=(255&e.charCodeAt(n+1))<<8;case 1:r=1540483477*(65535&(r^=255&e.charCodeAt(n)))+(59797*(r>>>16)<<16)}return(((r=1540483477*(65535&(r^=r>>>13))+(59797*(r>>>16)<<16))^r>>>15)>>>0).toString(36)},be={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};var ke=/[A-Z]|^ms/g,xe=/_EMO_([^_]+?)_([^]*?)_EMO_/g,we=function(e){return 45===e.charCodeAt(1)},Ce=function(e){return null!=e&&"boolean"!=typeof e},_e=h((function(e){return we(e)?e:e.replace(ke,"-$&").toLowerCase()})),Ae=function(e,t){switch(e){case"animation":case"animationName":if("string"==typeof t)return t.replace(xe,(function(e,t,r){return Te={name:t,styles:r,next:Te},t}))}return 1===be[e]||we(e)||"number"!=typeof t||0===t?t:t+"px"};function Se(e,t,r){if(null==r)return"";if(void 0!==r.__emotion_styles)return r;switch(typeof r){case"boolean":return"";case"object":if(1===r.anim)return Te={name:r.name,styles:r.styles,next:Te},r.name;if(void 0!==r.styles){var n=r.next;if(void 0!==n)for(;void 0!==n;)Te={name:n.name,styles:n.styles,next:Te},n=n.next;return r.styles+";"}return function(e,t,r){var n="";if(Array.isArray(r))for(var a=0;a<r.length;a++)n+=Se(e,t,r[a])+";";else for(var o in r){var i=r[o];if("object"!=typeof i)null!=t&&void 0!==t[i]?n+=o+"{"+t[i]+"}":Ce(i)&&(n+=_e(o)+":"+Ae(o,i)+";");else if(!Array.isArray(i)||"string"!=typeof i[0]||null!=t&&void 0!==t[i[0]]){var s=Se(e,t,i);switch(o){case"animation":case"animationName":n+=_e(o)+":"+s+";";break;default:n+=o+"{"+s+"}"}}else for(var c=0;c<i.length;c++)Ce(i[c])&&(n+=_e(o)+":"+Ae(o,i[c])+";")}return n}(e,t,r);case"function":if(void 0!==e){var a=Te,o=r(e);return Te=a,Se(e,t,o)}}if(null==t)return r;var i=t[r];return void 0!==i?i:r}var Te,Ee=/label:\s*([^\s;\n{]+)\s*(;|$)/g,Ie=function(e,t,r){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var n=!0,a="";Te=void 0;var o=e[0];null==o||void 0===o.raw?(n=!1,a+=Se(r,t,o)):a+=o[0];for(var i=1;i<e.length;i++)a+=Se(r,t,e[i]),n&&(a+=o[i]);Ee.lastIndex=0;for(var s,c="";null!==(s=Ee.exec(a));)c+="-"+s[1];return{name:ve(a)+c,styles:a,next:Te}},Pe=!!p.useInsertionEffect&&p.useInsertionEffect,Oe=Pe||function(e){return e()},$e=(Pe||p.useLayoutEffect,(0,p.createContext)("undefined"!=typeof HTMLElement?ye({key:"css"}):null));$e.Provider;var Be=function(e){return(0,p.forwardRef)((function(t,r){var n=(0,p.useContext)($e);return e(t,n,r)}))},Re=(0,p.createContext)({});function je(e,t,r){var n="";return r.split(" ").forEach((function(r){void 0!==e[r]?t.push(e[r]+";"):n+=r+" "})),n}var Me=function(e,t,r){var n=e.key+"-"+t.name;!1===r&&void 0===e.registered[n]&&(e.registered[n]=t.styles)},Fe=g,ze=function(e){return"theme"!==e},Ne=function(e){return"string"==typeof e&&e.charCodeAt(0)>96?Fe:ze},Le=function(e,t,r){var n;if(t){var a=t.shouldForwardProp;n=e.__emotion_forwardProp&&a?function(t){return e.__emotion_forwardProp(t)&&a(t)}:a}return"function"!=typeof n&&r&&(n=e.__emotion_forwardProp),n},He=function(e){var t=e.cache,r=e.serialized,n=e.isStringTag;return Me(t,r,n),Oe((function(){return function(e,t,r){Me(e,t,r);var n=e.key+"-"+t.name;if(void 0===e.inserted[t.name]){var a=t;do{e.insert(t===a?"."+n:"",a,e.sheet,!0),a=a.next}while(void 0!==a)}}(t,r,n)})),null};var Ue=function e(t,r){var n,a,i=t.__emotion_real===t,s=i&&t.__emotion_base||t;void 0!==r&&(n=r.label,a=r.target);var c=Le(t,r,i),l=c||Ne(s),u=!l("as");return function(){var f=arguments,d=i&&void 0!==t.__emotion_styles?t.__emotion_styles.slice(0):[];if(void 0!==n&&d.push("label:"+n+";"),null==f[0]||void 0===f[0].raw)d.push.apply(d,f);else{d.push(f[0][0]);for(var h=f.length,m=1;m<h;m++)d.push(f[m],f[0][m])}var g=Be((function(e,t,r){var n=u&&e.as||s,o="",i=[],f=e;if(null==e.theme){for(var h in f={},e)f[h]=e[h];f.theme=(0,p.useContext)(Re)}"string"==typeof e.className?o=je(t.registered,i,e.className):null!=e.className&&(o=e.className+" ");var m=Ie(d.concat(i),t.registered,f);o+=t.key+"-"+m.name,void 0!==a&&(o+=" "+a);var g=u&&void 0===c?Ne(n):l,y={};for(var v in e)u&&"as"===v||g(v)&&(y[v]=e[v]);return y.className=o,y.ref=r,(0,p.createElement)(p.Fragment,null,(0,p.createElement)(He,{cache:t,serialized:m,isStringTag:"string"==typeof n}),(0,p.createElement)(n,y))}));return g.displayName=void 0!==n?n:"Styled("+("string"==typeof s?s:s.displayName||s.name||"Component")+")",g.defaultProps=t.defaultProps,g.__emotion_real=g,g.__emotion_base=s,g.__emotion_styles=d,g.__emotion_forwardProp=c,Object.defineProperty(g,"toString",{value:function(){return"."+a}}),g.withComponent=function(t,n){return e(t,o({},r,n,{shouldForwardProp:Le(g,n,!0)})).apply(void 0,d)},g}}.bind();["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach((function(e){Ue[e]=Ue(e)}));const qe=Ue,De=window.lodash,Ge=qe.div`
	grid-column: span 2;
`;function We(e){let{attributes:t,setAttributes:r,clientId:a}=e;const{staffType:o,researchArea:s}=t;return(0,i.createElement)(l.InspectorControls,null,(0,i.createElement)(f.__experimentalToolsPanel,{label:(0,n.__)("Staff Query Filters"),resetAll:()=>{console.log("Reset All")},panelId:a},(0,i.createElement)(Ge,null,(0,n.__)("Use the filters below to filter the staff members that are displayed. Filter by staff type or research area.")),(0,i.createElement)(f.__experimentalToolsPanelItem,{label:(0,n.__)("Filter by Staff Type"),hasValue:()=>void 0!==o,onDeselect:()=>console.log("onDeselect"),resetAllFilter:e=>console.log("reset all",e),panelId:a},(0,i.createElement)(d.TermSelect,{maxTerms:1,value:(0,De.has)(o,"name")?[{value:o.name,title:o.name}]:[],taxonomy:"staff-type",usePrimaryRestAPI:!0,onChange:e=>{r({staffType:e})}})),(0,i.createElement)(f.__experimentalToolsPanelItem,{label:(0,n.__)("Filter by Research Area"),hasValue:()=>void 0!==s,onDeselect:()=>console.log("onDeselect"),resetAllFilter:e=>console.log("reset all",e),panelId:a},(0,i.createElement)(d.TermSelect,{maxTerms:1,value:(0,De.has)(s,"name")?[{value:s.name,title:s.name}]:[],taxonomy:"research-teams",usePrimaryRestAPI:!0,onChange:e=>{r({researchArea:e})}}))))}const Ve=window.wp.apiFetch;var Xe=r.n(Ve);const Ye=window.wp.url,Qe=["prc-block/staff-info","core/group","something/else"];function Je(e){let{}=e;const t=(0,l.useInnerBlocksProps)({},{allowedBlocks:Qe});return(0,i.createElement)("div",t)}const Ke=(0,i.memo)((function(e){let{blocks:t,blockContextId:r,isHidden:n,setContextId:a}=e;const s=(0,l.__experimentalUseBlockPreview)({blocks:t}),c=()=>{a(r)},u={display:n?"none":void 0};return(0,i.createElement)("div",o({},s,{tabIndex:0,role:"button",onClick:c,onKeyPress:c,style:u}))})),Ze=e=>{let{blockContexts:t,activeBlockContextId:r,blocks:n,setContextId:a}=e;return(0,i.createElement)(i.Fragment,null,t.map(((e,o)=>{const s=c()(JSON.stringify(e)),u=s===r||s===c()(JSON.stringify(t[0]));return(0,i.createElement)(l.BlockContextProvider,{key:`context-key--${o}`,value:e},null===r||u?(0,i.createElement)(Je,null):null,(0,i.createElement)(Ke,{blocks:n,blockContextId:s,setContextId:a,isHidden:u}))})))},et=window.prcIcons,tt=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/staff-query","version":"0.1.0","title":"Staff Query","category":"theme","description":"Query staff members.","attributes":{"allowedBlocks":{"type":"array"},"staffType":{"type":"object"},"researchArea":{"type":"object"}},"supports":{"anchor":true,"html":false,"spacing":{"blockGap":true,"margin":["top","bottom"],"padding":true},"typography":{"fontSize":true,"__experimentalFontFamily":true}},"textdomain":"bylines-query","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}'),{name:rt}=tt,nt={__experimentalLabel:e=>{const{staffType:t}=e;return`${t?t.name:"Staff"} Query`},icon:function(){return(0,i.createElement)(et.Icon,{icon:et.icons.faUserGear,height:21,preserveAspectRatio:"xMidYMid meet"})},edit:function(e){let{clientId:t,attributes:r,setAttributes:n}=e;const a=(0,l.useBlockProps)(),{activeBlockContextId:o,blockContexts:s,blocks:d,staffPosts:p,setContextId:h}=(e=>{let{attributes:t,clientId:r}=e;const[n,a]=(0,i.useState)(null),o=e=>{let t=null;if(Array.isArray(e)){const r=e[0];t=c()(JSON.stringify(r))}"string"==typeof e&&(t=e),a(t)},[s,f]=(0,i.useState)(!1),{blocks:d}=(0,u.useSelect)((e=>{const{getBlocks:t}=e(l.store);return{blocks:t(r)}}),[r]),p=(0,i.useMemo)((()=>{if(!s||0===s.length)return[];const e=s?.map((e=>e));return e}),[s]);return(0,i.useEffect)((()=>{(function(e){let{staffType:t,researchArea:r}=e;const n=t?t.id:null,a={per_page:100,orderby:"last_name",order:"asc",fields:"id,slug,title,type,name,staffInfo"};if(n&&(a["staff-type"]=n),r){const e=r?r.id:null;a["research-area"]=e}const o=(0,Ye.addQueryArgs)(`${window.location.origin}/wp-json/wp/v2/staff`,a);return new Promise((e=>{Xe()({url:o}).then((t=>{e(t.map((e=>({staffPostId:e.id,...e.staffInfo}))))}))}))})(t).then((e=>{f(e)}))}),[r,t]),(0,i.useEffect)((()=>{0<p.length&&o(p)}),[p]),{activeBlockContextId:n,blockContexts:p,blocks:d,staffPosts:s,setContextId:o}})({attributes:r,clientId:t});return p?(0,i.createElement)(i.Fragment,null,(0,i.createElement)(We,{attributes:r,setAttributes:n,clientId:t}),(0,i.createElement)("div",a,s&&(0,i.createElement)(Ze,{blockContexts:s,activeBlockContextId:o,blocks:d,setContextId:h}))):(0,i.createElement)("div",a,(0,i.createElement)(f.Spinner,{style:{align:"center"}}),(0,i.createElement)("p",null,"Loading staff members..."))},save:function(e){let{attributes:t}=e;return(0,i.createElement)(l.InnerBlocks.Content,null)}};(0,a.registerBlockType)(rt,{...tt,...nt})},487:e=>{var t={utf8:{stringToBytes:function(e){return t.bin.stringToBytes(unescape(encodeURIComponent(e)))},bytesToString:function(e){return decodeURIComponent(escape(t.bin.bytesToString(e)))}},bin:{stringToBytes:function(e){for(var t=[],r=0;r<e.length;r++)t.push(255&e.charCodeAt(r));return t},bytesToString:function(e){for(var t=[],r=0;r<e.length;r++)t.push(String.fromCharCode(e[r]));return t.join("")}}};e.exports=t},12:e=>{var t,r;t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r={rotl:function(e,t){return e<<t|e>>>32-t},rotr:function(e,t){return e<<32-t|e>>>t},endian:function(e){if(e.constructor==Number)return 16711935&r.rotl(e,8)|4278255360&r.rotl(e,24);for(var t=0;t<e.length;t++)e[t]=r.endian(e[t]);return e},randomBytes:function(e){for(var t=[];e>0;e--)t.push(Math.floor(256*Math.random()));return t},bytesToWords:function(e){for(var t=[],r=0,n=0;r<e.length;r++,n+=8)t[n>>>5]|=e[r]<<24-n%32;return t},wordsToBytes:function(e){for(var t=[],r=0;r<32*e.length;r+=8)t.push(e[r>>>5]>>>24-r%32&255);return t},bytesToHex:function(e){for(var t=[],r=0;r<e.length;r++)t.push((e[r]>>>4).toString(16)),t.push((15&e[r]).toString(16));return t.join("")},hexToBytes:function(e){for(var t=[],r=0;r<e.length;r+=2)t.push(parseInt(e.substr(r,2),16));return t},bytesToBase64:function(e){for(var r=[],n=0;n<e.length;n+=3)for(var a=e[n]<<16|e[n+1]<<8|e[n+2],o=0;o<4;o++)8*n+6*o<=8*e.length?r.push(t.charAt(a>>>6*(3-o)&63)):r.push("=");return r.join("")},base64ToBytes:function(e){e=e.replace(/[^A-Z0-9+\/]/gi,"");for(var r=[],n=0,a=0;n<e.length;a=++n%4)0!=a&&r.push((t.indexOf(e.charAt(n-1))&Math.pow(2,-2*a+8)-1)<<2*a|t.indexOf(e.charAt(n))>>>6-2*a);return r}},e.exports=r},738:e=>{function t(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}e.exports=function(e){return null!=e&&(t(e)||function(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&t(e.slice(0,0))}(e)||!!e._isBuffer)}},568:(e,t,r)=>{var n,a,o,i,s;n=r(12),a=r(487).utf8,o=r(738),i=r(487).bin,(s=function(e,t){e.constructor==String?e=t&&"binary"===t.encoding?i.stringToBytes(e):a.stringToBytes(e):o(e)?e=Array.prototype.slice.call(e,0):Array.isArray(e)||e.constructor===Uint8Array||(e=e.toString());for(var r=n.bytesToWords(e),c=8*e.length,l=1732584193,u=-271733879,f=-1732584194,d=271733878,p=0;p<r.length;p++)r[p]=16711935&(r[p]<<8|r[p]>>>24)|4278255360&(r[p]<<24|r[p]>>>8);r[c>>>5]|=128<<c%32,r[14+(c+64>>>9<<4)]=c;var h=s._ff,m=s._gg,g=s._hh,y=s._ii;for(p=0;p<r.length;p+=16){var v=l,b=u,k=f,x=d;l=h(l,u,f,d,r[p+0],7,-680876936),d=h(d,l,u,f,r[p+1],12,-389564586),f=h(f,d,l,u,r[p+2],17,606105819),u=h(u,f,d,l,r[p+3],22,-1044525330),l=h(l,u,f,d,r[p+4],7,-176418897),d=h(d,l,u,f,r[p+5],12,1200080426),f=h(f,d,l,u,r[p+6],17,-1473231341),u=h(u,f,d,l,r[p+7],22,-45705983),l=h(l,u,f,d,r[p+8],7,1770035416),d=h(d,l,u,f,r[p+9],12,-1958414417),f=h(f,d,l,u,r[p+10],17,-42063),u=h(u,f,d,l,r[p+11],22,-1990404162),l=h(l,u,f,d,r[p+12],7,1804603682),d=h(d,l,u,f,r[p+13],12,-40341101),f=h(f,d,l,u,r[p+14],17,-1502002290),l=m(l,u=h(u,f,d,l,r[p+15],22,1236535329),f,d,r[p+1],5,-165796510),d=m(d,l,u,f,r[p+6],9,-1069501632),f=m(f,d,l,u,r[p+11],14,643717713),u=m(u,f,d,l,r[p+0],20,-373897302),l=m(l,u,f,d,r[p+5],5,-701558691),d=m(d,l,u,f,r[p+10],9,38016083),f=m(f,d,l,u,r[p+15],14,-660478335),u=m(u,f,d,l,r[p+4],20,-405537848),l=m(l,u,f,d,r[p+9],5,568446438),d=m(d,l,u,f,r[p+14],9,-1019803690),f=m(f,d,l,u,r[p+3],14,-187363961),u=m(u,f,d,l,r[p+8],20,1163531501),l=m(l,u,f,d,r[p+13],5,-1444681467),d=m(d,l,u,f,r[p+2],9,-51403784),f=m(f,d,l,u,r[p+7],14,1735328473),l=g(l,u=m(u,f,d,l,r[p+12],20,-1926607734),f,d,r[p+5],4,-378558),d=g(d,l,u,f,r[p+8],11,-2022574463),f=g(f,d,l,u,r[p+11],16,1839030562),u=g(u,f,d,l,r[p+14],23,-35309556),l=g(l,u,f,d,r[p+1],4,-1530992060),d=g(d,l,u,f,r[p+4],11,1272893353),f=g(f,d,l,u,r[p+7],16,-155497632),u=g(u,f,d,l,r[p+10],23,-1094730640),l=g(l,u,f,d,r[p+13],4,681279174),d=g(d,l,u,f,r[p+0],11,-358537222),f=g(f,d,l,u,r[p+3],16,-722521979),u=g(u,f,d,l,r[p+6],23,76029189),l=g(l,u,f,d,r[p+9],4,-640364487),d=g(d,l,u,f,r[p+12],11,-421815835),f=g(f,d,l,u,r[p+15],16,530742520),l=y(l,u=g(u,f,d,l,r[p+2],23,-995338651),f,d,r[p+0],6,-198630844),d=y(d,l,u,f,r[p+7],10,1126891415),f=y(f,d,l,u,r[p+14],15,-1416354905),u=y(u,f,d,l,r[p+5],21,-57434055),l=y(l,u,f,d,r[p+12],6,1700485571),d=y(d,l,u,f,r[p+3],10,-1894986606),f=y(f,d,l,u,r[p+10],15,-1051523),u=y(u,f,d,l,r[p+1],21,-2054922799),l=y(l,u,f,d,r[p+8],6,1873313359),d=y(d,l,u,f,r[p+15],10,-30611744),f=y(f,d,l,u,r[p+6],15,-1560198380),u=y(u,f,d,l,r[p+13],21,1309151649),l=y(l,u,f,d,r[p+4],6,-145523070),d=y(d,l,u,f,r[p+11],10,-1120210379),f=y(f,d,l,u,r[p+2],15,718787259),u=y(u,f,d,l,r[p+9],21,-343485551),l=l+v>>>0,u=u+b>>>0,f=f+k>>>0,d=d+x>>>0}return n.endian([l,u,f,d])})._ff=function(e,t,r,n,a,o,i){var s=e+(t&r|~t&n)+(a>>>0)+i;return(s<<o|s>>>32-o)+t},s._gg=function(e,t,r,n,a,o,i){var s=e+(t&n|r&~n)+(a>>>0)+i;return(s<<o|s>>>32-o)+t},s._hh=function(e,t,r,n,a,o,i){var s=e+(t^r^n)+(a>>>0)+i;return(s<<o|s>>>32-o)+t},s._ii=function(e,t,r,n,a,o,i){var s=e+(r^(t|~n))+(a>>>0)+i;return(s<<o|s>>>32-o)+t},s._blocksize=16,s._digestsize=16,e.exports=function(e,t){if(null==e)throw new Error("Illegal argument "+e);var r=n.wordsToBytes(s(e,t));return t&&t.asBytes?r:t&&t.asString?i.bytesToString(r):n.bytesToHex(r)}}},r={};function n(e){var a=r[e];if(void 0!==a)return a.exports;var o=r[e]={exports:{}};return t[e](o,o.exports,n),o.exports}n.m=t,e=[],n.O=(t,r,a,o)=>{if(!r){var i=1/0;for(u=0;u<e.length;u++){r=e[u][0],a=e[u][1],o=e[u][2];for(var s=!0,c=0;c<r.length;c++)(!1&o||i>=o)&&Object.keys(n.O).every((e=>n.O[e](r[c])))?r.splice(c--,1):(s=!1,o<i&&(i=o));if(s){e.splice(u--,1);var l=a();void 0!==l&&(t=l)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[r,a,o]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0,431:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var a,o,i=r[0],s=r[1],c=r[2],l=0;if(i.some((t=>0!==e[t]))){for(a in s)n.o(s,a)&&(n.m[a]=s[a]);if(c)var u=c(n)}for(t&&t(r);l<i.length;l++)o=i[l],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(u)},r=self.webpackChunkstaff_query=self.webpackChunkstaff_query||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var a=n.O(void 0,[431],(()=>n(450)));a=n.O(a)})();
//# sourceMappingURL=index.js.map