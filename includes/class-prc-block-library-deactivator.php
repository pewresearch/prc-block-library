<?php
namespace PRC\Platform\Blocks;

use DEFAULT_TECHNICAL_CONTACT;

class PRC_Block_Library_Deactivator {

	public static function deactivate() {
		flush_rewrite_rules();

		wp_mail(
			DEFAULT_TECHNICAL_CONTACT,
			'PRC Block Library Deactivated 👻',
			'The PRC Block Library has been deactivated on ' . get_site_url()
		);
	}
}
