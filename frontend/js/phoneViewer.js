'use strict';

const BaseComponent = require('./baseComponent');

let compiledTemplate = require('../templates/phone-viewer-template.hbs');

class PhoneViewer extends BaseComponent {
  constructor(options) {
    super(options.element);
  }

  render(phone) {
    this._el.innerHTML = compiledTemplate({
      phone: phone
    });
  }
}

module.exports = PhoneViewer;