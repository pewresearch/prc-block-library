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
import AttachmentsPagination from './attachments-pagination';
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
	const { className, variant } = attributes;

	const SelectedVariant = useMemo(() => {
		if ('list' === variant) {
			return (
				<AttachmentsList
					{...{
						attributes,
						context,
						setAttributes,
						headingBackgroundColor,
						headingTextColor,
						hoverBackgroundColor,
						hoverTextColor,
						activeBackgroundColor,
						activeTextColor,
					}}
				/>
			);
		} else if ('pagination' === variant) {
			return (
				<AttachmentsPagination
					{...{
						attributes,
						context,
						hoverBackgroundColor,
						hoverTextColor,
						activeBackgroundColor,
						activeTextColor,
					}}
				/>
			);
		}
	}, [
		variant,
		attributes,
		setAttributes,
		context,
		headingBackgroundColor,
		headingTextColor,
		hoverBackgroundColor,
		hoverTextColor,
		activeBackgroundColor,
		activeTextColor,
	]);

	const blockProps = useBlockProps({
		className: classNames(className, 'common-block-style--baseball-card'),
	});

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
			<div {...blockProps}>{SelectedVariant}</div>
		</Fragment>
	);
}

export default withColors(
	{ headingBackgroundColor: 'color' },
	{ headingTextColor: 'color' },
	{ hoverBackgroundColor: 'color' },
	{ hoverTextColor: 'color' },
	{ activeBackgroundColor: 'color' },
	{ activeTextColor: 'color' }
)(Edit);
