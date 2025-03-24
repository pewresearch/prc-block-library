/**
 * WordPress Dependencies
 */
import { useBlockProps, Warning } from '@wordpress/block-editor';

export default function Edit({}) {
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<Warning>
				<span>Collection Kicker Template Will Render Here</span>
			</Warning>
		</div>
	);
}
