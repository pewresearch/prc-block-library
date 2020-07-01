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

<!-- wp:prc-block/story-item {"title":"Cable TV and COVID-19: How Americans perceive the outbreak and view media coverage differ by main news source","date":"05/11/2020","image":"https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PJ_20.03.31_PathwaysColumn11_feature.jpg","imageSlot":"right","imageSize":"XL","headerSize":"large","enableExtra":true,"enableBreakingNews":true,"className":"is-style-right"} -->
<article class="item wp-block-prc-block-story-item is-style-right story-item"><div class="content"><div class="meta"><span class="report label">Report</span> | <span class="date">May 11, 2020</span></div><div class="header large"><a href="">Cable TV and COVID-19: How Americans perceive the outbreak and view media coverage differ by main news source</a></div><div class="description"><p>Responses to cable news coverage and the pandemic vary notably among Americans who identify Fox News, MSNBC or CNN as their main source of political news.</p></div><ul class="extra"><li><strong>Explore new survey data about COVID-19 in our tool</strong></li></ul><ul class="extra-breaking-news"><li><a href="https://www.pewresearch.org/topics/coronavirus-disease-2019-covid-19/" class="kicker-breaking-news">SEE ALL CORONAVIRUS RESEARCH ></a></li></ul></div><div class="ui XL image"><picture><source srcset="https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PJ_20.03.31_PathwaysColumn11_feature.jpg?resize=720%2C405 1x, https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PJ_20.03.31_PathwaysColumn11_feature.jpg?resize=1440%2C810 2x" media="(min-width: 420px)"/><source srcset="https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PJ_20.03.31_PathwaysColumn11_feature.jpg?resize=354%2C194 1x, https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PJ_20.03.31_PathwaysColumn11_feature.jpg?resize=708%2C388 2x" media="(max-width: 420px)"/><img alt="" srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="/></picture></div></article>
<!-- /wp:prc-block/story-item -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:prc-block/promo {"header":"Facts are more important than ever.","description":"\u003cp\u003eIn times of uncertainty, good decisions demand good data. Please support our research with a financial contribution.\u003c/p\u003e","backgroundColor":"#F7F7F2","borderColor":"#D8D8D8","className":"pancake"} -->
<div class="wp-block-prc-block-promo pancake" style="border-color:#D8D8D8"><div class="text"><h2>Facts are more important than ever.</h2><div><p>In times of uncertainty, good decisions demand good data. Please support our research with a financial contribution.</p></div></div><div class="action"><!-- wp:prc-block/button {"color":"#d3aa20","label":"DONATE"} -->
<a class="wp-block-prc-block-button mustard ui button" href="">DONATE</a>
<!-- /wp:prc-block/button --></div></div>
<!-- /wp:prc-block/promo --></div></div>
<!-- /wp:group -->
<?php
$content = ob_get_clean();

return array(
	'title'         => '1 Lede',
	'content'       => $content,
	'categories'    => array( 'lede' ),
	'viewportWidth' => 1156,
);
