/**
 * WordPress Dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Deprecation for grid-controller when it managed columnOrdering
 * This handles migration from the old architecture where:
 * - Grid controller stored columnOrdering: {tablet: [2,0,1], mobile: [1,2,0]}
 * - Provided this to child columns via context
 *
 * To the new architecture where:
 * - Grid controller only manages dividerColor and verticalAlignment
 * - Each column manages its own position and divider attributes
 */
export default [
	{
		attributes: {
			dividerColor: {
				type: 'string',
			},
			verticalAlignment: {
				type: 'string',
			},
			columnOrdering: {
				type: 'object',
				default: {
					tablet: [],
					mobile: [],
				},
			},
		},

		/**
		 * Check if this is the old version by presence of columnOrdering attribute
		 */
		isEligible(attributes) {
			return attributes.hasOwnProperty('columnOrdering');
		},

		/**
		 * Migrate old attributes to new structure
		 * Simply remove the columnOrdering attribute as it's no longer used
		 */
		migrate(attributes, innerBlocks) {
			const { columnOrdering, ...otherAttributes } = attributes;

			// Note: Child columns will be migrated separately by their own deprecation handler
			return {
				...otherAttributes,
			};
		},

		/**
		 * Old save function - same as current since we only changed attributes
		 */
		save() {
			return <InnerBlocks.Content />;
		},
	},
];
