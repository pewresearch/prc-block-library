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
 * Construct breadcrumbs from post hierarchy and block attributes.
 *
 * @param {Object}   config               Configuration object
 * @param {Object}   config.attributes    Block attributes
 * @param {Array}    config.categories    Parent categories
 * @param {Array}    config.parents       Parent posts
 * @param {Object}   config.post          Current post
 * @param {string}   config.siteTitle     Site title
 * @param {boolean}  config.isSelected    Whether block is selected
 * @param {Function} config.setAttributes Function to set attributes
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
		crumbs: authoredCrumbs,
	} = attributes;

	return useMemo(() => {
		const crumbs = [];
		let breadcrumbTitles;

		if (showHome) {
			const homeText = homeCrumb?.text || siteTitle || __('Home');
			crumbs.push(
				<Crumb
					addLeadingSeparator={false}
					asIcon={!!homeCrumb?.asIcon}
					crumbTitle={homeText}
					editableTitleField={
						homeCrumb?.asIcon ? undefined : 'homeCrumb'
					}
					hasDropdown={
						Array.isArray(homeCrumb?.crumbs) &&
						homeCrumb.crumbs.length > 0
					}
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

		const extraCrumbs = Array.isArray(authoredCrumbs) ? authoredCrumbs : [];
		extraCrumbs.forEach((crumb, extraIndex) => {
			if (!crumb?.text) {
				return;
			}
			crumbs.push(
				<Crumb
					addLeadingSeparator={false}
					asIcon={!!crumb.asIcon}
					crumbTitle={crumb.text}
					hasDropdown={
						Array.isArray(crumb.crumbs) && crumb.crumbs.length > 0
					}
					isSelected={isSelected}
					separator={separator}
					setAttributes={setAttributes}
					showSeparator={true}
					key={crumb.id || `authored-crumb-${extraIndex}`}
				/>
			);
		});

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
		authoredCrumbs,
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
