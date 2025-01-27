/* eslint-disable max-lines-per-function */
/**
 * External Dependencies
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';
import { useBlockProps, RichText } from '@wordpress/block-editor';

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
export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();

	const { title, description, source, imageSource } = attributes;

	const isCard = blockProps.className.includes('is-style-card');
	const isMinimal = blockProps.className.includes('is-style-minimal');
	const isPlayer = blockProps.className.includes('is-style-player');

	let type;

	if (isCard) {
		type = 'card';
	}

	if (isMinimal) {
		type = 'minimal';
	}

	if (isPlayer) {
		type = 'player';
	}

	const url = imageSource ? imageSource.url : null;

	return (
		<Fragment>
			<Controls
				{...{ attributes, setAttributes, context: false, type }}
			/>

			{(() => {
				if (isCard) {
					return (
						<div {...blockProps}>
							<button className="editor-card" type="button">
								<div
									className="card__bar"
									style={{
										width: '50%',
									}}
								></div>
								<FontAwesomeIcon
									icon={faPlay}
									className="card__icon"
								/>
								<RichText
									{...blockProps}
									style={{
										display: 'inline',
										cursor: 'text',
									}}
									tagName="p"
									value={
										title
											? title
											: source?.title
												? source?.title
												: 'Title...'
									}
									onChange={(title) =>
										setAttributes({ title })
									}
									placeholder={__('Title...')}
								/>
								<span className="card__time">0:00</span>
							</button>
						</div>
					);
				} else if (isMinimal) {
					return (
						<div {...blockProps}>
							<div className="player__controls">
								<button className="player__button">
									{'\u25B6'}
								</button>
								<img />
								<input
									className="player__seeker"
									type="range"
									min={0}
									max={0.999999}
								/>
								<div
									className="player__time"
									style={{ whiteSpace: 'nowrap' }}
								>
									0:00 / 0:00
								</div>
							</div>
						</div>
					);
				}
				return (
					<div {...blockProps}>
						<div className="player__info">
							<img className="player__image" src={url} />
							<div className="player__info--text">
								<RichText
									tagName="h1"
									value={
										title
											? title
											: source?.title
												? source?.title
												: 'Title...'
									}
									allowedFormats={[
										'core/bold',
										'core/italic',
									]}
									onChange={(title) =>
										setAttributes({ title })
									}
									placeholder={__('Title...')}
								/>
								<RichText
									tagName="p"
									value={
										description
											? description
											: source?.description
												? source?.description
												: 'description...'
									}
									allowedFormats={[
										'core/bold',
										'core/italic',
									]}
									onChange={(description) =>
										setAttributes({ description })
									}
									placeholder={__('description...')}
								/>
							</div>
						</div>
						<div className="player__controls">
							<button className="player__button">
								{'\u25B6'}
							</button>
							<img />
							<input
								className="player__seeker"
								type="range"
								min={0}
								max={0.999999}
							/>
							<div
								className="player__time"
								style={{ whiteSpace: 'nowrap' }}
							>
								0:00 / 0:00
							</div>
						</div>
					</div>
				);
			})()}
		</Fragment>
	);
}
