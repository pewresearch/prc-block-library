/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

const save = ({ attributes }) => {
    const { interest, className } = attributes;
    const blockProps = useBlockProps.save({
        className,
        'data-segment-id': interest,
    });
    return <div {...blockProps} />;
};

export default save;
