/* eslint-disable max-len */
/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * External Dependencies
 */
import html2pdf from 'html2pdf.js';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './print.scss';

/**
 * Generate a PDF filename from the page title.
 *
 * @return {string} The filename for the PDF.
 */
function generatePdfFilename() {
	const title = document.title.replace(' - PDF Preview', '').trim();
	const sanitized = title
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.substring(0, 100);
	return `${sanitized || 'document'}.pdf`;
}

/**
 * Initialize the PDF download button functionality.
 */
function initPdfDownload() {
	const downloadBtn = document.getElementById('print-engine-download-pdf');
	const contentEl = document.getElementById('print-engine-content');

	if (!downloadBtn || !contentEl) {
		return;
	}

	downloadBtn.addEventListener('click', async (event) => {
		event.preventDefault();

		// Update button state
		const originalText = downloadBtn.textContent;
		downloadBtn.textContent = 'Generating PDF...';
		downloadBtn.disabled = true;

		try {
			const filename = generatePdfFilename();

			const options = {
				margin: 0,
				filename,
				image: { type: 'jpeg', quality: 0.98 },
				html2canvas: {
					scale: 2,
					useCORS: true,
					letterRendering: true,
					logging: false,
				},
				jsPDF: {
					unit: 'in',
					format: 'letter',
					orientation: 'portrait',
				},
				pagebreak: {
					mode: ['css', 'legacy'],
					before: '.print-engine-page',
				},
			};

			await html2pdf().set(options).from(contentEl).save();
		} catch (error) {
			console.error('PDF generation failed:', error);
			alert('Failed to generate PDF. Please try using your browser\'s print function (Ctrl/Cmd + P) and select "Save as PDF".');
		} finally {
			// Restore button state
			downloadBtn.textContent = originalText;
			downloadBtn.disabled = false;
		}
	});
}

/**
 * Initialize the PDF print button functionality.
 */
function initPdfPrint() {
	const printBtn = document.getElementById('print-engine-print-pdf');

	if (!printBtn) {
		return;
	}

	printBtn.addEventListener('click', (event) => {
		event.preventDefault();
		window.print();
	});
}
/**
 * Get the PDF view URL for the current page.
 *
 * @return {string} The PDF view URL with ?pdf=true query parameter.
 */
function getPdfViewUrl() {
	const url = new URL(window.location.href);
	url.searchParams.set('pdf', 'true');
	return url.toString();
}

/**
 * Generate PDF from the PDF view content.
 *
 * @param {HTMLElement} linkElement The link element that was clicked (for status updates).
 */
async function generatePdfFromEndpoint(linkElement) {
	const originalText = linkElement.textContent;
	linkElement.textContent = 'Generating PDF...';
	linkElement.style.pointerEvents = 'none';

	try {
		const pdfUrl = getPdfViewUrl();

		// Create a hidden iframe to load the PDF view
		const iframe = document.createElement('iframe');
		iframe.style.cssText =
			'position: absolute; left: -9999px; width: 8.5in; height: 11in;';
		document.body.appendChild(iframe);

		// Wait for iframe to load
		await new Promise((resolve, reject) => {
			iframe.onload = resolve;
			iframe.onerror = reject;
			iframe.src = pdfUrl;

			// Timeout after 30 seconds
			setTimeout(() => reject(new Error('Timeout loading PDF view')), 30000);
		});

		// Get the content element from the iframe
		const iframeDoc =
			iframe.contentDocument || iframe.contentWindow.document;
		const contentEl = iframeDoc.getElementById('print-engine-content');

		if (!contentEl) {
			throw new Error('Could not find print-engine-content in PDF view');
		}

		// Generate filename from the iframe document title
		const title = iframeDoc.title.replace(' - PDF Preview', '').trim();
		const filename =
			title
				.toLowerCase()
				.replace(/[^a-z0-9\s-]/g, '')
				.replace(/\s+/g, '-')
				.substring(0, 100) || 'document';

		const options = {
			margin: 0,
			filename: `${filename}.pdf`,
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: {
				scale: 2,
				useCORS: true,
				letterRendering: true,
				logging: false,
			},
			jsPDF: {
				unit: 'in',
				format: 'letter',
				orientation: 'portrait',
			},
			pagebreak: {
				mode: ['css', 'legacy'],
				before: '.print-engine-page',
			},
		};

		await html2pdf().set(options).from(contentEl).save();

		// Clean up iframe
		document.body.removeChild(iframe);
	} catch (error) {
		console.error('PDF generation failed:', error);
		// Fallback: open the PDF view in a new tab
		window.open(getPdfViewUrl(), '_blank');
	} finally {
		linkElement.textContent = originalText;
		linkElement.style.pointerEvents = '';
	}
}

/**
 * Initialize the legacy print engine beta functionality.
 * When clicked, generates a PDF from the ?pdf=true view.
 */
function initLegacyPrintEngine() {
	const printEngineLink = document.querySelector(
		'li[data-material-type="printEngineBeta"] a'
	);

	if (printEngineLink) {
		printEngineLink.addEventListener('click', (event) => {
			event.preventDefault();
			generatePdfFromEndpoint(printEngineLink);
		});
	}
}

domReady(() => {
	console.log('🖨️ Print Engine is ready!');

	// Check if we're on the PDF view page
	const isPdfView = document.body.classList.contains('print-engine-pdf-view');

	if (isPdfView) {
		initPdfDownload();
		initPdfPrint();
	} else {
		// Legacy functionality for printEngineBeta
		initLegacyPrintEngine();

		window.addEventListener('beforeprint', (event) => {
			console.log('Before print do these actions...', event);
		});
	}
});
