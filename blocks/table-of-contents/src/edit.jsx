/* eslint-disable max-lines-per-function */
/**
 * External Dependencies
 */
import classNames from 'classnames';
import { getBlockGapSupportValue } from '@prc/block-utils';

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
import Controls from './controls';
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
	const { postId, postType } = context;
	const { chapters = [] } = useTOC({postId, postType});
	const { heading, showCurrentChapter, className, hideHeading, autoDropdownEnabled, autoDropdownWidth, style } = attributes;
	const { selectBlock } = useDispatch('core/block-editor');
	const [ isDropdownOpen, setDropdownOpen ] = useState(false);
	const [ isAutoDropdownSwitched, setDropdownSwitch ] = useState(null);

	// Add a ref to the component
	const componentRef = useRef(null);

	useEffect(() => {
		if ( !autoDropdownEnabled ) {
			return setDropdownSwitch(false);
		}

		const updateAutoDropdownSwitch = () => {
			if (componentRef?.current) {
				setDropdownSwitch( componentRef?.current.parentNode.parentNode.offsetWidth <= autoDropdownWidth );
			}
		};

		updateAutoDropdownSwitch();

		window.addEventListener('resize', updateAutoDropdownSwitch); // Add a listener for the window resize event

		return () => {
			window.removeEventListener('resize', updateAutoDropdownSwitch); // Remove the listener when the component unmounts
		};
	}, [autoDropdownEnabled, componentRef?.current?.parentNode?.parentNode.offsetWidth, componentRef?.current?.parentNode?.parentNode, autoDropdownWidth]);

	// Construct a colors object that contains the color values and helper functions, re-compute whenever the color values change.
	const colors = useMemo(() => ({
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
		return classNames(className, 'common-block-style--baseball-card', {
			'is-switched': isAutoDropdownSwitched,
		})
	}, [
		isAutoDropdownSwitched,
		className,
	]);

	const headingClassNames = useMemo(() => {
		return classNames('wp-block-prc-block-table-of-contents__heading', {
			'has-text-color': !!colors?.headingTextColor?.color || !!colors?.headingTextColor?.class,
			[`has-${colors?.headingTextColor?.slug}-color`]: !!colors?.headingTextColor?.slug,
			'has-background': !!colors?.headingBackgroundColor?.color || !!colors?.headingBackgroundColor?.class,
			[`has-${colors?.headingBackgroundColor?.slug}-background-color`]: !!colors?.headingBackgroundColor?.slug,
			'is-hidden': hideHeading,
		})
	}, [
		colors,
		hideHeading,
	]);

	const dropDownClassNames = useMemo(() => {
		return classNames('wp-block-prc-block-table-of-contents__dropdown__heading', {
			'has-text-color': !!colors?.dropdownTextColor?.color || !!colors?.dropdownTextColor?.class,
			[`has-${colors?.dropdownTextColor?.slug}-color`]: !!colors?.dropdownTextColor?.slug,
			'has-background': !!colors?.dropdownBackgroundColor?.color || !!colors?.dropdownBackgroundColor?.class,
			[`has-${colors?.dropdownBackgroundColor?.slug}-background-color`]: !!colors?.dropdownBackgroundColor?.slug,
		})
	}, [
		colors,
	]);

	const blockPropArgs = useMemo(() => {
		return {
			className: blockWrapperClassNames,
			['data-auto-dropdown-enabled'] : autoDropdownEnabled,
			['data-auto-dropdown-width'] : autoDropdownWidth,
			['data-show-current-chapter'] : showCurrentChapter,
			['aria-expanded'] : isDropdownOpen,
		};
	}, [
		blockWrapperClassNames,
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
				clientId,
			}} />
			<div {...blockProps}>
				<div ref={componentRef}>
				<div className={headingClassNames}>
					<RichText
						{...{
							tagName: 'h2',
							placeholder: 'Table of Contents',
							value: heading,
							onChange: (newHeading) => setAttributes({ heading: newHeading }),
						}}
					/>
				</div>
				<div className={dropDownClassNames}>
					<RichText
						{...{
							tagName: 'h2',
							placeholder: 'Table of Contents',
							value: heading,
							onChange: (newHeading) => setAttributes({ heading: newHeading }),
						}}
					/>
					<div className="wp-block-prc-block-table-of-contents__dropdown-trigger" onClick={()=> setDropdownOpen(!isDropdownOpen)}>
						+
					</div>
				</div>
				<ul className="wp-block-prc-block-table-of-contents__list" style={{
					'--gap': getBlockGapSupportValue(attributes),
				}}>
					{0 !== chapters.length && chapters.map((chapter) => (
						<li className={classNames('wp-block-prc-block-table-of-contents__list-item', {
							'is-active': postId === chapter?.id,
							'has-active-background': !!colors.activeBackgroundColor.color || colors.activeBackgroundColor.class,
							[`has-active-${colors?.activeBackgroundColor?.slug}-background-color`]: !!colors?.activeBackgroundColor?.slug,
							'has-active-color': !!colors.activeTextColor.color || colors.activeTextColor.class,
							[`has-active-${colors?.activeTextColor?.slug}-color`]: !!colors?.activeTextColor?.slug,
							'has-focus-background': !!colors.activeBackgroundColor.color || colors.activeBackgroundColor.class,
							[`has-focus-${colors?.activeBackgroundColor?.slug}-background-color`]: !!colors?.activeBackgroundColor?.slug,
							'has-focus-color': !!colors.activeTextColor.color || colors.activeTextColor.class,
							[`has-focus-${colors?.activeTextColor?.slug}-color`]: !!colors?.activeTextColor?.slug,
							'has-hover-background': !!colors.hoverBackgroundColor.color || colors.hoverBackgroundColor.class,
							[`has-hover-${colors?.hoverBackgroundColor?.slug}-background-color`]: !!colors?.activeBackgroundColor?.slug,
							'has-hover-color': !!colors.hoverTextColor.color || colors.hoverTextColor.class,
							[`has-hover-${colors?.hoverTextColor?.slug}-color`]: !!colors?.hoverTextColor?.slug,
						})}>
							<span>{chapter?.title}</span>
							{postId === chapter?.id && chapter?.internalChapters && (
								<ul className="wp-block-prc-block-table-of-contents__list">
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
			</div>
		</Fragment>
	);
}

export default withColors(
	{ dropdownBackgroundColor: 'color' },
	{ dropdownTextColor: 'color' },
	{ headingBackgroundColor: 'color' },
	{ headingTextColor: 'color' },
	{ activeBackgroundColor: 'color' },
	{ activeTextColor: 'color' },
	{ hoverBackgroundColor: 'color' },
	{ hoverTextColor: 'color' },
)(Edit);
