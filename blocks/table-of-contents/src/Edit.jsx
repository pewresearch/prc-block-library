/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { Fragment, useMemo, useState, useRef, useEffect } from '@wordpress/element';
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
	activeBackgroundColor,
	setActiveBackgroundColor,
	activeTextColor,
	setActiveTextColor,
	hoverBackgroundColor,
	setHoverBackgroundColor,
	hoverTextColor,
	setHoverTextColor
}) {
	const isSiteEditor = false;
	const { postId, postType } = context;
	const { chapters = [], parentId, parentTitle } = useTOC({postId, postType});
	const { heading, showCurrentChapter, className, hideHeading, autoDropdownEnabled, autoDropdownWidth } = attributes;
	const { selectBlock } = useDispatch('core/block-editor');
	const [ isDropdownOpen, setDropdownOpen ] = useState(false);
	const [ isAutoDropdownSwitched, setDropdownSwitch ] = useState(null);

	// Add a ref to the component
	const componentRef = useRef(null);

	/**
	 * @TODO: We can make this more performant.
	 */
	useEffect(() => {
		if ( !autoDropdownEnabled ) {
			return setDropdownSwitch(false);
		}
		const updateAutoDropdownSwitch = () => {
			if (componentRef.current) {
				setDropdownSwitch( componentRef.current.parentNode.offsetWidth <= autoDropdownWidth );
			}
		};

		updateAutoDropdownSwitch();

		window.addEventListener('resize', updateAutoDropdownSwitch); // Add a listener for the window resize event

		return () => {
			window.removeEventListener('resize', updateAutoDropdownSwitch); // Remove the listener when the component unmounts
		};
	}, [componentRef.current?.parentNode?.offsetWidth, componentRef.current?.parentNode, autoDropdownWidth]);

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
		activeBackgroundColor,
		setActiveBackgroundColor,
		activeTextColor,
		setActiveTextColor,
		hoverBackgroundColor,
		setHoverBackgroundColor,
		hoverTextColor,
		setHoverTextColor
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
		activeBackgroundColor,
		setActiveBackgroundColor,
		activeTextColor,
		setActiveTextColor,
		hoverBackgroundColor,
		setHoverBackgroundColor,
		hoverTextColor,
		setHoverTextColor
	]);

	const blockWrapperClassNames = useMemo(() => {
		return classNames(className, {
			'has-text-color': !!colors.textColor.color || !!colors.textColor?.class,
			[getColorClassName('color', colors.textColor?.slug)]: !!colors.textColor?.slug,
			'has-background': !!colors.backgroundColor.color || colors.backgroundColor.class,
			[getColorClassName('background-color', colors.backgroundColor?.slug)]:
				!!colors.backgroundColor?.slug,
			'has-active-background': !!colors.activeBackgroundColor.color || colors.activeBackgroundColor.class,
			[`has-active-${colors?.activeBackgroundColor?.slug}-background-color`]: !!colors?.activeBackgroundColor?.slug,
			'has-active-color': !!colors.activeTextColor.color || colors.activeTextColor.class,
			[`has-active-${colors?.activeTextColor?.slug}-color`]: !!colors?.activeTextColor?.slug,
			'has-hover-background': !!colors.hoverBackgroundColor.color || colors.hoverBackgroundColor.class,
			[`has-hover-${colors?.hoverBackgroundColor?.slug}-background-color`]: !!colors?.activeBackgroundColor?.slug,
			'has-hover-color': !!colors.hoverTextColor.color || colors.hoverTextColor.class,
			[`has-hover-${colors?.hoverTextColor?.slug}-color`]: !!colors?.hoverTextColor?.slug,
			'is-switched': isAutoDropdownSwitched,
		})
	}, [
		colors.textColor,
		colors.backgroundColor,
		colors.hoverBackgroundColor,
		colors.activeBackgroundColor,
		colors.hoverTextColor,
		colors.activeTextColor,
		isAutoDropdownSwitched,
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
			'has-heading-color': !!colors?.headingTextColor?.color || !!colors?.headingTextColor?.class,
			[`has-heading-${colors?.headingTextColor?.slug}-color`]: !!colors?.headingTextColor?.slug,
			'has-dropdown-color': !!colors?.dropdownTextColor?.color || !!colors?.dropdownTextColor?.class,
			[`has-dropdown-${colors?.dropdownTextColor?.slug}-color`]: !!colors?.dropdownTextColor?.slug,
			'has-heading-background': !!colors?.headingBackgroundColor?.color || !!colors?.headingBackgroundColor?.class,
			[`has-heading-${colors?.headingBackgroundColor?.slug}-background-color`]: !!colors?.headingBackgroundColor?.slug,
			'has-dropdown-background': !!colors?.dropdownBackgroundColor?.color || !!colors?.dropdownBackgroundColor?.class,
			[`has-dropdown-${colors?.dropdownBackgroundColor?.slug}-background-color`]: !!colors?.dropdownBackgroundColor?.slug,
			'is-hidden': hideHeading,
		})
	}, [
		colors,
		hideHeading,
	]);

	const blockPropArgs = useMemo(() => {
		return {
			className: blockWrapperClassNames,
			style: blockWrapperStyles,
			['data-auto-dropdown-enabled'] : autoDropdownEnabled,
			['data-auto-dropdown-width'] : autoDropdownWidth,
			['data-show-current-chapter'] : showCurrentChapter,
			['aria-expanded'] : isDropdownOpen,
		};
	}, [
		blockWrapperClassNames,
		blockWrapperStyles,
		autoDropdownEnabled,
		autoDropdownWidth,
		showCurrentChapter,
		isDropdownOpen,
	]);

	const blockProps = useBlockProps(blockPropArgs);

	return (
		<Fragment>
			<Controls {...{
				attributes,
				setAttributes,
				colors,
			}} />
			<div {...blockProps} ref={componentRef}>
				<div className={headingClassNames}>
					<RichText
						{...{
							tagName: 'h2',
							placeholder: 'Table of Contents',
							value: heading,
							onChange: (newHeading) => setAttributes({ heading: newHeading }),
						}}
					/>
					<div className="wp-block-prc-block-table-of-contents__dropdown" onClick={()=> setDropdownOpen(!isDropdownOpen)}>
						+
					</div>
				</div>
				<ul className="wp-block-prc-block-table-of-contents__list">
					{0 !== chapters.length && chapters.map((chapter) => (
						<li className={postId === chapter?.id ? `is-active` : null}>
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
	{ activeBackgroundColor: 'color' },
	{ activeTextColor: 'color' },
	{ hoverBackgroundColor: 'color' },
	{ hoverTextColor: 'color' },
)(Edit);
