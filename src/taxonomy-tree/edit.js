import { Fragment } from '@wordpress/element';
import { RichText, InnerBlocks } from '@wordpress/block-editor';
import { Icon } from 'semantic-ui-react';

const ALLOWED_BLOCKS = ['prc-block/taxonomy-tree-list'];

const edit = ({ attributes, className, setAttributes }) => {
    const { heading } = attributes;
    return (
        <div className={className}>
            <div className="title">
                <RichText
                    tagName="h2"
                    value={heading}
                    onChange={h => setAttributes({ heading: h })}
                    placeholder="Politics"
                    formattingControls={['link']}
                    keepPlaceholderOnFocus
                    className="sans-serif"
                />
                <Icon name="chevron right" size="large" />
            </div>
            <InnerBlocks
                allowedBlocks={ALLOWED_BLOCKS}
                // __experimentalCaptureToolbars
            />
        </div>
    );
};

export default edit;
