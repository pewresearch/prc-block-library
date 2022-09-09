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
		name: 'carousel-vertical',
		title: __('Carousel Vertical'),
		description: __('A vertical carousel.'),
		icon: VerticalIcon(),
		attributes: {
			// direction: 'vertical',
			className: 'is-style-vertical',
		},
		isDefault: true,
	},
	{
		name: 'carousel-horizontal',
		title: __('Carousel Horizontal'),
		description: __('A horizontal carousel.'),
		icon: HorizontalIcon(),
		attributes: {
			className: 'is-style-horizontal',
		},
	},
];
