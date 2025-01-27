/**
 * External Dependencies
 */
import { WPEntitySearch } from '@prc/components';
import { Icon } from '@prc/icons';

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

/**
 * Interanl Dependencies
 */
import { refreshPostAttributes } from '../../helpers';

export default function Placeholder({ attributes, setAttributes }) {
	const { postId, postType, imageSize, url } = attributes;

	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<WPComPlaceholder
				icon={() => {
					<div style={{ maxWidth: '64px' }}>
						<Icon icon="newspaper" />
					</div>;
				}}
				label={__(' Story Item', 'prc-block-library')}
				isColumnLayout
				instructions={`Search for a ${postType}, or paste a url here to get started.`}
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
							label: __('Fact Sheet', 'prc-block-library'),
							value: 'fact-sheet',
						},
						{
							label: __('Editorial Feature', 'prc-block-library'),
							value: 'feature',
						},
					]}
					onChange={(value) => setAttributes({ postType: value })}
				/>
				<WPEntitySearch
					{...{
						placeholder: 'Climate Change', // placeholder for the search input
						searchValue: url, // pre-populate the search input
						onSelect: (post) => {
							refreshPostAttributes({
								setAttributes,
								postId: post.entityId,
								postType: post.entitySubType,
								imageSize,
							});
						},
						onKeyEnter: () => {},
						onKeyESC: () => {},
						entityId: postId,
						entityType: 'postType', // taxonomy, user
						entitySubType: postType, // ['post', 'page', 'staff'] || ['category', 'tag'] || 'user'
						perPage: 10,
						hideChildren: true,
						clearOnSelect: false,
						createNew: false,
						showExcerpt: true,
						showType: true,
						searchSize: 'default', // compact also available
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
