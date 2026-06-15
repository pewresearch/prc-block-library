/* eslint-disable no-restricted-imports */
/**
 * External Dependencies
 */
import { MailchimpSegmentSelect } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */

function InspectorPanel({ attributes, setAttributes }) {
	const { type, value, defaultChecked, required, metadata } = attributes;
	const { name } = metadata || {};
	const isMailchimpSignup = name === 'mailchimp_signup';
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Form Input Field Settings')}>
					{isMailchimpSignup && (
						<PanelRow>
							<MailchimpSegmentSelect
								label={__(
									'Choose Newsletter Segment',
									'prc-block-library'
								)}
								value={value}
								onChange={(newInterestId) => {
									setAttributes({ value: newInterestId });
								}}
								apiKey="mailchimp-form"
							/>
						</PanelRow>
					)}
					<SelectControl
						label="Input Type"
						value={type}
						options={[
							{ label: 'Checkbox', value: 'checkbox' },
							{ label: 'Radio', value: 'radio' },
							{ label: 'Toggle', value: 'toggle' },
						]}
						onChange={(newType) => {
							setAttributes({ type: newType });
						}}
					/>
					<TextControl
						label="Input Value"
						help={
							isMailchimpSignup
								? __(
										'Mailchimp interest ID for this segment. Populated by the segment picker above.',
										'prc-block-library'
									)
								: undefined
						}
						value={value}
						onChange={(newValue) => {
							setAttributes({ value: newValue });
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
							const nextName =
								newName === undefined || newName === null
									? ''
									: newName;
							const hasName =
								typeof nextName === 'string' &&
								nextName.length > 0;
							setAttributes({
								metadata: {
									...attributes.metadata,
									name: nextName,
									...(hasName
										? { inputNameIsManual: true }
										: { inputNameIsManual: false }),
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
