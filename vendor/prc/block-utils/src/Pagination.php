<?php
/**
 * Sliding-window pagination markup.
 *
 * @package PRC\BlockUtils
 */

namespace PRC\BlockUtils;

/**
 * Pagination renderer for block-style chapter / attachment pagination.
 */
class Pagination {
	/**
	 * The items array.
	 *
	 * @var array
	 */
	public $items;

	/**
	 * The current page number.
	 *
	 * @var int
	 */
	public $current_page_num;

	/**
	 * The max pages to show.
	 *
	 * @var int
	 */
	public $max_pages_to_show = 7;

	/**
	 * The total number of pages.
	 *
	 * @var int
	 */
	public $total;

	/**
	 * Constructor
	 *
	 * @param array $items The items array.
	 */
	public function __construct( $items ) {
		$this->set_items( $items );
		$this->total = count( $items );
	}

	/**
	 * Set the items array and set the current page number.
	 *
	 * @param array $items Items.
	 * @return void
	 */
	protected function set_items( $items ) {
		foreach ( $items as $i => $item ) {
			$items[ $i ]['page_num'] = $i + 1;
		}
		$active_item = array_filter(
			$items,
			function ( $item ) {
				return $item['is_active'] ?? false;
			}
		);
		$this->set_current_page_num( array_shift( $active_item )['page_num'] ?? 1 );
		$this->items = $items;
	}

	/**
	 * Set the current page number.
	 *
	 * @param int $num Page number.
	 * @return void
	 */
	protected function set_current_page_num( $num ) {
		$this->current_page_num = $num;
	}

	/**
	 * Return the current active item.
	 *
	 * @return array|null
	 */
	public function get_current_item() {
		$active_item = array_filter(
			$this->items,
			function ( $item ) {
				return $item['is_active'] ?? false;
			}
		);
		return array_shift( $active_item );
	}

	/**
	 * Return the next item.
	 *
	 * @return array|null
	 */
	public function get_next_item() {
		$next_item = array_filter(
			$this->items,
			function ( $item ) {
				return $item['page_num'] === $this->current_page_num + 1;
			}
		);
		return array_shift( $next_item );
	}

	/**
	 * Return the previous item.
	 *
	 * @return array|null
	 */
	public function get_previous_item() {
		$previous_item = array_filter(
			$this->items,
			function ( $item ) {
				return $item['page_num'] === $this->current_page_num - 1;
			}
		);
		return array_shift( $previous_item );
	}

	/**
	 * Return the items array.
	 *
	 * @return array
	 */
	public function get_items() {
		return $this->items;
	}

	/**
	 * Markup for next/previous buttons.
	 *
	 * @param bool|string $link Link URL or false.
	 * @param string      $label Label.
	 * @param string      $button_classnames Classes.
	 * @param string      $next_or_previous next|prev.
	 * @return string
	 */
	public function get_adjacent_post_button( $link = false, $label = 'Next Page &rarr;', $button_classnames = '', $next_or_previous = 'next' ) {
		$tag_name   = $link ? 'a' : 'span';
		$classnames = classNames(
			$button_classnames,
			array(
				'is-disabled'                                         => false === $link,
				'common-block-style__pagination__pagination-next'     => 'next' === $next_or_previous,
				'common-block-style__pagination__pagination-previous' => 'prev' === $next_or_previous,
			)
		);
		return wp_sprintf(
			'<%1$s class="%2$s"%3$s>%4$s</%1$s>',
			esc_html( $tag_name ),
			esc_attr( $classnames ),
			'span' !== $tag_name ? "href='$link'" : '',
			esc_html( $label )
		);
	}

	/**
	 * Get item by page number.
	 *
	 * @param int $pagenum Page number.
	 * @return array|null
	 */
	protected function get_item_by_pagenum( $pagenum ) {
		$filtered = array_filter(
			$this->items,
			function ( $item ) use ( $pagenum ) {
				return $item['page_num'] === $pagenum;
			}
		);
		$item = array_shift( $filtered );
		return $item;
	}

	/**
	 * Markup for one page number.
	 *
	 * @param int    $pagenum Page number.
	 * @param string $classnames Classes.
	 * @return string
	 */
	protected function render_item( $pagenum, $classnames = '' ) {
		$matched_item = array_filter(
			$this->items,
			function ( $item ) use ( $pagenum ) {
				return $item['page_num'] === $pagenum;
			}
		);
		$item = array_shift( $matched_item );

		$number    = number_format_i18n( $item['page_num'] );
		$is_active = $item['is_active'];
		$link      = $item['link'];
		$title     = $item['title'];

		$classnames = classNames(
			$classnames,
			'common-block-style__pagination__page-numbers',
			array(
				'is-active' => $is_active,
			)
		);
		$tag_name   = $is_active || ! $link ? 'span' : 'a';
		return wp_sprintf(
			'<%1$s %2$s class="%3$s" title="%4$s">%5$s</%1$s>',
			esc_html( $tag_name ),
			'span' !== $tag_name ? "href='$link'" : '',
			esc_attr( $classnames ),
			esc_attr( $title ),
			esc_html( $number )
		);
	}

	/**
	 * Markup for the numeric page link range.
	 *
	 * @param string $item_classnames Classes.
	 * @return string
	 */
	public function render_range_of_links( $item_classnames = '' ) {
		$page_links = array();

		if ( $this->total <= 1 ) {
			return '';
		}

		if ( $this->total <= $this->max_pages_to_show ) {
			for ( $i = 1; $i <= $this->total; $i++ ) {
				$page_links[] = $this->render_item( $i, $item_classnames );
			}
		} else {
			$adjacents = (int) floor( ( $this->max_pages_to_show - 3 ) / 2 );

			if ( $this->current_page_num + $adjacents > $this->total ) {
				$start = $this->total - $this->max_pages_to_show + 2;
			} else {
				$start = $this->current_page_num - $adjacents;
			}
			if ( $start < 2 ) {
				$start = 2;
			}

			$end = $start + $this->max_pages_to_show - 3;
			if ( $end >= $this->total ) {
				$end = $this->total - 1;
			}

			$page_links[] = $this->render_item( 1, $item_classnames );
			if ( $start > 2 ) {
				$page_links[] = '<span class="common-block-style__pagination__page-numbers dots">' . __( '&hellip;' ) . '</span>';
			}
			for ( $i = $start; $i <= $end; $i++ ) {
				$page_links[] = $this->render_item( $i, $item_classnames );
			}
			if ( $end < $this->total - 1 ) {
				$page_links[] = '<span class="common-block-style__pagination__page-numbers dots">' . __( '&hellip;' ) . '</span>';
			}
			$page_links[] = $this->render_item( $this->total, $item_classnames );
		}

		ob_start();
		foreach ( $page_links as $page_link ) {
			echo $page_link; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		return ob_get_clean();
	}

	/**
	 * Full pagination markup.
	 *
	 * @param array $args Args.
	 * @return string
	 */
	public function get_markup( $args = array() ) {
		$args  = wp_parse_args(
			$args,
			array(
				'item_classnames'           => '',
				'display_next_prev_buttons' => true,
				'button_classnames'         => '',
				'next_button_label'         => 'Next Page &rarr;',
				'prev_button_label'         => '&larr; Prev Page',
			)
		);
		$items = $this->get_items();
		if ( ! empty( $items ) ) {
			wp_enqueue_style( 'prc-block-library--pagination' );
		} else {
			return '';
		}
		$next_button = null;
		$prev_button = null;
		if ( $args['display_next_prev_buttons'] ) {
			$next_item   = $this->get_next_item();
			$prev_item   = $this->get_previous_item();
			$next_button = $this->get_adjacent_post_button(
				$next_item ? $next_item['link'] : false,
				$args['next_button_label'],
				$args['button_classnames'],
				'next'
			);
			$prev_button = $this->get_adjacent_post_button(
				$prev_item ? $prev_item['link'] : false,
				$args['prev_button_label'],
				$args['button_classnames'],
				'prev'
			);
		}
		ob_start();
		?>
		<div class="common-block-style__pagination__container">
			<div class="common-block-style__pagination">
				<?php
				if ( null !== $prev_button ) {
					echo $prev_button; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				}
				?>
				<div class="common-block-style__pagination__pagination-numbers">
					<?php echo $this->render_range_of_links( $args['item_classnames'] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</div>
				<?php
				if ( null !== $next_button ) {
					echo $next_button; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				}
				?>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}
}
