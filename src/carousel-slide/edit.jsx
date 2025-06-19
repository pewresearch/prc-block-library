/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import clsx from 'clsx';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const TEMPLATE = [
	[
		'core/paragraph',
		{
			placeholder:
				'Type / to add blocks inside the carousel slide.',
		},
	],
];

export default function Edit({ attributes, __unstableLayoutClassNames: layoutClassNames }) {
	const blockProps = useBlockProps({
		className: clsx(layoutClassNames),
	});
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		templateLock: false,
		template: TEMPLATE,
	});

	return <div {...innerBlocksProps} />;
}
