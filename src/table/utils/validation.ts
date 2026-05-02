/**
 * Validation engine for the Power Table block.
 *
 * validateCell  — check a single HTML cell value against a ColumnDataType
 * validateTable — check all body/foot cells using columnMeta
 * validateSchema — validateTable + required-type checks for a named schema
 */

import type { BlockAttributes, ColumnDataType } from '../block-attributes';
import { getEffectiveColumnMeta } from './column-meta';
import { stripHtmlToPlain } from './round-display';

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface ValidationError {
	/** 'body' | 'foot' | 'schema' */
	section: string;
	/** 0-based row index within the section; -1 for schema-level errors */
	rowIndex: number;
	/** Virtual column index; -1 for schema-level errors */
	vColIndex: number;
	/** Human-readable message */
	message: string;
}

export interface ValidationSchema {
	/** Machine-readable slug, e.g. "geo-state" */
	slug: string;
	/** Human-readable name shown in the SelectControl */
	label: string;
	/**
	 * Column types required by this schema.
	 * At least one column in columnMeta must declare each required type.
	 */
	requiredTypes: ColumnDataType[];
}

export interface CellValidationResult {
	valid: boolean;
	message?: string;
}

export interface TableValidationResult {
	valid: boolean;
	errors: ValidationError[];
}

// ---------------------------------------------------------------------------
// FIPS dataset (US state + county codes)
// ---------------------------------------------------------------------------

const US_STATE_FIPS = new Set([
	'01',
	'02',
	'04',
	'05',
	'06',
	'08',
	'09',
	'10',
	'11',
	'12',
	'13',
	'15',
	'16',
	'17',
	'18',
	'19',
	'20',
	'21',
	'22',
	'23',
	'24',
	'25',
	'26',
	'27',
	'28',
	'29',
	'30',
	'31',
	'32',
	'33',
	'34',
	'35',
	'36',
	'37',
	'38',
	'39',
	'40',
	'41',
	'42',
	'44',
	'45',
	'46',
	'47',
	'48',
	'49',
	'50',
	'51',
	'53',
	'54',
	'55',
	'56',
	'60',
	'66',
	'69',
	'72',
	'74',
	'78',
]);

function isValidFips(raw: string): boolean {
	const s = raw.trim();
	if (/^\d{2}$/.test(s)) return US_STATE_FIPS.has(s);
	if (/^\d{5}$/.test(s)) return US_STATE_FIPS.has(s.slice(0, 2));
	return false;
}

// ---------------------------------------------------------------------------
// ISO 3166-1 alpha-3 dataset
// ---------------------------------------------------------------------------

const ISO3_ALPHA_CODES = new Set([
	'AFG',
	'ALA',
	'ALB',
	'DZA',
	'ASM',
	'AND',
	'AGO',
	'AIA',
	'ATA',
	'ATG',
	'ARG',
	'ARM',
	'ABW',
	'AUS',
	'AUT',
	'AZE',
	'BHS',
	'BHR',
	'BGD',
	'BRB',
	'BLR',
	'BEL',
	'BLZ',
	'BEN',
	'BMU',
	'BTN',
	'BOL',
	'BES',
	'BIH',
	'BWA',
	'BVT',
	'BRA',
	'IOT',
	'BRN',
	'BGR',
	'BFA',
	'BDI',
	'CPV',
	'KHM',
	'CMR',
	'CAN',
	'CYM',
	'CAF',
	'TCD',
	'CHL',
	'CHN',
	'CXR',
	'CCK',
	'COL',
	'COM',
	'COD',
	'COG',
	'COK',
	'CRI',
	'CIV',
	'HRV',
	'CUB',
	'CUW',
	'CYP',
	'CZE',
	'DNK',
	'DJI',
	'DMA',
	'DOM',
	'ECU',
	'EGY',
	'SLV',
	'GNQ',
	'ERI',
	'EST',
	'SWZ',
	'ETH',
	'FLK',
	'FRO',
	'FJI',
	'FIN',
	'FRA',
	'GUF',
	'PYF',
	'ATF',
	'GAB',
	'GMB',
	'GEO',
	'DEU',
	'GHA',
	'GIB',
	'GRC',
	'GRL',
	'GRD',
	'GLP',
	'GUM',
	'GTM',
	'GGY',
	'GIN',
	'GNB',
	'GUY',
	'HTI',
	'HMD',
	'VAT',
	'HND',
	'HKG',
	'HUN',
	'ISL',
	'IND',
	'IDN',
	'IRN',
	'IRQ',
	'IRL',
	'IMN',
	'ISR',
	'ITA',
	'JAM',
	'JPN',
	'JEY',
	'JOR',
	'KAZ',
	'KEN',
	'KIR',
	'PRK',
	'KOR',
	'KWT',
	'KGZ',
	'LAO',
	'LVA',
	'LBN',
	'LSO',
	'LBR',
	'LBY',
	'LIE',
	'LTU',
	'LUX',
	'MAC',
	'MDG',
	'MWI',
	'MYS',
	'MDV',
	'MLI',
	'MLT',
	'MHL',
	'MTQ',
	'MRT',
	'MUS',
	'MYT',
	'MEX',
	'FSM',
	'MDA',
	'MCO',
	'MNG',
	'MNE',
	'MSR',
	'MAR',
	'MOZ',
	'MMR',
	'NAM',
	'NRU',
	'NPL',
	'NLD',
	'NCL',
	'NZL',
	'NIC',
	'NER',
	'NGA',
	'NIU',
	'NFK',
	'MKD',
	'MNP',
	'NOR',
	'OMN',
	'PAK',
	'PLW',
	'PSE',
	'PAN',
	'PNG',
	'PRY',
	'PER',
	'PHL',
	'PCN',
	'POL',
	'PRT',
	'PRI',
	'QAT',
	'REU',
	'ROU',
	'RUS',
	'RWA',
	'BLM',
	'SHN',
	'KNA',
	'LCA',
	'MAF',
	'SPM',
	'VCT',
	'WSM',
	'SMR',
	'STP',
	'SAU',
	'SEN',
	'SRB',
	'SYC',
	'SLE',
	'SGP',
	'SXM',
	'SVK',
	'SVN',
	'SLB',
	'SOM',
	'ZAF',
	'SGS',
	'SSD',
	'ESP',
	'LKA',
	'SDN',
	'SUR',
	'SJM',
	'SWE',
	'CHE',
	'SYR',
	'TWN',
	'TJK',
	'TZA',
	'THA',
	'TLS',
	'TGO',
	'TKL',
	'TON',
	'TTO',
	'TUN',
	'TUR',
	'TKM',
	'TCA',
	'TUV',
	'UGA',
	'UKR',
	'ARE',
	'GBR',
	'UMI',
	'USA',
	'URY',
	'UZB',
	'VUT',
	'VEN',
	'VNM',
	'VGB',
	'VIR',
	'WLF',
	'ESH',
	'YEM',
	'ZMB',
	'ZWE',
	// Non-standard user-assigned codes consistent with PRC charting maps
	'XKX', // Kosovo (383)
	'SOL', // Somaliland (901)
	'XNC', // Northern Cyprus (902)
]);

function isValidIso3Alpha(raw: string): boolean {
	return ISO3_ALPHA_CODES.has(raw.trim().toUpperCase());
}

// ---------------------------------------------------------------------------
// ISO 3166-1 numeric dataset (3-digit zero-padded strings)
// ---------------------------------------------------------------------------

const ISO3_NUMERIC_CODES = new Set([
	'004',
	'008',
	'010',
	'012',
	'016',
	'020',
	'024',
	'028',
	'031',
	'032',
	'036',
	'040',
	'044',
	'048',
	'050',
	'051',
	'052',
	'056',
	'060',
	'064',
	'068',
	'070',
	'072',
	'074',
	'076',
	'084',
	'086',
	'090',
	'092',
	'096',
	'100',
	'104',
	'108',
	'112',
	'116',
	'120',
	'124',
	'132',
	'136',
	'140',
	'144',
	'148',
	'152',
	'156',
	'158',
	'162',
	'166',
	'170',
	'174',
	'175',
	'178',
	'180',
	'184',
	'188',
	'191',
	'192',
	'196',
	'203',
	'204',
	'208',
	'212',
	'214',
	'218',
	'222',
	'226',
	'230',
	'231',
	'232',
	'233',
	'234',
	'238',
	'239',
	'242',
	'246',
	'248',
	'250',
	'254',
	'258',
	'260',
	'262',
	'266',
	'268',
	'270',
	'275',
	'276',
	'288',
	'292',
	'296',
	'300',
	'304',
	'308',
	'312',
	'316',
	'320',
	'324',
	'328',
	'332',
	'334',
	'336',
	'340',
	'344',
	'348',
	'356',
	'360',
	'364',
	'368',
	'372',
	'376',
	'380',
	'384',
	'388',
	'392',
	'398',
	'400',
	'404',
	'408',
	'410',
	'414',
	'417',
	'418',
	'422',
	'426',
	'428',
	'430',
	'434',
	'438',
	'440',
	'442',
	'446',
	'450',
	'454',
	'458',
	'462',
	'466',
	'470',
	'474',
	'478',
	'480',
	'484',
	'492',
	'496',
	'498',
	'499',
	'500',
	'504',
	'508',
	'512',
	'516',
	'520',
	'524',
	'528',
	'531',
	'533',
	'534',
	'535',
	'540',
	'548',
	'554',
	'558',
	'562',
	'566',
	'570',
	'574',
	'578',
	'580',
	'581',
	'583',
	'584',
	'585',
	'586',
	'591',
	'598',
	'600',
	'604',
	'608',
	'612',
	'616',
	'620',
	'624',
	'626',
	'630',
	'634',
	'638',
	'642',
	'643',
	'646',
	'652',
	'654',
	'659',
	'660',
	'662',
	'663',
	'666',
	'670',
	'674',
	'678',
	'682',
	'686',
	'688',
	'690',
	'694',
	'702',
	'703',
	'704',
	'706',
	'710',
	'716',
	'724',
	'728',
	'729',
	'732',
	'736',
	'740',
	'744',
	'748',
	'752',
	'756',
	'760',
	'762',
	'764',
	'768',
	'772',
	'776',
	'780',
	'784',
	'788',
	'792',
	'795',
	'796',
	'798',
	'800',
	'804',
	'807',
	'818',
	'826',
	'831',
	'832',
	'833',
	'834',
	'840',
	'850',
	'854',
	'858',
	'860',
	'862',
	'876',
	'882',
	'887',
	'894',
	// Non-standard user-assigned codes consistent with PRC charting maps
	'383', // Kosovo (XKX)
	'901', // Somaliland (SOL)
	'902', // Northern Cyprus (XNC)
]);

/**
 * Accepts 1–3 digit strings (leading zeros optional) and normalises to
 * 3-digit zero-padded before checking the set.
 */
function isValidIso3Numeric(raw: string): boolean {
	const trimmed = raw.trim();
	if (!/^\d{1,3}$/.test(trimmed)) return false;
	return ISO3_NUMERIC_CODES.has(trimmed.padStart(3, '0'));
}

// ---------------------------------------------------------------------------
// Per-type validators
// ---------------------------------------------------------------------------

const RE_NUMBER = /^-?[\d,]+(\.\d+)?%?$/;
const RE_CURRENCY = /^-?[$€£¥₹]?[\d,]+(\.\d+)?%?$|^-?[\d,]+(\.\d+)?[$€£¥₹]?$/;
const RE_PERCENTAGE = /^-?[\d,]+(\.\d+)?\s*%$/;
const RE_URL = /^https?:\/\/.+/i;

/**
 * Recognises common date formats: ISO 8601 (YYYY-MM-DD), US (M/D/YYYY or
 * M/D/YY), EU (D.M.YYYY), and 4-digit year-only values.
 */
const RE_DATE =
	/^\d{4}-\d{2}-\d{2}$|^\d{1,2}\/\d{1,2}\/\d{2,4}$|^\d{1,2}\.\d{1,2}\.\d{4}$|^\d{4}$/;

const TYPE_MESSAGES: Record<ColumnDataType, string> = {
	auto: '',
	text: '',
	number: 'Expected a number (e.g. 42 or 3.14)',
	date: 'Expected a date (e.g. 2024-01-15 or 1/15/2024)',
	currency: 'Expected a currency value (e.g. $1,234.56)',
	percentage: 'Expected a percentage (e.g. 42%)',
	url: 'Expected a URL starting with http:// or https://',
	fips: 'Expected a 2-digit state or 5-digit county FIPS code',
	iso3alpha: 'Expected an ISO 3166-1 alpha-3 country code (e.g. USA)',
	iso3numeric: 'Expected an ISO 3166-1 numeric country code (e.g. 840)',
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Validate a single cell's HTML content against a declared column data type.
 * Empty cells always pass; `'auto'` and `'text'` always pass.
 */
export function validateCell(
	htmlContent: string,
	dataType: ColumnDataType
): CellValidationResult {
	if (dataType === 'auto' || dataType === 'text') {
		return { valid: true };
	}

	const plain = stripHtmlToPlain(htmlContent).trim();

	if (plain === '') {
		return { valid: true };
	}

	let valid = false;

	switch (dataType) {
		case 'number':
			valid = RE_NUMBER.test(plain.replace(/,/g, ''));
			break;
		case 'currency':
			valid = RE_CURRENCY.test(plain.replace(/,/g, ''));
			break;
		case 'percentage':
			valid = RE_PERCENTAGE.test(plain);
			break;
		case 'date':
			valid = RE_DATE.test(plain);
			break;
		case 'url':
			valid = RE_URL.test(plain);
			break;
		case 'fips':
			valid = isValidFips(plain);
			break;
		case 'iso3alpha':
			valid = isValidIso3Alpha(plain);
			break;
		case 'iso3numeric':
			valid = isValidIso3Numeric(plain);
			break;
		default:
			valid = true;
	}

	if (valid) return { valid: true };
	return { valid: false, message: TYPE_MESSAGES[dataType] };
}

/**
 * Validate all body and foot cells in the table against their declared
 * column types (resolved via `getEffectiveColumnMeta`).
 */
export function validateTable(
	attributes: BlockAttributes
): TableValidationResult {
	const errors: ValidationError[] = [];

	for (const section of ['body', 'foot'] as const) {
		const rows = attributes[section] ?? [];

		rows.forEach((row, rowIndex) => {
			let vColCursor = 0;
			row.cells.forEach((cell) => {
				const vColIndex = vColCursor;
				const colMeta = getEffectiveColumnMeta(vColIndex, attributes);
				const result = validateCell(
					cell.content ?? '',
					colMeta.dataType
				);

				if (!result.valid) {
					errors.push({
						section,
						rowIndex,
						vColIndex,
						message:
							result.message ??
							`Invalid value for type "${colMeta.dataType}"`,
					});
				}

				vColCursor += Number(cell.colSpan ?? 1);
			});
		});
	}

	return { valid: errors.length === 0, errors };
}

/**
 * Validate a table against a named schema.
 * Runs `validateTable` first, then checks that all `requiredTypes` declared
 * by the schema are present in `columnMeta`.
 */
export function validateSchema(
	attributes: BlockAttributes,
	schema: ValidationSchema
): TableValidationResult {
	const tableResult = validateTable(attributes);
	const errors = [...tableResult.errors];

	const declaredTypes = new Set(
		(attributes.columnMeta ?? []).map((m) => m?.dataType ?? 'auto')
	);

	for (const required of schema.requiredTypes) {
		if (!declaredTypes.has(required)) {
			errors.push({
				section: 'schema',
				rowIndex: -1,
				vColIndex: -1,
				message: `Schema "${schema.label}" requires a column of type "${required}" but none is declared.`,
			});
		}
	}

	return { valid: errors.length === 0, errors };
}
