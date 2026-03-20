# Playground

A dev-only block that provides a simple way to see all blocks and/or components at once. Delete it and drop it back in to start fresh. Not registered or rendered in production environments.

## Block Namespace

`prc-block/playground`

## Category

`design`

## Supports

| Feature | Enabled |
|---------|---------|
| Anchor | Yes |
| HTML | No |

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `playgroundType` | `string` | `"blocks"` | The type of playground. One of: `blocks`, `components`. |

## Available Styles

No block style variations defined.

## Block Variations

| Variation | Name | Description | Default |
|-----------|------|-------------|---------|
| Blocks Playground | `blocks-playground` | Renders all registered blocks as inner blocks | Yes |
| Components Playground | `components-playground` | Renders component demos on the frontend | No |

## Inner Blocks

This is a container block. The inner blocks are dynamically populated:

- **Blocks mode:** The PHP class constructs a template containing every registered block type (excluding `prc-block/playground` itself, blocks with parent restrictions, and newsletterglue blocks). This template is localized to the editor script.
- **Components mode:** A single paragraph placeholder is shown in the editor. Component demos render on the frontend.

## Parent/Ancestor Requirements

None.

## Usage Instructions

1. This block is **development-only** -- it is not registered in production environments (`wp_get_environment_type() === 'production'`).
2. Insert the **Playground** block (or choose between "Blocks Playground" and "Components Playground" variations).
3. **Blocks Playground**: The editor will populate with instances of every registered block type, useful for visual QA and testing.
4. **Components Playground**: The frontend renders demo instances of `@prc/components` like `Select`, `Autocomplete`, and `Slider`.
5. Delete the block and re-insert it to reset the playground contents.

## Block Markup Example

```html
<div class="wp-block-prc-block-playground">
  <!-- Inner blocks content / component demos rendered here -->
</div>
```

## PHP Rendering

The `render_block_callback` method:

1. Returns nothing if the environment is `production`.
2. Wraps inner block content in a `<div>` with block wrapper attributes.

The `block_init` method:

1. Skips registration entirely in production.
2. Constructs a block template from all registered block types (filtering out recursive, parent-restricted, and newsletterglue blocks).
3. Localizes the template to the editor script as `prcPlayground.blockTemplate`.

## Frontend Interactivity

Has a `view.js` script that runs on `domReady`:

- Finds all `.wp-block-prc-block-playground` elements on the page.
- Renders a React component (`Group`) into each element containing demo instances of `Select` and `Autocomplete` components from `@prc/components`.

This is only relevant in the **Components Playground** variation.

## Related Blocks

None -- this is a standalone development utility block.
