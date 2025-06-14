/* eslint-disable no-restricted-imports */
/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo, useState, useEffect } from '@wordpress/element';
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
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                  Properties passed to the function.
 * @param {Object}   props.attributes       Available block attributes.
 * @param            props.context
 * @param            props.clientId
 * @param            props.isSelected
 * @param            props.checkboxColor
 * @param            props.setCheckboxColor
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
}) {
	const { label, type, defaultChecked, required, metadata } = attributes;
	const { name } = metadata || {};

	const [ checked, setChecked ] = useState( defaultChecked );

	// const borderProps = useBorderProps( attributes );
	const colorProps = useColorProps( attributes );

	const backgroundColorProps = useMemo(() => {
		const backgroundColor = colorProps?.style?.backgroundColor;
		const backgroundColorClass = colorProps?.className?.split(' ').filter(
			(className) => className.includes('-background-color') || className.includes('has-background')
		);
		return { backgroundColor, backgroundColorClass };
	}, [colorProps]);

	const textColorProps = useMemo(() => {
		const { backgroundColorClass } = backgroundColorProps;
		const textColor = colorProps?.style?.color;
		const textColorClass = colorProps?.className?.split(' ').filter(
			(className) => !backgroundColorClass.includes(className)
		);
		return { textColor, textColorClass };
	}, [colorProps, backgroundColorProps,]);

	const blockProps = useBlockProps({
		className: clsx(textColorProps.textColorClass),
		style: {
			color: textColorProps.textColor,
		},
	});

	useEffect(() => {
		setChecked( defaultChecked );
	}, [defaultChecked]);

	return (
		<>
			<Controls
				{...{
					attributes,
					setAttributes,
					context: false,
					clientId,
				}}
			/>
			<div {...blockProps}>
				<input
					className={clsx(backgroundColorProps.backgroundColorClass)}
					style={{ backgroundColor: backgroundColorProps.backgroundColor }}
					type={'toggle' === type ? 'checkbox' : type}
					name={name}
					required={required}
					checked={checked}
					onChange={(event) => {
						event.preventDefault();
						const _checked = event.target.checked;
						setChecked( _checked );
						setAttributes({ defaultChecked: _checked });
					}}
				/>
				{'toggle' === type && (
					<div className={clsx('wp-block-prc-block-form-input-checkbox__toggle', backgroundColorProps.backgroundColorClass)} style={{ backgroundColor: backgroundColorProps.backgroundColor }}>
						<div className="wp-block-prc-block-form-input-checkbox__toggle__switch"></div>
					</div>
				)}
				<RichText
					tagName="label"
					placeholder={__('Checkbox Label...', 'prc-block-library')}
					value={label}
					onChange={(newLabel) => {
						const camelCaseLabel = newLabel.replace(/<[^>]*>/g, '').replace(/(?:^| )(\w)/g, (_, letter) => letter.toUpperCase()).replace(/^./, str => str.toLowerCase());
						setAttributes({ label: newLabel, metadata: { ...attributes.metadata, name: camelCaseLabel } });
					}}
					__unstableOnSplitAtEnd={() => onEnterSplit()}
				/>
			</div>
		</>
	);
}
