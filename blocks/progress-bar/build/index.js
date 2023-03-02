/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Controls.jsx":
/*!**************************!*\
  !*** ./src/Controls.jsx ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    colors
  } = _ref;
  const {
    maxWidth,
    maxValue,
    currentValue,
    showAxisLabel,
    axisLabel,
    axisPadding,
    labelFormat,
    labelPositionDY,
    labelPositionDX
  } = attributes;
  const {
    barColor,
    setBarColor,
    backgroundColor,
    setBackgroundColor
  } = colors;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Layout')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Width'),
    withInputField: true,
    min: 0,
    max: 640,
    value: parseInt(maxWidth, 10),
    onChange: num => setAttributes({
      maxWidth: parseInt(num, 10)
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Data and Formatting')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show Category'),
    checked: showAxisLabel,
    onChange: () => setAttributes({
      showAxisLabel: !showAxisLabel
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Category'),
    value: axisLabel,
    disabled: !showAxisLabel,
    onChange: val => setAttributes({
      axisLabel: val
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalNumberControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Category Padding'),
    value: axisPadding,
    disabled: !showAxisLabel,
    disableUnits: true,
    disabledUnits: true,
    onChange: val => setAttributes({
      axisPadding: parseInt(val, 10)
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Flex, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalNumberControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Current value'),
    value: currentValue,
    disableUnits: true,
    disabledUnits: true,
    onChange: val => setAttributes({
      currentValue: parseFloat(val)
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalNumberControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Maximum value'),
    value: maxValue,
    disableUnits: true,
    disabledUnits: true,
    onChange: val => setAttributes({
      maxValue: parseFloat(val)
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.FlexItem, null))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Labels')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Label format'),
    value: labelFormat,
    options: [{
      value: 'fractional',
      label: 'Fractional'
    }, {
      value: 'percentage',
      label: 'Percentage'
    }],
    onChange: format => {
      setAttributes({
        labelFormat: format
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Flex, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalNumberControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Label Position DX'),
    value: labelPositionDX,
    onChange: value => setAttributes({
      labelPositionDX: parseInt(value, 10)
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalNumberControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Label Position DY'),
    value: labelPositionDY,
    onChange: value => setAttributes({
      labelPositionDY: parseInt(value, 10)
    })
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.PanelColorSettings, {
    __experimentalHasMultipleOrigins: true,
    __experimentalIsRenderedInSidebar: true,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Colors'),
    colorSettings: [{
      value: barColor.color,
      onChange: color => setBarColor(color),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bar')
    }, {
      value: backgroundColor.color,
      onChange: color => setBackgroundColor(color),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background')
    }]
  }));
}

/***/ }),

/***/ "./src/Edit.jsx":
/*!**********************!*\
  !*** ./src/Edit.jsx ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Controls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Controls */ "./src/Controls.jsx");
/* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ProgressBar */ "./src/ProgressBar.jsx");


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
    barColor,
    setBarColor,
    backgroundColor,
    setBackgroundColor
  } = _ref;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_Controls__WEBPACK_IMPORTED_MODULE_4__["default"], {
    attributes,
    setAttributes,
    colors: {
      barColor,
      setBarColor,
      backgroundColor,
      setBackgroundColor
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_ProgressBar__WEBPACK_IMPORTED_MODULE_5__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, attributes, {
    barColor: barColor.color,
    backgroundColor: backgroundColor.color
  })));
}
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.withColors)({
  barColor: 'color'
}, {
  backgroundColor: 'color'
})(Edit));

/***/ }),

/***/ "./src/ProgressBar.jsx":
/*!*****************************!*\
  !*** ./src/ProgressBar.jsx ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @prc/chart-builder */ "@prc/chart-builder");
/* harmony import */ var _prc_chart_builder__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__);

/**
 * External Dependencies
 */

function ProgressBar(_ref) {
  let {
    axisLabel,
    axisPadding,
    barColor,
    backgroundColor,
    currentValue,
    labelFormat,
    labelPositionDX,
    labelPositionDY,
    maxWidth,
    maxValue,
    showAxisLabel
  } = _ref;
  const config = {
    layout: {
      ..._prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__.baseConfig.layout,
      name: 'progress-chart',
      type: 'stacked-bar',
      orientation: 'horizontal',
      theme: 'PewTheme',
      width: maxWidth,
      height: 50,
      padding: {
        top: 0,
        bottom: 10,
        left: showAxisLabel ? axisPadding : 0,
        right: 0
      },
      horizontalRules: false
    },
    metadata: {
      ..._prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__.baseConfig.metadata,
      active: false
    },
    colors: [barColor, backgroundColor],
    independentAxis: {
      ..._prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__.baseConfig.independentAxis,
      active: showAxisLabel,
      scale: 'linear',
      dateFormat: 'yyyy',
      domain: [0, 100],
      domainPadding: 50,
      offsetY: null,
      padding: 50,
      tickCount: 5,
      tickValues: null,
      tickFormat: null,
      multiLineTickLabels: false,
      multiLineTickLabelsBreak: 1,
      abbreviateTicks: false,
      abbreviateTicksDecimals: 0,
      tickUnit: '',
      tickUnitPosition: 'end',
      customTickFormat: null,
      tickLabels: {
        ..._prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__.baseConfig.independentAxis.tickLabels,
        fontSize: 12,
        padding: 0,
        angle: 0,
        dx: -5,
        dy: 0,
        textAnchor: 'end',
        verticalAnchor: 'middle'
      },
      axisLabel: {
        ..._prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__.baseConfig.independentAxis.axisLabel,
        fontSize: 12,
        padding: 30,
        fill: 'rgba(35, 31, 32,0.7)'
      },
      axis: {
        ..._prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__.baseConfig.independentAxis.axis,
        stroke: '#756f6b00'
      },
      ticks: {
        ..._prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__.baseConfig.independentAxis.ticks,
        stroke: 'gray',
        size: 0,
        strokeWidth: 0
      },
      grid: {
        ..._prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__.baseConfig.independentAxis.grid,
        stroke: ''
      }
    },
    dependentAxis: {
      ..._prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__.baseConfig.dependentAxis,
      active: false,
      scale: 'linear',
      padding: 20,
      domain: [0, maxValue],
      domainPadding: 20,
      offsetX: null,
      showZero: false,
      tickCount: 5,
      tickValues: null,
      tickFormat: null,
      multiLineTickLabels: false,
      multiLineTickLabelsBreak: 1,
      abbreviateTicks: false,
      abbreviateTicksDecimals: 0,
      tickUnit: '',
      tickUnitPosition: 'end',
      customTickFormat: null,
      tickLabels: {
        ..._prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__.baseConfig.dependentAxis.tickLabels,
        fontSize: 12,
        padding: 15,
        angle: 0,
        dx: 0,
        dy: 0,
        textAnchor: 'middle',
        verticalAnchor: 'start'
      },
      axisLabel: {
        ..._prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__.baseConfig.dependentAxis.axisLabel,
        fontSize: 12,
        padding: 30,
        fill: 'rgba(35, 31, 32,0.7)'
      },
      ticks: {
        ..._prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__.baseConfig.dependentAxis.ticks,
        stroke: 'gray',
        size: 5,
        strokeWidth: 0
      },
      axis: {
        ..._prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__.baseConfig.dependentAxis.axis,
        stroke: '#756f6a'
      },
      grid: {
        ..._prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__.baseConfig.dependentAxis.grid,
        stroke: ''
      }
    },
    dataRender: {
      ..._prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__.baseConfig.dataRender,
      x: 'x',
      y: 'y',
      x2: null,
      y2: null,
      sortKey: 'x',
      sortOrder: 'none',
      categories: ['y', 'z'],
      xScale: 'linear',
      yScale: 'linear',
      xFormat: 'yyyy',
      yFormat: 'yyyy'
    },
    animate: {
      active: false,
      duration: 500
    },
    tooltip: {
      ..._prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__.baseConfig.tooltip,
      active: false
    },
    legend: {
      active: false
    },
    bar: {
      orientation: 'horizontal',
      width: 30,
      barToSpaceRatio: 0.8,
      groupOffset: 20
    },
    labels: {
      ..._prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__.baseConfig.labels,
      active: true,
      showFirstLastPointsOnly: false,
      color: 'black',
      fontWeight: 200,
      fontSize: 12,
      labelBarPosition: 'inside',
      labelCutoff: 0,
      labelCutoffMobile: 0,
      labelPositionDX,
      labelPositionDY,
      pieLabelRadius: 60,
      abbreviateValue: false,
      toFixedDecimal: 0,
      labelUnit: '',
      labelUnitPosition: 'end',
      labelFormat: null,
      customLabelFormat: value => {
        if (currentValue === value) {
          return 'fractional' === labelFormat ? `${currentValue}/${maxValue}` : `${currentValue}%	`;
        }
        return '';
      }
    }
  };
  const data = [{
    x: axisLabel,
    y: currentValue,
    z: maxValue - currentValue
  }];
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_prc_chart_builder__WEBPACK_IMPORTED_MODULE_1__.ChartBuilderWrapper, {
    config: config,
    data: data
  });
}
/* harmony default export */ __webpack_exports__["default"] = (ProgressBar);

/***/ }),

/***/ "../../node_modules/classnames/index.js":
/*!**********************************************!*\
  !*** ../../node_modules/classnames/index.js ***!
  \**********************************************/
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

/***/ "@prc/chart-builder":
/*!**********************************!*\
  !*** external "prcChartBuilder" ***!
  \**********************************/
/***/ (function(module) {

"use strict";
module.exports = window["prcChartBuilder"];

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

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/progress-bar","version":"0.1.0","title":"Progress Bar","category":"design","icon":"chart-bar","keywords":["progress","bar","quiz","result","horizontal","chart"],"attributes":{"maxWidth":{"type":"number","default":"640"},"barColor":{"type":"string","default":"social-trends-teal"},"backgroundColor":{"type":"string","default":"beige"},"maxValue":{"type":"number","default":100},"currentValue":{"type":"number","default":50},"showAxisLabel":{"type":"boolean","default":true},"axisLabel":{"type":"string","default":"Total"},"axisPadding":{"type":"number","default":60},"labelFormat":{"enum":["fractional","percentage"],"default":"fractional"},"labelPositionDX":{"type":"integer","default":0},"labelPositionDY":{"type":"integer","default":4}},"supports":{"anchor":true,"html":false,"spacing":{"blockGap":true,"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"typography":{"fontSize":true}},"textdomain":"progress-bar","editorScript":"file:./index.js","render":"file:./render.php","viewScript":"file:./view.js"}');

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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit */ "./src/Edit.jsx");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
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


console.log("prc-block/progress-bar", _block_json__WEBPACK_IMPORTED_MODULE_2__);
const {
  name
} = _block_json__WEBPACK_IMPORTED_MODULE_2__;
const settings = {
  /**
   * @see ./Edit.jsx
   */
  edit: _Edit__WEBPACK_IMPORTED_MODULE_1__["default"]
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(name, {
  ..._block_json__WEBPACK_IMPORTED_MODULE_2__,
  ...settings
});
}();
/******/ })()
;
//# sourceMappingURL=index.js.map