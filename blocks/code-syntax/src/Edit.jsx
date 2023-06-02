/**
 * External Dependencies
 */
import classNames from 'classnames';
import hljs from 'highlight.js';
import { unescape } from 'underscore';
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useRef } from '@wordpress/element';
import {
	useBlockProps,
	RichText, 
	useInnerBlocksProps
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './Controls';
import { CopyText } from './Copy';

const ALLOWED_BLOCKS = [];
const ALLOWED_LANGUAGES = [ 'R', 'Python', 'PHP', 'HTML', 'JavaScript', 'JSON', 'Bash', 'SQL' ];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( {
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
} ) {
	const { allowedBlocks, orientation, value, className, forceLanguage, detectedLanguage } = attributes;
	const blockProps = useBlockProps();

	const codeRef = useRef( null );
	const configuration = {
		ignoreUnescapedHTML: true,
		languages: 'undefined' !== typeof forceLanguage && forceLanguage.length > 0 ? [ forceLanguage ] : ALLOWED_LANGUAGES,
	};

	hljs.configure( configuration );

	// By defining a allowedBlocks attribute any block can now customize what inner blocks are allowed.
	// This gives us a good way to ensure greater template and pattern control.
	// By default if nothing is defined in the "allowedBlocks" attribute this will default to the constant ALLOWED_BLOCKS found under "Internal Dependencies" ^.
	// The same applies for "orientation", defaults to "vertical".
	
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: allowedBlocks ? allowedBlocks : ALLOWED_BLOCKS,
		orientation: orientation ? orientation : 'vertical',
	} );

	useEffect(() => {
		// Flush any prior classNames on the code block that hljs might have assigned automatically
		codeRef.current.removeAttribute( 'class' );

		const detected = hljs.highlightAuto( unescape( value ), ALLOWED_LANGUAGES ); 
		setAttributes( { 
			detectedLanguage: detected.language,
		 } );

		hljs.highlightElement( codeRef.current );

	  }, [ value, forceLanguage ] ); 

	return (
		<Fragment>
			<Controls { ...{ attributes, setAttributes, context } } />	
			<div { ...blockProps }>
				<CopyText  { ...{ value: unescape( value ) } } />
				{ ( value && value.trim().length > 0 ) && ( 
					<div className="wp-block-prc-block-code-syntax__compiled">
						<pre>
							<code 
								className={ `hljs ${ forceLanguage ? `language-${forceLanguage}` : '' }` } 
								ref={ codeRef }
							>
								{ unescape( value ) }
							</code>
						</pre>
					</div>
				) } 
				<RichText
					tagName="div"
					className='wp-block-prc-block-code-syntax__edit hljs'
					value={ value }
					allowedFormats={[]}
					onChange={ ( t ) => setAttributes( { value: t } ) }
					placeholder={ __( 'Write code…' ) }
					aria-label={ __( 'Code' ) }
					spellCheck={ false }
					preserveWhiteSpace
					keepPlaceholderOnFocus
					__unstablePastePlainText
				/>
			</div>
		</Fragment>
	);
}
