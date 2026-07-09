<?php
/**
 * Title: Social Group
 * Slug: prc-block-library/social-group
 * Categories: prc-block-library
 * Description: A Group for shareable visual content with social links and URL field.
 * Block Types: core/group
 * Viewport Width: 640
 *
 * @package PRC\Platform\Blocks
 */

?>
<!-- wp:group {"className":"is-style-social-group","templateLock":"all"} -->
<div class="wp-block-group is-style-social-group"><!-- wp:group {"templateLock":false} -->
<div class="wp-block-group"><!-- wp:paragraph {"placeholder":"Add visual content here..."} -->
<p></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:social-links {"iconColor":"ui-black","iconColorValue":"#2a2a2a","size":"has-small-icon-size","className":"is-style-logos-only"} -->
<ul class="wp-block-social-links has-small-icon-size has-icon-color is-style-logos-only"><!-- wp:prc-block/social-share-url-field /-->

<!-- wp:social-link {"service":"facebook"} /-->

<!-- wp:social-link {"service":"twitter"} /-->

<!-- wp:social-link {"service":"linkedin"} /--></ul>
<!-- /wp:social-links --></div>
<!-- /wp:group -->
