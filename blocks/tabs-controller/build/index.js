/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../../node_modules/classnames/index.js":
/*!****************************************************!*\
  !*** ../../../../node_modules/classnames/index.js ***!
  \****************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./src/Edit.jsx":
/*!**********************!*\
  !*** ./src/Edit.jsx ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "../../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);

/**
 * External Dependencies
 */


/**
 * WordPress Dependencies
 */




/**
 * Internal Dependencies
 */

const BLOCKS_TEMPLATE = [['prc-block/tabs-menu', {}], ['prc-block/tabs-panes', {}]];
const ALLOWED_BLOCKS = ['prc-block/tabs-menu', 'prc-block/tabs-panes'];
const findRemovedDiff = (past, present) => {
  const comparer = otherArray => current => 0 === otherArray.filter(other => other.attributes.uuid === current.attributes.uuid).length;
  const onlyInA = past.filter(comparer(present));
  const onlyInB = present.filter(comparer(past));
  return onlyInA.concat(onlyInB);
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param            props.context
 * @param            props.clientId
 * @param            props.isSelected
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
function Edit(_ref) {
  let {
    attributes,
    setAttributes,
    context,
    clientId,
    isSelected
  } = _ref;
  const [menuBlocksPast, setMenuBlocksPast] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    vertical
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      'is-vertical-tabs': vertical,
      'is-horizontal-tabs': !vertical
    })
  });
  const innerBlocksProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useInnerBlocksProps)({}, {
    allowedBlocks: ALLOWED_BLOCKS,
    renderAppender: false,
    orientation: vertical ? 'vertical' : 'horizontal',
    template: BLOCKS_TEMPLATE,
    templateLock: 'all'
  });

  // Get menu blocks, get page blocks
  const {
    menuBlocks,
    paneBlocks
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    if (undefined === clientId) {
      return;
    }
    const rootBlocks = select('core/block-editor').getBlocks(clientId);
    const mBlocks = 1 <= rootBlocks.length ? rootBlocks.filter(e => 'prc-block/tabs-menu' === e.name) : [];
    const pBlocks = 1 <= rootBlocks.length ? rootBlocks.filter(e => 'prc-block/tabs-panes' === e.name) : [];
    // eslint-disable-next-line consistent-return
    return {
      menuBlocks: 1 <= mBlocks.length ? mBlocks[0].innerBlocks : false,
      paneBlocks: 1 <= pBlocks.length ? pBlocks[0].innerBlocks : false
    };
  }, [clientId]);

  // When a menu item block is removed find the matching page block by uuid and remove it.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // eslint-disable-next-line no-console
    console.log('menuBlocks', menuBlocks);
    if (menuBlocks.length < menuBlocksPast.length) {
      // We have removed something.
      // Find what the diff from menuBlocks and menuBlocksPast is, then get the uuid then search the pageBlocks and remove the block in question.
      const removed = findRemovedDiff(menuBlocksPast, menuBlocks);
      const matchedPane = paneBlocks.filter(e => e.attributes.uuid === removed[0].attributes.uuid);
      if (0 !== matchedPane.length) {
        (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.dispatch)('core/block-editor').removeBlock(matchedPane[0].clientId);
      }
      // Need to set active the next available menu item block
    }

    setMenuBlocksPast(menuBlocks);
  }, [menuBlocks]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", innerBlocksProps));
}

/***/ }),

/***/ "./src/Icon.jsx":
/*!**********************!*\
  !*** ./src/Icon.jsx ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Icon; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress Dependencies
 */


function Icon() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 640 640",
    height: 21,
    preserveAspectRatio: "xMidYMid meet"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
    d: "M64 480c-35.4 0-64-28.7-64-64c0-21.3 0-42.7 0-64c0-35.3 28.7-64 64-64c88.4 0 176.7 0 265 0c-2.7 6.2-5 12.5-7 18.9c-1.4 4.4-2 8.8-2.1 13.1c-85.3 0-170.7 0-256 0c-17.7 0-32 14.3-32 32c0 21.3 0 42.7 0 64c0 17.7 14.3 32 32 32c90.9 0 181.8 0 272.7 0c6.3 11.4 13.9 22.2 22.5 32c-98.4 0-196.8 0-295.2 0zM192 112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-32 0-64 0-96 0c-8.8 0-16-7.2-16-16s7.2-16 16-16c32 0 64 0 96 0zm87.4-48c5.5 9.4 8.6 20.3 8.6 32c0 21.3 0 42.7 0 64c0 35.3-28.7 64-64 64c-53.3 0-106.7 0-160 0c-35.4 0-64-28.7-64-64c0-21.3 0-42.7 0-64C0 60.7 28.7 32 64 32c101.4 0 202.7 0 304 0c35.3 0 64 28.7 64 64c0 29.8 0 59.6 0 89.4c12.2-12.2 24.5-24.5 36.7-36.7c6.2-6.3 16.4-6.3 22.6 0c6.3 6.2 6.3 16.4 0 22.6c-1.7 1.7-3.4 3.4-5.1 5.1c-10.1 .6-20.1 1.9-29.9 4.2c-21.8 5-36.2 24.9-36.2 46.9c-8.6-4.8-18.8-6.8-28.8-5.7c-16.8-16.8-33.7-33.7-50.5-50.5c-6.3-6.2-6.3-16.4 0-22.6c6.2-6.3 16.4-6.3 22.6 0c12.2 12.2 24.5 24.5 36.7 36.7c0-29.8 0-59.6 0-89.4c0-17.7-14.3-32-32-32c-29.5 0-59.1 0-88.6 0zM224 64L64 64C46.3 64 32 78.3 32 96c0 21.3 0 42.7 0 64c0 17.7 14.3 32 32 32c53.3 0 106.7 0 160 0c17.7 0 32-14.3 32-32c0-21.3 0-42.7 0-64c0-17.7-14.3-32-32-32zM429.9 279.9l-8 13.9c5.8 3.3 13.1 2.7 18.2-1.5c-3.4-4.1-6.8-8.2-10.2-12.3c0-.1 0 0 0-.1zm-9.2-23.7l-16 27.7c5.7 3.3 11.5 6.6 17.2 9.9c5.3-9.2 10.7-18.5 16-27.7c-5.7-3.3-11.5-6.6-17.2-9.9zm39.7 6.2c1.8 5 3.7 10 5.5 15c6.3-2.3 10.5-8.3 10.5-15c-5.3 0-10.7 0-16 0zm16-19.9c0-1 .2-.6-.3 0c-.2 .3 .1-.3 2.1-.9c4.5-1.4 10.8-1.6 18-1.6c0-10.7 0-21.3 0-32c-.1 0 0 0-.1 0c-6 0-17.5-.1-27.6 3.1c-5.3 1.7-11.4 4.6-16.3 10.1c-5.2 5.7-7.8 13.1-7.8 21.3c10.7 0 21.3 0 32 0zm19.7-2.5l.3 0c0-10.7 0-21.3 0-32c-.1 0-.2 0-.3 0c0 10.7 0 21.3 0 32zm52.5 2.5c-.1-8.3-3-15.6-8.2-21.3c-4.9-5.3-11-8.2-16.2-9.8c-10.1-3.3-21.5-3.4-27.7-3.4c0 10.7 0 21.3 0 32c6.6 0 13.2 .3 17.9 1.8c2.2 .7 2.7 1.3 2.6 1.2c-.5-.5-.4-1.1-.5-.5c10.7 0 21.4 0 32 0zm-16.1 20l-16 0c0 6.7 4.2 12.7 10.4 15c1.9-5 3.7-10 5.6-15zm30.2 17.6c-3.3 4.1-6.8 8.2-10.2 12.3c5.2 4.3 12.4 4.9 18.3 1.6c-2.7-4.6-5.4-9.3-8-13.9zm25.5 3.8c.5-.3 0 0-.7-.1c-.2 0 .6 .1 2.3 1.7c3.7 3.3 7.2 8.9 10.5 14.6c9.2-5.3 18.5-10.7 27.7-16c.1-.1 0 0 .1-.1c-3.1-5.4-8.9-15.2-16.8-22.3c-4.1-3.7-9.6-7.5-16.6-9.1c-7.5-1.7-15.3-.6-22.5 3.6c5.3 9.2 10.7 18.5 16 27.7zm10.5 58.7l-8-13.9c-5.8 3.3-8.9 9.9-7.8 16.5c5.3-.9 10.5-1.8 15.8-2.7c0 .1 0 0 0 .1zm0 34.9l-15.8-2.7c-1.1 6.6 2 13.2 7.8 16.5c2.6-4.6 5.3-9.3 8-13.9c0 .1 0 0 0 .1zm17.5 10.1l-8 13.8c2.7-4.6 5.3-9.3 8-13.9c0 .1 0 0 0 .1zm11.9 48.5c3.1-5.4 8.7-15.3 11-25.7c1.1-5.4 1.7-12.1-.4-18.9c-2.3-7.4-7.1-13.5-14.3-17.7c-5.4 9.2-10.8 18.4-16.2 27.6c.5 .3 0 0-.2-.7c-.1-.2 .2 .6-.3 2.8c-1 4.8-4.1 10.7-7.4 16.4c9.2 5.3 18.5 10.7 27.7 16c.1 .1 0 .1 .1 .2zm-55.9 27.8l16-27.8c-5.8-3.4-11.6-6.7-17.4-10.1c-5.3 9.2-10.7 18.5-16 27.7c5.8 3.5 11.6 6.8 17.4 10.2zm-9.4-24l8-13.9c-5.8-3.4-13.1-2.7-18.2 1.6c3.4 4.1 6.8 8.2 10.2 12.3zm-30.3 17.6c-1.9-5-3.7-10-5.5-15c-6.3 2.3-10.5 8.3-10.5 15c5.3 0 10.7 0 16 0zm-16 20l32 0c0-6.7 0-13.3 0-20c-10.7 0-21.3 0-32 0c0 6.7 0 13.3 0 20zm-72.1 0c0 8.3 2.9 15.6 8.1 21.3c4.9 5.3 11 8.2 16.2 9.8c10.1 3.3 21.5 3.4 27.7 3.4c0-10.7 0-21.3 0-32c-6.6 0-13.2-.3-17.9-1.8c-2.2-.7-2.7-1.3-2.6-1.2c.5 .5 .4 1.1 .4 .5c-10.7 0-21.3 0-32 0zm16-19.9l16 0c0-6.7-4.2-12.7-10.5-15c-1.8 5-3.7 10-5.5 15zM429.9 440l10.2-12.3c-5.2-4.3-12.4-4.9-18.2-1.5c2.7 4.6 5.3 9.3 8 13.9c0-.1 0 0 0-.1zm-25.2-3.9l16 27.7c-.1 .1 0 0-.1 .1c-5.3-9.3-10.6-18.5-15.9-27.8zm-12-15.8c-3.3-5.8-6.5-11.7-7.6-16.6c-.5-2.3-.2-3.1-.3-2.9c-.2 .7-.7 .9-.2 .6c-5.3-9.2-10.7-18.5-16-27.7c.1 0 0 0 .1 0c-7.3 4.2-12.3 10.4-14.5 17.8c-2.1 6.9-1.5 13.7-.3 19.1c2.3 10.4 8 20.4 11.1 25.7c9.2-5.3 18.5-10.7 27.7-16zm1-42.6c2.7 4.6 5.3 9.3 8 13.9c5.8-3.3 8.9-10 7.8-16.5c-5.3 .9-10.5 1.8-15.8 2.7zm0-35.3l15.8 2.6c1.1-6.6-2-13.2-7.8-16.6c-2.7 4.6-5.3 9.3-8 13.9c0 .1 0 0 0 .1zm-9.1-23.8l-16 27.7c5.7 3.3 11.4 6.6 17.1 9.9c5.3-9.2 10.7-18.5 16-27.7c-5.7-3.3-11.4-6.6-17.1-9.9zm7.8-18.3c0-.1 .1-.2 .2-.3c-9.3-5.3-18.5-10.7-27.8-16c-.1 .1-.1 .2-.2 .3c9.2 5.3 18.5 10.7 27.8 16zM378.7 292c4.6 2.7 9.3 5.3 13.9 8c-4.6-2.7-9.3-5.3-14-8c.1 0 0 0 .1 0zm76.2-44.7c-12.9 4.8-24.8 11.7-35.2 20.3c6.8 8.2 13.6 16.4 20.4 24.6c7.6-6.3 16.3-11.4 25.8-14.9c-3.7-10.1-7.3-20.1-11-30.1zm-10.5 15l32 .1c0-6.6 0-13.3 0-19.9c-10.7 0-21.3 0-32 0c0 6.5 0 13.2 0 19.8zm104.1 .2c0-6.7 0-13.3 .1-20c-10.6 0-21.3 0-32 0c0 6.7 0 13.3 0 20c10.7 0 21.3 0 32 0zm24.5 5.3c-10.3-8.6-22.1-15.5-35-20.3c-3.7 10-7.4 20-11.1 30c9.4 3.5 18.1 8.6 25.6 14.9c6.8-8.2 13.7-16.4 20.5-24.6zm-18.2-1.5c5.3 9.2 10.7 18.5 16 27.7c5.9-3.4 11.7-6.7 17.5-10.1c-5.3-9.2-10.7-18.5-16-27.7c-5.8 3.4-11.6 6.7-17.4 10.1zm69.5 80l-16.1-27.7c-5.8 3.4-11.7 6.7-17.5 10.1c5.3 9.2 10.7 18.5 16 27.7c.1 0 0 0 .1 0c5.8-3.4 11.7-6.7 17.5-10.1zm14.3-17.7c2.1-6.9 1.6-13.6 .4-18.9c-2.2-10.4-7.8-20.3-10.9-25.7c-9.3 5.3-18.5 10.7-27.8 16c3.3 5.7 6.3 11.6 7.4 16.4c.5 2.3 .2 3 .3 2.8c.2-.7 .7-.9 .2-.7c5.3 9.2 10.7 18.5 16 27.7c.1 .1 0 0 .1 .1c7.2-4.2 12.1-10.3 14.3-17.7zm-24 51.6c2.2-13.1 2.2-27.2 0-40.3c-10.5 1.8-21.1 3.5-31.6 5.3c1.6 9.6 1.6 20 0 29.6c10.5 1.8 21.1 3.5 31.6 5.3c0 .1 0 0 0 .1zm-7.8-16.6c-5.3 9.2-10.7 18.5-16 27.7c5.9 3.4 11.7 6.7 17.5 10.1c5.4-9.2 10.8-18.4 16.2-27.6c-5.9-3.4-11.7-6.8-17.6-10.2zm17.4 10.1c.1 .1 0 0 .2 .1c-5.4 9.2-10.8 18.4-16.2 27.6c5.3-9.2 10.7-18.5 16-27.7zm-29.5 93.8c7-1.6 12.6-5.4 16.6-9.1c7.9-7.1 13.7-17 16.8-22.3c-9.2-5.3-18.5-10.6-27.7-16c-3.3 5.7-6.8 11.3-10.5 14.6c-1.7 1.6-2.5 1.7-2.3 1.7c.7-.2 1.2 .2 .7-.1c-5.3 9.2-10.7 18.5-16 27.7c-.1-.1 0 0-.1-.1c7.2 4.2 15 5.3 22.5 3.6zm-56.6 5c12.9-4.8 24.7-11.7 35-20.3c-6.8-8.2-13.7-16.4-20.5-24.6c-7.6 6.3-16.2 11.4-25.6 14.9c3.8 10 7.5 20 11.1 30zm-14 36.1c5.2-1.7 11.3-4.6 16.2-9.8c5.2-5.6 8.1-12.9 8.1-21.3c-10.6 0-21.3 0-31.9 0c0 .5 0 0 .4-.5c.1-.1-.4 .5-2.6 1.2c-4.7 1.5-11.3 1.8-17.9 1.8c0 10.7 0 21.3 0 32c6.2 0 17.6-.1 27.7-3.4zm-79.7-51l0 19.9c10.6 0 21.3 0 32 0c0-6.6 0-13.3 0-19.9c-10.7 0-21.3 0-32 0zm-24.8-5.2c10.4 8.6 22.3 15.5 35.2 20.3c3.7-10 7.3-20 11-30c-9.5-3.5-18.2-8.5-25.8-14.9c-6.8 8.2-13.6 16.4-20.4 24.6zm18.2 1.6l-16-27.7c-5.7 3.3-11.4 6.5-17.1 9.8c5.3 9.3 10.7 18.5 15.9 27.8c5.7-3.3 11.4-6.6 17.2-9.9zm-56.4 4.7c4.1 3.7 9.7 7.6 16.9 9.1c7.6 1.6 15.3 .2 22.4-3.9c-5.3-9.3-10.6-18.5-15.9-27.8c-.9 .5-.6 .1 .2 .3c.3 .1-.3 0-1.8-1.4c-3.5-3.2-6.8-8.6-10.3-14.8c-9.3 5.4-18.5 10.7-27.8 16.1c3 5.2 8.6 15.3 16.4 22.4zm4.3-94.9l-17.1 9.9c5.3 9.2 10.7 18.5 16 27.7c5.7-3.3 11.4-6.6 17.1-9.9c-5.3-9.3-10.7-18.5-16-27.8zM378 339.6c-2.3 13.3-2.3 27.4 0 40.7c10.5-1.8 21-3.5 31.5-5.3c-1.7-9.7-1.7-20.2 0-29.9c-10.5-1.8-21-3.6-31.5-5.4c0-.1 0 0 0-.1zm-24.5-29.9c-1.2 5.4-1.7 12.2 .6 19.1c2.4 7.4 7.5 13.4 14.6 17.4c5.3-9.2 10.7-18.5 16-27.7c-.9-.5-.4-.5-.2 .3c.1 .3-.2-.2 .3-2.3c1-4.6 4.1-10.2 7.6-16.3c-9.3-5.3-18.5-10.6-27.8-15.9c-3 5.2-8.9 15.1-11.1 25.4zm44.7-57.1c-7 1.6-12.6 5.4-16.6 9.1c-7.9 7.1-13.7 16.9-16.8 22.3c9.2 5.3 18.5 10.7 27.8 16c3.2-5.7 6.7-11.3 10.4-14.6c1.7-1.6 2.5-1.7 2.3-1.7c-.7 .2-1.2-.2-.7 .1c5.4-9.2 10.7-18.4 16.1-27.6c-7.2-4.2-15-5.3-22.5-3.6zM520.4 360.3c0 13.3-10.7 24-24 24c0 10.7 0 21.3 0 32c30.9 0 56-25.1 56-56c-10.7 0-21.3 0-32 0zm-24-24c13.3 0 24 10.7 24 24c10.7 0 21.3 0 32 0c0-30.9-25.1-56-56-56c0 10.7 0 21.3 0 32zm-24 24c0-13.3 10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24zm-32 0c0 30.9 25.1 56 56 56s56-25.1 56-56s-25.1-56-56-56s-56 25.1-56 56z"
  }));
}

/***/ }),

/***/ "./src/Save.jsx":
/*!**********************!*\
  !*** ./src/Save.jsx ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Save; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);

/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 * @return {WPElement} Element to render.
 */
function Save() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null);
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _Edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Edit */ "./src/Edit.jsx");
/* harmony import */ var _Save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Save */ "./src/Save.jsx");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Icon */ "./src/Icon.jsx");
/* harmony import */ var _variations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./variations */ "./src/variations.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

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






const {
  name
} = _block_json__WEBPACK_IMPORTED_MODULE_6__;
const settings = {
  icon: _Icon__WEBPACK_IMPORTED_MODULE_4__["default"],
  /**
   * @see ./Edit.jsx
   */
  edit: _Edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./Save.jsx
   */
  save: _Save__WEBPACK_IMPORTED_MODULE_3__["default"],
  variations: _variations__WEBPACK_IMPORTED_MODULE_5__["default"]
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(name, {
  ..._block_json__WEBPACK_IMPORTED_MODULE_6__,
  ...settings
});

/***/ }),

/***/ "./src/variations.js":
/*!***************************!*\
  !*** ./src/variations.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress Dependencies
 */

/* harmony default export */ __webpack_exports__["default"] = ([{
  name: 'tabs-horizontal',
  isDefault: true,
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Horizontal Tabs'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('A set of tabs that display horizontally'),
  attributes: {
    className: 'is-style-tabbed',
    vertical: false
  },
  innerBlocks: [['prc-block/tabs-menu', {}], ['prc-block/tabs-panes', {}]],
  scope: ['inserter', 'transform'],
  isActive: blockAttributes => false === blockAttributes.vertical
}, {
  name: 'tabs-vertical',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Vertical Tabs'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('A set of tabs that display vertically.'),
  attributes: {
    className: 'is-style-tabbed',
    vertical: true
  },
  innerBlocks: [['prc-block/tabs-menu', {}], ['prc-block/tabs-panes', {}]],
  scope: ['inserter', 'transform'],
  isActive: blockAttributes => true === blockAttributes.vertical
}]);

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/tabs","version":"0.1.0","title":"Tabs","description":"Create horizontal or vertical tabbed content.","keywords":["tabs","tabbed content","tabbed content"],"category":"design","icon":"editor-kitchensink","attributes":{"active":{"type":"string","default":null},"vertical":{"type":"boolean","default":false}},"providesContext":{"prc-block/tabs/active":"active","prc-block/tabs/layout":"vertical"},"example":{"attributes":{"active":"tab-1","vertical":false,"className":"is-style-tabbed"},"innerBlocks":[{"name":"prc-block/tabs-menu","attributes":{},"innerBlocks":[{"name":"prc-block/tabs-menu-item","attributes":{"title":"Tab 1","slug":"tab-1","uuid":"tab-1"}},{"name":"prc-block/tabs-menu-item","attributes":{"title":"Tab 2","slug":"tab-2","uuid":"tab-2"}}]},{"name":"prc-block/tabs-panes","attributes":{},"innerBlocks":[{"name":"prc-block/tabs-pane","attributes":{"uuid":"pane-1"},"innerBlocks":[{"name":"core/paragraph","attributes":{"content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam lorem, eget aliquam nisl nisl eget nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam lorem, eget aliquam nisl nisl eget nisl."}}]},{"name":"prc-block/tabs-pane","attributes":{"uuid":"pane-2"},"innerBlocks":[{"name":"core/paragraph","attributes":{"content":"Magna tempor officia reprehenderit labore ipsum. Sit et mollit esse consectetur reprehenderit cillum excepteur reprehenderit dolore in dolore officia elit reprehenderit. Elit consequat occaecat dolor laboris Lorem officia. Pariatur laborum Lorem dolore laboris reprehenderit amet sunt consectetur dolor ut cillum consequat."}}]}]}],"viewportWidth":900},"styles":[{"name":"tabbed","label":"Tabbed","isDefault":true},{"name":"text","label":"Text"},{"name":"accordion","label":"Accordion"}],"supports":{"html":false,"color":{"background":true,"text":true},"spacing":{"padding":true,"margin":true},"typography":{"fontSize":true,"__experimentalFontFamily":true}},"textdomain":"tabs-controller","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js"}');

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
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
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
/******/ 	}();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
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
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
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
/******/ 		var chunkLoadingGlobal = self["webpackChunktabs_controller"] = self["webpackChunktabs_controller"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map