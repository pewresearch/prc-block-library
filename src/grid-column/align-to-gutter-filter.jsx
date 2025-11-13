/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import {
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	ToggleControl,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

export default function registerAlignToGutterFilter() {
	/**
	 * Add support for the align to gutter attributes to blocks.
	 *
	 * @param {Object} settings Settings for the block.
	 *
	 * @return {Object} settings Modified settings.
	 */
	addFilter(
		'blocks.registerBlockType',
		`align-to-gutter-controls-supports`,
		(settings) => {
			settings.attributes = {
				...settings.attributes,
				alignToGutter: {
					type: 'boolean',
					default: false,
				},
			};
			return settings;
		}
	);

	/**
	 * Add support for left and right alignment, and add transform support from prc-block/callout to group.
	 *
	 * @param {Object} settings Settings for the block.
	 *
	 * @return {Object} settings Modified settings.
	 */
	addFilter(
		'editor.BlockEdit',
		`align-to-gutter-controls`,
		createHigherOrderComponent(
			(BlockEdit) =>
				function AlignToGutterControls(props) {
					const { name, attributes, setAttributes, clientId } = props;
					if ( ['core/template-part', 'core/pattern'].includes(name) ) {
						return <BlockEdit {...props}/>
					}
					// Check if this block is inside the results block, do this by navigating up the tree of this clientId and check if the parent is a results block.
					// If it is, we can add the points display controls.
					const isInsideColumn = useSelect(
						(select) => {
							const { getBlockRootClientId, getBlock } =
								select(blockEditorStore);
							const parentBlock = getBlockRootClientId(clientId);
							const columnBlock = getBlock(parentBlock);
							if ( 'prc-block/grid-column' !== columnBlock?.name ) {
								return false;
							}
							// If there is a parent then return true, otherwise return false.
							return true;
						},
						[clientId]
					);
					if (!isInsideColumn) {
						return <BlockEdit {...props} />;
					}
					// Get current display logic settings from attributes or set defaults
					const {
						alignToGutter = false,
					} = attributes;

					return (
						<>
							<InspectorControls group="dimensions">
								<ToolsPanelItem
									label={__('Align To Column Gutter')}
									hasValue={() => alignToGutter }
									onSelect={()=> setAttributes({ alignToGutter: true })}
									onDeselect={() => setAttributes({ alignToGutter: false })}
									resetAllFilter={() => setAttributes({ alignToGutter: false })}
									panelId={clientId}
									style={{
										gridRow: '6',
									}}
								>
									<ToggleControl
										label="Align Block Wrapper to Grid Gutter"
										checked={alignToGutter}
										onChange={() => setAttributes({ alignToGutter: !alignToGutter })}
										help={alignToGutter ? __('Block wrapper is aligned to grid column gutter') : false}
									/>
								</ToolsPanelItem>
							</InspectorControls>
							<BlockEdit {...props} />
						</>
					);
				},
			'withAlignToGutterControls'
		),
		100
	);

	addFilter(
		'editor.BlockListBlock',
		`align-to-gutter-wrapper-props`,
		createHigherOrderComponent((BlockListBlock) => {
			return (props) => {
				const { attributes, wrapperProps, name, className = '' } = props;
				const {
					alignToGutter = false,
				} = attributes;
				if ( ! alignToGutter ) {
					return <BlockListBlock {...props} />;
				}
				const newWrapperProps = {
					...wrapperProps,
				};
				newWrapperProps.className = 'prc-block-grid-column--align-to-gutter';
				return <BlockListBlock {...props} wrapperProps={newWrapperProps} />;
			};
		}, 'withAlignToGutterWrapper')
	);
}
