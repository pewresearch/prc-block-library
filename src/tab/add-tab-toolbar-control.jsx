/**
 * WordPress dependencies
 */
import { createBlock }	 from '@wordpress/blocks';
import { BlockControls, store as blockEditorStore } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';

/**
 * "Add Tab" button in the block toolbar for the tab block.
 *
 * @param props {attributes, tabsClientId} Props.
 * @returns {JSX.Element} BlockControls with "Add Tab" button.
 */
export default function AddTabToolbarControl({attributes, tabsClientId}) {
	const { insertBlock } = useDispatch( blockEditorStore );

	const { className, fontFamily, fontSize } = attributes;

	const addTab = () => {
		const newTabBlock = createBlock( 'prc-block/tab', {
			label: __( 'New Tab', 'prc-blocks' ),
			className,
			fontFamily,
			fontSize,
		} );
		insertBlock( newTabBlock, undefined, tabsClientId );
	};

	return (
		<BlockControls group="block">
			<ToolbarGroup>
				<ToolbarButton
					className="components-toolbar__control"
					label={ __( 'Add Tab', 'prc-block-library' ) }
					onClick={ addTab }
					showTooltip
					text="Add Tab"
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}
