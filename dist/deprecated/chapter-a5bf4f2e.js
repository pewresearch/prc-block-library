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
(window.wpackioprcBlocksLibrarydeprecatedJsonp=window.wpackioprcBlocksLibrarydeprecatedJsonp||[]).push([[1],[function(e,t){e.exports=window.wp.i18n},function(e,t){e.exports=window.wp.element},function(e,t){e.exports=window.wp.blockEditor},function(e,t){e.exports=window.wp.components},function(e,t,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},function(e,t){e.exports=window.wp.blocks},function(e){e.exports=JSON.parse('{"name":"prc-block/chapter","category":"text","attributes":{"value":{"type":"string","multiline":"br"},"id":{"type":"string"},"level":{"type":"integer","default":3}}}')},function(e,t){e.exports=window.wp.primitives},,,function(e,t){e.exports=window.wp.url},function(e,t){e.exports=window.wp.keycodes},,,,,function(e,t,n){n(4),e.exports=n(20)},,,,function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.r(t);var o=n(5),a=n(0),c=n(1),l=n(7),i=Object(c.createElement)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(l.Path,{d:"M11.1 15.8H20v-1.5h-8.9v1.5zm0-8.6v1.5H20V7.2h-8.9zM5 6.7V10h1V5.3L3.8 6l.4 1 .8-.3zm-.4 5.7c-.3.1-.5.2-.7.3l.1 1.1c.2-.2.5-.4.8-.5.3-.1.6 0 .7.1.2.3 0 .8-.2 1.1-.5.8-.9 1.6-1.4 2.5h2.7v-1h-1c.3-.6.8-1.4.9-2.1.1-.3 0-.8-.2-1.1-.5-.6-1.3-.5-1.7-.4z"})),s=n(6),p=n(2),u=n(3),v=n(10),h=n(11),d=function(e){var t=e.level,n=e.isPressed,r=void 0!==n&&n,o={1:"M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z",2:"M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z",3:"M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z",4:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm10-2h-1v2h-2v-2h-5v-2l4-6h3v6h1v2zm-3-2V7l-2.8 4H16z",5:"M12.1 12.2c.4.3.7.5 1.1.7.4.2.9.3 1.3.3.5 0 1-.1 1.4-.4.4-.3.6-.7.6-1.1 0-.4-.2-.9-.6-1.1-.4-.3-.9-.4-1.4-.4H14c-.1 0-.3 0-.4.1l-.4.1-.5.2-1-.6.3-5h6.4v1.9h-4.3L14 8.8c.2-.1.5-.1.7-.2.2 0 .5-.1.7-.1.5 0 .9.1 1.4.2.4.1.8.3 1.1.6.3.2.6.6.8.9.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4-.2.4-.5.8-.9 1.1-.4.3-.8.5-1.3.7-.5.2-1 .3-1.5.3-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1-.1-.1 1-1.5 1-1.5zM9 15H7v-4H3v4H1V5h2v4h4V5h2v10z",6:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm8.6-7.5c-.2-.2-.5-.4-.8-.5-.6-.2-1.3-.2-1.9 0-.3.1-.6.3-.8.5l-.6.9c-.2.5-.2.9-.2 1.4.4-.3.8-.6 1.2-.8.4-.2.8-.3 1.3-.3.4 0 .8 0 1.2.2.4.1.7.3 1 .6.3.3.5.6.7.9.2.4.3.8.3 1.3s-.1.9-.3 1.4c-.2.4-.5.7-.8 1-.4.3-.8.5-1.2.6-1 .3-2 .3-3 0-.5-.2-1-.5-1.4-.9-.4-.4-.8-.9-1-1.5-.2-.6-.3-1.3-.3-2.1s.1-1.6.4-2.3c.2-.6.6-1.2 1-1.6.4-.4.9-.7 1.4-.9.6-.3 1.1-.4 1.7-.4.7 0 1.4.1 2 .3.5.2 1 .5 1.4.8 0 .1-1.3 1.4-1.3 1.4zm-2.4 5.8c.2 0 .4 0 .6-.1.2 0 .4-.1.5-.2.1-.1.3-.3.4-.5.1-.2.1-.5.1-.7 0-.4-.1-.8-.4-1.1-.3-.2-.7-.3-1.1-.3-.3 0-.7.1-1 .2-.4.2-.7.4-1 .7 0 .3.1.7.3 1 .1.2.3.4.4.6.2.1.3.3.5.3.2.1.5.2.7.1z"};return o.hasOwnProperty(t)?React.createElement(u.SVG,{width:"24",height:"24",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",isPressed:r},React.createElement(u.Path,{d:o[t]})):null},w=[2,3],m={className:"block-library-heading-level-dropdown",isAlternate:!0},b=function(e){var t=e.selectedLevel,n=e.onChange;return React.createElement(u.Dropdown,{popoverProps:m,renderToggle:function(e){var n=e.onToggle,r=e.isOpen;return React.createElement(u.ToolbarButton,{"aria-expanded":r,"aria-haspopup":"true",icon:React.createElement(d,{level:t}),label:Object(a.__)("Change heading level"),onClick:n,onKeyDown:function(e){r||e.keyCode!==h.DOWN||(e.preventDefault(),e.stopPropagation(),n())},showTooltip:!0})},renderContent:function(){return React.createElement(u.Toolbar,{className:"block-library-heading-level-toolbar",label:Object(a.__)("Change heading level")},React.createElement(u.ToolbarGroup,{isCollapsed:!1,controls:w.map((function(e){var r=e===t;return{icon:React.createElement(d,{level:e,isPressed:r}),title:Object(a.sprintf)(Object(a.__)("Heading %d"),e),isActive:r,onClick:function(){n(e)}}}))}))}})};window.prcBlocksLegacyChapterWarning=!1;var f,g=function(e){var t=e.attributes,n=e.className,r=e.setAttributes,o=t.value,l=t.level,i="h".concat(l);return Object(c.useEffect)((function(){!0!==window.prcBlocksLegacyChapterWarning&&(window.prcBlocksLegacyChapterWarning=!0,alert("Legacy PRC Chapter block detected! Please click on the PRC Chapter blocks in this document and conver them to Heading blocks."))}),[]),React.createElement(c.Fragment,null,React.createElement(p.RichText,{tagName:i,value:o,onChange:function(e){var t=Object(v.cleanForSlug)(e);r({value:e,id:t})},placeholder:Object(a.__)("Chapter Title Here"),allowedFormats:[],keepPlaceholderOnFocus:!0,className:n}),React.createElement(p.BlockControls,null,React.createElement(u.ToolbarGroup,null,React.createElement(b,{selectedLevel:l,onChange:function(e){return r({level:e})}}))))},y=function(e){var t=e.attributes,n=e.className,r=t.id,o=t.value,a=t.level,c="h".concat(a);return React.createElement(p.RichText.Content,{value:o,tagName:c,className:n,id:r})},k=s.name,H=s.category,C=s.attributes,V=[k,{title:Object(a.__)("PRC Chapter"),description:Object(a.__)("Build a table of contents for this post using the chapter block."),icon:i,category:H,attributes:C,example:{attributes:{value:"Chapter Title"}},edit:g,save:y,supports:{inserter:!1}}];o.registerBlockType.apply(void 0,function(e){if(Array.isArray(e))return r(e)}(f=V)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(f)||function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(f)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())}],[[16,0]]]);
//# sourceMappingURL=chapter-a5bf4f2e.js.map