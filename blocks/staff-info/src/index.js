/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

registerBlockVariation('core/image', {
	name: 'Staff Photo',
	title: 'Staff Photo Binding',
	attributes: {
		metadata: {
			url: 'https://place-hold.it/200x200/aaa/Profil',
			bindings: {
				url: {
					source: 'prc-platform/staff-info',
					args: {
						valueToFetch: 'photo',
					},
				},
				title: {
					source: 'prc-platform/staff-info',
					args: {
						valueToFetch: 'photo',
					},
				},
				alt: {
					source: 'prc-platform/staff-info',
					args: {
						valueToFetch: 'photo',
					},
				},
			},
		},
	},
});

registerBlockVariation('core/paragraph', {
	name: 'Staff Expertise',
	title: 'Staff Expertise Binding',
	attributes: {
		content:
			'<a class="wp-block-prc-block-staff-context-provider__expertise-link" href="#">Expertise</a>, <a class="wp-block-prc-block-staff-context-provider__expertise-link" href="#">Expertise</a>',
		metadata: {
			bindings: {
				content: {
					source: 'prc-platform/staff-info',
					args: {
						valueToFetch: 'expertise',
					},
				},
			},
		},
	},
});

registerBlockVariation('core/paragraph', {
	name: 'Staff Bio',
	title: 'Staff Bio Binding',
	attributes: {
		content:
			'Adipisicing fugiat veniam sunt tempor est anim laboris reprehenderit esse labore ut ea. Reprehenderit excepteur pariatur eu fugiat eu. Ipsum aliquip voluptate fugiat magna labore Lorem ex nulla nisi labore sit. Est reprehenderit aute anim qui commodo quis incididunt. Esse eu Lorem enim duis elit laboris pariatur esse pariatur adipisicing reprehenderit in non. Consectetur eu deserunt adipisicing in est fugiat pariatur voluptate eiusmod magna incididunt.',
		metadata: {
			bindings: {
				content: {
					source: 'prc-platform/staff-info',
					args: {
						valueToFetch: 'bio',
					},
				},
			},
		},
	},
});

registerBlockVariation('core/paragraph', {
	name: 'Staff Mini Bio',
	title: 'Staff Mini Bio Binding',
	attributes: {
		content:
			'<p><a href="#">Commodo Duis</a> is a research analyst focusing on social and demographic research at Pew Research Center.</p>',
		metadata: {
			bindings: {
				content: {
					source: 'prc-platform/staff-info',
					args: {
						valueToFetch: 'mini_bio',
					},
				},
			},
		},
	},
});

registerBlockVariation('core/paragraph', {
	name: 'Staff Job Title',
	title: 'Staff Job Title Binding',
	attributes: {
		content: 'Research Associate',
		metadata: {
			bindings: {
				content: {
					source: 'prc-platform/staff-info',
					args: {
						valueToFetch: 'job_title',
					},
				},
			},
		},
	},
});

registerBlockVariation('core/paragraph', {
	name: 'Staff Job Title Extended',
	title: 'Staff Job Title Extended Binding',
	attributes: {
		content:
			'a research analyst focusing on social and demographic research at Pew Research Center',
		metadata: {
			bindings: {
				content: {
					source: 'prc-platform/staff-info',
					args: {
						valueToFetch: 'job_title_extended',
					},
				},
			},
		},
	},
});

registerBlockVariation('core/heading', {
	name: 'Staff Name (Heading)',
	title: 'Staff Name Binding (Heading)',
	attributes: {
		level: 3,
		content: 'Commodo Duis',
		metadata: {
			bindings: {
				content: {
					source: 'prc-platform/staff-info',
					args: {
						valueToFetch: 'name',
					},
				},
			},
		},
	},
});

registerBlockVariation('core/paragraph', {
	name: 'Staff Name',
	title: 'Staff Name Binding (Paragaph)',
	attributes: {
		content: 'Commodo Duis',
		metadata: {
			bindings: {
				content: {
					source: 'prc-platform/staff-info',
					args: {
						valueToFetch: 'name',
					},
				},
			},
		},
	},
});

registerBlockVariation('core/paragraph', {
	name: 'Staff Name Link',
	title: 'Staff Name Binding (Paragaph/Link)',
	attributes: {
		content: '<a href="#">Commodo Duis</a>',
		metadata: {
			bindings: {
				content: {
					source: 'prc-platform/staff-info',
					args: {
						valueToFetch: 'name',
						outputLink: true,
					},
				},
			},
		},
	},
});
