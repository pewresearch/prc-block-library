<?php
/**
 * Three Lede Pattern
 *
 * @package gutenberg
 */

ob_start();
?>
<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:prc-block/story-item {"title":"U.S. Public Views on Climate and Energy","date":"05/11/2020","image":"https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PS_19.10.31_ClimateChange_promo_featured.png","imageSlot":"right","imageSize":"XL","headerSize":"large","enableExtra":true,"className":"is-style-right"} -->
<div class="wp-block-prc-block-story-item is-style-right react-story-item" data-label="Report" data-date="05/11/2020" data-link="" data-image="https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PS_19.10.31_ClimateChange_promo_featured.png" data-imageslot="right" data-imagesize="XL" data-headersize="large"  data-classname="wp-block-prc-block-story-item is-style-right" data-emphasis="false" data-breakingnews="false" data-excerptbelow="false" data-chartart="false"><div id="post-undefined" class="ui item story is-style-right null"><div class="content"><div class="ui fluid placeholder"><div class="header"><div class="line"></div><div class="line"></div></div><div class="paragraph"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div></div></div><div class="XL image"><div class="ui fluid placeholder"><div class="image"></div></div></div><div class="hidden"><div class="title">U.S. Public Views on Climate and Energy</div><div class="description"><p>A majority of U.S. adults say they are taking at least some specific action in their daily lives to protect the environment, though Democrats and Republicans remain at ideological odds over the causes of climate change and the effects of policies to address it.</p></div><ul class="extra"><li><strong>Explore the data</strong></li></ul></div></div></div>
<!-- /wp:prc-block/story-item -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:prc-block/columns {"equal":true,"divided":true} -->
<div class="ui stackable divided vertically padded equal width grid"><!-- wp:prc-block/column -->
<div class="column wp-block-prc-block-column"><!-- wp:prc-block/story-item {"title":"QAnon’s conspiracy theories have seeped into U.S. politics, but most don’t know what it is","date":"05/11/2020","image":"https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/FT_20.03.18_QAnon_feature.jpg","imageSlot":"right","imageSize":"A2","enableExcerptBelow":true,"className":"is-style-right"} -->
<div class="wp-block-prc-block-story-item is-style-right react-story-item" data-label="Report" data-date="05/11/2020" data-link="" data-image="https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/FT_20.03.18_QAnon_feature.jpg" data-imageslot="right" data-imagesize="A2" data-headersize="normal"  data-classname="wp-block-prc-block-story-item is-style-right" data-emphasis="false" data-breakingnews="false" data-excerptbelow="true" data-chartart="false"><div id="post-undefined" class="ui item story is-style-right null"><div class="content"><div class="ui fluid placeholder"><div class="header"><div class="line"></div><div class="line"></div></div><div class="paragraph"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div></div></div><div class="A2 image"><div class="ui fluid placeholder"><div class="image"></div></div></div><div class="hidden"><div class="title">QAnon’s conspiracy theories have seeped into U.S. politics, but most don’t know what it is</div><div class="description"><p>Despite the spread of the conspiracy theories, about three-quarters of U.S. adults say they have heard or read nothing at all about them.</p></div></div></div></div>
<!-- /wp:prc-block/story-item --></div>
<!-- /wp:prc-block/column -->

<!-- wp:prc-block/column -->
<div class="column wp-block-prc-block-column"><!-- wp:prc-block/story-item {"title":"Most Americans don’t see Trump as religious; fewer than half say they think he’s Christian","date":"05/16/2020","image":"https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/FT_20.03.16_trumpReligion_featured.jpg","imageSlot":"right","imageSize":"A2","enableExcerptBelow":true,"className":"is-style-right"} -->
<div class="wp-block-prc-block-story-item is-style-right react-story-item" data-label="Report" data-date="05/16/2020" data-link="" data-image="https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/FT_20.03.16_trumpReligion_featured.jpg" data-imageslot="right" data-imagesize="A2" data-headersize="normal"  data-classname="wp-block-prc-block-story-item is-style-right" data-emphasis="false" data-breakingnews="false" data-excerptbelow="true" data-chartart="false"><div id="post-undefined" class="ui item story is-style-right null"><div class="content"><div class="ui fluid placeholder"><div class="header"><div class="line"></div><div class="line"></div></div><div class="paragraph"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div></div></div><div class="A2 image"><div class="ui fluid placeholder"><div class="image"></div></div></div><div class="hidden"><div class="title">Most Americans don’t see Trump as religious; fewer than half say they think he’s Christian</div><div class="description"><p>A majority of Americans say Trump is “not too” or “not at all” religious. Half either say they’re not sure what his religion is or that he has none.</p></div></div></div></div>
<!-- /wp:prc-block/story-item --></div>
<!-- /wp:prc-block/column --></div>
<!-- /wp:prc-block/columns -->
<?php
$content = ob_get_clean();

return array(
	'title'         => '3 Lede (XL)',
	'content'       => $content,
	'categories'    => array( 'lede' ),
	'viewportWidth' => 1200,
);
