/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';

const BLOCKNAME = 'core/embed';

const isProvider = (blockAttributes, variationAttributes) =>
	blockAttributes.providerNameSlug &&
	blockAttributes.providerNameSlug === variationAttributes.providerNameSlug;

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
	isActive: isProvider,
});

registerBlockVariation(BLOCKNAME, {
	name: 'slideshare',
	title: __('SlideShare'),
	description: __('Embed a SlideShare deck.'),
	keywords: [__('slides'), __('deck'), __('presentation')],
	patterns: [/^https?:\/\/(www\.)?slideshare\.net\/.+/i],
	attributes: {
		providerNameSlug: 'slideshare',
		responsive: true,
	},
	isActive: isProvider,
});
