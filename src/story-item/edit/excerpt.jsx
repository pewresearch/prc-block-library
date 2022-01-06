/**
 * External Dependencies
 */
import classNames from 'classnames/bind';

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

const Excerpt = ({ content, sansSerif, enabled, setAttributes }) => {
    if (true !== enabled) {
        return <Fragment />;
    }

    const classes = classNames('excerpt', { 'sans-serif': sansSerif });

    return (
        <RichText
            tagName="div"
            value={content}
            onChange={excerpt => setAttributes({ excerpt })}
            placeholder="Story item excerpt..."
            multiline="p"
            className={classes}
        />
    );
};

export default Excerpt;
