/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useRef, useEffect } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 * @param {Object}   props.context       Context object with the block's context values.
 * @param {string}   props.clientId      Unique ID of the block.
 * @param {boolean}  props.isSelected    Whether or not the block is currently selected.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId, isSelected }) {

	const ref = useRef();

	const { options, placeholder, disabled, multiple, id, autocomplete } =
		attributes;

	const [isOpen, setIsOpen] = useState(false);

	const blockProps = useBlockProps({
		className: classnames({
			'is-open': isOpen,
		})
	});

	// useEffect(() => {
    //     function handleClickOutside(event) {
    //         if (ref.current && !ref.current.contains(event.target)) {
    //             setIsOpen(false);
    //         }
    //     }

    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, [ref]);

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes, clientId }} />
			<div {...blockProps} ref={ref}>
				<div class="wp-block-prc-block-form-input-select__button">{placeholder || 'Click To Open'}</div>
				{/* <ul className="wp-block-prc-block-form-input-select__list" aria-labelledby="%1$s" role="listbox">
					{options.map(({ label, value }) => (
						<li className="wp-block-prc-block-form-input-select__list-item" role="option">{label}</li>
					))}
				</ul> */}
			</div>
		</Fragment>
	);
}
