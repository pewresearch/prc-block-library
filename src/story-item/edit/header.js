// WordPress Core
import { Fragment, useState, useEffect } from '@wordpress/element';
import { SelectControl, TextControl } from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';
import classNames from 'classnames/bind';
import { Item } from 'semantic-ui-react';

import { getTermsAsOptions } from 'shared';

const KickerEditor = ({ label, date, taxonomy, setAttributes }) => {
    const [labelOptions, setLabelOptions] = useState([]);

    useEffect(() => {
        getTermsAsOptions(taxonomy).then(options => {
            setLabelOptions(options);
        });
    }, [taxonomy]);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
                <SelectControl
                    value={label}
                    options={labelOptions}
                    onChange={l => {
                        setAttributes({ label: l });
                    }}
                    style={{ marginBottom: '0px' }}
                    className="story-label-select"
                />
            </div>
            <div>&nbsp;|&nbsp;</div>
            <div>
                <TextControl
                    value={date}
                    onChange={d => {
                        setAttributes({ date: d });
                    }}
                    style={{ marginBottom: '0px' }}
                    className="story-label-select"
                />
            </div>
        </div>
    );
}

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
