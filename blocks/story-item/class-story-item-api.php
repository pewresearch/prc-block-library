<?php
namespace PRC\Platform\Blocks;


class Story_Item_API {
	public $post_id;

	public $unmodified_post_data = array();

	public function __construct($post_id = false, $variation = null) {
		$this->post_id = $post_id;

		if ( $this->post_id ) {
			$temp_post_data = get_post( $this->post_id );
			// We store what the "default" unmodified post data is.
			$unmodified_post_data = array(
				'post_title' => $temp_post_data->post_title,
				'post_excerpt' => $temp_post_data->post_excerpt,
				'url' => get_permalink( $this->post_id ),
			);
		}
	}

	public function get_title() {

	}

	public function get_description() {

	}

	public function get_image() {

	}

	public function get_image_slot() {

	}
}
