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
		name: 'tab/label',
		usesContext: ['tab/label'],
		getValues({ select, context }) {
			const tabLabel = context['tab/label'];
			if (tabLabel) {
				return {
					content: tabLabel,
				};
			}

			return {
				placeholder: __('Enter tab label', 'prc-quiz'),
			};
		},
		setValues({ select, dispatch, context, bindings }) {
			const { newValue } = bindings.content;
			const {
				getSelectedBlockClientId,
				getBlockRootClientId,
				getBlockParentsByBlockName,
			} = select(blockEditorStore);
			const { updateBlockAttributes } = dispatch(blockEditorStore);

			// Get the currently selected tab block.
			const selectedBlockClientId = getSelectedBlockClientId();

			// Find the root, tab block, update the label.
			const tabBlockClientIds = getBlockParentsByBlockName(
				selectedBlockClientId,
				'prc-block/tab'
			);
			// Get the first tab block.
			const tabBlockClientId = tabBlockClientIds[0];
			console.log('tabBlockClientId', tabBlockClientId);

			updateBlockAttributes(tabBlockClientId, {
				label: newValue,
			});
		},
		canUserEditValue({ select, context, args }) {
			return true;
		},
	});
	registerBlockVariation('core/paragraph', {
		name: 'tab/label',
		title: __('Tab Label', 'prc-block-library'),
		description: __('Tab Label', 'prc-block-library'),
		attributes: {
			metadata: {
				bindings: {
					content: { source: 'tab/label' },
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
		name: 'tab/label',
		title: __('Tab Label', 'prc-block-library'),
		description: __('Tab Label', 'prc-block-library'),
		attributes: {
			metadata: {
				bindings: {
					content: { source: 'tab/label' },
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
