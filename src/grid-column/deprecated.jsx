/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Deprecation for grid-column when columnOrdering was managed by parent grid-controller
 * This handles migration from the old architecture where:
 * - Parent stored columnOrdering: {tablet: [2,0,1], mobile: [1,2,0]}
 * - Columns calculated position using indexOf
 *
 * To the new architecture where:
 * - Each column stores its own tabletPosition, mobilePosition
 * - Each column stores its own divider attributes
 */
export default [
	{
		attributes: {
			gridLayout: {
				type: 'object',
				default: {
					index: 1,
					desktopSpan: 12,
					tabletSpan: 12,
					mobileSpan: 4,
					desktopStart: null,
					tabletStart: null,
					mobileStart: null,
				},
			},
			verticalAlignment: {
				type: 'string',
			},
		},

		/**
		 * Check if this is the old version by seeing if gridLayout lacks position attributes
		 */
		isEligible(attributes) {
			const { gridLayout } = attributes;
			// Old version won't have tabletPosition, mobilePosition, or divider attributes
			return (
				gridLayout &&
				!gridLayout.hasOwnProperty('tabletPosition') &&
				!gridLayout.hasOwnProperty('mobilePosition') &&
				!gridLayout.hasOwnProperty('desktopDivider')
			);
		},

		/**
		 * Migrate old attributes to new structure
		 * Note: We can't access parent's columnOrdering here, so we'll set positions to null
		 * which means "use default/sequential order". Users will need to re-set custom orders.
		 */
		migrate(attributes) {
			const { gridLayout, ...otherAttributes } = attributes;

			return {
				...otherAttributes,
				gridLayout: {
					...gridLayout,
					// Position attributes - null means sequential order
					tabletPosition: null,
					mobilePosition: null,
					// Divider attributes - will be calculated by automatic divider logic
					// Desktop: first column (index 1) has no divider, others do
					desktopDivider: gridLayout.index !== 1,
					tabletDivider: gridLayout.index !== 1,
					mobileDivider: gridLayout.index !== 1,
				},
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
