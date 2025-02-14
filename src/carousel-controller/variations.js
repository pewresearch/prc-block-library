/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import { HorizontalIcon, VerticalIcon } from './icons';

export default [
	{
		name: 'carousel-horizontal',
		title: __('Carousel: Horizontal'),
		description: __('A horizontal carousel.'),
		icon: HorizontalIcon(),
		attributes: {
			orientation: 'horizontal',
		},
		scope: ['inserter'],
		isDefault: true,
		isActive: (blockAttributes, variationAttributes) =>
			blockAttributes.orientation === variationAttributes.orientation,
	},
	{
		name: 'carousel-vertical',
		title: __('Carousel: Vertical'),
		description: __('A vertical carousel.'),
		icon: VerticalIcon(),
		attributes: {
			orientation: 'vertical',
		},
		scope: [],
		isActive: (blockAttributes, variationAttributes) =>
			blockAttributes.orientation === variationAttributes.orientation,
	},
];
