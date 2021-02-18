/**
 * External dependencies
 */
import { sumBy, merge, mapValues } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Platform } from '@wordpress/element';

/**
 * Returns a column width attribute value rounded to standard precision.
 * Returns `undefined` if the value is not a valid finite number.
 *
 * @param {?number} value Raw value.
 *
 * @return {number} Value rounded to standard precision.
 */
export const toWidthPrecision = value => {
    const unitlessValue = parseFloat(value);
    return Number.isInteger(unitlessValue)
        ? parseFloat(Math.round(unitlessValue))
        : undefined;
};
/**
 * Returns an effective width for a given block. An effective width is equal to
 * its attribute value if set, or a computed value assuming equal distribution.
 *
 * @param {WPBlock} block           Block object.
 * @param {number}  totalBlockCount Total number of blocks in Columns.
 *
 * @return {number} Effective column width.
 */
export function getEffectiveColumnWidth(block, totalBlockCount) {
    const { width = 100 / totalBlockCount } = block.attributes;
    return toWidthPrecision(width);
}

/**
 * Returns the total width occupied by the given set of column blocks.
 *
 * @param {WPBlock[]} blocks          Block objects.
 * @param {?number}   totalBlockCount Total number of blocks in Columns.
 *                                    Defaults to number of blocks passed.
 *
 * @return {number} Total width occupied by blocks.
 */
export function getTotalColumnsWidth(blocks, totalBlockCount = blocks.length) {
    console.log('getTotalColumnsWidth', blocks, totalBlockCount);
    return sumBy(blocks, block =>
        getEffectiveColumnWidth(block, totalBlockCount),
    );
}

/**
 * Returns an object of `clientId` → `width` of effective column widths.
 *
 * @param {WPBlock[]} blocks          Block objects.
 * @param {?number}   totalBlockCount Total number of blocks in Columns.
 *                                    Defaults to number of blocks passed.
 *
 * @return {Object<string,number>} Column widths.
 */
export function getColumnWidths(blocks, totalBlockCount = blocks.length) {
    return blocks.reduce((accumulator, block) => {
        const width = getEffectiveColumnWidth(block, totalBlockCount);
        return Object.assign(accumulator, { [block.clientId]: width });
    }, {});
}

/**
 * Returns an object of `clientId` → `width` of column widths as redistributed
 * proportional to their current widths, constrained or expanded to fit within
 * the given available width.
 *
 * @param {WPBlock[]} blocks          Block objects.
 * @param {number}    availableWidth  Maximum width to fit within.
 * @param {?number}   totalBlockCount Total number of blocks in Columns.
 *                                    Defaults to number of blocks passed.
 *
 * @return {Object<string,number>} Redistributed column widths.
 */
export function getRedistributedColumnWidths(
    blocks,
    availableWidth,
    totalBlockCount = blocks.length,
) {
    console.log(
        'getRedistributedColumnWidths',
        availableWidth,
        totalBlockCount,
    );
    const totalWidth = getTotalColumnsWidth(blocks, totalBlockCount);
    console.log('getTotalColumnsWidth === ', totalWidth);

    return mapValues(getColumnWidths(blocks, totalBlockCount), width => {
        console.log('width?', width);
        const newWidth = (availableWidth * width) / totalWidth;
        console.log('newWidth?', newWidth);
        return toWidthPrecision(newWidth);
    });
}

/**
 * Returns true if column blocks within the provided set are assigned with
 * explicit single column widths, or false otherwise.
 *
 * @param {WPBlock[]} blocks Block objects.
 *
 * @return {boolean} Whether columns have explicit widths.
 */
export function hasExplicitPercentColumnWidths(blocks) {
    return blocks.every(block => {
        const blockWidth = block.attributes.width;
        console.log('hasExplicitPercentColumnWidths?', blockWidth);
        return Number.isInteger(blockWidth);
    });
}

/**
 * Returns a copy of the given set of blocks with new widths assigned from the
 * provided object of redistributed column widths.
 *
 * @param {WPBlock[]}             blocks Block objects.
 * @param {Object<string,number>} widths Redistributed column widths.
 *
 * @return {WPBlock[]} blocks Mapped block objects.
 */
export function getMappedColumnWidths(blocks, widths) {
    return blocks.map(block =>
        merge({}, block, {
            attributes: {
                width: widths[block.clientId],
            },
        }),
    );
}

/**
 * Returns an array with columns widths values, parsed or no depends on `withParsing` flag.
 *
 * @param {WPBlock[]} blocks			Block objects.
 * @param {?boolean} withParsing 	Whether value has to be parsed.
 *
 * @return {Array<number,string>} Column widths.
 */
export function getWidths(blocks, withParsing = true) {
    return blocks.map(innerColumn => {
        const innerColumnWidth =
            innerColumn.attributes.width || 100 / blocks.length;

        return withParsing ? parseFloat(innerColumnWidth) : innerColumnWidth;
    });
}

const isWeb = 'web' === Platform.OS;

export const CSS_UNITS = [
    {
        value: '%',
        label: isWeb ? '%' : __('Percentage (%)'),
        default: '',
    },
    {
        value: 'px',
        label: isWeb ? 'px' : __('Pixels (px)'),
        default: '',
    },
    {
        value: 'em',
        label: isWeb ? 'em' : __('Relative to parent font size (em)'),
        default: '',
    },
    {
        value: 'rem',
        label: isWeb ? 'rem' : __('Relative to root font size (rem)'),
        default: '',
    },
    {
        value: 'vw',
        label: isWeb ? 'vw' : __('Viewport width (vw)'),
        default: '',
    },
];

/**
 * Returns a boolean whether passed unit is percentage
 *
 * @param {string} unit Column width unit.
 *
 * @return {boolean} 	Whether unit is '%'.
 */
export function isPercentageUnit(unit) {
    return '%' === unit;
}
