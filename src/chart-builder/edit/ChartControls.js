import { setLocaleData, __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useSelect, select, useDispatch } from '@wordpress/data';
import { InspectorControls } from '@wordpress/block-editor';
import {
    Button,
    HorizontalRule,
    PanelBody,
    Placeholder,
    TextControl,
    ToggleControl,
    SelectControl,
    RangeControl,
    __experimentalUnitControl as UnitControl,
    __experimentalNumberControl as NumberControl,
    ColorPalette,
    PanelRow,
    Flex,
    FlexItem,
    ExternalLink,
    FormTokenField,
} from '@wordpress/components';
import { colorNames } from '../utils/colors';
import { formatNum } from '../utils/helpers';
import XAxisControls from './XAxisControls';
import YAxisControls from './YAxisControls';
import LineControls from './LineControls';
import BarControls from './BarControls';
import LabelControls from './LabelControls';
import LegendControls from './LegendControls';
import TooltipControls from './TooltipControls';
import TextFieldControls from './TextFieldControls';

const ChartControls = ({
    attributes,
    setAttributes,
    clientId,
    parentBlockId,
}) => {
    const {
        chartType,
        chartOrientation,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        height,
        width,
        colorValue,
        customColors,
    } = attributes;
    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Chart Configuration')}>
                    {chartType === 'bar' && (
                        <SelectControl
                            label={__('Chart Orientation (Bar charts only)')}
                            value={chartOrientation}
                            options={[
                                {
                                    value: 'vertical',
                                    label: 'Vertical',
                                },
                                {
                                    value: 'horizontal',
                                    label: 'Horizontal',
                                },
                            ]}
                            onChange={(orientation) => {
                                setAttributes({
                                    chartOrientation: orientation,
                                });
                            }}
                        />
                    )}
                    <RangeControl
                        label={__('Width')}
                        withInputField
                        min={0}
                        max={1080}
                        value={parseInt(width)}
                        onChange={(width) =>
                            setAttributes({
                                width: formatNum(width, 'integer'),
                            })
                        }
                    />
                    <RangeControl
                        label={__('Height')}
                        withInputField
                        min={0}
                        max={1200}
                        value={parseInt(height)}
                        onChange={(height) =>
                            setAttributes({
                                height: formatNum(height, 'integer'),
                            })
                        }
                    />
                    <NumberControl
                        label={__('Padding Top')}
                        value={paddingTop}
                        disableUnits={true}
                        disabledUnits={true}
                        onChange={(value) => {
                            setAttributes({
                                paddingTop: formatNum(value, 'integer'),
                            });
                        }}
                    />
                    <NumberControl
                        label={__('Padding Right')}
                        value={paddingRight}
                        disableUnits={true}
                        disabledUnits={true}
                        onChange={(value) => {
                            setAttributes({
                                paddingRight: formatNum(value, 'integer'),
                            });
                        }}
                    />
                    <NumberControl
                        label={__('Padding Bottom')}
                        value={paddingBottom}
                        disableUnits={true}
                        disabledUnits={true}
                        onChange={(value) => {
                            setAttributes({
                                paddingBottom: formatNum(value, 'integer'),
                            });
                        }}
                    />
                    <NumberControl
                        label={__('Padding Left')}
                        value={paddingLeft}
                        disableUnits={true}
                        disabledUnits={true}
                        onChange={(value) => {
                            setAttributes({
                                paddingLeft: formatNum(value, 'integer'),
                            });
                        }}
                    />
                    <SelectControl
                        label={__('Color Pallette')}
                        value={colorValue}
                        options={colorNames}
                        help={__(
                            "Sets a predefined color pallette for the chart's color scale. If you wish to define your own colors. Use the Custom Colors input below, which will override all preset colors.",
                        )}
                        onChange={(colors) => {
                            setAttributes({ colorValue: colors });
                        }}
                    />
                    <FormTokenField
                        label={__('Custom Colors')}
                        value={customColors || []}
                        placeholder={'#000000'}
                        onChange={(colors) =>
                            setAttributes({ customColors: colors })
                        }
                    />
                    <ExternalLink href="https://codepen.io/benjiwo/pen/GdBNPP">
                        Pew Research Color Guide
                    </ExternalLink>
                </PanelBody>
                <TextFieldControls
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
                <XAxisControls
                    attributes={attributes}
                    setAttributes={setAttributes}
                    parentBlockId={parentBlockId}
                />
                <YAxisControls
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
                <LabelControls
                    attributes={attributes}
                    setAttributes={setAttributes}
                    chartType={chartType}
                />
                <LegendControls
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
                <TooltipControls
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
                {chartType === 'bar' && (
                    <BarControls
                        attributes={attributes}
                        setAttributes={setAttributes}
                    />
                )}
                {(chartType === 'line' || chartType === 'area') && (
                    <LineControls
                        attributes={attributes}
                        setAttributes={setAttributes}
                        chartType={chartType}
                    />
                )}
            </InspectorControls>
        </>
    );
};

export default ChartControls;
