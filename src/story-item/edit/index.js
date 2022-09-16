/**
 * External Dependencies
 */
import classNames from 'classnames/bind';
import { getTermsAsOptions } from '@prc-app/shared';

/**
 * WordPress Dependencies
 */
import { Fragment, useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal Dependencies
 */
import { Controls, Placeholder } from './controls';
import Image from './image';
import Excerpt from './excerpt';
import Extra from './extra';
import Header from './header';
import Meta from './meta';
import Preview from './preview';
import { useStoryItemBlockProps } from '../helpers';

const edit = ({ attributes, setAttributes, isSelected, clientId, context }) => {
	const {
		title,
		excerpt,
		extra,
		label,
		date,
		image,
		imageSlot,
		imageSize,
		isChartArt,
		postId,
		headerSize,
		enableEmphasis,
		enableHeader,
		enableExcerpt,
		enableExcerptBelow,
		enableExtra,
		enableBreakingNews,
		enableMeta,
		metaTaxonomy,
		inLoop,
		isPreview,
		className,
	} = attributes;

	// Check for a query block context and display and run logic accordingly.
	useEffect(() => {
		console.log('Context:', context);
		if (
			undefined !== context.queryId &&
			undefined !== context.postId &&
			undefined !== context.postType &&
			0 !== context.postId &&
			Number.isInteger(context.postId)
		) {
			console.log('Query Block Story Item: ', context, attributes);
		}
	}, [context]);

	const blockProps = useStoryItemBlockProps(attributes);

	// If not active or is explicitly a preview, return the preview early.
	if (!isSelected || isPreview) {
		return <Preview {...{ attributes, context }} />;
	}

	if (
		undefined === postId &&
		(undefined === context.query || undefined === context.postId)
	) {
		return (
			<Placeholder
				attributes={attributes}
				setAttributes={setAttributes}
				blockProps={blockProps}
			/>
		);
	}

	console.log('postID', {
		postId,
		context,
	});

	return (
		<Fragment>
			<Controls
				{...{
					attributes,
					setAttributes,
					context,
				}}
			/>
			<article {...blockProps}>
				<Image
					img={image}
					size={imageSize}
					slot={imageSlot}
					chartArt={isChartArt}
					postId={postId}
					setAttributes={setAttributes}
				/>

				<Meta
					{...{
						attributes,
						setAttributes,
						enabled: enableMeta && 'disabled' !== metaTaxonomy,
					}}
				/>

				<Header
					enabled={enableHeader}
					title={title}
					size={headerSize}
					altHeaderWeight={!enableExcerpt}
					setAttributes={setAttributes}
				/>

				<Excerpt
					enabled={enableExcerpt}
					value={excerpt}
					context={context}
					sansSerif={!enableHeader}
					setAttributes={setAttributes}
				/>

				<Extra
					enabled={enableExtra}
					content={extra}
					breakingNews={enableBreakingNews}
					setAttributes={setAttributes}
					isSelected={isSelected}
				/>
			</article>
		</Fragment>
	);
};

export default edit;
