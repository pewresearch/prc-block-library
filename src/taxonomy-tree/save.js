import { Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { CollapsibleList } from 'shared';

const save = ({ attributes, className }) => {
    const { heading } = attributes;
    return (
        <div className={className}>
            <CollapsibleList heading={heading} chevron={true} setAttributes={false}>
                <InnerBlocks.Content />
            </CollapsibleList>
        </div>
    );
};

export default save;
