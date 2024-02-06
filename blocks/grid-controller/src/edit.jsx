/**
 * External Dependencies
 */
import classnames from 'classnames';
import { getBlockGapSupportValue } from '@prc/block-utils';

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import {
	useInnerBlocksProps,
	useBlockProps,
	withColors,
	getColorClassName,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import Placeholder from './placeholder';

const ALLOWED_BLOCKS = ['prc-block/grid-column'];

function Edit({
	attributes,
	setAttributes,
	clientId,
	className,
	dividerColor,
	setDividerColor,
}) {
	const { verticalAlignment } = attributes;

	const hasInnerBlocks = useSelect(
		(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
		[clientId]
	);

	const blockProps = useBlockProps({
		className: classnames(className, {
			'has-divider': !!dividerColor.color || dividerColor.class,
			[getColorClassName('divider-color', dividerColor?.slug)]:
				!!dividerColor?.slug,
			[`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
		}),
		style: {
			'--grid-gutter': getBlockGapSupportValue(attributes, 'horizontal'),
		},
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'horizontal',
		renderAppender: false,
		templateLock: false,
	});

	if (!hasInnerBlocks) {
		return <Placeholder {...{ attributes, setAttributes, clientId }} />;
	}

	return (
		<Fragment>
			<Controls
				{...{
					attributes,
					setAttributes,
					clientId,
					colors: {
						dividerColor,
						setDividerColor,
					},
				}}
			/>
			<div {...innerBlocksProps} />
		</Fragment>
	);
}

export default withColors(
	{ dividerColor: 'color' }
)(Edit);
