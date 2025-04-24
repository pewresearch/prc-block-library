/**
 * External Dependencies
 */
import clsx from 'clsx';
import type { Properties } from 'csstype';

/**
 * WordPress Dependencies
 */
import {
	RichText,
	useBlockProps,
	// @ts-ignore: has no exported member
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
} from '@wordpress/block-editor';
import type { BlockSaveProps } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import { convertToObject } from './utils/style-converter';
import { toInteger } from './utils/helper';
import type { BlockAttributes, SectionName, Row } from './block-attributes';

// To fix a problem with link colors not being applied
const v1 = {
	attributes: {
		contentJustification: {
			type: 'string',
		},
		hasFixedLayout: {
			type: 'boolean',
			default: true,
		},
		isScrollOnPc: {
			type: 'boolean',
			default: false,
		},
		isScrollOnMobile: {
			type: 'boolean',
			default: false,
		},
		isStackedOnMobile: {
			type: 'boolean',
			default: false,
		},
		sticky: {
			type: 'string',
		},
		tableStyles: {
			type: 'string',
			source: 'attribute',
			selector: 'table',
			attribute: 'style',
		},
		captionSide: {
			type: 'string',
			default: 'bottom',
		},
		caption: {
			type: 'string',
			source: 'html',
			selector: 'figcaption',
		},
		captionStyles: {
			type: 'string',
			source: 'attribute',
			selector: 'figcaption',
			attribute: 'style',
		},
		head: {
			type: 'array',
			default: [],
			source: 'query',
			selector: 'thead tr',
			query: {
				cells: {
					type: 'array',
					default: [],
					source: 'query',
					selector: 'td,th',
					query: {
						content: {
							type: 'string',
							source: 'html',
						},
						styles: {
							type: 'string',
							source: 'attribute',
							attribute: 'style',
						},
						tag: {
							type: 'string',
							default: 'td',
							source: 'tag',
						},
						className: {
							type: 'string',
							source: 'attribute',
							attribute: 'class',
						},
						id: {
							type: 'string',
							source: 'attribute',
							attribute: 'id',
						},
						headers: {
							type: 'string',
							source: 'attribute',
							attribute: 'headers',
						},
						scope: {
							enum: [ 'row', 'col', 'rowgroup', 'colgroup' ],
							source: 'attribute',
							attribute: 'scope',
						},
						rowSpan: {
							type: 'string',
							source: 'attribute',
							attribute: 'rowspan',
						},
						colSpan: {
							type: 'string',
							source: 'attribute',
							attribute: 'colspan',
						},
					},
				},
			},
		},
		body: {
			type: 'array',
			default: [],
			source: 'query',
			selector: 'tbody tr',
			query: {
				cells: {
					type: 'array',
					default: [],
					source: 'query',
					selector: 'td,th',
					query: {
						content: {
							type: 'string',
							source: 'html',
						},
						styles: {
							type: 'string',
							source: 'attribute',
							attribute: 'style',
						},
						tag: {
							type: 'string',
							default: 'td',
							source: 'tag',
						},
						className: {
							type: 'string',
							source: 'attribute',
							attribute: 'class',
						},
						id: {
							type: 'string',
							source: 'attribute',
							attribute: 'id',
						},
						headers: {
							type: 'string',
							source: 'attribute',
							attribute: 'headers',
						},
						scope: {
							enum: [ 'row', 'col', 'rowgroup', 'colgroup' ],
							source: 'attribute',
							attribute: 'scope',
						},
						rowSpan: {
							type: 'string',
							source: 'attribute',
							attribute: 'rowspan',
						},
						colSpan: {
							type: 'string',
							source: 'attribute',
							attribute: 'colspan',
						},
					},
				},
			},
		},
		foot: {
			type: 'array',
			default: [],
			source: 'query',
			selector: 'tfoot tr',
			query: {
				cells: {
					type: 'array',
					default: [],
					source: 'query',
					selector: 'td,th',
					query: {
						content: {
							type: 'string',
							source: 'html',
						},
						styles: {
							type: 'string',
							source: 'attribute',
							attribute: 'style',
						},
						tag: {
							type: 'string',
							default: 'td',
							source: 'tag',
						},
						className: {
							type: 'string',
							source: 'attribute',
							attribute: 'class',
						},
						id: {
							type: 'string',
							source: 'attribute',
							attribute: 'id',
						},
						headers: {
							type: 'string',
							source: 'attribute',
							attribute: 'headers',
						},
						scope: {
							enum: [ 'row', 'col', 'rowgroup', 'colgroup' ],
							source: 'attribute',
							attribute: 'scope',
						},
						rowSpan: {
							type: 'string',
							source: 'attribute',
							attribute: 'rowspan',
						},
						colSpan: {
							type: 'string',
							source: 'attribute',
							attribute: 'colspan',
						},
					},
				},
			},
		},
	},
	supports: {
		anchor: true,
		align: [ 'left', 'right', 'wide', 'full' ],
		color: {
			__experimentalSkipSerialization: true,
			gradients: true,
			link: true,
		},
		typography: {
			fontSize: true,
			lineHeight: true,
			__experimentalFontFamily: true,
			__experimentalTextTransform: true,
			__experimentalFontStyle: true,
			__experimentalFontWeight: true,
			__experimentalLetterSpacing: true,
		},
		spacing: {
			margin: true,
		},
		__experimentalSelector: '.wp-block-flexible-table-block-table > table',
	},
	save( { attributes }: BlockSaveProps< BlockAttributes > ) {
		const {
			contentJustification,
			tableStyles,
			hasFixedLayout,
			isStackedOnMobile,
			isScrollOnPc,
			isScrollOnMobile,
			sticky,
			head,
			body,
			foot,
			caption,
			captionSide,
			captionStyles,
		} = attributes;

		const isEmpty: boolean = ! head.length && ! body.length && ! foot.length;

		if ( isEmpty ) {
			return null;
		}

		const tableStylesObj: Properties = convertToObject( tableStyles );
		const captionStylesObj: Properties = convertToObject( captionStyles );

		const colorProps = getColorClassesAndStyles( attributes );

		const blockProps = useBlockProps.save( {
			className: clsx( {
				[ `is-content-justification-${ contentJustification }` ]: contentJustification,
				'is-scroll-on-pc': isScrollOnPc,
				'is-scroll-on-mobile': isScrollOnMobile,
			} ),
		} );

		const tableClasses: string = clsx( colorProps.className, {
			'has-fixed-layout': hasFixedLayout,
			'is-stacked-on-mobile': isStackedOnMobile,
			[ `is-sticky-${ sticky }` ]: sticky,
		} );

		const hasCaption: boolean = ! RichText.isEmpty( caption || '' );

		const Section = ( { type, rows }: { type: SectionName; rows: Row[] } ) => {
			if ( ! rows.length ) {
				return null;
			}

			const Tag = `t${ type }` as const;

			return (
				<Tag>
					{ rows.map( ( { cells }, rowIndex ) => (
						<tr key={ rowIndex }>
							{ cells.map(
								(
									{ content, tag, className, id, headers, scope, rowSpan, colSpan, styles },
									cellIndex
								) => (
									<RichText.Content
										key={ cellIndex }
										tagName={ tag }
										className={ className || undefined }
										id={ ( tag === 'th' && id ) || undefined }
										headers={ headers || undefined }
										scope={ ( tag === 'th' && scope ) || undefined }
										value={ content }
										rowSpan={ toInteger( rowSpan ) > 1 ? toInteger( rowSpan ) : undefined }
										colSpan={ toInteger( colSpan ) > 1 ? toInteger( colSpan ) : undefined }
										style={ convertToObject( styles ) }
									/>
								)
							) }
						</tr>
					) ) }
				</Tag>
			);
		};

		const Caption = () => (
			<RichText.Content tagName="figcaption" value={ caption || '' } style={ captionStylesObj } />
		);

		return (
			<figure { ...blockProps }>
				{ hasCaption && 'top' === captionSide && <Caption /> }
				<table
					className={ tableClasses ?? undefined }
					style={ { ...tableStylesObj, ...colorProps.style } }
				>
					<Section type="head" rows={ head } />
					<Section type="body" rows={ body } />
					<Section type="foot" rows={ foot } />
				</table>
				{ hasCaption && 'bottom' === captionSide && <Caption /> }
			</figure>
		);
	},
};

export default [ v1 ];
