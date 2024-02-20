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
/* eslint-disable @wordpress/no-unused-vars-before-return */

const {
  actions
} = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)('prc-block/form-input-select', {
  actions: {
    moveThroughOptions: (direction, id) => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        activeId,
        filteredOptions,
        options
      } = context;
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
      const highlightedOption = options[nextActive];
      actions.setOptionActive(id, highlightedOption.value);
    },
    setOptionActive: (id, refid) => {
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
    },
    setValueOnEnter: id => {
      console.log('setting value on enter');
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        targetNamespace
      } = context;
      const {
        state: targetState
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)(targetNamespace);
      const highlightedOption = context.filteredOptions[context.activeId];
      context.filteredOptions = context.options;
      context.value = highlightedOption.value;
      context.label = highlightedOption.label;
      targetState[id].value = highlightedOption.value;
      targetState[id].isOpen = false;
      document.getElementById(`${id}-input`).value = highlightedOption.label;
    },
    onOpen: event => {
      event.preventDefault();
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        targetNamespace
      } = context;
      const id = ref.getAttribute('aria-controls');
      if (!id) {
        return;
      }
      const {
        state: targetState
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)(targetNamespace);
      targetState[id].isOpen = true;
    },
    onClick: event => {
      event.preventDefault();
      console.log('setting value on click');
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        options,
        targetNamespace
      } = context;
      const {
        state: targetState
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)(targetNamespace);
      // get parent with class 'wp-block-prc-block-form-input-select'
      const id = ref.getAttribute('aria-controls');
      const val = ref.getAttribute('refid');
      actions.setOptionActive(id, val);
      const selectedOption = options.find(option => option.value === val);
      if (!selectedOption) {
        return;
      }
      // find the object in the options array that matches the value
      // then set the activeId to the index of that object
      const index = options.findIndex(option => option.value === selectedOption.value);
      context.filteredOptions = options;
      context.activeId = index;
      context.label = selectedOption.label;
      context.value = selectedOption.value;
      targetState[id].value = selectedOption.value;
      targetState[id].isOpen = false;
      console.log({
        context
      });
      document.getElementById(`${id}-input`).value = selectedOption.label;
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
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        targetNamespace,
        options
      } = context;
      const {
        state: targetState
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)(targetNamespace);
      targetState[id].isOpen = true;
      if (event.key === 'Enter') {
        actions.setValueOnEnter(id);
      }
      if (event.keyCode === 40 && event.key === 'ArrowDown') {
        actions.moveThroughOptions(1, id);
        return;
      }
      if (event.keyCode === 38 && event.key === 'ArrowUp') {
        actions.moveThroughOptions(-1, id);
        return;
      }

      // check if any of the options contain the value of the input
      const matches = options.filter(option => {
        const {
          label
        } = option;
        return label.toLowerCase().includes(value.toLowerCase());
      });
      // if there are matches, set the first match to active

      if (matches.length) {
        context.filteredOptions = matches;
        actions.setOptionActive(id, matches[0].value);
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
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        targetNamespace,
        options
      } = context;
      const {
        state: targetState
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)(targetNamespace);
      console.log({
        targetState
      });
      context.filteredOptions = options;
      context.value = '';
      context.label = '';
      targetState[id].value = '';
      targetState[id].isOpen = false;
      document.getElementById(`${id}-input`).value = '';
    }
  },
  callbacks: {
    onInit: () => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const {
        id
      } = ref;
      const {
        targetNamespace
      } = context;
      if (!id) {
        return;
      }
      window.addEventListener('click', e => {
        const {
          state: targetState
        } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)(targetNamespace);
        if (!ref.innerHTML.includes(e.target.innerHTML) && true === targetState[id].isOpen) {
          targetState[id].isOpen = false;
          console.log('on click outside');
          console.log(context.filteredOptions);
        } else {
          console.log('on click inside');
          console.log(context.filteredOptions);
        }
      });
    },
    onValueChange: () => {
      console.log('value change detected');
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      const {
        id
      } = ref;
      if (!id) {
        return;
      }
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        targetNamespace,
        value
      } = context;
      if (value) {
        const {
          actions
        } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)(targetNamespace);
        if (actions.onSelectChange) {
          actions.onSelectChange(value, ref, ref.id);
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
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        targetNamespace
      } = context;
      const {
        state: targetState
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)(targetNamespace);
      if (event.key === 'Escape') {
        if (true === targetState[id].isOpen) {
          event.preventDefault();
          targetState[id].isOpen = false;
          return;
        }
        context.activeId = 0;
        context.value = '';
        context.label = '';
        targetState[id].value = '';
        targetState[id].isOpen = false;
        document.getElementById(`${id}-input`).value = '';
      }
    }
  }
});
})();


//# sourceMappingURL=view.js.map