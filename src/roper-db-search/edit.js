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

const edit = ({ attributes, className, setAttributes }) => {
	const { subText, perPage, type } = attributes;

	const blockProps = useBlockProps({
		className: classnames(className),
	});

	return (
		<div {...blockProps}>
			<p>Roper Db Search</p>
		</div>
	);
};

export default edit;
