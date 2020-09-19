/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { getColorClassName, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        customMainColor,
        textColor,
        customTextColor,
        value,
        citation,
        className,
    } = attributes;

    let figureClasses;
    const figureStyles = { '--mark-color': customMainColor };

    const blockquoteTextColorClass = getColorClassName('color', textColor);
    const blockquoteClasses =
        (textColor || customTextColor) &&
        classnames('has-text-color', {
            [blockquoteTextColorClass]: blockquoteTextColorClass,
        });

    const blockquoteStyles = blockquoteTextColorClass
        ? undefined
        : { color: customTextColor };

    return (
        <figure className={figureClasses} style={figureStyles}>
            <blockquote className={blockquoteClasses} style={blockquoteStyles}>
                <RichText.Content value={value} multiline />
                {!RichText.isEmpty(citation) && (
                    <RichText.Content tagName="cite" value={citation} />
                )}
            </blockquote>
        </figure>
    );
}
