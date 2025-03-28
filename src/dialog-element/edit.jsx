/**
 * External Dependencies
 */
import { Icon, cancelCircleFilled } from '@wordpress/icons';
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useMemo, useRef } from '@wordpress/element';
import {
	useBlockProps,
	useInnerBlocksProps,
	withColors,
	getColorClassName,
} from '@wordpress/block-editor';
import { KeyboardShortcuts, ResizableBox } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { Toolbar, InspectorPanel } from './controls';

function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	className,
	backdropColor,
	setBackdropColor,
	isSelected,
}) {
	const widths = useMemo(() => context?.['dialog/widths'] || {}, [context]);
	const dialogType = context?.['dialog/type'] || 'modal';
	const { selectBlock } = useDispatch('core/block-editor');
	const { deviceType, rootClientId } = useSelect((select) => {
		return {
			deviceType: select('core/editor').getDeviceType().toLowerCase(),
			rootClientId:
				select('core/block-editor').getBlockRootClientId(clientId),
		};
	}, []);

	const { updateBlockAttributes } = useDispatch('core/block-editor');
	/**
	 * Setup state and ref for the dialog.
	 */
	const dialogElementRef = useRef(null);
	const isOpen = useMemo(() => {
		if (dialogElementRef.current) {
			return dialogElementRef.current.open;
		}
		return false;
	}, [dialogElementRef.current, dialogElementRef.current?.open]);

	/**
	 * Setup state for the resizable box
	 */
	const targetWidth = useMemo(() => {
		return widths?.[deviceType] || 0;
	}, [widths, deviceType]);

	/**
	 * Helper functions:
	 */
	const openDialog = () =>
		'modal' === dialogType
			? dialogElementRef.current.showModal()
			: dialogElementRef.current.show();
	const closeDialog = () => {
		dialogElementRef.current.close();
		selectBlock(rootClientId);
	};
	const onEscHandler = (e) => {
		e.preventDefault();
		closeDialog();
	};
	const setWidth = (device, newWidth) =>
		updateBlockAttributes(rootClientId, {
			widths: {
				...widths,
				[device]: parseInt(targetWidth + newWidth, 10),
			},
		});

	const blockProps = useBlockProps({
		ref: dialogElementRef,
		className: classNames(className, {
			'has-backdrop-color': !!backdropColor.color || backdropColor.class,
			[getColorClassName('backdrop-color', backdropColor?.slug)]:
				!!backdropColor?.slug,
			'is-mobile': 'mobile' === deviceType,
		}),
		'data-wp-dialog-type': dialogType,
	});

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-prc-block-dialog-element__inner',
		},
		{
			templateLock: false,
			__experimentalCaptureToolbars: true,
		}
	);

	return (
		<Fragment>
			<InspectorPanel
				{...{
					colors: {
						backdropColor,
						setBackdropColor,
					},
					openDialog,
					closeDialog,
					clientId,
					context,
				}}
			/>
			<KeyboardShortcuts
				bindGlobal
				shortcuts={{
					esc: onEscHandler,
				}}
			>
				<dialog {...blockProps}>
					{
						<Toolbar
							{...{
								openDialog,
								closeDialog,
								isOpen,
								clientId,
							}}
						/>
					}
					<button
						className="wp-block-prc-block-dialog-element__close-button"
						type="button"
						aria-label="Close dialog"
						onClick={() => closeDialog()}
					>
						{
							// @TODO We need to probably add a slotfill here for the icon. We can and should reference the icon library work in Gutenberg to determine if we can hook in to that for this.
						}
						<Icon icon={cancelCircleFilled} />
					</button>
					<ResizableBox
						size={{
							width:
								'mobile' !== deviceType ? targetWidth : 'auto',
						}}
						minWidth="320"
						maxWidth="800"
						__experimentalShowTooltip={true}
						__experimentalTooltipProps={{
							showPx: true,
							fadeTimeout: 1000,
						}}
						enable={{
							top: false,
							right: 'mobile' !== deviceType,
							bottom: false,
							left: false,
							topRight: false,
							bottomRight: false,
							bottomLeft: false,
							topLeft: false,
						}}
						onResizeStop={(event, direction, elt, delta) => {
							setWidth(deviceType, delta.width);
						}}
					>
						<div {...innerBlocksProps} />
					</ResizableBox>
				</dialog>
			</KeyboardShortcuts>
		</Fragment>
	);
}

export default withColors({ backdropColor: 'backdrop-color' })(Edit);
