/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

const edit = ({ attributes, className, context }) => {
	const { quote, attribution } = attributes;
	const styles = context['prc-block/quote-sorter-attribution-styles'];
	const blockProps = useBlockProps({
		className: classnames(className, 'ui list'),
	});
	return (
		<div {...blockProps}>
			<div className="content">
				<div className="description">{quote}</div>
			</div>
			<div className="extra content">
				<div
					className="attribution"
					style={{
						color: styles.color,
						fontSize: styles.fontSize,
						fontStyle: styles.fontStyle,
						fontWeight: styles.fontWeight,
						fontFamily: styles.fontFamily,
						lineHeight: styles.lineHeight,
						textDecoration: styles.textDecoration,
						textTransform: styles.textTransform,
						textAlign: styles.textAlign,
					}}
				>
					{attribution}
				</div>
			</div>
		</div>
	);
};

export default edit;
