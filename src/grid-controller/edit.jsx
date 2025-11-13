/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import {
	useInnerBlocksProps,
	useBlockProps,
	withColors,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import StyleEngine from './style-engine';
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
			'has-divider': !!dividerColor.color || !!attributes.dividerColor,
			[`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
		}),
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
		<>
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
			<StyleEngine attributes={attributes} clientId={clientId} />
			<div {...innerBlocksProps}/>
		</>
	);
}

export default withColors({ dividerColor: 'color' })(Edit);
