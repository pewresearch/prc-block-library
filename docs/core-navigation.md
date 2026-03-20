# Core Navigation

PRC's override/extension of the WordPress `core/navigation` block.

## Block Namespace

`prc-block/core-navigation`

## What PRC Customizes

- Forces the overlay/mobile menu to `never` display (disables the hamburger menu)
- Registers three custom block styles: Pills, Mega Menu, and Divided Links
- Ships comprehensive style overrides for navigation layout, submenus, and mobile behavior
- Includes full copies of core navigation styles (`_core-style.scss`, `_core-editor.scss`) for complete control

## Supports Modifications

| Support           | Change                                        |
|-------------------|-----------------------------------------------|
| `overlayMenu`     | Default forced to `"never"` -- disables the mobile hamburger menu |

Applied via `block_type_metadata` filter in `enforce_no_mobile_menu`.

## Additional Attributes

None beyond the `overlayMenu` default override.

## Available Styles

| Style Name       | Label          | Description                                              |
|------------------|----------------|----------------------------------------------------------|
| `pills`          | Pills          | Pill-shaped navigation items with borders and hover effects |
| `mega-menu`      | Mega Menu      | Full-width navigation with evenly distributed items       |
| `divided-links`  | Divided Links  | Links separated by vertical dividers (pipe characters)    |

Registered in `index.js` via `registerBlockStyle`.

## Style Overrides

**File:** `style.scss`

- Removes text decoration from navigation links by default
- Bolds `current-menu-item` links
- **Default style** -- links use `--wp--preset--color--link-color`, underline on hover
- **Divided Links** -- zero gap, items separated by `border-right: 1px solid black`, last item has no divider. Supports `has-ui-white-color` override for white dividers
- **Pills** -- `flex-wrap: nowrap`, `overflow-x: auto`, bordered items with rounded corners, hover background transition
- **Mega Menu** -- full-width, items distributed with `flex-grow: 1`, centered text with padding
- OneTrust cookie settings button styling (`.ot-sdk-show-settings`)

**File:** `_core-style.scss` -- Complete override of core navigation styles including submenu flyouts, responsive container, mobile menu overlay, justification settings, default background/colors, padding rules

**File:** `_core-editor.scss` -- Editor-specific overrides for submenu visibility, placeholder states, loading animations, mobile menu emulation in the editor

## Editor Enhancements

**File:** `index.js`

- Registers the three block styles (pills, mega-menu, divided-links)
- Imports style.scss for editor/frontend styles

## Frontend Interactivity

None. No `view.js` file.

## PHP Rendering

**File:** `class-core-navigation.php`

- **`enforce_no_mobile_menu`** (`block_type_metadata` filter) -- sets the `overlayMenu` attribute default to `"never"`, preventing the mobile hamburger menu from ever displaying

No render filter modifications to block content.

## Block Markup Example

```html
<!-- Default style -->
<nav class="wp-block-navigation is-style-default">
  <ul class="wp-block-navigation__container">
    <li class="wp-block-navigation-item">
      <a class="wp-block-navigation-item__content" href="/about">About</a>
    </li>
  </ul>
</nav>

<!-- Divided Links style -->
<nav class="wp-block-navigation is-style-divided-links">
  <ul class="wp-block-navigation__container">
    <li class="wp-block-navigation-item">
      <a class="wp-block-navigation-item__content" href="/topics">
        <span class="wp-block-navigation-item__label">Topics</span>
      </a>
    </li>
  </ul>
</nav>
```

## Variations

None.
