import { Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { CollapsibleList } from 'shared';

const ALLOWED_BLOCKS = ['prc-block/taxonomy-tree-list'];

const edit = ({ attributes, className, setAttributes }) => {
    const { heading } = attributes;
    return (
        <div className={className}>
            <CollapsibleList heading={heading} chevron={true} setAttributes={setAttributes}>
                <InnerBlocks
                    allowedBlocks={ALLOWED_BLOCKS}
                />
            </CollapsibleList>
        </div>
    );
};

export default edit;
