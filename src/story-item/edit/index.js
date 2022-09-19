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
import ContextPreview from './context-preview';
import { useStoryItemBlockProps } from '../helpers';

const edit = ({ attributes, setAttributes, isSelected, clientId, context }) => {
	// If this block is being rendered in the scope of query context
	// then render the ContextPreview component early.
	if (
		undefined !== context.queryId &&
		undefined !== context.postId &&
		undefined !== context.postType &&
		0 !== context.postId &&
		Number.isInteger(context.postId)
	) {
		return (
			<Fragment>
				<Controls
					{...{
						attributes,
						setAttributes,
						context,
					}}
				/>
				<ContextPreview {...{ attributes, context }} />
			</Fragment>
		);
	}

	const { postId, isPreview } = attributes;

	if (undefined === postId) {
		return (
			<Placeholder
				attributes={attributes}
				setAttributes={setAttributes}
				clientId={clientId}
			/>
		);
	}

	// If not active or is explicitly a preview, return the preview early.
	if (!isSelected || isPreview) {
		return <Preview {...{ attributes, context }} />;
	}

	const blockProps = useStoryItemBlockProps(attributes);

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
					{...{
						attributes,
						setAttributes,
					}}
				/>

				<Meta
					{...{
						attributes,
						setAttributes,
					}}
				/>

				<Header
					{...{
						attributes,
						setAttributes,
					}}
				/>

				<Excerpt
					{...{
						attributes,
						setAttributes,
					}}
				/>

				<Extra
					{...{
						attributes,
						setAttributes,
					}}
				/>
			</article>
		</Fragment>
	);
};

export default edit;
