<?php
namespace PRC\Platform\Blocks;

use DEFAULT_TECHNICAL_CONTACT;

class PRC_Block_Library_Activator {

	public static function activate() {
		flush_rewrite_rules();

		wp_mail(
			DEFAULT_TECHNICAL_CONTACT,
			'PRC Block Library Activated 🚀',
			'The PRC Block Lirary has been activated on ' . get_site_url()
		);
	}

}
