import { __ } from '@wordpress/i18n';
import { RichText, InnerBlocks } from '@wordpress/block-editor';
import classNames from 'classnames/bind';
// import Icon from './icons';

const save = ({ attributes, className }) => {
    const { header, description, bgColor, borderColor, pancake } = attributes;
    const classes = classNames(className, { pancake });
    return (
        <div
            className={classes}
            style={{
                borderColor,
                backgroundColor: bgColor,
            }}
        >
            <div className="text">
                <RichText.Content
                    tagName="h2" // The tag here is the element output and editable in the admin
                    value={header} // Any existing content, either from the database or an attribute default
                />
                <RichText.Content
                    tagName="div" // The tag here is the element output and editable in the admin
                    value={description} // Any existing content, either from the database or an attribute default
                />
            </div>
            <div className="action">
                <InnerBlocks.Content />
            </div>
        </div>
    );
};

export default save;
