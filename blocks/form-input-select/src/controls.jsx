/**
 * External Dependencies
 */
import { Sorter } from '@prc/controls';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { useMemo } from 'react';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

/**
 * Internal Dependencies
 */

const DEFAULT_OPTIONS = [
	{ label: 'North America', value: 'north-america' },
	{ label: 'South America', value: 'south-america' },
	{ label: 'Europe', value: 'europe' },
	{ label: 'Asia', value: 'asia' },
	{ label: 'Africa', value: 'africa' },
	{ label: 'Australia', value: 'australia' },
];

export default function Controls({ attributes, setAttributes, clientId }) {
	const { placeholder } = attributes;
	const name = attributes?.metadata?.name;
	const options = useMemo(() => {
		if (!attributes.options) {
			return DEFAULT_OPTIONS;
		}
		return attributes.options;
	}, [attributes.options]);

	return (
		<InspectorControls>
			<PanelBody title={__('Form Input Field Settings')}>
				<TextControl
					label="Placeholder"
					value={placeholder}
					onChange={(newPlaceholder) => {
						setAttributes({ placeholder: newPlaceholder });
					}}
				/>
				<ToggleControl
					label="Disabled"
					checked={attributes.disabled}
					help="If toggled on, the user cannot interact with this input."
					onChange={(val) => {
						setAttributes({ disabled: val });
					}}
				/>
			</PanelBody>
			<PanelBody title={__('Form Input Field Options')}>
				<Sorter
					options={options}
					setAttributes={setAttributes}
					attribute="options"
					clientId={clientId}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
