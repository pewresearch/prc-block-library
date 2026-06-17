/**
 * Story item helper coverage for unpublished / partial art direction posts.
 *
 * @see fix(block-library): story item block breaks when linking unpublished post (PRC-459)
 */

import { describe, test, expect, jest, beforeEach } from '@jest/globals';

jest.mock('@wordpress/api-fetch', () => jest.fn());
jest.mock('@wordpress/block-editor', () => ({
	useBlockProps: (args) => args,
}));
jest.mock('@wordpress/date', () => ({
	date: jest.fn(() => 'Jun 17, 2026'),
}));

import {
	getArtDirectionSlot,
	getAttributesFromPost,
	STORY_ITEM_ENTITY_STATUSES,
} from '../../src/story-item/helpers.js';

describe('story-item helpers', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('entity search includes unpublished statuses', () => {
		expect(STORY_ITEM_ENTITY_STATUSES).toEqual([
			'publish',
			'draft',
			'future',
		]);
	});

	test('getArtDirectionSlot returns null for missing or partial art direction', () => {
		expect(getArtDirectionSlot(false, 'A1')).toBeNull();
		expect(getArtDirectionSlot({}, 'A1')).toBeNull();
		expect(
			getArtDirectionSlot(
				{ A3: { rawUrl: 'https://example.com/a3.jpg' } },
				'A1'
			)
		).toBeNull();
		expect(
			getArtDirectionSlot({ A1: { chartArt: true } }, 'A1')
		).toBeNull();
	});

	test('getArtDirectionSlot returns slot data when rawUrl is present', () => {
		const slot = {
			rawUrl: 'https://example.com/a1.jpg',
			chartArt: true,
		};

		expect(getArtDirectionSlot({ A1: slot }, 'A1')).toEqual(slot);
	});

	test('getAttributesFromPost skips art direction when slot is unavailable', () => {
		const attrs = getAttributesFromPost(
			{
				id: 42,
				type: 'post',
				link: 'https://example.com/?p=42&preview=true',
				date: '2026-06-17T10:07:06',
				title: { rendered: 'Draft headline' },
				excerpt: { rendered: '<p>Draft excerpt</p>' },
				art_direction: {
					social: { rawUrl: 'https://example.com/social.jpg' },
				},
			},
			{ imageSize: 'A1' }
		);

		expect(attrs).toEqual({
			title: 'Draft headline',
			excerpt: '<p>Draft excerpt</p>',
			url: 'https://example.com/?p=42&preview=true',
			label: 'report',
			date: 'Jun 17, 2026',
			postId: 42,
			postType: 'post',
			image: '',
			isChartArt: false,
		});
	});

	test('getAttributesFromPost maps art direction when slot exists', () => {
		const attrs = getAttributesFromPost(
			{
				id: 7,
				type: 'post',
				link: 'https://example.com/?p=7&preview=true',
				date: '2026-06-17T10:07:06',
				title: { rendered: 'Scheduled headline' },
				excerpt: { rendered: '' },
				art_direction: {
					A1: {
						rawUrl: 'https://example.com/a1.jpg',
						chartArt: false,
					},
				},
			},
			{ imageSize: 'A1' }
		);

		expect(attrs.image).toBe('https://example.com/a1.jpg');
		expect(attrs.isChartArt).toBe(false);
	});
});
