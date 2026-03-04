<?php
/**
 * Color Palette Block
 *
 * Displays the full theme color palette as a design system reference guide,
 * grouped by category with light/dark pairs parsed from light-dark() values.
 *
 * @package PRC\Platform\Blocks
 */

namespace PRC\Platform\Blocks;

/**
 * Block Name:        Color Palette
 * Description:       Displays the full theme color palette as a design system reference guide.
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            Pew Research Center
 *
 * @package           prc-block
 */
class Color_Palette {
	/**
	 * UI color group definitions: slug => group label.
	 */
	private const UI_GROUPS = array(
		'UI — Surfaces & Backgrounds' => array(
			'ui-white',
			'ui-gray-very-light',
			'ui-beige-very-light',
			'ui-beige-light',
		),
		'UI — Text'                   => array(
			'ui-black',
			'ui-text-color',
			'ui-gray-very-dark',
			'ui-gray-dark',
		),
		'UI — Borders & Dividers'     => array(
			'ui-gray-light',
			'ui-beige-dark',
			'ui-beige-very-dark',
		),
		'UI — Links'                  => array(
			'ui-link-color',
			'ui-link-hover-color',
		),
		'UI — Status & Accent'        => array(
			'ui-success',
			'ui-error',
			'ui-mustard',
			'ui-green-dark',
			'ui-brown-dark',
			'ui-blue-dark',
			'ui-purple-dark',
		),
	);

	/**
	 * Constructor
	 *
	 * @param mixed $loader Loader.
	 */
	public function __construct( $loader ) {
		$this->init( $loader );
	}

	/**
	 * Initialize the block
	 *
	 * @param mixed $loader Loader.
	 */
	public function init( $loader = null ) {
		if ( null !== $loader ) {
			$loader->add_action( 'init', $this, 'block_init' );
		}
	}

	/**
	 * Parse a light-dark() CSS value into its light and dark components.
	 *
	 * @param string $value A CSS color value, either plain hex or light-dark(#light, #dark).
	 * @return array{light: string, dark: string|null}
	 */
	private function parse_light_dark( $value ) {
		if ( preg_match( '/^light-dark\(\s*([^,]+?)\s*,\s*([^)]+?)\s*\)$/i', $value, $matches ) ) {
			return array(
				'light' => trim( $matches[1] ),
				'dark'  => trim( $matches[2] ),
			);
		}
		return array(
			'light' => $value,
			'dark'  => null,
		);
	}

	/**
	 * Compute relative luminance of a hex color for text contrast.
	 *
	 * @param string $hex Hex color (e.g. #ffffff).
	 * @return float Luminance between 0 and 1.
	 */
	private function luminance( $hex ) {
		$hex = ltrim( $hex, '#' );
		if ( strlen( $hex ) === 3 ) {
			$hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
		}
		$r = hexdec( substr( $hex, 0, 2 ) ) / 255;
		$g = hexdec( substr( $hex, 2, 2 ) ) / 255;
		$b = hexdec( substr( $hex, 4, 2 ) ) / 255;
		return 0.299 * $r + 0.587 * $g + 0.114 * $b;
	}

	/**
	 * Get contrasting text color for a background.
	 *
	 * @param string $bg_hex Background hex color.
	 * @return string '#000000' or '#ffffff'.
	 */
	private function text_on( $bg_hex ) {
		return $this->luminance( $bg_hex ) > 0.45 ? '#000000' : '#ffffff';
	}

	/**
	 * Group the palette colors into named sections.
	 *
	 * @param array $colors Array of palette entries from theme.json.
	 * @return array Ordered array of ['title' => string, 'colors' => array].
	 */
	private function group_palette( $colors ) {
		// Build a slug => color entry lookup.
		$by_slug = array();
		foreach ( $colors as $color ) {
			$by_slug[ $color['slug'] ] = $color;
		}

		$sections = array();

		// 1. UI groups (explicit slug lists).
		foreach ( self::UI_GROUPS as $title => $slugs ) {
			$group_colors = array();
			foreach ( $slugs as $slug ) {
				if ( isset( $by_slug[ $slug ] ) ) {
					$group_colors[] = $by_slug[ $slug ];
					unset( $by_slug[ $slug ] );
				}
			}
			if ( ! empty( $group_colors ) ) {
				$sections[] = array(
					'title'  => $title,
					'colors' => $group_colors,
				);
			}
		}

		// 2. Spectrum groups (auto-detected from slug pattern: {family}-spectrum-*).
		$spectrum_families = array();
		foreach ( $by_slug as $slug => $color ) {
			if ( preg_match( '/^(.+)-spectrum-(primary|light-one|light-two|light-three|dark-one|dark-two)$/', $slug, $m ) ) {
				$family = $m[1];
				if ( ! isset( $spectrum_families[ $family ] ) ) {
					$spectrum_families[ $family ] = array();
				}
				$spectrum_families[ $family ][] = $color;
			}
		}

		// Sort each spectrum family in display order.
		$shade_order = array(
			'light-one'   => 0,
			'light-two'   => 1,
			'light-three' => 2,
			'primary'     => 3,
			'dark-one'    => 4,
			'dark-two'    => 5,
		);

		foreach ( $spectrum_families as $family => $family_colors ) {
			usort(
				$family_colors,
				function ( $a, $b ) use ( $family, $shade_order ) {
					$a_shade = str_replace( $family . '-spectrum-', '', $a['slug'] );
					$b_shade = str_replace( $family . '-spectrum-', '', $b['slug'] );
					$a_order = $shade_order[ $a_shade ] ?? 99;
					$b_order = $shade_order[ $b_shade ] ?? 99;
					return $a_order - $b_order;
				}
			);

			// Title-case the family name.
			$title = ucwords( str_replace( '-', ' ', $family ) ) . ' Spectrum';

			$sections[] = array(
				'title'  => $title,
				'colors' => $family_colors,
			);
		}

		return $sections;
	}

	/**
	 * Render a single swatch element.
	 *
	 * @param string $hex        The hex color value.
	 * @param string $slug       The color slug (for context).
	 * @param string $mode_label 'light' or 'dark'.
	 * @return string HTML for the swatch.
	 */
	private function render_swatch( $hex, $slug, $mode_label ) {
		$text_color = $this->text_on( $hex );
		$context    = wp_json_encode(
			array(
				'hex'     => strtoupper( $hex ),
				'slug'    => $slug,
				'copied'  => false,
			)
		);

		return sprintf(
			'<div class="color-palette-card__swatch" style="background:%s;color:%s" data-wp-interactive="%s" data-wp-context=\'%s\' data-wp-on--click="actions.copyToClipboard" data-wp-text="context.copied ? \'Copied!\' : context.hex">%s</div>',
			esc_attr( $hex ),
			esc_attr( $text_color ),
			esc_attr( wp_json_encode( array( 'namespace' => 'prc-block/color-palette' ) ) ),
			esc_attr( $context ),
			esc_html( strtoupper( $hex ) )
		);
	}

	/**
	 * Render callback for the block.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content    Block content.
	 * @param object $block      Block object.
	 * @return string
	 */
	public function render_callback( $attributes, $content, $block ) {
		$colors   = wp_get_global_settings( array( 'color', 'palette', 'theme' ) );
		if ( ! is_array( $colors ) || empty( $colors ) ) {
			return '<p>No theme color palette found.</p>';
		}

		$sections = $this->group_palette( $colors );

		$block_wrapper_attrs = get_block_wrapper_attributes();

		ob_start();
		?>
		<div <?php echo $block_wrapper_attrs; ?>>
		<?php foreach ( $sections as $section ) : ?>
			<div class="color-palette-section">
				<h3 class="color-palette-section__title"><?php echo esc_html( $section['title'] ); ?></h3>
				<div class="color-palette-grid">
				<?php foreach ( $section['colors'] as $color ) : ?>
					<?php $parsed = $this->parse_light_dark( $color['color'] ); ?>
					<div class="color-palette-card">
						<div class="color-palette-card__name"><?php echo esc_html( $color['slug'] ); ?></div>
						<div class="color-palette-card__pair">
							<?php echo $this->render_swatch( $parsed['light'], $color['slug'], 'light' ); ?>
							<?php if ( $parsed['dark'] ) : ?>
								<?php echo $this->render_swatch( $parsed['dark'], $color['slug'], 'dark' ); ?>
							<?php endif; ?>
						</div>
						<?php if ( $parsed['dark'] ) : ?>
						<div class="color-palette-card__labels">
							<span>light</span>
							<span>dark</span>
						</div>
						<?php endif; ?>
					</div>
				<?php endforeach; ?>
				</div>
			</div>
		<?php endforeach; ?>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function block_init() {
		register_block_type_from_metadata(
			PRC_BLOCK_LIBRARY_DIR . '/build/color-palette',
			array(
				'render_callback' => array( $this, 'render_callback' ),
			)
		);
	}
}
