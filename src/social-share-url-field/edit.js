/**
 * External Dependencies
 */
import classnames from 'classnames';
import { Input } from 'semantic-ui-react';

/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const edit = ({ attributes, className, setAttributes, context }) => {
	const { url } = attributes;

	console.log('Social Share URL Field: context: ', context);

	const blockProps = useBlockProps({
		className: classnames(className),
		style: {
			display: 'flex',
			flexDirection: 'row',
		},
	});

	return (
		<div {...blockProps}>
			<div className="label">{__(`Share This Link:`, 'prc-block-library')}</div>
			<Input
				placeholder="URL..."
				value={url}
				onChange={(e, { value }) => setAttributes({ url: value })}
			/>
		</div>
	);
};

export default edit;
