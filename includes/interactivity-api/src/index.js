/* eslint-disable max-len */
/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const BLOCKIDENTIFIER = 'prc-block/interactivity-api';

/**
 * Add the interactivity api controls to all blocks that support block.
 */
addFilter(
	'editor.BlockEdit',
	`${BLOCKIDENTIFIER}-controls`,
	createHigherOrderComponent(
		(BlockEdit) =>
			function BlockInteractivityControls(props) {
				const { name, attributes, setAttributes, clientId, isSelected, context } = props;

				const supportsInteractivity = useSelect(
					(select) =>
						select('core/blocks').getBlockSupport(name, 'interactivity'),
					[name]
				);

				if (!supportsInteractivity || !isSelected) {
					return <BlockEdit {...props} />;
				}

				return (
					<Fragment>
						<BlockEdit {...props} />
						<Controls
							{...{ attributes, setAttributes, clientId, context }}
						/>
					</Fragment>
				);
			},
		'withPRCBlockInteractivityAPIControls'
	),
	100
);

addFilter(
	'blocks.registerBlockType',
	`${BLOCKIDENTIFIER}-supports`,
	(settings) => {

		if ( settings?.supports?.interactivity ) {
			settings.attributes = {
				...settings.attributes,
				isInteractive: {
					type: 'boolean',
					default: false,
				},
				interactiveNamespace: {
					type: 'string',
				},
			};
			settings.usesContext = [
				...settings.usesContext,
				'interactiveNamespace'
			];
		}

		return settings;
	},
	100
);
