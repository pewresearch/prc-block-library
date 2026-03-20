# Taxonomy Search

Search input block that queries taxonomy terms via a REST API endpoint and displays matching results in a dropdown. Supports restricting results to children of a specific parent term. Designed for use inside `prc-block/taxonomy-list`.

## Namespace

`prc-block/taxonomy-search`

## Category

`theme`

## Supports

| Feature | Detail |
|---|---|
| Anchor | Yes |
| HTML | No |
| Interactivity | Yes |
| Spacing | `margin`, `padding`, `blockGap` |
| Typography | `fontSize`, `fontFamily` |

## Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `taxonomy` | `string` | `"category"` | Taxonomy slug to search within (also received via context) |
| `restrictToTerm` | `object` | -- | Optional parent term object to restrict results to its children |

## Available Styles

None declared in `block.json`.

## Inner Blocks

Allowed blocks:
- `prc-block/form-input-text` -- text input field for the search query

## Parent / Ancestor Requirements

None declared, but functionally used inside `prc-block/taxonomy-list`.

## Context

| Direction | Key | Maps to |
|---|---|---|
| Uses | `taxonomy` | Taxonomy slug from parent `prc-block/taxonomy-list` |

## Usage

Insert a Taxonomy Search block inside a `prc-block/taxonomy-list`. The block automatically inherits the taxonomy from its parent context. Optionally set `restrictToTerm` to limit search results to children of a specific parent term.

The search triggers after the user types more than 4 characters, with a 1200ms debounce. Results appear in a dropdown `<ul>` below the input. Each result links to the term's archive page. The dropdown hides when the input loses focus (with a 300ms delay to allow clicking results).

## Block Markup (save)

Standard inner blocks save. Server-side rendering augments the output with interactive directives and the results template.

## PHP Rendering

`class-taxonomy-search.php` (`PRC\Platform\Blocks\Taxonomy_Search`)

**REST endpoint:**

- Route: `prc-api/v3/blocks/taxonomy-search` (GET)
- Permission: public access (no authentication required)
- Parameters: `taxonomy`, `search`, `parent_term_id`

**Key methods:**

- `restfully_search_taxonomy()` -- Searches terms by name using `get_terms()` with `name__like`. If `parent_term_id` is provided, restricts results to that term's children via `get_term_children()`. Results are cached with a 1-day TTL.
- `render_callback()` -- Enqueues `wp-url`, `wp-api-fetch`, and `wp-html-entities` scripts. Sets `data-wp-interactive="prc-block/taxonomy-search"`. Injects `data-wp-context` with `{ taxonomy, restrictToTermId, searchValue, isActive, results: [] }`. Outputs a `<ul>` with `data-wp-each--result="context.results"` for dynamic result rendering. Each result item is an `<a>` bound to `context.result.url` and `context.result.label`.

## Frontend Interactivity

`view.js` registers the `prc-block/taxonomy-search` store.

**Actions:**
- `doSearch(searchValue, taxonomy, parentTermId)` -- Async function that calls the REST endpoint at `/prc-api/v3/blocks/taxonomy-search`. Maps the API response to `{ key, id, url, description, label }` objects and stores them in `context.results`.
- `onInputFocus` -- Sets `context.isActive` to `true`, showing the results dropdown.
- `onInputBlur` -- Sets `context.isActive` to `false` after a 300ms delay, allowing time for result clicks to register.
- `onInputChange` -- Updates the global `formFields` state and syncs `context.searchValue` with the input value.

**Callbacks:**
- `showResults` -- Returns `true` when `context.results.length >= 1` and `context.isActive` is `true`.
- `onSearchValueChange` -- Watches `context.searchValue`. When it exceeds 4 characters, triggers a debounced search (1200ms delay). Clears results when the search value drops to 4 characters or fewer.

## Related Blocks

| Block | Relationship |
|---|---|
| `prc-block/taxonomy-list` | Parent container providing taxonomy context |
| `prc-block/taxonomy-list-link` | Sibling block for static term links |
| `prc-block/form-input-text` | Child block providing the text input field |
