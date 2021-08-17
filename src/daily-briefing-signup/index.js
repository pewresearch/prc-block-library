/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import './style.scss';

const { name } = metadata;

const settings = {
    title: __('Daily Briefing Signup'),
    description: 'Displays the latest Daily Briefing post and a mailchimp form to signup.',
    keywords: [__('Journalism'), __('Daily Briefing'), __('mailchimp')],
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
