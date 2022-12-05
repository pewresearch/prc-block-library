/**
 * External Dependencies
 */
import classnames from 'classnames';

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

function Icon({ onToggle, caretStyle = false }) {
	const iconSet = caretStyle
		? ['icon caret right', 'icon caret down']
		: ['icon outline plus circle', 'icon outline minus circle'];

	return (
		<button
			className="wp-block-prc-block-collapsible__icon"
			onClick={() => {
				onToggle();
			}}
			type="button"
		>
			{iconSet.map((icon, index) => (
				<i
					// eslint-disable-next-line react/no-array-index-key
					key={`icon-${index}`}
					className={`${icon} ${0 === index ? 'closed' : 'opened'}`}
				/>
			))}
		</button>
	);
}

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

	// Convert to an array of classnames so we can easily check via `includes()`.
	const style = undefined !== className ? className.split(' ') : [];

	const blockProps = useBlockProps({
		className: classnames(className, {
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
				<Icon
					onToggle={() => {
						setOpen(!isOpen);
					}}
					caretStyle={style.includes('is-style-caret')}
				/>
			</div>
			<div className="wp-block-prc-block-collapsible__content">
				<div {...innerBlocksProps} />
			</div>
		</div>
	);
}
