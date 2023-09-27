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
import Controls from './Controls';

const ALLOWED_BLOCKS = ['prc-block/form-input-checkbox', 'core/button'];
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
				},
			],
			[
				'core/button',
				{
					text: 'Sign Up',
					lock: {
						move: true,
						remove: true,
					},
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
