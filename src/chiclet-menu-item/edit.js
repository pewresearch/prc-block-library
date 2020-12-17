import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';
import { useBlockProps, RichText, URLPopover } from '@wordpress/block-editor';

import './style.scss';
 
const edit = ({attributes, isSelected, setAttributes}) => {
    const blockProps = useBlockProps({
        className: 'item'
    });
    const { text, link } = attributes;
    console.log('isSelected?',isSelected);
    return (
        <div {...blockProps}>
            <Fragment>
                <RichText
                tagName="div" // The tag here is the element output and editable in the admin
                value={text} // Any existing content, either from the database or an attribute default
                onChange={t => setAttributes({ text: t })} // Store updated content as a block attribute
                placeholder="U.S. Democracy" // Display this text before any content has been added by the user
                className="ui basic fluid button"
                multiline={false}
                />
                {isSelected && (
                    <URLPopover
                    onClose={ (e) => console.log(e) }
                    renderSettings={ () => (
                        <ToggleControl
                            label={ __( 'Open in new tab' ) }
                            checked={ false }
                            onChange={ e => console.log(e.target.value) }
                        />
                    ) }
                >
                    <form onSubmit={ (e) => {
                        e.preventDefault();
                        console.log(e);
                    } }>
                        <input
                            type="url"
                            value={ link }
                            onChange={ l => setAttributes({link: l.target.value}) }
                            style={{
                                border: 'none',
                                boxShadow: 'none',
                            }}
                        />
                    </form>
                </URLPopover>
                )}
            </Fragment>
            
        </div>
    );
}

export default edit;