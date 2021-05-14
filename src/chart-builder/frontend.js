/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { render, Fragment } from '@wordpress/element';
/**
 * External dependencies
 */
import { Tab, Table } from 'semantic-ui-react';
import {
    ChartBuilderWrapper,
    ChartBuilderTextWrapper,
    masterConfig,
} from '@prcdigital/chart-builder/dist';
/**
 * Internal  dependencies
 */
import { colors as colorObj } from './utils/colors';
import { stringToArrayOfNums, getDomain, getTicks } from './utils/helpers';
import './styles.css';

const getConfig = (el) => {
    const { layout, xAxis, yAxis } = masterConfig;
    const hash = el.dataset.chartHash;
    const json = window.chartConfigs[hash];
    const xTicks = stringToArrayOfNums(json.xTickExact);
    const yTicks = stringToArrayOfNums(json.yTickExact);
    const config = {
        ...masterConfig,
        layout: {
            ...layout,
            type: json.chartType,
            orientation: json.chartOrientation,
            width: json.width,
            height: json.height,
            padding: {
                top: json.paddingTop,
                bottom: json.paddingBottom,
                left: json.paddingLeft,
                right: json.paddingRight,
            },
        },
        // NOTE: xAxis is typically the dependent axis, except for when we've got a horizontal bar chart or dot plot
        xAxis: {
            ...xAxis,
            active: json.xAxisActive,
            label: json.xLabel,
            scale: json.xScale,
            dateFormat: json.xScaleFormat,
            domain: getDomain(
                json.xMinDomain,
                json.xMaxDomain,
                json.chartType,
                json.xScale,
                'x',
                json.chartOrientation,
            ),
            padding: 50,
            tickCount: json.xTickNum,
            tickValues: xTicks.length <= 1 ? null : getTicks(xTicks, xScale),
            domainPadding: json.xDomainPadding,
            axis: {
                stroke: json.xAxisStroke,
            },
            grid: {
                stroke: json.xGridStroke,
            },
        },
        yAxis: {
            ...yAxis,
            active: json.yAxisActive,
            scale: json.yScale,
            dateFormat: json.yScaleFormat,
            padding: 20,
            tickCount: json.yTickNum,
            tickValues: yTicks.length <= 1 ? null : yTicks,
            domain: getDomain(
                json.yMinDomain,
                json.yMaxDomain,
                json.chartType,
                json.yScale,
                'y',
                json.chartOrientation,
            ),
            domainPadding: json.yDomainPadding,
            showZero: json.showYMinDomainLabel,
            axis: {
                stroke: json.yAxisStroke,
            },
            grid: {
                stroke: json.yGridStroke,
            },
        },
        dataRender: {
            ...masterConfig.dataRender,
            xScale: json.xScale,
            yScale: json.yScale,
            xFormat: json.xScaleFormat,
            yFormat: json.yScaleFormat,
            sortKey: 'x',
            sortOrder: json.sortOrder,
            // categories: categoryArray,
        },
        tooltip: {
            active: json.tooltipActive,
            format: json.tooltipFormat,
        },
        animate: {
            active: false,
            duration: 500,
        },
        line: {
            ...masterConfig.line,
            interpolation: json.lineInterpolation,
            showPoints: json.lineNodes,
            showArea: json.chartType === 'area' ? true : false,
            strokeWidth: json.lineStrokeWidth,
            pointSize: json.nodeSize,
            pointStrokeWidth: json.nodeStroke,
            areaFillOpacity: json.areaFillOpacity,
        },
        legend: {
            active: false,
            legendPosition: 'top',
        },
        bar: {
            ...masterConfig.bar,
            width: json.barWidth,
            barToSpaceRatio: 0.8,
            groupOffset: json.barGroupOffset,
        },
        scatter: {
            pointSize: json.nodeSize,
        },
        nodes: {
            size: json.nodeSize,
            fill: json.nodeFill,
            strokeWidth: json.nodeStroke,
        },
        labels: {
            ...masterConfig.labels,
            active: json.labelsActive,
            color: 'black',
            fontWeight: 200,
            fontSize: 12,
            labelPositionDX: json.labelPositionDX,
            labelPositionDY: json.labelPositionDY,
            labelBarPosition: json.barLabelPosition,
            labelCutoff:
                json.barLabelPosition === 'inside' ? json.barLabelCutoff : null,
            labelCutoffMobile:
                json.barLabelPosition === 'inside'
                    ? json.barLabelCutoffMobile
                    : null,
            pieLabelRadius: 60,
        },
        legend: {
            ...masterConfig.legend,
            active: json.legendActive,
            orientation: json.legendOrientation,
            title: json.legendTitle,
            offsetX: json.legendOffsetX,
            offsetY: json.legendOffsetY,
            markerStyle: json.legendMarkerStyle,
            borderStroke: json.legendBorderStroke,
            fill: json.legendFill,
        },
        metadata: {
            ...masterConfig.metadata,
            active: json.metaTextActive,
            title: json.metaTitle,
            subtitle: json.metaSubtitle,
            note: json.metaNote,
            source: json.metaSource,
            tag: json.metaTag,
        },
        colors:
            json.customColors.length > 0
                ? json.customColors
                : colorObj[json.colorValue],
    };
    return config;
};

//this feels redundant for the formatter function in helpers.js, but we need to mod slightly because the param is an array
const arrayToDataObj = (arr, scale, chartType) => {
    const headers = arr[0];
    const [, ...categories] = headers;
    const [, ...body] = arr;
    const seriesData = [];
    const scaleData = (data, scale) => {
        if (
            chartType === 'bar' ||
            chartType === 'stacked-bar' ||
            chartType === 'pie' ||
            chartType === 'dot-plot'
        ) {
            return data;
        }
        if (scale === 'time') {
            return new Date(data).getTime();
        }
        return parseFloat(data);
    };
    for (let i = 1; i < headers.length; i++) {
        var series = body
            .filter((row) => !isNaN(parseFloat(row[i])))
            .map((row) => ({
                x: scaleData(row[0], scale),
                y: parseFloat(row[i]),
                category: headers[i],
                yLabel: `${parseFloat(row[i])}`,
            }));
        seriesData.push(series);
    }
    return { categories, seriesData };
};

const generateSvgDownload = (hash) => {
    const tabWrapper = document.getElementById(`tab-wrapper-${hash}`);
    const svg = tabWrapper.querySelector('svg');
    const svgBlob = new Blob([svg.outerHTML], {
        type: 'image/svg+xml;charset=utf-8',
    });
    console.log(svgBlob);
};

const renderCharts = () => {
    const charts = document.querySelectorAll('.wp-chart-builder-wrapper');
    charts.forEach((chart) => {
        const renderEl = chart.querySelector('.wp-chart-builder-inner');
        const config = getConfig(renderEl);
        const hash = renderEl.dataset.chartHash;
        const dataArrStr = chart.querySelector('.table-array-data').innerText;
        const dataArr = JSON.parse(dataArrStr);
        const dataObj = arrayToDataObj(
            dataArr,
            config.xAxis.scale,
            config.layout.type,
        );
        config.dataRender.categories = dataObj.categories;
        const formattedData =
            config.layout.type === 'pie'
                ? dataObj.seriesData[0]
                : dataObj.seriesData;
        const panes = [
            {
                menuItem: 'Chart',
                render: () => (
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
                        <ChartBuilderWrapper
                            config={config}
                            data={formattedData}
                        />
                    </ChartBuilderTextWrapper>
                ),
            },
            {
                menuItem: 'Table',
                // render: () => <div dangerouslySetInnerHTML={createTable()} />,
                render: () => (
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                {dataArr[0].map((cell) => (
                                    <Table.Cell>{cell}</Table.Cell>
                                ))}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {dataArr
                                .filter((row, i) => i > 0)
                                .map((row) => (
                                    <Table.Row>
                                        {row.map((cell) => (
                                            <Table.Cell>{cell}</Table.Cell>
                                        ))}
                                    </Table.Row>
                                ))}
                        </Table.Body>
                    </Table>
                ),
            },
            {
                menuItem: 'Share',
                render: () => {},
            },
        ];
        render(<Tab id={`tab-wrapper-${hash}`} panes={panes} />, renderEl);
    });
};

domReady(() => {
    renderCharts();
});
