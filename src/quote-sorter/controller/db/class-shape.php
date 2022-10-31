<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


class Quote_Sorter_Data extends BerlinDB\Database\Row {

	/**
	 * Quote Sorter constructor.
	 *
	 * @since 1.0.0
	 *
	 * @param $item
	 */
	public function __construct( $item ) {
		parent::__construct( $item );

		// This is optional, but recommended. Set the type of each column, and prepare.
		// $this->id            = (int) $this->id;
		$this->hash       	 = (string) $this->hash;
		$this->quotes        = (string) $this->quotes;
	}

	/**
	 * Retrieves the HTML to display the information about this group of quotes.
	 *
	 * @since 1.0.0
	 *
	 * @return string HTML output to display this record's data.
	 */
	public function display() {
		$result = print_r( $this, true );
		return $result;
	}

}
