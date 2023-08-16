/**
 * External Dependencies
 */
import { icons, Icon } from '@prc/icons';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';

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
			'A Group block in the "Callout" style with a oatmeal background and pre-set innerblocks'
		),
		attributes: {
			className: 'is-style-callout',
			backgroundColor: 'beige',
		},
		example: {
			innerBlocks: [
				{
					name: 'core/heading',
					attributes: {
						placeholder: 'Ex Reprehenderit Sunt Ex Proident',
					},
				},
				{
					name: 'core/paragraph',
					attributes: {
						placeholder: 'Minim non id non esse sint culpa irure cillum ex est. Consequat sint nisi nulla do nostrud veniam labore eu magna Lorem ad Lorem in. Esse est tempor elit voluptate et eiusmod velit consequat nulla esse irure. Elit velit tempor do cupidatat eu deserunt laboris nisi anim enim in ea minim exercitation ullamco. Laborum duis adipisicing ex incididunt veniam.',
					},
				}
			],
			viewportWidth: 320,
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
		icon: () => <Icon
			icon={icons.faCardSpadeLight}
			width={21}
			preserveAspectRatio="xMidYMid meet"
		/>,
		description: __(
			'A Group block in the "Card" format with a heading with a border, image, text, and read more link.'
		),
		attributes: {
			className: 'is-style-card',
		},
		example: {
			innerBlocks: [
				{
					name: 'core/heading',
					attributes: {
						className: 'is-style-section-header',
						level: 3,
						placeholder: 'Signature Reports',
					},
				},
				{
					name: 'core/image',
					attributes: {

					},
				},
				{
					name: 'prc-block/story-item',
					attributes: {
						title: "Ultricies Ipsum Nibh Egestas Purus",
						excerpt: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>",
						label: "Report",
						date: "Jan 1, 2023",
						image: "https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg",
						imageSlot: "disabled",
						imageSize: "A2",
						isPreview: true,
						className: 'is-style-disabled',
						postId: 0
					},
				},
			],
			viewportWidth: 320,
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
		icon: () => <Icon
			icon={icons.faCardSpadeSolid}
			width={21}
			preserveAspectRatio="xMidYMid meet"
		/>,
		description: __(
			'A Group block in the "Card" format with a sub header heading in a black background, image, text, and read more link. Internally we call this the "Baseball Card" style.'
		),
		attributes: {
			className: 'is-style-card-alt',
		},
		example: {
			innerBlocks: [
				{
					name: 'core/heading',
					attributes: {
						className: 'is-style-sub-header',
						level: 3,
						fontSize: 'small-label',
						content: 'Most Popular Posts',
						backgroundColor: 'text-color',
						textColor: 'white',
					},
				},
				{
					name: 'prc-block/story-item',
					attributes: {
						title: "Ultricies Ipsum Nibh Egestas Purus",
						excerpt: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>",
						label: "Report",
						date: "Jan 1, 2023",
						image: "https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg",
						imageSlot: "disabled",
						imageSize: "A2",
						isPreview: true,
						className: 'is-style-disabled',
						postId: 0
					}
				},
			],
			viewportWidth: 320,
		},
		innerBlocks: [
			[
				'core/heading',
				{
					className: 'is-style-sub-header',
					level: 3,
					fontSize: 'small-label',
					placeholder: 'Most Popular Posts...',
					backgroundColor: 'text-color',
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
		icon: () => <Icon
			icon={icons.faShareFromSquare}
			width={21}
			preserveAspectRatio="xMidYMid meet"
		/>,
		description: __(
			'A Group block that allows you to override the share meta for content inside.'
		),
		category: 'widgets',
		attributes: {
			className: 'is-style-social-group',
			templateLock: true,
		},
		example: {
			attributes: {
				className: 'is-style-social-group',
			},
			innerBlocks: [
				{
					name: 'core/group',
					innerBlocks: [
						{
							name: 'core/paragraph',
							attributes: {
								placeholder: 'Add visual content here...',
							},
						}
					]
				},
				{
					name: 'core/social-links',
					attributes: {
						iconColor: 'text-color',
						iconColorValue: '#2a2a2a',
						size: 'has-small-icon-size',
						className: 'is-style-logos-only',
					},
					innerBlocks: [
						{
							name: 'prc-block/social-share-url-field',
							attributes: {},
						},
						{
							name: 'core/social-link',
							attributes: {
								service: 'facebook',
							},
						},
						{
							name: 'core/social-link',
							attributes: {
								service: 'twitter',
							},
						},
						{
							name: 'core/social-link',
							attributes: {
								service: 'linkedin',
							},
						},
					]
				}
			],
			viewportWidth: 640,
		},
		innerBlocks: [
			[
				BLOCKNAME,
				{
					templateLock: false,
				},
				[
					[
						'core/paragraph',
						{ placeholder: 'Add visual content here...' },
					],
				],
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
