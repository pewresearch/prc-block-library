import { InnerBlocks } from '@wordpress/block-editor';
import { Segment } from 'semantic-ui-react';

const save = ({className}) => {
    return( <Segment inverted className={className + ' oatmeal'}><InnerBlocks.Content/></Segment> );
}

export default save;