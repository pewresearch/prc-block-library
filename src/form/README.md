# Form Block

The form block is a primitive `<form/>` element that can be used to create interactive forms. The block comes complete with block validation, blocks as form fields, and a registry for forms site-wide.

## Form Submission Methods

The form block supports two different submission methods: **API** and **REST**. Each method has different implementation requirements and use cases.

### API Method

The API method uses WordPress Interactivity API stores to handle form submissions client-side. This method is ideal for complex interactive forms that need immediate feedback or client-side processing.

**How it works:**
- Form submission is handled by actions in an interactivity store
- The store namespace must match the form's namespace
- Actions are called directly from the client-side JavaScript
- Provides immediate feedback without page reloads

**Implementation Requirements:**

1. **Register an Interactivity Store** with actions:
```js
import { store } from '@wordpress/interactivity';

const { actions } = store('my-plugin/namespace', {
  actions: {
    async myAction(formFields) {
      // Handle form submission logic here
      // formFields is an array of field objects with id, name, type, value, required, checked properties
      
      try {
        // Process the form data
        const result = await processFormData(formFields);
        
        // Return success response
        return {
          status: 'success',
          message: 'Form submitted successfully!',
          data: result,
          actionUrl: null // Optional redirect URL
        };
      } catch (error) {
        // Return error response
        return {
          status: 'error',
          message: error.message,
          actionUrl: null
        };
      }
    }
  }
});
```

2. **Register the form** with the API method:
```js
import { dispatch } from '@wordpress/data';

dispatch('prc-block-library/forms').registerForm({
  label: 'My Custom Form',
  description: 'A description of my form',
  namespace: 'my-plugin/namespace',
  action: 'myAction',
  method: 'api',
  template: [
    // ...block template array
  ],
});
```

### REST Method

The REST method uses WordPress REST API endpoints to handle form submissions server-side. This method is ideal for traditional form processing, email sending, database operations, and server-side validation.

**How it works:**
- Form submission sends data to a REST API endpoint
- Server-side PHP handles the processing
- Can integrate with WordPress functions, databases, email systems
- Follows WordPress REST API patterns

**Implementation Requirements:**

1. **Register REST Endpoints** in PHP:
```php
class My_Form_Handler {
    public function __construct($loader) {
        $loader->add_filter('prc_api_endpoints', $this, 'register_rest_endpoints');
    }

    public function register_rest_endpoints($endpoints) {
        $my_endpoint = array(
            'route'               => 'form/my-action', // Will be accessible at /wp-json/prc-api/v3/form/my-action
            'methods'             => 'POST',
            'callback'            => array($this, 'handle_form_submission'),
            'args'                => array(
                'nonce' => array(
                    'validate_callback' => function($param, $request, $key) {
                        return is_string($param);
                    },
                ),
            ),
            'permission_callback' => function() {
                return true; // Adjust permissions as needed
            },
        );
        return array_merge($endpoints, array($my_endpoint));
    }

    public function handle_form_submission($request) {
        // Verify nonce
        $nonce = $request->get_param('nonce');
        if (!wp_verify_nonce($nonce, 'prc-block-form')) {
            return new \WP_Error('invalid_nonce', 'Unauthorized access', array('status' => 403));
        }

        // Get form data
        $form_data = json_decode($request->get_body(), true);
        $form_fields = $form_data['formFields'] ?? array();
        $form_name = $form_data['formName'] ?? '';
        $redirect_target = $form_data['redirectTarget'] ?? '';

        // Process form fields
        foreach ($form_fields as $field) {
            // Validate and process each field
            // $field contains: id, name, type, value, required, checked
        }

        // Return success response
        return new \WP_REST_Response(array(
            'message' => 'Form submission processed successfully'
        ), 200);
    }
}
```

2. **Register the form** with the REST method:
```js
import { dispatch } from '@wordpress/data';

dispatch('prc-block-library/forms').registerForm({
  label: 'My REST Form',
  description: 'A form that submits via REST API',
  namespace: 'my-plugin/namespace',
  action: 'myAction', // Will be converted to 'my-action' for the REST endpoint
  method: 'rest',
  template: [
    // ...block template array
  ],
});
```

**Important Notes for REST Method:**
- Action names are automatically converted from camelCase to hyphenated form (e.g., `sendToEmail` becomes `send-to-email`)
- REST endpoints are accessible at `/wp-json/prc-api/v3/form/{action-name}`
- All form submissions include a nonce for security
- Form data structure includes `formName`, `formId`, `redirectTarget`, and `formFields`

## Form Field Data Structure

Both methods receive form fields in the same standardized format:

```js
{
  id: "unique-field-id",
  name: "field-name", // From metadata.name attribute
  type: "email|text|textarea|select|checkbox|etc",
  value: "field-value",
  required: true|false,
  checked: true|false|null // Only for checkbox/radio fields
}
```

## Response Format

Both methods should return responses in this format:

```js
{
  status: 'success'|'error'|'processing',
  message: 'Human readable message',
  data: {}, // Optional additional data
  actionUrl: 'https://redirect-url.com' // Optional redirect URL
}
```

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
  method: 'api', // or 'rest'
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
