<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Table of Contents
 * Description:       Displays a list of all heading blocks set to chapter headings.
 * Version:           3.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Table_Of_Contents {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $view_script_handle = null;
	public static $editor_script_handle = null;
	public static $style_handle = null;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/table-of-contents/build/block.json';
		self::$block_json = \wp_json_file_decode( $block_json_file, array( 'associative' => true ) );
		self::$block_json['file'] = wp_normalize_path( realpath( $block_json_file ) );
		self::$version = self::$block_json['version'];
		self::$block_name = self::$block_json['name'];
		$this->init($loader);
	}

	public function init($loader = null) {
		if ( null !== $loader ) {
			$loader->add_action('init', $this, 'block_init');
		}
	}

	public function get_list_items($chapters = false, $depth = 0, $attributes = array(), $return_top_level = false) {
		if ( false === $chapters || !is_array($chapters) || empty( $chapters ) || $depth >= 3 ) {
			return false;
		}
		$color_supports = new Additional_Color_Supports();
		if ( $return_top_level ) {
			$chapters = $chapters[0]['internal_chapters'];
		}
		ob_start();
		?>
		<?php foreach ( $chapters as $chapter ) {
			$is_active = $chapter['id'] === get_the_ID();
			$internal_chapters = array_key_exists('internal_chapters', $chapter) ? $chapter['internal_chapters'] : false;
			$internal_chapters = $this->get_list_items( $internal_chapters, $depth + 1, $attributes, $return_top_level ); // Increment the depth parameter

			$link = $chapter['link'];
			if ( $depth > 0 ) {
				// extract only the #anchor
				$link = substr($link, strpos($link, '#'));
			}

			if ( !empty($internal_chapters) && false !== $internal_chapters ) {
				$internal_chapters = wp_sprintf(
					'<ul class="%1$s">%2$s</ul>',
					'wp-block-prc-block-table-of-contents__list',
					$internal_chapters
				);
			}

			$list_item_classnames = 0 === $depth ? $color_supports->get_list_classnames(
				'wp-block-prc-block-table-of-contents',
				false,
				$attributes,
			) : array();

			$logical_classnames = 0 === $depth ? array(
				'is-active' => $is_active,
				'is-top-level' => $return_top_level,
			) : array();

			$chapter_link = wp_sprintf(
				'<a href="%1$s">%2$s</a>',
				esc_url( $link ),
				esc_html( wp_strip_all_tags($chapter['title']) ),
			);

			echo wp_sprintf(
				'<li class="%1$s">%2$s %3$s</li>',
				\PRC\Platform\Block_Utils\classNames(
					'wp-block-prc-block-table-of-contents__list-item',
					$list_item_classnames,
					$logical_classnames
				),
				$chapter_link,
				// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				$internal_chapters,
			);
		} ?>
		<?php
		return normalize_whitespace( ob_get_clean() );
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$post_id = $block->context['postId'];

		$report_package = new \PRC\Platform\Post_Report_Package(null, null);
		$chapters = $report_package->get_constructed_toc( $post_id );
		$return_top_level = false === $report_package->is_report_package( $post_id );

		if ( empty($chapters) ) {
			return;
		}

		$content = apply_filters( 'prc-block/table-of-contents', $this->get_list_items( $chapters, 0, $attributes, $return_top_level ), $post_id );

		if (empty($content)) {
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
		);

		if ( !$is_dropdown ) {
			$block_attrs['data-auto-dropdown-enabled'] = $attributes['autoDropdownEnabled'] ? 'true' : 'false';
			$block_attrs['data-auto-dropdown-width'] = $attributes['autoDropdownWidth'];
		} else {
			$block_attrs['aria-expanded'] = false;
		}

		if ( array_key_exists('showCurrentChapter', $attributes) && $attributes['showCurrentChapter'] ) {
			$block_attrs['data-show-current-chapter'] = true;
		}

		$block_attrs = get_block_wrapper_attributes($block_attrs);

		$block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes);

		$content = wp_sprintf(
			'<ul class="wp-block-prc-block-table-of-contents__list" role="list" %1$s>%2$s</ul>',
			'style="gap: ' . $block_gap . ';"',
			$content
		);

		$heading = wp_sprintf(
			'<div class="%1$s"><h2>%2$s</h2></div>',
			\PRC\Platform\Block_Utils\classNames(
				'wp-block-prc-block-table-of-contents__heading',
				array(
					'has-text-color' => $attributes['headingTextColor'],
					'has-'.$attributes['headingTextColor'].'-color' => $attributes['headingTextColor'],
					'has-background' => $attributes['headingBackgroundColor'],
					'has-'.$attributes['headingBackgroundColor'].'-background-color' => $attributes['headingBackgroundColor'],
					'is-hidden' => true === $attributes['hideHeading'],
				),
			),
			$heading_text,
		);

		$dropdown = wp_sprintf(
			'<div class="%1$s"><h2>%2$s</h2>%3$s</div>',
			\PRC\Platform\Block_Utils\classNames(
				'wp-block-prc-block-table-of-contents__dropdown__heading',
				array(
					'has-text-color' => $attributes['dropdownTextColor'],
					'has-'.$attributes['dropdownTextColor'].'-color' => $attributes['dropdownTextColor'],
					'has-background' => $attributes['dropdownBackgroundColor'],
					'has-'.$attributes['dropdownBackgroundColor'].'-background-color' => $attributes['dropdownBackgroundColor'],
				),
			),
			$heading_text,
			'<button class="wp-block-prc-block-table-of-contents__dropdown-trigger">+</button>',
		);

		return wp_sprintf(
			'<div %1$s>%2$s %3$s</div>',
			$block_attrs,
			$heading . $dropdown,
			$content
		);
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @hook init
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type(
			self::$dir . '/build',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}

}

