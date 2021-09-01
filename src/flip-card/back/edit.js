/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';
import {
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from '../_shared';

const ALLOWED_BLOCKS = [];
const TEMPLATE =  [['core/paragraph',{}]];

const edit = ({ attributes, className, clientId }) => {
    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const innerBlocksProps = useInnerBlocksProps({}, {
        allowedBlocks: ALLOWED_BLOCKS,
        orientation: 'vertical',
        templateLock: false,
        template: TEMPLATE
    });

    // On load hide the back
    useEffect(() => {
        const blockElm = document.querySelector(
            `div[data-block="${clientId}"]`,
        );
        blockElm.style.display = 'none';
    }, []);

    return(
        <Fragment>
            <Controls clientId={clientId} />
            <div { ...blockProps }>
                <div {...innerBlocksProps}/>
            </div>
        </Fragment>
    );
};

export default edit;