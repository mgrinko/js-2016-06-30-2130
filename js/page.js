'use strict';

let defaultPhones = require('json!../phones/phones.json');

let Filter = require('./filter');
let Sorter = require('./sorter');
let PhoneCatalogue = require('./phoneCatalogue');
let PhoneViewer = require('./phoneViewer');

class Page {
  constructor(options) {
    this._el = options.element;

    this._filter = new Filter({
      element: this._el.querySelector('[data-component="filter"]')
    });

    this._sorter = new Sorter({
      element: this._el.querySelector('[data-component="sorter"]')
    });

    this._phoneCatalogue = new PhoneCatalogue({
      element: this._el.querySelector('[data-component="phoneCatalogue"]'),
      phones: defaultPhones
    });

    this._phoneViewer = new PhoneViewer({
      element: this._el.querySelector('[data-component="phoneViewer"]')
    });

    this._phoneViewer.hide();

    this._phoneCatalogue.getElement().addEventListener('phoneSelected', this._onPhoneSelected.bind(this));
  }

  _getPhoneById(phoneId) {
    return defaultPhones.filter(function(phone) {
      return phone.id === phoneId;
    })[0];
  }

  _onPhoneSelected(event) {
    let phoneDetails = this._getPhoneById(event.detail);

    this._phoneCatalogue.hide();

    this._phoneViewer.render(phoneDetails);
    this._phoneViewer.show();
  }
}

module.exports = Page;