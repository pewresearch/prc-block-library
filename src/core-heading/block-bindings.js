/**
 * Block bindings for post sub-title via core/post-meta.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';
import { title as icon } from '@wordpress/icons';

registerBlockVariation('core/heading', {
	name: 'sub-title',
	title: __('Sub-title'),
	description: __(
		'Displays and edits the post sub-title (stored in post meta).'
	),
	icon,
	scope: ['inserter'],
	attributes: {
		level: 2,
		className: 'is-style-sub-title',
		metadata: {
			bindings: {
				content: {
					source: 'core/post-meta',
					args: {
						key: 'sub_title',
					},
				},
			},
		},
	},
	isActive: (attrs) =>
		attrs?.metadata?.bindings?.content?.args?.key === 'sub_title' ||
		attrs?.className?.includes('is-style-sub-title'),
});
