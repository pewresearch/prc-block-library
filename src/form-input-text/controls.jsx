/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

/**
 * External Dependencies
 */
import { LimitControls } from '@prc/controls';

/**
 * Internal Dependencies
 */

export default function Controls({ attributes, setAttributes, clientId }) {
	const {
		placeholder,
		type,
		required,
		displayLabel,
		responseKey,
		copyToClipboard,
	} = attributes;
	const name = attributes?.metadata?.name;

	const limitList = ['prc-block/form-input-password'];
	const checkParents = {
		blockEditorStore: blockEditorStore,
		clientId: clientId,
		parentList: limitList,
	};
	return (
		<InspectorControls>
			<PanelBody title={__('Form Input Field Settings')}>
				<LimitControls checkParents={checkParents}>
					<SelectControl
						label="Input Type"
						value={type}
						options={[
							{ label: 'Text', value: 'text' },
							{ label: 'Email', value: 'email' },
							{ label: 'Password', value: 'password' },
							{ label: 'Number', value: 'number' },
							{ label: 'Date', value: 'date' },
							{ label: 'Time', value: 'time' },
							{ label: 'Date and Time', value: 'datetime-local' },
							{ label: 'URL', value: 'url' },
							{ label: 'Tel', value: 'tel' },
							{ label: 'Search', value: 'search' },
						]}
						onChange={(newType) => {
							setAttributes({ type: newType });
						}}
					/>
					<TextControl
						label="Input Name"
						help={__(
							'This is the name of the input field. It is used to identify the input field in the form submission data. We recommend using a camelCase name.',
							'prc-block-library'
						)}
						value={name}
						onChange={(newName) => {
							setAttributes({
								metadata: {
									...attributes.metadata,
									name: newName,
								},
							});
						}}
					/>
				</LimitControls>
				<TextControl
					label="Input Placeholder"
					value={placeholder}
					onChange={(newPlaceholder) => {
						setAttributes({ placeholder: newPlaceholder });
					}}
				/>
				<ToggleControl
					label="Display Label"
					checked={displayLabel}
					onChange={(newDisplayLabel) => {
						setAttributes({ displayLabel: newDisplayLabel });
					}}
				/>
				<LimitControls checkParents={checkParents}>
					<ToggleControl
						label="Required"
						checked={required}
						onChange={(newRequired) => {
							setAttributes({ required: newRequired });
						}}
					/>
				</LimitControls>
				<TextControl
					label={__('Response Data Key', 'prc-block-library')}
					help={__(
						'After a successful form submission, populate this field from a key in the response data (e.g. group_url).',
						'prc-block-library'
					)}
					value={responseKey || ''}
					onChange={(newResponseKey) => {
						setAttributes({ responseKey: newResponseKey });
					}}
				/>
				<ToggleControl
					label={__('Copy to Clipboard', 'prc-block-library')}
					help={__(
						'Makes the field read-only and copies its value to the clipboard when clicked.',
						'prc-block-library'
					)}
					checked={copyToClipboard}
					onChange={(newCopyToClipboard) => {
						setAttributes({ copyToClipboard: newCopyToClipboard });
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
