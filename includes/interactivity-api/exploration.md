Yeah passing function in this way is a great pattern and should def be included in the documentation. In fact, if I think this through a few steps further, using block context this sort of pattern becomes even more interesting:

Imagine:

```php
<?php

/**
 * The parent block, the main interactive block, offers up actions that it offers to child blocks
 * that they can use internally. This is a way to pass actions down to child blocks, ala react and an onChange prop.
 * Obviously, here, blocks would need to opt-in to this context.
 * @hook render_block_context
 */
function modify_block_context($context,$parsed_block, $parent_block) {
    $actions_i_offer = array(
        'blocks/child-block' => array($parent_block->name, 'onSelectDoThis')
    );

    $context['interactivityApi']['actions'] = array_merge($context['interactivityApi']['actions'], $actions_i_offer);

    return $context;
}
```

Then in the child block render:
```php
<?php
$my_block_name = 'blocks/child-block';
$wrapper_attributes = get_wrapper_attributes(array(
	'data-wp-interactive' => $my_block_name,
	'data-wp-context' => wp_json_encode(array(
		''
	))
	'data-wp-on--click' => $context['interactivityApi']['actions'][$my_block_name],
));
```

```js

store('dropdown-block', {});
