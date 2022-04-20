/**
 * External Dependencies
 */
import { ContentPlaceholder } from '@prc-app/shared';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal Dependencies
 */
// eslint-disable-next-line import/extensions
import { setPostAttributes } from '../../story-item/helpers.js';

function Placeholder({ setAttributes, blockProps }) {
	const [loadingStub, setLoadingStub] = useState(false);

	const onPick = (id) => {
		setPostAttributes({
			postId: id,
			setAttributes,
			isRefresh: false,
		});
	};

	return (
		<ContentPlaceholder
			onChange={(pickedContent) => {
				if (0 < pickedContent.length && undefined !== pickedContent[0].id) {
					setLoadingStub(true);
					onPick(pickedContent[0].id);
				}
			}}
			onSkip={() => {
				setAttributes({ postId: 0 });
			}}
			label={__('Search for a popular post', 'prc-block-library')}
			blockProps={{ ...blockProps, style: { marginBottom: '16px' } }}
			loadingComponent={loadingStub}
		/>
	);
}

export default Placeholder;
