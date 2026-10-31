/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Placeholder } from '@wordpress/components';

export default function Edit() {
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<Placeholder
				icon="yes-alt"
				label={__('Decision Engine Demo', 'prc-block-library')}
				instructions={__(
					'Preview or view this page to use the demo. Only signed-in staff who can edit posts will see it.',
					'prc-block-library'
				)}
			/>
		</div>
	);
}
