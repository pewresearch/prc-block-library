import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import classNames from 'classnames/bind';
import colors from './colors';
import { getColorName } from '../_shared';

const edit = props => {
    const { attributes, className, isSelected, clientId } = props;
    const { color, label, url } = attributes;
    const classes = classNames(
        className,
        getColorName(color, colors),
        'ui',
        'button',
    );
    return (
        <RichText.Content
            tagName="a" // The tag here is the element output and editable in the admin
            value={label} // Any existing content, either from the database or an attribute default
            className={classes}
            href={url}
        />
    );
};

export default edit;
