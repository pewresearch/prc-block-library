/**
 * WordPress Dependencies
 */
import { Button, Placeholder as WPComPlaceholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Interanl Dependencies
 */
import URLSearchField from './url-search-field';

export default function Placeholder({ attributes, setAttributes }) {
	const [siteId] = useEntityProp('root', 'site', 'siteId');
	const postType = 1 === siteId ? 'stub' : 'post';

	const blockProps = useBlockProps({
		className: 'wp-block-prc-block-story-item__placeholder',
	});

	return (
		<WPComPlaceholder
			icon="admin-post"
			label={__(' Story Item', 'prc-block-library')}
			isColumnLayout
			instructions={__(
				`Search for a ${postType} or paste url here`,
				'prc-block-library',
			)}
			{...blockProps}
		>
			<URLSearchField
				{...{
					attributes,
					setAttributes,
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
				}}
			/>
		</WPComPlaceholder>
	);
}
