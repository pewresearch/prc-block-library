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
	console.log('placeholder', attributes, blockProps);
	const { imageSize } = attributes;

	const [loadingStub, setLoadingStub] = useState(false);

	return (
		<ContentPlaceholder
			onChange={(pickedContent) => {
				console.log('Step2:', pickedContent);
				if (0 < pickedContent.length && undefined !== pickedContent[0].id) {
					console.log('Step3:', pickedContent[0]);
					setLoadingStub(true);
					setAttributes({
						postId: pickedContent[0].id,
						url: pickedContent[0].url,
					});
					// setPostAttributes({
					// 	postId: pickedContent[0].id,
					// 	imageSize,
					// 	isRefresh: false,
					// 	setAttributes,
					// });
				}
			}}
			onSkip={() => {
				const todaysDate = new Date().toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric',
				});
				setAttributes({ postId: 0, label: 'Report', date: todaysDate });
			}}
			blockProps={{ ...blockProps, style: { marginBottom: '16px' } }}
			loadingComponent={loadingStub}
		/>
	);
}

export default Placeholder;
