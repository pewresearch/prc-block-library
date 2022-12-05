/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';

const EXAMPLE = 'https://app.sli.do/event/2jtxhrzn';
const BLOCKNAME = 'core/embed';

/**
 * Slido Block
 */
registerBlockVariation(BLOCKNAME, {
	name: 'slido',
	title: __('Sli.do'),
	description: __('Embed a Slido chat widget.'),
	patterns: [/^https?:\/\/(app\.)?sli\.do\/.+/i],
	attributes: {
		providerNameSlug: 'slido',
		responsive: true,
	},
	isActive: (blockAttributes, variationAttributes) =>
		blockAttributes.providerNameSlug &&
		blockAttributes.providerNameSlug === variationAttributes.providerNameSlug,
});
