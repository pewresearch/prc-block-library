/**
 * External Dependencies
 */
import classNames from 'classnames/bind';

/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';


const IMAGE_SIZES = {
    A1: [1128, 634],
    A2: [526, 301],
    A3: [388, 220],
    A4: [536, 302],
    XL: [1440, 810],
};

const Preview = ( { attributes } ) => {
    const {
        title,
        excerpt,
        extra,
        label,
        date,
        image,
        imageSlot,
        imageSize,
        isChartArt,
        headerSize,
        enableEmphasis,
        enableHeader,
        enableExcerpt,
        enableExcerptBelow,
        enableExtra,
        enableBreakingNews,
        enableMeta,
        className,
    } = attributes;

    const logicalClasses = {
        bordered: enableEmphasis,
        'alt-excerpt': enableExcerptBelow,
    };
    if ( 'disbaled' !== imageSlot ) {
        logicalClasses[imageSlot] = true;
        logicalClasses['aligned'] = true;
    }
    const blockPropsArgs = {
        className: classNames('story item', className, logicalClasses),
    }
    if ( 'disabled' !== imageSlot && imageSize.length > 0) {
        blockPropsArgs['data-image-size'] = imageSize;
    }

    const blockProps = useBlockProps(blockPropsArgs);

    const headerClasses = classNames('header', {
        large: 1 === headerSize,
        medium: 2 === headerSize,
        small: 3 === headerSize,
        light: false,
    });

	const imageClasses = classNames('image', {
		'bordered': isChartArt,
		XL: 'XL' === imageSize,
		A4: 'A4' === imageSize,
		A3: 'A3' === imageSize,
		A2: 'A2' === imageSize,
		A1: 'A1' === imageSize,
	});

    const excerptClasses = classNames('excerpt');

    return(
        <article {...blockProps}>
            {enableMeta && (
                <div class="meta">
                    <span class="label">{label}</span> | <span class="date">{date}</span>
                </div>
            )}

            {'disabled' !== imageSlot && (
                <div class={`${imageClasses}`}>
                    <picture>
                        <img srcset={image} width={IMAGE_SIZES[imageSize][0]} height={IMAGE_SIZES[imageSize][1]}/>
                    </picture>
                </div>
            )}

            {enableHeader && (
                <header class={headerClasses}>
                    {title}
                </header>
            )}

            {enableExcerpt && (
                <RichText.Content
                    tagName="div"
                    value={excerpt}
                    multiline="p"
                    className={excerptClasses}
                />
            )}

            {enableExtra && (
                <RichText.Content
                    tagName="ul"
                    value={extra}
                    className="extra"
                />
            )}

            {true === enableBreakingNews && false !== window.prcBreakingNews && (
                <ul className="extra-breaking-news">
                    <li>
                        <a
                            href={window.prcBreakingNews.url}
                            className="kicker-breaking-news"
                        >
                            {window.prcBreakingNews.label}
                        </a>
                    </li>
                </ul>
            )}
        </article>
    );
}

export default Preview;
