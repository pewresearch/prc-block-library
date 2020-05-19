import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    ToggleControl,
    TextControl,
} from '@wordpress/components';
import { useEffect, Fragment } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import numWords from 'num-words';

const InspectorTools = ({width, items, setAttributes}) => {
    return (
        <InspectorControls>
            <PanelBody title={__('Column Settings')}>
                <div>
                    <TextControl
                        label="Width"
                        value={width}
                        disabled
                    />
                </div>
                <div>
                    <p>Toggle divided story items:</p>
                    <ToggleControl
                        label={
                            items
                                ? 'Contains Story Items'
                                : 'Does Not Contain Story Items'
                        }
                        checked={items}
                        onChange={() => {
                            setAttributes({ items: !items });
                        }}
                    />
                </div>
            </PanelBody>
        </InspectorControls>
    );
}

const edit = ({attributes, clientId, hasChildBlocks, setAttributes}) => {
    const {width, items} = attributes;
    
    /**
     * @description Sets css by adding data attribute to parent gutenberg div.
     */
    useEffect(() => {
        const w = numWords(width);
        document.querySelector('div[data-block="'+clientId+'"]').setAttribute('data-width', w);
    });

    const ColumnContent = () => {
        return(
            <InnerBlocks templateLock={false} renderAppender={
                hasChildBlocks
                    ? undefined
                    : () => <InnerBlocks.ButtonBlockAppender />
            }/>
        );
    }

    return(
        <Fragment>
            <InspectorTools width={width} items={items} setAttributes={setAttributes}/>
            {true === items && (
                <div className="ui divided items">
                    <ColumnContent/>
                </div>
            )}
            {false === items && (
                <ColumnContent/>
            )}
        </Fragment>
    );
}

export default withSelect( (select, ownProps ) => {
    const { clientId } = ownProps;
    const { getBlockOrder } = select( 'core/block-editor' );
    return {
        hasChildBlocks: getBlockOrder( clientId ).length > 0,
    };
})(edit);