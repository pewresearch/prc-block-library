<?php
namespace PRC\Platform\Blocks;

/**
 * Block Name:        Report Pagination
 * Description:       Provides a stylized pagination for use with reports
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      8.1
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class Report_Pagination {
	public static $block_json = null;
	public static $version;
	public static $block_name;
	public static $dir = __DIR__;

	public function __construct($loader) {
		$block_json_file = PRC_BLOCK_LIBRARY_DIR . '/blocks/report-pagination/build/block.json';
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

	public function get_active_pagenum($items) {
		$active_item = array_filter($items, function($item) {
			return $item['is_active'];
		});
		$active_item = array_shift($active_item);
		return $active_item['pagenum'] ?? 1;
	}

	// Render out a list of each $items. $items is an array of arrays, each sub array has an id, title, link, and is_active attribute. This function should just render out a <li> elements for each item with a number and a link to the item. If it is active, it should have a class of 'is-active'.
	public function get_pagination_markup($items, $attributes) {
		$items = $items['pagination_items'] ?? [];
		// remap $items to include pagenum on the item
		$items = array_map(function($item, $index) {
			$item['pagenum'] = $index + 1;
			return $item;
		}, $items, array_keys($items));
		$total = count($items);
		$items_per_page = $items['items_per_page'] ?? 10;
		$current = $this->get_active_pagenum($items);

		if ( $current > ( $total - $items_per_page ) ) {
			$start = max( $total - $items_per_page, 1 );
			$end   = $total;
		} elseif ( $current < $items_per_page ) {
			$start = 1;
			$end   = $items_per_page;
		} else {
			$start = $current - floor( $items_per_page / 2 );
			$end   = $current + floor( $items_per_page / 2 );
		}

		$items = array_slice($items, $start, $end);

		if ( !is_array($items) || empty($items) ) {
			return false;
		}
		ob_start();
		?>
		<div class="wp-block-prc-block-report-pagination__pagination-items">
			<?php foreach ( $items as $number => $item ) {
				$number = $item['pagenum'];
				$is_active = $item['is_active'];
				$link = $item['link'];
				$title = $item['title'];
				$tag_name = $is_active || ! $link ? 'span' : 'a';
				$extra_attrs = 'a' === $tag_name ? wp_sprintf(
					' href="%1$s" alt="%2$s"',
					esc_url($link),
					esc_attr($title)
				) : '';
				$classname = \PRC\Platform\Block_Utils\classNames('wp-block-prc-block-report-pagination__pagination-item',array(
					'is-active' => $is_active,
					'has-text-color' => $attributes['itemTextColor'],
					'has-' . $attributes['itemTextColor'] . '-color' => $attributes['itemTextColor'],
					'has-background' => $attributes['itemBackgroundColor'],
					'has-' . $attributes['itemBackgroundColor'] . '-background-color' => $attributes['itemBackgroundColor'],
					'has-border-color' => $attributes['itemBorderColor'],
					'has-border-' . $attributes['itemBorderColor'] . '-color' => $attributes['itemBorderColor'],
					'has-hover-background' => $attributes['itemHoverBackgroundColor'],
					'has-hover-' . $attributes['itemHoverBackgroundColor'] . '-background-color' => $attributes['itemHoverBackgroundColor'],
					'has-active-background' => $attributes['itemActiveBackgroundColor'],
					'has-active-' . $attributes['itemActiveBackgroundColor'] . '-background-color' => $attributes['itemActiveBackgroundColor'],

				));
				echo wp_sprintf(
					'<%1$s class="%2$s"%3$s>%4$s</%1$s>',
					$tag_name,
					$classname,
					$extra_attrs,
					esc_html($number)
				);
				?>
			<?php } ?>
			</div>
		<?php
		$pagination_markup = ob_get_clean();
		$pagination_markup = normalize_whitespace($pagination_markup);
		return $pagination_markup;
	}

	public function get_next_post_button($pagination_data, $attributes) {
		$next_post = $pagination_data['next_post'] ?? false;
		if ( false === $next_post ) {
			return false;
		}
		$next_post_title = $next_post['title'];
		$next_post_link = $next_post['link'];
		$classnames = \PRC\Platform\Block_Utils\classNames(
			'wp-block-prc-block-report-pagination__next-post-button',
			array(
				'has-text-color' => $attributes['nextButtonTextColor'],
				'has-' . $attributes['nextButtonTextColor'] .'-color' => $attributes['nextButtonTextColor'],
				'has-background' => $attributes['nextButtonBackgroundColor'],
				'has-' . $attributes['nextButtonBackgroundColor'] . '-background-color' => $attributes['backgroundColor'],
			),
		);
		ob_start();
		?>
		<a href="<?php echo esc_url($next_post_link); ?>" rel="prefetch" class="<?php echo esc_attr($classnames);?>" alt="Go to the next post in this report: <?php echo esc_attr($next_post_title); ?>" style="box-shadow: inset 0 3px 4px -2px var(--wp--preset--color--<?php echo $attributes['nextButtonBoxShadowColor'];?>)">
			<?php echo esc_html($next_post_title); ?>
		</a>
		<?php
		$next_post_button = ob_get_clean();
		return $next_post_button;
	}

	public function get_adjacent_post_button($link = false, $label = 'Next Page &rarr;') {
		$tag_name = $link ? 'a' : 'span';
		$classnames = \PRC\Platform\Block_Utils\classNames('wp-block-prc-block-report-pagination__pagination-next-prev', array(
			'is-disabled' => false === $link,
		));
		return wp_sprintf(
			'<%1$s class="%2$s"%3$s>%4$s</%1$s>',
			$tag_name,
			$classnames,
			false !== $link ? "href='$link'" : "",
			esc_html($label)
		);
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$post_id = $block->context['postId'] ?? false;
		if ( false === $post_id ) {
			return;
		}
		$report_package = new \PRC\Platform\Post_Report_Package(null, null);
		$pagination_data = $report_package->get_pagination($post_id);
		if ( false === $pagination_data ) {
			return;
		}

		// $block_gap = \PRC\Platform\Block_Utils\get_block_gap_support_value($attributes);

		$wrapper_attributes = get_block_wrapper_attributes();

		$pagination_markup = $this->get_pagination_markup($pagination_data, $attributes);

		$pagination = wp_sprintf(
			'<div class="wp-block-prc-block-report-pagination__pagination">%1$s %2$s %3$s</div>',
			$this->get_adjacent_post_button(
				$pagination_data['previous_post'] ? $pagination_data['previous_post']['link'] : false,
				'&larr; Prev Page'
			),
			$pagination_markup,
			$this->get_adjacent_post_button(
				$pagination_data['next_post'] ? $pagination_data['next_post']['link'] : false,
				'Next Page &rarr;'
			),
		);

		$next_post_button = $this->get_next_post_button($pagination_data, $attributes);

		return wp_sprintf(
			'<div %1$s>%2$s %3$s</div>',
			$wrapper_attributes,
			$next_post_button,
			$pagination
		);
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
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
