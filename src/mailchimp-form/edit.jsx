/**
 * External Dependencies
 */
import clsx from 'clsx';
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
				'prc-block/form',
				{
					interactiveNamespace: 'prc-block/mailchimp-form',
				},
				[
					[
						'prc-block/form-input-text',
						{
							label: 'Email Address',
							type: 'email',
							required: true,
							metdata: {
								name: 'emailAddress',
							},
							placeholder: 'Email Address',
						},
					],
					[
						'prc-block/form-submit',
						{}
					],
					[
						'prc-block/form-message',
						{},
						[
							[
								'core/paragraph',
								{
									content: 'Thank you for subscribing!',
								},
							],
						],
					],
				]
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
			<div {...innerBlocksProps} />
		</Fragment>
	);
}
