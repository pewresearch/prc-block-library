/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

export default [
	{
		name: 'tabs-horizontal',
		isDefault: true,
		title: __('Horizontal Tabs'),
		description: __('A set of tabs that display horizontally'),
		attributes: {
			className: 'is-style-tabbed',
			vertical: false,
			isSlider: false,
		},
		innerBlocks: [
			['prc-block/tabs-menu', {}],
			['prc-block/tabs-panes', {}],
		],
		scope: ['inserter', 'transform'],
		isActive: (blockAttributes) =>
			blockAttributes.vertical && !blockAttributes.isSlider,
	},
	{
		name: 'tabs-vertical',
		title: __('Vertical Tabs'),
		description: __('A set of tabs that display vertically.'),
		attributes: {
			className: 'is-style-tabbed',
			vertical: true,
			isSlider: false,
		},
		innerBlocks: [
			['prc-block/tabs-menu', {}],
			['prc-block/tabs-panes', {}],
		],
		scope: ['inserter', 'transform'],
		isActive: (blockAttributes) =>
			blockAttributes.vertical && !blockAttributes.isSlider,
	},
	{
		name: 'tabs-slider',
		title: __('Slider Tabs'),
		description: __('A set of tabs that display as a slider.'),
		attributes: {
			className: 'is-style-slider',
			isSlider: true,
			vertical: false,
			sliderHasButton: false,
		},
		innerBlocks: [
			['prc-block/tabs-menu', {}],
			['prc-block/tabs-panes', {}],
		],
		scope: ['inserter', 'transform'],
		isActive: (blockAttributes) =>
			blockAttributes.isSlider &&
			!blockAttributes.vertical &&
			!blockAttributes.sliderHasButton,
	},
	{
		name: 'tabs-slider-with-button',
		title: __('Slider Tabs With Play/Pause Controls'),
		description: __(
			'A set of tabs that display as a slider with a play/pause toggle button.'
		),
		attributes: {
			className: 'is-style-slider',
			isSlider: true,
			vertical: false,
			sliderHasButton: true,
		},
		innerBlocks: [
			['prc-block/tabs-menu', {}],
			['prc-block/tabs-panes', {}],
		],
		scope: ['inserter', 'transform'],
		isActive: (blockAttributes) =>
			blockAttributes.isSlider &&
			!blockAttributes.vertical &&
			blockAttributes.sliderHasButton,
	},
];
