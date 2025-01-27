/**
 * External Dependencies
 */
const { join } = require('path');

const DEFAULT_SUPPORTS = {
	anchor: true,
	html: false,
};

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
};

const VARIANTS = {
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
		},
		templateVariant: 'default',
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
		},
		templateVariant: 'dynamic',
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
		},
		templateVariant: 'syncedEntity',
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
		viewScriptModule: "file:./view.js",
		templateVariant: 'contextProvider',
	},
	coreBlock: {
		templateVariant: 'core'
	},
};

/**
 * Function to escape HTML special characters
 * @param {string} unsafe - The string to be ecscaped
 * @returns {string} - The escaped string
 */
function escapeHtml(unsafe) {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

module.exports = {
	defaultValues: {
		namespace: 'prc-block',
		author: 'Pew Research Center',
		pluginURI: `https://github.com/pewresearch/prc-block-library/`,
		transformer: ( view ) => {
			const { slug } = view;
			const capitalizedSnakeCase = slug
				.split('-')
				.map(word => word.charAt(0).toUpperCase() + word.slice(1))
				.join('_');
			const coreBlockName = escapeHtml(slug.replace( 'core-', 'core/' ));
			return {
				...view,
				capitalizedSnakeCase,
				coreBlockName,
			}
		},
	},
	variants: VARIANTS,
	blockTemplatesPath: join(__dirname, 'block-templates'),
	assetsPath: join(__dirname, 'assets'),
};
