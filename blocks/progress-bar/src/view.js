/**
 * WordPress Dependencies
 */
import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */
import ProgressBar from './ProgressBar';

domReady(() => {
	if (document.querySelector('.wp-block-prc-block-progress-bar')) {
		const bars = document.querySelectorAll(
			'.wp-block-prc-block-progress-bar'
		);
		bars.forEach((bar) => {
			const attrs = bar.dataset;
			const props = {
				maxWidth: parseFloat(attrs.maxWidth),
				maxValue: parseFloat(attrs.maxValue),
				currentValue: parseFloat(attrs.currentValue),
				labelFormat: attrs.labelFormat,
				axisLabel: attrs.axisLabel,
				axisLabelMaxWidth: parseFloat(attrs.axisLabelMaxWidth),
				axisPadding: parseFloat(attrs.axisPadding),
				labelBarPosition: attrs.labelPosition,
				labelPositionDY: parseInt(attrs.labelPositionDy, 10),
				labelPositionDX: parseInt(attrs.labelPositionDx, 10),
				showAxisLabel: '1' === attrs.showAxisLabel,
				barColor: attrs.barColor,
				backgroundColor: attrs.backgroundColor,
				categoryLabelColor: attrs.categoryLabelColor,
			};
			console.log({ props });
			render(<ProgressBar {...props} />, bar);
		});
	}
});
