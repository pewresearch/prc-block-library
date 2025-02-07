/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useMemo } from '@wordpress/element';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

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
 * @param            props.isSelected
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, context }) {
	const url = useMemo(() => {
		if (context['core/socialLinksUrl']) {
			return context['core/socialLinksUrl'];
		}
		if (attributes.url) {
			return attributes.url;
		}
		return 'https://www.pewresearch.org...';
	}, [attributes, context]);

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps({}, {});

	return (
		<div {...blockProps}>
			<span className="label">Share This Link:</span>
			{innerBlocksProps.children}
		</div>
	);
}
