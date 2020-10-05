import { __, _x } from '@wordpress/i18n';
import { pullquote as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

const { name, category, attributes, supports } = metadata;

const settings = [
    name,
    {
        title: __('Pullquote'),
        description: __(
            'Give special visual emphasis to a quote from your text.',
        ),
        icon,
        category,
        attributes,
        supports,
        example: {
            attributes: {
                value: `<p>${__(
                    'One of the hardest things to do in technology is disrupt yourself.',
                )}</p>`,
                citation: __('Matt Mullenweg'),
            },
        },
        styles: [
            {
                name: 'has-marks',
                label: _x('Has Marks', 'block style'),
                isDefault: true,
            },
            { name: 'no-marks', label: __('No Marks') },
        ],
        transforms,
        edit,
        save,
    },
];

export default settings;
