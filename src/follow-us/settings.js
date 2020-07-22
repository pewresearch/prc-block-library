import { __ } from '@wordpress/i18n';
import { share as icon } from '@wordpress/icons';
import edit from './edit';
import save from './save';

const settings = {
    title: __('Follow Us'),
    icon,
    category: 'widgets',
    keywords: [__('prc'), __('newsletter'), __('follow us')],
    supports: {
        html: false,
    },
    attributes: {
        newsletters: {
            type: 'string',
            default: '',
        },
        socialMedia: {
            type: 'string',
            source: 'html',
            selector: '.ui.link.list',
            multiline: 'li',
            default: '<li><a href="#">Twitter</a></li>',
        },
    },
    edit,
    save,
};

export default settings;
