/**
 * External Dependencies
 */
import { URLSearchToolbar } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';

export default function Controls( { attributes, setAttributes, context } ) {
	return (
		<BlockControls>
			<URLSearchToolbar
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
		</BlockControls>
	);
}
