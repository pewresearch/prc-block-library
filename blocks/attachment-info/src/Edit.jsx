/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	useEntityBlockEditor,
	useEntityRecord,
	useEntityRecords,
} from '@wordpress/core-data';
import { select } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

const ALLOWED_BLOCKS = ['core/group', 'core/paragraph'];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 * @param {Object}   props.context       Context object with the block's context values.
 * @param {string}   props.clientId      Unique ID of the block.
 * @param {boolean}  props.isSelected    Whether or not the block is currently selected.
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
	/**
	 * By defining a allowedBlocks attribute any block can now customize what inner blocks are allowed.
	 * This gives us a good way to ensure greater template and pattern control.
	 * By default if nothing is defined in the "allowedBlocks" attribute this will default to the constant,
	 * ALLOWED_BLOCKS found under "Internal Dependencies" ^.
	 *
	 * The same applies for "orientation", defaults to "vertical".
	 *
	 * This behavior is being adopted in Core currently, so it's a good idea to get used to it.
	 */
	const { allowedBlocks, orientation } = attributes;

	const AttachmentsList = () => {
		console.log({ context });
		// get post id of current post
		const { records, isResolving } = useEntityRecords(
			'postType',
			'attachment',
			{
				per_page: 50,
				context: 'view',
				parent: context.postId,
				status: 'inherit',
				media_type: 'image',
				order_by: 'date',
				order: 'asc',
			}
		);

		const { record: parentRecord, isResolving: parentIsResolving } =
			useEntityRecord('postType', 'post', context.postId);

		console.log({ parentRecord, parentIsResolving });

		// get permalink of postId
		const parentURL = select('core/editor').getPermalink(context.postId);
		// get post with id of postId

		if (isResolving) {
			return <div>Loading...</div>;
		}

		if (!records) {
			return <div>No attachments found.</div>;
		}
		console.log({ records });
		return (
			<div role="list" className="ui divided relaxed link list">
				<a href={parentURL}>{parentRecord.title.rendered}</a>
				{records
					.filter(
						(record) =>
							record.title.rendered !== '' &&
							record.title.rendered.includes(' ')
					)
					.map((record) => {
						return (
							<div className="item" key={record.id}>
								<a href={record.link}>
									{JSON.stringify(record.title.rendered)}
								</a>
							</div>
						);
					})}
			</div>
		);
	};

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: allowedBlocks ? allowedBlocks : ALLOWED_BLOCKS,
		orientation: orientation ? orientation : 'vertical',
	});

	return (
		<Fragment>
			{/* <Controls {...{ attributes, setAttributes, context: false }} /> */}
			<div {...innerBlocksProps}>
				<AttachmentsList />
			</div>
		</Fragment>
	);
}
