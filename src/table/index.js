/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import './store';
import './style.scss';
import metadata from './block.json';
import example from './example';
import { blockIcon as icon } from './icons';
import edit from './edit';
import save from './save';
import transforms from './transforms';
import deprecated from './deprecated';
import { GlobalSettings } from './settings';
import AICopilotPrePublishCheck from './components/ai-pre-publish-check';

const { name } = metadata;

const settings = {
	icon,
	edit,
	save,
	example,
	transforms,
	deprecated,
	// styles: [
	// 	{
	// 		name: 'stripes',
	// 		label: __('Stripes', 'prc-block'),
	// 	},
	// ],
};

// Register block.
registerBlockType(name, { ...metadata, ...settings });

// Global Table Settings. Will come back to this later.
// const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
// 	return (props) => {
// 		const { name: blockName } = props;

// 		if (blockName !== 'prc-block/table') {
// 			return <BlockEdit {...props} />;
// 		}

// 		return (
// 			<>
// 				{/* <InspectorControls>
// 					<GlobalSettings />
// 				</InspectorControls> */}
// 				<BlockEdit {...props} />
// 			</>
// 		);
// 	};
// }, 'withInspectorControl');

// addFilter(
// 	'editor.BlockEdit',
// 	'prc-block-library/withInspectorControls',
// 	withInspectorControls
// );

registerPlugin('prc-block-library-ai-pre-publish-check', {
	render: () => <AICopilotPrePublishCheck />,
});
