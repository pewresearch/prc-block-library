/* eslint-disable jsx-a11y/click-events-have-key-events */
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

/**
 * Internal Dependencies
 */
import Icon from './icon';

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
export default function Edit({ context, clientId }) {
	const blockProps = useBlockProps();

	return (
		<div
			{...{
				...blockProps,
				onClick: (e) => {
					e.preventDefault();
				},
			}}
		>
			<span className="wp-block-prc-block-social-share-sheet__label">
				Share
			</span>
			<Icon />
		</div>
	);
}
