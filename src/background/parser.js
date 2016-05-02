// Fetch page
// Call done with the body if success and fail with an error message
function get(url, done, fail){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {

      if (xhr.status == 200) {
        done(xhr.response);
      } else {
        fail(url + ' error : ' + xhr.statusText + ' (' + xhr.status + ')');
      }
    }
  };

  xhr.send();
}


// Parse dom and extract element
// Call done with found element and fail if no element was found
function parseHTML(HTMLBody, selector, done, fail){
  var dump, elements, value;

  dump = document.createElement('html');
  dump.innerHTML = HTMLBody;

  elements = dump.querySelectorAll(selector);

  // return the first element or fail
  if (elements.length > 0) done(elements[0]);
  else fail('Element [' + selector + '] not found in page.');
}

// Main function, call get and parseHTML with the config
// callback done with the html element found or fail with the error
function fetch(url, selector, done, fail){

  get(url, function(HTMLBody){

    parseHTML(HTMLBody, selector, function(element){
      done(element);
    }, fail);

  }, fail);

}
