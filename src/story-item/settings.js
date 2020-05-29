import { __ } from '@wordpress/i18n';
import * as moment from 'moment';
import edit from './edit';
import save from './save';

const todaysDate = () => {
    return moment().format('MM-DD-YYYY');
};

const settings = [
    'prc-block/story-item',
    {
        // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
        title: __('Story Item'), // Block title.
        icon: 'format-aside', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
        category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
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
                excerpt: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>',
                extra: '<li></li>',
                // Item Meta
                link: '#',
                label: 'Report',
                date: todaysDate(),
                // Images
                image: 'https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg',
                imageSlot: 'top',
                imageSize: 'A2',
            },
        },
        supports: {
            html: false, // We do not want to give people the ability to edit the raw html of this block.
        },
        // Attributes are really react props.
        attributes: {
            // Item Content
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
            // Item Meta
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
                // source: 'html',
                // selector: '.date',
                // default: todaysDate(),
            },
            // Images
            image: {
                type: 'string',
                default: '',
            },
            imageSlot: {
                type: 'string',
                default: 'disabled',
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
            emphasis: {
                type: 'boolean',
                default: false,
            },
            horizontal: {
                type: 'boolean',
                default: false,
            },
            stacked: {
                type: 'boolean',
                default: true,
            },
            enableHeader: {
                type: 'boolean',
                default: true,
            },
            enableExcerpt: {
                type: 'boolean',
                default: true,
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
            headerSize: {
                type: 'string',
                default: 'normal',
            },
        },
        edit,
        // Seth Learning Note: SO save literally only transforms on post_content filter. You won't see this result inside the gutenberg editor, you will however see it if you look at code view.
        save,
    }
];

export default settings;
