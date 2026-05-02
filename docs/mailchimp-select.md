# MailChimp Select

Select from multiple MailChimp segment interests to subscribe to.

## Block Namespace

`prc-block/mailchimp-select`

## Category

`marketing`

## Inserter preview

`block.json` includes an `example` that serializes the default template: one `prc-block/form` (namespace `prc-block/mailchimp-select`, action `subscribe`, interactive namespace for the Mailchimp form store) with email `form-input-text`, nested `form-submit` (button + captcha), and `form-message` with a thank-you paragraph. This drives the block inserter preview.

## Supports

| Feature                 | Enabled       |
| ----------------------- | ------------- |
| Anchor                  | Yes           |
| HTML                    | No            |
| Color (background)      | Yes           |
| Color (text)            | Yes           |
| Color (link)            | Yes           |
| Spacing (margin)        | Yes           |
| Spacing (padding)       | Yes           |
| Spacing (blockGap)      | Vertical only |
| Typography (fontSize)   | Yes           |
| Typography (lineHeight) | Yes           |
| Typography (fontFamily) | Yes           |
| Typography (fontWeight) | Yes           |
| Interactivity           | Yes           |

## Attributes

| Attribute   | Type    | Default | Description                                                                            |
| ----------- | ------- | ------- | -------------------------------------------------------------------------------------- |
| `interests` | `array` | `[]`    | Array of selected MailChimp segment interests that map to checkbox inputs in the form. |

## Available Styles

No block style variations defined.

## Inner Blocks

This is a container block. It uses a default template that includes:

-   `prc-block/form` (with namespace `prc-block/mailchimp-select` and action `subscribe`)
    -   `prc-block/form-input-text` (Email Address field, required)
    -   `prc-block/form-submit`
    -   `prc-block/form-message` (contains a paragraph with "Thank you for subscribing!")

Allowed inner blocks: `core/group`, `prc-block/form`.

When interests are selected via the inspector panel, `prc-block/form-input-checkbox` blocks are automatically inserted into the form with locked removal (to prevent accidental deletion). Each checkbox corresponds to a MailChimp interest segment.

## Parent/Ancestor Requirements

None.

## Usage Instructions

1. Insert the **MailChimp Select** block into your content.
2. The block will pre-populate with a form containing an email input, submit button, and success message.
3. Open the **Inspector Panel** and expand the **Mailchimp Interests** panel.
4. Use the `MailchimpSegmentList` component to select which interest segments to offer. Each selected interest adds a checkbox to the form.
5. Removing an interest from the list removes the corresponding checkbox block.
6. Customize colors, spacing, and typography as needed via block supports.

## Block Markup Example

The block saves inner block content only. The server-side render wraps it:

```html
<div
	class="wp-block-prc-block-mailchimp-select"
	id="mailchimp-select-1"
	data-wp-interactive="prc-block/mailchimp-select"
	data-wp-context='{"NONCE":"..."}'
>
	<!-- Inner blocks (form, inputs, submit, message) rendered here -->
</div>
```

## PHP Rendering

The `render_block_callback` method:

1. Enqueues `wp-api-fetch` and `wp-url` scripts.
2. Creates a `\PRC\Platform\Mailchimp` instance and retrieves a nonce.
3. Wraps the inner block content in a `<div>` with:
    - A unique `id` (via `wp_unique_id`)
    - `data-wp-interactive="prc-block/mailchimp-select"`
    - `data-wp-context` containing the nonce

## Frontend Interactivity

Uses the WordPress Interactivity API (`@wordpress/interactivity`).

**Store namespace:** `prc-block/mailchimp-select`

**Actions:**

-   `subscribe(fieldsForSubmission)` -- Extracts the email address, captcha token, and selected interest checkboxes from form fields. Sends a POST request to `/prc-api/v3/mailchimp/subscribe` with:
    -   `email`
    -   `captcha_token`
    -   `interests` (comma-separated)
    -   `api_key` ("mailchimp-select")
    -   `origin_url`

Returns `{status: 'success'|'error', message: string, data: object}`.

Captcha verification is required -- the subscribe action rejects if no captcha token is provided.

## Related Blocks

-   `prc-block/form` -- The form wrapper that handles submission flow
-   `prc-block/form-input-text` -- Text input for email address
-   `prc-block/form-input-checkbox` -- Checkbox inputs for interest selection
-   `prc-block/form-submit` -- Submit button
-   `prc-block/form-message` -- Success/error message display
-   `prc-block/mailchimp-form` -- Alternative single-list MailChimp subscription block
