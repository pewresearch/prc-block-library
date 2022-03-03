import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';

const edit = ({ attributes, className, clientId, setAttributes }) => {
    const blockProps = useBlockProps({
        className,
    });

    const { title } = attributes;

    const postTitle = useSelect(
        select => {
            return select('core/editor').getEditedPostAttribute('title');
        },
        [clientId],
    );

    useEffect(() => {
        setAttributes({ title: postTitle });
    }, [postTitle]);

    return <h1 {...blockProps}>{title}</h1>;
};

export default edit;
