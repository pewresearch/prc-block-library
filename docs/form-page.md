# Form Page

## Block Name & Description

**Title:** Form Page
**Description:** A primitive block for a form page.

## Block Namespace

`prc-block/form-page`

## Category

`forms`

## Supports

| Feature | Enabled | Details |
|---------|---------|---------|
| Anchor | Yes | |
| HTML editing | No | |
| Reusable | No | |
| Interactivity | Yes | |
| Color | Yes | Background, text, link |
| Layout | Yes | Flex layout with vertical orientation; supports orientation, justification, vertical alignment, and sizing on children |
| Spacing | Yes | `blockGap`, `padding`, `margin` |
| Typography | Yes | Font size, line height, font family, font weight |

## Attributes

This block has **no custom attributes**. It acts purely as a container for form fields within a multi-page form.

## Available Styles

None.

## Inner Blocks

Yes. This is a container block. Any blocks can be placed inside -- typically form input blocks, headings, paragraphs, and other form elements that belong to a single "page" of a multi-step form.

## Parent / Ancestor Requirements

**Ancestor:** `prc-block/form`

This block can only be inserted inside a `prc-block/form` block (at any nesting depth).

## Usage Instructions

1. Inside a `prc-block/form` block, add one or more Form Page blocks.
2. Each Form Page represents a step in a multi-page form.
3. Add form input fields (text, textarea, checkboxes, etc.) inside each Form Page.
4. The form's interactivity layer handles page visibility -- only the current active page is shown, while others are hidden via the `hidden` attribute.
5. Navigation between pages is managed by the parent form's interactivity store.

## Block Markup Example

```html
<div class="wp-block-prc-block-form-page"
     id="prc-block-form-page-1"
     data-wp-interactive="prc-block/form"
     data-wp-bind--hidden="state.isPageHidden"
     data-wp-context='{"pageId":"prc-block-form-page-1"}'>
  <!-- Form fields for this page -->
  <div class="wp-block-prc-block-form-input-text">...</div>
  <div class="wp-block-prc-block-form-input-textarea">...</div>
</div>
```

## PHP Rendering

Server-side rendered via `render_block_callback` in `Form_Page`. The PHP:

1. Assigns a unique `id` to the page wrapper (e.g., `prc-block-form-page-1`).
2. Adds `data-wp-interactive="prc-block/form"` to bind to the form interactivity store.
3. Adds `data-wp-bind--hidden="state.isPageHidden"` to control page visibility.
4. Adds `data-wp-context` with the page's unique ID so the form store can track which page is active.

## Frontend Interactivity

No standalone `view.js`. Page visibility is managed by the parent form's interactivity store (`prc-block/form`). The store tracks the current page and evaluates `state.isPageHidden` per page context to show/hide pages.

The `[hidden]` attribute is styled with `display: none` in the block's CSS.

## Related Blocks

- `prc-block/form` -- Required ancestor; manages page navigation state
- `prc-block/form-input-text` -- Form input fields placed inside pages
- `prc-block/form-input-textarea` -- Textarea fields placed inside pages
- `prc-block/form-submit` -- Submit actions (typically on the last page)
- `prc-block/form-message` -- Post-submission message
