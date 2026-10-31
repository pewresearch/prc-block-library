/**
 * WordPress Dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

/**
 * Internal Dependencies
 */
import { ASK_FIXTURES, GENERATE_FIXTURES } from './fixtures';

const ASK_TIMEOUT_MS = 15000;
// Generate makes one AI call plus two decision-engine calls.
const GENERATE_TIMEOUT_MS = 30000;

const VERDICTS = {
	passed: {
		label: 'Passed',
		help: 'The safety checks found no problems, and every number matches the research.',
	},
	flagged: {
		label: 'Needs a fact check',
		help: 'The safety checks passed, but at least one number does not match the research. An editor should look before this goes out.',
	},
	blocked: {
		label: 'Blocked',
		help: 'At least one safety check scored 70% or higher. In Social Builder, the editor would see an error instead of this copy.',
	},
	unchecked: {
		label: 'Not checked',
		help: 'The decision engine did not answer, so nothing checked this copy. Production shows the copy anyway.',
	},
};

const NUMBER_STATUS_LABELS = {
	verified: 'Matches the research',
	contradicted: 'Contradicts the research',
	unverified: 'Could not confirm',
};

function percent(value) {
	return `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%`;
}

function failureNotice(error) {
	let reason = error?.message || 'The live call failed.';
	if (error?.name === 'TimeoutError' || error?.name === 'AbortError') {
		reason = 'The live call took too long.';
	} else if (error instanceof TypeError) {
		reason = 'The live service could not be reached.';
	}
	return `${reason} Showing a saved example instead.`;
}

async function runAbility(context, input, timeoutMs) {
	const response = await fetch(context.restUrl, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			'X-WP-Nonce': context.restNonce,
		},
		body: JSON.stringify({ input }),
		signal: AbortSignal.timeout(timeoutMs),
	});
	const body = await response.json().catch(() => null);
	if (!response.ok) {
		throw new Error(
			body?.message || `The request failed with HTTP ${response.status}.`
		);
	}
	return body;
}

/**
 * Split copy into plain and number segments so numbers can be highlighted by
 * their check status.
 *
 * @param {string} copy    Generated copy.
 * @param {Array}  numbers Number check results ({ token, status }).
 * @return {Array<{key: number, text: string, status: string|null}>} Segments.
 */
function segmentCopy(copy, numbers) {
	const ranges = [];
	numbers.forEach(({ token, status }) => {
		let from = 0;
		while (from < copy.length) {
			const start = copy.indexOf(token, from);
			if (start === -1) {
				return;
			}
			const end = start + token.length;
			if (!ranges.some((r) => start < r.end && end > r.start)) {
				ranges.push({ start, end, status });
				return;
			}
			from = end;
		}
	});
	ranges.sort((a, b) => a.start - b.start);

	const segments = [];
	let cursor = 0;
	ranges.forEach(({ start, end, status }) => {
		if (start > cursor) {
			segments.push({ text: copy.slice(cursor, start), status: null });
		}
		segments.push({ text: copy.slice(start, end), status });
		cursor = end;
	});
	if (cursor < copy.length) {
		segments.push({ text: copy.slice(cursor), status: null });
	}
	return segments.map((segment, key) => ({ ...segment, key }));
}

function applyAskFixture(context, preset, notice) {
	const fixture = ASK_FIXTURES[preset] || ASK_FIXTURES.partisan;
	context.askText = fixture.text;
	context.askPreset = fixture.result.preset;
	context.askResult = fixture.result;
	context.askIsReplay = true;
	context.askNotice = notice;
}

function applyGenerateFixture(context, notice) {
	const fixture = context.tempt
		? GENERATE_FIXTURES.blocked
		: GENERATE_FIXTURES.passed;
	context.source = fixture.source;
	context.genResult = fixture.result;
	context.genIsReplay = true;
	context.genNotice = notice;
}

const { state } = store('prc-block/decision-engine-demo', {
	state: {
		get isAskTab() {
			return getContext().tab === 'ask';
		},
		get isGenerateTab() {
			return getContext().tab === 'generate';
		},
		get askTabIndex() {
			return state.isAskTab ? '0' : '-1';
		},
		get generateTabIndex() {
			return state.isGenerateTab ? '0' : '-1';
		},
		get isPresetActive() {
			const { askPreset, presetKey } = getContext();
			return askPreset === presetKey;
		},
		get askHasResult() {
			return !!getContext().askResult;
		},
		get askQuestionLabel() {
			const { askResult, presetLabels } = getContext();
			return askResult ? presetLabels[askResult.preset] || '' : '';
		},
		get askValue() {
			const { askResult } = getContext();
			if (!askResult) {
				return '';
			}
			switch (askResult.type) {
				case 'noul':
					return null === askResult.probability
						? 'No answer'
						: `${percent(askResult.probability)} likely`;
				case 'choice':
					return askResult.choiceLabel || 'No answer';
				case 'score':
					return null === askResult.score
						? 'No answer'
						: `${Math.round(askResult.score) + 1} out of ${askResult.levels.length}`;
				default:
					return '';
			}
		},
		get askMeterWidth() {
			const { askResult } = getContext();
			if (!askResult) {
				return '0%';
			}
			switch (askResult.type) {
				case 'noul':
					return percent(askResult.probability ?? 0);
				case 'choice':
					return percent(askResult.confidence ?? 0);
				case 'score':
					return percent(
						(askResult.score ?? 0) /
							Math.max(1, askResult.levels.length - 1)
					);
				default:
					return '0%';
			}
		},
		get askCaption() {
			const { askResult } = getContext();
			if (!askResult) {
				return '';
			}
			switch (askResult.type) {
				case 'noul':
					return 'How likely the engine thinks the answer is "yes."';
				case 'choice':
					return null === askResult.confidence
						? 'The research area the engine picked.'
						: `The engine is ${percent(askResult.confidence)} confident in this pick.`;
				case 'score':
					return askResult.levelLabel || '';
				default:
					return '';
			}
		},
		get genHasResult() {
			return !!getContext().genResult;
		},
		get genCopy() {
			return getContext().genResult?.copy || '';
		},
		get genVerdict() {
			return getContext().genResult?.verdict || '';
		},
		get verdictLabel() {
			return VERDICTS[state.genVerdict]?.label || '';
		},
		get verdictHelp() {
			return VERDICTS[state.genVerdict]?.help || '';
		},
		get thresholdLabel() {
			const threshold = getContext().genResult?.threshold ?? 0.7;
			return `Each bar shows how likely the problem is. A score of ${percent(threshold)} or higher blocks the copy.`;
		},
		get genChecks() {
			return getContext().genResult?.checks || [];
		},
		get checkWidth() {
			return percent(getContext().check.probability ?? 0);
		},
		get checkValue() {
			const { probability } = getContext().check;
			return null === probability ? 'No answer' : percent(probability);
		},
		get genNumbers() {
			return getContext().genResult?.numbers || [];
		},
		get hasNoNumbers() {
			return state.genHasResult && 0 === state.genNumbers.length;
		},
		get numberStatusLabel() {
			const { status } = getContext().number;
			return NUMBER_STATUS_LABELS[status] || status;
		},
		get copySegments() {
			const { genResult } = getContext();
			if (!genResult) {
				return [];
			}
			return segmentCopy(genResult.copy, genResult.numbers || []);
		},
	},
	actions: {
		selectTab(event) {
			getContext().tab = event.currentTarget.dataset.tab;
		},
		onTabKeydown(event) {
			if ('ArrowLeft' !== event.key && 'ArrowRight' !== event.key) {
				return;
			}
			event.preventDefault();
			const context = getContext();
			context.tab = 'ask' === context.tab ? 'generate' : 'ask';
			event.currentTarget.parentElement
				.querySelector(`[data-tab="${context.tab}"]`)
				?.focus();
		},
		useHeadline() {
			const context = getContext();
			context.askText = context.sampleText;
		},
		setAskText(event) {
			getContext().askText = event.target.value;
		},
		useSource() {
			const context = getContext();
			context.source = context.sampleText;
		},
		setSource(event) {
			getContext().source = event.target.value;
		},
		setTempt(event) {
			getContext().tempt = event.target.checked;
		},
		*ask() {
			const context = getContext();
			const preset = context.presetKey;
			context.askPreset = preset;
			context.askLoading = true;
			context.askNotice = '';
			context.askResult = null;
			context.askIsReplay = false;
			try {
				context.askResult = yield runAbility(
					context,
					{ mode: 'ask', text: context.askText, preset },
					ASK_TIMEOUT_MS
				);
			} catch (error) {
				applyAskFixture(context, preset, failureNotice(error));
			} finally {
				context.askLoading = false;
			}
		},
		replayAsk() {
			const context = getContext();
			applyAskFixture(context, context.askPreset, '');
		},
		*generate() {
			const context = getContext();
			context.genLoading = true;
			context.genNotice = '';
			context.genResult = null;
			context.genIsReplay = false;
			try {
				context.genResult = yield runAbility(
					context,
					{
						mode: 'generate',
						source: context.source,
						tempt: context.tempt,
					},
					GENERATE_TIMEOUT_MS
				);
			} catch (error) {
				applyGenerateFixture(context, failureNotice(error));
			} finally {
				context.genLoading = false;
			}
		},
		replayGenerate() {
			applyGenerateFixture(getContext(), '');
		},
	},
});
