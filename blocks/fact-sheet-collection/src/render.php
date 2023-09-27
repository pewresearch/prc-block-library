<?php
if ( is_admin() ) {
	return;
}
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.
$cache_group = 'prc-block-library-fact-sheet-collection-markup-0.1.7';
$cached = false;
if ( !is_preview() ){
	$cached = wp_cache_get(
		get_the_ID(),
		$cache_group,
	);
}

if ( false === $cached ) {
	$collection_terms = wp_get_post_terms(get_the_ID(), 'collection');
	if (empty($collection_terms)) {
		return;
	}
	// Get the last term out of the collection_terms array.
	$collection_term = array_pop($collection_terms);
	if ( ! $collection_term instanceof WP_Term ) {
		return;
	}
	$parent_term = get_term($collection_term->parent, 'collection');
	$parent_term_id = isset($parent_term->term_id) ? $parent_term->term_id : null;
	$parent_term_link = get_term_link($parent_term_id, 'collection');
	$parent_term = array(
		'name' => isset($parent_term->name) ? $parent_term->name : '',
		'link' => isset($parent_term_link) ? $parent_term_link : '',
	);

	// Get the parent term's children, returns a list of term ids.
	$child_terms = get_term_children($parent_term_id, 'collection');
	$child_terms = array_map(function ($term_id) use ($collection_term) {
		$child_term = get_term($term_id, 'collection');
		if ( ! $child_term instanceof WP_Term ) {
			return;
		}
		$link = get_term_link($child_term->term_id, 'collection');

		// If this child term has english posts then use the english post link, otherwise fallback to the child term link.
		$english_post = get_posts(array(
			'posts_per_page' => 1,
			'post_type' => 'fact-sheets',
			'tax_query' => array(
				'relation' => 'AND',
				array(
					'taxonomy' => 'collection',
					'field' => 'term_id',
					'terms' => $child_term->term_id,
				),
				array(
					'taxonomy' => 'languages',
					'field' => 'slug',
					'terms' => array('en'),
				),
			),
		));
		if (!empty($english_post)) {
			$english_post = array_pop($english_post);
			$link = get_permalink($english_post->ID);
		}

		$child_term = array(
			'term_id' => $child_term->term_id,
			'name' => $child_term->name,
			'link' => $link,
		);
		return $child_term;
	}, $child_terms);

	// Filter out any null values.
	$child_terms = array_filter($child_terms);
	// Sort the child terms by name.
	usort($child_terms, function ($a, $b) {
		return strcmp($a['name'], $b['name']);
	});

	// get all the other NON en language posts that have the child_term->term_id in the collection taxonomy.
	$other_language_posts = get_posts(array(
		'posts_per_page' => 24,
		'post_type' => 'fact-sheets',
		'post__not_in' => array(get_the_ID()),
		'tax_query' => array(
			array(
				'taxonomy' => 'collection',
				'field' => 'term_id',
				'terms' => $collection_term->term_id,
			),
			array(
				'taxonomy' => 'languages',
				'field' => 'slug',
				'terms' => array('en'),
				'operator' => 'NOT IN',
			),
		),
	));

	// Convert the child terms to html links and then cache them.
	$cached = array(
		'terms' => array_map(function ($child_term) use ($collection_term) {
			return wp_sprintf(
				'<a href="%1$s" class="%2$s">%3$s</a>',
				$child_term['link'],
				classNames('wp-block-prc-block-fact-sheet-collection--term-link', array(
					'is-active' => $child_term['term_id'] === $collection_term->term_id,
				)),
				$child_term['name'],
			);
		}, $child_terms),
		'alt_languages' => array_map(function ($other_language_post) {
			if ( ! $other_language_post instanceof WP_Post ) {
				return;
			}
			$other_language_post_permalink = get_permalink($other_language_post->ID);
			$other_language_post_language = wp_get_post_terms($other_language_post->ID, 'languages');
			$other_language_post_language = array_pop($other_language_post_language);
			if ( ! $other_language_post_language instanceof WP_Term ) {
				return;
			}
			$other_language_post_language = $other_language_post_language->name;
			return wp_sprintf(
				'<a href="%1$s" class="wp-block-prc-block-fact-sheet-collection__term-link__alt-language-link">%2$s</a>',
				$other_language_post_permalink,
				$other_language_post_language,
			);
		}, $other_language_posts),
		'collection_name' => $parent_term['name'],
		'collection_link' => $parent_term['link'],
	);

	if ( !is_preview() ) {
		wp_cache_set(
			get_the_ID(),
			$cached,
			$cache_group,
			1 * DAY_IN_SECONDS
		);
	}
}

$pdf = array_key_exists('pdf', $attributes) ? $attributes['pdf'] : null;
if ($pdf) {
	$pdf_id = $pdf['id'];
	$pdf = wp_get_attachment_url($pdf_id);
	$pdf = wp_sprintf(
		'<a href="%1$s" class="wp-block-prc-block-fact-sheet-collection--pdf-link" download><i class="file pdf icon"></i> %2$s</a>',
		$pdf,
		__('Download PDF', 'prc-block-library'),
	);
}

$block_wrapper_attrs = get_block_wrapper_attributes(array(
	'class' => classNames(array(
		'has-alt-languages' => !empty($cached['alt_languages']),
	))
));

echo wp_sprintf(
	'<div %1$s><div class="wp-block-prc-block-fact-sheet-collection--parent-term"><a href="%6$s">%2$s</a></div>%5$s<div class="wp-block-prc-block-fact-sheet-collection--term-list">%3$s</div>%4$s</div>',
	$block_wrapper_attrs,
	!is_wp_error($cached['collection_name']) ? $cached['collection_name'] : '',
	implode('', $cached['terms']),
	$pdf,
	!empty($cached['alt_languages']) ? wp_sprintf(
		'<div class="wp-block-prc-block-fact-sheet-collection--alt-languages">%1$s</div>',
		implode('', $cached['alt_languages']),
	) : '',
	!is_wp_error($cached['collection_link']) ? $cached['collection_link'] : '',
);
