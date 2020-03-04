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
(window["wpackioprcBlocksLibraryfollow-usJsonp"]=window["wpackioprcBlocksLibraryfollow-usJsonp"]||[]).push([[2],{0:function(e,t){e.exports=React},23:function(e,t){e.exports=wp.element},308:function(e,t,a){a(118),e.exports=a(309)},309:function(e,t,a){"use strict";a.r(t);var s=a(23),n=a(59);document.addEventListener("DOMContentLoaded",(function(){if(document.querySelector(".js-react-follow-us")){var e=document.querySelectorAll(".js-react-follow-us"),t=!0,a=!1,l=void 0;try{for(var i,c=e[Symbol.iterator]();!(t=(i=c.next()).done);t=!0){var r=i.value,o=r.innerHTML,u={newsletters:r.getAttribute("data-newsletters"),setAttributes:!1};Object(s.render)(React.createElement(n.a,u,o),r)}}catch(e){a=!0,l=e}finally{try{t||null==c.return||c.return()}finally{if(a)throw l}}}}))},33:function(e,t){e.exports=wp.blockEditor},54:function(e,t){e.exports=ReactDOM},59:function(e,t,a){"use strict";var s=a(34),n=a(35),l=a(36),i=a(17),c=a(37),r=a(18),o=a(23),u=a(33),d=a(60),m=a.n(d),p=a(39),b=a(87),f=a(88),v=a(89),h=a(171),w=a(81),R=a.n(w),g=function(e){function t(e){var a;return Object(s.a)(this,t),a=Object(n.a)(this,Object(l.a)(t).call(this,e)),Object(r.a)(Object(i.a)(a),"componentDidMount",(function(){if(void 0!==a.props.editMode&&!0===a.props.editMode){var e=a.props.newsletters.split(",");0!==e.length&&a.setState({selected:e})}})),Object(r.a)(Object(i.a)(a),"selectNewsletter",(function(e){var t=a.state.selected;if(t.includes(e)){var s=t.indexOf(e);s>-1&&t.splice(s,1)}else t.push(e);a.setState({selected:t})})),Object(r.a)(Object(i.a)(a),"isSelected",(function(e){return!!a.props.newsletters.split(",").includes(e)})),Object(r.a)(Object(i.a)(a),"submitHandler",(function(e){var t=a.setState,s=a.state.selected.join(),n=a.state.email,l={dimmed:!0,loading:!1,message:""};t({loading:!0}),m()({path:"/prc-api/v2/mailchimp/subscribe/?email="+n+"&interests="+s,method:"POST"}).then((function(){l.message="You have succesfully subsrcibed to these newsletter(s)"})).catch((function(e){console.error(e),l.message="Unfortunately we could not susbscribe you at this time. Please try again later."})).finally((function(){t(l)}))})),Object(r.a)(Object(i.a)(a),"selectNewsletters",(function(){var e=window.prcMailchimpBlock.interests;return React.createElement(o.Fragment,null,e.map((function(e,t){return React.createElement("div",{class:"item"},React.createElement(p.a.Field,null,React.createElement(b.a,{label:e.label,value:e.value,checked:(s=e.value,!!a.state.selected.includes(s)),className:"sans-serif",onChange:function(e,t){return function(e){var t=a.state.selected;if(t.includes(e)){var s=t.indexOf(e);s>-1&&t.splice(s,1)}else t.push(e);a.setState({selected:t}),a.props.setAttributes({newsletters:t.join()})}(t.value)}})));var s})))})),Object(r.a)(Object(i.a)(a),"render",(function(){var e=R()(a.props.className,"inverted","beige"),t=window.prcMailchimpBlock.interests,s=a.selectNewsletters;return React.createElement(f.a,{fluid:!0,className:e,style:{marginBottom:"35px"}},React.createElement(f.a.Header,null,"Follow Us"),React.createElement(v.a.Dimmable,{as:"div",className:"content",dimmed:a.state.dimmed},React.createElement("div",{class:"ui sub header"},"Social Media"),!1!==a.props.setAttributes&&React.createElement(u.RichText,{tagName:"ul",value:a.props.socialMedia,onChange:function(e){a.props.setAttributes({socialMedia:e})},formattingControls:["link"],placeholder:a.props.socialMedia,multiline:"li",className:"ui link list"}),!1===a.props.setAttributes&&!0===a.props.editMode&&a.props.children,!1===a.props.setAttributes&&void 0===a.props.editMode&&React.createElement(o.RawHTML,null,a.props.children),React.createElement("div",{class:"ui sub header"},"Newsletters"),React.createElement(p.a,{onSubmit:a.submitHandler},React.createElement("div",{class:"ui list"},!1===a.props.setAttributes&&t.map((function(e,t){if(a.isSelected(e.value))return React.createElement("div",{className:"item"},React.createElement(p.a.Field,null,React.createElement(b.a,{label:e.label,value:e.value,className:"sans-serif",onChange:function(e,t){return a.selectNewsletter(t.value)}})))})),!1!==a.props.setAttributes&&React.createElement(s,null)),React.createElement(p.a.Field,{required:!0},React.createElement(h.a,{fluid:!0,size:"mini",action:{color:"secondary",size:"mini",content:"Sign Up",loading:a.state.loading,style:{justifyContent:"center",width:"auto"}},type:"email",placeholder:"Email Address",value:a.state.email,disabled:a.state.loading,onChange:function(e){return a.setState({email:e.target.value})}}))),React.createElement(v.a,{active:a.state.dimmed,onClickOutside:function(){a.setState({dimmed:!1})}},React.createElement("p",{className:"sans-serif"},a.state.message," (Click to close)"))))})),a.state={email:"",loading:!1,dimmed:!1,message:"",selected:[]},a.setState=a.setState.bind(Object(i.a)(a)),a.submitHandler=a.submitHandler.bind(Object(i.a)(a)),a}return Object(c.a)(t,e),t}(o.Component);t.a=g},60:function(e,t){e.exports=wp.apiFetch}},[[308,0,1]]]);
//# sourceMappingURL=frontend-c684736c.js.map