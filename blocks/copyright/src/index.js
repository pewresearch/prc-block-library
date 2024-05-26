import { registerBlockVariation } from '@wordpress/blocks';

registerBlockVariation('core/paragraph', {
	name: 'Copyright Disclaimer',
	title: 'Copyright Disclaimer',
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
