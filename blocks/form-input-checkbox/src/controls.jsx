/* eslint-disable no-restricted-imports */
/**
 * External Dependencies
 */

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
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import ColorControls from './color-controls';

function InspectorPanel({ attributes, setAttributes, colors, clientId }) {
	const { type, value, defaultChecked, required } = attributes;
	const name = attributes?.metadata?.name;
	return (
		<Fragment>
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
						label="Input Value"
						value={value}
						onChange={(newValue) => {
							setAttributes({ value: newValue });
						}}
					/>
					<TextControl
						label="Input Name"
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
					<ToggleControl
						checked={defaultChecked}
						label="Default Checked"
						onChange={() => {
							setAttributes({ defaultChecked: !defaultChecked });
						}}
					/>
					<ToggleControl
						checked={required}
						label="Required"
						onChange={() => {
							setAttributes({ required: !required });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<ColorControls colors={colors} clientId={clientId} />
		</Fragment>
	);
}

export default function Controls({
	attributes,
	setAttributes,
	context,
	clientId,
	colors,
}) {
	return (
		<InspectorPanel
			{...{ attributes, setAttributes, context, clientId, colors }}
		/>
	);
}
