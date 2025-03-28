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


export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({
		style: {
			'--block-gap': getBlockGapSupportValue(attributes),
		},
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		templateLock: false,
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
			[
				'prc-block/form-input-message',
				{
					isInteractive: true,
					interactiveNamespace: 'prc-block/mailchimp-form',
					className: 'is-style-overlay',
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
