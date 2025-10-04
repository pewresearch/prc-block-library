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
} from '@wordpress/block-editor';
import {
	Button,
	ToolbarButton,
	ToolbarGroup,
	PanelBody,
	TextControl,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_NAME } from './store';
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
					placeholder: __(
						'Start typing to add Dialog trigger text…'
					),
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
					placeholder: __( 'Add a dialog label…' ),
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

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { dialogId } = attributes;

	// Initialize dialogId only once after mount if not set.
	useEffect( () => {
		if ( ! dialogId ) {
			setAttributes( { dialogId: clientId } );
		}
	}, [ dialogId, clientId, setAttributes ] );

	// Get the dialog-element block from inner blocks
	const { dialogElementClientId, isDialogOpen } = useSelect(
		( select ) => {
			const { getBlock } = select( blockEditorStore );
			const block = getBlock( clientId );
			const dialogElementBlock = block?.innerBlocks?.find(
				( innerBlock ) => innerBlock.name === 'prc-block/dialog-element'
			);
			const dialogElementId = dialogElementBlock?.clientId;

			return {
				dialogElementClientId: dialogElementId,
				isDialogOpen: dialogElementId
					? select( STORE_NAME ).isOpen( dialogElementId )
					: false,
			};
		},
		[ clientId ]
	);

	// Get store actions
	const { open, close } = useDispatch( STORE_NAME );

	// Set up a ref for the block container
	const ref = useRef( null );

	const blockProps = useBlockProps( {
		ref,
	} );

	// We're locking down the template and allowed blocks to only allow the dialog trigger and dialog element.
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: TEMPLATE,
		templateLock: 'insert',
	} );

	const buttonLabel = useMemo(
		() => ( isDialogOpen ? __( 'Close Dialog' ) : __( 'Edit Dialog' ) ),
		[ isDialogOpen ]
	);

	return (
		<>
			<BlockControls __experimentalShareWithChildBlocks>
				<ToolbarGroup>
					<ToolbarButton
						label={ buttonLabel }
						onClick={ () => {
							if ( ! dialogElementClientId ) {
								console.warn(
									'No dialog-element block found. Please add a dialog-element block.'
								);
								return;
							}
							if ( isDialogOpen ) {
								close( dialogElementClientId );
							} else {
								open( dialogElementClientId );
							}
						} }
					>
						{ buttonLabel }
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Dialog Settings' ) }>
					<div>
						<p>
							{ __(
								'The dialog element requires a dialog trigger and a dialog element. You can edit the text of the trigger directly, to edit the content of the dialog click the "Edit Dialog" button below.'
							) }
						</p>
						<TextControl
							label={ __( 'Dialog ID' ) }
							value={ dialogId }
							onChange={ ( value ) =>
								setAttributes( { dialogId: value } )
							}
							help={ __(
								'The ID of the dialog element. This should be unique on the page.'
							) }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<Button
							__next40pxDefaultSize
							variant="tertiary"
							onClick={ () => {
								if ( dialogElementClientId ) {
									if ( isDialogOpen ) {
										close( dialogElementClientId );
									} else {
										open( dialogElementClientId );
									}
								}
							} }
							disabled={ ! dialogElementClientId }
							accessibleWhenDisabled
						>
							{ isDialogOpen
								? __( 'Close Dialog' )
								: __( 'Edit Dialog' ) }
						</Button>
					</div>
				</PanelBody>
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</>
	);
}
