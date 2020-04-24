import { InnerBlocks } from '@wordpress/block-editor';

export default function save(props) {
  const {
    attributes : {
      key,
    }
  } = props;

  return (
    <div className={`ui bottom attached tab segment ${key === 0 ? `active` : ``}`} data-tab={`${Number(key)}`}>
      <InnerBlocks.Content />
    </div>
  );
}
