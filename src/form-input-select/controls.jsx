/**
 * External Dependencies
 */
import { Sorter } from '@prc/controls';

/**
 * WordPress Dependencies
 */
import { useEffect, useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';

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

export default function Controls({
	attributes,
	setAttributes,
	clientId,
	context,
}) {
	const { placeholder, options, defaultOptions, hasClearIcon, disabled } =
		attributes;

	const sortableOptions = useMemo(() => {
		return context['prc-block/sortable-options']
			? JSON.parse(context['prc-block/sortable-options'])
			: {};
	}, [context]);

	useEffect(() => {
		if ('custom' === defaultOptions) {
			return;
		}
		if (options.length > 0) {
			return;
		}
		const allSortableOptions = Object.keys(sortableOptions).map((key) => ({
			label: sortableOptions[key].name,
			name: sortableOptions[key].name,
			value: key,
			disabled: false,
		}));
		if (allSortableOptions.length > 0) {
			setAttributes({
				options: allSortableOptions,
			});
			return;
		}
		setAttributes({ options: DEFAULT_OPTIONS });
	}, [options, sortableOptions]);

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
					checked={disabled}
					help="If toggled on, the user cannot interact with this input."
					onChange={(val) => {
						setAttributes({ disabled: val });
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
			</PanelBody>
			<PanelBody title={__('Form Input Field Options')}>
				<SelectControl
					label="Select from default options"
					value={defaultOptions}
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
					onChange={(newDefaultOptions) => {
						setAttributes({ defaultOptions: newDefaultOptions });
					}}
				/>
				<Sorter
					options={options}
					setAttributes={setAttributes}
					attribute="sortedOptions"
					clientId={clientId}
					isRemovable
					hasSetActive
				/>
			</PanelBody>
		</InspectorControls>
	);
}
