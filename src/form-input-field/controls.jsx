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
	const { placeholder, type } = attributes;
	return (
		<InspectorControls>
			<PanelBody title={__('Form Input Field Settings')}>
				<SelectControl
					label="Input Type"
					value={type}
					options={[
						{ label: 'Text', value: 'text' },
						{ label: 'Email', value: 'email' },
					]}
					onChange={(newType) => {
						setAttributes({ type: newType });
					}}
				/>
				<TextControl
					label="Placeholder"
					value={placeholder}
					onChange={(newPlaceholder) => {
						setAttributes({ placeholder: newPlaceholder });
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
