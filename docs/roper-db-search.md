# Roper Database Search

## Block Overview

| Property    | Value                                                 |
| ----------- | ----------------------------------------------------- |
| Name        | `prc-block/roper-db-search`                           |
| Title       | Roper Database                                        |
| Category    | `embed`                                               |
| Version     | 0.1.0                                                 |
| Description | Embeddable Roper Database search tool (legacy iframe embed). For the integrated Roper iPoll search UI, see [`@prc/roper`](../../prc-roper/docs/README.md). |
| Keywords    | database, roper, cornell, search, polling             |
| Example     | Yes (sample `subText` / `perPage` — inserter preview) |

## Supports

| Feature      | Enabled |
| ------------ | ------- |
| HTML editing | No      |
| Anchor       | Yes     |

## Attributes

| Attribute | Type     | Default                                                        | Description                                                                                |
| --------- | -------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `subText` | `string` | `"Use this tool to search our database of polling questions."` | Subtext displayed below the search tool header.                                            |
| `perPage` | `number` | `10`                                                           | Number of results displayed per page. Range: 5-20.                                         |
| `type`    | `string` | `"default"`                                                    | Search type. Options: `default` (embedded partner search), `global` (Roper Global iframe). |

## Available Styles

None defined.

## Inner Blocks

This block does not accept inner blocks.

## Parent / Ancestor Requirements

None.

## Usage Instructions

1. Insert the **Roper Database** block.
2. In the block inspector under **Roper DB Settings**, configure:
    - **Sub Text**: The descriptive text shown to users.
    - **Per Page**: Number of search results per page (5-20).
    - **Type**: Choose `Default` for the embedded partner search widget, or `Global` for the full Roper Global iframe experience.
3. In the editor, the block shows a placeholder with the selected type.
4. The actual search interface renders only on the frontend.

## Block Markup Example

### Default Type

```html
<div class="wp-block-prc-block-roper-db-search">
	<div id="partner">&nbsp;</div>
	<script>
		document.addEventListener('DOMContentLoaded', function () {
			Roper.mountPartnerSearch(document.querySelector('#partner'), {
				apiKey: '...',
				subText:
					'Use this tool to search our database of polling questions.',
				perPage: 10,
				gridLines: false,
				yearOnly: true,
				primaryColor: '#D1A730',
				backgroundColor: '#ECECE3',
				linkColor: '#BC7B2B',
			});
		});
	</script>
</div>
```

### Global Type

```html
<div class="wp-block-prc-block-roper-db-search">
	<iframe
		src="https://ropercenter.cornell.edu/pewglobal/"
		id="frameSec"
		width="100%"
	></iframe>
	<!-- iframe resize and navigation scripts -->
</div>
```

## PHP Rendering

The block is server-side rendered via `Roper_DB_Search::render_callback()`:

-   **Default type**: Enqueues the Roper partner search vendor script and CSS from S3, then outputs a mount point (`#partner`) with an initialization script that passes the API key (`PRC_PLATFORM_ROPER_API_KEY`), subtext, per-page count, and PRC-branded colors.
-   **Global type**: Renders an iframe pointing to `https://ropercenter.cornell.edu/pewglobal/` with scripts for iframe resizing, cross-origin message handling, URL parameter passing, and browser history management.
-   Registers Roper-specific query vars (`qid`, `cntIDs`, `stdIDs`, `keyword`, `keywordtext`, `startdate`, `enddate`) via the `query_vars` filter.
-   Vendor assets are loaded from `https://s3.amazonaws.com/files.roper.center/partnersearch/{version}/`.

## Frontend Interactivity

The `view.js` script handles the **Global type** iframe:

-   Uses `iframe-resizer` to automatically resize the Roper Global iframe to fit its content.
-   Sets the iframe width to 100% after page load, then initializes the iframe resizer.

## Related Blocks

None. This is a standalone embed block.
