/**
 * WordPress Dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const ALLOWED_BLOCKS = ['prc-block/form-input-field', 'core/button'];

export default function edit({ attributes, setAttributes, context }) {
	const hasDarkBackground = context['prc-block/hasDarkBackground'];

	const blockProps = useBlockProps({});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		templateLock: true,
		template: [
			['prc-block/form-input-field', {}],
			[
				'core/button',
				{
					text: 'Sign Up',
				},
			],
		],
	});

	return (
		<Fragment>
			<form {...innerBlocksProps} />
			<Controls
				{...{
					attributes,
					setAttributes,
				}}
			/>
		</Fragment>
	);
}
