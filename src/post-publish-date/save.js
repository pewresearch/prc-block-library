import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';

const save = ({ attributes, className }) => {
    const { date, asItem } = attributes;

    const blockProps = useBlockProps.save({
        className: classnames(className, 'meta', {
            item: asItem,
        }),
    });

    return <div {...blockProps}>{date}</div>;
};

export default save;
