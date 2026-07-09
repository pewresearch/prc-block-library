/**
 * Block Bindings for Dialog Element Label
 *
 * Provides a binding source so inner paragraph blocks can bind their content
 * directly to the parent Dialog Element block's `dialogLabel` attribute.
 */

/**
 * WordPress Dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';
import { defineBindingSource } from '@prc/functions';
import { __ } from '@wordpress/i18n';
import { store as blockEditorStore } from '@wordpress/block-editor';

export default function registerDialogElementLabelBinding() {
	defineBindingSource({
		name: 'prc-block/dialog-element-label',
		label: __('Dialog Element Label', 'prc-block-library'),
		usesContext: ['dialog/label'],
		fields: [
			{
				label: __('Dialog Label', 'prc-block-library'),
				type: 'string',
				args: {},
			},
		],
		getValues({ context }) {
			const dialogLabel = context['dialog/label'] ?? null;
			if (dialogLabel) {
				return { content: dialogLabel };
			}
			return {
				placeholder: __('Add a dialog label…', 'prc-block-library'),
			};
		},
		setValues({ select, dispatch, bindings }) {
			const { newValue } = bindings.content;
			const {
				getSelectedBlockClientId,
				getBlockRootClientId,
				getBlockName,
			} = select(blockEditorStore);

			const selectedBlockClientId = getSelectedBlockClientId();
			if (!selectedBlockClientId) {
				return;
			}
			const rootClientId = getBlockRootClientId(selectedBlockClientId);
			if (!rootClientId) {
				return;
			}
			const rootName = getBlockName(rootClientId);
			if ('prc-block/dialog-element' !== rootName) {
				return;
			}
			const { updateBlockAttributes } = dispatch(blockEditorStore);
			updateBlockAttributes(rootClientId, { dialogLabel: newValue });
		},
		canUserEditValue() {
			return true;
		},
	});

	registerBlockVariation('core/heading', {
		name: 'prc-block-dialog-element-label',
		title: __('Dialog Label', 'prc-block-library'),
		description: __(
			'Displays and edits the dialog element label (for accessibility).',
			'prc-block-library'
		),
		attributes: {
			placeholder: __('Add a dialog label…', 'prc-block-library'),
			level: 2,
			metadata: {
				bindings: {
					content: {
						source: 'prc-block/dialog-element-label',
					},
				},
			},
		},
		ancestor: ['prc-block/dialog-element'],
		scope: ['inserter'],
		isActive: (blockAttributes, variationAttributes) => {
			return (
				blockAttributes.metadata?.bindings?.content?.source ===
				variationAttributes.metadata?.bindings.content.source
			);
		},
	});
}
