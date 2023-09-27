<?php
namespace PRC\Platform\Blocks;
use WP_Error;
use WP_HTML_Heading_Processor;
/**
 * Block Name:        Table of Contents
 * Description:       Displays a list of all heading blocks set to chapter headings.
 * Version:           3.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Table_Of_Contents {
	public static $dir = __DIR__;

	public function __construct( $plugin_version ) {
		// require_once self::$dir . '/class-wp-html-heading-processor.php';
	}

	public function construct_toc( $post_id, $content = null ) {
		$report_package = new \PRC\Platform\Post_Report_Package(null, null);
		return $report_package->get_constructed_toc( $post_id );
	}

	public function get_list_items($chapters = false, $depth = 0) {
		if ( false === $chapters || !is_array($chapters) || empty( $chapters ) || $depth >= 3 ) {
			return false;
		}
		ob_start();
		?>
		<?php foreach ( $chapters as $chapter ) {
			$is_active = $chapter['id'] === get_the_ID();
			$internal_chapters = array_key_exists('internal_chapters', $chapter) ? $chapter['internal_chapters'] : false;
			$internal_chapters = $this->get_list_items( $internal_chapters, $depth + 1 ); // Increment the depth parameter

			if ( !empty($internal_chapters) && false !== $internal_chapters ) {
				$internal_chapters = wp_sprintf(
					'<ul>%s</ul>',
					$internal_chapters
				);
			}

			echo wp_sprintf(
				'<li class="%1$s"><a role="listitem" href="%2$s">%3$s</a>%4$s</li>',
				'wp-block-prc-block-table-of-contents__list-item' . ($is_active ? ' is-active' : ''),
				esc_url( $chapter['link'] ),
				esc_html( wp_strip_all_tags($chapter['title']) ),
				// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				$internal_chapters,
			);
		} ?>
		<?php
		return ob_get_clean();
	}

	public function get_default_classnames() {

	}

	public function generate_heading_and_dropdown_styles() {
		$colors = wp_get_global_settings(array('color', 'palette', 'theme'));

		ob_start();
		foreach( $colors as $color ) {
			$slug = $color['slug'];
			?>
			.wp-block-prc-block-table-of-contents.has-text-color-<?php echo esc_attr($slug);?>,
			.wp-block-prc-block-table-of-contents.has-text-color-<?php echo esc_attr($slug);?> a {
				color: var(--wp--preset--color--<?php echo esc_attr($slug); ?>) !important;
			}
			.wp-block-prc-block-table-of-contents.has-background-color-<?php echo esc_attr($slug);?> {
				background-color: var(--wp--preset--color--<?php echo esc_attr($slug); ?>) !important;
			}
			.wp-block-prc-block-table-of-contents:not(.is-style-dropdown) .wp-block-prc-block-table-of-contents__heading.has-heading-<?php echo esc_attr($slug);?>-color {
				color: var(--wp--preset--color--<?php echo esc_attr($slug); ?>) !important;
			}
			.wp-block-prc-block-table-of-contents.is-style-dropdown .wp-block-prc-block-table-of-contents__heading.has-dropdown-<?php echo esc_attr($slug);?>-color,
			.wp-block-prc-block-table-of-contents[data-auto-dropdown-enabled="true"].is-switched .wp-block-prc-block-table-of-contents__heading.has-dropdown-<?php echo esc_attr($slug);?>-color,
			.wp-block-prc-block-table-of-contents.is-style-dropdown .wp-block-prc-block-table-of-contents__heading.has-dropdown-<?php echo esc_attr($slug);?>-color .wp-block-prc-block-table-of-contents__dropdown,
			.wp-block-prc-block-table-of-contents[data-auto-dropdown-enabled="true"].is-switched .wp-block-prc-block-table-of-contents__heading.has-dropdown-<?php echo esc_attr($slug);?>-color .wp-block-prc-block-table-of-contents__dropdown {
				color: var(--wp--preset--color--<?php echo esc_attr($slug); ?>) !important;
			}
			.wp-block-prc-block-table-of-contents.has-active-<?php echo esc_attr($slug);?>-color .wp-block-prc-block-table-of-contents__list > li.is-active {
				color: var(--wp--preset--color--<?php echo esc_attr($slug); ?>) !important;
			}
			.wp-block-prc-block-table-of-contents.has-active-<?php echo esc_attr($slug);?>-color .wp-block-prc-block-table-of-contents__list > li.is-active a {
				color: var(--wp--preset--color--<?php echo esc_attr($slug); ?>) !important;
			}
			.wp-block-prc-block-table-of-contents.has-hover-<?php echo esc_attr($slug);?>-color .wp-block-prc-block-table-of-contents__list > li:hover {
				color: var(--wp--preset--color--<?php echo esc_attr($slug); ?>) !important;
			}
			.wp-block-prc-block-table-of-contents.has-hover-<?php echo esc_attr($slug);?>-color .wp-block-prc-block-table-of-contents__list > li:hover a {
				color: var(--wp--preset--color--<?php echo esc_attr($slug); ?>) !important;
			}
			.wp-block-prc-block-table-of-contents:not(.is-style-dropdown) .wp-block-prc-block-table-of-contents__heading.has-heading-<?php echo esc_attr($slug);?>-background-color {
				background-color: var(--wp--preset--color--<?php echo esc_attr($slug); ?>) !important;
			}
			.wp-block-prc-block-table-of-contents.is-style-dropdown .wp-block-prc-block-table-of-contents__heading.has-dropdown-<?php echo esc_attr($slug);?>-background-color {
				background-color: var(--wp--preset--color--<?php echo esc_attr($slug); ?>) !important;
			}
			.wp-block-prc-block-table-of-contents[data-auto-dropdown-enabled="true"].is-switched .wp-block-prc-block-table-of-contents__heading.has-dropdown-<?php echo esc_attr($slug);?>-background-color {
				background-color: var(--wp--preset--color--<?php echo esc_attr($slug); ?>) !important;
			}
			.wp-block-prc-block-table-of-contents.has-active-<?php echo esc_attr($slug);?>-background-color .wp-block-prc-block-table-of-contents__list > li.is-active {
				background-color: var(--wp--preset--color--<?php echo esc_attr($slug); ?>) !important;
			}
			.wp-block-prc-block-table-of-contents.has-hover-<?php echo esc_attr($slug);?>-background-color .wp-block-prc-block-table-of-contents__list > li:hover {
				background-color: var(--wp--preset--color--<?php echo esc_attr($slug); ?>) !important;
			}
			<?php
		}
		$styles = ob_get_clean();
		return $styles;
	}

	/**
	 * @hook enqueue_block_assets, enqueue_block_editor_assets
	 * @return void
	 */
	public function enqueue_custom_heading_and_dropdown_styles() {
		$styles = $this->generate_heading_and_dropdown_styles();
		if ( empty($styles) ) {
			return;
		}
		wp_add_inline_style( 'prc-block-table-of-contents-style', $styles );
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$is_dropdown = array_key_exists('className', $attributes) && false !== strpos($attributes['className'], 'is-style-dropdown');
		$post_id = $block->context['postId'];

		$heading = array_key_exists('heading', $attributes) ? $attributes['heading'] : false;

		$chapters = $this->construct_toc( $post_id );

		$content = apply_filters( 'prc-block/table-of-contents', $this->get_list_items( $chapters ), $post_id );

		$block_attrs = array(
			'class' => classNames(
				$attributes['className'],
				array(
					'has-text-color' => $attributes['textColor'],
					'has-text-color-' . $attributes['textColor'] => $attributes['textColor'],
					'has-background' => $attributes['backgroundColor'],
					'has-background-color-' . $attributes['backgroundColor'] => $attributes['backgroundColor'],
					'has-hover-color' => $attributes['hoverTextColor'],
					'has-hover-' . $attributes['hoverTextColor'] . '-color' => $attributes['hoverTextColor'],
					'has-hover-background' => $attributes['hoverBackgroundColor'],
					'has-hover-' . $attributes['hoverBackgroundColor'] . '-background-color' => $attributes['hoverBackgroundColor'],
					'has-active-color' => $attributes['activeTextColor'],
					'has-active-' . $attributes['activeTextColor'] . '-color' => $attributes['activeTextColor'],
					'has-active-background' => $attributes['activeBackgroundColor'],
					'has-active-' . $attributes['activeBackgroundColor'] . '-background-color' => $attributes['activeBackgroundColor'],
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

		if ( empty($content) ) {
			$content = '<p>No chapters found.</p>';
		} else {
			$content = wp_sprintf(
				'<ul class="wp-block-prc-block-table-of-contents__list" role="list">%s</ul>',
				$content
			);
		}

		$heading = wp_sprintf(
			'<div class="%1$s"><h2>%2$s</h2>%3$s</div>',
			classNames(
				'wp-block-prc-block-table-of-contents__heading',
				array(
					'has-heading-color' => $attributes['headingTextColor'],
					'has-heading-'.$attributes['headingTextColor'].'-color' => $attributes['headingTextColor'],
					'has-dropdown-color' => $attributes['dropdownTextColor'],
					'has-dropdown-'.$attributes['dropdownTextColor'].'-color' => $attributes['dropdownTextColor'],
					'has-heading-background' => $attributes['headingBackgroundColor'],
					'has-heading-'.$attributes['headingBackgroundColor'].'-background-color' => $attributes['headingBackgroundColor'],
					'has-dropdown-background' => $attributes['dropdownBackgroundColor'],
					'has-dropdown-'.$attributes['dropdownBackgroundColor'].'-background-color' => $attributes['dropdownBackgroundColor'],
					'is-hidden' => true === $attributes['hideHeading'],
				),
			),
			$heading,
			'<button class="wp-block-prc-block-table-of-contents__dropdown">+</button>',
		);

		return wp_sprintf(
			'<div %1$s>%2$s %3$s</div>',
			$block_attrs,
			$heading,
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

