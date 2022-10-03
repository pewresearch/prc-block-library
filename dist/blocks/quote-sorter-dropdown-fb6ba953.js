/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.17
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[45],{1:function(e,t){e.exports=window.React},11:function(e,t){function n(t){return e.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,n(t)}e.exports=n,e.exports.__esModule=!0,e.exports.default=e.exports},12:function(e,t,n){var r,o=n(11);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=o(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)){if(n.length){var c=a.apply(null,n);c&&e.push(c)}}else if("object"===r)if(n.toString===Object.prototype.toString)for(var s in n)i.call(n,s)&&n[s]&&e.push(s);else e.push(n.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):"object"===o(n(13))&&n(13)?void 0===(r=function(){return a}.apply(t,[]))||(e.exports=r):window.classNames=a}()},126:function(e,t,n){"use strict";function r(e,t){return(r=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}n.d(t,"a",(function(){return r}))},13:function(e,t){(function(t){e.exports=t}).call(this,{})},14:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},15:function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}n.d(t,"a",(function(){return r}))},155:function(e,t,n){"use strict";function r(e){return(r=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}n.d(t,"a",(function(){return r}))},17:function(e,t,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},18:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(23);var o=n(20),i=n(24);function a(e,t){return Object(r.a)(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}}(e,t)||Object(o.a)(e,t)||Object(i.a)()}},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(14);function o(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},213:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}n.d(t,"a",(function(){return r}))},214:function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}n.d(t,"a",(function(){return o}))},215:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(126);function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&Object(r.a)(e,t)}},216:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(15),o=n(96);function i(e,t){if(t&&("object"===Object(r.a)(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return Object(o.a)(e)}},23:function(e,t,n){"use strict";function r(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return r}))},24:function(e,t,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return r}))},3:function(e,t){e.exports=window.wp.components},4:function(e,t){e.exports=window.wp.element},415:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/quote-sorter-dropdown","title":"Quote Sorter – Filter","icon":"arrow-down-alt2","description":"Child block for filtering the categories for the quote sorter block.","category":"layout","attributes":{"typologies":{"type":"string"},"placeholder":{"type":"string","default":"Filter"},"sortedTypologies":{"type":"array","default":[]},"includeResetFilter":{"type":"boolean","default":false},"resetLanguage":{"type":"string","default":"View all"},"hasDynamicTextElement":{"type":"boolean","default":false},"dynamicTextBlockId":{"type":"string"}},"styles":[{"name":"dropdown","label":"Dropdown","isDefault":true},{"name":"list-inline","label":"List - Inline"},{"name":"list-column","label":"List - Column"}],"supports":{"html":false},"ancestor":["prc-block/quote-sorter"],"usesContext":["prc-block/quote-sorter-hash","prc-block/quote-sorter-typologies"]}')},47:function(e,t,n){"use strict";function r(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}n.d(t,"a",(function(){return r}))},48:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(14);var o=n(47),i=n(20);function a(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||Object(o.a)(e)||Object(i.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},49:function(e,t){e.exports=window.ReactDOM},5:function(e,t){e.exports=window.wp.blockEditor},7:function(e,t){e.exports=window.wp.blocks},8:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},96:function(e,t,n){"use strict";function r(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}n.d(t,"a",(function(){return r}))},988:function(e,t,n){n(17),e.exports=n(997)},997:function(e,t,n){"use strict";n.r(t);var r=n(8),o=n(2),i=n(7),a=n(415),c=n(12),s=n.n(c),l=n(4),u=n(5),d=n(3),f=n(18),p=n(213),g=n(214),m=n(215),h=n(216),b=n(155),v=n(1),y=n(49),O=n(48);function w(e,t,n){return(e=e.slice()).splice(n<0?e.length+n:n,0,e.splice(t,1)[0]),e}function x(e){var t=window.getComputedStyle(e);return Math.max(parseInt(t["margin-top"],10),parseInt(t["margin-bottom"],10))+e.getBoundingClientRect().height}function j(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;e&&(null!==t&&null!==n?e.style.transform="translate(".concat(n,"px, ").concat(t,"px)"):e.style.removeProperty("transform"))}function D(e,t,n){e&&(e.style.transition="transform ".concat(t,"ms").concat(n?" ".concat(n):""))}var S=function(e){var t=[],n=null,r=function(){for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];t=o,n||(n=requestAnimationFrame((function(){n=null,e.apply(void 0,Object(O.a)(t))})))};return r.cancel=function(){n&&cancelAnimationFrame(n)},r};function E(e,t){for(var n=["input","textarea","select","option","optgroup","video","audio","button","a"],r=["button","link","checkbox","tab"];e!==t;){if(e.getAttribute("data-movable-handle"))return!1;if(n.includes(e.tagName.toLowerCase()))return!0;var o=e.getAttribute("role");if(o&&r.includes(o.toLowerCase()))return!0;if("label"===e.tagName.toLowerCase()&&e.hasAttribute("for"))return!0;e.tagName&&(e=e.parentElement)}return!1}function R(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function I(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?R(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function T(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(b.a)(e);if(t){var o=Object(b.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(h.a)(this,n)}}var k=function(e){Object(m.a)(n,e);var t=T(n);function n(e){var r;return Object(p.a)(this,n),(r=t.call(this,e)).listRef=v.createRef(),r.ghostRef=v.createRef(),r.topOffsets=[],r.itemTranslateOffsets=[],r.initialYOffset=0,r.lastScroll=0,r.lastYOffset=0,r.lastListYOffset=0,r.needle=-1,r.afterIndex=-2,r.state={itemDragged:-1,itemDraggedOutOfBounds:-1,selectedItem:-1,initialX:0,initialY:0,targetX:0,targetY:0,targetHeight:0,targetWidth:0,liveText:"",scrollingSpeed:0,scrollWindow:!1},r.doScrolling=function(){var e=r.state,t=e.scrollingSpeed,n=e.scrollWindow,o=r.listRef.current;window.requestAnimationFrame((function(){n?window.scrollTo(window.pageXOffset,window.pageYOffset+1.5*t):o.scrollTop+=t,0!==t&&r.doScrolling()}))},r.getChildren=function(){return r.listRef&&r.listRef.current?Array.from(r.listRef.current.children):(console.warn("No items found in the List container. Did you forget to pass & spread the `props` param in renderList?"),[])},r.calculateOffsets=function(){r.topOffsets=r.getChildren().map((function(e){return e.getBoundingClientRect().top})),r.itemTranslateOffsets=r.getChildren().map((function(e){return x(e)}))},r.getTargetIndex=function(e){return r.getChildren().findIndex((function(t){return t===e.target||t.contains(e.target)}))},r.onMouseOrTouchStart=function(e){r.dropTimeout&&r.state.itemDragged>-1&&(window.clearTimeout(r.dropTimeout),r.finishDrop());var t,n=(t=e).touches&&t.touches.length||t.changedTouches&&t.changedTouches.length;if(n||0===e.button){var o=r.getTargetIndex(e);if(-1===o||r.props.values[o]&&r.props.values[o].disabled)-1!==r.state.selectedItem&&(r.setState({selectedItem:-1}),r.finishDrop());else{var i=r.getChildren()[o],a=i.querySelector("[data-movable-handle]");if((!a||a.contains(e.target))&&!E(e.target,i)){if(e.preventDefault(),r.props.beforeDrag&&r.props.beforeDrag({elements:r.getChildren(),index:o}),n){var c={passive:!1};i.style.touchAction="none",document.addEventListener("touchend",r.schdOnEnd,c),document.addEventListener("touchmove",r.schdOnTouchMove,c),document.addEventListener("touchcancel",r.schdOnEnd,c)}else{document.addEventListener("mousemove",r.schdOnMouseMove),document.addEventListener("mouseup",r.schdOnEnd);var s=r.getChildren()[r.state.itemDragged];s&&s.style&&(s.style.touchAction="")}r.onStart(i,n?e.touches[0].clientX:e.clientX,n?e.touches[0].clientY:e.clientY,o)}}}},r.getYOffset=function(){var e=r.listRef.current?r.listRef.current.scrollTop:0;return window.pageYOffset+e},r.onStart=function(e,t,n,o){r.state.selectedItem>-1&&(r.setState({selectedItem:-1}),r.needle=-1);var i=e.getBoundingClientRect(),a=window.getComputedStyle(e);r.calculateOffsets(),r.initialYOffset=r.getYOffset(),r.lastYOffset=window.pageYOffset,r.lastListYOffset=r.listRef.current.scrollTop,r.setState({itemDragged:o,targetX:i.left-parseInt(a["margin-left"],10),targetY:i.top-parseInt(a["margin-top"],10),targetHeight:i.height,targetWidth:i.width,initialX:t,initialY:n})},r.onMouseMove=function(e){e.cancelable&&e.preventDefault(),r.onMove(e.clientX,e.clientY)},r.onTouchMove=function(e){e.cancelable&&e.preventDefault(),r.onMove(e.touches[0].clientX,e.touches[0].clientY)},r.onWheel=function(e){r.state.itemDragged<0||(r.lastScroll=r.listRef.current.scrollTop+=e.deltaY,r.moveOtherItems())},r.onMove=function(e,t){if(-1===r.state.itemDragged)return null;j(r.ghostRef.current,t-r.state.initialY,r.props.lockVertically?0:e-r.state.initialX),r.autoScrolling(t),r.moveOtherItems()},r.moveOtherItems=function(){var e=r.ghostRef.current.getBoundingClientRect(),t=e.top+e.height/2,n=x(r.getChildren()[r.state.itemDragged]),o=r.getYOffset();r.initialYOffset!==o&&(r.topOffsets=r.topOffsets.map((function(e){return e-(o-r.initialYOffset)})),r.initialYOffset=o),r.isDraggedItemOutOfBounds()&&r.props.removableByMove?r.afterIndex=r.topOffsets.length+1:r.afterIndex=function(e,t){for(var n,r=0,o=e.length-1;r<=o;){if(!e[(n=Math.floor((o+r)/2))+1]||e[n]<=t&&e[n+1]>=t)return n;e[n]<t&&e[n+1]<t?r=n+1:o=n-1}return-1}(r.topOffsets,t),r.animateItems(-1===r.afterIndex?0:r.afterIndex,r.state.itemDragged,n)},r.autoScrolling=function(e){var t=r.listRef.current.getBoundingClientRect(),n=t.top,o=t.bottom,i=t.height,a=window.innerHeight||document.documentElement.clientHeight;if(o>a&&a-e<200)r.setState({scrollingSpeed:Math.round((200-(a-e))/10),scrollWindow:!0});else if(n<0&&e<200)r.setState({scrollingSpeed:Math.round((200-e)/-10),scrollWindow:!0});else if(r.state.scrollWindow&&0!==r.state.scrollingSpeed&&r.setState({scrollingSpeed:0,scrollWindow:!1}),i+20<r.listRef.current.scrollHeight){var c=0;e-n<200?c=Math.round((200-(e-n))/-10):o-e<200&&(c=Math.round((200-(o-e))/10)),r.state.scrollingSpeed!==c&&r.setState({scrollingSpeed:c})}},r.animateItems=function(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];r.getChildren().forEach((function(i,a){if(D(i,r.props.transitionDuration),t===a&&o){if(t===e)return j(i,null);j(i,t<e?r.itemTranslateOffsets.slice(t+1,e+1).reduce((function(e,t){return e+t}),0):-1*r.itemTranslateOffsets.slice(e,t).reduce((function(e,t){return e+t}),0))}else j(i,t<e&&a>t&&a<=e?-n:a<t&&t>e&&a>=e?n:null)}))},r.isDraggedItemOutOfBounds=function(){var e=r.getChildren()[r.state.itemDragged].getBoundingClientRect(),t=r.ghostRef.current.getBoundingClientRect();return Math.abs(e.left-t.left)>t.width?(-1===r.state.itemDraggedOutOfBounds&&r.setState({itemDraggedOutOfBounds:r.state.itemDragged}),!0):(r.state.itemDraggedOutOfBounds>-1&&r.setState({itemDraggedOutOfBounds:-1}),!1)},r.onEnd=function(e){e.cancelable&&e.preventDefault(),document.removeEventListener("mousemove",r.schdOnMouseMove),document.removeEventListener("touchmove",r.schdOnTouchMove),document.removeEventListener("mouseup",r.schdOnEnd),document.removeEventListener("touchup",r.schdOnEnd),document.removeEventListener("touchcancel",r.schdOnEnd);var t=r.props.removableByMove&&r.isDraggedItemOutOfBounds();!t&&r.props.transitionDuration>0&&-2!==r.afterIndex&&S((function(){D(r.ghostRef.current,r.props.transitionDuration,"cubic-bezier(.2,1,.1,1)"),r.afterIndex<1&&0===r.state.itemDragged?j(r.ghostRef.current,0,0):j(r.ghostRef.current,-(window.pageYOffset-r.lastYOffset)-(r.listRef.current.scrollTop-r.lastListYOffset)+(r.state.itemDragged<r.afterIndex?r.itemTranslateOffsets.slice(r.state.itemDragged+1,r.afterIndex+1).reduce((function(e,t){return e+t}),0):-1*r.itemTranslateOffsets.slice(r.afterIndex<0?0:r.afterIndex,r.state.itemDragged).reduce((function(e,t){return e+t}),0)),0)}))(),r.dropTimeout=window.setTimeout(r.finishDrop,t||-2===r.afterIndex?0:r.props.transitionDuration)},r.finishDrop=function(){var e=r.props.removableByMove&&r.isDraggedItemOutOfBounds();(e||r.afterIndex>-2&&r.state.itemDragged!==r.afterIndex)&&r.props.onChange({oldIndex:r.state.itemDragged,newIndex:e?-1:Math.max(r.afterIndex,0),targetRect:r.ghostRef.current.getBoundingClientRect()}),r.getChildren().forEach((function(e){D(e,0),j(e,null),e.style.touchAction=""})),r.setState({itemDragged:-1,scrollingSpeed:0}),r.afterIndex=-2,r.lastScroll>0&&(r.listRef.current.scrollTop=r.lastScroll,r.lastScroll=0)},r.onKeyDown=function(e){var t=r.state.selectedItem,n=r.getTargetIndex(e);if(!E(e.target,e.currentTarget)&&-1!==n){if(" "===e.key&&(e.preventDefault(),t===n?(t!==r.needle&&(r.getChildren().forEach((function(e){D(e,0),j(e,null)})),r.props.onChange({oldIndex:t,newIndex:r.needle,targetRect:r.getChildren()[r.needle].getBoundingClientRect()}),r.getChildren()[r.needle].focus()),r.setState({selectedItem:-1,liveText:r.props.voiceover.dropped(t+1,r.needle+1)}),r.needle=-1):(r.setState({selectedItem:n,liveText:r.props.voiceover.lifted(n+1)}),r.needle=n,r.calculateOffsets())),("ArrowDown"===e.key||"j"===e.key)&&t>-1&&r.needle<r.props.values.length-1){e.preventDefault();var o=x(r.getChildren()[t]);r.needle++,r.animateItems(r.needle,t,o,!0),r.setState({liveText:r.props.voiceover.moved(r.needle+1,!1)})}if(("ArrowUp"===e.key||"k"===e.key)&&t>-1&&r.needle>0){e.preventDefault();var i=x(r.getChildren()[t]);r.needle--,r.animateItems(r.needle,t,i,!0),r.setState({liveText:r.props.voiceover.moved(r.needle+1,!0)})}"Escape"===e.key&&t>-1&&(r.getChildren().forEach((function(e){D(e,0),j(e,null)})),r.setState({selectedItem:-1,liveText:r.props.voiceover.canceled(t+1)}),r.needle=-1),("Tab"===e.key||"Enter"===e.key)&&t>-1&&e.preventDefault()}},r.schdOnMouseMove=S(r.onMouseMove),r.schdOnTouchMove=S(r.onTouchMove),r.schdOnEnd=S(r.onEnd),r}return Object(g.a)(n,[{key:"componentDidMount",value:function(){this.calculateOffsets(),document.addEventListener("touchstart",this.onMouseOrTouchStart,{passive:!1,capture:!1}),document.addEventListener("mousedown",this.onMouseOrTouchStart)}},{key:"componentDidUpdate",value:function(e,t){t.scrollingSpeed!==this.state.scrollingSpeed&&0===t.scrollingSpeed&&this.doScrolling()}},{key:"componentWillUnmount",value:function(){document.removeEventListener("touchstart",this.onMouseOrTouchStart),document.removeEventListener("mousedown",this.onMouseOrTouchStart),this.dropTimeout&&window.clearTimeout(this.dropTimeout),this.schdOnMouseMove.cancel(),this.schdOnTouchMove.cancel(),this.schdOnEnd.cancel()}},{key:"render",value:function(){var e=this,t={userSelect:"none",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",boxSizing:"border-box",position:"relative"},n=I(I({},t),{},{top:this.state.targetY,left:this.state.targetX,width:this.state.targetWidth,height:this.state.targetHeight,position:"fixed",marginTop:0});return v.createElement(v.Fragment,null,this.props.renderList({children:this.props.values.map((function(n,r){var o=r===e.state.itemDragged,i=r===e.state.selectedItem,a={key:r,tabIndex:e.props.values[r]&&e.props.values[r].disabled?-1:0,"aria-roledescription":e.props.voiceover.item(r+1),onKeyDown:e.onKeyDown,style:I(I({},t),{},{visibility:o?"hidden":void 0,zIndex:i?5e3:0})};return e.props.renderItem({value:n,props:a,index:r,isDragged:!1,isSelected:i,isOutOfBounds:!1})})),isDragged:this.state.itemDragged>-1,props:{ref:this.listRef}}),this.state.itemDragged>-1&&y.createPortal(this.props.renderItem({value:this.props.values[this.state.itemDragged],props:{ref:this.ghostRef,style:n,onWheel:this.onWheel},index:this.state.itemDragged,isDragged:!0,isSelected:!1,isOutOfBounds:this.state.itemDraggedOutOfBounds>-1}),this.props.container||document.body),v.createElement("div",{"aria-live":"assertive",role:"log","aria-atomic":"true",style:{position:"absolute",width:"1px",height:"1px",margin:"-1px",border:"0px",padding:"0px",overflow:"hidden",clip:"rect(0px, 0px, 0px, 0px)",clipPath:"inset(100%)"}},this.state.liveText))}}]),n}(v.Component);k.defaultProps={transitionDuration:300,lockVertically:!1,removableByMove:!1,voiceover:{item:function(e){return"You are currently at a draggable item at position ".concat(e,". Press space bar to lift.")},lifted:function(e){return"You have lifted item at position ".concat(e,". Press j to move down, k to move up, space bar to drop and escape to cancel.")},moved:function(e,t){return"You have moved the lifted item ".concat(t?"up":"down"," to position ").concat(e,". Press j to move down, k to move up, space bar to drop and escape to cancel.")},dropped:function(e,t){return"You have dropped the item. It has moved from position ".concat(e," to ").concat(t,".")},canceled:function(e){return"You have cancelled the movement. The item has returned to its starting position of ".concat(e,".")}}};var C=k;function B(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?B(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):B(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var M=function(e){var t=e.options,n=e.setAttributes,r=Object(l.useState)(t),o=Object(f.a)(r,2),i=o[0],a=o[1];return React.createElement(C,{values:i,onChange:function(e){var t=e.oldIndex,r=e.newIndex,o=w(i,t,r);a(o),n({sortedTypologies:o})},renderList:function(e){var t=e.children,n=e.props;return React.createElement("ul",n,t)},renderItem:function(e){var t=e.value,r=e.props,o=e.index,c=e.isDragged,s=e.isSelected;return React.createElement("li",Object.assign({},r,{style:P(P({},r.style),{},{listStyleType:"none",cursor:c?"grabbing":"grab",color:t.disabled?"#888":"#333",textDecoration:t.disabled?"line-through":"none",backgroundColor:c||s?"#EEE":"#FFF",paddingTop:"5px",paddingBottom:"5px",borderBottom:"1px solid #CCC"})}),React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"}},React.createElement("input",{value:t.label,type:"text",disabled:t.disabled,onChange:function(e){i[o].label=e.target.value,i[o].name=e.target.value;var t=w(i,o,o);a(t),n({sortedTypologies:t})}}),React.createElement("button",{type:"button",onClick:function(e){var t=e.oldIndex,r=e.newIndex;i[o].disabled=!i[o].disabled;var c=w(i,t,r);a(c),n({sortedTypologies:c})},style:{border:"none",margin:0,padding:0,width:"auto",overflow:"visible",cursor:"pointer",background:"transparent"}},t.disabled?React.createElement(d.Icon,{icon:"hidden"}):React.createElement(d.Icon,{icon:"visibility"}))))}})};var _=function(e){var t=e.attributes,n=e.options,r=e.setAttributes;return React.createElement(l.Fragment,null,React.createElement(u.InspectorControls,null,React.createElement(d.PanelBody,{title:Object(o.__)("Filter options")},React.createElement(d.TextControl,{label:Object(o.__)("Placeholder text"),value:t.placeholder,onChange:function(e){return r({placeholder:e})}})),React.createElement(d.PanelBody,{title:Object(o.__)("Arrange dropdown order")},React.createElement(M,{options:n,setAttributes:r})),React.createElement(d.PanelBody,{title:Object(o.__)("Filter Reset")},React.createElement(d.ToggleControl,{label:Object(o.__)("Include filter reset?"),checked:t.includeResetFilter,onChange:function(e){r({includeResetFilter:e})}}),React.createElement(d.TextControl,{label:Object(o.__)("Reset langauge"),value:t.resetLanguage,disabled:!t.includeResetFilter,onChange:function(e){return r({resetLanguage:e})}})),React.createElement(d.PanelBody,{title:Object(o.__)("Dynamic Text Element")},React.createElement(d.ToggleControl,{label:Object(o.__)("Use dynamic text element?"),checked:t.hasDynamicTextElement,onChange:function(e){r({hasDynamicTextElement:e})}}),React.createElement(d.TextControl,{label:Object(o.__)("Dynamic Text Block ID"),placeholder:Object(o.__)("ex. d83a97da-eb12-4eac-a51f-e6facd850116"),value:t.dynamicTextBlockId,help:Object(o.__)("This is the ID of the Dynamic Text Block you want to associate with this filter. The ID can be found by adding a Dynamic Text Block to your page."),disabled:!t.hasDynamicTextElement,onChange:function(e){return r({dynamicTextBlockId:e})}}))),React.createElement(u.InspectorAdvancedControls,null))},L=[],Y=function(e,t){return t.split(" ").includes(e)},A=function(e){var t=e.attributes,n=e.className,r=e.setAttributes,o=e.context,i=(t.placeholder,t.sortedTypologies),a=t.includeResetFilter,c=t.resetLanguage,f=JSON.parse(o["prc-block/quote-sorter-typologies"]),p=Object(u.useBlockProps)({className:s()(n,"ui list")}),g=Object.keys(f).map((function(e){return{label:f[e].name,name:f[e].name,value:e,disabled:!1}}));Object(l.useEffect)((function(){r({sortedTypologies:0<i.length?i:g})}),[i,g]);var m=Object(u.useInnerBlocksProps)(p,{className:"ui selection dropdown",allowedBlocks:L,orientation:"vertical",templateLock:!1});return React.createElement("div",m,React.createElement(_,{attributes:t,options:i,setAttributes:r}),Y("is-style-list-inline",p.className)&&React.createElement(l.Fragment,null,React.createElement(d.ButtonGroup,{className:"ui list"},i.filter((function(e){return!e.disabled})).map((function(e){return React.createElement(d.Button,{variant:"secondary",key:e.value},e.label)}))),a&&React.createElement(d.Button,{variant:"secondary",key:"reset"},c)),Y("is-style-list-column",p.className)&&React.createElement("div",{className:"ui list flex column"},i.filter((function(e){return!e.disabled})).map((function(e){return React.createElement(d.Button,{variant:"secondary",key:e.value},e.label)})),a&&React.createElement(d.Button,{variant:"secondary",key:"reset"},c)),Y("is-style-dropdown",p.className)&&React.createElement(d.SelectControl,{options:i.filter((function(e){return!e.disabled})),onChange:function(e){console.log(e)}}))},F=function(){return React.createElement(u.InnerBlocks.Content,null)};function N(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function W(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?N(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):N(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var X=a.name,q={edit:A,save:F};Object(i.registerBlockType)(X,W(W({},a),q))}},[[988,0]]]);
//# sourceMappingURL=quote-sorter-dropdown-fb6ba953.js.map