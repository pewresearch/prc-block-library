/**
 * WordPress Dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { isURL } from '@wordpress/url';

const transforms = {
	from: [
		{
			type: 'raw',
			isMatch: (node) => {
				const trimmed = node.textContent.trim();
				const siteDomain = window.location.href.split('/').slice(0, 3).join('/');
				return (
					'P' == node.nodeName &&
					isURL(trimmed) &&
					trimmed.startsWith(siteDomain)
				);
			},
			transform: (node) => {
				const url = node.textContent.trim();
				const siteDomain = window.location.href.split('/').slice(0, 3).join('/');
				if (url.startsWith(siteDomain)) {
					return createBlock('prc-block/story-item', {
						url,
					});
				}
			},
			priority: 0, // Do this before any other match.
		},
	],
};

export default transforms;
