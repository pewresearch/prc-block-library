/*
 * # Fomantic UI - 2.9.3
 * https://github.com/fomantic/Fomantic-UI
 * https://fomantic-ui.com/
 *
 * Copyright 2023 Contributors
 * Released under the MIT license
 * https://opensource.org/licenses/MIT
 *
 */
!(function (X, t, n) {
	'use strict';
	(t = void 0 !== t && t.Math === Math ? t : globalThis),
		(X.fn.slider = function (D) {
			let S;
			const e = X(this);
			const A = X(n);
			const F = X(t);
			let O = Date.now();
			let j = [];
			const I = D;
			const z = 'string' === typeof I;
			const N = [].slice.call(arguments, 1);
			const B = [
				'A',
				'B',
				'C',
				'D',
				'E',
				'F',
				'G',
				'H',
				'I',
				'J',
				'K',
				'L',
				'M',
				'N',
				'O',
				'P',
				'Q',
				'R',
				'S',
				'T',
				'U',
				'V',
				'W',
				'X',
				'Y',
				'Z',
			];
			let U = 0;
			return (
				e.each(function () {
					let l;
					let r;
					let s;
					let u;
					let e;
					let d;
					let c;
					let t;
					let m;
					let g;
					let v;
					let f;
					let o;
					let b;
					let i;
					let h;
					const p = X.isPlainObject(D)
						? X.extend(!0, {}, X.fn.slider.settings, D)
						: X.extend({}, X.fn.slider.settings);
					const n = p.className;
					const a = p.metadata;
					const V = p.namespace;
					const k = p.error;
					const T = p.keys;
					const w = p.interpretLabel;
					let y = !1;
					const x = `.${V}`;
					const M = `module-${V}`;
					const R = X(this);
					const C = this;
					let P = R.data(M);
					let L = 1;
					var E = {
						initialize() {
							E.debug('Initializing slider', p),
								(h = !0),
								(t = U += 1),
								E.setup.layout(),
								E.setup.labels(),
								E.bind.events(),
								E.read.metadata(),
								E.read.settings(),
								(h = !1),
								E.instantiate();
						},
						instantiate() {
							E.verbose('Storing instance of slider', E),
								(P = E),
								R.data(M, E);
						},
						destroy() {
							E.verbose('Destroying previous slider for', R),
								clearInterval(P.interval),
								E.unbind.events(),
								E.unbind.slidingEvents(),
								R.removeData(M),
								(P = void 0);
						},
						setup: {
							layout() {
								void 0 === R.attr('tabindex') &&
									R.attr('tabindex', 0),
									0 === R.find('.inner').length &&
										R.append(
											'<div class="inner"><div class="track"></div><div class="track-fill"></div><div class="thumb"></div></div>'
										),
									(o = E.get.precision()),
									(s = R.find('.thumb:not(.second)')),
									p.showThumbTooltip &&
										s
											.attr(
												'data-position',
												p.tooltipConfig.position
											)
											.attr(
												'data-variation',
												p.tooltipConfig.variation
											),
									(l = s),
									E.is.range() &&
										(0 === R.find('.thumb.second').length &&
											R.find('.inner').append(
												'<div class="thumb second"></div>'
											),
										(u = R.find('.thumb.second')),
										p.showThumbTooltip &&
											u
												.attr(
													'data-position',
													p.tooltipConfig.position
												)
												.attr(
													'data-variation',
													p.tooltipConfig.variation
												)),
									(e = R.find('.track')),
									(d = R.find('.track-fill')),
									(f = s.width() / 2);
							},
							labels() {
								E.is.labeled() &&
									(0 <
									(c = R.find('.labels:not(.auto)')).length
										? E.setup.customLabel()
										: E.setup.autoLabel(),
									p.showLabelTicks && R.addClass(n.ticked));
							},
							customLabel() {
								let n;
								const e = c.find('.label');
								const a = e.length;
								const o = E.get.min();
								const i = E.get.max();
								e.each(function (e) {
									let t = X(this).attr('data-value');
									(n = t
										? ((t = i < t ? i : t < o ? o : t) -
												o) /
											(i - o)
										: (e + 1) / (a + 1)),
										E.update.labelPosition(n, X(this));
								});
							},
							autoLabel() {
								0 < (c = R.find('.labels')).length
									? c.empty()
									: (c = R.append(
											'<ul class="auto labels"></ul>'
										).find('.labels'));
								for (
									let e = 0, t = E.get.numLabels();
									e <= t;
									e++
								) {
									const n = E.get.label(e);
									var a =
										0 === p.restrictedLabels.length ||
										0 <= p.restrictedLabels.indexOf(n);
									var a =
										'' === n ||
										(!a && 'always' !== p.showLabelTicks)
											? null
											: e % E.get.gapRatio()
												? X(
														'<li class="halftick label"></li>'
													)
												: X(
														`<li class="label">${
															a ? n : ''
														}</li>`
													);
									a &&
										(E.update.labelPosition(e / t, a),
										c.append(a));
								}
							},
						},
						bind: {
							events() {
								E.bind.globalKeyboardEvents(),
									E.bind.keyboardEvents(),
									E.bind.mouseEvents(),
									p.autoAdjustLabels && E.bind.windowEvents();
							},
							keyboardEvents() {
								E.verbose('Binding keyboard events'),
									R.on(`keydown${x}`, E.event.keydown);
							},
							globalKeyboardEvents() {
								A.on(`keydown${x}${t}`, E.event.activateFocus);
							},
							mouseEvents() {
								E.verbose('Binding mouse and touch events'),
									R.find('.track, .thumb, .inner').on(
										`mousedown${x}`,
										(e) => {
											e.stopImmediatePropagation(),
												e.preventDefault(),
												E.event.down(e);
										}
									),
									R.on(`mousedown${x}`, E.event.down),
									R.on(`mouseenter${x}`, (e) => {
										y = !0;
									}),
									R.on(`mouseleave${x}`, (e) => {
										y = !1;
									}),
									R.find('.thumb')
										.on(`touchstart${x}`, E.event.touchDown)
										.on(`touchmove${x}`, E.event.move)
										.on(`touchend${x}`, E.event.up)
										.on(
											`touchcancel${x}`,
											E.event.touchCancel
										);
							},
							slidingEvents() {
								E.verbose(
									'Binding page wide events while handle is being draged'
								),
									A.on(`mousemove${x}`, E.event.move),
									A.on(`mouseup${x}`, E.event.up);
							},
							windowEvents() {
								F.on(`resize${x}`, E.event.resize);
							},
						},
						unbind: {
							events() {
								R.find('.track, .thumb, .inner').off(
									`mousedown${x}`
								),
									R.off(`mousedown${x}`),
									R.off(`mouseenter${x}`),
									R.off(`mouseleave${x}`),
									R.find('.thumb')
										.off(`touchstart${x}`)
										.off(`touchmove${x}`)
										.off(`touchend${x}`)
										.off(`touchcancel${x}`),
									R.off(`keydown${x}`),
									R.off(`focusout${x}`),
									A.off(
										`keydown${x}${t}`,
										E.event.activateFocus
									),
									F.off(`resize${x}`);
							},
							slidingEvents() {
								A.off(`mousemove${x}`), A.off(`mouseup${x}`);
							},
						},
						event: {
							down(e) {
								e.preventDefault(),
									E.is.range()
										? ((e = E.determine.eventPos(e)),
											(e = E.determine.pos(e)),
											(l =
												p.preventCrossover &&
												E.is.range() &&
												E.thumbVal === E.secondThumbVal
													? void (i = e)
													: E.determine.closestThumb(
															e
														)),
											void 0 === b &&
												(b = E.get.currentThumbValue()))
										: void 0 === b && (b = E.get.value()),
									E.is.disabled() || E.bind.slidingEvents();
							},
							touchDown(e) {
								e.preventDefault(),
									e.stopImmediatePropagation(),
									void 0 === r &&
										((l = X(e.target)),
										(e = e.touches ? e : e.originalEvent),
										(r = e.targetTouches[0].identifier),
										void 0 === b &&
											(b = E.get.currentThumbValue()));
							},
							move(e) {
								if (
									('mousemove' === e.type &&
										e.preventDefault(),
									!E.is.disabled())
								) {
									let t = E.determine.valueFromEvent(e);
									if (
										('mousemove' === e.type &&
											void 0 === l &&
											((n = E.determine.eventPos(e)),
											(n = E.determine.pos(n)),
											(l = n < i ? s : u)),
										E.is.range() &&
											(p.minRange || p.maxRange))
									) {
										var n = E.get.currentRangeDiff(t);
										var a = l.hasClass('second');
										if (
											(p.minRange && n < p.minRange) ||
											(p.maxRange && n > p.maxRange) ||
											(p.preventCrossover &&
												!a &&
												t > E.secondThumbVal) ||
											(p.preventCrossover &&
												a &&
												t < E.thumbVal)
										)
											return;
									}
									0 === E.get.step() || E.is.smooth()
										? ((n = E.thumbVal),
											(a = E.secondThumbVal),
											(e =
												E.determine.smoothValueFromEvent(
													e
												)),
											l.hasClass('second')
												? (p.preventCrossover &&
														E.is.range() &&
														((t = Math.max(n, t)),
														(e = Math.max(n, e))),
													(a = t))
												: (p.preventCrossover &&
														E.is.range() &&
														((t = Math.min(a, t)),
														(e = Math.min(a, e))),
													(n = t)),
											(t = Math.abs(n - (a || 0))),
											E.update.position(e),
											p.onMove.call(C, t, n, a))
										: E.update.value(t, (e, t, n) => {
												p.onMove.call(C, e, t, n);
											});
								}
							},
							up(e) {
								let t;
								e.preventDefault(),
									E.is.disabled() ||
										((e = E.determine.valueFromEvent(e)),
										E.is.range() &&
											(p.minRange || p.maxRange) &&
											(void 0 === l &&
												(l =
													e <=
													E.get.currentThumbValue()
														? s
														: u),
											(t = E.get.currentRangeDiff(e)),
											p.minRange && t < p.minRange
												? (e = E.get.edgeValue(
														e,
														p.minRange
													))
												: p.maxRange &&
													t > p.maxRange &&
													(e = E.get.edgeValue(
														e,
														p.maxRange
													))),
										E.set.value(e),
										E.unbind.slidingEvents(),
										(r = void 0) !== b && (b = void 0));
							},
							touchCancel(e) {
								e.preventDefault(),
									(r = void 0) !== b &&
										(E.update.value(b), (b = void 0));
							},
							keydown(e, t) {
								if (
									!E.is.disabled() &&
									(p.preventCrossover &&
										E.is.range() &&
										E.thumbVal === E.secondThumbVal &&
										(l = void 0),
									E.is.focused() && A.trigger(e),
									t || E.is.focused())
								) {
									t = E.determine.keyMovement(e);
									if (0 !== t)
										switch ((e.preventDefault(), t)) {
											case 1:
												E.takeStep();
												break;
											case 2:
												E.takeStep(E.get.multiplier());
												break;
											case -1:
												E.backStep();
												break;
											case -2:
												E.backStep(E.get.multiplier());
										}
								}
							},
							activateFocus(e) {
								E.is.disabled() ||
									E.is.focused() ||
									!E.is.hover() ||
									0 === E.determine.keyMovement(e) ||
									(e.preventDefault(),
									E.event.keydown(e, !0),
									R.trigger('focus'));
							},
							resize(e) {
								L !== E.get.gapRatio() &&
									(E.setup.labels(), (L = E.get.gapRatio()));
							},
						},
						resync() {
							E.verbose(
								'Resyncing thumb position based on value'
							),
								E.is.range() &&
									E.update.position(E.secondThumbVal, u),
								E.update.position(E.thumbVal, s),
								E.setup.labels();
						},
						takeStep(e) {
							e = e || 1;
							let t = E.get.step();
							const n = E.get.currentThumbValue();
							E.verbose('Taking a step'),
								0 < t
									? E.set.value(n + t * e)
									: 0 === t &&
										((t = E.get.precision()),
										E.set.value(
											Math.round((n + e / t) * t) / t
										));
						},
						backStep(e) {
							e = e || 1;
							let t = E.get.step();
							const n = E.get.currentThumbValue();
							E.verbose('Going back a step'),
								0 < t
									? E.set.value(n - t * e)
									: 0 === t &&
										((t = E.get.precision()),
										E.set.value(
											Math.round((n - e / t) * t) / t
										));
						},
						is: {
							range() {
								let e = R.hasClass(n.range);
								return (
									e ||
										(!p.minRange && !p.maxRange) ||
										(R.addClass(n.range), (e = !0)),
									e
								);
							},
							hover() {
								return y;
							},
							focused() {
								return R.is(':focus');
							},
							disabled() {
								return R.hasClass(n.disabled);
							},
							labeled() {
								let e = R.hasClass(n.labeled);
								return (
									!e &&
										(0 < p.restrictedLabels.length ||
											!1 !== p.showLabelTicks) &&
										(R.addClass(n.labeled), (e = !0)),
									e
								);
							},
							reversed() {
								return R.hasClass(n.reversed);
							},
							vertical() {
								return R.hasClass(n.vertical);
							},
							smooth() {
								return p.smooth || R.hasClass(n.smooth);
							},
						},
						get: {
							currentRangeDiff(e) {
								e = l.hasClass('second')
									? E.thumbVal < e
										? e - E.thumbVal
										: E.thumbVal - e
									: E.secondThumbVal > e
										? E.secondThumbVal - e
										: e - E.secondThumbVal;
								return e;
							},
							edgeValue(e, t) {
								return (e = l.hasClass('second')
									? E.thumbVal < e
										? E.thumbVal + t
										: E.thumbVal - t
									: E.secondThumbVal < e
										? E.secondThumbVal + t
										: E.secondThumbVal - t);
							},
							trackOffset() {
								return E.is.vertical()
									? e.offset().top
									: e.offset().left;
							},
							trackLength() {
								return E.is.vertical() ? e.height() : e.width();
							},
							trackLeft() {
								return E.is.vertical()
									? e.position().top
									: e.position().left;
							},
							trackStartPos() {
								return E.is.reversed()
									? E.get.trackLeft() + E.get.trackLength()
									: E.get.trackLeft();
							},
							trackEndPos() {
								return E.is.reversed()
									? E.get.trackLeft()
									: E.get.trackLeft() + E.get.trackLength();
							},
							trackStartMargin() {
								const e = E.is.vertical()
									? E.is.reversed()
										? R.css('padding-bottom')
										: R.css('padding-top')
									: E.is.reversed()
										? R.css('padding-right')
										: R.css('padding-left');
								return e || '0px';
							},
							trackEndMargin() {
								const e = E.is.vertical()
									? E.is.reversed()
										? R.css('padding-top')
										: R.css('padding-bottom')
									: E.is.reversed()
										? R.css('padding-left')
										: R.css('padding-right');
								return e || '0px';
							},
							precision() {
								var e = E.get.step();
								var e =
									((e =
										0 !== e
											? 2 ===
												(e = String(e).split('.'))
													.length
												? e[1].length
												: 0
											: p.decimalPlaces),
									Math.pow(10, e));
								return E.debug('Precision determined', e), e;
							},
							min() {
								return p.min;
							},
							max() {
								const e = E.get.step();
								const t = E.get.min();
								var n = E.get.precision();
								var n =
									0 === e
										? 0
										: Math.floor(
												Math.round(
													((p.max - t) / e) * n
												) / n
											);
								return 0 == (0 === e ? 0 : (p.max - t) % e)
									? p.max
									: t + n * e;
							},
							step() {
								return p.step;
							},
							numLabels() {
								var e = E.get.step();
								const t = E.get.precision();
								var e =
									Math.round(
										((E.get.max() - E.get.min()) /
											(0 === e ? 1 : e)) *
											t
									) / t;
								return (
									E.debug(
										`Determined that there should be ${e} labels`
									),
									e
								);
							},
							labelType() {
								return p.labelType;
							},
							label(e) {
								if (w) return w(e);
								switch (p.labelType) {
									case p.labelTypes.number:
										var t = E.get.step();
										return (
											Math.round(
												(e * (0 === t ? 1 : t) +
													E.get.min()) *
													o
											) / o
										);
									case p.labelTypes.letter:
										return B[e % 26];
									default:
										return e;
								}
							},
							value() {
								return m;
							},
							currentThumbValue() {
								return void 0 !== l && l.hasClass('second')
									? E.secondThumbVal
									: E.thumbVal;
							},
							thumbValue(e) {
								return 'second' !== e
									? E.thumbVal
									: E.is.range()
										? E.secondThumbVal
										: void E.error(k.notrange);
							},
							multiplier() {
								return p.pageMultiplier;
							},
							thumbPosition(e) {
								return 'second' !== e
									? g
									: E.is.range()
										? v
										: void E.error(k.notrange);
							},
							gapRatio() {
								let e = 1;
								if (p.autoAdjustLabels) {
									const t = E.get.numLabels();
									const n = E.get.trackLength();
									let a = 1;
									if (0 < n)
										for (; (n / t) * a < p.labelDistance; )
											t % a || (e = a), (a += 1);
								}
								return e;
							},
						},
						determine: {
							pos(e) {
								return E.is.reversed()
									? E.get.trackStartPos() -
											e +
											E.get.trackOffset()
									: e -
											E.get.trackOffset() -
											E.get.trackStartPos();
							},
							closestThumb(e) {
								var t = parseFloat(E.determine.thumbPos(s));
								var t = Math.abs(e - t);
								const n = parseFloat(E.determine.thumbPos(u));
								var e = Math.abs(e - n);
								return (t !== e ||
									E.get.thumbValue() !== E.get.min()) &&
									t <= e
									? s
									: u;
							},
							closestThumbPos(e) {
								const t = parseFloat(E.determine.thumbPos(s));
								const n = Math.abs(e - t);
								const a = parseFloat(E.determine.thumbPos(u));
								return n <= Math.abs(e - a) ? t : a;
							},
							thumbPos(e) {
								return E.is.vertical()
									? E.is.reversed()
										? e.css('bottom')
										: e.css('top')
									: E.is.reversed()
										? e.css('right')
										: e.css('left');
							},
							positionFromValue(e) {
								const t = E.get.min();
								var n = E.get.max();
								var e = n < e ? n : e < t ? t : e;
								const a = E.get.trackLength();
								var n = Math.round(((e - t) / (n - t)) * a);
								return (
									E.verbose(
										`Determined position: ${n} from value: ${e}`
									),
									n
								);
							},
							positionFromRatio(e) {
								var t = E.get.trackLength();
								var n = E.get.step();
								var t = Math.round(e * t);
								var n = 0 === n ? t : Math.round(t / n) * n;
								return (
									E.verbose(
										`Determined position: ${t} from ratio: ${e}`
									),
									n
								);
							},
							valueFromEvent(e) {
								var e = E.determine.eventPos(e);
								const t = E.determine.pos(e);
								var e =
									e < E.get.trackOffset()
										? E.is.reversed()
											? E.get.max()
											: E.get.min()
										: e >
											  E.get.trackOffset() +
													E.get.trackLength()
											? E.is.reversed()
												? E.get.min()
												: E.get.max()
											: E.determine.value(t);
								return e;
							},
							smoothValueFromEvent(e) {
								const t = E.get.min();
								const n = E.get.max();
								const a = E.get.trackLength();
								var e =
									E.determine.eventPos(e) -
									E.get.trackOffset();
								var e = (e = e < 0 ? 0 : a < e ? a : e) / a;
								return (
									(e = E.is.reversed() ? 1 - e : e) *
										(n - t) +
									t
								);
							},
							eventPos(e) {
								if (
									'touchmove' === e.type ||
									'touchend' === e.type
								) {
									for (
										var t = e.touches ? e : e.originalEvent,
											n = t.changedTouches[0],
											a = 0;
										a < t.touches.length;
										a++
									)
										if (t.touches[a].identifier === r) {
											n = t.touches[a];
											break;
										}
									var o = n.pageY;
									var i = n.pageX;
									return E.is.vertical() ? o : i;
								}
								(o = e.pageY || e.originalEvent.pageY),
									(i = e.pageX || e.originalEvent.pageX);
								return E.is.vertical() ? o : i;
							},
							value(e) {
								var t = E.is.reversed()
									? E.get.trackEndPos()
									: E.get.trackStartPos();
								var t =
									(e - t) /
									((E.is.reversed()
										? E.get.trackStartPos()
										: E.get.trackEndPos()) -
										t);
								var n = E.get.max() - E.get.min();
								const a = E.get.step();
								var t = t * n;
								var n = 0 === a ? t : Math.round(t / a) * a;
								return (
									E.verbose(
										`Determined value based upon position: ${e} as: ${t}`
									),
									t != n &&
										E.verbose(
											`Rounding value to closest step: ${n}`
										),
									E.verbose(
										'Cutting off additional decimal places'
									),
									Math.round((n + E.get.min()) * o) / o
								);
							},
							keyMovement(e) {
								var e = e.which;
								const t =
									!E.is.vertical() || E.is.reversed()
										? T.downArrow
										: T.upArrow;
								const n =
									!E.is.vertical() || E.is.reversed()
										? T.upArrow
										: T.downArrow;
								const a =
									!E.is.vertical() && E.is.reversed()
										? T.rightArrow
										: T.leftArrow;
								const o =
									!E.is.vertical() && E.is.reversed()
										? T.leftArrow
										: T.rightArrow;
								return e === t || e === a
									? -1
									: e === n || e === o
										? 1
										: e === T.pageDown
											? -2
											: e === T.pageUp
												? 2
												: 0;
							},
						},
						handleNewValuePosition(e) {
							const t = E.get.min();
							const n = E.get.max();
							return (
								e <= t ? (e = t) : n <= e && (e = n),
								E.determine.positionFromValue(e)
							);
						},
						set: {
							value(a, o) {
								o = !1 !== o;
								const i = void 0 === b;
								(b = void 0 === b ? E.get.value() : b),
									E.update.value(a, (e, t, n) => {
										(h && !p.fireOnInit) ||
											!o ||
											(a !== b &&
												p.onChange.call(C, e, t, n),
											p.onMove.call(C, e, t, n)),
											i && (b = void 0);
									});
							},
							rangeValue(e, t, n) {
								let a;
								let o;
								let i;
								(n = !1 !== n),
									E.is.range()
										? ((a = E.get.min()),
											(o = E.get.max()),
											(b = (i = void 0 === b)
												? E.get.value()
												: b),
											e <= a
												? (e = a)
												: o <= e && (e = o),
											t <= a
												? (t = a)
												: o <= t && (t = o),
											(E.thumbVal = e),
											(E.secondThumbVal = t),
											(m = Math.abs(
												E.thumbVal - E.secondThumbVal
											)),
											E.update.position(E.thumbVal, s),
											E.update.position(
												E.secondThumbVal,
												u
											),
											(h && !p.fireOnInit) ||
												!n ||
												(m !== b &&
													p.onChange.call(
														C,
														m,
														E.thumbVal,
														E.secondThumbVal
													),
												p.onMove.call(
													C,
													m,
													E.thumbVal,
													E.secondThumbVal
												)),
											i && (b = void 0))
										: E.error(k.notrange);
							},
							position(e, t) {
								e = E.determine.value(e);
								'second' === t
									? ((E.secondThumbVal = e),
										E.update.position(e, u))
									: ((E.thumbVal = e),
										E.update.position(e, s)),
									(m = Math.abs(
										E.thumbVal - (E.secondThumbVal || 0)
									)),
									E.set.value(m);
							},
						},
						update: {
							value(e, t) {
								const n = E.get.min();
								const a = E.get.max();
								e <= n ? (e = n) : a <= e && (e = a),
									E.is.range()
										? ((l =
												void 0 === l
													? e <=
														E.get.currentThumbValue()
														? s
														: u
													: l).hasClass('second')
												? (p.preventCrossover &&
														E.is.range() &&
														(e = Math.max(
															E.thumbVal +
																(p.minRange ||
																	0),
															e
														)),
													(E.secondThumbVal = e))
												: (p.preventCrossover &&
														E.is.range() &&
														(e = Math.min(
															E.secondThumbVal -
																(p.minRange ||
																	0),
															e
														)),
													(E.thumbVal = e)),
											(m = Math.abs(
												E.thumbVal - E.secondThumbVal
											)))
										: ((m = e), (E.thumbVal = m)),
									E.update.position(e),
									E.debug(`Setting slider value to ${m}`),
									'function' === typeof t &&
										t(m, E.thumbVal, E.secondThumbVal);
							},
							position(e, t) {
								const n = E.handleNewValuePosition(e);
								var t = t || l;
								var a = E.thumbVal || E.get.min();
								var o = E.secondThumbVal || E.get.min();
								p.showThumbTooltip &&
									((r = E.get.precision()),
									t.attr(
										'data-tooltip',
										Math.round(e * r) / r
									)),
									E.is.range() && t.hasClass('second')
										? ((v = n), (o = e))
										: ((g = n), (a = e));
								let i;
								var r = E.get.min();
								const s = E.get.max();
								var e = ((e - r) / (s - r)) * 100;
								const u =
									((Math.min(a, o) - r) / (s - r)) * 100;
								var a =
									100 * (1 - (Math.max(a, o) - r) / (s - r));
								var o = E.is.vertical()
									? E.is.reversed()
										? ((i = {
												bottom: `calc(${e}% - ${f}px)`,
												top: 'auto',
											}),
											{
												bottom: `${u}%`,
												top: `${a}%`,
											})
										: ((i = {
												top: `calc(${e}% - ${f}px)`,
												bottom: 'auto',
											}),
											{
												top: `${u}%`,
												bottom: `${a}%`,
											})
									: E.is.reversed()
										? ((i = {
												right: `calc(${e}% - ${f}px)`,
												left: 'auto',
											}),
											{
												right: `${u}%`,
												left: `${a}%`,
											})
										: ((i = {
												left: `calc(${e}% - ${f}px)`,
												right: 'auto',
											}),
											{
												left: `${u}%`,
												right: `${a}%`,
											});
								t.css(i),
									d.css(o),
									E.debug(`Setting slider position to ${n}`);
							},
							labelPosition(e, t) {
								const n = E.get.trackStartMargin();
								const a = E.get.trackEndMargin();
								const o = E.is.vertical()
									? E.is.reversed()
										? 'bottom'
										: 'top'
									: E.is.reversed()
										? 'right'
										: 'left';
								const i =
									E.is.reversed() && !E.is.vertical()
										? ' - '
										: ' + ';
								t.css(
									o,
									`calc(` +
										`(100% - ${n} - ${a}) * ${e}${i}${n})`
								);
							},
						},
						goto: {
							max() {
								E.set.value(E.get.max());
							},
							min() {
								E.set.value(E.get.min());
							},
						},
						read: {
							metadata() {
								const e = {
									thumbVal: R.data(a.thumbVal),
									secondThumbVal: R.data(a.secondThumbVal),
								};
								e.thumbVal &&
									(E.is.range() && e.secondThumbVal
										? (E.debug(
												'Current value set from metadata',
												e.thumbVal,
												e.secondThumbVal
											),
											E.set.rangeValue(
												e.thumbVal,
												e.secondThumbVal
											))
										: (E.debug(
												'Current value set from metadata',
												e.thumbVal
											),
											E.set.value(e.thumbVal)));
							},
							settings() {
								let e;
								!1 !== p.start &&
									(E.is.range()
										? (((e = p.end - p.start) < 0 ||
												(p.minRange &&
													e < p.minRange) ||
												(p.maxRange &&
													e > p.maxRange) ||
												(p.minRange &&
													p.maxRange &&
													p.minRange > p.maxRange)) &&
												E.error(
													k.invalidRanges,
													p.start,
													p.end,
													p.minRange,
													p.maxRange
												),
											E.debug(
												'Start position set from settings',
												p.start,
												p.end
											),
											E.set.rangeValue(p.start, p.end))
										: (E.debug(
												'Start position set from settings',
												p.start
											),
											E.set.value(p.start)));
							},
						},
						setting(e, t) {
							if (
								(E.debug('Changing setting', e, t),
								X.isPlainObject(e))
							)
								X.extend(!0, p, e);
							else {
								if (void 0 === t) return p[e];
								X.isPlainObject(p[e])
									? X.extend(!0, p[e], t)
									: (p[e] = t);
							}
						},
						internal(e, t) {
							if (X.isPlainObject(e)) X.extend(!0, E, e);
							else {
								if (void 0 === t) return E[e];
								E[e] = t;
							}
						},
						debug() {
							!p.silent &&
								p.debug &&
								(p.performance
									? E.performance.log(arguments)
									: ((E.debug = Function.prototype.bind.call(
											console.info,
											console,
											`${p.name}:`
										)),
										E.debug.apply(console, arguments)));
						},
						verbose() {
							!p.silent &&
								p.verbose &&
								p.debug &&
								(p.performance
									? E.performance.log(arguments)
									: ((E.verbose =
											Function.prototype.bind.call(
												console.info,
												console,
												`${p.name}:`
											)),
										E.verbose.apply(console, arguments)));
						},
						error() {
							p.silent ||
								((E.error = Function.prototype.bind.call(
									console.error,
									console,
									`${p.name}:`
								)),
								E.error.apply(console, arguments));
						},
						performance: {
							log(e) {
								let t;
								let n;
								p.performance &&
									((n = (t = Date.now()) - (O || t)),
									(O = t),
									j.push({
										Name: e[0],
										Arguments: [].slice.call(e, 1) || '',
										Element: C,
										'Execution Time': n,
									})),
									clearTimeout(E.performance.timer),
									(E.performance.timer = setTimeout(() => {
										E.performance.display();
									}, 500));
							},
							display() {
								let e = `${p.name}:`;
								let n = 0;
								(O = !1),
									clearTimeout(E.performance.timer),
									X.each(j, (e, t) => {
										n += t['Execution Time'];
									}),
									(e += ` ${n}ms`),
									0 < j.length &&
										(console.groupCollapsed(e),
										console.table
											? console.table(j)
											: X.each(j, (e, t) => {
													console.log(
														`${t.Name}: ${t['Execution Time']}ms`
													);
												}),
										console.groupEnd()),
									(j = []);
							},
						},
						invoke(a, e, t) {
							let o;
							let i;
							let n;
							let r;
							let s = P;
							return (
								(e = e || N),
								(t = t || C),
								'string' === typeof a &&
									void 0 !== s &&
									((a = a.split(/[ .]/)),
									(o = a.length - 1),
									X.each(a, (e, t) => {
										const n =
											e !== o
												? t +
													a[e + 1]
														.charAt(0)
														.toUpperCase() +
													a[e + 1].slice(1)
												: a;
										if (X.isPlainObject(s[n]) && e !== o)
											s = s[n];
										else {
											if (void 0 !== s[n])
												return (i = s[n]), !1;
											{
												if (
													!X.isPlainObject(s[t]) ||
													e === o
												)
													return (
														void 0 !== s[t]
															? (i = s[t])
															: E.error(
																	k.method,
																	a
																),
														!1
													);
												s = s[t];
											}
										}
									})),
								'function' === typeof (r = i) &&
								'number' !== typeof r.nodeType
									? (n = i.apply(t, e))
									: void 0 !== i && (n = i),
								Array.isArray(S)
									? S.push(n)
									: void 0 !== S
										? (S = [S, n])
										: void 0 !== n && (S = n),
								i
							);
						},
					};
					z
						? (void 0 === P && E.initialize(), E.invoke(I))
						: (void 0 !== P && P.invoke('destroy'), E.initialize());
				}),
				void 0 !== S ? S : this
			);
		}),
		(X.fn.slider.settings = {
			silent: !1,
			debug: !1,
			verbose: !1,
			performance: !0,
			name: 'Slider',
			namespace: 'slider',
			error: {
				method: 'The method you called is not defined.',
				notrange: 'This slider is not a range slider',
				invalidRanges:
					'Invalid range settings (start/end/minRange/maxRange)',
			},
			metadata: {
				thumbVal: 'thumbVal',
				secondThumbVal: 'secondThumbVal',
			},
			min: 0,
			max: 20,
			step: 1,
			start: 0,
			end: 20,
			minRange: !1,
			maxRange: !1,
			labelType: 'number',
			showLabelTicks: !1,
			smooth: !1,
			autoAdjustLabels: !0,
			labelDistance: 100,
			preventCrossover: !0,
			fireOnInit: !1,
			interpretLabel: !1,
			decimalPlaces: 2,
			pageMultiplier: 2,
			selector: {},
			className: {
				reversed: 'reversed',
				disabled: 'disabled',
				labeled: 'labeled',
				ticked: 'ticked',
				vertical: 'vertical',
				range: 'range',
				smooth: 'smooth',
			},
			keys: {
				pageUp: 33,
				pageDown: 34,
				leftArrow: 37,
				upArrow: 38,
				rightArrow: 39,
				downArrow: 40,
			},
			restrictedLabels: [],
			showThumbTooltip: !1,
			tooltipConfig: { position: 'top center', variation: 'tiny black' },
			labelTypes: { number: 'number', letter: 'letter' },
			onChange(e, t, n) {},
			onMove(e, t, n) {},
		});
})(jQuery, window, document);
