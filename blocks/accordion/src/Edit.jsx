/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	withColors,
	getColorClassName,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

const ALLOWED_BLOCKS = true;

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
function Edit({
	attributes,
	setAttributes,
	className,
	titleBackgroundColor,
	setTitleBackgroundColor,
	titleTextColor,
	setTitleTextColor,
	contentBackgroundColor,
	setContentBackgroundColor,
	contentTextColor,
	setContentTextColor,
	borderColor,
	setBorderColor,
}) {
	const [isOpen, setOpen] = useState(false);
	const toggleOpen = () => setOpen(!isOpen);

	const colors = {
		titleBackgroundColor,
		setTitleBackgroundColor,
		titleTextColor,
		setTitleTextColor,
		contentBackgroundColor,
		setContentBackgroundColor,
		contentTextColor,
		setContentTextColor,
		borderColor,
		setBorderColor,
	};

	const blockProps = useBlockProps({
		className: classNames( className, {
			'is-active': isOpen,
			'has-border-color': !! borderColor.color || !! borderColor?.class,
			[ getColorClassName( 'border-color', borderColor?.slug ) ]:
				!! borderColor?.slug,
		} ),
	});
	// By defining a allowedBlocks attribute any block can now customize what inner blocks are allowed.
	// This gives us a good way to ensure greater template and pattern control.
	// By default if nothing is defined in the "allowedBlocks" attribute this will default to the constant ALLOWED_BLOCKS found under "Internal Dependencies" ^.
	const { allowedBlocks, title } = attributes;
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: classNames('wp-block-prc-block-accordion--content', {
				'is-open': isOpen,
				'has-background': !! contentBackgroundColor.color || !! contentBackgroundColor?.class,
				[ getColorClassName( 'background-color', contentBackgroundColor?.slug ) ]:
					!! contentBackgroundColor?.slug,
				'has-text-color': !! contentTextColor.color || !! contentTextColor?.class,
				[ getColorClassName( 'color', contentTextColor?.slug ) ]:
					!! contentTextColor?.slug,
			}),
		},
		{
			allowedBlocks: allowedBlocks || ALLOWED_BLOCKS,
			orientation: 'vertical',
		},
	);

	const titleClassNames = classNames('wp-block-prc-block-accordion--title', {
		'has-background': !! titleBackgroundColor.color || !! titleBackgroundColor?.class,
		[ getColorClassName( 'background-color', titleBackgroundColor?.slug ) ]:
			!! titleBackgroundColor?.slug,
		'has-text-color': !! titleTextColor.color || !! titleTextColor?.class,
		[ getColorClassName( 'color', titleTextColor?.slug ) ]:
			!! titleTextColor?.slug,
	});

	return (
		<Fragment>
			<Controls colors={colors} />
			<div {...blockProps}>
				<div className={titleClassNames}>
					<span class="wp-block-prc-block-accordion--icon" onClick={toggleOpen}>&#8227;</span>
					<RichText
						tagName="h3"
						placeholder={__('Title', 'prc-block-library')}
						value={title}
						onChange={(newTitle) => setAttributes({ title: newTitle })}
						allowedFormats={[]}
					/>
				</div>
				<div {...innerBlocksProps} />
			</div>
		</Fragment>
	);
}

export default withColors(
	{ titleBackgroundColor: 'color' },
	{ titleTextColor: 'color' },
	{ contentBackgroundColor: 'color' },
	{ contentTextColor: 'color' },
	{ borderColor: 'color' },
)(Edit);
