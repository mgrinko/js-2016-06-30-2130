'use strict';

setInterval(function() {
  let customEvent = new CustomEvent('phoneSelected', {
    detail: 'phoneId'
  });

  document.body.dispatchEvent(customEvent);
}, 1000);

let page = new PhonePageController({
  element: document.getElementById('phone-catalogue-page')
});




