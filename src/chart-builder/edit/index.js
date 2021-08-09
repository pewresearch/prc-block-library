/**
 * WordPress dependencies
 */
import { ResizableBox } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { select, useSelect } from '@wordpress/data';
/**
 * External dependencies
 */
import {
    ChartBuilderWrapper,
    masterConfig,
    ChartBuilderTextWrapper,
} from '@pewresearch/pew-chart-builder/dist';
/**
 * Internal dependencies
 */
import { colors } from '../utils/colors';
import {
    stringToArrayOfNums,
    getDomain,
    getTicks,
    formattedData,
    formatLegacyAttrs,
} from '../utils/helpers';
import ChartControls from './ChartControls';
import { ifMatchSetAttribute } from '@pewresearch/app-components';

const setChartTypeByClassName = (className, setAttributes) => {
    ifMatchSetAttribute(
        'is-style-bar',
        className,
        'chartType',
        'bar',
        setAttributes,
    );
    ifMatchSetAttribute(
        'is-style-stacked-bar',
        className,
        'chartType',
        'stacked-bar',
        setAttributes,
    );
    ifMatchSetAttribute(
        'is-style-line',
        className,
        'chartType',
        'line',
        setAttributes,
    );
    ifMatchSetAttribute(
        'is-style-scatter',
        className,
        'chartType',
        'scatter',
        setAttributes,
    );
    ifMatchSetAttribute(
        'is-style-pie',
        className,
        'chartType',
        'pie',
        setAttributes,
    );
    ifMatchSetAttribute(
        'is-style-area',
        className,
        'chartType',
        'area',
        setAttributes,
    );
    ifMatchSetAttribute(
        'is-style-dot-plot',
        className,
        'chartType',
        'dot-plot',
        setAttributes,
    );
};

const edit = ({ attributes, setAttributes, toggleSelection, clientId }) => {
    const {
        isConvertedChart,
        className,
        chartType,
        chartOrientation,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        height,
        width,
        sortOrder,
        colorValue,
        customColors,
        barWidth,
        barGroupOffset,
        barLabelPosition,
        barLabelCutoff,
        barLabelCutoffMobile,
        tooltipActive,
        tooltipFormat,
        lineInterpolation,
        lineStrokeWidth,
        lineNodes,
        nodeSize,
        nodeStroke,
        nodeFill,
        areaFillOpacity,
        xAxisActive,
        xLabel,
        xScale,
        xScaleFormat,
        xMinDomain,
        xMaxDomain,
        xDomainPadding,
        xTickNum,
        xTickExact,
        xAxisStroke,
        xGridStroke,
        yAxisStroke,
        yGridStroke,
        yAxisActive,
        yLabel,
        yMinDomain,
        yMaxDomain,
        yDomainPadding,
        showYMinDomainLabel,
        yTickNum,
        yTickExact,
        labelsActive,
        labelPositionDX,
        labelPositionDY,
        legendActive,
        legendOrientation,
        legendTitle,
        legendOffsetX,
        legendOffsetY,
        legendMarkerStyle,
        legendBorderStroke,
        legendFill,
        metaTextActive,
        metaTitle,
        metaSubtitle,
        metaNote,
        metaSource,
        metaTag,
    } = attributes;
    // update chart type using styles
    useEffect(() => {
        if (isConvertedChart) {
            const legacyMeta = select('core/editor').getEditedPostAttribute(
                'meta',
            );
            const legacyAttrs = formatLegacyAttrs(legacyMeta, attributes);
            setAttributes(legacyAttrs);
        }
        setChartTypeByClassName(className, setAttributes);
    }, [className, isConvertedChart]);
    const xTicks = stringToArrayOfNums(xTickExact);
    const yTicks = stringToArrayOfNums(yTickExact);
    const config = {
        ...masterConfig,
        layout: {
            ...masterConfig.layout,
            type: chartType === 'area' ? 'line' : chartType,
            orientation: chartOrientation,
            width: width,
            height: height,
            padding: {
                top: paddingTop,
                right: paddingRight,
                bottom: paddingBottom,
                left: paddingLeft,
            },
        },
        xAxis: {
            ...masterConfig.xAxis,
            active: xAxisActive,
            label: xLabel,
            scale: xScale,
            dateFormat: xScaleFormat,
            domain: getDomain(
                xMinDomain,
                xMaxDomain,
                chartType,
                xScale,
                'x',
                chartOrientation,
            ),
            // domain: [new Date(1970, 0), new Date(2024, 0)],
            padding: 50,
            tickCount: xTickNum,
            tickValues: xTicks.length <= 1 ? null : getTicks(xTicks, xScale),
            domainPadding: xDomainPadding,
            axis: {
                stroke: xAxisStroke,
            },
            grid: {
                stroke: xGridStroke,
            },
        },
        yAxis: {
            ...masterConfig.yAxis,
            padding: 20,
            active: yAxisActive,
            label: yLabel,
            domain: getDomain(
                yMinDomain,
                yMaxDomain,
                chartType,
                'linear',
                'y',
                chartOrientation,
            ),
            tickCount: yTickNum,
            tickValues: yTicks.length <= 1 ? null : yTicks,
            domainPadding: yDomainPadding,
            showZero: showYMinDomainLabel,
            axis: {
                stroke: yAxisStroke,
            },
            grid: {
                stroke: yGridStroke,
            },
        },
        dataRender: {
            ...masterConfig.dataRender,
            xScale: xScale,
            yScale: 'linear',
            xFormat: xScaleFormat,
            yFormat: null,
            sortKey: 'x',
            sortOrder: sortOrder,
        },
        tooltip: {
            active: tooltipActive,
            format: tooltipFormat,
        },
        animate: {
            active: true,
            duration: 500,
        },
        line: {
            ...masterConfig.line,
            interpolation: lineInterpolation,
            showPoints: lineNodes,
            showArea: chartType === 'area' ? true : false,
            strokeWidth: lineStrokeWidth,
            pointSize: nodeSize,
            pointStrokeWidth: nodeStroke,
            areaFillOpacity: areaFillOpacity,
        },
        scatter: {
            pointSize: nodeSize,
        },
        nodes: {
            size: nodeSize,
            fill: nodeFill,
            strokeWidth: nodeStroke,
        },
        legend: {
            ...masterConfig.legend,
            active: legendActive,
            orientation: legendOrientation,
            title: legendTitle,
            offsetX: legendOffsetX,
            offsetY: legendOffsetY,
            markerStyle: legendMarkerStyle,
            borderStroke: legendBorderStroke,
            fill: legendFill,
        },
        bar: {
            width: barWidth,
            barToSpaceRatio: 0.8,
            groupOffset: barGroupOffset,
        },
        colors: customColors.length > 0 ? customColors : colors[colorValue],
        labels: {
            ...masterConfig.labels,
            active: labelsActive,
            color: 'black',
            fontWeight: 200,
            fontSize: 12,
            labelPositionDX: labelPositionDX,
            labelPositionDY: labelPositionDY,
            pieLabelRadius: 60,
            labelBarPosition: barLabelPosition,
            labelCutoff: barLabelPosition === 'inside' ? barLabelCutoff : null,
            labelCutoffMobile:
                barLabelPosition === 'inside' ? barLabelCutoffMobile : null,
        },
        metadata: {
            ...masterConfig.metadata,
            active: metaTextActive,
            title: metaTitle,
            subtitle: metaSubtitle,
            note: metaNote,
            source: metaSource,
            tag: metaTag,
        },
    };
    const parentBlockId = select(
        'core/block-editor',
    ).getBlockParentsByBlockName(
        clientId,
        'prc-block/chart-builder-data-wrapper',
    )[0];
    const tableData = useSelect((select) => {
        const tableBlock = select('core/block-editor')
            .getBlocks(parentBlockId)
            .find((block) => block.name === 'core/table');
        const tableHeaders = tableBlock.attributes.head[0].cells.map(
            (c) => c.content,
        );
        const body = tableBlock.attributes.body;
        return { tableHeaders, body };
    }, []);

    const tableJson = formattedData(tableData, xScale, chartType);
    const tableCategories = tableData.tableHeaders;
    let chartData;
    let renderedChart;
    if (tableCategories) {
        //Who needs splice? Use array literals to get all items in array after the first item :)
        const [, ...rest] = tableCategories;
        config.dataRender.categories = rest;
    }
    // For now, let's force pie charts to only use the first array of data, as they can only contain one series of data by rule.
    // Passing addtl data will break tool (bad).
    console.log({ attributes, config, clientId });
    if (tableJson) {
        switch (chartType) {
            case 'pie':
                chartData = tableJson[0];
                break;
            default:
                chartData = tableJson;
                break;
        }
        renderedChart = (
            <ChartBuilderWrapper config={config} data={chartData} />
        );
    }
    return (
        <>
            <ChartBuilderTextWrapper
                active={config.metadata.active}
                width={config.layout.width}
                horizontalRules={config.layout.horizontalRules}
                title={config.metadata.title}
                subtitle={config.metadata.subtitle}
                note={config.metadata.note}
                source={config.metadata.source}
                tag={config.metadata.tag}
            >
                <ResizableBox
                    size={{
                        height,
                        width,
                    }}
                    minHeight="50"
                    minWidth="50"
                    enable={{
                        top: false,
                        right: false,
                        bottom: false,
                        left: false,
                        topRight: false,
                        bottomRight: true,
                        bottomLeft: false,
                        topLeft: false,
                    }}
                    onResizeStop={(event, direction, elt, delta) => {
                        setAttributes({
                            height: parseInt(
                                parseInt(height) + parseInt(delta.height),
                                10,
                            ),
                            width: parseInt(
                                parseInt(width) + parseInt(delta.width),
                                10,
                            ),
                        });
                        toggleSelection(true);
                    }}
                    onResizeStart={() => {
                        toggleSelection(false);
                    }}
                >
                    <ChartControls
                        attributes={attributes}
                        setAttributes={setAttributes}
                        parentBlock={parentBlockId}
                        clientId={clientId}
                    />
                    {renderedChart}
                    <canvas id="canvas" width="800" height="400"></canvas>
                </ResizableBox>
            </ChartBuilderTextWrapper>
        </>
    );
};

export default edit;
