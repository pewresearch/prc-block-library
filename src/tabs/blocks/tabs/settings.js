import { __ } from "@wordpress/i18n";
import edit from './edit.js';
import save from './save.js';

const settings = ['prc-block/tabs', {
    title: __('Tabs'),
    description: __('Create content organized in tabs.'),
    icon: 'universal-access-alt',
    category: 'widgets',
    supports: {
      align: [ 'wide', 'full' ],
      html: true,
      className: true,
    },
    styles: [
      {
        name: 'default',
        label: 'Default',
        isDefault: true,
      },
      {
        name: 'secondary',
        label: 'Secondary',
      }
    ],
    attributes: {
      titles : {
        type: "array",
        source: "query",
        selector: ".ui.menu > .item",
        query : {
          content: {
            type: "string",
            source: "text"
          }
        }
      },
    },
    example: {},
    edit,
    save
}];

export default settings;
