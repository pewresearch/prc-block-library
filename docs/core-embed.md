# Core Embed

PRC's override/extension of the WordPress `core/embed` block.

## Block Namespace

`prc-block/core-embed`

**Target Block:** `core/embed`

## What PRC Customizes

- Registers a "Sli.do" embed variation so editors can embed Slido event widgets by URL

## Supports Modifications

None. PRC does not modify the core block's supports.

## Additional Attributes

None.

## Available Styles

None.

## Style Overrides

None. No `style.scss` file.

## Editor Enhancements

From `index.js`:

Registers a **"Sli.do"** block variation on `core/embed`:

| Property | Value |
|----------|-------|
| Name | `slido` |
| Title | Sli.do |
| Description | Embed a Slido chat widget |
| URL Pattern | `^https?:\/\/(app\.)?sli\.do\/.+` |
| Provider Slug | `slido` |
| Responsive | `true` |

The variation is activated when `providerNameSlug === 'slido'`.

## Frontend Interactivity

None. No `view.js` file.

## PHP Rendering

**Class:** `Core_Embed`

Minimal -- only registers and enqueues the editor script. No render-time modifications to the embed output.

## Block Markup Example

```html
<figure class="wp-block-embed is-type-rich is-provider-slido wp-block-embed-slido">
  <div class="wp-block-embed__wrapper">
    <iframe src="https://app.sli.do/event/2jtxhrzn" ...></iframe>
  </div>
</figure>
```

## Variations

| Variation Name | Title | Description |
|----------------|-------|-------------|
| `slido` | Sli.do | Embeds a Slido chat/polling widget by URL |
