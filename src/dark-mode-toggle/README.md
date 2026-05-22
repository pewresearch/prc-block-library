# Dark Mode Toggle

`prc-block/dark-mode-toggle`

A button block that lets visitors override their OS color-scheme preference for the current site. The PRC Design System theme uses CSS `light-dark()` color tokens and `prefers-color-scheme` media queries throughout, so flipping `color-scheme` on `<html>` is enough to swap the entire site between light and dark variants without changing the user's OS setting.

## How it works

- The block ships with `viewScriptModule` view code that uses the WordPress Interactivity API (namespace `prc-block/dark-mode-toggle`).
- On click, it sets `document.documentElement.style.colorScheme` to `only light` or `only dark` (the same trick the editor's `feature-dark-mode-preview` plugin uses for the canvas iframe).
- The user's choice is persisted in `localStorage` under the key `prc-color-scheme-preference` (values: `light`, `dark`, or absent for "follow OS").
- On page load, an `init` callback re-applies the persisted preference and registers a `matchMedia` listener so the icon/label still react to OS-level changes when no override is set.

## Attributes


| Attribute    | Type    | Default      | Description                                                                       |
| ------------ | ------- | ------------ | --------------------------------------------------------------------------------- |
| `showLabel`  | boolean | `true`       | Show the text label next to the icon.                                             |
| `darkLabel`  | string  | `Dark mode`  | Label shown when the site is currently in light mode (clicking switches to dark). |
| `lightLabel` | string  | `Light mode` | Label shown when the site is currently in dark mode (clicking switches to light). |


## Block supports

Border (color, style, width) and border radius use `__experimentalBorder` with `supports.selectors` so generated classes and inline rules apply to the inner `<button>`, not only the wrapper. Background and text color supports target the same button. Padding uses the existing spacing support on the block root; editors can add horizontal/vertical padding on the button in the Site Editor / block settings.

## Caveats

- There is a brief flash between first paint and Interactivity API hydration when a user has previously chosen a non-default scheme. A future iteration can add an inline `wp_head` priority-1 script (gated on `has_block()`) to apply the persisted preference before paint.
- Requires a theme that already opts into `:root { color-scheme: light dark }` and uses `light-dark()` tokens or `prefers-color-scheme` queries (the PRC Design System theme does both).