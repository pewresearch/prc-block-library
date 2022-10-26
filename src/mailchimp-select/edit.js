/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';

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

const edit = ({ attributes, setAttributes, clientId }) => {
	const blockProps = useBlockProps({});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
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
};

export default edit;
