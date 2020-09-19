/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { create, join, split, toHTMLString } from '@wordpress/rich-text';

const transforms = {
    from: [
        {
            type: 'block',
            isMultiBlock: true,
            blocks: ['core/paragraph'],
            transform: attributes => {
                return createBlock('prc-block/pullquote', {
                    value: toHTMLString({
                        value: join(
                            attributes.map(({ content }) =>
                                create({ html: content })),
                            '\u2028',
                        ),
                        multilineTag: 'p',
                    }),
                    anchor: attributes.anchor,
                });
            },
        },
        {
            type: 'block',
            blocks: ['core/heading'],
            transform: ({ content, anchor }) => {
                return createBlock('prc-block/pullquote', {
                    value: `<p>${content}</p>`,
                    anchor,
                });
            },
        },
    ],
    to: [
        {
            type: 'block',
            blocks: ['core/paragraph'],
            transform: ({ value, citation }) => {
                const paragraphs = [];
                if (value && '<p></p>' !== value) {
                    paragraphs.push(
                        ...split(
                            create({ html: value, multilineTag: 'p' }),
                            '\u2028',
                        ).map(piece =>
                            createBlock('core/paragraph', {
                                content: toHTMLString({ value: piece }),
                            })),
                    );
                }
                if (citation && '<p></p>' !== citation) {
                    paragraphs.push(
                        createBlock('core/paragraph', {
                            content: citation,
                        }),
                    );
                }
                if (0 === paragraphs.length) {
                    return createBlock('core/paragraph', {
                        content: '',
                    });
                }
                return paragraphs;
            },
        },
        {
            type: 'block',
            blocks: ['core/heading'],
            transform: ({ value, citation, ...attrs }) => {
                // If there is no pullquote content, use the citation as the
                // content of the resulting heading. A nonexistent citation
                // will result in an empty heading.
                if ('<p></p>' === value) {
                    return createBlock('core/heading', {
                        content: citation,
                    });
                }
                const pieces = split(
                    create({ html: value, multilineTag: 'p' }),
                    '\u2028',
                );
                const headingBlock = createBlock('core/heading', {
                    content: toHTMLString({ value: pieces[0] }),
                });
                if (!citation && 1 === pieces.length) {
                    return headingBlock;
                }
                const quotePieces = pieces.slice(1);
                const pullquoteBlock = createBlock('prc-block/pullquote', {
                    ...attrs,
                    citation,
                    value: toHTMLString({
                        value: quotePieces.length
                            ? join(pieces.slice(1), '\u2028')
                            : create(),
                        multilineTag: 'p',
                    }),
                });
                return [headingBlock, pullquoteBlock];
            },
        },
    ],
};

export default transforms;
