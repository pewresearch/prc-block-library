/* eslint-disable no-restricted-imports */
/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	__experimentalUseBorderProps as useBorderProps,
	__experimentalUseColorProps as useColorProps,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';

/**
 * Format the value based on the output format
 * @param {number} value - The value to format
 * @param {string} format - The format type (number, currency, percentage)
 * @returns {string} Formatted value
 */
function formatValue(value, format) {
	if (value === null || value === undefined) {
		return '';
	}

	switch (format) {
		case 'currency':
			return new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(value);
		case 'percentage':
			return `${value}%`;
		case 'number':
		default:
			return value.toString();
	}
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                  Properties passed to the function.
 * @param {Object}   props.attributes       Available block attributes.
 * @param {Function} props.setAttributes    Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
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
		min,
		max,
		step,
		value,
		displayValue,
		displayMinMax,
		outputFormat,
		orientation,
		required,
		metadata,
		displayLabel,
		className
	} = attributes;
	const { name } = metadata || {};

	const isVertical = orientation === 'vertical';

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

	const blockProps = useBlockProps({
		className: clsx(layoutClassNames, supportedClassNames, {
			'is-vertical': isVertical,
		}),
		style: supportedStyles,
	});

	const handleRangeChange = (event) => {
		setAttributes({ value: parseFloat(event.target.value) });
	};

	const useLabel = displayLabel && label && label.length > 0;

	return (
		<>
			<Controls attributes={attributes} setAttributes={setAttributes} />
			<div {...blockProps}>
				{useLabel && (
					<RichText
						tagName="label"
						value={label}
						onChange={(newLabel) => setAttributes({ label: newLabel })}
						placeholder={__('Label', 'prc-block-library')}
					/>
				)}
				<div className={clsx('range-container', supportedClassNames)} style={supportedStyles}>
					{displayMinMax && <span className="range-min">{formatValue(min, outputFormat)}</span>}
					<input
						type="range"
						min={min}
						max={max}
						step={step}
						value={value}
						onChange={handleRangeChange}
						required={required}
						orient={isVertical ? 'vertical' : 'horizontal'}
					/>
					{displayMinMax && <span className="range-max">{formatValue(max, outputFormat)}</span>}
				</div>
				{displayValue && (
					<output className="range-output">
						{formatValue(value, outputFormat)}
					</output>
				)}
			</div>
		</>
	);
}
