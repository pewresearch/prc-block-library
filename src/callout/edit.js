import { InnerBlocks } from '@wordpress/block-editor';
import { Segment } from 'semantic-ui-react';

const edit = ({className}) => {
    return( <Segment inverted className={className + ' oatmeal'}><InnerBlocks/></Segment> );
}

export default edit;