/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

export default [
	{
		name: 'popup-standard',
		isDefault: true,
		title: __('Popup Standard', 'prc-block-library'),
		excerpt: __('A standard popup.', 'prc-block-library'),
		attributes: {
			className: 'is-style-standard',
		},
		innerBlocks: [
			[
				'prc-block/popup-content',
				{},
				[
					[
						'core/paragraph',
						{
							placeholder: __(
								'Add content to trigger your popup here.',
								'prc-block-library',
							),
						},
					],
				],
			],
			[
				'prc-block/popup-modal',
				{
					backgroundColor: 'white',
				},
				[
					[
						'core/paragraph',
						{
							placeholder: __(
								'Add content inside the modal here.',
								'prc-block-library',
							),
						},
					],
				],
			],
		],
		isActive: ({ className }) =>
			className ? className.includes('is-style-standard') : false,
	},
	{
		name: 'popup-video',
		title: __('Popup Video', 'prc-block-library'),
		excerpt: __('A video popup.', 'prc-block-library'),
		attributes: {
			className: 'is-style-video',
		},
		innerBlocks: [
			[
				'prc-block/popup-content',
				{},
				[
					[
						'core/paragraph',
						{
							placeholder: __(
								'Add content to trigger your video popup here.',
								'prc-block-library',
							),
						},
					],
				],
			],
			[
				'prc-block/popup-modal',
				{
					backgroundColor: 'black',
					textColor: 'white',
					allowedBlocks: ['vimeo/create', 'core/video', 'core/embed'],
				},
				[['core/video', {}]],
			],
		],
		isActive: ({ className }) =>
			className ? className.includes('is-style-video') : false,
	},
];
