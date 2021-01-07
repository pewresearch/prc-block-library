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

<!-- wp:prc-block/story-item {"title":"Cable TV and COVID-19: How Americans perceive the outbreak and view media coverage differ by main news source","excerpt":"\u003cp\u003eResponses to cable news coverage and the pandemic vary notably among Americans who identify Fox News, MSNBC or CNN as their main source of political news.\u003c/p\u003e","extra":"\u003cli\u003e\u003cstrong\u003eExplore new survey data about COVID-19 in our tool\u003c/strong\u003e\u003c/li\u003e","date":"05/11/2020","image":"https://pewresearch-org-bleeding-edge.go-vip.net/wp-content/uploads/2020/05/PJ_20.03.31_PathwaysColumn11_feature.jpg","imageSlot":"right","imageSize":"XL","enableExtra":true,"enableBreakingNews":true,"className":"wp-block-prc-block-story-item is-style-right react-story-item"} /-->

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
