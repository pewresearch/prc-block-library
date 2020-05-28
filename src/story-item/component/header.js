// WordPress Core
import { Fragment } from '@wordpress/element';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { Toolbar } from '@wordpress/components';

import { Item } from 'semantic-ui-react';
import { Kicker, KickerEditor } from 'shared';

const PostTitle = ({ title, link, as = 'a' }) => {
    return <RichText.Content href={link} tagName={as} value={title} />;
};

const Header = ({
    title,
    label,
    date,
    link,
    enabled,
    size,
    taxonomy,
    setAttributes,
}) => {
    const currentSize = size; // Perhaps we need useState here for setting active?
    const createSizeControls = function(size) {
        let active = false;
        if (size === currentSize) {
            active = true;
        }
        return {
            icon: 'editor-textcolor',
            title: `Size: ${size}`,
            isActive: active,
            onClick: () => {
                setAttributes({ headerSize: size });
            },
        };
    };
    return (
        <Fragment>
            {true === enabled && (
                <Fragment>
                    <Item.Meta>
                        {false !== setAttributes && (
                            <KickerEditor
                                date={date}
                                label={label}
                                taxonomy={taxonomy}
                                setAttributes={setAttributes}
                            />
                        )}
                        {false === setAttributes && (
                            <Kicker label={label} date={date} />
                        )}
                    </Item.Meta>
                    <Item.Header className={size}>
                        {false !== setAttributes && (
                            <Fragment>
                                <BlockControls>
                                    <Toolbar
                                        controls={[
                                            'small',
                                            'normal',
                                            'large',
                                        ].map(createSizeControls)}
                                    />
                                </BlockControls>
                                <RichText
                                    tagName="div" // The tag here is the element output and editable in the admin
                                    value={title} // Any existing content, either from the database or an attribute default
                                    onChange={title => setAttributes({ title })} // Store updated content as a block attribute
                                    placeholder="Title" // Display this text before any content has been added by the user
                                    multiline="br"
                                />
                            </Fragment>
                        )}
                        {false === setAttributes && (
                            <PostTitle
                                title={title}
                                link={link}
                                as="a"
                                size={size}
                            />
                        )}
                    </Item.Header>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Header;