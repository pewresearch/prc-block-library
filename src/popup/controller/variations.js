/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'popup-standard',
		isDefault: true,
		title: __('Popup Standard', 'prc-block-library'),
		excerpt: __('A standard popup.', 'prc-block-library'),
		attributes: {},
		innerBlocks: [
			['prc-block/popup-content', {}, [
				['core/paragraph', {
					placeholder: __('Add content to trigger your popup here.', 'prc-block-library'),
				}],
			]],
			['prc-block/popup-modal', {
				className: 'is-style-standard',
			}, [
				['core/paragraph', {
					placeholder: __('Add content inside the modal here.', 'prc-block-library'),
				}],
			]],
		]
	},
	{
		name: 'popup-video',
		title: __('Popup Video', 'prc-block-library'),
		excerpt: __('A video popup.', 'prc-block-library'),
		attributes: {},
		innerBlocks: [
			['prc-block/popup-content', {}, [
				['core/paragraph', {
					placeholder: __('Add content to trigger your video popup here.', 'prc-block-library'),
				}],
			]],
			['prc-block/popup-modal', {
				className: 'is-style-video',
			}, [
				['vimeo/create', {}]
			]],
		]
	},
];

export default variations;
