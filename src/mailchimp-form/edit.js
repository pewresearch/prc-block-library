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

export default function edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		templateLock: true,
		template: [
			['prc-block/form-input-text', {}],
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
