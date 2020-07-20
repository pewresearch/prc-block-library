import { __ } from '@wordpress/i18n';
import * as moment from 'moment';
import edit from './edit';
import save from './save';
import transforms from './transforms';

const todaysDate = () => {
    return moment().format('MM-DD-YYYY');
};

const attributes = {
    title: {
        type: 'string',
        default: 'Title',
    },
    excerpt: {
        type: 'string',
        source: 'html',
        multiline: 'p',
        selector: '.description',
        default: '<p>Excerpt</p>',
    },
    extra: {
        type: 'string',
        source: 'html',
        multiline: 'li',
        selector: '.extra',
        default: '',
    },
    link: {
        type: 'string',
        default: '',
    },
    label: {
        type: 'string',
        default: 'Report',
    },
    date: {
        type: 'string',
    },
    // Images
    image: {
        type: 'string',
        default: '',
    },
    imageSlot: {
        type: 'string',
        default: 'default',
    },
    imageSize: {
        type: 'string',
        default: 'A1',
    },
    isChartArt: {
        type: 'boolean',
        default: false,
    },
    // Post Meta Data:
    postID: {
        type: 'integer',
    },
    // Item Options
    headerSize: {
        type: 'string',
        default: 'normal',
    },
    enableAltHeaderWeight: {
        type: 'boolean',
        default: false,
    },
    enableEmphasis: {
        type: 'boolean',
        default: false,
    },
    enableHeader: {
        type: 'boolean',
        default: true,
    },
    enableExcerpt: {
        type: 'boolean',
        default: true,
    },
    enableExcerptBelow: {
        type: 'boolean',
        default: false,
    },
    enableExtra: {
        type: 'boolean',
        default: false,
    },
    enableBreakingNews: {
        type: 'boolean',
        default: false,
    },
    enableProgramsTaxonomy: {
        type: 'boolean',
        default: false,
    },
};

// Version: 2.0
const settings = [
    'prc-block/story-item',
    {
        title: __('Story Item'),
        icon: 'format-aside',
        category: 'widgets',
        keywords: [__('prc'), __('story'), __('post'), __('story item')],
        styles: [
            {
                name: 'disabled',
                label: 'Image Disabled',
            },
            {
                name: 'default',
                label: 'Default Image Alignment',
                isDefault: true,
            },
            {
                name: 'top',
                label: 'Image Aligned Top',
            },
            {
                name: 'bottom',
                label: 'Image Aligned Bottom',
            },
            {
                name: 'left',
                label: 'Image Aligned Left',
            },
            {
                name: 'right',
                label: 'Image Aligned Right',
            },
        ],
        example: {
            attributes: {
                title: 'Ultricies Ipsum Nibh Egestas Purus',
                excerpt:
                    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>',
                extra: '<li></li>',
                link: '#',
                label: 'Report',
                date: todaysDate(),
                image:
                    'https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg',
                imageSlot: 'top',
                imageSize: 'A2',
            },
        },
        supports: {
            html: false, // We do not want to give people the ability to edit the raw html of this block.
        },
        attributes,
        transforms,
        edit,
        save,
    },
];

export default settings;
