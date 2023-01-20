/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

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
	setAttributes,
	context,
	clientId,
	isSelected,
}) {
	const blockProps = useBlockProps();

	const { chapters = [], backChapters = [] } = useSelect(
		(select) => {
			const blocks = select('core/block-editor').getBlocks();
			const placeholder = [
				{
					attributes: {
						content: 'Chapter 1...',
					},
				},
				{
					attributes: {
						content: 'Chapter 2...',
					},
				},
				{
					attributes: {
						content: 'Chapter 3...',
					},
				},
			];
			const foundChapters = blocks.filter(
				(block) => 'core/heading' === block.name && block.attributes.isChapter,
			);
			return {
				chapters: 0 === foundChapters.length ? placeholder : foundChapters,
				backChapters: [],
			};
		},
		[clientId],
	);

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes }} />
			<div {...blockProps}>
				<ul>
					{0 !== chapters.length &&
						chapters.map((chapter) => <li>{chapter.attributes.content}</li>)}
				</ul>
			</div>
		</Fragment>
	);
}
