/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ProgressBar.jsx":
/*!*****************************!*\
  !*** ./src/ProgressBar.jsx ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "@prc/chart-builder":
/*!**********************************!*\
  !*** external "prcChartBuilder" ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["prcChartBuilder"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProgressBar */ "./src/ProgressBar.jsx");

/**
 * WordPress Dependencies
 */



/**
 * Internal Dependencies
 */

_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default()(() => {
  if (document.querySelector('.wp-block-prc-block-progress-bar')) {
    const bars = document.querySelectorAll('.wp-block-prc-block-progress-bar');
    bars.forEach(bar => {
      const attrs = bar.dataset;
      const props = {
        maxWidth: parseFloat(attrs.maxWidth),
        maxValue: parseFloat(attrs.maxValue),
        currentValue: parseFloat(attrs.currentValue),
        labelFormat: attrs.labelFormat,
        axisLabel: attrs.axisLabel,
        axisPadding: parseFloat(attrs.axisPadding),
        labelPositionDY: parseInt(attrs.labelPositionDy, 10),
        labelPositionDX: parseInt(attrs.labelPositionDx, 10),
        showAxisLabel: '1' === attrs.showAxisLabel,
        barColor: attrs.barColor
      };
      (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ProgressBar__WEBPACK_IMPORTED_MODULE_2__["default"], props), bar);
    });
  }
});
}();
/******/ })()
;
//# sourceMappingURL=view.js.map