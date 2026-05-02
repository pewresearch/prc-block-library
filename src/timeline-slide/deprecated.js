/**
 * WordPress Dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * v2: string `label` — migrate to `metadata.name` (current schema).
 */
export default [
	{
		attributes: {
			label: {
				type: 'string',
				default: '',
			},
		},
		migrate(attributes) {
			const legacy =
				typeof attributes.label === 'string' ? attributes.label : '';
			const prevMeta =
				attributes.metadata &&
				typeof attributes.metadata === 'object' &&
				attributes.metadata !== null
					? attributes.metadata
					: {};
			return {
				metadata: {
					...prevMeta,
					name: legacy,
				},
			};
		},
		save() {
			return <InnerBlocks.Content />;
		},
	},
];
