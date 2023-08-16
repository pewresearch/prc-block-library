/**
 * External Dependencies
 */
import { URLSearchField } from '@prc/components';
import { icons, Icon } from '@prc/icons';

/**
 * WordPress Dependencies
 */
import { Button, Placeholder as WPComPlaceholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Interanl Dependencies
 */

export default function Placeholder({ attributes, setAttributes }) {
	const [siteId] = useEntityProp('root', 'site', 'siteId');
	const postType = 1 === siteId ? 'stub' : 'post';

	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<WPComPlaceholder
				icon={<Icon icon={icons.faNewspaper}/>}
				label={__(' Story Item', 'prc-block-library')}
				isColumnLayout
				instructions={__(
					`Search for a ${postType} or paste url here`,
					'prc-block-library',
				)}
			>
				<URLSearchField
					{...{
						attributes,
						setAttributes,
						onSelect: (postAttrs) => setAttributes(postAttrs),
					}}
				/>
				<Button
					isLink
					onClick={() => {
						setAttributes({ postId: 0 });
					}}
					text={__('Skip')}
					style={{
						paddingLeft: '9px',
						marginTop: '10px',
					}}
				/>
			</WPComPlaceholder>
		</div>
	);
}
