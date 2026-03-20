# Form Captcha

A dynamic block that integrates Cloudflare Turnstile captcha into the form submission flow. The captcha widget is hidden by default and revealed automatically when the user initiates form submission, acting as a gatekeeper before the actual API call is made.

## Namespace

`prc-block/form-captcha`

## Category

`forms`

## Supports

| Feature | Value |
|---------|-------|
| Spacing (margin) | `true` |
| Interactivity | `true` |
| HTML | `false` |

## Attributes

None. This block has no custom attributes. All state is managed through the Interactivity API context inherited from the parent form.

## Available Styles

None defined.

## Inner Blocks

None. This is a leaf block.

## Parent / Ancestor Requirements

No explicit `parent` or `ancestor` constraint in `block.json`, but the block is designed to function only inside a `prc-block/form` container. It reads captcha state from the parent form's interactivity context.

## Usage Instructions

1. Insert the **Form Captcha** block inside a Form block, typically before the submit button.
2. No configuration is required. The block automatically uses the `PRC_PLATFORM_TURNSTILE_SITE_KEY` constant defined in the platform configuration.
3. The captcha widget remains hidden until the user clicks submit. At that point, the form reveals the captcha, the user completes the challenge, and submission proceeds automatically upon success.

### Requirements

- The `PRC_PLATFORM_TURNSTILE_SITE_KEY` constant must be defined in the WordPress environment.
- The Cloudflare Turnstile script is registered and enqueued by the block's PHP class.

## Block Markup Example

```html
<!-- wp:prc-block/form-captcha /-->
```

## PHP Rendering

The block is fully server-side rendered via `render_callback` in `class-form-captcha.php`.

### Render Pipeline

1. **Script Registration**: Registers the Cloudflare Turnstile script (`https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback`) with explicit render mode.
2. **Block Output**: Renders a `<div>` container with:
   - `data-wp-interactive="prc-block/form-captcha"` for its own interactivity namespace
   - `data-wp-context` with `targetNamespace` pointing to the parent form's namespace (`prc-block/form`)
   - `data-wp-watch="callbacks.onInit"` to initialize the captcha watcher
   - `hidden` attribute (hidden by default)
   - `data-wp-bind--hidden="context.captchaHidden"` bound to the parent form's captcha visibility state
   - The Turnstile site key as a `data-sitekey` attribute on the inner captcha element

### Rendered Output

```html
<div data-wp-interactive="prc-block/form-captcha"
     data-wp-context='{"targetNamespace":"prc-block/form"}'
     data-wp-watch="callbacks.onInit"
     hidden
     data-wp-bind--hidden="context.captchaHidden"
     class="wp-block-prc-block-form-captcha">
  <div class="cf-turnstile" data-sitekey="..."></div>
</div>
```

## Frontend Interactivity

**Store Namespace:** `prc-block/form-captcha`

### Callbacks

| Callback | Description |
|----------|-------------|
| `onInit` | A watcher that monitors the `captchaHidden` state from the parent form context. When `captchaHidden` transitions to `false` (form submission initiated), it calls `turnstile.render()` on the captcha container element. On successful challenge completion, the Turnstile callback sets `captchaToken` and `captchaPassed` on the target (parent form) context, which triggers the form's `onCaptchaPassing` callback to proceed with submission. |

### Interaction Flow

1. User clicks submit on the parent form.
2. The form's `onSubmit` action sets `captchaHidden = false`.
3. The captcha block's `onInit` watcher detects the change and renders the Turnstile widget.
4. User completes the captcha challenge.
5. Turnstile calls the success callback, which sets `captchaToken` and `captchaPassed = true` on the parent form's context.
6. The form's `onCaptchaPassing` callback detects `captchaPassed` and fires `sendSubmission`.

## Related Blocks

| Block | Relationship |
|-------|-------------|
| `prc-block/form` | Required parent. Provides the `captchaHidden`, `captchaToken`, and `captchaPassed` context values. |
