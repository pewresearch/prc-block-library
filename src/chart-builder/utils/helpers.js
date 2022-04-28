/* eslint-disable indent */
/**
 * Wordpress dependencies
 */
import { uploadMedia } from '@wordpress/media-utils';
/**
 * External dependencies
 */
import html2canvas from 'html2canvas';
import horizontalBarConfig from '@pewresearch/chart-builder/dist/Templates/horizontalBar';
import verticalBarConfig from '@pewresearch/chart-builder/dist/Templates/verticalBar';
import lineConfig from '@pewresearch/chart-builder/dist/Templates/line';
import scatterConfig from '@pewresearch/chart-builder/dist/Templates/scatter';
// Transform data from table block into json useable for chart builder
export const formattedData = (data, scale, chartType) => {
	const { body, tableHeaders } = data;
	const seriesData = [];
	const scaleData = (data, scale) => {
		if (
			'bar' === chartType ||
			'stacked-bar' === chartType ||
			'pie' === chartType ||
			'dot-plot' === chartType
		) {
			return data;
		}
		if ('time' === scale) {
			return new Date(data).getTime();
		}
		return parseFloat(data);
	};
	for (let i = 1; i < tableHeaders.length; i++) {
		const series = body
			.filter((row) => !Number.isNaN(parseFloat(row.cells[i].content)))
			.map((row) => ({
				x: scaleData(row.cells[0].content, scale),
				y: parseFloat(row.cells[i].content.replace(/[^.a-zA-Z0-9]/g, '')),
				category: tableHeaders[i],
				// yLabel: `${parseFloat(row.cells[i].content)}`,
			}));
		seriesData.push(series);
	}
	return seriesData;
};

export const stringToArrayOfNums = (str) =>
	str
		.split(',')
		.map(Number)
		.filter((num) => !isNaN(num));

export const getDomain = (min, max, type, scale, axis, orientation) => {
	if (isNaN(min) || isNaN(max)) {
		return [0, 100];
	}
	// x axis is a bit of a misnomer for bar types. It refers exclusively to the dependent axis.
	if ('bar' === type && 'x' === axis) {
		return null;
	}
	if ('stacked-bar' === type && 'x' === axis) {
		return null;
	}
	if ('dot-plot' === type && 'x' === axis) {
		return null;
	}
	// likewise, no domain for a pie chart
	if ('pie' === type) {
		return null;
	}
	if ('time' === scale && 'x' === axis) {
		return [new Date(min, 0), new Date(max, 0)];
	}
	return [parseFloat(min), parseFloat(max)];
};

export const getTicks = (ticks, scale) => {
	if ('time' === scale) {
		return ticks.map((tick) => new Date(`${tick}`));
	}
	return ticks;
};

export const formatNum = (num, output) => {
	if ('string' === typeof num && 'integer' === output) {
		return parseInt(num);
	}
	if ('string' === typeof num && 'float' === output) {
		return parseFloat(num);
	}
	return num;
};

export const uploadToMediaLibrary = (blob, name, type) => {
	uploadMedia({
		filesList: [
			new File([blob], name, {
				type,
			}),
		],
		onFileChange: ([fileObj]) => {
			console.log({ fileObj });
			const { editPost } = dispatch('core/editor');
			editPost({ featured_media: fileObj.id });
		},
		onError: console.error,
	});
};

export const createHTMLCanvas = (clientId) => {
	const blockEl = document.querySelector(`[data-block="${clientId}"]`);
	html2canvas(blockEl).then((canvas) => {
		canvas.toBlob(
			(blob) => {
				uploadToMediaLibrary(
					blob,
					`chart-${clientId}-${Date.now()}.png`,
					'image/png',
				);
			},
			'image/png',
			1,
		);
	});
};

export const createSvg = (clientId) => {
	const blockEl = document.querySelector(`[data-block="${clientId}"]`);
	const svg = blockEl.querySelector('svg');
	svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
	console.log(svg.outerHTML);
	const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
	const url = URL.createObjectURL(blob);
	console.log({ blob, url });
	upload(blob, `chart-${clientId}-${Date.now()}.svg`, 'image/svg+xml');
};

export const formatLegacyAttrs = (legacyMeta, attributes) => {
	console.log({ legacyMeta });
	const checkEmptyStr = (legacyAttr, attr) =>
		0 !== legacyAttr.length ? legacyAttr : attr;
	const getLegacyConfig = (type) => {
		switch (type) {
			case 'bar':
				return verticalBarConfig;
			case 'column':
				return horizontalBarConfig;
			case 'line':
				return lineConfig;
			case 'area':
				return lineConfig;
			case 'scatter':
				return scatterConfig;
			case 'pie':
				return verticalBarConfig;
			default:
				return verticalBarConfig;
		}
	};
	const legacyConfig = getLegacyConfig(legacyMeta.cb_type);
	const { layout, legend, bar, labels } = legacyConfig;
	return {
		chartType: layout.type,
		chartOrientation: layout.orientation,
		width: layout.width,
		height: layout.height,
		paddingTop: layout.padding.top,
		paddingRight: layout.padding.right,
		paddingBottom: layout.padding.bottom,
		paddingLeft: layout.padding.left,
		xScale: 'datetime' === legacyMeta.cb_xaxis_type ? 'time' : 'linear',
		xLabel: checkEmptyStr(legacyMeta.cb_xaxis_label, attributes.xLabel),
		yLabel: checkEmptyStr(legacyMeta.cb_yaxis_label, attributes.yLabel),
		yMaxDomain: checkEmptyStr(
			legacyMeta.cb_yaxis_max_value,
			attributes.yMaxDomain,
		),
		metaSubtitle: checkEmptyStr(
			legacyMeta.cb_subtitle,
			attributes.metaSubtitle,
		),
		xMinDomain: 'datetime' === legacyMeta.cb_xaxis_type ? 1960 : 0,
		xMaxDomain: 'datetime' === legacyMeta.cb_xaxis_type ? 2020 : 100,
		lineNodes: legacyMeta.cb_hide_markers,
		tooltipActive: legacyMeta.cb_enable_inline_tooltips,
		labelPositionDX: labels.labelPositionDX,
		labelPositionDY: labels.labelPositionDY,
		isConvertedChart: false,
	};
};
