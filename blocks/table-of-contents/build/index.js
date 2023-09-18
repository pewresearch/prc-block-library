/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../../node_modules/classnames/index.js":
/*!****************************************************!*\
  !*** ../../../../node_modules/classnames/index.js ***!
  \****************************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var nativeCodeString = '[native code]';

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
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
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

/***/ "./src/Controls.jsx":
/*!**************************!*\
  !*** ./src/Controls.jsx ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Controls)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);

/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */





function Controls(_ref) {
  let {
    attributes,
    setAttributes,
    clientId,
    colors
  } = _ref;
  const {
    showCurrentChapter,
    hideHeading,
    className
  } = attributes;
  const colorSettings = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const {
      textColor,
      setTextColor,
      backgroundColor,
      setBackgroundColor,
      dropdownBackgroundColor,
      setDropdownBackgroundColor,
      dropdownTextColor,
      setDropdownTextColor,
      headingBackgroundColor,
      setHeadingBackgroundColor,
      headingTextColor,
      setHeadingTextColor
    } = colors;
    const t = [{
      value: dropdownTextColor?.color,
      onChange: setDropdownTextColor,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('(Mobile) Dropdown Text')
    }, {
      value: dropdownBackgroundColor?.color,
      onChange: setDropdownBackgroundColor,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('(Mobile) Dropdown Background')
    }, {
      value: headingTextColor?.color,
      onChange: setHeadingTextColor,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('(Desktop) Heading Text')
    }, {
      value: headingBackgroundColor?.color,
      onChange: setHeadingBackgroundColor,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('(Desktop) Heading Background')
    }, {
      value: textColor?.color,
      onChange: setTextColor,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text')
    }, {
      value: backgroundColor?.color,
      onChange: setBackgroundColor,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background')
    }];
    if ('is-style-dropdown' === className) {
      // change the label of the first item to just be "Dropdown Text" and the second to just be "Dropdown Background", remove the 3rd and 4th items.
      t[0].label = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Dropdown Text');
      t[1].label = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Dropdown Background');
      t.splice(2, 2);
    }
    return t;
  }, [colors, className]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, {
    group: "styles"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.PanelColorSettings, {
    __experimentalHasMultipleOrigins: true,
    __experimentalIsRenderedInSidebar: true,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color'),
    disableCustomColors: true,
    colorSettings: colorSettings
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Settings', 'prc-block-library')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Highlight Current Chapter'),
    checked: showCurrentChapter,
    onChange: () => {
      setAttributes({
        showCurrentChapter: !showCurrentChapter
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Highlight the current chapter in the table of contents when scrolling.', 'prc-block-library')
  }), 'is-style-default' === className && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hide Heading'),
    checked: hideHeading,
    onChange: () => {
      setAttributes({
        hideHeading: !hideHeading
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hide the heading from the front end when in "Baseball Card" style.', 'prc-block-library')
  }))));
}

/***/ }),

/***/ "./src/Edit.jsx":
/*!**********************!*\
  !*** ./src/Edit.jsx ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "../../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Controls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Controls */ "./src/Controls.jsx");
/* harmony import */ var _useCollectChapters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useCollectChapters */ "./src/useCollectChapters.js");

/**
 * External Dependencies
 */


/**
 * WordPress Dependencies
 */



/**
 * Internal Dependencies
 */


function getBlockPropsForVariation(variation, attributes, colors) {}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
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
    isSelected,
    textColor,
    setTextColor,
    backgroundColor,
    setBackgroundColor,
    dropdownBackgroundColor,
    setDropdownBackgroundColor,
    dropdownTextColor,
    setDropdownTextColor,
    headingBackgroundColor,
    setHeadingBackgroundColor,
    headingTextColor,
    setHeadingTextColor
  } = _ref;
  const isSiteEditor = false;
  const {
    chapters = [],
    backChapters = []
  } = (0,_useCollectChapters__WEBPACK_IMPORTED_MODULE_4__["default"])({
    clientId,
    context
  });
  const {
    heading,
    showCurrentChapter,
    className,
    hideHeading
  } = attributes;
  // Construct a colors object that contains the color values and helper functions, re-compute whenever the color values change.
  const colors = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    textColor,
    setTextColor,
    backgroundColor,
    setBackgroundColor,
    dropdownBackgroundColor,
    setDropdownBackgroundColor,
    dropdownTextColor,
    setDropdownTextColor,
    headingBackgroundColor,
    setHeadingBackgroundColor,
    headingTextColor,
    setHeadingTextColor
  }), [textColor, setTextColor, backgroundColor, setBackgroundColor, dropdownBackgroundColor, setDropdownBackgroundColor, dropdownTextColor, setDropdownTextColor, headingBackgroundColor, setHeadingBackgroundColor, headingTextColor, setHeadingTextColor]);
  const blockWrapperClassNames = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, {
      'has-text-color': !!colors.textColor.color || !!colors.textColor?.class,
      [(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.getColorClassName)('color', colors.textColor?.slug)]: !!colors.textColor?.slug,
      'has-background': !!colors.backgroundColor.color || colors.backgroundColor.class,
      [(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.getColorClassName)('background-color', colors.backgroundColor?.slug)]: !!colors.backgroundColor?.slug
    });
  }, [colors.textColor, colors.backgroundColor, className]);
  const blockWrapperStyles = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      color: !colors.textColor?.slug && colors.textColor?.color,
      backgroundColor: !colors.backgroundColor?.slug && colors.backgroundColor?.color
    };
  }, [colors.textColor, colors.backgroundColor]);
  const headingClassNames = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return classnames__WEBPACK_IMPORTED_MODULE_1___default()('wp-block-prc-block-table-of-contents__heading', {
      'has-text-color': !!colors.headingTextColor.color || !!colors.headingTextColor?.class,
      [(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.getColorClassName)('color', colors.headingTextColor?.slug)]: !!colors.headingTextColor?.slug,
      'has-background': !!colors.headingBackgroundColor.color || colors.headingBackgroundColor.class,
      [(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.getColorClassName)('background-color', colors.headingBackgroundColor?.slug)]: !!colors.headingBackgroundColor?.slug,
      'is-hidden': hideHeading
    });
  }, [colors.headingTextColor, colors.headingBackgroundColor, hideHeading]);
  const headingStyles = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return {
      color: !colors.headingTextColor?.slug && colors.headingTextColor?.color,
      backgroundColor: !colors.headingBackgroundColor?.slug && colors.headingBackgroundColor?.color
    };
  }, [colors.headingTextColor, colors.headingBackgroundColor]);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
    className: blockWrapperClassNames,
    style: blockWrapperStyles
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Controls__WEBPACK_IMPORTED_MODULE_3__["default"], {
    attributes,
    setAttributes,
    colors: {
      textColor,
      setTextColor,
      backgroundColor,
      setBackgroundColor,
      headingBackgroundColor,
      setHeadingBackgroundColor,
      headingTextColor,
      setHeadingTextColor
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: 'h2',
    placeholder: 'Table of Contents',
    value: heading,
    onChange: newHeading => setAttributes({
      heading: newHeading
    }),
    className: headingClassNames,
    style: headingStyles
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "wp-block-prc-block-table-of-contents__list"
  }, 0 !== chapters.length && chapters.map(chapter => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, chapter.title)), 0 !== backChapters.length && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "wp-block-prc-block-table-of-contents__back-chapters"
  }, backChapters.map(chapter => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, chapter.title))))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.withColors)({
  textColor: 'color'
}, {
  backgroundColor: 'color'
}, {
  dropdownBackgroundColor: 'color'
}, {
  dropdownTextColor: 'color'
}, {
  headingBackgroundColor: 'color'
}, {
  headingTextColor: 'color'
})(Edit));

/***/ }),

/***/ "./src/Icon.jsx":
/*!**********************!*\
  !*** ./src/Icon.jsx ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _prc_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @prc/icons */ "@prc/icons");
/* harmony import */ var _prc_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prc_icons__WEBPACK_IMPORTED_MODULE_1__);

/**
 * External Dependencies
 */

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_prc_icons__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: _prc_icons__WEBPACK_IMPORTED_MODULE_1__.icons.faListTree,
    height: 18,
    preserveAspectRatio: "xMidYMid meet"
  });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _Edit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Edit */ "./src/Edit.jsx");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Icon */ "./src/Icon.jsx");
/* harmony import */ var _variations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./variations */ "./src/variations.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
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





// import deprecated from './deprecated';


const {
  name
} = _block_json__WEBPACK_IMPORTED_MODULE_8__;
const settings = {
  /**
   * @see ./Icon.jsx
   */
  icon: _Icon__WEBPACK_IMPORTED_MODULE_6__["default"],
  /**
   * @see ./Edit.jsx
   */
  edit: _Edit__WEBPACK_IMPORTED_MODULE_5__["default"],
  // deprecated,
  variations: _variations__WEBPACK_IMPORTED_MODULE_7__["default"]
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(name, {
  ..._block_json__WEBPACK_IMPORTED_MODULE_8__,
  ...settings
});

/**
 * Unregister the core/table-of-contents block, since we are replacing it with our own.
 */
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default()(() => {
  (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.unregisterBlockType)('core/table-of-contents');
  (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.unregisterBlockType)('yoast-seo/table-of-contents');
});

/***/ }),

/***/ "./src/useBackChapters.js":
/*!********************************!*\
  !*** ./src/useBackChapters.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useBackChapters)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/**
 * WordPress Dependencies
 */




function useBackChapters(postId, postType) {
  const [hiddenBackChapters, setHiddenBackChapters] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const {
    records,
    isResolving,
    hasResolved
  } = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__.useEntityRecords)('postType', postType, {
    per_page: 25,
    _fields: ['id', 'link', 'post_parent', 'title', 'type', 'menu_order'],
    post_parent: postId
  });
  const hideBackChapter = chapterId => {
    if (hiddenBackChapters.includes(chapterId)) {
      setHiddenBackChapters(hiddenBackChapters.filter(id => id !== chapterId));
    } else {
      setHiddenBackChapters([...hiddenBackChapters, chapterId]);
    }
  };
  const backChapters = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    console.log('useBackChapters', records, isResolving, postId, postType);
    if (!records || isResolving) {
      return [];
    }
    return records;
  }, [records, isResolving]);
  return {
    backChapters,
    hiddenBackChapters,
    hideBackChapter
  };
}

/***/ }),

/***/ "./src/useCollectChapters.js":
/*!***********************************!*\
  !*** ./src/useCollectChapters.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useCollectChapters)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _useBackChapters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useBackChapters */ "./src/useBackChapters.js");
/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */



/**
 * Internal Dependencies
 */

function useCollectChapters(_ref) {
  let {
    clientId,
    context
  } = _ref;
  const {
    postId,
    postType
  } = context;
  const {
    backChapters
  } = (0,_useBackChapters__WEBPACK_IMPORTED_MODULE_2__["default"])(postId, postType);
  const {
    chapters = []
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    // Currently we're just getting all blocks in the editor context, need to see what this brings in when on the site editor.
    const blocks = select('core/block-editor').getBlocks();
    const placeholder = [{
      attributes: {
        content: 'Chapter 1...'
      }
    }, {
      attributes: {
        content: 'Chapter 2...'
      }
    }, {
      attributes: {
        content: 'Chapter 3...'
      }
    }];
    const foundChapters = blocks.filter(block => 'core/heading' === block.name && block.attributes?.isChapter === true);
    return {
      chapters: 0 === foundChapters.length ? placeholder : foundChapters
    };
  }, [clientId]);
  console.log('chapters', chapters);
  console.log('backChapters', backChapters);

  // Memoize chapters, so that we don't have to recalculate them on every render.
  // This is important because we're using the chapters in a useEffect hook.
  // If we didn't memoize, the useEffect would run on every render.

  const memoizedChapters = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!chapters) {
      return [];
    }
    return chapters.map(chapter => ({
      clientId: chapter.clientId,
      title: chapter.attributes?.content
    }));
  }, [chapters]);
  const memoizedBackChapters = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!backChapters) {
      return [];
    }
    return backChapters.map(chapter => ({
      id: chapter.id,
      title: chapter.title?.rendered
    }));
  }, [backChapters]);
  return {
    chapters: memoizedChapters,
    backChapters: memoizedBackChapters
  };
}

/***/ }),

/***/ "./src/variations.js":
/*!***************************!*\
  !*** ./src/variations.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress Dependencies
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([{
  name: 'table-of-contents',
  isDefault: true,
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Table of Contents (Default)'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('The default table of contents block. Displays a list of links to chapters and back-chapters in a post in a "Baseball Card" style. On mobile this transforms to a dropdown.'),
  attributes: {
    className: 'is-style-default'
  },
  scope: ['inserter', 'transform'],
  isActive: (blockAttributes, variationAttributes) => variationAttributes.className === blockAttributes.className
}, {
  name: 'table-of-contents-dropdown',
  isDefault: true,
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Table of Contents (Dropdown)'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Displays a list of chapters and back-chapters in a post in a dropdown style.'),
  attributes: {
    className: 'is-style-dropdown'
  },
  scope: ['inserter', 'transform'],
  isActive: (blockAttributes, variationAttributes) => variationAttributes.className === blockAttributes.className
}]);

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@prc/icons":
/*!***************************!*\
  !*** external "prcIcons" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = window["prcIcons"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["url"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/table-of-contents","version":"0.1.0","title":"Table of Contents","category":"text","description":"Displays a list of all heading blocks set to chapter headings.","attributes":{"showCurrentChapter":{"type":"boolean","default":false},"dropdownBackgroundColor":{"type":"string","default":"white"},"dropdownTextColor":{"type":"string","default":"slate"},"headingBackgroundColor":{"type":"string","default":"slate"},"headingTextColor":{"type":"string","default":"white"},"backgroundColor":{"type":"string","default":"white"},"textColor":{"type":"string","default":"slate"},"heading":{"type":"string","default":"Table of Contents"},"hideHeading":{"type":"boolean","default":false}},"supports":{"anchor":true,"html":false,"align":["left","right"],"spacing":{"margin":["top","bottom","left","right"],"__experimentalDefaultControls":{"margin":true}},"position":{"sticky":true},"typography":{"__experimentalFontFamily":true,"__experimentalDefaultControls":{"__experimentalFontFamily":true}}},"example":{"attributes":{"className":"is-style-default"},"viewportWidth":320},"usesContext":["postId","postType"],"textdomain":"table-of-contents","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js"}');

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
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
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
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
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
/******/ 		var chunkLoadingGlobal = self["webpackChunktable_of_contents"] = self["webpackChunktable_of_contents"] || [];
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