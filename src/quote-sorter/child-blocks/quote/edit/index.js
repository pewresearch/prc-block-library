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
					className="meta"
					style={{
						color: styles.color,
					}}
				>
					{attribution}
				</div>
			</div>
		</div>
	);
};

export default edit;
