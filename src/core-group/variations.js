/* eslint-disable max-lines-per-function */
/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';
import { columns } from '@wordpress/icons';

const BLOCKNAME = 'core/group';

/** @type {Array<{name: string, label: string, contentSize: string}>} */
const GROUP_WIDTH_PRESETS = [
	{ name: 'two-hundred-px', label: '200px', contentSize: '200px' },
	{ name: 'two-hundred-fifty-px', label: '250px', contentSize: '250px' },
	{ name: 'three-hundred-px', label: '300px', contentSize: '300px' },
	{
		name: 'three-hundred-twenty-px',
		label: '320px',
		contentSize: '320px',
	},
	{
		name: 'four-hundred-twenty-px',
		label: '420px',
		contentSize: '420px',
	},
	{ name: 'six-hundred-forty-px', label: '640px', contentSize: '640px' },
];

/**
 * Register constrained-width core/group variations (transform scope only).
 *
 * @return {void}
 */
export default function registerVariations() {
	const stack = (responsiveOrder) => [
		'core/group',
		{
			layout: { type: 'flex', orientation: 'vertical' },
			style: {
				tablet: { layout: { prcOrder: responsiveOrder } },
				mobile: { layout: { prcOrder: responsiveOrder } },
			},
		},
		[['core/paragraph']],
	];

	registerBlockVariation(BLOCKNAME, {
		name: 'columns',
		title: __('Columns', 'prc-block-library'),
		description: __(
			'A three column grid of stacked groups.',
			'prc-block-library'
		),
		icon: columns,
		category: 'design',
		attributes: {
			layout: { type: 'grid', columnCount: 3 },
		},
		scope: ['inserter', 'transform'],
		innerBlocks: [stack(1), stack(2), stack(3)],
		isActive: ['layout.type', 'layout.columnCount'],
	});

	GROUP_WIDTH_PRESETS.forEach(({ name, label, contentSize }) => {
		registerBlockVariation(BLOCKNAME, {
			name,
			title: label,
			description: sprintf(
				/* translators: %s: group content width (e.g. 200px) */
				__('A Group block with a width of %s', 'prc-block-library'),
				label
			),
			attributes: {
				layout: {
					type: 'constrained',
					contentSize,
				},
			},
			scope: ['transform'],
			innerBlocks: [['core/paragraph']],
			isActive: (blockAttributes, variationAttributes) =>
				blockAttributes?.layout?.contentSize ===
				variationAttributes?.layout?.contentSize,
		});
	});
}
