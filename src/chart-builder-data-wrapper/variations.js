import { __ } from '@wordpress/i18n';
import {
	areaTemplate,
	barTemplate,
	columnTemplate,
	dotPlotTemplate,
	groupedBarTemplate,
	groupedColumnTemplate,
	lineTemplate,
	scatterTemplate,
	stackedBarTemplate,
	stackedColumnTemplate,
} from './templateBlocks';

import {
	areaIcon,
	barIcon,
	columnIcon,
	dotPlotIcon,
	groupedBarIcon,
	groupedColumnIcon,
	lineIcon,
	scatterIcon,
	stackedBarIcon,
	stackedColumnIcon,
} from './icons';

// variation schema:
// name: string
// title: string
// keywords: string[]
// icon: svg element
// attributes: object
// innerBlocks: array of arrays

const variations = [
	{
		name: 'cbarea',
		title: __('Area Chart'),
		keywords: [__('area'), __('chart'), __('area chart')],
		description: __('Create an area chart.'),
		icon: areaIcon,
		attributes: { chartType: 'area' },
		innerBlocks: areaTemplate,
	},
	{
		name: 'cbBar',
		title: 'Bar Chart',
		keywords: [__('bar'), __('chart'), __('bar chart'), __('single bar')],
		description: __('Create a bar chart.'),
		icon: barIcon,
		attributes: { chartType: 'bar' },
		innerBlocks: barTemplate,
	},
	{
		name: 'cbColumn',
		title: 'Column Chart',
		keywords: [
			__('column'),
			__('chart'),
			__('column chart'),
			__('single column'),
		],
		description: __('Create a column chart.'),
		icon: columnIcon,
		attributes: { chartType: 'column' },
		innerBlocks: columnTemplate,
	},
	{
		name: 'cbDotPlot',
		title: __('Dot Plot Chart'),
		keywords: [__('dot'), __('chart'), __('dot plot'), __('plot')],
		description: __('Create a dot plot chart.'),
		icon: dotPlotIcon,
		attributes: { chartType: 'dot-plot' },
		innerBlocks: dotPlotTemplate,
	},
	{
		name: 'cbGroupedBar',
		title: 'Grouped Bar Chart',
		keywords: [__('bar'), __('chart'), __('bar chart'), __('grouped bar')],
		description: __('Create a grouped bar chart.'),
		icon: groupedBarIcon,
		attributes: { chartType: 'grouped-bar' },
		innerBlocks: groupedBarTemplate,
	},
	{
		name: 'cbGroupedColumn',
		title: 'Grouped Column Chart',
		keywords: [
			__('column'),
			__('chart'),
			__('column chart'),
			__('grouped column'),
		],
		description: __('Create a grouped column chart.'),
		icon: groupedColumnIcon,
		attributes: { chartType: 'grouped-column' },
		innerBlocks: groupedColumnTemplate,
	},
	{
		name: 'cbLine',
		title: __('Line Chart'),
		keywords: [__('line'), __('chart'), __('line chart')],
		description: __('Create a line chart.'),
		icon: lineIcon,
		attributes: { chartType: 'line' },
		innerBlocks: lineTemplate,
	},

	{
		name: 'cbScatter',
		title: __('Scatter Plot Chart'),
		keywords: [__('scatter'), __('chart'), __('scatter plot'), __('plot')],
		description: __('Create a scatter plot chart.'),
		icon: scatterIcon,
		attributes: { chartType: 'scatter' },
		innerBlocks: scatterTemplate,
	},

	{
		name: 'cbStackedBar',
		title: 'Stacked Bar Chart',
		keywords: [__('bar'), __('chart'), __('stacked bar')],
		description: __('Create a stacked bar chart.'),
		icon: stackedBarIcon,
		attributes: { chartType: 'stacked-bar' },
		innerBlocks: stackedBarTemplate,
	},
	{
		name: 'cbStackedColumn',
		title: 'Stacked Column Chart',
		keywords: [__('column'), __('chart'), __('stacked column')],
		description: __('Create a stacked column chart.'),
		icon: stackedColumnIcon,
		attributes: { chartType: 'stacked-column' },
		innerBlocks: stackedColumnTemplate,
	},
];

variations.forEach((variation) => {
	if (variation.isActive) return;
	// eslint-disable-next-line no-param-reassign, consistent-return
	variation.isActive = (blockAttributes, variationAttributes) => {
		if (blockAttributes.chartType) {
			return blockAttributes.chartType === variationAttributes.chartType;
		}
		return false;
	};
});

export default variations;
