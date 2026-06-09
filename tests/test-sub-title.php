<?php
/**
 * Tests for Sub_Title block render_callback.
 *
 * @package PRC\Platform\Blocks
 */

declare( strict_types=1 );

use PRC\Platform\Blocks\Sub_Title;

/**
 * Sub-title block render tests.
 */
class Test_Sub_Title extends WP_UnitTestCase {

	/**
	 * Block instance under test.
	 *
	 * @var Sub_Title
	 */
	private Sub_Title $block;

	/**
	 * Set up test fixtures.
	 */
	public function set_up(): void {
		parent::set_up();

		$loader = new class() {
			/**
			 * @param mixed ...$args Hook args.
			 */
			public function add_action( ...$args ): void {}

			/**
			 * @param mixed ...$args Hook args.
			 */
			public function add_filter( ...$args ): void {}
		};

		$this->block = new Sub_Title( $loader );
	}

	/**
	 * Render subtitle markup for a post ID.
	 *
	 * @param int $post_id Post ID.
	 * @return string
	 */
	private function render_for_post( int $post_id ): string {
		$block = (object) array(
			'context' => array(
				'postId' => $post_id,
			),
		);

		return $this->block->render_callback( array(), '', $block );
	}

	/**
	 * Parent posts with sub_title meta should render.
	 */
	public function test_parent_with_sub_title_renders(): void {
		$parent_id = self::factory()->post->create();
		update_post_meta( $parent_id, 'sub_title', 'Parent subtitle' );

		$html = $this->render_for_post( $parent_id );

		$this->assertStringContainsString( 'Parent subtitle', $html );
		$this->assertStringContainsString( 'wp-block-prc-block-subtitle', $html );
	}

	/**
	 * Child posts with their own sub_title meta should render.
	 */
	public function test_child_with_sub_title_renders(): void {
		$parent_id = self::factory()->post->create(
			array(
				'post_title' => 'Parent report',
			)
		);
		update_post_meta( $parent_id, 'sub_title', 'Package subtitle' );

		$child_id = self::factory()->post->create(
			array(
				'post_parent' => $parent_id,
				'post_title'  => 'Chapter one',
			)
		);
		update_post_meta( $child_id, 'sub_title', 'Chapter subtitle' );

		$html = $this->render_for_post( $child_id );

		$this->assertStringContainsString( 'Chapter subtitle', $html );
		$this->assertStringNotContainsString( 'Package subtitle', $html );
	}

	/**
	 * Child posts without sub_title should not inherit the parent value.
	 */
	public function test_child_without_sub_title_does_not_render_parent(): void {
		$parent_id = self::factory()->post->create();
		update_post_meta( $parent_id, 'sub_title', 'Package subtitle' );

		$child_id = self::factory()->post->create(
			array(
				'post_parent' => $parent_id,
			)
		);

		$html = $this->render_for_post( $child_id );

		$this->assertSame( '', $html );
	}

	/**
	 * Whitespace-only child sub_title should render nothing.
	 */
	public function test_child_whitespace_sub_title_renders_nothing(): void {
		$parent_id = self::factory()->post->create();
		update_post_meta( $parent_id, 'sub_title', 'Package subtitle' );

		$child_id = self::factory()->post->create(
			array(
				'post_parent' => $parent_id,
			)
		);
		update_post_meta( $child_id, 'sub_title', '   ' );

		$html = $this->render_for_post( $child_id );

		$this->assertSame( '', $html );
	}
}
