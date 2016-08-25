'use strict';

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

    this._catalogue = new PhoneCatalogue({
      element: this._el.querySelector('[data-component="phoneCatalogue"]'),
    });

    this._loadPhones();

    this._viewer = new PhoneViewer({
      element: this._el.querySelector('[data-component="phoneViewer"]')
    });

    this._viewer.hide();

    this._catalogue.getElement().addEventListener('phoneSelected', this._onPhoneSelected.bind(this));
  }

  _onPhoneSelected(event) {
    let phoneId = event.detail;

    this._loadPhoneById(phoneId);
  }

  _loadPhones() {
    this._ajax('/data/phones.json', {
      success: function(phones) {
        this._catalogue.render(phones);
      }.bind(this),

      error: function(error) {
        console.error(error);
      }.bind(this)
    });
  }

  _loadPhoneById(phoneId) {
    this._ajax(`/data/${phoneId}.json`, {
      method: 'GET',

      success: function(phoneDetails) {
        this._catalogue.hide();

        this._viewer.render(phoneDetails);
        this._viewer.show();
      }.bind(this),

      error: function(error) {
        console.error(error);
      }.bind(this)
    });
  }

  _ajax(url, options) {
    var xhr = new XMLHttpRequest();

    xhr.open(options.method || 'GET', url, true);

    xhr.onload = function() {
      if (xhr.status != 200) {
        options.error( xhr.status + ': ' + xhr.statusText );
      } else {
        let response = JSON.parse(xhr.responseText);

        options.success(response);
      }
    }.bind(this);

    xhr.onerror = function() {
      options.error( xhr.status + ': ' + xhr.statusText );
    };

    xhr.send();
  }
}

module.exports = Page;