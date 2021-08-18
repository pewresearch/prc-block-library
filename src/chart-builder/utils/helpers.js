/**
 * Wordpress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { uploadMedia } from '@wordpress/media-utils';
/**
 * External dependencies
 */
import html2canvas from 'html2canvas';

// Transform data from table block into json useable for chart builder
export const formattedData = (data, scale, chartType) => {
    const { body, tableHeaders } = data;
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
    for (var i = 1; i < tableHeaders.length; i++) {
        var series = body
            .filter((row) => !isNaN(parseFloat(row.cells[i].content)))
            .map((row) => ({
                x: scaleData(row.cells[0].content, scale),
                y: parseFloat(row.cells[i].content),
                category: tableHeaders[i],
                yLabel: `${parseFloat(row.cells[i].content)}`,
            }));
        seriesData.push(series);
    }
    return seriesData;
};

export const stringToArrayOfNums = (str) => {
    return str
        .split(',')
        .map(Number)
        .filter((num) => !isNaN(num));
};

export const getDomain = (min, max, type, scale, axis, orientation) => {
    if (isNaN(min) || isNaN(max)) {
        return [0, 100];
    }
    // x axis is a bit of a misnomer for bar types. It refers exclusively to the dependent axis.
    if (type === 'bar' && axis === 'x') {
        return null;
    }
    if (type === 'stacked-bar' && axis === 'x') {
        return null;
    }
    if (type === 'dot-plot' && axis === 'x') {
        return null;
    }
    // likewise, no domain for a pie chart
    if (type === 'pie') {
        return null;
    }
    if (scale === 'time' && axis === 'x') {
        return [new Date(min, 0), new Date(max, 0)];
    }
    return [parseFloat(min), parseFloat(max)];
};

export const getTicks = (ticks, scale) => {
    if (scale === 'time') {
        return ticks.map((tick) => new Date(`${tick}`));
    }
    return ticks;
};

export const formatNum = (num, output) => {
    if (typeof num === 'string' && output === 'integer') {
        return parseInt(num);
    }
    if (typeof num === 'string' && output === 'float') {
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
            function (blob) {
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
    var blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    console.log({ blob, url });
    upload(blob, `chart-${clientId}-${Date.now()}.svg`, 'image/svg+xml');
};

export const formatLegacyAttrs = (legacyMeta, attributes) => {
    console.log({ legacyMeta });
    const checkEmptyStr = (legacyAttr, attr) =>
        legacyAttr.length !== 0 ? legacyAttr : attr;
    const legacyType = (type) => {
        switch (type) {
            case 'bar':
                return { type: 'bar', orientation: 'vertical' };
            case 'column':
                return { type: 'bar', orientation: 'horizontal' };
            case 'line':
                return { type: 'line', orientation: 'horizontal' };
            case 'area':
                return { type: 'area', orientation: 'horizontal' };
            case 'scatter':
                return { type: 'scatter', orientation: 'horizontal' };
            case 'pie':
                return { type: 'pie', orientation: 'horizontal' };
            default:
                return { type: 'bar', orientation: 'horizontal' };
        }
    };
    return {
        chartType: legacyType(legacyMeta['cb_type']).type,
        chartOrientation: legacyType(legacyMeta['cb_type']).orientation,
        xScale: legacyMeta['cb_xaxis_type'] === 'datetime' ? 'time' : 'linear',
        xLabel: checkEmptyStr(legacyMeta['cb_xaxis_label'], attributes.xLabel),
        yLabel: checkEmptyStr(legacyMeta['cb_yaxis_label'], attributes.yLabel),
        yMaxDomain: checkEmptyStr(
            legacyMeta['cb_yaxis_max_value'],
            attributes.yMaxDomain,
        ),
        metaSubtitle: checkEmptyStr(
            legacyMeta['cb_subtitle'],
            attributes.metaSubtitle,
        ),
        lineNodes: legacyMeta['cb_hide_markers'],
        tooltipActive: legacyMeta['cb_enable_inline_tooltips'],
        isConvertedChart: false,
    };
};
