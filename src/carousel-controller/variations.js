/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import { HorizontalIcon, VerticalIcon, CoverflowIcon } from './icons';

export default [
	{
		name: 'carousel-horizontal',
		title: __('Carousel: Horizontal'),
		description: __('A horizontal carousel.'),
		icon: HorizontalIcon(),
		attributes: {
			className: 'is-style-arrows-navigation',
			viewType: 'horizontal',
		},
		scope: ['inserter', 'block'],
		isDefault: true,
		isActive: (blockAttributes) =>
			blockAttributes.viewType === 'horizontal',
	},
	{
		name: 'carousel-vertical',
		title: __('Carousel: Vertical'),
		description: __('A vertical carousel.'),
		icon: VerticalIcon(),
		attributes: {
			viewType: 'vertical',
			className: 'is-style-dots-navigation',
		},
		scope: ['inserter', 'block'],
		isActive: (blockAttributes, variationAttributes) =>
			blockAttributes.viewType === variationAttributes.viewType,
	},
	{
		name: 'carousel-coverflow',
		title: __('Carousel: Coverflow'),
		description: __(
			'A coverflow carousel with stacked cards, a slide counter, and navigation beneath the dots.'
		),
		icon: CoverflowIcon(),
		attributes: {
			viewType: 'coverflow',
			className: 'is-style-dots-navigation',
		},
		scope: ['inserter', 'block'],
		isActive: (blockAttributes, variationAttributes) =>
			blockAttributes.viewType === variationAttributes.viewType,
	},
];
