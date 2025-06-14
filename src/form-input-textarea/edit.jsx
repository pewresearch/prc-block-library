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
	insertBlocksAfter,
	__unstableLayoutClassNames: layoutClassNames,
}) {
	const { anchor, label, placeholder, required, value, metadata, displayLabel, maxLength, minLength, rows, cols, wrap, className } = attributes;
	const { name } = metadata || {};

	const isInlineLabel = useMemo(() => {
		return className?.includes('is-style-inline-label');
	}, [className]);

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

	const textareaClassNames = useMemo(() => {
		return !isInlineLabel ? supportedClassNames : [];
	}, [isInlineLabel, supportedClassNames]);

	const textareaStyles = useMemo(() => {
		return !isInlineLabel ? supportedStyles : {};
	}, [isInlineLabel, supportedStyles]);

	const blockClassNames = useMemo(() => {
		return isInlineLabel ? [layoutClassNames, ...supportedClassNames] : layoutClassNames;
	}, [layoutClassNames, supportedClassNames, isInlineLabel]);

	const blockStyles = useMemo(() => {
		return isInlineLabel ? supportedStyles : {};
	}, [isInlineLabel, supportedStyles]);

	const blockProps = useBlockProps({
		className: clsx(blockClassNames),
		style: blockStyles,
	});

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
				{displayLabel && <RichText
					tagName="label"
					placeholder={__('Label...', 'prc-block-library')}
					value={label}
					onChange={(newLabel) => {
						const camelCaseLabel = newLabel.replace(/<[^>]*>/g, '').replace(/(?:^| )(\w)/g, (_, letter) => letter.toUpperCase()).replace(/^./, str => str.toLowerCase());
						setAttributes({ label: newLabel, metadata: { ...attributes.metadata, name: camelCaseLabel } });
					}}
				/>}
				<textarea
					className={clsx(textareaClassNames)}
					style={textareaStyles}
					id={anchor}
					name={name}
					required={required}
					placeholder={placeholder}
					value={value}
					rows={rows}
					cols={cols}
					wrap={wrap}
					maxLength={maxLength}
					minLength={minLength}
					onChange={(event) => {
						event.preventDefault();
					}}
				/>
			</div>
		</>
	);
}
