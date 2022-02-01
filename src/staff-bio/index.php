<?php
use \WPackio as WPackio;

/**
 * Server-side rendering of the `prc-block/menu-link` block.
 *
 * @package gutenberg
 */

class Staff_Bio extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_action( 'init', array( $this, 'register_block' ), 11 );
		}
	}

	public function set_post_type_template() {
		// Set the template for the staff post type to be use this block and see about not allowing it to be removed.
	}

	public function render_block_callback( $attributes, $content, $block ) {
		// global $wp_query;
		// $staff    = new PRC_Core\Hybrid_People();
		// $staff_id = $staff->get_staff_id_from_byline( $wp_query->queried_object->term_id );
		// $staff    = $staff->get_staff( $staff_id );
		// change this...
		// prc_parent_staff_header( $staff )

		// to just attach on this...
		// do_action( 'prc_parent_before_archive_listing' );
		ob_start();
		?>
		<?php echo wp_kses( $content, 'post' ); ?>
		<?php
		return ob_get_clean();
	}

	public function register_block() {
		$enqueue = new WPackio( 'prcBlocksLibrary', 'dist', parent::$version, 'plugin', parent::$plugin_file );

		$registered = $enqueue->register(
			'blocks',
			'staff-bio',
			array(
				'js'        => true,
				'css'       => false,
				'js_dep'    => array(),
				'css_dep'   => array(),
				'in_footer' => true,
				'media'     => 'all',
			)
		);

		register_block_type_from_metadata(
			plugin_dir_path( __DIR__ ) . '/staff-bio',
			array(
				'editor_script'   => array_pop( $registered['js'] )['handle'],
				'render_callback' => array( $this, 'render_block_callback' ),
			)
		);
	}
}

new Staff_Bio( true );
