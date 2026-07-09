/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import { getDoubleSelectTemplate } from './utils';
import Controls from './controls';

export default function Edit({
	attributes,
	setAttributes,
	clientId,
	__unstableLayoutClassNames: layoutClassNames,
}) {
	const blockProps = useBlockProps({
		className: clsx(
			layoutClassNames,
			'wp-block-prc-block-form-input-select-range'
		),
	});
	const hasSubsumption = attributes?.interactiveSubsumption ?? false;
	const interactiveNamespace = attributes?.interactiveNamespace ?? 'prc-block/form-input-select-range';
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			renderAppender: false,
			template: getDoubleSelectTemplate(hasSubsumption, interactiveNamespace),
		}
	);

	return (
		<>
			<Controls attributes={attributes} setAttributes={setAttributes} clientId={clientId} />
			<div {...blockProps}>{innerBlocksProps.children}</div>
		</>
	);
}
