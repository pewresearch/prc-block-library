const treeCollapseHandler = function() {
    // If viewport is greater than mobile threshold disable
    if ( 541 <= window.innerWidth ) {
        return;
    }
    const animation = 'fade';
    const blocks = document.querySelectorAll('.wp-block-prc-block-taxonomy-tree');
    if ( undefined === blocks ) {
        return;
    }
    for (let block of blocks) {
        if ( block.parentElement.classList.contains('block-editor-block-list__block') ) {
            continue;
        }
        const title = block.querySelector('.title');
        const content = block.querySelector('.content');
        if ( undefined === title ) {
            continue;
        }
        if ( null === title ) {
            continue;
        }
        const linkCheck = title.querySelector('a');
        let titleLink = false;
        console.log(linkCheck);
        if ( null !== linkCheck ) {
            console.log('removing href');
            titleLink = linkCheck.getAttribute('href');
            console.log('link : '+titleLink);
            linkCheck.removeAttribute('href');
        }
        title.addEventListener('click', function(e) {
            e.stopPropagation(); // Short-circuit any links
            const { display } = content.style;
            const caret = title.querySelector('.icon.caret');
            if ('block' !== display) {
                // Closed State - Force Open
                jQuery(content).transition(animation + ' down');
                if ( caret.classList.contains('down') ) {
                    caret.classList.add('right');
                    caret.classList.remove('down');
                }
            } else {
                // Open State - Force Closed
                jQuery(content).transition(animation + ' up');
                if ( caret.classList.contains('right') ) {
                    caret.classList.add('down');
                    caret.classList.remove('right');
                }
            }
        });
    }
};

document.addEventListener("DOMContentLoaded", function(){
    setTimeout(treeCollapseHandler, 1000);
});