/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import Crumb from './crumb';

/**
 * Custom hook to construct breadcrumbs based on post hierarchy and settings
 *
 * @param {Object}  config                      Configuration object
 * @param {Object}  config.attributes           Block attributes
 * @param {Array}   config.categories           Parent categories
 * @param {Array}   config.parents              Parent posts
 * @param {Object}  config.post                 Current post
 * @param {string}  config.siteTitle            Site title
 * @param {boolean} config.isSelected           Whether block is selected
 * @param {Function} config.setAttributes       Function to set attributes
 * @return {Array} Array of Crumb components
 */
export default function useBreadcrumbs({
	attributes,
	categories,
	parents,
	post,
	siteTitle,
	isSelected,
	setAttributes,
}) {
	const {
		separator,
		showCurrentPageTitle,
		showLeadingSeparator,
		showHome,
		showIndex,
		homeCrumb,
		indexCrumb,
	} = attributes;

	return useMemo(() => {
		// Set breadcrumb names to real hierarchical post titles if available, and
		// fall back to category names, or placeholder content if neither exists.

		const crumbs = [];
		let breadcrumbTitles;

		// Add home crumb if showHome is enabled
		if (showHome) {
			const homeText = homeCrumb?.text || siteTitle || __('Home');
			crumbs.push(
				<Crumb
					addLeadingSeparator={false}
					crumbTitle={homeText}
					editableTitleField="homeCrumb"
					isSelected={isSelected}
					placeholder={__('Home')}
					separator={separator}
					setAttributes={(value) => {
						setAttributes({
							homeCrumb: {
								...homeCrumb,
								text: value.homeCrumb,
							},
						});
					}}
					showSeparator={true}
					key="home-crumb"
				/>
			);
		}

		// Add index crumb if it exists
		if (showIndex) {
			const indexText = indexCrumb?.text || '';
			crumbs.push(
				<Crumb
					addLeadingSeparator={false}
					crumbTitle={indexText}
					editableTitleField="indexCrumb"
					isSelected={isSelected}
					placeholder={__('Index')}
					separator={separator}
					setAttributes={(value) => {
						setAttributes({
							indexCrumb: {
								...indexCrumb,
								text: value.indexCrumb,
							},
						});
					}}
					showSeparator={true}
					key="index-crumb"
				/>
			);
		}

		if (parents?.length) {
			breadcrumbTitles = parents.map(
				(parent) => parent?.title?.rendered || ' '
			);
		} else if (categories?.length) {
			breadcrumbTitles = categories.map(
				(category) => category?.name || ' '
			);
		} else {
			breadcrumbTitles = [__('Top-level page'), __('Child page')];
		}

		// Append current page title if set.
		if (showCurrentPageTitle) {
			breadcrumbTitles.push(post?.title || __('Current page'));
		}

		breadcrumbTitles.forEach((item, index) => {
			const startIndex = showHome || indexCrumb?.text ? index : 0;
			const hasLeadingSeparator =
				startIndex === 0 &&
				showLeadingSeparator &&
				!showHome &&
				!indexCrumb?.text;
			crumbs.push(
				<Crumb
					addLeadingSeparator={hasLeadingSeparator}
					crumbTitle={item}
					isSelected={isSelected}
					separator={separator}
					setAttributes={setAttributes}
					showSeparator={index < breadcrumbTitles.length - 1}
					key={`crumb-${index}`}
				/>
			);
		});

		return crumbs;
	}, [
		categories,
		homeCrumb,
		indexCrumb,
		isSelected,
		parents,
		post?.title,
		separator,
		setAttributes,
		showCurrentPageTitle,
		showHome,
		showIndex,
		showLeadingSeparator,
		siteTitle,
	]);
}
