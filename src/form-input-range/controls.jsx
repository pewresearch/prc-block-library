/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	__experimentalNumberControl as NumberControl
} from '@wordpress/components';

/**
 * Internal Dependencies
 */

export default function Controls({ attributes, setAttributes }) {
	const { min, max, step, displayValue, displayMinMax, outputFormat, orientation, required, displayLabel } = attributes;
	const name = attributes?.metadata?.name;

	return (
		<InspectorControls>
			<PanelBody title={__('Form Input Range Settings')}>
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
				<NumberControl
					label="Min Value"
					value={min}
					onChange={(newMin) => {
						const parsedMin = parseFloat(newMin);
						setAttributes({ min: parsedMin });
						// Ensure value is not less than min
						if (attributes.value < parsedMin) {
							setAttributes({ value: parsedMin });
						}
					}}
				/>
				<NumberControl
					label="Max Value"
					value={max}
					onChange={(newMax) => {
						const parsedMax = parseFloat(newMax);
						setAttributes({ max: parsedMax });
						// Ensure value is not greater than max
						if (attributes.value > parsedMax) {
							setAttributes({ value: parsedMax });
						}
					}}
				/>
				<NumberControl
					label="Step"
					help={__('The increment value for the range slider.', 'prc-block-library')}
					value={step}
					min={0.1}
					onChange={(newStep) => {
						setAttributes({ step: parseFloat(newStep) });
					}}
				/>
				<SelectControl
					label="Orientation"
					value={orientation}
					options={[
						{ label: 'Horizontal', value: 'horizontal' },
						{ label: 'Vertical', value: 'vertical' }
					]}
					onChange={(newOrientation) => {
						setAttributes({ orientation: newOrientation });
					}}
				/>
				<SelectControl
					label="Output Format"
					help={__('How the value should be displayed.', 'prc-block-library')}
					value={outputFormat}
					options={[
						{ label: 'Number', value: 'number' },
						{ label: 'Currency', value: 'currency' },
						{ label: 'Percentage', value: 'percentage' }
					]}
					onChange={(newFormat) => {
						setAttributes({ outputFormat: newFormat });
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
					label="Display Current Value"
					checked={displayValue}
					onChange={(newDisplayValue) => {
						setAttributes({ displayValue: newDisplayValue });
					}}
				/>
				<ToggleControl
					label="Display Min/Max Labels"
					checked={displayMinMax}
					onChange={(newDisplayMinMax) => {
						setAttributes({ displayMinMax: newDisplayMinMax });
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
