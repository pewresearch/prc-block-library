/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useRef, useMemo, useEffect } from '@wordpress/element';
import {
	BlockControls,
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	store as blockEditorStore,
	BlockContextProvider,
} from '@wordpress/block-editor';
import {
	Button,
	ToolbarButton,
	ToolbarGroup,
	PanelBody,
	TextControl,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

const TEMPLATE = [
	[
		'prc-block/dialog-trigger',
		{
			lock: {
				move: true,
				remove: false,
			},
		},
		[
			[
				'core/paragraph',
				{
					placeholder: __('Start typing to add Dialog trigger text…'),
				},
			],
		],
	],
	[
		'prc-block/dialog-element',
		{
			lock: {
				move: true,
				remove: true,
			},
		},
		[
			[
				'core/heading',
				{
					level: 2,
					placeholder: __('Add a dialog label…'),
					metadata: {
						bindings: {
							content: {
								source: 'prc-block/dialog-element-label',
							},
						},
					},
				},
			],
		],
	],
];

export default function Edit({ attributes, setAttributes, clientId }) {
	const { dialogId, editorIsDialogOpen = false } = attributes;

	// Get the dialog-content block from inner blocks and check if it's selected.
	const { dialogElementClientId, isDialogElementSelected } = useSelect(
		(select) => {
			const { getBlock, isBlockSelected, hasSelectedInnerBlock } =
				select(blockEditorStore);
			const block = getBlock(clientId);
			const dialogElementBlock = block?.innerBlocks?.find(
				(innerBlock) => innerBlock.name === 'prc-block/dialog-element'
			);
			const dialogElementId = dialogElementBlock?.clientId;
			const isSelected = dialogElementId
				? isBlockSelected(dialogElementId) ||
					hasSelectedInnerBlock(dialogElementId, true)
				: false;

			return {
				dialogElementClientId: dialogElementId,
				isDialogElementSelected: isSelected,
			};
		},
		[clientId]
	);

	const { __unstableMarkNextChangeAsNotPersistent } =
		useDispatch(blockEditorStore);

	// Initialize dialogId only once after mount if not set.
	useEffect(() => {
		if (!dialogId) {
			setAttributes({ dialogId: clientId });
		}
	}, [dialogId, clientId, setAttributes]);

	// Auto open dialog when dialog-element or its children are selected.
	useEffect(() => {
		if (isDialogElementSelected && !editorIsDialogOpen) {
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes({ editorIsDialogOpen: true });
		}
	}, [
		isDialogElementSelected,
		editorIsDialogOpen,
		setAttributes,
		__unstableMarkNextChangeAsNotPersistent,
	]);

	const ref = useRef(null);
	const blockProps = useBlockProps({ ref });

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			template: TEMPLATE,
			templateLock: 'insert',
		}
	);

	const buttonLabel = useMemo(
		() => (editorIsDialogOpen ? __('Close Dialog') : __('Edit Dialog')),
		[editorIsDialogOpen]
	);

	const toggleDialog = () => {
		__unstableMarkNextChangeAsNotPersistent();
		setAttributes({
			editorIsDialogOpen: !editorIsDialogOpen,
		});
	};

	return (
		<>
			<BlockControls __experimentalShareWithChildBlocks>
				<ToolbarGroup>
					<ToolbarButton
						label={buttonLabel}
						aria-controls={dialogElementClientId}
						onClick={toggleDialog}
					>
						{buttonLabel}
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={__('Dialog Settings')}>
					<div>
						<p>
							{__(
								'The dialog element requires a dialog trigger and a dialog element. You can edit the text of the trigger directly, to edit the content of the dialog click the "Edit Dialog" button below.'
							)}
						</p>
						<TextControl
							label={__('Dialog ID')}
							value={dialogId}
							onChange={(value) =>
								setAttributes({ dialogId: value })
							}
							help={__(
								'The ID of the dialog element. This should be unique on the page.'
							)}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<Button
							__next40pxDefaultSize
							variant="tertiary"
							onClick={toggleDialog}
							disabled={!dialogElementClientId}
							accessibleWhenDisabled
						>
							{buttonLabel}
						</Button>
					</div>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<BlockContextProvider
					value={{
						'dialog/id': dialogId || null,
						'dialog/isOpen': editorIsDialogOpen,
					}}
				>
					{innerBlocksProps.children}
				</BlockContextProvider>
			</div>
		</>
	);
}
