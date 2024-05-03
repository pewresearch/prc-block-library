(()=>{"use strict";var e,t={602:()=>{const e=window.wp.blocks,t=window.React,r=window.wp.blockEditor,n=window.prcComponents;function a(){return a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},a.apply(this,arguments)}function i(e){var t=Object.create(null);return function(r){return void 0===t[r]&&(t[r]=e(r)),t[r]}}var o=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,s=i((function(e){return o.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)<91})),c=function(){function e(e){var t=this;this._insertTag=function(e){var r;r=0===t.tags.length?t.insertionPoint?t.insertionPoint.nextSibling:t.prepend?t.container.firstChild:t.before:t.tags[t.tags.length-1].nextSibling,t.container.insertBefore(e,r),t.tags.push(e)},this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.insertionPoint=e.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(e){e.forEach(this._insertTag)},t.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)==0&&this._insertTag(function(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}(this));var t=this.tags[this.tags.length-1];if(this.isSpeedy){var r=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}(t);try{r.insertRule(e,r.cssRules.length)}catch(e){}}else t.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach((function(e){return e.parentNode&&e.parentNode.removeChild(e)})),this.tags=[],this.ctr=0},e}(),l=Math.abs,u=String.fromCharCode,d=Object.assign;function f(e){return e.trim()}function p(e,t,r){return e.replace(t,r)}function h(e,t){return e.indexOf(t)}function m(e,t){return 0|e.charCodeAt(t)}function g(e,t,r){return e.slice(t,r)}function y(e){return e.length}function v(e){return e.length}function b(e,t){return t.push(e),e}var k=1,x=1,w=0,C=0,S=0,A="";function _(e,t,r,n,a,i,o){return{value:e,root:t,parent:r,type:n,props:a,children:i,line:k,column:x,length:o,return:""}}function T(e,t){return d(_("",null,null,"",null,null,0),e,{length:-e.length},t)}function O(){return S=C>0?m(A,--C):0,x--,10===S&&(x=1,k--),S}function P(){return S=C<w?m(A,C++):0,x++,10===S&&(x=1,k++),S}function E(){return m(A,C)}function $(){return C}function R(e,t){return g(A,e,t)}function I(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function j(e){return k=x=1,w=y(A=e),C=0,[]}function z(e){return A="",e}function M(e){return f(R(C-1,F(91===e?e+2:40===e?e+1:e)))}function N(e){for(;(S=E())&&S<33;)P();return I(e)>2||I(S)>3?"":" "}function L(e,t){for(;--t&&P()&&!(S<48||S>102||S>57&&S<65||S>70&&S<97););return R(e,$()+(t<6&&32==E()&&32==P()))}function F(e){for(;P();)switch(S){case e:return C;case 34:case 39:34!==e&&39!==e&&F(S);break;case 40:41===e&&F(e);break;case 92:P()}return C}function H(e,t){for(;P()&&e+S!==57&&(e+S!==84||47!==E()););return"/*"+R(t,C-1)+"*"+u(47===e?e:P())}function B(e){for(;!I(E());)P();return R(e,C)}var q="-ms-",D="-moz-",G="-webkit-",U="comm",W="rule",V="decl",X="@keyframes";function Y(e,t){for(var r="",n=v(e),a=0;a<n;a++)r+=t(e[a],a,e,t)||"";return r}function K(e,t,r,n){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case V:return e.return=e.return||e.value;case U:return"";case X:return e.return=e.value+"{"+Y(e.children,n)+"}";case W:e.value=e.props.join(",")}return y(r=Y(e.children,n))?e.return=e.value+"{"+r+"}":""}function Z(e){return z(J("",null,null,null,[""],e=j(e),0,[0],e))}function J(e,t,r,n,a,i,o,s,c){for(var l=0,d=0,f=o,g=0,v=0,k=0,x=1,w=1,C=1,S=0,A="",_=a,T=i,R=n,I=A;w;)switch(k=S,S=P()){case 40:if(108!=k&&58==m(I,f-1)){-1!=h(I+=p(M(S),"&","&\f"),"&\f")&&(C=-1);break}case 34:case 39:case 91:I+=M(S);break;case 9:case 10:case 13:case 32:I+=N(k);break;case 92:I+=L($()-1,7);continue;case 47:switch(E()){case 42:case 47:b(ee(H(P(),$()),t,r),c);break;default:I+="/"}break;case 123*x:s[l++]=y(I)*C;case 125*x:case 59:case 0:switch(S){case 0:case 125:w=0;case 59+d:-1==C&&(I=p(I,/\f/g,"")),v>0&&y(I)-f&&b(v>32?te(I+";",n,r,f-1):te(p(I," ","")+";",n,r,f-2),c);break;case 59:I+=";";default:if(b(R=Q(I,t,r,l,d,a,s,A,_=[],T=[],f),i),123===S)if(0===d)J(I,t,R,R,_,i,f,s,T);else switch(99===g&&110===m(I,3)?100:g){case 100:case 108:case 109:case 115:J(e,R,R,n&&b(Q(e,R,R,0,0,a,s,A,a,_=[],f),T),a,T,f,s,n?_:T);break;default:J(I,R,R,R,[""],T,0,s,T)}}l=d=v=0,x=C=1,A=I="",f=o;break;case 58:f=1+y(I),v=k;default:if(x<1)if(123==S)--x;else if(125==S&&0==x++&&125==O())continue;switch(I+=u(S),S*x){case 38:C=d>0?1:(I+="\f",-1);break;case 44:s[l++]=(y(I)-1)*C,C=1;break;case 64:45===E()&&(I+=M(P())),g=E(),d=f=y(A=I+=B($())),S++;break;case 45:45===k&&2==y(I)&&(x=0)}}return i}function Q(e,t,r,n,a,i,o,s,c,u,d){for(var h=a-1,m=0===a?i:[""],y=v(m),b=0,k=0,x=0;b<n;++b)for(var w=0,C=g(e,h+1,h=l(k=o[b])),S=e;w<y;++w)(S=f(k>0?m[w]+" "+C:p(C,/&\f/g,m[w])))&&(c[x++]=S);return _(e,t,r,0===a?W:s,c,u,d)}function ee(e,t,r){return _(e,t,r,U,u(S),g(e,2,-2),0)}function te(e,t,r,n){return _(e,t,r,V,g(e,0,n),g(e,n+1,-1),n)}var re=function(e,t,r){for(var n=0,a=0;n=a,a=E(),38===n&&12===a&&(t[r]=1),!I(a);)P();return R(e,C)},ne=new WeakMap,ae=function(e){if("rule"===e.type&&e.parent&&!(e.length<1)){for(var t=e.value,r=e.parent,n=e.column===r.column&&e.line===r.line;"rule"!==r.type;)if(!(r=r.parent))return;if((1!==e.props.length||58===t.charCodeAt(0)||ne.get(r))&&!n){ne.set(e,!0);for(var a=[],i=function(e,t){return z(function(e,t){var r=-1,n=44;do{switch(I(n)){case 0:38===n&&12===E()&&(t[r]=1),e[r]+=re(C-1,t,r);break;case 2:e[r]+=M(n);break;case 4:if(44===n){e[++r]=58===E()?"&\f":"",t[r]=e[r].length;break}default:e[r]+=u(n)}}while(n=P());return e}(j(e),t))}(t,a),o=r.props,s=0,c=0;s<i.length;s++)for(var l=0;l<o.length;l++,c++)e.props[c]=a[s]?i[s].replace(/&\f/g,o[l]):o[l]+" "+i[s]}}},ie=function(e){if("decl"===e.type){var t=e.value;108===t.charCodeAt(0)&&98===t.charCodeAt(2)&&(e.return="",e.value="")}};function oe(e,t){switch(function(e,t){return 45^m(e,0)?(((t<<2^m(e,0))<<2^m(e,1))<<2^m(e,2))<<2^m(e,3):0}(e,t)){case 5103:return G+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return G+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return G+e+D+e+q+e+e;case 6828:case 4268:return G+e+q+e+e;case 6165:return G+e+q+"flex-"+e+e;case 5187:return G+e+p(e,/(\w+).+(:[^]+)/,G+"box-$1$2"+q+"flex-$1$2")+e;case 5443:return G+e+q+"flex-item-"+p(e,/flex-|-self/,"")+e;case 4675:return G+e+q+"flex-line-pack"+p(e,/align-content|flex-|-self/,"")+e;case 5548:return G+e+q+p(e,"shrink","negative")+e;case 5292:return G+e+q+p(e,"basis","preferred-size")+e;case 6060:return G+"box-"+p(e,"-grow","")+G+e+q+p(e,"grow","positive")+e;case 4554:return G+p(e,/([^-])(transform)/g,"$1"+G+"$2")+e;case 6187:return p(p(p(e,/(zoom-|grab)/,G+"$1"),/(image-set)/,G+"$1"),e,"")+e;case 5495:case 3959:return p(e,/(image-set\([^]*)/,G+"$1$`$1");case 4968:return p(p(e,/(.+:)(flex-)?(.*)/,G+"box-pack:$3"+q+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+G+e+e;case 4095:case 3583:case 4068:case 2532:return p(e,/(.+)-inline(.+)/,G+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(y(e)-1-t>6)switch(m(e,t+1)){case 109:if(45!==m(e,t+4))break;case 102:return p(e,/(.+:)(.+)-([^]+)/,"$1"+G+"$2-$3$1"+D+(108==m(e,t+3)?"$3":"$2-$3"))+e;case 115:return~h(e,"stretch")?oe(p(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(115!==m(e,t+1))break;case 6444:switch(m(e,y(e)-3-(~h(e,"!important")&&10))){case 107:return p(e,":",":"+G)+e;case 101:return p(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+G+(45===m(e,14)?"inline-":"")+"box$3$1"+G+"$2$3$1"+q+"$2box$3")+e}break;case 5936:switch(m(e,t+11)){case 114:return G+e+q+p(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return G+e+q+p(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return G+e+q+p(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return G+e+q+e+e}return e}var se=[function(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case V:e.return=oe(e.value,e.length);break;case X:return Y([T(e,{value:p(e.value,"@","@"+G)})],n);case W:if(e.length)return function(e,t){return e.map(t).join("")}(e.props,(function(t){switch(function(e,t){return(e=/(::plac\w+|:read-\w+)/.exec(e))?e[0]:e}(t)){case":read-only":case":read-write":return Y([T(e,{props:[p(t,/:(read-\w+)/,":-moz-$1")]})],n);case"::placeholder":return Y([T(e,{props:[p(t,/:(plac\w+)/,":"+G+"input-$1")]}),T(e,{props:[p(t,/:(plac\w+)/,":-moz-$1")]}),T(e,{props:[p(t,/:(plac\w+)/,q+"input-$1")]})],n)}return""}))}}],ce=function(e){var t=e.key;if("css"===t){var r=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(r,(function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))}))}var n,a,i=e.stylisPlugins||se,o={},s=[];n=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),(function(e){for(var t=e.getAttribute("data-emotion").split(" "),r=1;r<t.length;r++)o[t[r]]=!0;s.push(e)}));var l,u,d,f,p=[K,(f=function(e){l.insert(e)},function(e){e.root||(e=e.return)&&f(e)})],h=(u=[ae,ie].concat(i,p),d=v(u),function(e,t,r,n){for(var a="",i=0;i<d;i++)a+=u[i](e,t,r,n)||"";return a});a=function(e,t,r,n){l=r,Y(Z(e?e+"{"+t.styles+"}":t.styles),h),n&&(m.inserted[t.name]=!0)};var m={key:t,sheet:new c({key:t,container:n,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:o,registered:{},insert:a};return m.sheet.hydrate(s),m},le={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},ue=/[A-Z]|^ms/g,de=/_EMO_([^_]+?)_([^]*?)_EMO_/g,fe=function(e){return 45===e.charCodeAt(1)},pe=function(e){return null!=e&&"boolean"!=typeof e},he=i((function(e){return fe(e)?e:e.replace(ue,"-$&").toLowerCase()})),me=function(e,t){switch(e){case"animation":case"animationName":if("string"==typeof t)return t.replace(de,(function(e,t,r){return ye={name:t,styles:r,next:ye},t}))}return 1===le[e]||fe(e)||"number"!=typeof t||0===t?t:t+"px"};function ge(e,t,r){if(null==r)return"";if(void 0!==r.__emotion_styles)return r;switch(typeof r){case"boolean":return"";case"object":if(1===r.anim)return ye={name:r.name,styles:r.styles,next:ye},r.name;if(void 0!==r.styles){var n=r.next;if(void 0!==n)for(;void 0!==n;)ye={name:n.name,styles:n.styles,next:ye},n=n.next;return r.styles+";"}return function(e,t,r){var n="";if(Array.isArray(r))for(var a=0;a<r.length;a++)n+=ge(e,t,r[a])+";";else for(var i in r){var o=r[i];if("object"!=typeof o)null!=t&&void 0!==t[o]?n+=i+"{"+t[o]+"}":pe(o)&&(n+=he(i)+":"+me(i,o)+";");else if(!Array.isArray(o)||"string"!=typeof o[0]||null!=t&&void 0!==t[o[0]]){var s=ge(e,t,o);switch(i){case"animation":case"animationName":n+=he(i)+":"+s+";";break;default:n+=i+"{"+s+"}"}}else for(var c=0;c<o.length;c++)pe(o[c])&&(n+=he(i)+":"+me(i,o[c])+";")}return n}(e,t,r);case"function":if(void 0!==e){var a=ye,i=r(e);return ye=a,ge(e,t,i)}}if(null==t)return r;var o=t[r];return void 0!==o?o:r}var ye,ve=/label:\s*([^\s;\n{]+)\s*(;|$)/g,be=!!t.useInsertionEffect&&t.useInsertionEffect,ke=be||function(e){return e()},xe=(be||t.useLayoutEffect,t.createContext("undefined"!=typeof HTMLElement?ce({key:"css"}):null));xe.Provider;var we=t.createContext({}),Ce=function(e,t,r){var n=e.key+"-"+t.name;!1===r&&void 0===e.registered[n]&&(e.registered[n]=t.styles)},Se=s,Ae=function(e){return"theme"!==e},_e=function(e){return"string"==typeof e&&e.charCodeAt(0)>96?Se:Ae},Te=function(e,t,r){var n;if(t){var a=t.shouldForwardProp;n=e.__emotion_forwardProp&&a?function(t){return e.__emotion_forwardProp(t)&&a(t)}:a}return"function"!=typeof n&&r&&(n=e.__emotion_forwardProp),n},Oe=function(e){var t=e.cache,r=e.serialized,n=e.isStringTag;return Ce(t,r,n),ke((function(){return function(e,t,r){Ce(e,t,r);var n=e.key+"-"+t.name;if(void 0===e.inserted[t.name]){var a=t;do{e.insert(t===a?"."+n:"",a,e.sheet,!0),a=a.next}while(void 0!==a)}}(t,r,n)})),null},Pe=function e(r,n){var i,o,s=r.__emotion_real===r,c=s&&r.__emotion_base||r;void 0!==n&&(i=n.label,o=n.target);var l=Te(r,n,s),u=l||_e(c),d=!u("as");return function(){var f=arguments,p=s&&void 0!==r.__emotion_styles?r.__emotion_styles.slice(0):[];if(void 0!==i&&p.push("label:"+i+";"),null==f[0]||void 0===f[0].raw)p.push.apply(p,f);else{p.push(f[0][0]);for(var h=f.length,m=1;m<h;m++)p.push(f[m],f[0][m])}var g,y=(g=function(e,r,n){var a,i,s,f,h=d&&e.as||c,m="",g=[],y=e;if(null==e.theme){for(var v in y={},e)y[v]=e[v];y.theme=t.useContext(we)}"string"==typeof e.className?(a=r.registered,i=g,s=e.className,f="",s.split(" ").forEach((function(e){void 0!==a[e]?i.push(a[e]+";"):f+=e+" "})),m=f):null!=e.className&&(m=e.className+" ");var b=function(e,t,r){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var n=!0,a="";ye=void 0;var i=e[0];null==i||void 0===i.raw?(n=!1,a+=ge(r,t,i)):a+=i[0];for(var o=1;o<e.length;o++)a+=ge(r,t,e[o]),n&&(a+=i[o]);ve.lastIndex=0;for(var s,c="";null!==(s=ve.exec(a));)c+="-"+s[1];var l=function(e){for(var t,r=0,n=0,a=e.length;a>=4;++n,a-=4)t=1540483477*(65535&(t=255&e.charCodeAt(n)|(255&e.charCodeAt(++n))<<8|(255&e.charCodeAt(++n))<<16|(255&e.charCodeAt(++n))<<24))+(59797*(t>>>16)<<16),r=1540483477*(65535&(t^=t>>>24))+(59797*(t>>>16)<<16)^1540483477*(65535&r)+(59797*(r>>>16)<<16);switch(a){case 3:r^=(255&e.charCodeAt(n+2))<<16;case 2:r^=(255&e.charCodeAt(n+1))<<8;case 1:r=1540483477*(65535&(r^=255&e.charCodeAt(n)))+(59797*(r>>>16)<<16)}return(((r=1540483477*(65535&(r^=r>>>13))+(59797*(r>>>16)<<16))^r>>>15)>>>0).toString(36)}(a)+c;return{name:l,styles:a,next:ye}}(p.concat(g),r.registered,y);m+=r.key+"-"+b.name,void 0!==o&&(m+=" "+o);var k=d&&void 0===l?_e(h):u,x={};for(var w in e)d&&"as"===w||k(w)&&(x[w]=e[w]);return x.className=m,x.ref=n,t.createElement(t.Fragment,null,t.createElement(Oe,{cache:r,serialized:b,isStringTag:"string"==typeof h}),t.createElement(h,x))},(0,t.forwardRef)((function(e,r){var n=(0,t.useContext)(xe);return g(e,n,r)})));return y.displayName=void 0!==i?i:"Styled("+("string"==typeof c?c:c.displayName||c.name||"Component")+")",y.defaultProps=r.defaultProps,y.__emotion_real=y,y.__emotion_base=c,y.__emotion_styles=p,y.__emotion_forwardProp=l,Object.defineProperty(y,"toString",{value:function(){return"."+o}}),y.withComponent=function(t,r){return e(t,a({},n,r,{shouldForwardProp:Te(y,r,!0)})).apply(void 0,p)},y}}.bind();["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach((function(e){Pe[e]=Pe(e)}));const Ee=window.wp.components,$e=window.lodash,Re=Pe("div")``;function Ie({attributes:e,setAttributes:r}){const{taxonomy:a,restrictToTerm:i}=e;return(0,t.createElement)(Re,null,(0,t.createElement)(n.TaxonomySelect,{value:a,onChange:e=>{r({taxonomy:e})}}),(0,t.createElement)(n.TermSelect,{maxTerms:1,value:(0,$e.has)(i,"name")?[{value:i.name,title:i.name}]:[],taxonomy:a,onChange:e=>{r({restrictToTerm:e})}}))}function je({attributes:e,setAttributes:n}){return(0,t.createElement)(r.InspectorControls,null,(0,t.createElement)(Ee.PanelBody,{title:"Taxonomy Controls"},(0,t.createElement)(Ie,{attributes:e,setAttributes:n})))}const ze=["prc-block-library/form-input-text"],Me=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/taxonomy-search","version":"0.1.0","title":"Taxonomy Search","category":"theme","description":"Search for terms of a specified taxonomy.","icon":"search","attributes":{"taxonomy":{"type":"string","default":"category"},"restrictToTerm":{"type":"object"}},"supports":{"anchor":true,"html":false,"spacing":{"padding":true,"margin":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true},"interactivity":true},"textdomain":"taxonomy-search","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScriptModule":"file:./view.js"}'),{name:Ne}=Me,Le={edit:function({attributes:e,setAttributes:n,context:a,clientId:i}){const o=(0,r.useBlockProps)(),{taxonomy:s}=e,c=(0,r.useInnerBlocksProps)(o,{allowedBlocks:ze,templateLock:!0,template:[["prc-block/form-input-text",{isInteractive:!0,interactiveNamespace:"prc-block/taxonomy-search",placeholder:`Search ${s}`}]]});return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(je,{attributes:e,setAttributes:n,context:a,clientId:i}),(0,t.createElement)("div",{...c}))},save:function(){return(0,t.createElement)(r.InnerBlocks.Content,null)}};(0,e.registerBlockType)(Ne,{...Me,...Le})}},r={};function n(e){var a=r[e];if(void 0!==a)return a.exports;var i=r[e]={exports:{}};return t[e](i,i.exports,n),i.exports}n.m=t,e=[],n.O=(t,r,a,i)=>{if(!r){var o=1/0;for(u=0;u<e.length;u++){for(var[r,a,i]=e[u],s=!0,c=0;c<r.length;c++)(!1&i||o>=i)&&Object.keys(n.O).every((e=>n.O[e](r[c])))?r.splice(c--,1):(s=!1,i<o&&(o=i));if(s){e.splice(u--,1);var l=a();void 0!==l&&(t=l)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[r,a,i]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var a,i,[o,s,c]=r,l=0;if(o.some((t=>0!==e[t]))){for(a in s)n.o(s,a)&&(n.m[a]=s[a]);if(c)var u=c(n)}for(t&&t(r);l<o.length;l++)i=o[l],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(u)},r=globalThis.webpackChunktaxonomy_search=globalThis.webpackChunktaxonomy_search||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var a=n.O(void 0,[350],(()=>n(602)));a=n.O(a)})();
//# sourceMappingURL=index.js.map