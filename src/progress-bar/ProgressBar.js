import {
	ChartBuilderWrapper,
	masterConfig,
} from '@pewresearch/chart-builder/dist';

function ProgressBar({
	axisLabel,
	axisPadding,
	barColor,
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
			name: 'progress-chart',
			type: 'stacked-bar',
			orientation: 'vertical',
			theme: 'PewTheme',
			width: maxWidth,
			height: 30,
			padding: {
				top: 0,
				bottom: 10,
				left: showAxisLabel ? axisPadding : 0,
				right: 0,
			},
			horizontalRules: false,
		},
		metadata: {
			...masterConfig.metadata,
			active: false,
		},
		colors: [barColor, '#ecece3'],

		xAxis: {
			active: showAxisLabel,
			scale: 'linear',
			dateFormat: 'yyyy',
			domain: null,
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
			axis: {
				stroke: '#756f6b00',
			},
			ticks: {
				stroke: 'gray',
				size: 5,
				strokeWidth: 0,
			},
			grid: {
				stroke: '',
			},
		},
		yAxis: {
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
			ticks: {
				stroke: 'gray',
				size: 5,
				strokeWidth: 0,
			},
			axis: {
				stroke: '#756f6a',
			},
			grid: {
				stroke: '',
			},
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
		animate: {
			active: false,
			duration: 500,
		},
		tooltip: {
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
			customLabelFormat: null,
		},
	};

	const data = [
		[
			{
				x: axisLabel,
				y: currentValue,
				yLabel:
					'fractional' === labelFormat
						? `${currentValue}/${maxValue}`
						: `${((currentValue / maxValue) * 100).toFixed(0)}%`,
			},
		],
		[
			{
				x: axisLabel,
				y: maxValue - currentValue,
				yLabel: ' ',
			},
		],
	];

	return <ChartBuilderWrapper config={config} data={data} />;
}

export default ProgressBar;
