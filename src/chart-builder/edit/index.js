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
import { ifMatchSetAttribute } from '@prc-app/shared';

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

const edit = ({
	attributes: attr,
	setAttributes,
	toggleSelection,
	clientId,
	isSelected,
}) => {
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
		horizontalRules,
		sortOrder,
		colorValue,
		customColors,
		barWidth,
		barGroupOffset,
		barLabelPosition,
		barLabelCutoff,
		barLabelCutoffMobile,
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
		xTickUnit,
		xTickUnitPosition,
		xTickAngle,
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
		yTickUnit,
		yTickUnitPosition,
		yTickAngle,
		labelsActive,
		labelPositionDX,
		labelPositionDY,
		labelUnit,
		labelUnitPosition,
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
	} = attr;
	// update chart type using styles
	useEffect(() => {
		if (isConvertedChart) {
			console.log('converting ...');
			const legacyMeta = select('core/editor').getEditedPostAttribute('meta');
			const legacyAttrs = formatLegacyAttrs(legacyMeta, attr);
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
			type: 'area' === chartType ? 'line' : chartType,
			orientation: chartOrientation,
			width,
			height,
			horizontalRules,
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
			tickValues: 1 >= xTicks.length ? null : getTicks(xTicks, xScale),
			tickUnit: xTickUnit,
			tickUnitPosition: xTickUnitPosition,
			tickAngle: xTickAngle,
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
			tickValues: 1 >= yTicks.length ? null : yTicks,
			tickUnit: yTickUnit,
			tickUnitPosition: yTickUnitPosition,
			tickAngle: yTickAngle,
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
			xScale,
			yScale: 'linear',
			xFormat: xScaleFormat,
			yFormat: null,
			sortKey: 'x',
			sortOrder,
		},
		tooltip: {
			...masterConfig.tooltip,
			active: attr.tooltipActive,
			categoryActive: attr.tooltipCategoryActive,
			format: attr.tooltipFormat,
			offsetX: attr.tooltipOffsetX,
			offsetY: attr.tooltipOffsetY,
			maxHeight: attr.tooltipMaxHeight,
			maxWidth: attr.tooltipMaxWidth,
			caretPosition: attr.tooltipCaretPosition,
		},
		animate: {
			active: true,
			duration: 500,
		},
		line: {
			...masterConfig.line,
			interpolation: lineInterpolation,
			showPoints: lineNodes,
			showArea: 'area' === chartType,
			strokeWidth: lineStrokeWidth,
			pointSize: nodeSize,
			pointStrokeWidth: nodeStroke,
			areaFillOpacity,
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
		colors: 0 < customColors.length ? customColors : colors[colorValue],
		labels: {
			...masterConfig.labels,
			active: labelsActive,
			color: 'black',
			fontWeight: 200,
			fontSize: 12,
			labelPositionDX,
			labelPositionDY,
			labelUnit,
			labelUnitPosition,
			pieLabelRadius: 60,
			labelBarPosition: barLabelPosition,
			labelCutoff: 'inside' === barLabelPosition ? barLabelCutoff : null,
			labelCutoffMobile:
				'inside' === barLabelPosition ? barLabelCutoffMobile : null,
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
	const parentBlockId = select('core/block-editor').getBlockParentsByBlockName(
		clientId,
		'prc-block/chart-builder-data-wrapper',
	)[0];
	const tableData = useSelect((select) => {
		const tableBlock = select('core/block-editor')
			.getBlocks(parentBlockId)
			.find((block) => 'core/table' === block.name);
		const tableHeaders = tableBlock.attributes.head[0].cells.map(
			(c) => c.content,
		);
		const { body } = tableBlock.attributes;
		return { tableHeaders, body };
	}, []);

	const tableJson = formattedData(tableData, xScale, chartType);
	const tableCategories = tableData.tableHeaders;
	let chartData;
	let renderedChart;
	if (tableCategories) {
		// Who needs splice? Use array literals to get all items in array after the first item :)
		const [, ...rest] = tableCategories;
		config.dataRender.categories = rest;
	}
	// For now, let's force pie charts to only use the first array of data, as they can only contain one series of data by rule.
	// Passing addtl data will break tool (bad).
	console.log({ attr, config, clientId, tableJson });
	if (tableJson) {
		switch (chartType) {
			case 'pie':
				chartData = tableJson;
				break;
			default:
				chartData = tableJson;
				break;
		}
		renderedChart = <ChartBuilderWrapper config={config} data={chartData} />;
	}
	return (
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
					bottomRight: !!isSelected,
					bottomLeft: false,
					topLeft: false,
				}}
				onResizeStop={(event, direction, elt, delta) => {
					setAttributes({
						height: parseInt(parseInt(height) + parseInt(delta.height), 10),
						width: parseInt(parseInt(width) + parseInt(delta.width), 10),
					});
					toggleSelection(true);
				}}
				onResizeStart={() => {
					toggleSelection(false);
				}}
			>
				<ChartControls
					attributes={attr}
					setAttributes={setAttributes}
					parentBlock={parentBlockId}
					clientId={clientId}
				/>
				{renderedChart}
				<canvas id="canvas" width="800" height="400" />
			</ResizableBox>
		</ChartBuilderTextWrapper>
	);
};

export default edit;
