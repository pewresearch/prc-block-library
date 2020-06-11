import './style.scss';
import { RichText } from '@wordpress/block-editor';
import { Icon } from 'semantic-ui-react';

const CollapsibleList = ({
    heading,
    chevron,
    placeholder,
    setAttributes,
    children,
}) => {
    return (
        <div className="prc-collapsible-list">
            <div className="title">
                <div>
                    <Icon name="caret down" />
                </div>
                {false !== setAttributes && (
                    <RichText
                        tagName="h2"
                        value={heading}
                        onChange={h => setAttributes({ heading: h })}
                        placeholder={placeholder}
                        formattingControls={['link']}
                        keepPlaceholderOnFocus
                        className="sans-serif"
                    />
                )}
                {false === setAttributes && (
                    <RichText.Content
                        tagName="h2"
                        value={heading}
                        className="sans-serif"
                    />
                )}
                {true === chevron && (
                    <div>
                        <Icon name="chevron right" size="large" />
                    </div>
                )}
            </div>
            <div className="content">{children}</div>
        </div>
    );
};

export default CollapsibleList;
