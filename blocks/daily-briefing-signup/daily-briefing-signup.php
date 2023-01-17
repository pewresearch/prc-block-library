<?php
/**
 * Block Name:        Daily Briefing Signup
 * Description:       Display the most recent Daily Briefing with a signup form
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Seth Rubenstein
 *
 * @package           prc-block
 */

class DailyBriefingSignup extends PRC_Block_Library {
	protected static $post_type = 'daily-briefings';
	public static $version = '0.1.0';
	public static $dir = __DIR__;

	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'block_init' ) );
			add_action( 'rest_api_init', array( $this, 'register_endpoints' ) );
		}
	}

	public function register_endpoints() {
		register_rest_route(
			'prc-api/v2',
			'/blocks/daily-briefing-signup',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_latest_daily_briefing_restfully' ),
				'args'                => array(),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	public function get_latest_daily_briefing_restfully() {
		$site_id = get_current_blog_id();

		if ( 8 !== $site_id ) {
			switch_to_blog( 8 );
		}

		$response = false;

		// New wp_query to get the latest 1 daily-briefing post
		$query = new WP_Query(
			array(
				'post_type'      => self::$post_type,
				'posts_per_page' => 1,
				'orderby'        => 'date',
				'order'          => 'DESC',
			)
		);

		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				global $post;
				$response = $post;
				$response->link = get_permalink( $post->ID, false);
			}
		}

		if ( 8 !== $site_id ) {
			restore_current_blog();
		}


		return $response;
	}

	public function render_block_callback( $attributes, $content, $block ) {
		$latest_daily_briefing = $this->get_latest_daily_briefing_restfully();
		$wrapper_attributes    = get_block_wrapper_attributes();
		ob_start();
		// We need to go through each innerblock and render manually, for the story item fetch that information using query. We schould cache the info somehow, when a new daily briefing is published we should invalidate the cache.
		?>
		<div <?php echo $wrapper_attributes; ?>>
			<?php
			foreach ( $block->parsed_block['innerBlocks'] as $i => $block ) {
				if ( 'prc-block/story-item' === $block['blockName'] ) {
					$description    = $latest_daily_briefing->post_content;
					$block['attrs'] = array(
						'title'        => $latest_daily_briefing->post_title,
						'imageSlot'    => 'disabled',
						'postId'       => $latest_daily_briefing->ID,
						'label'        => 'Daily Briefing of Media News',
						'date'         => $latest_daily_briefing->post_date,
						'excerpt'      => $description,
						'url'		   => $latest_daily_briefing->link,
					);
					do_action( 'prc_do_story_item', $block['attrs'] );
				} else {
					echo wp_kses( render_block( $block ), 'post' );
				}
			}
			?>
		</div>
		<?php
		$content = ob_get_clean();
		return wp_sprintf(
			'<div %1$s>%2$s</div>',
			$wrapper_attributes,
			$content
		);
	}

	/**
	* Registers the block using the metadata loaded from the `block.json` file.
	* Behind the scenes, it registers also all assets so they can be enqueued
	* through the block editor in the corresponding context.
	*
	* @see https://developer.wordpress.org/reference/functions/register_block_type/
	*/
	public function block_init() {
		register_block_type(
			self::$dir . '/build',
			array(
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}

}

new DailyBriefingSignup(true);
