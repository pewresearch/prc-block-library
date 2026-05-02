/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * External Dependencies
 */
import clsx from 'clsx';
import { Icon } from '@prc/icons';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useRef, useEffect, useMemo, useState } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	__experimentalUseColorProps as useColorProps,
	__experimentalUseBorderProps as useBorderProps,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles,
	__experimentalGetGapCSSValue as getGapCSSValue,
	getTypographyClassesAndStyles,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

const TEMPLATE = [
	[
		'core/paragraph',
		{
			placeholder: 'Type / to add a new block to the accordion',
		},
	],
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                            Properties passed to the function.
 * @param {Object}   props.attributes                 Available block attributes.
 * @param {string}   props.className
 * @param            props.clientId
 * @param            props.context
 * @param            props.isSelected
 * @param            props.__unstableLayoutClassNames
 * @param {Function} props.setAttributes              Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
// eslint-disable-next-line max-lines-per-function
export default function Edit({
	attributes,
	setAttributes,
	className,
	clientId,
	context,
	__unstableLayoutClassNames: layoutClassNames,
	isSelected,
}) {
	const titleRef = useRef(null);
	const { title } = attributes;

	const hasChildSelected = useSelect(
		(select) => {
			const { hasSelectedInnerBlock } = select('core/block-editor');
			return hasSelectedInnerBlock(clientId, true);
		},
		[clientId]
	);

	const isActive = useMemo(() => {
		return isSelected || hasChildSelected;
	}, [isSelected, hasChildSelected]);

	const [isOpen, setIsOpen] = useState(isActive);

	useEffect(() => {
		setIsOpen(isActive);
	}, [isActive]);

	const blockProps = useBlockProps({
		className: clsx(className, {
			'is-active': isOpen,
		}),
	});

	const colorProps = useColorProps(attributes);
	const borderProps = useBorderProps(attributes);
	const spacingProps = getSpacingClassesAndStyles(attributes);
	const typographyProps = getTypographyClassesAndStyles(attributes);
	const blockGap = getGapCSSValue(
		attributes?.style?.spacing?.blockGap,
		'0.5em'
	);
	const gapStyle = useMemo(() => {
		return `.wp-block-prc-block-accordion[data-block="${clientId}"] .wp-block-prc-block-accordion__content > .wp-block:not(:first-child) {
					margin-block-start: ${blockGap};
				}`;
	}, [blockGap, clientId]);

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: clsx(
				'wp-block-prc-block-accordion__content',
				layoutClassNames,
				{
					'is-open': isOpen,
				}
			),
		},
		{
			orientation: 'vertical',
			template: TEMPLATE,
		}
	);

	// If isSelected and title is empty, focus the title after a 100ms delay.
	useEffect(() => {
		if (isSelected && !title) {
			setTimeout(() => {
				titleRef.current.focus();
			}, 100);
		}
	}, [isSelected, title]);

	return (
		<section {...blockProps}>
			<h3
				className={clsx(
					'wp-block-prc-block-accordion__title',
					colorProps.className,
					borderProps.className,
					spacingProps.className,
					typographyProps.className
				)}
				style={{
					...colorProps.style,
					...borderProps.style,
					...spacingProps.style,
					...typographyProps.style,
				}}
				ref={titleRef}
			>
				<button
					type="button"
					className="wp-block-prc-block-accordion__icon"
					tabIndex={0}
					onClick={() => setIsOpen(!isOpen)}
					onKeyDown={(e) => {
						if (e.key === 'Escape') {
							e.preventDefault();
							setIsOpen(false);
						}
					}}
				>
					<Icon icon="caret-right" size="14px" />
				</button>
				<RichText
					tagName="span"
					placeholder={__('Title', 'prc-block-library')}
					value={title}
					onChange={(newTitle) => setAttributes({ title: newTitle })}
					allowedFormats={[]}
				/>
			</h3>
			{isActive && <div {...innerBlocksProps} />}
			<style>{gapStyle}</style>
		</section>
	);
}
