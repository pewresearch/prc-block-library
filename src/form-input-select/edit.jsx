/* eslint-disable no-restricted-imports */
/**
 * External Dependencies
 */
import clsx from 'clsx';
import { Icon, close } from '@wordpress/icons';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo, useState, useRef } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseBorderProps as useBorderProps,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseColorProps as useColorProps,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import {
	DEFAULT_WINDOW,
	visibleOptions,
	nextWindow,
	shouldAdvanceWindow,
} from './visible-options';

export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
	__unstableLayoutClassNames: layoutClassNames,
}) {
	const {
		label,
		placeholder,
		required,
		disabled,
		displayLabel,
		options = [],
		allowMultiple = false,
		className,
	} = attributes;

	const isInlineLabel = useMemo(() => {
		return className?.includes('is-style-inline-label');
	}, [className]);

	const [selectedValues, setSelectedValues] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [listWindow, setListWindow] = useState({
		query: '',
		limit: DEFAULT_WINDOW,
	});

	const borderProps = useBorderProps(attributes);
	const colorProps = useColorProps(attributes);

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
		return isInlineLabel
			? [layoutClassNames, ...supportedClassNames]
			: layoutClassNames;
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

	const catalog = useMemo(() => {
		return [...options, ...contextualOptions].filter(
			(option) =>
				!selectedValues.includes(option.value) && !option.disabled
		);
	}, [options, contextualOptions, selectedValues]);

	const filteredOptions = useMemo(() => {
		return visibleOptions(catalog, inputValue, listWindow);
	}, [catalog, inputValue, listWindow]);

	function getLabel(val) {
		const opt = options.find((o) => o.value === val);
		return opt ? opt.label : val;
	}

	function handleTokenRemove(val) {
		setSelectedValues((current) =>
			current.filter((currentVal) => currentVal !== val)
		);
	}

	return (
		<>
			<Controls
				attributes={attributes}
				setAttributes={setAttributes}
				clientId={clientId}
			/>
			<div {...blockProps}>
				{displayLabel && (
					<RichText
						tagName="label"
						placeholder={__('Label…', 'prc-block-library')}
						value={label}
						onChange={(newLabel) => {
							const camelCaseLabel = newLabel
								.replace(/<[^>]*>/g, '')
								.replace(/(?:^| )(\w)/g, (_, letter) =>
									letter.toUpperCase()
								)
								.replace(/^./, (str) => str.toLowerCase());
							setAttributes({
								label: newLabel,
								metadata: {
									...attributes.metadata,
									name: camelCaseLabel,
								},
							});
						}}
					/>
				)}
				<div
					className={clsx(
						'wp-block-prc-block-form-input-select__input',
						inputClassNames
					)}
					style={inputStyles}
				>
					{allowMultiple && (
						<div className="wp-block-prc-block-form-input-select__tokens-wrapper">
							{selectedValues.map((val) => (
								<span
									key={val}
									className="components-form-token-field__token"
								>
									{getLabel(val)}
									<button
										type="button"
										aria-label={__(
											'Remove',
											'prc-block-library'
										)}
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
						aria-autocomplete="list"
						aria-expanded={isSelected}
						aria-controls={`dropdown-list-${clientId}`}
						placeholder={placeholder}
						value={inputValue}
						onChange={(event) => {
							setInputValue(event.target.value);
						}}
						disabled={disabled}
						required={required && selectedValues.length === 0}
					/>

					{isSelected && filteredOptions.length > 0 && (
						<ul
							id={`dropdown-list-${clientId}`}
							role="listbox"
							className="wp-block-prc-block-form-input-select__list"
							onScroll={(event) => {
								if (
									shouldAdvanceWindow(
										event.currentTarget,
										catalog,
										inputValue,
										listWindow
									)
								) {
									setListWindow(
										nextWindow(
											catalog,
											inputValue,
											listWindow
										)
									);
								}
							}}
						>
							{filteredOptions.map((option) => (
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
