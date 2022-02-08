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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[18],{0:function(e,t){e.exports=window.React},10:function(e,t){e.exports=window.wp.blocks},16:function(e,t,a){var r,c=a(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var n={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var r=c(a);if("string"===r||"number"===r)e.push(a);else if(Array.isArray(a)){if(a.length){var o=i.apply(null,a);o&&e.push(o)}}else if("object"===r)if(a.toString===Object.prototype.toString)for(var s in a)n.call(a,s)&&a[s]&&e.push(s);else e.push(a.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===c(a(18))&&a(18)?void 0===(r=function(){return i}.apply(t,[]))||(e.exports=r):window.classNames=i}()},197:function(e,t,a){"use strict";var r=a(5),c=a(27),n=a(13),i=a(19),o=a(999),s=a(8),l=(a(1),a(0)),b=a.n(l),p=a(7),u=a(34),d=a(208),O=a(209),j=a(158),f=a(85),v=a(115);function h(e){var t=e.children,a=e.className,c=e.content,n=e.hidden,i=e.visible,o=Object(s.a)(Object(u.a)(i,"visible"),Object(u.a)(n,"hidden"),"content",a),l=Object(d.a)(h,e),j=Object(O.a)(h,e);return b.a.createElement(j,Object(r.a)({},l,{className:o}),p.a.isNil(t)?c:t)}h.handledProps=["as","children","className","content","hidden","visible"],h.propTypes={};var m=h,y=a(37);function g(e){var t=e.attached,a=e.basic,c=e.buttons,n=e.children,o=e.className,l=e.color,j=e.compact,f=e.content,v=e.floated,h=e.fluid,m=e.icon,w=e.inverted,x=e.labeled,P=e.negative,N=e.positive,E=e.primary,R=e.secondary,k=e.size,I=e.toggle,T=e.vertical,L=e.widths,U=Object(s.a)("ui",l,k,Object(u.a)(a,"basic"),Object(u.a)(j,"compact"),Object(u.a)(h,"fluid"),Object(u.a)(m,"icon"),Object(u.a)(w,"inverted"),Object(u.a)(x,"labeled"),Object(u.a)(P,"negative"),Object(u.a)(N,"positive"),Object(u.a)(E,"primary"),Object(u.a)(R,"secondary"),Object(u.a)(I,"toggle"),Object(u.a)(T,"vertical"),Object(u.b)(t,"attached"),Object(u.c)(v,"floated"),Object(u.e)(L),"buttons",o),B=Object(d.a)(g,e),z=Object(O.a)(g,e);return Object(i.a)(c)?b.a.createElement(z,Object(r.a)({},B,{className:U}),p.a.isNil(n)?f:n):b.a.createElement(z,Object(r.a)({},B,{className:U}),Object(y.a)(c,(function(e){return C.create(e)})))}g.handledProps=["as","attached","basic","buttons","children","className","color","compact","content","floated","fluid","icon","inverted","labeled","negative","positive","primary","secondary","size","toggle","vertical","widths"],g.propTypes={};var w=g;function x(e){var t=e.className,a=e.text,c=Object(s.a)("or",t),n=Object(d.a)(x,e),i=Object(O.a)(x,e);return b.a.createElement(i,Object(r.a)({},n,{className:c,"data-text":a}))}x.handledProps=["as","className","text"],x.propTypes={};var P=x,N=function(e){function t(){for(var t,a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(t=e.call.apply(e,[this].concat(r))||this).ref=Object(l.createRef)(),t.computeElementType=function(){var e=t.props,a=e.attached,r=e.label;if(!Object(i.a)(a)||!Object(i.a)(r))return"div"},t.computeTabIndex=function(e){var a=t.props,r=a.disabled,c=a.tabIndex;return Object(i.a)(c)?r?-1:"div"===e?0:void 0:c},t.focus=function(){return Object(n.a)(t.ref.current,"focus")},t.handleClick=function(e){t.props.disabled?e.preventDefault():Object(n.a)(t.props,"onClick",e,t.props)},t.hasIconClass=function(){var e=t.props,a=e.labelPosition,r=e.children,c=e.content,n=e.icon;return!0===n||n&&(a||p.a.isNil(r)&&Object(i.a)(c))},t}Object(c.a)(t,e);var a=t.prototype;return a.computeButtonAriaRole=function(e){var t=this.props.role;return Object(i.a)(t)?"button"!==e?"button":void 0:t},a.render=function(){var e=this.props,a=e.active,c=e.animated,n=e.attached,l=e.basic,j=e.children,h=e.circular,m=e.className,y=e.color,g=e.compact,w=e.content,x=e.disabled,P=e.floated,N=e.fluid,C=e.icon,E=e.inverted,R=e.label,k=e.labelPosition,I=e.loading,T=e.negative,L=e.positive,U=e.primary,B=e.secondary,z=e.size,A=e.toggle,G=Object(s.a)(y,z,Object(u.a)(a,"active"),Object(u.a)(l,"basic"),Object(u.a)(h,"circular"),Object(u.a)(g,"compact"),Object(u.a)(N,"fluid"),Object(u.a)(this.hasIconClass(),"icon"),Object(u.a)(E,"inverted"),Object(u.a)(I,"loading"),Object(u.a)(T,"negative"),Object(u.a)(L,"positive"),Object(u.a)(U,"primary"),Object(u.a)(B,"secondary"),Object(u.a)(A,"toggle"),Object(u.b)(c,"animated"),Object(u.b)(n,"attached")),_=Object(s.a)(Object(u.b)(k||!!R,"labeled")),D=Object(s.a)(Object(u.a)(x,"disabled"),Object(u.c)(P,"floated")),K=Object(d.a)(t,this.props),S=Object(O.a)(t,this.props,this.computeElementType),J=this.computeTabIndex(S);if(!Object(i.a)(R)){var M=Object(s.a)("ui",G,"button",m),V=Object(s.a)("ui",_,"button",m,D),W=v.a.create(R,{defaultProps:{basic:!0,pointing:"left"===k?"right":"left"},autoGenerateKey:!1});return b.a.createElement(S,Object(r.a)({},K,{className:V,onClick:this.handleClick}),"left"===k&&W,b.a.createElement(o.a,{innerRef:this.ref},b.a.createElement("button",{className:M,"aria-pressed":A?!!a:void 0,disabled:x,tabIndex:J},f.a.create(C,{autoGenerateKey:!1})," ",w)),("right"===k||!k)&&W)}var q=Object(s.a)("ui",G,D,_,"button",m),F=!p.a.isNil(j),H=this.computeButtonAriaRole(S);return b.a.createElement(o.a,{innerRef:this.ref},b.a.createElement(S,Object(r.a)({},K,{className:q,"aria-pressed":A?!!a:void 0,disabled:x&&"button"===S||void 0,onClick:this.handleClick,role:H,tabIndex:J}),F&&j,!F&&f.a.create(C,{autoGenerateKey:!1}),!F&&w))},t}(l.Component);N.handledProps=["active","animated","as","attached","basic","children","circular","className","color","compact","content","disabled","floated","fluid","icon","inverted","label","labelPosition","loading","negative","onClick","positive","primary","role","secondary","size","tabIndex","toggle"],N.propTypes={},N.defaultProps={as:"button"},N.Content=m,N.Group=w,N.Or=P,N.create=Object(j.e)(N,(function(e){return{content:e}}));var C=t.a=N},288:function(e,t,a){"use strict";var r=a(5),c=a(27),n=a(53),i=a(37),o=a(13),s=a(40),l=a(19),b=a(122),p=a(8),u=(a(1),a(0)),d=a.n(u),O=a(208),j=a(151),f=a(34),v=a(209),h=a(7),m=a(158),y=a(197),g=a(85),w=a(115),x=function(e){function t(){for(var a,c=arguments.length,n=new Array(c),i=0;i<c;i++)n[i]=arguments[i];return(a=e.call.apply(e,[this].concat(n))||this).inputRef=Object(u.createRef)(),a.computeIcon=function(){var e=a.props,t=e.loading,r=e.icon;return Object(l.a)(r)?t?"spinner":void 0:r},a.computeTabIndex=function(){var e=a.props,t=e.disabled,r=e.tabIndex;return Object(l.a)(r)?t?-1:void 0:r},a.focus=function(){return a.inputRef.current.focus()},a.select=function(){return a.inputRef.current.select()},a.handleChange=function(e){var t=Object(s.a)(e,"target.value");Object(o.a)(a.props,"onChange",e,Object(r.a)({},a.props,{value:t}))},a.handleChildOverrides=function(e,t){return Object(r.a)({},t,e.props,{ref:function(t){Object(b.a)(e.ref,t),a.inputRef.current=t}})},a.partitionProps=function(){var e=a.props,c=e.disabled,n=e.type,i=a.computeTabIndex(),o=Object(O.a)(t,a.props),s=Object(j.c)(o),l=s[0],b=s[1];return[Object(r.a)({},l,{disabled:c,type:n,tabIndex:i,onChange:a.handleChange,ref:a.inputRef}),b]},a}return Object(c.a)(t,e),t.prototype.render=function(){var e=this,a=this.props,c=a.action,o=a.actionPosition,s=a.children,l=a.className,b=a.disabled,O=a.error,j=a.fluid,x=a.focus,P=a.icon,N=a.iconPosition,C=a.input,E=a.inverted,R=a.label,k=a.labelPosition,I=a.loading,T=a.size,L=a.transparent,U=a.type,B=Object(p.a)("ui",T,Object(f.a)(b,"disabled"),Object(f.a)(O,"error"),Object(f.a)(j,"fluid"),Object(f.a)(x,"focus"),Object(f.a)(E,"inverted"),Object(f.a)(I,"loading"),Object(f.a)(L,"transparent"),Object(f.c)(o,"action")||Object(f.a)(c,"action"),Object(f.c)(N,"icon")||Object(f.a)(P||I,"icon"),Object(f.c)(k,"labeled")||Object(f.a)(R,"labeled"),"input",l),z=Object(v.a)(t,this.props),A=this.partitionProps(),G=A[0],_=A[1];if(!h.a.isNil(s)){var D=Object(i.a)(u.Children.toArray(s),(function(t){return"input"!==t.type?t:Object(u.cloneElement)(t,e.handleChildOverrides(t,G))}));return d.a.createElement(z,Object(r.a)({},_,{className:B}),D)}var K=y.a.create(c,{autoGenerateKey:!1}),S=w.a.create(R,{defaultProps:{className:Object(p.a)("label",Object(n.a)(k,"corner")&&k)},autoGenerateKey:!1});return d.a.createElement(z,Object(r.a)({},_,{className:B}),"left"===o&&K,"right"!==k&&S,Object(m.a)(C||U,{defaultProps:G,autoGenerateKey:!1}),g.a.create(this.computeIcon(),{autoGenerateKey:!1}),"left"!==o&&K,"right"===k&&S)},t}(u.Component);x.handledProps=["action","actionPosition","as","children","className","disabled","error","fluid","focus","icon","iconPosition","input","inverted","label","labelPosition","loading","onChange","size","tabIndex","transparent","type"],x.propTypes={},x.defaultProps={type:"text"},x.create=Object(m.e)(x,(function(e){return{type:e}})),t.a=x},3:function(e,t){e.exports=window.wp.i18n},314:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/livestream","category":"layout","attributes":{"streamUrl":{"type":"string"},"chatUrl":{"type":"string"}},"styles":[{"name":"chat-box-left","label":"Chat Box Left"},{"name":"chat-box-right","label":"Chat Box Right","isDefault":true}],"example":{"attributes":{"streamUrl":"https://vimeo.com/event/1352567/embed","chatUrl":"https://app.sli.do/event/2jtxhrzn"},"viewPortWidth":800},"supports":{"html":false}}')},6:function(e,t){e.exports=window.wp.blockEditor},65:function(e,t){e.exports=window.ReactDOM},863:function(e,t,a){a(24),e.exports=a(936)},936:function(e,t,a){"use strict";a.r(t);var r=a(14),c=a(3),n=a(10),i=a(314),o=a(16),s=a.n(o),l=a(288),b=a(6),p=function(e){var t=e.attributes,a=e.setAttributes,r=t.className,c=t.streamUrl,n=t.chatUrl,i=Object(b.useBlockProps)({className:s()(r)});return React.createElement("div",i,React.createElement("div",{className:"prc-livestream-stream"},"Livestream video embed URL:",React.createElement(l.a,{type:"text",placeholder:"e.g. https://vimeo.com/event/1352567/embed",value:c,onChange:function(e){return a({streamUrl:e.target.value})}})),React.createElement("div",{className:"prc-livestream-chat"},"Livestream chat embed URL:",React.createElement(l.a,{type:"text",placeholder:"e.g. https://app.sli.do/event/2jtxhrzn",value:n,onChange:function(e){return a({chatUrl:e.target.value})}})))},u=function(){return React.createElement(b.InnerBlocks.Content,null)};function d(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function O(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?d(Object(a),!0).forEach((function(t){Object(r.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):d(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var j=i.name,f={title:Object(c.__)("Livestream"),description:"Create Embeddable Livestream with Chat.",keywords:[Object(c.__)("Livestream"),Object(c.__)("Stream"),Object(c.__)("Chat")],icon:"embed-video",edit:p,save:u};Object(n.registerBlockType)(j,O(O({},i),f))}},[[863,0,1,2]]]);
//# sourceMappingURL=livestream-0d086514.js.map