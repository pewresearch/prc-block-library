/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useRef, useMemo } from '@wordpress/element';
import {
	BlockControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';

/**
 * Internal Dependencies
 */
const TEMPLATE = [
	['prc-block/dialog-trigger', {}],
	['prc-block/dialog-element', {}],
];

const ALLOWED_BLOCKS = ['prc-block/dialog-trigger', 'prc-block/dialog-element'];

export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
}) {
	// add dialog id attribute to the block
	const { dialogType, dialogId } = attributes;
	if (!dialogId) {
		setAttributes({ dialogId: clientId });
	}
	// Set up a ref so that we can query for the dialog element and memoize it.
	const ref = useRef(null);
	const dialogElm = useMemo(() => {
		return (
			ref.current?.querySelector('.wp-block-prc-block-dialog-element') ||
			null
		);
	}, [ref, ref.current]);

	const blockProps = useBlockProps({
		ref,
	});

	// We're locking down the template and allowed blocks to only allow the dialog trigger and dialog element.
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		templateLock: 'all',
	});

	const buttonLabel = __('Edit Dialog Element', 'prc-block-library');

	return (
		<Fragment>
			<BlockControls __experimentalShareWithChildBlocks={true}>
				<ToolbarGroup>
					<ToolbarButton
						label={buttonLabel}
						onClick={() =>
							'modal' === dialogType
								? dialogElm.showModal()
								: dialogElm.show()
						}
					>
						{buttonLabel}
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			<div {...innerBlocksProps} />
		</Fragment>
	);
}
