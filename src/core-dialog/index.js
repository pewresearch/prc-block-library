/**
 * WordPress Dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerBlockStyle, registerBlockVariation } from '@wordpress/blocks';

import './style.scss';

registerBlockVariation('prc-block/dialog', {
	name: 'dialog-video',
	title: __('Video Dialog', 'prc-block-library'),
	excerpt: __('Display a video in popup (<dialog/>). This variant is specifically designed for videos. Note: All Dialog blocks support the included video functionality so long as a VideoPress block is present.', 'prc-block-library'),
	attributes: {
		className: 'is-style-video',
		dialogType: 'modal',
	},
	keywords: ['dialog', 'video', 'modal', 'videopress', 'youtube'],
	category: 'media',
	innerBlocks: [
		[
			'prc-block/dialog-trigger',
			{},
			[
				[
					'core/paragraph',
					{
						placeholder: __(
							'Add content to trigger your video dialog here...',
							'prc-block-library'
						),
					},
				],
			],
		],
		[
			'prc-block/dialog-element',
			{},
			[['videopress/video', {}]],
		],
	],
	scope: ['inserter', 'transform'],
	isActive: ({ className }) =>
		className ? className.includes('is-style-video') : false,
});
