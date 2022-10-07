/**
 * External Dependencies
 */
import { URLSearchField } from '@prc-app/shared';

/**
 * WordPress Dependencies
 */
import { Button, Placeholder as WPComPlaceholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEntityProp } from '@wordpress/core-data';
import { trendingUp } from '@wordpress/icons';

/**
 * Interanl Dependencies
 */

export default function Placeholder({ attributes, setAttributes, blockProps }) {
	const [siteId] = useEntityProp('root', 'site', 'siteId');
	const postType = 1 === siteId ? 'stub' : 'post';

	return (
		<div {...blockProps}>
			<WPComPlaceholder
				icon={trendingUp}
				label={__(' Popular Post', 'prc-block-library')}
				isColumnLayout
				instructions={__(
					`Search for a ${postType} or paste url here`,
					'prc-block-library',
				)}
			>
				<URLSearchField
					{...{
						attributes,
						setAttributes,
						disableImage: true,
						onSelect: (postAttrs) => {
							const { title, url, postId } = postAttrs;
							setAttributes({ title, url, postId });
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
