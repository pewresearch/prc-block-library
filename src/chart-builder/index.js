import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import edit from './edit';
import save from './save';
import metadata from './block.json';
import './styles.css';

const { name } = metadata;
const settings = {
    title: __('Chart Builder'),
    icon: 'chart-line',
    description: __('Chart element for Chart Builder.'),
    keywords: [__('chart')],
    example: {
        attributes: {
            chartType: 'bar',
            className: 'is-style-bar',
        },
    },
    edit,
    save,
};
console.log(name);

registerBlockType(name, { ...metadata, ...settings });
