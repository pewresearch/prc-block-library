import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { Accordion, Icon } from 'semantic-ui-react';

const ALLOWED_BLOCKS = ['core/paragraph', 'core/heading', 'core/list', 'prc-block/button'];

const edit = ({attributes, setAttributes}) => {
    const { title, className } = attributes;
    const [ open, setState ] = useState(true);

    let icon = open ? 'caret down' : 'caret right';
    if ( 'is-style-secondary' === className ) {
        icon = open ? 'minus' : 'plus';
    }

    return( 
        <Accordion styled>
            <Accordion.Title
            active={open === true}
            index={0}
            className={className}
            >
                { 'is-style-secondary' !== className && (
                    <Icon name={icon} onClick={ () => setState( ! open ) } />
                ) }
                <RichText
                    tagName="div" // The tag here is the element output and editable in the admin
                    value={title} // Any existing content, either from the database or an attribute default
                    onChange={t => setAttributes({ title: t })} // Store updated content as a block attribute
                    placeholder="How we did this" // Display this text before any content has been added by the user
                    formattingControls={[]}
                    keepPlaceholderOnFocus
                    style={{
                        display: 'inline-block'
                    }}
                />
                { 'is-style-secondary' === className && (
                    <Icon name={icon} onClick={ () => setState( ! open ) } style={{marginLeft: '1em'}}/>
                ) }
            </Accordion.Title>
            <Accordion.Content active={ open === true }>
                <InnerBlocks allowedBlocks={ALLOWED_BLOCKS}/>
            </Accordion.Content>
        </Accordion>
    );
}

export default edit;