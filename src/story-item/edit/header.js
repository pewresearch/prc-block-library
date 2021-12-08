/**
 * External Dependencies
 */
import { getTermsAsOptions } from '@pewresearch/app-components';
import classNames from 'classnames/bind';

/**
 * WordPress Dependencies
 */
import { Fragment, useState, useEffect } from '@wordpress/element';
import { SelectControl, TextControl } from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';

const KickerEditor = ({ label, date, taxonomy, setAttributes }) => {
    if ( 'disabled' === taxonomy ) {
        return <Fragment />;
    }
    
    const [labelOptions, setLabelOptions] = useState([]);

    useEffect(() => {
        getTermsAsOptions(taxonomy).then(options => {
            setLabelOptions(options);
        });
    }, [taxonomy]);

    return (
        <div className="meta" style={{ display: 'flex', alignItems: 'center' }}>
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
    const {enableHeader, enableMeta} = enabled;
    if (true !== enableHeader) {
        return <Fragment />;
    }

    const classes = classNames('header', {
        large: (1 === size),
        medium: (2 === size),
        small: (3 === size),
        light: altHeaderWeight,
        'sans-serif': true !== enableMeta,
    });

    return (
        <Fragment>
            {true === enableMeta && (
               <KickerEditor
                    date={date}
                    label={label}
                    taxonomy={taxonomy}
                    setAttributes={setAttributes}
                />
            )}
            <RichText
                tagName="header"
                value={title}
                onChange={t => setAttributes({ title: t })}
                allowedFormats={['italic']}
                placeholder="Title"
                multiline="br"
                className={classes}
            />
        </Fragment>
    );
};

export default Header;
