/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect, useMemo } from '@wordpress/element';
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
 * @param {Object}   props                           Properties passed to the function.
 * @param {Object}   props.attributes                Available block attributes.
 * @param {string}   props.className
 * @param {string}   props.titleBackgroundColor
 * @param {Function} props.setTitleBackgroundColor
 * @param {string}   props.titleTextColor
 * @param {Function} props.setTitleTextColor
 * @param {string}   props.contentBackgroundColor
 * @param {Function} props.setContentBackgroundColor
 * @param {string}   props.contentTextColor
 * @param {Function} props.setContentTextColor
 * @param {string}   props.borderColor
 * @param {Function} props.setBorderColor
 * @param {Function} props.setAttributes             Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
// eslint-disable-next-line max-lines-per-function
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
	clientId,
	context,
}) {

	const titleBackground = useMemo(() => {
		const key = 'prc-block/accordion-controller/title-background';
		const parentBlockBackgroundTitleSlug = context?.[key];
		return !titleBackgroundColor?.slug && parentBlockBackgroundTitleSlug ? { slug: parentBlockBackgroundTitleSlug } : titleBackgroundColor;
	},[context, titleBackgroundColor]);

	const titleText = useMemo(() => {
		const key = 'prc-block/accordion-controller/title-text';
		const parentBlockTextTitleSlug = context?.[key];
		return !titleTextColor?.slug && parentBlockTextTitleSlug ? { slug: parentBlockTextTitleSlug } : titleTextColor;
	},[context, titleTextColor]);

	const contentBackground = useMemo(() => {
		const key = 'prc-block/accordion-controller/content-background';
		const parentBlockBackgroundContentSlug = context?.[key];
		return !contentBackgroundColor?.slug && parentBlockBackgroundContentSlug ? { slug: parentBlockBackgroundContentSlug } : contentBackgroundColor;
	},[context, contentBackgroundColor]);

	const contentText = useMemo(() => {
		const key = 'prc-block/accordion-controller/content-text';
		const parentBlockTextContentSlug = context?.[key];
		return !contentTextColor?.slug && parentBlockTextContentSlug ? { slug: parentBlockTextContentSlug } : contentTextColor;
	},[context, contentTextColor]);

	const [isOpen, setOpen] = useState(false);
	const toggleOpen = () => setOpen(!isOpen);

	const blockProps = useBlockProps({
		className: classNames(className, {
			'is-active': isOpen,
		}),
	});

	// By defining a allowedBlocks attribute any block can now customize what inner blocks are allowed.
	// This gives us a good way to ensure greater template and pattern control.
	// By default if nothing is defined in the "allowedBlocks" attribute this will default to the constant ALLOWED_BLOCKS found under "Internal Dependencies" ^.
	const { allowedBlocks, title } = attributes;
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: classNames('wp-block-prc-block-accordion__content', {
				'is-open': isOpen,
				'has-background':
					!!contentBackground?.slug,
				[getColorClassName('background-color', contentBackground?.slug)]:
					!!contentBackground?.slug,
				'has-text-color': !!contentText?.slug,
				[getColorClassName('color', contentText?.slug)]:
					!!contentText?.slug,
			}),
		},
		{
			allowedBlocks: allowedBlocks || ALLOWED_BLOCKS,
			orientation: 'vertical',
		}
	);

	const titleClassNames = classNames('wp-block-prc-block-accordion__title', {
		'has-background':
			!!titleBackground?.slug,
		[getColorClassName('background-color', titleBackground?.slug)]:
			!!titleBackground?.slug,
		'has-text-color': !!titleText?.slug,
		[getColorClassName('color', titleText?.slug)]:
			!!titleText?.slug,
	});

	return (
		<Fragment>
			<Controls colors={{
				titleBackgroundColor,
				setTitleBackgroundColor,
				titleTextColor,
				setTitleTextColor,
				contentBackgroundColor,
				setContentBackgroundColor,
				contentTextColor,
				setContentTextColor,
			}} clientId={clientId}/>
			<div {...blockProps}>
				<div className={titleClassNames}>
					<span
						className="wp-block-prc-block-accordion__icon"
						onClick={toggleOpen}
					>
						&#8227;
					</span>
					<RichText
						tagName="h3"
						placeholder={__('Title', 'prc-block-library')}
						value={title}
						onChange={(newTitle) =>
							setAttributes({ title: newTitle })
						}
						allowedFormats={[]}
					/>
				</div>
				<div {...innerBlocksProps} />
			</div>
		</Fragment>
	);
}

export default withColors(
	{ contentTextColor: 'color' },
	{ contentBackgroundColor: 'color' },
	{ titleBackgroundColor: 'color' },
	{ titleTextColor: 'color' },
)(Edit);
