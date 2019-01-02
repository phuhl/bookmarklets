javascript:(function(){
  (function() {
    var i, elements = document.querySelectorAll('body *');
    for (i = 0; i < elements.length; i++) {
      if (getComputedStyle(elements[i]).position === 'fixed' || getComputedStyle(elements[i]).position === 'sticky') {
        elements[i].parentNode.removeChild(elements[i]);
      }
    }
  })()
})()