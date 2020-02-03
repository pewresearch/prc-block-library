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
(window.wpackioprcBlocksLibrarypostsJsonp=window.wpackioprcBlocksLibrarypostsJsonp||[]).push([[3],{0:function(t,e){t.exports=React},109:function(t,e){t.exports=wp.blocks},110:function(t,e){t.exports=wp.blockEditor},129:function(t,e,a){a(83),t.exports=a(130)},130:function(t,e,a){"use strict";a.r(e);var s=a(16),r=a(17),c=a(18),i=a(20),l=a(19),n=a(22),u=a(29),o=a(109),M=a(110),j=a(32),p=a(8),b=a(25),N=a(24),m=a(36),g=function(t){function e(t){var a;return Object(s.a)(this,e),a=Object(r.a)(this,Object(c.a)(e).call(this,t)),Object(n.a)(Object(i.a)(a),"componentDidMount",(function(){!1===a.props.attributes.posts&&Object(b.a)(a.props.setAttributes,a.props.attributes.per_page,a.props.attributes.format,a.props.attributes.program)})),Object(n.a)(Object(i.a)(a),"render",(function(){var t=a.props.setAttributes;return!0===a.props.className.includes("is-style-fact-tank")&&(t({format:10818955}),Object(b.a)(a.props.setAttributes,a.props.attributes.per_page,10818955,a.props.attributes.program)),React.createElement(M.InspectorControls,null,React.createElement(j.PanelBody,{title:Object(u.__)("Posts Block Options")},React.createElement(j.TextControl,{label:"Number of Posts",value:Number(a.props.attributes.per_page),onChange:function(e){t({per_page:Number(e)}),Object(b.a)(a.props.setAttributes,e,a.props.attributes.format,a.props.attributes.program)}}),React.createElement(j.SelectControl,{label:"Format",value:a.props.attributes.format,options:[{label:"Report",value:10818957},{label:"Feature",value:10818948},{label:"Fact Tank",value:10818955}],onChange:function(e){t({format:Number(e)}),Object(b.a)(a.props.setAttributes,a.props.attributes.per_page,e,a.props.attributes.program)}}),React.createElement(j.SelectControl,{label:"Research Program",value:a.props.attributes.program,options:[{label:"All Programs",value:0},{label:"Global",value:10818960},{label:"Internet",value:10818962},{label:"Religion",value:10818963},{label:"Journalism",value:10818964}],onChange:function(e){t({program:Number(e)}),Object(b.a)(a.props.setAttributes,a.props.attributes.per_page,a.props.attributes.format,e)}}),React.createElement(j.ToggleControl,{label:"Dynamic Mode",help:a.props.attributes.dynamic?"Updates posts in real time, every 5 minutes.":"Posts are saved statically (will not update in real time).",checked:a.props.attributes.dynamic,onChange:function(){return t({dynamic:!a.props.attributes.dynamic})}}),"wp-block-prc-block-posts is-style-columns"===a.props.className&&React.createElement(j.TextControl,{label:"Column Count",value:Number(a.props.attributes.columns),onChange:function(e){t({columns:e})}})))})),a}return Object(l.a)(e,t),e}(p.Component);Object(o.registerBlockType)("prc-block/posts",{title:Object(u.__)("Posts Block"),icon:"align-left",category:"widgets",keywords:[Object(u.__)("prc"),Object(u.__)("fact tank"),Object(u.__)("posts listing"),Object(u.__)("posts"),Object(u.__)("posts widget"),Object(u.__)("publication listing")],styles:[{name:"list",label:"Simple List",isDefault:!0},{name:"fact-tank",label:"Fact Tank"}],supports:{html:!1},attributes:{title:{type:"string",default:"Title"},format:{type:"integer",default:10818957},program:{type:"integer",default:0},per_page:{type:"integer",default:10},dynamic:{type:"boolean",default:!1},columns:{type:"string",default:"5"},posts:{type:"array",default:!1}},edit:function(t){var e=t.attributes,a=t.attributes.className,s=!1;void 0!==a&&a.includes("is-style-fact-tank")&&(s=!0);var r=!1;return void 0!==a&&a.includes("is-style-list")&&(r=!0),e.className=a,!0===t.isSelected&&(e.setAttributes=t.setAttributes),e.disableLink=!0,React.createElement(p.Fragment,null,!0===t.isSelected&&React.createElement(g,t),React.createElement("div",{className:e.className},!0===s&&React.createElement(m.a,e),!0===r&&React.createElement(N.a,e)))},save:function(t){var e=t.attributes,a=t.attributes.className,s=!1;void 0!==a&&a.includes("is-style-fact-tank")&&(s=!0);var r=!1;return void 0!==a&&a.includes("is-style-list")&&(r=!0),e.className=a,e.disableLink=!1,React.createElement("div",{className:e.className},!0!==t.attributes.dynamic&&!0===s&&React.createElement(m.a,e),!0!==t.attributes.dynamic&&!0===r&&React.createElement(N.a,e),!0===t.attributes.dynamic&&React.createElement("div",{className:"js-react-posts-block","data-title":t.attributes.title,"data-format":t.attributes.format,"data-program":t.attributes.program,"data-number":t.attributes.per_page,"data-style":a}))}})},24:function(t,e,a){"use strict";var s=a(16),r=a(21),c=a(17),i=a(18),l=a(19),n=a(8),u=a(39),o=function(t){function e(t){return Object(s.a)(this,e),Object(c.a)(this,Object(i.a)(e).call(this,t))}return Object(l.a)(e,t),Object(r.a)(e,[{key:"posts",value:function(t){var e=t.data,a=t.disableLink;return React.createElement(u.a,{relaxed:"very",link:!0,divided:!0},!1!==e&&e.map((function(t,e){return!0===a?React.createElement(u.a.Item,null,React.createElement("span",{className:"meta date"},t.date),React.createElement(n.RawHTML,null,t.title)):React.createElement(u.a.Item,null,React.createElement("span",{className:"meta date"},t.date),React.createElement("a",{href:t.link},React.createElement(n.RawHTML,null,t.title)))})))}},{key:"render",value:function(){var t=this.posts;return React.createElement(t,{data:this.props.posts,disableLink:this.props.disableLink})}}]),e}(n.Component);e.a=o},25:function(t,e,a){"use strict";var s=a(43);e.a=function(t,e,a,r){var c=new wp.api.collections.Stub,i={per_page:Number(e),formats:[Number(a)]};0!==r&&(i.programs=Number(r));var l=[];c.fetch({data:i}).then((function(e){for(var a=0;a<e.length;a++)l.push({title:e[a].title.rendered,date:(r=e[a].date,s(r).format("MMM D, YYYY")),link:e[a].link});var r;t({posts:l})}))}},29:function(t,e){t.exports=wp.i18n},32:function(t,e){t.exports=wp.components},35:function(t,e){t.exports=ReactDOM},36:function(t,e,a){"use strict";var s=a(16),r=a(21),c=a(17),i=a(18),l=a(20),n=a(19),u=a(8),o=a(24),M=a(0),j=a.n(M);j.a.createElement("style",null,".fact-tank-logo_svg__cls-2{fill:#ddd9c7}.fact-tank-logo_svg__cls-3{fill:#808184}.fact-tank-logo_svg__cls-4{fill:#231f20}");var p=function(t){function e(t){var a;return Object(s.a)(this,e),(a=Object(c.a)(this,Object(i.a)(e).call(this,t))).svgHeader=a.svgHeader.bind(Object(l.a)(a)),a}return Object(n.a)(e,t),Object(r.a)(e,[{key:"svgHeader",value:function(t){var e=t.svg,a=t.width,s=a/5;return React.createElement("img",{style:{margin:"auto",display:"block"},src:e,width:a+"px",height:s+"px"})}},{key:"render",value:function(){var t=this.svgHeader;return React.createElement("div",{id:"js-fact-tank-widget"},React.createElement(t,{svg:"data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjUgNDAiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZWE5ZTJjO3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS13aWR0aDo0LjcycHg7fS5jbHMtMntmaWxsOiNkZGQ5Yzc7fS5jbHMtM3tmaWxsOiM4MDgxODQ7fS5jbHMtNHtmaWxsOiMyMzFmMjA7fS5jbHMtNXtmaWxsOiNlYTllMmM7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5GYWN0VGFuay1sb2dvczwvdGl0bGU+PHBvbHlsaW5lIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxODUuMjIgMjAuNjkgMTk0LjE1IDEyLjUyIDIwMy4wMyAyMi40MiAyMTkuNjIgNi42MSIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxOTQuMTUgMTkuMjMgMTk0LjE1IDQwLjA4IDIwMC43IDQwLjA4IDIwMC43IDI2LjQ5IDE5NC4xNSAxOS4yMyIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIyMDIuOTMgMjguNTEgMjAyLjkzIDQwLjA4IDIwOS40OCA0MC4wOCAyMDkuNDggMjIuMjUgMjAyLjkzIDI4LjUxIi8+PHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjIxMS43MSAyMC4xMiAyMTEuNzEgNDAuMDggMjE4LjI2IDQwLjA4IDIxOC4yNiAxMy44NyAyMTEuNzEgMjAuMTIiLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMTg1LjM3IDI2LjU2IDE4NS4zNyA0MC4wOCAxOTEuOTIgNDAuMDggMTkxLjkyIDIwLjU3IDE4NS4zNyAyNi41NiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTI3Ljg4LDMuODN2Ni4yM0gxNC4zN1YxOS41SDI0Ljc5djYuMjRIMTQuMzdWNDBINi40NlYzLjgzWiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTQzLjQ4LDMuODMsNTMuNzgsNDBINDUuNjVsLTEuNzktNy40M0gzMy42NkwzMS45Myw0MEgyNC42MUwzNS40NSwzLjgzWm0tNC43Nyw3Ljc1TDM1LjE4LDI2LjM0aDcuMTZaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNNzksMjcuMzFjLS42NSw4LjE5LTUuNDIsMTMuMjMtMTIuNjQsMTMuMjMtOC42OCwwLTEzLjYxLTYuNzgtMTMuNjEtMTguNlM1Ny42MywzLjI4LDY2LjQyLDMuMjhjNC41LDAsNy45MiwxLjc5LDEwLDUuMjcsMS40MiwyLjI3LDIsNC42MSwyLjM0LDguNzNsLTcuMjcuNTRjLS4yMi0zLjE1LS40My00LjM5LTEuMTQtNS42NGE0LjI4LDQuMjgsMCwwLDAtMy45LTIuNDRjLTMuODYsMC01LjQzLDMuNzQtNS40MywxMi44LDAsOC4xOSwxLjU3LDExLjU1LDUuNDMsMTEuNTUsMi44NywwLDQuNS0yLjI4LDUuMDktNy4yN1oiLz48cG9seWdvbiBjbGFzcz0iY2xzLTMiIHBvaW50cz0iOTEuNTEgNDAgOTEuNTEgMy44MyA3OC45NSAzLjgzIDc4Ljk1IDEwLjYxIDg2LjE2IDEwLjYxIDg2LjE2IDQwIDkxLjUxIDQwIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMTIyLDMuODMsMTMyLjI3LDQwaC04LjEzbC0xLjc5LTcuNDNoLTEwLjJMMTEwLjQyLDQwSDEwMy4xTDExMy45NCwzLjgzWm0tNC43Nyw3Ljc1LTMuNTMsMTQuNzZoNy4xNloiLz48cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik0xNDMuODIsMy44MywxNTMsMjYuMjhWMy44M2g2LjE4VjQwaC03LjFsLTExLTI2LjE5VjQwSDEzNVYzLjgzWiIvPjxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTE3MC45NCwzLjgzVjE4LjlsOC43OS0xNS4wN2g4TDE3OC43LDE3LjExLDE4OC41MSw0MGgtOC4xOGwtNi40LTE2LjY1LTMsNC40VjQwSDE2M1YzLjgzWiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtNCIgcG9pbnRzPSI5Mi45MiAzLjgzIDkyLjkyIDQwIDk4LjE3IDQwIDk4LjE3IDEwLjYxIDEwNS41NCAxMC42MSAxMDUuNTQgMy44MyA5Mi45MiAzLjgzIi8+PHBvbHlnb24gY2xhc3M9ImNscy01IiBwb2ludHM9IjE4My42NiAxOC45NyAxODYuMTkgMjMuMDcgMTg3LjM5IDIxLjkxIDE4My42NiAxOC45NyIvPjwvc3ZnPg==",width:"200"}),React.createElement("div",{class:"ui segment inverted beige"},React.createElement("p",null,"NEWS IN THE NUMBERS"),React.createElement(o.a,this.props)))}}]),e}(u.Component);e.a=p},43:function(t,e){t.exports=moment},8:function(t,e){t.exports=wp.element}},[[129,0,1]]]);
//# sourceMappingURL=main-43899660.js.map