import { Fragment } from '@wordpress/element';
import { Picture } from 'react-responsive-picture';
import { addQueryArgs } from '@wordpress/url';

const Display = ({ img, size, link }) => {
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

    return (
        <Fragment>
            {'' === link && (
                <Picture
                    style={{ display: 'block' }}
                    sources={getImgSrcSet(img, size)}
                />
            )}
            {'' !== link && (
                <a href={link}>
                    <Picture
                        style={{ display: 'block' }}
                        sources={getImgSrcSet(img, size)}
                    />
                </a>
            )}
        </Fragment>
    );
};

export default Display;
