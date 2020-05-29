import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { useState, Fragment, RawHTML } from '@wordpress/element';
import { Accordion, Icon } from 'semantic-ui-react';

const ALLOWED_BLOCKS = ['core/paragraph', 'core/heading', 'core/list', 'prc-block/button'];

const AccordionBlock = ({title, className, children, setAttributes = false, defaultOpen = false}) => {
    const [ open, setState ] = useState(defaultOpen);

    let icon = open ? 'caret down' : 'caret right';
    if ( 'is-style-alternate' === className ) {
        icon = open ? 'minus' : 'plus';
    }

    const Title = () => {
        return(
            <Fragment>
                { 'is-style-alternate' !== className && (
                    <Icon name={icon} onClick={ () => {
                        if ( false !== setAttributes ) {
                            setState( ! open );
                        }
                    } }/>
                ) }
                { false !== setAttributes && (
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
                ) }
                { false === setAttributes  && (
                    <span>{title}</span>
                ) }
                { 'is-style-alternate' === className && (
                    <Icon name={icon} style={{marginLeft: '0.5em'}} onClick={ () => {
                        if ( false !== setAttributes ) {
                            setState( ! open );
                        }
                    } }/>
                ) }
            </Fragment>
        );
    }

    const Content = () => {
        return(
            <Fragment>
                { false !== setAttributes && (
                    <InnerBlocks allowedBlocks={ALLOWED_BLOCKS}/>
                ) }
                { false === setAttributes && (
                    <RawHTML>{children}</RawHTML>
                ) }
            </Fragment>
        );
    }

    return( 
        <Accordion styled>
            <Accordion.Title
            active={open === true}
            index={0}
            onClick={ () => {
                if ( false === setAttributes ) {
                    setState( ! open );
                }
            } }
            >
               <Title/>
            </Accordion.Title>
            <Accordion.Content active={ open === true }>
                <Content/>
            </Accordion.Content>
        </Accordion>
    );
}

export default AccordionBlock;