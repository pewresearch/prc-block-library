// We should add the following features:
// 1. Border selection, border left,top,right,bottom, and border color.
// 2. A callout block variation and a card block variation that would set the correct color options and start off in innerblocks with a heading and a paragraph.
// 3. Align left and right options.
// 4. Dimensions control, max width??
// 5. A block transform from the deprecated callout block.

/**
 * WordPress Dependencies
 */
 import { __ } from '@wordpress/i18n';
 import { createHigherOrderComponent } from '@wordpress/compose';
 import { Fragment, useState, useEffect } from '@wordpress/element';
 import { InspectorControls } from '@wordpress/block-editor';
 import {
     Button,
     ButtonGroup,
     ColorPalette,
     PanelBody,
     PanelRow,
     SelectControl,
 } from '@wordpress/components';
 import { addFilter } from '@wordpress/hooks';

 /**
 * Add custom settings:
 * 1. New attributes for maxWidth.
 * 2. Signal additional support for new alignment options.
 * 3. New variations for quickly styling a Callout or Card version of the group block.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
const modifyBlockSettings = ( settings ) => {
    if ( 'core/group' !== settings.name ) {
        return settings;
    }

    console.log('addAttributes!', settings);
	
	if( typeof settings.attributes !== 'undefined' ) {
		settings.attributes = Object.assign( settings.attributes, {
			maxWidth:{ 
				type: 'integer',
				default: 100,
			}
		});
	}

    if( typeof settings.supports.align !== 'undefined' ) {
        settings.supports.align = ['left', 'right', 'wide', 'full'];
    }

    settings.variations = [
        {
            name: 'callout',
            title: __('Callout'),
            description: __('A Group block in the "Callout" style with a oatmeal background and pre-set innerblocks'),
            attributes: {
                className: 'is-style-callout',
            },
            innerBlocks: [
                ['core/heading'],
                ['core/paragraph'],
            ],
        },
        {
            name: 'card',
            title: __('Card'),
            description: __('A Group block in the "Card" style with a white background, heading with a border, image, and text.'),
            attributes: {
                className: 'is-style-card',
            },
            innerBlocks: [
                ['core/heading'],
                ['core/image'],
                ['prc-block/story-item'],
            ],
        },
    ];

	return settings;
}

const BorderStyleControl = ({border, setAttributes}) => {
    const colors = [
        { name: 'black', color: '#000' },
        { name: 'white', color: '#fff' },
        { name: 'gray', color: '#d7d7d2' },
    ];
    return(
        <div>
            <ButtonGroup>
                <Button isPressed={true}>L</Button>
                <Button isPressed={false}>R</Button>
                <Button isPressed={false}>Top</Button>
                <Button isPressed={false}>Bottom</Button>
            </ButtonGroup>
            <ColorPalette
                colors={ colors }
                value={ null }
                onChange={ ( color ) => console.log('borderColor', color) }
            />
        </div>
    );
}
 
 const GroupBlockEdit = props => {
     console.log('<GroupBlockEdit/>', props);
     const { attributes, setAttributes, isSelected } = props;
     const { maxWidth, align } = attributes;

     if ( !isSelected ) {
         return <Fragment/>;
     }
 
     return (
            <InspectorControls>
                <PanelBody title="Border settings">
                    <PanelRow>
                        <BorderStyleControl border={null} setAttributes={setAttributes}/>
                    </PanelRow>
                </PanelBody>
                { ('left' === align || 'right' === align) && (
                    <PanelBody title="Dimension settings">
                        <PanelRow>
                            <SelectControl
                                label="Width"
                                value={ maxWidth }
                                options={ [
                                    { label: '100%', value: 100 },
                                    { label: '200 px', value: 200 },
                                    { label: '310 px', value: 310 },
                                    { label: '420 px', value: 420 },
                                    { label: '640 px', value: 640 },
                                ] }
                                onChange={ ( newMaxWidth ) => { setAttributes({maxWidth: newMaxWidth}) } }
                            />
                        </PanelRow>
                    </PanelBody>
                ) }
            </InspectorControls>
     );
 };
 
 const GroupBlockFilter = createHigherOrderComponent(BlockEdit => {
     return props => {
         const { name } = props;
         if ('core/group' !== name) {
             return <BlockEdit {...props} />;
         }
         return (
             <Fragment>
                 <BlockEdit {...props} />
                 <GroupBlockEdit {...props} />
             </Fragment>
         );
     };
 }, 'withInspectorControl');
 
 
 addFilter('blocks.registerBlockType', 'prc-block/group', modifyBlockSettings);
 addFilter('editor.BlockEdit', 'prc-block/group', GroupBlockFilter, 21);
 