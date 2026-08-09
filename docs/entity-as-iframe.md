# Entity as Iframe

Renders any WordPress entity (post, page, etc.) as an iframe. Supports toggling the iframe on/off via the Interactivity API, making it useful for creating toggleable embedded content displays.

## Block Metadata

| Property    | Value                                              |
| ----------- | -------------------------------------------------- |
| Namespace   | `prc-block/entity-as-iframe`                       |
| Category    | `embed`                                            |
| Version     | `0.1.0`                                            |
| API Version | `3`                                                |
| Example     | Yes (`iframeTemplate`: content — inserter preview) |

**Assets:** `block.json` registers the frontend module as `viewScriptModule` (formerly `viewModule`).

## Supports

| Feature         | Value                             |
| --------------- | --------------------------------- |
| Anchor          | `true`                            |
| HTML editing    | `false`                           |
| Block gap       | `true`                            |
| Spacing margin  | `true` (default controls enabled) |
| Spacing padding | `true` (default controls enabled) |
| Interactivity   | `true`                            |

## Attributes

| Attribute        | Type     | Default   | Description                                                                                                                                                                                                         |
| ---------------- | -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ref`            | `number` | —         | The post/entity ID to render as an iframe.                                                                                                                                                                          |
| `allowedBlocks`  | `array`  | —         | Override the default list of allowed inner blocks (for the entity editor in the block editor).                                                                                                                      |
| `iframeTemplate` | `string` | `content` | Embeds output variant: `content` (post body / `core/post-content` only, no theme `iframed-post-content` part) or `branded` (legacy full iframe chrome when applicable). Sent as `iframeTemplate` on the iframe URL. |

## Iframe URL query parameters

The block loads `…/iframe/` with:

| Parameter           | Values               | Default                                                                  | Purpose                                                                                                                                                                                                                 |
| ------------------- | -------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prc_entity_iframe` | `1`                  | —                                                                        | Marks requests from this block; suppresses branded masthead/title when combined with defaults.                                                                                                                          |
| `iframeTemplate`    | `content`, `branded` | omitted (`branded` behavior for plain `/iframe/` URLs without the param) | `content`: minimal body output (no theme `iframed-post-content` template part, no branded header). `branded`: previous full-iframe behavior including optional template part and masthead when not in entity-only mode. |

The embeds layer (`@prc/embeds`) reads `iframeTemplate` on `/iframe/` requests. Existing URLs without `iframeTemplate` keep **branded** defaults.

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
5. On the frontend, the entity is rendered as an iframe using the entity's `/iframe/` URL with `prc_entity_iframe=1` and `iframeTemplate=content|branded` (see table above).
6. Third-party code or **parent container blocks** (tabs, details, dialog, accordion, etc.) can set whether the entity iframe should load by updating the Interactivity API store (see **Container integration** below).

**Developer API for toggling:**

```js
store('prc-block/entity-as-iframe').state[iframeId].isActive = true;
```

Use the iframe’s DOM `id` (from server render, e.g. `prc-entity-iframe-…`) as `iframeId`. The block’s global state uses **`isActive`**, not `open`.

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
2. Appends `prc_entity_iframe=1`, `iframeTemplate`, and the `/iframe/` path for iframe-specific rendering.
3. Reads iframe height from post meta (`iframe_height`), defaulting to 500px.
4. Enqueues the iframe resizer parent script (`prc-platform-iframe-embeds-resizer-script`) provided by the `@prc/embeds` plugin.
5. Registers Interactivity API state with `isActive: false` and `resizer: null` for the iframe ID (`resizer` holds a reference used after iframe-resizer runs; see **Frontend Interactivity**).
6. Renders the block wrapper with Interactivity API directives:
    - `data-wp-interactive="prc-block/entity-as-iframe"`
    - `data-wp-context` with iframe ID, entity URL, and `src` (initially empty)
    - `data-entity-iframe-prefetch-url` — same URL as `context.url` for optional prefetch by parent UI (tabs, details, dialog, etc.)
    - `data-wp-watch--on-activate` for activation callback
    - `data-wp-class--is-active` for active state styling
7. The inner `<iframe>` is built with `wp_sprintf` using only **id** (`%1$s`) and **height** (`%2$s`). The entity URL is **not** inlined in the iframe tag; it is provided via context and bound with `data-wp-bind--src="context.src"` (lazy load until active).

Rendered output:

```html
<div
	class="wp-block-prc-block-entity-as-iframe"
	data-ref-id="12345"
	data-wp-interactive="prc-block/entity-as-iframe"
	data-wp-context='{"id":"prc-entity-iframe-1","url":"https://example.com/post/iframe/?prc_entity_iframe=1&iframeTemplate=content","src":""}'
	data-entity-iframe-prefetch-url="https://example.com/post/iframe/?prc_entity_iframe=1&iframeTemplate=content"
	data-wp-watch--on-activate="callbacks.onActivate"
	data-wp-class--is-active="callbacks.isActive"
	data-iframe-height
>
	<iframe
		id="prc-entity-iframe-1"
		data-wp-bind--src="context.src"
		height="500px"
		width="100%"
		scrolling="no"
		frameborder="0"
	></iframe>
</div>
```

## Frontend Interactivity

Uses the WordPress Interactivity API with store namespace `prc-block/entity-as-iframe`.

**Per-iframe state (by iframe DOM id):**

-   `state[iframeId].isActive` — Whether the iframe should load (`src` set) and participate in resizing.
-   `state[iframeId].resizer` — After activation, may hold the iframe **element** reference returned by `@iframe-resizer/parent` v5 (see `onActivate`); cleared on deactivate.

**State (derived):**

-   `state.active` — Returns the `isActive` flag for the current iframe from the global state (via `getContext().id`).

**Actions:**

-   `activate()` — Toggles the iframe's active state on/off.

**Callbacks:**

-   `isActive()` — Returns the current active state (used for CSS class binding).
-   `onActivate()` — Runs when `isActive` changes (via `data-wp-watch--on-activate`):
    -   **Activated:** Sets `context.src` to `context.url`, then calls the parent iframe-resizer **v5** API (`@iframe-resizer/parent`):
        -   Resolves **`window.iFrameResize` first** (registered by `@prc/embeds` / `prc-platform-iframe-embeds-resizer-script`), then falls back to **`window.iframeResize`** if present.
        -   Calls `resize(options, iframe)` with `license: 'GPLv3'`, `direction: 'vertical'`, `heightCalculationMethod: 'taggedElement'`.
        -   v5 returns a **frozen array of iframe elements**. The code only uses **`result[0]`** when `Array.isArray(result) && result.length > 0`; otherwise it stores the **`iframe` element** passed in. This avoids throwing when the return value is `undefined` or an empty array.
        -   Stores that element on `state[context.id].resizer` for bookkeeping; teardown uses the iframe’s API below.
    -   **Deactivated:** Clears `context.src`, then calls **`iframe.iframeResizer` / `iframe.iFrameResizer`** `.disconnect()` when available, and sets `state[context.id].resizer` to `null`.

## Container integration

When this block is nested inside **tabs**, **details**, **dialog**, **accordion**, etc., parent blocks should drive **`isActive`** so the iframe loads only when the panel is visible. Shared helpers live under `src/entity-as-iframe/shared/`:

-   **`sync-entity-iframe-active.js`** — `syncEntityIframeActive(containerEl, isActive)` finds `.wp-block-prc-block-entity-as-iframe` inside `containerEl` and sets `store('prc-block/entity-as-iframe').state[iframeId].isActive`.
-   **`prefetch-entity-iframe.js`** — Prefetches the URL from `data-entity-iframe-prefetch-url` on the wrapper (best-effort cache warm before first open).

See [core-tabs.md](./core-tabs.md), [core-details.md](./core-details.md), and [core-dialog.md](./core-dialog.md) for how each container wires watches and prefetch. For legacy PRC accordion trees, see [accordion-controller.md](./accordion-controller.md).

## Runtime Dependencies

-   Requires `@prc/embeds` to be active for full functionality. This block depends on:
    -   The `prc-platform-iframe-embeds-resizer-script` parent script handle (exposes **`window.iFrameResize`** in the v5 UMD bundle).
    -   The `?iframe=true` endpoint/template behavior used for iframe rendering.
    -   The iframe template’s `data-iframe-height` marker, which is required by `heightCalculationMethod: 'taggedElement'`.

## Related Blocks

Commonly embedded inside **core/tabs**, **core/details**, **prc-block/dialog**, **core/accordion**, and similar patterns that control visibility; see **Container integration** above.
