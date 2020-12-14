import { __ } from '@wordpress/i18n';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { Segment } from 'semantic-ui-react';
import { Fragment } from '@wordpress/element';
import { getClassName } from './helpers';

const ALLOWED_BLOCKS = [
    'core/image',
    'core/paragraph',
    'core/heading',
    'core/list',
    'prc-block/button',
];

const TEMPLATE = [['core/heading', {content: 'Heading Here', level: 4}]];

const Controls = ({ size, setSize }) => {
    return(
        <InspectorControls>
            <PanelBody title={__('Callout Options')}>
                <div>
                    <SelectControl
                    label="Size"
                    value={ size }
                    options={ [
                        { label: '200', value: 200 },
                        { label: '310', value: 310 },
                        { label: '420', value: 420 },
                        { label: '640', value: 640 },
                    ] }
                    onChange={ ( s ) => { setSize( s ) } }
                    />
                </div>
            </PanelBody>
        </InspectorControls>
    );
}

const edit = ({ attributes, className, setAttributes }) => {
    const { size } = attributes;
    return (
        <Fragment>
            <Controls size={size} setSize={(s) => setAttributes({size: s})}/>
            <Segment inverted className={getClassName(`${className} beige`, size)}>
                <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE}/>
            </Segment>
        </Fragment>
    );
};

export default edit;
