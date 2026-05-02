/* eslint-disable max-lines-per-function */
/**
 * External dependencies
 */
import { pagination } from '@prc/functions';
import classNames from 'classnames';
import { getBlockGapSupportValue } from '@prc/functions';
import { LoadingIndicator } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { useEntityRecord, useEntityRecords } from '@wordpress/core-data';
import { select } from '@wordpress/data';
import { getPath } from '@wordpress/url';
import { useMemo } from 'react';
import {
	useBlockProps,
	getColorClassName,
	Warning,
	withColors,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
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
	hoverBackgroundColor,
	setHoverBackgroundColor,
	hoverTextColor,
	setHoverTextColor,
	activeBackgroundColor,
	setActiveBackgroundColor,
	activeTextColor,
	setActiveTextColor,
}) {
	const { className } = attributes;

	const isSiteEditor = getPath(window.location.href)?.includes(
		'site-editor.php'
	);

	// get post id of current post
	const { records, isResolving } = useEntityRecords(
		'postType',
		'attachment',
		{
			per_page: 50,
			context: 'view',
			parent: !isSiteEditor ? context.postId : null,
			status: 'inherit',
			media_type: 'image',
			order_by: 'date',
			order: 'asc',
		}
	);

	const { record: parentRec, isResolving: parentIsResolving } =
		useEntityRecord(
			'postType',
			'post',
			!isSiteEditor ? context.postId : null
		);

	const { parentTitle, attachmentRecords } = useMemo(() => {
		if (!records || isSiteEditor || isResolving || parentIsResolving) {
			return {
				parentTitle: 'Parent Title',
				attachmentRecords: [
					{
						title: 'Attachment Title 1',
						id: 1,
						link: '#',
						is_active: false,
					},
					{
						title: 'Attachment Title 2',
						id: 2,
						link: '#',
						is_active: true,
					},
					{
						title: 'Attachment Title 3',
						id: 3,
						link: '#',
						is_active: false,
					},
					{
						title: 'Attachment Title 4',
						id: 4,
						link: '#',
						is_active: false,
					},
					{
						title: 'Attachment Title 5',
						id: 5,
						link: '#',
						is_active: false,
					},
					{
						title: 'Attachment Title 6',
						id: 6,
						link: '#',
						is_active: false,
					},
					{
						title: 'Attachment Title 7',
						id: 7,
						link: '#',
						is_active: false,
					},
					{
						title: 'Attachment Title 8',
						id: 8,
						link: '#',
						is_active: false,
					},
					{
						title: 'Attachment Title 9',
						id: 9,
						link: '#',
						is_active: false,
					},
					{
						title: 'Attachment Title 10',
						id: 10,
						link: '#',
						is_active: false,
					},
				],
			};
		}
		return {
			parentTitle: parentRec?.title?.rendered,
			attachmentRecords: records,
		};
	}, [records, isSiteEditor, isResolving]);

	const blockGapStyle = useMemo(() => {
		return {
			'--block-gap': getBlockGapSupportValue(attributes),
		};
	}, [attributes]);

	const parentURL = useMemo(() => {
		return !isSiteEditor
			? select('core/editor').getPermalink(context.postId)
			: '';
	}, [isSiteEditor, context.postId]);

	const paginatedItems = useMemo(() => {
		if (!attachmentRecords || isResolving || !attachmentRecords.length) {
			return null;
		}
		console.log(attachmentRecords);
		const x = new pagination(attachmentRecords);
		const links = x.returnRangeOfLinks();
		console.log(links);
		return links;
	}, [attachmentRecords, isResolving]);

	const blockProps = useBlockProps({
		className: classNames(className),
	});

	if (isResolving) {
		return (
			<div {...blockProps}>
				<Warning>
					<LoadingIndicator
						enabled={true}
						label="Loading Attachments..."
					/>
				</Warning>
			</div>
		);
	}

	if (!records) {
		return (
			<div {...blockProps}>
				<Warning>No attachments found.</Warning>
			</div>
		);
	}

	if (!paginatedItems) {
		return (
			<div {...blockProps}>
				<Warning>No attachments found.</Warning>
			</div>
		);
	}

	return (
		<Fragment>
			<Controls
				{...{
					colors: {
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
				<div
					className="common-block-style__pagination__container"
					style={blockGapStyle}
				>
					<div className="common-block-style__pagination">
						<div className="common-block-style__pagination__pagination-previous">
							Previous
						</div>
						<div className="common-block-style__pagination__pagination-numbers">
							{paginatedItems.map((item) => (
								<div
									key={item.id}
									className={classNames(
										'common-block-style__pagination__page-numbers',
										getColorClassName(
											'background-color',
											hoverBackgroundColor
										),
										getColorClassName('color', hoverTextColor),
										{
											'attachments-pagination__item--active':
												item.is_active,
										}
									)}
								>
									{item.page_num}
								</div>
							))}
						</div>
						<div className="common-block-style__pagination__pagination-next">
							Next
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default withColors(
	{ hoverBackgroundColor: 'color' },
	{ hoverTextColor: 'color' },
	{ activeBackgroundColor: 'color' },
	{ activeTextColor: 'color' }
)(Edit);
