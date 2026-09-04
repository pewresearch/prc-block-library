import { COUNTRY_SYNONYM_ALIASES } from './country-synonyms';

export const DEFAULT_WINDOW = 40;
export const WINDOW_PAGE = 40;
export const SCROLL_BOTTOM_PX = 40;

const ALIAS_SCORE_PENALTY = 150;

function normalizeText(value) {
	return String(value ?? '')
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/&/g, ' and ')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, ' ')
		.trim()
		.replace(/\s+/g, ' ');
}

function normalizeQuery(query) {
	return normalizeText(query);
}

function normalizeLabel(label) {
	return normalizeText(label);
}

function buildSynonymIndex(entries) {
	const index = {};
	for (const [label, aliases] of Object.entries(entries)) {
		index[normalizeText(label)] = aliases
			.map((alias) => normalizeText(alias))
			.filter(Boolean);
	}
	return index;
}

const COUNTRY_SYNONYM_INDEX = buildSynonymIndex(COUNTRY_SYNONYM_ALIASES);

function coerceCatalog(catalog) {
	return Array.isArray(catalog) ? catalog : [];
}

function effectiveLimit(listWindow, normalizedQuery) {
	if (!listWindow || listWindow.query !== normalizedQuery) {
		return DEFAULT_WINDOW;
	}
	const limit = Number(listWindow.limit);
	if (!Number.isFinite(limit) || limit < 0) {
		return DEFAULT_WINDOW;
	}
	return limit;
}

function subsequenceScore(haystack, query) {
	let hayIndex = 0;
	let queryIndex = 0;
	let run = 0;
	let maxRun = 0;
	let firstHit = -1;
	let gaps = 0;

	while (hayIndex < haystack.length && queryIndex < query.length) {
		if (haystack[hayIndex] === query[queryIndex]) {
			if (firstHit === -1) {
				firstHit = hayIndex;
			}
			run += 1;
			if (run > maxRun) {
				maxRun = run;
			}
			queryIndex += 1;
		} else if (run > 0) {
			gaps += 1;
			run = 0;
		}
		hayIndex += 1;
	}

	if (queryIndex < query.length || maxRun < 2) {
		return 0;
	}

	return Math.max(1, 200 - firstHit - gaps * 10 + maxRun * 20);
}

function scoreNormalizedText(haystack, normalizedQuery) {
	if (!normalizedQuery || !haystack) {
		return 0;
	}
	if (haystack === normalizedQuery) {
		return 1000;
	}
	if (haystack.startsWith(normalizedQuery)) {
		return 900;
	}

	const words = haystack.split(' ');
	for (const word of words) {
		if (word.startsWith(normalizedQuery)) {
			return 800;
		}
	}

	const substringIndex = haystack.indexOf(normalizedQuery);
	if (substringIndex !== -1) {
		return 700 - Math.min(substringIndex, 99);
	}

	if (normalizedQuery.length === 1) {
		return 0;
	}

	return subsequenceScore(haystack, normalizedQuery);
}

function optionAliasTexts(option, normalizedLabel) {
	const texts = COUNTRY_SYNONYM_INDEX[normalizedLabel]
		? [...COUNTRY_SYNONYM_INDEX[normalizedLabel]]
		: [];
	const extra = option?.aliases;
	if (!Array.isArray(extra)) {
		return texts;
	}
	for (const alias of extra) {
		const normalized = normalizeText(alias);
		if (normalized && normalized !== normalizedLabel) {
			texts.push(normalized);
		}
	}
	return texts;
}

function scoreOption(option, normalizedQuery) {
	const normalizedLabel = normalizeLabel(option?.label);
	let best = scoreNormalizedText(normalizedLabel, normalizedQuery);
	const aliases = optionAliasTexts(option, normalizedLabel);
	for (const alias of aliases) {
		const aliasScore = scoreNormalizedText(alias, normalizedQuery);
		if (aliasScore <= 0) {
			continue;
		}
		const discounted =
			aliasScore >= 1000
				? 950
				: Math.max(1, aliasScore - ALIAS_SCORE_PENALTY);
		if (discounted > best) {
			best = discounted;
		}
	}
	return best;
}

function rankCatalog(catalog, normalizedQuery) {
	const ranked = [];
	for (let index = 0; index < catalog.length; index += 1) {
		const option = catalog[index];
		const score = scoreOption(option, normalizedQuery);
		if (score > 0) {
			ranked.push({ option, score, index });
		}
	}
	ranked.sort((left, right) => {
		if (right.score !== left.score) {
			return right.score - left.score;
		}
		return left.index - right.index;
	});
	return ranked;
}

function matchCount(catalog, normalizedQuery) {
	if (normalizedQuery === '') {
		return catalog.length;
	}
	return rankCatalog(catalog, normalizedQuery).length;
}

/**
 * Visible prefix of a catalog for a query and append-only window.
 *
 * Empty query keeps catalog order. A miss returns []. Rows are the same
 * objects as the catalog. Disabled rows stay in the result.
 *
 * @param {Array}  catalog    Full option list.
 * @param {string} query      Raw search string.
 * @param {Object} listWindow Query-keyed window, or null.
 * @return {Array} Visible option objects from the catalog.
 */
export function visibleOptions(catalog, query, listWindow) {
	const options = coerceCatalog(catalog);
	const normalizedQuery = normalizeQuery(query);
	const limit = effectiveLimit(listWindow, normalizedQuery);

	if (normalizedQuery === '') {
		return options.slice(0, Math.min(limit, options.length));
	}

	const ranked = rankCatalog(options, normalizedQuery);
	return ranked
		.slice(0, Math.min(limit, ranked.length))
		.map((row) => row.option);
}

/**
 * Next append-only window for this query.
 * Same query and limit when nothing more remains.
 *
 * @param {Array}  catalog    Full option list.
 * @param {string} query      Raw search string.
 * @param {Object} listWindow Query-keyed window, or null.
 * @return {Object} Window with normalized query and new limit.
 */
export function nextWindow(catalog, query, listWindow) {
	const options = coerceCatalog(catalog);
	const normalizedQuery = normalizeQuery(query);
	const total = matchCount(options, normalizedQuery);
	const current = effectiveLimit(listWindow, normalizedQuery);
	if (current >= total) {
		return { query: normalizedQuery, limit: current };
	}
	return {
		query: normalizedQuery,
		limit: Math.min(current + WINDOW_PAGE, total),
	};
}

/**
 * Whether nextWindow would show more rows.
 *
 * @param {Array}  catalog    Full option list.
 * @param {string} query      Raw search string.
 * @param {Object} listWindow Query-keyed window, or null.
 * @return {boolean} True when another page can be appended.
 */
export function hasMoreOptions(catalog, query, listWindow) {
	const normalizedQuery = normalizeQuery(query);
	const next = nextWindow(catalog, query, listWindow);
	return next.limit > effectiveLimit(listWindow, normalizedQuery);
}

/**
 * Whether a listbox scroll is close enough to the end to grow the window.
 *
 * @param {Object} viewport   Listbox scroll metrics.
 * @param {Array}  catalog    Full option list.
 * @param {string} query      Raw search string.
 * @param {Object} listWindow Query-keyed window, or null.
 * @return {boolean} True when the window should grow.
 */
export function shouldAdvanceWindow(viewport, catalog, query, listWindow) {
	if (!viewport || !hasMoreOptions(catalog, query, listWindow)) {
		return false;
	}
	return (
		viewport.scrollTop + viewport.clientHeight >=
		viewport.scrollHeight - SCROLL_BOTTOM_PX
	);
}
