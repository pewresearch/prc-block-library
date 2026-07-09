# Core Tabs

PRC's override/extension of the WordPress `core/tabs` block family (`core/tab-list`, `core/tab-panels`, `core/tab-panel`).

**Requires Gutenberg 23.5+** — upstream [Gutenberg #77439](https://github.com/WordPress/gutenberg/pull/77439) removed the `core/tab` button block. Tab labels now live in a `tabs` array attribute on `core/tab-list`, rendered as plain `<button>` elements.

## Block Namespace

`prc-block/core-tabs`

## Gutenberg 23.5 structure

- **`core/tab-list`** — holds `tabs: [{ label }]` (`source: query` over `button`); renders `<button type="button" role="tab">{label}</button>` children in `save.js`. No inner `core/tab` blocks.
- **`core/tab-panels` / `core/tab-panel`** — unchanged; parent `core/tabs` still provides `core/tabs-list` context from panels.
- **Styling** — color, border, and spacing on tab-list apply via `.wp-block-tab-list button` selectors (`__experimentalSkipSerialization`).

## What PRC Customizes

- Registers a `core/tab-label` block bindings source for syncing tab labels between the menu and tab content
- Registers **Country Flags** and **Active Underline** block styles on `core/tab-list`, plus a **Tabbed** preset on `core/tabs`
- Adds hover/active color attributes and inspector controls on `core/tab-list` (consolidated from the removed per-tab level)
- Adds a mobile dropdown mode that converts the tabs menu to a select-style dropdown below a configurable breakpoint
- Supports top and bottom dropdown placement (bottom dropdown copies the menu after tab panels)
- Adds a block transform from legacy `prc-block/tabs` to `core/tabs` (builds `tabs` attribute from panel labels)
- Extends `core/tab-list` `usesContext` so parent context (`core/tabs-id`, `core/tabs-activeTabIndex`, `core/tabs-editorActiveTabIndex`) is available for mobile dropdown render logic
- Ships an Interactivity API store for mobile dropdown state management, resize handling, and click-outside-to-close behavior
- Syncs **[Entity as Iframe](entity-as-iframe.md)** inside each tab panel with the **`core/tabs` public store's `state.isActiveTab`**
- Includes utility PHP functions for programmatically building tab structures with the `tabs` attribute
- Registers paragraph and heading variations bound to the tab label
- WP-CLI migration: `wp prc block-library migrate-core-tab-to-tabs-attr` collapses legacy `core/tab` inner blocks into the `tabs` attribute (run after deploy)

## Additional Attributes

On `core/tab-list`:

| Attribute                                               | Type      | Default | Description                                    |
| ------------------------------------------------------- | --------- | ------- | ---------------------------------------------- |
| `mobileDropdown`                                        | `boolean` | `false` | Enable mobile dropdown mode                    |
| `mobileDropdownWidth`                                   | `number`  | `768`   | Viewport width breakpoint for dropdown trigger |
| `hoverBackgroundColor` / `customHoverBackgroundColor`   | `string`  | —       | Hover background (preset slug + custom hex)    |
| `hoverTextColor` / `customHoverTextColor`               | `string`  | —       | Hover text color                               |
| `activeBackgroundColor` / `customActiveBackgroundColor` | `string`  | —       | Active background                              |
| `activeTextColor` / `customActiveTextColor`             | `string`  | —       | Active text color                              |

## Available Styles

| Block           | Style Name         | Label            | Description                                                         |
| --------------- | ------------------ | ---------------- | ------------------------------------------------------------------- |
| `core/tabs`     | `tabbed`           | Tabbed           | Folder-tab preset on the parent block                               |
| `core/tab-list` | `country-flags`    | Country Flags    | Flag icons before tab labels (injected at render from panel labels) |
| `core/tab-list` | `active-underline` | Active Underline | Underline on the active tab with transparent background             |

## Style Overrides

**File:** `style.scss`

Button selectors use `.wp-block-tab-list button` (not `.wp-block-tab`). CSS custom properties (`--custom-tab-hover-color`, etc.) are set on the tab-list wrapper and cascade to buttons.

## Editor Enhancements

**File:** `index.jsx`

- `prc-block/tabs` → `core/tabs` transform builds `core/tab-list` with `tabs: [{ label }]` from panel labels
- `mobileDropdown`, `mobileDropdownWidth`, and hover/active color attrs on `core/tab-list` only
- HOC on `core/tab-list` injects `Controls` (no per-tab controls; `controls-tab.jsx` removed)

## PHP Rendering

**File:** `class-core-tabs.php`

- **`render_core_tab_list`** — enqueues view module; injects country flags into `<button>` elements when `is-style-country-flags`; builds mobile dropdown by cloning rendered buttons; sets IAPI state
- **`render_core_tabs_entity_iframe`** — adds prefetch directive on tab `<button role="tab">` elements; panel sync unchanged
- **`filter_render_block_context`** — adds `core/tab-slug` on `core/tab-panel` for children

**File:** `util.php`

- **`build_core_tab_list( $attrs, $is_vertical, $labels, $wrapper_html )`** — creates `core/tab-list` with `tabs` attribute and `<button>{label}</button>` markup
- **`create_core_tabs()` / `render_tabs()`** — assemble and render full `core/tabs` trees; signature no longer includes per-button attrs/innerHTML params

## Block Markup Example

```html
<div class="wp-block-tabs" data-wp-interactive="core/tabs">
	<div class="wp-block-tab-list" role="tablist">
		<button type="button" role="tab">Tab 1</button>
		<button type="button" role="tab">Tab 2</button>
	</div>
	<div class="wp-block-tab-panels">
		<section role="tabpanel" class="wp-block-tab-panel" id="tab-1">
			…
		</section>
		<section role="tabpanel" class="wp-block-tab-panel" id="tab-2">
			…
		</section>
	</div>
</div>
```

## Migration

After deploying with Gutenberg 23.5:

```bash
# Preview
wp prc block-library migrate-core-tab-to-tabs-attr

# Execute
wp prc block-library migrate-core-tab-to-tabs-attr --dry-run=false
```

Discovers posts via block-catalog terms `core-tab`, `core-tab-list`, `core-tabs-menu`, and `core-tabs-menu-item`.

The command handles two legacy shapes:

1. **Gutenberg 23.1–23.4** — `core/tab-list` with `core/tab` button inner blocks: collapses buttons into the `tabs` attribute + plain `<button>` markup using `core/tab-panel` labels.
2. **Pre-23.1 template schema** — `core/tabs-menu` + singular `core/tab-panel` container holding `core/tab` content panels (e.g. country-flag interactives with one empty `tabs-menu-item` template): converts to `core/tab-list` + `core/tab-panels` + `core/tab-panel`, builds the `tabs` attribute from panel labels, and hoists `tabs-menu-item` styling (e.g. `is-style-country-flags`, active/hover colors) onto `core/tab-list`.

Safe to re-run: already-migrated posts are skipped.
