/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

export default [
	{
		name: 'dialog',
		isDefault: true,
		title: __('Dialog', 'prc-block-library'),
		excerpt: __('Display content in a pop-up (<dialog/> ).', 'prc-block-library'),
		attributes: {
			className: 'is-style-standard',
			dialogType: 'modal',
		},
		keywords: ['dialog', 'modal', 'popup', 'overlay', 'pop-up'],
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
								'Add content to trigger your dialog here...',
								'prc-block-library'
							),
						},
					],
				],
			],
			[
				'prc-block/dialog-element',
				{
					backgroundColor: 'white',
					style: {
						spacing: {
							padding: {
								top: "var:preset|spacing|30",
								bottom: "var:preset|spacing|30",
								left: "var:preset|spacing|30",
								right: "var:preset|spacing|30"
							}
						},
						shadow: "var:preset|shadow|deep"
					}
				},
				[
					[
						'core/heading',
						{
							placeholder: __(
								'Dialog Title...',
								'prc-block-library'
							),
						},
					],
					[
						'core/paragraph',
						{
							placeholder: __(
								'Add content inside the dialog here...',
								'prc-block-library'
							),
						},
					],
				],
			],
		],
		scope: ['inserter', 'transform'],
		isActive: ({ className }) =>
			className ? className.includes('is-style-standard') : false,
	},
	{
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
				{
					backgroundColor: 'black',
					textColor: 'white',
					style: {
						spacing: {
							padding: {
								top: "var:preset|spacing|0",
								bottom: "var:preset|spacing|0",
								left: "var:preset|spacing|0",
								right: "var:preset|spacing|0"
							}
						},
						shadow: "var:preset|shadow|deep"
					},
					allowedBlocks: [
						'core/video',
						'core/embed',
						'videopress/video',
					],
				},
				[['videopress/video', {}]],
			],
		],
		scope: ['inserter', 'transform'],
		isActive: ({ className }) =>
			className ? className.includes('is-style-video') : false,
	},
];
