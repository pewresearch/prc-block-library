/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import {
	useBlockProps,
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
	RichText
} from '@wordpress/block-editor';

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

export default function Save({ attributes }) {
	const {
		label,
		displayLabel,
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
		className
	} = attributes;
	const { name } = metadata || {};

	const borderProps = getBorderClassesAndStyles(attributes);
	const colorProps = getColorClassesAndStyles(attributes);

	const isInlineLabel = className?.includes('is-style-inline-label');
	const isVertical = orientation === 'vertical';

	const rangeContainerClassNames = !isInlineLabel && colorProps.className && borderProps.className ? [
		colorProps.className,
		borderProps.className,
	] : [];

	const rangeContainerStyles = !isInlineLabel ? {
		...colorProps.style,
		...borderProps.style
	} : {};

	const inputProps = {
		min: min,
		max: max,
		step: step,
		value: value,
		name: name,
		type: 'range',
		required: required,
		orient: isVertical ? 'vertical' : 'horizontal',
	};

	const useLabel = displayLabel && label && label.length > 0;

	const blockClassNames = isInlineLabel && colorProps.className && borderProps.className ? [
		colorProps.className,
		borderProps.className,
	] : [];

	const blockProps = useBlockProps.save({
		className: clsx('wp-block-prc-block-form-input-range', blockClassNames, {
			'is-vertical': isVertical,
		}),
		style: isInlineLabel ? { ...colorProps.style, ...borderProps.style } : {},
	});

	return (
		<div {...blockProps}>
			{useLabel && <RichText.Content tagName="label" value={label} />}
			<div className={clsx('range-container', rangeContainerClassNames)} style={rangeContainerStyles}>
				{displayMinMax && <span className="range-min">{formatValue(min, outputFormat)}</span>}
				<input {...inputProps} />
				{displayMinMax && <span className="range-max">{formatValue(max, outputFormat)}</span>}
			</div>
			{displayValue && (
				<output
					className="range-output"
					data-format={outputFormat}
				>
					{formatValue(value, outputFormat)}
				</output>
			)}
		</div>
	);
}
