/**
 * External Dependencies
 */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ViewBox = styled.span`
	position: relative;
	width: 24px;
	height: 24px;
`;

const Side = styled.span<{ isFocused: boolean }>`
	background-color: currentColor;
	box-sizing: border-box;
	display: block;
	pointer-events: none;
	position: absolute;
	${({ isFocused }) => !isFocused && css({ opacity: 0.3 })}
`;

const Corner = styled.span<{ isFocused: boolean }>`
	box-sizing: border-box;
	display: block;
	pointer-events: none;
	position: absolute;
	width: 8px;
	height: 8px;
	${({ isFocused }) => !isFocused && css({ opacity: 0.3 })}
`;

export const TopStroke = styled(Side)`
	top: 3px;
	right: 6px;
	left: 6px;
	height: 2px;
`;

export const RightStroke = styled(Side)`
	top: 6px;
	right: 3px;
	bottom: 6px;
	width: 2px;
	background-color: currentColor;
`;

export const BottomStroke = styled(Side)`
	right: 6px;
	bottom: 3px;
	left: 6px;
	height: 2px;
	background-color: currentColor;
`;

export const LeftStroke = styled(Side)`
	top: 6px;
	bottom: 6px;
	left: 3px;
	width: 2px;
	background-color: currentColor;
`;

export const TopLeftStroke = styled(Corner)`
	top: 3px;
	left: 3px;
	border-top: 2px solid;
	border-left: 2px solid;
`;

export const TopRightStroke = styled(Corner)`
	top: 3px;
	right: 3px;
	border-top: 2px solid;
	border-right: 2px solid;
`;

export const BottomRightStroke = styled(Corner)`
	right: 3px;
	bottom: 3px;
	border-right: 2px solid;
	border-bottom: 2px solid;
`;

export const BottomLeftStroke = styled(Corner)`
	bottom: 3px;
	left: 3px;
	border-bottom: 2px solid;
	border-left: 2px solid;
`;
