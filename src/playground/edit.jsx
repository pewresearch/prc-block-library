/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useMemo } from 'react';
import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */

const { prcPlayground } = window;

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
export default function Edit( {
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
} ) {
	const {playgroundType} = attributes;

	const blockProps = useBlockProps();

	const template = useMemo( () => {
		return 'blocks' === playgroundType ? prcPlayground?.blockTemplate : [
			[ 'core/paragraph', { content: __( 'Components Playground will render on the frontend.' ) } ],
		]
	}, [prcPlayground, playgroundType] );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template,
	} );

	return (
		<Fragment>
			<div { ...innerBlocksProps } />
		</Fragment>
	);
}
