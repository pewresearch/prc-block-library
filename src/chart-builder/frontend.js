/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';

/**
 * External dependencies
 */
import { Tab, Table, Icon, Container, Button } from 'semantic-ui-react';
import {
	ChartBuilderWrapper,
	ChartBuilderTextWrapper,
	masterConfig,
} from '@pewresearch/pew-chart-builder/dist';
/**
 * Internal  dependencies
 */
import { colors as colorObj } from './utils/colors';
import { stringToArrayOfNums, getDomain, getTicks } from './utils/helpers';
import './styles.css';

const { innerWidth, innerHeight } = window;

const getConfig = (el) => {
	const { layout, xAxis, yAxis } = masterConfig;
	const hash = el.dataset.chartHash;
	const attr = window.chartConfigs[hash];
	const xTicks = stringToArrayOfNums(attr.xTickExact);
	const yTicks = stringToArrayOfNums(attr.yTickExact);
	const config = {
		...masterConfig,
		layout: {
			...layout,
			type: attr.chartType,
			orientation: attr.chartOrientation,
			width: attr.width,
			height: attr.height,
			horizontalRules: attr.horizontalRules,
			padding: {
				top: attr.paddingTop,
				bottom: attr.paddingBottom,
				left: attr.paddingLeft,
				right: attr.paddingRight,
			},
		},
		// NOTE: xAxis is typically the dependent axis, except for when we've got a horizontal bar chart or dot plot
		xAxis: {
			...xAxis,
			active: attr.xAxisActive,
			label: attr.xLabel,
			scale: attr.xScale,
			dateFormat: attr.xScaleFormat,
			domain: getDomain(
				attr.xMinDomain,
				attr.xMaxDomain,
				attr.chartType,
				attr.xScale,
				'x',
				attr.chartOrientation,
			),
			padding: 50,
			tickCount: attr.xTickNum,
			tickValues: 1 >= xTicks.length ? null : getTicks(xTicks, attr.xScale),
			tickUnit: attr.xTickUnit,
			tickUnitPosition: attr.xTickUnitPosition,
			tickAngle: attr.xTickAngle,
			multiLineTickLabels: attr.xMultiLineTickLabels,
			multiLineTickLabelsBreak: attr.xMultiLineTickLabelsBreak,
			abbreviateTicks: attr.xAbbreviateTicks,
			abbreviateTicksDecimals: attr.xAbbreviateTicksDecimals,
			tickLabels: {
				...masterConfig.xAxis.tickLabels,
				angle: attr.xTickLabelAngle,
				verticalAnchor: attr.xTickLabelVerticalAnchor,
				textAnchor: attr.xTickLabelTextAnchor,
			},
			domainPadding: attr.xDomainPadding,
			axis: {
				stroke: attr.xAxisStroke,
			},
			grid: {
				stroke: attr.xGridStroke,
			},
		},
		yAxis: {
			...yAxis,
			active: attr.yAxisActive,
			scale: attr.yScale,
			dateFormat: attr.yScaleFormat,
			padding: 20,
			tickCount: attr.yTickNum,
			tickValues: 1 >= yTicks.length ? null : yTicks,
			tickUnit: attr.yTickUnit,
			tickUnitPosition: attr.yTickUnitPosition,
			tickAngle: attr.yTickAngle,
			multiLineTickLabels: attr.yMultiLineTickLabels,
			multiLineTickLabelsBreak: attr.yMultiLineTickLabelsBreak,
			abbreviateTicks: attr.yAbbreviateTicks,
			abbreviateTicksDecimals: attr.yAbbreviateTicksDecimals,
			tickLabels: {
				...masterConfig.yAxis.tickLabels,
				angle: attr.yTickLabelAngle,
				verticalAnchor: attr.yTickLabelVerticalAnchor,
				textAnchor: attr.yTickLabelTextAnchor,
			},
			domain: getDomain(
				attr.yMinDomain,
				attr.yMaxDomain,
				attr.chartType,
				attr.yScale,
				'y',
				attr.chartOrientation,
			),
			domainPadding: attr.yDomainPadding,
			showZero: attr.showYMinDomainLabel,
			axis: {
				stroke: attr.yAxisStroke,
			},
			grid: {
				stroke: attr.yGridStroke,
			},
		},
		dataRender: {
			...masterConfig.dataRender,
			xScale: attr.xScale,
			yScale: attr.yScale,
			xFormat: attr.xScaleFormat,
			yFormat: attr.yScaleFormat,
			sortKey: 'x',
			sortOrder: attr.sortOrder,
			categories: attr.categoryArray,
		},
		tooltip: {
			...masterConfig.tooltip,
			active: attr.tooltipActive,
			categoryActive: attr.tooltipCategoryActive,
			format: attr.tooltipFormat,
			offsetX: attr.tooltipOffsetX,
			offsetY: attr.tooltipOffsetY,
			maxWidth: attr.tooltipMaxWidth,
			maxHeight: attr.tooltipMaxHeight,
			caretPosition: attr.tooltipCaretPosition,
		},
		animate: {
			active: false,
			duration: 500,
		},
		line: {
			...masterConfig.line,
			interpolation: attr.lineInterpolation,
			showPoints: attr.lineNodes,
			showArea: 'area' === attr.chartType,
			strokeWidth: attr.lineStrokeWidth,
			pointSize: attr.nodeSize,
			pointStrokeWidth: attr.nodeStroke,
			areaFillOpacity: attr.areaFillOpacity,
		},
		legend: {
			...masterConfig.legend,
			active: attr.legendActive,
			orientation: attr.legendOrientation,
			title: attr.legendTitle,
			offsetX: attr.legendOffsetX,
			offsetY: attr.legendOffsetY,
			markerStyle: attr.legendMarkerStyle,
			borderStroke: attr.legendBorderStroke,
			fill: attr.legendFill,
		},
		bar: {
			...masterConfig.bar,
			width: attr.barWidth,
			barToSpaceRatio: 0.8,
			groupOffset: attr.barGroupOffset,
		},
		scatter: {
			pointSize: attr.nodeSize,
		},
		nodes: {
			size: attr.nodeSize,
			fill: attr.nodeFill,
			strokeWidth: attr.nodeStroke,
		},
		labels: {
			...masterConfig.labels,
			active: attr.labelsActive,
			color: 'black',
			fontWeight: 200,
			fontSize: 12,
			labelPositionDX: attr.labelPositionDX,
			labelPositionDY: attr.labelPositionDY,
			labelUnit: attr.labelUnit,
			labelUnitPosition: attr.labelUnitPosition,
			labelBarPosition: attr.barLabelPosition,
			labelCutoff:
				'inside' === attr.barLabelPosition ? attr.barLabelCutoff : null,
			labelCutoffMobile:
				'inside' === attr.barLabelPosition ? attr.barLabelCutoffMobile : null,
			pieLabelRadius: 60,
		},
		metadata: {
			...masterConfig.metadata,
			active: attr.metaTextActive,
			title: attr.metaTitle,
			subtitle: attr.metaSubtitle,
			note: attr.metaNote,
			source: attr.metaSource,
			tag: attr.metaTag,
		},
		colors:
			0 < attr.customColors.length
				? attr.customColors
				: colorObj[attr.colorValue],
	};
	return config;
};

// this feels redundant for the formatter function in helpers.js, but we need to mod slightly because the param is an array
const arrayToDataObj = (arr, scale, chartType) => {
	const headers = arr[0];
	const [, ...categories] = headers;
	const [, ...body] = arr;
	const seriesData = [];
	const scaleData = (data, s) => {
		if (
			'bar' === chartType ||
			'stacked-bar' === chartType ||
			'pie' === chartType ||
			'dot-plot' === chartType
		) {
			return data;
		}
		if ('time' === s) {
			return new Date(data).getTime();
		}
		return parseFloat(data);
	};
	for (let i = 1; i < headers.length; i += 1) {
		const series = body
			.filter((row) => !Number.isNaN(parseFloat(row[i])))
			.map((row) => ({
				x: scaleData(row[0], scale),
				y: parseFloat(row[i]),
				category: headers[i],
				// yLabel: `${parseFloat(row[i])}`,
			}));
		seriesData.push(series);
	}
	return { categories, seriesData };
};

const initFacebookLinks = (e, postUrl, postId, pngAttrs) => {
	e.preventDefault();
	const actionUrl = addQueryArgs('https://www.facebook.com/sharer/sharer.php', {
		u: pngAttrs.id
			? `https://www.pewresearch.org/share/${postId}/${pngAttrs.id}`
			: postUrl,
	});
	window.open(
		actionUrl,
		'fbShareWindow',
		`height=450, width=550, top=${innerHeight / 2 - 275}, left=${
			innerWidth / 2 - 225
		}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`,
	);
	e.stopPropagation();
};

const initTwitterLinks = (e, postUrl, postId, pngAttrs, title) => {
	e.preventDefault();
	const actionUrl = addQueryArgs('https://twitter.com/intent/tweet', {
		text: title,
		url: pngAttrs.id
			? `https://www.pewresearch.org/share/${postId}/${pngAttrs.id}`
			: postUrl,
	});
	window.open(
		actionUrl,
		'twtrShareWindow',
		`height=450, width=550, top=${innerHeight / 2 - 275}, left=${
			innerWidth / 2 - 225
		}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`,
	);
	e.stopPropagation();
};

const renderCharts = () => {
	const charts = document.querySelectorAll('.wp-chart-builder-wrapper');
	charts.forEach((chart) => {
		const renderEl = chart.querySelector('.wp-chart-builder-inner');
		const config = getConfig(renderEl);
		const hash = renderEl.dataset.chartHash;
		const { postId } = renderEl.dataset;
		const { postUrl } = renderEl.dataset;
		const pngAttrs = {
			url: window.chartConfigs[hash].pngUrl,
			id: window.chartConfigs[hash].pngId,
		};
		const { tabsActive } = window.chartConfigs[hash];
		const dataArr = window.chartData[hash];
		const preformattedDataArr = window.chartPreformattedData[hash];
		const dataObj = arrayToDataObj(
			dataArr,
			config.xAxis.scale,
			config.layout.type,
		);
		config.dataRender.categories = preformattedDataArr
			? config.dataRender.categories
			: dataObj.categories;
		const formattedData = preformattedDataArr || dataObj.seriesData;
		// config.layout.type === 'pie'
		//     ? dataObj.seriesData[0]
		//     : dataObj.seriesData;
		console.log({ formattedData });
		console.log({ dataObj });
		const panes = [
			{
				menuItem: 'CHART',
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
						<ChartBuilderWrapper config={config} data={formattedData} />
					</ChartBuilderTextWrapper>
				),
			},
			{
				menuItem: 'TABLE',
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
								.filter((row, i) => 0 < i)
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
				menuItem: 'SHARE',
				render: () => (
					<Container className="share-pane">
						<div className="share-pane__prompt">Share this chart:</div>
						{pngAttrs.id && (
							<div className="share-pane__link">
								<a href={pngAttrs.url} download={`chart-${pngAttrs.id}`}>
									Download as PNG
								</a>
							</div>
						)}
						<div className="share-pane__buttons">
							<Button
								color="twitter"
								onClick={(e) => {
									initTwitterLinks(
										e,
										postUrl,
										postId,
										pngAttrs,
										config.metadata.title,
									);
								}}
							>
								<Icon name="twitter" />
								Share on Twitter
							</Button>
							<Button
								color="facebook"
								onClick={(e) => {
									initFacebookLinks(e, postUrl, postId, pngAttrs);
								}}
							>
								<Icon name="facebook" />
								Share on Facebook
							</Button>
						</div>
					</Container>
				),
			},
		];
		console.log({ hash, config });

		if (!tabsActive) {
			render(
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
					<ChartBuilderWrapper config={config} data={formattedData} />
				</ChartBuilderTextWrapper>,
				renderEl,
			);
		} else {
			render(<Tab id={`tab-wrapper-${hash}`} panes={panes} />, renderEl);
		}
	});
};

domReady(() => {
	renderCharts();
});
