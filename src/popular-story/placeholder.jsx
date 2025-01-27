/**
 * External Dependencies
 */
import { URLSearchField } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { Button, Placeholder as WPComPlaceholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal Dependencies
 */
import Icon from './icon';

export default function Placeholder({ attributes, setAttributes, blockProps }) {
	return (
		<div {...blockProps}>
			<WPComPlaceholder
				icon={<Icon />}
				label={__(' Popular Post', 'prc-block-library')}
				isColumnLayout
				instructions={__(
					`Search for a post or paste url here`,
					'prc-block-library',
				)}
			>
				<URLSearchField
					{...{
						postId: attributes.postId,
						postType: 'post',
						disableImage: true,
						onSelect: (postAttrs) => {
							const { title, link, id } = postAttrs;
							setAttributes({ title: title?.rendered, url: link, postId: id });
						},
					}}
				/>
				<Button
					variant='link'
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
