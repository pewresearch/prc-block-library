/**
 * External Dependencies
 */
import { URLSearchToolbar } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { BlockControls } from '@wordpress/block-editor';

export default function Controls({ attributes, setAttributes }) {
	return (
		<BlockControls>
			<URLSearchToolbar
				{...{
					postId: attributes.postId,
					postType: 'post',
					disableImage: true,
					onSelect: (postAttrs) => {
						const { title, link, id } = postAttrs;
						setAttributes({
							title: title?.rendered,
							url: link,
							postId: id,
						});
					},
				}}
			/>
		</BlockControls>
	);
}
