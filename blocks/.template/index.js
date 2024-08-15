/**
 * External Dependencies
 */
const { join } = require('path');

const DEFAULT_SUPPORTS = {
	anchor: true,
	html: false,
}

const EXTRA_SUPPORTS = {
	spacing: {
		blockGap: true,
		margin: ['top', 'bottom'],
		padding: true,
		__experimentalDefaultControls: {
			padding: true,
		},
	},
	typography: {
		fontSize: true,
		__experimentalFontFamily: true,
		__experimentalDefaultControls: {
			fontSize: true,
			__experimentalFontFamily: true,
		},
	},
}

module.exports = {
	defaultValues: {
		namespace: 'prc-block',
		author: 'Pew Research Center',
		pluginURI: `https://github.com/pewresearch/pewresearch-org/blob/main/plugins/prc-block-library/blocks/`,
	},
	variants: {
		default: {
			render: 'file:./render.php',
			attributes: {
				allowedBlocks: {
					type: 'array',
				},
				orientation: {
					type: 'string',
					default: 'vertical',
				}
			},
			supports: {
				...DEFAULT_SUPPORTS,
				...EXTRA_SUPPORTS,
			}
		},
		dynamic: {
			attributes: {
				allowedBlocks: {
					type: 'array',
				},
				orientation: {
					type: 'string',
					default: 'vertical',
				}
			},
			supports: {
				...DEFAULT_SUPPORTS,
				...EXTRA_SUPPORTS,
			}
		},
		syncedEntity: {
			attributes: {
				ref: {
					type: 'number',
				},
				allowedBlocks: {
					type: 'array',
				},
			},
			supports: {
				...DEFAULT_SUPPORTS,
				...EXTRA_SUPPORTS,
			}
		},
		contextProvider: {
			attributes: {
				allowedBlocks: {
					type: 'array',
				},
			},
			supports: {
				anchor: false,
				html: false,
				reusable: false,
				multiple: false,
				interactivity: {
					clientNavigation: true
				}
			},
			usesContext: [
				"postType",
				"templateSlug",
				"previewPostType",
			],
			viewScriptModule: "file:./view.js"
		},
		static: {
			supports: {
				...DEFAULT_SUPPORTS,
				...EXTRA_SUPPORTS,
			}
		},
		coreBlock: {},
	},
	pluginTemplatesPath: join(__dirname, 'plugin-templates'),
	blockTemplatesPath: join(__dirname, 'block-templates'),
	assetsPath: join(__dirname, 'assets'),
};
