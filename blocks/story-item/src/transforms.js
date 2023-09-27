/**
 * WordPress Dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { isURL } from '@wordpress/url';

const { siteDomain } = window;

const transforms = {
	from: [
		{
			type: 'raw',
			isMatch: (node) => {
				const maybeUrl =
					'P' === node.nodeName ? node.textContent.trim() : false;
				return (
					false !== maybeUrl &&
					isURL(maybeUrl) &&
					maybeUrl.startsWith(siteDomain)
				);
			},
			transform: (node) => {
				const url = node.textContent.trim();
				return createBlock('prc-block/story-item', {
					url,
				});
			},
			priority: 0, // Do this before any other match.
		},
	],
};

export default transforms;
