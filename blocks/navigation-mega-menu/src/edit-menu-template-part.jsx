/**
 * External Dependencies
 */
import { InnerBlocksAsSyncedContent } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { createRef, useEffect, useState } from 'react';

/**
 * Internal Dependencies
 */
import useMenuTemplatePart from './use-menu-template-part';
import useRefResizer from './use-ref-resizer';

export default function EditMenuTemplatePart({
	menuSlug,
	overlayClassnames,
	clientId,
	toggleMenu,
	isMobile,
}) {
	const ref = createRef();
	const { menuId } = useMenuTemplatePart({ menuSlug });
	const { topPosition, leftPosition, width } = useRefResizer({
		ref,
		isMobile,
		useState,
		useEffect,
	});

	return (
		<InnerBlocksAsSyncedContent
			{...{
				passedRef: ref,
				postId: menuId,
				postType: 'wp_template_part',
				postTypeLabel: 'Mega Menu',
				blockProps: {
					className: `${overlayClassnames}`,
					style: {
						top: topPosition,
						left: leftPosition,
						width,
					},
				},
				clientId,
			}}
		/>
	);
}
