/**
 * WordPress Dependencies.
 */
import {
	registerBlockVariation,
	registerBlockBindingsSource,
} from '@wordpress/blocks';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function registerTabLabelBinding() {
	registerBlockBindingsSource({
		name: 'core/tab-label',
		usesContext: ['core/tab-label'],
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

			// Get the currently selected tab block.
			const selectedBlockClientId = getSelectedBlockClientId();

			// Find the root, tab block, update the label.
			const tabBlockClientIds = getBlockParentsByBlockName(
				selectedBlockClientId,
				'core/tab-panel'
			);
			// Get the first tab panel block out of the array. There is only one anyways.
			const tabBlockClientId = tabBlockClientIds[0];

			updateBlockAttributes(tabBlockClientId, {
				label: newValue,
			});
		},
		canUserEditValue() {
			return true;
		},
	});
	registerBlockVariation('core/paragraph', {
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
		isActive: (blockAttributes, variationAttributes) => {
			return (
				blockAttributes.metadata?.bindings?.content?.source ===
				variationAttributes.metadata?.bindings.content.source
			);
		},
	});
	registerBlockVariation('core/heading', {
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
		isActive: (blockAttributes, variationAttributes) => {
			return (
				blockAttributes.metadata?.bindings?.content?.source ===
				variationAttributes.metadata?.bindings.content.source
			);
		},
	});
}
