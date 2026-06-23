/**
 * Block Bindings for Form Result Message
 *
 * Provides a binding source so inner paragraph blocks can bind their content
 * to the parent form's runtime result message via the Interactivity API.
 */

/**
 * WordPress Dependencies
 */
import {
	registerBlockBindingsSource,
	registerBlockVariation,
} from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

export default function registerFormMessageBinding() {
	registerBlockBindingsSource({
		name: 'prc-block/form-message',
		label: __('Form Result Message', 'prc-block-library'),
		usesContext: [],
		getValues() {
			return {
				placeholder: __(
					'Form result message will appear here…',
					'prc-block-library'
				),
			};
		},
		canUserEditValue() {
			return false;
		},
	});

	registerBlockVariation('core/paragraph', {
		name: 'prc-block-form-result-message',
		title: __('Form: Result Message', 'prc-block-library'),
		description: __(
			'Displays the form result message after submission.',
			'prc-block-library'
		),
		attributes: {
			metadata: {
				bindings: {
					content: {
						source: 'prc-block/form-message',
					},
				},
			},
		},
		ancestor: ['prc-block/form-message'],
		isActive: (blockAttributes, variationAttributes) => {
			return (
				blockAttributes.metadata?.bindings?.content?.source ===
				variationAttributes.metadata?.bindings.content.source
			);
		},
	});
}
