import * as __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__ from "@wordpress/interactivity";
/******/ var __webpack_modules__ = ({

/***/ "@wordpress/interactivity":
/*!*******************************************!*\
  !*** external "@wordpress/interactivity" ***!
  \*******************************************/
/***/ ((module) => {

var x = (y) => {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = (x) => (() => (x))
module.exports = __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/interactivity */ "@wordpress/interactivity");
/**
 * WordPress Dependencies
 */

const {
  apiFetch
} = window.wp;
const {
  addQueryArgs
} = window.wp.url;
const {
  decodeEntities
} = window.wp.htmlEntities;
const useDebounce = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.useState)(value);
  (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
};
const {
  state,
  actions
} = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)('prc-block/taxonomy-search', {
  actions: {
    async doSearch(searchValue, taxonomy, parentTermId = 0) {
      console.log('doSearch', searchValue, taxonomy, parentTermId);
      return new Promise(resolve => {
        const args = {
          per_page: 25
        };
        if ('' !== taxonomy) {
          args.taxonomy = taxonomy;
        }
        if ('' !== searchValue) {
          args.searchValue = searchValue;
        }
        if (0 !== parentTermId && '' !== parentTermId) {
          // cast parentTermId as a whole number
          args.parentTermId = parentTermId;
        }
        const request = {
          method: 'GET',
          path: addQueryArgs('/prc-api/v3/blocks/taxonomy-search', args)
        };
        console.log('doSearch', request);
        apiFetch(request).then(d => {
          console.log('doSearch', d);
          const tmpData = d.map(t => ({
            key: t.id,
            id: t.id,
            url: t.link,
            description: decodeEntities(t.description),
            label: decodeEntities(t.name)
          }));
          resolve(tmpData);
        });
      });
    },
    onInputFocus: event => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      context.isActive = true;
    },
    onInputBlur: event => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      setTimeout(() => {
        context.isActive = false;
      }, 300);
    },
    onInputChange: event => {
      const {
        value
      } = event.target;
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const {
        id
      } = ref;
      // Store the value in the global state where we store all primitve inputs.
      state[id].value = value;
      // Also, store the value in this block's context so we can use it in the submitHandler.
      context.searchValue = state[id].value;
    }
  },
  callbacks: {
    showResults: () => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      console.log('showResults', context, state);
      return context.results && context.results.length >= 1 && context.isActive;
    },
    onSearchValueChange: () => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        debouncedSearchValue
      } = context;
      if (debouncedSearchValue) {
        console.log('onSearchValueChange', context, state, debouncedSearchValue);
        // do the search
        actions.doSearch(debouncedSearchValue, context.taxonomy).then(d => {
          context.results = d;
        });
      }
    },
    debounceSearchValueChange: () => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const debouncedSearchValue = useDebounce(context.searchValue, 1000);
      if (debouncedSearchValue.length > 2) {
        context.debouncedSearchValue = debouncedSearchValue;
      }
    },
    onEscKey: event => {
      if (27 === event.keyCode) {
        const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
        context.isActive = false;
      }
    }
  }
});
})();


//# sourceMappingURL=view.js.map