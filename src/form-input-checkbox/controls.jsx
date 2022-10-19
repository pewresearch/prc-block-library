/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';

/**
 * Internal Dependencies
 */

export default function Controls({ attributes, setAttributes }) {
	const { type, value } = attributes;
	return (
		<InspectorControls>
			<PanelBody title={__('Form Input Field Settings')}>
				<SelectControl
					label="Input Type"
					value={type}
					options={[
						{ label: 'Checkbox', value: 'checkbox' },
						{ label: 'Radio', value: 'radio' },
					]}
					onChange={(newType) => {
						setAttributes({ type: newType });
					}}
				/>
				<TextControl
					label="Value"
					value={value}
					onChange={(newValue) => {
						setAttributes({ value: newValue });
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
