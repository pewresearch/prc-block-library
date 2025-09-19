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
export default function Controls({
	attributes,
	setAttributes
}) {
	const { required, metadata } = attributes;
	const { name } = metadata || {};
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Form Input Field Settings')}>
					<TextControl
						label="Input Name"
						help={__('This is the name of the input field. It is used to identify the input field in the form submission data. We recommend using a camelCase name.', 'prc-block-library')}
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
						checked={required}
						label="Required"
						onChange={() => {
							setAttributes({ required: !required });
						}}
					/>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}
