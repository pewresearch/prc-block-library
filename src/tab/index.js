/**
 * WordPress Dependencies
 */
import {
	registerBlockType,
	registerBlockVariation,
	registerBlockBindingsSource,
} from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import './style.scss';
import edit from './edit';
import icon from './icon';
import save from './save';

import metadata from './block.json';

const { name } = metadata;

const settings = {
	icon,
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });

const allowedAttributes = ['content'];

registerBlockBindingsSource({
	name: 'tab/label',
	usesContext: ['tab/label'],
	getValues({ select, bindings }) {
		const values = {};
		for (const [attributeName, source] of Object.entries(bindings)) {
			if (allowedAttributes.includes(source.args.key)) {
				values[attributeName] = 'Tab title';
			}
		}
		return values;
	},
	// setValues({ dispatch, bindings }) {
	// 	const newValues = {};
	// 	for (const [attributeName, source] of Object.entries(bindings)) {
	// 		if (allowedAttributes.includes(source.args.key)) {
	// 			newValues[source.args.key] = source.newValue;
	// 		}
	// 	}
	// 	if (Object.keys(newValues).length > 0) {
	// 		dispatch(coreEditorStore).editPost(newValues);
	// 	}
	// },
	canUserEditValue({ context, args }) {
		return (
			allowedAttributes.includes(args.key) && 'post' === context.postType
		);
	},
});

registerBlockVariation('core/paragraph', {
	name: 'prc-block-tab-label',
	title: 'Tab: Label',
	category: 'text',
	attributes: {
		content: 'Tab label',
		metadata: {
			bindings: {
				content: {
					source: 'prc-block/tab',
					args: {
						contextValueToGet: 'tab/label',
					},
				},
			},
		},
	},
});

registerBlockVariation('core/heading', {
	name: 'prc-block-tab-label',
	title: 'Tab: Label',
	category: 'text',
	attributes: {
		content: 'Tab label',
		level: 3,
		metadata: {
			bindings: {
				content: {
					source: 'prc-block/tab',
					args: {
						contextValueToGet: 'tab/label',
					},
				},
			},
		},
	},
});
