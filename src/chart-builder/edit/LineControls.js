import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { InspectorControls } from '@wordpress/block-editor';
import {
    Button,
    HorizontalRule,
    PanelBody,
    PanelRow,
    Placeholder,
    TextControl,
    ToggleControl,
    SelectControl,
    RangeControl,
    Flex,
    FlexItem,
    __experimentalUnitControl as UnitControl,
    __experimentalNumberControl as NumberControl,
    ColorPalette,
} from '@wordpress/components';

import { formatNum } from '../utils/helpers';

const LineControls = ({ attributes, setAttributes, chartType }) => {
    const {
        lineInterpolation,
        lineStrokeWidth,
        lineNodes,
        lineNodeSize,
        lineNodeStroke,
        areaFillOpacity,
    } = attributes;
    return (
        <PanelBody title={__('Line/Area Chart Configuration')}>
            <SelectControl
                label={__('Interpolation')}
                options={[
                    { label: 'Basis', value: 'basis' },
                    { label: 'Bundle', value: 'bundle' },
                    { label: 'Cardinal', value: 'cardinal' },
                    { label: 'Catmull-Rom', value: 'catmullRom' },
                    { label: 'Linear', value: 'linear' },
                    { label: 'Monotone X', value: 'monotoneX' },
                    { label: 'Monotone Y', value: 'monotoneY' },
                    { label: 'Natural', value: 'natural' },
                    { label: 'Step', value: 'step' },
                    { label: 'Step After', value: 'stepAfter' },
                    { label: 'Step Before', value: 'stepBefore' },
                ]}
                value={lineInterpolation}
                onChange={(value) =>
                    setAttributes({ lineInterpolation: value })
                }
            />
            <NumberControl
                min={1}
                label={__('Line Stroke Width')}
                value={lineStrokeWidth}
                onChange={(value) =>
                    setAttributes({
                        lineStrokeWidth: formatNum(value, 'integer'),
                    })
                }
            />
            <PanelRow>Line Nodes</PanelRow>
            <ToggleControl
                label="Line nodes"
                help={
                    lineNodes
                        ? 'Shows data point nodes on chart.'
                        : 'No data point nodes.'
                }
                checked={lineNodes}
                onChange={() => setAttributes({ lineNodes: !lineNodes })}
            />
            <NumberControl
                disabled={!lineNodes}
                min={1}
                label={__('Line Node Size')}
                value={lineNodeSize}
                onChange={(value) =>
                    setAttributes({ lineNodeSize: formatNum(value, 'integer') })
                }
            />
            <NumberControl
                disabled={!lineNodes}
                min={1}
                label={__('Line Node Stroke')}
                value={lineNodeStroke}
                onChange={(value) =>
                    setAttributes({
                        lineNodeStroke: formatNum(value, 'integer'),
                    })
                }
            />
            <PanelRow>Area</PanelRow>
            <NumberControl
                disabled={!chartType === 'area'}
                label={__('Fill Opacity')}
                step={0.1}
                value={areaFillOpacity}
                onChange={(value) =>
                    setAttributes({
                        areaFillOpacity: formatNum(value, 'float'),
                    })
                }
            />
        </PanelBody>
    );
};

export default LineControls;