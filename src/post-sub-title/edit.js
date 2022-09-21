/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentControl,
} from '@wordpress/block-editor';

const edit = ({ attributes, className, setAttributes }) => {
	const { value, textAlign } = attributes;

	const blockProps = useBlockProps({
		className: classnames(className, {
			[`has-text-align-${textAlign}`]: textAlign,
		}),
		style: {
			marginBottom: '1.5em',
		},
	});

	return (
		<Fragment>
			<BlockControls>
				<AlignmentControl
					value={textAlign}
					onChange={(nextAlign) => {
						setAttributes({ textAlign: nextAlign });
					}}
				/>
			</BlockControls>
			<div {...blockProps}>
				<RichText
					tagName="div"
					onChange={(t) => setAttributes({ value: t })}
					allowedFormats={[]}
					keepPlaceholderOnFocus
					value={value}
					placeholder={__(
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
					)}
				/>
			</div>
		</Fragment>
	);
};

export default edit;
