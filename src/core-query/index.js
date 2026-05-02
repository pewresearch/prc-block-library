/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const BLOCKNAME = 'core/query';
const BLOCKIDENTIFIER = 'prc-block-library/core-query';

addFilter(
	'editor.BlockEdit',
	BLOCKIDENTIFIER,
	createHigherOrderComponent(
		(BlockEdit) =>
			function CoreQuery(props) {
				const { name } = props;
				if (BLOCKNAME !== name) {
					return <BlockEdit {...props} />;
				}

				return (
					<>
						<BlockEdit {...props} />
						<Controls {...props} />
					</>
				);
			},
		'withCoreQueryControls'
	),
	21
);

/**
 * Add onlyQueryParents attribute to core/query.
 *
 * @param {Object} settings Block settings.
 * @param {string} name     Block name.
 * @return {Object} Settings.
 */
function modifyDefaultSettings(settings, name) {
	if (BLOCKNAME !== name) {
		return settings;
	}
	const next = { ...settings };
	next.attributes = {
		...next.attributes,
		onlyQueryParents: {
			type: 'boolean',
			default: false,
		},
	};
	return next;
}
addFilter('blocks.registerBlockType', BLOCKIDENTIFIER, modifyDefaultSettings);
