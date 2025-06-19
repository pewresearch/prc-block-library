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
	const { label, displayLabel, placeholder, required, value, metadata, maxLength, minLength, rows, cols, wrap, className } = attributes;
	const { name } = metadata || {};
	const borderProps = getBorderClassesAndStyles( attributes );
	const colorProps = getColorClassesAndStyles( attributes );
	const typographyProps = getTypographyClassesAndStyles( attributes );

	const isInlineLabel = className?.includes('is-style-inline-label');

	const textareaProps = {
		placeholder: placeholder,
		value: value,
		name: name,
		maxLength: maxLength,
		minLength: minLength,
		rows: rows,
		cols: cols,
		wrap: wrap,
		required: required,
		className: clsx(
			colorProps.className,
			{
				[borderProps.className]: !isInlineLabel,
			}
		),
		style: {
			...colorProps.style,
			...(!isInlineLabel ? borderProps.style : {}),
		},
	};
	const useLabel = true === displayLabel && label && label.length > 0;

	const blockProps = useBlockProps.save({
		className: clsx('wp-block-prc-block-form-input-textarea', typographyProps.className, {
			[borderProps.className]: isInlineLabel,
		}),
		style: { ...typographyProps.style },
	});

	return (
		<div {...blockProps}>
			{useLabel && <RichText.Content tagName="label" value={label} />}
			<textarea {...textareaProps} />
		</div>
	);
}


