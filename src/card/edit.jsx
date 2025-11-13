/**
 * External Dependencies
 */
import clsx from 'clsx';
import { getBlockGapSupportValue } from '@prc/block-utils';

/**
 * WordPress Dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	withColors,
	RichText,
	__experimentalGetSpacingClassesAndStyles as useSpacingProps,
} from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import StyleEngine from './style-engine';

function Edit({
	clientId,
	attributes,
	setAttributes,
	headingTextColor,
	setHeadingTextColor,
	headingBackgroundColor,
	setHeadingBackgroundColor,
	__unstableLayoutClassNames: layoutClassNames,
}) {
	const { heading } = attributes;

	const spacingProps = useSpacingProps(attributes);
	const paddingProps = useMemo(() => {
		// get the paddingLeft paddingRight paddingTop and paddingBottom out of spacingProps.style
		const { style } = spacingProps;
		const { paddingLeft, paddingRight, paddingTop, paddingBottom } =
			style || {};
		return {
			style: {
				paddingLeft,
				paddingRight,
				paddingTop,
				paddingBottom,
			},
		};
	}, [spacingProps]);
	const marginProps = useMemo(() => {
		// get the marginLeft marginRight marginTop and marginBottom out of spacingProps.style
		const { style } = spacingProps;
		const { marginLeft, marginRight, marginTop, marginBottom } =
			style || {};
		return {
			style: {
				marginLeft,
				marginRight,
				marginTop,
				marginBottom,
			},
		};
	}, [spacingProps]);

	const blockGap = getBlockGapSupportValue(attributes, 'vertical');

	/**
	 * Block props for the tabs container.
	 */
	const blockProps = useBlockProps({
		className: layoutClassNames,
		style: {
			...marginProps.style,
		},
	});

	const innerBlockStyles = useMemo(() => {
		const style = {
			...paddingProps.style,
		};
		if (blockGap) {
			style['--card-gap'] = blockGap;
		}
		return style;
	}, [paddingProps, blockGap]);

	/**
	 * Innerblocks props for the tabs list.
	 */
	const innerBlockProps = useInnerBlocksProps(
		{
			className: 'prc-card__content',
			style: innerBlockStyles,
		},
		{}
	);

	return (
		<>
			<StyleEngine attributes={attributes} clientId={clientId} />
			<Controls
				{...{
					clientId,
					attributes,
					setAttributes,
					headingTextColor,
					setHeadingTextColor,
					headingBackgroundColor,
					setHeadingBackgroundColor,
				}}
			/>
			<div {...blockProps}>
				<RichText
					tagName="h2"
					className="prc-card__heading"
					value={heading}
					onChange={(value) => setAttributes({ heading: value })}
					placeholder="Card Heading"
				/>
				<div {...innerBlockProps} />
			</div>
		</>
	);
}

export default withColors('headingTextColor', 'headingBackgroundColor')(Edit);
