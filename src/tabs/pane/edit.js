/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import {
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

const Edit = ({ attributes, className, context }) => {
    const { uuid } = attributes;
    // eslint-disable-next-line react/destructuring-assignment
    const currentlyActive = context['prc-block/tabs-active'];
    const isActive = uuid === currentlyActive;

    if (!isActive) {
        return <Fragment />;
    }

    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const innerBlocksProps = useInnerBlocksProps({}, {});

    return (
        <div {...blockProps}>
            <div {...innerBlocksProps} />
        </div>
    );
};

export default Edit;
