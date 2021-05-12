/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';

const edit = ({ attributes, setAttributes }) => {
    const { interests, className } = attributes;

    const blockProps = useBlockProps({
        className: classnames(className, 'ui list'),
    });

    return (
        <div {...blockProps}>
            <div className="item">Global Attitudes & Trends</div>
            <div className="item">Internet, Science & Tech</div>
        </div>
    );
};

export default edit;
