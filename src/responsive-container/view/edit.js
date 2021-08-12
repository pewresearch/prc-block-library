/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const TEMPLATE = [
    [ 'core/html', {} ],
];

const edit = ({ attributes, className, setAttributes, clientId }) => {
    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const innerBlocksProps = useInnerBlocksProps({}, {
        orientation: 'vertical',
        templateLock: false,
        template: TEMPLATE,
    });

    return (
        <div {...blockProps}>
            <Controls attributes={attributes} setAttributes={setAttributes} clientId={clientId}/>
            <div {...innerBlocksProps}/>
        </div>
    );
};

export default edit;
