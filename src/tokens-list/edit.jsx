/**
 * External Dependencies
 */
import { InnerBlocksAsContextTemplate } from '@prc/components';
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, store as blockEditorStore } from '@wordpress/block-editor';
import { useMemo, useState, useEffect } from '@wordpress/element';
import { getSaveElement } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { TOKEN_ATTRIBUTES } from './constants';

function PseudoInnerBlock({clientId}) {
	const attributes = useSelect((select) => {
		// Get the first block in the innerblocks for client id and return its attributes
		const innerBlocks = select(blockEditorStore).getBlock(clientId)?.innerBlocks;
		return innerBlocks?.[0]?.attributes || {};
	}, [clientId]);
	const [pseudoAttributes, setPseudoAttributes] = useState(attributes);
	useEffect(() => {
		setPseudoAttributes({
			...attributes,
			text: 'Reset',
			backgroundColor: 'ui-white',
		});
	}, [attributes]);
	const saveElement = getSaveElement('core/button', pseudoAttributes);
	return (
		<>
			{saveElement}
		</>
	);
}

export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
	insertBlocksAfter,
	__unstableLayoutClassNames: layoutClassNames,
}) {
	const { label } = attributes;
	const blockProps = useBlockProps({
		className: clsx( layoutClassNames ),
	});

	const contextTokens = context?.['tokens/list'] || [];
	const tokens = useMemo(() => {
		return [
			{
				label: 'Token Label 1',
			},
			{
				label: 'Token Label 2',
			},
			{
				label: 'Token Label 3',
			},
		];
	}, [contextTokens]);

	return (
		<div {...blockProps}>
			<RichText
				tagName="label"
				value={label}
				onChange={(value) => setAttributes({ label: value })}
				placeholder={__('Filtered by...', 'prc-block-library')}
			/>
			<InnerBlocksAsContextTemplate {...{
				clientId,
				blockContexts: tokens,
				allowedBlocks: ['core/button'],
				template: [['core/button', {
					...TOKEN_ATTRIBUTES,
				}]],
				isResolving: false,
				loadingLabel: 'Configuring tokens...',
				wrapperProps: {
					className: 'prc-block-tokens-list__tokens',
				},
			}}/>
			<PseudoInnerBlock clientId={clientId} />
		</div>
	);
}
