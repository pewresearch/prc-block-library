import { useState, Fragment, RawHTML } from '@wordpress/element';
import { Accordion, Icon } from 'semantic-ui-react';

const Frontend = ({title, children}) => {
    const defaultState = false;
    const [ open, setState ] = useState(defaultState);
    let direction = open ? 'down' : 'right';

    const editTitle = () => {
        return(
            <Fragment>
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
            </Fragment>
        );
    }

    const Title = () => {
        return(
            <Fragment>
                { 'is-style-secondary' !== className && (
                    <Icon name={icon} onClick={ () => setState( ! open ) } />
                ) }
                <span>{title}</span>
                { 'is-style-secondary' === className && (
                    <Icon name={icon} onClick={ () => setState( ! open ) } style={{marginLeft: '1em'}}/>
                ) }
            </Fragment>
        );
    }

    const Content = () => {
        return(
            <RawHTML>{children}</RawHTML>
        );
    }

    return( 
        <Accordion styled>
            <Accordion.Title
            active={open === true}
            index={0}
            onClick={ () => setState( ! open ) }
            >
               <Title/>
            </Accordion.Title>
            <Accordion.Content active={ open === true }>
                <Content/>
            </Accordion.Content>
        </Accordion>
    );
}