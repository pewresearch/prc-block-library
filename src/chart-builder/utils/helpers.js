/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable indent */
/**
 * Wordpress dependencies
 */
import { uploadMedia } from '@wordpress/media-utils';
import { dispatch } from '@wordpress/data';
/**
 * External dependencies
 */
import html2canvas from 'html2canvas';
import {
	legacyBarTemplate,
	legacyLineTemplate,
	legacyColumnTemplate,
	legacyAreaTemplate,
	legacyScatterTemplate,
} from '../../chart-builder-data-wrapper/templateBlocks';

/**
 *  Internal dependencies
 */

// Transform data from table block into json useable for chart builder
export const formattedData = (data, scale, chartType) => {
	console.log({ data });
	const { body, tableHeaders } = data;
	const seriesData = [];
	const scaleData = (d, s) => {
		if (
			'bar' === chartType ||
			'stacked-bar' === chartType ||
			'pie' === chartType ||
			'dot-plot' === chartType
		) {
			return d;
		}
		if ('time' === s) {
			return new Date(d);
		}
		return parseFloat(d);
	};
	for (let i = 1; i < tableHeaders.length; i++) {
		const series = body
			.filter(
				(row) =>
					!Number.isNaN(
						parseFloat(row.cells[i].content.replace(/[^0-9.]/g, '')),
					),
			)
			.map((row) => ({
				x: scaleData(row.cells[0].content, scale),
				y: parseFloat(row.cells[i].content.replace(/[^0-9.]/g, '')),
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
		.filter((num) => !Number.isNaN(num));

export const getDomain = (min, max, type, scale, axis) => {
	if (Number.isNaN(min) || Number.isNaN(max)) {
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
		return parseInt(num, 10);
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
	upload(blob, `chart-${clientId}-${Date.now()}.svg`, 'image/svg+xml');
};

export const formatLegacyAttrs = (legacyMeta, attributes, siteID) => {
	const checkEmptyStr = (legacyAttr, attr) =>
		0 !== legacyAttr.length ? legacyAttr : attr;
	const getLegacyConfig = (type) => {
		switch (type) {
			case 'bar':
				return legacyBarTemplate[1][1];
			case 'column':
				return legacyColumnTemplate[1][1];
			case 'line':
				return legacyLineTemplate[1][1];
			case 'area':
				return legacyAreaTemplate[1][1];
			case 'scatter':
				return legacyScatterTemplate[1][1];
			case 'pie':
				return legacyColumnTemplate[1][1];
			default:
				return legacyColumnTemplate[1][1];
		}
	};
	const getColorSpectrum = (id) => {
		switch (id) {
			case 1:
				return 'general';
			case 2:
				return 'global-spectrum';
			case 3:
				return 'social-trends-spectrum';
			case 4:
				return 'politics-spectrum';
			case 5:
				return 'hispanic-spectrum';
			case 7:
				return 'religion-spectrum';
			case 8:
				return 'journalism-spectrum';
			case 9:
				return 'internet-spectrum';
			case 10:
				return 'purple-spectrum';
			case 18:
				return 'hispanic-spectrum';
			default:
				return 'general';
		}
	};
	const legacyConfig = getLegacyConfig(legacyMeta.cb_type);
	return {
		...legacyConfig,
		xScale:
			'datetime' === legacyMeta.cb_xaxis_type && 'column' !== legacyMeta.cb_type
				? 'time'
				: 'linear',
		xLabel: checkEmptyStr(legacyMeta.cb_xaxis_label, attributes.xLabel),
		yLabel: checkEmptyStr(legacyMeta.cb_yaxis_label, attributes.yLabel),
		yMaxDomain: checkEmptyStr(
			legacyMeta.cb_yaxis_max_value,
			attributes.yMaxDomain,
		),
		metaTitle: checkEmptyStr(legacyMeta.title, attributes.metaTitle),
		metaSubtitle: checkEmptyStr(
			legacyMeta.cb_subtitle,
			attributes.metaSubtitle,
		),
		xMinDomain: 'datetime' === legacyMeta.cb_xaxis_type ? 1960 : 0,
		xMaxDomain: 'datetime' === legacyMeta.cb_xaxis_type ? 2020 : 100,
		lineNodes: !legacyMeta.cb_hide_markers,
		tooltipActive: legacyMeta.cb_enable_inline_tooltips,
		isConvertedChart: false,
		colorValue: getColorSpectrum(siteID),
	};
};
