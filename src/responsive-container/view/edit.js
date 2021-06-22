/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';
import {
    Flex,
    FlexItem,
    __experimentalNumberControl as NumberControl,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const edit = ({ attributes, className, setAttributes }) => {
    const { min, max } = attributes;

    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const innerBlocksProps = useInnerBlocksProps({}, {
        orientation: 'vertical',
        templateLock: false,
    });

    return (
        <div {...blockProps}>
            <Controls attributes={attributes} setAttributes={setAttributes}/>
            <div {...innerBlocksProps}/>
        </div>
    );
};

export default edit;
