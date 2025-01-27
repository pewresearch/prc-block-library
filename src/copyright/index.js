import { registerBlockVariation } from '@wordpress/blocks';

registerBlockVariation('core/paragraph', {
	name: 'Copyright Disclaimer',
	title: 'Copyright Disclaimer',
	description:
		'A block that dynamically displays a copyright disclaimer with the current year.',
	attributes: {
		content: '© 20xx Pew Research Center',
		metadata: {
			bindings: {
				content: {
					source: 'prc-platform/copyright',
				},
			},
		},
	},
});
