import { Fragment } from '@wordpress/element';
import { RichText, InnerBlocks } from '@wordpress/block-editor';
import { Icon } from 'semantic-ui-react';

const save = ({ attributes, className }) => {
    const { heading } = attributes;
    return (
        <div className={className}>
            <div className="title">
                <RichText.Content tagName="h2" value={heading} className="sans-serif"/>
                <Icon name="chevron right" />
            </div>
            <InnerBlocks.Content />
        </div>
    );
};

export default save;
