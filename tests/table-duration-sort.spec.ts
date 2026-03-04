import { test, expect } from '@wordpress/e2e-test-utils-playwright';

const DURATION_TABLE_CONTENT = `<!-- wp:prc-block/table {"isSortable":true,"head":[{"cells":[{"content":"Activity","tag":"th","scope":"col"},{"content":"Duration","tag":"th","scope":"col"}]}],"body":[{"cells":[{"content":"Meeting","tag":"td"},{"content":"13h 15m","tag":"td"}]},{"cells":[{"content":"Workshop","tag":"td"},{"content":"11h 14m","tag":"td"}]},{"cells":[{"content":"Training","tag":"td"},{"content":"13h 10m","tag":"td"}]},{"cells":[{"content":"Sprint","tag":"td"},{"content":"2h","tag":"td"}]},{"cells":[{"content":"Break","tag":"td"},{"content":"90m","tag":"td"}]}]} -->
<figure class="wp-block-prc-block-table is-sortable" data-wp-interactive="prc-block/table" data-wp-context='{"sortColumn":null,"sortDirection":"none","sortableColumns":[]}' data-wp-init="callbacks.onInit"><table class="has-fixed-layout"><thead><tr><th class="is-sortable" data-wp-on--click="actions.onHeaderClick" data-column-index="0" role="button" tabindex="0" scope="col">Activity</th><th class="is-sortable" data-wp-on--click="actions.onHeaderClick" data-column-index="1" role="button" tabindex="0" scope="col">Duration</th></tr></thead><tbody><tr><td>Meeting</td><td>13h 15m</td></tr><tr><td>Workshop</td><td>11h 14m</td></tr><tr><td>Training</td><td>13h 10m</td></tr><tr><td>Sprint</td><td>2h</td></tr><tr><td>Break</td><td>90m</td></tr></tbody></table></figure>
<!-- /wp:prc-block/table -->`;

test.describe('Table Duration Sort', () => {
	let postUrl: string;

	test.beforeAll(async ({ requestUtils }) => {
		const post = await requestUtils.rest({
			path: '/wp/v2/posts',
			method: 'POST',
			data: {
				title: 'Duration Sort Test',
				content: DURATION_TABLE_CONTENT,
				status: 'publish',
			},
		});
		postUrl = post.link;
	});

	test('sorts duration column ascending then descending', async ({
		page,
	}) => {
		await page.goto(postUrl);
		await page.waitForSelector('.wp-block-prc-block-table');

		await page.screenshot({
			path: 'tests/artifacts/duration-sort-initial.png',
			fullPage: true,
		});

		const table = page.locator('.wp-block-prc-block-table');
		const durationHeader = table.locator('thead th', {
			hasText: 'Duration',
		});

		async function readDurationColumn(): Promise<string[]> {
			return table.locator('tbody tr td:nth-child(2)').allTextContents();
		}

		const initial = await readDurationColumn();
		expect(initial).toEqual(['13h 15m', '11h 14m', '13h 10m', '2h', '90m']);

		// Sort ascending
		await durationHeader.click();
		await page.waitForTimeout(300);

		const ascending = await readDurationColumn();
		expect(ascending).toEqual([
			'90m',
			'2h',
			'11h 14m',
			'13h 10m',
			'13h 15m',
		]);

		await page.screenshot({
			path: 'tests/artifacts/duration-sort-ascending.png',
			fullPage: true,
		});

		// Sort descending
		await durationHeader.click();
		await page.waitForTimeout(300);

		const descending = await readDurationColumn();
		expect(descending).toEqual([
			'13h 15m',
			'13h 10m',
			'11h 14m',
			'2h',
			'90m',
		]);

		await page.screenshot({
			path: 'tests/artifacts/duration-sort-descending.png',
			fullPage: true,
		});
	});

	test('sorts hr/min suffix variants correctly', async ({
		page,
		requestUtils,
	}) => {
		const variantContent = `<!-- wp:prc-block/table {"isSortable":true,"head":[{"cells":[{"content":"Task","tag":"th","scope":"col"},{"content":"Time","tag":"th","scope":"col"}]}],"body":[{"cells":[{"content":"A","tag":"td"},{"content":"13hr 10min","tag":"td"}]},{"cells":[{"content":"B","tag":"td"},{"content":"2hrs","tag":"td"}]},{"cells":[{"content":"C","tag":"td"},{"content":"45mins","tag":"td"}]}]} -->
<figure class="wp-block-prc-block-table is-sortable" data-wp-interactive="prc-block/table" data-wp-context='{"sortColumn":null,"sortDirection":"none","sortableColumns":[]}' data-wp-init="callbacks.onInit"><table class="has-fixed-layout"><thead><tr><th class="is-sortable" data-wp-on--click="actions.onHeaderClick" data-column-index="0" role="button" tabindex="0" scope="col">Task</th><th class="is-sortable" data-wp-on--click="actions.onHeaderClick" data-column-index="1" role="button" tabindex="0" scope="col">Time</th></tr></thead><tbody><tr><td>A</td><td>13hr 10min</td></tr><tr><td>B</td><td>2hrs</td></tr><tr><td>C</td><td>45mins</td></tr></tbody></table></figure>
<!-- /wp:prc-block/table -->`;

		const post = await requestUtils.rest({
			path: '/wp/v2/posts',
			method: 'POST',
			data: {
				title: 'Duration Variant Sort Test',
				content: variantContent,
				status: 'publish',
			},
		});

		await page.goto(post.link);
		await page.waitForSelector('.wp-block-prc-block-table');

		const table = page.locator('.wp-block-prc-block-table');
		const timeHeader = table.locator('thead th', { hasText: 'Time' });

		// Sort ascending
		await timeHeader.click();
		await page.waitForTimeout(300);

		const ascending = await table
			.locator('tbody tr td:nth-child(2)')
			.allTextContents();
		// 45mins=45, 2hrs=120, 13hr10min=790
		expect(ascending).toEqual(['45mins', '2hrs', '13hr 10min']);

		await page.screenshot({
			path: 'tests/artifacts/duration-sort-variants.png',
			fullPage: true,
		});
	});
});
