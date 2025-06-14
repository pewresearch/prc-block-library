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
	const { label, type, defaultChecked, required, value, metadata } = attributes;
	const { name } = metadata || {};

	// const borderProps = getBorderClassesAndStyles( attributes );
	const colorProps = getColorClassesAndStyles( attributes );

	const backgroundColor = colorProps.style.backgroundColor;
	const backgroundColorClass = colorProps?.className?.split(' ').filter(
		(className) => className.includes('-background-color') || className.includes('has-background')
	);
	const textColor = colorProps.style.color;
	// Include all the classnames that are not a background color class
	const textColorClass = colorProps?.className?.split(' ').filter(
		(className) => !backgroundColorClass.includes(className)
	);

	const blockProps = useBlockProps.save({
		className: clsx('wp-block-prc-block-form-input-checkbox', textColorClass),
		style: {
			color: textColor,
		},
	});

	const inputProps = {
		type: type,
		required: required,
		name: name,
		checked: defaultChecked,
		className: clsx(backgroundColorClass),
		value: value,
	};

	return (
		<div {...blockProps}>
			<input {...inputProps} />
			{'toggle' === type && (
				<div className={clsx('wp-block-prc-block-form-input-checkbox__toggle', backgroundColorClass) } style={{ backgroundColor: backgroundColor }}>
					<div className="wp-block-prc-block-form-input-checkbox__toggle__switch"></div>
				</div>
			)}
			<RichText.Content tagName="label" value={label} />
		</div>
	);
}
