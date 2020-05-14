const treeCollapseHandler = function() {
    const animation = 'fade';
    const blocks = document.querySelectorAll('.wp-block-prc-block-taxonomy-tree');
    if ( undefined === blocks ) {
        return;
    }
    for (let block of blocks) {
        const title = block.querySelector('.title');
        const content = block.querySelector('.content');
        if ( undefined === title ) {
            continue;
        }
        if ( null === title ) {
            continue;
        }
        const linkCheck = title.querySelector('a');
        // if ( undefined !== linkCheck || null !== linkCheck ) {
        //     linkCheck.removeAttribute('href');
        // }
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