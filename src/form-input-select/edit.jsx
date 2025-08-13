/* eslint-disable no-restricted-imports */
/**
 * External Dependencies
 */
import { Sorter } from '@prc/controls';
import clsx from 'clsx';
import { Icon, close } from '@wordpress/icons';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo, useState, useEffect, useRef } from '@wordpress/element';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';
import {
	store as blockEditorStore,
	useBlockProps,
	RichText,
	getColorClassName,
	__experimentalUseBorderProps as useBorderProps,
	__experimentalUseColorProps as useColorProps,
	__experimentalGetSpacingClassesAndStyles as useSpacingProps,
	__experimentalGetShadowClassesAndStyles as useShadowProps,
	__experimentalGetElementClassName,
	getTypographyClassesAndStyles as useTypographyProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { store as blockStore } from '@wordpress/blocks';

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

export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
	insertBlocksAfter,
	__unstableLayoutClassNames: layoutClassNames,
}) {
	const {
		label,
		placeholder,
		required,
		disabled,
		hasClearIcon,
		value,
		metadata,
		displayLabel,
		type,
		rawOptions = [],
		options = [],
		allowMultiple = false,
		className,
		allowSearch = true,
	} = attributes;

	const isInlineLabel = useMemo(() => {
		return className?.includes('is-style-inline-label');
	}, [className]);

	const { name } = metadata || {};

	const [selectedValues, setSelectedValues] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const borderProps = useBorderProps( attributes );
	const colorProps = useColorProps( attributes );

	const supportedClassNames = useMemo(() => {
		return clsx({
			...colorProps.className,
			...borderProps.className,
		});
	}, [colorProps.className, borderProps.className]);
	const supportedStyles = useMemo(() => {
		return {
			...colorProps.style,
			...borderProps.style,
		};
	}, [colorProps.style, borderProps.style]);

	// Input
	const inputClassNames = useMemo(() => {
		return !isInlineLabel ? supportedClassNames : [];
	}, [isInlineLabel, supportedClassNames]);
	const inputStyles = useMemo(() => {
		return !isInlineLabel ? supportedStyles : {};
	}, [isInlineLabel, supportedStyles]);
	const inputRef = useRef(null);

	// Block Wrapper
	const blockClassNames = useMemo(() => {
		return isInlineLabel ? [layoutClassNames, ...supportedClassNames] : layoutClassNames;
	}, [layoutClassNames, supportedClassNames, isInlineLabel]);
	const blockStyles = useMemo(() => {
		return isInlineLabel ? supportedStyles : {};
	}, [isInlineLabel, supportedStyles]);
	const blockProps = useBlockProps({
		className: clsx(blockClassNames, {
			'is-open': isSelected,
		}),
		style: blockStyles,
	});

	const contextualOptions = useMemo(() => {
		return context['form-input-select/options'] || [];
	}, [context]);

	// Filter options based on inputValue and exclude already selected or disabled
	const filteredOptions = useMemo(() => {
		const allOptions = [...options, ...contextualOptions];
		console.log('filteredOptions', {
			options,
			contextualOptions,
			selectedValues,
			inputValue,
			allOptions,
		});
		return allOptions.filter(
			(option) =>
				!selectedValues.includes(option.value) &&
				!option.disabled &&
				option.label.toLowerCase().includes(inputValue.toLowerCase())
		);
	}, [options, contextualOptions, selectedValues, inputValue]);

	// Get label for a value
	function getLabel(val) {
		const opt = options.find((o) => o.value === val);
		return opt ? opt.label : val;
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Form Input Field Settings')}>
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
				</PanelBody>
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
			</InspectorControls>
			<div {...blockProps}>
				{displayLabel && <RichText
					tagName="label"
					placeholder={__('Label...', 'prc-block-library')}
					value={label}
					onChange={(newLabel) => {
						const camelCaseLabel = newLabel.replace(/<[^>]*>/g, '').replace(/(?:^| )(\w)/g, (_, letter) => letter.toUpperCase()).replace(/^./, str => str.toLowerCase());
						setAttributes({ label: newLabel, metadata: { ...attributes.metadata, name: camelCaseLabel } });
					}}
				/>}
				<div className={clsx("wp-block-prc-block-form-input-select__input", inputClassNames)} style={inputStyles}>

					{allowMultiple && (
						<div className="wp-block-prc-block-form-input-select__tokens-wrapper">
						{selectedValues.map((val) => (
							<span key={val} className="components-form-token-field__token">
								{getLabel(val)}
								<button
									type="button"
									aria-label={__('Remove', 'prc-block-library')}
									onClick={() => handleTokenRemove(val)}
								>
									<Icon icon={close} />
								</button>
							</span>
						))}
						</div>
					)}

					<input
						ref={inputRef}
						type="text"
						role="combobox"
						ariaAutocomplete="list"
						ariaExpanded={isSelected}
						ariaControls={`dropdown-list-${clientId}`}
						placeholder={placeholder}
						value={inputValue}
						onChange={(event) => {
							event.preventDefault();
						}}
						onBlur={(event) => {
							setTimeout(() => setIsDropdownOpen(false), 250);
							console.log('onBlur');
						}}
						onFocus={(event) => {
							event.preventDefault();
							setIsDropdownOpen(true);
							console.log('onFocus', isDropdownOpen);
						}}
						disabled={attributes.disabled}
						required={required && selectedValues.length === 0}
					/>

					{isSelected && filteredOptions.length > 0 && (
						<ul
							id={`dropdown-list-${clientId}`}
							role="listbox"
							className="wp-block-prc-block-form-input-select__list"
						>
							{filteredOptions.map((option, idx) => (
								<li
									key={option.value}
									role="option"
									onMouseDown={(event) => {
										event.preventDefault();
									}}
								>
									{option.label}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</>
	);
}
