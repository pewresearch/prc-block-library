/**
 * External Dependencies
 */
import { InnerBlocksAsSyncedContent } from '@prc/components';

/**
 * Internal Dependencies
 */
import useMenuTemplatePart from './use-menu-template-part';

export default function EditMenuTemplatePart({ menuSlug, clientId }) {
	const { menuId } = useMenuTemplatePart({ menuSlug });
	return (
		<InnerBlocksAsSyncedContent
			{...{
				postId: menuId,
				postType: 'wp_template_part',
				postTypeLabel: 'Mega Menu',
				blockProps: {
					className:
						'wp-block-prc-block-navigation-mega-menu__container',
				},
				clientId,
			}}
		/>
	);
}
