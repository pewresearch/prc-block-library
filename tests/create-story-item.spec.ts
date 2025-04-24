import { test, expect } from '@wordpress/e2e-test-utils-playwright';

const testTitle = 'Testing Story Item';
const todaysDate = new Date().toLocaleDateString('en-US', {
	month: 'long',
	day: 'numeric',
	year: 'numeric',
});
const testContent = `<!-- wp:prc-block/story-item {"date":"${todaysDate}","postId":0} /-->`;

test.describe('Create Story Item', () => {
	test('Post with story item created', async ({
		admin,
		editor,
		requestUtils,
		page,
	}) => {
		// Create a new feature.
		await admin.createNewPost({
			title: testTitle,
			postType: 'post',
		});
		await editor.setContent(testContent);
		// Publish the post.
		await editor.publishPost();
		// Get the created feature via REST API.
		const posts = await requestUtils.rest({
			path: '/wp/v2/post',
			method: 'GET',
		});
		// Get the first item out of the posts array.
		const post = posts?.[0];
		// Verify the post was created with correct title and content.
		expect(post.content.rendered).toBe(testContent);
		// Create a screenshot of the post.
		const today = new Date();
		// This gives 'YYYY-MM-DD' format.
		const formattedDate = today.toISOString().split('T')[0];
		// Take a screenshot of the post.
		await page.screenshot({
			path: `tests/artifacts/post-${formattedDate}.png`,
		});
	});
});
