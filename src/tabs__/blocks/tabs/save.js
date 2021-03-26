import isSecondary from '../util';
import { InnerBlocks } from '@wordpress/block-editor';

export default function save( props ) {
	const {
		attributes : {
			className,
			titles,
		},
	} = props;

	const secondary = isSecondary(className);

  return (
    <div className={`${typeof className !== 'undefined' ? `${className}` : ``} prc-block-tabs`}>
      <div className={`ui menu ${secondary ? `secondary` : `top attached tabular`}`}>
        {	titles.map((d,i) =>
          <a className={`item ${i === 0 ? `active` : ``}`} data-tab={`${i}`}>
	          {d.content}
          </a>
        )}
      </div>
      <InnerBlocks.Content />
    </div>
  );
}
