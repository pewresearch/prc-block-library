<?php
$ref = $block->context['postId'];
$report_package = new \PRC\Platform\Post_Report_Package(null, null);
$return_top_level = false === $report_package->is_report_package( $ref );
$chapters = $report_package->get_constructed_toc( $ref );
if ( $return_top_level ) {
	$chapters = $chapters[0]['internal_chapters'];
}

if ( empty($chapters) ) {
	return;
}

$is_dropdown = array_key_exists('className', $attributes) && false !== strpos($attributes['className'], 'is-style-dropdown');

$heading_text = array_key_exists('heading', $attributes) ? $attributes['heading'] : false;

$block_attrs = array(
	'class' => \PRC\Platform\Block_Utils\classNames(
		array_key_exists('className', $attributes) ? $attributes['className'] : '',
		'common-block-style--baseball-card',
		array(
			'has-text-color' => $attributes['textColor'],
			'has-' . $attributes['textColor'] .'-color' => $attributes['textColor'],
			'has-background' => $attributes['backgroundColor'],
			'has-' . $attributes['backgroundColor'] . '-background-color' => $attributes['backgroundColor'],
		),
	),
	'data-wp-interactive' => wp_json_encode(array('namespace' => 'prc-block/table-of-contents')),
	'data-wp-bind--aria-expanded' => 'context.isDropdownOpen',
	'data-wp-context' => wp_json_encode(array(
		'chapters' => $chapters,
		'isDropdown' => $is_dropdown,
		'isDropdownOpen' => false,
		'autoDropdownEnabled' => $attributes['autoDropdownEnabled'],
		'showCurrentChapter' => $attributes['showCurrentChapter'],
		'headingText' => $heading_text,
		'headingClassname' => \PRC\Platform\Block_Utils\classNames(
			'wp-block-prc-block-table-of-contents__heading',
			array(
				'has-text-color' => $attributes['headingTextColor'],
				'has-'.$attributes['headingTextColor'].'-color' => $attributes['headingTextColor'],
				'has-background' => $attributes['headingBackgroundColor'],
				'has-'.$attributes['headingBackgroundColor'].'-background-color' => $attributes['headingBackgroundColor'],
				'is-hidden' => true === $attributes['hideHeading'],
			),
		),
		'dropdownClassname' => \PRC\Platform\Block_Utils\classNames(
			'wp-block-prc-block-table-of-contents__dropdown__heading',
			array(
				'has-text-color' => $attributes['dropdownTextColor'],
				'has-'.$attributes['dropdownTextColor'].'-color' => $attributes['dropdownTextColor'],
				'has-background' => $attributes['dropdownBackgroundColor'],
				'has-'.$attributes['dropdownBackgroundColor'].'-background-color' => $attributes['dropdownBackgroundColor'],
			),
		),
	)),
);

$block_attrs = get_block_wrapper_attributes($block_attrs);

$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes);

$sub_list_template = wp_sprintf(
	'<ul class="wp-block-prc-block-table-of-contents__sub-list" role="list"><template data-wp-each--subChapter="context.chapter.internal_chapters" data-wp-each-key="context.subChapter.title">%2$s</template></ul>',
	'<li class="wp-block-prc-block-table-of-contents__list-item" role="listitem" data-wp-on--click="actions.onItemClick" data-wp-text="context.subChapter.title"></li>',
);

$list_item_template = wp_sprintf(
	'<li class="wp-block-prc-block-table-of-contents__list-item" role="listitem" data-wp-on--click="actions.onItemClick"><span data-wp-text="context.chapter.title"></span>%1$s</li>',
	$sub_list_template,
);

$list_template = wp_sprintf(
	'<template data-wp-each--chapter="context.chapters" data-wp-each-key="context.chapter.title">%1$s</template>',
	$list_item_template,
);

$list = wp_sprintf(
	'<ul class="wp-block-prc-block-table-of-contents__list" role="list" %1$s>%2$s</ul>',
	'style="--block-gap: ' . $block_gap . ';"',
	$list_template,
);

echo wp_sprintf(
	'<div %1$s>%2$s %3$s %4$s</div>',
	$block_attrs,
	'<div data-wp-bind--class="context.headingClassname"><h2 data-wp-text="context.headingText"></h2></div>',
	'<div data-wp-bind--class="context.dropdownClassname"><h2 data-wp-text="context.headingText"></h2><button class="wp-block-prc-block-table-of-contents__dropdown-trigger" data-wp-on--click="actions.onDropdownClick">+</button></div>',
	$list
);
