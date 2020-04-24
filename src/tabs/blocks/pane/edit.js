import { Tab } from 'semantic-ui-react';
import { InnerBlocks } from '@wordpress/block-editor';

const TEMPLATE  = [['core/paragraph', { placeholder: 'Enter content...' } ]];

export default function edit(props) {
  return (
   <Tab.Pane>
     <InnerBlocks template={TEMPLATE} />
   </Tab.Pane>
 );
}
