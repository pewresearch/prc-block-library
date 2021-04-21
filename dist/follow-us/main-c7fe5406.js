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
(window["wpackioprcBlocksLibraryfollow-usJsonp"]=window["wpackioprcBlocksLibraryfollow-usJsonp"]||[]).push([[3],{0:function(e,t){e.exports=React},10:function(e,t){e.exports=wp.element},131:function(e,t){e.exports=wp.blocks},134:function(e,t,a){var s,r=a(28);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var n={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var s=r(a);if("string"===s||"number"===s)e.push(a);else if(Array.isArray(a)&&a.length){var i=c.apply(null,a);i&&e.push(i)}else if("object"===s)for(var l in a)n.call(a,l)&&a[l]&&e.push(l)}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===r(a(57))&&a(57)?void 0===(s=function(){return c}.apply(t,[]))||(e.exports=s):window.classNames=c}()},151:function(e,t,a){a(126),e.exports=a(160)},160:function(e,t,a){"use strict";a.r(t);var s=a(131),r=a(82),n=a(10),c=a(19),i=a(104);var l=a(134),o=a.n(l);function u(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,s)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?u(Object(a),!0).forEach((function(t){Object(c.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):u(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var d=Object(n.createElement)((function(e){var t=e.className,a=e.isPressed,s=p(p({},function(e,t){if(null==e)return{};var a,s,r=Object(i.a)(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(s=0;s<n.length;s++)a=n[s],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}(e,["className","isPressed"])),{},{className:o()(t,{"is-pressed":a})||void 0,role:"img","aria-hidden":!0,focusable:!1});return Object(n.createElement)("svg",s)}),{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(n.createElement)((function(e){return Object(n.createElement)("path",e)}),{d:"M9 11.8l6.1-4.5c.1.4.4.7.9.7h2c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v.4l-6.4 4.8c-.2-.1-.4-.2-.6-.2H6c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h2c.2 0 .4-.1.6-.2l6.4 4.8v.4c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1h-2c-.5 0-.8.3-.9.7L9 12.2v-.4z"})),m=a(35),f=a(77),b=function(e){var t=e.attributes,a=e.isSelected,s=e.setAttributes,r=t;return r.setAttributes=!1,r.editMode=!0,!0===a&&(r.setAttributes=s),React.createElement(f.a,r,React.createElement(m.RichText.Content,{className:"ui link list",tagName:"div",value:r.socialMedia}))},v=function(e){var t=e.attributes,a=t.newsletters,s=t.socialMedia;return React.createElement("div",{className:"js-react-follow-us","data-newsletters":a},React.createElement(m.RichText.Content,{className:"ui link list",tagName:"div",value:s}))},O={title:Object(r.__)("Follow Us"),icon:d,category:"widgets",keywords:[Object(r.__)("prc"),Object(r.__)("newsletter"),Object(r.__)("follow us")],supports:{html:!1},attributes:{newsletters:{type:"string",default:""},socialMedia:{type:"string",source:"html",selector:".ui.link.list",multiline:"li",default:'<li><a href="#">Twitter</a></li>'}},edit:b,save:v};Object(s.registerBlockType)("prc-block/follow-us",O)},35:function(e,t){e.exports=wp.blockEditor},66:function(e,t){e.exports=ReactDOM},77:function(e,t,a){"use strict";var s=a(83),r=a(11),n=a(84),c=a(86),i=a(73),l=a(19),o=a(10),u=a(35),p=a(78),d=a.n(p),m=a(49),f=a(117),b=a(115),v=a(116),O=a(137),h=a(87),w=a.n(h);function j(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,s=Object(i.a)(e);if(t){var r=Object(i.a)(this).constructor;a=Reflect.construct(s,arguments,r)}else a=s.apply(this,arguments);return Object(c.a)(this,a)}}var g=window.prcFollowUsMailchimp.interests,y=function(e){Object(n.a)(a,e);var t=j(a);function a(e){var n;return Object(s.a)(this,a),n=t.call(this,e),Object(l.a)(Object(r.a)(n),"componentDidMount",(function(){if(void 0!==n.props.editMode&&!0===n.props.editMode){var e=n.props.newsletters.split(",");0!==e.length&&n.setState({selected:e})}})),Object(l.a)(Object(r.a)(n),"selectNewsletter",(function(e){var t=n.state.selected;if(t.includes(e)){var a=t.indexOf(e);-1<a&&t.splice(a,1)}else t.push(e);n.setState({selected:t})})),Object(l.a)(Object(r.a)(n),"isSelected",(function(e){return!!n.props.newsletters.split(",").includes(e)})),Object(l.a)(Object(r.a)(n),"submitHandler",(function(e){var t=Object(r.a)(n).setState,a=n.state.selected.join(),s=n.state.email,c={dimmed:!0,loading:!1,message:""};t({loading:!0}),d()({path:"/prc-api/v2/mailchimp/subscribe/?email=".concat(s,"&interests=").concat(a),method:"POST"}).then((function(){c.message="You have succesfully subsrcibed to these newsletter(s)"})).catch((function(e){c.message="Unfortunately we could not susbscribe you at this time. Please try again later."})).finally((function(){t(c)}))})),Object(l.a)(Object(r.a)(n),"selectNewsletters",(function(){return React.createElement(o.Fragment,null,g.map((function(e,t){return React.createElement("div",{className:"item"},React.createElement(m.a.Field,null,React.createElement(f.a,{label:e.label,value:e.value,checked:(a=e.value,!!n.state.selected.includes(a)),className:"sans-serif",onChange:function(e,t){return function(e){var t=n.state.selected;if(t.includes(e)){var a=t.indexOf(e);-1<a&&t.splice(a,1)}else t.push(e);n.setState({selected:t}),n.props.setAttributes({newsletters:t.join()})}(t.value)}})));var a})))})),Object(l.a)(Object(r.a)(n),"render",(function(){var e=w()(n.props.className,"inverted","beige"),t=n.selectNewsletters;return React.createElement(b.a,{fluid:!0,className:e,style:{marginBottom:"35px"}},React.createElement(b.a.Header,null,"Follow Us"),React.createElement(v.a.Dimmable,{as:"div",className:"content",dimmed:n.state.dimmed},React.createElement("div",{className:"ui sub header"},"Social Media"),!1!==n.props.setAttributes&&React.createElement(u.RichText,{tagName:"ul",value:n.props.socialMedia,onChange:function(e){n.props.setAttributes({socialMedia:e})},formattingControls:["link"],placeholder:n.props.socialMedia,multiline:"li",className:"ui link list"}),!1===n.props.setAttributes&&!0===n.props.editMode&&n.props.children,!1===n.props.setAttributes&&void 0===n.props.editMode&&React.createElement(o.RawHTML,null,n.props.children),React.createElement("div",{className:"ui sub header"},"Newsletters"),React.createElement(m.a,{onSubmit:n.submitHandler},React.createElement("div",{className:"ui list"},!1===n.props.setAttributes&&g.map((function(e,t){if(n.isSelected(e.value))return React.createElement("div",{className:"item"},React.createElement(m.a.Field,null,React.createElement(f.a,{label:e.label,value:e.value,className:"sans-serif",onChange:function(e,t){return n.selectNewsletter(t.value)}})))})),!1!==n.props.setAttributes&&React.createElement(t,null)),React.createElement(m.a.Field,{required:!0},React.createElement(O.a,{fluid:!0,size:"mini",action:{color:"secondary",size:"mini",content:"Sign Up",loading:n.state.loading,style:{justifyContent:"center",width:"auto"}},type:"email",placeholder:"Email Address",value:n.state.email,disabled:n.state.loading,onChange:function(e){return n.setState({email:e.target.value})}}))),React.createElement(v.a,{active:n.state.dimmed,onClickOutside:function(){n.setState({dimmed:!1})}},React.createElement("p",{className:"sans-serif"},n.state.message," (Click to close)"))))})),n.state={email:"",loading:!1,dimmed:!1,message:"",selected:[]},n.setState=n.setState.bind(Object(r.a)(n)),n.submitHandler=n.submitHandler.bind(Object(r.a)(n)),n}return a}(o.Component);t.a=y},78:function(e,t){e.exports=wp.apiFetch},82:function(e,t){e.exports=wp.i18n}},[[151,0,1]]]);
//# sourceMappingURL=main-c7fe5406.js.map