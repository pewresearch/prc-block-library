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
(window["wpackioprcBlocksLibraryfollow-usJsonp"]=window["wpackioprcBlocksLibraryfollow-usJsonp"]||[]).push([[3],{0:function(e,t){e.exports=React},153:function(e,t){e.exports=wp.blocks},185:function(e,t,a){a(118),e.exports=a(186)},186:function(e,t,a){"use strict";a.r(t);var s=a(63),i=a(153),l=a(33),c=a(59);Object(i.registerBlockType)("prc-block/follow-us",{title:Object(s.__)("Follow Us"),icon:"format-aside",category:"widgets",keywords:[Object(s.__)("prc"),Object(s.__)("newsletter"),Object(s.__)("follow us")],supports:{html:!1},attributes:{newsletters:{type:"string",default:""},socialMedia:{type:"string",source:"html",selector:".ui.link.list",multiline:"li",default:'<li><a href="#">Twitter</a></li>'}},edit:function(e){var t=e.attributes;return t.setAttributes=!1,t.editMode=!0,!0===e.isSelected&&(t.setAttributes=e.setAttributes),React.createElement(c.a,t,React.createElement(l.RichText.Content,{className:"ui link list",tagName:"div",value:t.socialMedia}))},save:function(e){return React.createElement("div",{className:"js-react-follow-us","data-newsletters":e.attributes.newsletters},React.createElement(l.RichText.Content,{className:"ui link list",tagName:"div",value:e.attributes.socialMedia}))}})},23:function(e,t){e.exports=wp.element},33:function(e,t){e.exports=wp.blockEditor},54:function(e,t){e.exports=ReactDOM},59:function(e,t,a){"use strict";var s=a(34),i=a(35),l=a(36),c=a(17),n=a(37),r=a(18),o=a(23),u=a(33),d=a(60),m=a.n(d),p=a(39),b=a(87),f=a(88),v=a(89),w=a(171),h=a(81),g=a.n(h),R=function(e){function t(e){var a;return Object(s.a)(this,t),a=Object(i.a)(this,Object(l.a)(t).call(this,e)),Object(r.a)(Object(c.a)(a),"componentDidMount",(function(){if(void 0!==a.props.editMode&&!0===a.props.editMode){var e=a.props.newsletters.split(",");0!==e.length&&a.setState({selected:e})}})),Object(r.a)(Object(c.a)(a),"selectNewsletter",(function(e){var t=a.state.selected;if(t.includes(e)){var s=t.indexOf(e);s>-1&&t.splice(s,1)}else t.push(e);a.setState({selected:t})})),Object(r.a)(Object(c.a)(a),"isSelected",(function(e){return!!a.props.newsletters.split(",").includes(e)})),Object(r.a)(Object(c.a)(a),"submitHandler",(function(e){var t=a.setState,s=a.state.selected.join(),i=a.state.email,l={dimmed:!0,loading:!1,message:""};t({loading:!0}),m()({path:"/prc-api/v2/mailchimp/subscribe/?email="+i+"&interests="+s,method:"POST"}).then((function(){l.message="You have succesfully subsrcibed to these newsletter(s)"})).catch((function(e){console.error(e),l.message="Unfortunately we could not susbscribe you at this time. Please try again later."})).finally((function(){t(l)}))})),Object(r.a)(Object(c.a)(a),"selectNewsletters",(function(){var e=window.prcMailchimpBlock.interests;return React.createElement(o.Fragment,null,e.map((function(e,t){return React.createElement("div",{class:"item"},React.createElement(p.a.Field,null,React.createElement(b.a,{label:e.label,value:e.value,checked:(s=e.value,!!a.state.selected.includes(s)),className:"sans-serif",onChange:function(e,t){return function(e){var t=a.state.selected;if(t.includes(e)){var s=t.indexOf(e);s>-1&&t.splice(s,1)}else t.push(e);a.setState({selected:t}),a.props.setAttributes({newsletters:t.join()})}(t.value)}})));var s})))})),Object(r.a)(Object(c.a)(a),"render",(function(){var e=g()(a.props.className,"inverted","beige"),t=window.prcMailchimpBlock.interests,s=a.selectNewsletters;return React.createElement(f.a,{fluid:!0,className:e,style:{marginBottom:"35px"}},React.createElement(f.a.Header,null,"Follow Us"),React.createElement(v.a.Dimmable,{as:"div",className:"content",dimmed:a.state.dimmed},React.createElement("div",{class:"ui sub header"},"Social Media"),!1!==a.props.setAttributes&&React.createElement(u.RichText,{tagName:"ul",value:a.props.socialMedia,onChange:function(e){a.props.setAttributes({socialMedia:e})},formattingControls:["link"],placeholder:a.props.socialMedia,multiline:"li",className:"ui link list"}),!1===a.props.setAttributes&&!0===a.props.editMode&&a.props.children,!1===a.props.setAttributes&&void 0===a.props.editMode&&React.createElement(o.RawHTML,null,a.props.children),React.createElement("div",{class:"ui sub header"},"Newsletters"),React.createElement(p.a,{onSubmit:a.submitHandler},React.createElement("div",{class:"ui list"},!1===a.props.setAttributes&&t.map((function(e,t){if(a.isSelected(e.value))return React.createElement("div",{className:"item"},React.createElement(p.a.Field,null,React.createElement(b.a,{label:e.label,value:e.value,className:"sans-serif",onChange:function(e,t){return a.selectNewsletter(t.value)}})))})),!1!==a.props.setAttributes&&React.createElement(s,null)),React.createElement(p.a.Field,{required:!0},React.createElement(w.a,{fluid:!0,size:"mini",action:{color:"secondary",size:"mini",content:"Sign Up",loading:a.state.loading,style:{justifyContent:"center",width:"auto"}},type:"email",placeholder:"Email Address",value:a.state.email,disabled:a.state.loading,onChange:function(e){return a.setState({email:e.target.value})}}))),React.createElement(v.a,{active:a.state.dimmed,onClickOutside:function(){a.setState({dimmed:!1})}},React.createElement("p",{className:"sans-serif"},a.state.message," (Click to close)"))))})),a.state={email:"",loading:!1,dimmed:!1,message:"",selected:[]},a.setState=a.setState.bind(Object(c.a)(a)),a.submitHandler=a.submitHandler.bind(Object(c.a)(a)),a}return Object(n.a)(t,e),t}(o.Component);t.a=R},60:function(e,t){e.exports=wp.apiFetch},63:function(e,t){e.exports=wp.i18n}},[[185,0,1]]]);
//# sourceMappingURL=main-f1580c59.js.map