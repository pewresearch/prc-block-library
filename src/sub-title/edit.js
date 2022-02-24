/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

const edit = ({ attributes, className, setAttributes }) => {
    const { value } = attributes;

    const blockProps = useBlockProps({
        className: classnames(className),
		style: {
			marginBottom: '1.5em',
		}
    });

    return (
        <div {...blockProps}>
			<RichText
				tagName="div"
				onChange={t => setAttributes({ value: t })}
				allowedFormats={[]}
				keepPlaceholderOnFocus
				value={value}
				placeholder={__(
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
				)}
			/>
        </div>
    );
};

export default edit;
