/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "enquire.js":
/*!**************************!*\
  !*** external "enquire" ***!
  \**************************/
/***/ (function(module) {

module.exports = window["enquire"];

/***/ }),

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
/* harmony import */ var enquire_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! enquire.js */ "enquire.js");
/* harmony import */ var enquire_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(enquire_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__);
/* eslint-disable no-undef */
// THIS IS A LEGACY FILE.

/**
 * External Dependencies
 */


/**
 * WordPress Dependencies
 */


/**
 * Internal Dependencies
 */
// import './style.scss';

if (!window.hasOwnProperty('prcBlocks')) {
  window.prcBlocks = {};
}
window.prcBlocks.groupBlocks = {
  breakpoints: [],
  elms: {}
};
const DEBUG = false;
const initStickyBlocks = () => {
  const stickyBlocks = document.querySelectorAll('.prc-group-block--sticky');
  // If there are any sticky blocks init them.
  if (stickyBlocks.length) {
    stickyBlocks.forEach(block => {
      block.classList.add('sticky');
    });
  }
};
const initResponsiveGroupBlocks = () => {
  // Helper Functions:
  const addResponsiveBlock = (block, attachBlock, threshold) => {
    if (DEBUG) {
      console.log(window.prcBlocks.groupBlocks.breakpoints, threshold);
    }
    if (!window.prcBlocks.groupBlocks.breakpoints.includes(threshold)) {
      window.prcBlocks.groupBlocks.breakpoints.push(threshold);
    }
    if (DEBUG) {
      console.log(window.prcBlocks.groupBlocks.elms, threshold);
    }
    if (!window.prcBlocks.groupBlocks.elms.hasOwnProperty(threshold)) {
      window.prcBlocks.groupBlocks.elms[threshold] = [];
    }
    window.prcBlocks.groupBlocks.elms[threshold].push(block);

    // Create return point.
    const returnPoint = document.createElement('div');
    const returnId = block.getAttribute('data-return-id');
    returnPoint.setAttribute('id', returnId);
    if (DEBUG) {
      console.log('addResponsiveBlock', block, returnPoint);
    }
    block.parentNode.insertBefore(returnPoint, block.nextSibling);
  };
  const matchResponsiveBlock = viewportWidth => {
    window.prcBlocks.groupBlocks.elms[viewportWidth].forEach(block => {
      // We should remove the sticky class if it exists.
      const attachId = block.getAttribute('data-attach-id');
      const attachBlock = document.getElementById(attachId);
      if (attachBlock) {
        attachBlock.append(block);
      }
    });
  };
  const unmatchResponsiveBlock = viewportWidth => {
    window.prcBlocks.groupBlocks.elms[viewportWidth].forEach(block => {
      const returnId = block.getAttribute('data-return-id');
      const returnPoint = document.getElementById(returnId);
      // If the sticky class should be here re-add it.
      if (returnPoint) {
        returnPoint.parentNode.insertBefore(block, returnPoint.nextSibling);
      }
    });
  };
  const watchResponsiveBlocks = () => {
    if (DEBUG) {
      console.log('watchResponsiveBlocks', window.prcBlocks.groupBlocks);
    }
    window.prcBlocks.groupBlocks.breakpoints.forEach(threshold => {
      // Register the enquire listener.
      enquire_js__WEBPACK_IMPORTED_MODULE_0___default().register(`screen and (max-width: ${threshold}px)`, {
        match: () => {
          if (DEBUG) {
            console.log('watchResponsiveBlocks -> matched:', threshold);
          }
          matchResponsiveBlock(threshold);
        },
        unmatch: () => {
          unmatchResponsiveBlock(threshold);
        }
      });
    });
  };

  // If there are any resposnive blocks init them.
  const responsiveBlocks = document.querySelectorAll('.prc-group-block--responsive');
  if (responsiveBlocks.length) {
    responsiveBlocks.forEach(block => {
      const attachId = block.getAttribute('data-attach-id');
      const threshold = block.getAttribute('data-responsive-threshold');
      const attachBlock = document.getElementById(attachId);
      // If we have an attach point then init the responsive block.
      if (attachBlock) {
        addResponsiveBlock(block, attachBlock, threshold);
      }
    });
    // Watch for changes in the viewport.
    watchResponsiveBlocks();
  }
};
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default()(() => {
  initResponsiveGroupBlocks();
  initStickyBlocks();
});
}();
/******/ })()
;
//# sourceMappingURL=view.js.map