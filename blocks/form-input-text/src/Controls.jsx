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
	const { placeholder, type } = attributes;
	const name = attributes?.metadata?.name;
	return (
		<InspectorControls>
			<PanelBody title={__('Form Input Field Settings')}>
				<SelectControl
					label="Input Type"
					value={type}
					options={[
						{ label: 'Text', value: 'text' },
						{ label: 'Text Area', value: 'textarea' },
						{ label: 'Email', value: 'email' },
						{ label: 'Password', value: 'password' },
					]}
					onChange={(newType) => {
						setAttributes({ type: newType });
					}}
				/>
				<TextControl
					label="Input Name"
					value={name}
					onChange={(newName) => {
						setAttributes({ metadata: {...attributes.metadata, name: newName } });
					}}
				/>
				<TextControl
					label="Input Placeholder"
					value={placeholder}
					onChange={(newPlaceholder) => {
						setAttributes({ placeholder: newPlaceholder });
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
