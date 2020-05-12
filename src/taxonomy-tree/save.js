import { Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { ListTitle } from './components';

const save = ({ attributes, className }) => {
    const { heading } = attributes;
    return (
        <div className={className}>
            <ListTitle heading={heading} setAttributes={false}/>
            <InnerBlocks.Content />
        </div>
    );
};

export default save;
