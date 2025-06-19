/**
 * External Dependencies
 */
import { plusCircle, cancelCircleFilled } from '@wordpress/icons';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo, Fragment } from '@wordpress/element';
import {
	InspectorControls,
	BlockControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';
import {
	ToolbarButton,
	ToolbarGroup,
	PanelBody,
	__experimentalNumberControl as NumberControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

export function Toolbar({ openDialog, closeDialog, isOpen, clientId }) {
	/**
	 * Setup the icon and label for the block toolbar.
	 */
	const { selectBlock } = useDispatch('core/block-editor');
	const { rootClientId } = useSelect((select) => {
		return {
			rootClientId:
				select('core/block-editor').getBlockRootClientId(clientId),
		};
	}, []);

	const label = useMemo(
		() => (isOpen ? 'Close Dialog' : 'Open Dialog'),
		[isOpen]
	);

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					label={label}
					isActive={isOpen}
					onClick={() => {
						if (isOpen) {
							selectBlock(rootClientId);
							closeDialog();
						} else {
							openDialog();
						}
					}}
				>
					{label}
				</ToolbarButton>
			</ToolbarGroup>
		</BlockControls>
	);
}

export function InspectorPanel({
	openDialog,
	closeDialog,
	colors,
	clientId,
	context,
}) {
	const autoActivationTimer = context?.['dialog/autoActivationTimer'] || -1;
	const animationDuration = context?.['dialog/animationDuration'] || 500;
	const dialogType = context?.['dialog/type'] || 'modal';
	const dialogSize = context?.['dialog/size'] || 'medium';
	/**
	 * Setup the icon and label for the block toolbar.
	 */
	const { updateBlockAttributes } = useDispatch('core/block-editor');
	const { rootClientId } = useSelect((select) => {
		return {
			rootClientId:
				select('core/block-editor').getBlockRootClientId(clientId),
		};
	}, []);
	const { backdropColor, setBackdropColor } = colors;
	const colorSettings = useMultipleOriginColorsAndGradients();

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Dialog Settings', 'prc-block-library')}>
					<SelectControl
						label="Dialog Type"
						help="Choose the type of dialog to display. A modal dialog will block the rest of the page from being interacted with. A dialog will allow the user to interact with the rest of the page. Changing this value will close the current dialog."
						value={dialogType}
						options={[
							{
								label: __('Modal', 'prc-block-library'),
								value: 'modal',
							},
							{
								label: __('Dialog', 'prc-block-library'),
								value: 'dialog',
							},
						]}
						onChange={(newType) => {
							updateBlockAttributes(rootClientId, {
								dialogType: newType,
							});
							closeDialog();
						}}
					/>
					<SelectControl
						label="Dialog Size"
						help="Choose the size of the dialog to display."
						value={dialogSize}
						options={[
							{
								label: __('Small', 'prc-block-library'),
								value: 'small',
							},
							{
								label: __('Medium', 'prc-block-library'),
								value: 'medium',
							},
							{
								label: __('Large', 'prc-block-library'),
								value: 'large',
							},
						]}
						onChange={(newSize) => {
							updateBlockAttributes(rootClientId, {
								dialogSize: newSize,
							});
						}}
					/>
					{'modal' === dialogType && (
						<Fragment>
							<ToggleControl
								label={__(
									'Auto Activation Timer',
									'prc-block-library'
								)}
								help={__(
									'Automatically open the dialog after the specified time, in milliseconds.',
									'prc-block-library'
								)}
								checked={1 <= autoActivationTimer}
								onChange={(newAutoActivationTimer) =>
									updateBlockAttributes(rootClientId, {
										autoActivationTimer:
											newAutoActivationTimer ? 5000 : -1,
									})
								}
							/>
							{1 <= autoActivationTimer && (
								<NumberControl
									label="Activation Timer Duration"
									isShiftStepEnabled={true}
									onChange={(newDuration) =>
										updateBlockAttributes(rootClientId, {
											autoActivationTimer: newDuration,
										})
									}
									shiftStep={100}
									value={autoActivationTimer}
								/>
							)}
						</Fragment>
					)}
				</PanelBody>
				<PanelBody title={__('Animation', 'prc-block-library')}>
					<NumberControl
						label="Animation Duration"
						help="The duration of the dialog animation in milliseconds."
						isShiftStepEnabled={true}
						onChange={(newDuration) =>
							updateBlockAttributes(rootClientId, {
								animationDuration: newDuration,
							})
						}
						shiftStep={100}
						value={animationDuration}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					settings={[
						{
							colorValue: backdropColor?.color,
							onColorChange: setBackdropColor,
							label: __('Backdrop', 'prc-block-library'),
						},
					]}
					panelId={clientId}
					hasColorsOrGradients={false}
					disableCustomColors={true}
					__experimentalIsRenderedInSidebar
					{...colorSettings}
				/>
			</InspectorControls>
		</Fragment>
	);
}
