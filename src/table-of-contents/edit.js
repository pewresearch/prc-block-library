/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

const edit = ({ attributes, className, setAttributes }) => {
    const blockProps = useBlockProps({
        className: classnames(className),
    });

    return (
		<div {...blockProps}>
			<p>Table of contents use data api to gather up all the chapter blocks here...</p>
		</div>
	);
};

export default edit;
