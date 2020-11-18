import { __, sprintf } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

const edit = ({ attributes, className, setAttributes }) => {
    const { value } = attributes;
    return (
        <Fragment>
            <RichText
                tagName='h2'
                value={value}
                onChange={t => {
                    setAttributes({ value: t });
                }}
                placeholder={__('Sub Title Here')}
                allowedFormats={[]}
                keepPlaceholderOnFocus
                className={className}
            />
        </Fragment>
    );
};

export default edit;
