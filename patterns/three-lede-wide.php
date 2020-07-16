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

<!-- wp:prc-block/columns {"divided":true} -->
<div class="ui divided vertically padded grid"><!-- wp:prc-block/column {"width":12,"items":true} -->
<div class="twelve wide column wp-block-prc-block-column"><div class="ui divided items"><!-- wp:prc-block/story-item {"title":"U.S. Public Views on Climate and Energy","date":"05/11/2020","image":"https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PS_19.10.31_ClimateChange_promo_featured.png","imageSlot":"right","headerSize":"large","className":"is-style-right"} -->
<div class="wp-block-prc-block-story-item is-style-right react-story-item" data-label="Report" data-date="05/11/2020" data-link="" data-image="https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PS_19.10.31_ClimateChange_promo_featured.png" data-imageslot="right" data-imagesize="A1" data-headersize="large"  data-classname="wp-block-prc-block-story-item is-style-right" data-emphasis="false" data-breakingnews="false" data-excerptbelow="false" data-chartart="false"><div id="post-undefined" class="ui item story is-style-right null"><div class="content"><div class="ui fluid placeholder"><div class="header"><div class="line"></div><div class="line"></div></div><div class="paragraph"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div></div></div><div class="A1 image"><div class="ui fluid placeholder"><div class="image"></div></div></div><div class="hidden"><div class="title">U.S. Public Views on Climate and Energy</div><div class="description"><p>A majority of U.S. adults say they are taking at least some specific action in their daily lives to protect the environment, though Democrats and Republicans remain at ideological odds over the causes of climate change and the effects of policies to address it.</p></div></div></div></div>
<!-- /wp:prc-block/story-item -->

<!-- wp:prc-block/story-item {"title":"Americans Have Positive Views About Religion's Role In Society, but Want It Out of Politics","date":"05/11/2020","image":"https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PF_19.11.01_religionTrust2featured.jpg","imageSlot":"right","imageSize":"A2","className":"is-style-right"} -->
<div class="wp-block-prc-block-story-item is-style-right react-story-item" data-label="Report" data-date="05/11/2020" data-link="" data-image="https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PF_19.11.01_religionTrust2featured.jpg" data-imageslot="right" data-imagesize="A2" data-headersize="normal"  data-classname="wp-block-prc-block-story-item is-style-right" data-emphasis="false" data-breakingnews="false" data-excerptbelow="false" data-chartart="false"><div id="post-undefined" class="ui item story is-style-right null"><div class="content"><div class="ui fluid placeholder"><div class="header"><div class="line"></div><div class="line"></div></div><div class="paragraph"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div></div></div><div class="A2 image"><div class="ui fluid placeholder"><div class="image"></div></div></div><div class="hidden"><div class="title">Americans Have Positive Views About Religion's Role In Society, but Want It Out of Politics</div><div class="description"></div></div></div></div>
<!-- /wp:prc-block/story-item --></div></div>
<!-- /wp:prc-block/column -->

<!-- wp:prc-block/column {"width":4} -->
<div class="four wide column wp-block-prc-block-column"><!-- wp:prc-block/story-item {"title":"Would you share your views of Donald Trump over dinner?","date":"05/16/2020","image":"https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PP_2019.10.30_dinner-party_newswell.png","imageSlot":"bottom","imageSize":"A2","className":"is-style-bottom"} -->
<div class="wp-block-prc-block-story-item is-style-bottom react-story-item" data-label="Report" data-date="05/16/2020" data-link="" data-image="https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PP_2019.10.30_dinner-party_newswell.png" data-imageslot="bottom" data-imagesize="A2" data-headersize="normal"  data-classname="wp-block-prc-block-story-item is-style-bottom" data-emphasis="false" data-breakingnews="false" data-excerptbelow="false" data-chartart="false"><div id="post-undefined" class="ui item story is-style-bottom stacked"><div class="content"><div class="ui fluid placeholder"><div class="header"><div class="line"></div><div class="line"></div></div><div class="paragraph"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div></div></div><div class="A2 image"><div class="ui fluid placeholder"><div class="image"></div></div></div><div class="hidden"><div class="title">Would you share your views of Donald Trump over dinner?</div><div class="description"><p>Trump has evoked strong feelings as president – both positive and negative. How would you feel discussing him at a dinner party with a group of people who have opposing views from your own? In this interactive, see how your views compare with those of other Americans.</p></div></div></div></div>
<!-- /wp:prc-block/story-item --></div>
<!-- /wp:prc-block/column --></div>
<!-- /wp:prc-block/columns -->
<?php
$content = ob_get_clean();

return array(
	'title'         => '3 Lede (Wide)',
	'content'       => $content,
	'categories'    => array( 'lede' ),
	'viewportWidth' => 1200,
);
