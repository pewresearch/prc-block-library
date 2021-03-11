/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    category as categoryIcon,
    page as pageIcon,
    postTitle as postIcon,
    tag as tagIcon,
} from '@wordpress/icons';

export default [
    {
        name: 'link',
        isDefault: true,
        title: __('Link'),
        description: __('A link to a URL.'),
        attributes: {},
    },
    {
        name: 'page',
        icon: pageIcon,
        title: __('Page Link'),
        description: __('A link to a page.'),
        attributes: { type: 'page' },
    },
    {
        name: 'topic',
        icon: categoryIcon,
        title: __('Topic Page Link'),
        description: __('A link to a topic.'),
        attributes: { type: 'topic' },
    },
    {
        name: 'formats',
        icon: tagIcon,
        title: __('Format Link'),
        description: __('A link to a format.'),
        attributes: { type: 'formats' },
    },
    {
        name: 'programs',
        icon: tagIcon,
        title: __('Program Link'),
        description: __('A link to a program.'),
        attributes: { type: 'programs' },
    },
];
