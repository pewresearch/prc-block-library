/**
 * External Dependencies
 */
import ReactPlayer from 'react-player/file';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

/**
 * WordPress Dependencies
 */
import { Fragment, useState, useRef, useEffect } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Duration from './Duration';

const AudioPlayer = ({
	title,
	description,
	source,
	imageSource,
	metaTitle,
	metaDescription,
	classes,
}) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [played, setPlayed] = useState(0);
	const [seeking, setSeeking] = useState(false);
	const [duration, setDuration] = useState(0);

	//refs and effects
	const playerRef = useRef(null);

	//helpers
	const handleSeekChange = (e) => {
		setPlayed(parseFloat(e.target.value));
	};

	const handleSeekMouseDown = (e) => {
		setSeeking(true);
	};

	const handleSeekMouseUp = (e) => {
		setSeeking(false);
		playerRef.current.seekTo(parseFloat(e.target.value));
	};

	const type = classes.includes('is-style-card') ? 'card' : 'player';

	if (type === 'card') {
		return (
			<>
				<ReactPlayer
					url={source}
					playing={isPlaying}
					width={0}
					height={0}
					loop={true}
					onProgress={(e) => {
						if (!seeking) {
							setPlayed(e.played);
						}
					}}
					onDuration={(e) => setDuration(e)}
				/>

				<button
					className="wp-block-prc-block-audio-player__card"
					onClick={() => {
						setIsPlaying(!isPlaying);
						{
							/* The below fees like a somewhat hacky solution to pausing other players on the page when this one is played that should probably be revisited*/
						}
						const buttons = document.querySelectorAll(
							'.wp-block-prc-block-audio-player .wp-block-prc-block-audio-player__card'
						);

						buttons.forEach((button) => {
							button.addEventListener('click', () => {
								const currentAudio =
									button.previousElementSibling.querySelector(
										'audio'
									);
								const audioElements = document.querySelectorAll(
									'.wp-block-prc-block-audio-player audio'
								);

								audioElements.forEach((audio) => {
									if (audio !== currentAudio) {
										audio.pause();
									}
								});
							});
						});
					}}
				>
					<div
						className="wp-block-prc-block-audio-player__card__bar"
						style={{
							width: `${played * 100}%`,
							borderTopRightRadius: played >= 0.98 ? '5px' : '0',
							borderBottomRightRadius:
								played >= 0.98 ? '5px' : '0',
						}}
					></div>
					{!isPlaying ? (
						<FontAwesomeIcon
							icon={faPlay}
							className="wp-block-prc-block-audio-player__card__icon"
						/>
					) : (
						<FontAwesomeIcon
							icon={faPause}
							className="wp-block-prc-block-audio-player__card__icon"
						/>
					)}
					{title ? title : metaTitle}
					<span className="wp-block-prc-block-audio-player__card__time">
						<Duration seconds={duration * (1 - played)} />
					</span>
				</button>
			</>
		);
	}
	return (
		<div className="wp-block-prc-block-audio-player__player">
			<ReactPlayer
				url={source}
				playing={isPlaying}
				width={0}
				height={0}
				loop={true}
				ref={playerRef}
				onProgress={(e) => {
					if (!seeking) {
						setPlayed(e.played);
					}
				}}
				onDuration={(e) => setDuration(e)}
			/>

			<div className="wp-block-prc-block-audio-player__player__info">
				<img
					src={imageSource}
					className="wp-block-prc-block-audio-player__player__image"
				/>
				<div className="wp-block-prc-block-audio-player__player__info--text">
					<h2 className="wp-block-prc-block-audio-player__player__title">
						{title ? title : metaTitle}
					</h2>
					<p className="wp-block-prc-block-audio-player__player__description">
						{description ? description : metaDescription}
					</p>
				</div>
			</div>
			<div className="wp-block-prc-block-audio-player__player__controls">
				<button
					onClick={() => setIsPlaying(!isPlaying)}
					className="wp-block-prc-block-audio-player__player__button"
				>
					{!isPlaying ? '\u25B6' : '⏸'}
				</button>

				<input
					className="wp-block-prc-block-audio-player__player__seeker"
					type="range"
					min={0}
					max={0.999999}
					step="any"
					value={played}
					onMouseDown={handleSeekMouseDown}
					onChange={handleSeekChange}
					onMouseUp={handleSeekMouseUp}
				/>
				<div className="wp-block-prc-block-audio-player__player__time">
					<Duration seconds={duration * played} />/
					<Duration seconds={duration} />
				</div>
			</div>
		</div>
	);
};

export default AudioPlayer;
