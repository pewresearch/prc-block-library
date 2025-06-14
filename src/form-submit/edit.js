/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const TEMPLATE = [
	[
		'core/button',
		{
			text: __('Submit'),
			tagName: 'button',
			type: 'submit',
		},
	],
	['prc-block/form-captcha', {}],
];

export default function Edit({ __unstableLayoutClassNames: layoutClassNames }) {
	const blockProps = useBlockProps({
		className: clsx(layoutClassNames),
	});
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: TEMPLATE,
		templateLock: 'all',
		renderAppender: false,
	});
	return <div {...innerBlocksProps} />;
}
