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
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles,
	__experimentalGetShadowClassesAndStyles as getShadowClassesAndStyles,
	__experimentalGetElementClassName,
	getTypographyClassesAndStyles,
	RichText
} from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { label, displayLabel, placeholder, required, value, metadata, className, allowMultiple } = attributes;
	const { name } = metadata || {};
	const borderProps = getBorderClassesAndStyles( attributes );
	const colorProps = getColorClassesAndStyles( attributes );

	const isInlineLabel = className?.includes('is-style-inline-label');

	let inputColorClassnames = [];
	if ( !isInlineLabel ) {
		inputColorClassnames.push(colorProps.className);
		inputColorClassnames.push(borderProps.className);
	}

	const inputClassNames = clsx('wp-block-prc-block-form-input-select__input', ...inputColorClassnames);
	const inputStyles = {
		...(!isInlineLabel ? {...colorProps.style, ...borderProps.style} : {}),
	};

	const inputProps = {
		placeholder: placeholder,
		value: value,
		name: name,
		type: 'text',
		role: 'combobox',
	};
	if ( required ) {
		inputProps.required = true;
	}

	let blockColorClassnames = [];
	if ( isInlineLabel ) {
		blockColorClassnames.push(colorProps.className);
		blockColorClassnames.push(borderProps.className);
	}

	const blockProps = useBlockProps.save({
		className: clsx('wp-block-prc-block-form-input-select', ...blockColorClassnames),
		style: isInlineLabel ? { ...colorProps.style, ...borderProps.style } : {},
	});

	const useLabel = true === displayLabel && label && label.length > 0;

	return (
		<div {...blockProps}>
			{useLabel && <RichText.Content tagName="label" value={label} />}
			<div className={inputClassNames} style={inputStyles}>
				{allowMultiple && (
					<div className="prc-block-form-input-select__tokens__placeholder"></div>
				)}
				<input {...inputProps} />
				<div className="prc-block-form-input-select__list__placeholder"></div>
			</div>
		</div>
	);
}
