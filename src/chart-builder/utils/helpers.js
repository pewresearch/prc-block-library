// Transform data from table block into json useable for chart builder
export const formattedData = (data, scale, chartType) => {
    const { body, tableHeaders } = data;
    const seriesData = [];
    const scaleData = (data, scale) => {
        if (chartType === 'bar') {
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
    if (type === 'bar' && axis === 'x') {
        // x axis is a bit of a misnomer for bars. It refers exclusively to the dependent axis.
        return null;
    }
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

export const svgToCanvasToPng = (svg) => {};
