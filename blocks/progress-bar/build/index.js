!(function () {
	var e = {
			472: function (e, t) {
				var a;
				!(function () {
					'use strict';
					var l = {}.hasOwnProperty;
					function o() {
						for (var e = [], t = 0; t < arguments.length; t++) {
							var a = arguments[t];
							if (a) {
								var r = typeof a;
								if ('string' === r || 'number' === r) e.push(a);
								else if (Array.isArray(a)) {
									if (a.length) {
										var n = o.apply(null, a);
										n && e.push(n);
									}
								} else if ('object' === r)
									if (a.toString === Object.prototype.toString)
										for (var i in a) l.call(a, i) && a[i] && e.push(i);
									else e.push(a.toString());
							}
						}
						return e.join(' ');
					}
					e.exports
						? ((o.default = o), (e.exports = o))
						: void 0 ===
								(a = function () {
									return o;
								}.apply(t, [])) || (e.exports = a);
				})();
			},
		},
		t = {};
	function a(l) {
		var o = t[l];
		if (void 0 !== o) return o.exports;
		var r = (t[l] = { exports: {} });
		return e[l](r, r.exports, a), r.exports;
	}
	(a.n = function (e) {
		var t =
			e && e.__esModule
				? function () {
						return e.default;
				  }
				: function () {
						return e;
				  };
		return a.d(t, { a: t }), t;
	}),
		(a.d = function (e, t) {
			for (var l in t)
				a.o(t, l) &&
					!a.o(e, l) &&
					Object.defineProperty(e, l, { enumerable: !0, get: t[l] });
		}),
		(a.o = function (e, t) {
			return Object.prototype.hasOwnProperty.call(e, t);
		}),
		(function () {
			'use strict';
			var e = window.wp.blocks,
				t = window.wp.element,
				l = a(472),
				o = a.n(l),
				r = window.wp.blockEditor,
				n = window.wp.i18n,
				i = window.wp.components;
			function s(e) {
				let { attributes: a, setAttributes: l, colors: o } = e;
				const {
						maxWidth: s,
						maxValue: c,
						currentValue: u,
						showAxisLabel: d,
						axisLabel: b,
						axisPadding: m,
						labelFormat: p,
						labelPositionDY: g,
						labelPositionDX: f,
					} = a,
					{
						barColor: y,
						setBarColor: x,
						backgroundColor: h,
						setBackgroundColor: C,
					} = o;
				return (0, t.createElement)(
					r.InspectorControls,
					null,
					(0, t.createElement)(
						i.PanelBody,
						{ title: (0, n.__)('Layout') },
						(0, t.createElement)(i.RangeControl, {
							label: (0, n.__)('Width'),
							withInputField: !0,
							min: 0,
							max: 640,
							value: parseInt(s, 10),
							onChange: (e) => l({ maxWidth: parseInt(e, 10) }),
						}),
					),
					(0, t.createElement)(
						i.PanelBody,
						{ title: (0, n.__)('Data and Formatting') },
						(0, t.createElement)(i.ToggleControl, {
							label: (0, n.__)('Show Category'),
							checked: d,
							onChange: () => l({ showAxisLabel: !d }),
						}),
						(0, t.createElement)(i.TextControl, {
							label: (0, n.__)('Category'),
							value: b,
							disabled: !d,
							onChange: (e) => l({ axisLabel: e }),
						}),
						(0, t.createElement)(i.__experimentalNumberControl, {
							label: (0, n.__)('Category Padding'),
							value: m,
							disabled: !d,
							disableUnits: !0,
							disabledUnits: !0,
							onChange: (e) => l({ axisPadding: parseInt(e, 10) }),
						}),
						(0, t.createElement)(
							i.Flex,
							null,
							(0, t.createElement)(
								i.FlexItem,
								null,
								(0, t.createElement)(i.__experimentalNumberControl, {
									label: (0, n.__)('Current value'),
									value: u,
									disableUnits: !0,
									disabledUnits: !0,
									onChange: (e) => l({ currentValue: parseFloat(e) }),
								}),
							),
							(0, t.createElement)(i.__experimentalNumberControl, {
								label: (0, n.__)('Maximum value'),
								value: c,
								disableUnits: !0,
								disabledUnits: !0,
								onChange: (e) => l({ maxValue: parseFloat(e) }),
							}),
							(0, t.createElement)(i.FlexItem, null),
						),
					),
					(0, t.createElement)(
						i.PanelBody,
						{ title: (0, n.__)('Labels') },
						(0, t.createElement)(i.SelectControl, {
							label: (0, n.__)('Label format'),
							value: p,
							options: [
								{ value: 'fractional', label: 'Fractional' },
								{ value: 'percentage', label: 'Percentage' },
							],
							onChange: (e) => {
								l({ labelFormat: e });
							},
						}),
						(0, t.createElement)(
							i.Flex,
							null,
							(0, t.createElement)(
								i.FlexItem,
								null,
								(0, t.createElement)(i.__experimentalNumberControl, {
									label: (0, n.__)('Label Position DX'),
									value: f,
									onChange: (e) => l({ labelPositionDX: parseInt(e, 10) }),
								}),
							),
							(0, t.createElement)(
								i.FlexItem,
								null,
								(0, t.createElement)(i.__experimentalNumberControl, {
									label: (0, n.__)('Label Position DY'),
									value: g,
									onChange: (e) => l({ labelPositionDY: parseInt(e, 10) }),
								}),
							),
						),
					),
					(0, t.createElement)(r.PanelColorSettings, {
						__experimentalHasMultipleOrigins: !0,
						__experimentalIsRenderedInSidebar: !0,
						title: (0, n.__)('Colors'),
						disableCustomColors: !0,
						colorSettings: [
							{ value: y.color, onChange: x, label: (0, n.__)('Bar') },
							{ value: h.color, onChange: C, label: (0, n.__)('Background') },
						],
					}),
				);
			}
			var c = window.prcChartBuilder,
				u = function (e) {
					let {
						axisLabel: a,
						axisPadding: l,
						barColor: o,
						currentValue: r,
						labelFormat: n,
						labelPositionDX: i,
						labelPositionDY: s,
						maxWidth: u,
						maxValue: d,
						showAxisLabel: b,
					} = e;
					const m = {
							layout: {
								name: 'progress-chart',
								type: 'stacked-bar',
								orientation: 'horizontal',
								theme: 'PewTheme',
								width: u,
								height: 30,
								padding: { top: 0, bottom: 10, left: b ? l : 0, right: 0 },
								horizontalRules: !1,
							},
							metadata: { ...c.baseConfig.metadata, active: !1 },
							colors: [o, '#ecece3'],
							xAxis: {
								active: b,
								scale: 'linear',
								dateFormat: 'yyyy',
								domain: null,
								domainPadding: 50,
								offsetY: null,
								padding: 50,
								tickCount: 5,
								tickValues: null,
								tickFormat: null,
								multiLineTickLabels: !1,
								multiLineTickLabelsBreak: 1,
								abbreviateTicks: !1,
								abbreviateTicksDecimals: 0,
								tickUnit: '',
								tickUnitPosition: 'end',
								customTickFormat: null,
								tickLabels: {
									fontSize: 12,
									padding: 0,
									angle: 0,
									dx: 0,
									dy: 0,
									textAnchor: 'end',
									verticalAnchor: 'middle',
								},
								axisLabel: {
									fontSize: 12,
									padding: 30,
									fill: 'rgba(35, 31, 32,0.7)',
								},
								axis: { stroke: '#756f6b00' },
								ticks: { stroke: 'gray', size: 5, strokeWidth: 0 },
								grid: { stroke: '' },
							},
							yAxis: {
								active: !1,
								scale: 'linear',
								padding: 20,
								domain: [0, d],
								domainPadding: 20,
								offsetX: null,
								showZero: !1,
								tickCount: 5,
								tickValues: null,
								tickFormat: null,
								multiLineTickLabels: !1,
								multiLineTickLabelsBreak: 1,
								abbreviateTicks: !1,
								abbreviateTicksDecimals: 0,
								tickUnit: '',
								tickUnitPosition: 'end',
								customTickFormat: null,
								tickLabels: {
									fontSize: 12,
									padding: 15,
									angle: 0,
									dx: 0,
									dy: 0,
									textAnchor: 'middle',
									verticalAnchor: 'start',
								},
								axisLabel: {
									fontSize: 12,
									padding: 30,
									fill: 'rgba(35, 31, 32,0.7)',
								},
								ticks: { stroke: 'gray', size: 5, strokeWidth: 0 },
								axis: { stroke: '#756f6a' },
								grid: { stroke: '' },
								dateFormat: 'yyyy',
							},
							dataRender: {
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
								yFormat: 'yyyy',
							},
							animate: { active: !1, duration: 500 },
							tooltip: { active: !1 },
							legend: { active: !1 },
							bar: {
								orientation: 'horizontal',
								width: 30,
								barToSpaceRatio: 0.8,
								groupOffset: 20,
							},
							labels: {
								active: !0,
								showFirstLastPointsOnly: !1,
								color: 'black',
								fontWeight: 200,
								fontSize: 12,
								labelBarPosition: 'inside',
								labelCutoff: 0,
								labelCutoffMobile: 0,
								labelPositionDX: i,
								labelPositionDY: s,
								pieLabelRadius: 60,
								abbreviateValue: !1,
								toFixedDecimal: 0,
								labelUnit: '',
								labelUnitPosition: 'end',
								labelFormat: null,
								customLabelFormat: null,
							},
						},
						p = [
							[
								{
									x: a,
									y: r,
									yLabel:
										'fractional' === n
											? `${r}/${d}`
											: `${((r / d) * 100).toFixed(0)}%`,
								},
							],
							[{ x: a, y: d - r, yLabel: ' ' }],
						];
					return (0, t.createElement)(c.ChartBuilderWrapper, {
						config: m,
						data: p,
					});
				},
				d = (0, r.withColors)(
					{ barColor: 'color' },
					{ backgroundColor: 'color' },
				)(function (e) {
					let {
						attributes: a,
						setAttributes: l,
						className: n,
						barColor: i,
						setBarColor: c,
						backgroundColor: d,
						setBackgroundColor: b,
					} = e;
					const m = (0, r.useBlockProps)({
						className: o()(n, {
							'has-bar-color': !!i.color || !!i?.class,
							[(0, r.getColorClassName)('color', i?.slug)]: !!i?.slug,
							'has-background': !!d.color || d.class,
							[(0, r.getColorClassName)('background-color', d?.slug)]:
								!!d?.slug,
						}),
						style: { backgroundColor: !d?.slug && d?.color },
					});
					return (0,
					t.createElement)('div', m, (0, t.createElement)(s, { attributes: a, setAttributes: l, colors: { barColor: i, setBarColor: c, backgroundColor: d, setBackgroundColor: b } }), (0, t.createElement)(u, a));
				}),
				b = JSON.parse(
					'{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/progress-bar","version":"0.1.0","title":"Progress Bar","category":"design","icon":"chart-bar","keywords":["progress","bar","quiz","result","horizontal","chart"],"attributes":{"maxWidth":{"type":"number","default":"640"},"barColor":{"type":"string","default":"#436983"},"backgroundColor":{"type":"string","default":"#F1F1F1"},"maxValue":{"type":"number","default":100},"currentValue":{"type":"number","default":50},"showAxisLabel":{"type":"boolean","default":true},"axisLabel":{"type":"string","default":"Total"},"axisPadding":{"type":"number","default":60},"labelFormat":{"type":"string","default":"fractional"},"labelPositionDX":{"type":"integer","default":-45},"labelPositionDY":{"type":"integer","default":-2}},"supports":{"anchor":true,"html":false,"spacing":{"blockGap":true,"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"typography":{"fontSize":true}},"textdomain":"progress-bar","editorScript":"file:./index.js","render":"file:./render.php","viewScript":"file:./view.js"}',
				);
			console.log('prc-block/progress-bar', b);
			const { name: m } = b,
				p = { edit: d };
			(0, e.registerBlockType)(m, { ...b, ...p });
		})();
})();
//# sourceMappingURL=index.js.map
