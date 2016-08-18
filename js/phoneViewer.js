'use strict';

let template = document.getElementById('phone-viewer-template').innerHTML;
let compiledTemplate = _.template(template);

class PhoneViewer {
  constructor(options) {
    this._el = options.element;
  }

  show() {
    this._el.classList.remove('js-hidden')
  }

  hide() {
    this._el.classList.add('js-hidden')
  }

  render(phone) {
    this._el.innerHTML = compiledTemplate({
      phone: phone
    });
  }
}