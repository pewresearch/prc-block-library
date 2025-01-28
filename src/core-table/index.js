/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import './style.scss';
import Controls from './controls';

// Because theres no good way to inject this in the build process we're defaulting to transforming the core block name like so. You can manually change this if you want.
const BLOCKNAME = 'core/table';
const BLOCKIDENTIFIER = 'prc-block-library/core-table';
const SUPPORTED_BLOCKS = [BLOCKNAME];

addFilter(
	'editor.BlockEdit',
	BLOCKIDENTIFIER,
	createHigherOrderComponent(
		(BlockEdit) =>
			function CoreTable(props) {
				const { name, attributes, setAttributes } = props;
				if (!SUPPORTED_BLOCKS.includes(name)) {
					return <BlockEdit {...props} />;
				}

				return (
					<Fragment>
						<BlockEdit {...props} />
						<Controls
							{...{ attributes, setAttributes, context: false }}
						/>
					</Fragment>
				);
			},
		'withCoreTableControls'
	),
	21
);
