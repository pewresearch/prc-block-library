<?php
/**
 * @package PRC\Primitives\BlockUtils\Tests
 */

namespace PRC\Primitives\BlockUtils\Tests;

use PRC\Primitives\BlockUtils\PostContentBlockFilter;
use WP_UnitTestCase;

use function PRC\Primitives\BlockUtils\strip_block_from_post_content;

class Test_PostContentBlockFilter extends WP_UnitTestCase {

	private const DATE_MARKUP    = '<!-- wp:post-date /-->';
	private const PARAGRAPH_HTML = '<!-- wp:paragraph --><p>Body copy</p><!-- /wp:paragraph -->';

	public function tear_down() {
		PostContentBlockFilter::reset();
		parent::tear_down();
	}

	private function render_date_in_post_content( int $post_id ): string {
		$GLOBALS['post'] = get_post( $post_id ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		setup_postdata( $GLOBALS['post'] );

		$html = do_blocks( '<!-- wp:post-content /-->' );

		wp_reset_postdata();
		return $html;
	}

	private function make_post( string $content, string $post_type = 'post' ): int {
		return self::factory()->post->create(
			array(
				'post_type'    => $post_type,
				'post_status'  => 'publish',
				'post_content' => $content,
			)
		);
	}

	public function test_block_inside_post_content_is_stripped_when_rule_passes() {
		strip_block_from_post_content( 'core/post-date', '__return_true' );
		$post_id = $this->make_post( self::PARAGRAPH_HTML . self::DATE_MARKUP );

		$html = $this->render_date_in_post_content( $post_id );

		$this->assertStringContainsString( 'Body copy', $html );
		$this->assertStringNotContainsString( 'wp-block-post-date', $html );
	}

	public function test_block_inside_post_content_is_kept_when_rule_fails() {
		strip_block_from_post_content( 'core/post-date', '__return_false' );
		$post_id = $this->make_post( self::PARAGRAPH_HTML . self::DATE_MARKUP );

		$html = $this->render_date_in_post_content( $post_id );

		$this->assertStringContainsString( 'wp-block-post-date', $html );
	}

	public function test_block_outside_post_content_is_untouched() {
		strip_block_from_post_content( 'core/post-date', '__return_true' );
		$post_id         = $this->make_post( self::PARAGRAPH_HTML );
		$GLOBALS['post'] = get_post( $post_id ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		setup_postdata( $GLOBALS['post'] );

		$html = do_blocks( '<!-- wp:post-content /-->' . self::DATE_MARKUP );

		wp_reset_postdata();
		$this->assertStringContainsString( 'Body copy', $html );
		$this->assertStringContainsString( 'wp-block-post-date', $html );
	}

	public function test_block_after_post_content_finishes_is_untouched() {
		strip_block_from_post_content( 'core/post-date', '__return_true' );
		$post_id         = $this->make_post( self::DATE_MARKUP );
		$GLOBALS['post'] = get_post( $post_id ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		setup_postdata( $GLOBALS['post'] );

		$inside  = do_blocks( '<!-- wp:post-content /-->' );
		$outside = do_blocks( self::DATE_MARKUP );

		wp_reset_postdata();
		$this->assertStringNotContainsString( 'wp-block-post-date', $inside );
		$this->assertStringContainsString( 'wp-block-post-date', $outside );
	}

	public function test_callback_receives_block_post_id_and_instance() {
		$received = array();
		strip_block_from_post_content(
			'core/post-date',
			static function ( array $block, int $post_id, $instance ) use ( &$received ) {
				$received = array( $block['blockName'], $post_id, $instance );
				return false;
			}
		);
		$post_id = $this->make_post( self::DATE_MARKUP );

		$this->render_date_in_post_content( $post_id );

		$this->assertSame( 'core/post-date', $received[0] );
		$this->assertSame( $post_id, $received[1] );
		$this->assertInstanceOf( \WP_Block::class, $received[2] );
	}

	public function test_nested_post_content_uses_the_innermost_post_id() {
		$outer_id = $this->make_post( self::DATE_MARKUP, 'post' );
		$inner_id = $this->make_post( self::DATE_MARKUP, 'page' );
		$seen     = array();
		strip_block_from_post_content(
			'core/post-date',
			static function ( array $block, int $post_id ) use ( &$seen ) {
				$seen[] = $post_id;
				return 'page' === get_post_type( $post_id );
			}
		);
		$filter = PostContentBlockFilter::instance();

		$GLOBALS['post'] = get_post( $outer_id ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		setup_postdata( $GLOBALS['post'] );
		$filter->enter_post_content( array(), array( 'blockName' => 'core/post-content' ) );

		$GLOBALS['post'] = get_post( $inner_id ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		setup_postdata( $GLOBALS['post'] );
		$inner       = do_blocks( '<!-- wp:post-content /-->' );
		$after_inner = do_blocks( self::DATE_MARKUP );

		$filter->leave_post_content( '' );
		wp_reset_postdata();

		$this->assertStringNotContainsString( 'wp-block-post-date', $inner );
		$this->assertSame( array( $inner_id, $outer_id ), $seen );
		$this->assertStringContainsString( 'wp-block-post-date', $after_inner );
	}

	public function test_several_rules_on_one_block_strip_when_any_passes() {
		strip_block_from_post_content( 'core/post-date', '__return_false' );
		strip_block_from_post_content( 'core/post-date', '__return_true', 20 );
		$post_id = $this->make_post( self::DATE_MARKUP );

		$html = $this->render_date_in_post_content( $post_id );

		$this->assertStringNotContainsString( 'wp-block-post-date', $html );
	}

	public function test_one_rule_covers_several_block_names() {
		strip_block_from_post_content( array( 'core/post-date', 'core/paragraph' ), '__return_true' );
		$post_id = $this->make_post( self::PARAGRAPH_HTML . self::DATE_MARKUP . '<!-- wp:separator --><hr class="wp-block-separator"/><!-- /wp:separator -->' );

		$html = $this->render_date_in_post_content( $post_id );

		$this->assertStringNotContainsString( 'wp-block-post-date', $html );
		$this->assertStringNotContainsString( 'Body copy', $html );
		$this->assertStringContainsString( 'wp-block-separator', $html );
	}

	public function test_unrelated_blocks_are_kept() {
		strip_block_from_post_content( 'core/post-date', '__return_true' );
		$post_id = $this->make_post( self::PARAGRAPH_HTML . self::DATE_MARKUP );

		$html = $this->render_date_in_post_content( $post_id );

		$this->assertStringContainsString( 'Body copy', $html );
	}

	public function test_unbalanced_pop_does_not_break_later_rendering() {
		strip_block_from_post_content( 'core/post-date', '__return_true' );
		$post_id = $this->make_post( self::DATE_MARKUP );

		$filter = PostContentBlockFilter::instance();
		$filter->leave_post_content( '' );
		$filter->leave_post_content( '' );

		$this->assertStringNotContainsString( 'wp-block-post-date', $this->render_date_in_post_content( $post_id ) );
		$this->assertStringContainsString( 'wp-block-post-date', do_blocks( self::DATE_MARKUP ) );
	}

	public function test_late_short_circuit_of_top_level_post_content_leaves_no_stack_entry() {
		strip_block_from_post_content( 'core/post-date', '__return_true' );
		$post_id         = $this->make_post( self::DATE_MARKUP );
		$GLOBALS['post'] = get_post( $post_id ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		setup_postdata( $GLOBALS['post'] );
		$short_circuit = static fn( $pre_render, $parsed_block ) => 'core/post-content' === $parsed_block['blockName'] ? '' : $pre_render;
		add_filter( 'pre_render_block', $short_circuit, PHP_INT_MAX, 2 );

		$short_circuited = do_blocks( '<!-- wp:post-content /-->' );
		$after           = do_blocks( self::DATE_MARKUP );

		remove_filter( 'pre_render_block', $short_circuit, PHP_INT_MAX );
		wp_reset_postdata();
		$this->assertSame( '', $short_circuited );
		$this->assertStringContainsString( 'wp-block-post-date', $after );
	}

	public function test_late_short_circuit_of_nested_post_content_leaves_no_stack_entry() {
		strip_block_from_post_content( 'core/post-date', '__return_true' );
		$post_id         = $this->make_post( self::DATE_MARKUP );
		$GLOBALS['post'] = get_post( $post_id ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		setup_postdata( $GLOBALS['post'] );
		$short_circuit = static fn( $pre_render, $parsed_block ) => 'core/post-content' === $parsed_block['blockName'] ? '' : $pre_render;
		add_filter( 'pre_render_block', $short_circuit, PHP_INT_MAX, 2 );

		do_blocks( '<!-- wp:group --><div class="wp-block-group"><!-- wp:post-content /--></div><!-- /wp:group -->' );
		$after = do_blocks( self::DATE_MARKUP );

		remove_filter( 'pre_render_block', $short_circuit, PHP_INT_MAX );
		wp_reset_postdata();
		$this->assertStringContainsString( 'wp-block-post-date', $after );
	}

	public function test_post_content_still_strips_when_a_pre_render_filter_declines() {
		strip_block_from_post_content( 'core/post-date', '__return_true' );
		$post_id      = $this->make_post( self::DATE_MARKUP );
		$pass_through = static fn( $pre_render ) => $pre_render;
		add_filter( 'pre_render_block', $pass_through, PHP_INT_MAX );

		$html = $this->render_date_in_post_content( $post_id );

		remove_filter( 'pre_render_block', $pass_through, PHP_INT_MAX );
		$this->assertStringNotContainsString( 'wp-block-post-date', $html );
	}

	public function test_reset_removes_the_hooks() {
		strip_block_from_post_content( 'core/post-date', '__return_true' );
		$post_id = $this->make_post( self::DATE_MARKUP );

		PostContentBlockFilter::reset();

		$this->assertStringContainsString( 'wp-block-post-date', $this->render_date_in_post_content( $post_id ) );
	}
}
