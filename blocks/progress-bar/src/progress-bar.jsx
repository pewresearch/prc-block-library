/* eslint-disable max-lines-per-function */
/**
 * External Dependencies
 */
// eslint-disable-next-line import/no-unresolved
import { ChartBuilderWrapper, baseConfig } from '@prc/chart-builder';

function ProgressBar({
	axisLabel,
	axisPadding,
	axisLabelMaxWidth,
	barColor,
	barPadding,
	backgroundColor,
	categoryLabelColor,
	currentValue,
	labelFormat,
	labelPositionDX,
	labelPositionDY,
	maxWidth,
	maxValue,
	showAxisLabel,
}) {
	const config = {
		...baseConfig,
		layout: {
			...baseConfig.layout,
			name: 'progress-chart',
			parentClass: 'wp-block-prc-block-progress-bar',
			type: 'stacked-bar',
			orientation: 'horizontal',
			theme: 'light',
			width: maxWidth,
			height: 40,
			padding: {
				top: 0,
				bottom: 0,
				left: showAxisLabel ? axisPadding : 0,
				right: 0,
			},
			horizontalRules: false,
		},
		metadata: {
			...baseConfig.metadata,
			active: false,
		},
		colors: [barColor, backgroundColor],

		independentAxis: {
			...baseConfig.independentAxis,
			active: showAxisLabel,
			scale: 'linear',
			dateFormat: 'yyyy',
			domain: [0, maxValue],
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
				...baseConfig.independentAxis.tickLabels,
				fontSize: 12,
				padding: 0,
				angle: 0,
				dx: -5,
				dy: 0,
				textAnchor: 'end',
				verticalAnchor: 'middle',
				fill: categoryLabelColor,
				maxWidth: axisLabelMaxWidth,
			},
			axisLabel: {
				...baseConfig.independentAxis.axisLabel,
				fontSize: 12,
				padding: 30,
				fill: 'rgba(35, 31, 32,0.7)',
			},
			axis: {
				...baseConfig.independentAxis.axis,
				stroke: '#756f6b00',
			},
			ticks: {
				...baseConfig.independentAxis.ticks,
				stroke: 'gray',
				size: 0,
				strokeWidth: 0,
			},
			grid: {
				...baseConfig.independentAxis.grid,
				stroke: '',
			},
		},
		dependentAxis: {
			...baseConfig.dependentAxis,
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
				...baseConfig.dependentAxis.tickLabels,
				fontSize: 12,
				padding: 15,
				angle: 0,
				dx: 0,
				dy: 0,
				textAnchor: 'middle',
				verticalAnchor: 'start',
				fill: 'rgba(35, 31, 32,0.7)',
			},
			axisLabel: {
				...baseConfig.dependentAxis.axisLabel,
				fontSize: 12,
				padding: 30,
				fill: 'rgba(35, 31, 32,0.7)',
			},
			ticks: {
				...baseConfig.dependentAxis.ticks,
				stroke: 'gray',
				size: 5,
				strokeWidth: 0,
			},
			axis: {
				...baseConfig.dependentAxis.axis,
				stroke: '#756f6a',
			},
			grid: {
				...baseConfig.dependentAxis.grid,
				stroke: '',
			},
		},
		dataRender: {
			...baseConfig.dataRender,
			x: 'x',
			y: 'y',
			x2: null,
			y2: null,
			sortKey: 'x',
			sortOrder: 'none',
			categories: ['currentValue', 'restOfBar'],
			xScale: 'linear',
			yScale: 'linear',
			xFormat: 'yyyy',
			yFormat: 'yyyy',
		},
		animate: {
			active: false,
			duration: 500,
		},
		tooltip: {
			...baseConfig.tooltip,
			active: false,
		},
		legend: {
			active: false,
		},
		bar: {
			...baseConfig.bar,
			barPadding: barPadding / 100,
		},
		labels: {
			...baseConfig.labels,
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
			customLabelFormat: (value, category) => {
				if ('currentValue' === category) {
					return 'fractional' === labelFormat
						? `${currentValue}/${maxValue}`
						: `${((currentValue / maxValue) * 100).toFixed(0)}%	`;
				}
				return '';
			},
		},
	};

	const data = [
		{
			x: axisLabel,
			currentValue,
			restOfBar: maxValue - currentValue,
		},
	];

	return <ChartBuilderWrapper config={config} data={data} />;
}

export default ProgressBar;
