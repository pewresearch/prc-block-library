import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';
import { Icon } from 'semantic-ui-react';

const ListTitle = ({heading, setAttributes}) => {
    return(
        <div className="title">
            <div><Icon name="caret down" /></div>
            {false !== setAttributes && (
                <RichText
                    tagName="h2"
                    value={heading}
                    onChange={h => setAttributes({ heading: h })}
                    placeholder="Politics"
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
            <div><Icon name="chevron right" size="large" /></div>
        </div>
    );
}

export default ListTitle;