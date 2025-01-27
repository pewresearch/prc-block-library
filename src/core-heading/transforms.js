/**
 * WordPress Dependencies
 */
import { createBlock } from '@wordpress/blocks';

function extractChapterTitle(string) {
	const pattern = /\[chapter title="([^"]*)"/;
	const match = pattern.exec(string);

	if (match) {
		return match[1];
	}
	return null;
}

const transforms = {
	from: [
		{
			type: 'shortcode',
			tag: 'chapter',
			transform({ named: { title, icon_url } }) {
				// ensure id is a number
				return createBlock('core/heading', {
					content: title,
					level: 2,
					isChapter: true,
				});
			},
			isMatch({ named: { title } }) {
				return !!title;
			},
		},
		{
			type: 'block',
			blocks: ['prc-block/chapter'],
			transform: ({ value, level }) =>
				createBlock('core/heading', {
					content: value,
					level,
					isChapter: true,
				}),
		},
		{
			type: 'block',
			blocks: ['core/shortcode'],
			transform: ({ text }) => {
				const title = extractChapterTitle(text);
				return createBlock('core/heading', {
					content: title,
					level: 2,
					isChapter: true,
				});
			},
			isMatch({ text }) {
				const title = extractChapterTitle(text);
				return null !== title;
			},
		},
	],
};

export default transforms;
