!(function () {
	var e = {
		n(a) {
			const t =
				a && a.__esModule
					? function () {
							return a.default;
					  }
					: function () {
							return a;
					  };
			return e.d(t, { a: t }), t;
		},
		d(a, t) {
			for (const i in t)
				e.o(t, i) &&
					!e.o(a, i) &&
					Object.defineProperty(a, i, { enumerable: !0, get: t[i] });
		},
		o(e, a) {
			return Object.prototype.hasOwnProperty.call(e, a);
		},
	};
	const a = window.wp.element;
	const t = window.wp.domReady;
	const i = e.n(t);
	const l = window.prcChartBuilder;
	const o = function (e) {
		const {
			axisLabel: t,
			axisPadding: i,
			barColor: o,
			currentValue: r,
			labelFormat: n,
			labelPositionDX: s,
			labelPositionDY: c,
			maxWidth: d,
			maxValue: b,
			showAxisLabel: u,
		} = e;
		const m = {
			layout: {
				name: 'progress-chart',
				type: 'stacked-bar',
				orientation: 'horizontal',
				theme: 'PewTheme',
				width: d,
				height: 30,
				padding: { top: 0, bottom: 10, left: u ? i : 0, right: 0 },
				horizontalRules: !1,
			},
			metadata: { ...l.baseConfig.metadata, active: !1 },
			colors: [o, '#ecece3'],
			xAxis: {
				active: u,
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
				domain: [0, b],
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
				labelPositionDX: s,
				labelPositionDY: c,
				pieLabelRadius: 60,
				abbreviateValue: !1,
				toFixedDecimal: 0,
				labelUnit: '',
				labelUnitPosition: 'end',
				labelFormat: null,
				customLabelFormat: null,
			},
		};
		const y = [
			[
				{
					x: t,
					y: r,
					yLabel:
						'fractional' === n ? `${r}/${b}` : `${((r / b) * 100).toFixed(0)}%`,
				},
			],
			[{ x: t, y: b - r, yLabel: ' ' }],
		];
		return (0, a.createElement)(l.ChartBuilderWrapper, {
			config: m,
			data: y,
		});
	};
	i()(() => {
		document.querySelector('.wp-block-prc-block-progress-bar') &&
			document
				.querySelectorAll('.wp-block-prc-block-progress-bar')
				.forEach((e) => {
					const t = e.dataset;
					const i = {
						maxWidth: parseFloat(t.maxWidth),
						maxValue: parseFloat(t.maxValue),
						currentValue: parseFloat(t.currentValue),
						labelFormat: t.labelFormat,
						axisLabel: t.axisLabel,
						axisPadding: parseFloat(t.axisPadding),
						labelPositionDY: parseInt(t.labelPositionDy, 10),
						labelPositionDX: parseInt(t.labelPositionDx, 10),
						showAxisLabel: '1' === t.showAxisLabel,
						barColor: t.barColor,
					};
					(0, a.render)((0, a.createElement)(o, i), e);
				});
	});
})();
// # sourceMappingURL=view.js.map
