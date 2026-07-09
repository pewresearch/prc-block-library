/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
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
 * @param {Object}   props                   Properties passed to the function.
 * @param {Object}   props.attributes        Available block attributes.
 * @param {string}   props.className         Class name for the block.
 * @param {Function} props.insertBlocksAfter Function that inserts blocks after the current block.
 * @param {Object}   props.context           Context object.
 * @param {Function} props.setAttributes     Function that updates individual attributes.
 *
 * @return {JSX.Element} Element to render.
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
	const subTitle = meta?.sub_title || null;

	const blockProps = useBlockProps({
		className: classnames(className, {
			[`has-text-align-${textAlign}`]: textAlign,
		}),
	});

	return (
		<>
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
					onChange={(t) => {
						if (undefined !== postId) {
							// RichText's onChange can hand back a RichTextData
							// instance rather than a plain string. Post meta must
							// be a serializable primitive — under collaborative
							// editing a non-string value is rejected by the CRDT
							// encoder ("Unexpected content type"), which aborts
							// the write and prevents the subtitle from saving.
							const subTitleValue =
								typeof t === 'string' ? t : String(t ?? '');
							setMeta({ ...meta, sub_title: subTitleValue });
						}
					}}
					allowedFormats={[]}
					keepPlaceholderOnFocus
					value={subTitle}
					placeholder={__('Post sub-title')}
					disableLineBreaks
					__unstableOnSplitAtEnd={() =>
						insertBlocksAfter(createBlock(getDefaultBlockName()))
					}
				/>
			</div>
		</>
	);
}
