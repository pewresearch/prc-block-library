/* eslint-disable max-lines-per-function */
/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';

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
	GROUP_WIDTH_PRESETS.forEach(({ name, label, contentSize }) => {
		registerBlockVariation(BLOCKNAME, {
			name,
			title: __(label, 'prc-block-library'),
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
