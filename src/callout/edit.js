import { InnerBlocks } from '@wordpress/block-editor';
import { Segment } from 'semantic-ui-react';

const ALLOWED_BLOCKS = [
    'core/image',
    'core/paragraph',
    'core/heading',
    'core/list',
    'prc-block/button',
];

const TEMPLATE = [['core/heading', {content: 'Heading Here', level: 4}]];

const Controls = () => {
    return dropdown with various width options
}

const edit = ({ className }) => {
    return (
        <Segment inverted className={`${className} beige`}>
            <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE}/>
        </Segment>
    );
};

export default edit;
