import { InnerBlocks } from '@wordpress/block-editor';
import { Segment } from 'semantic-ui-react';

const ALLOWED_BLOCKS = [
    'core/paragraph',
    'core/heading',
    'core/image',
    'core/list',
    'prc-block/button',
];

const edit = ({ className }) => {
    return (
        <Segment inverted className={`${className} beige`}>
            <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
        </Segment>
    );
};

export default edit;
