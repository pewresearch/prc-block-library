<?php
/**
 * One Lede Pattern
 *
 * @package gutenberg
 */

ob_start();
?>
<!-- wp:group -->
<div class="wp-block-group"><div class="wp-block-group__inner-container"><!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:prc-block/story-item {"title":"Cable TV and COVID-19: How Americans perceive the outbreak and view media coverage differ by main news source","date":"05/11/2020","image":"https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PJ_20.03.31_PathwaysColumn11_feature.jpg","imageSlot":"right","imageSize":"XL","headerSize":"large","enableExtra":true,"enableBreakingNews":true,"className":"item is-style-right story-item"} -->
<div class="wp-block-prc-block-story-item item is-style-right story-item react-story-item" data-label="Report" data-date="05/11/2020" data-link="" data-image="https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PJ_20.03.31_PathwaysColumn11_feature.jpg" data-imageslot="right" data-imagesize="XL" data-headersize="large" data-classname="wp-block-prc-block-story-item item is-style-right story-item" data-emphasis="false" data-breakingnews="true" data-excerptbelow="false" data-chartart="false"><div id="post-undefined" class="ui item story is-style-right null"><div class="content"><div class="ui fluid placeholder"><div class="header"><div class="line"></div><div class="line"></div></div><div class="paragraph"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div></div></div><div class="XL image"><div class="ui fluid placeholder"><div class="image"></div></div></div><div class="hidden"><div class="title">Cable TV and COVID-19: How Americans perceive the outbreak and view media coverage differ by main news source</div><div class="description"><p>Responses to cable news coverage and the pandemic vary notably among Americans who identify Fox News, MSNBC or CNN as their main source of political news.</p></div><ul class="extra"><li><strong>Explore new survey data about COVID-19 in our tool</strong></li></ul></div></div></div>
<!-- /wp:prc-block/story-item -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator --></div></div>
<!-- /wp:group -->
<?php
$content = ob_get_clean();

return array(
	'title'         => '1 Lede',
	'content'       => $content,
	'categories'    => array( 'lede' ),
	'viewportWidth' => 1156,
);
