import { Fragment } from '@wordpress/element';
import { Picture } from 'react-responsive-picture';
import { addQueryArgs } from '@wordpress/url';
import classNames from 'classnames/bind';

const Display = ({ img, size, link, onClick = false }) => {
    // eslint-disable-next-line no-shadow
    const getImgURL = (url, size, variant) => {
        if ('' === url || false === url) {
            return url;
        }

        const A1 = {
            default: '564,317',
            small: '354,194',
            hidpi: '1128,634',
            smallHidpi: '708,388',
        };

        const A2 = {
            default: '268,151',
            small: '354,194',
            hidpi: '536,301',
            smallHidpi: '708,388',
        };

        const A3 = {
            default: '194,110',
            small: '148,84',
            hidpi: '388,220',
            smallHidpi: '296,168',
        };

        const A4 = {
            default: '268,151',
            small: '354,194',
            hidpi: '536,302',
            smallHidpi: '708,388',
        };

        const XL = {
            default: '720,405',
            small: '354,194',
            hidpi: '1440,810',
            smallHidpi: '708,388',
        };

        const legacy = {
            '260': {
                default: '260,260',
                small: '260,260',
                hidpi: '520,520',
                smallHidpi: '520,520',
            },
            '260-173': {
                default: '260,173',
                small: '260,173',
                hidpi: '520,346',
                smallHidpi: '520,346',
            },
        };

        // Default to A1
        let args = { resize: A1[variant] };
        if ('A2' === size) {
            args = { resize: A2[variant] };
        } else if ('A3' === size) {
            args = { resize: A3[variant] };
        } else if ('A4' === size) {
            args = { resize: A4[variant] };
        } else if ('XL' === size) {
            args = { resize: XL[variant] };
        }

        // Temp legacy sizes for homepages
        if ('legacy-260' === size) {
            args = { resize: legacy['260'][variant] };
        } else if ('legacy-260-173' === size) {
            args = { resize: legacy['260-173'][variant] };
        }

        return addQueryArgs(url, args);
    };

    // eslint-disable-next-line no-shadow
    const getImgSrcSet = (url, size, threshold = 420) => {
        return [
            {
                srcSet: `${getImgURL(url, size, 'default')} 1x, ${getImgURL(
                    url,
                    size,
                    'hidpi',
                )} 2x`,
                media: `(min-width: ${threshold}px)`,
            },
            {
                srcSet: `${getImgURL(url, size, 'small')} 1x, ${getImgURL(
                    url,
                    size,
                    'smallHidpi',
                )} 2x`,
                media: `(max-width: ${threshold}px)`,
            },
        ];
    };

    if (false !== onClick) {
        return (
            <div onClick={onClick}>
                <Picture sources={getImgSrcSet(img, size)} />
            </div>
        );
    }

    return (
        <Fragment>
            {'' === link && <Picture sources={getImgSrcSet(img, size)} />}
            {'' !== link && (
                <a href={link}>
                    <Picture sources={getImgSrcSet(img, size)} />
                </a>
            )}
        </Fragment>
    );
};

const Img = ({ img, link, size, slot, chartArt }) => {
    const classes = () => {
        let isMedium = false;
        let isXL = false;
        let isA1 = false;
        let isA2 = false;
        let isA3 = false;
        let isA4 = false;
        if (false !== slot) {
            if ('XL' === size) {
                isXL = true;
            } else if ('A1' === size) {
                isA1 = true;
            } else if ('A2' === size) {
                isA2 = true;
            } else if ('A3' === size) {
                isA3 = true;
            } else if ('A4' === size) {
                isA4 = true;
            } else if ('left' === slot || 'right' === slot) {
                isMedium = true;
            }
        }

        return classNames({
            ui: true,
            XL: isXL,
            A1: isA1,
            A2: isA2,
            A3: isA3,
            A4: isA4,
            medium: isMedium,
            image: true,
            bordered: chartArt,
        });
    };

    return (
        <div className={classes()}>
            <Display img={img} size={size} link={link} />
        </div>
    );
};

export default Img;
export { Display, Img };
