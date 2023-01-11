/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import { CardIcon, CardAltIcon } from './Icons';

const BLOCKNAME = 'core/group';

/**
 * Register variations for the core/group block.
 *
 * Includes:
 * - "Callout"
 * - "Card"
 * - "Card (alt)" - aka "Baseball Card"
 * - "Social Group"
 *
 * @return {void}
 */
export default function registerVariations() {
	/**
	 * Callout Block
	 */
	registerBlockVariation(BLOCKNAME, {
		name: 'callout',
		title: __('Callout'),
		description: __(
			'A Group block in the "Callout" style with a oatmeal background and pre-set innerblocks',
		),
		attributes: {
			className: 'is-style-callout',
			backgroundColor: 'beige',
		},
		innerBlocks: [['core/heading'], ['core/paragraph']],
		isActive: (blockAttributes, variationAttributes) =>
			blockAttributes.className &&
			blockAttributes.className === variationAttributes.className,
	});

	/**
	 * Card Block
	 */
	registerBlockVariation(BLOCKNAME, {
		name: 'card',
		title: __('Card'),
		icon: CardIcon,
		description: __(
			'A Group block in the "Card" format with a heading with a border, image, text, and read more link.',
		),
		attributes: {
			className: 'is-style-card',
		},
		innerBlocks: [
			[
				'core/heading',
				{
					className: 'is-style-section-header',
					level: 3,
					placeholder: 'Signature Reports...',
				},
			],
			['core/image'],
			['prc-block/story-item', { className: 'is-style-disabled' }],
		],
		isActive: ({ className }) => 'is-style-card' === className,
	});

	/**
	 * Baseball Card "Alt" Block
	 */
	registerBlockVariation(BLOCKNAME, {
		name: 'card-alt',
		title: __('Card (Alt)'),
		icon: CardAltIcon,
		description: __(
			'A Group block in the "Card" format with a sub header heading in a black background, image, text, and read more link.',
		),
		attributes: {
			className: 'is-style-card-alt',
		},
		innerBlocks: [
			[
				'core/heading',
				{
					className: 'is-style-sub-header',
					level: 3,
					placeholder: 'Most Popular Posts...',
					backgroundColor: 'slate',
					textColor: 'white',
				},
			],
			['prc-block/story-item', { className: 'is-style-disabled' }],
		],
		isActive: ({ className }) => 'is-style-card-alt' === className,
	});

	/**
	 * Social Group Block
	 */
	registerBlockVariation(BLOCKNAME, {
		name: 'social-group',
		title: __('Social Group'),
		icon: 'share-alt2',
		description: __(
			'A Group block that allows you to override the share meta for content inside.',
		),
		attributes: {
			className: 'is-style-social-group',
			templateLock: true,
		},
		innerBlocks: [
			[
				BLOCKNAME,
				{
					templateLock: false,
				},
				[['core/paragraph', { placeholder: 'Add visual content here...' }]],
			],
			[
				'core/social-links',
				{
					iconColor: 'text-color',
					iconColorValue: '#2a2a2a',
					size: 'has-small-icon-size',
					className: 'is-style-logos-only',
				},
				[
					['prc-block/social-share-url-field', {}],
					['core/social-link', { service: 'facebook' }],
					['core/social-link', { service: 'twitter' }],
					['core/social-link', { service: 'linkedin' }],
				],
			],
		],
		isActive: (blockAttributes, variationAttributes) =>
			blockAttributes.className &&
			blockAttributes.className === variationAttributes.className,
	});
}
