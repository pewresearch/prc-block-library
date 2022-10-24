/* eslint-disable no-undef */
/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';

import {
	QuoteSorterDropdown,
	QuoteSorterFilterInline,
} from './frontend-components/Filter';
import Search from './frontend-components/Search';

import './style.scss';

domReady(() => {
	console.log('frontend loaded');
	const rootClass = '.wp-block-prc-block-quote-sorter';
	if (document.querySelector(rootClass)) {
		const parents = document.querySelectorAll(rootClass);
		parents.forEach((parent) => {
			const allFilters = parent.querySelectorAll(`${rootClass}-dropdown`);
			const allSearchBars = parent.querySelectorAll(`${rootClass}-search-bar`);
			const expandQuotesButton = parent.querySelector('.show-more__button');
			expandQuotesButton.addEventListener('click', () => {
				const quotes = parent.querySelector(`${rootClass}-quotes`);
				quotes.classList.toggle('expanded');
				expandQuotesButton.classList.toggle('expanded');
				if (expandQuotesButton.classList.contains('expanded')) {
					expandQuotesButton.innerHTML = 'View fewer';
					return;
				}
				expandQuotesButton.innerHTML = 'View all';
			});
			const setDynamicText = (parentFilter, filter) => {
				// if parent has an associated dynamic text element, find it and update
				const dynamicTextElId = document.getElementById(
					parentFilter.dataset.dynamicTextBlockId,
				);
				if (dynamicTextElId) {
					const dynamicOptions = JSON.parse(
						dynamicTextElId.dataset.dynamicText,
					);
					// if an option is associated with the filter, go with that first
					if (dynamicOptions[filter]) {
						dynamicTextElId.innerHTML = `<p>${dynamicOptions[filter]}</p>`;
						return;
					}
					// assume that if filter is '', it's probably a reset to all quotes
					if (dynamicOptions.all) {
						dynamicTextElId.innerHTML = `<p>${dynamicOptions.all}</p>`;
						return;
					}
					// if dynamic text elements are broken, fall back to the default text
					dynamicTextElId.innerHTML = `<p>Selected quotes from the selected group</p>`;
				}
			};
			const checkEmpty = () => {
				const quotes = parent.querySelectorAll(
					`.wp-block-prc-block-quote-sorter-quote-template.active-quote`,
				);
				if (0 === quotes.length) {
					parent
						.querySelector(`${rootClass}-no-results`)
						.classList.remove('hidden');
					expandQuotesButton.classList.add('hidden');
				} else {
					parent
						.querySelector(`${rootClass}-no-results`)
						.classList.add('hidden');
					expandQuotesButton.classList.remove('hidden');
				}
			};
			const filterQuoteWall = () => {
				// create an array of all active filters
				const activeFilters = [...allFilters]
					.map((el) => el.dataset.filter)
					.filter((e) => e);
				// create an array of all active search strings (unlikely you'd have multiple but should check)
				const activeSearchStrings = [...allSearchBars]
					.map((el) => el.dataset.searchString)
					.filter((e) => e);
				const quotes = parent.querySelectorAll(
					'.wp-block-prc-block-quote-sorter-quote-template',
				);
				console.log({ activeFilters, activeSearchStrings });
				quotes.forEach((quote) => {
					const quoteText = quote
						.querySelector('.wp-block-prc-block-quote-sorter-quote-text')
						.textContent.toLowerCase();
					const quoteTypologies = JSON.parse(quote.dataset.typologies);
					console.log({ quoteTypologies });
					// iterate over the active filters and make sure that every item the active filter can be found in the quote typologies
					const containsAllTypologies = activeFilters.every((element) =>
						quoteTypologies.includes(element),
					);
					const containsAllSearch = activeSearchStrings.every((element) =>
						quoteText.includes(element),
					);
					if (containsAllTypologies && containsAllSearch) {
						quote.classList.remove('hidden');
						quote.classList.add('active-quote');
					} else {
						quote.classList.add('hidden');
						quote.classList.remove('active-quote');
					}
				});
				checkEmpty();
			};

			const setFilterValue = (target, value) => {
				// find the closest filter to the target
				const parentFilter = target.closest(`${rootClass}-dropdown`);
				// set the selected filter to that parent as a data attribute
				parentFilter.setAttribute('data-filter', value);
				setDynamicText(parentFilter, value);
				filterQuoteWall();
			};
			const setSearchString = (target, str) => {
				// find the closest search bar to the target
				const searchBar = target.closest(`${rootClass}-search-bar`);
				// set the string to that parent as a data attribute
				searchBar.setAttribute('data-search-string', str);
				filterQuoteWall();
			};
			if (parent.querySelector(`${rootClass}-search-bar`)) {
				allSearchBars.forEach((searchBar) => {
					const { placeholder } = searchBar.dataset;
					render(
						<Search placeholder={placeholder} onchange={setSearchString} />,
						searchBar,
					);
				});
			}
			if (parent.querySelector(`${rootClass}-dropdown`)) {
				allFilters.forEach((filter) => {
					// TODO: for some reason context isn't passing down thru ancestors, only direct children, so we need a fallback empty array here. not sure why this is happening though
					const typologies = filter.dataset.typologies
						? JSON.parse(filter.dataset.typologies)
						: [];
					const sortedTypologies = JSON.parse(filter.dataset.sortedtypologies);
					const typologiesArr = Object.keys(typologies)
						.filter((option) => !option.disabled)
						.map((key) => ({
							key,
							text: typologies[key].name,
							value: key,
							category: typologies[key].category,
						}));
					const sortedAndFilteredTypologies = sortedTypologies.filter(
						(option) => !option.disabled,
					);
					const { placeholder, includeResetFilter, resetLanguage } =
						filter.dataset;
					let renderEl;
					if (filter.classList.contains('is-style-dropdown')) {
						renderEl = (
							<QuoteSorterDropdown
								typologies={
									0 < sortedAndFilteredTypologies.length
										? sortedAndFilteredTypologies
										: typologiesArr
								}
								placeholder={placeholder}
								onchange={setFilterValue}
							/>
						);
					}
					if (filter.classList.contains('is-style-list-inline')) {
						renderEl = (
							<QuoteSorterFilterInline
								typologies={
									0 < sortedAndFilteredTypologies.length
										? sortedAndFilteredTypologies
										: typologiesArr
								}
								onclick={setFilterValue}
								includeResetFilter={Boolean(includeResetFilter)}
								resetLanguage={resetLanguage}
							/>
						);
					}
					render(renderEl, filter);
				});
			}
		});
	}
});
