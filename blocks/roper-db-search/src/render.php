<?php
// PHP file to use when rendering the block type on the server to show on the front end.
// The following variables are exposed to this file:

// $attributes (array): The block attributes.
// $content (string): The block default content.
// $block (WP_Block): The block instance.

$block_attrs = get_block_wrapper_attributes(array());

ob_start();
if ( 'global' === $attributes['type'] ) {
	$src = 'https://ropercenter.cornell.edu/pewglobal/';
	echo wp_kses(
		"<iframe src='{$src}'
		id='frameSec' width: '100%' ></iframe>",
		array( 'iframe' => array(
				'src'               => true,
				'height'            => true,
				'width'             => true,
				'min-width'         => true,
				'frameborder'       => true,
				'allowfullscreen'   => true,
				'hspace'            => true,
				'vspace'            => true,
				'scrolling'         => true,
				'marginwidth'       => true,
				'marginheight'      => true,
				'allowtransparency' => true,
				'name'              => true,
				'id'                => true,
			),
		)
	);
	?>
	<script>
		window.addEventListener(
			"message",
			function (event) {
			if (
				event.origin === "https://www.pewresearch.org/" //iFrame host
			) {
				//Handle back button press
				if ("backEvent" in event.data) {
				history.back();
				} else {
				//Handle bookmarkable
				let url =
					window.location.href.split("?")[0] +
					"?" +
					event.data.searchParams;
				if (
					url != window.location.href &&
					url != window.location.href + "?"
				) {
					history.pushState({ url: url }, "", url);
				}
				}
			}
			},
			false
		);
		//Allows browser back button to work without reloading page
		window.addEventListener("popstate", (event) => {
			let iframe = document.getElementById("frameSec");
			let iframeWindow = iframe.contentWindow || iframe.contentDocument;
			let newParams =
			location.href.split("?").length > 1
				? location.href.split("?")[1]
				: "";
			iframeWindow.postMessage(
			{
				searchParams: newParams,
				historyBack: true,
			},
			"https://www.pewresearch.org/" //iFrame Host
			);
		});

		let iFrame = document.getElementById("frameSec");
		let newSrc =
				iFrame.src +
				(window.location.href.split("?").length > 1
				? "?" + window.location.href.split("?")[1]
				: "");
		if (iFrame.src != newSrc) {
			iFrame.src = newSrc;
		}
	</script>
	<?php
} else {
	wp_enqueue_script('roper-db-search');
	wp_enqueue_style('roper-db-search');
	?>
	<div id="partner">&nbsp;</div>
	<script>
	document.addEventListener("DOMContentLoaded", function(){
		Roper.mountPartnerSearch(document.querySelector('#partner'), {
			apiKey: "<?php echo ROPER_API_KEY;?>",
			subText: "<?php echo $attributes['subText'];?>",
			perPage: <?php echo $attributes['perPage'];?>,
			gridLines: false,
			yearOnly: true,
			primaryColor: '#D1A730',
			backgroundColor: '#ECECE3',
			linkColor: '#BC7B2B'
		});
	});
	</script>
	<?php
}
$content = ob_get_clean();

echo wp_sprintf(
	'<div %1$s>%2$s</div>',
	$block_attrs,
	$content
);
