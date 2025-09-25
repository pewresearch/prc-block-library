/* eslint-disable no-restricted-imports */
/**
 * External Dependencies
 */
import clsx from 'clsx';
import { useDebounce } from '@prc/hooks';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo, useState, useEffect, useRef } from '@wordpress/element';
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
import { cleanForSlug } from '@wordpress/url';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

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
}) {
	const { label, type, defaultChecked, required, metadata, value } = attributes;
	const { name } = metadata || {};
	const MAX_LENGTH = 20;

	// Strip HTML and truncate to MAX_LENGTH
	const truncatePlain = (str) => {
		if (typeof str !== 'string') return str;
		const plain = str.replace(/<[^>]*>/g, '');
		return plain.length > MAX_LENGTH ? plain.slice(0, MAX_LENGTH) : plain;
	};

	const debouncedLabel = useDebounce(label, 200);

	const [ checked, setChecked ] = useState( defaultChecked );
	const richTextRef = useRef();

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

	useEffect(() => {
		if (richTextRef.current && isSelected && (!label || label.length === 0)) {
			richTextRef.current.focus();
		}
	}, [isSelected, label]);

	/**
	 * Update metadata.name and value based on label changes.
	 * @TODO: Expand this logic to form-input-text.
	 */
	useEffect(() => {
		if ( debouncedLabel && debouncedLabel.length > 1 ) {
			const truncated = truncatePlain(debouncedLabel);
			const camelCaseLabel = truncated
				.replace(/[^a-zA-Z0-9 ]/g, '')
				.replace(/(?:^| )(\w)/g, (_, letter) => letter.toUpperCase())
				.replace(/\s+/g, '')
				.replace(/^./, str => str.toLowerCase())
				.slice(0, MAX_LENGTH);
			const payload = {
				metadata: {
					...attributes.metadata,
					name: camelCaseLabel
				}
			};
			if ( ! value || value.length <= 0 ) {
				payload.value = cleanForSlug(camelCaseLabel);
			}
			setAttributes( payload );
		}
	}, [debouncedLabel]);

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
					ref={richTextRef}
					tagName="label"
					placeholder={__('Checkbox Label...', 'prc-block-library')}
					value={label}
					onChange={(newLabel) => {
						setAttributes({
							label: newLabel,
						});
					}}
					__unstableOnSplitAtEnd={() => {
						insertBlocksAfter(createBlock('prc-block/form-input-checkbox', { type }));
					}}
				/>
			</div>
		</>
	);
}
