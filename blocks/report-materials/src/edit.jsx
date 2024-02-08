/**
 * External Dependencies
 */
import classNames from 'classnames';
import { getBlockGapSupportValue } from '@prc/block-utils';
import { Icon } from '@prc/icons';

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

/**
 * Internal Dependencies
 */
import useReportMaterials from './use-report-materials';
import { getItemLabel, getItemIcon } from './utils';
import Controls from './controls';

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
	const { heading, className } = attributes;
	const { reportMaterials = [], parentId, parentTitle } = useReportMaterials({postId, postType});

	const blockWrapperClassNames = useMemo(() => {
		return classNames(className, 'common-block-style--baseball-card')
	}, [
		className,
	]);

	const headingClassNames = useMemo(() => {
		return classNames('wp-block-prc-block-report-materials__heading', {
			'has-text-color': !!headingTextColor?.color || !!headingTextColor?.class,
			[`has-${headingTextColor?.slug}-color`]: !!headingTextColor?.slug,
			'has-background': !!headingBackgroundColor?.color || !!headingBackgroundColor?.class,
			[`has-${headingBackgroundColor?.slug}-background-color`]: !!headingBackgroundColor?.slug,
		})
	}, [
		headingBackgroundColor,
		headingTextColor,
	]);

	const blockProps = useBlockProps({
		className: blockWrapperClassNames,
	});

	return (
		<Fragment>
			<Controls {...{
				colors: {
					headingBackgroundColor,
					setHeadingBackgroundColor,
					headingTextColor,
					setHeadingTextColor,
					hoverBackgroundColor,
					setHoverBackgroundColor,
					hoverTextColor,
					setHoverTextColor,
					activeBackgroundColor,
					setActiveBackgroundColor,
					activeTextColor,
					setActiveTextColor,
				},
				clientId,
			}}/>
			<div {...blockProps}>
				<div className={headingClassNames}>
					<RichText
						{...{
							tagName: 'h2',
							placeholder: 'Report Materials',
							value: heading,
							onChange: (newHeading) => setAttributes({ heading: newHeading }),
						}}
					/>
				</div>
				<ul className="wp-block-prc-block-report-materials__list" style={{
					'--block-gap': getBlockGapSupportValue(attributes)
				}}>
					{0 !== reportMaterials.length && reportMaterials.map((material) => {
						const type = material?.type;
						const icon = type ? getItemIcon(type) : null;
						return (
							<li className={classNames('wp-block-prc-block-repor_materials__list-item', 'flex-align-center', {
								'has-hover-background': !!hoverBackgroundColor.color || hoverBackgroundColor.class,
								[`has-hover-${hoverBackgroundColor?.slug}-background-color`]: !!hoverBackgroundColor?.slug,
								'has-hover-color': !!hoverTextColor.color || hoverTextColor.class,
								[`has-hover-${hoverTextColor?.slug}-color`]: !!hoverTextColor?.slug,
								'has-active-background': !!activeBackgroundColor.color || activeBackgroundColor.class,
								[`has-active-${activeBackgroundColor?.slug}-background-color`]: !!activeBackgroundColor?.slug,
								'has-active-color': !!activeTextColor.color || activeTextColor.class,
								[`has-active-${activeTextColor?.slug}-color`]: !!activeTextColor?.slug,
								'has-focus-background': !!activeBackgroundColor.color || activeBackgroundColor.class,
								[`has-focus-${activeBackgroundColor?.slug}-background-color`]: !!activeBackgroundColor?.slug,
								'has-focus-color': !!activeTextColor.color || activeTextColor.class,
								[`has-focus-${activeTextColor?.slug}-color`]: !!activeTextColor?.slug,
							})}>
								{null !== icon && <Icon icon={icon} />}
								<span>{getItemLabel(material)}</span>
							</li>
						)
					})}
				</ul>
			</div>
		</Fragment>
	);
}

export default withColors(
	{ activeBackgroundColor: 'color' },
	{ activeTextColor: 'color' },
	{ headingBackgroundColor: 'color' },
	{ headingTextColor: 'color' },
	{ hoverBackgroundColor: 'color' },
	{ hoverTextColor: 'color' },
)(Edit);
