/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
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
	const { min, max } = attributes;

	const blockProps = useBlockProps();
	// By defining a allowedBlocks attribute any block can now customize what inner blocks are allowed.
	// This gives us a good way to ensure greater template and pattern control.
	// By default if nothing is defined in the "allowedBlocks" attribute this will default to the constant ALLOWED_BLOCKS found under "Internal Dependencies" ^.
	// The same applies for "orientation", defaults to "vertical".
	const { allowedBlocks, orientation } = attributes;
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: allowedBlocks || true,
			orientation: orientation || 'vertical',
			templateLock: false,
			template: TEMPLATE,
		}
	);

	const [label, setLabel] = useState(`${min}px to ${max}px`);

	useEffect(() => {
		let l = `between ${min}px and ${max}px`;
		if (!max) {
			l = `minimum ${min}px`;
		}
		if (!min) {
			l = `maximum ${max}px`;
		}
		setLabel(l);
	}, [min, max]);

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes, clientId }} />
			<div {...blockProps}>
				<Notice
					isDismissible={false}
					spokenMessage={__(
						`Visible from ${min} pixels to ${max} pixels`
					)}
				>
					<span className="sans-serif">
						<strong>Viewport Range:</strong> {__(label)}
					</span>
				</Notice>
				<div {...innerBlocksProps} />
			</div>
		</Fragment>
	);
}
