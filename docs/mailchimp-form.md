# Mailchimp Form (Deprecated)

> **Deprecated:** Use the **Newsletter Signup (Mailchimp)** variation of `prc-block/form` instead. Existing content using `prc-block/mailchimp-form` continues to render via the deprecated block registration.

## Block Name & Description

**Title:** MailChimp Form
**Description:** A block that allows you to add a MailChimp form to your page.

## Block Namespace

`prc-block/mailchimp-form`

## Status

- Removed from the block inserter (`supports.inserter: false`)
- Registered from `plugins/prc-block-library/deprecated/src/mailchimp-form/` for backward compatibility
- Superseded by `prc-block/form` with action `subscribe` and the **Newsletter Signup (Mailchimp)** block variation

## Migration

Replace deprecated mailchimp-form markup with a `prc-block/form` block configured as:

- `method`: `api`
- `namespace`: `prc-block/form`
- `action`: `subscribe`
- `actionConfig.interest`: Mailchimp segment ID (formerly the block's `interest` attribute)
- `formName`: sent as the Mailchimp FIRSTFORM merge field for signup attribution (formerly `mailchimpFormId` / `actionConfig.mailchimpFormId`)

See [form.md](../../prc-block-forms/docs/form.md) in `@prc/block-forms` for the current form block documentation.
