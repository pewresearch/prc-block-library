/* eslint-disable max-lines-per-function */
/**
 * External Dependencies
 */
import { Icon } from '@prc/icons';

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
	 * "200px" width variation
	 */
	registerBlockVariation(BLOCKNAME, {
		name: 'two-hundred-px',
		title: __('200px'),
		description: __('A Group block with a width of 200px'),
		attributes: {
			layout: {
				type: 'constrained',
				contentSize: '200px',
			},
		},
		example: {
			attributes: {
				layout: {
					type: 'constrained',
					contentSize: '200px',
				},
			},
			innerBlocks: [
				{
					name: 'core/heading',
					attributes: {
						placeholder: 'Ex Reprehenderit Sunt Ex Proident',
					},
				},
				{
					name: 'core/image',
					attributes: {
						src: 'https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg',
					},
				},
				{
					name: 'core/paragraph',
					attributes: {
						placeholder:
							'Minim non id non esse sint culpa irure cillum ex est. Consequat sint nisi nulla do nostrud veniam labore eu magna Lorem ad Lorem in. Esse est tempor elit voluptate et eiusmod velit consequat nulla esse irure. Elit velit tempor do cupidatat eu deserunt laboris nisi anim enim in ea minim exercitation ullamco. Laborum duis adipisicing ex incididunt veniam.',
					},
				},
			],
			viewportWidth: 640,
		},
		scope: ['inserter', 'transform'],
		innerBlocks: [['core/paragraph']],
		isActive: (blockAttributes, variationAttributes) =>
			blockAttributes?.layout?.contentSize ===
			variationAttributes?.layout?.contentSize,
	});

	/**
	 * "250px" width variation
	 */
	registerBlockVariation(BLOCKNAME, {
		name: 'two-hundred-fifty-px',
		title: __('250px'),
		description: __('A Group block with a width of 250px'),
		attributes: {
			layout: {
				type: 'constrained',
				contentSize: '250px',
			},
		},
		example: {
			attributes: {
				layout: {
					type: 'constrained',
					contentSize: '250px',
				},
			},
			innerBlocks: [
				{
					name: 'core/heading',
					attributes: {
						placeholder: 'Ex Reprehenderit Sunt Ex Proident',
					},
				},
				{
					name: 'core/image',
					attributes: {
						src: 'https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg',
					},
				},
				{
					name: 'core/paragraph',
					attributes: {
						placeholder:
							'Minim non id non esse sint culpa irure cillum ex est. Consequat sint nisi nulla do nostrud veniam labore eu magna Lorem ad Lorem in. Esse est tempor elit voluptate et eiusmod velit consequat nulla esse irure. Elit velit tempor do cupidatat eu deserunt laboris nisi anim enim in ea minim exercitation ullamco. Laborum duis adipisicing ex incididunt veniam.',
					},
				},
			],
			viewportWidth: 640,
		},
		scope: ['inserter', 'transform'],
		innerBlocks: [['core/paragraph']],
		isActive: (blockAttributes, variationAttributes) =>
			blockAttributes?.layout?.contentSize ===
			variationAttributes?.layout?.contentSize,
	});

	/**
	 * "300px" width variation
	 */
	registerBlockVariation(BLOCKNAME, {
		name: 'three-hundred-px',
		title: __('300px'),
		description: __('A Group block with a width of 300px'),
		attributes: {
			layout: {
				type: 'constrained',
				contentSize: '300px',
			},
		},
		example: {
			attributes: {
				layout: {
					type: 'constrained',
					contentSize: '300px',
				},
			},
			innerBlocks: [
				{
					name: 'core/heading',
					attributes: {
						placeholder: 'Ex Reprehenderit Sunt Ex Proident',
					},
				},
				{
					name: 'core/image',
					attributes: {
						src: 'https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg',
					},
				},
				{
					name: 'core/paragraph',
					attributes: {
						placeholder:
							'Minim non id non esse sint culpa irure cillum ex est. Consequat sint nisi nulla do nostrud veniam labore eu magna Lorem ad Lorem in. Esse est tempor elit voluptate et eiusmod velit consequat nulla esse irure. Elit velit tempor do cupidatat eu deserunt laboris nisi anim enim in ea minim exercitation ullamco. Laborum duis adipisicing ex incididunt veniam.',
					},
				},
			],
			viewportWidth: 640,
		},
		scope: ['inserter', 'transform'],
		innerBlocks: [['core/paragraph']],
		isActive: (blockAttributes, variationAttributes) =>
			blockAttributes?.layout?.contentSize ===
			variationAttributes?.layout?.contentSize,
	});

	/**
	 * "320px" width variation
	 */
	registerBlockVariation(BLOCKNAME, {
		name: 'three-hundred-twenty-px',
		title: __('320px'),
		description: __('A Group block with a width of 320px'),
		attributes: {
			layout: {
				type: 'constrained',
				contentSize: '320px',
			},
		},
		example: {
			attributes: {
				layout: {
					type: 'constrained',
					contentSize: '320px',
				},
			},
			innerBlocks: [
				{
					name: 'core/heading',
					attributes: {
						placeholder: 'Ex Reprehenderit Sunt Ex Proident',
					},
				},
				{
					name: 'core/image',
					attributes: {
						src: 'https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg',
					},
				},
				{
					name: 'core/paragraph',
					attributes: {
						placeholder:
							'Minim non id non esse sint culpa irure cillum ex est. Consequat sint nisi nulla do nostrud veniam labore eu magna Lorem ad Lorem in. Esse est tempor elit voluptate et eiusmod velit consequat nulla esse irure. Elit velit tempor do cupidatat eu deserunt laboris nisi anim enim in ea minim exercitation ullamco. Laborum duis adipisicing ex incididunt veniam.',
					},
				},
			],
			viewportWidth: 640,
		},
		scope: ['inserter', 'transform'],
		innerBlocks: [['core/paragraph']],
		isActive: (blockAttributes, variationAttributes) =>
			blockAttributes?.layout?.contentSize ===
			variationAttributes?.layout?.contentSize,
	});

	/**
	 * "420px" width variation
	 */
	registerBlockVariation(BLOCKNAME, {
		name: 'four-hundred-twenty-px',
		title: __('420px'),
		description: __('A Group block with a width of 420px'),
		attributes: {
			layout: {
				type: 'constrained',
				contentSize: '420px',
			},
		},
		example: {
			attributes: {
				layout: {
					type: 'constrained',
					contentSize: '420px',
				},
			},
			innerBlocks: [
				{
					name: 'core/heading',
					attributes: {
						placeholder: 'Ex Reprehenderit Sunt Ex Proident',
					},
				},
				{
					name: 'core/image',
					attributes: {
						src: 'https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg',
					},
				},
				{
					name: 'core/paragraph',
					attributes: {
						placeholder:
							'Minim non id non esse sint culpa irure cillum ex est. Consequat sint nisi nulla do nostrud veniam labore eu magna Lorem ad Lorem in. Esse est tempor elit voluptate et eiusmod velit consequat nulla esse irure. Elit velit tempor do cupidatat eu deserunt laboris nisi anim enim in ea minim exercitation ullamco. Laborum duis adipisicing ex incididunt veniam.',
					},
				},
			],
			viewportWidth: 640,
		},
		scope: ['inserter', 'transform'],
		innerBlocks: [['core/paragraph']],
		isActive: (blockAttributes, variationAttributes) =>
			blockAttributes?.layout?.contentSize ===
			variationAttributes?.layout?.contentSize,
	});

	/**
	 * "640px" width variation
	 */
	registerBlockVariation(BLOCKNAME, {
		name: 'six-hundred-forty-px',
		title: __('640px'),
		description: __('A Group block with a width of 640px'),
		attributes: {
			layout: {
				type: 'constrained',
				contentSize: '640px',
			},
		},
		example: {
			attributes: {
				layout: {
					type: 'constrained',
					contentSize: '640px',
				},
			},
			innerBlocks: [
				{
					name: 'core/heading',
					attributes: {
						placeholder: 'Ex Reprehenderit Sunt Ex Proident',
					},
				},
				{
					name: 'core/image',
					attributes: {
						src: 'https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg',
					},
				},
				{
					name: 'core/paragraph',
					attributes: {
						placeholder:
							'Minim non id non esse sint culpa irure cillum ex est. Consequat sint nisi nulla do nostrud veniam labore eu magna Lorem ad Lorem in. Esse est tempor elit voluptate et eiusmod velit consequat nulla esse irure. Elit velit tempor do cupidatat eu deserunt laboris nisi anim enim in ea minim exercitation ullamco. Laborum duis adipisicing ex incididunt veniam.',
					},
				},
			],
			viewportWidth: 640,
		},
		scope: ['inserter', 'transform'],
		innerBlocks: [['core/paragraph']],
		isActive: (blockAttributes, variationAttributes) =>
			blockAttributes?.layout?.contentSize ===
			variationAttributes?.layout?.contentSize,
	});

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
			backgroundColor: 'ui-beige-very-light',
			style: {
				spacing: {
					blockGap: 'var:preset|spacing|40',
				},
			},
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
						placeholder:
							'Minim non id non esse sint culpa irure cillum ex est. Consequat sint nisi nulla do nostrud veniam labore eu magna Lorem ad Lorem in. Esse est tempor elit voluptate et eiusmod velit consequat nulla esse irure. Elit velit tempor do cupidatat eu deserunt laboris nisi anim enim in ea minim exercitation ullamco. Laborum duis adipisicing ex incididunt veniam.',
					},
				},
			],
			viewportWidth: 320,
		},
		innerBlocks: [
			['core/heading', { fontSize: 'small' }],
			['core/paragraph'],
		],
		isActive: (blockAttributes, variationAttributes) =>
			blockAttributes.className &&
			blockAttributes.className === variationAttributes.className,
	});

	/**
	 * Baseball Card Block
	 */
	registerBlockVariation(BLOCKNAME, {
		name: 'baseball-card',
		title: __('Baseball Card'),
		icon: () => <Icon icon="card-spade" library="solid" />,
		description: __(
			'A Group block in the "Baseball Card" format with a card heading in a black background, image, text, and read more link.'
		),
		attributes: {
			className: 'is-style-baseball-card',
		},
		example: {
			innerBlocks: [
				{
					name: 'core/heading',
					attributes: {
						className: 'baseball-card__heading',
						level: 3,
						content: 'Most Popular Posts',
						backgroundColor: 'ui-black',
						textColor: 'ui-white',
						fontFamily: 'sans-serif',
						fontSize: 'small-label',
					},
				},
				{
					name: 'prc-block/story-item',
					attributes: {
						title: 'Ultricies Ipsum Nibh Egestas Purus',
						excerpt:
							'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>',
						label: 'Report',
						date: 'Jan 1, 2023',
						image: 'https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg',
						imageSlot: 'disabled',
						imageSize: 'A2',
						isPreview: true,
						className: 'is-style-disabled',
						postId: 0,
					},
				},
			],
			viewportWidth: 320,
		},
		innerBlocks: [
			[
				'core/heading',
				{
					className: 'baseball-card__heading',
					level: 3,
					fontSize: 'small-label',
					fontFamily: 'sans-serif',
					placeholder: 'Most Popular Posts...',
					backgroundColor: 'ui-black',
					textColor: 'ui-white',
				},
			],
			['core/paragraph', { placeholder: 'Add card content here...' }],
		],
		isActive: ({ className }) => 'is-style-baseball-card' === className,
	});

	/**
	 * Post Infographics Block
	 */
	registerBlockVariation(BLOCKNAME, {
		name: 'post-infographics',
		title: __('Post Infographics Card'),
		icon: () => <Icon icon="chart-bar" />,
		description: __(
			'A Group block in the "Baseball Card" style with a heading and list of attached images.'
		),
		attributes: {
			className: 'is-style-baseball-card',
		},
		example: {
			innerBlocks: [
				{
					name: 'core/heading',
					attributes: {
						className: 'baseball-card__heading',
						level: 3,
						fontSize: 'small-label',
						content: 'POST INFOGRAPHICS',
						backgroundColor: 'ui-black',
						textColor: 'ui-white',
					},
				},
				{
					name: 'prc-block/attachment-info',
					attributes: {},
				},
			],
			viewportWidth: 320,
		},
		innerBlocks: [
			[
				'core/heading',
				{
					className: 'baseball-card__heading',
					level: 3,
					fontSize: 'small-label',
					placeholder: 'POST INFOGRAPHICS',
					backgroundColor: 'ui-black',
					textColor: 'ui-white',
				},
			],
			['prc-block/attachment-info', {}],
		],
		isActive: ({ className }) => 'is-style-card-alt' === className,
	});

	/**
	 * Social Group Block
	 */
	registerBlockVariation(BLOCKNAME, {
		name: 'social-group',
		title: __('Social Group'),
		icon: () => <Icon icon="share-from-square" />,
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
						},
					],
				},
				{
					name: 'core/social-links',
					attributes: {
						iconColor: 'ui-black',
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
								service: 'x',
							},
						},
						{
							name: 'core/social-link',
							attributes: {
								service: 'linkedin',
							},
						},
					],
				},
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
					iconColor: 'ui-black',
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
