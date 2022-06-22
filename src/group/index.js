/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import {
	createBlock,
	registerBlockStyle,
	registerBlockVariation,
	rawHandler,
} from '@wordpress/blocks';
import { Fragment } from '@wordpress/element';
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import {
	__experimentalNumberControl as NumberControl,
	TextControl,
	ToggleControl,
	CardDivider,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import './style.scss';

registerBlockStyle('core/group', [
	{
		name: 'fluid',
		label: 'Fluid',
		isDefault: true,
	},
	{
		name: '200-wide',
		label: '200px Wide',
	},
	{
		name: '300-wide',
		label: '300px Wide',
	},
	{
		name: '420-wide',
		label: '420px Wide',
	},
	{
		name: '640-wide',
		label: '640px Wide',
	},
]);

// "Callout" block
registerBlockVariation('core/group', {
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
});

// "Card" block
registerBlockVariation('core/group', {
	name: 'card',
	title: __('Card'),
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
});

// "Baseball Card" block
registerBlockVariation('core/group', {
	name: 'card-alt',
	title: __('Card (Alt)'),
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
});

// "Segment" block
registerBlockVariation('core/group', {
	name: 'segment',
	title: __('Segment'),
	description: __('A Group block in the "segment" format with a heading.'),
	attributes: {
		className: 'is-style-segment ui segment',
	},
	innerBlocks: [
		[
			'core/heading',
			{
				level: 4,
				placeholder: 'Subscribe to our topical newsletters...',
			},
		],
	],
});

// "Social Group" block
registerBlockVariation('core/group', {
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
			'core/group',
			{
				templateLock: false,
			},
			[['core/image']],
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
				['core/social-link', { service: 'facebook' }],
				['core/social-link', { service: 'twitter' }],
				['core/social-link', { service: 'linkedin' }],
			],
		],
	],
});

/**
 * Add support for left and right alignment, and add transform support from prc-block/callout to group.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */

addFilter('blocks.registerBlockType', 'prc-block/group', (settings) => {
	if ('core/group' !== settings.name) {
		return settings;
	}

	if ('undefined' !== typeof settings.supports.align) {
		// During the group block's development the alignment options have changed, here we are enforcing all alignments to be available.
		settings.supports.align = ['left', 'right', 'center', 'wide', 'full'];
	}

	if ('undefined' !== typeof settings.transforms) {
		// Handle legacy prc-block/callout block to be converted to a group with the callout style.
		if ('undefined' !== typeof settings.transforms.from) {
			settings.transforms.from.push({
				type: 'block',
				blocks: ['core/group', 'prc-block/callout'],
				transform: (attributes, innerBlocks) =>
					createBlock(
						'core/group',
						{
							className: 'is-style-callout',
							backgroundColor: 'beige',
							...attributes,
						},
						innerBlocks,
					),
			});

			// Handle converting div html with a class of `callout` to a group block with the same style.
			settings.transforms.from.push({
				type: 'raw',
				isMatch: (node) =>
					// If the element has a class of callout return true and proceed to trasnform...
					node.classList.contains('callout'),
				transform: (node) => {
					// Loop through the node child nodes and get its outerHtml and create a block from the HTML string, then add that to innerBlocks.
					const innerBlocks = rawHandler({ HTML: node.innerHTML });

					const attrs = {
						className: 'is-style-callout',
						backgroundColor: 'beige',
					};
					if (node.getAttribute('align')) {
						attrs.align = node.getAttribute('align');
					}

					return createBlock('core/group', attrs, [...innerBlocks]);
				},
				priority: 11,
			});
		}
	}

	return settings;
});

addFilter(
	'editor.BlockEdit',
	'prc-block/group',
	createHigherOrderComponent(
		(BlockEdit) =>
			function GroupBlockAdvancedControls (props) {
				const { name, attributes, setAttributes } = props;
				if ('core/group' !== name) {
					return <BlockEdit {...props} />;
				}
				const { isSticky, responsiveAttachId, responsiveThreshold } = attributes;
				return (
					<Fragment>
						<InspectorAdvancedControls>
							<ToggleControl
								label={__('Sticky On Scroll?')}
								checked={isSticky}
								onChange={(val) => setAttributes({ isSticky: !isSticky })}
								help="Enable sticky on scroll for this group, this will be disabled when you reach the responsive threshold as its intended for desktop only. If you have specific mobile needs consult with the dev team."
							/>
							<TextControl
								label={__('Responsive Attachment ID')}
								value={responsiveAttachId}
								onChange={(val) => setAttributes({ responsiveAttachId: val })}
							/>
							<NumberControl
								label={__('Responsive Threshold')}
								value={responsiveThreshold}
								onChange={(val) => setAttributes({ responsiveThreshold: val })}
								max={3540}
								min={320}
								isDragEnabled
								help={__(
									`The responsive threshold is the point at which the group block and its contents will trigger their mobile behavior. The default is 640px (small tablet), but you can change this to any value you like. If you would like to trigger the mobile behavior of a block immediately regardless of device size then use the maximum value of 3540.`,
								)}
							/>
							<CardDivider />
						</InspectorAdvancedControls>
						<BlockEdit {...props} />
					</Fragment>
				);
			},
		'withGroupAdvancedControls',
	),
	21,
);
