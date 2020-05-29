import { __ } from "@wordpress/i18n";
import {
  dispatch,
  select,
} from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import {
	PanelBody,
	Button,
  TextControl
} from '@wordpress/components';
import {
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import  Tabs  from '../component';
import isSecondary from '../util';
import { Tab } from 'semantic-ui-react';

const PLACEHOLDER = `Click here to enter content.`;
const NUM_TABS = 2;
const useEffect = wp.element.useEffect;

export default function edit(props) {
	const {
    attributes: {
      className,
    },
    setAttributes,
  } = props;

  const secondary = isSecondary(className);

	const newPane = ( i = props.attributes.panes.length ) => {
		const block = createBlock('prc-block/pane', {key: i});
		dispatch('core/editor').insertBlock(block, i, props.clientId);
		return {
        menuItem: `Tab ${i + 1}`,
        pane: {
          key:`${i}`,
          //content:
				}
    };
	}

  const populate = () => {
    setAttributes({
      titles: [...Array(NUM_TABS)].map( ( _, i) => { return { content : `Tab ${i + 1}`};}),
      panes: [...Array(NUM_TABS)].map( ( _, i) => newPane(i)),
    });
  };


	const loadPanes = () => {
    const {
      attributes: {
        titles,
      }
    } = props;
		let panes = Array();
		for( let i = 0; i < titles.length; i++ ) {
		    panes.push({
				menuItem: titles[i].content,
				pane: {
					key:`tab${i + 1}`,
					//content : null
				}
      });
		}
    setAttributes({panes: panes});
	};

  const addTab = e => {
    let {
      attributes: {
        titles,
      }
    } = props;

		setAttributes({
			titles: titles.concat([{content: `Tab ${titles.length + 1}`}]),
		});
	}

	const removeTab = e => {
    let {
      attributes : {
        panes,
        titles,
      }
    } = props;

	 	const block = select('core/editor').getBlocksByClientId(props.clientId)[0].innerBlocks[panes.length - 1];
		dispatch('core/editor').removeBlock(block.clientId, false);
		panes.pop();
		titles.pop();
		setAttributes({
			panes: panes.concat([]),
			titles: titles.concat([])
		});
	}

	useEffect(()=> {
    if (typeof props.attributes.panes === 'undefined') return;
		if (props.attributes.panes.length < props.attributes.titles.length) {
			let panes = props.attributes.panes;
			setAttributes({
				panes: panes.concat([newPane()])
			});
		}
	}, [props.attributes.titles]);


	// Creating a new block, or loading from attributes
	if ( typeof props.attributes.titles === 'undefined' ) {
    populate();
	} else if ( typeof props.attributes.panes === 'undefined' ) {
		loadPanes();
	}


  return [
			<InspectorControls>
				<PanelBody title={ __( 'Menu Items' ) } initialOpen={true} >
          { typeof props.attributes.panes !== 'undefined' ? props.attributes.panes.map((d,i)=>
								<TextControl
					          label={ __('Menu text')}
					          value={ d.menuItem }
										onChange={(e)=> {
                      let {
                        attributes : {
                          panes,
                          titles,
                        }
                      } = props;

											panes[i].menuItem = e;
											titles[i].content = e;
											setAttributes({
                        panes: panes.concat([]),
                        titles: titles.concat([])
                      });
										}}
										index={i}
					      />) : `` }
          <Button isPrimary={true} onClick={addTab}>Add tab</Button>&nbsp;
					<Button isPrimary={true} onClick={removeTab}>Remove tab</Button>
 				</PanelBody>
			</InspectorControls>,
			<div className={className}>
        <div className="static">
  	      <Tabs menu={ { secondary : secondary, attached: !secondary, tabular: !secondary } } panes={props.attributes.panes} />
        </div>
				{ 'undefined' !== typeof props.insertBlocksAfter ? <InnerBlocks allowedBlocks={['prc-block/pane']}/> : ``}
			</div>

	];
}
