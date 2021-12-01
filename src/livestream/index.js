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
import './styles.scss';

const { name } = metadata;

const settings = {
    title: __('Livestream'),
    description: 'Create Embeddable Livestream with Chat.',
    keywords: [__('Livestream'), __('Stream'), __('Chat')],
    icon: 'embed-video',
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
