/**
 * External Dependencies
 */
import { getBlockGapSupportValue } from '@prc/block-utils';

/**
 * WordPress Dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const ALLOWED_BLOCKS = [
	'prc-block/form-input-text',
	'prc-block/form-input-captcha',
	'prc-block/form-input-message',
	'core/button',
];

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({
		style: {
			'--block-gap': getBlockGapSupportValue(attributes),
		},
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		templateLock: false, // @TODO: We should determine if the user is an admin, if so then set this to false...
		template: [
			[
				'prc-block/form-input-text',
				{
					isInteractive: true,
					interactiveNamespace: 'prc-block/mailchimp-form',
				},
			],
			[
				'core/button',
				{
					text: 'Sign Up',
					isInteractive: true,
					interactiveNamespace: 'prc-block/mailchimp-form',
				},
			],
			[
				'prc-block/form-captcha',
				{
					isInteractive: true,
					interactiveNamespace: 'prc-block/mailchimp-form',
				},
			],
		],
	});

	return (
		<Fragment>
			<Controls
				{...{
					attributes,
					setAttributes,
				}}
			/>
			<form {...innerBlocksProps} />
		</Fragment>
	);
}
