/**
 * External Dependencies
 */
import classNames from 'classnames';
import { getBlockGapSupportValue } from '@prc/block-utils';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useMemo } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	withColors,
	getColorClassName,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import AttachmentsList from './attachments-list';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 * @param {Object}   props.context       Context object with the block's context values.
 * @param {string}   props.clientId      Unique ID of the block.
 * @param {boolean}  props.isSelected    Whether or not the block is currently selected.
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
	setHoverTextColor,
}) {
	const { heading, className } = attributes;

	const blockProps = useBlockProps({
		className: classNames(className, 'common-block-style--baseball-card'),
	});

	const headingClassNames = useMemo(() => {
		return classNames('wp-block-prc-block-attachment-info__heading', {
			'has-text-color':
				!!headingTextColor?.color || !!headingTextColor?.class,
			[`has-${headingTextColor?.slug}-color`]: !!headingTextColor?.slug,
			'has-background':
				!!headingBackgroundColor?.color ||
				!!headingBackgroundColor?.class,
			[`has-${headingBackgroundColor?.slug}-background-color`]:
				!!headingBackgroundColor?.slug,
		});
	}, [headingBackgroundColor, headingTextColor]);

	return (
		<Fragment>
			<Controls
				{...{
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
				}}
			/>
			<div {...blockProps}>
				<div className={headingClassNames}>
					<RichText
						{...{
							tagName: 'h2',
							placeholder: __('Attachment Info'),
							value: heading,
							onChange: (val) => setAttributes({ heading: val }),
						}}
					/>
				</div>
				<AttachmentsList
					{...{
						attributes,
						context,
						hoverBackgroundColor,
						hoverTextColor,
						activeBackgroundColor,
						activeTextColor,
					}}
				/>
			</div>
		</Fragment>
	);
}

export default withColors(
	{ headingBackgroundColor: 'color' },
	{ headingTextColor: 'color' },
	{ hoverBackgroundColor: 'color' },
	{ hoverTextColor: 'color' },
	{ activeBackgroundColor: 'color' },
	{ activeTextColor: 'color' },
)(Edit);
