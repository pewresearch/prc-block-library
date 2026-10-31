/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { BaseControl, Button, Notice } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import {
	formatShortcutLabel,
	isApplePlatform,
	shortcutFromEvent,
	validateShortcut,
} from './shortcut';

const REJECTION_MESSAGES = {
	format: __(
		'Use a letter or digit with a modifier key.',
		'prc-block-library'
	),
	modifier: __(
		'Add Cmd or Ctrl. A bare key, Shift alone or Alt alone would interfere with typing.',
		'prc-block-library'
	),
	reserved: __(
		'The browser reserves this shortcut. Choose another.',
		'prc-block-library'
	),
};

/**
 * Records a keyboard combo for the dialog. Only site administrators see it:
 * updating site settings requires `manage_options`.
 *
 * @param {Object}   props
 * @param {string}   props.value    Stored shortcut, such as `mod+k`.
 * @param {Function} props.onChange Called with the new stored shortcut, or an empty string.
 */
export function ShortcutControl({ value = '', onChange }) {
	const [isRecording, setIsRecording] = useState(false);
	const [rejection, setRejection] = useState(null);

	const canManageSite = useSelect(
		(select) =>
			select(coreStore).canUser('update', {
				kind: 'root',
				name: 'site',
			}),
		[]
	);

	if (!canManageSite) {
		return null;
	}

	const stopRecording = () => setIsRecording(false);

	const handleKeyDown = (event) => {
		if (!isRecording) {
			return;
		}
		event.preventDefault();
		event.stopPropagation();
		if (event.key === 'Escape') {
			stopRecording();
			setRejection(null);
			return;
		}
		const recorded = shortcutFromEvent(
			event.nativeEvent,
			isApplePlatform()
		);
		if (!recorded) {
			return;
		}
		const result = validateShortcut(recorded);
		stopRecording();
		if (!result.valid) {
			setRejection(REJECTION_MESSAGES[result.reason]);
			return;
		}
		setRejection(null);
		onChange(recorded);
	};

	const label = value ? formatShortcutLabel(value, isApplePlatform()) : '';

	return (
		<BaseControl
			__nextHasNoMarginBottom
			help={__(
				'Press the shortcut anywhere on the page to open or close this dialog. Cmd on Mac is Ctrl on Windows and Linux.',
				'prc-block-library'
			)}
		>
			<BaseControl.VisualLabel>
				{__('Invoke with keyboard shortcut', 'prc-block-library')}
			</BaseControl.VisualLabel>
			<div className="prc-dialog-shortcut-control">
				<output
					className="prc-dialog-shortcut-control__value"
					aria-live="polite"
				>
					{label || __('None', 'prc-block-library')}
				</output>
				<Button
					variant="secondary"
					size="compact"
					onClick={() => {
						setRejection(null);
						setIsRecording(true);
					}}
					onKeyDown={handleKeyDown}
					onBlur={stopRecording}
				>
					{isRecording
						? __(
								'Press shortcut… (Esc to cancel)',
								'prc-block-library'
							)
						: __('Record shortcut', 'prc-block-library')}
				</Button>
				{value && (
					<Button
						variant="tertiary"
						size="compact"
						isDestructive
						onClick={() => {
							setRejection(null);
							onChange('');
						}}
					>
						{__('Clear', 'prc-block-library')}
					</Button>
				)}
			</div>
			{rejection && (
				<Notice status="warning" isDismissible={false}>
					{rejection}
				</Notice>
			)}
		</BaseControl>
	);
}
