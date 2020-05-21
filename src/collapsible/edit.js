import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { Accordion, Icon } from 'semantic-ui-react';

const edit = ({attributes, className, setAttributes}) => {
    const { title } = attributes;
    const [ open, setState ] = useState(true);
    let direction = open ? 'down' : 'right';
    return( 
        <Accordion styled>
            <Accordion.Title
            active={open ===  true}
            index={0}
            >
                <Icon name={'caret ' + direction} onClick={ () => setState( ! open ) } />
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
            </Accordion.Title>
            <Accordion.Content active={ open === true }>
                <InnerBlocks/>
            </Accordion.Content>
        </Accordion>
    );
}

export default edit;