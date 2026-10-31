<?php
/**
 * Server render for the decision engine demo block.
 *
 * @package PRC\Platform\Blocks
 *
 * Variables exposed by WordPress:
 *   array    $attributes Block attributes.
 *   string   $content    Block default content (unused).
 *   WP_Block $block      Block instance.
 */

if ( ! current_user_can( 'edit_posts' ) ) {
	return '';
}

$uid = wp_unique_id( 'prc-decision-engine-demo-' );

$headlines = array(
	__( 'A majority of U.S. adults say they get at least some news from social media.', 'prc-block-library' ),
	__( 'Congress must stop the reckless spending that is wrecking our economy, now.', 'prc-block-library' ),
	__( 'Fewer Americans say religion is gaining influence in public life.', 'prc-block-library' ),
	__( 'Town council approves new parking signs on Main Street.', 'prc-block-library' ),
);

$presets = array(
	'partisan'   => __( 'Is this partisan?', 'prc-block-library' ),
	'beat'       => __( 'Which research area is this?', 'prc-block-library' ),
	'newsworthy' => __( 'How newsworthy is this?', 'prc-block-library' ),
);

$passages = array(
	array(
		'label' => __( 'Teens and AI chatbots', 'prc-block-library' ),
		'text'  => __( 'In a survey of U.S. teens ages 13 to 17, 26% say they have used an AI chatbot for schoolwork, up from 13% two years earlier. Older teens are more likely than younger teens to say they have done this: 31% of those ages 15 to 17 say so, compared with 20% of those ages 13 to 14. About half of teens (54%) say it is acceptable to use chatbots to research new topics, while 18% say the same about writing essays.', 'prc-block-library' ),
	),
	array(
		'label' => __( 'News on social media', 'prc-block-library' ),
		'text'  => __( 'Just over half of U.S. adults (53%) say they at least sometimes get news from social media. About a third (34%) say they regularly get news on YouTube, and 30% say the same about Facebook. Adults under 30 are much more likely than those 65 and older to regularly get news on TikTok (43% vs. 5%).', 'prc-block-library' ),
	),
	array(
		'label' => __( 'Religion in public life', 'prc-block-library' ),
		'text'  => __( 'About half of U.S. adults (49%) say religion is losing influence in American life, while 18% say it is gaining influence. Among those who say religion is losing influence, 74% say this is a bad thing.', 'prc-block-library' ),
	),
);

$context = array(
	'restUrl'      => rest_url( 'wp-abilities/v1/abilities/prc-ai/decision-engine-demo/run' ),
	'restNonce'    => wp_create_nonce( 'wp_rest' ),
	'presetLabels' => $presets,
	'tab'          => 'ask',
	'askText'      => $headlines[0],
	'askPreset'    => '',
	'askLoading'   => false,
	'askResult'    => null,
	'askNotice'    => '',
	'askIsReplay'  => false,
	'source'       => $passages[0]['text'],
	'tempt'        => false,
	'genLoading'   => false,
	'genResult'    => null,
	'genNotice'    => '',
	'genIsReplay'  => false,
);

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'data-wp-interactive' => 'prc-block/decision-engine-demo',
		'data-wp-context'     => wp_json_encode( $context ),
	)
);
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_block_wrapper_attributes() ?>>
	<header class="wp-block-prc-block-decision-engine-demo__intro">
		<h2 class="wp-block-prc-block-decision-engine-demo__title"><?php esc_html_e( 'Meet the decision engine', 'prc-block-library' ); ?></h2>
		<p><?php esc_html_e( 'The decision engine does not write anything. It answers closed questions about a piece of text: yes or no, pick one option, or rate on a scale. Each answer comes with a score, and our code uses those scores to decide what happens next.', 'prc-block-library' ); ?></p>
	</header>

	<div class="wp-block-prc-block-decision-engine-demo__tabs" role="tablist">
		<button
			type="button"
			role="tab"
			id="<?php echo esc_attr( $uid . '-tab-ask' ); ?>"
			aria-controls="<?php echo esc_attr( $uid . '-panel-ask' ); ?>"
			aria-selected="true"
			class="wp-block-prc-block-decision-engine-demo__tab"
			data-tab="ask"
			data-wp-bind--aria-selected="state.isAskTab"
			data-wp-bind--tabindex="state.askTabIndex"
			data-wp-on--click="actions.selectTab"
			data-wp-on--keydown="actions.onTabKeydown"
		>
			<?php esc_html_e( '1. Ask the engine', 'prc-block-library' ); ?>
		</button>
		<button
			type="button"
			role="tab"
			id="<?php echo esc_attr( $uid . '-tab-generate' ); ?>"
			aria-controls="<?php echo esc_attr( $uid . '-panel-generate' ); ?>"
			aria-selected="false"
			tabindex="-1"
			class="wp-block-prc-block-decision-engine-demo__tab"
			data-tab="generate"
			data-wp-bind--aria-selected="state.isGenerateTab"
			data-wp-bind--tabindex="state.generateTabIndex"
			data-wp-on--click="actions.selectTab"
			data-wp-on--keydown="actions.onTabKeydown"
		>
			<?php esc_html_e( '2. AI writing, with and without the engine', 'prc-block-library' ); ?>
		</button>
	</div>

	<section
		class="wp-block-prc-block-decision-engine-demo__panel"
		role="tabpanel"
		id="<?php echo esc_attr( $uid . '-panel-ask' ); ?>"
		aria-labelledby="<?php echo esc_attr( $uid . '-tab-ask' ); ?>"
		data-wp-bind--hidden="!state.isAskTab"
	>
		<p class="wp-block-prc-block-decision-engine-demo__lede"><?php esc_html_e( 'Pick a headline or type your own. Then ask the engine a question about it. No AI writing happens in this step.', 'prc-block-library' ); ?></p>

		<div class="wp-block-prc-block-decision-engine-demo__samples">
			<?php foreach ( $headlines as $headline ) : ?>
				<button
					type="button"
					class="wp-block-prc-block-decision-engine-demo__chip"
					data-wp-context="<?php echo esc_attr( wp_json_encode( array( 'sampleText' => $headline ) ) ); ?>"
					data-wp-on--click="actions.useHeadline"
				><?php echo esc_html( $headline ); ?></button>
			<?php endforeach; ?>
		</div>

		<label class="wp-block-prc-block-decision-engine-demo__label" for="<?php echo esc_attr( $uid . '-ask-text' ); ?>"><?php esc_html_e( 'Headline or short text', 'prc-block-library' ); ?></label>
		<textarea
			id="<?php echo esc_attr( $uid . '-ask-text' ); ?>"
			class="wp-block-prc-block-decision-engine-demo__textarea"
			rows="3"
			data-wp-bind--value="context.askText"
			data-wp-on--input="actions.setAskText"
		><?php echo esc_textarea( $headlines[0] ); ?></textarea>

		<div class="wp-block-prc-block-decision-engine-demo__actions">
			<?php foreach ( $presets as $preset_key => $preset_label ) : ?>
				<button
					type="button"
					class="wp-block-prc-block-decision-engine-demo__button"
					data-wp-context="<?php echo esc_attr( wp_json_encode( array( 'presetKey' => $preset_key ) ) ); ?>"
					data-wp-class--is-active="state.isPresetActive"
					data-wp-bind--disabled="context.askLoading"
					data-wp-on--click="actions.ask"
				><?php echo esc_html( $preset_label ); ?></button>
			<?php endforeach; ?>
			<button
				type="button"
				class="wp-block-prc-block-decision-engine-demo__button wp-block-prc-block-decision-engine-demo__button--quiet"
				data-wp-bind--disabled="context.askLoading"
				data-wp-on--click="actions.replayAsk"
			><?php esc_html_e( 'Replay saved example', 'prc-block-library' ); ?></button>
		</div>

		<p class="wp-block-prc-block-decision-engine-demo__loading" role="status" hidden data-wp-bind--hidden="!context.askLoading"><?php esc_html_e( 'Asking the engine…', 'prc-block-library' ); ?></p>
		<p class="wp-block-prc-block-decision-engine-demo__notice" hidden data-wp-bind--hidden="!context.askNotice" data-wp-text="context.askNotice"></p>

		<div class="wp-block-prc-block-decision-engine-demo__result" aria-live="polite" hidden data-wp-bind--hidden="!state.askHasResult">
			<span class="wp-block-prc-block-decision-engine-demo__replay-tag" hidden data-wp-bind--hidden="!context.askIsReplay"><?php esc_html_e( 'Saved example', 'prc-block-library' ); ?></span>
			<p class="wp-block-prc-block-decision-engine-demo__result-question" data-wp-text="state.askQuestionLabel"></p>
			<p class="wp-block-prc-block-decision-engine-demo__result-value" data-wp-text="state.askValue"></p>
			<div class="wp-block-prc-block-decision-engine-demo__meter" aria-hidden="true">
				<span class="wp-block-prc-block-decision-engine-demo__meter-fill" data-wp-style--width="state.askMeterWidth"></span>
			</div>
			<p class="wp-block-prc-block-decision-engine-demo__caption" data-wp-text="state.askCaption"></p>
		</div>
	</section>

	<section
		class="wp-block-prc-block-decision-engine-demo__panel"
		role="tabpanel"
		id="<?php echo esc_attr( $uid . '-panel-generate' ); ?>"
		aria-labelledby="<?php echo esc_attr( $uid . '-tab-generate' ); ?>"
		hidden
		data-wp-bind--hidden="!state.isGenerateTab"
	>
		<p class="wp-block-prc-block-decision-engine-demo__lede"><?php esc_html_e( 'Pick a research passage and click Generate. The AI writes a social post. Then the decision engine checks that post the same way Social Builder does today.', 'prc-block-library' ); ?></p>

		<div class="wp-block-prc-block-decision-engine-demo__samples">
			<?php foreach ( $passages as $passage ) : ?>
				<button
					type="button"
					class="wp-block-prc-block-decision-engine-demo__chip"
					data-wp-context="<?php echo esc_attr( wp_json_encode( array( 'sampleText' => $passage['text'] ) ) ); ?>"
					data-wp-on--click="actions.useSource"
				><?php echo esc_html( $passage['label'] ); ?></button>
			<?php endforeach; ?>
		</div>

		<label class="wp-block-prc-block-decision-engine-demo__label" for="<?php echo esc_attr( $uid . '-source' ); ?>"><?php esc_html_e( 'Research passage', 'prc-block-library' ); ?></label>
		<textarea
			id="<?php echo esc_attr( $uid . '-source' ); ?>"
			class="wp-block-prc-block-decision-engine-demo__textarea"
			rows="6"
			data-wp-bind--value="context.source"
			data-wp-on--input="actions.setSource"
		><?php echo esc_textarea( $passages[0]['text'] ); ?></textarea>
		<p class="wp-block-prc-block-decision-engine-demo__caption"><?php esc_html_e( 'Sample passages are written for this demo. They are not published findings.', 'prc-block-library' ); ?></p>

		<label class="wp-block-prc-block-decision-engine-demo__toggle">
			<input type="checkbox" data-wp-bind--checked="context.tempt" data-wp-on--change="actions.setTempt" />
			<span><?php esc_html_e( 'Tempt the AI: ask it to be persuasive and round the numbers up', 'prc-block-library' ); ?></span>
		</label>

		<div class="wp-block-prc-block-decision-engine-demo__actions">
			<button
				type="button"
				class="wp-block-prc-block-decision-engine-demo__button wp-block-prc-block-decision-engine-demo__button--primary"
				data-wp-bind--disabled="context.genLoading"
				data-wp-on--click="actions.generate"
			><?php esc_html_e( 'Generate social post', 'prc-block-library' ); ?></button>
			<button
				type="button"
				class="wp-block-prc-block-decision-engine-demo__button wp-block-prc-block-decision-engine-demo__button--quiet"
				data-wp-bind--disabled="context.genLoading"
				data-wp-on--click="actions.replayGenerate"
			><?php esc_html_e( 'Replay saved example', 'prc-block-library' ); ?></button>
		</div>

		<p class="wp-block-prc-block-decision-engine-demo__loading" role="status" hidden data-wp-bind--hidden="!context.genLoading"><?php esc_html_e( 'Writing the post and running the checks. This can take several seconds…', 'prc-block-library' ); ?></p>
		<p class="wp-block-prc-block-decision-engine-demo__notice" hidden data-wp-bind--hidden="!context.genNotice" data-wp-text="context.genNotice"></p>

		<div class="wp-block-prc-block-decision-engine-demo__compare" aria-live="polite" hidden data-wp-bind--hidden="!state.genHasResult">
			<article class="wp-block-prc-block-decision-engine-demo__column">
				<h3 class="wp-block-prc-block-decision-engine-demo__column-title"><?php esc_html_e( 'AI alone', 'prc-block-library' ); ?></h3>
				<p class="wp-block-prc-block-decision-engine-demo__copy" data-wp-text="state.genCopy"></p>
				<p class="wp-block-prc-block-decision-engine-demo__caption"><?php esc_html_e( 'Without the decision engine, this copy goes straight to the editor. Nothing has checked its tone or its numbers.', 'prc-block-library' ); ?></p>
			</article>

			<article class="wp-block-prc-block-decision-engine-demo__column wp-block-prc-block-decision-engine-demo__column--engine">
				<h3 class="wp-block-prc-block-decision-engine-demo__column-title"><?php esc_html_e( 'AI + decision engine', 'prc-block-library' ); ?></h3>
				<span class="wp-block-prc-block-decision-engine-demo__replay-tag" hidden data-wp-bind--hidden="!context.genIsReplay"><?php esc_html_e( 'Saved example', 'prc-block-library' ); ?></span>
				<p class="wp-block-prc-block-decision-engine-demo__verdict" data-wp-bind--data-status="state.genVerdict" data-wp-text="state.verdictLabel"></p>
				<p class="wp-block-prc-block-decision-engine-demo__caption" data-wp-text="state.verdictHelp"></p>

				<p class="wp-block-prc-block-decision-engine-demo__copy">
					<template data-wp-each--segment="state.copySegments" data-wp-each-key="context.segment.key">
						<span data-wp-bind--data-status="context.segment.status" data-wp-text="context.segment.text"></span>
					</template>
				</p>

				<h4 class="wp-block-prc-block-decision-engine-demo__subhead"><?php esc_html_e( 'Safety checks', 'prc-block-library' ); ?></h4>
				<p class="wp-block-prc-block-decision-engine-demo__caption" data-wp-text="state.thresholdLabel"></p>
				<ul class="wp-block-prc-block-decision-engine-demo__checks">
					<template data-wp-each--check="state.genChecks" data-wp-each-key="context.check.id">
						<li class="wp-block-prc-block-decision-engine-demo__check" data-wp-class--is-tripped="context.check.tripped">
							<span class="wp-block-prc-block-decision-engine-demo__check-label" data-wp-text="context.check.label"></span>
							<span class="wp-block-prc-block-decision-engine-demo__meter" aria-hidden="true">
								<span class="wp-block-prc-block-decision-engine-demo__meter-fill" data-wp-style--width="state.checkWidth"></span>
							</span>
							<span class="wp-block-prc-block-decision-engine-demo__check-value" data-wp-text="state.checkValue"></span>
						</li>
					</template>
				</ul>

				<h4 class="wp-block-prc-block-decision-engine-demo__subhead"><?php esc_html_e( 'Number check', 'prc-block-library' ); ?></h4>
				<p class="wp-block-prc-block-decision-engine-demo__caption" hidden data-wp-bind--hidden="!state.hasNoNumbers"><?php esc_html_e( 'The post has no numbers to check.', 'prc-block-library' ); ?></p>
				<ul class="wp-block-prc-block-decision-engine-demo__numbers">
					<template data-wp-each--number="state.genNumbers" data-wp-each-key="context.number.token">
						<li class="wp-block-prc-block-decision-engine-demo__number" data-wp-bind--data-status="context.number.status">
							<span class="wp-block-prc-block-decision-engine-demo__number-token" data-wp-text="context.number.token"></span>
							<span data-wp-text="state.numberStatusLabel"></span>
						</li>
					</template>
				</ul>
			</article>
		</div>
	</section>
</div>
