/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Notice } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const TEMPLATE = [['core/html', {}]];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param            props.clientId
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	const { min, max, orientation } = attributes;

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			orientation: orientation || 'vertical',
			templateLock: false,
			template: TEMPLATE,
		}
	);

	const label = useMemo(() => {
		if (max && !min) {
			return `maximum ${max}px`;
		}
		if (!max && min) {
			return `minimum ${min}px`;
		}
		if (max && min) {
			return `between ${min}px and ${max}px`;
		}
		return 'No range set';
	}, [min, max]);

	return (
		<>
			<Controls {...{ attributes, setAttributes, clientId }} />
			<div {...blockProps}>
				<Notice
					isDismissible={false}
					spokenMessage={label}
				>
					<span className="sans-serif">
						<strong>Viewport Range:</strong> {label}
					</span>
				</Notice>
				<div {...innerBlocksProps} />
			</div>
		</>
	);
}
