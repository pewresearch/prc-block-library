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

const ALLOWED_BLOCKS = ['prc-block/form-input-text', 'core/button'];

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({
		style: {
			'--block-gap': getBlockGapSupportValue(attributes),
		}
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		templateLock: true,
		template: [
			['prc-block/form-input-text', {
				isInteractive: true,
				interactiveNamespace: 'prc-block/mailchimp-form'
			}],
			[
				'core/button',
				{
					text: 'Sign Up',
					isInteractive: true,
					interactiveNamespace: 'prc-block/mailchimp-form',
				},
			],
			['prc-block/form-captcha', {
				isInteractive: true,
				interactiveNamespace: 'prc-block/mailchimp-form'
			}],
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
