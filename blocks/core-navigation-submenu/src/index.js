/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';
import './editor.scss';

// Because theres no good way to inject this in the build process we're defaulting to transforming the core block name like so. You can manually change this if you want.
const BLOCKNAME = 'core-navigation-submenu'.replace(/-/g, '/');
const BLOCKIDENTIFIER = 'prc-block-library/core-navigation-submenu';

/**
 * @NOTE: Modify default settings on core/navigation-submenu block. Sometimes defining attributes via PHP is not enough and this is one of those times.
 * I'm assuming this is because this block is still quite experimental and the API is not fully fleshed out yet, re: Site Editor vs Post Editor.
 *
 * @param {*} settings
 * @param {*} name
 * @returns
 */
addFilter('blocks.registerBlockType', BLOCKIDENTIFIER, (settings, name) => {
	if (BLOCKNAME !== name) {
		return settings;
	}
	const s = settings;
	// if settings object has attributes and attributes has a label property, then add a new property to the label property
	if (
		settings.attributes &&
		!settings.attributes.subExpandOpenedLabel &&
		!settings.attributes.subExpandIsOpenedOnClick
	) {
		s.attributes.subExpandOpenedLabel = {
			type: 'string',
		};
	}
	return {
		...settings,
		...s,
	};
});

addFilter(
	'editor.BlockEdit',
	BLOCKIDENTIFIER,
	createHigherOrderComponent(
		(BlockEdit) =>
			function CoreNavigationSubmenu(props) {
				const { name, attributes, setAttributes } = props;
				if (BLOCKNAME !== name) {
					return <BlockEdit {...props} />;
				}

				const { className } = attributes;

				if ('is-style-sub-expand' !== className) {
					return <BlockEdit {...props} />;
				}

				return (
					<Fragment>
						<BlockEdit {...props} />
						<Controls {...{ attributes, setAttributes, context: false }} />
					</Fragment>
				);
			},
		'withCoreNavigationSubmenuControls',
	),
	21,
);

