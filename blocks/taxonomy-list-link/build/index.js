(()=>{"use strict";var e,t={636:(e,t,n)=>{const r=window.React,a=window.wp.primitives,i=(0,r.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,r.createElement)(a.Path,{d:"M10 17.389H8.444A5.194 5.194 0 1 1 8.444 7H10v1.5H8.444a3.694 3.694 0 0 0 0 7.389H10v1.5ZM14 7h1.556a5.194 5.194 0 0 1 0 10.39H14v-1.5h1.556a3.694 3.694 0 0 0 0-7.39H14V7Zm-4.5 6h5v-1.5h-5V13Z"})),o=window.wp.blocks,s=window.classnames;var l=n.n(s);const c=window.prcIcons,u=window.wp.i18n,d=window.wp.element,p=window.wp.blockEditor,f=window.wp.compose,m=window.wp.data,h=window.prcComponents,g=window.wp.components;function b(){return b=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},b.apply(this,arguments)}function y(e){var t=Object.create(null);return function(n){return void 0===t[n]&&(t[n]=e(n)),t[n]}}var v=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,x=y((function(e){return v.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)<91})),k=function(){function e(e){var t=this;this._insertTag=function(e){var n;n=0===t.tags.length?t.insertionPoint?t.insertionPoint.nextSibling:t.prepend?t.container.firstChild:t.before:t.tags[t.tags.length-1].nextSibling,t.container.insertBefore(e,n),t.tags.push(e)},this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.insertionPoint=e.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(e){e.forEach(this._insertTag)},t.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)==0&&this._insertTag(function(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}(this));var t=this.tags[this.tags.length-1];if(this.isSpeedy){var n=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}(t);try{n.insertRule(e,n.cssRules.length)}catch(e){}}else t.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach((function(e){return e.parentNode&&e.parentNode.removeChild(e)})),this.tags=[],this.ctr=0},e}(),w=Math.abs,_=String.fromCharCode,S=Object.assign;function C(e){return e.trim()}function A(e,t,n){return e.replace(t,n)}function P(e,t){return e.indexOf(t)}function O(e,t){return 0|e.charCodeAt(t)}function T(e,t,n){return e.slice(t,n)}function j(e){return e.length}function E(e){return e.length}function $(e,t){return t.push(e),e}var M=1,N=1,R=0,L=0,I=0,z="";function B(e,t,n,r,a,i,o){return{value:e,root:t,parent:n,type:r,props:a,children:i,line:M,column:N,length:o,return:""}}function H(e,t){return S(B("",null,null,"",null,null,0),e,{length:-e.length},t)}function F(){return I=L>0?O(z,--L):0,N--,10===I&&(N=1,M--),I}function V(){return I=L<R?O(z,L++):0,N++,10===I&&(N=1,M++),I}function D(){return O(z,L)}function G(){return L}function q(e,t){return T(z,e,t)}function U(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function W(e){return M=N=1,R=j(z=e),L=0,[]}function X(e){return z="",e}function Z(e){return C(q(L-1,K(91===e?e+2:40===e?e+1:e)))}function Y(e){for(;(I=D())&&I<33;)V();return U(e)>2||U(I)>3?"":" "}function J(e,t){for(;--t&&V()&&!(I<48||I>102||I>57&&I<65||I>70&&I<97););return q(e,G()+(t<6&&32==D()&&32==V()))}function K(e){for(;V();)switch(I){case e:return L;case 34:case 39:34!==e&&39!==e&&K(I);break;case 40:41===e&&K(e);break;case 92:V()}return L}function Q(e,t){for(;V()&&e+I!==57&&(e+I!==84||47!==D()););return"/*"+q(t,L-1)+"*"+_(47===e?e:V())}function ee(e){for(;!U(D());)V();return q(e,L)}var te="-ms-",ne="-moz-",re="-webkit-",ae="comm",ie="rule",oe="decl",se="@keyframes";function le(e,t){for(var n="",r=E(e),a=0;a<r;a++)n+=t(e[a],a,e,t)||"";return n}function ce(e,t,n,r){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case oe:return e.return=e.return||e.value;case ae:return"";case se:return e.return=e.value+"{"+le(e.children,r)+"}";case ie:e.value=e.props.join(",")}return j(n=le(e.children,r))?e.return=e.value+"{"+n+"}":""}function ue(e){return X(de("",null,null,null,[""],e=W(e),0,[0],e))}function de(e,t,n,r,a,i,o,s,l){for(var c=0,u=0,d=o,p=0,f=0,m=0,h=1,g=1,b=1,y=0,v="",x=a,k=i,w=r,S=v;g;)switch(m=y,y=V()){case 40:if(108!=m&&58==O(S,d-1)){-1!=P(S+=A(Z(y),"&","&\f"),"&\f")&&(b=-1);break}case 34:case 39:case 91:S+=Z(y);break;case 9:case 10:case 13:case 32:S+=Y(m);break;case 92:S+=J(G()-1,7);continue;case 47:switch(D()){case 42:case 47:$(fe(Q(V(),G()),t,n),l);break;default:S+="/"}break;case 123*h:s[c++]=j(S)*b;case 125*h:case 59:case 0:switch(y){case 0:case 125:g=0;case 59+u:-1==b&&(S=A(S,/\f/g,"")),f>0&&j(S)-d&&$(f>32?me(S+";",r,n,d-1):me(A(S," ","")+";",r,n,d-2),l);break;case 59:S+=";";default:if($(w=pe(S,t,n,c,u,a,s,v,x=[],k=[],d),i),123===y)if(0===u)de(S,t,w,w,x,i,d,s,k);else switch(99===p&&110===O(S,3)?100:p){case 100:case 108:case 109:case 115:de(e,w,w,r&&$(pe(e,w,w,0,0,a,s,v,a,x=[],d),k),a,k,d,s,r?x:k);break;default:de(S,w,w,w,[""],k,0,s,k)}}c=u=f=0,h=b=1,v=S="",d=o;break;case 58:d=1+j(S),f=m;default:if(h<1)if(123==y)--h;else if(125==y&&0==h++&&125==F())continue;switch(S+=_(y),y*h){case 38:b=u>0?1:(S+="\f",-1);break;case 44:s[c++]=(j(S)-1)*b,b=1;break;case 64:45===D()&&(S+=Z(V())),p=D(),u=d=j(v=S+=ee(G())),y++;break;case 45:45===m&&2==j(S)&&(h=0)}}return i}function pe(e,t,n,r,a,i,o,s,l,c,u){for(var d=a-1,p=0===a?i:[""],f=E(p),m=0,h=0,g=0;m<r;++m)for(var b=0,y=T(e,d+1,d=w(h=o[m])),v=e;b<f;++b)(v=C(h>0?p[b]+" "+y:A(y,/&\f/g,p[b])))&&(l[g++]=v);return B(e,t,n,0===a?ie:s,l,c,u)}function fe(e,t,n){return B(e,t,n,ae,_(I),T(e,2,-2),0)}function me(e,t,n,r){return B(e,t,n,oe,T(e,0,r),T(e,r+1,-1),r)}var he=function(e,t,n){for(var r=0,a=0;r=a,a=D(),38===r&&12===a&&(t[n]=1),!U(a);)V();return q(e,L)},ge=new WeakMap,be=function(e){if("rule"===e.type&&e.parent&&!(e.length<1)){for(var t=e.value,n=e.parent,r=e.column===n.column&&e.line===n.line;"rule"!==n.type;)if(!(n=n.parent))return;if((1!==e.props.length||58===t.charCodeAt(0)||ge.get(n))&&!r){ge.set(e,!0);for(var a=[],i=function(e,t){return X(function(e,t){var n=-1,r=44;do{switch(U(r)){case 0:38===r&&12===D()&&(t[n]=1),e[n]+=he(L-1,t,n);break;case 2:e[n]+=Z(r);break;case 4:if(44===r){e[++n]=58===D()?"&\f":"",t[n]=e[n].length;break}default:e[n]+=_(r)}}while(r=V());return e}(W(e),t))}(t,a),o=n.props,s=0,l=0;s<i.length;s++)for(var c=0;c<o.length;c++,l++)e.props[l]=a[s]?i[s].replace(/&\f/g,o[c]):o[c]+" "+i[s]}}},ye=function(e){if("decl"===e.type){var t=e.value;108===t.charCodeAt(0)&&98===t.charCodeAt(2)&&(e.return="",e.value="")}};function ve(e,t){switch(function(e,t){return 45^O(e,0)?(((t<<2^O(e,0))<<2^O(e,1))<<2^O(e,2))<<2^O(e,3):0}(e,t)){case 5103:return re+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return re+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return re+e+ne+e+te+e+e;case 6828:case 4268:return re+e+te+e+e;case 6165:return re+e+te+"flex-"+e+e;case 5187:return re+e+A(e,/(\w+).+(:[^]+)/,re+"box-$1$2"+te+"flex-$1$2")+e;case 5443:return re+e+te+"flex-item-"+A(e,/flex-|-self/,"")+e;case 4675:return re+e+te+"flex-line-pack"+A(e,/align-content|flex-|-self/,"")+e;case 5548:return re+e+te+A(e,"shrink","negative")+e;case 5292:return re+e+te+A(e,"basis","preferred-size")+e;case 6060:return re+"box-"+A(e,"-grow","")+re+e+te+A(e,"grow","positive")+e;case 4554:return re+A(e,/([^-])(transform)/g,"$1"+re+"$2")+e;case 6187:return A(A(A(e,/(zoom-|grab)/,re+"$1"),/(image-set)/,re+"$1"),e,"")+e;case 5495:case 3959:return A(e,/(image-set\([^]*)/,re+"$1$`$1");case 4968:return A(A(e,/(.+:)(flex-)?(.*)/,re+"box-pack:$3"+te+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+re+e+e;case 4095:case 3583:case 4068:case 2532:return A(e,/(.+)-inline(.+)/,re+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(j(e)-1-t>6)switch(O(e,t+1)){case 109:if(45!==O(e,t+4))break;case 102:return A(e,/(.+:)(.+)-([^]+)/,"$1"+re+"$2-$3$1"+ne+(108==O(e,t+3)?"$3":"$2-$3"))+e;case 115:return~P(e,"stretch")?ve(A(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(115!==O(e,t+1))break;case 6444:switch(O(e,j(e)-3-(~P(e,"!important")&&10))){case 107:return A(e,":",":"+re)+e;case 101:return A(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+re+(45===O(e,14)?"inline-":"")+"box$3$1"+re+"$2$3$1"+te+"$2box$3")+e}break;case 5936:switch(O(e,t+11)){case 114:return re+e+te+A(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return re+e+te+A(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return re+e+te+A(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return re+e+te+e+e}return e}var xe=[function(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case oe:e.return=ve(e.value,e.length);break;case se:return le([H(e,{value:A(e.value,"@","@"+re)})],r);case ie:if(e.length)return function(e,t){return e.map(t).join("")}(e.props,(function(t){switch(function(e,t){return(e=/(::plac\w+|:read-\w+)/.exec(e))?e[0]:e}(t)){case":read-only":case":read-write":return le([H(e,{props:[A(t,/:(read-\w+)/,":-moz-$1")]})],r);case"::placeholder":return le([H(e,{props:[A(t,/:(plac\w+)/,":"+re+"input-$1")]}),H(e,{props:[A(t,/:(plac\w+)/,":-moz-$1")]}),H(e,{props:[A(t,/:(plac\w+)/,te+"input-$1")]})],r)}return""}))}}],ke=function(e){var t=e.key;if("css"===t){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,(function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))}))}var r,a,i=e.stylisPlugins||xe,o={},s=[];r=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),(function(e){for(var t=e.getAttribute("data-emotion").split(" "),n=1;n<t.length;n++)o[t[n]]=!0;s.push(e)}));var l,c,u,d,p=[ce,(d=function(e){l.insert(e)},function(e){e.root||(e=e.return)&&d(e)})],f=(c=[be,ye].concat(i,p),u=E(c),function(e,t,n,r){for(var a="",i=0;i<u;i++)a+=c[i](e,t,n,r)||"";return a});a=function(e,t,n,r){l=n,le(ue(e?e+"{"+t.styles+"}":t.styles),f),r&&(m.inserted[t.name]=!0)};var m={key:t,sheet:new k({key:t,container:r,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:o,registered:{},insert:a};return m.sheet.hydrate(s),m},we={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},_e=/[A-Z]|^ms/g,Se=/_EMO_([^_]+?)_([^]*?)_EMO_/g,Ce=function(e){return 45===e.charCodeAt(1)},Ae=function(e){return null!=e&&"boolean"!=typeof e},Pe=y((function(e){return Ce(e)?e:e.replace(_e,"-$&").toLowerCase()})),Oe=function(e,t){switch(e){case"animation":case"animationName":if("string"==typeof t)return t.replace(Se,(function(e,t,n){return je={name:t,styles:n,next:je},t}))}return 1===we[e]||Ce(e)||"number"!=typeof t||0===t?t:t+"px"};function Te(e,t,n){if(null==n)return"";if(void 0!==n.__emotion_styles)return n;switch(typeof n){case"boolean":return"";case"object":if(1===n.anim)return je={name:n.name,styles:n.styles,next:je},n.name;if(void 0!==n.styles){var r=n.next;if(void 0!==r)for(;void 0!==r;)je={name:r.name,styles:r.styles,next:je},r=r.next;return n.styles+";"}return function(e,t,n){var r="";if(Array.isArray(n))for(var a=0;a<n.length;a++)r+=Te(e,t,n[a])+";";else for(var i in n){var o=n[i];if("object"!=typeof o)null!=t&&void 0!==t[o]?r+=i+"{"+t[o]+"}":Ae(o)&&(r+=Pe(i)+":"+Oe(i,o)+";");else if(!Array.isArray(o)||"string"!=typeof o[0]||null!=t&&void 0!==t[o[0]]){var s=Te(e,t,o);switch(i){case"animation":case"animationName":r+=Pe(i)+":"+s+";";break;default:r+=i+"{"+s+"}"}}else for(var l=0;l<o.length;l++)Ae(o[l])&&(r+=Pe(i)+":"+Oe(i,o[l])+";")}return r}(e,t,n);case"function":if(void 0!==e){var a=je,i=n(e);return je=a,Te(e,t,i)}}if(null==t)return n;var o=t[n];return void 0!==o?o:n}var je,Ee=/label:\s*([^\s;\n{]+)\s*(;|$)/g,$e=!!r.useInsertionEffect&&r.useInsertionEffect,Me=$e||function(e){return e()},Ne=($e||r.useLayoutEffect,r.createContext("undefined"!=typeof HTMLElement?ke({key:"css"}):null));Ne.Provider;var Re=r.createContext({}),Le=function(e,t,n){var r=e.key+"-"+t.name;!1===n&&void 0===e.registered[r]&&(e.registered[r]=t.styles)},Ie=x,ze=function(e){return"theme"!==e},Be=function(e){return"string"==typeof e&&e.charCodeAt(0)>96?Ie:ze},He=function(e,t,n){var r;if(t){var a=t.shouldForwardProp;r=e.__emotion_forwardProp&&a?function(t){return e.__emotion_forwardProp(t)&&a(t)}:a}return"function"!=typeof r&&n&&(r=e.__emotion_forwardProp),r},Fe=function(e){var t=e.cache,n=e.serialized,r=e.isStringTag;return Le(t,n,r),Me((function(){return function(e,t,n){Le(e,t,n);var r=e.key+"-"+t.name;if(void 0===e.inserted[t.name]){var a=t;do{e.insert(t===a?"."+r:"",a,e.sheet,!0),a=a.next}while(void 0!==a)}}(t,n,r)})),null},Ve=function e(t,n){var a,i,o=t.__emotion_real===t,s=o&&t.__emotion_base||t;void 0!==n&&(a=n.label,i=n.target);var l=He(t,n,o),c=l||Be(s),u=!c("as");return function(){var d=arguments,p=o&&void 0!==t.__emotion_styles?t.__emotion_styles.slice(0):[];if(void 0!==a&&p.push("label:"+a+";"),null==d[0]||void 0===d[0].raw)p.push.apply(p,d);else{p.push(d[0][0]);for(var f=d.length,m=1;m<f;m++)p.push(d[m],d[0][m])}var h,g=(h=function(e,t,n){var a,o,d,f,m=u&&e.as||s,h="",g=[],b=e;if(null==e.theme){for(var y in b={},e)b[y]=e[y];b.theme=r.useContext(Re)}"string"==typeof e.className?(a=t.registered,o=g,d=e.className,f="",d.split(" ").forEach((function(e){void 0!==a[e]?o.push(a[e]+";"):f+=e+" "})),h=f):null!=e.className&&(h=e.className+" ");var v=function(e,t,n){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var r=!0,a="";je=void 0;var i=e[0];null==i||void 0===i.raw?(r=!1,a+=Te(n,t,i)):a+=i[0];for(var o=1;o<e.length;o++)a+=Te(n,t,e[o]),r&&(a+=i[o]);Ee.lastIndex=0;for(var s,l="";null!==(s=Ee.exec(a));)l+="-"+s[1];var c=function(e){for(var t,n=0,r=0,a=e.length;a>=4;++r,a-=4)t=1540483477*(65535&(t=255&e.charCodeAt(r)|(255&e.charCodeAt(++r))<<8|(255&e.charCodeAt(++r))<<16|(255&e.charCodeAt(++r))<<24))+(59797*(t>>>16)<<16),n=1540483477*(65535&(t^=t>>>24))+(59797*(t>>>16)<<16)^1540483477*(65535&n)+(59797*(n>>>16)<<16);switch(a){case 3:n^=(255&e.charCodeAt(r+2))<<16;case 2:n^=(255&e.charCodeAt(r+1))<<8;case 1:n=1540483477*(65535&(n^=255&e.charCodeAt(r)))+(59797*(n>>>16)<<16)}return(((n=1540483477*(65535&(n^=n>>>13))+(59797*(n>>>16)<<16))^n>>>15)>>>0).toString(36)}(a)+l;return{name:c,styles:a,next:je}}(p.concat(g),t.registered,b);h+=t.key+"-"+v.name,void 0!==i&&(h+=" "+i);var x=u&&void 0===l?Be(m):c,k={};for(var w in e)u&&"as"===w||x(w)&&(k[w]=e[w]);return k.className=h,k.ref=n,r.createElement(r.Fragment,null,r.createElement(Fe,{cache:t,serialized:v,isStringTag:"string"==typeof m}),r.createElement(m,k))},(0,r.forwardRef)((function(e,t){var n=(0,r.useContext)(Ne);return h(e,n,t)})));return g.displayName=void 0!==a?a:"Styled("+("string"==typeof s?s:s.displayName||s.name||"Component")+")",g.defaultProps=t.defaultProps,g.__emotion_real=g,g.__emotion_base=s,g.__emotion_styles=p,g.__emotion_forwardProp=l,Object.defineProperty(g,"toString",{value:function(){return"."+i}}),g.withComponent=function(t,r){return e(t,b({},n,r,{shouldForwardProp:He(g,r,!0)})).apply(void 0,p)},g}}.bind();["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach((function(e){Ve[e]=Ve(e)}));const De=window.wp.htmlEntities,Ge=window.ReactJSXRuntime;function qe({attributes:e,setAttributes:t,anchor:n,onClose:r=(()=>{})}){const{label:a,url:i,taxonomy:o}=e,s={url:i,opensInNewTab:!1,title:(0,De.decodeEntities)(a)},l=Ve(g.Popover)`
		.components-popover__content {
			padding-bottom: 16px;
		}
	`;return(0,Ge.jsx)(l,{placement:"bottom",noArrow:!1,onClose:r,anchor:n,shift:!0,children:(0,Ge.jsx)(p.__experimentalLinkControl,{searchInputPlaceholder:`Search for ${o} term`,hasTextControl:!0,hasRichPreviews:!0,value:s,showInitialSuggestions:!0,suggestionsQuery:{type:"term",subtype:o},onChange:e=>{!function(e,t){console.log("updateLink",e);const{title:n,url:r,id:a}=e;t({url:r,label:n,id:a})}(e,t)},onRemove:()=>{t({url:"",label:"",id:""}),r()},settings:[]})})}function Ue({attributes:e,setAttributes:t,isSelected:n,context:r,clientId:a,popoverAnchor:o}){const{className:s,url:l}=e,[c,f]=(0,d.useState)(!1),{taxonomy:m}=e,b="is-style-sub-expand"!==s;return(0,d.useEffect)((()=>{l||f(!0)}),[l]),(0,d.useEffect)((()=>{n||f(!1)}),[n]),(0,Ge.jsxs)(d.Fragment,{children:[(0,Ge.jsx)(p.InspectorControls,{children:(0,Ge.jsx)(g.PanelBody,{title:(0,u.__)("Taxonomy Menu Link Settings","prc-block-library"),children:(0,Ge.jsx)(h.TaxonomySelect,{value:m,onChange:e=>{t({taxonomy:e})}})})}),(0,Ge.jsx)(p.BlockControls,{children:b&&(0,Ge.jsxs)(g.ToolbarGroup,{children:[(0,Ge.jsx)(g.ToolbarButton,{isActive:c,icon:i,label:(0,u.__)("Link","prc-block-library"),onClick:()=>f(!c)}),c&&(0,Ge.jsx)(qe,{anchor:o,onClose:()=>{f(!1)},attributes:e,setAttributes:t})]})})]})}const We=["prc-block/taxonomy-list-link"];function Xe(e){if(!e)return null;const t=e.match(/var:preset\|spacing\|(.+)/);return t?`var(--wp--preset--spacing--${t[1]})`:e}const Ze=(0,r.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,r.createElement)(a.Path,{d:"M6 5V18.5911L12 13.8473L18 18.5911V5H6Z"})),Ye=(0,r.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,r.createElement)(a.Path,{d:"M2 12c0 3.6 2.4 5.5 6 5.5h.5V19l3-2.5-3-2.5v2H8c-2.5 0-4.5-1.5-4.5-4s2-4.5 4.5-4.5h3.5V6H8c-3.6 0-6 2.4-6 6zm19.5-1h-8v1.5h8V11zm0 5h-8v1.5h8V16zm0-10h-8v1.5h8V6z"})),Je=[{name:"taxonomy-menu-link-default",isDefault:!0,title:(0,u.__)("Link"),icon:i,scope:["inserter","transform"],isActive:({className:e,enableSubMenu:t})=>!e||!e.includes("is-style-sub")||!t},{name:"taxonomy-menu-link-sub-heading",title:(0,u.__)("Sub Heading"),attributes:{enableSubMenu:!1,className:"is-style-sub-heading"},icon:Ze,isActive:({className:e,enableSubMenu:t})=>e&&e.includes("is-style-sub-heading")},{name:"taxonomy-menu-link-sub-tree",title:(0,u.__)("Sub Tree"),attributes:{enableSubMenu:!0,className:"is-style-sub-tree"},icon:Ye,scope:["inserter","transform"],isActive:({className:e,enableSubMenu:t})=>e&&e.includes("is-style-sub-tree")&&t},{name:"taxonomy-menu-link-sub-expand",title:(0,u.__)("Sub Expand"),attributes:{enableSubMenu:!0,className:"is-style-sub-expand"},icon:Ye,scope:["inserter","transform"],isActive:({className:e,enableSubMenu:t})=>e&&e.includes("is-style-sub-expand")&&t}],Ke=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/taxonomy-list-link","version":"1.0.0","title":"Taxonomy List Link","category":"theme","description":"Display a link to a taxonomy term or custom URL with optional settings.","attributes":{"allowedBlocks":{"type":"array"},"label":{"type":"string"},"url":{"type":"string"},"id":{"type":"number"},"description":{"type":"string"},"rel":{"type":"string"},"opensInNewTab":{"type":"boolean","default":false},"title":{"type":"string"},"taxonomy":{"type":"string","default":"category"},"enableSubMenu":{"type":"boolean","default":false}},"parent":["prc-block/taxonomy-list"],"supports":{"anchor":true,"html":false,"reusable":true,"spacing":{"blockGap":true,"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true,"fontAppearance":true,"textTransform":true}},"interactivity":true},"providesContext":{"style":"style"},"usesContext":["taxonomy","style"],"textdomain":"taxonomy-list-link","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScriptModule":"file:./view.js"}'),{name:Qe,title:et}=Ke,tt={__experimentalLabel:({label:e})=>e||et,icon:i,edit:function({attributes:e,setAttributes:t,context:n,clientId:r,isSelected:a,insertBlocksAfter:i}){const{allowedBlocks:s,className:h,label:g,enableSubMenu:b,style:y}=e,[v,x]=(0,d.useState)(!1),[k,w]=(0,d.useState)(null),_=(0,d.useRef)(null),{textColor:S}=n,C=y?.spacing?.blockGap||"var:preset|spacing|30",A=(0,p.useBlockProps)({ref:(0,f.useMergeRefs)([w,_]),className:l()(h,{"has-text-color":!!S,[(0,p.getColorClassName)("color",S)]:!!S,"is-active":v})}),{insertBlock:P}=(0,m.useDispatch)(p.store),O={gap:Xe(C)},T="is-style-sub-expand"===h?"plus":"circle-plus",j="is-style-sub-expand"===h?"minus":"circle-minus",E=(0,p.useInnerBlocksProps)({className:l()("wp-block-prc-block-taxonomy-list-link__sub-menu"),style:{...O}},{allowedBlocks:s||We}),$="is-style-sub-heading"===h?[]:["core/bold","core/italic"];return(0,Ge.jsxs)(d.Fragment,{children:[(0,Ge.jsx)(Ue,{attributes:e,setAttributes:t,isSelected:a,context:n,clientId:r,popoverAnchor:k}),(0,Ge.jsxs)("div",{...A,children:["is-style-sub-expand"===h&&(0,Ge.jsx)("span",{className:"wp-block-prc-block-taxonomy-list-link__label",children:v?"Less":"More"}),"is-style-sub-expand"!==h&&(0,Ge.jsx)(p.RichText,{tagName:"span",className:"wp-block-prc-block-taxonomy-list-link__label",value:g,onChange:e=>t({label:e}),placeholder:(0,u.__)("Add Label","prc-block-library"),allowedFormats:$,multiline:!1,disableLineBreaks:!0,__unstableOnSplitAtEnd:()=>{const e=(0,o.createBlock)("prc-block/taxonomy-list-link");b?P(e,void 0,r):i(e)}}),"is-style-sub-heading"===h&&(0,Ge.jsx)(c.Icon,{icon:"chevron-right"}),b&&(0,Ge.jsxs)(d.Fragment,{children:[(0,Ge.jsx)("button",{className:"wp-block-prc-block-taxonomy-list-link__icon wp-block-prc-block-taxonomy-list-link__toggle",onClick:()=>x(!v),type:"button",children:(0,Ge.jsx)(c.Icon,{icon:v?j:T})}),(0,Ge.jsx)("div",{...E})]})]})]})},save:function({attributes:e}){return(0,Ge.jsx)(p.InnerBlocks.Content,{})},variations:Je};(0,o.registerBlockType)(Qe,{...Ke,...tt})}},n={};function r(e){var a=n[e];if(void 0!==a)return a.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,r),i.exports}r.m=t,e=[],r.O=(t,n,a,i)=>{if(!n){var o=1/0;for(u=0;u<e.length;u++){n=e[u][0],a=e[u][1],i=e[u][2];for(var s=!0,l=0;l<n.length;l++)(!1&i||o>=i)&&Object.keys(r.O).every((e=>r.O[e](n[l])))?n.splice(l--,1):(s=!1,i<o&&(o=i));if(s){e.splice(u--,1);var c=a();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[n,a,i]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var a,i,o=n[0],s=n[1],l=n[2],c=0;if(o.some((t=>0!==e[t]))){for(a in s)r.o(s,a)&&(r.m[a]=s[a]);if(l)var u=l(r)}for(t&&t(n);c<o.length;c++)i=o[c],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(u)},n=self.webpackChunkmenu_link=self.webpackChunkmenu_link||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var a=r.O(void 0,[350],(()=>r(636)));a=r.O(a)})();
//# sourceMappingURL=index.js.map