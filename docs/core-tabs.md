# Core Tabs

PRC's override/extension of the WordPress `core/tabs` block and its child blocks (`core/tabs-menu`, `core/tabs-menu-item`, `core/tab`).

## Block Namespace

`prc-block/core-tabs`

## What PRC Customizes

- Registers a `core/tab-label` block bindings source for syncing tab labels between the menu and tab content
- Registers "Country Flags" and "Active Underline" block styles
- Adds a mobile dropdown mode that converts the tabs menu to a select-style dropdown below a configurable breakpoint
- Supports top and bottom dropdown placement (bottom dropdown copies the menu after tab panels)
- Adds a block transform from legacy `prc-block/tabs` to `core/tabs`
- Extends `core/tabs-menu` with `mobileDropdown` and `mobileDropdownWidth` attributes
- Ships an Interactivity API store for mobile dropdown state management, resize handling, and click-outside-to-close behavior
- Includes utility PHP functions for programmatically building tab structures
- Registers paragraph and heading variations bound to the tab label

## Supports Modifications

None directly on `core/tabs`. Extended attributes are added to `core/tabs-menu`.

## Additional Attributes

On `core/tabs-menu`:

| Attribute              | Type      | Default | Description                                   |
|------------------------|-----------|---------|-----------------------------------------------|
| `mobileDropdown`       | `boolean` | `false` | Enable mobile dropdown mode                   |
| `mobileDropdownWidth`  | `number`  | `768`   | Viewport width breakpoint for dropdown trigger |

Added via `blocks.registerBlockType` filter in `index.jsx`.

## Available Styles

| Block                  | Style Name          | Label            | Description                                                    |
|------------------------|---------------------|------------------|----------------------------------------------------------------|
| `core/tabs-menu-item`  | `country-flags`     | Country Flags    | Displays country flag icons before tab labels, faded until active |
| `core/tabs-menu`       | `active-underline`  | Active Underline | Underline on the active tab with transparent background        |

Registered in PHP via `register_block_style` in `register_block_styles`.

## Style Overrides

**File:** `style.scss`

- **Base tab** -- `figure + p` margin reset inside `.wp-block-tab`
- **Hidden tabs menu** -- `display: none` when `[hidden]`
- **Mobile dropdown trigger** -- full-width button with border, rounded corners, flex layout, hover/focus states
- **Dropdown panel** -- absolute-positioned list below trigger, white background, shadow, max-height 300px with overflow scroll
- **Dropdown items** -- full-width menu items with hover background
- **Bottom dropdown variant** -- `.wp-block-tabs-menu__dropdown--bottom` opens upward with reversed border radii and shadow direction
- **Country Flags** -- flex column layout with 2em flag icons, items start at 0.5 opacity and go full opacity on hover/active
- **Active Underline** -- transparent background on active tab with `border-bottom: 2px solid` using custom active color variable

## Editor Enhancements

**File:** `index.jsx`

- Adds a `prc-block/tabs` to `core/tabs` block transform mapping attributes and inner blocks
- Adds `mobileDropdown` and `mobileDropdownWidth` attributes to `core/tabs-menu`
- HOC wrapping `editor.BlockEdit` for `core/tabs-menu` to inject the `Controls` component
- Calls `registerTabLabelBinding()` to set up block bindings

**File:** `controls.jsx`

- "Settings" inspector panel with:
  - `ToggleControl` for Mobile Dropdown enable/disable
  - `RangeControl` for Mobile Breakpoint (320--1024px) when dropdown is enabled

**File:** `tab-label-binding.js`

- Registers `core/tab-label` block bindings source with `getValues`, `setValues`, and `canUserEditValue`
- `getValues` reads the `core/tab-label` context value
- `setValues` updates the parent `core/tab` block's `label` attribute via the block editor store
- Registers `core/paragraph` and `core/heading` variations with `core/tab-label` binding

## Frontend Interactivity

**File:** `view.js` (Interactivity API module)

- Registers store `core/tabs` with:
  - **`state.displayDropdown`** -- computed: true when NOT in mobile dropdown mode (hides dropdown)
  - **`state.displayTabsList`** -- computed: true when in mobile dropdown mode (hides desktop tabs list)
  - **`state.isDropdownOpen`** -- computed: whether the dropdown panel is open
  - **`state.currentTabLabel`** -- computed: active tab's label text
  - **`actions.toggleDropdown`** -- toggles dropdown open/closed
  - **`actions.updateMobileDropdownState`** -- checks viewport width against breakpoint, activates/deactivates mobile mode
  - **`callbacks.addEventListeners`** -- fires `tabsReady` custom event, initializes mobile dropdown state
  - **`callbacks.addResizeListener`** -- updates mobile dropdown state on resize
  - **`callbacks.handleClickOutside`** -- closes dropdown when clicking outside any dropdown within the tabs block
  - **`callbacks.handleDropdownItemClick`** -- closes dropdown after selection; for bottom dropdowns, smooth-scrolls to the top dropdown
  - **`callbacks.updateTriggerLabel`** -- copies the active tab's innerHTML (including flag icons) to the dropdown trigger label

## PHP Rendering

**File:** `class-core-tabs.php`

- **`register_assets`** (`init` hook) -- registers editor script, style, and view script module handles
- **`register_tab_block_bindings`** (`init` hook) -- registers the `core/tab-label` server-side block bindings source
- **`register_block_styles`** (`init` hook) -- registers `country-flags` style on `core/tabs-menu-item` (with flag-icons CSS enqueue) and `active-underline` style on `core/tabs-menu`
- **`filter_render_block_context`** (`render_block_context` filter) -- maps tabs-menu-item color attributes into CSS custom properties for context
- **`render_core_tabs_menu`** (`render_block_core/tabs-menu` filter) -- when `mobileDropdown` is enabled: builds mobile dropdown HTML with trigger button, dropdown panel, and menu items; hides the desktop tabs list via `hidden` attribute and Interactivity API directives; enqueues the view script module; supports bottom dropdown placement by copying dropdown markup after tab panels
- **`render_core_tabs_menu_item`** (`render_block_core/tabs-menu-item` filter) -- injects CSS custom properties for tab colors (active, hover, text) and conditionally enqueues flag-icons CSS for the Country Flags style

**File:** `util.php`

- **`generate_core_tab()`** -- creates a `core/tab` block with label and inner blocks
- **`build_core_tab_panel()`** -- wraps tabs in a `core/tab-panel` block
- **`build_core_tabs_menu_item()`** -- creates a `core/tabs-menu-item` block with color attributes
- **`build_core_tabs_menu()`** -- creates a `core/tabs-menu` block with menu items
- **`generate_tabs_list()`** -- generates the tabs list from a labels array
- **`create_core_tabs()`** -- assembles the complete `core/tabs` block from tabs, menu, and panel
- **`render_tabs()`** -- renders the complete tabs structure to HTML

## Block Markup Example

```html
<!-- Core tabs with mobile dropdown -->
<div class="wp-block-tabs" data-wp-interactive="core/tabs">
  <div class="wp-block-tabs-menu" hidden>
    <button class="wp-block-tabs-menu-item" aria-selected="true">Tab 1</button>
    <button class="wp-block-tabs-menu-item">Tab 2</button>
  </div>
  <div class="wp-block-tabs-menu__dropdown"
       data-wp-interactive="core/tabs"
       data-wp-class--is-open="state.isDropdownOpen">
    <button class="wp-block-tabs-menu__dropdown-trigger"
            data-wp-on--click="actions.toggleDropdown">
      <span class="wp-block-tabs-menu__dropdown-trigger-label">Tab 1</span>
      <span class="wp-block-tabs-menu__dropdown-trigger-icon"></span>
    </button>
    <ul class="wp-block-tabs-menu__dropdown-panel">
      <li class="wp-block-tabs-menu__dropdown-item">
        <button class="wp-block-tabs-menu-item">Tab 1</button>
      </li>
      <li class="wp-block-tabs-menu__dropdown-item">
        <button class="wp-block-tabs-menu-item">Tab 2</button>
      </li>
    </ul>
  </div>
  <div class="wp-block-tab-panel">
    <div class="wp-block-tab">Tab 1 content</div>
    <div class="wp-block-tab">Tab 2 content</div>
  </div>
</div>
```

## Variations

| Block              | Variation Name   | Title     | Description                              |
|--------------------|------------------|-----------|------------------------------------------|
| `core/paragraph`   | `core/tab-label` | Tab Label | Paragraph bound to tab label via bindings |
| `core/heading`     | `core/tab-label` | Tab Label | Heading bound to tab label via bindings   |

Registered in `tab-label-binding.js` via `registerBlockVariation`.
