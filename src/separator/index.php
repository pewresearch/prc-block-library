<?php

class Separator_Block extends PRC_Block_Library {
	public function __construct( $init = false ) {
		if ( true === $init ) {
			add_filter( 'render_block', array( $this, 'render_divider' ), 10, 2 );
		}
	}

	public function render_divider( $block_content, $block ) {
		if ( 'core/separator' !== $block['blockName'] ) {
			return $block_content;
		}

		$class_names = classNames( 'ui divider', $block['attrs']['className'] );

		return '<div class="' . esc_attr( $class_names ) . '"></div>';
	}
}

new Separator_Block( true );
