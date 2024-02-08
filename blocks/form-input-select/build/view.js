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

const setOptionActive = (id, refid) => {
  const listbox = document.getElementById(`listbox-${id}`);
  const option = listbox.querySelector(`[refid="${refid}"]`);
  if (option) {
    option.setAttribute('aria-selected', true);
    option.focus();
    // set all siblings to false
    const siblings = option.parentElement.children;
    for (let i = 0; i < siblings.length; i++) {
      if (siblings[i] !== option) {
        siblings[i].setAttribute('aria-selected', false);
      }
    }
  }
};
const moveThroughOptions = (direction, id) => {
  const {
    state
  } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)('prc-block/form-input-select');
  const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
  const {
    activeId
  } = context;
  console.log({
    context
  });
  const {
    filteredOptions
  } = state[id];
  let nextActive = null;
  if (activeId === null || isNaN(activeId)) {
    nextActive = 0;
  } else {
    nextActive = activeId + direction;
  }
  if (nextActive < 0) {
    nextActive = filteredOptions.length - 1;
  }
  if (nextActive >= filteredOptions.length) {
    nextActive = 0;
  }
  context.activeId = nextActive;
  const highlightedOption = filteredOptions[nextActive];
  setOptionActive(id, highlightedOption.value);
};
const setValueOnEnter = (id, state) => {
  const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
  const {
    activeId
  } = context;
  const {
    filteredOptions,
    options
  } = state[id];
  console.log({
    id
  });
  console.log(state[id]);
  console.log({
    activeId
  });
  const highlightedOption = filteredOptions[activeId];
  if (highlightedOption) {
    state[id].value = highlightedOption.value;
    state[id].label = highlightedOption.label;
    state[id].isOpen = false;
    state[id].filteredOptions = options;
    context.value = highlightedOption.value;
    document.getElementById(`${id}-input`).value = highlightedOption.label;
  }
};
const {
  state
} = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)('prc-block/form-input-select', {
  actions: {
    onOpen: event => {
      event.preventDefault();
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const id = ref.getAttribute('aria-controls');
      if (!id) {
        return;
      }
      state[id].isOpen = true;
    },
    onSelect: () => {
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      // get parent with class 'wp-block-prc-block-form-input-select'
      const id = ref.getAttribute('aria-controls');
      const value = ref.getAttribute('refid');
      setOptionActive(id, value);
      const {
        options
      } = state[id];
      const selectedOption = options.find(option => option.value === value);
      if (!selectedOption) {
        return;
      }
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      context.value = selectedOption.value;
      state[id].value = selectedOption.value;
      state[id].label = selectedOption.label;
      state[id].isOpen = false;
      document.getElementById(`${id}-input`).value = selectedOption.label;
      // actions.onSelectChange(value, ref);
    },
    onKeyUp: event => {
      event.preventDefault();
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const {
        value
      } = ref;
      const id = ref.getAttribute('aria-controls');
      if (!id) {
        return;
      }
      if (event.key === 'Escape') {
        return;
      }
      state[id].isOpen = true;
      if (event.key === 'Enter') {
        setValueOnEnter(id, state);
      }
      if (event.keyCode === 40 && event.key === 'ArrowDown') {
        moveThroughOptions(1, id);
        return;
      }
      if (event.keyCode === 38 && event.key === 'ArrowUp') {
        moveThroughOptions(-1, id);
        return;
      }
      const {
        options
      } = state[id];

      // check if any of the options contain the value of the input
      const matches = options.filter(option => {
        const {
          label
        } = option;
        return label.toLowerCase().includes(value.toLowerCase());
      });
      // if there are matches, set the first match to active

      if (matches.length) {
        state[id].filteredOptions = matches;
        setOptionActive(id, matches[0].value);
      } else {
        state[id].filteredOptions = options;
        state[id].active = null;
      }
    },
    onClear: event => {
      event.preventDefault();
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const id = ref.getAttribute('aria-controls');
      if (!id) {
        return;
      }
      state[id].value = '';
      state[id].label = '';
      state[id].isOpen = false;
      document.getElementById(`${id}-input`).value = '';
    }
  },
  callbacks: {
    /**
     * Watch for clicks outside the ref and if the select is open close it.
     *
     * @return
     */
    onInit: () => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const {
        id
      } = ref;
      console.log({
        context
      });
      console.log({
        state
      });
      if (!id) {}
      window.addEventListener('click', e => {
        // We call the store function directly on the click event because we need to get the latest state of the store at click time.
        // const { state } = store(context.targetNamespace);
        if (!ref.innerHTML.includes(e.target.innerHTML) && true === state[id].isOpen) {
          state[id].isOpen = false;
        } else {}
      });
    },
    onValueChange: () => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        value,
        targetNamespace
      } = context;
      console.log('something is happening');
      if (value) {
        const {
          actions
        } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)(targetNamespace);
        if (actions.onSelectChange) {
          console.log('PUSH', value, 'to', targetNamespace, context);
          actions.onSelectChange(value);
        }
      }
    },
    onESCKey: event => {
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const {
        id
      } = ref;
      if (!id) {
        return;
      }
      if (event.key === 'Escape') {
        if (true === state[id].isOpen) {
          event.preventDefault();
          state[id].isOpen = false;
          return;
        }
        const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
        context.activeId = 0;
        state[id].value = '';
        state[id].label = '';
        state[id].isOpen = false;
        document.getElementById(`${id}-input`).value = '';
      }
    }
  }
});
})();


//# sourceMappingURL=view.js.map