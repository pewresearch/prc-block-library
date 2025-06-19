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
	const { label, displayLabel, placeholder, required, type, value, metadata, className } = attributes;
	const { name } = metadata || {};
	const borderProps = getBorderClassesAndStyles( attributes );
	const colorProps = getColorClassesAndStyles( attributes );

	const isInlineLabel = className?.includes('is-style-inline-label');

	const inputClassNames = !isInlineLabel && colorProps.className && borderProps.className ? [
		colorProps.className,
		borderProps.className,
	] : [];

	const inputProps = {
		placeholder: placeholder,
		value: value,
		name: name,
		type: type,
		required: required,
		className: clsx(inputClassNames),
		style: {
			...(!isInlineLabel ? {...colorProps.style, ...borderProps.style} : {}),
		},
	};
	const useLabel = true === displayLabel && label && label.length > 0;

	const blockClassNames = isInlineLabel && colorProps.className && borderProps.className ? [
		colorProps.className,
		borderProps.className,
	] : []; // If the label is inline, we don't need to add the class names.

	const blockProps = useBlockProps.save({
		className: clsx('wp-block-prc-block-form-input-text', blockClassNames),
		style: isInlineLabel ? { ...colorProps.style, ...borderProps.style } : {},
	});

	return (
		<div {...blockProps}>
			{useLabel && <RichText.Content tagName="label" value={label} />}
			<input {...inputProps} />
		</div>
	);
}
