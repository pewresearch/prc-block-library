import { __ } from "@wordpress/i18n";
import edit from './edit';
import save from './save';

const settings = [ 'prc-block/pane', {
  title: __('Pane'),
  parent: [ 'prc-block/tabs' ],
  description: __('A single pane within the tabs layout.'),
  icon: 'universal-access-alt',
  category: 'widgets',
  supports: {
   inserter: false,
   reusable: false,
   html: false,
   lightBlockWrapper: false,
 },
 attributes: {
   key: {
       type: 'string',
       source: 'attribute',
       selector: '.segment',
       attribute: 'data-tab',
   }
 },
edit,
save,
} ];

export default settings;
