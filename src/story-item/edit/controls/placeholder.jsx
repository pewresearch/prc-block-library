/**
 * External Dependencies
 */
import { ContentPlaceholder } from '@prc-app/shared';

/**
 * WordPress Dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import { setPostAttributes } from '../../helpers';

function Placeholder({ attributes, setAttributes, blockProps }) {
	const { imageSize } = attributes;

	const [loadingStub, setLoadingStub] = useState(false);

	return (
		<ContentPlaceholder
			onChange={(pickedContent) => {
				console.log('Step2:', pickedContent);
				if (0 < pickedContent.length && undefined !== pickedContent[0].id) {
					console.log('Step3:', pickedContent[0]);
					setLoadingStub(true);
					// Here we're passing in to do yet another fetch, i'm not a fan of that, lets speed this up.
					setPostAttributes({
						postId: pickedContent[0].id,
						imageSize,
						isRefresh: false,
						setAttributes,
					});
				}
			}}
			onSkip={() => {
				setAttributes({ postId: 0 });
			}}
			blockProps={{ ...blockProps, style: { marginBottom: '16px' } }}
			loadingComponent={loadingStub}
		/>
	);
}

export default Placeholder;
