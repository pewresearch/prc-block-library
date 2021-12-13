/**
 * WordPress Dependencies
 */
import * as moment from 'moment';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import depcreated from './deprecated';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import transforms from './transforms';
import variations from './variations';
import './style.scss';

const { name } = metadata;

const settings = {
    example: {
        attributes: {
            title: 'Ultricies Ipsum Nibh Egestas Purus',
            description:
                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>',
            label: 'Report',
            date: moment().format('MM-DD-YYYY'),
            image:
                'https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg',
            imageSlot: 'top',
            imageSize: 'A2',
            isPreview: true,
        },
    },
    depcreated,
    variations,
    transforms,
    edit,
    save,
};

registerBlockType(name, { ...metadata, ...settings });
