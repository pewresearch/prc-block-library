/**
 * External Dependencies
 */
import classNames from 'classnames/bind';

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

const Description = ({ content, sansSerif, enabled, setAttributes }) => {
    if (true !== enabled) {
        return <Fragment />;
    }

    const classes = classNames('description', { 'sans-serif': sansSerif });

    return (
        <RichText
            tagName="div"
            value={content}
            onChange={description => setAttributes({ description })}
            placeholder="Story item description..."
            multiline="p"
            className={classes}
        />
    );
};

export default Description;
