<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


class Quote_Sorter_Schema extends \BerlinDB\Database\Schema {

	public $columns = array(

		// id
		'id'            => array(
			'name'     => 'id',
			'type'     => 'bigint',
			'length'   => '20',
			'unsigned' => true,
			'extra'    => 'auto_increment',
			'primary'  => true,
			'sortable' => true,
		),

		// hash
		'hash'           => array(
			'name'       => 'hash',
			'type'       => 'mediumtext',
			'unsigned'   => true,
			'searchable' => true,
			'sortable'   => true,
		),

		// quotes
		'quotes'	     => array(
			'name'       => 'quotes',
			'type'       => 'longtext',
			'unsigned'   => true,
			'searchable' => false,
			'sortable'   => false,
		),

	);

}
