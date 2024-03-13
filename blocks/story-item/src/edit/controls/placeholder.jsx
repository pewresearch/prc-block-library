/**
 * External Dependencies
 */
import { URLSearchField } from '@prc/components';
import { NewIcon } from '@prc/icons';

/**
 * WordPress Dependencies
 */
import {
	Button,
	Placeholder as WPComPlaceholder,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
import { useState, useEffect, useMemo } from '@wordpress/element';

/**
 * Interanl Dependencies
 */
import { getAttributesFromPost } from '../../helpers';

export default function Placeholder({ attributes, setAttributes }) {
	const { postId, postType, imageSize, url } = attributes;

	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<WPComPlaceholder
				icon={<NewIcon icon="newspaper" />}
				label={__(' Story Item', 'prc-block-library')}
				isColumnLayout
				instructions={__(
					`Search for a ${postType}, or paste a url here to get started.`,
					'prc-block-library'
				)}
			>
				<SelectControl
					label={__('Post Type', 'prc-block-library')}
					value={postType}
					options={[
						{
							label: __('Post', 'prc-block-library'),
							value: 'post',
						},
						{
							label: __('Short Read', 'prc-block-library'),
							value: 'short-read',
						},
						{
							label: __('Factsheet', 'prc-block-library'),
							value: 'factsheet',
						},
						{
							label: __('Interactive', 'prc-block-library'),
							value: 'interactive',
						},
					]}
					onChange={(value) => setAttributes({ postType: value })}
				/>
				<URLSearchField
					{...{
						postId,
						postType,
						url,
						onSelect: (postAttrs) => {
							const newAttributes = getAttributesFromPost(
								postAttrs,
								{ imageSize }
							);
							setAttributes(newAttributes);
						},
						onUpdateURL: (newURL) => {
							setAttributes({ url: newURL });
						},
					}}
				/>
				<Button
					isLink
					onClick={() => {
						setAttributes({ postId: 0 });
					}}
					text={__('Skip')}
					style={{
						paddingLeft: '9px',
						marginTop: '10px',
					}}
				/>
			</WPComPlaceholder>
		</div>
	);
}
