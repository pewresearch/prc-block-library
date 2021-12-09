/**
 * External Dependencies
 */
import classNames from 'classnames/bind';

/**
 * WordPress Dependencies
 */
import { Fragment, useState, useEffect } from '@wordpress/element';
import { SelectControl, TextControl } from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';

const Header = ({
    title,
    size,
    enabled,
    setAttributes,
    altHeaderWeight,
    isSelected,
}) => {
    if (true !== enabled) {
        return <Fragment />;
    }

    const classes = classNames('header', {
        large: (1 === size),
        medium: (2 === size),
        small: (3 === size),
        light: altHeaderWeight,
    });

    return (
        <RichText
            tagName="header"
            value={title}
            onChange={t => setAttributes({ title: t })}
            allowedFormats={['italic']}
            placeholder="Title"
            multiline="br"
            className={classes}
        />
    );
};

export default Header;
