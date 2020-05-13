import { Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { ListTitle } from './components';

const ALLOWED_BLOCKS = ['prc-block/taxonomy-tree-list'];

const edit = ({ attributes, className, setAttributes }) => {
    const { heading } = attributes;
    return (
        <div className={className}>
            <ListTitle heading={heading} setAttributes={setAttributes}/>
            <InnerBlocks
                allowedBlocks={ALLOWED_BLOCKS}
            />
        </div>
    );
};

export default edit;
