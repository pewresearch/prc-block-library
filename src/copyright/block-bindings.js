/**
 * Block bindings for prc-platform/copyright.
 */
import { defineBindingSource } from '@prc/functions';
import { __ } from '@wordpress/i18n';

defineBindingSource({
	name: 'prc-platform/copyright',
	label: __('Copyright', 'prc-block-library'),
	fields: [
		{
			label: __('Copyright Disclaimer', 'prc-block-library'),
			type: 'string',
			args: {},
		},
	],
	getValues({ bindings }) {
		const year = new Date().getFullYear();
		const preview = `© ${year} Pew Research Center`;
		const values = {};

		for (const attributeName of Object.keys(bindings ?? {})) {
			values[attributeName] = preview;
		}

		return values;
	},
	canUserEditValue() {
		return false;
	},
});
