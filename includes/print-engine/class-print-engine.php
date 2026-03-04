<?php
/**
 * Print Engine
 *
 * @package PRC\Platform\Blocks
 */
namespace PRC\Platform\Blocks;

use MatthiasMullie\Minify;
use WP_HTML_Tag_Processor;
use WP_Block_Type_Registry;
use WP_Block;

/**
 * Print Engine Supports
 */
class Print_Engine {
	public static $handle = 'prc-block-library-print-engine';
	public static $view_asset_file;
	public static $controls_asset_file;
	public static $version;

	public function __construct( $loader ) {
		self::$view_asset_file     = include plugin_dir_path( __FILE__ ) . 'build/view.asset.php';
		self::$version             = self::$view_asset_file['version'];
		self::$controls_asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';
		require_once plugin_dir_path( __FILE__ ) . '/class-block-print-registry.php';
		$this->init( $loader );
	}

	public function init( $loader ) {
		$loader->add_action( 'init', $this, 'fire_block_print_registration', 5 );
		$loader->add_filter( 'prc_platform_rewrite_query_vars', $this, 'add_query_vars' );
		$loader->add_action( 'template_redirect', $this, 'render_pdf_template' );
		$loader->add_action( 'wp_enqueue_scripts', $this, 'register_view_script' );
		$loader->add_action( 'enqueue_block_editor_assets', $this, 'register_editor_script' );
		$loader->add_action( 'enqueue_block_assets', $this, 'register_style' );
		$loader->add_filter( 'block_type_metadata', $this, 'add_attributes', 100, 1 );
		$loader->add_filter( 'render_block', $this, 'render', 100, 2 );
	}

	/**
	 * Fire the action that allows other plugins to register block print callbacks.
	 *
	 * Runs at init priority 5 so registrations happen before most block work.
	 *
	 * @hook init, 5
	 */
	public function fire_block_print_registration() {
		/**
		 * Fires when plugins should register their block print callbacks and styles.
		 *
		 * Use Block_Print_Registry::register() and Block_Print_Registry::register_style()
		 * inside this action.
		 *
		 * @since 1.0.0
		 */
		do_action( 'prc_print_engine_register_block_callbacks' );
	}

	/**
	 * @hook prc_platform_rewrite_query_vars
	 */
	public function add_query_vars( $qvars ) {
		$qvars[] = 'print';
		$qvars[] = 'printEngineBeta';
		$qvars[] = 'pdf';
		return $qvars;
	}

	/**
	 * Check if the current request is for the PDF view.
	 * Uses the ?pdf=true query parameter.
	 *
	 * @return bool
	 */
	public function is_pdf_view() {
		// Check for ?pdf=true in the URL.
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return isset( $_GET['pdf'] ) && 'true' === $_GET['pdf'];
	}

	/**
	 * Render the PDF template page.
	 * This intercepts the template_redirect and outputs a full HTML page for the PDF view.
	 *
	 * @hook template_redirect
	 */
	public function render_pdf_template() {
		if ( ! $this->is_pdf_view() ) {
			return;
		}

		if ( ! is_singular() ) {
			return;
		}

		global $post;
		if ( ! $post ) {
			return;
		}

		// Prevent caching of the PDF view.
		nocache_headers();

		// Determine if this is a report package and get the appropriate post for cover sheet.
		$is_report   = $this->is_report_package( $post->ID );
		$report_post = $is_report ? $this->get_report_parent_post( $post ) : $post;

		// Get necessary styles.
		$style_url = plugins_url( 'build/view.css', __FILE__ );

		// Build the HTML document.
		?>
		<!DOCTYPE html>
		<html <?php language_attributes(); ?>>
		<head>
			<meta charset="<?php bloginfo( 'charset' ); ?>">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta name="robots" content="noindex, nofollow">
			<title><?php echo esc_html( get_the_title( $report_post ) ); ?> - PDF Preview</title>
			<link rel="stylesheet" href="<?php echo esc_url( $style_url ); ?>">
			<?php wp_head(); ?>
		</head>
		<body class="print-engine-pdf-view">
			<div class="print-engine-pdf-toolbar">
				<button type="button" id="print-engine-download-pdf" class="print-engine-download-btn">
					Download PDF
				</button>
				<button type="button" id="print-engine-print-pdf" class="print-engine-download-btn">
					Print PDF
				</button>
				<button type="button" id="print-engine-web-view" class="print-engine-download-btn" onclick="window.location.href='<?php echo esc_url( get_the_permalink( $report_post ) ); ?>'">
					View on Website
				</button>
			</div>
			<div id="print-engine-content" class="print-engine-pdf-content">
				<?php echo $this->render_cover_sheet( $report_post ); ?>
				<?php echo $this->render_about_page(); ?>
				<?php echo $this->render_table_of_contents( $report_post ); ?>
				<?php if ( $is_report ) : ?>
					<?php echo $this->render_report_content( $report_post ); ?>
				<?php else : ?>
					<?php echo $this->render_article_content( $report_post ); ?>
				<?php endif; ?>
			</div>
			<?php wp_footer(); ?>
		</body>
		</html>
		<?php
		exit;
	}

	/**
	 * @hook wp_enqueue_scripts
	 * @return void
	 */
	public function register_editor_script() {
		wp_enqueue_script(
			self::$handle . '-controls',
			plugins_url( 'build/index.js', __FILE__ ),
			self::$controls_asset_file['dependencies'],
			self::$version,
			true
		);
	}

	public function allow_print_engine() {
		return true === $this->is_pdf_view();
	}

	/**
	 * @hook wp_enqueue_scripts
	 * @return void
	 */
	public function register_view_script() {
		if ( true !== $this->allow_print_engine() ) {
			return;
		}
		wp_enqueue_script(
			self::$handle,
			plugins_url( 'build/view.js', __FILE__ ),
			self::$view_asset_file['dependencies'],
			self::$version,
			true
		);
	}

	public function get_block_names( $filter_by_namespace = null ) {
		$block_names = array();
		$block_types = WP_Block_Type_Registry::get_instance()->get_all_registered();
		foreach ( $block_types as $block_type ) {
			if ( ! is_null( $filter_by_namespace ) && strpos( $block_type->name, $filter_by_namespace ) === 0 ) {
				$block_names[] = $block_type->name;
			} elseif ( is_null( $filter_by_namespace ) ) {
				$block_names[] = $block_type->name;
			}
		}
		return $block_names;
	}

	public function register_block_styles() {
		// Print-view styles: output bare, no @media wrapper.
		// Applies to the print engine web page (?pdf=true).
		$view_styles = Block_Print_Registry::get_all_styles();
		if ( ! empty( $view_styles ) ) {
			$css      = implode( "\n", $view_styles );
			$minifier = new Minify\CSS( $css );
			wp_add_inline_style( self::$handle, $minifier->minify() );
		}

		// @media print styles: wrapped for browser print dialog / html2pdf.
		$print_styles = Block_Print_Registry::get_all_print_styles();
		if ( ! empty( $print_styles ) ) {
			$css      = '@media print { ' . implode( "\n", $print_styles ) . ' }';
			$minifier = new Minify\CSS( $css );
			wp_add_inline_style( self::$handle, $minifier->minify() );
		}
	}

	/**
	 * @hook enqueue_block_assets
	 * @return void
	 */
	public function register_style() {
		if ( true !== $this->allow_print_engine() ) {
			return;
		}
		wp_enqueue_style(
			self::$handle,
			plugins_url( 'build/view.css', __FILE__ ),
			array(),
			self::$version,
		);
		$this->register_block_styles();
	}

	/**
	 * Register additional attributes for the core-group block.
	 *
	 * @hook block_type_metadata 100, 1
	 * @param mixed $metadata
	 * @return mixed
	 */
	public function add_attributes( $metadata ) {
		if ( is_array( $metadata ) && array_key_exists( 'attributes', $metadata ) && ! array_key_exists( 'printEngine', $metadata['attributes'] ) ) {
			$metadata['attributes']['printEngine'] = array(
				'type'    => 'object',
				'default' => array(
					'hideOnPrint'    => false,
					'displayOnPrint' => false,
				),
			);
		}

		return $metadata;
	}

	/**
	 * Check if a post is part of a report package (either parent or chapter).
	 *
	 * @param int $post_id The post ID.
	 * @return bool True if post is a report or part of a report.
	 */
	private function is_report_package( $post_id ) {
		if ( ! function_exists( '\PRC\Platform\Report_Package\is_report_package' ) ) {
			return false;
		}
		return \PRC\Platform\Report_Package\is_report_package( $post_id )
			|| \PRC\Platform\Report_Package\is_chapter_part_of_report_package( $post_id );
	}

	/**
	 * Get the parent report post for a given post.
	 * If the post is already the parent, returns itself.
	 *
	 * @param WP_Post $post The post object.
	 * @return WP_Post|null The parent report post or null if not found.
	 */
	private function get_report_parent_post( $post ) {
		if ( ! function_exists( '\PRC\Platform\Report_Package\get_package_id' ) ) {
			return $post;
		}
		$parent_id   = \PRC\Platform\Report_Package\get_package_id( $post->ID );
		$parent_post = get_post( $parent_id );
		return $parent_post ? $parent_post : $post;
	}

	/**
	 * Get all posts in a report package (parent + chapters) in order.
	 *
	 * @param WP_Post $parent_post The parent report post.
	 * @return array Array of WP_Post objects in order.
	 */
	private function get_all_report_posts( $parent_post ) {
		if ( ! function_exists( '\PRC\Platform\Report_Package\get_package_chapters' ) ) {
			return array( $parent_post );
		}
		$chapters = \PRC\Platform\Report_Package\get_package_chapters( $parent_post->ID );
		if ( empty( $chapters ) ) {
			return array( $parent_post );
		}
		$posts = array();
		foreach ( $chapters as $chapter ) {
			$chapter_post = get_post( $chapter['id'] );
			if ( $chapter_post && 'publish' === $chapter_post->post_status ) {
				$posts[] = $chapter_post;
			}
		}
		return $posts;
	}

	/**
	 * Get the bylines for a post.
	 *
	 * @param int $post_id The post ID.
	 * @return string The formatted bylines HTML.
	 */
	private function get_bylines_html( $post_id ) {
		if ( ! class_exists( '\PRC\Platform\Staff_Bylines\Bylines' ) ) {
			return '';
		}

		$bylines = new \PRC\Platform\Staff_Bylines\Bylines( (int) $post_id );
		if ( is_wp_error( $bylines->bylines ) || false === $bylines->should_display ) {
			return '';
		}

		$bylines_output = $bylines->format( 'string' );
		if ( 2 >= strlen( $bylines_output ) ) {
			return '';
		}

		return '<p class="print-engine-cover__bylines"><strong>BY</strong> ' . esc_html( $bylines_output ) . '</p>';
	}

	/**
	 * Generate recommended citation for a post.
	 *
	 * @param WP_Post $post The post object.
	 * @return string The formatted citation.
	 */
	private function get_recommended_citation( $post ) {
		if ( ! class_exists( '\PRC\Platform\Staff_Bylines\Bylines' ) ) {
			$author_names = get_the_author_meta( 'display_name', $post->post_author );
		} else {
			$bylines = new \PRC\Platform\Staff_Bylines\Bylines( (int) $post->ID );
			if ( is_wp_error( $bylines->bylines ) ) {
				$author_names = get_the_author_meta( 'display_name', $post->post_author );
			} else {
				$author_names = $bylines->format( 'string' );
			}
		}

		$year  = get_the_date( 'Y', $post );
		$title = get_the_title( $post );

		// Try to get DOI from post meta.
		$doi = get_post_meta( $post->ID, 'doi', true );

		$citation = sprintf(
			'%s. %s. "%s" Pew Research Center.',
			esc_html( $author_names ),
			esc_html( $year ),
			esc_html( $title )
		);

		if ( ! empty( $doi ) ) {
			$citation .= ' doi: ' . esc_html( $doi ) . '.';
		}

		return $citation;
	}

	/**
	 * Render the cover sheet for the PDF.
	 *
	 * @param WP_Post $post The post object.
	 * @return string The cover sheet HTML.
	 */
	public function render_cover_sheet( $post ) {
		$title    = get_the_title( $post );
		$subtitle = get_the_excerpt( $post );
		$date     = get_the_date( 'F j, Y', $post );
		$bylines  = $this->get_bylines_html( $post->ID );
		$citation = $this->get_recommended_citation( $post );
		// Use the standard PRC logo from the images directory.
		$logo_url = content_url( '/images/logo-standard.svg' );

		// Get dynamic contact data using Contact_Resolver if available.
		$contact = $this->get_media_contact( $post->ID );

		ob_start();
		?>
		<section class="print-engine-page print-engine-cover">
			<header class="print-engine-cover__header">
				<img src="<?php echo esc_url( $logo_url ); ?>" alt="Pew Research Center" class="print-engine-cover__logo" />
			</header>
			<div class="print-engine-cover__content">
				<p class="print-engine-cover__date">FOR RELEASE <?php echo esc_html( strtoupper( $date ) ); ?></p>
				<h1 class="print-engine-cover__title"><?php echo esc_html( $title ); ?></h1>
				<?php if ( ! empty( $subtitle ) ) : ?>
					<p class="print-engine-cover__subtitle"><?php echo esc_html( $subtitle ); ?></p>
				<?php endif; ?>
				<?php echo $bylines; ?>
			</div>
			<footer class="print-engine-cover__footer">
				<div class="print-engine-cover__media-contacts">
					<h3>FOR MEDIA OR OTHER INQUIRIES:</h3>
					<p>
						<strong><?php echo esc_html( $contact['name'] ); ?></strong><br>
						<?php if ( ! empty( $contact['phone'] ) ) : ?>
							<?php echo esc_html( $contact['phone'] ); ?><br>
						<?php endif; ?>
						<?php if ( ! empty( $contact['email'] ) ) : ?>
							<a href="mailto:<?php echo esc_attr( $contact['email'] ); ?>"><?php echo esc_html( $contact['email'] ); ?></a><br>
						<?php endif; ?>
						<a href="<?php echo esc_url( $contact['url'] ); ?>"><?php echo esc_html( wp_parse_url( $contact['url'], PHP_URL_HOST ) ); ?></a>
					</p>
				</div>
				<div class="print-engine-cover__citation">
					<h3>RECOMMENDED CITATION</h3>
					<p><?php echo $citation; ?></p>
				</div>
			</footer>
		</section>
		<?php
		return ob_get_clean();
	}

	/**
	 * Get the media contact for a post.
	 *
	 * Uses the Contact_Resolver from prc-schema-seo if available,
	 * otherwise falls back to default contact info.
	 *
	 * @param int $post_id The post ID.
	 * @return array Contact data with name, phone, email, url keys.
	 */
	private function get_media_contact( $post_id ) {
		// Try to use Contact_Resolver from prc-schema-seo plugin.
		if ( class_exists( '\PRC\Platform\Schema_SEO\Contact_Resolver' ) ) {
			return \PRC\Platform\Schema_SEO\Contact_Resolver::get_contact_for_post( $post_id );
		}

		// Fallback to default contact info.
		return array(
			'name'  => 'Communications Department',
			'phone' => '202.419.4372',
			'email' => '',
			'url'   => 'https://www.pewresearch.org',
		);
	}

	/**
	 * Render the About Pew Research Center page.
	 *
	 * @return string The about page HTML.
	 */
	public function render_about_page() {
		$current_year = gmdate( 'Y' );

		ob_start();
		?>
		<section class="print-engine-page print-engine-about">
			<header class="print-engine-about__header">
				<span class="print-engine-about__page-number">1</span>
				<span class="print-engine-about__org-name">PEW RESEARCH CENTER</span>
			</header>
			<div class="print-engine-about__content">
				<h2 class="print-engine-about__title">About Pew Research Center</h2>
				<p>Pew Research Center is a nonpartisan, nonadvocacy fact tank that informs the public about the issues, attitudes and trends shaping the world. It does not take policy positions. The Center conducts public opinion polling, demographic research, computational social science research and other data-driven research. It studies politics and policy; news habits and media; the internet and technology; religion; race and ethnicity; international affairs; social, demographic and economic trends; science; research methodology and data science; and immigration and migration. Pew Research Center is a subsidiary of The Pew Charitable Trusts, its primary funder.</p>
				<p class="print-engine-about__copyright">&copy; Pew Research Center <?php echo esc_html( $current_year ); ?></p>
			</div>
			<footer class="print-engine-about__footer">
				<a href="https://www.pewresearch.org">www.pewresearch.org</a>
			</footer>
		</section>
		<?php
		return ob_get_clean();
	}

	/**
	 * Extract H2 headings from post content for table of contents.
	 *
	 * @deprecated 1.0.0 No longer used. The prc-block/table-of-contents block handles TOC generation.
	 * @param WP_Post $post The post object.
	 * @return array Array of heading items with label and anchor.
	 */
	private function extract_headings_from_content( $post ) {
		$content  = $post->post_content;
		$headings = array();

		// Parse blocks to find heading blocks with level 2.
		$blocks = parse_blocks( $content );
		$this->find_headings_in_blocks( $blocks, $headings );

		return $headings;
	}

	/**
	 * Recursively find heading blocks in parsed blocks.
	 *
	 * @deprecated 1.0.0 No longer used. The prc-block/table-of-contents block handles TOC generation.
	 * @param array $blocks   The blocks to search.
	 * @param array $headings Reference to headings array to populate.
	 */
	private function find_headings_in_blocks( $blocks, &$headings ) {
		foreach ( $blocks as $block ) {
			if ( 'core/heading' === $block['blockName'] ) {
				$level = isset( $block['attrs']['level'] ) ? $block['attrs']['level'] : 2;
				if ( 2 === $level ) {
					// Extract text content from the heading.
					$text = wp_strip_all_tags( $block['innerHTML'] );
					$text = trim( $text );
					if ( ! empty( $text ) ) {
						$anchor     = isset( $block['attrs']['anchor'] ) ? $block['attrs']['anchor'] : sanitize_title( $text );
						$headings[] = array(
							'label'  => $text,
							'anchor' => $anchor,
						);
					}
				}
			}

			// Recursively check inner blocks.
			if ( ! empty( $block['innerBlocks'] ) ) {
				$this->find_headings_in_blocks( $block['innerBlocks'], $headings );
			}
		}
	}

	/**
	 * Render the table of contents page.
	 * Uses the prc-block/table-of-contents block which handles report packages automatically.
	 *
	 * @param WP_Post $post The post object.
	 * @return string The table of contents HTML.
	 */
	public function render_table_of_contents( $post ) {
		// Parse the block markup.
		$parsed_block = parse_blocks( '<!-- wp:prc-block/table-of-contents /-->' );
		if ( empty( $parsed_block ) || empty( $parsed_block[0] ) ) {
			return '';
		}

		// Create a WP_Block instance with proper context.
		$block = new \WP_Block(
			$parsed_block[0],
			array(
				'postId' => $post->ID,
			)
		);

		// Render the block.
		$block_content = $block->render( array( 'dynamic' => false ) );

		ob_start();
		?>
		<section class="print-engine-page print-engine-toc">
			<h2 class="print-engine-toc__title">Table of Contents</h2>
			<?php echo $block_content; ?>
		</section>
		<?php
		return ob_get_clean();
	}

	/**
	 * Render the article content.
	 *
	 * @param WP_Post $post The post object.
	 * @return string The article content HTML.
	 */
	public function render_article_content( $post ) {
		// Get the content and apply filters (this will render all blocks).
		$content = apply_filters( 'the_content', $post->post_content );

		ob_start();
		?>
		<article class="print-engine-page print-engine-article">
			<div class="print-engine-article__content">
				<?php echo $content; ?>
			</div>
		</article>
		<?php
		return ob_get_clean();
	}

	/**
	 * Render all chapters of a report package.
	 *
	 * @param WP_Post $report_post The parent report post.
	 * @return string The combined HTML for all chapters.
	 */
	public function render_report_content( $report_post ) {
		$posts  = $this->get_all_report_posts( $report_post );
		$output = '';
		foreach ( $posts as $chapter_post ) {
			$output .= $this->render_chapter_content( $chapter_post );
		}
		return $output;
	}

	/**
	 * Render a single chapter's content.
	 *
	 * @param WP_Post $chapter_post The chapter post object.
	 * @return string The chapter content HTML.
	 */
	private function render_chapter_content( $chapter_post ) {
		$title   = get_the_title( $chapter_post );
		$content = apply_filters( 'the_content', $chapter_post->post_content );

		ob_start();
		?>
		<article class="print-engine-page print-engine-chapter" id="chapter-<?php echo esc_attr( $chapter_post->ID ); ?>">
			<h2 class="print-engine-chapter__title"><?php echo esc_html( $title ); ?></h2>
			<div class="print-engine-chapter__content">
				<?php echo $content; ?>
			</div>
		</article>
		<?php
		return ob_get_clean();
	}

	/**
	 * @hook render_block 100, 2
	 * @param mixed $block_content
	 * @param mixed $block
	 * @return mixed
	 */
	public function render( $block_content, $block ) {
		if ( true !== $this->allow_print_engine() ) {
			return $block_content;
		}
		if ( is_admin() || ! is_string( $block_content ) ) {
			return $block_content;
		}
		// @TODO: Make this a filter that we can declare what post types support the print engine.
		if ( is_singular( 'page' ) ) {
			return $block_content;
		}

		$block_name = $block['blockName'] ?? '';
		$callback   = Block_Print_Registry::get( $block_name );
		if ( $callback ) {
			$post = get_post();
			if ( null !== $post ) {
				$block_content = call_user_func( $callback, $block_content, $block, $post );
				$block_content = apply_filters(
					'prc_print_engine_block_' . $block_name,
					$block_content,
					$block,
					$post
				);
			}
		}

		if ( ! $block['attrs'] ) {
			return $block_content;
		}
		$attributes = array_key_exists( 'attrs', $block ) ? $block['attrs'] : array();
		// Check block visibility.
		$print_options = array();
		if ( array_key_exists( 'blockVisibility', $attributes ) && is_array( $attributes['blockVisibility'] ) && array_key_exists( 'printEngine', $attributes['blockVisibility'] ) ) {
			$print_options = $attributes['blockVisibility']['printEngine'];
		}

		$hide_on_print    = is_array( $print_options ) && array_key_exists( 'hideOnPrint', $print_options ) ? $print_options['hideOnPrint'] : false;
		$display_on_print = is_array( $print_options ) && array_key_exists( 'displayOnPrint', $print_options ) ? $print_options['displayOnPrint'] : false;

		// HTML Attributes
		$w = new WP_HTML_Tag_Processor( $block_content );
		if ( $w->next_tag() ) {
			if ( $hide_on_print ) {
				// @TODO: Check for a query var and render the "print view" using /iframe support and exclude the hide on print blocks explicilty from the markup... but do that later.
				$w->set_attribute( 'data-hide-on-print', 'true' );
			}
			if ( $display_on_print ) {
				$w->set_attribute( 'data-display-on-print', 'true' );
			}
		}

		return $w->get_updated_html();
	}
}
