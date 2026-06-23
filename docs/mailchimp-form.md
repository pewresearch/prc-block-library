# Mailchimp Form

## Block Name & Description

**Title:** MailChimp Form
**Description:** A block that allows you to add a MailChimp form to your page.

## Block Namespace

`prc-block/mailchimp-form`

## Category

`marketing`

## Supports

| Feature | Enabled | Details |
|---------|---------|---------|
| HTML editing | No | |
| Spacing | Yes | `margin` |
| Interactivity | Yes | |

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `interest` | `string` | `""` | Mailchimp interest/segment ID for newsletter targeting |

## Available Styles

None.

## Inner Blocks

Yes. This is a container block.

**Allowed blocks:** `prc-block/form`, `prc-block/form-input-text`, `prc-block/form-submit`, `prc-block/form-captcha`, `prc-block/form-message`, `core/button`, `core/group`

**Default template:**

```
prc-block/form (interactiveNamespace: "prc-block/mailchimp-form")
  prc-block/form-input-text (type: email, label: "Email Address", required)
  prc-block/form-submit
  prc-block/form-message
    core/paragraph ("Thank you for subscribing!")
```

## Parent / Ancestor Requirements

None. Can be placed anywhere.

## Provides Context

| Context Key | Source |
|-------------|--------|
| `interactiveNamespace` | `"interactiveNamespace"` |

This passes the interactive namespace (`prc-block/mailchimp-form`) to child form blocks so they use the mailchimp store instead of the default form store.

## Usage Instructions

1. Insert the MailChimp Form block.
2. The default template provides a complete newsletter signup form with email input, submit button, captcha, and success message.
3. In the Inspector Panel under "Mailchimp Form Options":
   - **Choose Newsletter Segment** -- Select which Mailchimp interest/audience segment to subscribe users to. This uses the `MailchimpSegmentSelect` component from `@prc/components`.
4. Customize the inner blocks as needed:
   - Edit the email input label and placeholder.
   - Customize the submit button text.
   - Edit the success message content.
5. The form uses container queries for responsive layout -- when wider than 362px, it displays as a horizontal row; below that, it stacks vertically.

## Block Markup Example

```html
<div class="wp-block-prc-block-mailchimp-form"
     id="mailchimp-form-1"
     data-wp-interactive="prc-block/mailchimp-form"
     data-wp-context='{"interest":"newsletter-segment-id","formId":false}'>
  <form class="wp-block-prc-block-form">
    <!-- Email input -->
    <div class="wp-block-prc-block-form-input-text">
      <input type="email" name="emailAddress" placeholder="Email Address" required />
    </div>
    <!-- Submit actions -->
    <div class="wp-block-prc-block-form-submit">
      <button type="submit">Submit</button>
    </div>
    <!-- Success message -->
    <div class="wp-block-prc-block-form-message">
      <p>Thank you for subscribing!</p>
    </div>
  </form>
</div>
```

## PHP Rendering

Server-side rendered via `render_block_callback` in `Mailchimp_Form`. The PHP:

1. Enqueues `wp-api-fetch` and `wp-url` scripts for the frontend API calls.
2. Wraps the inner block content in a `<div>` with:
   - A unique `id` (e.g., `mailchimp-form-1`)
   - `data-wp-interactive="prc-block/mailchimp-form"` to bind to the mailchimp interactivity store
   - `data-wp-context` containing the `interest` segment ID and optional `formId`

## Frontend Interactivity

**`view/index.js`** -- Registers the `prc-block/mailchimp-form` interactivity store.

The store provides a single action:

### `actions.subscribe(fieldsForSubmission)`

Called by the parent form's submission flow. It:

1. Extracts the `interest` and optional `formId` from the block context.
2. Finds the `emailAddress` (or `email`) field from the submitted form fields.
3. Finds the `captchaToken` field from the submitted form fields.
4. Calls the `subscribe()` function which makes a POST request to `/prc-api/v3/mailchimp/subscribe` with:
   - `email` -- The submitted email address
   - `captcha_token` -- CAPTCHA verification token
   - `interests` -- The Mailchimp segment ID
   - `api_key` -- `"mailchimp-form"`
   - `origin_url` -- The current page URL
5. Returns a promise resolving with `{ status: 'success', message: '...' }` or rejecting with `{ status: 'error', message: '...' }`.

Public subscribe requests are gated by Turnstile captcha and per-IP rate limiting on the server.

## Related Blocks

- `prc-block/form` -- Inner form container (uses the mailchimp namespace)
- `prc-block/form-input-text` -- Email address input field
- `prc-block/form-submit` -- Submit button and captcha
- `prc-block/form-message` -- Success/error message display
- `prc-block/form-captcha` -- CAPTCHA verification
