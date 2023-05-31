/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { Popover } from '@wordpress/components';

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
	setAttributes,
	context,
	clientId,
	isSelected,
}) {
	const blockProps = useBlockProps();

	// get the backgroundColor from the style attribute
	const { backgroundColor } = blockProps.style;

	const { className } = blockProps;
	
	//get the third class name from the className string
	const colorClass = className.split(' ')[2];

	//get the color slug out of that class
	const colorSlug = colorClass.slice(4, -17)
	
	const [visible, setVisible] = useState(false);

	return (
		<Fragment>
			<div {...blockProps} style={{ backgroundColor: '#dadbdb' }} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
				<p className='color-text'>
					{backgroundColor && backgroundColor.toUpperCase()}
					{!backgroundColor && '#dadbdb'.toUpperCase()}
				</p>
				{visible && <Popover placement='right' >{colorSlug}</Popover>}
			</div>
		</Fragment>
	);
}
