# Entity as Iframe

Renders any WordPress entity (post, page, etc.) as an iframe. Supports toggling the iframe on/off via the Interactivity API, making it useful for creating toggleable embedded content displays.

## Block Metadata

| Property    | Value                           |
|-------------|---------------------------------|
| Namespace   | `prc-block/entity-as-iframe`    |
| Category    | `embed`                         |
| Version     | `0.1.0`                         |
| API Version | `3`                             |

## Supports

| Feature         | Value                             |
|-----------------|-----------------------------------|
| Anchor          | `true`                            |
| HTML editing    | `false`                           |
| Block gap       | `true`                            |
| Spacing margin  | `true` (default controls enabled) |
| Spacing padding | `true` (default controls enabled) |
| Interactivity   | `true`                            |

## Attributes

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `ref` | `number` | — | The post/entity ID to render as an iframe. |
| `allowedBlocks` | `array` | — | Override the default list of allowed inner blocks (for the entity editor in the block editor). |

## Available Styles

None.

## Inner Blocks

In the editor, this block uses `useEntityBlockEditor` to render the referenced entity's content as editable inner blocks. Default allowed blocks are `core/group` and `core/paragraph`.

On the frontend, inner blocks are not rendered -- the entity is displayed as an iframe instead.

## Parent/Ancestor Requirements

None. Can be placed anywhere.

## Usage Instructions

1. Insert the **Entity as Iframe** block from the block inserter (under the Embed category).
2. A placeholder appears with two options:
   - **Search** for an existing entity (post/page).
   - **Create** a new entity.
3. Once an entity is selected, its content appears as editable inner blocks in the editor.
4. The inspector panel shows the entity's title (editable) and a link to open the entity in a new window.
5. On the frontend, the entity is rendered as an iframe using the entity's permalink with an `?iframe=true` query parameter.
6. Third-party code can toggle the iframe on/off programmatically via the Interactivity API store.

**Developer API for toggling:**

```js
store('prc-block/entity-as-iframe').state[iframeId].isActive = true;
```

## Block Markup Example

In `post_content` (editor saves inner blocks as entity content):

```html
<!-- wp:prc-block/entity-as-iframe {"ref":12345} -->
<!-- inner blocks from the referenced entity -->
<!-- /wp:prc-block/entity-as-iframe -->
```

## PHP Rendering

The `Entity_As_Iframe` PHP class provides a server-side render callback:

1. Resolves the `ref` attribute to a post permalink.
2. Appends `?iframe=true` to the URL for iframe-specific rendering.
3. Reads iframe height from post meta (`iframe_height`), defaulting to 500px.
4. Enqueues the iframe resizer parent script (`prc-platform-iframe-embeds-resizer-script`) provided by the `@prc/embeds` plugin.
5. Registers Interactivity API state with `isActive: false` and `resizer: null` for the iframe ID.
6. Renders the block wrapper with Interactivity API directives:
   - `data-wp-interactive` with namespace `prc-block/entity-as-iframe`
   - `data-wp-context` with iframe ID, URL, and src
   - `data-wp-watch--on-activate` for activation callback
   - `data-wp-class--is-active` for active state styling
7. The iframe's `src` attribute is bound via `data-wp-bind--src="context.src"` and starts empty (lazy loading).

Rendered output:

```html
<div class="wp-block-prc-block-entity-as-iframe"
     data-ref-id="12345"
     data-wp-interactive='{"namespace":"prc-block/entity-as-iframe"}'
     data-wp-context='{"id":"prc-entity-iframe-1","url":"https://example.com/post/?iframe=true","src":""}'
     data-wp-watch--on-activate="callbacks.onActivate"
     data-wp-class--is-active="callbacks.isActive"
     data-iframe-height>
  <iframe id="prc-entity-iframe-1"
          data-wp-bind--src="context.src"
          height="500px" width="100%"
          scrolling="no" frameborder="0"></iframe>
</div>
```

## Frontend Interactivity

Uses the WordPress Interactivity API with store namespace `prc-block/entity-as-iframe`.

**State (derived):**

- `state.active` — Returns the `isActive` flag for the current iframe from the global state.

**Actions:**

- `activate()` — Toggles the iframe's active state on/off.

**Callbacks:**

- `isActive()` — Returns the current active state (used for CSS class binding).
- `onActivate()` — Watcher that runs when the active state changes:
  - When activated: Sets the iframe's `src` to the entity URL and initializes iframe-resizer v5 for auto-height adjustment using `heightCalculationMethod: 'taggedElement'` and `license: 'GPLv3'`.
  - When deactivated: Clears the iframe `src` and disconnects the active iframe-resizer instance.

## Runtime Dependencies

- Requires `@prc/embeds` to be active for full functionality. This block depends on:
  - The `prc-platform-iframe-embeds-resizer-script` parent script handle.
  - The `?iframe=true` endpoint/template behavior used for iframe rendering.
  - The iframe template's `data-iframe-height` marker, which is required by `heightCalculationMethod: 'taggedElement'`.

## Related Blocks

None specific, but commonly used with blocks that need to embed interactive WordPress content inline.
