# Core Tabs

PRC's override/extension of the WordPress `core/tabs` block and its child blocks (`core/tabs-menu`, `core/tabs-menu-item`, `core/tab`).

## Block Namespace

`prc-block/core-tabs`

## Alignment with Gutenberg 22.8+ (tabs restructure)

Core changed how the tabs menu is stored and rendered ([Gutenberg #75954](https://github.com/WordPress/gutenberg/pull/75954), follow-ups such as [#76442](https://github.com/WordPress/gutenberg/pull/76442)):

-   **`core/tabs-menu` contains one `core/tabs-menu-item` per tab** — not a single hidden template block that PHP duplicated at render time (no `wp-block-tabs-menu-item__template` pattern).
-   **Pairing:** each `core/tabs-menu-item` has an `anchor` attribute shaped like `{tab_id}-button` (e.g. `tab-1-button`), which pairs with the matching `core/tab` panel id (`tab-1`). Core's PHP render matches menu items to `core/tabs-list` by stripping the `-button` suffix.
-   **`core/tabs-menu-item`** no longer exposes the old custom active/hover color attributes removed upstream; styling uses normal block supports (e.g. color, typography). The HTML anchor field in the inspector was removed from supports in favor of a stored `anchor` attribute used for pairing (see upstream PRs).

PRC utilities and the legacy `prc-block/tabs` → `core/tabs` transform follow this structure: **one menu item block per tab**, with anchors aligned to each `core/tab` id.

## What PRC Customizes

-   Registers a `core/tab-label` block bindings source for syncing tab labels between the menu and tab content
-   Registers "Country Flags" and "Active Underline" block styles, plus a **Tabbed** preset on the parent `core/tabs` block
-   Adds a mobile dropdown mode that converts the tabs menu to a select-style dropdown below a configurable breakpoint
-   Supports top and bottom dropdown placement (bottom dropdown copies the menu after tab panels)
-   Adds a block transform from legacy `prc-block/tabs` to `core/tabs` (one `core/tabs-menu-item` per tab; base colors mapped only to block supports where applicable)
-   Extends `core/tabs-menu` with `mobileDropdown` and `mobileDropdownWidth` attributes
-   Merges **`usesContext` on `core/tabs-menu`** so parent context (`core/tabs-id`, `core/tabs-activeTabIndex`, `core/tabs-editorActiveTabIndex`) is still available after upstream narrowed the default list (needed for mobile dropdown and related render logic)
-   Ships an Interactivity API store for mobile dropdown state management, resize handling, and click-outside-to-close behavior
-   Syncs **[Entity as Iframe](entity-as-iframe.md)** inside each tab panel with the **`core/tabs` public store’s `state.isActiveTab`** (same reactive source Core uses for `data-wp-bind--hidden` on tab panels; inactive tabs keep the iframe unloaded)
-   Includes utility PHP functions for programmatically building tab structures (one menu item per tab with correct anchors)
-   Registers paragraph and heading variations bound to the tab label

## Supports Modifications

None directly on `core/tabs`. Extended attributes are added to `core/tabs-menu`.

## Additional Attributes

On `core/tabs-menu`:

| Attribute             | Type      | Default | Description                                    |
| --------------------- | --------- | ------- | ---------------------------------------------- |
| `mobileDropdown`      | `boolean` | `false` | Enable mobile dropdown mode                    |
| `mobileDropdownWidth` | `number`  | `768`   | Viewport width breakpoint for dropdown trigger |

Added via `blocks.registerBlockType` filter in `index.jsx`.

## Available Styles

| Block                 | Style Name         | Label            | Description                                                       |
| --------------------- | ------------------ | ---------------- | ----------------------------------------------------------------- |
| `core/tabs`           | `tabbed`           | Tabbed           | Folder-tab preset: bordered panel, tab row divider, gray inactive labels, bold active tab connected to the content panel below |
| `core/tabs-menu-item` | `country-flags`    | Country Flags    | Displays country flag icons before tab labels, faded until active |
| `core/tabs-menu`      | `active-underline` | Active Underline | Underline on the active tab with transparent background           |

Registered in PHP via `register_block_style` in `register_block_styles`.

## Style Overrides

**File:** `style.scss`

-   **Base tab** -- `figure + p` margin reset inside `.wp-block-tab`
-   **Mobile dropdown** -- `[hidden]` on the **dropdown** container (`.wp-block-tabs-menu__dropdown`) when not in mobile mode; the desktop tabs list is shown/hidden via Interactivity API bindings when mobile dropdown is enabled (not a static `.wp-block-tabs-menu[hidden]` template rule)
-   **Mobile dropdown trigger** -- full-width button with border, rounded corners, flex layout, hover/focus states
-   **Dropdown panel** -- absolute-positioned list below trigger, white background, shadow, max-height 300px with overflow scroll
-   **Dropdown items** -- full-width menu items with hover background
-   **Bottom dropdown variant** -- `.wp-block-tabs-menu__dropdown--bottom` opens upward with reversed border radii and shadow direction
-   **Country Flags** -- flex column layout with 2em flag icons, items start at 0.5 opacity and go full opacity on hover/active
-   **Active Underline** -- transparent background on active tab with `border-bottom: 2px solid` using custom active color variable
-   **Tabbed** (`.wp-block-tabs.is-style-tabbed`) -- self-contained folder-tab preset on the parent `core/tabs` block (apply via block styles in the editor; no extra inspector settings):
    -   `.wp-block-tab-list` -- bottom divider; tabs align to the baseline of the row
    -   `.wp-block-tab` -- inactive labels use gray text; active tab is bold with a bordered “folder” tab (`margin-bottom: -1px`) that connects to the panel below
    -   `.wp-block-tab-panels` / `.wp-block-tab-panel` -- content panel wrapped in a matching border (`border-top: 0` on panels so it joins the active tab); panel padding `1.5em`
    -   Uses theme tokens (`ui-gray-light`, `ui-white`, `ui-text-color`, `ui-black`) — no manual border, background, or color settings required
    -   **Dark color scheme:** uses adaptive `light-dark()` palette tokens so borders, active-tab surface, panel background, and label colors follow OS dark mode or the site Dark Mode Toggle (excluded from the generic stable-white tab-list override applied to other tab styles)

## Editor Enhancements

**File:** `index.jsx`

-   Adds a `prc-block/tabs` to `core/tabs` block transform: maps inner `prc-block/tab` blocks to `core/tab`, builds **`core/tabs-menu` with one `core/tabs-menu-item` per tab** (`anchor`: `{tabAnchor}-button` aligned with each tab's anchor)
-   Adds `mobileDropdown` and `mobileDropdownWidth` attributes to `core/tabs-menu`
-   HOC wrapping `editor.BlockEdit` for `core/tabs-menu` to inject the `Controls` component
-   Calls `registerTabLabelBinding()` to set up block bindings

**File:** `controls.jsx`

-   "Settings" inspector panel with:
    -   `ToggleControl` for Mobile Dropdown enable/disable
    -   `RangeControl` for Mobile Breakpoint (320--1024px) when dropdown is enabled

**File:** `tab-label-binding.js`

-   Registers `core/tab-label` block bindings source with `getValues`, `setValues`, and `canUserEditValue`
-   `getValues` reads the `core/tab-label` context value
-   `setValues` updates the parent `core/tab` block's `label` attribute via the block editor store
-   Registers `core/paragraph` and `core/heading` variations with `core/tab-label` binding

## Frontend Interactivity

**File:** `view.js` (Interactivity API module)

-   Registers store `core/tabs` with:
    -   **`state.displayDropdown`** -- computed: true when NOT in mobile dropdown mode (hides dropdown)
    -   **`state.displayTabsList`** -- computed: true when in mobile dropdown mode (hides desktop tabs list)
    -   **`state.isDropdownOpen`** -- computed: whether the dropdown panel is open
    -   **`state.currentTabLabel`** -- computed: active tab's label text
    -   **`actions.toggleDropdown`** -- toggles dropdown open/closed
    -   **`actions.updateMobileDropdownState`** -- checks viewport width against breakpoint, activates/deactivates mobile mode
    -   **`callbacks.addEventListeners`** -- fires `tabsReady` custom event, initializes mobile dropdown state
    -   **`callbacks.addResizeListener`** -- updates mobile dropdown state on resize
    -   **`callbacks.handleClickOutside`** -- closes dropdown when clicking outside any dropdown within the tabs block
    -   **`callbacks.handleDropdownItemClick`** -- closes dropdown after selection; for bottom dropdowns, smooth-scrolls to the top dropdown
    -   **`callbacks.updateTriggerLabel`** -- copies the active tab's innerHTML (including flag icons) to the dropdown trigger label

**Entity as Iframe (merged into `core/tabs` store):**

When tab content includes **Entity as Iframe**, the PHP layer injects directives:

-   **`data-wp-watch--sync-entity-iframes="core/tabs::callbacks.syncEntityIframeWithTabPanel"`** on each **`.wp-block-tab`** — reads the public **`state.isActiveTab`** from the same [`core/tabs` store](https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/tabs/view.js) WordPress registers (delegates to the private tab panel state) and updates `store('prc-block/entity-as-iframe').state[iframeId].isActive`.
-   **`data-wp-on--pointerenter="core/tabs::callbacks.prefetchEntityIframeOnTabMenuItemPointer"`** on each **`.wp-block-tabs-menu-item`** — resolves the target panel via **`aria-controls`**, then prefetches **`data-entity-iframe-prefetch-url`** on the nested entity block (including items added with the bottom mobile dropdown; the entity-iframe filter runs at **priority 15** after the bottom dropdown is injected at priority 10).

## PHP Rendering

**File:** `class-core-tabs.php`

-   **`extend_core_tabs_menu_uses_context`** (`register_block_type_args` filter) -- for `core/tabs-menu`, appends `core/tabs-id`, `core/tabs-activeTabIndex`, and `core/tabs-editorActiveTabIndex` to `usesContext` so PRC render callbacks still receive parent tabs context after Gutenberg narrowed the default `usesContext` list
-   **`register_assets`** (`init` hook) -- registers editor script, style, and view script module handles
-   **`register_tab_block_bindings`** (`init` hook) -- registers the `core/tab-label` server-side block bindings source
-   **`register_block_styles`** (`init` hook) -- registers `tabbed` style on `core/tabs`, `country-flags` style on `core/tabs-menu-item` (with flag-icons CSS enqueue), and `active-underline` style on `core/tabs-menu`
-   **`filter_render_block_context`** (`render_block_context` filter) -- for `core/tab`, adds `core/tab-slug` (slugified label) for child blocks
-   **`render_core_tabs_menu`** (`render_block_core/tabs-menu` filter) -- enqueues the view script module and Interactivity state; when `mobileDropdown` is enabled, builds mobile dropdown markup by **rendering each parsed `core/tabs-menu-item` inner block** with the correct per-tab context (matching anchors to `core/tabs-list`), appends dropdown after the menu, and binds visibility for the desktop tablist; supports bottom dropdown via `render_core_tabs`
-   **`render_core_tabs_menu_item`** (`render_block_core/tabs-menu-item` filter) -- when the **Country Flags** block style is active, injects flag icon markup before the label `<span>` inside the button
-   **`render_core_tabs`** (`render_block_core/tabs` filter, priority **10**) -- duplicates the mobile dropdown block with `--bottom` after tab panels when top dropdown is used
-   **`render_core_tabs_entity_iframe`** (`render_block_core/tabs` filter, priority **15**, runs after **`render_core_tabs`**) -- if the tabs block output contains **`wp-block-prc-block-entity-as-iframe`**, injects:
    -   On each **`.wp-block-tab`**: `data-wp-watch--sync-entity-iframes="core/tabs::callbacks.syncEntityIframeWithTabPanel"`
    -   On each **`.wp-block-tabs-menu-item`**: `data-wp-on--pointerenter="core/tabs::callbacks.prefetchEntityIframeOnTabMenuItemPointer"`

**File:** `util.php`

-   **`generate_core_tab( $label, $content, $anchor )`** -- creates a `core/tab-panel` parsed block with a `<section role="tabpanel">` wrapper
-   **`build_core_tab_panels( $tab_panel_blocks, $attrs, $wrapper_html )`** -- wraps `core/tab-panel` blocks in a `core/tab-panels` block. When `$wrapper_html` is supplied, the saved wrapper's class/style attributes are reused so block-supports classes (layout, color, spacing) baked in by `save.js` carry over.
-   **`build_core_tab_button( $menu_item_anchor, $attrs, $inner_html )`** -- creates one `core/tab` (tab button) with the given anchor (e.g. `tab-1-button`) and optional shared styling attrs / serialized button HTML
-   **`build_core_tab_list( $attrs, $is_vertical, $menu_item_anchors, $tabs_menu_item_attrs, $tabs_menu_item_inner_html, $wrapper_html )`** -- creates a `core/tab-list` with **one inner `core/tab` button per anchor**. When `$wrapper_html` is supplied, the saved tab-list wrapper's class/style are reused (preserving editor-authored layout orientation, color, typography, spacing supports); `role="tablist"` is always re-applied.
-   **`generate_tabs_list( $tab_panel_blocks )`** -- builds the `core/tabs-list`-shaped array (id/label/index) from `core/tab-panel` parsed blocks for context injection
-   **`create_core_tabs( $tabs, $attrs, $tabs_menu_attributes, $tab_panel_attributes, $tabs_menu_item_attrs, $tabs_menu_item_inner_html, $tab_panel_inner_html, $tabs_menu_inner_html, $tabs_inner_html )`** -- assembles the full `core/tabs` tree: derives menu-item anchors `{tab_id}-button` from each generated `core/tab-panel`, then builds tab-list + tab-panels. The optional trailing `$tabs_menu_inner_html` and `$tabs_inner_html` are forwarded so the saved wrapper HTML for `core/tab-list` and the outer `core/tabs` can be reused (preserving block-supports). When `$tabs_inner_html` is supplied, the outer `wp-block-tabs` wrapper class/style are reused so the `core/tabs` render callback finds and decorates a wrapper that already carries the correct supports classes.
-   **`render_tabs()`** -- convenience wrapper: `create_core_tabs()` + `WP_Block` render with `core/tabs-list` and `core/tabs-id` context. Mirrors the trailing `$tabs_menu_inner_html` / `$tabs_inner_html` parameters of `create_core_tabs()` for callers that want to preserve editor-authored wrapper supports end-to-end (e.g. `prc-rls/available-tabs`).

## Block Markup Example

Illustrative structure (actual attributes/directives come from Core + PRC filters):

```html
<!-- Core tabs with mobile dropdown -->
<div class="wp-block-tabs" data-wp-interactive="core/tabs">
	<div class="wp-block-tabs-menu" role="tablist" data-wp-bind--hidden="...">
		<button
			type="button"
			class="wp-block-tabs-menu-item"
			id="tab__tab-1"
			aria-controls="tab-1"
		>
			Tab 1
		</button>
		<button
			type="button"
			class="wp-block-tabs-menu-item"
			id="tab__tab-2"
			aria-controls="tab-2"
		>
			Tab 2
		</button>
	</div>
	<div
		class="wp-block-tabs-menu__dropdown"
		data-wp-interactive="core/tabs"
		data-wp-class--is-open="state.isDropdownOpen"
	>
		<button
			type="button"
			class="wp-block-tabs-menu__dropdown-trigger"
			data-wp-on--click="actions.toggleDropdown"
		>
			<span class="wp-block-tabs-menu__dropdown-trigger-label"
				>Tab 1</span
			>
			<span class="wp-block-tabs-menu__dropdown-trigger-icon"></span>
		</button>
		<ul class="wp-block-tabs-menu__dropdown-panel">
			<li class="wp-block-tabs-menu__dropdown-item">
				<button type="button" class="wp-block-tabs-menu-item">
					Tab 1
				</button>
			</li>
			<li class="wp-block-tabs-menu__dropdown-item">
				<button type="button" class="wp-block-tabs-menu-item">
					Tab 2
				</button>
			</li>
		</ul>
	</div>
	<div class="wp-block-tab-panel">
		<section class="wp-block-tab" id="tab-1" role="tabpanel">
			Tab 1 content
		</section>
		<section class="wp-block-tab" id="tab-2" role="tabpanel">
			Tab 2 content
		</section>
	</div>
</div>
```

## Variations

| Block            | Variation Name   | Title     | Description                               |
| ---------------- | ---------------- | --------- | ----------------------------------------- |
| `core/paragraph` | `core/tab-label` | Tab Label | Paragraph bound to tab label via bindings |
| `core/heading`   | `core/tab-label` | Tab Label | Heading bound to tab label via bindings   |

Registered in `tab-label-binding.js` via `registerBlockVariation`.
