/**
 * WordPress Dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import {
	__experimentalFullscreenModeClose as FullscreenModeClose,
	__experimentalMainDashboardButton as BlockEditorDashboardButton,
} from '@wordpress/edit-post';
import { __experimentalMainDashboardButton as SiteEditorDashboardButton } from '@wordpress/edit-site';
import { __experimentalNavigationBackButton as NavigationBackButton } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { ReactComponent as Icon } from '../assets/dashboard-icon.svg';

const SiteLogoBlockEditorDashboardButton = () => (
	<BlockEditorDashboardButton>
		<FullscreenModeClose icon={Icon} />
	</BlockEditorDashboardButton>
);

const SiteLogoSiteEditorDashboardButton = () => (
	<SiteEditorDashboardButton>
		<NavigationBackButton icon={Icon} />
	</SiteEditorDashboardButton>
);

export default function registerDashboardIcon() {
	registerPlugin('block-editor-prc-logo', {
		render: SiteLogoBlockEditorDashboardButton,
	});

	// registerPlugin('site-editor-prc-logo', {
	// 	render: SiteLogoSiteEditorDashboardButton,
	// });
}
