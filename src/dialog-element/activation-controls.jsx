/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	__experimentalNumberControl as NumberControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

export function ActivationControls({ attributes, setAttributes }) {
	const {
		scrollDepthPercentage = -1,
		dismissalPersistenceScope = 'pageload',
		dialogVariant = 'default',
		animation = 'fade',
	} = attributes || {};
	const scrollDepthEnabled = 0 <= scrollDepthPercentage;

	return (
		<>
			<ToggleControl
				label={__('Scroll Depth Trigger', 'prc-block-library')}
				help={__(
					'Open the dialog after the reader scrolls past a percentage of the page.',
					'prc-block-library'
				)}
				checked={scrollDepthEnabled}
				onChange={(enabled) =>
					setAttributes({
						scrollDepthPercentage: enabled ? 50 : -1,
					})
				}
			/>
			{scrollDepthEnabled && (
				<NumberControl
					label={__('Scroll Depth Percentage', 'prc-block-library')}
					help={__(
						'Open when the reader has scrolled this far down the page (0–100).',
						'prc-block-library'
					)}
					min={0}
					max={100}
					isShiftStepEnabled={true}
					onChange={(nextValue) => {
						const parsed = Number(nextValue);
						setAttributes({
							scrollDepthPercentage: Number.isFinite(parsed)
								? Math.min(100, Math.max(0, parsed))
								: -1,
						});
					}}
					shiftStep={5}
					value={scrollDepthPercentage}
				/>
			)}
			<SelectControl
				label={__('Dismissal Persistence', 'prc-block-library')}
				help={__(
					'How long to suppress auto-opening after the reader dismisses this dialog. Click triggers always open the dialog.',
					'prc-block-library'
				)}
				value={dismissalPersistenceScope}
				options={[
					{
						label: __('Current page load', 'prc-block-library'),
						value: 'pageload',
					},
					{
						label: __('Browser session', 'prc-block-library'),
						value: 'session',
					},
					{
						label: __('This device', 'prc-block-library'),
						value: 'device',
					},
				]}
				onChange={(nextScope) =>
					setAttributes({
						dismissalPersistenceScope: nextScope,
					})
				}
			/>
			<SelectControl
				label={__('Dialog Variant', 'prc-block-library')}
				help={__(
					'Bottom sheet is a full-width panel anchored to the viewport bottom. Pair with the Slide Up animation.',
					'prc-block-library'
				)}
				value={dialogVariant}
				options={[
					{
						label: __('Default', 'prc-block-library'),
						value: 'default',
					},
					{
						label: __('Bottom Sheet', 'prc-block-library'),
						value: 'bottom-sheet',
					},
				]}
				onChange={(nextVariant) => {
					const nextAttributes = {
						dialogVariant: nextVariant,
					};
					if (
						nextVariant === 'bottom-sheet' &&
						animation !== 'slide-up'
					) {
						nextAttributes.animation = 'slide-up';
					}
					setAttributes(nextAttributes);
				}}
			/>
		</>
	);
}
