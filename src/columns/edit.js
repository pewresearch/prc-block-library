import {
	InspectorControls,
	InnerBlocks,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	__experimentalBlockVariationPicker,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';
import { withDispatch, useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
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

const editControls = props => {
	return(
		<InspectorControls>
			// Controls for equal
			// Controls for doubling
			// Controls for stacking
		</InspectorControls>
	);
}

const edit = props => {
	const { attributes, className, clientId, name } = props;
	const { equal } = attributes;
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
			<div className='prc-block-columns-edit'>
				<div className='prc blocks columns'>
					<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } templateLock="insert"/>
				</div>
			</div>
        )
    }
    
    return(
        <__experimentalBlockVariationPicker
            icon={ get( blockType, [ 'icon', 'src' ] ) }
            label={ get( blockType, [ 'title' ] ) }
            variations={ variations }
            onSelect={ ( nextVariation = defaultVariation ) => {
                if ( nextVariation.attributes ) {
                    props.setAttributes( nextVariation.attributes );
                }
                if ( nextVariation.innerBlocks ) {
                    replaceInnerBlocks(
                        props.clientId,
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