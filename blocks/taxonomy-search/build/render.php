<?php
wp_enqueue_script('wp-url');
wp_enqueue_script('wp-api-fetch');
wp_enqueue_script('wp-html-entities');

$restrict_to_term_id = $attributes['restrictToTerm']['id'] ?? null;
$restrict_to_term_name = $attributes['restrictToTerm']['name'] ?? null;

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'data-wp-interactive' => wp_json_encode(array(
		'namespace' => 'prc-block/taxonomy-search',
	)),
	'data-wp-context' => wp_json_encode(array(
		'taxonomy' => $attributes['taxonomy'] ?? 'category',
		'restrictToTermId' => $restrict_to_term_id,
		'restrictToTermName' => $restrict_to_term_name,
		'searchValue' => '',
		'isActive' => false,
		'results' => array(),
	)),
	'data-wp-class--is-active' => 'callbacks.showResults',
	'data-wp-watch--on-search-value-change' => 'callbacks.onSearchValueChange',
	'data-wp-run' => 'callbacks.debounceSearchValueChange',
));

ob_start();
?>
<ul class="wp-block-prc-block-taxonomy-search__results-list">
<template
	data-wp-each--result="context.results"
	data-wp-each-key="context.result.id"
>
	<li class="wp-block-prc-block-taxonomy-search__result">
		<a data-wp-bind--href="context.result.url">
			<span data-wp-text="context.result.label"></span>
		</a>
	</li>
</template>
</ul>
<?php
$template = ob_get_clean();

echo wp_sprintf(
	'<div %1$s>%2$s%3$s</div>',
	$block_wrapper_attrs,
	$content,
	$template,
);
