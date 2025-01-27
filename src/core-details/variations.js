/**
 * WordPress Dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';

const BLOCKNAME = 'core/details';

const commonStyles = {
	spacing: {
		blockGap: 'var:preset|spacing|40',
		padding: {
			bottom: 'var:preset|spacing|20',
			left: 'var:preset|spacing|30',
			right: 'var:preset|spacing|30',
			top: 'var:preset|spacing|20',
		},
	},
	typography: {
		fontSize: '0.88em',
	},
};

export default function registerVariations() {
	registerBlockVariation(BLOCKNAME, {
		name: 'collapsible',
		title: 'Collapsible',
		description: 'Used in "How we did this" sections.',
		keywords: ['collapsible', 'how we did this'],
		attributes: {
			className: 'is-style-plus-icon',
			backgroundColor: 'ui-beige-very-light',
			summary: 'How we did this',
			borderColor: 'ui-gray-light',
			fontFamily: 'sans-serif',
			style: {
				border: {
					width: '1px',
				},
				...commonStyles,
			},
		},
		scope: ['inserter', 'transform'],
		isActive: (blockAttributes, variationAttributes) =>
			blockAttributes.className &&
			blockAttributes.className === variationAttributes.className,
	});

	registerBlockVariation(BLOCKNAME, {
		name: 'pew-knight-co-branded',
		title: 'Pew Knight Co-Branded',
		description:
			'Used in "How we did this" sections in Pew Knight Initiative pages.',
		keywords: ['collapsible', 'how we did this', 'pew-knight'],
		attributes: {
			className: 'is-style-pew-knight-co-branded',
			summary: 'Pew Knight Initiative',
			borderColor: 'ui-gray-light',
			fontFamily: 'sans-serif',
			style: {
				border: {
					top: {
						width: '1px',
						color: 'var:preset|color|ui-gray-light',
					},
					right: {
						width: '0px',
						style: 'none',
					},
					bottom: {
						width: '1px',
						color: 'var:preset|color|ui-gray-light',
					},
					left: {
						width: '0px',
						style: 'none',
					},
				},
				...commonStyles,
			},
		},
		innerBlocks: [
			[
				'core/paragraph',
				{
					content:
						'<a href="#">For more Pew-Knight Initiative content</a>',
					lock: { move: true, remove: true },
				},
			],
			[
				'core/paragraph',
				{
					placeholder: 'Type / to add a hidden block',
				},
			],
		],
		scope: ['inserter', 'transform'],
		isActive: (blockAttributes, variationAttributes) =>
			blockAttributes.className &&
			blockAttributes.className === variationAttributes.className,
	});
}
