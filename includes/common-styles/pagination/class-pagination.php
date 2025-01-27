<?php
namespace PRC\Platform\Blocks;

/**
 * This class is complex-ish but simple enough to understand. Pass in an array shaped like so:
 * array(
 * array(
 * 'title' => 'Page 1',
 * 'id' => 'page-1',
 * 'link' => 'https://example.com/page-1',
 * 'is_active' => true
 * ),
 * array(
 * 'title' => 'Page 2',
 * 'link' => 'https://example.com/page-2',
 * 'id' => 'page-2',
 * 'is_active' => false
 * )
 * )
 *
 * And you'll get back a string of pagination items in a common format.
 * This class WILL NOT determine the active state of the pagination items.
 * That is up to the caller to pass that information down in the $items array by setting is_active property to true on an item.
 * This class will set the page_num property on each item in the $items array.
 * This class will also set the current_page_num property to the current page number.
 *
 * @param array $items
 */
class Pagination {
	public $items;
	public $current_page_num;
	public $max_pages_to_show = 7;
	public $total;

	public function __construct( $items ) {
		$this->set_items( $items );
		$this->total = count( $items );
	}

	/**
	 * This function will set the items array and set the current page number.
	 *
	 * @param array $items
	 * @return void
	 */
	protected function set_items( $items ) {
		// Set up the page_num attribute for each item.
		foreach ( $items as $i => $item ) {
			$items[ $i ]['page_num'] = $i + 1;
		}
		// Find the active item and set the current_page_num accordingly.
		$active_item = array_filter(
			$items,
			function ( $item ) {
				return $item['is_active'] ?? false;
			}
		);
		// Setup our class properties.
		$this->set_current_page_num( array_shift( $active_item )['page_num'] ?? 1 );
		$this->items = $items;
	}

	/**
	 * This function will set the current page number.
	 *
	 * @param int $num
	 * @return void
	 */
	protected function set_current_page_num( $num ) {
		$this->current_page_num = $num;
	}

	/**
	 * This function will return the current item in the $items array.
	 *
	 * @return array
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
	 * This function will return the next item in the $items array.
	 *
	 * @return array
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
	 * This function will return the previous item in the $items array.
	 *
	 * @return array
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
	 * This function will return the items array.
	 *
	 * @return array
	 */
	public function get_items() {
		return $this->items;
	}

	/**
	 * This function will return the markup for the next and previous buttons.
	 *
	 * @param bool   $link
	 * @param string $label
	 * @param string $button_classnames
	 * @return string
	 */
	public function get_adjacent_post_button( $link = false, $label = 'Next Page &rarr;', $button_classnames = '', $next_or_previous = 'next' ) {
		$tag_name   = $link ? 'a' : 'span';
		$classnames = \PRC\Platform\Block_Utils\classNames(
			$button_classnames,
			array(
				'is-disabled' => false === $link,
				'common-block-style__pagination__pagination-next' => 'next' === $next_or_previous,
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

	protected function get_item_by_pagenum( $pagenum ) {
		// get the link from $this->items where page_num === $pagenum
		$filtered = array_filter(
			$this->items,
			function ( $item ) use ( $pagenum ) {
				return $item['page_num'] === $pagenum;
			}
		);
		$item     = array_shift( $filtered );
		return $item;
	}

	protected function render_item( $pagenum, $classnames = '' ) {
		// Get the item from the items array by pagenum.
		$matched_item = array_filter(
			$this->items,
			function ( $item ) use ( $pagenum ) {
				return $item['page_num'] === $pagenum;
			}
		);
		$item         = array_shift( $matched_item );

		$number    = number_format_i18n( $item['page_num'] );
		$is_active = $item['is_active'];
		$link      = $item['link'];
		$title     = $item['title'];

		$classnames = \PRC\Platform\Block_Utils\classNames(
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

	public function render_range_of_links( $item_classnames = '' ) {
		$page_links = array();

		if ( $this->total <= 1 ) {
			return array();
		}

		// If the total number of pages is less than the max number of pages to show, show all the pages.
		// We don't need to do any fancy sliding.
		if ( $this->total <= $this->max_pages_to_show ) {
			for ( $i = 1; $i <= $this->total; $i++ ) {
				$page_links[] = $this->render_item( $i, $item_classnames );
			}
		} else {

			// Determine the sliding range, centered around the current page.
			$adjacents = (int) floor( ( $this->max_pages_to_show - 3 ) / 2 );

			// Calculate the start
			if ( $this->current_page_num + $adjacents > $this->total ) {
				$start = $this->total - $this->max_pages_to_show + 2;
			} else {
				$start = $this->current_page_num - $adjacents;
			}
			// Because we extract the first item on its own we want to make sure we start at 2 as a default.
			if ( $start < 2 ) {
				$start = 2;
			}

			// Calculate the end
			$end = $start + $this->max_pages_to_show - 3;
			if ( $end >= $this->total ) {
				$end = $this->total - 1;
			}

			// Build the list of pages.

			// Create the start of the pagination. Item 1.
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
			// Create the end of the pagination. Last item.
			$page_links[] = $this->render_item( $this->total, $item_classnames );
		}


		ob_start();
		?>
		<?php foreach ( $page_links as $page_link ) : ?>
			<?php echo $page_link; ?>
		<?php endforeach; ?>
		<?php
		return ob_get_clean();
	}

	/**
	 * This function will return the pagination markup for the items in the $items array.
	 *
	 * @param array $args
	 *  - item_classnames: string - The classnames to apply to each item.
	 *  - display_next_prev_buttons: bool - Whether or not to display the next and previous buttons.
	 *  - button_classnames: string - The classnames to apply to the next and previous buttons.
	 *  - next_button_label: string - The label for the next button.
	 *  - prev_button_label: string - The label for the previous button.
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
		// If there are pagination items enqueue the styleseheet to acompany the markup, otherwise, return early.
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
					echo $prev_button; }
				?>
				<div class="common-block-style__pagination__pagination-numbers">
					<?php echo $this->render_range_of_links( $args['item_classnames'] ); ?>
				</div>
				<?php
				if ( null !== $next_button ) {
					echo $next_button; }
				?>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}
}
