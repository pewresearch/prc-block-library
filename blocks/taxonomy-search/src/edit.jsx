/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { Fragment } from 'react';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const ALLOWED_BLOCKS = ['prc-block-library/form-input-text'];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param            props.context
 * @param            props.clientId
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, context, clientId }) {
	const blockProps = useBlockProps();

	const { taxonomy } = attributes;

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		templateLock: true,
		template: [
			[
				'prc-block/form-input-text',
				{
					isInteractive: true,
					interactiveNamespace: 'prc-block/taxonomy-search',
					placeholder: `Search ${taxonomy}`,
				},
			],
		],
	});

	return (
		<Fragment>
			<Controls
				{...{
					attributes,
					setAttributes,
					context,
					clientId,
				}}
			/>
			<div {...innerBlocksProps} />
		</Fragment>
	);
}
