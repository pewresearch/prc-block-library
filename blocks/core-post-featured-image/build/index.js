/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./toolbar */ "./src/toolbar.jsx");

/**
 * External Dependencies
 */



/**
 * WordPress Dependencies
 */




/**
 * Internal Dependencies
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */



const BLOCKNAME = 'core/post-featured-image';
const BLOCKIDENTIFIER = 'prc-block-library/core-post-featured-image';
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default()(() => {
  (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__.addFilter)('editor.BlockEdit', `${BLOCKIDENTIFIER}-wrapper-props`, (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.createHigherOrderComponent)(BlockEdit => {
    return props => {
      const {
        name,
        isSelected,
        attributes
      } = props;
      if (BLOCKNAME !== name) {
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
          ...props
        });
      }
      const {
        imageSize,
        isChartArt
      } = attributes;
      const classes = () => {
        return classnames__WEBPACK_IMPORTED_MODULE_1___default()({
          image: true,
          XL: 'XL' === imageSize,
          A1: 'A1' === imageSize,
          A2: 'A2' === imageSize,
          A3: 'A3' === imageSize,
          A4: 'A4' === imageSize,
          bordered: isChartArt
        });
      };
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: classes()
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
        ...props
      }), isSelected && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_toolbar__WEBPACK_IMPORTED_MODULE_7__["default"], {
        ...props
      }));
    };
  }, 'withCorePostFeaturedImageWrapperProps'), 100);
});

/***/ }),

/***/ "./src/toolbar.jsx":
/*!*************************!*\
  !*** ./src/toolbar.jsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);

/* eslint-disable max-lines-per-function */

/**
 * WordPress Dependencies
 */





/**
 * Internal Dependencies
 */

function ImageSizeIcon({
  selected,
  currentlyActive = ''
}) {
  const iconPaths = {
    A1: 'M12.13,18.09h-3l-.74-2.46H4.49l-.75,2.46H1.27l3.84-12H8.36ZM7.72,13.41,6.44,9.2,5.16,13.41Z M13.31,8.35a7,7,0,0,0,4-2.44h2v10h3.33v2.19H13V15.9h3.63V9a23.54,23.54,0,0,1-3.33,1.78Z',
    A2: 'M12.5,18.09h-3l-.74-2.46H4.86l-.75,2.46H1.64l3.83-12H8.73ZM8.09,13.41,6.81,9.2,5.53,13.41Z M22.16,18.09h-9V15.75l.72-.52,1.46-1a31.07,31.07,0,0,0,3.1-2.6,2.74,2.74,0,0,0,.9-1.87,1.55,1.55,0,0,0-1.66-1.6c-1.19,0-1.86.76-2,2.3l-2.48-.55c.56-2.67,2.11-4,4.66-4a4.37,4.37,0,0,1,3,.91A3.5,3.5,0,0,1,22.2,9.69c0,1.51-.69,2.61-2.52,4a33.64,33.64,0,0,1-3.06,2h5.74Z',
    A3: 'M12.52,18h-3l-.74-2.47H4.89L4.13,18H1.67L5.5,6H8.76ZM8.11,13.32,6.83,9.11,5.56,13.32Z M17.38,10.75a1.87,1.87,0,0,0,1.46-.47,1.36,1.36,0,0,0,.38-.94A1.5,1.5,0,0,0,17.6,7.89c-1,0-1.51.45-1.84,1.53L13.28,9a3.62,3.62,0,0,1,1.1-2,4.58,4.58,0,0,1,3.33-1.24C20.24,5.82,22,7.13,22,9a2.69,2.69,0,0,1-2,2.68,3.09,3.09,0,0,1,1.51.74,2.73,2.73,0,0,1,.9,2.11c0,2.19-1.82,3.61-4.64,3.61A4.67,4.67,0,0,1,14.23,17a3.88,3.88,0,0,1-1.31-2.45l2.55-.36A2,2,0,0,0,17.63,16a1.64,1.64,0,0,0,1.84-1.62,1.55,1.55,0,0,0-.61-1.27,3,3,0,0,0-1.66-.27H16.1V10.75Z',
    A4: 'M12.31,18.09h-3l-.74-2.46H4.67l-.75,2.46H1.45l3.84-12H8.54ZM7.9,13.41,6.62,9.2,5.34,13.41Z M20.86,13.22h1.69v2.1H20.86v2.77H18.05V15.32H12.81v-2.1l4.84-7.31h3.21Zm-2.69,0V9.16c0-.09,0-.28,0-.57l0-.51-3.29,5.14Z',
    XL: 'M9.23,11.58,12.94,18H9.7L7.28,13.65,4.87,18H2.21l3.71-6.38L2.62,6H5.9L7.84,9.65,9.88,6h2.63Z M21.79,15.63V18H14.18V6H17v9.64Z'
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SVG, {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    isPressed: selected === currentlyActive
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Path, {
    d: iconPaths[selected]
  }));
}
function Toolbar({
  attributes,
  setAttributes,
  context
}) {
  const {
    imageSize,
    isChartArt
  } = attributes;
  const handleImageSizeChange = newSize => {
    setAttributes({
      imageSize: newSize
    });
  };
  const MemoizedImageSizeIcon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)(() => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ImageSizeIcon, {
    selected: imageSize,
    currentlyActive: imageSize
  }), [imageSize]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.BlockControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToolbarGroup, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToolbarDropdownMenu, {
    icon: MemoizedImageSizeIcon,
    label: "Select Image Size",
    controls: [{
      title: 'A1',
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ImageSizeIcon, {
        selected: "A1",
        currentlyActive: imageSize
      }),
      isActive: 'A1' === imageSize,
      onClick: () => handleImageSizeChange('A1')
    }, {
      title: 'A2',
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ImageSizeIcon, {
        selected: "A2",
        currentlyActive: imageSize
      }),
      isActive: 'A2' === imageSize,
      onClick: () => handleImageSizeChange('A2')
    }, {
      title: 'A3',
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ImageSizeIcon, {
        selected: "A3",
        currentlyActive: imageSize
      }),
      isActive: 'A3' === imageSize,
      onClick: () => handleImageSizeChange('A3')
    }, {
      title: 'A4',
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ImageSizeIcon, {
        selected: "A4",
        currentlyActive: imageSize
      }),
      isActive: 'A4' === imageSize,
      onClick: () => handleImageSizeChange('A4')
    }, {
      title: 'XL',
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ImageSizeIcon, {
        selected: "XL",
        currentlyActive: imageSize
      }),
      isActive: 'XL' === imageSize,
      onClick: () => handleImageSizeChange('XL')
    }]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToolbarButton, {
    icon: "chart-pie",
    isPressed: isChartArt,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enable Chart Art'),
    onClick: () => {
      setAttributes({
        isChartArt: !isChartArt
      });
    }
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Toolbar);

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/***/ ((module) => {

module.exports = window["classnames"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkcore_post_featured_image"] = globalThis["webpackChunkcore_post_featured_image"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map