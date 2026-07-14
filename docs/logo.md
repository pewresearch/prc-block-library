# Logo (Pew Research Center Logo)

## Block Name & Description

**Title:** Pew Research Center Logo
**Description:** The Pew Research Center logo, available in primary, alternate, decoded, symbol, and Pew Knight styles. Dark mode aware.

## Block Namespace

`prc-block/logo`

## Category

`theme`

## Supports

| Feature       | Enabled | Details                                               |
| ------------- | ------- | ----------------------------------------------------- |
| HTML editing  | No      |                                                       |
| Interactivity | Yes     | Enables Interactivity API directives on frontend      |
| Color         | Partial | Background and gradients enabled; text color disabled |
| Spacing       | Yes     | `padding`, `margin`                                   |

## Attributes

| Attribute       | Type     | Default  | Description                                           |
| --------------- | -------- | -------- | ----------------------------------------------------- |
| `justification` | `string` | `"left"` | Horizontal alignment: `"left"`, `"center"`, `"right"` |
| `width`         | `number` | `361`    | Logo width in pixels                                  |

## Available Styles

| Style                  | Label                    | Default | SVG Asset                      | Dark Mode Asset                |
| ---------------------- | ------------------------ | ------- | ------------------------------ | ------------------------------ |
| `primary-only`         | Primary                  | Yes     | `primary.svg`                  | `primary-white.svg`            |
| `primary-stable-white` | Primary (Stable White)   | No      | `primary-white.svg`            | `primary-white.svg`            |
| `alt-only`             | Alternate                | No      | `alternate.svg`                | `alternate-white.svg`          |
| `alt-stable-white`     | Alternate (Stable White) | No      | `alternate-white.svg`          | `alternate-white.svg`          |
| `symbol-only`          | Symbol Only              | No      | `symbol.svg`                   | `symbol-white.svg`             |
| `symbol-stable-white`  | Symbol (Stable White)    | No      | `symbol-white.svg`             | `symbol-white.svg`             |
| `decoded-only`         | Decoded                  | No      | `decoded.svg`                  | `decoded-white.svg`            |
| `pew-knight-only`      | Pew Knight               | No      | `pew-knight-logo-adaptive.svg` | `pew-knight-logo-adaptive.svg` |

"Stable White" variants always show the white version regardless of color scheme. Standard variants automatically switch between dark and light versions based on `prefers-color-scheme`.

## Inner Blocks

None. This is a leaf block.

## Parent / Ancestor Requirements

None. Can be placed anywhere. The block also registers itself as an allowed block inside `core/navigation` via a block filter.

## Context

**Uses context:** `postType`, `postId`, `queryId`

## Usage Instructions

1. Insert the Pew Research Center Logo block.
2. Choose a **style variation** from the block styles panel:
    - **Primary** -- Full wordmark, dark mode aware
    - **Primary (Stable White)** -- Always white wordmark
    - **Alternate** -- Alternate wordmark layout, dark mode aware
    - **Alternate (Stable White)** -- Always white alternate
    - **Symbol Only** -- Just the PRC symbol mark, dark mode aware
    - **Symbol (Stable White)** -- Always white symbol
    - **Decoded** -- Decoded sub-brand logo
    - **Pew Knight** -- Pew Knight wordmark; single adaptive SVG (`pew-knight-logo-adaptive.svg`) toggles light/dark artwork via internal `prefers-color-scheme` (same asset for Interactivity `src` / `currentSrc` on Safari/WebKit)
3. **Justification** -- Use the block toolbar to align the logo left, center, or right.
4. **Width** -- Resize the logo by dragging the resize handles when the block is selected, or enter a precise pixel width in the Dimensions inspector panel.
5. The logo links to the site's home URL. The "Decoded" style links to `/decoded` instead.

## Block Markup Example

```html
<div
	class="wp-block-prc-block-logo is-style-primary-only item-justified-left"
	data-wp-interactive='{"namespace":"prc-block/logo"}'
	data-wp-context='{"srcLight":".../primary.svg","srcDark":".../primary-white.svg","currentSrc":".../primary.svg"}'
	data-wp-init="callbacks.setupSafariColorScheme"
>
	<div class="wp-block-prc-block-logo__dimensions" style="max-width: 361px;">
		<div class="wp-block-prc-block-logo__inner">
			<a
				href="https://www.pewresearch.org"
				class="wp-block-prc-block-logo__link"
			>
				<img
					src=".../primary.svg"
					alt="Return to Home"
					loading="eager"
					data-wp-bind--src="context.currentSrc"
				/>
			</a>
		</div>
	</div>
</div>
```

## Asset Location

Logo SVG assets live in the shared `images/logos/` directory (`wp-content/images/logos/` at runtime) rather than inside the plugin. Both the editor (via `window.prcBlockLogoAssets`, localized from PHP) and the PHP render reference that single location. If the assets directory is missing the block silently skips registration.

## PHP Rendering

Server-side rendered via `render_block_callback` in `Logo`. The PHP:

1. Determines the active style from the block's `className` attribute (defaults to `primary-only`).
2. Maps the style to the appropriate SVG file using the `STYLE_TO_ASSET` constant.
3. Also maps to a dark-mode variant via `STYLE_TO_DARK_ASSET`.
4. Outputs Interactivity API attributes on the block wrapper: `data-wp-interactive` (namespace `prc-block/logo`), `data-wp-context` (`srcLight`, `srcDark`, `currentSrc`), and `data-wp-init` pointing at the view module callback.
5. Generates the `<img>` tag with `data-wp-bind--src="context.currentSrc"` (initial `src` matches light asset / `currentSrc`).
6. Wraps the image in an anchor tag linking to the site home (or `/decoded` for the decoded style).
7. Applies the width constraint via inline `max-width` style on the dimensions wrapper.
8. Adds justification classes (`item-justified-left`, `item-justified-center`, `item-justified-right`).

The block has no `save` function -- it is entirely dynamic/server-rendered.

## Frontend Interactivity

**`view.js`** (registered as **`viewScriptModule`**) -- WordPress Interactivity API store `prc-block/logo`.

SVGs loaded via `<img>` tags do not receive the `prefers-color-scheme: dark` media query on Safari/WebKit (macOS and iOS). The `setupSafariColorScheme` init callback:

1. Returns immediately on non-Safari/WebKit browsers (dark mode continues to use each SVG's internal CSS where applicable).
2. On Safari/WebKit, reads `srcLight` / `srcDark` from block context and sets `context.currentSrc` from `matchMedia('(prefers-color-scheme: dark)')`.
3. Subscribes to color-scheme changes with `withScope` so bound `img` `src` stays in sync.

The `<img>` uses `data-wp-bind--src="context.currentSrc"` so hydration matches the server-rendered light URL, then updates on Safari/WebKit when the scheme changes.

## Related Blocks

-   `prc-block/icon` -- Another SVG-rendering block for Font Awesome icons
-   `core/navigation` -- The logo block registers itself as an allowed block inside navigation
