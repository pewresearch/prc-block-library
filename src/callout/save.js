import { InnerBlocks } from '@wordpress/block-editor';
import { Segment } from 'semantic-ui-react';
import { getClassName } from './helpers';

const save = ({ className, attributes }) => {
    const { size } = attributes;
    return (
        <Segment inverted className={getClassName(`${className} beige`, size)}>
            <InnerBlocks.Content />
        </Segment>
    );
};

export default save;
