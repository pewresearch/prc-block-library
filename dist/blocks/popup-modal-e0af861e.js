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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[29],{11:function(e,t){e.exports=window.wp.blocks},14:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},2:function(e,t){e.exports=window.wp.i18n},24:function(e,t,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},3:function(e,t){e.exports=window.wp.element},331:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/popup-modal","title":"Popup Modal","icon":"playlist-video","description":"Display content in a modal.","category":"media","attributes":{"title":{"type":"string"},"inverted":{"type":"boolean","default":false}},"styles":[{"name":"default","label":"Default","isDefault":true},{"name":"video","label":"Video"}],"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"parent":["prc-block/popup-controller"]}')},4:function(e,t){e.exports=window.wp.components},5:function(e,t){e.exports=window.wp.blockEditor},908:function(e,t,n){n(24),e.exports=n(981)},981:function(e,t,n){"use strict";n.r(t);var r=n(14),o=n(2),c=n(11),a=n(331),i=n(3),l=n(5),s=n(4),p=function(e){var t=e.attributes,n=e.setAttributes,r=t.title,c=t.inverted,a="is-style-video"===t.className,p=Object(l.useBlockProps)({className:"ui modal active ".concat(a&&!0!==c?"basic":"")}),u=Object(l.useInnerBlocksProps)({className:"content"},{orientation:"vertical",templateLock:!1});return React.createElement(i.Fragment,null,React.createElement(l.InspectorControls,null,React.createElement(s.PanelBody,{title:"Modal Settings"},React.createElement(s.ToggleControl,{label:"Use white background",checked:c,onChange:function(){return n({inverted:!c})}}))),React.createElement("div",p,!0!==a&&React.createElement("div",{class:"header"},React.createElement(l.RichText,{tagName:"h2",value:r,placeholder:Object(o.__)("Modal Title"),multiline:!1,allowedFormats:["core/italic"],onChange:function(e){return n({title:e})}})),React.createElement("div",u)))},u=function(){return React.createElement(l.InnerBlocks.Content,null)};function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var f=a.name,m={edit:p,save:u};Object(c.registerBlockType)(f,d(d({},a),m))}},[[908,0]]]);
//# sourceMappingURL=popup-modal-e0af861e.js.map