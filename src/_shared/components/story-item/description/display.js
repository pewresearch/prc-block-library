// WordPress Core
import { Fragment, RawHTML } from '@wordpress/element';
import classNames from 'classnames/bind';

const Description = ({ content, sansSerif, enabled }) => {
    if (true !== enabled) {
        return <Fragment />;
    }

    const classes = classNames('description', { 'sans-serif': sansSerif });
    return (
        <div className={classes}>
            <RawHTML>{content}</RawHTML>
        </div>
    );
};

export default Description;
