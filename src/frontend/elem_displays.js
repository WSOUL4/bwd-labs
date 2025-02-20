function show (elem) {  /* added argument */
    elem.style.display="block"; /* changed variable to argument */
  }
  function show2 (elem) {  /* added argument */
    elem.style.display="flex"; /* changed variable to argument */
  }
  function hide (elem) { /* added argument */
    elem.style.display="none";  /* changed variable to argument */
  }

  function getParent(o, tag) {
    if (o.parentNode.tagName.toLowerCase() == tag.toLowerCase()) {
        return(o.parentNode);
    } else {
        return(null);
    }
}