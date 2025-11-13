/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import './style.scss';

/**
 * Add extended attributes to the base tabs block.
 * This is where you can add new attributes that extend the base tabs block.
 *
 * @param {Object} settings Block settings
 * @param {string} name     Block name
 * @return {Object} Modified block settings
 */
function addAttributes(settings, name) {
	if (name !== 'prc-block/tabs') {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			// Mobile dropdown functionality
			mobileDropdown: {
				type: 'boolean',
				default: false,
			},
			mobileDropdownWidth: {
				type: 'number',
				default: 768,
			},
			// Add additional attributes here as needed in the future
		},
	};
}

/**
 * Extend the base tabs block edit component with additional controls.
 * This Higher-Order Component wraps the base block's edit component
 * and injects our extended controls into the editor sidebar.
 *
 * @param {Function} BlockEdit Original BlockEdit component
 * @return {Function} Enhanced BlockEdit component
 */
const withExtendedControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { name, attributes, setAttributes, clientId } = props;

		if ('prc-block/tabs' !== name) {
			return <BlockEdit {...props} />;
		}

		return (
			<>
				<Controls {...{ attributes, setAttributes, clientId }} />
				<BlockEdit {...props} />
			</>
		);
	};
}, 'withExtendedControls');

// Register the filters
addFilter(
	'blocks.registerBlockType',
	'prc-block/core-tabs/add-attributes',
	addAttributes
);

addFilter(
	'editor.BlockEdit',
	'prc-block/core-tabs/with-extended-controls',
	withExtendedControls
);
