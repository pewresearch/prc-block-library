document.addEventListener('DOMContentLoaded', function() {
    var tabs = document.querySelectorAll('.prc-block-tabs');
    if (tabs.length) {
      for (var i = 0; i < tabs.length; i++)
      jQuery(tabs[i]).find('.item').tab({
        context: tabs[i],
        childrenOnly: true
      });
    }
});
