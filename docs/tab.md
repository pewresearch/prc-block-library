# Tab

> **Deprecated.** This block has been superseded by `core/tab`. It remains registered for backward compatibility with existing content. Source files live in `deprecated/src/tab/`.

Content panel for a single tab within a `prc-block/tabs` tabbed interface. Each Tab block holds arbitrary inner blocks and exposes its label to the parent Tabs block via context.

## Namespace

`prc-block/tab`

## Category

`design`

## Supports

| Feature    | Detail                                                                        |
| ---------- | ----------------------------------------------------------------------------- |
| Anchor     | Yes                                                                           |
| HTML       | No                                                                            |
| Reusable   | No                                                                            |
| Layout     | Switching, vertical alignment, justification, orientation, sizing on children |
| Spacing    | `blockGap`, `padding` (no `margin`)                                           |
| Typography | `fontSize`, `fontFamily` (skip serialization -- applied manually in PHP)      |

## Attributes

| Attribute | Type     | Default | Description                                                             |
| --------- | -------- | ------- | ----------------------------------------------------------------------- |
| `label`   | `string` | `""`    | The visible tab label rendered in the tablist by the parent Tabs block. |

## Available Styles

None. Visual styling is inherited from the parent `prc-block/tabs` block and its style variants.

## Inner Blocks

Accepts any block. Default template inserts a single `core/paragraph` with placeholder text.

## Parent / Ancestor Requirements

| Constraint | Value            |
| ---------- | ---------------- |
| `parent`   | `prc-block/tabs` |

## Context

| Direction | Key         | Maps to           |
| --------- | ----------- | ----------------- |
| Provides  | `tab/label` | `label` attribute |

## Usage

Tab blocks are inserted exclusively inside a Tabs container. Each tab provides its label via the `providesContext` mechanism so the parent can render the tablist.

In the editor, the Tab uses a SlotFill pattern (`TabFill` / `TabsListSlot`) to render its label button into the parent's tab bar. Only the currently selected tab's inner content is visible.

Inspector controls:

-   **Tab Label** -- text control mirroring the inline RichText label.
-   **Is Default Tab** -- toggle that sets the parent Tabs block's `activeTabIndex` to this tab's index so it displays on page load.

## Block Markup (save)

```html
<section class="wp-block-prc-block-tab" id="{tabPanelId}">
	<!-- inner blocks -->
</section>
```

The `id` is derived from either a user-set anchor or an auto-generated slug from the label.

## PHP Rendering

`class-tab.php` (`PRC\Platform\Blocks\Tab`)

The render callback uses `WP_HTML_Tag_Processor` to augment the saved `<section>`:

1. Sets `data-wp-interactive="prc-block/tabs"` to join the parent's Interactivity API store.
2. Injects `data-wp-context` with `{ tab: { id } }`.
3. Adds `role="tabpanel"` and `aria-labelledby="tab__{id}"`.
4. Binds visibility: `data-wp-bind--hidden="!state.isActiveTab"`.
5. Binds tabindex: `data-wp-bind--tabindex="state.tabIndexAttribute"`.
6. Manually serializes typography classes (`has-{size}-font-size`, `has-{family}-font-family`) and inline styles since `__experimentalSkipSerialization` is enabled.

## Frontend Interactivity

The Tab block does not register its own Interactivity API store. It participates in the `prc-block/tabs` store defined by the parent Tabs block. The store's `state.isActiveTab` computed property compares the tab's context-provided index against `context.activeTabIndex` to toggle visibility.

## Related Blocks

| Block            | Relationship                                                               |
| ---------------- | -------------------------------------------------------------------------- |
| `prc-block/tabs` | Required parent container                                                  |
| `core/tabs`      | Core replacement (the PRC tabs block is deprecated in the editor inserter) |
