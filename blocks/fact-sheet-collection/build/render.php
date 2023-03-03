<?php
if ( is_admin() ) {
	return;
}
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$cached_terms = false;
if ( !is_preview() ){
	$cached_terms = wp_cache_get( 
		get_the_ID(),
		'prc-block-library-fact-sheet-collection'
	);
}

if ( false === $cached_terms ) {
	$collection_terms = wp_get_post_terms(get_the_ID(), 'collection');
	if (empty($collection_terms)) {
		return;
	}
	// Get the last term out of the collection_terms array.
	$collection_term = array_pop($collection_terms);
	$parent_term = get_term($collection_term->parent, 'collection');
	$parent_term_id = $parent_term->term_id;
	$parent_term = array(
		'name' => $parent_term->name,
		'link' => get_term_link($parent_term->term_id, 'collection'),
	);

	// Get the parent term's children, returns a list of term ids. 
	$child_terms = get_term_children($parent_term_id, 'collection');
	$child_terms = array_map(function ($term_id) use ($collection_term) {
		$child_term = get_term($term_id, 'collection');
		if ( ! $child_term instanceof WP_Term ) {
			return;
		}
		// Determine if this child term is the current term.
		$child_term = array(
			'term_id' => $child_term->term_id,
			'name' => $child_term->name,
			'link' => get_term_link($child_term->term_id, 'collection'),
		);
		return $child_term;
	}, $child_terms);
	// Filter out any null values.
	$child_terms = array_filter($child_terms);
	// Sort the child terms by name.
	usort($child_terms, function ($a, $b) {
		return strcmp($a['name'], $b['name']);
	});
	if ( !is_preview() ) {
		wp_cache_set( 
			get_the_ID(),
			$child_terms,
			'prc-block-library-fact-sheet-collection',
			1 * DAY_IN_SECONDS
		);
	}
	$cached_terms = $child_terms;
}

// Convert the child terms to html links.
$child_terms = array_map(function ($child_term) use ($collection_term) {
	return wp_sprintf(
		'<a href="%1$s" class="%2$s">%3$s</a>',
		$child_term['link'],
		classNames('wp-block-prc-block-fact-sheet-collection--term-link', array(
			'is-active' => $child_term['term_id'] === $collection_term->term_id,
		)),
		$child_term['name'],
	);
}, $cached_terms);

$pdf = array_key_exists('pdf', $attributes) ? $attributes['pdf'] : null;
if ($pdf) {
	$pdf_id = $pdf['id'];
	$pdf = wp_get_attachment_url($pdf_id);
	$pdf = wp_sprintf(
		'<a href="%1$s" class="wp-block-prc-block-fact-sheet-collection--pdf-link" download>%2$s</a>',
		$pdf,
		__('Download PDF', 'prc-block-library'),
	);
}

$block_wrapper_attrs = get_block_wrapper_attributes();

echo wp_sprintf(
	'<div %1$s><div class="wp-block-prc-block-fact-sheet-collection--parent-term">%2$s</div><div class="wp-block-prc-block-fact-sheet-collection--term-list">%3$s</div>%4$s</div>',
	$block_wrapper_attrs,
	$parent_term['name'],
	implode('', $child_terms),
	$pdf,
);
