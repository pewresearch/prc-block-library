/**
 * WordPress dependencies
 */
import { ResizableBox } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { select, useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
/**
 * External dependencies
 */
import {
	ChartBuilderWrapper,
	masterConfig,
	ChartBuilderTextWrapper,
} from '@pewresearch/chart-builder/dist';

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
	const [siteId] = useEntityProp('root', 'site', 'siteId');
	console.log({ siteId });
	useEffect(() => {
		if (isConvertedChart) {
			console.log('converting ...');
			const title = select('core/editor').getEditedPostAttribute('title');
			const meta = select('core/editor').getEditedPostAttribute('meta');
			const legacyMeta = { title, ...meta };
			console.log({ legacyMeta });
			const legacyAttrs = formatLegacyAttrs(legacyMeta, attr, siteId);
			console.log({ legacyAttrs });
			setAttributes(legacyAttrs);
		}
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
			ticks: {
				...masterConfig.xAxis.ticks,
				strokeWidth: attr.xTickMarksActive ? 1 : 0,
			},
			axisLabel: {
				...masterConfig.xAxis.axisLabel,
				fontSize: attr.xLabelFontSize,
				padding: attr.xLabelPadding,
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
			ticks: {
				...masterConfig.yAxis.ticks,
				strokeWidth: attr.yTickMarksActive ? 1 : 0,
			},
			axisLabel: {
				...masterConfig.yAxis.axisLabel,
				fontSize: attr.yLabelFontSize,
				padding: attr.yLabelPadding,
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
			formatNumber: attr.tooltipFormatNumber,
			offsetX: attr.tooltipOffsetX,
			offsetY: attr.tooltipOffsetY,
			maxHeight: attr.tooltipMaxHeight,
			maxWidth: attr.tooltipMaxWidth,
			caretPosition: attr.tooltipCaretPosition,
		},
		animate: {
			active: false,
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
			toFixedDecimal: attr.labelToFixedDecimal,
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
	console.log({ chartData, config });
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<ChartBuilderTextWrapper
				active={config.metadata.active}
				width={width}
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
		</div>
	);
};

export default edit;
