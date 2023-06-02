/**
 * External Dependencies
 */
import styled from '@emotion/styled';
/**
 * WordPress Dependencies
 */
import { useState } from '@wordpress/element';
import { 
    SVG,
    Path,
} from '@wordpress/components';
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
const CopyText = ( { value, asInputField = false } ) => {
    const [ isCopied, setIsCopied ] = useState( false );
    const handleCopy = () => {
        navigator.clipboard.writeText( value );
        setIsCopied( true );
        setTimeout( () => setIsCopied( false ), 2000);
    };
    return (
        <UnstyledButton
            onClick={ handleCopy }
            title="Click to copy"
        >   
            <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103.6 132.4"
                style={ {
                    width: '13px',
                } }
            >
                <Path d="m79.8,101h9.8c5.39,0,9.8-5.58,9.8-12.4V16.6c0-6.82-5.58-12.4-12.4-12.4h-41.6c-6.82,0-12.4,4.05-12.4,9v9"
                    style={ { 
                        fill: 'none',
                        stroke: 'var(--wp--preset--color--text-color)',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '8.4px'
                    } }
                />
                <Path  d="m58.2,132.4H16.6c-9.15,0-16.6-7.45-16.6-16.6V43.8c0-9.15,7.45-16.6,16.6-16.6h41.6c9.15,0,16.6,7.45,16.6,16.6v72c0,9.15-7.45,16.6-16.6,16.6ZM16.6,35.6c-4.52,0-8.2,3.68-8.2,8.2v72c0,4.52,3.68,8.2,8.2,8.2h41.6c4.52,0,8.2-3.68,8.2-8.2V43.8c0-4.52-3.68-8.2-8.2-8.2H16.6Z"
                    style={ { fill: 'var(--wp--preset--color--text-color)' } }
                />
            </SVG>
            <span>{ isCopied ? 'Copied' : 'Copy' }</span>
        </UnstyledButton>
    );
};
export { UnstyledButton, CopyText };