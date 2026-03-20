# Version

**Get the latest version for various PRC_ constants.**

## Block Metadata

| Property  | Value                  |
| --------- | ---------------------- |
| Name      | `prc-block/version`    |
| Category  | `theme`                |
| API       | Version 3              |
| Textdomain| `version`              |

## Supports

This block defines no `supports` in its `block.json`. It does not register a traditional block type with `register_block_type`; instead, it registers a **block bindings source** and a **block variation** of `core/paragraph`.

## Attributes

No block-level attributes. This is not a standalone block -- it operates through block bindings on `core/paragraph`.

## Block Bindings Source

The PHP class registers a block bindings source:

| Property     | Value                                     |
| ------------ | ----------------------------------------- |
| Source name  | `prc-platform/version`                    |
| Label        | `Version Info`                            |

### Supported Modules

The binding accepts a `module` argument in `source_args`:

| Module         | Output                                                          |
| -------------- | --------------------------------------------------------------- |
| `platform`     | `Version: {PRC_PLATFORM_VERSION} "{PRC_PLATFORM_RELEASE_NAME}"` |
| `block-library` | `Version: {PRC_BLOCK_LIBRARY_VERSION}`                         |
| *(default)*    | Falls back to `platform` output                                |

The binding only works on `core/paragraph` blocks. Returns `null` for any other block type.

## Block Variation

The `index.js` registers a `core/paragraph` variation:

| Property     | Value                                     |
| ------------ | ----------------------------------------- |
| Variation name | `version-info`                          |
| Title        | `Version Info`                            |
| Placeholder  | `Version: 1.2.0 "Spiteful Washington"`   |

The variation pre-configures `metadata.bindings.content` to use the `prc-platform/version` source with `module: "platform"`.

## Inner Blocks

None. This is not a container block.

## Parent / Ancestor Requirements

None.

## Available Styles

None.

## Usage Instructions

1. Insert a **Version Info** block from the inserter (found under the `core/paragraph` variations).
2. The paragraph content is automatically bound to the `prc-platform/version` bindings source.
3. On the frontend, the paragraph will display the current platform version and release name (e.g., `Version: 2.5.0 "Some Release Name"`).
4. To show the block library version instead, modify the binding's `args.module` to `"block-library"` in the block's advanced settings or code editor.
5. The block is editor-only in its script loading -- it enqueues the editor script on `enqueue_block_editor_assets` to make the variation available in the inserter.

## PHP Rendering

There is no custom render callback. The block relies on WordPress core's block bindings API:

1. `Version::block_init()` registers the bindings source `prc-platform/version` via `register_block_bindings_source()`.
2. When WordPress renders a `core/paragraph` block with this binding, it calls `get_version_info_for_block_binding()`.
3. The callback checks that the block is `core/paragraph`, reads the `module` source arg, and returns the appropriate version string.

## Frontend Interactivity

None. The version string is rendered server-side as static text.

## Block Markup Example

**Saved markup (in post_content):**

```html
<!-- wp:paragraph {"metadata":{"bindings":{"content":{"source":"prc-platform/version","args":{"module":"platform"}}}}} -->
<p></p>
<!-- /wp:paragraph -->
```

**Rendered output:**

```html
<p class="wp-block-paragraph">Version: 2.5.0 "Release Name"</p>
```

## Related Blocks

- **`core/paragraph`** -- The Version block is implemented as a variation of `core/paragraph` with block bindings.
