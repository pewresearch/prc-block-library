<?php
namespace PRC\Platform\Blocks;

class Footnotes_API {
	public $post_id = null;
	public $footnotes = [];

	public function __construct($post_id) {
		$this->post_id = $post_id;
		$this->footnotes = $this->get_footnotes();
	}

	public function get_footnotes() {
		// loop through the content and extract out the shortcode based text...
	}

	public function process_content() {
		// return the content with the shortcodes converted to markup
	}
}
