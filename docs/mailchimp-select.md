# MailChimp Select (Deprecated)

> **Deprecated:** Use the **Newsletter Selection (Mailchimp)** variation of `prc-block/form` instead. Existing content using `prc-block/mailchimp-select` continues to render via the deprecated block registration.

## Block Namespace

`prc-block/mailchimp-select`

## Status

- Removed from the block inserter (`supports.inserter: false`)
- Registered from `plugins/prc-block-library/deprecated/src/mailchimp-select/` for backward compatibility
- Superseded by `prc-block/form` with action `subscribeSelect` and the **Newsletter Selection (Mailchimp)** block variation

## Migration

Replace deprecated mailchimp-select markup with a `prc-block/form` block configured as:

- `method`: `api`
- `namespace`: `prc-block/form`
- `action`: `subscribeSelect`
- `actionConfig.interests`: array of offered Mailchimp segment interests (checkbox inner blocks are managed in Action Settings)
- `formName`: sent as the Mailchimp FIRSTFORM merge field when applicable

See [form.md](../../prc-block-forms/docs/form.md) in `@prc/block-forms` for the current form block documentation.
