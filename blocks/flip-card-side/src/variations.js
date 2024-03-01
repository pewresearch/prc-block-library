/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import Icon from './Icon';

export default [
	{
		name: 'flip-card-front',
		title: __('Flip Card Front', 'prc-block-library'),
		attributes: {
			className: 'is-style-front',
		},
		innerBlocks: [
			[
				'core/paragraph',
				{
					placeholder: 'Flip Card Front...',
				},
			],
		],
		isActive: ({ className }) =>
			className ? className.includes('is-style-front') : false,
	},
	{
		name: 'flip-card-back',
		title: __('Flip Card Back', 'prc-block-library'),
		attributes: {
			className: 'is-style-back',
		},
		innerBlocks: [
			[
				'core/paragraph',
				{
					placeholder: 'Flip Card Back...',
				},
			],
		],
		icon: <Icon variant="back" />,
		isActive: ({ className }) =>
			className ? className.includes('is-style-back') : false,
	},
];
