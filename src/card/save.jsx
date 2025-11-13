/**
 * External Dependencies
 */
import { getBlockGapSupportValue } from '@prc/block-utils';
/**
 * WordPress Dependencies
 */
import {
	useBlockProps,
	InnerBlocks,
	RichText,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles,
} from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { heading } = attributes;

	const blockProps = useBlockProps.save();
	const spacingProps = getSpacingClassesAndStyles(attributes);
	const { style } = spacingProps;
	const { paddingLeft, paddingRight, paddingTop, paddingBottom } =
		style || {};
	const blockGap = getBlockGapSupportValue(attributes, 'vertical');
	const contentStyle = {
		paddingLeft,
		paddingRight,
		paddingTop,
		paddingBottom,
	};
	if (blockGap) {
		contentStyle['--card-gap'] = blockGap;
	}

	return (
		<div {...blockProps}>
			<RichText.Content
				tagName="h2"
				className="prc-card__heading"
				value={heading}
			/>
			<div className="prc-card__content" style={contentStyle}>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
