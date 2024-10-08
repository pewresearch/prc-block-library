/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

registerBlockVariation('core/paragraph', {
	name: 'version-info',
	title: 'Version Info',
	attributes: {
		metadata: {
			content: 'Version: 1.0.0',
			bindings: {
				content: {
					source: 'prc-platform/version',
					args: {
						module: 'platform',
					},
				},
			},
		},
	},
});
