/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["domReady"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable no-undef */
/**
 * WordPress Dependencies
 */


/**
 * Switches the active tab and panel.
 * @param {elm} newTab The tab to activate.
 */
function switchTab(id, newTab) {
  let updateHash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (updateHash) {
    newTab.focus();
    const href = newTab.getAttribute('href');
    // Update the hash in the URL without scrolling the page.
    window.history.replaceState(null, null, href);
  }
  const oldTab = document.querySelector(`#${id} .wp-block-prc-block-tabs-menu-item[aria-selected="true"]`);
  const oldPanel = document.querySelector(`#${id} .wp-block-prc-block-tabs-pane[aria-hidden="false"]`);
  const newPanel = document.getElementById(newTab.getAttribute('aria-controls'));
  if (null !== oldTab && oldTab !== newTab) {
    oldTab.setAttribute('aria-selected', 'false');
  }
  if (null !== oldPanel && oldPanel !== newPanel) {
    oldPanel.setAttribute('aria-hidden', 'true');
  }
  newTab.setAttribute('aria-selected', 'true');
  newPanel.setAttribute('aria-hidden', 'false');
}
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(() => {
  const tabs = document.querySelectorAll('.wp-block-prc-block-tabs');
  tabs.forEach(t => {
    const id = t.getAttribute('id');
    const menuItems = t.querySelectorAll('.wp-block-prc-block-tabs-menu-item');
    menuItems.forEach((menuItem, index) => {
      menuItem.addEventListener('click', elm => {
        elm.preventDefault();
        switchTab(id, elm.target);
      });
      // Activate first tab
      if (0 === index) {
        switchTab(id, menuItem, false);
      }
      // Activate tab from url hash
      if (window.location.hash === menuItem.getAttribute('href')) {
        switchTab(id, menuItem);
        // Scroll to the tab
        setTimeout(() => {
          menuItem.scrollIntoView();
        }, 1000);
      }
    });
  });
});
}();
/******/ })()
;
//# sourceMappingURL=view.js.map