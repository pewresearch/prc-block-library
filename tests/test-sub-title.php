<?php
/**
 * Tests for sub-title block bindings and legacy block rendering.
 *
 * @package PRC\Platform\Blocks
 */

declare( strict_types=1 );

use PRC\Platform\Blocks\Core_Heading;
use PRC\Platform\Blocks\Sub_Title;

/**
 * Sub-title binding and legacy block tests.
 */
class Test_Sub_Title extends WP_UnitTestCase {

	/**
	 * Legacy block instance under test.
	 *
	 * @var Sub_Title
	 */
	private Sub_Title $legacy_block;

	/**
	 * Core heading integration instance under test.
	 *
	 * @var Core_Heading
	 */
	private Core_Heading $core_heading;

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

		$this->legacy_block  = new Sub_Title( $loader );
		$this->core_heading  = new Core_Heading( $loader );
	}

	/**
	 * Build a bound sub-title heading block payload.
	 *
	 * @return array
	 */
	private function get_bound_subtitle_block(): array {
		return array(
			'blockName' => 'core/heading',
			'attrs'     => array(
				'level'    => 2,
				'metadata' => array(
					'bindings' => array(
						'content' => array(
							'source' => 'core/post-meta',
							'args'   => array(
								'key' => 'sub_title',
							),
						),
					),
				),
			),
		);
	}

	/**
	 * Render a bound sub-title heading through Core_Heading filters.
	 *
	 * @param int    $post_id       Post ID.
	 * @param string $block_content Heading HTML.
	 * @return string
	 */
	private function render_bound_subtitle_for_post( int $post_id, string $block_content ): string {
		$wp_block = (object) array(
			'context' => array(
				'postId' => $post_id,
			),
		);

		return $this->core_heading->render_sub_title_heading(
			$block_content,
			$this->get_bound_subtitle_block(),
			$wp_block
		);
	}

	/**
	 * Legacy block render callback should return empty output.
	 */
	public function test_legacy_block_render_callback_returns_empty_string(): void {
		$post_id = self::factory()->post->create();
		update_post_meta( $post_id, 'sub_title', 'Legacy subtitle' );

		$block = (object) array(
			'context' => array(
				'postId' => $post_id,
			),
		);

		$html = $this->legacy_block->render_callback( array(), '', $block );

		$this->assertSame( '', $html );
	}

	/**
	 * Bound headings with sub_title meta should render outside post content.
	 */
	public function test_bound_subtitle_renders_with_meta_outside_post_content(): void {
		$post_id = self::factory()->post->create();
		update_post_meta( $post_id, 'sub_title', 'Template subtitle' );

		$html = $this->render_bound_subtitle_for_post(
			$post_id,
			'<h2 class="wp-block-heading">Template subtitle</h2>'
		);

		$this->assertStringContainsString( 'Template subtitle', $html );
	}

	/**
	 * Bound headings inside post content should be stripped on the frontend.
	 */
	public function test_bound_subtitle_is_stripped_inside_post_content(): void {
		$post_id = self::factory()->post->create();
		update_post_meta( $post_id, 'sub_title', 'Duplicate subtitle' );

		$this->core_heading->flag_post_content_render_start(
			array(
				'blockName' => 'core/post-content',
			)
		);

		$html = $this->render_bound_subtitle_for_post(
			$post_id,
			'<h2 class="wp-block-heading">Duplicate subtitle</h2>'
		);

		$this->assertSame( '', $html );
	}

	/**
	 * Empty sub_title meta should suppress bound heading output.
	 */
	public function test_bound_subtitle_with_empty_meta_renders_nothing(): void {
		$post_id = self::factory()->post->create();

		$html = $this->render_bound_subtitle_for_post(
			$post_id,
			'<h2 class="wp-block-heading"></h2>'
		);

		$this->assertSame( '', $html );
	}

	/**
	 * Whitespace-only sub_title meta should suppress bound heading output.
	 */
	public function test_bound_subtitle_with_whitespace_meta_renders_nothing(): void {
		$post_id = self::factory()->post->create();
		update_post_meta( $post_id, 'sub_title', '   ' );

		$html = $this->render_bound_subtitle_for_post(
			$post_id,
			'<h2 class="wp-block-heading">   </h2>'
		);

		$this->assertSame( '', $html );
	}
}
