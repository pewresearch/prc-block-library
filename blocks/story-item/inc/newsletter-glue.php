<?php

class NewsletterGlue extends StoryItem {
	public function __construct($init = false) {
		if ( true === $init ) {
			// add_action( 'init', array( $this, 'init' ) );
			// add_filter('newsletterglue_get_blocks', array($this, 'register_block_with_NG'));
		}
	}

	public function register_block_with_NG( $ng_blocks ) {
		$ng_blocks['prc_story_item'] = array();
		return $ng_blocks;
	}
}

new NewsletterGlue(true);
