# TODO list for porting prc-block/dialog to Gutenberg Core.

- [x] Get rid of isMobile check. Just use CSS media queries to handle the is mobile conditon.
- [x] Remove disengageClickHandler attribute and related code.
- [x] Finish updating dialog trigger to wrap a <button> element around it's content.
- [x] Add a "BackdropStyles" component like gap styles in prc-block/tabs.
- [x] Complete the animation options: "bouncing in/out", "fade in/out", "slide in/out", "zoom in/out", and "pop in/out".
- [x] Review attributes hoisting. Does it make sense to keep the attributes related to dialog element in dialog?
- [x] Change animation duration, and backdrop color to utilize https://github.com/WordPress/gutenberg/blob/trunk/packages/style-engine/README.md on server side. Register the stylesheet and enqueue along with dialog. Potentially update the client side implementation to use style-engine as well.
- [x] Consider other accessibility improvements to dialog trigger.
- [x] Implement redux store for editing dialog state.
- [x] Make iAPI implementation updates per Luis. See:
    - https://github.com/WordPress/gutenberg/pull/71618#issuecomment-3301370029 and https://github.com/WordPress/gutenberg/pull/71618#pullrequestreview-3222909478
- [ ] Move dialog element close button to utilize the upcoming `core/icon` block. See: https://github.com/WordPress/gutenberg/pull/71227 and https://github.com/WordPress/gutenberg/pull/71618#issuecomment-3321504746
