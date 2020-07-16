<?php
/**
 * Three Lede Pattern
 *
 * @package gutenberg
 */

// Pattern: 3 Lede Vertical
ob_start();
?>
<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:prc-block/columns {"equal":true,"divided":true} -->
<div class="ui stackable divided vertically padded equal width grid"><!-- wp:prc-block/column -->
<div class="column wp-block-prc-block-column"><!-- wp:prc-block/story-item {"title":"U.S. Public Views on Climate and Energy","date":"05/11/2020","image":"https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PS_19.10.31_ClimateChange_promo_featured.png","imageSlot":"bottom","headerSize":"large","className":"item is-style-bottom story-item stacked"} -->
<div class="wp-block-prc-block-story-item item is-style-bottom story-item stacked react-story-item" data-label="Report" data-date="05/11/2020" data-link="" data-image="https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PS_19.10.31_ClimateChange_promo_featured.png" data-imageslot="bottom" data-imagesize="A1" data-headersize="large" data-classname="wp-block-prc-block-story-item item is-style-bottom story-item stacked" data-emphasis="false" data-breakingnews="false" data-excerptbelow="false" data-chartart="false"><div id="post-undefined" class="ui item story is-style-bottom stacked"><div class="content"><div class="ui fluid placeholder"><div class="header"><div class="line"></div><div class="line"></div></div><div class="paragraph"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div></div></div><div class="A1 image"><div class="ui fluid placeholder"><div class="image"></div></div></div><div class="hidden"><div class="title">U.S. Public Views on Climate and Energy</div><div class="description"></div></div></div></div>
<!-- /wp:prc-block/story-item --></div>
<!-- /wp:prc-block/column -->

<!-- wp:prc-block/column -->
<div class="column wp-block-prc-block-column"><!-- wp:prc-block/columns {"equal":true,"divided":true} -->
<div class="ui stackable divided vertically padded equal width grid"><!-- wp:prc-block/column -->
<div class="column wp-block-prc-block-column"><!-- wp:prc-block/story-item {"title":"QAnon’s conspiracy theories have seeped into U.S. politics, but most don’t know what it is","date":"05/11/2020","image":"https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/FT_20.03.18_QAnon_feature.jpg","imageSlot":"top","imageSize":"A2","className":"item is-style-top story-item stacked"} -->
<div class="wp-block-prc-block-story-item item is-style-top story-item stacked react-story-item" data-label="Report" data-date="05/11/2020" data-link="" data-image="https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/FT_20.03.18_QAnon_feature.jpg" data-imageslot="top" data-imagesize="A2" data-headersize="normal" data-classname="wp-block-prc-block-story-item item is-style-top story-item stacked" data-emphasis="false" data-breakingnews="false" data-excerptbelow="false" data-chartart="false"><div id="post-undefined" class="ui item story is-style-top stacked"><div class="A2 image"><div class="ui fluid placeholder"><div class="image"></div></div></div><div class="content"><div class="ui fluid placeholder"><div class="header"><div class="line"></div><div class="line"></div></div><div class="paragraph"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div></div></div><div class="hidden"><div class="title">QAnon’s conspiracy theories have seeped into U.S. politics, but most don’t know what it is</div><div class="description"><p>Despite the spread of the conspiracy theories, about three-quarters of U.S. adults say they have heard or read nothing at all about them.</p></div></div></div></div>
<!-- /wp:prc-block/story-item --></div>
<!-- /wp:prc-block/column -->

<!-- wp:prc-block/column -->
<div class="column wp-block-prc-block-column"><!-- wp:prc-block/story-item {"title":"Most Americans don’t see Trump as religious; fewer than half say they think he’s Christian","date":"05/16/2020","image":"https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/FT_20.03.16_trumpReligion_featured.jpg","imageSlot":"top","imageSize":"A2","className":"item is-style-top story-item stacked"} -->
<div class="wp-block-prc-block-story-item item is-style-top story-item stacked react-story-item" data-label="Report" data-date="05/16/2020" data-link="" data-image="https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/FT_20.03.16_trumpReligion_featured.jpg" data-imageslot="top" data-imagesize="A2" data-headersize="normal" data-classname="wp-block-prc-block-story-item item is-style-top story-item stacked" data-emphasis="false" data-breakingnews="false" data-excerptbelow="false" data-chartart="false"><div id="post-undefined" class="ui item story is-style-top stacked"><div class="A2 image"><div class="ui fluid placeholder"><div class="image"></div></div></div><div class="content"><div class="ui fluid placeholder"><div class="header"><div class="line"></div><div class="line"></div></div><div class="paragraph"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div></div></div><div class="hidden"><div class="title">Most Americans don’t see Trump as religious; fewer than half say they think he’s Christian</div><div class="description"><p>A majority of Americans say Trump is “not too” or “not at all” religious. Half either say they’re not sure what his religion is or that he has none.</p></div></div></div></div>
<!-- /wp:prc-block/story-item --></div>
<!-- /wp:prc-block/column --></div>
<!-- /wp:prc-block/columns --></div>
<!-- /wp:prc-block/column --></div>
<!-- /wp:prc-block/columns -->
<?php
$content = ob_get_clean();

return array(
	'title'         => '3 Lede (Vertical)',
	'content'       => $content,
	'categories'    => array( 'lede' ),
	'viewportWidth' => 1156,
);
