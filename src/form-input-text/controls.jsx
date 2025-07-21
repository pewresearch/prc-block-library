/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, ToggleControl } from '@wordpress/components';

/**
 * Internal Dependencies
 */

export default function Controls({ attributes, setAttributes }) {
	const { placeholder, type, required, displayLabel } = attributes;
	const name = attributes?.metadata?.name;
	return (
		<InspectorControls>
			<PanelBody title={__('Form Input Field Settings')}>
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
						{ label: 'Search', value: 'search' }
					]}
					onChange={(newType) => {
						setAttributes({ type: newType });
					}}
				/>
				<TextControl
					label="Input Name"
					help={__('This is the name of the input field. It is used to identify the input field in the form submission data. We recommend using a camelCase name.', 'prc-block-library')}
					value={name}
					onChange={(newName) => {
						setAttributes({
							metadata: { ...attributes.metadata, name: newName },
						});
					}}
				/>
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
				<ToggleControl
					label="Required"
					checked={required}
					onChange={(newRequired) => {
						setAttributes({ required: newRequired });
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
