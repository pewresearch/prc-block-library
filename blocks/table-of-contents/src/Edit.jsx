/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { Fragment, useMemo } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	withColors,
	getColorClassName,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Controls from './Controls';
import useTOC from './use-toc';

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
	isSelected,
	textColor,
	setTextColor,
	backgroundColor,
	setBackgroundColor,
	dropdownBackgroundColor,
	setDropdownBackgroundColor,
	dropdownTextColor,
	setDropdownTextColor,
	headingBackgroundColor,
	setHeadingBackgroundColor,
	headingTextColor,
	setHeadingTextColor,
}) {
	const isSiteEditor = false;
	const { postId, postType } = context;
	const { chapters = [], parentId, parentTitle } = useTOC({postId, postType});
	const { heading, showCurrentChapter, className, hideHeading } = attributes;
	const { selectBlock } = useDispatch('core/block-editor');

	const {postTitle} = useSelect(
		(select) => {
			const { getEditedPostAttribute } = select('core/editor');
			return {
				postTitle: getEditedPostAttribute('title'),
			};
		},
		[clientId]
	);

	// Construct a colors object that contains the color values and helper functions, re-compute whenever the color values change.
	const colors = useMemo(() => ({
		textColor,
		setTextColor,
		backgroundColor,
		setBackgroundColor,
		dropdownBackgroundColor,
		setDropdownBackgroundColor,
		dropdownTextColor,
		setDropdownTextColor,
		headingBackgroundColor,
		setHeadingBackgroundColor,
		headingTextColor,
		setHeadingTextColor,
	}), [
		textColor,
		setTextColor,
		backgroundColor,
		setBackgroundColor,
		dropdownBackgroundColor,
		setDropdownBackgroundColor,
		dropdownTextColor,
		setDropdownTextColor,
		headingBackgroundColor,
		setHeadingBackgroundColor,
		headingTextColor,
		setHeadingTextColor,
	]);

	const blockWrapperClassNames = useMemo(() => {
		return classNames(className, {
			'has-text-color': !!colors.textColor.color || !!colors.textColor?.class,
			[getColorClassName('color', colors.textColor?.slug)]: !!colors.textColor?.slug,
			'has-background': !!colors.backgroundColor.color || colors.backgroundColor.class,
			[getColorClassName('background-color', colors.backgroundColor?.slug)]:
				!!colors.backgroundColor?.slug,
		})
	}, [
		colors.textColor,
		colors.backgroundColor,
		className,
	]);

	const blockWrapperStyles = useMemo(() => {
		return {
			color: !colors.textColor?.slug && colors.textColor?.color,
			backgroundColor: !colors.backgroundColor?.slug && colors.backgroundColor?.color,
		}
	}, [
		colors.textColor,
		colors.backgroundColor,
	]);

	const headingClassNames = useMemo(() => {
		return classNames('wp-block-prc-block-table-of-contents__heading', {
			'has-text-color': !!colors.headingTextColor.color || !!colors.headingTextColor?.class,
			[getColorClassName('color', colors.headingTextColor?.slug)]: !!colors.headingTextColor?.slug,
			'has-background': !!colors.headingBackgroundColor.color || colors.headingBackgroundColor.class,
			[getColorClassName('background-color', colors.headingBackgroundColor?.slug)]: !!colors.headingBackgroundColor?.slug,
			'is-hidden': hideHeading,
		})
	}, [
		colors.headingTextColor,
		colors.headingBackgroundColor,
		hideHeading,
	]);

	const headingStyles = useMemo(() => {
		return {
			color: !colors.headingTextColor?.slug && colors.headingTextColor?.color,
			backgroundColor: !colors.headingBackgroundColor?.slug && colors.headingBackgroundColor?.color,
		}
	}, [
		colors.headingTextColor,
		colors.headingBackgroundColor,
	]);

	const blockProps = useBlockProps({
		className: blockWrapperClassNames,
		style: blockWrapperStyles,
	});

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
					{...{
						tagName: 'h2',
						placeholder: 'Table of Contents',
						value: heading,
						onChange: (newHeading) => setAttributes({ heading: newHeading }),
						className: headingClassNames,
						style: headingStyles,
					}}
				/>
				<ul className="wp-block-prc-block-table-of-contents__list">
					{0 !== chapters.length && chapters.map((chapter) => (
						<li>
							<span>{chapter?.title}</span>
							{postId === chapter?.id && chapter?.internalChapters && (
								<ul>
									{chapter.internalChapters.map((chapter) => <li><a onClick={()=>{
										if (chapter.clientId) {
											selectBlock(chapter.clientId);
										}
									}}>{chapter.title}</a></li>)}
								</ul>
							)}
						</li>
					))}
				</ul>
			</div>
		</Fragment>
	);
}

export default withColors(
	{ textColor: 'color' },
	{ backgroundColor: 'color' },
	{ dropdownBackgroundColor: 'color' },
	{ dropdownTextColor: 'color' },
	{ headingBackgroundColor: 'color' },
	{ headingTextColor: 'color' },
)(Edit);
