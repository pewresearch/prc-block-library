/* eslint-disable no-restricted-imports */
/**
 * External Dependencies
 */
import { Sorter, LimitControls } from '@prc/controls';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';
import {
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
// import { values } from 'lodash';

export default function Controls({ attributes, setAttributes, clientId }) {
	const {
		placeholder,
		required,
		disabled,
		hasClearIcon,
		displayLabel,
		type,
		options = [],
		allowSearch = true,
	} = attributes;

	const { name } = attributes.metadata || {};
	// Set data for control limits 
	const limitList = ['prc-block/form-input-select-range'];
	const checkParents = {blockEditorStore: blockEditorStore, clientId: clientId, parentList: limitList};
	return (
		<InspectorControls>
			<PanelBody title={__('Form Input Field Settings')}>
				<LimitControls checkParents={checkParents}>
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
					label="Placeholder"
					value={placeholder}
					onChange={(newPlaceholder) => {
						setAttributes({ placeholder: newPlaceholder });
					}}
				/>
				<ToggleControl
					label="Display Label"
					checked={displayLabel}
					help="If toggled on, the label will be displayed above the input field."
					onChange={(val) => {
						setAttributes({ displayLabel: val });
					}}
				/>
				<LimitControls checkParents={checkParents}>
					<ToggleControl
						label="Disabled"
						checked={disabled}
						help="If toggled on, the user cannot interact with this input."
						onChange={(val) => {
							setAttributes({ disabled: val });
						}}
					/>
					<ToggleControl
						label="Required"
						checked={required}
						help="If toggled on, the user must select a value before submitting the form."
						onChange={(val) => {
							setAttributes({ required: val });
						}}
					/>
					<ToggleControl
						label="Clear Icon Enabled"
						checked={hasClearIcon}
						help="If toggled on, a clear icon will be displayed in the input field."
						onChange={(val) => {
							setAttributes({ hasClearIcon: val });
						}}
					/>
					<ToggleControl
						label="Allow Search"
						checked={allowSearch}
						help="If toggled on, the user can search and filter through the options."
						onChange={(val) => {
							setAttributes({ allowSearch: val });
						}}
					/>
				</LimitControls>
			</PanelBody>
			<LimitControls checkParents={checkParents}>
				<PanelBody title={__('Form Input Field Options')}>
					<SelectControl
						label="Select from default options"
						value={type}
						options={[
							{ label: 'Custom', value: 'custom' },
							{ label: 'Countries', value: 'countries' },
							{
								label: 'Countries and Regions',
								value: 'countries-and-regions',
							},
							{ label: 'U.S. States', value: 'us-states' },
							{ label: 'Industries', value: 'industries' },
						]}
						onChange={(newType) => {
							setAttributes({ type: newType });
						}}
					/>
					<Sorter
						options={options}
						setAttributes={setAttributes}
						attribute="options"
						clientId={clientId}
						isRemovable
						hasSetActive
					/>
				</PanelBody>
			</LimitControls>
		</InspectorControls>
	);
}
