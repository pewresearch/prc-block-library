/**
 * Block bindings for prc-platform/version.
 */
import { defineBindingSource } from '@prc/functions';
import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';

defineBindingSource({
	name: 'prc-platform/version',
	label: __('Version Info', 'prc-block-library'),
	fields: [
		{
			label: __('Platform Version', 'prc-block-library'),
			type: 'string',
			args: { module: 'platform' },
		},
		{
			label: __('Block Library Version', 'prc-block-library'),
			type: 'string',
			args: { module: 'block-library' },
		},
	],
	getValues({ bindings }) {
		const values = {};

		for (const [attributeName, binding] of Object.entries(bindings ?? {})) {
			const module = binding?.args?.module ?? 'platform';
			values[attributeName] =
				'block-library' === module
					? __('Version: block library', 'prc-block-library')
					: __('Version: platform', 'prc-block-library');
		}

		return values;
	},
	canUserEditValue() {
		return false;
	},
});

registerBlockVariation('core/paragraph', {
	name: 'version-info',
	title: 'Version Info',
	attributes: {
		placeholder: 'Version: 1.2.0 "Spiteful Washington"',
		metadata: {
			bindings: {
				content: {
					source: 'prc-platform/version',
					args: {
						module: 'platform',
					},
				},
			},
		},
	},
	scope: ['inserter'],
});
