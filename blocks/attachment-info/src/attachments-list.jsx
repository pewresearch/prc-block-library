/* eslint-disable max-lines-per-function */
/**
 * External dependencies
 */
import classNames from 'classnames';
import { getBlockGapSupportValue } from '@prc/block-utils';
import { LoadingIndicator } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { useEntityRecord, useEntityRecords } from '@wordpress/core-data';
import { select } from '@wordpress/data';
import { getPath } from '@wordpress/url';
import { useMemo } from 'react';
import { getColorClassName, Warning } from '@wordpress/block-editor';

export default function AttachmentsList({
	attributes,
	context,
	hoverTextColor,
	hoverBackgroundColor,
	activeBackgroundColor,
	activeTextColor,
}) {
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
						title: {
							rendered: 'Attachment Title 1',
						},
						id: null,
						link: '#',
					},
					{
						title: {
							rendered: 'Attachment Title 2',
						},
						id: null,
						link: '#',
					},
					{
						title: {
							rendered: 'Attachment Title 3',
						},
						id: null,
						link: '#',
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

	/// ///////////////////////////

	if (isResolving) {
		return (
			<Warning>
				<LoadingIndicator
					enabled={true}
					label="Loading Attachments..."
				/>
			</Warning>
		);
	}

	if (!records) {
		return <Warning>No attachments found.</Warning>;
	}

	return (
		<ul
			className="wp-block-prc-block-attachment-info__list"
			style={blockGapStyle}
		>
			<li
				className={classNames(
					'wp-block-prc-block-attachment-info__list-item',
					'flex-align-center',
					{
						'has-hover-background':
							!!hoverBackgroundColor.color ||
							hoverBackgroundColor.class,
						[`has-hover-${hoverBackgroundColor?.slug}-background-color`]:
							!!hoverBackgroundColor?.slug,
						'has-hover-color':
							!!hoverTextColor.color || hoverTextColor.class,
						[`has-hover-${hoverTextColor?.slug}-color`]:
							!!hoverTextColor?.slug,
					}
				)}
			>
				<a href={null}>{parentTitle}</a>
			</li>
			<li
				className={classNames(
					'wp-block-prc-block-attachment-info__list-item',
					'flex-align-center',
					'is-active',
					{
						'has-active-background':
							!!activeBackgroundColor.color ||
							activeBackgroundColor.class,
						[`has-active-${activeBackgroundColor?.slug}-background-color`]:
							!!activeBackgroundColor?.slug,
						'has-active-color':
							!!activeTextColor.color || activeTextColor.class,
						[`has-active-${activeTextColor?.slug}-color`]:
							!!activeTextColor?.slug,
					}
				)}
			>
				<a href={null}>Active Attachment</a>
			</li>
			{attachmentRecords
				.filter(
					(record) =>
						record.title.rendered !== '' &&
						record.title.rendered.includes(' ')
				)
				.map((record) => {
					return (
						<li
							className={classNames(
								'wp-block-prc-block-attachment-info__list-item',
								'flex-align-center',
								{
									'has-hover-background':
										!!hoverBackgroundColor.color ||
										hoverBackgroundColor.class,
									[`has-hover-${hoverBackgroundColor?.slug}-background-color`]:
										!!hoverBackgroundColor?.slug,
									'has-hover-color':
										!!hoverTextColor.color ||
										hoverTextColor.class,
									[`has-hover-${hoverTextColor?.slug}-color`]:
										!!hoverTextColor?.slug,
									'has-focus-background':
										!!activeBackgroundColor.color ||
										activeBackgroundColor.class,
									[`has-focus-${activeBackgroundColor?.slug}-background-color`]:
										!!activeBackgroundColor?.slug,
									'has-focus-color':
										!!activeTextColor.color ||
										activeTextColor.class,
									[`has-focus-${activeTextColor?.slug}-color`]:
										!!activeTextColor?.slug,
								}
							)}
							key={record.id || record.title.rendered}
						>
							<a href={null}>{record.title.rendered}</a>
						</li>
					);
				})}
		</ul>
	);
}
