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
(window["wpackioprcBlocksLibraryfollow-usJsonp"]=window["wpackioprcBlocksLibraryfollow-usJsonp"]||[]).push([[2],{0:function(e,t){e.exports=React},172:function(e,t){e.exports=wp.domReady},18:function(e,t){e.exports=wp.element},310:function(e,t,a){a(118),e.exports=a(311)},311:function(e,t,a){"use strict";a.r(t);var s=a(18),n=a(172),c=a.n(n),l=a(59);c()((function(){document.querySelector(".js-react-follow-us")&&document.querySelectorAll(".js-react-follow-us").forEach((function(e){var t=e.innerHTML,a={newsletters:e.getAttribute("data-newsletters"),setAttributes:!1};Object(s.render)(React.createElement(l.a,a,t),e)}))}))},32:function(e,t){e.exports=wp.blockEditor},54:function(e,t){e.exports=ReactDOM},59:function(e,t,a){"use strict";var s=a(35),n=a(17),c=a(37),l=a(36),i=a(26),r=a(19),o=a(18),u=a(32),d=a(60),m=a.n(d),p=a(39),f=a(87),b=a(88),v=a(89),h=a(174),w=a(81),R=a.n(w);function g(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,s=Object(i.a)(e);if(t){var n=Object(i.a)(this).constructor;a=Reflect.construct(s,arguments,n)}else a=s.apply(this,arguments);return Object(l.a)(this,a)}}var O=window.prcFollowUsMailchimp.interests,j=function(e){Object(c.a)(a,e);var t=g(a);function a(e){var c;return Object(s.a)(this,a),c=t.call(this,e),Object(r.a)(Object(n.a)(c),"componentDidMount",(function(){if(void 0!==c.props.editMode&&!0===c.props.editMode){var e=c.props.newsletters.split(",");0!==e.length&&c.setState({selected:e})}})),Object(r.a)(Object(n.a)(c),"selectNewsletter",(function(e){var t=c.state.selected;if(t.includes(e)){var a=t.indexOf(e);-1<a&&t.splice(a,1)}else t.push(e);c.setState({selected:t})})),Object(r.a)(Object(n.a)(c),"isSelected",(function(e){return!!c.props.newsletters.split(",").includes(e)})),Object(r.a)(Object(n.a)(c),"submitHandler",(function(e){var t=Object(n.a)(c).setState,a=c.state.selected.join(),s=c.state.email,l={dimmed:!0,loading:!1,message:""};t({loading:!0}),m()({path:"/prc-api/v2/mailchimp/subscribe/?email=".concat(s,"&interests=").concat(a),method:"POST"}).then((function(){l.message="You have succesfully subsrcibed to these newsletter(s)"})).catch((function(e){console.error(e),l.message="Unfortunately we could not susbscribe you at this time. Please try again later."})).finally((function(){t(l)}))})),Object(r.a)(Object(n.a)(c),"selectNewsletters",(function(){return React.createElement(o.Fragment,null,O.map((function(e,t){return React.createElement("div",{className:"item"},React.createElement(p.a.Field,null,React.createElement(f.a,{label:e.label,value:e.value,checked:(a=e.value,!!c.state.selected.includes(a)),className:"sans-serif",onChange:function(e,t){return function(e){var t=c.state.selected;if(t.includes(e)){var a=t.indexOf(e);-1<a&&t.splice(a,1)}else t.push(e);c.setState({selected:t}),c.props.setAttributes({newsletters:t.join()})}(t.value)}})));var a})))})),Object(r.a)(Object(n.a)(c),"render",(function(){console.log("FOLLOW US"),console.log(O);var e=R()(c.props.className,"inverted","beige"),t=c.selectNewsletters;return React.createElement(b.a,{fluid:!0,className:e,style:{marginBottom:"35px"}},React.createElement(b.a.Header,null,"Follow Us"),React.createElement(v.a.Dimmable,{as:"div",className:"content",dimmed:c.state.dimmed},React.createElement("div",{className:"ui sub header"},"Social Media"),!1!==c.props.setAttributes&&React.createElement(u.RichText,{tagName:"ul",value:c.props.socialMedia,onChange:function(e){c.props.setAttributes({socialMedia:e})},formattingControls:["link"],placeholder:c.props.socialMedia,multiline:"li",className:"ui link list"}),!1===c.props.setAttributes&&!0===c.props.editMode&&c.props.children,!1===c.props.setAttributes&&void 0===c.props.editMode&&React.createElement(o.RawHTML,null,c.props.children),React.createElement("div",{className:"ui sub header"},"Newsletters"),React.createElement(p.a,{onSubmit:c.submitHandler},React.createElement("div",{className:"ui list"},!1===c.props.setAttributes&&O.map((function(e,t){if(c.isSelected(e.value))return React.createElement("div",{className:"item"},React.createElement(p.a.Field,null,React.createElement(f.a,{label:e.label,value:e.value,className:"sans-serif",onChange:function(e,t){return c.selectNewsletter(t.value)}})))})),!1!==c.props.setAttributes&&React.createElement(t,null)),React.createElement(p.a.Field,{required:!0},React.createElement(h.a,{fluid:!0,size:"mini",action:{color:"secondary",size:"mini",content:"Sign Up",loading:c.state.loading,style:{justifyContent:"center",width:"auto"}},type:"email",placeholder:"Email Address",value:c.state.email,disabled:c.state.loading,onChange:function(e){return c.setState({email:e.target.value})}}))),React.createElement(v.a,{active:c.state.dimmed,onClickOutside:function(){c.setState({dimmed:!1})}},React.createElement("p",{className:"sans-serif"},c.state.message," (Click to close)"))))})),c.state={email:"",loading:!1,dimmed:!1,message:"",selected:[]},c.setState=c.setState.bind(Object(n.a)(c)),c.submitHandler=c.submitHandler.bind(Object(n.a)(c)),c}return a}(o.Component);t.a=j},60:function(e,t){e.exports=wp.apiFetch}},[[310,0,1]]]);
//# sourceMappingURL=frontend-334f8b60.js.map