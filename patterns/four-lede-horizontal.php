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

<!-- wp:prc-block/columns {"equal":true,"divided":true} -->
<div class="ui stackable divided vertically padded equal width grid"><!-- wp:prc-block/column -->
<div class="column wp-block-prc-block-column"><!-- wp:prc-block/story-item {"title":"U.S. Public Views on Climate and Energy","date":"05/11/2020","image":"https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PS_19.10.31_ClimateChange_promo_featured.png","imageSlot":"top","headerSize":"large","className":"is-style-top"} -->
<div class="wp-block-prc-block-story-item is-style-top react-story-item" data-label="Report" data-date="05/11/2020" data-link="" data-image="https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PS_19.10.31_ClimateChange_promo_featured.png" data-imageslot="top" data-imagesize="A1" data-headersize="large"  data-classname="wp-block-prc-block-story-item is-style-top" data-emphasis="false" data-breakingnews="false" data-excerptbelow="false" data-chartart="false"><div id="post-undefined" class="ui item story is-style-top stacked"><div class="A1 image"><div class="ui fluid placeholder"><div class="image"></div></div></div><div class="content"><div class="ui fluid placeholder"><div class="header"><div class="line"></div><div class="line"></div></div><div class="paragraph"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div></div></div><div class="hidden"><div class="title">U.S. Public Views on Climate and Energy</div><div class="description"><p>A majority of U.S. adults say they are taking at least some specific action in their daily lives to protect the environment, though Democrats and Republicans remain at ideological odds over the causes of climate change and the effects of policies to address it.</p></div></div></div></div>
<!-- /wp:prc-block/story-item --></div>
<!-- /wp:prc-block/column -->

<!-- wp:prc-block/column -->
<div class="column wp-block-prc-block-column"><!-- wp:prc-block/story-item {"title":"Most voters say postponing presidential primaries amid COVID-19 outbreak has been necessary","date":"05/16/2020","image":"https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/FT_20.04.03_PrimariesCOVID_feature.jpg","imageSlot":"right","imageSize":"A2","enableExcerpt":false,"className":"is-style-right"} -->
<div class="wp-block-prc-block-story-item is-style-right react-story-item" data-label="Report" data-date="05/16/2020" data-link="" data-image="https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/FT_20.04.03_PrimariesCOVID_feature.jpg" data-imageslot="right" data-imagesize="A2" data-headersize="normal"  data-classname="wp-block-prc-block-story-item is-style-right" data-emphasis="false" data-breakingnews="false" data-excerptbelow="false" data-chartart="false"><div id="post-undefined" class="ui item story is-style-right null"><div class="content"><div class="ui fluid placeholder"><div class="header"><div class="line"></div><div class="line"></div></div><div class="paragraph"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div></div></div><div class="A2 image"><div class="ui fluid placeholder"><div class="image"></div></div></div><div class="hidden"><div class="title">Most voters say postponing presidential primaries amid COVID-19 outbreak has been necessary</div></div></div></div>
<!-- /wp:prc-block/story-item -->

<!-- wp:prc-block/story-item {"title":"Most Americans don’t see Trump as religious; fewer than half say they think he’s Christian","date":"05/11/2020","image":"https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PF_19.11.01_religionTrust2featured.jpg","imageSlot":"right","imageSize":"A2","enableExcerpt":false,"className":"is-style-right"} -->
<div class="wp-block-prc-block-story-item is-style-right react-story-item" data-label="Report" data-date="05/11/2020" data-link="" data-image="https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PF_19.11.01_religionTrust2featured.jpg" data-imageslot="right" data-imagesize="A2" data-headersize="normal"  data-classname="wp-block-prc-block-story-item is-style-right" data-emphasis="false" data-breakingnews="false" data-excerptbelow="false" data-chartart="false"><div id="post-undefined" class="ui item story is-style-right null"><div class="content"><div class="ui fluid placeholder"><div class="header"><div class="line"></div><div class="line"></div></div><div class="paragraph"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div></div></div><div class="A2 image"><div class="ui fluid placeholder"><div class="image"></div></div></div><div class="hidden"><div class="title">Most Americans don’t see Trump as religious; fewer than half say they think he’s Christian</div></div></div></div>
<!-- /wp:prc-block/story-item -->

<!-- wp:prc-block/mailchimp {"icon":"election","align":"centered","headline":"\u003cstrong\u003eSign up for our Election 2020 newsletter\u003c/strong\u003e"} -->
<div class="js-react-mailchimp-newsletter" data-segment-id="" data-icon="election" data-fontcolor="#000" data-backgroundcolor="#fff" data-align="centered" data-headline="false" data-subheadline="false"><h4 class="mailchimp-headline sans-serif" style="color:#000"><strong>Sign up for our Election 2020 newsletter</strong></h4><h4 class="mailchimp-subheadline sans-serif" style="color:#000">Our latest data, delivered Saturdays</h4></div>
<!-- /wp:prc-block/mailchimp --></div>
<!-- /wp:prc-block/column --></div>
<!-- /wp:prc-block/columns -->
<?php
$content = ob_get_clean();

return array(
	'title'         => '4 Lede (Horizontal)',
	'content'       => $content,
	'categories'    => array( 'lede' ),
	'viewportWidth' => 1156,
);
