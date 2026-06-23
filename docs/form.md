# Form

A container block that wraps form input blocks into a functional, submittable form. Manages form state, field registration, submission flow, captcha integration, error handling, form persistence via localStorage, and conditional field display. Serves as the central orchestrator for all `form-input-*` child blocks.

## Block inserter example

`block.json` defines an `example` with name and email `form-input-text` fields, `form-submit`, and `form-message` containing a thank-you `core/paragraph`. This drives the block inserter preview.

## Namespace

`prc-block/form`

## Category

`common`

## Supports

| Feature                 | Value                                |
| ----------------------- | ------------------------------------ |
| Interactivity           | `true`                               |
| Color (text)            | `true`                               |
| Color (background)      | `true`                               |
| Color (link)            | `true`                               |
| Layout (type)           | `constrained` (contentSize: `420px`) |
| Spacing (margin)        | `true`                               |
| Spacing (padding)       | `true`                               |
| Spacing (blockGap)      | `true`                               |
| Typography (fontSize)   | `true`                               |
| Typography (lineHeight) | `true`                               |
| HTML                    | `false`                              |

## Attributes

| Attribute     | Type     | Default | Description                                                                          |
| ------------- | -------- | ------- | ------------------------------------------------------------------------------------ |
| `formName`    | `string` | `""`    | Human-readable name for the form, used for localStorage persistence keys.            |
| `method`      | `string` | `"api"` | Submission method. `"api"` uses the internal PRC API; `"rest"` uses a REST endpoint. |
| `namespace`   | `string` | `""`    | The REST namespace for the form action endpoint (used when method is `"rest"`).      |
| `action`      | `string` | `""`    | The registered form action identifier. Maps to a server-side handler.                |
| `redirectUrl` | `string` | `""`    | URL to redirect to after successful form submission.                                 |

## Available Styles

None defined.

## Inner Blocks

The form block accepts the following inner blocks:

| Block                                | Description                                                                                  |
| ------------------------------------ | -------------------------------------------------------------------------------------------- |
| `prc-block/form-input-text`          | Text, email, password, textarea, number, date, URL, tel, time, search, datetime-local inputs |
| `prc-block/form-input-select`        | Dropdown select with search, single or multi-select                                          |
| `prc-block/form-input-select-range`  | Paired min/max select inputs for range selection                                             |
| `prc-block/form-input-checkbox`      | Checkbox and radio inputs                                                                    |
| `prc-block/form-input-radio-group`   | Grouped radio buttons with mutual exclusion                                                  |
| `prc-block/form-input-range`         | Slider/range input with formatted output                                                     |
| `prc-block/form-input-password`      | Password input with optional strength analyzer and confirmation                              |
| `prc-block/form-captcha`             | Cloudflare Turnstile captcha widget                                                          |
| `prc-block/form-input-submit-button` | Form submit button                                                                           |
| `prc-block/form-message`             | Success/failure message display area                                                         |
| `core/group`                         | Layout container                                                                             |
| `core/columns`                       | Multi-column layout                                                                          |
| `core/column`                        | Individual column                                                                            |
| `core/paragraph`                     | Static text                                                                                  |
| `core/heading`                       | Section headings                                                                             |
| `core/separator`                     | Visual divider                                                                               |
| `core/spacer`                        | Vertical spacing                                                                             |
| `core/image`                         | Inline images                                                                                |

### Default Template

The block ships with a default template containing name, email, and message fields plus a submit button and message area.

## Parent / Ancestor Requirements

None. The form block is a top-level container. Note: the block registration logic prevents nesting forms inside other forms.

**Provides Context:**

| Context Key           | Description                                    |
| --------------------- | ---------------------------------------------- |
| `form/displayMessage` | Controls visibility of the form message block. |

## Usage Instructions

### Creating a Form

1. Insert the Form block. It pre-populates with a default template (name, email, message, submit, form message).
2. Set the **Form Name** in the inspector sidebar -- this identifies the form for persistence and submission.
3. Choose the **Method** (`API` or `REST`) depending on your backend handler.
4. Select an **Action** from the dropdown of registered form actions.
5. Optionally set a **Redirect URL** for post-submission navigation.

### Form Templates

When you select an **Action** that was registered with a `template` in the `prc-block-library/forms` store, the editor opens a **Use Form Template?** modal with three choices:

| Button | Behavior |
| ------ | -------- |
| **Use template** | Replaces the form's **inner blocks only** with blocks from the registered action template. The Form block itself stays in place; inspector settings (`formName`, `method`, `namespace`, `action`, `redirectUrl`) are preserved. |
| **Use existing blocks** | Closes the modal and keeps the current inner blocks unchanged. |
| **Start blank** | Replaces inner blocks with the minimal base template (`BASE_TEMPLATE`) — a fresh starting layout without the registered action's full field set. |

Templates are applied with `replaceInnerBlocks` on the Form block's `clientId`, not by replacing the Form block node. That keeps the form container, attributes, and interactivity context intact while swapping field structure.

Registered forms may omit a custom template; in that case the editor falls back to `DEFAULT_FORM_TEMPLATE` when resolving the selected action.

**Registering a template** (from a consuming plugin):

```js
dispatch('prc-block-library/forms').registerForm({
  label: 'My Form',
  namespace: 'my-plugin/namespace',
  action: 'myAction',
  method: 'api', // or 'rest'
  template: [
    ['prc-block/form-input-text', { /* … */ }],
    ['prc-block/form-input-submit-button', {}],
    ['prc-block/form-message', {}],
  ],
});
```

Selecting that action in the Form block inspector triggers the template modal when `template` is non-empty.

### Conditional Field Display

Form inputs support conditional display via `formDisplayMode` and `formDisplayCondition` attributes. Fields can be shown/hidden based on the values of other fields in the form. The form block processes these conditions during rendering via `handle_conditional_form_field_display`.

### Form Persistence

Form field values are automatically persisted to localStorage with a 24-hour expiry. This is keyed by `formName` and restored on page load. The `FormPersistence` utility handles serialization and cleanup.

### Form Field Panel

The inspector sidebar includes a **Form Fields** panel that lists all detected form input blocks within the form, providing an overview of the form structure.

## Block Markup Example

```html
<!-- wp:prc-block/form {"formName":"contact-form","method":"api","action":"contact"} -->
<form class="wp-block-prc-block-form">
	<!-- wp:prc-block/form-input-text {"type":"text","metadata":{"name":"fullName"}} -->
	<!-- /wp:prc-block/form-input-text -->

	<!-- wp:prc-block/form-input-text {"type":"email","metadata":{"name":"emailAddress"}} -->
	<!-- /wp:prc-block/form-input-text -->

	<!-- wp:prc-block/form-input-text {"type":"textarea","metadata":{"name":"message"}} -->
	<!-- /wp:prc-block/form-input-text -->

	<!-- wp:prc-block/form-input-submit-button /-->

	<!-- wp:prc-block/form-message /-->
</form>
<!-- /wp:prc-block/form -->
```

## PHP Rendering

The block uses server-side rendering via `render_form_callback` in `class-form.php`.

### Render Pipeline

1. **Block Registration**: Registers with `render_callback` pointing to `render_form_callback`.
2. **Render Callback**: Wraps the form in `data-wp-interactive="prc-block/form"` with a comprehensive context object:
    - `formId` (unique per instance)
    - `formName`, `method`, `namespace`, `action`, `redirectUrl`
    - `errors` (empty array), `hasErrors` (false)
    - `captchaHidden` (true), `captchaToken` (null), `captchaPassed` (false)
    - `nonceName` / `nonceToken` (empty for public forms; user-accounts may override)
    - `isSubmitting`, `isSubmitted`, `isProcessing` (all false)
    - `formFields` (empty object, populated by child blocks at render)
    - `formPages` (for multi-page forms)
3. **Conditional Fields**: `handle_conditional_form_field_display` processes inner blocks with display conditions, adding appropriate `data-wp-bind--hidden` directives.
4. **Error Template**: Injects an error overlay `<div>` with `data-wp-bind--hidden` that shows validation errors.
5. **Processing Spinner**: Adds a spinner overlay shown during form submission.
6. **Jetpack Compat**: Disables Jetpack contact form module to prevent conflicts.

### Server-Side State Registration

Each form instance calls `wp_interactivity_state('prc-block/form', [...])` to register its initial state, making it available to the Interactivity API on the client.

## Frontend Interactivity

**Store Namespace:** `prc-block/form`

The form block's view module (`view/index.js`) is the central interactivity hub for the entire form system.

### State

| Key             | Type      | Description                                                             |
| --------------- | --------- | ----------------------------------------------------------------------- | ----------------------------------------- |
| `formFields`    | `object`  | Map of field names to their current values, registered by child blocks. |
| `isSubmitting`  | `boolean` | True while form submission is in progress.                              |
| `isSubmitted`   | `boolean` | True after successful submission.                                       |
| `isProcessing`  | `boolean` | True during async processing.                                           |
| `hasErrors`     | `boolean` | True when validation errors exist.                                      |
| `errors`        | `array`   | List of error message strings.                                          |
| `captchaHidden` | `boolean` | Controls captcha visibility.                                            |
| `captchaToken`  | `string   | null`                                                                   | Turnstile token after captcha completion. |
| `captchaPassed` | `boolean` | True after captcha verification.                                        |

### Actions

| Action                 | Description                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `onSubmit`             | Handles form submission. Validates fields, triggers captcha if present, then calls `sendSubmission`. |
| `onReset`              | Resets all form fields and state to initial values.                                                  |
| `onInputChange`        | Generic handler for text-like input changes. Updates the field value in `formFields`.                |
| `onInputRangeChange`   | Handler for range slider input changes with live value updates.                                      |
| `onInputCheckboxClick` | Handler for checkbox/radio click events. Toggles or sets the checked value.                          |

### Callbacks

| Callback           | Description                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `onFormMount`      | Runs on form initialization. Restores persisted field values from localStorage.                                                     |
| `sendSubmission`   | Generator function that performs the actual API/REST submission. Handles success (redirect or message display) and error responses. |
| `onCaptchaPassing` | Watches `captchaPassed` and triggers `sendSubmission` when captcha completes.                                                       |

### Form Persistence

The `FormPersistence` utility class manages localStorage-based field persistence:

-   **Key format**: `prc-form-{formName}`
-   **Expiry**: 24 hours from first save
-   **Behavior**: Field values are saved on every change and restored on form mount. Expired data is automatically cleaned up.

## Related Blocks

| Block                                | Relationship                                  |
| ------------------------------------ | --------------------------------------------- |
| `prc-block/form-input-text`          | Child input block for text-type fields        |
| `prc-block/form-input-select`        | Child input block for dropdown selects        |
| `prc-block/form-input-select-range`  | Child input block for paired min/max selects  |
| `prc-block/form-input-checkbox`      | Child input block for checkboxes and radios   |
| `prc-block/form-input-radio-group`   | Child container for grouped radio buttons     |
| `prc-block/form-input-range`         | Child input block for range sliders           |
| `prc-block/form-input-password`      | Child input block for password fields         |
| `prc-block/form-captcha`             | Child block for Cloudflare Turnstile captcha  |
| `prc-block/form-input-submit-button` | Child block for the submit button             |
| `prc-block/form-message`             | Child block for success/error message display |
