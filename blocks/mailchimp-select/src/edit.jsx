/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const ALLOWED_BLOCKS = ['prc-block/form-field', 'prc-block/form-input-checkbox', 'prc-block/form-input-text', 'core/button', 'core/group'];
const DEFAULT_TEMPLATE = [
	[
		'core/group',
		{
			lock: {
				move: true,
				remove: true,
			},
		},
		[
			[
				'prc-block/form-input-text',
				{
					label: 'Email Address',
					placeholder: 'Enter your email address',
					type: 'email',
					lock: {
						move: true,
						remove: true,
					},
					isInteractive: true,
					interactiveNamespace: 'prc-block/mailchimp-select'
				},
			],
			['prc-block/form-captcha', {
				isInteractive: true,
				interactiveNamespace: 'prc-block/mailchimp-select'
			}],
			[
				'core/button',
				{
					text: 'Sign Up',
					lock: {
						move: true,
						remove: true,
					},
					isInteractive: true,
					interactiveNamespace: 'prc-block/mailchimp-select'
				},
			],
		],
	],
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	const blockProps = useBlockProps();

	const { allowedBlocks } = attributes;
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: allowedBlocks || ALLOWED_BLOCKS,
		template: DEFAULT_TEMPLATE,
		templateLock: false,
		renderAppender: false, // Here we're using the template to control whats loaded into the block.
	});

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes, clientId }} />
			<div {...innerBlocksProps} />
		</Fragment>
	);
}
