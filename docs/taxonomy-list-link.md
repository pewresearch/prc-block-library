# Taxonomy List Link

Individual navigation link within a `prc-block/taxonomy-list`. Supports multiple variations including plain links, sub-headings, expandable sub-trees, and toggleable sub-expand menus. Uses the Interactivity API for active state management and URL-based state persistence.

## Block inserter example

`block.json` defines an `example` with sample `label` / `url` — inserter preview (parent is `taxonomy-list`).

## Namespace

`prc-block/taxonomy-list-link`

## Category

`theme`

## Supports

| Feature       | Detail                                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Anchor        | Yes                                                                                                                                        |
| HTML          | No                                                                                                                                         |
| Color         | Text, link, background                                                                                                                     |
| Interactivity | Yes                                                                                                                                        |
| Spacing       | `margin`, `padding`, `blockGap`                                                                                                            |
| Typography    | `fontSize`, `fontFamily`, `fontWeight`, `fontStyle`, `textTransform`, `textDecoration` (skip serialization), `letterSpacing`, `lineHeight` |

## Attributes

| Attribute       | Type      | Default | Description                                           |
| --------------- | --------- | ------- | ----------------------------------------------------- |
| `label`         | `string`  | --      | Display text for the link                             |
| `url`           | `string`  | --      | Link destination URL                                  |
| `id`            | `integer` | --      | Associated term ID                                    |
| `description`   | `string`  | --      | Term description                                      |
| `rel`           | `string`  | --      | Link `rel` attribute                                  |
| `opensInNewTab` | `boolean` | --      | Whether the link opens in a new browser tab           |
| `title`         | `string`  | --      | Link `title` attribute                                |
| `taxonomy`      | `string`  | --      | Taxonomy slug (also received via context)             |
| `enableSubMenu` | `boolean` | --      | Enables sub-menu toggle behavior with expand/collapse |

## Available Styles / Variations

Four registered variations in `variations.js`:

| Variation      | Name                             | Class                  | Description                                                        |
| -------------- | -------------------------------- | ---------------------- | ------------------------------------------------------------------ |
| Link (default) | `taxonomy-menu-link-default`     | --                     | Standard taxonomy term link                                        |
| Sub Heading    | `taxonomy-menu-link-sub-heading` | `is-style-sub-heading` | Section heading style, used as accordion title in mobile rendering |
| Sub Tree       | `taxonomy-menu-link-sub-tree`    | `is-style-sub-tree`    | Expandable sub-menu with nested child links, `enableSubMenu: true` |
| Sub Expand     | `taxonomy-menu-link-sub-expand`  | `is-style-sub-expand`  | Toggleable expand/collapse menu, `enableSubMenu: true`             |

## Inner Blocks

Allowed blocks:

-   `prc-block/taxonomy-list-link` (self-referencing for nested menus)
-   `core/paragraph`
-   `core/heading`

## Parent / Ancestor Requirements

| Constraint | Value                     |
| ---------- | ------------------------- |
| `parent`   | `prc-block/taxonomy-list` |

## Context

| Direction | Key        | Maps to                                             |
| --------- | ---------- | --------------------------------------------------- |
| Provides  | `style`    | `style` attribute                                   |
| Uses      | `taxonomy` | Taxonomy slug from parent `prc-block/taxonomy-list` |
| Uses      | `style`    | Style object from parent                            |

## Usage

Insert Taxonomy List Link blocks inside a `prc-block/taxonomy-list`. Choose a variation based on the desired behavior:

-   **Link** -- standard navigation link to a term archive.
-   **Sub Heading** -- visual section divider used as a label. On mobile accordion conversion, this label becomes the accordion title.
-   **Sub Tree** -- hierarchical menu with nested child links, toggled via a chevron icon.
-   **Sub Expand** -- expand/collapse section with a plus/minus toggle button.

Active state is tracked via the `taxonomyLink` URL query parameter. When a link is clicked, its term ID is added to or removed from the URL, and the corresponding menu item is highlighted.

## Block Markup (save)

Standard inner blocks save. Server-side rendering augments the output with interactive directives and icons.

## PHP Rendering

`class-taxonomy-list-link.php` (`PRC\Platform\Blocks\Taxonomy_List_Link`)

**Query var registration:**

-   Registers `taxonomyLink` as a public query variable via `query_vars` filter, enabling URL-based active state tracking.

**Render callback:**

1. Builds the link template with appropriate icon: chevron for sub-trees, plus/minus for sub-expand menus (using `PRC\Platform\Icons\render()`).
2. For sub-menu variations, adds a toggle button alongside the link.
3. Sets `data-wp-interactive="prc-block/taxonomy-list-link"`.
4. Injects `data-wp-context` with `{ id, label, isActive, hasSubMenu, subExpandLabel }`.
5. `isActive` is determined by comparing the link's term ID against the current `taxonomyLink` query var value.
6. Binds click handler: `data-wp-on--click="actions.onClick"`.
7. Binds dynamic class: `data-wp-class--is-active="context.isActive"`.
8. For sub-expand menus, binds the expand label text: `data-wp-text="callbacks.getExpandedMenuLabel"`.

## Frontend Interactivity

`view.js` registers the `prc-block/taxonomy-list-link` store.

**Actions:**

-   `onClick` -- Toggles `context.isActive`. When activating, appends `taxonomyLink={id}` to the URL via `addQueryArgs` from `@wordpress/url`. When deactivating, removes the query arg via `removeQueryArgs`. Updates `window.location` to persist state.

**Callbacks:**

-   `getExpandedMenuLabel` -- Returns `"Less"` when `context.isActive` is true, `"More"` otherwise. Used for the sub-expand toggle button label.
-   `onInit` -- On page load, if the link is already active (from the URL query var), scrolls the link element into view via `ref.scrollIntoView({ behavior: 'smooth' })` instead of `getElementById`, avoiding null reference errors when the DOM node is missing.

## Related Blocks

| Block                                      | Relationship                                             |
| ------------------------------------------ | -------------------------------------------------------- |
| `prc-block/taxonomy-list`                  | Required parent container                                |
| `prc-block/taxonomy-search`                | Sibling block for term search within the same list       |
| `prc-block/taxonomy-index-list-controller` | Grandparent controller managing desktop/mobile rendering |
