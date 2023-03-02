/**
 * External Dependencies
 */
import { ChartBuilderWrapper, baseConfig } from '@prc/chart-builder';

function ProgressBar({
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
	showAxisLabel,
}) {
	const config = {
		layout: {
			...baseConfig.layout,
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
				...baseConfig.independentAxis.tickLabels,
				fontSize: 12,
				padding: 0,
				angle: 0,
				dx: -5,
				dy: 0,
				textAnchor: 'end',
				verticalAnchor: 'middle',
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
			categories: ['y', 'z'],
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
			orientation: 'horizontal',
			width: 30,
			barToSpaceRatio: 0.8,
			groupOffset: 20,
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
			customLabelFormat: (value) => {
				if (currentValue === value) {
					return 'fractional' === labelFormat
						? `${currentValue}/${maxValue}`
						: `${currentValue}%	`;
				}
				return '';
			},
		},
	};

	const data = [
		{
			x: axisLabel,
			y: currentValue,
			z: maxValue - currentValue,
		},
	];

	return <ChartBuilderWrapper config={config} data={data} />;
}

export default ProgressBar;
