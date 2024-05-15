/**
 * External Dependencies
 */
import classNames from 'classnames';
import { Icon } from '@prc/icons';
import { getBlockGapSupportValue } from '@prc/block-utils';

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
// import the pew-knight-logo.svg file as a component...
import pewKnightLogoUrl from '../assets/pew-knight-logo.svg';

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
	const { title, className, allowedBlocks, isCoBranded } = attributes;

	const [isOpen, setOpen] = useState(true);

	const blockProps = useBlockProps({
		className: classNames(className, {
			'is-open': isOpen,
			'is-co-branded': isCoBranded,
		}),
		style: {
			'--block-gap': getBlockGapSupportValue(attributes, 'vertical'),
		},
	});

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-prc-block-collapsible__content',
		},
		{
			allowedBlocks: allowedBlocks || ALLOWED_BLOCKS,
			templateLock: false,
			template: TEMPLATE,
		}
	);

	return (
		<div {...blockProps}>
			<div className="wp-block-prc-block-collapsible__title">
				{!isCoBranded && (
					<RichText
						tagName="div"
						value={title}
						onChange={(t) => setAttributes({ title: t })}
						placeholder="How we did this..."
						formattingControls={[]}
						keepPlaceholderOnFocus
					/>
				)}
				{isCoBranded && (
					<img src={pewKnightLogoUrl} alt="Pew Knight Logo"/>
				)}
				<button
					className="wp-block-prc-block-collapsible__icon"
					onClick={() => {
						setOpen(!isOpen);
					}}
					type="button"
				>
					<Icon
						icon={isOpen ? 'circle-minus' : 'circle-plus'}
						library="light"
					/>
				</button>
			</div>
			<div {...innerBlocksProps} />
		</div>
	);
}
