# Render To Region

## Block Overview

| Property    | Value                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------------- |
| Name        | `prc-block/render-to-region`                                                                   |
| Title       | Render To Region                                                                               |
| Category    | `theme`                                                                                        |
| Version     | 1.0.0                                                                                          |
| Description | This block allows other blocks to "render to" the defined region upon certain conditions.      |

## Supports

| Feature        | Enabled |
| -------------- | ------- |
| HTML editing   | No      |
| Anchor         | Yes     |
| Reusable       | No      |
| Interactivity  | Yes     |

## Attributes

| Attribute              | Type     | Default                                                                                           | Description                                                                 |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `regionName`           | `string` | _(none)_                                                                                          | A unique name identifying the region. Must not conflict with other regions.  |
| `activationConditions` | `object` | `{ isDesktop: false, isMobile: false, isTablet: false, isPortrait: false, isLandscape: false }`   | Conditions under which blocks should be rendered into this region.           |

### Activation Conditions Properties

| Property      | Type      | Default | Description                                        |
| ------------- | --------- | ------- | -------------------------------------------------- |
| `isDesktop`   | `boolean` | `false` | Activate this region on desktop viewports.          |
| `isMobile`    | `boolean` | `false` | Activate this region on mobile viewports.           |
| `isTablet`    | `boolean` | `false` | Activate this region on tablet viewports.           |
| `isPortrait`  | `boolean` | `false` | Activate this region in portrait orientation.       |
| `isLandscape` | `boolean` | `false` | Activate this region in landscape orientation.      |

## Available Styles

None defined.

## Inner Blocks

This block does not accept inner blocks.

## Parent / Ancestor Requirements

None. This block can be placed anywhere, typically within templates.

## Usage Instructions

1. Insert the **Render To Region** block into a template or post.
2. Open the block inspector and set a unique **Region Name**.
3. Toggle the desired **Activation Conditions** (Desktop, Mobile, Tablet, Portrait, Landscape) to control when blocks attached to this region become active.
4. Other blocks on the page can target this region via their `metadata.regionName` attribute (added through the Advanced Inspector Controls that this block injects into all blocks).
5. In the editor, the block displays a warning notice showing the current region name.

## Block Markup Example

```html
<div class="wp-block-prc-block-render-to-region"
     data-prc-block--render-to-region--name="sidebar-region">
</div>
```

## PHP Rendering

The block is server-side rendered via `Render_To_Region::render_block_callback()`. The PHP class:

- Tracks defined regions and requested regions across the page render.
- Adds `data-wp-interactive`, `data-wp-init`, and `data-wp-watch` attributes to the region wrapper for Interactivity API integration.
- Uses `wp_interactivity_state()` to pass region name and attached block IDs to the client.
- Via the `render_block` filter, adds `data-prc-block--render-to-region--name` and `data-prc-block--render-to-region--attach-id` attributes to blocks that target a region.
- Appends a re-attach placeholder `<div>` after each block targeting a region, used to return the block to its original position when the region deactivates.
- Exposes a REST API endpoint at `prc-api/v3/render-to-regions` (GET) that accepts `post` (integer) or `template` (string) parameters and returns available regions.
- Registers the `prc_block__render_to_regions` post meta (array of strings) for storing region names per post.

## Frontend Interactivity

The `view.js` uses the WordPress Interactivity API (`@wordpress/interactivity`) to manage region mounting and updates:

- **`callbacks.onMount`**: Fires when a block targeting a region initializes; reads the region name from `data-prc-block--render-to-region--name`.
- **`callbacks.onUpdate`**: Fires on state changes for blocks targeting a region.
- **`callbacks.onRegionMount`**: Fires when the region element itself initializes.
- **`callbacks.onRegionUpdate`**: Fires when the region state updates.
- Includes a `doNavigateAction` generator that uses the Interactivity Router for client-side navigation.

## Related Blocks

This block works with any block on the page. Blocks target a region by setting `metadata.regionName` in their advanced inspector controls. The block injects a "Render To Region" control into every block's Advanced Inspector via a `editor.BlockEdit` filter.
