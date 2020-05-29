import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	InnerBlocks,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	__experimentalBlockVariationPicker,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';
import {
    PanelBody,
    ToggleControl,
    TextControl,
} from '@wordpress/components';
import { withDispatch, useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { Fragment } from '@wordpress/element';
import { get, map } from 'lodash';
import classNames from 'classnames';
// import variations from './variations';

const ALLOWED_BLOCKS = ['prc-block/column'];

const createBlocksFromInnerBlocksTemplate = ( innerBlocksTemplate ) => {
	return map(
		innerBlocksTemplate,
		( [ name, attributes, innerBlocks = [] ] ) =>
			createBlock(
				name,
				attributes,
				createBlocksFromInnerBlocksTemplate( innerBlocks )
			)
	);
};


const InspectorTools = ({divided, setAttributes}) => {
    return (
        <InspectorControls>
            <PanelBody title={__('Columns Settings')}>
                <div>
                    <ToggleControl
                        label={
                            divided
                                ? 'Divided'
                                : 'Not Divided'
                        }
                        checked={divided}
                        onChange={() => {
                            setAttributes({ divided: !divided });
                        }}
                    />
                </div>
            </PanelBody>
        </InspectorControls>
    );
}

const edit = ({ attributes, className, clientId, name, setAttributes }) => {
	const { equal, divided } = attributes;
    // We get some information when the block's internal state changes.
    const {
		blockType,
		defaultVariation,
		hasInnerBlocks,
		variations,
	} = useSelect(
		( select ) => {
			const {
				getBlockVariations,
				getBlockType,
				getDefaultBlockVariation,
			} = select( 'core/blocks' );

			return {
				blockType: getBlockType( name ),
				defaultVariation: getDefaultBlockVariation( name, 'block' ),
				hasInnerBlocks:
					select( 'core/block-editor' ).getBlocks( clientId ).length >
					0,
				variations: getBlockVariations( name, 'block' ),
			};
		},
		[ clientId, name ]
    );

    const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );
    if ( hasInnerBlocks ) {
        return(
			<Fragment>
				<InspectorTools divided={divided} setAttributes={setAttributes}/>
                <div className={classNames(className, {divided: divided})}>
                    <InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } templateLock="insert" renderAppender={ false }/>
                </div>
			</Fragment>
        )
    }
    
    return(
        <__experimentalBlockVariationPicker
            icon={ get( blockType, [ 'icon', 'src' ] ) }
            label={ get( blockType, [ 'title' ] ) }
            variations={ variations }
            onSelect={ ( nextVariation = defaultVariation ) => {
                if ( nextVariation.attributes ) {
                    setAttributes( nextVariation.attributes );
                }
                if ( nextVariation.innerBlocks ) {
                    replaceInnerBlocks(
                        clientId,
                        createBlocksFromInnerBlocksTemplate(
                            nextVariation.innerBlocks
                        )
                    );
                }
            } }
            allowSkip
        />
    );
}

export default edit;