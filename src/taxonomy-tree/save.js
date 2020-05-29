import { Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { ListTitle } from './components';

const save = ({ attributes, className }) => {
    const { heading } = attributes;
    return (
        <div className={className}>
            <ListTitle heading={heading} setAttributes={false}/>
            <div class="content">
                <InnerBlocks.Content />
            </div>
        </div>
    );
};

export default save;
