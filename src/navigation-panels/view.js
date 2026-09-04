/**
 * WordPress Dependencies
 */
import {
	store,
	getContext,
} from '@wordpress/interactivity';

const { actions, state } = store('prc-block/navigation-panels', {
    state: {
        get navigationPieces() {
            const { id } = getContext(); 
            if ( ! id ) {
                const { option } = getContext();
                const navigationId = option.navigationId;
                if ( navigationId ){
                    return navigationId.split('___');
                }
                return false;
            }
            return id.split('___');
        },
        get isSelected() {
            const { navigationPieces } = state;
            if ( ! navigationPieces || ! state[navigationPieces[0]] ) {
				return false;
			}
            return state[navigationPieces[0]].activeIndex === +navigationPieces[1] ?? false;
        },
        // panelOpen: drill-down open state. Separate from activeIndex; top layout starts closed.
        get panelOpen() {
            const { blockId } = getContext();
            if ( ! blockId || ! state[blockId] ) {
				return false;
			}
            return state[blockId].panelOpen ?? false;
        },
        get returnLabel() {
            const { blockId } = getContext();
            if ( ! blockId || ! state[blockId] ) {
				return 'Back';
			}
            return state[blockId].returnLabel ?? 'Back';
        },
        get localReturnLabel() {
            const { returnLabel } = getContext(); 
            if ( ! returnLabel ) {
                const { option } = getContext();
                const returnLabel = option.returnLabel;
                if ( returnLabel ){
                    return returnLabel;
                }
                return false;
            }
            return returnLabel;
        },
        get hasSubNav(){
            const { blockId, index } = getContext();
            return ( 
                state[blockId] && 
                state[blockId].activeIndex === index && 
                state[blockId].subNavigationPanel === index && 
                Array.isArray(state[blockId].subNavigationList) &&
                state[blockId].subNavigationList.length > 0
            );
        },
        get subNavList(){
            const { hasSubNav } = state;
            if ( hasSubNav ) {
                const { blockId, index } = getContext();
                const navigation = state[blockId]; 
                return navigation.subNavigationList;
            }
        }
    },
    actions: {
        setNavigation: () => {
            const { navigationPieces, localReturnLabel } = state;
            if ( ! navigationPieces || ! state[navigationPieces[0]] ) {
                return;
            }
            const navigation = state[navigationPieces[0]]; 
            if ( localReturnLabel ){
                navigation.returnLabel = localReturnLabel;
            }
            navigation.activeIndex = +navigationPieces[1];
            navigation.panelOpen = true;
            if ( navigation?.level === 'child' ){ 
                if ( Array.isArray(navigation.parentNavigationList) && navigation.parentNavigationList.length > 0  ) {
                    actions.addSubNavigation( navigationPieces.join('___'), navigation.parentNavigationList)
                }
            }
        },
        resetNavigation: () => {
            const { navigationPieces } = state;
            if ( ! navigationPieces || ! state[navigationPieces[0]] ) {
                return;
            }
            const navigation = state[navigationPieces[0]]; 
            navigation.activeIndex = -1;
            navigation.panelOpen = false;
            if ( navigation?.level === 'child' ){ 
                if ( Array.isArray(navigation.parentNavigationList) && navigation.parentNavigationList.length > 0  ) {
                    actions.addSubNavigation( navigationPieces.join('___'), [])
                }
            }
        },
        addSubNavigation: (inputId, subNavigationList)  => {
            const element = document.querySelector('input#' + inputId); 
            if ( ! element ){
                return;
            }
            const parentNavigation = element.closest('.is-parent-nav.wp-block-prc-block-navigation-panels');
            if ( parentNavigation && parentNavigation.id && state[parentNavigation.id]){
                const parentState = state[parentNavigation.id];
                parentState.subNavigationList = subNavigationList;
                parentState.subNavigationPanel = parentState.activeIndex;
            }
        }
    },
});