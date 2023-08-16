/**
 * External Dependencies
 */
import classNames from 'classnames';
import { icons, Icon } from '@prc/icons';

/**
 * WordPress Dependencies
 */
import { useState } from '@wordpress/element';
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
const ALLOWED_BLOCKS = [
	'core/paragraph',
	'core/heading',
	'core/image',
	'core/table',
	'core/list',
	'core/buttons',
	'core/file',
	'core/video',
	'core/group',
];

const TEMPLATE = [['core/paragraph', {}]];

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
export default function Edit({ attributes, setAttributes }) {
	const { title, className, allowedBlocks, orientation } = attributes;

	const [isOpen, setOpen] = useState(true);

	// Convert to an array of classNames so we can easily check via `includes()`.
	const style = undefined !== className ? className.split(' ') : [];

	const blockProps = useBlockProps({
		className: classNames(className, {
			'is-open': isOpen,
		}),
	});

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: allowedBlocks || ALLOWED_BLOCKS,
			orientation: orientation || 'vertical',
			templateLock: false,
			template: TEMPLATE,
		},
	);

	return (
		<div {...blockProps}>
			<div className="wp-block-prc-block-collapsible__title">
				<RichText
					tagName="div"
					value={title}
					onChange={(t) => setAttributes({ title: t })}
					placeholder="How we did this..."
					formattingControls={[]}
					keepPlaceholderOnFocus
				/>
				<button
					className="wp-block-prc-block-collapsible__icon"
					onClick={() => {
						setOpen(!isOpen);
					}}
					type="button"
				>
					<Icon icon={isOpen ? icons.faCircleMinusLight : icons.faCirclePlusLight}/>
				</button>
			</div>
			<div className="wp-block-prc-block-collapsible__content">
				<div {...innerBlocksProps} />
			</div>
		</div>
	);
}
