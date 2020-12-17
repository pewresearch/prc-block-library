import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import './style.scss';
 
const edit = ({attributes}) => {
    const blockProps = useBlockProps();
    return (
        <div { ...blockProps }>
            <div className="ui block-menu">
                <InnerBlocks allowedBlocks={['prc-block/chiclet-menu-item']} orientation="horizontal"/>
            </div>
        </div>
    );
}

export default edit;