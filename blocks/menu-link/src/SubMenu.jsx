/* eslint-disable max-lines-per-function */
/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useRef } from '@wordpress/element';
import { useInnerBlockProps } from '@wordpress/block-editor';

export default function SubMenu({ attributes, setAttributes, clientId }) {
	const innerBlockProps = useInnerBlockProps(
		{
			className: 'wp-block-prc-block-menu-link__sub-menu',
			'data-client-id': clientId,
		},
		{
			allowedBlocks: ['prc-block/menu-link'],
		}
	);
}
