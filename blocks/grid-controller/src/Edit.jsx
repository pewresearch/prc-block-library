/**
 * External Dependencies
 */
import classnames from 'classnames';

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
import Controls from './Controls';
import Placeholder from './Placeholder';

const ALLOWED_BLOCKS = ['prc-block/grid-column'];

function Edit({
	attributes,
	setAttributes,
	clientId,
	className,
	textColor,
	setTextColor,
	backgroundColor,
	setBackgroundColor,
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
			'has-text-color': !!textColor.color || !!textColor?.class,
			[getColorClassName('color', textColor?.slug)]: !!textColor?.slug,
			'has-background': !!backgroundColor.color || backgroundColor.class,
			[getColorClassName('background-color', backgroundColor?.slug)]:
				!!backgroundColor?.slug,
			'has-divider': !!dividerColor.color || dividerColor.class,
			[getColorClassName('divider-color', dividerColor?.slug)]:
				!!dividerColor?.slug,
			[`are-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
		}),
		style: {
			color: !textColor?.slug && textColor?.color,
			backgroundColor: !backgroundColor?.slug && backgroundColor?.color,
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
						textColor,
						setTextColor,
						backgroundColor,
						setBackgroundColor,
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
	{ textColor: 'color' },
	{ backgroundColor: 'color' },
	{ dividerColor: 'color' }
)(Edit);
