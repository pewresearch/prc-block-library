// WordPress Core
import { Fragment, RawHTML } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';
import classNames from 'classnames/bind';
import { Item } from 'semantic-ui-react';

import KickerEditor from './kicker';

const Header = ({
    title,
    label,
    date,
    size,
    enabled,
    taxonomy,
    setAttributes,
    altHeaderWeight,
}) => {
    if (true !== enabled) {
        return <Fragment />;
    }
    
    const classes = classNames({
        large: (1 === size),
        medium: (2 === size),
        small: (3 === size),
        light: altHeaderWeight,
    });

    return (
        <Fragment>
            <Item.Meta>
                <KickerEditor
                    date={date}
                    label={label}
                    taxonomy={taxonomy}
                    setAttributes={setAttributes}
                />
            </Item.Meta>
            <Item.Header className={classes}>
                <RichText
                    tagName="div"
                    value={title}
                    onChange={t => setAttributes({ title: t })}
                    allowedFormats={['italic']}
                    placeholder="Title"
                    multiline="br"
                />
            </Item.Header>
        </Fragment>
    );
};

export default Header;
