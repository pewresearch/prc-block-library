<?php
namespace PRC\Platform\Blocks;

/**
 * This class is an attempt to provide a common and structured way to create lists in the "Baseball Card" style.
 */
class Baseball_Card_List {
	public $items;
	public $current_list_item;

	public function __construct($items)
	{
		$this->set_items($items);
	}

	protected function set_items($items) {
		$current_item = $this->get_current_item($items);
		$this->set_current_list_item($current_item);
		$this->items = $items;
	}

	public function set_current_list_item($item) {
		$this->current_list_item = $item;
	}

	public function get_current_item($items) {
		$active_item = array_filter($items, function($item) {
			return $item['is_active'] ?? false;
		});
		return array_shift($active_item);
	}

	public function get_next_item() {
		$current_item = $this->current_list_item;
		$current_item_index = array_search($current_item, $this->items);
		$next_item = array_slice($this->items, $current_item_index + 1, 1);
		if (empty($next_item)) {
			return null;
		}
		return array_shift($next_item);
	}

	public function get_previous_item() {
		$current_item = $this->current_list_item;
		$current_item_index = array_search($current_item, $this->items);
		$previous_item = array_slice($this->items, $current_item_index - 1, 1);
		if (empty($previous_item)) {
			return null;
		}
		return array_shift($previous_item);
	}

	protected function get_items() {
		return $this->items;
	}

	public function get_markup($args = array()) {
		wp_enqueue_style('prc-block-library--baseball-card');
		$args = wp_parse_args($args, array(
			'item_classnames' => '',
			'ul_extra_attrs' => '',
			'classname_prefix' => 'common-block-style',
		));
		$prefix = $args['classname_prefix'];
		$ul_classname = $prefix  . '--' . 'baseball-card__list';

		$items = $this->get_items();
		$prev_item  = $this->get_previous_item();
		$next_item = $this->get_next_item();
		$items = array_map(function($item) use ($prev_item, $next_item) {
			$is_prev = null !== $prev_item ? $prev_item['id'] === $item['id'] : false;
			$is_next = null !== $next_item ? $next_item['id'] === $item['id'] : false;
			$item['is_prev'] = $is_prev;
			$item['is_next'] = $is_next;
			return $item;
		}, $items);

		ob_start();
		?>
			<ul class="<?php echo $ul_classname;?>" <?php echo $args['ul_extra_attrs'];?>>
				<?php foreach ( $items as $number => $item ) {
					$is_previous = $item['is_prev'] || false;
					$is_next = $item['is_next'] || false;
					$is_active = $item['is_active'] || false;
					$link = $item['link'];
					$title = $item['title'];
					$item_classnames = $prefix . '__list-item';
					$classnames = \PRC\Platform\Block_Utils\classNames($item_classnames, $args['item_classnames'], [
						'is-active' => $is_active,
						'is-previous' => $is_previous,
						'is-next' => $is_next,
					]);
					echo wp_sprintf(
						'<li class="%1$s"><a href="%2$s">%3$s</a></li>',
						$classnames,
						$link,
						$title,
					);
					?>
				<?php } ?>
			</ul>
		</div>
		<?php
		return ob_get_clean();
	}
}
