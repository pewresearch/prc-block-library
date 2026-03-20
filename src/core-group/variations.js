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
