/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	__experimentalNumberControl as NumberControl,
	ToggleControl,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */

export default function Controls({ attributes, setAttributes }) {
	const { placeholder, maxLength, minLength, rows, cols, wrap, required } = attributes;
	const name = attributes?.metadata?.name;
	const wrapOptions = [
		{ label: 'Hard', value: 'hard' },
		{ label: 'Soft', value: 'soft' },
		{ label: 'Off', value: 'off' },
	];
	return (
		<InspectorControls>
			<PanelBody title={__('Form Input Field Settings')}>
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
					help="The placeholder text to display when the input is empty."
				/>
				<ToggleControl
					label="Required"
					checked={required}
					onChange={(newRequired) => {
						setAttributes({ required: newRequired });
					}}
					help="If true, this input will be required to be filled out before the form can be submitted."
				/>
				<NumberControl
					label="Max Length"
					help="Maximum number of characters allowed in the textarea"
					value={maxLength}
					onChange={(newMaxLength) => {
						setAttributes({ maxLength: newMaxLength });
					}}
				/>
				<NumberControl
					label="Min Length"
					help="Minimum number of characters required in the textarea"
					value={minLength}
					onChange={(newMinLength) => {
						setAttributes({ minLength: newMinLength });
					}}
				/>
				<NumberControl
					label="Rows"
					help="Number of visible text lines in the textarea"
					value={rows}
					onChange={(newRows) => {
						setAttributes({ rows: newRows });
					}}
				/>
				<NumberControl
					label="Cols"
					help="Number of visible characters per line in the textarea"
					value={cols}
					onChange={(newCols) => {
						setAttributes({ cols: newCols });
					}}
				/>
				<SelectControl
					label="Wrap"
					help="Controls how text wraps in the textarea (hard: physical line breaks, soft: visual wrapping, off: no wrapping)"
					value={wrap}
					options={wrapOptions}
					onChange={(newWrap) => {
						setAttributes({ wrap: newWrap });
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
