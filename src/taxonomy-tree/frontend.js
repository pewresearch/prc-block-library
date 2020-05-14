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
        if ( undefined === title ) {
            continue;
        }
        if ( null === title ) {
            continue;
        }

        const content = block.querySelector('.content');
       
        const linkCheck = title.querySelector('a');
        if ( null !== linkCheck ) {
            let titleLink = linkCheck.getAttribute('href');
            let h2 = title.querySelector('h2');
            // Replace The Title
            h2.innerHTML = linkCheck.innerHTML;

            // Create New Link
            let newLink = document.createElement("a");
            newLink.innerHTML = 'View all ' + linkCheck.innerHTML + ' publications';
            newLink.setAttribute('href', titleLink);
            newLink.classList.add('sans-serif');
            content.prepend(newLink);  

            linkCheck.remove();
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