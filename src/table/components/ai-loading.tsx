/**
 * External Dependencies
 */
import React from 'react';

/**
 * WordPress Dependencies
 */
import { Spinner } from '@wordpress/components';
import { Icon } from '@prc/icons';
import { __ } from '@wordpress/i18n';

// AI theme colors
export const AI_COLORS = {
	primary: '#8B5CF6', // A nice purple color commonly used for AI
	text: '#6B7280', // A muted gray for text
	iconBackground: 'rgba(139, 92, 246, 0.1)', // Very light purple background
};

/**
 * AILoadingAnimation component displays a loading state for AI operations.
 */
export default function AILoadingAnimation() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '1em',
				padding: '2em',
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '0.5em',
					padding: '0.75em',
					background: AI_COLORS.iconBackground,
					borderRadius: '8px',
				}}
			>
				<Icon
					icon="sparkles"
					library="solid"
					size="1"
					style={{ color: AI_COLORS.primary }}
				/>
				<Spinner
					style={{
						color: AI_COLORS.primary,
						marginTop: 0,
						marginBottom: 0,
					}}
				/>
			</div>
			<p style={{ margin: 0, color: AI_COLORS.text }}>
				{__(
					'PRC Copilot is generating suggestions…',
					'prc-block-library'
				)}
			</p>
		</div>
	);
}
