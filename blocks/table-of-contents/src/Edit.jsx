/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	withColors,
	getColorClassName,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './Controls';
import useCollectChapters from './useCollectChapters';

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
	context,
	clientId,
	className,
	isSelected,
	textColor,
	setTextColor,
	backgroundColor,
	setBackgroundColor,
	headingBackgroundColor,
	setHeadingBackgroundColor,
	headingTextColor,
	setHeadingTextColor,
}) {
	const isSiteEditor = false;
	const { heading, showCurrentChapter } = attributes;
	const blockProps = useBlockProps({
		className: classNames(className, {
			'has-text-color': !!textColor.color || !!textColor?.class,
			[getColorClassName('color', textColor?.slug)]: !!textColor?.slug,
			'has-background': !!backgroundColor.color || backgroundColor.class,
			[getColorClassName('background-color', backgroundColor?.slug)]:
				!!backgroundColor?.slug,
		}),
		style: {
			color: !textColor?.slug && textColor?.color,
			backgroundColor: !backgroundColor?.slug && backgroundColor?.color,
		},
	});

	const { chapters = [], childPostIds = [] } = useCollectChapters({clientId, context});
	console.log('useCollectChapters foundChapters: ', chapters, context, clientId);

	return (
		<Fragment>
			<Controls {...{
				attributes,
				setAttributes,
				colors: {
					textColor,
					setTextColor,
					backgroundColor,
					setBackgroundColor,
					headingBackgroundColor,
					setHeadingBackgroundColor,
					headingTextColor,
					setHeadingTextColor,
				}
			}} />
			<div {...blockProps}>
				<RichText
				tagName="h2"
				placeholder="Table of Contents"
				value={heading}
				onChange={(newHeading) => setAttributes({ heading: newHeading })}
				className={classNames('wp-block-prc-block-table-of-contents__heading', {
					'has-text-color': !!headingTextColor.color || !!headingTextColor?.class,
					[getColorClassName('color', headingTextColor?.slug)]: !!headingTextColor?.slug,
					'has-background': !!headingBackgroundColor.color || headingBackgroundColor.class,
					[getColorClassName('background-color', headingBackgroundColor?.slug)]: !!headingBackgroundColor?.slug,
				})}
				style={{
					color: !headingTextColor?.slug && headingTextColor?.color,
					backgroundColor: !headingBackgroundColor?.slug && headingBackgroundColor?.color,
				}}/>
				<ul className="wp-block-prc-block-table-of-contents__list">
					{0 !== chapters.length &&
						chapters.map((chapter) => <li>{chapter.attributes.content}</li>)}
				</ul>
			</div>
		</Fragment>
	);
}

export default withColors(
	{ textColor: 'color' },
	{ backgroundColor: 'color' },
	{ headingBackgroundColor: 'color' },
	{ headingTextColor: 'color' },
)(Edit);
