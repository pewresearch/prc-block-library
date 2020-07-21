import { __ } from '@wordpress/i18n';
import { RichText, InnerBlocks } from '@wordpress/block-editor';
import classNames from 'classnames/bind';
import Icon from './icons';

const save = ({ attributes, className }) => {
    const {
        header,
        description,
        bgColor,
        borderColor,
        icon,
        sansSerif,
    } = attributes;
    const classes = classNames(className);
    const fontFamily = classNames({ 'sans-serif': sansSerif });
    return (
        <div
            className={classes}
            style={{
                borderColor,
                backgroundColor: bgColor,
            }}
        >
            {'' !== icon && (
                <div className="icon">
                    <Icon icon={icon} />
                </div>
            )}
            <div className="text">
                <RichText.Content
                    tagName="h2"
                    value={header}
                    className={fontFamily}
                />
                {'<p></p>' !== description && (
                    <RichText.Content
                        tagName="div"
                        value={description}
                        className={fontFamily}
                    />
                )}
            </div>
            <div className="action">
                <InnerBlocks.Content />
            </div>
        </div>
    );
};

export default save;
