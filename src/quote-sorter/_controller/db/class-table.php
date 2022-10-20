<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


class Quote_Sorter_Table extends \BerlinDB\Database\Table {

	/**
	 * Table name, without the global table prefix.
	 *
	 * @since 1.0.0
	 * @var   string
	 */
	public $name = 'prc_quote_sorter';

	/**
	 * Database version key (saved in _options or _sitemeta)
	 *
	 * @since 1.0.0
	 * @var   string
	 */
	protected $db_version_key = 'quote_sorter_version';

	/**
	 * Optional description.
	 *
	 * @since 1.0.0
	 * @var   string
	 */
	public $description = 'Quote data for interactive sorters.';

	/**
	 * Database version.
	 *
	 * @since 1.0.0
	 * @var   mixed
	 */
	protected $version = '1.0.6';

	/**
	 * Key => value array of versions => methods.
	 *
	 * @since 1.0.0
	 * @var   array
	 */
	protected $upgrades = array();

	/**
	 * Setup this database table.
	 *
	 * @since 1.0.0
	 */
	protected function set_schema() {
		// id  bigint(20) NOT NULL AUTO_INCREMENT,
		$this->schema = '
			id  bigint(20) NOT NULL AUTO_INCREMENT,
			hash           mediumtext NOT NULL,
			quotes          longtext NOT NULL,
			PRIMARY KEY (id)
			';
	}
}
