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
import './editor.scss';
import Controls from './controls';

import registerVariations from './variations';
import registerTransforms from './transforms';

registerVariations();
registerTransforms();

const BLOCKNAME = 'core/details';
const BLOCKIDENTIFIER = 'prc-block-library/core-details';

addFilter(
	'editor.BlockEdit',
	BLOCKIDENTIFIER,
	createHigherOrderComponent(
		(BlockEdit) =>
			function CoreDetails(props) {
				const { name, attributes, setAttributes } = props;
				if (BLOCKNAME !== name) {
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
		'withCoreDetailsControls'
	),
	21
);
