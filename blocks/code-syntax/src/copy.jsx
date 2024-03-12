/**
 * External Dependencies
 */
import styled from '@emotion/styled';
import { NewIcon } from '@prc/icons';

/**
 * WordPress Dependencies
 */
import { useState } from '@wordpress/element';

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

const CopyText = ({ value, asInputField = false }) => {
	const [isCopied, setIsCopied] = useState(false);
	const handleCopy = () => {
		navigator.clipboard.writeText(value);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};
	return (
		<UnstyledButton onClick={handleCopy} title="Click to copy">
			<NewIcon icon="copy" />
			<span>{isCopied ? 'Copied' : 'Copy'}</span>
		</UnstyledButton>
	);
};
export { UnstyledButton, CopyText };
