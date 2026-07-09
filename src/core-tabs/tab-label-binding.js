/**
 * WordPress Dependencies.
 */
import { registerBlockVariation } from '@wordpress/blocks';
import { defineBindingSource } from '@prc/functions';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const TAB_LABEL_VARIATION = {
	name: 'core/tab-label',
	title: __('Tab Label', 'prc-block-library'),
	description: __('Tab Label', 'prc-block-library'),
	attributes: {
		metadata: {
			bindings: {
				content: { source: 'core/tab-label' },
			},
		},
	},
	ancestor: ['core/tab-panel'],
	scope: ['inserter'],
	isActive: (blockAttributes, variationAttributes) => {
		return (
			blockAttributes.metadata?.bindings?.content?.source ===
			variationAttributes.metadata?.bindings.content.source
		);
	},
};

export default function registerTabLabelBinding() {
	defineBindingSource({
		name: 'core/tab-label',
		label: __('Tab Label', 'prc-block-library'),
		usesContext: ['core/tab-label'],
		fields: [
			{
				label: __('Tab Label', 'prc-block-library'),
				type: 'string',
				args: {},
			},
		],
		getValues({ context }) {
			const tabLabel = context['core/tab-label'];
			if (tabLabel) {
				return {
					content: tabLabel,
				};
			}

			return {
				placeholder: __('Enter tab label', 'prc-quiz'),
			};
		},
		setValues({ select, dispatch, bindings }) {
			const { newValue } = bindings.content;
			const { getSelectedBlockClientId, getBlockParentsByBlockName } =
				select(blockEditorStore);
			const { updateBlockAttributes } = dispatch(blockEditorStore);

			const selectedBlockClientId = getSelectedBlockClientId();
			const tabBlockClientIds = getBlockParentsByBlockName(
				selectedBlockClientId,
				'core/tab-panel'
			);
			const tabBlockClientId = tabBlockClientIds[0];

			updateBlockAttributes(tabBlockClientId, {
				label: newValue,
			});
		},
		canUserEditValue() {
			return true;
		},
	});

	registerBlockVariation('core/paragraph', TAB_LABEL_VARIATION);
	registerBlockVariation('core/heading', TAB_LABEL_VARIATION);
}
