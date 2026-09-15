/**
 * External Dependencies
 */
import styled from '@emotion/styled';

/**
 * WordPress Dependencies
 */
import { useState } from '@wordpress/element';
import { Icon, copy } from '@wordpress/icons';

const UnstyledButton = styled.button`
	background: none;
	border: none;
	margin: 0;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	text-align: left;
`;

const CopyText = ({ value }) => {
	const [isCopied, setIsCopied] = useState(false);
	const handleCopy = () => {
		window.navigator.clipboard.writeText(value);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};
	return (
		<UnstyledButton onClick={handleCopy} title="Click to copy">
			<Icon icon={copy} />
			<span>{isCopied ? 'Copied' : 'Copy'}</span>
		</UnstyledButton>
	);
};
export { UnstyledButton, CopyText };
