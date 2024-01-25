/**
 * External Dependencies
 */
import classnames from 'classnames';
import { useDebounce } from '@prc/hooks';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentControl,
} from '@wordpress/block-editor';
import { createBlock, getDefaultBlockName } from '@wordpress/blocks';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal Dependencies
 */

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	className,
	setAttributes,
	insertBlocksAfter,
	context,
}) {
	const { textAlign } = attributes;
	const { postId, postType } = context;
	const [meta, setMeta] = useEntityProp('postType', postType, 'meta', postId);
	const subTitle = meta?.sub_headline || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.';

	const blockProps = useBlockProps({
		className: classnames(className, {
			[`has-text-align-${textAlign}`]: textAlign,
		}),
	});

	return (
		<Fragment>
			<BlockControls>
				<AlignmentControl
					value={textAlign}
					onChange={(nextAlign) => {
						setAttributes({ textAlign: nextAlign });
					}}
				/>
			</BlockControls>
			<div {...blockProps}>
				<RichText
					tagName="div"
					onChange={(t) => undefined !== postId && setMeta({...meta, sub_headline: t}) }
					allowedFormats={[]}
					keepPlaceholderOnFocus
					value={subTitle}
					placeholder={__(
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
					)}
					disableLineBreaks
					__unstableOnSplitAtEnd={() =>
						insertBlocksAfter(createBlock(getDefaultBlockName()))
					}
				/>
			</div>
		</Fragment>
	);
}
