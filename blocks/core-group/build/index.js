/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Controls.jsx":
/*!**************************!*\
  !*** ./src/Controls.jsx ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Controls; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);

/**
 * WordPress Dependencies
 */





function Controls(_ref) {
  let {
    attributes,
    setAttributes
  } = _ref;
  const {
    isSticky,
    responsiveAttachId,
    responsiveThreshold,
    responsiveContainerQuery
  } = attributes;
  const {
    hideOnDesktop,
    hideOnTablet,
    hideOnMobile
  } = responsiveContainerQuery || {};
  const {
    allowNewControls
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const {
      getCurrentTheme
    } = select('core');
    const theme = getCurrentTheme();
    return {
      allowNewControls: 'prc-block-theme' === (theme === null || theme === void 0 ? void 0 : theme.stylesheet) || ''
    };
  }, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, allowNewControls && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Device Visibility')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hide on Desktop'),
    checked: hideOnDesktop,
    onChange: () => setAttributes({
      responsiveContainerQuery: {
        ...attributes.responsiveContainerQuery,
        hideOnDesktop: !hideOnDesktop
      }
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hide on Tablet'),
    checked: hideOnTablet,
    onChange: () => setAttributes({
      responsiveContainerQuery: {
        ...attributes.responsiveContainerQuery,
        hideOnTablet: !hideOnTablet
      }
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hide on Mobile'),
    checked: hideOnMobile,
    onChange: () => setAttributes({
      responsiveContainerQuery: {
        ...attributes.responsiveContainerQuery,
        hideOnMobile: !hideOnMobile
      }
    })
  }))), !allowNewControls && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorAdvancedControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sticky On Scroll?'),
    checked: isSticky,
    onChange: () => setAttributes({
      isSticky: !isSticky
    }),
    help: "Enable sticky on scroll for this group, this will be disabled when you reach the responsive threshold as its intended for desktop only."
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Responsive Attachment ID'),
    value: responsiveAttachId,
    onChange: val => setAttributes({
      responsiveAttachId: val
    }),
    placeholder: "e.g. #my-id"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalNumberControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Responsive Threshold'),
    value: responsiveThreshold,
    onChange: val => setAttributes({
      responsiveThreshold: val
    }),
    max: 3540,
    min: 320,
    isDragEnabled: true,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(`The responsive threshold is the point at which the group block and it's contents will trigger their mobile behavior. The default is 640px (small tablet), but you can change this to any value you like. If you would like to trigger the mobile behavior of a block immediately regardless of device size then use the maximum value of 3540.`)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CardDivider, null)));
}

/***/ }),

/***/ "./src/Icons.jsx":
/*!***********************!*\
  !*** ./src/Icons.jsx ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CardAltIcon": function() { return /* binding */ CardAltIcon; },
/* harmony export */   "CardIcon": function() { return /* binding */ CardIcon; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress Dependencies
 */


function CardIcon() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 384 512",
    height: 21,
    preserveAspectRatio: "xMidYMid meet"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
    d: "M182.1 347.8L97.37 262.2C72.9 237.4 74.21 196.3 101.7 173.1C125.3 153 161.6 156.9 183.5 178.7L192.2 187.7L200.5 178.7C222.3 156.9 258.2 153 282.6 173.1C309.7 196.3 311.1 237.4 286.6 262.2L202.2 347.8C196.6 353.4 187.4 353.4 182.1 347.8H182.1zM0 64C0 28.65 28.65 0 64 0H320C355.3 0 384 28.65 384 64V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64zM48 64V448C48 456.8 55.16 464 64 464H320C328.8 464 336 456.8 336 448V64C336 55.16 328.8 48 320 48H64C55.16 48 48 55.16 48 64z"
  }));
}
function CardAltIcon() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 384 512",
    height: 21,
    preserveAspectRatio: "xMidYMid meet"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Path, {
    d: "M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM80 221.3c0-33.8 27.4-61.3 61.3-61.3c16.2 0 31.8 6.5 43.3 17.9l7.4 7.4 7.4-7.4c11.5-11.5 27.1-17.9 43.3-17.9c33.8 0 61.3 27.4 61.3 61.3c0 16.2-6.5 31.8-17.9 43.3l-82.7 82.7c-6.2 6.2-16.4 6.2-22.6 0L97.9 264.6C86.5 253.1 80 237.5 80 221.3z"
  }));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Controls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Controls */ "./src/Controls.jsx");
/* harmony import */ var _variations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./variations */ "./src/variations.js");
/* harmony import */ var _transforms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transforms */ "./src/transforms.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");


/* eslint-disable max-len */
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

const BLOCKNAME = 'core/group';
const BLOCKIDENTIFIER = 'prc-block/core-group';
(0,_variations__WEBPACK_IMPORTED_MODULE_5__["default"])();
(0,_transforms__WEBPACK_IMPORTED_MODULE_6__["default"])();

/**
 * Add the responsiveContainerQuery controls to the core/group block.
 */
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('editor.BlockEdit', `${BLOCKIDENTIFIER}-controls`, (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.createHigherOrderComponent)(BlockEdit => function CoreGroup(props) {
  const {
    name,
    attributes,
    setAttributes,
    clientId
  } = props;
  if (BLOCKNAME !== name) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BlockEdit, props);
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_Controls__WEBPACK_IMPORTED_MODULE_4__["default"], {
    attributes,
    setAttributes,
    clientId
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BlockEdit, props));
}, 'withCoreGroupControls'), 21);

/**
 * Add html attributes for each responsiveContainerQuery attribute value on the core/group block.
 */
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('editor.BlockListBlock', `${BLOCKIDENTIFIER}-wrapper-props`, (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.createHigherOrderComponent)(BlockListBlock => {
  return props => {
    const {
      attributes,
      wrapperProps,
      name
    } = props;
    if (BLOCKNAME !== name) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BlockListBlock, props);
    }
    const {
      responsiveContainerQuery: {
        hideOnDesktop,
        hideOnTablet,
        hideOnMobile
      } = {}
    } = attributes;
    const newWrapperProps = {
      ...wrapperProps,
      'data-hide-on-desktop': hideOnDesktop,
      'data-hide-on-tablet': hideOnTablet,
      'data-hide-on-mobile': hideOnMobile
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BlockListBlock, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      wrapperProps: newWrapperProps
    }));
  };
}, 'withCoreGroupResponsiveWrapper'));

/**
 * Add support for left and right alignment, and add transform support from prc-block/callout to group.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('blocks.registerBlockType', `${BLOCKIDENTIFIER}-supports`, settings => {
  if (BLOCKNAME !== settings.name) {
    return settings;
  }
  if ('undefined' !== typeof settings.supports.align) {
    // During the group block's development the alignment options have changed, here we are enforcing all alignments to be available.
    settings.supports.align = ['left', 'right', 'center', 'wide', 'full'];
  }
  return settings;
});

/***/ }),

/***/ "./src/transforms.js":
/*!***************************!*\
  !*** ./src/transforms.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ registerTransforms; }
/* harmony export */ });
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* eslint-disable max-len */
/**
 * WordPress Dependencies
 */


const BLOCKNAME = 'core/group';
const BLOCKIDENTIFIER = 'prc-block/core-group-transforms';
function registerTransforms() {
  /**
   * Add support for left and right alignment, and add transform support from prc-block/callout to group.
   *
   * @param {Object} settings Settings for the block.
   *
   * @return {Object} settings Modified settings.
   */
  (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.registerBlockType', BLOCKIDENTIFIER, settings => {
    if (BLOCKNAME !== settings.name) {
      return settings;
    }
    if ('undefined' !== typeof settings.transforms) {
      // Handle legacy prc-block/callout block to be converted to a group with the callout style.
      if ('undefined' !== typeof settings.transforms.from) {
        settings.transforms.from.push({
          type: 'block',
          blocks: ['core/group', 'prc-block/callout'],
          transform: (attributes, innerBlocks) => (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.createBlock)(BLOCKNAME, {
            className: 'is-style-callout',
            backgroundColor: 'beige',
            ...attributes
          }, innerBlocks)
        });

        // Handle converting div html with a class of `callout` to a group block with the same style.
        settings.transforms.from.push({
          type: 'raw',
          isMatch: node =>
          // If the element has a class of callout return true and proceed to trasnform...
          node.classList.contains('callout'),
          transform: node => {
            // Loop through the node child nodes and get its outerHtml and create a block from the HTML string, then add that to innerBlocks.
            const innerBlocks = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.rawHandler)({
              HTML: node.innerHTML
            });
            const attrs = {
              className: 'is-style-callout',
              backgroundColor: 'beige'
            };
            if (node.getAttribute('align')) {
              attrs.align = node.getAttribute('align');
            }
            return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.createBlock)(BLOCKNAME, attrs, [...innerBlocks]);
          },
          priority: 11
        });
      }
    }
    return settings;
  });
}

/***/ }),

/***/ "./src/variations.js":
/*!***************************!*\
  !*** ./src/variations.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ registerVariations; }
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icons */ "./src/Icons.jsx");
/**
 * WordPress Dependencies
 */



/**
 * Internal Dependencies
 */

const BLOCKNAME = 'core/group';

/**
 * Register variations for the core/group block.
 *
 * Includes:
 * - "Callout"
 * - "Card"
 * - "Card (alt)" - aka "Baseball Card"
 * - "Social Group"
 *
 * @return {void}
 */
function registerVariations() {
  /**
   * Callout Block
   */
  (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockVariation)(BLOCKNAME, {
    name: 'callout',
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Callout'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('A Group block in the "Callout" style with a oatmeal background and pre-set innerblocks'),
    attributes: {
      className: 'is-style-callout',
      backgroundColor: 'beige'
    },
    innerBlocks: [['core/heading'], ['core/paragraph']],
    isActive: (blockAttributes, variationAttributes) => blockAttributes.className && blockAttributes.className === variationAttributes.className
  });

  /**
   * Card Block
   */
  (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockVariation)(BLOCKNAME, {
    name: 'card',
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Card'),
    icon: _Icons__WEBPACK_IMPORTED_MODULE_2__.CardIcon,
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('A Group block in the "Card" format with a heading with a border, image, text, and read more link.'),
    attributes: {
      className: 'is-style-card'
    },
    innerBlocks: [['core/heading', {
      className: 'is-style-section-header',
      level: 3,
      placeholder: 'Signature Reports...'
    }], ['core/image'], ['prc-block/story-item', {
      className: 'is-style-disabled'
    }]],
    isActive: _ref => {
      let {
        className
      } = _ref;
      return 'is-style-card' === className;
    }
  });

  /**
   * Baseball Card "Alt" Block
   */
  (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockVariation)(BLOCKNAME, {
    name: 'card-alt',
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Card (Alt)'),
    icon: _Icons__WEBPACK_IMPORTED_MODULE_2__.CardAltIcon,
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('A Group block in the "Card" format with a sub header heading in a black background, image, text, and read more link.'),
    attributes: {
      className: 'is-style-card-alt'
    },
    innerBlocks: [['core/heading', {
      className: 'is-style-sub-header',
      level: 3,
      placeholder: 'Most Popular Posts...',
      backgroundColor: 'slate',
      textColor: 'white'
    }], ['prc-block/story-item', {
      className: 'is-style-disabled'
    }]],
    isActive: _ref2 => {
      let {
        className
      } = _ref2;
      return 'is-style-card-alt' === className;
    }
  });

  /**
   * Social Group Block
   */
  (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockVariation)(BLOCKNAME, {
    name: 'social-group',
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Social Group'),
    icon: 'share-alt2',
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('A Group block that allows you to override the share meta for content inside.'),
    attributes: {
      className: 'is-style-social-group',
      templateLock: true
    },
    innerBlocks: [[BLOCKNAME, {
      templateLock: false
    }, [['core/paragraph', {
      placeholder: 'Add visual content here...'
    }]]], ['core/social-links', {
      iconColor: 'text-color',
      iconColorValue: '#2a2a2a',
      size: 'has-small-icon-size',
      className: 'is-style-logos-only'
    }, [['prc-block/social-share-url-field', {}], ['core/social-link', {
      service: 'facebook'
    }], ['core/social-link', {
      service: 'twitter'
    }], ['core/social-link', {
      service: 'linkedin'
    }]]]],
    isActive: (blockAttributes, variationAttributes) => blockAttributes.className && blockAttributes.className === variationAttributes.className
  });
}

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ (function(module) {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _extends; }
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

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
/******/ 		var chunkLoadingGlobal = self["webpackChunkcore_group"] = self["webpackChunkcore_group"] || [];
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