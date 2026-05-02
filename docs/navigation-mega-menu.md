# Navigation Mega Menu

Mega menu that supports multiple overlay types and animations.

## Block Namespace

`prc-block/navigation-mega-menu`

## Category

`design`

## Supports

| Feature                     | Enabled |
| --------------------------- | ------- |
| HTML                        | No      |
| Interactivity               | Yes     |
| Renaming                    | Yes     |
| Reusable                    | No      |
| Typography (fontSize)       | Yes     |
| Typography (lineHeight)     | Yes     |
| Typography (fontFamily)     | Yes     |
| Typography (fontWeight)     | Yes     |
| Typography (fontStyle)      | Yes     |
| Typography (textTransform)  | Yes     |
| Typography (textDecoration) | Yes     |
| Typography (letterSpacing)  | Yes     |
| Shadow                      | Yes     |
| Border (color)              | Yes     |
| Border (width)              | Yes     |
| Slash Inserter              | Yes     |

## Attributes

| Attribute                             | Type      | Default      | Description                                                              |
| ------------------------------------- | --------- | ------------ | ------------------------------------------------------------------------ |
| `label`                               | `string`  | --           | The visible text label for the menu item.                                |
| `description`                         | `string`  | --           | Description text for the menu item (displayed if theme supports it).     |
| `title`                               | `string`  | --           | Additional title attribute for accessibility/clarification.              |
| `url`                                 | `string`  | --           | Fallback URL when the mega menu cannot be opened.                        |
| `menuSlug`                            | `string`  | --           | Slug of the template part to render as the mega menu content.            |
| `menuItemBackgroundColor`             | `string`  | --           | Preset color name for menu item background.                              |
| `customMenuItemBackgroundColor`       | `string`  | --           | Custom hex color for menu item background.                               |
| `menuItemTextColor`                   | `string`  | --           | Preset color name for menu item text.                                    |
| `customMenuItemTextColor`             | `string`  | --           | Custom hex color for menu item text.                                     |
| `menuItemActiveBackgroundColor`       | `string`  | --           | Preset color name for active menu item background.                       |
| `customMenuItemActiveBackgroundColor` | `string`  | --           | Custom hex color for active menu item background.                        |
| `menuItemActiveTextColor`             | `string`  | --           | Preset color name for active menu item text.                             |
| `customMenuItemActiveTextColor`       | `string`  | --           | Custom hex color for active menu item text.                              |
| `menuOverlayBackgroundColor`          | `string`  | --           | Preset color name for the mega menu overlay background.                  |
| `customMenuOverlayBackgroundColor`    | `string`  | --           | Custom hex color for the mega menu overlay background.                   |
| `menuOverlayTextColor`                | `string`  | --           | Preset color name for the mega menu overlay text.                        |
| `customMenuOverlayTextColor`          | `string`  | --           | Custom hex color for the mega menu overlay text.                         |
| `menuActiveBorderColor`               | `string`  | --           | Preset color name for active state border.                               |
| `customMenuActiveBorderColor`         | `string`  | --           | Custom hex color for active state border.                                |
| `isMobile`                            | `boolean` | `false`      | Whether this mega menu instance is designed for mobile layout.           |
| `icon`                                | `string`  | `"dropdown"` | Icon type for the toggle button. One of: `dropdown`, `mobile`, `search`. |
| `animation`                           | `string`  | --           | Animation type for the overlay. One of: `fade`, `slide`.                 |

## Available Styles

No block style variations defined in `block.json`, but variations control layout behavior (see below).

## Block Variations

| Variation           | Name                | Description                               | Default |
| ------------------- | ------------------- | ----------------------------------------- | ------- |
| Mega Menu (Desktop) | `mega-menu-desktop` | Absolute positioning designed for desktop | Yes     |
| Mega Menu (Mobile)  | `mega-menu-mobile`  | Absolute positioning designed for mobile  | No      |

## Inner Blocks

This block does not use inner blocks in the traditional sense. Instead, it references a **template part** (by `menuSlug`) that is rendered as the mega menu overlay content.

### Editor: template part sync and overlay positioning

In the editor, overlay content is not stored on the mega menu block itself. The edit UI loads the template part’s blocks through **`InnerBlocksAsSyncedContent`** from `@prc/components` (PRC Platform Core):

-   **`postType`:** `wp_template_part`
-   **`postId`:** Resolved from `menuSlug` via the menu template part hook (same entity the site uses for that template part).
-   **Sync:** Edits to inner blocks in the overlay are persisted to the template part post, not to the navigation block’s serialized markup.

The overlay wrapper passes a **React `ref`** into `InnerBlocksAsSyncedContent` so **`useRefResizer`** can measure the rendered node and drive inline `top`, `left`, and `width` for the overlay preview while the template part content or viewport changes. The ref is created with **`useRef`** so it stays stable across renders.

## Parent/Ancestor Requirements

**Parent:** `core/navigation`

This block can only be inserted inside a `core/navigation` block. It is registered as a listable block so that the navigation block wraps it in an `<li>` element.

## Usage Instructions

1. Insert a **Navigation Mega Menu** block inside a `core/navigation` block.
2. Set the **Label** -- this is the visible text for the navigation item.
3. Select a **Menu Template Part** -- this template part defines the content shown in the mega menu overlay.
4. Optionally set a **URL** as a fallback link when the mega menu cannot open.
5. Choose an **Icon** type:
    - `Dropdown` -- shows label with a caret icon
    - `Mobile` -- shows a hamburger (bars) icon instead of the label
    - `Search` -- shows a magnifying glass icon instead of the label
6. Customize colors for menu item states (default, active) and overlay appearance via the color controls in the inspector.
7. Click the menu item in the editor to toggle the mega menu overlay preview.

## Block Markup Example

```html
<div
	class="wp-block-prc-block-navigation-mega-menu wp-block-navigation-item has-label"
	id="mega-menu-1"
	style="--custom-menu-item-background-color: #fff; ..."
	data-wp-interactive="prc-block/navigation-mega-menu"
	data-wp-context='{"id":"mega-menu-1","animation":"fade","url":"..."}'
	data-wp-class--is-active="state.isActive"
	data-wp-init="callbacks.onInit"
	data-wp-on-window--resize="callbacks.onResize"
	data-wp-on-document--keydown="callbacks.onESCKey"
	data-wp-on-window--click="callbacks.onWindowClickCloseMegaMenu"
>
	<button
		class="wp-block-navigation-item__content wp-block-prc-block-navigation-mega-menu__toggle"
		data-wp-on--click="actions.toggleMenuOnClick"
		data-wp-bind--aria-expanded="state.isActive"
	>
		Topics
		<span
			class="wp-block-prc-block-navigation-mega-menu__toggle-dropdown-icon"
			><!-- caret icon --></span
		>
	</button>
	<div class="wp-block-prc-block-navigation-mega-menu__tab-divider"></div>
	<div
		class="wp-block-prc-block-navigation-mega-menu__container"
		tabindex="-1"
		data-wp-style--top="state.top"
		data-wp-style--left="state.left"
		data-wp-style--width="state.width"
	>
		<button
			class="wp-block-prc-block-navigation-mega-menu__container__close-button"
			data-wp-on--click="actions.closeMenuOnClick"
		>
			<!-- close icon -->
		</button>
		<!-- Template part content rendered here -->
	</div>
</div>
```

## PHP Rendering

The `block_render_callback` method:

1. Returns early if no `label` or `menuSlug` is set.
2. Renders the referenced template part via `block_template_part($menu_slug)`.
3. Generates a unique ID for the menu instance.
4. Sets initial interactivity state with `wp_interactivity_state`.
5. Renders an icon based on the `icon` attribute (dropdown caret, mobile bars, or search magnifying glass) using `\PRC\Platform\Icons\Render`.
6. Generates inline CSS custom properties for all color settings.
7. Outputs a toggle button, tab divider, and overlay container with full Interactivity API bindings.

**Additional PHP hooks:**

-   `mega_menu_template_part_areas` -- Registers a custom "menu" template part area for mega menu sections.
-   `enable_mega_menu_list_wrapper` -- Adds the block to `block_core_navigation_listable_blocks` so it gets wrapped in `<li>`.

## Frontend Interactivity

Uses the WordPress Interactivity API (`@wordpress/interactivity`).

**Store namespace:** `prc-block/navigation-mega-menu`

**State (derived):**

-   `isActive` -- Whether this menu instance is currently open
-   `width`, `left`, `top` -- Positioning values for the overlay

**Actions:**

-   `toggleMenuOnClick()` -- Toggles the menu open/closed
-   `closeMenuOnClick()` -- Closes the menu
-   `closeAll()` -- Closes all mega menu instances
-   `openMenu()` / `closeMenu()` -- Explicit open/close
-   `setMenuPositions()` -- Recalculates overlay positioning relative to the parent navigation block

**Callbacks:**

-   `onInit()` -- Sets initial menu positions and captures active classnames from inner group blocks
-   `onResize()` -- Recalculates positions on window resize
-   `onWindowClickCloseMegaMenu()` -- Closes the menu when clicking outside
-   `onESCKey()` -- Closes the menu on Escape key press

## Related Blocks

-   `core/navigation` -- Required parent block
-   `core/template-part` -- Used to define mega menu content
