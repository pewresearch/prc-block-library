/* eslint-disable max-len */
import { __ } from '@wordpress/i18n';
import { Modal, TextControl, Button } from '@wordpress/components';
import type { KeyboardEvent, RefObject } from 'react';
import { useKeyboardShortcut } from '@wordpress/compose';

/**
 * @typedef {Object} GoToCellModalProps
 * @property {boolean}                     isOpen   - Whether the modal is open.
 * @property {string}                      value    - The value of the input.
 * @property {Function}                    onChange - The function to call when the input value changes.
 * @property {Function}                    onClose  - The function to call when the modal is closed.
 * @property {Function}                    onOpen   - The function to call when the modal is opened.
 * @property {Function}                    onGoTo   - The function to call when the user clicks the "Go to Cell" button.
 * @property {RefObject<HTMLInputElement>} inputRef - The ref to the input element.
 */
export type GoToCellModalProps = {
	isOpen: boolean;
	value: string;
	onChange: (value: string) => void;
	onClose: () => void;
	onOpen: () => void;
	onGoTo: (value: string) => void;
	inputRef: RefObject<HTMLInputElement>;
};

export default function GoToCellModal({
	isOpen,
	value,
	onChange,
	onOpen,
	onClose,
	onGoTo,
	inputRef,
}: GoToCellModalProps) {
	/**
	 * Open the modal when the user presses the shortcut key.
	 */
	useKeyboardShortcut(
		'mod+g',
		(event: KeyboardEvent) => {
			event.preventDefault();
			onOpen();
			// Focus the input on next tick after modal opens
			setTimeout(() => {
				inputRef.current?.focus();
			}, 0);
		},
		{
			bindGlobal: true,
		}
	);

	if (!isOpen) return null;

	return (
		<Modal
			title={__('Go to Cell', 'flexible-table-block')}
			onRequestClose={onClose}
			className="ftb-goto-cell-modal"
		>
			<div className="ftb-goto-cell-modal__content">
				<p>
					{__(
						'Enter the cell coordinates in row:column format (e.g., "1:1" for first cell)',
						'flexible-table-block'
					)}
				</p>
				<TextControl
					ref={inputRef}
					value={value}
					onChange={onChange}
					placeholder="row:column"
					onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
						if (event.key === 'Enter') {
							onGoTo(value);
						} else if (event.key === 'Escape') {
							onClose();
						}
					}}
				/>
				<div className="ftb-goto-cell-modal__buttons">
					<Button variant="primary" onClick={() => onGoTo(value)}>
						{__('Go to Cell', 'flexible-table-block')}
					</Button>
					<Button variant="secondary" onClick={onClose}>
						{__('Cancel', 'flexible-table-block')}
					</Button>
				</div>
			</div>
		</Modal>
	);
}
