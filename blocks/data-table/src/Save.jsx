/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import {
	RichText,
	useBlockProps,
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
} from '@wordpress/block-editor';

const Section = ({ type, rows }) => {
	if (!rows.length) {
		return null;
	}

	const Tag = `t${type}`;

	return (
		<Tag>
			{rows.map(({ cells }, rowIndex) => (
				<tr key={rowIndex}>
					{cells.map(
						(
							{ content, tag, scope, align, colspan, rowspan },
							cellIndex
						) => {
							const cellClasses = classnames({
								[`has-text-align-${align}`]: align,
							});

							return (
								<RichText.Content
									className={cellClasses || undefined}
									data-align={align}
									tagName={tag}
									value={content}
									key={cellIndex}
									scope={tag === 'th' ? scope : undefined}
									colSpan={colspan}
									rowSpan={rowspan}
								/>
							);
						}
					)}
				</tr>
			))}
		</Tag>
	);
};

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 * @return {WPElement} Element to render.
 */
export default function Save({ attributes }) {
	const { head, body, foot, caption } = attributes;
	const isEmpty = !head.length && !body.length && !foot.length;

	if (isEmpty) {
		return null;
	}

	const hasCaption = !RichText.isEmpty(caption);

	const colorProps = getColorClassesAndStyles(attributes);
	const borderProps = getBorderClassesAndStyles(attributes);

	const classes = classnames(colorProps.className, borderProps.className);

	const { blockProps } = useBlockProps.save();

	return (
		<figure {...blockProps}>
			<table
				className={classes === '' ? undefined : classes}
				style={{ ...colorProps.style, ...borderProps.style }}
			>
				<Section type="head" rows={head} />
				<Section type="body" rows={body} />
				<Section type="foot" rows={foot} />
			</table>
			{hasCaption && (
				<RichText.Content
					tagName="figcaption"
					value={caption}
					className="caption"
				/>
			)}
		</figure>
	);
}
