## PRC Block Interactivity API

We extend some order and control to the `@wordpress/interactivity` api. All blocks that support the api are also extended `interactiveNamespace` and `isInteractive` attributes. `interactiveNamespace` is additionally extended to WP_Block context for all interactive blocks. This allows interesting and structured configurations of blocks and innerblocks to create interactive applets.

For example:

The interactiveNamespace of the MailChimp Form block is `mailchimpForm`. When you add a `core/button` and `prc-block/form-input-text` field inside the form, you can set their namespace to mailchimpForm. This connects those blocks to the controller logic of the form block, which is located in `view.js`. When you click a button in the Mailchimp Form and use the `wp-data-on--click = actions.{namespace}.onButtonClick` click handler, something different happens compared to clicking the same button on the Mailchimp Select, Login Form, or any other interactive block. By not assuming and manually setting the namespace, we have more control over interactions.


For more reference the living API document for `@wordpress/interactivity` api in Github:
https://github.com/WordPress/gutenberg/blob/trunk/packages/interactivity/docs/2-api-reference.md
