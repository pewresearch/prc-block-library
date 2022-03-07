/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { navigation as icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import variations from './variations';
import './style.scss';

const { name } = metadata;

const settings = {
    title: __('Menu'),
    icon,
    description: __('A collection of links as blocks to create menus.'),
    keywords: [__('menu'), __('navigation'), __('links')],
    variations,
    example: {
        attributes: {
            orientation: 'vertical',
        },
        innerBlocks: [
            {
                name: 'prc-block/menu-link',
                attributes: {
                    // translators: 'Home' as in a website's home page.
                    label: __('Home'),
                    url: 'https://make.wordpress.org/',
                },
            },
            {
                name: 'prc-block/menu-link',
                attributes: {
                    // translators: 'About' as in a website's about page.
                    label: __('About'),
                    url: 'https://make.wordpress.org/',
                },
            },
            {
                name: 'prc-block/menu-link',
                attributes: {
                    // translators: 'Contact' as in a website's contact page.
                    label: __('Contact'),
                    url: 'https://make.wordpress.org/',
                },
            },
        ],
    },
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
