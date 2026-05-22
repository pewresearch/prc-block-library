# Core Button

PRC's override/extension of the WordPress `core/button` block.

## Block Namespace

`prc-block/core-button`

**Target Block:** `core/button`

## What PRC Customizes

- Enables Interactivity API support on the core button block
- Removes the `parent` restriction so singular button blocks can be used anywhere (not just inside `core/buttons`)
- Adds a composable **icon system** driven by block attributes — icons work alongside any block style (link, outline, etc.)
- Registers legacy icon-appended button styles for backwards rendering (hidden from the editor picker; auto-migrated on next edit)
- Registers a "Flex Buttons" style on the `core/buttons` wrapper
- Adds Interactivity API directives for dynamic text, click handlers, and state-driven class toggling (error, success, processing, disabled, hidden)
- Handles block binding logic for staff photo downloads
- Provides Apple News component layout, style, and text-style definitions

## Supports Modifications

| Support         | Value                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------- |
| `interactivity` | `true` (added via `blocks.registerBlockType` filter and `block_type_metadata_settings` filter) |
| `parent`        | Removed (allows standalone usage outside `core/buttons`)                                       |

## Additional Attributes

PRC extends `core/button` with the following attributes (registered via `blocks.registerBlockType` filter in `index.js`):

| Attribute      | Type      | Default        | Purpose                                                         |
| -------------- | --------- | -------------- | --------------------------------------------------------------- |
| `hasIcon`      | `boolean` | `false`        | Master toggle — enables the icon system for this button         |
| `iconLibrary`  | `string`  | `solid`        | Font Awesome Pro library (solid, regular, light, brands, etc.)  |
| `iconName`     | `string`  | —              | Icon slug, e.g. `arrow-right-long`                              |
| `iconPosition` | `string`  | `right`        | `left` or `right` — which side of the label the icon appears on |
| `iconColor`    | `string`  | `currentColor` | CSS color value applied to the icon                             |

PRC also utilizes existing core attributes (`anchor`, `metadata`, `interactiveNamespace`, `interactiveSubsumption`) to drive Interactivity API behavior at render time.

| Attribute                | Source      | Purpose                                                        |
| ------------------------ | ----------- | -------------------------------------------------------------- |
| `interactiveNamespace`   | Block attrs | The Interactivity API namespace to bind directives to          |
| `interactiveSubsumption` | Block attrs | When `true`, uses simplified subsumption-mode directives       |
| `metadata.name`          | Block attrs | Used to generate a button ID if no anchor is set               |
| `metadata.bindings`      | Block attrs | Block binding configuration (e.g., staff photo download links) |

## Icon System

### How it works

Setting `hasIcon: true` (via the "Add icon" toggle in the Inspector) activates a CSS mask-based icon rendered as a `::before` or `::after` pseudo-element on `.wp-element-button`.

**Frontend:** `Core_Button::maybe_inject_icon_vars()` runs during `render_block` and:

1. Calls `\PRC\Platform\Icons\get_icon_as_data_uri( $library, $iconName )` (7-day object cache)
2. Sets `--icon-url` and `--icon-color` CSS custom properties on the `<a>` tag via `WP_HTML_Tag_Processor`
3. Adds class `has-icon` and attribute `data-icon-position` to the outer `<div>` wrapper

**Editor:** An `editor.BlockListBlock` HOC asynchronously fetches the FA Pro sprite, extracts the relevant `<symbol>`, builds a data URI, and injects the same CSS vars + `has-icon` class via `wrapperProps`.

**CSS** (`.wp-block-button.has-icon` in `style.scss`):

```scss
.wp-block-button.has-icon .wp-element-button {
	display: flex;
	align-items: center;
	gap: 0.5em;
	&::before,
	&::after {
		/* icon rendered via mask-image: var(--icon-url) */
		/* colored via background-color: var(--icon-color, currentColor) */
	}
}
/* position toggled by hiding one pseudo-element */
[data-icon-position='left'] .wp-element-button::after {
	display: none;
}
[data-icon-position='right'] .wp-element-button::before {
	display: none;
}
```

Because `mask-image` is used (not `background-image`), the icon color is applied independently via `background-color`. This means icons work correctly in dark mode without extra CSS overrides, and the color can be changed at any time without regenerating assets.

### Icon is composable with block styles

Because `hasIcon` is an attribute (not a block style), it stacks with any block style:

```
is-style-link  + hasIcon: true  → link button with icon
is-style-outline + hasIcon: true → outline button with icon
(default)      + hasIcon: true  → filled button with icon
```

### Inspector panel

The `editor.BlockEdit` HOC (`inspector.jsx`) adds an **Icon** panel to every `core/button` inspector:

- **Add icon** — `ToggleControl` master switch. All controls below are hidden when off.
- **Library** — `SelectControl` populated from `IconLibraryIndex` (from `@prc/icons`).
- **Search icons** — `SearchControl` filters the icon grid by substring.
- **Icon grid** — paginated 6-column grid (60 icons/page) using `Icon` from `@prc/icons` for real sprite-based previews. Click to select.
- **Icon Position** — `ToggleGroupControl` (Left / Right).
- **Icon Color** — `PanelColorSettings` with theme palette + custom color.

## Legacy Icon Styles (deprecated)

The following block styles are still registered in PHP for backwards rendering but are **hidden from the editor picker** (filtered out via `blocks.registerBlockType`). When a block using one of these styles is next edited, it is **automatically migrated** to `hasIcon: true` + the appropriate attribute values.

| Style Name                                 | Migrates to                                                                              |
| ------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `icon__arrow-right-long`                   | `iconLibrary: solid`, `iconName: arrow-right-long`                                       |
| `icon__up-right-and-down-left-from-center` | `iconLibrary: solid`, `iconName: up-right-and-down-left-from-center`                     |
| `icon__magnifying-glass`                   | `iconLibrary: solid`, `iconName: magnifying-glass`, `iconColor: #346EAD`                 |
| `icon__clear`                              | `iconLibrary: light`, `iconName: circle-x`                                               |
| `icon__clear__filled`                      | `iconLibrary: solid`, `iconName: circle-x`                                               |
| `icon__arrows-rotate`                      | `iconLibrary: solid`, `iconName: arrows-rotate`                                          |
| `icon__graduation-cap`                     | `iconLibrary: solid`, `iconName: graduation-cap`                                         |
| `brand__google`                            | `iconLibrary: brands`, `iconName: google`, `iconPosition: left`, `iconColor: #4285F4`    |
| `brand__apple`                             | `iconLibrary: brands`, `iconName: apple`, `iconPosition: left`, `iconColor: #000000`     |
| `brand__microsoft`                         | `iconLibrary: brands`, `iconName: microsoft`, `iconPosition: left`, `iconColor: #00A4EF` |
| `brand__github`                            | `iconLibrary: brands`, `iconName: github`, `iconPosition: left`, `iconColor: #181717`    |

## Available Styles

### On `core/button`

The legacy per-icon styles listed above are kept registered but hidden. No new block styles are registered for the icon system — icon behavior is driven by the `hasIcon` attribute.

### On `core/buttons`

| Style Name     | Label        | Description                                                             |
| -------------- | ------------ | ----------------------------------------------------------------------- |
| `flex-buttons` | Flex Buttons | Applies flex layout with reduced padding and connected border treatment |

## Style Overrides

From `style.scss`:

- **100% width support:** `.wp-block-button__width-100 .wp-element-button` gets `width: 100%`
- **Hidden state:** `[hidden]` buttons get `display: none`
- **Error state:** `.is-error` gets `background-color: var(--wp--preset--color--ui-error)` with white text
- **Success state:** `.is-success` gets `background-color: var(--wp--preset--color--ui-success)` with white text
- **Processing state:** `.is-processing` gets `cursor: wait` and a pulsing opacity animation
- **Disabled state:** `.is-disabled` gets `opacity: 0.5` and `cursor: not-allowed`
- **Link decoration:** `.wp-block-button__link` removes text decoration
- **Has icon:** `.wp-block-button.has-icon` lays out the button as flex, adds a gap, and renders the icon pseudo-element
- **Flex buttons:** Connected border treatment (removes inter-button borders, rounds only outer corners) with responsive space-between variants

From `editor.scss`:

- Inherits color and background from parent in the editor
- Hides parent `wp-block-group` when a button inside is hidden

## Editor Enhancements

From `index.js`:

- Adds `interactivity: true` to the block's supports
- Adds `hasIcon`, `iconLibrary`, `iconName`, `iconPosition`, `iconColor` attributes
- Deletes the `parent` property so buttons can be placed independently of the `core/buttons` wrapper
- `editor.BlockListBlock` HOC: injects `has-icon` class + CSS vars for live icon preview in the editor
- `blocks.registerBlockType` filter (priority 20): strips legacy `icon__*` / `brand__*` styles from the editor style picker

## Frontend Interactivity

No dedicated `view.js` file. Interactivity is handled server-side by injecting `data-wp-*` directives during render:

**Standard mode** (when `interactiveNamespace` is set):

- `data-wp-interactive` -- bound to the target namespace
- `data-wp-on--click` -- dispatches `actions.onButtonClick`
- `data-wp-on--mouseenter` -- dispatches `actions.onButtonMouseEnter`
- `data-wp-text` -- bound to `state.{buttonId}.text`
- `data-wp-class--is-error` -- bound to `state.{buttonId}.isError`
- `data-wp-class--is-success` -- bound to `state.{buttonId}.isSuccess`
- `data-wp-class--is-processing` -- bound to `state.{buttonId}.isProcessing`
- `data-wp-class--is-disabled` -- bound to `state.{buttonId}.isDisabled`
- `data-wp-bind--hidden` -- bound to `state.{buttonId}.isHidden`

**Subsumption mode** (when `interactiveSubsumption` is `true`):

- Simplified directives without namespaced state paths

**Interactivity state** initialized per button:

```json
{
	"{buttonId}": {
		"isHidden": false,
		"isDisabled": false,
		"isError": false,
		"isSuccess": false,
		"isProcessing": false,
		"text": "Button Text",
		"originalText": "Button Text"
	}
}
```

## PHP Rendering

**Class:** `Core_Button`

Key behaviors:

1. **ID generation:** Assigns a unique `id` to every button from `anchor`, `metadata.name`, or `wp_unique_id()`
2. **Original text preservation:** Stores button text in `data-core-button-original-text`
3. **Icon injection:** `maybe_inject_icon_vars()` runs first — adds `has-icon` class + `data-icon-position` to the wrapper `<div>`, and `--icon-url` / `--icon-color` CSS vars to the `<a>` tag when `hasIcon` is `true`
4. **Block bindings:** When bound to `prc-platform/staff-info` with `photo-full`, adds `download` attribute; hides the button if no valid href exists
5. **Interactivity API injection:** Adds `data-wp-*` directives and initializes `wp_interactivity_state()` for the target namespace
6. **Apple News:** Registers layout (`link-button-layout`), style (`default-link-button`), and text style (`default-link-button-text-style`) components

## Block Markup Example

Button with icon (right, blue arrow):

```html
<div class="wp-block-button has-icon" data-icon-position="right">
	<a
		class="wp-block-button__link wp-element-button"
		id="core-button-1"
		style="--icon-url:url(data:image/svg+xml,...);--icon-color:#346EAD"
		data-core-button-original-text="Read More"
		href="/article"
		>Read More</a
	>
</div>
```

Button with icon + link style (composable):

```html
<div class="wp-block-button is-style-link has-icon" data-icon-position="right">
	<a
		class="wp-block-button__link wp-element-button"
		style="--icon-url:url(data:image/svg+xml,...);--icon-color:currentColor"
		href="/article"
		>Read More</a
	>
</div>
```

## Variations

None registered via `variations.js`. The icon system is driven by attributes, not variations.
