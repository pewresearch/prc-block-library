# Form Block

The form block is a primitive `<form/>` element that can be used to create interactive forms. The block comes complete with block validation, blocks as form fields, and a registry for forms site-wide.

## Registering Forms with the Data Store

### Registering a Form

To register a form, dispatch the `registerForm` action to the `prc-block-library/forms` store:

```js
import { dispatch } from '@wordpress/data';

dispatch('prc-block-library/forms').registerForm({
  label: 'My Custom Form',
  description: 'A description of my form',
  namespace: 'my-plugin/namespace',
  action: 'my-action',
  method: 'api', // or 'server', 'rest', etc.
  template: [
    // ...block template innerblocks array
    [
      'prc-block/form-input-text',
      {
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email address',
        required: true,
        metadata: {
          name: 'email-address',
        },
      },
    ],
    [
      'prc-block/form-input-select',
      {
        label: 'Where did you hear about us?',
        placeholder: 'Select an option',
        options: [
          {
            label: 'Google',
            value: 'google',
          },
          {
            label: 'Facebook',
            value: 'facebook',
          },
          {
            label: 'Twitter',
            value: 'twitter',
          },
        ],
        metadata: {
          name: 'where-did-you-hear-about-us',
        },
      },
    ],
    [
      'prc-block/form-input-textarea',
      {
        label: 'Comments',
        required: false,
        placeholder: 'Enter your comments',
        metadata: {
          name: 'optionalcomments',
        },
      },
    ],
    [
      'prc-block/form-submit',
      {},
    ],
  ],
});
```

You can call this registration function in your plugin's initialization code.

### Retrieving Registered Forms

To retrieve all registered forms, use the selector in your component:

```js
import { useSelect } from '@wordpress/data';

const forms = useSelect(
  (select) => select('prc-block-library/forms').getForms(),
  []
);
```

This will return an array of all forms registered with the store.

### Notes
- Ensure the store is imported/registered before any forms are registered (typically by importing `src/form/store.js` in your entry point).
- The old `addFilter('prc-block-forms', ...)` and `applyFilters('prc-block-forms', [])` methods are no longer supported.
- Each form should have a unique combination of `namespace` and `action`.
- The form block will only surface API actions relative to the block's parent block.
- The form block does not require a parent block for rest or server actions, those will be globally listed regardless of inheritance. 
