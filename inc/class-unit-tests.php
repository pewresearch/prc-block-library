<?php

class UnitTests extends PRC_Block_Library {
	protected static $site_id = 1;
	protected static $page_id = null;
	protected static $cron_hook = 'prc_run_at_midnight';

	public function __construct($init = false) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'initialize_unit_tests' ) );
			add_action( 'wp_footer', array($this, 'inline_styling') );
			add_action( 'admin_footer', array($this, 'inline_styling') );
			add_action( self::$cron_hook, array( $this, 'run_cron_job' ) );
		}
	}

	public function initialize_unit_tests() {
		// Check if page already exists.
		$unit_tests_page_id = get_site_option( 'prc_block_library_unit_tests_page_id', false );
		self::$page_id = $unit_tests_page_id;
		if ( false === $unit_tests_page_id ) {
			// Create page for unit tests.
			$unit_tests_page = array(
				'post_title' => 'PRC Block Library Unit Tests',
				'post_name' => 'block-unit-tests',
				'post_content' => '',
				'post_status' => 'private',
				'post_type' => 'page',
			);

			// Create the page on the Dev Docs site.
			switch_to_blog( self::$site_id );
			$unit_tests_page_id = wp_insert_post($unit_tests_page);
			restore_current_blog();

			update_site_option( 'prc_block_library_unit_tests_page_id', $unit_tests_page_id );
		} else {
			$updates = $this->check_for_updates();
		}
	}

	public function run_cron_job() {
		// Check for updates.
		$this->check_for_updates();
	}

	public function construct_unit_test($block_name, $input) {
		$block_slug = $block_name;
		$block_name = ucwords(str_replace('-', ' ', $block_slug));
		ob_start();
		?>
		<!-- wp:group {"templateLock":"all","lock":{"move":true,"remove":true},"className":"prc-block-library-unit-test-group","layout":{"type":"constrained"}} -->
		<div class="wp-block-group prc-block-library-unit-test-group">
		<!-- wp:heading {"level":2,"backgroundColor":"beige-medium","textColor":"slate","className":"has-black-background-color has-background"} -->
		<h2 class="has-background has-slate-color has-beige-medium-background-color has-text-color" id="unit-test-<?php echo esc_attr($block_slug);?>"> <?php echo esc_html($block_name);?></h2>
		<!-- /wp:heading -->
		%s
		</div>
		<!-- /wp:group -->
		<?php
		$template = ob_get_clean();

		return  wp_sprintf( normalize_whitespace($template), $input );
	}

	public function get_unit_tests() {
		$path = plugin_dir_path( self::$plugin_file );
		$unit_test_files = glob( $path . '/blocks/*/.unit-test.html' );

		// get all blocks/* directories that DO NOT have a .unit-test.html file
		$missing_unit_tests = array();
		$blocks = glob( $path . '/blocks/*', GLOB_ONLYDIR );
		foreach ( $blocks as $block ) {
			$block = basename( $block );
			if ( ! file_exists( $path . '/blocks/' . $block . '/.unit-test.html' ) ) {
				$missing_unit_tests[] = $block;
			}
		}

		$unit_test_md5_hashes = get_site_option( 'prc_block_library_unit_tests_md5_hashes', false );

		return array(
			'files' => $unit_test_files,
			'integrity' => $unit_test_md5_hashes,
			'missing' => $missing_unit_tests,
		);
	}

	/**
	 * Provides structure for the unit test page.
	 * Goes through each block and adds a todo list item for each block.
	 * Then wraps each block in a group with heading.
	 * @param string $blocks
	 * @param array $block_names
	 * @return string
	 */
	public function get_page_structure( $blocks = '', $block_names = array() ) {
		ob_start();
		?>
		<!-- wp:tabor/markdown-comment {"content":"Welcome to PRC Block Library Unit Tests. This page is ephemeral, anything you change here will be wiped daily at midnight so feel free to experiment and thoroughly test each block. You will only find blocks from the PRC Block Library plugin in here, other blocks like Chart Builder and Quiz Builder can be found on DevDocs."} /-->

		<!-- wp:spacer {"height":"55px"} -->
		<div style="height:55px" aria-hidden="true" class="wp-block-spacer"></div>
		<!-- /wp:spacer -->

		<!-- wp:heading {"level":2} -->
		<h2 id="h-passed">Passed ?</h2>
		<!-- /wp:heading -->

		<!-- wp:tabor/todo-list -->
		%5$s
		<!-- /wp:tabor/todo-list -->

		<!-- wp:spacer {"height":"55px"} -->
		<div style="height:55px" aria-hidden="true" class="wp-block-spacer"></div>
		<!-- /wp:spacer -->

		%1$s
		<?php
		$page_template = ob_get_clean();
		$page_template = normalize_whitespace( $page_template );

		$todo_list_template = '<!-- wp:tabor/todo-item {"content":"%s"} /-->';
		$todo_list = '';
		foreach ( $block_names as $block_name ) {
			$todo_list .= wp_sprintf( $todo_list_template, ucwords( str_replace( '-', ' ', $block_name ) ) );
		}

		return wp_sprintf( $page_template, $blocks, '66.66%', '33.33%', 2, $todo_list );
	}

	/**
	 * Checks for changes to .unit-test.html files and updates the page if necessary.
	 * @return void|array
	 */
	public function check_for_updates() {
		if ( get_current_blog_id() !== self::$site_id ) {
			return;
		}

		$success = false;

		$unit_tests = $this->get_unit_tests();
		$unit_test_files = $unit_tests['files'];
		$missing_unit_tests = $unit_tests['missing'];
		$previous_md5_hashes = $unit_tests['integrity'];
		$next_md5_hashes = $unit_tests['integrity'];

		$unit_test_content = '';

		$block_names = array();

		// Parse through each file and determine if it has changed.
		foreach ( $unit_test_files as $unit_test_file ) {
			$block_name = basename( dirname( $unit_test_file ) );
			$block_hash = md5( file_get_contents( $unit_test_file ) );

			$block_names[] = $block_name;

			// Check if the hash has changed.
			if ( ! isset( $next_md5_hashes[ $block_name ] ) || $next_md5_hashes[ $block_name ] !== $block_hash ) {
				// Update the hash.
				$next_md5_hashes[ $block_name ] = $block_hash;
			}

			// Get the block content.
			$block_content = file_get_contents( $unit_test_file );

			// Add the block content to the unit test page, first wrap it in our template.
			$unit_test_content .= $this->construct_unit_test( $block_name, $block_content );
		}

		// Check if the hashes have changed.
		if ( $previous_md5_hashes !== $next_md5_hashes ) {
			// Update the hashes.
			update_site_option( 'prc_block_library_unit_tests_md5_hashes', $next_md5_hashes );

			// Update the unit test page.
			$unit_tests_page_id = get_site_option( 'prc_block_library_unit_tests_page_id', false );
			if ( false !== $unit_tests_page_id ) {
				$page_content = $this->get_page_structure( $unit_test_content, $block_names );
				$unit_tests_page = array(
					'ID' => $unit_tests_page_id,
					'post_content' => $page_content,
				);

				switch_to_blog( self::$site_id );
				$success = wp_update_post( $unit_tests_page, $block_names );
				restore_current_blog();
			}
		}

		if ( false == $success || is_wp_error( $success ) ) {
			// Log error.
			return array(
				'status' => 'error',
				'error' => new WP_Error( 'prc_block_library_unit_tests_update_failed', __( 'Failed to update unit tests.', 'prc-block-library' ) ),
				'missing_unit_tests' => $missing_unit_tests,
			);
		}

		return array(
			'status' => 'success',
			'error' => false,
			'missing_unit_tests' => $missing_unit_tests,
		);
	}

	public function inline_styling() {
		global $post;
		if ( !is_admin() && (isset( $post->ID ) && self::$page_id !== $post->ID) ) {
			return;
		}
		?>
		<style>
		.prc-block-library-unit-test-group {
			margin-block-start: 3em;
			padding-bottom: 2em;
		}
		.prc-block-library-unit-test-group > h2:first-child {
			font-size: 20px!important;
			padding: 0.5em 0.75em!important;
			width: 100%!important;
			max-width: 100%!important;
			margin-bottom: 1.5em;
		}
		</style>
		<?php
	}

}

new UnitTests(true);
