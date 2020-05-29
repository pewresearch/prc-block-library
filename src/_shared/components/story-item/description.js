// WordPress Core
import { Fragment } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';
import classNames from 'classnames/bind';

const Description = function({ content, sansSerif, enabled, setAttributes, }) {
    if ( true !== enabled ) {
        return <Fragment></Fragment>;
    }

    const classes = classNames('description', { 'sans-serif': sansSerif });
    return (
        <Fragment>
            {false !== setAttributes && (
                <RichText
                    tagName="div"
                    value={content}
                    onChange={excerpt => setAttributes({ excerpt })}
                    placeholder={content}
                    multiline="p"
                    className={classes}
                />
            )}
            {false === setAttributes && (
                <RichText.Content
                    tagName="div"
                    value={content}
                    className={classes}
                />
            )}
        </Fragment>
    );
};

export default Description;